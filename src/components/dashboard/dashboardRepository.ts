/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DASHBOARD_SCHEMA_VERSION,
  duplicateFlowProject,
  isFlowProject,
  type FlowProject,
} from './dashboardModel';

export const DASHBOARD_STORAGE_KEY = 'identra_dashboard_workspace_v1';
const DASHBOARD_RECOVERY_KEY = 'identra_dashboard_workspace_recovery';

export type DashboardStorage = Pick<Storage, 'getItem' | 'setItem'>;

type DashboardStore = {
  readonly schemaVersion: typeof DASHBOARD_SCHEMA_VERSION;
  readonly projects: readonly FlowProject[];
};

export type FlowProjectRepository = {
  readonly recoveredCorruptData: boolean;
  list: () => readonly FlowProject[];
  get: (id: string) => FlowProject | null;
  create: (project: FlowProject) => FlowProject;
  update: (project: FlowProject) => FlowProject;
  duplicate: (id: string, name: string, now?: Date) => FlowProject | null;
  delete: (id: string) => boolean;
};

const emptyStore = (): DashboardStore => ({
  schemaVersion: DASHBOARD_SCHEMA_VERSION,
  projects: [],
});

const parseStore = (serialized: string | null): DashboardStore | null => {
  if (!serialized) return emptyStore();

  try {
    const parsed = JSON.parse(serialized) as Partial<DashboardStore>;
    if (
      parsed.schemaVersion !== DASHBOARD_SCHEMA_VERSION
      || !Array.isArray(parsed.projects)
      || !parsed.projects.every(isFlowProject)
    ) {
      return null;
    }

    return {
      schemaVersion: DASHBOARD_SCHEMA_VERSION,
      projects: parsed.projects,
    };
  } catch {
    return null;
  }
};

export const createDashboardRepository = (
  storage: DashboardStorage,
): FlowProjectRepository => {
  const rawStore = storage.getItem(DASHBOARD_STORAGE_KEY);
  const parsedStore = parseStore(rawStore);
  let recoveredCorruptData = parsedStore === null;
  let store = parsedStore ?? emptyStore();

  if (recoveredCorruptData && rawStore) {
    try {
      storage.setItem(DASHBOARD_RECOVERY_KEY, rawStore);
      storage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(store));
    } catch {
      // The in-memory repository remains usable if browser storage is unavailable.
    }
  }

  const persist = () => {
    storage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify(store));
  };

  const withUpdatedProjects = (projects: readonly FlowProject[]) => {
    store = {
      schemaVersion: DASHBOARD_SCHEMA_VERSION,
      projects,
    };
    persist();
  };

  return {
    get recoveredCorruptData() {
      return recoveredCorruptData;
    },
    list: () => [...store.projects].sort(
      (left, right) => right.updatedAt.localeCompare(left.updatedAt),
    ),
    get: (id) => store.projects.find((project) => project.id === id) ?? null,
    create: (project) => {
      withUpdatedProjects([project, ...store.projects]);
      return project;
    },
    update: (project) => {
      if (!store.projects.some((candidate) => candidate.id === project.id)) {
        withUpdatedProjects([project, ...store.projects]);
        return project;
      }

      withUpdatedProjects(
        store.projects.map((candidate) => candidate.id === project.id ? project : candidate),
      );
      return project;
    },
    duplicate: (id, name, now) => {
      const source = store.projects.find((project) => project.id === id);
      if (!source) return null;
      const duplicate = duplicateFlowProject(source, name, now);
      withUpdatedProjects([duplicate, ...store.projects]);
      return duplicate;
    },
    delete: (id) => {
      const projects = store.projects.filter((project) => project.id !== id);
      if (projects.length === store.projects.length) return false;
      withUpdatedProjects(projects);
      return true;
    },
  };
};

export const createBrowserDashboardRepository = (): FlowProjectRepository => {
  if (typeof window === 'undefined') {
    const memory = new Map<string, string>();
    return createDashboardRepository({
      getItem: (key) => memory.get(key) ?? null,
      setItem: (key, value) => {
        memory.set(key, value);
      },
    });
  }

  return createDashboardRepository(window.localStorage);
};

