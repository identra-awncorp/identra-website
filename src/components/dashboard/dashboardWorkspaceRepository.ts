/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Locale } from '../../types/routes';
import { isLegacyWorkspace, migrateLegacyWorkspace } from './dashboardMigration';
import {
  createEmptyWorkspaceV2,
  duplicateFlowProjectV2,
} from './dashboardV2Model';
import { prepareDashboardWorkspaceForStorage } from './dashboardValidation';
import {
  DASHBOARD_WORKSPACE_SCHEMA_VERSION,
  DASHBOARD_WORKSPACE_STORAGE_KEY,
  LEGACY_DASHBOARD_WORKSPACE_BACKUP_KEY,
  LEGACY_DASHBOARD_WORKSPACE_STORAGE_KEY,
  type DashboardWorkspaceLoadResult,
  type DashboardWorkspaceV2,
  type FlowProjectV2,
} from './dashboardV2Types';

export const CORRUPT_DASHBOARD_WORKSPACE_BACKUP_KEY =
  'identra_dashboard_workspace_corrupt_backup';
export const INVALID_DASHBOARD_WORKSPACE_ERROR =
  'DASHBOARD_WORKSPACE_INVALID';
export const DASHBOARD_WORKSPACE_PRIVACY_ERROR =
  'DASHBOARD_WORKSPACE_PRIVACY_VIOLATION';

export type DashboardWorkspaceStorage = Pick<Storage, 'getItem' | 'setItem'>;

export type DashboardWorkspaceRepository = {
  readonly loadResult: DashboardWorkspaceLoadResult;
  readonly canPersist: boolean;
  getWorkspace: () => DashboardWorkspaceV2;
  replaceWorkspace: (workspace: DashboardWorkspaceV2) => DashboardWorkspaceV2;
  listProjects: () => readonly FlowProjectV2[];
  getProject: (id: string) => FlowProjectV2 | null;
  createProject: (project: FlowProjectV2) => FlowProjectV2;
  updateProject: (project: FlowProjectV2) => FlowProjectV2;
  duplicateProject: (id: string, name: string, now?: Date) => FlowProjectV2 | null;
  deleteProject: (id: string) => boolean;
};

type LoadedWorkspace = {
  readonly result: DashboardWorkspaceLoadResult;
  readonly workspace: DashboardWorkspaceV2;
  readonly canPersist: boolean;
};

const parseJson = (serialized: string): unknown => {
  try {
    return JSON.parse(serialized) as unknown;
  } catch {
    return null;
  }
};

const schemaVersionOf = (value: unknown): number | null => {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as { readonly schemaVersion?: unknown };
  return typeof candidate.schemaVersion === 'number' ? candidate.schemaVersion : null;
};

const freezeDeep = <T>(value: T): T => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  for (const child of Object.values(value)) freezeDeep(child);
  return Object.freeze(value);
};

const prepareWorkspace = (
  workspace: DashboardWorkspaceV2,
): {
  readonly workspace: DashboardWorkspaceV2;
  readonly removedPaths: readonly string[];
} => {
  const prepared = prepareDashboardWorkspaceForStorage(workspace);
  if (!prepared.ok) {
    throw new Error(
      prepared.reason === 'privacyViolation'
        ? DASHBOARD_WORKSPACE_PRIVACY_ERROR
        : INVALID_DASHBOARD_WORKSPACE_ERROR,
    );
  }
  return prepared;
};

const persistWorkspace = (
  storage: DashboardWorkspaceStorage,
  workspace: DashboardWorkspaceV2,
): DashboardWorkspaceV2 => {
  const prepared = prepareWorkspace(workspace);
  storage.setItem(
    DASHBOARD_WORKSPACE_STORAGE_KEY,
    JSON.stringify(prepared.workspace),
  );
  return freezeDeep(prepared.workspace);
};

const recoverCorrupt = (
  storage: DashboardWorkspaceStorage,
  rawValue: string,
  now: Date,
): LoadedWorkspace => {
  const emptyWorkspace = createEmptyWorkspaceV2(now);
  try {
    storage.setItem(CORRUPT_DASHBOARD_WORKSPACE_BACKUP_KEY, rawValue);
    const workspace = persistWorkspace(storage, emptyWorkspace);
    return {
      result: { status: 'recovered', workspace },
      workspace,
      canPersist: true,
    };
  } catch {
    const workspace = freezeDeep(emptyWorkspace);
    return {
      result: {
        status: 'storageError',
        rawValue,
        reason: 'recoveryWriteFailed',
      },
      workspace,
      canPersist: false,
    };
  }
};

const loadWorkspace = (
  storage: DashboardWorkspaceStorage,
  locale: Locale,
  now: Date,
): LoadedWorkspace => {
  let currentRaw: string | null;
  try {
    currentRaw = storage.getItem(DASHBOARD_WORKSPACE_STORAGE_KEY);
  } catch {
    const workspace = freezeDeep(createEmptyWorkspaceV2(now));
    return {
      result: { status: 'storageError', reason: 'readUnavailable' },
      workspace,
      canPersist: false,
    };
  }

  if (currentRaw) {
    const parsed = parseJson(currentRaw);
    const schemaVersion = schemaVersionOf(parsed);
    if (
      schemaVersion !== null
      && schemaVersion > DASHBOARD_WORKSPACE_SCHEMA_VERSION
    ) {
      return {
        result: {
          status: 'unsupportedNewerVersion',
          rawValue: currentRaw,
          schemaVersion,
        },
        workspace: freezeDeep(createEmptyWorkspaceV2(now)),
        canPersist: false,
      };
    }
    const prepared = prepareDashboardWorkspaceForStorage(parsed);
    if (prepared.ok) {
      const workspace = freezeDeep(prepared.workspace);
      if (prepared.removedPaths.length > 0) {
        try {
          storage.setItem(
            DASHBOARD_WORKSPACE_STORAGE_KEY,
            JSON.stringify(prepared.workspace),
          );
        } catch {
          return {
            result: { status: 'ready', workspace },
            workspace,
            canPersist: true,
          };
        }
      }
      return {
        result: { status: 'ready', workspace },
        workspace,
        canPersist: true,
      };
    }
    if (prepared.reason === 'privacyViolation') {
      const workspace = freezeDeep(
        prepared.workspace ?? createEmptyWorkspaceV2(now),
      );
      return {
        result: {
          status: 'storageError',
          rawValue: currentRaw,
          reason: 'privacyViolation',
        },
        workspace,
        canPersist: true,
      };
    }
    return recoverCorrupt(storage, currentRaw, now);
  }

  let legacyRaw: string | null;
  try {
    legacyRaw = storage.getItem(LEGACY_DASHBOARD_WORKSPACE_STORAGE_KEY);
  } catch {
    const workspace = freezeDeep(createEmptyWorkspaceV2(now));
    return {
      result: { status: 'storageError', reason: 'readUnavailable' },
      workspace,
      canPersist: false,
    };
  }

  if (!legacyRaw) {
    const workspace = freezeDeep(createEmptyWorkspaceV2(now));
    return {
      result: { status: 'empty' },
      workspace,
      canPersist: true,
    };
  }

  const parsedLegacy = parseJson(legacyRaw);
  if (!isLegacyWorkspace(parsedLegacy)) {
    return recoverCorrupt(storage, legacyRaw, now);
  }

  const migratedWorkspace = migrateLegacyWorkspace(parsedLegacy, locale, now);
  try {
    storage.setItem(LEGACY_DASHBOARD_WORKSPACE_BACKUP_KEY, legacyRaw);
    const workspace = persistWorkspace(storage, migratedWorkspace);
    return {
      result: { status: 'migrated', workspace },
      workspace,
      canPersist: true,
    };
  } catch {
    const workspace = freezeDeep(migratedWorkspace);
    return {
      result: {
        status: 'storageError',
        rawValue: legacyRaw,
        reason: 'migrationWriteFailed',
      },
      workspace,
      canPersist: true,
    };
  }
};

export const createDashboardWorkspaceRepository = (
  storage: DashboardWorkspaceStorage,
  locale: Locale,
  now = new Date(),
): DashboardWorkspaceRepository => {
  const loaded = loadWorkspace(storage, locale, now);
  let workspace = loaded.workspace;

  const replaceWorkspace = (next: DashboardWorkspaceV2) => {
    if (!loaded.canPersist) {
      throw new Error('DASHBOARD_WORKSPACE_PERSISTENCE_UNAVAILABLE');
    }
    const nextWithTimestamp = {
      ...next,
      schemaVersion: DASHBOARD_WORKSPACE_SCHEMA_VERSION,
      savedAt: new Date().toISOString(),
    };
    const persistedWorkspace = persistWorkspace(storage, nextWithTimestamp);
    workspace = persistedWorkspace;
    return workspace;
  };

  const replaceProjects = (projects: readonly FlowProjectV2[]) =>
    replaceWorkspace({ ...workspace, projects });

  return {
    loadResult: loaded.result,
    canPersist: loaded.canPersist,
    getWorkspace: () => workspace,
    replaceWorkspace,
    listProjects: () => [...workspace.projects].sort(
      (left, right) => right.updatedAt.localeCompare(left.updatedAt),
    ),
    getProject: (id) => workspace.projects.find((project) => project.id === id) ?? null,
    createProject: (project) => {
      const next = replaceProjects([project, ...workspace.projects]);
      return next.projects.find((candidate) => candidate.id === project.id)!;
    },
    updateProject: (project) => {
      const exists = workspace.projects.some((candidate) => candidate.id === project.id);
      const next = replaceProjects(exists
        ? workspace.projects.map((candidate) => candidate.id === project.id ? project : candidate)
        : [project, ...workspace.projects]);
      return next.projects.find((candidate) => candidate.id === project.id)!;
    },
    duplicateProject: (id, name, duplicateNow) => {
      const source = workspace.projects.find((project) => project.id === id);
      if (!source) return null;
      const duplicate = duplicateFlowProjectV2(source, name, duplicateNow);
      const next = replaceProjects([duplicate, ...workspace.projects]);
      return next.projects.find((candidate) => candidate.id === duplicate.id) ?? null;
    },
    deleteProject: (id) => {
      if (!workspace.projects.some((project) => project.id === id)) return false;
      replaceWorkspace({
        ...workspace,
        projects: workspace.projects.filter((project) => project.id !== id),
        draftRevisions: workspace.draftRevisions.filter((revision) => revision.projectId !== id),
        releases: workspace.releases.filter((release) => release.projectId !== id),
      });
      return true;
    },
  };
};

const createMemoryStorage = (): DashboardWorkspaceStorage => {
  const values = new Map<string, string>();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
  };
};

export const createBrowserDashboardWorkspaceRepository = (
  locale: Locale,
): DashboardWorkspaceRepository => {
  if (typeof window === 'undefined') {
    return createDashboardWorkspaceRepository(createMemoryStorage(), locale);
  }
  try {
    return createDashboardWorkspaceRepository(window.localStorage, locale);
  } catch {
    return createDashboardWorkspaceRepository(createMemoryStorage(), locale);
  }
};
