import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import BlogDetailSubpage from './BlogDetailSubpage';
import { academicBlogContentDb } from '../data/blogContent';
import { 
  Search, 
  ChevronDown, 
  Sparkles, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  Tag, 
  User, 
  BookOpen, 
  Shield, 
  Cpu, 
  Lock, 
  Smartphone, 
  Zap, 
  Filter,
  Bookmark
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
  variant?: "featured" | "guide" | "security" | "tech" | "usecase";
  views?: number;
};

interface BlogSubpageProps {
  lang: 'vi' | 'en';
  path: string;
  onBack: () => void;
  onOpenDemo?: () => void;
  onNavigateToPost?: (postId: string | null) => void;
}

export default function BlogSubpage({ lang = 'vi', path, onBack, onOpenDemo, onNavigateToPost }: BlogSubpageProps) {
  const isVi = lang === 'vi';

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('latest');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Categories list schema matching requirements
  const categoriesDb = useMemo(() => [
    { id: 'all', labelVi: 'Tất cả bài viết', labelEn: 'All Articles', count: 24, key: 'Tất cả', icon: Cpu },
    { id: 'ssi', labelVi: 'SSI cơ bản', labelEn: 'SSI Basics', count: 6, key: 'SSI', icon: User },
    { id: 'security', labelVi: 'Bảo mật', labelEn: 'Security', count: 6, key: 'Bảo mật', icon: Shield },
    { id: 'tech', labelVi: 'Công nghệ', labelEn: 'Technology', count: 5, key: 'Công nghệ', icon: Cpu },
    { id: 'guide', labelVi: 'Hướng dẫn', labelEn: 'Guides', count: 5, key: 'Hướng dẫn', icon: BookOpen },
    { id: 'usecase', labelVi: 'Use case', labelEn: 'Use Case', count: 2, key: 'Use case', icon: Zap },
  ], []);

  // Popular Tags
  const popularTags = useMemo(() => [
    '#SSI', '#Blockchain', '#Bảo mật', '#Zero Knowledge', '#DID', '#Verifiable Credentials'
  ], []);

  // 3 Featured Posts (1 Large on Left, 2 Small on Right)
  const featuredPosts = useMemo<BlogPost[]>(() => [
    {
      id: 'f-1',
      slug: 'self-sovereign-identity',
      title: isVi ? 'SSI là gì? Tương lai của danh tính số tự chủ' : 'What is SSI? The Future of Self-Sovereign Identity',
      excerpt: isVi 
        ? 'Tìm hiểu khái niệm SSI, cách hoạt động và vì sao nó sẽ thay đổi cách chúng ta kiểm soát danh tính.'
        : 'Explore the concept of Self-Sovereign Identity, how it works, and why it changes how we control our credentials.',
      category: 'SSI',
      author: 'Nguyễn Minh Anh',
      date: isVi ? '20 Thg 5, 2024' : 'May 20, 2024',
      readTime: isVi ? '8 phút đọc' : '8 min read',
      variant: 'featured',
      views: 1240
    },
    {
      id: 'f-2',
      slug: 'create-and-manage-ssi-wallet',
      title: isVi ? 'Hướng dẫn tạo và quản lý SSI Wallet' : 'Guide to Creating and Managing an SSI Wallet',
      excerpt: isVi
        ? 'Từng bước giúp người dùng thiết lập chiếc ví định danh bảo mật đầu tiên, nhận credential.'
        : 'Step-by-step tutorial to help users establish their first secure identity wallet and request credentials.',
      category: 'Hướng dẫn',
      author: 'Trần Hoàng Nam',
      date: isVi ? '15 Thg 5, 2024' : 'May 15, 2024',
      readTime: isVi ? '6 phút đọc' : '6 min read',
      variant: 'guide',
      views: 940
    },
    {
      id: 'f-3',
      slug: 'zero-knowledge-proof-in-ssi',
      title: isVi ? 'Zero Knowledge Proof là gì? Ứng dụng trong SSI' : 'What is Zero Knowledge Proof? Applications in SSI',
      excerpt: isVi
        ? 'Phân tích cách Zero Knowledge Proof xác thực thông tin mà không tiết lộ dữ liệu nhạy cảm.'
        : 'How Zero Knowledge Proof validates data statements without exposing raw private credentials details.',
      category: 'Bảo mật',
      author: 'Lê Thu Hà',
      date: isVi ? '10 Thg 5, 2024' : 'May 10, 2024',
      readTime: isVi ? '7 phút đọc' : '7 min read',
      variant: 'security',
      views: 1050
    }
  ], [isVi]);

  // Latest Posts list
  const latestPosts = useMemo<BlogPost[]>(() => [
    {
      id: 'l-1',
      slug: 'blockchain-and-digital-identity',
      title: isVi ? 'Blockchain và danh tính: Mối liên hệ mật thiết' : 'Blockchain and Identity: An Indispensable Connection',
      excerpt: isVi
        ? 'Khám phá lý do vì sao hạ tầng blockchain phân toán lại là bệ đỡ hoàn hảo cho việc lưu trữ mã băm.'
        : 'Explore why decentralized distributed networks write immutable mathematical proofs for state anchors.',
      category: 'Công nghệ',
      author: 'Phạm Quang Huy',
      date: isVi ? '08 Thg 5, 2024' : 'May 08, 2024',
      readTime: isVi ? '5 phút đọc' : '5 min read',
      variant: 'tech',
      views: 650
    },
    {
      id: 'l-2',
      slug: 'ssi-in-education',
      title: isVi ? 'SSI trong giáo dục: Chứng chỉ số và quyền riêng tư' : 'SSI in Education: Verifiable Degrees and Privacy',
      excerpt: isVi
        ? 'Cách các trường đại học hàng đầu số hóa văn bằng bằng Verifiable Credentials riêng tư tuyệt mật.'
        : 'How leading schools issue tamper-proof academic credentials directly to secure smartphone storage.',
      category: 'Use case',
      author: 'Nguyễn Minh Anh',
      date: isVi ? '07 Thg 5, 2024' : 'May 07, 2024',
      readTime: isVi ? '6 phút đọc' : '6 min read',
      variant: 'usecase',
      views: 480
    },
    {
      id: 'l-3',
      slug: 'recover-ssi-wallet',
      title: isVi ? 'Cách khôi phục SSI Wallet khi mất thiết bị' : 'How to Safely Recover your SSI Wallet on Lost Devices',
      excerpt: isVi
        ? 'Hướng dẫn chi tiết về kỹ thuật chia sẻ bí mật mã hóa khôi phục danh tính số an toàn.'
        : 'Step-by-step restoration setup utilizing Shamir Secret Sharing recovery channels easily.',
      category: 'Hướng dẫn',
      author: 'Trần Hoàng Nam',
      date: isVi ? '05 Thg 5, 2024' : 'May 05, 2024',
      readTime: isVi ? '4 phút đọc' : '4 min read',
      variant: 'guide',
      views: 710
    },
    {
      id: 'l-4',
      slug: 'phishing-risks-in-ssi',
      title: isVi ? 'Phishing và các rủi ro phổ biến khi sử dụng SSI' : 'Phishing and Social Exploits Targeting SSI users',
      excerpt: isVi
        ? 'Phân tích các chiêu trò tấn công lừa đảo ví mạo danh và cách phòng ngừa an toàn.'
        : 'Learn practical cyber hygiene habits preventing malicious identity phishing on mobile wallets.',
      category: 'Bảo mật',
      author: 'Lê Thu Hà',
      date: isVi ? '03 Thg 5, 2024' : 'May 03, 2024',
      readTime: isVi ? '6 phút đọc' : '6 min read',
      variant: 'security',
      views: 890
    },
    {
      id: 'l-5',
      slug: 'did-document-w3c',
      title: isVi ? 'Vai trò của DID Document trong hạ tầng W3C' : 'The Role of DID Documents in W3C Infrastructure',
      excerpt: isVi
        ? 'Khám phá cấu trúc và cách giải quyết mã định danh công khai phân tán theo tiêu chuẩn mạng.'
        : 'A deep architectural dive on DID Document objects resolving public cryptographic public keys.',
      category: 'Công nghệ',
      author: 'Phạm Quang Huy',
      date: isVi ? '01 Thg 5, 2024' : 'May 01, 2024',
      readTime: isVi ? '7 phút đọc' : '7 min read',
      variant: 'tech',
      views: 430
    }
  ], [isVi]);

  // Combine lists for filtering
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

  useEffect(() => {
    const postId = path.match(/^\/blog\/([^/]+)$/)?.[1];
    setSelectedPost(postId ? allPosts.find((post) => post.slug === decodeURIComponent(postId)) ?? null : null);
  }, [allPosts, path]);

  const filteredPosts = useMemo(() => {
    let result = allPosts;

    if (selectedCategory && selectedCategory !== 'Tất cả') {
      result = result.filter(post => {
        const cat = post.category.toLowerCase().trim();
        const sel = selectedCategory.toLowerCase().trim();

        if (sel === 'blockchain') {
          return cat === 'công nghệ' || cat === 'technology';
        }
        if (sel === 'ssi') {
          return cat === 'ssi';
        }
        if (sel === 'bảo mật') {
          return cat === 'bảo mật' || cat === 'security';
        }
        if (sel === 'hướng dẫn') {
          return cat === 'hướng dẫn' || cat === 'guide';
        }
        if (sel === 'use case') {
          return cat === 'use case' || cat === 'usecase';
        }
        return cat.includes(sel);
      });
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(post => 
        post.title.toLowerCase().includes(q) || 
        post.excerpt?.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'latest') {
      return [...result].sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortBy === 'oldest') {
      return [...result].sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortBy === 'views') {
      return [...result].sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return result;
  }, [allPosts, selectedCategory, searchQuery, sortBy]);

  // Popular posts card items (sidebar)
  const popularList = useMemo(() => {
    return [
      { id: 'f-1', title: isVi ? 'SSI là gì? Tương lai của danh tính số tự chủ' : 'What is SSI? The Future of Self-Sovereign Identity', date: isVi ? '20 Thg 5, 2024' : 'May 20, 2024', readTime: isVi ? '8 phút đọc' : '8 min read' },
      { id: 'f-2', title: isVi ? 'Hướng dẫn tạo và quản lý SSI Wallet' : 'Guide to Creating and Managing an SSI Wallet', date: isVi ? '15 Thg 5, 2024' : 'May 15, 2024', readTime: isVi ? '6 phút đọc' : '6 min read' },
      { id: 'f-3', title: isVi ? 'Zero Knowledge Proof là gì? Ứng dụng trong SSI' : 'Zero Knowledge Proof Applications in SSI', date: isVi ? '10 Thg 5, 2024' : 'May 10, 2024', readTime: isVi ? '7 phút đọc' : '7 min read' },
    ];
  }, [isVi]);
  const resolvedPopularPosts = useMemo(
    () => popularList.map((item) => allPosts.find((post) => post.id === item.id) ?? item),
    [allPosts, popularList],
  );

  const handleTagClick = (tag: string) => {
    const clean = tag.replace('#', '');
    setSearchQuery(clean);
    setSelectedCategory('Tất cả');
  };

  const handlePostNav = (postId: string) => {
    const found = allPosts.find(p => p.id === postId);
    if (found) {
      setSelectedPost(found);
      onNavigateToPost?.(found.slug);
    } else {
      setSearchQuery(postId);
      setSelectedCategory('Tất cả');
    }
  };

  const currentPost = useMemo(() => {
    if (!selectedPost) return null;
    return allPosts.find(p => p.id === selectedPost.id) || selectedPost;
  }, [selectedPost, allPosts]);

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
        onNavigateToPost={(p) => {
          setSelectedPost(p);
          onNavigateToPost?.(p.slug);
        }}
        onTagClick={handleTagClick}
      />
    );
  }

  return (
    <div className="bg-[#F7F8FC] dark:bg-[#0B0F1A] min-h-screen text-slate-900 dark:text-slate-100 font-sans antialiased pb-20 transition-colors duration-300">
      
      {/* 1. HERO HEADER SECTION (Integrated and isolated from contents below) */}
      <section className="py-16 pt-8 lg:pt-12 bg-gradient-to-b from-white dark:from-[#0F172A]/40 via-white dark:via-[#0F172A]/10 to-[#F7F8FC] dark:to-[#0B0F1A] border-b border-[#E5E7EB] dark:border-slate-800/80 px-6 lg:px-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation Button matching FAQ layout exactly */}
          <div className="mb-6 text-left">
            <motion.button
              whileHover={{ x: -4 }}
              onClick={onBack}
              aria-label={isVi ? "Quay lại trang chủ" : "Back to Homepage"}
              className="-ml-3 inline-flex min-h-9 items-center gap-2 rounded-xl px-3 py-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[2.25] text-xs font-bold text-[#5B6CFF] dark:text-[#7C8CFF] hover:text-[#4A5AF0] dark:hover:text-[#6b7bff] transition-colors cursor-pointer group bg-transparent border-none"
            >
              <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
              <span>{isVi ? "Quay lại Trang chủ" : "Back to Home"}</span>
            </motion.button>
          </div>

          <BlogHero 
            lang={lang}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </section>

      {/* 2. MAIN GRID CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        
        {/* 2-COLUMN LAYOUT BELOW HERO SECTION */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left Column (70% - col-span-8) */}
          <main className="order-2 space-y-16 lg:order-1 lg:col-span-8">
            {/* Featured Section */}
            <FeaturedPostsSection 
              lang={lang}
              featuredPosts={featuredPosts}
              onPostClick={handlePostNav}
            />

            {/* Latest Section */}
            <LatestPostsSection 
              lang={lang}
              posts={filteredPosts}
              visibleCount={visibleCount}
              setVisibleCount={setVisibleCount}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onPostClick={handlePostNav}
            />
          </main>

          {/* Right Sidebar Column (30% - col-span-4) */}
          <aside className="order-1 lg:order-2 lg:col-span-4">
            <BlogSidebar 
              lang={lang}
              categories={categoriesDb}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              popularPosts={resolvedPopularPosts}
              popularTags={popularTags}
              onTagClick={handleTagClick}
              onPostNav={handlePostNav}
            />
          </aside>

        </div>

      </div>
    </div>
  );
}

// ==========================================
// III. INTERMEDIATE SUB-COMPONENTS EXPORTED LOCALLY
// ==========================================

/* 1. BLOG HERO COMPONENT */
interface BlogHeroProps {
  lang: 'vi' | 'en';
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

function BlogHero({ lang, searchQuery, setSearchQuery }: BlogHeroProps) {
  const isVi = lang === 'vi';
  
  return (
    <div className="relative text-left">
      <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-12">
        {/* Left column holding title, summary description, search field and chips */}
        <div className="space-y-6 lg:col-span-7">
          {/* Standard subpage visual tag/pill */}
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/8 px-3.5 py-1.5 rounded-full border border-[#5B6CFF]/10">
            <BookOpen className="w-3.5 h-3.5 mr-0.5" />
            <span>{isVi ? "Góc nhìn công nghệ & Tin tức" : "SSI Insights & Technical Perspectives"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            {isVi ? 'Blog SSI Wallet ' : 'SSI Wallet Blog '}
            <span className="bg-gradient-to-r from-[#5B6CFF] to-[#8F9BFF] dark:from-[#7C8CFF] dark:to-[#8F9BFF] bg-clip-text text-transparent">
              Identra
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl font-normal">
            {isVi 
              ? 'Kiến thức, hướng dẫn và phân tích về danh tính số tự chủ (SSI), bảo mật và công nghệ blockchain.'
              : 'Insights, guides, and analysis on Self-Sovereign Identity (SSI), privacy cryptography and blockchain technologies.'
            }
          </p>

          <div className="max-w-xl">
            <BlogSearchBar 
              lang={lang} 
              value={searchQuery} 
              onChange={setSearchQuery} />
          </div>

        </div>

        {/* Right column holding the modern and larger design element/illustration */}
        <div className="subpage-hero-visual w-full max-w-[30rem] mx-auto lg:col-span-5 lg:justify-self-end hidden lg:block relative">
          <div className="w-full">
            <BlogHeroIllustration />
          </div>
        </div>
      </div>
    </div>
  );
}

/* 2. BLOG SEARCH BAR COMPONENT */
interface BlogSearchBarProps {
  lang: 'vi' | 'en';
  value: string;
  onChange: (val: string) => void;
}

function BlogSearchBar({ lang, value, onChange }: BlogSearchBarProps) {
  const isVi = lang === 'vi';
  
  return (
    <div className="relative max-w-xl h-[56px] group shadow-sm rounded-2xl bg-white dark:bg-slate-900/90 border border-[#E5E7EB] dark:border-slate-850 hover:border-[#5B6CFF] dark:hover:border-[#7C8CFF] transition-all flex items-center pr-4">
      <div className="pl-4 text-[#6B7280] dark:text-gray-500 flex items-center shrink-0">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        id="blog-search-field"
        aria-label={isVi ? "Thanh tìm kiếm bài viết" : "Search bar articles"}
        placeholder={isVi ? "Tìm bài viết, chủ đề, mác..." : "Search articles, topics, tags..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full bg-transparent pl-3 text-sm focus:outline-none text-gray-900 dark:text-white font-medium animate-none"
      />
      {value ? (
        <button
          onClick={() => onChange('')}
          className="mr-2 text-xs font-bold text-slate-400 hover:text-[#5B6CFF] transition-colors"
          aria-label="Clear search"
        >
          {isVi ? 'Xóa' : 'Clear'}
        </button>
      ) : (
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-150 dark:border-slate-705 text-[10px] font-mono font-bold text-[#6B7280] dark:text-gray-400">
          <span>⌘</span><span>K</span>
        </div>
      )}
    </div>
  );
}

/* 3. BLOG CATEGORY CHIPS COMPONENT */
interface BlogCategoryChipsProps {
  lang: 'vi' | 'en';
  selected: string;
  onChange: (val: string) => void;
}

function BlogCategoryChips({ lang, selected, onChange }: BlogCategoryChipsProps) {
  const isVi = lang === 'vi';

  const chips = useMemo(() => [
    { labelVi: 'Tất cả', labelEn: 'All', key: 'Tất cả' },
    { labelVi: 'SSI', labelEn: 'SSI', key: 'SSI' },
    { labelVi: 'Bảo mật', labelEn: 'Security', key: 'Bảo mật' },
    { labelVi: 'Blockchain', labelEn: 'Blockchain', key: 'Blockchain' },
    { labelVi: 'Hướng dẫn', labelEn: 'Guides', key: 'Hướng dẫn' },
    { labelVi: 'Use case', labelEn: 'Use Case', key: 'Use case' },
  ], []);

  return (
    <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 max-w-full">
      {chips.map((chip) => {
        const isActive = selected === chip.key;
        const displayName = isVi ? chip.labelVi : chip.labelEn;
        
        return (
          <button
            key={chip.key}
            onClick={() => onChange(chip.key)}
            className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all shrink-0 cursor-pointer ${
              isActive 
                ? 'bg-[#5B6CFF] text-white border-[#5B6CFF] dark:bg-[#7C8CFF] dark:text-slate-950 dark:border-[#7C8CFF] shadow-sm' 
                : 'bg-white dark:bg-slate-900 text-[#6B7280] dark:text-gray-400 border-[#E5E7EB] dark:border-slate-850 hover:bg-[#F7F8FC] dark:hover:bg-slate-800/60'
            }`}
          >
            {displayName}
          </button>
        );
      })}
    </div>
  );
}

/* 4. BLOG HERO ILLUSTRATION */
function BlogHeroIllustration() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl bg-slate-900 shadow-xl overflow-hidden border border-slate-800 p-5 font-sans text-xs flex flex-col justify-between select-none">
      {/* Glow highlight background */}
      <div className="absolute inset-x-0 -top-40 h-80 bg-gradient-to-b from-[#5B6CFF]/15 to-transparent blur-3xl pointer-events-none" />

      {/* Browser bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 shrink-0 relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80 block" />
          <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
        </div>
        <div className="px-3 py-1 rounded-md bg-slate-800/80 text-[10px] text-gray-500 border border-slate-700 font-mono">
          blog.identra.io
        </div>
        <div className="flex gap-1.5 text-gray-600">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
        </div>
      </div>

      {/* Content layout: Elegant Editorial Layout & Stats representation */}
      <div className="flex-1 flex flex-col gap-3 relative z-10 overflow-hidden pr-1 text-left">
        {/* Featured Mini Article Card */}
        <div className="bg-slate-800/40 rounded-2xl p-3.5 border border-slate-700/40 backdrop-blur-xs flex gap-3.5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#5B6CFF] to-[#8F9BFF] shrink-0 flex items-center justify-center text-white font-serif text-base font-black">
            SSI
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-bold text-white uppercase tracking-wider bg-[#5B6CFF] px-1.5 py-0.5 rounded-sm">RECOMMENDED</span>
              <span className="text-[10px] text-gray-400 font-mono">5 min read</span>
            </div>
            {/* Elegant visual title bars matching mockup style */}
            <div className="h-2.5 w-11/12 bg-slate-700 rounded-sm" />
            <div className="h-2.5 w-2/3 bg-slate-700/60 rounded-sm" />
          </div>
        </div>

        {/* Small Analytics Grid for Blog publications */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/20 rounded-xl p-3 border border-slate-700/25 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[9px] text-gray-400 uppercase font-black tracking-wide block">Monthly Readers</span>
              <span className="text-sm font-black text-white block">48.2K</span>
            </div>
            {/* Sparkline trend representation */}
            <svg className="w-12 h-6 text-emerald-400 shrink-0" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 18 L12 12 L22 15 L32 6 L42 9 L48 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="bg-slate-800/20 rounded-xl p-3 border border-slate-700/25 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[9px] text-gray-400 uppercase font-black tracking-wide block">Newsletter Subscribers</span>
              <span className="text-sm font-black text-white block">+2.4K</span>
            </div>
            {/* Sparkline trend representation */}
            <svg className="w-12 h-6 text-indigo-400 shrink-0" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 18 L10 16 L20 10 L30 14 L40 6 L48 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating Glassmorphic Shield/Book card UI representation */}
      <div className="absolute top-1/4 -left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-[#E5E7EB] dark:border-slate-800 p-4.5 shadow-lg flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#5B6CFF]/10 text-[#5B6CFF] flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="text-left">
          <span className="text-[10px] font-bold text-[#5B6CFF] uppercase tracking-wide block">Identra Blog</span>
          <span className="text-xs font-black text-slate-900 dark:text-white block">Verified Feed</span>
        </div>
      </div>

      {/* Cloud secure indicator or second floating card */}
      <div className="absolute bottom-10 -right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-gray-150 dark:border-slate-800 p-4 shadow-md flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-[#5B6CFF] dark:text-[#7C8CFF] flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="text-left text-xs text-slate-900 dark:text-white">
          <span className="font-bold block">SSI Insights</span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400 block leading-tight font-sans">Weekly Digest</span>
        </div>
      </div>

    </div>
  );
}

/* 5. FEATURED WRAPPER COMPONENT */
interface FeaturedPostsSectionProps {
  lang: 'vi' | 'en';
  featuredPosts: BlogPost[];
  onPostClick: (title: string) => void;
}

function FeaturedPostsSection({ lang, featuredPosts, onPostClick }: FeaturedPostsSectionProps) {
  const isVi = lang === 'vi';
  if (featuredPosts.length === 0) return null;

  const mainPost = featuredPosts[0];
  const sidePosts = featuredPosts.slice(1, 3);

  return (
    <section className="space-y-8 text-left">
      <div className="border-b border-[#E5E7EB] pb-4 dark:border-slate-800">
        <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl dark:text-white">
          {isVi ? 'Bài viết nổi bật' : 'Featured Posts'}
        </h2>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
        {/* Left main large featured post card */}
        <div className="flex h-full flex-col lg:col-span-7">
          <FeaturedPostCard lang={lang} post={mainPost} isLarge={true} onClick={() => onPostClick(mainPost.id)} />
        </div>

        {/* Right side static stacked smaller cards */}
        <div className="flex h-full flex-col justify-between gap-4 lg:col-span-5">
          {sidePosts.map((post) => (
            <FeaturedPostCard 
              key={post.id} 
              lang={lang} 
              post={post} 
              isLarge={false} 
              onClick={() => onPostClick(post.id)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6. INDIVIDUAL FEATURED POST CARD */
interface FeaturedCardProps {
  key?: React.Key;
  lang: 'vi' | 'en';
  post: BlogPost;
  isLarge: boolean;
  onClick: () => void;
}

function FeaturedPostCard({ lang, post, isLarge, onClick }: FeaturedCardProps) {
  const isVi = lang === 'vi';

  const getAuthorAvatar = (name: string) => {
    if (name.includes('Hà')) {
      return "https://images.unsplash.com/photo-1494790108377-be9c29b29330?h=120&w=120&fit=crop&q=80";
    }
    if (name.includes('Nam')) {
      return "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?h=120&w=120&fit=crop&q=80";
    }
    return "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?h=120&w=120&fit=crop&q=80";
  };

  const renderIllustrationGlow = () => {
    let gradient = "from-[#EDEDFF]/90 to-[#F5F6FF] dark:from-slate-900/60 dark:to-slate-950/60";
    if (post.variant === 'security') {
      gradient = "from-[#E6F7F0]/90 to-[#F1FAF6] dark:from-emerald-950/40 dark:to-slate-950/65";
    }

    const svgClass = isLarge
      ? "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-[124px] lg:h-[124px] xl:w-[136px] xl:h-[136px]"
      : "w-13 h-13 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-18 lg:h-18 xl:w-20 xl:h-20";

    let iconSvg = null;

    if (post.variant === 'featured') {
      iconSvg = (
        <svg className={isLarge ? "w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40" : "w-18 h-18 xs:w-22 xs:h-22"} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#5B6CFF" fillOpacity="0.06" />
          <path d="M35 35 L50 28 L65 35 V55 C65 68 58 78 50 82 C42 78 35 68 35 55 V35 Z" fill="#5B6CFF" fillOpacity="0.8" />
          <path d="M44 52 L48 56 L56 47" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    } else if (post.variant === 'guide') {
      iconSvg = (
        <svg className={svgClass} viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background soft decorative ring */}
          <circle cx="80" cy="60" r="45" stroke="#5B6CFF" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="3 3" />
          <circle cx="50" cy="70" r="30" stroke="#8F9BFF" strokeWidth="1" strokeOpacity="0.1" />
          
          {/* Floating Key/Phone-like device in bg */}
          <g transform="translate(85, 20) rotate(15)">
            <rect x="0" y="0" width="40" height="75" rx="8" fill="#F8FAFC" stroke="#8F9BFF" strokeWidth="1.5" className="dark:fill-slate-800" />
            <rect x="3" y="10" width="34" height="55" rx="4" fill="#EDEDFF" className="dark:fill-slate-900" />
            {/* Camera notch */}
            <rect x="15" y="4" width="10" height="3" rx="1.5" fill="#C7D2FE" />
            {/* Tiny details inside phone screen */}
            <circle cx="20" cy="25" r="8" fill="#5B6CFF" fillOpacity="0.1" />
            <circle cx="20" cy="25" r="4" fill="#5B6CFF" fillOpacity="0.3" />
            <rect x="8" y="40" width="24" height="4" rx="2" fill="#5B6CFF" fillOpacity="0.15" />
            <rect x="12" y="48" width="16" height="3" rx="1.5" fill="#5B6CFF" fillOpacity="0.15" />
          </g>

          {/* Left floating secondary lock */}
          <g transform="translate(18, 40) rotate(-10)">
            <rect x="0" y="12" width="22" height="18" rx="4" fill="#5B6CFF" fillOpacity="0.15" />
            <path d="M5 12 V8 C5 4.5 8 2.5 11 2.5 C14 2.5 17 4.5 17 8 V12" stroke="#5B6CFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.4" />
            <circle cx="11" cy="21" r="2.5" fill="#5B6CFF" fillOpacity="0.4" />
          </g>

          {/* Front lock-badge 3D-like with glow */}
          <g transform="translate(56, 46)">
            {/* Glow */}
            <circle cx="24" cy="24" r="24" fill="#5B6CFF" fillOpacity="0.15" />
            <circle cx="24" cy="24" r="20" fill="url(#blue3DGrad)" stroke="#FFFFFF" strokeWidth="1.5" className="dark:stroke-slate-850" />
            {/* Lock loop */}
            <path d="M17 21 V16 C17 12 20 10 24 10 C28 10 31 12 31 16 V21" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            {/* Lock base */}
            <rect x="14" y="21" width="20" height="15" rx="4.5" fill="#FFFFFF" />
            {/* Key hole in base */}
            <circle cx="24" cy="26" r="2" fill="#4F46E5" />
            <path d="M24 28 V31" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" />
          </g>
          <defs>
            <linearGradient id="blue3DGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8F9BFF" />
              <stop offset="100%" stopColor="#5B6CFF" />
            </linearGradient>
          </defs>
        </svg>
      );
    } else if (post.variant === 'security') {
      iconSvg = (
        <svg className={svgClass} viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background soft orbit ring */}
          <ellipse cx="80" cy="74" rx="55" ry="30" stroke="#10B981" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 2" />
          <circle cx="114" cy="40" r="18" stroke="#10B981" strokeWidth="1" strokeOpacity="0.1" />

          {/* Left top floating small glowing device */}
          <g transform="translate(14, 65) rotate(-15)">
            <rect x="0" y="0" width="24" height="24" rx="6" fill="#10B981" fillOpacity="0.12" />
            <circle cx="12" cy="12" r="5" fill="#10B981" fillOpacity="0.4" />
          </g>

          {/* Main Wallet Shape */}
          <g transform="translate(42, 45)">
            {/* Base wallet */}
            <rect x="0" y="8" width="58" height="42" rx="10" fill="url(#greenWalletGrad)" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
            {/* Card sticking out */}
            <rect x="8" y="0" width="34" height="15" rx="3" fill="#FFFFFF" fillOpacity="0.9" stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.4" />
            <line x1="14" y1="5" x2="26" y2="5" stroke="#10B981" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round" />
            <line x1="14" y1="5" x2="14" y2="5" stroke="#10B981" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round" />
            {/* Front flap */}
            <path d="M38 18 H54 C56 18 58 20 58 22 V36 C58 38 56 40 54 40 H38 Z" fill="#10B981" fillOpacity="0.2" />
            <circle cx="48" cy="29" r="3.5" fill="#FFFFFF" />
          </g>

          {/* Front shiny lock on top */}
          <g transform="translate(84, 48)">
            {/* Main secure lock module */}
            <circle cx="20" cy="20" r="20" fill="#10B981" fillOpacity="0.15" />
            <rect x="8" y="14" width="24" height="18" rx="5.5" fill="url(#greenLockGrad)" stroke="#FFFFFF" strokeWidth="1.5" className="dark:stroke-slate-850" />
            {/* Lock Shackle */}
            <path d="M12 14 V9 C12 5.5 15.5 3.5 20 3.5 C24.5 3.5 28 5.5 28 9 V14" stroke="url(#greenLockGrad)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Key hole */}
            <circle cx="20" cy="21.5" r="2" fill="#FFFFFF" />
            <path d="M20 23 V26" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          <defs>
            <linearGradient id="greenWalletGrad" x1="0" y1="8" x2="58" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="greenLockGrad" x1="8" y1="3.5" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    if (isLarge) {
      return (
        <div className={`w-full h-full bg-gradient-to-tr ${gradient} flex items-center justify-center p-6 relative`}>
          {iconSvg}
        </div>
      );
    }

    // Category overlay chip for small card
    const categoryColorClass = post.category.includes('bảo mật') || post.category.includes('Bảo mật') || post.category.includes('Security')
      ? "bg-[#10B981]/15 text-[#10B981] dark:bg-emerald-950/80 dark:text-[#34D399] border-[#10B981]/10"
      : "bg-[#5B6CFF]/15 text-[#5B6CFF] dark:bg-indigo-950/85 dark:text-[#7C8CFF] border-[#5B6CFF]/15";

    return (
      <div className="w-[80px] xs:w-[100px] sm:w-[125px] md:w-[155px] lg:w-[105px] xl:w-[120px] shrink-0 bg-gradient-to-tr from-slate-50 to-slate-100 dark:from-slate-900/60 dark:to-slate-950/60 flex flex-col items-center justify-center relative border-r border-slate-100 dark:border-slate-800/60 overflow-hidden">
        {/* Floating Category Tag Chip directly in Illustration Container */}
        <div className="absolute top-1.5 left-1.5 xs:top-2 xs:left-2 sm:top-2.5 sm:left-2.5 z-10 max-w-[90%]">
          <span className={`inline-flex items-center text-[8px] xs:text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 xs:px-2 sm:px-2.5 rounded-full border shadow-2xs backdrop-blur-xs whitespace-nowrap overflow-hidden text-ellipsis ${categoryColorClass}`}>
            {post.category}
          </span>
        </div>
        
        <div className="flex items-center justify-center relative z-0">
          {iconSvg}
        </div>
      </div>
    );
  };

  if (isLarge) {
    return (
      <article
        onClick={onClick}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white text-left transition-colors hover:border-[#C7CEFF] dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-[#343E78]"
      >
        <div className="h-48 xs:h-52 sm:h-56 md:h-60 lg:h-48 xl:h-52 overflow-hidden border-b border-slate-100 dark:border-slate-850">
          {renderIllustrationGlow()}
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#5B6CFF]/8 text-[#5B6CFF] dark:text-[#7C8CFF] px-2.5 py-1 rounded-md">
                {isVi ? 'Nổi bật' : 'Featured'}
              </span>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                {post.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-[#5B6CFF] dark:group-hover:text-[#7C8CFF] transition-colors">
              {post.title}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100 dark:border-slate-800/60 text-left">
            <div className="relative shrink-0">
              <img 
                src={getAuthorAvatar(post.author)} 
                alt={post.author} 
                className="w-9 h-9 rounded-full object-cover border border-slate-100 dark:border-slate-800"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-0.5 -right-0.5 bg-[#5B6CFF] text-white p-0.5 rounded-full border border-white dark:border-slate-900">
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{post.author}</p>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Compact supporting articles keep attention on the lead story.
  return (
    <article
      onClick={onClick}
      className="group grid min-h-[160px] flex-1 cursor-pointer grid-cols-[104px_1fr] gap-4 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-4 text-left transition-colors hover:border-[#C7CEFF] dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-[#343E78]"
    >
      <BlogListIllustration post={post} />
      <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#5B6CFF] dark:text-[#7C8CFF]">{post.category}</span>
          <h3 className="line-clamp-3 text-base font-bold leading-snug text-slate-950 transition-colors group-hover:text-[#5B6CFF] dark:text-white dark:group-hover:text-[#7C8CFF]">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Clean, perfectly-aligned author section with no separating line exactly like mock */}
        <div className="flex items-center gap-2 xs:gap-2.5 mt-2.5">
          <div className="relative shrink-0">
            <img 
              src={getAuthorAvatar(post.author)} 
              alt={post.author} 
              className="w-7 h-7 xs:w-9 xs:h-9 rounded-full object-cover border border-slate-100 dark:border-slate-800"
              referrerPolicy="no-referrer"
            />
            {/* Blue Verification badge */}
            <div className="absolute -bottom-0.5 -right-0.5 bg-[#5B6CFF] text-white p-0.5 rounded-full border border-white dark:border-slate-900">
              <svg className="w-1.5 h-1.5 xs:w-2 xs:h-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight truncate">
              {post.author}
            </span>
            <div className="text-[9px] xs:text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 flex flex-wrap items-center gap-x-1 sm:gap-x-1.5 gap-y-0.5">
              <span>{post.date}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium whitespace-nowrap">{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* 7. LATEST WRAPPER COMPONENT */
interface LatestPostsSectionProps {
  lang: 'vi' | 'en';
  posts: BlogPost[];
  visibleCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  sortBy: string;
  setSortBy: (val: string) => void;
  onPostClick: (title: string) => void;
}

function LatestPostsSection({ lang, posts, visibleCount, setVisibleCount, sortBy, setSortBy, onPostClick }: LatestPostsSectionProps) {
  const isVi = lang === 'vi';
  
  const displayed = useMemo(() => {
    return posts.slice(0, visibleCount);
  }, [posts, visibleCount]);

  const hasMore = posts.length > visibleCount;

  return (
    <section className="space-y-8 border-t border-[#E5E7EB] pt-10 text-left dark:border-slate-800">
      
      {/* Header and sort row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl dark:text-white">
            {isVi ? 'Bài viết mới nhất' : 'Latest posts'}
          </h2>
          <span className="mt-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
            {isVi ? `${posts.length} bài viết phù hợp` : `${posts.length} matching articles`}
          </span>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="blog-sort-select" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {isVi ? 'Xếp theo:' : 'Sort by:'}
          </label>
          <div className="relative">
            <select
              id="blog-sort-select"
              value={sortBy}
              aria-label={isVi ? "Sắp xếp bài viết" : "Sort articles"}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-3 pr-8 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer shadow-xs"
            >
              <option value="latest">{isVi ? 'Mới nhất' : 'Newest'}</option>
              <option value="oldest">{isVi ? 'Cũ nhất' : 'Oldest'}</option>
              <option value="views">{isVi ? 'Xem nhiều nhất' : 'Views'}</option>
            </select>
            <ChevronDown className="w-4 h-4 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      {displayed.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 rounded-2xl">
          <p className="text-slate-400 font-medium text-sm">
            {isVi ? 'Không tìm thấy bài viết nào phù hợp.' : 'No publications matching terms.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayed.map((post) => (
            <BlogPostCard key={post.id} lang={lang} post={post} onClick={() => onPostClick(post.id)} />
          ))}
        </div>
      )}

      {/* Pagination Actuation */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={() => setVisibleCount(p => p + 4)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#5B6CFF]/30 py-3 px-8 rounded-full shadow-xs hover:shadow-sm text-slate-700 dark:text-slate-300 transition-all cursor-pointer group"
          >
            <span>{isVi ? 'Xem thêm bài viết' : 'Read more articles'}</span>
            <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}

    </section>
  );
}

/* 8. SINGLE GRID POST ITEM CARD */
interface GridCardProps {
  key?: React.Key;
  lang: 'vi' | 'en';
  post: BlogPost;
  onClick: () => void;
}

function BlogPostCard({ lang, post, onClick }: GridCardProps) {
  const isVi = lang === 'vi';

  const renderThumbnailGlow = () => {
    let gradient = "from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-950/80";
    let iconSvg = <Cpu className="w-11 h-11 text-[#5B6CFF] sm:w-14 sm:h-14" />;

    const gridSvgClass = "w-20 h-20 xs:w-22 xs:h-22 sm:w-24 sm:h-24 md:w-26 md:h-26";

    if (post.variant === 'tech') {
      iconSvg = (
        <svg className={gridSvgClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="42" y="42" width="16" height="16" rx="4" stroke="#5B6CFF" strokeWidth="2" />
          <path d="M50 20 V42 M50 58 V80 M20 50 H42 M58 50 H80" stroke="#8F9BFF" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      );
    } else if (post.variant === 'usecase') {
      gradient = "from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-950/80";
      iconSvg = (
        <svg className={gridSvgClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="25" width="50" height="42" rx="6" stroke="#10B981" strokeWidth="2.2" />
          <circle cx="38" cy="46" r="6" fill="#10B981" />
          <rect x="48" y="40" width="18" height="3" fill="#10B981" />
        </svg>
      );
    } else if (post.variant === 'guide') {
      gradient = "from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-950/80";
      iconSvg = (
        <svg className={gridSvgClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="34" y="26" width="32" height="48" rx="6" stroke="#F59E0B" strokeWidth="2" />
          <path d="M42 38 H58 M42 46 H54" stroke="#F59E0B" strokeWidth="2.2" />
        </svg>
      );
    } else if (post.variant === 'security') {
      gradient = "from-rose-50 to-red-50 dark:from-slate-900 dark:to-slate-950/80";
      iconSvg = (
        <svg className={gridSvgClass} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="28" stroke="#EF4444" strokeWidth="1.8" strokeDasharray="3 3" />
          <path d="M50 30 C38 30 38 48 50 48 V54" stroke="#EF4444" strokeWidth="2" />
          <circle cx="50" cy="50" r="4.5" fill="#EF4444" />
        </svg>
      );
    }

    return (
      <div className={`flex h-32 w-full shrink-0 items-center justify-center border-b border-slate-100 bg-gradient-to-tr md:h-auto md:w-40 md:border-b-0 md:border-r dark:border-slate-800 ${gradient}`}>
        {iconSvg}
      </div>
    );
  };

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer border-b border-[#E5E7EB] py-6 text-left first:pt-0 last:border-b-0 last:pb-0 dark:border-slate-800"
    >
      <div className="grid grid-cols-[112px_1fr] gap-4 sm:grid-cols-[152px_1fr] sm:gap-6">
        <BlogListIllustration post={post} />
        <div className="flex min-w-0 flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/6 dark:bg-[#7C8CFF]/10 px-2.5 py-1 rounded-md">
              {post.category}
            </span>
            {post.views && (
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Bookmark className="w-3 h-3" />
                {post.views}
              </span>
            )}
          </div>

          <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-950 transition-colors group-hover:text-[#5B6CFF] dark:text-white">
            {post.title}
          </h3>

          <p className="line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {post.excerpt}
          </p>
        </div>

        {/* Card footer metadata */}
        <div className="flex items-center gap-2.5 mt-6 pt-4 border-t border-slate-100 dark:border-slate-850">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0">
            {post.author.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{post.author}</p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-450 font-medium">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-305 group-hover:text-[#5B6CFF] hover:translate-x-0.5 transition-transform" />
        </div>
        </div>
      </div>
    </article>
  );
}

function BlogListIllustration({ post, compact = false }: { post: Pick<BlogPost, 'title' | 'variant' | 'illustrationUrl'>; compact?: boolean }) {
  const Icon = post.variant === 'security'
    ? Shield
    : post.variant === 'guide'
      ? BookOpen
      : post.variant === 'usecase'
        ? Smartphone
        : Cpu;

  if (post.illustrationUrl) {
    return (
      <img
        src={post.illustrationUrl}
        alt=""
        className={compact
          ? 'h-12 w-12 shrink-0 rounded-xl border border-[#E5E7EB] object-cover dark:border-slate-800'
          : 'h-full min-h-28 w-full rounded-xl border border-[#E5E7EB] object-cover dark:border-slate-800'}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={post.title}
      className={compact
        ? 'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#C7CEFF] bg-[#F1F3FF] text-[#5B6CFF] dark:border-[#343E78] dark:bg-[#12182D] dark:text-[#7C8CFF]'
        : 'flex h-full min-h-28 w-full items-center justify-center rounded-xl border border-[#C7CEFF] bg-[#F1F3FF] text-[#5B6CFF] dark:border-[#343E78] dark:bg-[#12182D] dark:text-[#7C8CFF]'}
    >
      <Icon className={compact ? 'h-5 w-5' : 'h-8 w-8'} />
    </div>
  );
}

/* 9. BLOG SIDEBAR CONTAINER */
interface BlogSidebarProps {
  lang: 'vi' | 'en';
  categories: any[];
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  popularPosts: any[];
  popularTags: string[];
  onTagClick: (tag: string) => void;
  onPostNav: (title: string) => void;
}

function BlogSidebar({ lang, categories, selectedCategory, setSelectedCategory, popularPosts, popularTags, onTagClick, onPostNav }: BlogSidebarProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto dark:border-slate-800 dark:bg-slate-900/40">
      {/* Categories Card */}
      <BlogCategoryCard 
        lang={lang} 
        categories={categories} 
        selected={selectedCategory} 
        onChange={setSelectedCategory} 
      />

      {/* Popular Posts */}
      <PopularPostsCard 
        lang={lang} 
        posts={popularPosts} 
        onSelect={onPostNav} 
      />

      {/* Popular Tags */}
      <PopularTagsCard 
        lang={lang} 
        tags={popularTags} 
        onSelect={onTagClick} 
      />
    </div>
  );
}

/* 10. CATEGORIES CARD */
interface CatProps {
  lang: 'vi' | 'en';
  categories: any[];
  selected: string;
  onChange: (val: string) => void;
}

function BlogCategoryCard({ lang, categories, selected, onChange }: CatProps) {
  const isVi = lang === 'vi';
  
  return (
    <section className="border-b border-[#E5E7EB] p-6 text-left dark:border-slate-800">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
        <Filter className="w-4 h-4" />
        {isVi ? 'Danh mục' : 'Categories'}
      </h3>

      <div className="space-y-1.5">
        {categories.map((cat) => {
          const isActive = selected === cat.key;
          const label = isVi ? cat.labelVi : cat.labelEn;
          const IconComponent = cat.icon;

          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.key)}
              className={`flex min-h-11 w-full cursor-pointer items-center justify-between rounded-xl px-3 text-left text-xs font-semibold transition-colors sm:text-sm ${
                isActive 
                  ? 'bg-[#5B6CFF]/8 text-[#5B6CFF] dark:bg-[#7C8CFF]/12' 
                  : 'text-slate-600 dark:text-gray-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#5B6CFF]' : 'text-slate-400'}`} />
                <span>{label}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isActive ? 'bg-[#5B6CFF]/20 text-[#5B6CFF]' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* 11. POPULAR READS CARD */
interface PopProps {
  lang: 'vi' | 'en';
  posts: any[];
  onSelect: (title: string) => void;
}

function PopularPostsCard({ lang, posts, onSelect }: PopProps) {
  const isVi = lang === 'vi';
  
  return (
    <section className="border-b border-[#E5E7EB] p-6 text-left dark:border-slate-800">
      <h3 className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
        <Sparkles className="w-4 h-4" />
        {isVi ? 'Bài viết phổ biến' : 'Popular posts'}
      </h3>

      <div className="space-y-1">
        {posts.map((post, index) => {
          const rank = `0${index + 1}`;
          return (
            <button 
              key={post.id} 
              onClick={() => onSelect(post.id)}
              className="group grid min-h-16 w-full cursor-pointer grid-cols-[48px_1fr] gap-3 rounded-xl px-2 py-3 text-left transition-colors hover:bg-[#F1F3FF] dark:hover:bg-[#12182D]"
            >
              <BlogListIllustration post={post} compact />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#5B6CFF]/60">{rank}</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 group-hover:text-[#5B6CFF] transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* 12. POPULAR TAGS CARD */
interface TagsProps {
  lang: 'vi' | 'en';
  tags: string[];
  onSelect: (tag: string) => void;
}

function PopularTagsCard({ lang, tags, onSelect }: TagsProps) {
  const isVi = lang === 'vi';
  
  return (
    <section className="p-6 text-left">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
        <Tag className="w-4 h-4" />
        {isVi ? 'Tag phổ biến' : 'Popular tags'}
      </h3>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            className="min-h-9 cursor-pointer rounded-xl border border-[#E5E7EB] px-3 text-xs font-semibold text-slate-600 transition-colors hover:border-[#C7CEFF] hover:bg-[#F1F3FF] hover:text-[#5B6CFF] dark:border-slate-700 dark:text-slate-300 dark:hover:border-[#343E78] dark:hover:bg-[#12182D] dark:hover:text-[#7C8CFF]"
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}
