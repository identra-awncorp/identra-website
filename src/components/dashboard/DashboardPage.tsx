/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useRef, useState } from 'react';
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
import DashboardShell from './DashboardShell';
import DashboardOverview from './DashboardOverview';
import DynamicFlowWorkspace from './DynamicFlowWorkspace';
import InterfaceStudioWorkspace from './InterfaceStudioWorkspace';
import { createBrowserDashboardRepository } from './dashboardRepository';
import type { FlowProject } from './dashboardModel';

export default function DashboardPage() {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const copy = getLocalizedRecord(
    DASHBOARD_PAGE_TRANSLATIONS,
    language,
    'DASHBOARD_PAGE_TRANSLATIONS',
  );
  const repository = useMemo(() => createBrowserDashboardRepository(), []);
  const [projects, setProjects] = useState<readonly FlowProject[]>(() => repository.list());
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const saveTimerRef = useRef<number | null>(null);
  const route = pathToDashboardRoute(location.pathname) ?? { page: 'overview' as const };
  const currentProject = route.page === 'flow'
    ? projects.find((project) => project.id === route.flowId) ?? null
    : null;
  const activeProjectId = currentProject?.id ?? projects[0]?.id;

  useEffect(() => () => {
    if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current);
  }, []);

  const refreshProjects = () => setProjects(repository.list());

  const persistProject = (project: FlowProject) => {
    const updatedProject = {
      ...project,
      updatedAt: new Date().toISOString(),
    };
    setSaveStatus('saving');
    try {
      repository.update(updatedProject);
      refreshProjects();
      if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = window.setTimeout(() => setSaveStatus('saved'), 500);
    } catch {
      setSaveStatus('error');
    }
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
      {route.page === 'overview' ? (
        <DashboardOverview
          copy={copy}
          language={language}
          projects={projects}
          recoveredCorruptData={repository.recoveredCorruptData}
          onCreate={(project) => {
            repository.create(project);
            refreshProjects();
            openFlowTool(project.id, 'dynamic-flow');
          }}
          onRename={(project, name) => persistProject({ ...project, name })}
          onDuplicate={(project) => {
            repository.duplicate(project.id, `${project.name} — ${copy.overview.copySuffix}`);
            refreshProjects();
          }}
          onDelete={(project) => {
            repository.delete(project.id);
            refreshProjects();
          }}
          onOpen={(project) => openFlowTool(project.id, 'dynamic-flow')}
        />
      ) : currentProject ? (
        route.tool === 'dynamic-flow' ? (
          <DynamicFlowWorkspace
            copy={copy}
            project={currentProject}
            onProjectChange={persistProject}
            onOpenStudio={() => openFlowTool(currentProject.id, 'interface-studio')}
          />
        ) : (
          <InterfaceStudioWorkspace
            copy={copy}
            project={currentProject}
            onProjectChange={persistProject}
            onOpenFlow={() => openFlowTool(currentProject.id, 'dynamic-flow')}
          />
        )
      ) : (
        <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF0FF] text-[#354CE1]">
            <GitBranch className="h-6 w-6" />
          </span>
          <h1 className="mt-5 font-display text-xl font-bold text-slate-950">{copy.overview.noResultsTitle}</h1>
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

