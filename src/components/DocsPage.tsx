import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowLeftRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  Code,
  Contact,
  Menu,
  Moon,
  Search,
  Shuffle,
  Sun,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { DOCS_PAGE_TRANSLATIONS } from '../translations/DocsPageTranslations';
import { copyTextToClipboard } from '../utils/clipboard';
import identraLogo from '../assets/images/identra-logo.svg';
import { DOCS_TAB_PAGE_IDS, DOCS_TAB_SEQUENCE, getTabIdForPage } from './docs/docsNavigation';
import type { DocPage, DocsContentPageProps, DocsTabId } from './docs/docsModel';

const DocsOverviewPage = React.lazy(() => import('./docs/DocsOverviewPage'));
const DocsInquiriesPage = React.lazy(() => import('./docs/DocsInquiriesPage'));
const DocsTransactionsPage = React.lazy(() => import('./docs/DocsTransactionsPage'));
const DocsRelayPage = React.lazy(() => import('./docs/DocsRelayPage'));
const DocsApiReferencePage = React.lazy(() => import('./docs/DocsApiReferencePage'));
const DocsChangelogPage = React.lazy(() => import('./docs/DocsChangelogPage'));

interface DocsTabItem {
  id: DocsTabId;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const formatText = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));

const DOCS_PAGE_COMPONENTS: Record<DocsTabId, React.ComponentType<DocsContentPageProps>> = {
  overview: DocsOverviewPage,
  inquiries: DocsInquiriesPage,
  transactions: DocsTransactionsPage,
  relay: DocsRelayPage,
  'api-ref': DocsApiReferencePage,
  changelog: DocsChangelogPage
};

export default function DocsPage({ onBackToLanding }: { onBackToLanding: () => void }) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(DOCS_PAGE_TRANSLATIONS, language as keyof typeof DOCS_PAGE_TRANSLATIONS, 'DOCS_PAGE_TRANSLATIONS');
  const ui = t.ui;
  const docPages: DocPage[] = t.pages;

  const [currentTab, setCurrentTab] = useState<DocsTabId>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [version, setVersion] = useState('2025-12-08');
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<null | 'yes' | 'no'>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      } else if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setFeedbackSubmitted(null);
    setCopyStatus('idle');
  }, [currentTab]);

  const tabItems = useMemo<DocsTabItem[]>(() => [
    { id: 'overview', label: ui.tabs.overview, Icon: BookOpen },
    { id: 'inquiries', label: ui.tabs.inquiries, Icon: Contact },
    { id: 'transactions', label: ui.tabs.transactions, Icon: Shuffle },
    { id: 'relay', label: ui.tabs.relay, Icon: ArrowLeftRight },
    { id: 'api-ref', label: ui.tabs.api, Icon: Code },
    { id: 'changelog', label: ui.tabs.changelog, Icon: Clock }
  ], [ui.tabs]);

  const currentTabIndex = DOCS_TAB_SEQUENCE.indexOf(currentTab);
  const previousTabId = currentTabIndex > 0 ? DOCS_TAB_SEQUENCE[currentTabIndex - 1] : null;
  const nextTabId = currentTabIndex < DOCS_TAB_SEQUENCE.length - 1 ? DOCS_TAB_SEQUENCE[currentTabIndex + 1] : null;
  const previousTab = previousTabId ? tabItems.find(tab => tab.id === previousTabId) : null;
  const nextTab = nextTabId ? tabItems.find(tab => tab.id === nextTabId) : null;
  const CurrentDocsPage = DOCS_PAGE_COMPONENTS[currentTab];

  const filteredSearchPages = searchQuery.trim() === ''
    ? []
    : docPages.filter(page =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.sections.some(section => section.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const handleTabChange = (tabId: DocsTabId) => {
    setCurrentTab(tabId);
    setMobileSidebarOpen(false);
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const handleSearchPageSelect = (page: DocPage) => {
    const tabId = getTabIdForPage(page.id);
    const targetId = DOCS_TAB_PAGE_IDS[tabId].length > 1 ? page.id : page.sections[0]?.id;

    setCurrentTab(tabId);
    setSearchQuery('');
    setSearchOpen(false);
    setMobileSidebarOpen(false);

    window.setTimeout(() => {
      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 80);
  };

  const handleCopyPage = async () => {
    const copied = await copyTextToClipboard(window.location.href);
    setCopyStatus(copied ? 'success' : 'error');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const renderTabButton = (id: DocsTabId, label: string, Icon: React.ComponentType<{ className?: string }>) => (
    <button
      onClick={() => handleTabChange(id)}
      className={`flex items-center gap-2 h-full border-b-2 font-semibold text-xs md:text-sm px-1 shrink-0 transition-colors relative top-[1px] ${
        currentTab === id
          ? 'border-[#354CE1] text-[#354CE1] dark:border-[#5F75FF] dark:text-[#5F75FF]'
          : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
      }`}
    >
      <Icon className={`w-4 h-4 ${currentTab === id ? 'text-[#354CE1] dark:text-[#5F75FF]' : 'text-slate-400 dark:text-slate-500'}`} />
      <span>{label}</span>
    </button>
  );

  return (
    <div data-theme={theme} className={`min-h-screen ${theme === 'dark' ? 'dark bg-[#090C15] text-slate-100' : 'bg-[#FAFBFD] text-slate-800'} font-sans antialiased transition-colors duration-200`}>
      <header className="sticky top-0 z-50 bg-white dark:bg-[#0E1325] border-b border-slate-100 dark:border-slate-850/30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBackToLanding} className="flex items-center gap-2 group cursor-pointer">
              <img src={identraLogo} alt={ui.identra} className="h-8 w-8 object-contain" />
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">{ui.identra}</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setVersionDropdownOpen(!versionDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-slate-100/55 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 rounded-md border border-slate-100 dark:border-slate-700/40 hover:bg-slate-200/50 dark:hover:bg-slate-700 transition"
              >
                <span>{version}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {versionDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setVersionDropdownOpen(false)} />
                  <div className="absolute top-full left-0 mt-1.5 w-36 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40 rounded-lg shadow-xl py-1 z-50">
                    {['2025-12-08', '2024-11-01', '2023-09-01'].map(versionOption => (
                      <button
                        key={versionOption}
                        onClick={() => {
                          setVersion(versionOption);
                          setVersionDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between"
                      >
                        <span>{versionOption}</span>
                        {version === versionOption && <Check className="w-3.5 h-3.5 text-[#354CE1]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:flex relative max-w-md w-full mx-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={ui.searchPlaceholder}
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              className="w-full pl-9 pr-8 py-1.5 text-sm bg-slate-50/50 dark:bg-slate-900/50 text-slate-850 dark:text-slate-100 rounded-lg border border-slate-100 dark:border-slate-800/30 focus:outline-none focus:ring-1 focus:ring-[#354CE1] focus:border-[#354CE1] transition"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">/</span>

            {searchOpen && searchQuery.trim() !== '' && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSearchOpen(false)} />
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/30 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-850/30 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>{ui.searchResults}</span>
                    <span>{filteredSearchPages.length} {ui.found}</span>
                  </div>
                  {filteredSearchPages.length > 0 ? (
                    <div className="p-2 divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredSearchPages.map(page => (
                        <button
                          key={page.id}
                          onClick={() => handleSearchPageSelect(page)}
                          className="w-full text-left p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-850 transition block"
                        >
                          <span className="text-xs font-semibold text-[#354CE1] dark:text-[#5F75FF] block uppercase tracking-wide">{t.categories[page.category]}</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block">{page.title}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-sm text-slate-400">
                      {formatText(ui.noResults, { query: searchQuery })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <a href="https://support.withidentra.com" target="_blank" rel="noreferrer" className="hidden sm:inline-flex text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">{ui.helpCenter}</a>
            <a href="#openapi" onClick={(event) => { event.preventDefault(); handleTabChange('api-ref'); }} className="hidden sm:inline-flex text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">{ui.openApi}</a>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" title={ui.serviceOperational} />
            <a href="https://status.withidentra.com" target="_blank" rel="noreferrer" className="hidden sm:inline-flex text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">{ui.status}</a>
            <button onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} aria-label={ui.toggleTheme} className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} className="md:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="border-t border-b border-slate-100 dark:border-slate-800/30 bg-white dark:bg-[#0A0D1B]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-none h-12">
            {tabItems.map(tab => renderTabButton(tab.id, tab.label, tab.Icon))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-8 relative">
        <aside className={`${mobileSidebarOpen ? 'fixed inset-0 z-50 bg-white dark:bg-slate-900 p-6 overflow-y-auto space-y-6' : 'hidden'}`}>
          {mobileSidebarOpen && (
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <span className="font-bold text-slate-900 dark:text-white text-base">{ui.documentationNavigation}</span>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-2 text-slate-500 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {mobileSidebarOpen && (
            <div className="relative w-full mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder={ui.mobileSearchPlaceholder} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50/50 dark:bg-slate-800/40 text-slate-850 dark:text-slate-100 rounded-lg border border-slate-100 dark:border-slate-800/30" />
              {searchQuery && (
                <div className="mt-2 bg-slate-50 dark:bg-slate-800 rounded-lg p-1 border border-slate-100 dark:border-slate-800/30 max-h-48 overflow-y-auto">
                  {filteredSearchPages.map(page => (
                    <button key={page.id} onClick={() => handleSearchPageSelect(page)} className="w-full text-left p-2 hover:bg-slate-100 dark:hover:bg-slate-750 rounded text-xs text-slate-700 dark:text-slate-300">
                      {page.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button onClick={onBackToLanding} className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition pb-2 border-b border-slate-100 dark:border-slate-850/20 w-full">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{ui.backToMain}</span>
          </button>

          <div className="space-y-1">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">{ui.documentationNavigation}</h3>
            <div className="space-y-0.5">
              {tabItems.map(tab => {
                const isActive = currentTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`w-full text-left px-3 py-2 text-xs md:text-[13px] font-medium rounded-lg transition-all duration-150 flex items-center justify-between ${isActive ? 'bg-[#EEF2F6] dark:bg-slate-800 text-[#354CE1] dark:text-[#5F75FF] font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-850'}`}>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <React.Suspense
          fallback={(
            <div className="col-span-1 md:col-span-12 min-h-[60vh] animate-pulse" aria-hidden="true">
              <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-8 h-10 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-10 space-y-4">
                <div className="h-6 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          )}
        >
          <CurrentDocsPage
            ui={ui}
            copyStatus={copyStatus}
            feedbackSubmitted={feedbackSubmitted}
            previousPage={previousTab ?? null}
            nextPage={nextTab ?? null}
            onCopyPage={handleCopyPage}
            onFeedback={setFeedbackSubmitted}
            onNavigate={handleTabChange}
            onBackToLanding={onBackToLanding}
          />
        </React.Suspense>
      </div>
    </div>
  );
}
