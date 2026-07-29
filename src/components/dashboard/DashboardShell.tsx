/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type ReactNode } from 'react';
import {
  Blocks,
  Bot,
  Braces,
  BriefcaseBusiness,
  ChevronRight,
  CircleDot,
  DatabaseZap,
  GitBranch,
  LayoutDashboard,
  Menu,
  Network,
  RadioTower,
  Store,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react';
import { SUPPORTED_LOCALES, type DashboardToolId } from '../../types/routes';
import type { PlatformProductId } from '../../types/platformProducts';
import type { DashboardCopy } from '../../translations/dashboard/DashboardPageTranslations';
import type { Language } from '../../context/LanguageContext';
import { DASHBOARD_PRODUCTS } from './dashboardRegistry';
import identraLogo from '../../assets/images/identra-logo.svg';

const PRODUCT_ICONS: Record<PlatformProductId, LucideIcon> = {
  interfaceStudio: Blocks,
  dynamicFlow: GitBranch,
  relay: RadioTower,
  workflows: Workflow,
  caseManagement: BriefcaseBusiness,
  copilot: Bot,
  passiveSignals: CircleDot,
  graph: Network,
  marketplace: Store,
};

type DashboardShellProps = {
  readonly children: ReactNode;
  readonly copy: DashboardCopy;
  readonly language: Language;
  readonly onLanguageChange: (language: Language) => void;
  readonly activeTool?: DashboardToolId;
  readonly projectName?: string;
  readonly saveStatus?: 'saved' | 'saving' | 'error';
  readonly canOpenTools: boolean;
  readonly onOpenOverview: () => void;
  readonly onOpenTool: (tool: DashboardToolId) => void;
  readonly onBackToSite: () => void;
};

export default function DashboardShell({
  children,
  copy,
  language,
  onLanguageChange,
  activeTool,
  projectName,
  saveStatus = 'saved',
  canOpenTools,
  onOpenOverview,
  onOpenTool,
  onBackToSite,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = (
    <>
      <button
        type="button"
        onClick={() => {
          onOpenOverview();
          setMobileOpen(false);
        }}
        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
          !activeTool
            ? 'bg-[#EEF0FF] text-[#354CE1]'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
        }`}
      >
        <LayoutDashboard className="h-4 w-4" />
        <span>{copy.overviewLabel}</span>
      </button>

      <div className="mt-7 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        {copy.platformToolsLabel}
      </div>
      <div className="mt-2 space-y-1">
        {DASHBOARD_PRODUCTS.map((product) => {
          const Icon = PRODUCT_ICONS[product.id];
          const isActive = product.tool === activeTool;
          const isDisabled = product.status === 'comingSoon'
            || (product.status === 'active' && !canOpenTools);

          return (
            <button
              key={product.id}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (product.tool) onOpenTool(product.tool);
                setMobileOpen(false);
              }}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                isActive
                  ? 'bg-[#EEF0FF] text-[#354CE1]'
                  : isDisabled
                    ? 'cursor-not-allowed text-slate-400'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                {copy.products[product.id]}
              </span>
              {product.status === 'comingSoon' && (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-slate-400">
                  {copy.comingSoon}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );

  const statusLabel = saveStatus === 'saving'
    ? copy.saving
    : saveStatus === 'error'
      ? copy.saveError
      : copy.saved;

  return (
    <div className="min-h-screen bg-[#F5F7FB] font-sans text-slate-800 antialiased">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] border-r border-slate-200/80 bg-white lg:flex lg:flex-col">
        <button
          type="button"
          onClick={onOpenOverview}
          className="flex h-[72px] items-center gap-3 border-b border-slate-100 px-5 text-left"
        >
          <img src={identraLogo} alt={copy.brandAlt} className="h-8 w-8" />
          <div className="min-w-0">
            <p className="font-display text-base font-bold tracking-tight text-slate-950">Identra</p>
            <p className="truncate text-[10px] font-semibold text-slate-400">{copy.workspaceName}</p>
          </div>
        </button>
        <nav className="sidebar-scrollbar flex-1 overflow-y-auto px-3 py-5">
          {navigation}
        </nav>
        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={onBackToSite}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
          >
            <Braces className="h-4 w-4" />
            <span>{copy.backToSite}</span>
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label={copy.close}
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
          />
          <aside className="relative flex h-full w-[286px] flex-col bg-white shadow-2xl">
            <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-4">
              <div className="flex items-center gap-3">
                <img src={identraLogo} alt={copy.brandAlt} className="h-8 w-8" />
                <span className="font-display font-bold text-slate-950">Identra</span>
              </div>
              <button
                type="button"
                aria-label={copy.close}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-5">{navigation}</nav>
          </aside>
        </div>
      )}

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-xl sm:px-6">
          <button
            type="button"
            aria-label={copy.platformToolsLabel}
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate text-xs font-semibold text-slate-400">
              {copy.workspaceName}
            </span>
            {projectName && (
              <>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                <span className="truncate text-sm font-bold text-slate-900">{projectName}</span>
              </>
            )}
          </div>

          {projectName && (
            <div
              className={`hidden items-center gap-2 text-[11px] font-semibold sm:flex ${
                saveStatus === 'error' ? 'text-rose-600' : 'text-slate-400'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${
                saveStatus === 'saving'
                  ? 'animate-pulse bg-amber-400'
                  : saveStatus === 'error'
                    ? 'bg-rose-500'
                    : 'bg-emerald-500'
              }`} />
              {statusLabel}
            </div>
          )}

          <label className="relative">
            <span className="sr-only">{copy.languageLabel}</span>
            <select
              value={language}
              onChange={(event) => onLanguageChange(event.target.value as Language)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-bold uppercase text-slate-600 outline-none transition focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15"
            >
              {SUPPORTED_LOCALES.map((locale) => (
                <option key={locale} value={locale}>{locale}</option>
              ))}
            </select>
            <ChevronRight className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-slate-400" />
          </label>

          <button
            type="button"
            aria-label={copy.accountLabel}
            title={copy.accountLabel}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white"
          >
            ID
          </button>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}

