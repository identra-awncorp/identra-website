import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Technology from './components/Technology';
import UseCases from './components/UseCases';
import ResourcesAndAbout from './components/ResourcesAndAbout';
import InteractiveDemo from './components/InteractiveDemo';
import FloatingContact from './components/FloatingContact';
import FooterAndFaq from './components/FooterAndFaq';
import DetailedPageViews from './components/DetailedPageViews';
import CookieConsentModal from './components/CookieConsentModal';
import {
  getBlogPostPath,
  getPageFromLocation,
  getPathForPage,
  isIdentraHistoryState,
  type IdentraHistoryState,
} from './navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Database, 
  Workflow, 
  Key, 
  ChevronDown, 
  ChevronUp,
  ExternalLink,
  Github,
  Award,
  ArrowRight,
  Check,
  Loader2
} from 'lucide-react';

// Helper functions to manage cookies
function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookie(name: string, value: string, days = 365) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Light mode is the default for first-time users
    if (typeof window !== 'undefined') {
      const savedTheme = getCookie('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    }
    return 'light';
  });
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showExtraParameters, setShowExtraParameters] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [activePage, setActivePage] = useState<string>(() => getPageFromLocation());
  const [activePath, setActivePath] = useState<string>(() => window.location.pathname);
  const [isLoading, setIsLoading] = useState(true);

  const seoByPage: Record<string, { vi: [string, string]; en: [string, string] }> = {
    home: {
      vi: ['Identra | Ví định danh số tự chủ và riêng tư', 'Identra giúp bạn lưu trữ, quản lý và chia sẻ chứng thực số an toàn, riêng tư theo tiêu chuẩn W3C.'],
      en: ['Identra | Private Self-Sovereign Identity Wallet', 'Store, manage, and selectively share secure digital credentials with Identra.'],
    },
    features: {
      vi: ['Tính năng | Identra', 'Khám phá các tính năng bảo mật, chia sẻ chọn lọc và xác minh danh tính số của Identra.'],
      en: ['Features | Identra', 'Explore Identra security, selective disclosure, and digital identity verification features.'],
    },
    'tech-glossary': {
      vi: ['Công nghệ | Identra', 'Tìm hiểu DID, Verifiable Credentials, Zero-Knowledge Proof và kiến trúc SSI của Identra.'],
      en: ['Technology | Identra', 'Learn about Identra DIDs, Verifiable Credentials, Zero-Knowledge Proofs, and SSI architecture.'],
    },
    'use-cases': {
      vi: ['Trường hợp sử dụng | Identra', 'Khám phá cách Identra ứng dụng danh tính số tự chủ trong đời sống và doanh nghiệp.'],
      en: ['Use Cases | Identra', 'Discover real-world and enterprise self-sovereign identity use cases with Identra.'],
    },
    docs: {
      vi: ['Tài liệu API & SDK | Identra', 'Tài liệu tích hợp API và SDK Identra dành cho nhà phát triển.'],
      en: ['API & SDK Documentation | Identra', 'Developer documentation for integrating Identra APIs and SDKs.'],
    },
    guides: {
      vi: ['Hướng dẫn SSI từng bước | Identra', 'Tìm hiểu mô hình SSI qua luồng phát hành, lưu giữ và xác minh chứng thực số cùng Identra SDK minh họa.'],
      en: ['Step-by-step SSI Guide | Identra', 'Learn the SSI model through credential issuance, storage, and verification with the illustrative Identra SDK.'],
    },
    blog: {
      vi: ['Blog | Identra', 'Tin tức, nghiên cứu và hướng dẫn mới nhất về danh tính số tự chủ từ Identra.'],
      en: ['Blog | Identra', 'Latest self-sovereign identity news, research, and guides from Identra.'],
    },
    about: {
      vi: ['Về chúng tôi | Identra', 'Tìm hiểu sứ mệnh xây dựng hạ tầng niềm tin số an toàn và riêng tư của Identra.'],
      en: ['About Us | Identra', 'Learn about Identra and our mission to build private, trusted digital identity infrastructure.'],
    },
    careers: {
      vi: ['Tuyển dụng | Identra', 'Khám phá cơ hội nghề nghiệp và cùng Identra xây dựng tương lai danh tính số.'],
      en: ['Careers | Identra', 'Explore career opportunities and help Identra build the future of digital identity.'],
    },
    faq: {
      vi: ['Câu hỏi thường gặp | Identra', 'Giải đáp các câu hỏi phổ biến về ví định danh số, bảo mật và quyền riêng tư Identra.'],
      en: ['Frequently Asked Questions | Identra', 'Answers to common questions about Identra digital identity, security, and privacy.'],
    },
    privacy: {
      vi: ['Chính sách quyền riêng tư | Identra', 'Tìm hiểu cách Identra bảo vệ quyền riêng tư và dữ liệu định danh số của bạn.'],
      en: ['Privacy Policy | Identra', 'Learn how Identra protects your privacy and digital identity data.'],
    },
    terms: {
      vi: ['Điều khoản sử dụng | Identra', 'Điều khoản sử dụng sản phẩm và dịch vụ Identra.'],
      en: ['Terms of Use | Identra', 'Terms governing the use of Identra products and services.'],
    },
    cookies: {
      vi: ['Chính sách Cookie | Identra', 'Tìm hiểu cách Identra sử dụng bộ nhớ trình duyệt và bảo vệ quyền riêng tư.'],
      en: ['Cookie Policy | Identra', 'Learn how Identra uses browser storage while protecting your privacy.'],
    },
    specs: {
      vi: ['Thông số kỹ thuật | Identra', 'Khám phá thông số kỹ thuật và kiến trúc bảo mật của Identra.'],
      en: ['Technical Specifications | Identra', 'Explore Identra technical specifications and security architecture.'],
    },
    'zkp-demo': {
      vi: ['Trình mô phỏng Zero-Knowledge Proof | Identra', 'Trải nghiệm cách Zero-Knowledge Proof xác minh thông tin mà không tiết lộ dữ liệu nhạy cảm.'],
      en: ['Zero-Knowledge Proof Visualizer | Identra', 'Experience how Zero-Knowledge Proofs verify claims without exposing sensitive data.'],
    },
  };

  const restoreScrollPosition = useCallback((scrollY: number, targetSection?: string) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (targetSection) {
          document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        window.scrollTo({ top: scrollY, behavior: 'instant' });
        setTimeout(() => window.scrollTo({ top: scrollY, behavior: 'instant' }), 120);
      });
    });
  }, []);

  const saveCurrentScrollPosition = useCallback(() => {
    const currentState = window.history.state;
    if (!isIdentraHistoryState(currentState)) return;

    window.history.replaceState(
      { ...currentState, scrollY: window.scrollY } satisfies IdentraHistoryState,
      '',
      window.location.href,
    );
  }, []);

  const handleNavigate = useCallback((page: string, targetSection?: string, pathOverride?: string) => {
    const nextPath = pathOverride ?? `${getPathForPage(page)}${targetSection ? `#${targetSection}` : ''}`;
    const currentPath = `${window.location.pathname}${window.location.hash}`;

    saveCurrentScrollPosition();

    if (currentPath !== nextPath) {
      const currentState = window.history.state;
      const currentIndex = isIdentraHistoryState(currentState) ? currentState.index : 0;
      const nextState: IdentraHistoryState = {
        identra: true,
        index: currentIndex + 1,
        page,
        scrollY: 0,
      };
      window.history.pushState(nextState, '', nextPath);
    }

    setActivePage(page);
    setActivePath(nextPath.split('#')[0]);
    restoreScrollPosition(0, page === 'home' ? targetSection : undefined);
  }, [restoreScrollPosition, saveCurrentScrollPosition]);

  const handleNavigateToBlogPost = useCallback((postId: string | null) => {
    handleNavigate('blog', undefined, postId ? getBlogPostPath(postId) : getPathForPage('blog'));
  }, [handleNavigate]);

  const handleBack = useCallback(() => {
    saveCurrentScrollPosition();
    const currentState = window.history.state;

    if (isIdentraHistoryState(currentState) && currentState.index > 0) {
      window.history.back();
      return;
    }

    handleNavigate('home');
  }, [handleNavigate, saveCurrentScrollPosition]);

  // Translation table for App.tsx
  const t = {
    vi: {
      techSpecs: "Thông số Công nghệ",
      selfSovereignTitle: "Cấu trúc phân quyền tự giữ (Self-Sovereign)",
      selfSovereignDesc: "SSI Wallet vận hành thông qua các chuẩn mã hóa do hiệp hội mạng toàn cầu W3C đề xuất, loại trừ rủi ro đánh cắp mật khẩu và rò rỉ cơ sở dữ liệu.",
      distributedStoreTitle: "Lưu trữ phân tán",
      distributedStoreDesc: "Thông tin cá nhân (Căn cước, Bằng lái, Văn bằng) nằm trực tiếp trên thiết bị của bạn thay vì máy chủ trung tâm. Bạn hoàn toàn tự do mang dữ liệu đi bất kỳ đâu.",
      verifiableSignTitle: "Chữ ký số Verifiable",
      verifiableSignDesc: "Mấy tệp định danh số chứa Chữ ký mật mã toán học chống giả mạo tuyệt đối. Bên xác thực chỉ tốn 0.1s để khẳng định tính chân thực của thông tin.",
      zkpTitle: "Zero-Knowledge Proofs",
      zkpDesc: "Chứng minh một điều kiện cụ thể (ví dụ: tuổi lớn hơn 18) mà không cần bàn giao chi tiết nhạy cảm (ngày tháng năm sinh hay số CCCD gốc).",
      moreSpecs: "Xem thêm thông số chi tiết kỹ thuật",
      lessSpecs: "Thu bớt thông số",
      verifySpeed: "Tốc độ đối soát",
      cryptoSol: "Giải pháp mật mã học",
      payloadTrans: "Truyền tải Payload",
      verifySpeedDesc: "Xác minh tính chính trực mật mã và trạng thái thu hồi của khóa công khai trên sổ cái gần như tức thì.",
      cryptoSolDesc: "Hệ thống chữ ký mật mã đường cong elliptic bảo bảo mật tuyệt đối, chống lại các cuộc tấn công vũ lực.",
      payloadTransDesc: "Gói dữ liệu Verifiable Presentation cực kỳ nhỏ gọn, tối ưu tốt cho quét mã QR hoặc truyền tin NFC tầm gần.",
      toastLaunch: "Đã khởi chạy phiên giao dịch Ví SSI Demo thành công!",
      toastKey: "Mở cấu hình đăng ký Khóa Bảo Mật Ví!",
      walletAlert: "Cảnh báo ví"
    },
    en: {
      techSpecs: "Technology Specifications",
      selfSovereignTitle: "Self-Sovereign Structure",
      selfSovereignDesc: "SSI Wallet operates under custom secure cryptography proposed by the global W3C consortium, eliminating risky central password registries.",
      distributedStoreTitle: "Decentralized Storage",
      distributedStoreDesc: "Personal credentials (ID, License, Degree) reside directly on your physical hardware instead of central databases. Control and move your records freely.",
      verifiableSignTitle: "Verifiable Signatures",
      verifiableSignDesc: "Mathematical signature claims built directly inside each record block. Verifying entities take less than 0.1s to assert realness.",
      zkpTitle: "Zero-Knowledge Proofs",
      zkpDesc: "Prove a specific criterion (e.g. older than 18) without releasing raw underlying private values (like date of birth or ID number digits).",
      moreSpecs: "Show technical engineering parameters",
      lessSpecs: "Hide technical parameters",
      verifySpeed: "Verification Latency",
      cryptoSol: "Cryptographic Standard",
      payloadTrans: "Payload Size Overhead",
      verifySpeedDesc: "Verify the mathematical tamper resistance and revocation status of public keys globally in sub-second times.",
      cryptoSolDesc: "Advanced elliptic curve signatures (ED25519 & Secp256k1) safely shield identities against high-volume brute force attacks.",
      payloadTransDesc: "Spatially compact Verifiable Presentations extremely optimized for efficient QR scans or physical NFC transmissions.",
      toastLaunch: "Successfully launched your custom SSI Wallet Sandbox demo!",
      toastKey: "Initiated cryptographic secure key enrolment!",
      walletAlert: "Wallet Notice"
    }
  }[lang];

  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    const initialPage = getPageFromLocation();
    const existingState = window.history.state;
    const initialState: IdentraHistoryState = {
      identra: true,
      index: isIdentraHistoryState(existingState) ? existingState.index : 0,
      page: initialPage,
      scrollY: isIdentraHistoryState(existingState) ? existingState.scrollY : 0,
    };
    const pagePath = getPathForPage(initialPage);
    const initialPath =
      window.location.pathname === pagePath ||
      (initialPage === 'blog' && window.location.pathname.startsWith(`${pagePath}/`))
        ? window.location.pathname
        : pagePath;

    window.history.replaceState(initialState, '', initialPath);
    setActivePage(initialPage);
    setActivePath(initialPath);

    let scrollFrame: number | null = null;
    let isRestoringScroll = false;

    const handleScroll = () => {
      if (isRestoringScroll || scrollFrame !== null) return;

      scrollFrame = requestAnimationFrame(() => {
        saveCurrentScrollPosition();
        scrollFrame = null;
      });
    };

    const handlePopState = (event: PopStateEvent) => {
      const page = getPageFromLocation();

      // Native in-page anchors manage their own scroll position and do not change pages.
      if (!isIdentraHistoryState(event.state) && window.location.hash) {
        return;
      }

      const state = isIdentraHistoryState(event.state)
        ? event.state
        : { identra: true, index: 0, page, scrollY: 0 } satisfies IdentraHistoryState;

      if (!isIdentraHistoryState(event.state)) {
        window.history.replaceState(state, '', getPathForPage(page));
      }

      isRestoringScroll = true;
      setActivePage(page);
      setActivePath(window.location.pathname);
      restoreScrollPosition(state.scrollY);
      setTimeout(() => {
        isRestoringScroll = false;
      }, 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      if (scrollFrame !== null) cancelAnimationFrame(scrollFrame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      window.history.scrollRestoration = 'auto';
    };
  }, [restoreScrollPosition, saveCurrentScrollPosition]);

  // Synchronize dynamic dark mode class with root html element and save to cookie
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setCookie('theme', theme);
  }, [theme]);

  useEffect(() => {
    const [title, description] = (seoByPage[activePage] ?? seoByPage.home)[lang];
    document.title = title;
    document.documentElement.lang = lang;

    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');

    descriptionMeta?.setAttribute('content', description);
    ogTitle?.setAttribute('content', title);
    ogDescription?.setAttribute('content', description);
    twitterTitle?.setAttribute('content', title);
    twitterDescription?.setAttribute('content', description);

    const canonicalUrl = `${window.location.origin}${activePath}`;
    const socialImageUrl = `${window.location.origin}/identra-social-preview.png`;
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.setAttribute('content', socialImageUrl);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.setAttribute('content', socialImageUrl);
  }, [activePage, activePath, lang]);

  // Simulate loading timer for skeleton screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Hide document scrollbar when skeleton loading is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Sync state values with body or wrapper and custom indicators
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenDemo = () => {
    setIsDemoOpen(true);
    showToast(t.toastLaunch);
  };

  const handleOpenWallet = () => {
    const downloadSection = document.getElementById('download');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={theme}>
      {/* Fullscreen Skeleton Loading Screen Overlay with smooth fadeout */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="sandbox-skeleton-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#F7F8FC] dark:bg-[#0B0F1A] flex flex-col min-h-screen overflow-y-auto overflow-x-hidden select-none pointer-events-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Header / Navbar Skeleton */}
            <div className="w-full shrink-0 border-b border-gray-150 dark:border-slate-850 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-4 sm:px-6 py-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8.5 h-8.5 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
                  <div className="h-4.5 w-24 sm:w-28 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <div className="h-3.5 w-14 bg-slate-100 dark:bg-slate-850 rounded-md animate-pulse" />
                  <div className="h-3.5 w-18 bg-slate-100 dark:bg-slate-850 rounded-md animate-pulse" />
                  <div className="h-3.5 w-14 bg-slate-100 dark:bg-slate-850 rounded-md animate-pulse" />
                  <div className="h-3.5 w-20 bg-slate-100 dark:bg-slate-850 rounded-md animate-pulse" />
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7.5 h-7.5 rounded-lg bg-slate-100 dark:bg-slate-850 animate-pulse" />
                  <div className="w-9 h-5.5 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
                  <div className="w-20 sm:w-24 h-8.5 bg-[#5B6CFF]/20 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>

            {/* Main Hero & Dynamic Bento Area Skeleton */}
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-8 md:py-12 flex-grow flex items-center justify-center">
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                {/* Left Column Text / Information Blocks */}
                <div className="lg:col-span-7 space-y-4 lg:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start max-w-2xl mx-auto lg:mx-0 w-full">
                  <div className="h-5 w-32 bg-[#5B6CFF]/15 dark:bg-[#7C8CFF]/15 rounded-lg animate-pulse" />
                  <div className="space-y-3 w-full">
                    <div className="h-9 sm:h-10.5 w-full bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
                    <div className="h-9 sm:h-10.5 w-4/5 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse mx-auto lg:mx-0" />
                  </div>
                  <div className="space-y-2 pt-1 w-full max-w-lg">
                    <div className="h-3.5 w-full bg-slate-100 dark:bg-slate-850 rounded animate-pulse" />
                    <div className="h-3.5 w-11/12 bg-slate-100 dark:bg-slate-850 rounded animate-pulse mx-auto lg:mx-0" />
                    <div className="h-3.5 w-3/4 bg-slate-100 dark:bg-slate-850 rounded animate-pulse mx-auto lg:mx-0" />
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                    <div className="h-10 w-32 sm:w-36 bg-[#3B52FF]/20 dark:bg-[#7C8CFF]/20 rounded-xl animate-pulse" />
                    <div className="h-10 w-28 sm:w-32 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
                  </div>
                </div>

                {/* Right Column Interactive Applet/Device Graphics Skeleton */}
                <div className="lg:col-span-5 flex justify-center w-full pt-2 lg:pt-0">
                  <div className="w-full max-w-sm rounded-[24px] sm:rounded-[32px] border border-gray-150 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-4 sm:p-6 space-y-4 sm:space-y-5 relative overflow-hidden">
                    {/* Subtle ambient light source representational aura */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#5B6CFF]/5 rounded-full blur-3xl" />

                    {/* Top Biometric authentication state layout mockup */}
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-850/80 pb-4 sm:pb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center animate-pulse">
                          <div className="w-4.5 h-4.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                        </div>
                        <div className="space-y-1.5 text-left">
                          <div className="h-4 w-20 sm:w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                          <div className="h-3 w-14 sm:w-16 bg-slate-100 dark:bg-slate-850 rounded animate-pulse" />
                        </div>
                      </div>
                      {/* Status badge skeleton */}
                      <div className="h-5.5 w-14 sm:w-16 bg-emerald-500/15 rounded-md animate-pulse" />
                    </div>

                    {/* Multiple credential block rows representation */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-gray-105 dark:border-slate-850 space-y-2.5 sm:space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="h-3 w-20 sm:w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                          <div className="h-2.5 w-8 sm:w-10 bg-slate-100 dark:bg-slate-850 rounded animate-pulse" />
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                          <div className="h-3 w-4/5 bg-slate-100 dark:bg-slate-850 rounded animate-pulse" />
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-gray-105 dark:border-slate-850 space-y-2.5 sm:space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="h-3 w-16 sm:w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                          <div className="h-2.5 w-10 sm:w-12 bg-slate-100 dark:bg-slate-850 rounded animate-pulse" />
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <div className="h-4 w-11/12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom mini-loading bar for cryptographic integrity checks */}
                    <div className="pt-1.5 sm:pt-2 space-y-2 text-left">
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#5B6CFF] dark:bg-[#7C8CFF] rounded-full animate-pulse" style={{ width: '60%' }} />
                      </div>
                      <div className="flex justify-between text-[9px] font-bold text-gray-400 dark:text-gray-500 font-mono tracking-wider">
                        <span>{lang === 'vi' ? 'ĐANG KHỞI TẠO MÔ-ĐUN MẬT MÃ...' : 'ENROLLING SYSTEM SECURE CORES...'}</span>
                        <span className="flex items-center gap-1">
                          <Loader2 className="w-2.5 h-2.5 animate-spin" />
                          <span>INITIALIZING</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Cryptographic Environment signature loading bar */}
            <div className="w-full shrink-0 border-t border-gray-150 dark:border-slate-850 py-4.5 px-4 sm:px-6 bg-white/40 dark:bg-slate-950/20">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3.5 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-bold text-slate-500 dark:text-gray-400 tracking-wider uppercase">
                    {lang === 'vi' ? "Xác minh chuẩn W3C và kiến trúc phi tập trung..." : "Verifying W3C compatibility & distributed hardware roots..."}
                  </span>
                </div>
                <span className="text-[9px] font-mono font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  W3C DID/VC SECURED PROTOCOL 2.0
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#F7F8FC] dark:bg-[#0B0F1A] text-[#1F2937] dark:text-[#E5E7EB] font-sans transition-colors duration-300">
        
        {/* Navigation Bar */}
        <Navbar 
          theme={theme} 
          setTheme={setTheme} 
          onOpenDemo={handleOpenDemo}
          lang={lang}
          setLang={setLang}
          activePage={activePage}
          onBackToHome={(targetSection) => handleNavigate('home', targetSection)}
          onNavigate={(page) => handleNavigate(page)}
          onBack={handleBack}
        />

        {/* Space spacing helper for the fixed navbar */}
        <div className="h-[76px]" />

        {activePage === 'home' ? (
          /* Hero Section Container */
          <main className="relative">
            <Hero 
              lang={lang}
              onOpenDemo={handleOpenDemo} 
              onOpenWallet={handleOpenWallet} 
            />

            {/* Core technological parameters section below fold to expand on design metrics without cluttering hero */}
            <section id="trust-parameters" className="py-16 px-6 lg:px-12 bg-white dark:bg-[#0F172A]/40 border-t border-gray-100 dark:border-slate-800/80 transition-colors duration-300">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 max-w-xl mx-auto">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] block mb-2">{t.techSpecs}</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight">{t.selfSovereignTitle}</h2>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    {t.selfSovereignDesc}
                  </p>
                </div>

                {/* Grid cards detailing standard features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  
                  {/* Fact card 1 */}
                  <motion.div 
                    whileHover={{ y: -6 }}
                    className="p-6.5 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-left shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#5B6CFF]/10 text-[#5B6CFF] flex items-center justify-center mb-4">
                      <Database className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-snug">{t.distributedStoreTitle}</h3>
                    <p className="text-xs sm:text-xs.5 leading-relaxed text-gray-500 dark:text-gray-400">
                      {t.distributedStoreDesc}
                    </p>
                  </motion.div>

                  {/* Fact card 2 */}
                  <motion.div 
                    whileHover={{ y: -6 }}
                    className="p-6.5 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-left shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
                      <Workflow className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-snug">{t.verifiableSignTitle}</h3>
                    <p className="text-xs sm:text-xs.5 leading-relaxed text-gray-500 dark:text-gray-400">
                      {t.verifiableSignDesc}
                    </p>
                  </motion.div>

                  {/* Fact card 3 */}
                  <motion.div 
                    whileHover={{ y: -6 }}
                    className="p-6.5 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-left shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
                        <Key className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-snug">{t.zkpTitle}</h3>
                      <p className="text-xs sm:text-xs.5 leading-relaxed text-gray-500 dark:text-gray-400 mb-4">
                        {t.zkpDesc}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('zkp-demo')}
                      className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-[#5B6CFF] hover:text-[#4A5AF0] transition-colors cursor-pointer text-left self-start mt-auto"
                    >
                      {lang === 'vi' ? "Trải nghiệm ZKP →" : "Launch ZKP Visualizer →"}
                    </button>
                  </motion.div>

                </div>

                {/* Extra metric parameters with layout animation */}
                <AnimatePresence>
                  {showExtraParameters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-8"
                    >
                      <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-dashed border-gray-200 dark:border-slate-800 text-left grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono font-bold text-[#5B6CFF] uppercase tracking-wider mb-1">{t.verifySpeed}</span>
                          <span className="text-2xl font-black text-gray-900 dark:text-white">&lt; 150ms</span>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            {t.verifySpeedDesc}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono font-bold text-teal-500 uppercase tracking-wider mb-1">{t.cryptoSol}</span>
                          <span className="text-2xl font-black text-gray-900 dark:text-white">ED25519 & Secp256k1</span>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            {t.cryptoSolDesc}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase tracking-wider mb-1">{t.payloadTrans}</span>
                          <span className="text-2xl font-black text-gray-900 dark:text-white">&lt; 2.5 KB</span>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            {t.payloadTransDesc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Toggle trigger button leading to specs page */}
                <div className="mt-8 text-center">
                  <button
                    onClick={() => handleNavigate('specs')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5B6CFF] hover:text-[#4A5AF0] cursor-pointer group"
                  >
                    <span>{showExtraParameters ? t.lessSpecs : t.moreSpecs}</span>
                    <ArrowRight className="w-4 h-4 text-[#5B6CFF] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </section>

            {/* Core Feature Bento Sections */}
            <Features lang={lang} onOpenDemo={handleOpenDemo} onSeeMore={() => handleNavigate('features')} />

            {/* Interactive Cryptography Triangle Flow section */}
            <Technology lang={lang} onSeeMore={() => handleNavigate('tech-glossary')} />

            {/* Real world SSI usage cases */}
            <UseCases lang={lang} onSeeMore={() => handleNavigate('use-cases')} />

            {/* Documentation, blog reports, and mission overview values */}
            <ResourcesAndAbout 
              lang={lang}
              onSeeMoreDocs={() => handleNavigate('docs')} 
              onSeeMoreBlog={() => handleNavigate('blog')} 
              onSeeMoreAbout={() => handleNavigate('about')} 
            />
          </main>
        ) : (
          <DetailedPageViews
            page={activePage}
            path={activePath}
            lang={lang}
            onBack={handleBack}
            onOpenDemo={handleOpenDemo}
            onNavigate={handleNavigate}
            onNavigateToBlogPost={handleNavigateToBlogPost}
          />
        )}

        {/* End Sections including CTA card, FAQs, Newsletter, and Footer */}
        <FooterAndFaq onOpenDemo={handleOpenDemo} lang={lang} onNavigate={handleNavigate} />

        {/* Interactive Sandbox Modal */}
        <AnimatePresence>
          {isDemoOpen && (
            <InteractiveDemo 
              isOpen={isDemoOpen} 
              onClose={() => setIsDemoOpen(false)} 
              lang={lang}
            />
          )}
        </AnimatePresence>

        {/* Floating Contact Us Button */}
        <FloatingContact lang={lang} />

        {/* Floating Interactive Notification Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-24 right-6 z-50 p-4.5 rounded-xl shadow-xl bg-slate-900 text-white border border-slate-800 max-w-sm flex items-center gap-3"
            >
              <div className="w-7 h-7 rounded-lg bg-[#5B6CFF] text-white flex items-center justify-center shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold leading-none block uppercase text-[#8F9BFF]">{t.walletAlert}</span>
                <span className="text-xs text-gray-300 mt-1 block">{toastMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cookie Consent Modal */}
        <CookieConsentModal lang={lang} onNavigate={handleNavigate} />

      </div>
    </div>
  );
}
