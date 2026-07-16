import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code,
  Contact,
  Copy,
  Menu,
  Moon,
  Search,
  Shuffle,
  Sun,
  ThumbsDown,
  ThumbsUp,
  X,
  ArrowLeftRight,
  AlertCircle
} from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { DOCS_PAGE_TRANSLATIONS } from '../translations/DocsPageTranslations';
import { copyTextToClipboard } from '../utils/clipboard';
import identraLogo from '../assets/images/identra-logo.svg';

interface DocSection {
  id: string;
  title: string;
  blocks: any[];
}

interface DocPage {
  id: string;
  title: string;
  category: string;
  sections: DocSection[];
  nextPageId?: string;
  prevPageId?: string;
}

const formatText = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));

export default function DocsPage({ onBackToLanding }: { onBackToLanding: () => void }) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(DOCS_PAGE_TRANSLATIONS, language as keyof typeof DOCS_PAGE_TRANSLATIONS, 'DOCS_PAGE_TRANSLATIONS');
  const ui = t.ui;
  const docPages: DocPage[] = t.pages;

  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [activePageId, setActivePageId] = useState<string>('introduction');
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
    if (['introduction', 'how-identra-works', 'security', 'environments', 'choose-integration'].includes(activePageId)) {
      setCurrentTab('overview');
    } else if (activePageId === 'inquiries') {
      setCurrentTab('inquiries');
    } else if (activePageId === 'transactions') {
      setCurrentTab('transactions');
    } else if (activePageId === 'relay') {
      setCurrentTab('relay');
    } else if (['api-reference', 'understanding-payloads', 'webhooks'].includes(activePageId)) {
      setCurrentTab('api-ref');
    } else if (activePageId === 'changelog') {
      setCurrentTab('changelog');
    }
  }, [activePageId]);

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

  const currentPage = docPages.find(page => page.id === activePageId) || docPages[0];
  const categories = useMemo(() => Array.from(new Set(docPages.map(page => page.category))), [docPages]);
  const filteredSearchPages = searchQuery.trim() === ''
    ? []
    : docPages.filter(page =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.sections.some(section => section.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const handleCopyPage = async () => {
    const copied = await copyTextToClipboard(window.location.href);
    setCopyStatus(copied ? 'success' : 'error');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const renderBlock = (block: any, index: number) => {
    if (block.type === 'p') {
      return <p key={index}>{block.text}</p>;
    }

    if (block.type === 'subheading') {
      return <p key={index} className="pt-2 font-semibold text-slate-900 dark:text-white text-sm">{block.text}</p>;
    }

    if (block.type === 'callout') {
      return (
        <div key={index} className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 leading-normal">{block.text}</p>
        </div>
      );
    }

    if (block.type === 'list') {
      return (
        <ul key={index} className="list-disc pl-5 space-y-2 mt-2">
          {block.items.map((item: any) => (
            <li key={item.title}><strong>{item.title}:</strong> {item.text}</li>
          ))}
        </ul>
      );
    }

    if (block.type === 'cards') {
      return (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {block.cards.map((card: any) => (
            <div key={card.title} className="border border-slate-100 dark:border-slate-800/40 p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">{card.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{card.text}</p>
            </div>
          ))}
        </div>
      );
    }

    if (block.type === 'table') {
      return (
        <div key={index} className="border border-slate-100 dark:border-slate-800/40 rounded-xl overflow-hidden mt-4">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/40">
                {block.headers.map((header: string) => (
                  <th key={header} className="p-3 font-semibold text-slate-900 dark:text-white">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-600 dark:text-slate-400">
              {block.rows.map((row: string[], rowIndex: number) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`} className={`p-3 ${cellIndex === 0 ? 'font-medium' : ''}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (block.type === 'code') {
      return (
        <React.Fragment key={index}>
          <CodeBlock language={block.language} code={block.code} fileName={block.fileName} />
        </React.Fragment>
      );
    }

    if (block.type === 'changelog') {
      return (
        <div key={index} className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800/30">
          {block.items.map((item: any) => (
            <div key={item.version} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 pt-6 first:pt-0 first:border-t-0 border-t border-slate-100 dark:border-slate-800/20">
              <span className="px-2.5 py-1 text-xs font-bold text-[#354CE1] dark:text-[#5F75FF] bg-[#354CE1]/10 border border-[#354CE1]/20 rounded-md shrink-0">
                {item.version}
              </span>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{item.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderTabButton = (id: string, pageId: string, label: string, Icon: React.ComponentType<any>) => (
    <button
      onClick={() => {
        setCurrentTab(id);
        setActivePageId(pageId);
      }}
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
                          onClick={() => {
                            setActivePageId(page.id);
                            setSearchQuery('');
                            setSearchOpen(false);
                          }}
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
            <a href="#openapi" onClick={(event) => { event.preventDefault(); setActivePageId('api-reference'); }} className="hidden sm:inline-flex text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">{ui.openApi}</a>
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
            {renderTabButton('overview', 'introduction', ui.tabs.overview, BookOpen)}
            {renderTabButton('inquiries', 'inquiries', ui.tabs.inquiries, Contact)}
            {renderTabButton('transactions', 'transactions', ui.tabs.transactions, Shuffle)}
            {renderTabButton('relay', 'relay', ui.tabs.relay, ArrowLeftRight)}
            {renderTabButton('api-ref', 'api-reference', ui.tabs.api, Code)}
            {renderTabButton('changelog', 'changelog', ui.tabs.changelog, Clock)}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-8 relative">
        <aside className={`md:col-span-3 ${mobileSidebarOpen ? 'fixed inset-0 z-50 bg-white dark:bg-slate-900 p-6 overflow-y-auto' : 'hidden md:block'} sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-none space-y-6 pr-2`}>
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
                    <button key={page.id} onClick={() => { setActivePageId(page.id); setMobileSidebarOpen(false); setSearchQuery(''); }} className="w-full text-left p-2 hover:bg-slate-100 dark:hover:bg-slate-750 rounded text-xs text-slate-700 dark:text-slate-300">
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

          {categories.map(category => (
            <div key={category} className="space-y-1">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">{t.categories[category]}</h3>
              <div className="space-y-0.5">
                {docPages.filter(page => page.category === category).map(page => {
                  const isActive = activePageId === page.id;
                  return (
                    <button key={page.id} onClick={() => { setActivePageId(page.id); setMobileSidebarOpen(false); }} className={`w-full text-left px-3 py-2 text-xs md:text-[13px] font-medium rounded-lg transition-all duration-150 flex items-center justify-between ${isActive ? 'bg-[#EEF2F6] dark:bg-slate-800 text-[#354CE1] dark:text-[#5F75FF] font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-850'}`}>
                      <span>{page.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        <main className="col-span-1 md:col-span-7 space-y-8 min-h-[60vh] md:pr-4">
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
            <span>{t.categories[currentPage.category]}</span>
            <button onClick={handleCopyPage} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800/40 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-300 font-medium transition cursor-pointer">
              {copyStatus === 'success' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : copyStatus === 'error' ? (
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copyStatus === 'success' ? ui.copied : copyStatus === 'error' ? ui.copyFailed : ui.copyPage}</span>
            </button>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-850/30 pb-6">
            <h1 className="font-sans font-bold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">{currentPage.title}</h1>
          </div>

          <div className="space-y-8">
            {currentPage.sections.map(section => (
              <section key={section.id} id={section.id} className="space-y-3 scroll-mt-24">
                <h2 className="font-sans font-bold text-xl md:text-2xl text-slate-900 dark:text-white tracking-tight pt-2">{section.title}</h2>
                <div className="space-y-4 text-[16px] md:text-[17px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {section.blocks.map(renderBlock)}
                </div>
              </section>
            ))}
          </div>

          <div className="border border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{ui.helpfulTitle}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{ui.helpfulDesc}</p>
            </div>
            {feedbackSubmitted ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-150/50 dark:border-emerald-900/40 px-4 py-2 rounded-xl">
                <Check className="w-4 h-4" />
                <span>{ui.thanks}</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={() => setFeedbackSubmitted('yes')} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-750/30 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 hover:text-emerald-600 transition">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{ui.yes}</span>
                </button>
                <button onClick={() => setFeedbackSubmitted('no')} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-750/30 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 hover:text-rose-600 transition">
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>{ui.no}</span>
                </button>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-850/30 flex items-center justify-between">
            {currentPage.prevPageId ? (
              <button onClick={() => currentPage.prevPageId && setActivePageId(currentPage.prevPageId)} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#354CE1] dark:hover:text-[#5F75FF] hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800/40 transition text-left">
                <ChevronLeft className="w-4 h-4" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">{ui.previous}</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{docPages.find(page => page.id === currentPage.prevPageId)?.title}</span>
                </div>
              </button>
            ) : <div />}

            {currentPage.nextPageId ? (
              <button onClick={() => currentPage.nextPageId && setActivePageId(currentPage.nextPageId)} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800/40 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-[#354CE1]/50 transition text-right max-w-xs w-full">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">{ui.nextPage}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block">{docPages.find(page => page.id === currentPage.nextPageId)?.title}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
              </button>
            ) : <div />}
          </div>

          <div className="pt-12 text-center">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              {ui.builtWith} <span className="font-bold text-slate-600 dark:text-slate-300 flex items-center gap-0.5">{ui.fern}</span>
            </span>
          </div>
        </main>

        <aside className="hidden md:block md:col-span-2 sticky top-32 max-h-[calc(100vh-10rem)] pr-2">
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{ui.onThisPage}</h4>
            <ul className="space-y-3 border-l border-slate-100 dark:border-slate-850/20 text-xs font-medium">
              {currentPage.sections.map(section => (
                <li key={section.id}>
                  <a href={`#${section.id}`} onClick={(event) => { event.preventDefault(); document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' }); }} className="block pl-4 py-0.5 text-slate-500 hover:text-[#354CE1] dark:hover:text-[#5F75FF] transition-all border-l-2 border-transparent -ml-[2px] hover:border-[#354CE1]">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
