import { useState, useRef, useEffect } from 'react';
import { 
  Menu, X, Sun, Moon, Shield, ChevronRight, Globe, Check, ArrowLeft, ChevronDown,
  Sparkles, Cpu, Briefcase, Building2, BookOpen, FileText, HelpCircle, 
  ShieldCheck, Scale, Cookie, Compass, Newspaper, GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BrandLogo from './BrandLogo';
import { getPathForPage } from '../navigation';

interface NavbarProps {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  onOpenDemo: () => void;
  lang: 'vi' | 'en';
  setLang: (l: 'vi' | 'en') => void;
  activePage?: string;
  onBackToHome?: (targetSection?: string) => void;
  onNavigate?: (page: string) => void;
  onBack?: () => void;
}

export default function Navbar({ theme, setTheme, onOpenDemo, lang, setLang, activePage = 'home', onBackToHome, onNavigate, onBack }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  const getPageFromTargetId = (targetId: string): string => {
    switch (targetId) {
      case 'features': return 'features';
      case 'technology': return 'tech-glossary';
      case 'cases': return 'use-cases';
      case 'docs': return 'docs';
      case 'blog': return 'blog';
      case 'about': return 'about';
      case 'faq': return 'faq';
      default: return 'home';
    }
  };

  // Scroll Spy logic and active section tracking based on subpages
  useEffect(() => {
    if (activePage !== 'home') {
      if (activePage === 'features') {
        setActiveSection('features');
      } else if (activePage === 'tech-glossary') {
        setActiveSection('technology');
      } else if (activePage === 'use-cases') {
        setActiveSection('cases');
      } else if (activePage === 'docs') {
        setActiveSection('docs');
      } else if (activePage === 'guides') {
        setActiveSection('guides');
      } else if (activePage === 'blog') {
        setActiveSection('blog');
      } else if (activePage === 'about' || activePage === 'careers') {
        setActiveSection('about');
      } else if (activePage === 'faq') {
        setActiveSection('faq');
      } else {
        setActiveSection('');
      }
      return;
    }

    const sections = ['features', 'technology', 'cases', 'docs', 'blog', 'about'];

    const handleScroll = () => {
      let currentActive = '';
      const scrollPosition = window.scrollY + 160;

      // If at top or hero, do not highlight any tab
      if (window.scrollY < 200) {
        setActiveSection('');
        return;
      }

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActive = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activePage]);

  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<number | null>(null);

  const menuCategories = lang === 'vi' ? [
    {
      title: 'Sản phẩm',
      items: [
        { label: 'Tính năng', href: '#features', page: 'features', description: 'Các đặc trưng bảo mật và giải pháp cốt lõi', icon: Sparkles, color: 'text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/15' },
        { label: 'Công nghệ', href: '#technology', page: 'tech-glossary', description: 'Nền tảng SSI phi tập trung hàng đầu', icon: Cpu, color: 'text-violet-500 bg-violet-500/10 dark:bg-violet-500/15' },
        { label: 'Trường hợp sử dụng', href: '#cases', page: 'use-cases', description: 'Ứng dụng thực tiễn trong các ngành nghề', icon: Briefcase, color: 'text-sky-500 bg-sky-500/10 dark:bg-sky-500/15' }
      ]
    },
    {
      title: 'Công ty',
      items: [
        { label: 'Về chúng tôi', href: '#about', page: 'about', description: 'Sứ mệnh định danh tự chủ phi tập trung', icon: Building2, color: 'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/15' },
        { label: 'Blog', href: '#blog', page: 'blog', description: 'Tin tức và bài phân tích kỹ thuật chuyên sâu', icon: Newspaper, color: 'text-rose-500 bg-rose-500/10 dark:bg-rose-500/15' },
        { label: 'Tuyển dụng', href: '#careers', page: 'careers', description: 'Tham gia kiến tạo tương lai bảo mật toàn cầu', icon: GraduationCap, color: 'text-amber-500 bg-amber-500/10 dark:bg-amber-500/15' }
      ]
    },
    {
      title: 'Tài nguyên',
      items: [
        { label: 'Tài liệu', href: '#docs', page: 'docs', description: 'Tài liệu kỹ thuật tích hợp API nhanh chóng', icon: FileText, color: 'text-blue-500 bg-blue-500/10 dark:bg-blue-500/15' },
        { label: 'Hướng dẫn', href: '#guides', page: 'guides', description: 'Cẩm nang hướng dẫn triển khai từng bước', icon: Compass, color: 'text-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/15' },
        { label: 'FAQ', href: '#faq', page: 'faq', description: 'Hỗ trợ giải đáp nhanh các thắc mắc của bạn', icon: HelpCircle, color: 'text-teal-500 bg-teal-500/10 dark:bg-teal-500/15' }
      ]
    },
    {
      title: 'Pháp lý',
      items: [
        { label: 'Chính sách bảo mật', href: '#privacy', page: 'privacy', description: 'Cam kết bảo vệ dữ liệu danh tính tuyệt đối', icon: ShieldCheck, color: 'text-purple-500 bg-purple-500/10 dark:bg-purple-500/15' },
        { label: 'Điều khoản sử dụng', href: '#terms', page: 'terms', description: 'Quyền lợi và trách nhiệm của người sử dụng', icon: Scale, color: 'text-fuchsia-500 bg-fuchsia-500/10 dark:bg-fuchsia-500/15' },
        { label: 'Chính sách Cookie', href: '#cookies', page: 'cookies', description: 'Bảo vệ hoạt động duyệt web không theo dấu', icon: Cookie, color: 'text-pink-500 bg-pink-500/10 dark:bg-pink-500/15' }
      ]
    }
  ] : [
    {
      title: 'Products',
      items: [
        { label: 'Features', href: '#features', page: 'features', description: 'Advanced core security & encryption actions', icon: Sparkles, color: 'text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/15' },
        { label: 'Technology', href: '#technology', page: 'tech-glossary', description: 'Leading decentralized SSI tech stack', icon: Cpu, color: 'text-violet-500 bg-violet-500/10 dark:bg-violet-500/15' },
        { label: 'Use Cases', href: '#cases', page: 'use-cases', description: 'Real-world business & industry scenarios', icon: Briefcase, color: 'text-sky-500 bg-sky-500/10 dark:bg-sky-500/15' }
      ]
    },
    {
      title: 'Company',
      items: [
        { label: 'About Us', href: '#about', page: 'about', description: 'Our clear vision for global decentralized security', icon: Building2, color: 'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/15' },
        { label: 'Blog', href: '#blog', page: 'blog', description: 'Tech insights, blogs & dynamic releases', icon: Newspaper, color: 'text-rose-500 bg-rose-500/10 dark:bg-rose-500/15' },
        { label: 'Careers', href: '#careers', page: 'careers', description: 'Join us in crafting global sovereign protocols', icon: GraduationCap, color: 'text-amber-500 bg-amber-500/10 dark:bg-amber-500/15' }
      ]
    },
    {
      title: 'Resources',
      items: [
        { label: 'Docs', href: '#docs', page: 'docs', description: 'Full API guides & reference documents', icon: FileText, color: 'text-blue-500 bg-blue-500/10 dark:bg-blue-500/15' },
        { label: 'Guides', href: '#guides', page: 'guides', description: 'Interactive integration walkthroughs', icon: Compass, color: 'text-cyan-500 bg-cyan-500/10 dark:bg-cyan-500/15' },
        { label: 'FAQ', href: '#faq', page: 'faq', description: 'Quick answers for common integration queries', icon: HelpCircle, color: 'text-teal-500 bg-teal-500/10 dark:bg-teal-500/15' }
      ]
    },
    {
      title: 'Legal',
      items: [
        { label: 'Privacy Policy', href: '#privacy', page: 'privacy', description: 'Safe guards and clear privacy assurance', icon: ShieldCheck, color: 'text-purple-500 bg-purple-500/10 dark:bg-purple-500/15' },
        { label: 'Terms of Use', href: '#terms', page: 'terms', description: 'User agreement rules & license policies', icon: Scale, color: 'text-fuchsia-500 bg-fuchsia-500/10 dark:bg-fuchsia-500/15' },
        { label: 'Cookie Policy', href: '#cookies', page: 'cookies', description: 'Secure cookie free web experience standard', icon: Cookie, color: 'text-pink-500 bg-pink-500/10 dark:bg-pink-500/15' }
      ]
    }
  ];

  const isCategoryActive = (categoryIndex: number): boolean => {
    const cat = menuCategories[categoryIndex];
    return cat.items.some(item => {
      if (activePage !== 'home') {
        return item.page === activePage;
      } else {
        const targetId = item.href.substring(1);
        return activeSection === targetId;
      }
    });
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      const activeIdx = menuCategories.findIndex((_, idx) => isCategoryActive(idx));
      if (activeIdx !== -1) {
        setMobileOpenCategory(activeIdx);
      } else {
        setMobileOpenCategory(0);
      }
    }
  }, [mobileMenuOpen, activePage, activeSection]);

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Close language dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[76px] px-6 lg:px-12 flex items-center justify-between border-b transition-colors duration-300 bg-white/80 dark:bg-[#0B0F1A]/80 border-[#E5E7EB] dark:border-[#374151] backdrop-blur-md">
      {/* Container to restrict max width */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Back Button Combination */}
        <div className="flex items-center gap-4 lg:w-[280px] shrink-0">
          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              onBackToHome?.();
            }}
            className="flex items-center gap-3 group"
          >
            <BrandLogo className="h-10 w-10 transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent leading-none">
                Identra
              </span>
              <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500 tracking-wide mt-1 leading-none">
                {lang === 'vi' ? 'Sản phẩm của AwnCorp' : 'A product of AwnCorp'}
              </span>
            </div>
          </a>

          {activePage !== 'home' && (
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onBack || onBackToHome}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5B6CFF]/10 text-[#5B6CFF] text-xs font-bold cursor-pointer hover:bg-[#5B6CFF]/15 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Quay lại' : 'Back'}</span>
            </motion.button>
          )}
        </div>

        {/* Center Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {menuCategories.map((cat, idx) => {
            const isCatActive = isCategoryActive(idx);
            return (
              <div 
                key={cat.title}
                onMouseEnter={() => setHoveredCategory(idx)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="relative py-2"
              >
                <button
                  className={`text-sm font-semibold transition-colors duration-200 flex items-center gap-2 focus:outline-none cursor-pointer bg-transparent border-none ${
                    isCatActive 
                      ? 'text-[#5B6CFF] dark:text-[#7C8CFF]' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF]'
                  }`}
                >
                  <span className="font-semibold tracking-tight">{cat.title}</span>
                  <ChevronDown strokeWidth={1.5} className={`w-3.5 h-3.5 transition-transform duration-200 ${hoveredCategory === idx ? 'rotate-180 text-[#5B6CFF] dark:text-[#7C8CFF]' : 'text-slate-350 dark:text-slate-600'}`} />
                </button>

                <AnimatePresence>
                  {hoveredCategory === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 mt-3 w-[380px] bg-white dark:bg-[#0B0F19] border border-[#5B6CFF]/15 dark:border-slate-800/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(2,4,12,0.6)] p-2.5 z-50 overflow-hidden text-left"
                    >
                      <div className="space-y-1">
                        {cat.items.map((item) => {
                          const isItemActive = activePage !== 'home' ? item.page === activePage : activeSection === item.href.substring(1);
                          const IconComponent = item.icon;
                          return (
                            <a
                              key={item.label}
                              href={getPathForPage(item.page)}
                              onClick={(e) => {
                                e.preventDefault();
                                setHoveredCategory(null);
                                onNavigate?.(item.page);
                              }}
                              className={`group flex items-start gap-3.5 p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                                isItemActive 
                                  ? 'bg-[#5B6CFF]/5 dark:bg-[#5B6CFF]/10' 
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-900/40'
                              }`}
                            >
                              <div className={`p-2 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${item.color}`}>
                                <IconComponent className="w-4.5 h-4.5 stroke-[2]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className={`text-[13px] font-bold tracking-tight transition-colors duration-205 ${
                                    isItemActive 
                                      ? 'text-[#5B6CFF] dark:text-[#7C8CFF]' 
                                      : 'text-gray-800 dark:text-gray-200 group-hover:text-[#5B6CFF] dark:group-hover:text-[#7C8CFF]'
                                  }`}>
                                    {item.label}
                                  </span>
                                  {isItemActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B6CFF] dark:bg-[#7C8CFF] animate-pulse" />
                                  )}
                                </div>
                                <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5 leading-snug tracking-normal line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Corner: Controls (Language Toggle + Theme Toggle + CTA Setup) */}
        <div className="hidden lg:flex items-center gap-3.5 lg:w-[280px] justify-end shrink-0">
          
          {/* Custom Lang Switcher Dropdown */}
          <div ref={dropdownRef} className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              id="lang-selector-btn"
              className="h-10 px-3 py-2 rounded-full bg-[#F3F4F6] dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-[#E5E7EB] dark:hover:bg-[#334155] transition-colors cursor-pointer"
              title={lang === 'vi' ? "Thay đổi ngôn ngữ" : "Change language"}
            >
              <Globe className="w-4 h-4 text-[#5B6CFF] dark:text-[#7C8CFF]" />
              <span className="font-mono">{lang === 'vi' ? 'VI' : 'EN'}</span>
            </motion.button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#0F172A] border border-gray-150 dark:border-slate-800 rounded-xl shadow-xl py-1.5 overflow-hidden z-50 text-left"
                >
                  <button
                    onClick={() => {
                      setLang('vi');
                      setLangDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center justify-between text-gray-700 dark:text-gray-200 cursor-pointer"
                  >
                    <span>Tiếng Việt</span>
                    {lang === 'vi' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                  </button>
                  <button
                    onClick={() => {
                      setLang('en');
                      setLangDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center justify-between text-gray-700 dark:text-gray-200 cursor-pointer"
                  >
                    <span>English</span>
                    {lang === 'en' && <Check className="w-3.5 h-3.5 text-[#5B6CFF]" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Custom Theme Switcher Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleTheme}
            className="w-10 h-10 rounded-full bg-[#F3F4F6] dark:bg-[#1E293B] border border-gray-200 dark:border-gray-700 cursor-pointer flex items-center justify-center text-[#1F2937] dark:text-gray-100 hover:bg-[#E5E7EB] dark:hover:bg-[#334155] transition-colors"
            title={theme === 'light' ? (lang === 'vi' ? "Chuyển sang giao diện tối" : "Switch to Dark Mode") : (lang === 'vi' ? "Chuyển sang giao diện sáng" : "Switch to Light Mode")}
            id="theme-toggler-btn"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -6, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 6, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                {theme === 'light' ? (
                  <Sun className="w-5 h-5 text-[#F59E0B]" />
                ) : (
                  <Moon className="w-5 h-5 text-[#FFF] -rotate-12" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Bold Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenDemo}
            id="nav-cta-btn"
            className="px-5 py-2 text-sm font-semibold tracking-wide rounded-full text-white bg-[#5B6CFF] hover:bg-[#4A5AF0] active:bg-[#3B4BE0] transition-colors relative overflow-hidden group shadow-md shadow-[#5B6CFF]/15"
          >
            <span className="relative z-10">{lang === 'vi' ? 'Dùng thử ngay' : 'Try Demo'}</span>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>

        {/* Mobile controls combined */}
        <div className="flex lg:hidden items-center gap-2.5">
          {/* Quick Language Toggle Button for mobile */}
          <button
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            className="h-8.5 px-2.5 rounded-full border border-gray-205 dark:border-gray-800 text-xs font-bold font-mono text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title={lang === 'vi' ? "Switch to English" : "Chuyển sang Tiếng Việt"}
          >
            {lang === 'vi' ? 'VI' : 'EN'}
          </button>
          
          {/* Circular Theme Switcher for mobile device width space */}
          <button
            onClick={handleToggleTheme}
            id="mobile-theme-btn"
            className="p-2 rounded-full border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === 'light' ? <Sun className="w-4.5 h-4.5 text-[#F59E0B]" /> : <Moon className="w-4.5 h-4.5 text-white" />}
          </button>

          {/* Toggle Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-hamburger"
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation (Slide down layout) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-[76px] left-0 right-0 bg-white dark:bg-[#0B0F1A] border-b border-[#E5E7EB] dark:border-[#374151] shadow-xl overflow-hidden lg:hidden"
            id="mobile-menu-drawer"
          >
            <div className="flex flex-col p-6 gap-4">
              {menuCategories.map((cat, idx) => {
                const isCatOpen = mobileOpenCategory === idx;
                const isCatActive = isCategoryActive(idx);
                return (
                  <div key={cat.title} className="border-b border-gray-150/40 dark:border-gray-800/40 pb-2 text-left">
                    <button
                      onClick={() => setMobileOpenCategory(isCatOpen ? null : idx)}
                      className={`w-full py-2.5 flex items-center justify-between text-sm.5 font-bold bg-transparent border-none cursor-pointer transition-colors select-none ${
                        isCatActive ? 'text-[#5B6CFF] dark:text-[#7C8CFF]' : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span>{cat.title}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-gray-400 ${isCatOpen ? 'rotate-180 text-[#5B6CFF] dark:text-[#7C8CFF]' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isCatOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-slate-50/50 dark:bg-[#1E293B]/20 rounded-xl px-2"
                        >
                          <div className="py-2.5 space-y-1.5 text-left">
                            {cat.items.map((item) => {
                              const isItemActive = activePage !== 'home' ? item.page === activePage : activeSection === item.href.substring(1);
                              const IconComponent = item.icon;
                              return (
                                <a
                                  key={item.label}
                                  href={getPathForPage(item.page)}
                                  onClick={(e) => {
                                    setMobileMenuOpen(false);
                                    e.preventDefault();
                                    onNavigate?.(item.page);
                                  }}
                                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                                    isItemActive
                                      ? 'bg-[#5B6CFF]/10 text-[#5B6CFF] dark:text-[#7C8CFF]'
                                      : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/20'
                                  }`}
                                >
                                  <div className={`p-1.5 rounded-lg flex-shrink-0 flex items-center justify-center ${item.color}`}>
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[13px] font-bold tracking-tight">
                                        {item.label}
                                      </span>
                                      {isItemActive && <span className="w-1.5 h-1.5 rounded-full bg-[#5B6CFF] dark:bg-[#7C8CFF]" />}
                                    </div>
                                    <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5 leading-snug line-clamp-1">
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                id="mobile-drawer-cta"
                className="w-full mt-2 py-3 rounded-xl bg-[#5B6CFF] hover:bg-[#4A5AF0] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#5B6CFF]/20 cursor-pointer border-none"
              >
                {lang === 'vi' ? 'Dùng thử ngay' : 'Try Demo'}
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
