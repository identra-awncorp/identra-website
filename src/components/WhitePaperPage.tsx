/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Cpu,
  Download,
  FileCode,
  FileText,
  Globe,
  Layers,
  Lock,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import {
  WHITE_PAPER_TRANSLATIONS,
  type WhitePaperContentBlock,
  type WhitePaperSection,
  type WhitePaperSectionId,
} from '../translations/WhitePaperPageTranslations';
import type { AppView } from '../types/routes';
import { getLocalizedRecord } from '../utils/i18nRuntime';

interface WhitePaperPageProps {
  onOpenSandbox?: () => void;
  onBackToLanding?: () => void;
  onViewChange?: (view: AppView) => void;
}

const SECTION_ICONS: Record<WhitePaperSectionId, LucideIcon> = {
  'foundational-concepts': BookOpen,
  'executive-summary': Sparkles,
  'chapter-1': Shield,
  'chapter-2': ShieldCheck,
  'chapter-3': Layers,
  'chapter-4': Cpu,
  'chapter-5': Building2,
  'chapter-6': FileCode,
  'chapter-7': Zap,
  'chapter-8': Lock,
  'chapter-9': CheckCircle2,
  'chapter-10': CheckCircle2,
  conclusion: Award,
  'appendix-a': FileText,
  'appendix-b': FileCode,
  'appendix-c': Globe,
};

const WHITE_PAPER_PDF_URL = '/white-paper/Identra-White-Paper-v1.0.pdf';
const WHITE_PAPER_PDF_FILENAME = 'Identra-White-Paper-v1.0.pdf';

const getSectionSearchText = (section: WhitePaperSection) => {
  const cardText = section.cards?.flatMap((card) => [card.title, card.body]) ?? [];
  const tableText = section.table?.rows.flatMap((row) => row) ?? [];
  const noteText = section.note ? [section.note.title, section.note.body] : [];
  const blockText = section.blocks?.flatMap((block) => {
    if (block.type === 'table') {
      return [...block.headers, ...block.rows.flatMap((row) => row)];
    }

    if (block.type === 'unordered-list' || block.type === 'ordered-list') {
      return block.items;
    }

    if (block.type === 'quote') {
      return [block.title, block.body].filter((value): value is string => typeof value === 'string');
    }

    return block.text ? [block.text] : [];
  }) ?? [];

  return [
    section.eyebrow,
    section.title,
    ...section.paragraphs,
    ...blockText,
    ...cardText,
    section.bulletsTitle,
    ...(section.bullets ?? []),
    ...(section.table?.headers ?? []),
    ...tableText,
    section.orderedTitle,
    ...(section.ordered ?? []),
    ...noteText,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
};

const renderInlineText = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });

const renderContentBlock = (
  block: WhitePaperContentBlock,
  index: number,
  isConclusion: boolean,
) => {
  if (block.type === 'heading') {
    return (
      <h3
        key={`${block.text}-${index}`}
        className={[
          'pt-2 text-left text-base font-bold md:text-lg',
          isConclusion ? 'text-white' : 'text-slate-900',
        ].join(' ')}
      >
        {block.text}
      </h3>
    );
  }

  if (block.type === 'paragraph') {
    return (
      <p
        key={`${block.text}-${index}`}
        className={[
          'text-sm leading-relaxed text-justify md:text-base',
          isConclusion ? 'text-white/85' : 'text-slate-600',
        ].join(' ')}
      >
        {renderInlineText(block.text)}
      </p>
    );
  }

  if (block.type === 'quote') {
    return (
      <div
        key={`${block.body}-${index}`}
        className={[
          'rounded-xl border-l-4 p-4 text-sm leading-relaxed text-justify md:text-base',
          isConclusion
            ? 'border-[#FFBF43] bg-white/10 text-white'
            : 'border-[#354CE1] bg-[#E2E6FF] text-slate-700',
        ].join(' ')}
      >
        {block.title && (
          <strong className={isConclusion ? 'text-[#FFBF43]' : 'text-[#0F1E36]'}>
            {block.title}:{' '}
          </strong>
        )}
        {renderInlineText(block.body)}
      </div>
    );
  }

  if (block.type === 'unordered-list' || block.type === 'ordered-list') {
    const ListTag = block.type === 'ordered-list' ? 'ol' : 'ul';

    return (
      <ListTag
        key={`${block.type}-${index}`}
        className={[
          block.type === 'ordered-list' ? 'list-decimal' : 'list-disc',
          'space-y-2 pl-5 text-sm leading-relaxed text-justify md:text-base',
          isConclusion ? 'text-white/85' : 'text-slate-600',
        ].join(' ')}
      >
        {block.items.map((item) => (
          <li key={item}>{renderInlineText(item)}</li>
        ))}
      </ListTag>
    );
  }

  return (
    <div key={`table-${index}`} className="overflow-x-auto rounded-xl border border-slate-100">
      <table className="w-full border-collapse text-left text-sm md:text-base">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            {block.headers.map((header) => (
              <th key={header} className="p-3.5 font-semibold text-slate-900">
                {renderInlineText(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
          {block.rows.map((row) => (
            <tr key={row.join('-')}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${cell}-${cellIndex}`}
                  className={[
                    'p-3.5 align-top',
                    cellIndex === 0 ? 'font-semibold text-[#354CE1]' : '',
                    cellIndex === 1 ? 'font-medium text-slate-900' : '',
                  ].join(' ')}
                >
                  {renderInlineText(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function SectionContent({ section }: { section: WhitePaperSection; key?: React.Key }) {
  const isConclusion = section.id === 'conclusion';
  const hasStructuredBlocks = Boolean(section.blocks?.length);

  return (
    <section
      id={section.id}
      className={[
        'scroll-mt-24 rounded-2xl p-5 sm:p-6 md:p-8 shadow-xs space-y-5',
        isConclusion
          ? 'relative overflow-hidden bg-gradient-to-r from-[#5B6DFF] to-[#475BE8] text-white'
          : 'bg-white border border-slate-100',
      ].join(' ')}
    >
      {isConclusion && (
        <>
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#FFBF43]/10 blur-3xl" />
        </>
      )}

      <div className="relative z-10 space-y-5">
        <div className={isConclusion ? 'border-b border-white/20 pb-3' : 'border-b border-slate-100 pb-3'}>
          <span
            className={[
              'font-mono mb-1 block text-xs font-semibold uppercase tracking-wide md:text-sm',
              isConclusion ? 'text-[#FFBF43]' : 'text-[#354CE1]',
            ].join(' ')}
          >
            {section.eyebrow}
          </span>
          <h2
            className={[
              'font-display text-left text-lg font-bold tracking-tight sm:text-xl md:text-2xl',
              isConclusion ? 'text-white' : 'text-slate-900',
            ].join(' ')}
          >
            {section.title}
          </h2>
        </div>

        {section.paragraphs.length > 0 && (
          <div
            className={[
              'space-y-4 text-sm leading-relaxed text-justify md:text-base',
              isConclusion ? 'text-white/85' : 'text-slate-600',
            ].join(' ')}
          >
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}

        {hasStructuredBlocks && (
          <div className="space-y-4">
            {section.blocks?.map((block, index) => renderContentBlock(block, index, isConclusion))}
          </div>
        )}

        {!hasStructuredBlocks && section.cards && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {section.cards.map((card) => (
              <article
                key={card.title}
                className={[
                  'rounded-xl p-4 sm:p-5',
                  isConclusion
                    ? 'bg-white/10 text-white ring-1 ring-white/15'
                    : 'bg-slate-50 text-slate-600 border border-slate-100',
                ].join(' ')}
              >
                <h3
                  className={[
                    'mb-2 text-left text-sm font-bold md:text-base',
                    isConclusion ? 'text-white' : 'text-slate-900',
                  ].join(' ')}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-justify md:text-base">{card.body}</p>
              </article>
            ))}
          </div>
        )}

        {!hasStructuredBlocks && section.note && (
          <div
            className={[
              'rounded-xl p-4 text-sm leading-relaxed text-justify md:text-base',
              isConclusion
                ? 'bg-white/10 text-white ring-1 ring-white/15'
                : 'bg-[#E2E6FF] text-slate-700 border border-[#354CE1]/15',
            ].join(' ')}
          >
            <strong className={isConclusion ? 'text-[#FFBF43]' : 'text-[#0F1E36]'}>
              {section.note.title}:
            </strong>{' '}
            {section.note.body}
          </div>
        )}

        {!hasStructuredBlocks && section.bullets && (
          <div className="space-y-3">
            {section.bulletsTitle && (
              <h3
                className={[
                  'text-left text-base font-bold md:text-lg',
                  isConclusion ? 'text-white' : 'text-slate-900',
                ].join(' ')}
              >
                {section.bulletsTitle}
              </h3>
            )}
            <ul
              className={[
                'list-disc space-y-2 pl-5 text-sm leading-relaxed text-justify md:text-base',
                isConclusion ? 'text-white/85' : 'text-slate-600',
              ].join(' ')}
            >
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        )}

        {!hasStructuredBlocks && section.table && (
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full border-collapse text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {section.table.headers.map((header) => (
                    <th key={header} className="p-3.5 font-semibold text-slate-900">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {section.table.rows.map((row) => (
                  <tr key={row.join('-')}>
                    {row.map((cell, index) => (
                      <td
                        key={`${cell}-${index}`}
                        className={[
                          'p-3.5',
                          index === 0 ? 'font-semibold text-[#354CE1]' : '',
                          index === 1 ? 'font-medium text-slate-900' : '',
                        ].join(' ')}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!hasStructuredBlocks && section.ordered && (
          <div className="rounded-xl bg-slate-50 p-5 text-sm md:text-base border border-slate-100">
            {section.orderedTitle && (
              <strong className="mb-2 block text-left text-base font-bold text-[#354CE1] md:text-lg">
                {section.orderedTitle}
              </strong>
            )}
            <ol className="list-decimal space-y-1.5 pl-5 text-justify text-slate-600">
              {section.ordered.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}

export default function WhitePaperPage({
  onOpenSandbox,
  onBackToLanding,
  onViewChange,
}: WhitePaperPageProps) {
  const copy = getLocalizedRecord(
    WHITE_PAPER_TRANSLATIONS,
    'vi',
    'WHITE_PAPER_TRANSLATIONS',
  );
  const [activeSection, setActiveSection] = useState<WhitePaperSectionId>('foundational-concepts');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const sectionIds = useMemo(() => copy.sections.map((section) => section.id), [copy.sections]);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sectionIds
        .map((id) => ({
          id,
          element: document.getElementById(id),
        }))
        .filter((item): item is { id: WhitePaperSectionId; element: HTMLElement } => item.element !== null);

      const scrollPosition = window.scrollY + 180;

      for (let index = sectionElements.length - 1; index >= 0; index -= 1) {
        const item = sectionElements[index];
        if (item.element.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  const filteredSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return copy.sections;
    }

    return copy.sections.filter((section) => getSectionSearchText(section).includes(query));
  }, [copy.sections, searchQuery]);

  const scrollToSection = (id: WhitePaperSectionId) => {
    setActiveSection(id);
    setMobileTocOpen(false);

    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-slate-800 selection:bg-[#354CE1] selection:text-white font-sans antialiased">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-[#5B6DFF] to-[#475BE8] p-8 sm:p-10 md:p-12 lg:p-14 text-white shadow-lg">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#FFBF43]/10 blur-3xl" />

          <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/20 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onBackToLanding || (() => onViewChange?.('landing'))}
                className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white/95 transition hover:bg-white/25 hover:text-white md:text-sm cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{copy.backToLanding}</span>
              </button>
              <span className="rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                {copy.versionBadge}
              </span>
              <span className="hidden text-xs font-medium text-white/80 md:inline md:text-sm">
                {copy.publisher}
              </span>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/25 md:text-sm cursor-pointer"
                title={copy.copyLinkTitle}
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? copy.copied : copy.copyLink}</span>
              </button>

              <a
                href={WHITE_PAPER_PDF_URL}
                download={WHITE_PAPER_PDF_FILENAME}
                className="flex items-center gap-1.5 rounded-full bg-white px-4.5 py-2 text-xs font-bold text-[#354CE1] shadow-xs transition hover:bg-slate-50 md:text-sm cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>{copy.downloadPdf}</span>
              </a>
            </div>
          </div>

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-semibold text-white md:text-sm">
              <Sparkles className="h-4 w-4 text-[#FFBF43]" />
              <span>{copy.heroBadge}</span>
            </div>

            <h1 className="font-display text-3xl font-extrabold leading-[1.18] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[46px]">
              {copy.heroTitle}
            </h1>
            <p className="text-base font-medium leading-relaxed text-justify text-white/90 sm:text-lg md:text-xl">
              {copy.heroSubtitle}
            </p>

            <div className="grid grid-cols-2 gap-6 border-t border-white/25 pt-6 text-xs sm:grid-cols-4 sm:text-sm sm:gap-8">
              {copy.metadata.map((item) => (
                <div key={item.title} className="space-y-1">
                  <span className="font-mono block text-[11px] font-bold uppercase tracking-wider text-white/70">
                    {item.title}
                  </span>
                  <span className="font-semibold text-white block">{item.body}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 grid grid-cols-1 gap-4 text-xs sm:text-sm md:grid-cols-2">
              {copy.callouts.map((callout) => (
                <div
                  key={callout.title}
                  className="rounded-2xl bg-white/15 p-4 sm:p-5 leading-relaxed text-white backdrop-blur-md border border-white/15 space-y-1 text-justify"
                >
                  <strong
                    className={[
                      'block text-left font-semibold text-sm md:text-base',
                      callout.tone === 'accent' ? 'text-[#FFBF43]' : 'text-emerald-300',
                    ].join(' ')}
                  >
                    {callout.title}
                  </strong>
                  <p>{callout.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 md:hidden">
          <button
            onClick={() => setMobileTocOpen((isOpen) => !isOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-semibold text-slate-900 shadow-xs"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#354CE1]" />
              <span>{copy.mobileTocTitle}</span>
            </span>
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${mobileTocOpen ? 'rotate-180' : ''}`} />
          </button>

          {mobileTocOpen && (
            <div className="mt-2 max-h-80 space-y-0.5 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-md">
              {copy.sections.map((section) => {
                const Icon = SECTION_ICONS[section.id];
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={[
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium leading-snug transition sm:text-sm',
                      isActive
                        ? 'bg-[#E2E6FF] text-[#354CE1] font-semibold'
                        : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900',
                    ].join(' ')}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{section.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          <aside className="hidden h-[calc(100vh-2rem)] space-y-4 overflow-y-auto pr-2 sidebar-scrollbar md:sticky md:top-4 md:col-span-3 md:block">
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                {copy.desktopTocTitle}
              </h3>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={copy.searchPlaceholder}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-lg border border-slate-100 bg-slate-50/50 py-1.5 pl-9 pr-3 text-xs text-slate-800 focus:border-[#354CE1] focus:outline-none focus:ring-1 focus:ring-[#354CE1] sm:text-sm"
                />
              </div>
            </div>

            <nav aria-label={copy.tocAriaLabel} className="space-y-0.5">
              {filteredSections.map((section) => {
                const Icon = SECTION_ICONS[section.id];
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={[
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium leading-snug transition-all duration-150 sm:text-sm',
                      isActive
                        ? 'bg-[#E2E6FF] text-[#354CE1] font-semibold'
                        : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900',
                    ].join(' ')}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#354CE1]' : 'text-slate-400'}`} />
                    <span className="truncate">{section.title}</span>
                  </button>
                );
              })}
              {filteredSections.length === 0 && (
                <p className="px-3 py-2 text-xs text-slate-500">{copy.noTocResults}</p>
              )}
            </nav>
          </aside>

          <main className="col-span-1 space-y-8 text-sm leading-relaxed text-slate-600 md:col-span-9 md:pr-2 md:text-base">
            {copy.sections.map((section) => (
              <SectionContent key={section.id} section={section} />
            ))}

            <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:text-sm">
              <p>{copy.attribution}</p>
              <button
                onClick={onOpenSandbox || (() => onViewChange?.('demo'))}
                className="flex items-center gap-2 rounded-full bg-[#FFBF43] px-5 py-2.5 text-xs font-bold text-slate-900 shadow-sm transition hover:bg-amber-500 sm:text-sm"
              >
                <Sparkles className="h-4 w-4 text-slate-900" />
                <span>{copy.cta}</span>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
