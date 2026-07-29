/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  Download,
  Image,
  LoaderCircle,
  Monitor,
  Palette,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Trash2,
  Type,
  X,
} from 'lucide-react';
import type { DashboardCopy } from '../../translations/dashboard/DashboardPageTranslations';
import {
  BUILT_IN_MODULE_IDS,
  reconcileInterfaceManifest,
  validateDynamicFlow,
  type BuiltInModuleId,
  type FlowProject,
  type InterfaceManifest,
  type InterfaceScreen,
  type InterfaceTheme,
} from './dashboardModel';
import identraLogo from '../../assets/images/identra-logo.svg';

type InterfaceStudioWorkspaceProps = {
  readonly copy: DashboardCopy;
  readonly project: FlowProject;
  readonly onProjectChange: (project: FlowProject) => void;
  readonly onOpenFlow: () => void;
};

type PreviewDevice = 'mobile' | 'desktop';
type InspectorTab = 'content' | 'design';
type ExportState = 'idle' | 'exporting' | 'success' | 'blocked';

const screenLabel = (
  screen: InterfaceScreen,
  project: FlowProject,
  copy: DashboardCopy,
): string => {
  if (screen.kind !== 'module') return copy.screenDefaults[screen.kind].name;
  const node = project.flow.nodes.find((candidate) => candidate.id === screen.sourceNodeId);
  if (!node?.moduleId) return copy.screenDefaults.module.name;
  if (BUILT_IN_MODULE_IDS.includes(node.moduleId as BuiltInModuleId)) {
    return copy.modules[node.moduleId as BuiltInModuleId].name;
  }
  return project.customModules.find((module) => module.id === node.moduleId)?.name
    ?? copy.screenDefaults.module.name;
};

const screenDefaults = (
  screen: InterfaceScreen,
  project: FlowProject,
  copy: DashboardCopy,
) => {
  const base = copy.screenDefaults[screen.kind];
  if (screen.kind !== 'module') return base;
  const node = project.flow.nodes.find((candidate) => candidate.id === screen.sourceNodeId);
  if (!node?.moduleId) return base;
  const customModule = project.customModules.find((module) => module.id === node.moduleId);
  if (customModule) {
    return {
      ...base,
      name: customModule.name,
      title: customModule.defaultUi.title || customModule.name,
      body: customModule.defaultUi.description || customModule.description,
      action: customModule.defaultUi.actionLabel || base.action,
    };
  }
  if (BUILT_IN_MODULE_IDS.includes(node.moduleId as BuiltInModuleId)) {
    const moduleCopy = copy.modules[node.moduleId as BuiltInModuleId];
    return {
      ...base,
      name: moduleCopy.name,
      title: moduleCopy.name,
      body: moduleCopy.description,
    };
  }
  return base;
};

export default function InterfaceStudioWorkspace({
  copy,
  project,
  onProjectChange,
  onOpenFlow,
}: InterfaceStudioWorkspaceProps) {
  const reconciledManifest = useMemo(
    () => reconcileInterfaceManifest(project.interface, project.flow),
    [project.flow, project.interface],
  );
  const [selectedScreenId, setSelectedScreenId] = useState(
    reconciledManifest.screens[0]?.id ?? '',
  );
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('desktop');
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>('content');
  const [exportState, setExportState] = useState<ExportState>('idle');
  const [logoFailed, setLogoFailed] = useState(false);
  const exportTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!reconciledManifest.screens.some((screen) => screen.id === selectedScreenId)) {
      setSelectedScreenId(reconciledManifest.screens[0]?.id ?? '');
    }
  }, [reconciledManifest.screens, selectedScreenId]);

  useEffect(() => () => {
    if (exportTimerRef.current !== null) window.clearTimeout(exportTimerRef.current);
  }, []);

  const selectedScreen = reconciledManifest.screens.find(
    (screen) => screen.id === selectedScreenId,
  ) ?? reconciledManifest.screens[0];
  const defaults = selectedScreen
    ? screenDefaults(selectedScreen, project, copy)
    : copy.screenDefaults.welcome;
  const validationIssues = validateDynamicFlow(project.flow, project.customModules);

  const updateManifest = (manifest: InterfaceManifest) => {
    onProjectChange({
      ...project,
      interface: manifest,
    });
  };

  const updateScreen = (patch: Partial<InterfaceScreen>) => {
    if (!selectedScreen) return;
    updateManifest({
      ...reconciledManifest,
      screens: reconciledManifest.screens.map((screen) => screen.id === selectedScreen.id
        ? { ...screen, ...patch }
        : screen),
    });
  };

  const updateTheme = <Key extends keyof InterfaceTheme>(
    key: Key,
    value: InterfaceTheme[Key],
  ) => {
    setLogoFailed(false);
    updateManifest({
      ...reconciledManifest,
      theme: {
        ...reconciledManifest.theme,
        [key]: value,
      },
    });
  };

  const moveScreen = (direction: -1 | 1) => {
    if (!selectedScreen) return;
    const currentIndex = reconciledManifest.screens.findIndex(
      (screen) => screen.id === selectedScreen.id,
    );
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= reconciledManifest.screens.length) return;
    const screens = [...reconciledManifest.screens];
    [screens[currentIndex], screens[targetIndex]] = [screens[targetIndex], screens[currentIndex]];
    updateManifest({ ...reconciledManifest, screens });
  };

  const removeOrphan = (screenId: string) => {
    updateManifest({
      ...reconciledManifest,
      orphanedScreens: reconciledManifest.orphanedScreens.filter(
        (screen) => screen.id !== screenId,
      ),
    });
  };

  const handleExport = () => {
    if (validationIssues.length > 0) {
      setExportState('blocked');
      if (exportTimerRef.current !== null) window.clearTimeout(exportTimerRef.current);
      exportTimerRef.current = window.setTimeout(() => setExportState('idle'), 3600);
      return;
    }
    setExportState('exporting');
    if (exportTimerRef.current !== null) window.clearTimeout(exportTimerRef.current);
    exportTimerRef.current = window.setTimeout(() => {
      setExportState('success');
      exportTimerRef.current = window.setTimeout(() => setExportState('idle'), 3600);
    }, 900);
  };

  const previewFont = reconciledManifest.theme.fontFamily === 'serif'
    ? 'Georgia, serif'
    : reconciledManifest.theme.fontFamily === 'system'
      ? 'ui-sans-serif, system-ui, sans-serif'
      : '"Plus Jakarta Sans", ui-sans-serif, sans-serif';
  const previewPadding = reconciledManifest.theme.spacing === 'compact'
    ? 20
    : reconciledManifest.theme.spacing === 'spacious'
      ? 40
      : 28;
  const previewTitle = selectedScreen?.titleOverride || defaults.title;
  const previewBody = selectedScreen?.bodyOverride || defaults.body;
  const previewAction = selectedScreen?.actionOverride || defaults.action;
  const screenIndex = selectedScreen
    ? reconciledManifest.screens.findIndex((screen) => screen.id === selectedScreen.id)
    : 0;
  const progress = Math.max(
    8,
    ((screenIndex + 1) / Math.max(1, reconciledManifest.screens.length)) * 100,
  );

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
        <button
          type="button"
          onClick={onOpenFlow}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {copy.studio.backToFlow}
        </button>
        <div className="mr-auto min-w-0 pl-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#354CE1]">{copy.studio.breadcrumb}</p>
          <h1 className="truncate font-display text-lg font-bold text-slate-950">{project.name}</h1>
        </div>
        <div className="flex rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            aria-label={copy.studio.mobilePreview}
            title={copy.studio.mobilePreview}
            onClick={() => setPreviewDevice('mobile')}
            className={`rounded-md p-1.5 ${previewDevice === 'mobile' ? 'bg-white text-[#354CE1] shadow-sm' : 'text-slate-400'}`}
          >
            <Smartphone className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={copy.studio.desktopPreview}
            title={copy.studio.desktopPreview}
            onClick={() => setPreviewDevice('desktop')}
            className={`rounded-md p-1.5 ${previewDevice === 'desktop' ? 'bg-white text-[#354CE1] shadow-sm' : 'text-slate-400'}`}
          >
            <Monitor className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={handleExport}
          disabled={exportState === 'exporting'}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-3.5 py-2 text-xs font-bold text-white hover:bg-[#354CE1] disabled:opacity-60"
        >
          {exportState === 'exporting'
            ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
            : <Download className="h-3.5 w-3.5" />}
          {exportState === 'exporting' ? copy.studio.exporting : copy.studio.exportAction}
        </button>
      </div>

      <div className="grid flex-1 xl:grid-cols-[248px_344px_minmax(480px,1fr)]">
        <aside className="border-b border-slate-200 bg-white p-4 xl:border-b-0 xl:border-r">
          <h2 className="font-display text-sm font-bold text-slate-950">{copy.studio.screens}</h2>
          <div className="mt-4 space-y-1.5">
            {reconciledManifest.screens.map((screen, index) => (
              <button
                key={screen.id}
                type="button"
                onClick={() => setSelectedScreenId(screen.id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  selectedScreen?.id === screen.id
                    ? 'bg-[#EEF0FF] text-[#354CE1]'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold ${
                  selectedScreen?.id === screen.id ? 'bg-white' : 'bg-slate-100'
                }`}>
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-xs font-bold">
                  {screenLabel(screen, project, copy)}
                </span>
              </button>
            ))}
          </div>

          {reconciledManifest.orphanedScreens.length > 0 && (
            <div className="mt-6 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-2 text-amber-700">
                <CircleAlert className="h-4 w-4" />
                <h3 className="text-xs font-bold">{copy.studio.orphanedScreens}</h3>
              </div>
              <p className="mt-2 text-[10px] leading-4 text-slate-500">{copy.studio.orphanedHint}</p>
              <div className="mt-3 space-y-2">
                {reconciledManifest.orphanedScreens.map((screen) => (
                  <div key={screen.id} className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-2.5">
                    <span className="min-w-0 flex-1 truncate text-[10px] font-bold text-amber-900">
                      {screen.titleOverride || copy.screenDefaults.module.name}
                    </span>
                    <button
                      type="button"
                      aria-label={copy.studio.removeOrphan}
                      title={copy.studio.removeOrphan}
                      onClick={() => removeOrphan(screen.id)}
                      className="rounded-md p-1 text-amber-700 hover:bg-amber-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        <aside className="border-b border-slate-200 bg-white p-4 xl:border-b-0 xl:border-r">
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setInspectorTab('content')}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold ${
                inspectorTab === 'content' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500'
              }`}
            >
              {copy.studio.content}
            </button>
            <button
              type="button"
              onClick={() => setInspectorTab('design')}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold ${
                inspectorTab === 'design' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500'
              }`}
            >
              {copy.studio.design}
            </button>
          </div>

          {inspectorTab === 'content' ? (
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-900">{selectedScreen ? screenLabel(selectedScreen, project, copy) : copy.studio.screens}</p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    aria-label={copy.studio.moveUp}
                    title={copy.studio.moveUp}
                    disabled={screenIndex <= 0}
                    onClick={() => moveScreen(-1)}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 disabled:opacity-30"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label={copy.studio.moveDown}
                    title={copy.studio.moveDown}
                    disabled={screenIndex >= reconciledManifest.screens.length - 1}
                    onClick={() => moveScreen(1)}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 disabled:opacity-30"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{copy.studio.screenTitle}</span>
                <input
                  value={selectedScreen?.titleOverride ?? ''}
                  onChange={(event) => updateScreen({ titleOverride: event.target.value || undefined })}
                  placeholder={defaults.title}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#354CE1]"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{copy.studio.screenBody}</span>
                <textarea
                  rows={5}
                  value={selectedScreen?.bodyOverride ?? ''}
                  onChange={(event) => updateScreen({ bodyOverride: event.target.value || undefined })}
                  placeholder={defaults.body}
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm leading-6 outline-none focus:border-[#354CE1]"
                />
              </label>
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{copy.studio.actionLabel}</span>
                <input
                  value={selectedScreen?.actionOverride ?? ''}
                  onChange={(event) => updateScreen({ actionOverride: event.target.value || undefined })}
                  placeholder={defaults.action}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#354CE1]"
                />
              </label>
              <button
                type="button"
                onClick={() => updateScreen({
                  titleOverride: undefined,
                  bodyOverride: undefined,
                  actionOverride: undefined,
                })}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {copy.studio.useDefaultCopy}
              </button>
            </div>
          ) : (
            <div className="sidebar-scrollbar mt-5 max-h-[calc(100vh-210px)] space-y-5 overflow-y-auto pr-1">
              <div>
                <div className="flex items-center gap-2 text-slate-900">
                  <Monitor className="h-4 w-4" />
                  <h3 className="text-xs font-bold">{copy.studio.layout}</h3>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {([
                    ['card', copy.studio.cardLayout],
                    ['split', copy.studio.splitLayout],
                    ['fullscreen', copy.studio.fullscreenLayout],
                  ] as const).map(([layout, label]) => (
                    <button
                      key={layout}
                      type="button"
                      onClick={() => updateManifest({ ...reconciledManifest, layout })}
                      className={`rounded-xl border px-2 py-2.5 text-[10px] font-bold ${
                        reconciledManifest.layout === layout
                          ? 'border-[#354CE1] bg-[#EEF0FF] text-[#354CE1]'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2 text-slate-900">
                  <Palette className="h-4 w-4" />
                  <h3 className="text-xs font-bold">{copy.studio.theme}</h3>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {([
                    ['primaryColor', copy.studio.primaryColor],
                    ['accentColor', copy.studio.accentColor],
                    ['backgroundColor', copy.studio.backgroundColor],
                    ['surfaceColor', copy.studio.surfaceColor],
                    ['textColor', copy.studio.textColor],
                  ] as const).map(([key, label]) => (
                    <label key={key} className="block">
                      <span className="text-[9px] font-bold text-slate-500">{label}</span>
                      <span className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-200 p-1.5">
                        <input
                          type="color"
                          value={reconciledManifest.theme[key]}
                          onChange={(event) => updateTheme(key, event.target.value)}
                          className="h-7 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                        />
                        <span className="truncate font-mono text-[9px] text-slate-500">{reconciledManifest.theme[key]}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2 text-slate-900">
                  <Type className="h-4 w-4" />
                  <h3 className="text-xs font-bold">{copy.studio.fontFamily}</h3>
                </div>
                <select
                  value={reconciledManifest.theme.fontFamily}
                  onChange={(event) => updateTheme('fontFamily', event.target.value as InterfaceTheme['fontFamily'])}
                  className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#354CE1]"
                >
                  <option value="jakarta">{copy.studio.jakartaFont}</option>
                  <option value="system">{copy.studio.systemFont}</option>
                  <option value="serif">{copy.studio.serifFont}</option>
                </select>
              </div>

              <label className="block">
                <span className="flex justify-between text-[10px] font-bold text-slate-500">
                  <span>{copy.studio.radius}</span>
                  <span>{reconciledManifest.theme.radius}px</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={36}
                  value={reconciledManifest.theme.radius}
                  onChange={(event) => updateTheme('radius', Number(event.target.value))}
                  className="mt-2 w-full accent-[#354CE1]"
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-bold text-slate-500">{copy.studio.spacing}</span>
                <select
                  value={reconciledManifest.theme.spacing}
                  onChange={(event) => updateTheme('spacing', event.target.value as InterfaceTheme['spacing'])}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#354CE1]"
                >
                  <option value="compact">{copy.studio.compactSpacing}</option>
                  <option value="comfortable">{copy.studio.comfortableSpacing}</option>
                  <option value="spacious">{copy.studio.spaciousSpacing}</option>
                </select>
              </label>

              <label className="block border-t border-slate-100 pt-5">
                <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                  <Image className="h-3.5 w-3.5" />
                  {copy.studio.logoUrl}
                </span>
                <input
                  type="url"
                  value={reconciledManifest.theme.logoUrl}
                  onChange={(event) => updateTheme('logoUrl', event.target.value)}
                  placeholder={copy.studio.logoUrlPlaceholder}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-[#354CE1]"
                />
              </label>
            </div>
          )}
        </aside>

        <section
          aria-label={copy.studio.previewLabel}
          className="relative flex min-h-[680px] items-center justify-center overflow-hidden p-5 sm:p-8"
          style={{ backgroundColor: reconciledManifest.theme.backgroundColor }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#94A3B8_0.6px,transparent_0.6px)] [background-size:18px_18px]" />
          <div
            className={`relative overflow-hidden border border-black/5 shadow-2xl transition-all duration-300 motion-reduce:transition-none ${
              previewDevice === 'mobile'
                ? 'h-[640px] w-[360px] max-w-full rounded-[36px]'
                : 'h-[620px] w-full max-w-[900px] rounded-[28px]'
            }`}
            style={{
              backgroundColor: reconciledManifest.theme.surfaceColor,
              borderRadius: previewDevice === 'mobile'
                ? Math.max(24, reconciledManifest.theme.radius + 10)
                : reconciledManifest.theme.radius,
              color: reconciledManifest.theme.textColor,
              fontFamily: previewFont,
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-black/5">
              <div
                className="h-full transition-[width] duration-300 motion-reduce:transition-none"
                style={{
                  width: `${progress}%`,
                  backgroundColor: reconciledManifest.theme.accentColor,
                }}
              />
            </div>

            {reconciledManifest.layout === 'split' && previewDevice === 'desktop' && (
              <div
                className="absolute inset-y-0 left-0 hidden w-[38%] overflow-hidden lg:block"
                style={{ backgroundColor: reconciledManifest.theme.primaryColor }}
              >
                <div className="absolute -left-20 top-20 h-56 w-56 rounded-full border border-white/15" />
                <div className="absolute bottom-12 right-8 h-32 w-32 rounded-full bg-white/10 blur-xl" />
                <div className="relative flex h-full flex-col justify-between p-8 text-white">
                  <img
                    src={reconciledManifest.theme.logoUrl && !logoFailed ? reconciledManifest.theme.logoUrl : identraLogo}
                    alt={copy.brandAlt}
                    onError={() => setLogoFailed(true)}
                    className="h-9 w-9 rounded-lg bg-white object-contain p-1"
                  />
                  <p className="text-xs font-semibold text-white/70">{copy.studio.secureSession}</p>
                </div>
              </div>
            )}

            <div
              className={`flex h-full flex-col ${
                reconciledManifest.layout === 'split' && previewDevice === 'desktop'
                  ? 'ml-[38%]'
                  : ''
              }`}
              style={{ padding: previewPadding }}
            >
              <div className="flex items-center justify-between">
                <img
                  src={reconciledManifest.theme.logoUrl && !logoFailed ? reconciledManifest.theme.logoUrl : identraLogo}
                  alt={copy.brandAlt}
                  onError={() => setLogoFailed(true)}
                  className="h-9 w-9 object-contain"
                />
                <span className="rounded-full bg-black/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide opacity-60">
                  {screenIndex + 1}/{reconciledManifest.screens.length}
                </span>
              </div>

              <div className={`flex flex-1 flex-col justify-center ${
                reconciledManifest.layout === 'fullscreen' ? 'max-w-2xl' : 'mx-auto w-full max-w-lg'
              }`}>
                <span
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: `${reconciledManifest.theme.primaryColor}14`,
                    color: reconciledManifest.theme.primaryColor,
                    borderRadius: Math.max(10, reconciledManifest.theme.radius * 0.7),
                  }}
                >
                  {selectedScreen?.kind === 'success'
                    ? <Check className="h-6 w-6" />
                    : selectedScreen?.kind === 'error'
                      ? <X className="h-6 w-6" />
                      : <ShieldCheck className="h-6 w-6" />}
                </span>
                <h2 className={`${previewDevice === 'mobile' ? 'text-2xl' : 'text-3xl'} font-bold leading-tight`}>
                  {previewTitle}
                </h2>
                <p className="mt-4 text-sm leading-6 opacity-65">{previewBody}</p>
                <button
                  type="button"
                  className="mt-8 w-full px-5 py-3 text-sm font-bold text-white shadow-lg"
                  style={{
                    backgroundColor: reconciledManifest.theme.primaryColor,
                    borderRadius: reconciledManifest.theme.radius * 0.65,
                  }}
                >
                  {previewAction}
                </button>
              </div>

              <p className="text-center text-[9px] font-semibold opacity-40">{copy.studio.poweredBy}</p>
            </div>
          </div>
        </section>
      </div>

      {exportState !== 'idle' && exportState !== 'exporting' && (
        <div
          role="status"
          className={`fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-2 rounded-xl px-4 py-3 text-xs font-bold text-white shadow-2xl ${
            exportState === 'success' ? 'bg-emerald-600' : 'bg-amber-600'
          }`}
        >
          {exportState === 'success' ? <Check className="h-4 w-4" /> : <CircleAlert className="h-4 w-4" />}
          {exportState === 'success' ? copy.studio.exportSuccess : copy.studio.exportBlocked}
        </div>
      )}
    </div>
  );
}
