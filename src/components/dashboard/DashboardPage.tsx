/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, GitBranch } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  dashboardFlowPath,
  dashboardPath,
  pathToDashboardRoute,
  viewToPath,
  type DashboardToolId,
} from '../../types/routes';
import { getLocalizedRecord } from '../../utils/i18nRuntime';
import { DASHBOARD_PAGE_TRANSLATIONS } from '../../translations/dashboard/DashboardPageTranslations';
import { DASHBOARD_ADVANCED_TRANSLATIONS } from '../../translations/dashboard/DashboardAdvancedTranslations';
import DashboardShell from './DashboardShell';
import DashboardOverview from './DashboardOverview';
import DynamicFlowWorkspace from './DynamicFlowWorkspace';
import InterfaceStudioWorkspace from './InterfaceStudioWorkspace';
import { createBrowserDashboardWorkspaceRepository } from './dashboardWorkspaceRepository';
import type { DashboardWorkspaceV2, FlowProjectV2 } from './dashboardV2Types';

export default function DashboardPage() {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const copy = getLocalizedRecord(
    DASHBOARD_PAGE_TRANSLATIONS,
    language,
    'DASHBOARD_PAGE_TRANSLATIONS',
  );
  const advancedCopy = getLocalizedRecord(
    DASHBOARD_ADVANCED_TRANSLATIONS,
    language,
    'DASHBOARD_ADVANCED_TRANSLATIONS',
  );
  const [repository] = useState(
    () => createBrowserDashboardWorkspaceRepository(language),
  );
  const [workspace, setWorkspace] = useState<DashboardWorkspaceV2>(
    () => repository.getWorkspace(),
  );
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>(
    repository.canPersist ? 'saved' : 'error',
  );
  const saveTimerRef = useRef<number | null>(null);
  const projects = workspace.projects;
  const route = pathToDashboardRoute(location.pathname) ?? { page: 'overview' as const };
  const currentProject = route.page === 'flow'
    ? projects.find((project) => project.id === route.flowId) ?? null
    : null;
  const activeProjectId = currentProject?.id ?? projects[0]?.id;

  useEffect(() => () => {
    if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current);
  }, []);

  const refreshWorkspace = () => setWorkspace(repository.getWorkspace());

  const persistWorkspace = (nextWorkspace: DashboardWorkspaceV2) => {
    setSaveStatus('saving');
    try {
      setWorkspace(repository.replaceWorkspace(nextWorkspace));
      if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = window.setTimeout(() => setSaveStatus('saved'), 500);
    } catch {
      setSaveStatus('error');
    }
  };

  const persistProject = (project: FlowProjectV2) => {
    const updatedProject = {
      ...project,
      updatedAt: new Date().toISOString(),
    };
    persistWorkspace({
      ...workspace,
      projects: workspace.projects.map((candidate) =>
        candidate.id === updatedProject.id ? updatedProject : candidate),
    });
  };

  const openOverview = () => navigate(dashboardPath(language));
  const openFlowTool = (flowId: string, tool: DashboardToolId) => {
    navigate(dashboardFlowPath(flowId, tool, language));
  };
  const openTool = (tool: DashboardToolId) => {
    if (activeProjectId) openFlowTool(activeProjectId, tool);
  };

  return (
    <DashboardShell
      copy={copy}
      language={language}
      onLanguageChange={setLanguage}
      activeTool={route.page === 'flow' ? route.tool : undefined}
      projectName={currentProject?.name}
      saveStatus={saveStatus}
      canOpenTools={Boolean(activeProjectId)}
      onOpenOverview={openOverview}
      onOpenTool={openTool}
      onBackToSite={() => navigate(viewToPath('landing', language))}
    >
      {repository.loadResult.status === 'storageError' ? (
        <div
          role="alert"
          className="mx-4 mt-4 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950 sm:mx-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-bold">{advancedCopy.storage.readError}</p>
            <p className="mt-1 text-sm leading-5 text-amber-800">
              {repository.loadResult.reason === 'privacyViolation'
                ? advancedCopy.storage.privacyErrorDescription
                : repository.loadResult.reason === 'migrationWriteFailed'
                  || repository.loadResult.reason === 'recoveryWriteFailed'
                  ? advancedCopy.storage.quotaDescription
                  : advancedCopy.storage.readErrorDescription}
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="shrink-0 rounded-xl border border-amber-300 bg-white px-3 py-2 text-sm font-bold text-amber-900 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            {advancedCopy.storage.retry}
          </button>
        </div>
      ) : null}
      {repository.loadResult.status === 'unsupportedNewerVersion' ? (
        <div className="flex min-h-[inherit] flex-col items-center justify-center px-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
            <GitBranch className="h-6 w-6" />
          </span>
          <h1 className="type-featured-title mt-5 text-slate-950">
            {advancedCopy.storage.unsupportedVersionTitle}
          </h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            {advancedCopy.storage.unsupportedVersionDescription}
          </p>
        </div>
      ) : route.page === 'overview' ? (
        <DashboardOverview
          copy={copy}
          language={language}
          projects={projects}
          moduleCatalog={workspace.moduleCatalog}
          subflowCatalog={workspace.subflowCatalog}
          recoveredCorruptData={repository.loadResult.status === 'recovered'}
          onCreate={(project) => {
            try {
              repository.createProject(project);
              refreshWorkspace();
              openFlowTool(project.id, 'dynamic-flow');
            } catch {
              setSaveStatus('error');
            }
          }}
          onRename={(project, name) => persistProject({ ...project, name })}
          onDuplicate={(project) => {
            try {
              repository.duplicateProject(
                project.id,
                `${project.name} — ${copy.overview.copySuffix}`,
              );
              refreshWorkspace();
            } catch {
              setSaveStatus('error');
            }
          }}
          onDelete={(project) => {
            try {
              repository.deleteProject(project.id);
              refreshWorkspace();
            } catch {
              setSaveStatus('error');
            }
          }}
          onOpen={(project) => openFlowTool(project.id, 'dynamic-flow')}
        />
      ) : currentProject ? (
        route.tool === 'dynamic-flow' ? (
          <DynamicFlowWorkspace
            copy={copy}
            advancedCopy={advancedCopy}
            project={currentProject}
            workspace={workspace}
            onProjectChange={persistProject}
            onWorkspaceChange={persistWorkspace}
            onOpenStudio={() => openFlowTool(currentProject.id, 'interface-studio')}
          />
        ) : (
          <InterfaceStudioWorkspace
            copy={copy}
            advancedCopy={advancedCopy}
            project={currentProject}
            workspace={workspace}
            onProjectChange={persistProject}
            onWorkspaceChange={persistWorkspace}
            onOpenFlow={() => openFlowTool(currentProject.id, 'dynamic-flow')}
          />
        )
      ) : (
        <div className="flex min-h-[inherit] flex-col items-center justify-center px-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#354CE1]">
            <GitBranch className="h-6 w-6" />
          </span>
          <h1 className="type-featured-title mt-5 text-slate-950">{copy.overview.noResultsTitle}</h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{copy.overview.noResultsDescription}</p>
          <button
            type="button"
            onClick={openOverview}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#354CE1] px-4 py-2.5 text-sm font-bold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.overviewLabel}
          </button>
        </div>
      )}
    </DashboardShell>
  );
}
