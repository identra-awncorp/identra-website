import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ThumbsDown,
  ThumbsUp
} from 'lucide-react';
import CodeBlock from '../CodeBlock';
import type { DocBlock, DocContent, DocSection, DocsContentPageProps, DocsDocumentUi } from './docsTypes';

interface DocsDocumentProps extends DocsContentPageProps {
  content: DocContent;
}

interface DocTopic {
  id: string;
  title: string;
  blocks: DocBlock[];
}

const getTopicLabel = (
  block: Exclude<DocBlock, { type: 'subheading' }>,
  isFirstTextGroup: boolean,
  labels: DocsDocumentUi['topicLabels']
) => {
  switch (block.type) {
    case 'p':
      return isFirstTextGroup ? labels.introduction : labels.details;
    case 'cards':
      return labels.keyConcepts;
    case 'callout':
      return labels.importantNote;
    case 'list':
      return labels.guidance;
    case 'table':
      return labels.reference;
    case 'code':
      return labels.codeExample;
    case 'changelog':
      return labels.releaseHistory;
  }
};

const createTopics = (section: DocSection, labels: DocsDocumentUi['topicLabels']): DocTopic[] => {
  const topics: Array<DocTopic & { kind: DocBlock['type'] }> = [];
  const titleCounts = new Map<string, number>();
  let pendingTitle: string | null = null;
  let hasTextGroup = false;

  section.blocks.forEach((block, index) => {
    if (block.type === 'subheading') {
      pendingTitle = block.text;
      return;
    }

    const previousTopic = topics.at(-1);
    if (block.type === 'p' && previousTopic?.kind === 'p' && pendingTitle === null) {
      previousTopic.blocks.push(block);
      return;
    }

    const baseTitle = pendingTitle ?? getTopicLabel(block, !hasTextGroup, labels);
    const occurrence = (titleCounts.get(baseTitle) ?? 0) + 1;
    titleCounts.set(baseTitle, occurrence);

    topics.push({
      id: `${section.id}-topic-${index}`,
      title: occurrence === 1 ? baseTitle : `${baseTitle} ${occurrence}`,
      blocks: [block],
      kind: block.type
    });

    if (block.type === 'p') {
      hasTextGroup = true;
    }
    pendingTitle = null;
  });

  return topics;
};

const renderBlock = (block: DocBlock, index: number) => {
  if (block.type === 'p') {
    return <p key={index}>{block.text}</p>;
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
        {block.items.map(item => (
          <li key={item.title}><strong>{item.title}:</strong> {item.text}</li>
        ))}
      </ul>
    );
  }

  if (block.type === 'cards') {
    return (
      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {block.cards.map(card => (
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
      <div key={index} className="border border-slate-100 dark:border-slate-800/40 rounded-xl overflow-x-auto mt-4">
        <table className="w-full min-w-[560px] text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/40">
              {block.headers.map(header => (
                <th key={header} className="p-3 font-semibold text-slate-900 dark:text-white">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-600 dark:text-slate-400">
            {block.rows.map((row, rowIndex) => (
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
        {block.items.map(item => (
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

export default function DocsDocument({
  content,
  categories,
  ui,
  copyStatus,
  feedbackSubmitted,
  previousPage,
  nextPage,
  onCopyPage,
  onFeedback,
  onNavigate,
  onBackToLanding
}: DocsDocumentProps) {
  const [activeSectionId, setActiveSectionId] = useState(content.sections[0]?.id ?? '');

  useEffect(() => {
    const hashSectionId = window.location.hash.slice(1);
    const nextSectionId = content.sections.some(section => section.id === hashSectionId)
      ? hashSectionId
      : content.sections[0]?.id ?? '';

    setActiveSectionId(nextSectionId);
  }, [content]);

  const activeSection = content.sections.find(section => section.id === activeSectionId) ?? content.sections[0];
  const topics = useMemo(
    () => activeSection ? createTopics(activeSection, ui.topicLabels) : [],
    [activeSection, ui.topicLabels]
  );

  const handleSectionChange = (sectionId: string) => {
    setActiveSectionId(sectionId);
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${sectionId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <aside className="hidden md:block md:col-span-3 sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-none space-y-6 pr-2">
        <button onClick={onBackToLanding} className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition pb-2 border-b border-slate-100 dark:border-slate-850/20 w-full">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{ui.backToMain}</span>
        </button>

        <nav aria-label={ui.documentSections} className="space-y-1">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">{ui.documentSections}</h3>
          <div className="space-y-0.5">
            {content.sections.map(section => {
              const isActive = section.id === activeSection?.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`block w-full px-3 py-2 text-left text-xs md:text-[13px] font-medium rounded-lg transition ${
                    isActive
                      ? 'bg-[#EEF2F6] dark:bg-slate-800 text-[#354CE1] dark:text-[#5F75FF] font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-850'
                  }`}
                >
                  {section.title}
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      <main className="col-span-1 md:col-span-7 space-y-8 min-h-[60vh] md:pr-4">
        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>{categories[content.category]}</span>
          <button onClick={onCopyPage} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800/40 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-300 font-medium transition cursor-pointer">
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
          <h1 className="font-sans font-bold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">{content.title}</h1>
        </div>

        <div className="md:hidden space-y-2">
          <label htmlFor={`${content.category}-section-select`} className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {ui.documentSections}
          </label>
          <select
            id={`${content.category}-section-select`}
            value={activeSection?.id ?? ''}
            onChange={(event) => handleSectionChange(event.target.value)}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-100"
          >
            {content.sections.map(section => (
              <option key={section.id} value={section.id}>{section.title}</option>
            ))}
          </select>
        </div>

        {activeSection && (
          <section key={activeSection.id} id={activeSection.id} className="space-y-8 scroll-mt-32">
            <h2 className="font-sans font-bold text-xl md:text-2xl text-slate-900 dark:text-white tracking-tight pt-2">{activeSection.title}</h2>
            {topics.map(topic => (
              <section key={topic.id} id={topic.id} className="space-y-3 scroll-mt-32">
                <h3 className="font-sans font-semibold text-base md:text-lg text-slate-900 dark:text-white">{topic.title}</h3>
                <div className="space-y-4 text-[16px] md:text-[17px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {topic.blocks.map(renderBlock)}
                </div>
              </section>
            ))}
          </section>
        )}

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
              <button onClick={() => onFeedback('yes')} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-750/30 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 hover:text-emerald-600 transition">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{ui.yes}</span>
              </button>
              <button onClick={() => onFeedback('no')} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-750/30 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 hover:text-rose-600 transition">
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>{ui.no}</span>
              </button>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-850/30 flex items-center justify-between">
          {previousPage ? (
            <button onClick={() => onNavigate(previousPage.id)} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#354CE1] dark:hover:text-[#5F75FF] hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800/40 transition text-left">
              <ChevronLeft className="w-4 h-4" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">{ui.previous}</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{previousPage.label}</span>
              </div>
            </button>
          ) : <div />}

          {nextPage ? (
            <button onClick={() => onNavigate(nextPage.id)} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800/40 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 hover:border-[#354CE1]/50 transition text-right max-w-xs w-full">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">{ui.nextPage}</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block">{nextPage.label}</span>
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

      <aside className="hidden md:block md:col-span-2 sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-none pr-2">
        <nav aria-label={ui.sectionTopics} className="space-y-4">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{ui.sectionTopics}</h4>
          <ul className="space-y-2 border-l border-slate-100 dark:border-slate-850/20 text-xs font-medium">
            {topics.map(topic => (
              <li key={topic.id}>
                <a
                  href={`#${topic.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById(topic.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="block pl-4 py-1 text-slate-500 dark:text-slate-400 transition-all border-l-2 border-transparent -ml-[2px] hover:text-[#354CE1] dark:hover:text-[#5F75FF] hover:border-[#354CE1]"
                >
                  {topic.title}
                </a>
                </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
