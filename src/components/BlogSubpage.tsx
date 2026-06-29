import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import BlogDetailSubpage from './BlogDetailSubpage';
import { academicBlogContentDb } from '../data/blogContent';
import {
  AlertCircle,
  ArrowLeft,
  BarChart3,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Cpu,
  FileText,
  RefreshCw,
  Search,
  Shield,
  Smartphone,
  Sparkles,
  Tag,
  User,
  Zap,
} from 'lucide-react';

export type BlogPost = {
  id: string;
  slug: string;
  illustrationUrl?: string;
  title: string;
  excerpt?: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  variant?: 'featured' | 'guide' | 'security' | 'tech' | 'usecase';
  views?: number;
};

type BlogCategoryKey = 'all' | 'SSI' | 'Bảo mật' | 'Công nghệ' | 'Hướng dẫn' | 'Use case';

type BlogCategory = {
  id: string;
  key: BlogCategoryKey;
  labelVi: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string }>;
};

interface BlogSubpageProps {
  lang: 'vi' | 'en';
  path: string;
  onBack: () => void;
  onOpenDemo?: () => void;
  onNavigateToPost?: (postId: string | null) => void;
}

const blogCategories: BlogCategory[] = [
  { id: 'all', key: 'all', labelVi: 'Tất cả chủ đề', labelEn: 'All topics', icon: Cpu },
  { id: 'ssi', key: 'SSI', labelVi: 'SSI cơ bản', labelEn: 'SSI basics', icon: User },
  { id: 'security', key: 'Bảo mật', labelVi: 'Bảo mật', labelEn: 'Security', icon: Shield },
  { id: 'tech', key: 'Công nghệ', labelVi: 'Công nghệ', labelEn: 'Technology', icon: Cpu },
  { id: 'guide', key: 'Hướng dẫn', labelVi: 'Hướng dẫn', labelEn: 'Guides', icon: BookOpen },
  { id: 'usecase', key: 'Use case', labelVi: 'Use case', labelEn: 'Use case', icon: Zap },
];

function matchCategory(post: BlogPost, selectedCategory: BlogCategoryKey) {
  if (selectedCategory === 'all') return true;

  const category = post.category.toLowerCase().trim();
  const selected = selectedCategory.toLowerCase().trim();

  if (selected === 'ssi') return category === 'ssi';
  if (selected === 'bảo mật') return category === 'bảo mật' || category === 'security';
  if (selected === 'công nghệ') return category === 'công nghệ' || category === 'technology';
  if (selected === 'hướng dẫn') return category === 'hướng dẫn' || category === 'guide';
  if (selected === 'use case') return category === 'use case' || category === 'usecase';

  return category.includes(selected);
}

function getPostTone(post: Pick<BlogPost, 'variant'>) {
  if (post.variant === 'security') return {
    icon: Shield,
    color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    visual: 'from-emerald-50 to-teal-50 text-emerald-600 dark:from-emerald-950/30 dark:to-slate-950 dark:text-emerald-400',
  };
  if (post.variant === 'guide') return {
    icon: BookOpen,
    color: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    visual: 'from-amber-50 to-orange-50 text-amber-600 dark:from-amber-950/25 dark:to-slate-950 dark:text-amber-400',
  };
  if (post.variant === 'usecase') return {
    icon: Smartphone,
    color: 'bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400',
    visual: 'from-sky-50 to-cyan-50 text-sky-600 dark:from-sky-950/25 dark:to-slate-950 dark:text-sky-400',
  };
  if (post.variant === 'featured') return {
    icon: Sparkles,
    color: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
    visual: 'from-[#F1F3FF] to-white text-[#5B6CFF] dark:from-[#12182D] dark:to-slate-950 dark:text-[#7C8CFF]',
  };
  return {
    icon: Cpu,
    color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    visual: 'from-[#F1F3FF] to-white text-[#5B6CFF] dark:from-[#12182D] dark:to-slate-950 dark:text-[#7C8CFF]',
  };
}

export default function BlogSubpage({ lang = 'vi', path, onBack, onOpenDemo, onNavigateToPost }: BlogSubpageProps) {
  const isVi = lang === 'vi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategoryKey>('all');
  const [sortBy, setSortBy] = useState('latest');
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const featuredPosts = useMemo<BlogPost[]>(() => [
    {
      id: 'f-1',
      slug: 'self-sovereign-identity',
      title: isVi ? 'SSI là gì? Tương lai của danh tính số tự chủ' : 'What is SSI? The Future of Self-Sovereign Identity',
      excerpt: isVi
        ? 'Tìm hiểu khái niệm SSI, cách hoạt động và vì sao nó sẽ thay đổi cách chúng ta kiểm soát danh tính.'
        : 'Explore Self-Sovereign Identity, how it works, and why it changes how people control credentials.',
      category: 'SSI',
      author: 'Nguyễn Minh Anh',
      date: isVi ? '20 Thg 5, 2024' : 'May 20, 2024',
      readTime: isVi ? '8 phút đọc' : '8 min read',
      variant: 'featured',
      views: 1240,
    },
    {
      id: 'f-2',
      slug: 'create-and-manage-ssi-wallet',
      title: isVi ? 'Hướng dẫn tạo và quản lý SSI Wallet' : 'Guide to Creating and Managing an SSI Wallet',
      excerpt: isVi
        ? 'Từng bước giúp người dùng thiết lập chiếc ví định danh bảo mật đầu tiên và nhận credential.'
        : 'A step-by-step guide to setting up a secure identity wallet and receiving credentials.',
      category: 'Hướng dẫn',
      author: 'Trần Hoàng Nam',
      date: isVi ? '15 Thg 5, 2024' : 'May 15, 2024',
      readTime: isVi ? '6 phút đọc' : '6 min read',
      variant: 'guide',
      views: 940,
    },
    {
      id: 'f-3',
      slug: 'zero-knowledge-proof-in-ssi',
      title: isVi ? 'Zero Knowledge Proof là gì? Ứng dụng trong SSI' : 'What is Zero Knowledge Proof? Applications in SSI',
      excerpt: isVi
        ? 'Phân tích cách Zero Knowledge Proof xác thực thông tin mà không tiết lộ dữ liệu nhạy cảm.'
        : 'How Zero Knowledge Proof validates statements without exposing sensitive raw data.',
      category: 'Bảo mật',
      author: 'Lê Thu Hà',
      date: isVi ? '10 Thg 5, 2024' : 'May 10, 2024',
      readTime: isVi ? '7 phút đọc' : '7 min read',
      variant: 'security',
      views: 1050,
    },
  ], [isVi]);

  const latestPosts = useMemo<BlogPost[]>(() => [
    {
      id: 'l-1',
      slug: 'blockchain-and-digital-identity',
      title: isVi ? 'Blockchain và danh tính: Mối liên hệ mật thiết' : 'Blockchain and Identity: An Indispensable Connection',
      excerpt: isVi
        ? 'Khám phá vai trò của registry, dữ liệu off-chain và neo trạng thái trong kiến trúc định danh.'
        : 'Explore registries, off-chain boundaries, and state anchoring in digital identity architecture.',
      category: 'Công nghệ',
      author: 'Phạm Quang Huy',
      date: isVi ? '08 Thg 5, 2024' : 'May 08, 2024',
      readTime: isVi ? '5 phút đọc' : '5 min read',
      variant: 'tech',
      views: 650,
    },
    {
      id: 'l-2',
      slug: 'ssi-in-education',
      title: isVi ? 'SSI trong giáo dục: Chứng chỉ số và quyền riêng tư' : 'SSI in Education: Verifiable Degrees and Privacy',
      excerpt: isVi
        ? 'Cách bằng cấp có thể xác minh bằng mật mã giúp giảm bằng giả và giảm thu thập dữ liệu quá mức.'
        : 'How cryptographically verifiable degrees reduce diploma fraud and unnecessary data collection.',
      category: 'Use case',
      author: 'Nguyễn Minh Anh',
      date: isVi ? '07 Thg 5, 2024' : 'May 07, 2024',
      readTime: isVi ? '6 phút đọc' : '6 min read',
      variant: 'usecase',
      views: 480,
    },
    {
      id: 'l-3',
      slug: 'recover-ssi-wallet',
      title: isVi ? 'Cách khôi phục SSI Wallet khi mất thiết bị' : 'How to Safely Recover your SSI Wallet on Lost Devices',
      excerpt: isVi
        ? 'Phân tích mô hình không export credential, đổi thiết bị và quy trình cấp lại thực chứng.'
        : 'A threat-model view of no-export credentials, device migration, and reissuance flows.',
      category: 'Hướng dẫn',
      author: 'Trần Hoàng Nam',
      date: isVi ? '05 Thg 5, 2024' : 'May 05, 2024',
      readTime: isVi ? '4 phút đọc' : '4 min read',
      variant: 'guide',
      views: 710,
    },
    {
      id: 'l-4',
      slug: 'phishing-risks-in-ssi',
      title: isVi ? 'Phishing và các rủi ro phổ biến khi sử dụng SSI' : 'Phishing and Social Exploits Targeting SSI users',
      excerpt: isVi
        ? 'Các invitation hợp lệ về kỹ thuật vẫn có thể lừa người dùng nếu thiếu trust policy và consent UX tốt.'
        : 'Technically valid invitations can still mislead users without strong trust policy and consent UX.',
      category: 'Bảo mật',
      author: 'Lê Thu Hà',
      date: isVi ? '03 Thg 5, 2024' : 'May 03, 2024',
      readTime: isVi ? '6 phút đọc' : '6 min read',
      variant: 'security',
      views: 890,
    },
    {
      id: 'l-5',
      slug: 'did-document-w3c',
      title: isVi ? 'Vai trò của DID Document trong hạ tầng W3C' : 'The Role of DID Documents in W3C Infrastructure',
      excerpt: isVi
        ? 'Cấu trúc DID Document, verification method, key rotation và resolution trong xác minh VC.'
        : 'DID Document structure, verification methods, key rotation, and resolution in VC verification.',
      category: 'Công nghệ',
      author: 'Phạm Quang Huy',
      date: isVi ? '01 Thg 5, 2024' : 'May 01, 2024',
      readTime: isVi ? '7 phút đọc' : '7 min read',
      variant: 'tech',
      views: 430,
    },
  ], [isVi]);

  const allPosts = useMemo(() => {
    return [...featuredPosts, ...latestPosts].map((post) => {
      const academic = academicBlogContentDb[post.id];
      return academic
        ? {
            ...post,
            title: academic.title[lang],
            excerpt: academic.deck[lang],
            readTime: lang === 'vi'
              ? `${academic.readingTimeMinutes} phút đọc`
              : `${academic.readingTimeMinutes} min read`,
          }
        : post;
    });
  }, [featuredPosts, lang, latestPosts]);

  const categoryCounts = useMemo(() => {
    return blogCategories.reduce<Record<string, number>>((counts, category) => {
      counts[category.id] = category.key === 'all'
        ? allPosts.length
        : allPosts.filter((post) => matchCategory(post, category.key)).length;
      return counts;
    }, {});
  }, [allPosts]);

  useEffect(() => {
    const postId = path.match(/^\/blog\/([^/]+)$/)?.[1];
    setSelectedPost(postId ? allPosts.find((post) => post.slug === decodeURIComponent(postId)) ?? null : null);
  }, [allPosts, path]);

  useEffect(() => {
    setVisibleCount(9);
  }, [searchQuery, selectedCategory, sortBy]);

  const filteredPosts = useMemo(() => {
    let result = allPosts.filter((post) => matchCategory(post, selectedCategory));

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query),
      );
    }

    if (sortBy === 'oldest') return [...result].sort((a, b) => a.id.localeCompare(b.id));
    if (sortBy === 'views') return [...result].sort((a, b) => (b.views || 0) - (a.views || 0));
    return [...result].sort((a, b) => b.id.localeCompare(a.id));
  }, [allPosts, searchQuery, selectedCategory, sortBy]);

  const currentPost = useMemo(() => {
    if (!selectedPost) return null;
    return allPosts.find((post) => post.id === selectedPost.id) || selectedPost;
  }, [allPosts, selectedPost]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('latest');
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag.replace('#', ''));
    setSelectedCategory('all');
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    onNavigateToPost?.(post.slug);
  };

  if (currentPost) {
    return (
      <BlogDetailSubpage
        lang={lang}
        post={currentPost}
        allPosts={allPosts}
        onBackToList={() => {
          setSelectedPost(null);
          onNavigateToPost?.(null);
        }}
        onNavigateToPost={(post) => {
          setSelectedPost(post);
          onNavigateToPost?.(post.slug);
        }}
        onTagClick={handleTagClick}
      />
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7F8FC] pb-24 font-sans text-[#1F2937] antialiased transition-colors duration-300 dark:bg-[#0B0F1A] dark:text-[#E5E7EB]">
      <BlogHero lang={lang} onBack={onBack} />

      <section className="relative z-20 mx-auto -mt-7 max-w-7xl px-6 lg:px-12">
        <div className="rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-[#0F172A] sm:p-5">
          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 lg:grid-cols-12">
            <div className="relative sm:col-span-2 lg:col-span-4">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                <Search className="h-4.5 w-4.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={isVi ? 'Tìm bài viết, chủ đề...' : 'Search articles, topics...'}
                className="w-full rounded-2xl border border-transparent bg-[#F8FAFC] py-2.5 pl-11 pr-4 text-xs font-semibold outline-none transition-all placeholder:text-slate-400 focus:border-blue-500/30 dark:bg-[#1E293B] dark:placeholder:text-slate-500 sm:text-sm"
              />
            </div>

            <div className="lg:col-span-3">
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value as BlogCategoryKey)}
                className="w-full cursor-pointer select-none rounded-2xl border border-transparent bg-[#F8FAFC] px-4 py-2.5 text-xs font-semibold outline-none dark:bg-[#1E293B] sm:text-sm"
              >
                {blogCategories.map((category) => (
                  <option key={category.id} value={category.key}>
                    {isVi ? category.labelVi : category.labelEn}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-3">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full cursor-pointer select-none rounded-2xl border border-transparent bg-[#F8FAFC] px-4 py-2.5 text-xs font-semibold outline-none dark:bg-[#1E293B] sm:text-sm"
              >
                <option value="latest">{isVi ? 'Mới nhất' : 'Newest first'}</option>
                <option value="oldest">{isVi ? 'Cũ nhất' : 'Oldest first'}</option>
                <option value="views">{isVi ? 'Xem nhiều nhất' : 'Most viewed'}</option>
              </select>
            </div>

            <div className="flex justify-end lg:col-span-2">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex cursor-pointer items-center gap-1 rounded-xl px-2 py-2 text-xs font-bold text-blue-500 transition-colors hover:text-[#3B52FF] active:scale-95"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>{isVi ? 'Xóa lọc' : 'Clear'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="text-left">
            <h2 className="flex items-center gap-2.5 text-2xl font-black text-slate-900 dark:text-white">
              <span>{isVi ? 'Bài viết & nghiên cứu' : 'Articles and research'}</span>
              <span className="rounded-full bg-blue-500/10 px-2.5 py-1 font-mono text-xs font-black text-[#3B52FF]">
                {filteredPosts.length}
              </span>
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              {isVi ? 'Khám phá các chủ đề SSI, DID, ví định danh và bảo mật dữ liệu.' : 'Explore SSI, DID, identity wallets, and data security topics.'}
            </p>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="flex cursor-pointer items-center gap-1 text-xs font-extrabold text-[#3B52FF] hover:underline"
          >
            {isVi ? 'Xem tất cả bài viết' : 'View all articles'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {blogCategories.map((category) => {
            const Icon = category.icon;
            const active = selectedCategory === category.key;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.key)}
                className={`flex min-h-20 cursor-pointer items-center gap-3 rounded-2xl border p-3 text-left transition-all active:scale-[0.98] ${
                  active
                    ? 'border-blue-500/25 bg-white text-[#3B52FF] shadow-md dark:border-blue-500/25 dark:bg-[#0F172A] dark:text-[#7C8CFF]'
                    : 'border-[#E5E7EB] bg-white text-slate-600 hover:border-blue-500/20 hover:bg-slate-50/50 dark:border-slate-800 dark:bg-[#0F172A] dark:text-slate-300 dark:hover:bg-slate-850/30'
                }`}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active ? 'bg-blue-500/10 text-[#3B52FF] dark:text-[#7C8CFF]' : 'bg-slate-100 text-slate-400 dark:bg-slate-900 dark:text-slate-500'}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-black">{isVi ? category.labelVi : category.labelEn}</span>
                  <span className="mt-1 block font-mono text-[10px] font-bold text-slate-400">{categoryCounts[category.id] ?? 0}</span>
                </span>
              </button>
            );
          })}
        </div>

        {displayedPosts.length === 0 ? (
          <div className="space-y-3 rounded-3xl border border-dashed border-gray-200 bg-white p-16 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="flex justify-center text-slate-350 dark:text-slate-650">
              <AlertCircle className="h-12 w-12" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">{isVi ? 'Không tìm thấy bài viết phù hợp' : 'No matching articles found'}</h4>
            <p className="mx-auto max-w-sm text-xs leading-relaxed text-slate-405">
              {isVi ? 'Thử thay đổi bộ lọc hoặc từ khóa để tìm thấy bài viết bạn cần.' : 'Try changing the filter or search keyword to find a matching article.'}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-2 rounded-xl bg-[#3B52FF] px-4 py-2 text-xs font-black text-white hover:bg-[#2B42EF]"
            >
              {isVi ? 'Xóa bộ lọc' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
            {displayedPosts.map((post) => (
              <BlogArticleCard key={post.id} post={post} onClick={() => handlePostClick(post)} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 6)}
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-6 py-3 text-xs font-black text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-500/25 hover:text-[#3B52FF] dark:border-slate-800 dark:bg-[#0F172A] dark:text-slate-300 dark:hover:text-[#7C8CFF]"
            >
              <span>{isVi ? 'Xem thêm bài viết' : 'Load more articles'}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#C7D2FE]/40 bg-[#E0E7FF]/40 p-6 dark:border-[#3730A3]/20 dark:bg-[#1E1B4B]/30 sm:p-8 md:flex-row md:items-center">
          <div className="flex items-start gap-4.5 text-left sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#3B52FF] text-white shadow-lg shadow-[#3B52FF]/20">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black leading-tight text-slate-950 dark:text-white sm:text-lg">
                {isVi ? 'Muốn xem Identra hoạt động trong thực tế?' : 'Want to see Identra in action?'}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xs.5">
                {isVi ? 'Mở demo để kết nối kiến thức trong blog với luồng ví, QR, DIDComm và xác minh thực chứng.' : 'Open the demo to connect blog concepts with wallet, QR, DIDComm, and credential verification flows.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenDemo}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3B52FF] px-6 py-3 text-xs font-black text-white shadow-md shadow-[#3B52FF]/15 transition-all hover:bg-[#2B42EF] md:w-auto"
          >
            <span>{isVi ? 'Mở demo' : 'Open demo'}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

function BlogHero({ lang, onBack }: { lang: 'vi' | 'en'; onBack: () => void }) {
  const isVi = lang === 'vi';

  return (
    <section className="border-b border-[#E5E7EB] bg-gradient-to-b from-white via-white to-[#F7F8FC] px-6 py-16 pt-8 transition-colors duration-300 dark:border-slate-800/80 dark:from-[#0F172A]/45 dark:via-[#0F172A]/10 dark:to-[#0B0F1A] lg:px-12 lg:pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="relative text-left">
          <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="h-full space-y-6 lg:col-span-7">
              <div className="text-left">
                <motion.button
                  whileHover={{ x: -4 }}
                  onClick={onBack}
                  className="group -ml-3 inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-xl border-none bg-transparent px-3 py-2 text-xs font-bold text-[#5B6CFF] transition-colors hover:text-[#4A5AF0] dark:text-[#7C8CFF] dark:hover:text-[#6b7bff] [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[2.25]"
                >
                  <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
                  <span>{isVi ? 'Quay lại Trang chủ' : 'Back to Home'}</span>
                </motion.button>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#5B6CFF]/10 bg-[#5B6CFF]/8 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF]">
                <BookOpen className="mr-0.5 h-3.5 w-3.5" />
                <span>{isVi ? 'Góc nhìn công nghệ & Tin tức' : 'SSI Insights & Technical Perspectives'}</span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                {isVi ? 'Blog SSI Wallet' : 'SSI Wallet Blog'}
                <span className="ml-2 bg-gradient-to-r from-[#5B6CFF] to-[#8F9BFF] bg-clip-text text-transparent dark:from-[#7C8CFF] dark:to-[#8F9BFF]">
                  Identra
                </span>
              </h1>

              <p className="max-w-2xl text-base font-normal leading-relaxed text-[#6B7280] dark:text-gray-400">
                {isVi
                  ? 'Kiến thức, hướng dẫn và phân tích về danh tính số tự chủ, bảo mật dữ liệu và hạ tầng xác minh bằng mật mã.'
                  : 'Insights, guides, and analysis on self-sovereign identity, data security, and cryptographic verification infrastructure.'}
              </p>

              <div className="space-y-4 border-t border-gray-150 pt-6 dark:border-slate-850">
                <HeroPoint
                  icon={Shield}
                  title={isVi ? 'Nội dung có chiều sâu' : 'Research depth'}
                  description={isVi ? 'Bài viết tập trung vào mô hình, rủi ro và luồng triển khai thực tế.' : 'Articles focus on models, risks, and real implementation flows.'}
                />
                <HeroPoint
                  icon={BarChart3}
                  title={isVi ? 'Theo dõi theo chủ đề' : 'Topic-led reading'}
                  description={isVi ? 'Lọc nhanh theo SSI, bảo mật, công nghệ, hướng dẫn và use case.' : 'Filter quickly by SSI, security, technology, guides, and use cases.'}
                />
              </div>
            </div>

            <div className="subpage-hero-visual relative mx-auto hidden w-full max-w-[30rem] lg:col-span-5 lg:mt-15 lg:block lg:justify-self-end lg:self-start">
              <div className="pointer-events-none absolute -right-10 -top-10 -z-10 h-80 w-80 rounded-full bg-[#3B52FF]/15 blur-3xl dark:bg-[#3B52FF]/10" />
              <div className="relative flex aspect-square w-full flex-col items-center justify-center">
                <div className="absolute h-[80%] w-[80%] animate-spin rounded-full border border-dashed border-blue-500/15 [animation-duration:45s]" />
                <div className="absolute h-[60%] w-[60%] rounded-full border border-blue-500/8" />
                <div className="absolute bottom-[20%] h-[12%] w-[75%] skew-x-[-12deg] rounded-full border-b-4 border-blue-300 bg-gradient-to-b from-blue-100 to-blue-200/50 shadow-2xl dark:border-slate-950 dark:from-slate-800 dark:to-slate-900/40" />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 flex aspect-square w-[55%] flex-col items-center justify-center rounded-[36px] border border-white/20 bg-gradient-to-tr from-blue-700 via-blue-500 to-indigo-400 shadow-2xl dark:from-indigo-800 dark:via-blue-600 dark:to-indigo-500"
                >
                  <div className="absolute -top-[12%] h-[16%] w-[45%] rounded-t-2xl border-4 border-b-0 border-blue-400 dark:border-indigo-400" />
                  <div className="absolute left-[22%] top-[8%] h-4 w-3 rounded-sm bg-blue-300/80" />
                  <div className="absolute right-[22%] top-[8%] h-4 w-3 rounded-sm bg-blue-300/80" />
                  <BookOpen className="h-[42%] w-[42%] text-white" />
                  <div className="absolute bottom-[35%] h-[1.5px] w-full bg-white/20" />
                </motion.div>

                <FloatingHeroIcon icon={BookOpen} className="left-[12%] top-[22%] text-[#3B52FF]" delay={0.2} />
                <FloatingHeroIcon icon={Cpu} className="right-[12%] top-[22%] text-[#3B52FF]" delay={0.8} />
                <FloatingHeroIcon icon={BarChart3} className="bottom-[28%] left-[10%] text-[#3B52FF]" delay={1.2} />
                <FloatingHeroIcon icon={Shield} className="bottom-[28%] right-[10%] text-emerald-500" delay={1.6} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPoint({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4.5 text-slate-800 dark:text-gray-200">
      <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-[#3B52FF]">
        <Icon className="h-5 w-5 stroke-[2.2]" />
      </div>
      <div>
        <h4 className="text-[14px] font-bold leading-tight text-slate-900 dark:text-white">{title}</h4>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function FloatingHeroIcon({
  icon: Icon,
  className,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`absolute flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-md dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      <Icon className="h-5 w-5" />
    </motion.div>
  );
}

interface BlogArticleCardProps {
  key?: React.Key;
  post: BlogPost;
  onClick: () => void;
}

function BlogArticleCard({ post, onClick }: BlogArticleCardProps) {
  const tone = getPostTone(post);
  const Icon = tone.icon;

  return (
    <motion.article
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-[#E5E7EB] bg-white p-6 text-left shadow-xs transition-all duration-300 hover:border-blue-500/20 hover:bg-slate-50/40 hover:shadow-md dark:border-slate-800 dark:bg-[#0F172A] dark:hover:bg-slate-850/30"
    >
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <span className="rounded-full border border-slate-100 bg-slate-50 px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800/60 dark:bg-slate-900 dark:text-slate-500">
            {post.category}
          </span>
        </div>

        <div className="mb-5 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
          <BlogVisual post={post} />
        </div>

        <h3 className="line-clamp-2 text-base font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-[#3B52FF] dark:text-white dark:group-hover:text-[#7C8CFF]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {post.excerpt}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-50 pt-4 text-xs font-semibold text-slate-500 dark:border-slate-900/40 dark:text-slate-400">
        <div className="min-w-0 space-y-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <User className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{post.author}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#3B52FF] transition-all group-hover:bg-[#3B52FF] group-hover:text-white dark:bg-slate-900/60"
          aria-label={post.title}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
}

function BlogVisual({ post }: { post: BlogPost }) {
  const tone = getPostTone(post);
  const Icon = tone.icon;

  if (post.illustrationUrl) {
    return (
      <img
        src={post.illustrationUrl}
        alt=""
        className="h-36 w-full object-cover"
      />
    );
  }

  return (
    <div className={`relative flex h-36 w-full items-center justify-center overflow-hidden bg-gradient-to-br ${tone.visual}`}>
      <div className="absolute h-28 w-28 rounded-full border border-current/10" />
      <div className="absolute h-16 w-16 rounded-2xl border border-current/10" />
      <Icon className="relative z-10 h-10 w-10" />
    </div>
  );
}
