/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  Calendar,
  ChevronLeft,
  Clock,
  Share2,
  Sparkles,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { StructuredBlogArticle } from '../../content/blog/structuredBlogArticleModel';
import { getRelatedStructuredBlogArticles } from '../../content/blog/structuredBlogArticles';
import {
  BLOG_DETAIL_PAGE_TRANSLATIONS,
} from '../../translations/BlogDetailPageTranslations';
import { blogDetailPath, type BlogDetailId, viewToPath } from '../../types/routes';
import { copyTextToClipboard } from '../../utils/clipboard';

interface StructuredBlogDetailPageProps {
  article: StructuredBlogArticle;
  onBack: () => void;
  onOpenArticle: (id: BlogDetailId) => void;
  onOpenSandbox: () => void;
}

const headingId = (value: React.ReactNode): string =>
  React.Children.toArray(value)
    .join(' ')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const isImageParagraph = (node: unknown): boolean => {
  const paragraphNode = node as {
    children?: Array<{ tagName?: string }>;
  };

  return paragraphNode.children?.some((child) => child.tagName === 'img') ?? false;
};

const isCaptionParagraph = (children: React.ReactNode): boolean => {
  const childList = React.Children.toArray(children);
  if (childList.length !== 1 || !React.isValidElement(childList[0])) return false;
  if (childList[0].type !== 'em') return false;

  const captionText = React.Children.toArray(
    (childList[0].props as { children?: React.ReactNode }).children,
  ).join('');

  return captionText.startsWith('Hình ');
};

export default function StructuredBlogDetailPage({
  article,
  onBack,
  onOpenArticle,
  onOpenSandbox,
}: StructuredBlogDetailPageProps) {
  const content = article.content.vi;
  const commonCopy = BLOG_DETAIL_PAGE_TRANSLATIONS.vi.copy;
  const relatedPosts = getRelatedStructuredBlogArticles(article);
  const [activeSection, setActiveSection] = useState(content.tableOfContents[0]?.id ?? '');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const publishedDate = new Date(`${article.publishedAt}T00:00:00Z`);
  const formattedDate = `${publishedDate.getUTCDate()} tháng ${
    publishedDate.getUTCMonth() + 1
  } năm ${publishedDate.getUTCFullYear()}`;

  useEffect(() => {
    const sections = content.tableOfContents
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-120px 0px -65% 0px',
        threshold: [0, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [content.tableOfContents]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  const handleShare = async () => {
    const copied = await copyTextToClipboard(
      `${window.location.origin}${blogDetailPath(article.id, 'vi')}`,
    );
    setCopyStatus(copied ? 'success' : 'error');
    window.setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const shouldUseNativeLinkNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => event.defaultPrevented
    || event.button !== 0
    || event.metaKey
    || event.ctrlKey
    || event.shiftKey
    || event.altKey;

  const handleBackLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldUseNativeLinkNavigation(event)) return;

    event.preventDefault();
    onBack();
  };

  const handleRelatedArticleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    articleId: BlogDetailId,
  ) => {
    if (shouldUseNativeLinkNavigation(event)) return;

    event.preventDefault();
    onOpenArticle(articleId);
  };

  const markdownComponents = {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2
        id={headingId(children)}
        className="type-document-heading scroll-mt-24 border-b border-slate-100 pb-2 pt-2 text-slate-900"
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3
        id={headingId(children)}
        className="type-card-title scroll-mt-24 pt-2 text-slate-950"
      >
        {children}
      </h3>
    ),
    p: ({
      children,
      node,
    }: {
      children?: React.ReactNode;
      node?: unknown;
    }) => {
      if (isImageParagraph(node)) {
        return (
          <p className="my-8 overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-xs">
            {children}
          </p>
        );
      }

      if (isCaptionParagraph(children)) {
        return (
          <p className="-mt-5 rounded-xl border border-slate-200/40 bg-white/50 p-3 text-center text-xs italic leading-relaxed text-slate-500">
            {children}
          </p>
        );
      }

      return (
        <p className="hyphens-auto text-justify [text-justify:inter-word]">
          {children}
        </p>
      );
    },
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="ml-5 list-disc space-y-2 marker:text-[#354CE1]">{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="ml-5 list-decimal space-y-2 marker:font-semibold marker:text-[#354CE1]">
        {children}
      </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="pl-1 leading-relaxed">{children}</li>
    ),
    a: ({
      children,
      href,
    }: {
      children?: React.ReactNode;
      href?: string;
    }) => {
      const external = href?.startsWith('http');
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer noopener' : undefined}
          className="font-medium text-[#354CE1] underline decoration-indigo-200 underline-offset-4 transition hover:decoration-[#354CE1]"
        >
          {children}
        </a>
      );
    },
    img: ({
      alt,
      src,
    }: {
      alt?: string;
      src?: string;
    }) => {
      const image = src ? article.images[src as keyof typeof article.images] : undefined;

      return (
        <img
          src={image?.src ?? src}
          srcSet={image?.srcSet}
          sizes={image?.sizes}
          width={image?.width}
          height={image?.height}
          alt={alt ?? ''}
          loading="lazy"
          decoding="async"
          className="aspect-video h-auto w-full object-cover"
        />
      );
    },
    table: ({ children }: { children?: React.ReactNode }) => (
      <div className="my-8 overflow-x-auto rounded-2xl border border-slate-200/60 bg-white shadow-xs">
        <table className="min-w-[900px] border-collapse text-left text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
      <thead className="bg-slate-950 text-white">{children}</thead>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
      <th className="border-b border-slate-200 px-4 py-3 font-semibold">{children}</th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
      <td className="border-b border-r border-slate-100 px-4 py-3 align-top leading-6 text-slate-600 last:border-r-0">
        {children}
      </td>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="rounded-r-2xl border-l-4 border-[#354CE1] bg-indigo-50/60 px-5 py-4 text-slate-700">
        {children}
      </blockquote>
    ),
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] font-sans text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      <div className="mx-auto max-w-7xl px-6 pb-2 pt-6">
        <div className="flex items-center justify-between">
          <a
            id="btn-back-to-blog"
            href={viewToPath('blog', 'vi')}
            onClick={handleBackLinkClick}
            className="group flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#354CE1]"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>{commonCopy.backToBlog}</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              id="btn-bookmark"
              type="button"
              onClick={() => setIsBookmarked((current) => !current)}
              className={`rounded-full border p-2 transition ${
                isBookmarked
                  ? 'border-[#354CE1] bg-[#354CE1]/10 text-[#354CE1]'
                  : 'border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
              title={commonCopy.bookmarkArticle}
              aria-pressed={isBookmarked}
            >
              <Bookmark className="h-4 w-4 fill-current" />
            </button>
            <button
              id="btn-share"
              type="button"
              onClick={handleShare}
              className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
              title={copyStatus === 'error' ? commonCopy.copyFailed : commonCopy.copyOriginalLink}
            >
              {copyStatus !== 'idle' ? (
                <span
                  role="status"
                  className={`type-caption absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-white ${
                    copyStatus === 'success' ? 'bg-slate-900' : 'bg-rose-600'
                  }`}
                >
                  {copyStatus === 'success' ? commonCopy.copied : commonCopy.copyFailed}
                </span>
              ) : null}
              <Share2 className="h-4 w-4" />
            </button>
            <button
              id="btn-get-started"
              type="button"
              onClick={onOpenSandbox}
              className="rounded-full bg-[#354CE1] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#2539BE]"
            >
              {commonCopy.tryTheDemo}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-4 pt-8">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] p-8 text-white shadow-xl shadow-indigo-950/5 md:p-12 lg:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="pointer-events-none absolute left-1/10 top-1/4 h-48 w-48 animate-pulse rounded-full bg-yellow-400/25 blur-3xl" />
          <div className="pointer-events-none absolute bottom-1/4 right-1/10 h-72 w-72 rounded-full bg-[#00E5FF]/20 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="type-label rounded-full border border-white/25 bg-white/20 px-3 py-1 uppercase text-yellow-300 backdrop-blur-md">
                {content.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-indigo-100">
                <Calendar className="h-3.5 w-3.5 text-indigo-200" />
                <span>{content.ui.publishedLabel} {formattedDate}</span>
              </div>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-1.5 text-xs text-indigo-100">
                <Clock className="h-3.5 w-3.5 text-indigo-200" />
                <span>{article.listing.vi.duration}</span>
              </div>
            </div>

            <h1 className="type-document-title measure-display text-balance mb-6 max-w-4xl">
              {content.title}
            </h1>

            <p className="mb-8 max-w-3xl text-base font-normal leading-relaxed text-slate-200 md:text-lg">
              {content.description}
            </p>

            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
              <div className="type-control flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/20 bg-gradient-to-tr from-[#354CE1] to-[#BE185D] text-white shadow-md">
                ID
              </div>
              <div>
                <p className="text-sm font-bold text-white">{article.author.name}</p>
                <p className="text-xs text-slate-300">{content.ui.authorRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <article className="space-y-4 text-base font-normal leading-relaxed text-slate-700 lg:col-span-8 [&>p:first-child]:text-lg [&>p:first-child]:leading-relaxed [&>p:first-child]:text-slate-800">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {content.markdown}
            </ReactMarkdown>
          </article>

          <aside className="space-y-8 lg:sticky lg:top-6 lg:col-span-4 lg:h-[calc(100vh-3rem)] lg:overflow-y-auto lg:overscroll-contain lg:px-3 lg:pb-3">
            <div className="rounded-2xl bg-white p-5 shadow-[0_0_18px_rgba(15,23,42,0.08)]">
              <h3 className="type-label mb-4 uppercase text-slate-400">
                {content.ui.tableOfContents}
              </h3>
              <nav aria-label={content.ui.tableOfContents} className="flex flex-col gap-1">
                {content.tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`rounded-lg border-l-2 px-3 py-2 text-left text-xs font-semibold leading-snug transition-all ${
                      item.level === 3 ? 'pl-6' : ''
                    } ${
                      activeSection === item.id
                        ? 'border-[#354CE1] bg-[#354CE1]/10 pl-4 font-bold text-[#354CE1]'
                        : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="space-y-4 rounded-2xl bg-gradient-to-b from-indigo-900 to-[#12183A] p-6 text-white shadow-md">
              <Sparkles className="h-8 w-8 text-[#4F6CFF]" />
              <div className="space-y-1">
                <h4 className="type-card-title">{content.ui.ctaTitle}</h4>
                <p className="type-body-sm text-slate-300">
                  {content.ui.ctaDescription}
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenSandbox}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#354CE1] py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#2539BE]"
              >
                <span>{content.ui.ctaButtonLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </aside>
        </div>
      </div>

      <div className="border-t border-slate-200/60 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="type-section-title-compact mb-8 text-slate-950">
            {commonCopy.continueReading}
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedArticle) => {
              const relatedContent = relatedArticle.content.vi;

              return (
                <a
                  key={relatedArticle.id}
                  href={blogDetailPath(relatedArticle.id, 'vi')}
                  onClick={(event) => handleRelatedArticleLinkClick(event, relatedArticle.id)}
                  aria-label={relatedContent.title}
                  className="group flex w-full cursor-pointer flex-col justify-between rounded-2xl p-5 text-left shadow-[0_0_18px_rgba(15,23,42,0.08)] transition-all duration-200 hover:shadow-md hover:ring-1 hover:ring-[#354CE1]/50"
                >
                  <div className="space-y-3">
                    <div className="type-label flex items-center gap-2 uppercase text-slate-400">
                      <span>{relatedContent.category}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{relatedArticle.listing.vi.duration}</span>
                    </div>
                    <h4 className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#354CE1]">
                      {relatedContent.title}
                    </h4>
                    <p className="line-clamp-3 text-xs font-normal leading-relaxed text-slate-500">
                      {relatedContent.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#354CE1]">
                    <span>{commonCopy.readArticle}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
