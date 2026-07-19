import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ShieldCheck,
  ThumbsDown,
  ThumbsUp
} from 'lucide-react';
import CodeBlock from '../CodeBlock';
import DocsSdkFlowCodeExplorer from './DocsSdkFlowCodeExplorer';
import type { DocBlock, DocContent, DocSection, DocsArticleLayoutUi, DocsContentPageProps } from './docsModel';

interface DocsArticleLayoutProps extends DocsContentPageProps {
  content: DocContent;
}

interface DocTopic {
  id: string;
  title: string;
  blocks: DocBlock[];
}

const DocsApiReferenceCodeExplorer = React.lazy(() => import('./DocsApiReferenceCodeExplorer'));

const referenceActorStyles = {
  issuer: 'bg-[#5B6CFF]/10 text-[#5B6CFF] dark:text-[#7C8CFF]',
  holder: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  verifier: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
};

const getTopicLabel = (
  block: Exclude<DocBlock, { type: 'subheading' }>,
  isFirstTextGroup: boolean,
  labels: DocsArticleLayoutUi['topicLabels']
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
    case 'sdkExplorer':
      return labels.codeExample;
    case 'referenceStage':
      return block.stage.title;
    case 'changelog':
      return labels.releaseHistory;
  }
};

const createTopics = (section: DocSection, labels: DocsArticleLayoutUi['topicLabels']): DocTopic[] => {
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

  if (block.type === 'sdkExplorer') {
    return (
      <React.Fragment key={index}>
        <DocsSdkFlowCodeExplorer flow={block.flow} />
      </React.Fragment>
    );
  }

  if (block.type === 'referenceStage') {
    const { stage } = block;

    return (
      <div key={index} className="not-prose overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-sm dark:border-slate-800/40 dark:bg-slate-900">
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-[#5B6CFF] dark:text-[#7C8CFF]">
                  {stage.number} · {stage.phaseLabel}
                </span>
                <span className={`inline-flex rounded-lg px-2 py-1 text-[10px] font-extrabold ${referenceActorStyles[stage.actor]}`}>
                  {stage.actorLabel}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {stage.summary}
              </p>
            </div>
            <div className="shrink-0 rounded-xl bg-[#F7F8FC] px-3 py-2 text-xs font-bold text-slate-600 dark:bg-[#0B0F1A] dark:text-slate-300">
              {stage.protocol}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-[#F7F8FC] p-4 dark:bg-[#0B0F1A]">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {stage.inputLabel}
              </p>
              <div className="mt-3 space-y-2">
                {stage.inputs.map(item => (
                  <p key={item} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#5B6CFF] dark:text-[#7C8CFF]" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-[#F7F8FC] p-4 dark:bg-[#0B0F1A]">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {stage.outputLabel}
              </p>
              <div className="mt-3 space-y-2">
                {stage.outputs.map(item => (
                  <p key={item} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#5B6CFF]/15 bg-[#5B6CFF]/5 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#5B6CFF] dark:text-[#7C8CFF]" />
            <div>
              <p className="text-xs font-extrabold text-slate-900 dark:text-white">{stage.securityLabel}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{stage.security}</p>
            </div>
          </div>
        </div>

        <React.Suspense fallback={<div className="h-40 bg-[#0D1220]" />}>
          <DocsApiReferenceCodeExplorer codeKey={stage.codeKey} variants={stage.variants} />
        </React.Suspense>
      </div>
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

export default function DocsArticleLayout({
  content,
  ui,
  copyStatus,
  feedbackSubmitted,
  onCopyPage,
  onFeedback,
  onBackToLanding
}: DocsArticleLayoutProps) {
  const [activeSectionId, setActiveSectionId] = useState(content.sections[0]?.id ?? '');

  useEffect(() => {
    const hashSectionId = window.location.hash.slice(1);
    const nextSectionId = content.sections.some(section => section.id === hashSectionId)
      ? hashSectionId
      : content.sections[0]?.id ?? '';

    setActiveSectionId(nextSectionId);
  }, [content]);

  const activeSection = content.sections.find(section => section.id === activeSectionId) ?? content.sections[0];
  const activeSectionIndex = activeSection
    ? content.sections.findIndex(section => section.id === activeSection.id)
    : -1;
  const previousSection = activeSectionIndex > 0 ? content.sections[activeSectionIndex - 1] : null;
  const nextSection = activeSectionIndex >= 0 && activeSectionIndex < content.sections.length - 1
    ? content.sections[activeSectionIndex + 1]
    : null;
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

      <main aria-label={content.title} className="col-span-1 md:col-span-7 space-y-8 min-h-[60vh] md:pr-4">
        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>{content.title}</span>
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

        <div className="pt-6 border-t border-slate-100 dark:border-slate-850/30 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {previousSection ? (
            <button onClick={() => handleSectionChange(previousSection.id)} className="flex min-h-20 w-full max-w-xs cursor-pointer items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 text-left transition hover:border-[#354CE1]/50 hover:bg-slate-50 dark:border-slate-800/40 dark:bg-slate-900 dark:hover:bg-slate-850">
              <ChevronLeft className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">{ui.previousSection}</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block">{previousSection.title}</span>
              </div>
            </button>
          ) : <div className="hidden sm:block" />}

          {nextSection ? (
            <button onClick={() => handleSectionChange(nextSection.id)} className="flex min-h-20 w-full max-w-xs cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-100 bg-white p-4 text-left transition hover:border-[#354CE1]/50 hover:bg-slate-50 dark:border-slate-800/40 dark:bg-slate-900 dark:hover:bg-slate-850 sm:justify-self-end">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">{ui.nextSection}</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white mt-1 block">{nextSection.title}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
            </button>
          ) : <div className="hidden sm:block" />}
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
