/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Braces,
  Check,
  CheckCircle2,
  ChevronDown,
  Code,
  Component,
  Copy,
  Cpu,
  Eye,
  FileCheck,
  FileCheck2,
  GitBranch,
  Globe,
  Globe2,
  Languages,
  Layers,
  LayoutDashboard,
  Monitor,
  Network,
  Palette,
  Phone,
  RefreshCw,
  Route,
  Scan,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tablet,
  Type,
  UserCheck,
  Wand2,
  Workflow,
  XCircle,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  INTERFACE_STUDIO_BENEFIT_IDS,
  INTERFACE_STUDIO_FAQ_IDS,
  INTERFACE_STUDIO_SCREEN_IDS,
  INTERFACE_STUDIO_STAGE_IDS,
  INTERFACE_STUDIO_TRANSLATIONS,
} from '../translations/InterfaceStudioPageTranslations';
import type {
  InterfaceStudioBenefitId,
  InterfaceStudioPageCopy,
  InterfaceStudioScreenId,
  InterfaceStudioStageId,
} from '../translations/InterfaceStudioPageTranslations';
import type { AppView } from '../types/routes';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import TechGridBg from './TechGridBg';

interface InterfaceStudioPageProps {
  readonly onViewChange: (view: AppView) => void;
}

type PreviewDevice = 'mobile' | 'tablet' | 'desktop';
type BrandPreset = 'fintech' | 'crypto' | 'retail';
type BorderRadiusOption = 'sharp' | 'rounded' | 'pill';

interface StudioEditorState {
  brandColor: string;
  borderRadius: BorderRadiusOption;
  showLogo: boolean;
  fontFamily: string;
  themeMode: 'light' | 'dark';
  currentScreen: InterfaceStudioScreenId;
  device: PreviewDevice;
  preset: BrandPreset;
}

const BENEFIT_ICONS: Record<InterfaceStudioBenefitId, LucideIcon> = {
  compose: Blocks,
  personalize: Wand2,
  adapt: Globe2,
  release: ShieldCheck,
};

const DEVICE_WIDTHS: Record<PreviewDevice, string> = {
  mobile: 'max-w-[320px]',
  tablet: 'max-w-[420px]',
  desktop: 'max-w-[540px]',
};

const SDK_SYNTAX = {
  importKeyword: 'import',
  namedExport: '{ IdentraVerifySDK }',
  packageImport: "from '@identra/sdk';",
  componentOpen: '<IdentraVerifySDK',
  brandColorProp: 'brandColor=',
  borderRadiusProp: 'borderRadius=',
  showLogoProp: 'showLogo={',
  themeProp: 'theme=',
  componentClose: '/>',
  brandToken: '--brand-primary:',
  cornerToken: '--corner-radius:',
} as const;

function InteractiveStudioWorkspace({ copy }: { readonly copy: InterfaceStudioPageCopy }) {
  const [editorState, setEditorState] = useState<StudioEditorState>({
    brandColor: '#354CE1',
    borderRadius: 'rounded',
    showLogo: true,
    fontFamily: 'Space Grotesk',
    themeMode: 'light',
    currentScreen: 'welcome',
    device: 'mobile',
    preset: 'fintech',
  });

  const [copiedCode, setCopiedCode] = useState(false);
  const workspaceCopy = copy.hero.workspace;

  const applyPreset = (preset: BrandPreset) => {
    if (preset === 'fintech') {
      setEditorState((prev) => ({
        ...prev,
        preset: 'fintech',
        brandColor: '#354CE1',
        borderRadius: 'rounded',
        themeMode: 'light',
        fontFamily: 'Space Grotesk',
      }));
    } else if (preset === 'crypto') {
      setEditorState((prev) => ({
        ...prev,
        preset: 'crypto',
        brandColor: '#00D4B2',
        borderRadius: 'pill',
        themeMode: 'dark',
        fontFamily: 'Inter',
      }));
    } else {
      setEditorState((prev) => ({
        ...prev,
        preset: 'retail',
        brandColor: '#10B981',
        borderRadius: 'rounded',
        themeMode: 'light',
        fontFamily: 'Plus Jakarta Sans',
      }));
    }
  };

  const handleCopyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getRadiusClass = (opt: BorderRadiusOption) => {
    if (opt === 'sharp') return 'rounded-none';
    if (opt === 'pill') return 'rounded-full';
    return 'rounded-xl';
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 text-left shadow-2xl shadow-[#0F1E36]/10 backdrop-blur-md">
      {/* Top Workspace Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 rounded-full bg-[#354CE1] animate-ping" />
          <span className="type-label uppercase text-[#354CE1]">
            {workspaceCopy.title}
          </span>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="type-label hidden uppercase text-slate-500 sm:inline">
            {workspaceCopy.presetsLabel}
          </span>
          <div className="flex rounded-lg bg-slate-200/70 p-0.5">
            {[
              { id: 'fintech', label: workspaceCopy.presets.fintech },
              { id: 'crypto', label: workspaceCopy.presets.crypto },
              { id: 'retail', label: workspaceCopy.presets.retail },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p.id as BrandPreset)}
                className={`type-control-compact cursor-pointer rounded-md px-2.5 py-1 transition-all ${
                  editorState.preset === p.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 rounded-lg bg-slate-200/70 p-0.5">
          {[
            { id: 'mobile', icon: Smartphone, label: copy.hero.devices.mobile },
            { id: 'tablet', icon: Tablet, label: copy.hero.devices.tablet },
            { id: 'desktop', icon: Monitor, label: copy.hero.devices.desktop },
          ].map((d) => {
            const IconComp = d.icon;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setEditorState((prev) => ({ ...prev, device: d.id as PreviewDevice }))}
                className={`rounded-md p-1.5 transition-all cursor-pointer ${
                  editorState.device === d.id
                    ? 'bg-white text-[#354CE1] shadow-xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title={d.label}
              >
                <IconComp className="h-3.5 w-3.5" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid Layout (Controls | Live Canvas | Code Inspector) */}
      <div className="grid grid-cols-1 divide-y divide-slate-100 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        {/* Left Column: Design Controls */}
        <div className="p-5 lg:col-span-3 space-y-5 bg-slate-50/50">
          <div>
            <label className="type-label-compact mb-2 block uppercase text-slate-400">
              {workspaceCopy.brandColorLabel}
            </label>
            <div className="flex flex-wrap gap-2">
              {['#354CE1', '#5F3CF3', '#00D4B2', '#10B981', '#F59E0B', '#EF4444'].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setEditorState((prev) => ({ ...prev, brandColor: color }))}
                  className={`h-7 w-7 rounded-full border-2 transition-all cursor-pointer ${
                    editorState.brandColor === color ? 'border-slate-900 scale-110 shadow-sm' : 'border-white'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="type-label-compact mb-2 block uppercase text-slate-400">
              {workspaceCopy.cornerStyleLabel}
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-200/60 p-1 rounded-xl">
              {[
                { id: 'sharp', label: workspaceCopy.cornerStyles.sharp },
                { id: 'rounded', label: workspaceCopy.cornerStyles.rounded },
                { id: 'pill', label: workspaceCopy.cornerStyles.pill },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setEditorState((prev) => ({ ...prev, borderRadius: opt.id as BorderRadiusOption }))}
                  className={`type-control-compact cursor-pointer rounded-lg py-1.5 transition-all ${
                    editorState.borderRadius === opt.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="type-label-compact mb-2 block uppercase text-slate-400">
              {workspaceCopy.screenStepLabel}
            </label>
            <div className="space-y-1">
              {INTERFACE_STUDIO_SCREEN_IDS.map((screenId, idx) => (
                <button
                  key={screenId}
                  type="button"
                  onClick={() => setEditorState((prev) => ({ ...prev, currentScreen: screenId }))}
                  className={`type-control-compact flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 transition-all ${
                    editorState.currentScreen === screenId
                      ? 'bg-[#EEF1FF] text-[#354CE1]'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>0{idx + 1}. {copy.hero.screens[screenId].label}</span>
                  {editorState.currentScreen === screenId && <Check className="h-3.5 w-3.5 text-[#354CE1]" />}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
            <span className="type-control-compact text-slate-700">{workspaceCopy.displayLogoLabel}</span>
            <button
              type="button"
              onClick={() => setEditorState((prev) => ({ ...prev, showLogo: !prev.showLogo }))}
              className={`h-5 w-9 rounded-full transition-colors p-0.5 cursor-pointer ${
                editorState.showLogo ? 'bg-[#354CE1]' : 'bg-slate-300'
              }`}
            >
              <div className={`h-4 w-4 rounded-full bg-white transition-transform ${editorState.showLogo ? 'translate-x-4' : ''}`} />
            </button>
          </div>
        </div>

        {/* Center Column: Live Device Canvas */}
        <div className="p-6 md:p-12 lg:col-span-6 flex flex-col items-center justify-center bg-slate-100/60 min-h-[620px] lg:min-h-[720px]">
          <div className="text-center mb-4">
            <span className="type-technical uppercase text-slate-400">
              {workspaceCopy.liveCanvasLabel} ({editorState.themeMode === 'dark'
                ? workspaceCopy.darkModeLabel
                : workspaceCopy.lightModeLabel})
            </span>
          </div>

          {/* Render Mobile/Tablet/Desktop Screen */}
          <div
            className={`w-full ${DEVICE_WIDTHS[editorState.device]} transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden border ${
              editorState.themeMode === 'dark' ? 'bg-[#0F1E36] text-white border-slate-800' : 'bg-white text-slate-900 border-slate-200'
            }`}
          >
            {/* Screen Header Bar */}
            <div className={`p-4 sm:p-5 flex items-center justify-between border-b ${editorState.themeMode === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
              {editorState.showLogo ? (
                <div className="flex items-center gap-2">
                  <span className="type-label flex h-6 w-6 items-center justify-center rounded-lg text-white" style={{ backgroundColor: editorState.brandColor }}>
                    ID
                  </span>
                  <span className="type-brand-wordmark">IDENTRA</span>
                </div>
              ) : (
                <span className="type-label opacity-60">{workspaceCopy.fallbackBrandLabel}</span>
              )}
              <span className="type-technical opacity-50">
                {workspaceCopy.stepLabel} {copy.hero.screens[editorState.currentScreen].label}
              </span>
            </div>

            {/* Screen Content Body */}
            <div className="p-7 sm:p-9 space-y-6 min-h-[440px] flex flex-col justify-center">
              {editorState.currentScreen === 'welcome' && (
                <>
                  <div className="flex justify-center my-2">
                    <div className="h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: editorState.brandColor }}>
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                  </div>
                  <h4 className="type-card-title-sm text-center">
                    {copy.hero.screens.welcome.title}
                  </h4>
                  <p className="type-body-sm text-center opacity-70">
                    {copy.hero.screens.welcome.body}
                  </p>
                  <button
                    type="button"
                    className={`type-control w-full py-2.5 text-white shadow-md transition-all ${getRadiusClass(editorState.borderRadius)}`}
                    style={{ backgroundColor: editorState.brandColor }}
                  >
                    {copy.hero.screens.welcome.action}
                  </button>
                </>
              )}

              {editorState.currentScreen === 'consent' && (
                <>
                  <h4 className="type-card-title-sm">{copy.hero.screens.consent.title}</h4>
                  <p className="type-body-sm opacity-70">
                    {copy.hero.screens.consent.body}
                  </p>
                  <div className="type-body-sm space-y-1.5 rounded-xl border border-slate-500/20 bg-slate-500/10 p-3">
                    {workspaceCopy.securityItems.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className={`type-control w-full py-2.5 text-white shadow-md ${getRadiusClass(editorState.borderRadius)}`}
                    style={{ backgroundColor: editorState.brandColor }}
                  >
                    {copy.hero.screens.consent.action}
                  </button>
                </>
              )}

              {editorState.currentScreen === 'verification' && (
                <>
                  <h4 className="type-card-title-sm">{copy.hero.screens.verification.title}</h4>
                  <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-2">
                    <Scan className="h-8 w-8 mx-auto text-slate-400 animate-pulse" />
                    <p className="type-body-sm font-semibold">{workspaceCopy.scanInstruction}</p>
                  </div>
                  <button
                    type="button"
                    className={`type-control w-full py-2.5 text-white shadow-md ${getRadiusClass(editorState.borderRadius)}`}
                    style={{ backgroundColor: editorState.brandColor }}
                  >
                    {copy.hero.screens.verification.action}
                  </button>
                </>
              )}

              {editorState.currentScreen === 'success' && (
                <>
                  <div className="flex justify-center my-2">
                    <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                  </div>
                  <h4 className="type-card-title-sm text-center">{copy.hero.screens.success.title}</h4>
                  <p className="type-body-sm text-center opacity-70">
                    {copy.hero.screens.success.body}
                  </p>
                  <button
                    type="button"
                    className={`type-control w-full py-2.5 text-white shadow-md ${getRadiusClass(editorState.borderRadius)}`}
                    style={{ backgroundColor: editorState.brandColor }}
                  >
                    {copy.hero.screens.success.action}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Code & Design Token Export */}
        <div className="type-technical space-y-4 bg-slate-900 p-5 text-white lg:col-span-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="type-label-compact flex items-center gap-1.5 uppercase text-slate-400">
              <Code className="h-3.5 w-3.5 text-[#00D4B2]" />
              {workspaceCopy.codePanelLabel}
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="type-control-compact flex cursor-pointer items-center gap-1 text-[#00D4B2] hover:underline"
            >
              <Copy className="h-3 w-3" />
              {copiedCode ? workspaceCopy.copiedLabel : workspaceCopy.copyLabel}
            </button>
          </div>

          <div className="type-technical space-y-1 overflow-x-auto rounded-xl bg-slate-950 p-3 text-slate-300">
            <p className="text-slate-500">{workspaceCopy.generatedCodeComment}</p>
            <p className="text-[#00D4B2]">
              {SDK_SYNTAX.importKeyword}{' '}
              <span className="text-white">{SDK_SYNTAX.namedExport}</span>{' '}
              {SDK_SYNTAX.packageImport}
            </p>
            <br />
            <p className="text-purple-400">{SDK_SYNTAX.componentOpen}</p>
            <p className="pl-4 text-slate-300">
              {SDK_SYNTAX.brandColorProp}
              <span className="text-amber-300">&quot;{editorState.brandColor}&quot;</span>
            </p>
            <p className="pl-4 text-slate-300">
              {SDK_SYNTAX.borderRadiusProp}
              <span className="text-amber-300">&quot;{editorState.borderRadius}&quot;</span>
            </p>
            <p className="pl-4 text-slate-300">
              {SDK_SYNTAX.showLogoProp}
              <span className="text-blue-400">{String(editorState.showLogo)}</span>
              {'}'}
            </p>
            <p className="pl-4 text-slate-300">
              {SDK_SYNTAX.themeProp}
              <span className="text-amber-300">&quot;{editorState.themeMode}&quot;</span>
            </p>
            <p className="text-purple-400">{SDK_SYNTAX.componentClose}</p>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="type-label-compact block uppercase text-slate-400">
              {workspaceCopy.cssVariablesLabel}
            </span>
            <div className="type-technical space-y-1 text-slate-400">
              <p>
                {SDK_SYNTAX.brandToken}{' '}
                <span className="text-emerald-400">{editorState.brandColor}</span>;
              </p>
              <p>
                {SDK_SYNTAX.cornerToken}{' '}
                <span className="text-emerald-400">
                  {editorState.borderRadius === 'pill' ? '999px' : editorState.borderRadius === 'rounded' ? '12px' : '0px'}
                </span>;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const STAGE_ICONS: Record<InterfaceStudioStageId, LucideIcon> = {
  connect: Network,
  build: Component,
  localize: Languages,
  validate: FileCheck2,
};

const STAGE_STYLES: Record<
  InterfaceStudioStageId,
  {
    readonly icon: string;
    readonly soft: string;
    readonly badge: string;
  }
> = {
  connect: {
    icon: 'text-[#354CE1]',
    soft: 'bg-[#EEF1FF]',
    badge: 'bg-[#EEF1FF] text-[#354CE1]',
  },
  build: {
    icon: 'text-violet-700',
    soft: 'bg-violet-50',
    badge: 'bg-violet-50 text-violet-700',
  },
  localize: {
    icon: 'text-cyan-700',
    soft: 'bg-cyan-50',
    badge: 'bg-cyan-50 text-cyan-700',
  },
  validate: {
    icon: 'text-emerald-700',
    soft: 'bg-emerald-50',
    badge: 'bg-emerald-50 text-emerald-700',
  },
};

function StageVisual({
  stageId,
  stage,
}: {
  readonly stageId: InterfaceStudioStageId;
  readonly stage: InterfaceStudioPageCopy['workflow']['stages'][InterfaceStudioStageId];
}) {
  const style = STAGE_STYLES[stageId];

  if (stageId === 'connect') {
    return (
      <div className="rounded-[1.75rem] bg-slate-50 p-5 shadow-lg shadow-[#0F1E36]/5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="type-label uppercase text-slate-400">
            {stage.visualTitle}
          </p>
          <span className={`type-caption rounded-full px-2.5 py-1 font-semibold ${style.badge}`}>
            {stage.visualStatus}
          </span>
        </div>
        <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="space-y-2">
            {stage.visualItems.slice(0, 2).map((item, index) => (
              <div
                key={item}
                className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200/60"
              >
                <span className="type-caption flex items-center gap-2 font-semibold text-[#0F1E36]">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      index === 0 ? 'bg-[#354CE1]' : 'bg-violet-500'
                    }`}
                  />
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center text-[#354CE1]">
            <span className="h-px w-3 bg-[#354CE1]/30 sm:w-5" />
            <RefreshCw className="h-5 w-5" aria-hidden="true" />
            <span className="h-px w-3 bg-[#354CE1]/30 sm:w-5" />
          </div>
          <div className="rounded-2xl bg-[#0F1E36] p-4 text-white shadow-md">
            <LayoutDashboard className="h-5 w-5 text-[#8D9AFF]" aria-hidden="true" />
            <p className="type-caption mt-3 font-semibold">
              {stage.visualItems[2]}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (stageId === 'build') {
    return (
      <div className="rounded-[1.75rem] bg-slate-50 p-5 shadow-lg shadow-[#0F1E36]/5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="type-label uppercase text-slate-400">
            {stage.visualTitle}
          </p>
          <span className={`type-caption rounded-full px-2.5 py-1 font-semibold ${style.badge}`}>
            {stage.visualStatus}
          </span>
        </div>
        <div className="mt-5 space-y-2.5">
          {stage.visualItems.map((item, index) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200/60"
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${style.soft} ${style.icon}`}>
                {index === 0 ? (
                  <Type className="h-4 w-4" aria-hidden="true" />
                ) : index === 1 ? (
                  <Braces className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Route className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
              <span className="type-caption min-w-0 font-semibold text-[#0F1E36]">
                {item}
              </span>
              <span className="ml-auto h-2 w-8 rounded-full bg-slate-100" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stageId === 'localize') {
    return (
      <div className="rounded-[1.75rem] bg-slate-50 p-5 shadow-lg shadow-[#0F1E36]/5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="type-label uppercase text-slate-400">
            {stage.visualTitle}
          </p>
          <span className={`type-caption rounded-full px-2.5 py-1 font-semibold ${style.badge}`}>
            {stage.visualStatus}
          </span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {stage.visualItems.map((item, index) => (
            <div
              key={item}
              className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200/60"
            >
              {index === 0 ? (
                <Languages className="mx-auto h-5 w-5 text-cyan-700" aria-hidden="true" />
              ) : index === 1 ? (
                <Smartphone className="mx-auto h-5 w-5 text-cyan-700" aria-hidden="true" />
              ) : (
                <Palette className="mx-auto h-5 w-5 text-cyan-700" aria-hidden="true" />
              )}
              <p className="type-caption mt-3 font-semibold text-[#0F1E36]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.75rem] bg-slate-50 p-5 shadow-lg shadow-[#0F1E36]/5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="type-label uppercase text-slate-400">
          {stage.visualTitle}
        </p>
        <span className={`type-caption rounded-full px-2.5 py-1 font-semibold ${style.badge}`}>
          {stage.visualStatus}
        </span>
      </div>
      <div className="mt-5 space-y-2.5">
        {stage.visualItems.map((item, index) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200/60"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="type-caption min-w-0 font-semibold text-[#0F1E36]">
              {item}
            </span>
            <span className="type-technical ml-auto text-slate-400" aria-hidden="true">
              0{index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InterfaceStudioPage({ onViewChange }: InterfaceStudioPageProps) {
  const { language } = useLanguage();
  const copy = getLocalizedRecord(
    INTERFACE_STUDIO_TRANSLATIONS,
    language,
    'INTERFACE_STUDIO_TRANSLATIONS',
  );
  const [expandedFaq, setExpandedFaq] = useState<
    (typeof INTERFACE_STUDIO_FAQ_IDS)[number] | null
  >(INTERFACE_STUDIO_FAQ_IDS[0]);
  const [activeScreenTab, setActiveScreenTab] =
    useState<InterfaceStudioScreenId>('welcome');
  const showLegacySections = false;

  return (
    <main
      id="interface-studio-page-root"
      className="min-h-screen overflow-hidden bg-[#FAFBFD] text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pb-24 pt-16 md:pb-32 md:pt-20">
        <TechGridBg />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-[#354CE1]/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-[#5B6DFF]/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div>
            {/* Header Title Block - Centered */}
            <div className="stack-hero">
              <h1 className="type-page-title mx-auto max-w-5xl text-balance text-slate-900">
                <span className="block md:whitespace-nowrap">
                  {copy.hero.titleLines[0]}
                </span>
                <span className="block bg-gradient-to-r from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] bg-clip-text text-transparent md:whitespace-nowrap">
                  {copy.hero.titleLines[1]}
                </span>
              </h1>

              <p className="type-lead measure-lead mx-auto text-slate-600">
                <span className="block md:whitespace-nowrap">
                  {copy.hero.descriptionLines[0]}
                </span>
                <span className="block md:whitespace-nowrap">
                  {copy.hero.descriptionLines[1]}
                </span>
              </p>

              <div className="flex flex-col items-center justify-center gap-3.5 pt-2 sm:flex-row sm:gap-6">
                <button
                  id="interface-studio-open-dashboard"
                  type="button"
                  onClick={() => onViewChange('dashboard')}
                  className="type-control inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#354CE1] px-7 py-3 text-white shadow-lg shadow-[#354CE1]/20 transition-all hover:scale-[1.02] hover:bg-[#283DBF]"
                >
                  {copy.hero.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  id="interface-studio-contact"
                  type="button"
                  onClick={() => onViewChange('contact')}
                  className="type-control inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white px-7 py-3 text-slate-800 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  {copy.hero.secondaryCta}
                </button>
              </div>
            </div>

            {/* Hero Studio Interactive Workspace Component */}
            <div className="mt-16 md:mt-24">
              <InteractiveStudioWorkspace copy={copy} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F6FA] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="type-label uppercase text-[#354CE1]">
              {copy.benefits.eyebrow}
            </p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36]">
              {copy.benefits.title}
            </h2>
            <p className="type-body mt-5 text-slate-600">
              {copy.benefits.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {INTERFACE_STUDIO_BENEFIT_IDS.map((benefitId) => {
              const Icon = BENEFIT_ICONS[benefitId];
              const benefit = copy.benefits.items[benefitId];

              return (
                <article
                  key={benefitId}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-7 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#354CE1]/30 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#354CE1]/5 blur-2xl transition-all group-hover:bg-[#354CE1]/15"
                    aria-hidden="true"
                  />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#354CE1] transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="type-card-title relative mt-6 font-bold text-[#0F1E36]">
                    {benefit.title}
                  </h3>
                  <p className="type-body-sm relative mt-3 leading-relaxed text-slate-600">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="type-label uppercase text-[#354CE1]">
              {copy.workflow.eyebrow}
            </p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36]">
              {copy.workflow.title}
            </h2>
            <p className="type-body mx-auto mt-5 max-w-3xl text-slate-600">
              {copy.workflow.description}
            </p>
          </div>

          <div className="mt-14 space-y-8 lg:space-y-10">
            {INTERFACE_STUDIO_STAGE_IDS.map((stageId, index) => {
              const stage = copy.workflow.stages[stageId];
              const Icon = STAGE_ICONS[stageId];
              const style = STAGE_STYLES[stageId];
              const visualFirst = index % 2 === 1;

              return (
                <article
                  key={stageId}
                  className="grid items-center gap-8 rounded-[2rem] bg-[#FAFBFD] p-6 shadow-sm shadow-[#0F1E36]/5 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10"
                >
                  <div className={visualFirst ? 'lg:order-2' : undefined}>
                    <div className="flex items-center gap-4">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.soft} ${style.icon}`}>
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <p className="type-label uppercase text-slate-500">
                        0{index + 1} / {stage.eyebrow}
                      </p>
                    </div>
                    <h3 className="type-section-title-compact mt-6 text-[#0F1E36]">
                      {stage.title}
                    </h3>
                    <p className="type-body mt-4 leading-relaxed text-slate-600">
                      {stage.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {stage.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${style.soft} ${style.icon}`}>
                            <Check className="h-3 w-3" aria-hidden="true" />
                          </span>
                          <span className="type-body-sm leading-relaxed text-slate-600">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={visualFirst ? 'lg:order-1' : undefined}>
                    <StageVisual stageId={stageId} stage={stage} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#5B6DFF] py-20 text-white lg:py-28">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#354CE1]/45 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="type-label inline-flex rounded-full bg-white/12 px-3.5 py-2 uppercase text-white ring-1 ring-white/20">
              {copy.sync.ecosystemLabel}
            </span>
            <p className="type-label mt-6 uppercase text-white/70">
              {copy.sync.eyebrow}
            </p>
            <h2 className="type-section-title mt-4 text-balance text-white">
              {copy.sync.title}
            </h2>
            <p className="type-body mx-auto mt-5 max-w-3xl text-white/80">
              {copy.sync.description}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
            <article className="rounded-[1.75rem] bg-white p-7 text-[#0F1E36] shadow-xl shadow-[#354CE1]/15">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#354CE1]">
                <Network className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="type-label mt-6 uppercase text-[#354CE1]">
                {copy.sync.flowLabel}
              </p>
              <h3 className="type-card-title mt-2">
                {copy.sync.flowTitle}
              </h3>
              <p className="type-body-sm mt-3 leading-relaxed text-slate-600">
                {copy.sync.flowDescription}
              </p>
              <button
                type="button"
                onClick={() => onViewChange('dynamic-flow')}
                className="type-control mt-6 inline-flex items-center gap-2 font-semibold text-[#354CE1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
              >
                {copy.sync.flowCta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </article>

            <div className="flex items-center justify-center py-1 lg:py-0">
              <span className="type-caption inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 font-semibold text-[#354CE1] shadow-lg">
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {copy.sync.connectionLabel}
              </span>
            </div>

            <article className="rounded-[1.75rem] bg-[#0F1E36] p-7 text-white shadow-xl shadow-[#354CE1]/15 ring-1 ring-white/10">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#AAB3FF]">
                <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="type-label mt-6 uppercase text-[#AAB3FF]">
                {copy.sync.studioLabel}
              </p>
              <h3 className="type-card-title mt-2">
                {copy.sync.studioTitle}
              </h3>
              <p className="type-body-sm mt-3 leading-relaxed text-white/70">
                {copy.sync.studioDescription}
              </p>
              <button
                type="button"
                onClick={() => onViewChange('dashboard')}
                className="type-control mt-6 inline-flex items-center gap-2 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {copy.sync.studioCta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="type-label uppercase text-[#354CE1]">
              {copy.quality.eyebrow}
            </p>
            <h2 className="type-section-title mt-4 text-balance text-[#0F1E36]">
              {copy.quality.title}
            </h2>
            <p className="type-body mt-5 text-slate-600">
              {copy.quality.description}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {copy.quality.items.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] bg-[#FAFBFD] p-7 shadow-sm shadow-[#0F1E36]/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#354CE1]">
                    {index === 0 ? (
                      <ScanSearch className="h-5 w-5" aria-hidden="true" />
                    ) : index === 1 ? (
                      <Layers className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                  <span className="type-technical text-slate-400" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="type-card-title mt-6 text-[#0F1E36]">
                  {item.title}
                </h3>
                <p className="type-body-sm mt-3 leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="type-label uppercase text-[#354CE1]">
              {copy.faq.eyebrow}
            </p>
            <h2 className="type-section-title-compact mt-4 text-balance text-[#0F1E36]">
              {copy.faq.title}
            </h2>
            <p className="type-body mt-4 leading-relaxed text-slate-600">
              {copy.faq.description}
            </p>
          </div>

          <div className="lg:col-span-8">
            {INTERFACE_STUDIO_FAQ_IDS.map((faqId) => {
              const item = copy.faq.items[faqId];
              const isOpen = expandedFaq === faqId;
              const buttonId = `interface-studio-faq-button-${faqId}`;
              const panelId = `interface-studio-faq-panel-${faqId}`;

              return (
                <div
                  key={faqId}
                  className="border-b border-slate-200/80 py-2 last:border-b-0"
                >
                  <h3 className="type-card-title">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpandedFaq(isOpen ? null : faqId)}
                      className="flex w-full items-center justify-between gap-5 py-4 text-left text-[#0F1E36] transition-colors hover:text-[#354CE1] motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354CE1]"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 motion-reduce:transition-none ${
                          isOpen ? 'rotate-180 text-[#354CE1]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="pb-6"
                    >
                      <p className="type-body max-w-3xl leading-relaxed text-slate-600">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FAFBFD] pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#5B6DFF] px-7 py-10 text-white shadow-xl shadow-[#354CE1]/15 sm:px-10 lg:px-14 lg:py-14">
            <div
              className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative max-w-3xl">
              <p className="type-label uppercase text-white/75">
                {copy.cta.eyebrow}
              </p>
              <h2 className="type-section-title mt-4 text-balance text-white">
                {copy.cta.title}
              </h2>
              <p className="type-body mt-5 max-w-2xl text-white/80">
                {copy.cta.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  id="interface-studio-restored-cta-dashboard"
                  type="button"
                  onClick={() => onViewChange('dashboard')}
                  className="type-control inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-[#354CE1] shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {copy.cta.primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  id="interface-studio-restored-cta-contact"
                  type="button"
                  onClick={() => onViewChange('contact')}
                  className="type-control inline-flex min-h-12 items-center justify-center rounded-full bg-white/10 px-7 py-3.5 font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/15 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {copy.cta.secondaryCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showLegacySections && (
        <>
      {/* Screen Gallery & Interactive Preview Showcase */}
      <section className="bg-white py-20 lg:py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="type-label uppercase text-[#354CE1] bg-[#EEF1FF] px-3.5 py-1.5 rounded-full font-bold text-xs">
              {copy.hero.gallery.eyebrow}
            </span>
            <h2 className="type-section-title mt-4 text-slate-900 font-bold">
              {copy.hero.gallery.title}
            </h2>
            <p className="type-body mt-4 text-slate-600">
              {copy.hero.gallery.description}
            </p>

            {/* Screen Tabs */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-4">
              {INTERFACE_STUDIO_SCREEN_IDS.map((screenId) => {
                const isSelected = activeScreenTab === screenId;
                const scr = copy.hero.screens[screenId];
                return (
                  <button
                    key={screenId}
                    type="button"
                    onClick={() => setActiveScreenTab(screenId)}
                    className={`type-control rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#354CE1] text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {scr.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Screen Tab Detail */}
          {(() => {
            const screenId = activeScreenTab;
            const scr = copy.hero.screens[screenId];

            return (
              <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 bg-[#FAFBFD] p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-sm">
                <div className="lg:col-span-6 space-y-4">
                  <span className="type-label uppercase text-[#354CE1] font-bold text-xs bg-[#EEF1FF] px-3 py-1 rounded-full">
                    {scr.label} {copy.hero.gallery.screenModelLabel}
                  </span>
                  <h3 className="type-section-title-compact text-slate-900 font-bold">
                    {scr.title}
                  </h3>
                  <p className="type-body text-slate-600 leading-relaxed">
                    {scr.body}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onViewChange('dashboard')}
                      className="type-control inline-flex items-center gap-2 text-xs font-bold text-[#354CE1] hover:underline cursor-pointer"
                    >
                      {scr.action}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold text-slate-900">
                        {copy.hero.gallery.previewBrandLabel}
                      </span>
                      <span className="type-caption-compact bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                        {copy.hero.gallery.previewStatus}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                      <h4 className="text-sm font-bold text-slate-900">{scr.title}</h4>
                      <p className="text-xs text-slate-600">{scr.body}</p>
                    </div>
                    <button type="button" className="w-full py-2.5 rounded-xl bg-[#354CE1] text-white text-xs font-bold shadow-md">
                      {scr.action}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Core Studio Capabilities Matrix */}
      <section className="bg-[#FAFBFD] py-20 lg:py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="type-label uppercase text-[#354CE1] bg-[#EEF1FF] px-3.5 py-1.5 rounded-full font-bold text-xs">
              {copy.benefits.eyebrow}
            </span>
            <h2 className="type-section-title mt-4 text-slate-900 font-bold">
              {copy.benefits.title}
            </h2>
            <p className="type-body mt-4 text-slate-600 leading-relaxed">
              {copy.benefits.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {INTERFACE_STUDIO_BENEFIT_IDS.map((benefitId) => {
              const Icon = BENEFIT_ICONS[benefitId];
              const benefit = copy.benefits.items[benefitId];

              return (
                <article
                  key={benefitId}
                  className="rounded-3xl border border-slate-200/70 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#354CE1]/40 hover:shadow-xl hover:shadow-[#354CE1]/5 group"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#354CE1] group-hover:bg-[#354CE1] group-hover:text-white transition-colors duration-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="type-card-title mt-6 text-slate-900 font-bold">{benefit.title}</h3>
                  <p className="type-body-sm mt-3 text-slate-600 leading-relaxed">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* UI Development Comparison Matrix (Hardcoded Frontend vs Identra Studio) */}
      <section className="bg-white py-20 lg:py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="type-label uppercase text-[#354CE1] bg-[#EEF1FF] px-3.5 py-1.5 rounded-full font-bold text-xs">
              {copy.comparison.eyebrow}
            </span>
            <h2 className="type-section-title mt-4 text-slate-900 font-bold">
              {copy.comparison.title}
            </h2>
            <p className="type-body mt-4 text-slate-600">
              {copy.comparison.description}
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Hardcoded Dev Card */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="type-card-title text-slate-700 font-bold">
                  {copy.comparison.traditionalTitle}
                </h3>
                <XCircle className="h-6 w-6 text-rose-500" />
              </div>
              <ul className="mt-6 space-y-4 text-sm text-slate-600">
                {copy.comparison.traditionalItems.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                    <span><strong>{item.title}:</strong> {item.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Identra Studio Card */}
            <div className="rounded-3xl border-2 border-[#354CE1] bg-white p-8 shadow-xl shadow-[#354CE1]/10 relative">
              <div className="type-label-compact absolute -top-3.5 left-8 bg-[#354CE1] text-white font-bold px-3 py-1 rounded-full uppercase">
                {copy.comparison.solutionBadge}
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="type-card-title text-[#354CE1] font-bold">
                  {copy.comparison.studioTitle}
                </h3>
                <CheckCircle2 className="h-6 w-6 text-[#354CE1]" />
              </div>
              <ul className="mt-6 space-y-4 text-sm text-slate-800">
                {copy.comparison.studioItems.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-600 shrink-0" />
                    <span><strong>{item.title}:</strong> {item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control & Accessibility Section */}
      <section className="bg-[#FAFBFD] py-20 lg:py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <span className="type-label uppercase text-[#354CE1] bg-[#EEF1FF] px-3.5 py-1.5 rounded-full font-bold text-xs">
              {copy.quality.eyebrow}
            </span>
            <h2 className="type-section-title mt-4 text-slate-900 font-bold">
              {copy.quality.title}
            </h2>
            <p className="type-body mt-4 text-slate-600">
              {copy.quality.description}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {copy.quality.items.map((item, idx) => (
              <div key={idx} className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm space-y-3">
                <span className="type-technical text-xs font-mono font-bold text-[#354CE1] bg-[#EEF1FF] px-2.5 py-1 rounded">
                  QC CHECK 0{idx + 1}
                </span>
                <h3 className="type-card-title-sm text-slate-900">{item.title}</h3>
                <p className="type-body-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Synergy Section (Studio + Flow) */}
      <section className="bg-[#EEF1FF] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="type-label text-[#354CE1] bg-white px-3.5 py-1.5 rounded-full font-bold text-xs border border-[#354CE1]/20">
              {copy.sync.ecosystemLabel}
            </span>
            <h2 className="type-section-title mt-4 text-slate-900 font-bold">
              {copy.sync.title}
            </h2>
            <p className="type-body mt-4 text-slate-600 leading-relaxed">
              {copy.sync.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Dynamic Flow Card */}
            <div className="rounded-3xl bg-white p-8 shadow-md border border-slate-200/80">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#354CE1]">
                <Network className="h-6 w-6" />
              </span>
              <p className="type-label mt-6 text-[#354CE1] font-bold">{copy.sync.flowLabel}</p>
              <h3 className="type-card-title mt-2 text-slate-900 font-bold">{copy.sync.flowTitle}</h3>
              <p className="type-body-sm mt-3 text-slate-600">{copy.sync.flowDescription}</p>
              <button
                type="button"
                onClick={() => onViewChange('dynamic-flow')}
                className="mt-6 type-control inline-flex items-center gap-2 text-xs font-bold text-[#354CE1] hover:underline cursor-pointer"
              >
                {copy.sync.flowCta}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Interface Studio Card */}
            <div className="rounded-3xl bg-white p-8 shadow-md border border-slate-200/80">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED]">
                <LayoutDashboard className="h-6 w-6" />
              </span>
              <p className="type-label mt-6 text-[#7C3AED] font-bold">{copy.sync.studioLabel}</p>
              <h3 className="type-card-title mt-2 text-slate-900 font-bold">{copy.sync.studioTitle}</h3>
              <p className="type-body-sm mt-3 text-slate-600">{copy.sync.studioDescription}</p>
              <button
                type="button"
                onClick={() => onViewChange('dashboard')}
                className="mt-6 type-control inline-flex items-center gap-2 text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer"
              >
                {copy.sync.studioCta}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="bg-white py-20 lg:py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4 space-y-4">
              <span className="type-label uppercase text-[#354CE1] bg-[#EEF1FF] px-3.5 py-1.5 rounded-full font-bold text-xs">
                {copy.faq.eyebrow}
              </span>
              <h2 className="type-section-title-compact text-slate-900 font-bold">
                {copy.faq.title}
              </h2>
              <p className="type-body text-slate-600">{copy.faq.description}</p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {INTERFACE_STUDIO_FAQ_IDS.map((faqId) => {
                const item = copy.faq.items[faqId];
                const isOpen = expandedFaq === faqId;
                const buttonId = `interface-studio-faq-button-${faqId}`;
                const panelId = `interface-studio-faq-panel-${faqId}`;

                return (
                  <div key={faqId} className="rounded-2xl border border-slate-200/80 bg-[#FAFBFD] p-5 transition-colors hover:border-slate-300">
                    <h3 className="type-card-title">
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setExpandedFaq(isOpen ? null : faqId)}
                        className="flex w-full items-center justify-between gap-5 text-left text-slate-900 transition-colors hover:text-[#354CE1] cursor-pointer"
                      >
                        <span>{item.question}</span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                            isOpen ? 'rotate-180 text-[#354CE1]' : ''
                          }`}
                        />
                      </button>
                    </h3>
                    {isOpen && (
                      <div id={panelId} role="region" aria-labelledby={buttonId} className="pt-4 border-t border-slate-200/60 mt-3">
                        <p className="type-body text-slate-600 leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FAFBFD] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7C3AED] via-[#354CE1] to-[#0F1E36] px-8 py-14 text-white shadow-2xl sm:px-12 lg:px-16 lg:py-16">
            <div
              className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative max-w-3xl space-y-6">
              <span className="type-label text-white/80 font-bold uppercase text-xs bg-white/10 px-3 py-1 rounded-full border border-white/20">
                {copy.cta.eyebrow}
              </span>
              <h2 className="type-section-title text-white font-bold text-balance">
                {copy.cta.title}
              </h2>
              <p className="type-body text-white/80 leading-relaxed max-w-2xl">
                {copy.cta.description}
              </p>
              <div className="pt-4 flex flex-col gap-4 sm:flex-row">
                <button
                  id="interface-studio-cta-dashboard"
                  type="button"
                  onClick={() => onViewChange('dashboard')}
                  className="type-control inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white hover:bg-slate-50 px-8 py-3.5 text-[#7C3AED] font-bold shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                >
                  {copy.cta.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  id="interface-studio-cta-contact"
                  type="button"
                  onClick={() => onViewChange('contact')}
                  className="type-control inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-8 py-3.5 text-white font-bold border border-white/30 transition-all cursor-pointer"
                >
                  {copy.cta.secondaryCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
      )}
    </main>
  );
}
