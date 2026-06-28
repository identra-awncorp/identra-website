import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Link2,
  ThumbsDown,
  ThumbsUp,
  User,
} from 'lucide-react';
import { academicBlogContentDb } from '../data/blogContent';
import type { BlogPost } from './BlogSubpage';
import DynamicBlogArticle from './DynamicBlogArticle';

interface BlogDetailSubpageProps {
  lang: 'vi' | 'en';
  post: BlogPost;
  allPosts: BlogPost[];
  onBackToList: () => void;
  onNavigateToPost: (post: BlogPost) => void;
  onTagClick: (tag: string) => void;
}

const formatLabels = {
  'conceptual-paper': { vi: 'Chuyên khảo khái niệm', en: 'Conceptual paper' },
  'engineering-guide': { vi: 'Hướng dẫn kỹ thuật', en: 'Engineering guide' },
  'security-analysis': { vi: 'Phân tích bảo mật', en: 'Security analysis' },
  'case-study': { vi: 'Nghiên cứu tình huống', en: 'Case study' },
  'technical-reference': { vi: 'Tài liệu tham chiếu', en: 'Technical reference' },
};

export default function BlogDetailSubpage({
  lang,
  post,
  allPosts,
  onBackToList,
  onNavigateToPost,
  onTagClick,
}: BlogDetailSubpageProps) {
  const isVi = lang === 'vi';
  const article = academicBlogContentDb[post.id];
  const articleTitle = article?.title[lang] ?? post.title;
  const articleDeck = article?.deck[lang] ?? post.excerpt ?? articleTitle;
  const formatLabel = article ? formatLabels[article.format][lang] : (isVi ? 'Bài viết' : 'Article');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null);

  const { previousPost, nextPost, relatedPosts } = useMemo(() => {
    const index = allPosts.findIndex((item) => item.id === post.id);
    return {
      previousPost: allPosts[index > 0 ? index - 1 : allPosts.length - 1],
      nextPost: allPosts[index < allPosts.length - 1 ? index + 1 : 0],
      relatedPosts: allPosts.filter((item) => item.id !== post.id).slice(0, 3),
    };
  }, [allPosts, post.id]);

  useEffect(() => {
    setCopiedCode(false);
    setCopiedLink(false);
    setFeedback(null);
  }, [post.id]);

  useEffect(() => {
    document.title = `${articleTitle} | Identra`;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', articleDeck);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', articleTitle);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', articleDeck);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', articleTitle);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute('content', articleDeck);
  }, [articleDeck, articleTitle]);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    window.setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 2000);
  };

  const navigateToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] pb-20 font-sans text-slate-900 transition-colors duration-300 dark:bg-[#0B0F1A] dark:text-slate-100">
      <header className="border-b border-[#E5E7EB] bg-white px-6 py-8 transition-colors duration-300 lg:px-12 dark:border-slate-800 dark:bg-[#0F172A]/40">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={onBackToList}
            className="-ml-3 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl px-3 text-xs font-bold text-[#5B6CFF] transition-colors hover:text-[#4A5AF0] dark:text-[#7C8CFF] dark:hover:text-[#6B7BFF]"
          >
            <ArrowLeft className="h-4 w-4" />
            {isVi ? 'Quay lại Blog' : 'Back to Blog'}
          </button>

          <div className="mt-8 max-w-5xl">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span className="rounded-lg bg-[#5B6CFF] px-3 py-1.5 uppercase tracking-[0.12em] text-white dark:bg-[#7C8CFF] dark:text-slate-950">
                {formatLabel}
              </span>
              <span>{post.category}</span>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
            </div>

            <h1 className="mt-6 max-w-[22ch] text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
              {articleTitle}
            </h1>
            <p className="mt-5 max-w-[72ch] text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
              {articleDeck}
            </p>

            <div className="mt-8 flex flex-col gap-5 border-t border-[#E5E7EB] pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5B6CFF]/10 text-[#5B6CFF] dark:text-[#7C8CFF]">
                  <User className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-950 dark:text-white">{post.author}</p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{post.date}</p>
                </div>
              </div>

              <button
                onClick={copyLink}
                className="inline-flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-xs font-bold text-slate-600 transition-colors hover:border-[#5B6CFF] hover:text-[#5B6CFF] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-[#7C8CFF] dark:hover:text-[#7C8CFF]"
              >
                {copiedLink ? <Check className="h-4 w-4 text-emerald-500" /> : <Link2 className="h-4 w-4" />}
                {copiedLink ? (isVi ? 'Đã sao chép liên kết' : 'Link copied') : (isVi ? 'Sao chép liên kết' : 'Copy link')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-12 lg:px-12">
        <main className="space-y-12 lg:col-span-8">
          <DynamicBlogArticle
            lang={lang}
            postId={post.id}
            copiedCode={copiedCode}
            onCopyCode={copyCode}
          />

          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
            {feedback ? (
              <p className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                <Check className="h-4 w-4" />
                {isVi ? 'Cảm ơn bạn đã phản hồi.' : 'Thanks for your feedback.'}
              </p>
            ) : (
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-950 dark:text-white">{isVi ? 'Bài viết này có hữu ích không?' : 'Was this article useful?'}</h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{isVi ? 'Phản hồi giúp chúng tôi cải thiện nội dung tiếp theo.' : 'Your feedback helps improve future articles.'}</p>
                </div>
                <div className="flex gap-2">
                  <FeedbackButton label={isVi ? 'Hữu ích' : 'Useful'} onClick={() => setFeedback('liked')} icon={<ThumbsUp className="h-4 w-4" />} />
                  <FeedbackButton label={isVi ? 'Cần cải thiện' : 'Needs work'} onClick={() => setFeedback('disliked')} icon={<ThumbsDown className="h-4 w-4" />} />
                </div>
              </div>
            )}
          </section>

          <nav className="grid gap-4 border-t border-[#E5E7EB] pt-8 sm:grid-cols-2 dark:border-slate-800" aria-label={isVi ? 'Điều hướng bài viết' : 'Article navigation'}>
            <ArticleNavigationCard direction="previous" post={previousPost} lang={lang} onClick={() => onNavigateToPost(previousPost)} />
            <ArticleNavigationCard direction="next" post={nextPost} lang={lang} onClick={() => onNavigateToPost(nextPost)} />
          </nav>
        </main>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:col-span-4 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
          {article && (
            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
              <h2 className="text-xs font-black uppercase tracking-[0.14em] text-slate-950 dark:text-white">
                {isVi ? 'Trong bài viết' : 'In this article'}
              </h2>
              <ol className="mt-5 space-y-1">
                {article.sections.map((section, index) => (
                  <li key={section.id}>
                    <button
                      onClick={() => navigateToSection(section.id)}
                      className="grid w-full cursor-pointer grid-cols-[28px_1fr] gap-2 rounded-xl px-2 py-2.5 text-left text-xs font-semibold leading-5 text-slate-500 transition-colors hover:bg-[#F1F3FF] hover:text-[#5B6CFF] dark:text-slate-400 dark:hover:bg-[#12182D] dark:hover:text-[#7C8CFF]"
                    >
                      <span className="font-mono text-[10px]">{String(index + 1).padStart(2, '0')}</span>
                      {section.title[lang]}
                    </button>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
            <h2 className="text-xs font-black uppercase tracking-[0.14em] text-slate-950 dark:text-white">
              {isVi ? 'Đọc tiếp' : 'Continue reading'}
            </h2>
            <div className="mt-5 space-y-5">
              {relatedPosts.map((item) => (
                <button key={item.id} onClick={() => onNavigateToPost(item)} className="group flex w-full cursor-pointer gap-3 text-left">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5B6CFF]/10 text-[#5B6CFF] dark:text-[#7C8CFF]">
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="line-clamp-2 text-sm font-bold leading-6 text-slate-950 transition-colors group-hover:text-[#5B6CFF] dark:text-white dark:group-hover:text-[#7C8CFF]">{item.title}</span>
                    <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">{item.readTime}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
            <h2 className="text-xs font-black uppercase tracking-[0.14em] text-slate-950 dark:text-white">{isVi ? 'Chủ đề' : 'Topics'}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {['#SSI', '#DID', '#CertNet', '#DIDComm', '#VerifiableCredentials'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    onTagClick(tag);
                    onBackToList();
                  }}
                  className="min-h-9 cursor-pointer rounded-xl border border-[#E5E7EB] px-3 text-xs font-bold text-slate-500 transition-colors hover:border-[#5B6CFF] hover:text-[#5B6CFF] dark:border-slate-700 dark:text-slate-400 dark:hover:border-[#7C8CFF] dark:hover:text-[#7C8CFF]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function FeedbackButton({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-[#E5E7EB] px-4 text-xs font-bold text-slate-600 transition-colors hover:border-[#5B6CFF] hover:text-[#5B6CFF] dark:border-slate-700 dark:text-slate-300 dark:hover:border-[#7C8CFF] dark:hover:text-[#7C8CFF]">
      {icon}
      {label}
    </button>
  );
}

function ArticleNavigationCard({
  direction,
  post,
  lang,
  onClick,
}: {
  direction: 'previous' | 'next';
  post: BlogPost;
  lang: 'vi' | 'en';
  onClick: () => void;
}) {
  const isPrevious = direction === 'previous';
  return (
    <button onClick={onClick} className="group flex min-h-24 cursor-pointer items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5 text-left transition-colors hover:border-[#C7CEFF] dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-[#343E78]">
      {isPrevious && <ChevronLeft className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:-translate-x-1" />}
      <span className="min-w-0 flex-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
          {isPrevious ? (lang === 'vi' ? 'Bài trước' : 'Previous') : (lang === 'vi' ? 'Bài tiếp theo' : 'Next')}
        </span>
        <span className="mt-2 line-clamp-2 block text-sm font-bold leading-6 text-slate-950 transition-colors group-hover:text-[#5B6CFF] dark:text-white dark:group-hover:text-[#7C8CFF]">{post.title}</span>
      </span>
      {!isPrevious && <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />}
    </button>
  );
}
