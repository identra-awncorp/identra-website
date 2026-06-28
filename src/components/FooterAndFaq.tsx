import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  CheckCircle2, 
  Github, 
  Send, 
  Twitter, 
  MessageSquare,
  BookOpen,
  QrCode,
  Smartphone,
  Shield,
  Fingerprint,
  Mail,
  Check
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { getPathForPage } from '../navigation';

interface FooterAndFaqProps {
  onOpenDemo: () => void;
  lang: 'vi' | 'en';
  onNavigate?: (page: string) => void;
}

export default function FooterAndFaq({ onOpenDemo, lang, onNavigate }: FooterAndFaqProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const isVi = lang === 'vi';

  const t = {
    vi: {
      downloadHeader: "Sẵn sàng làm chủ danh tính số của bạn?",
      downloadDesc: "Tham gia cùng hàng ngàn người đang xây dựng tương lai của một thế giới số an toàn và lấy người dùng làm trung tâm.",
      scanTitle: "Quét để dùng thử",
      scanDesc: "Scan QR để trải nghiệm SSI Wallet ngay trên điện thoại của bạn",
      faqHeader: "Câu hỏi thường gặp",
      newsletterHeader: "Nhận cập nhật mới nhất về SSI Wallet",
      newsletterDesc: "Đăng ký để nhận tin tức, cập nhật sản phẩm và nội dung độc quyền.",
      newsletterSuccess: "Đăng ký thành công! Cảm ơn bạn đã tham gia cùng chúng tôi.",
      emailPlaceholder: "Nhập email của bạn",
      subscribeBtn: "Đăng ký",
      privacyDisclaimer: "Chúng tôi tôn trọng quyền riêng tư của bạn. Không spam.",
      brandTagline: "Danh tính số thuộc về bạn. Tương lai thuộc về bạn.",
      productsHeader: "Sản phẩm",
      companyHeader: "Công ty",
      resourcesHeader: "Tài nguyên",
      legalHeader: "Pháp lý",
      footerLinks: {
        features: "Tính năng",
        app: "Ứng dụng",
        pricing: "Bảng giá",
        about: "Về chúng tôi",
        blog: "Blog",
        careers: "Tuyển dụng",
        privacy: "Chính sách quyền riêng tư",
        terms: "Điều khoản sử dụng",
        cookies: "Chính sách Cookie",
        documents: "Tài liệu",
        guides: "Hướng dẫn",
        faq: "FAQ",
        tech: "Công nghệ",
        useCases: "Trường hợp sử dụng",
      }
    },
    en: {
      downloadHeader: "Ready to control your digital identity?",
      downloadDesc: "Join thousands of users building a safe, user-centric, and decentralized digital future.",
      scanTitle: "Scan to try the sandbox",
      scanDesc: "Scan this QR code to download and trial the SSI Wallet simulator directly on your handset",
      faqHeader: "Frequently Asked Questions",
      newsletterHeader: "Receive secure updates from peer networks",
      newsletterDesc: "Sign up to receive system release notes, telemetry insights, and specifications alerts.",
      newsletterSuccess: "Subscription validated! Thanks for keeping in touch with SSI Wallet.",
      emailPlaceholder: "Enter your email address",
      subscribeBtn: "Subscribe",
      privacyDisclaimer: "Zero trackers. Only high-value engineering alerts.",
      brandTagline: "Your digital identity. Your own future.",
      productsHeader: "Products",
      companyHeader: "Company",
      resourcesHeader: "Resources",
      legalHeader: "Legals",
      footerLinks: {
        features: "Features",
        app: "Applications",
        pricing: "Pricing Models",
        about: "About Us",
        blog: "Labs Blog",
        careers: "Open Careers",
        privacy: "Privacy Enclave Policy",
        terms: "Terms of Sovereignty",
        cookies: "Cookie Settings",
        documents: "Documentation",
        guides: "Guides",
        faq: "FAQ",
        tech: "Technology",
        useCases: "Use Cases",
      }
    }
  }[lang];

  const primaryFaqs = [
    {
      q: isVi ? "SSI Wallet là gì?" : "What is the SSI Wallet?",
      a: isVi 
        ? "SSI Wallet là ví định danh số tự chủ (Self-Sovereign Identity) thế hệ mới, cho phép bạn lưu giữ, bảo quản và tự chủ chia sẻ các giấy tờ số hóa như CCCD, bằng lái xe, bằng cấp... với mức độ bảo mật cao nhất bằng mật mã học mà không phụ thuộc vào bất kỳ máy chủ trung tâm nào."
        : "SSI Wallet is a next-generation self-sovereign identity wallet. It empowers you to hold, protect, and selectively prove digitized credentials—such as IDs, driving licenses, and academic certificates—signed cryptographically with no reliance on centralized databases."
    },
    {
      q: isVi ? "Nếu mất điện thoại thì sao?" : "What happens if I lose my phone?",
      a: isVi 
        ? "Dữ liệu của bạn được bảo vệ bằng mật mã sinh trắc học và mã khóa cá nhân sinh trên thiết bị. Khi cài đặt ví, bạn sẽ nhận được một cụm từ khôi phục (Recovery Phrase) gồm 12 ký tự cực kỳ an toàn. Bạn chỉ cần nhập cụm từ này trên thiết bị mới để khôi phục toàn vẹn dữ liệu của mình."
        : "Your identity artifacts are locked behind biometric prompts and locally sandboxed keys. During initialization, you obtain an offline 12-word seed recovery phrase. Inputting this phrase into a replacement device fully regenerates your secure records locally."
    },
    {
      q: isVi ? "Dữ liệu của tôi có được lưu trên server không?" : "Is my identity logged on your servers?",
      a: isVi 
        ? "Tuyệt đối không. SSI Wallet tuân thủ triết lý lưu trữ phân tán từ biên (Edge Storage). Mọi thông tin định danh cá nhân và chứng chỉ số (VC) của bạn chỉ được mã hóa và lưu duy nhất trên chip bảo mật cục bộ của điện thoại thông minh, hoàn toàn không có máy chủ trung tâm nào có quyền ghi nhận hay sao chụp."
        : "Absolutely not. The app embraces modern local privacy architectures. All personal attributes and Verifiable Credentials (VCs) are encrypted and stored solely within your smartphone's hardware enclave, completely hidden from third-party lookup tools."
    },
    {
      q: isVi ? "Điều gì làm SSI Wallet khác biệt?" : "What makes SSI Wallet stand out?",
      a: isVi 
        ? "Điểm khác biệt lớn nhất là tính tự chủ tuyệt đối và bảo mật Zero-Knowledge Proofs (ZKP). Bạn là người duy nhất nắm giữ chìa khóa dữ liệu, tự quyết định ai được xem thông tin gì (chỉ chứng minh một điều kiện đúng thay vì nộp bản gốc) và tốc độ đối soát chữ ký số dưới 0.1 giây hoàn toàn ngoại tuyến."
        : "The cornerstone is total personal authority combined with state-of-the-art ZKP. You own the private keys, specify minimal reveal limitations (such as proving age threshold limits without exposing birthday dates), and run secure peer validation offline in milliseconds."
    }
  ];

  const secondaryFaqs = [
    {
      q: isVi ? "Tôi có thể liên kết các ví khác không?" : "Are cross-wallet transfers supported?",
      a: isVi 
        ? "Có, SSI Wallet tuân thủ 100% tiêu chuẩn mở toàn cầu của liên minh W3C (DIDs & Verifiable Credentials), cho phép tương tác chéo hoàn hảo với bất kỳ hệ thống ví định danh công cộng quốc tế nào."
        : "Yes, SSI Wallet complies 100% with the W3C Open Sandbox standards (DIDs & Verifiable Credentials), ensuring seamless cross-blockchain interoperability with verified public registers."
    },
    {
      q: isVi ? "Ứng dụng này có thu phí sử dụng không?" : "Is the mobile application free?",
      a: isVi 
        ? "SSI Wallet hoàn toàn miễn phí dành cho mọi người dùng cá nhân để lưu trữ và quản lý danh tính. Chúng tôi chỉ cung cấp các dịch vụ hạ tầng phát hành và xác thực dữ liệu nâng cao có tính phí dành riêng cho các doanh nghiệp, tổ chức và cơ quan nhà nước."
        : "SSI Wallet is entirely free for individual sovereign holders. We generate business revenue strictly by offering enterprise issuing engines and high-volume verification APIs to corporate bodies or ministries."
    }
  ];

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-[#0B0F1A] transition-colors duration-300">
      <style>{`
        @keyframes scan-move {
          0%, 100% { top: 12%; }
          50% { top: 86%; }
        }
      `}</style>
      
      {/* 1. THE CTA BANNER SECTION */}
      <section id="download" className="py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#EEF2FF] via-[#F5F3FF] to-[#EFF6FF] dark:from-[#111827] dark:via-[#1E1B4B] dark:to-[#111827] border border-[#E0E7FF]/60 dark:border-indigo-950/40 p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-sm">
            
            {/* Soft decorative contour/topographic line overlay */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay bg-repeat bg-center bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80')]" />

            {/* Left Column Content */}
            <div className="flex-1 text-left relative z-10 max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1F2937] dark:text-white leading-tight tracking-tight mb-4">
                {t.downloadHeader}
              </h2>
              <p className="text-sm.5 text-[#4B5563] dark:text-gray-300 leading-relaxed mb-8 font-medium">
                {t.downloadDesc}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {/* App Store Download Button */}
                <motion.a
                  whileHover={{ scale: 1.03, translateY: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white dark:bg-slate-950 dark:hover:bg-black border border-slate-800 shadow-md hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.1,16.67C20.08,16.74 19.67,18.11 18.71,19.5M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.68,3.04 13.19,4.14 13.34,5.39C14.39,5.47 15.4,4.88 15.97,4.17Z" />
                  </svg>
                  <div className="text-left leading-none">
                    <span className="block text-[8px] font-medium text-slate-400 dark:text-gray-400 tracking-wide">
                      {isVi ? "Tải xuống từ" : "Download on the"}
                    </span>
                    <span className="block text-[13px] font-bold text-white mt-0.5">App Store</span>
                  </div>
                </motion.a>

                {/* Google Play Download Button */}
                <motion.a
                  whileHover={{ scale: 1.03, translateY: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white dark:bg-slate-950 dark:hover:bg-black border border-slate-800 shadow-md hover:shadow-lg transition-all"
                >
                  <svg className="w-5 h-5 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5,3.14C4.82,3.31 4.72,3.59 4.72,3.95V20.05C4.72,20.41 4.82,20.69 5,20.86L5.07,20.93L13.91,12.09V11.91L5.07,3.07L5,3.14M16.82,14.91L14.05,12.18V11.82L16.82,9.09L16.89,9.13L20.17,11C21.1,11.53 21.1,12.47 20.17,13L16.89,14.87L16.82,14.91M13.91,12L5.03,20.88C5.35,21.11 5.85,21.16 6.36,20.87L16.82,14.91L13.91,12M13.91,12L16.82,9.09L6.36,3.13C5.85,2.84 5.35,2.89 5.03,3.12L13.91,12Z" />
                  </svg>
                  <div className="text-left leading-none">
                    <span className="block text-[8px] font-medium text-slate-400 dark:text-gray-400 tracking-wide">
                      {isVi ? "Tải xuống từ" : "Get it on"}
                    </span>
                    <span className="block text-[13px] font-bold text-white mt-0.5">Google Play</span>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Center Column: Sleek Smartphone CSS Mockup */}
            <div className="hidden lg:flex flex-1 justify-center relative items-center max-w-xs xl:max-w-md h-[270px]">
              <motion.div 
                initial={{ y: 20, rotate: -2 }}
                animate={{ y: 0, rotate: -2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-[150px] h-[300px] border-[5px] border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-950 rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col p-3 z-10"
              >
                {/* Speaker indicator notch */}
                <div className="w-[45px] h-[10px] bg-slate-800 dark:bg-slate-700 rounded-full mx-auto mb-4 shrink-0 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                </div>

                {/* Inner brand circle on screen */}
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#5B6CFF]/10 animate-ping" />
                    <div className="w-[68px] h-[68px] rounded-full bg-[#5B6CFF]/5 flex items-center justify-center border-2 border-indigo-200 dark:border-indigo-900">
                      <div className="w-12 h-12 rounded-full bg-[#5B6CFF]/10 flex items-center justify-center border border-indigo-300 dark:border-indigo-800">
                        <div className="w-8 h-8 rounded-full bg-[#5B6CFF] flex items-center justify-center shadow-md">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Small card mock content */}
                  <div className="w-full mt-4 space-y-1.5 px-1">
                    <div className="h-2 bg-gray-100 dark:bg-slate-900 rounded-full w-4/5 mx-auto" />
                    <div className="h-1.5 bg-gray-50 dark:bg-slate-900/60 rounded-full w-2/3 mx-auto" />
                    <div className="h-1.5 bg-gray-50 dark:bg-slate-900/60 rounded-full w-1/2 mx-auto" />
                  </div>
                </div>

                {/* Bottom line button */}
                <div className="w-[35px] h-[4px] bg-slate-300 dark:bg-slate-800 rounded-full mx-auto shrink-0 mt-3" />
              </motion.div>

              {/* Back ambient shapes */}
              <div className="absolute w-44 h-44 rounded-full bg-[#5B6CFF]/10 filter blur-3xl" />
            </div>

            {/* Right Column: Quét để dùng thử floating CARD */}
            <div className="w-full lg:w-auto relative z-10 shrink-0">
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-white/95 dark:bg-slate-900/95 border border-[#E5E7EB] dark:border-slate-800 p-6 rounded-2xl shadow-xl w-full sm:w-[280px] text-left mx-auto relative group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#5B6CFF] uppercase tracking-wide">
                    <Smartphone className="w-4 h-4" />
                    <span>{t.scanTitle}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed font-sans">
                    {t.scanDesc}
                  </p>

                  {/* QR SVG Design with nest SSI logo */}
                  <div className="w-44 h-44 p-3 bg-white border border-gray-100 dark:border-slate-800 rounded-xl mx-auto flex items-center justify-center relative mt-1.5 shadow-sm group-hover:scale-102 transition-transform duration-300">
                    <svg className="w-full h-full text-gray-900" viewBox="0 0 100 100" fill="currentColor">
                      {/* Quiet Zone Grid simulated */}
                      <path d="M5,5 h25 v5 h-20 v20 h-5 z M5,95 h25 v-5 h-20 v-20 h-5 z M95,5 h-25 v5 h-20 v20 h5 z M95,95 h-25 v-5 h-20 v-20 h5 z" className="text-[#5B6CFF]" />
                      
                      {/* Top Left Finder Pattern */}
                      <path d="M10,10 h20 v20 h-20 z M14,14 h12 v12 h-12 z M18,18 h4 v4 h-4 z" />
                      
                      {/* Top Right Finder Pattern */}
                      <path d="M70,10 h20 v20 h-20 z M74,14 h12 v12 h-12 z M78,18 h4 v4 h-4 z" />
                      
                      {/* Bottom Left Finder Pattern */}
                      <path d="M10,70 h20 v20 h-20 z M14,74 h12 v12 h-12 z M18,78 h4 v4 h-4 z" />
                      
                      {/* Grid Data block details inside QR */}
                      <g className="text-gray-900/85">
                        <rect x="36" y="10" width="4" height="4" />
                        <rect x="44" y="10" width="8" height="4" />
                        <rect x="56" y="12" width="4" height="8" />
                        <rect x="36" y="24" width="12" height="4" />
                        <rect x="52" y="20" width="4" height="4" />
                        
                        <rect x="10" y="36" width="4" height="12" />
                        <rect x="20" y="36" width="8" height="4" />
                        <rect x="18" y="44" width="4" height="8" />
                        <rect x="26" y="48" width="4" height="4" />
                        
                        <rect x="36" y="36" width="8" height="8" />
                        <rect x="48" y="38" width="12" height="4" />
                        <rect x="36" y="48" width="4" height="8" />
                        
                        <rect x="70" y="36" width="12" height="4" />
                        <rect x="86" y="36" width="4" height="12" />
                        <rect x="74" y="44" width="8" height="8" />
                        
                        <rect x="36" y="70" width="4" height="12" />
                        <rect x="44" y="74" width="12" height="4" />
                        <rect x="52" y="80" width="8" height="8" />
                        <rect x="36" y="86" width="8" height="4" />
                        
                        <rect x="70" y="70" width="8" height="4" />
                        <rect x="82" y="74" width="8" height="8" />
                        <rect x="70" y="82" width="4" height="8" />
                        <rect x="86" y="86" width="4" height="4" />
                      </g>

                      {/* Floating SSI Wallet tiny logo card in center of QR */}
                      <rect x="40" y="40" width="20" height="20" rx="4" fill="white" className="stroke-indigo-100" strokeWidth="1" />
                      <g transform="translate(46, 46) scale(0.35)" className="text-[#5B6CFF]">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    </svg>

                    {/* Scanning guide animation overlay */}
                    <div className="absolute left-0 right-0 h-0.5 bg-[#5B6CFF] shadow-[0_0_8px_#5B6CFF] pointer-events-none" style={{ animation: "scan-move 3s linear infinite", top: "20%" }} />
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SPLIT SECTION: FAQS & NEWSLETTER */}
      <section id="faq-newsletter" className="py-16 px-6 lg:px-12 border-t border-gray-100 dark:border-slate-900 bg-white dark:bg-[#0B0F1A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: FAQs */}
          <div className="text-left flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1F2937] dark:text-white mb-8 tracking-tight">
                {t.faqHeader}
              </h2>

              <div className="space-y-4">
                {primaryFaqs.map((faq, idx) => (
                  <div 
                    key={`faq-primary-${idx}`}
                    className="border-b border-gray-100 dark:border-slate-900 pb-4"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between text-[#1F2937] dark:text-white hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] font-bold text-[15px] sm:text-[16px] text-left py-2 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {activeFaq === idx ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {activeFaq === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed pt-2 font-normal">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Additional Expandable FAQs */}
                <AnimatePresence>
                  {showAllFaqs && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      {secondaryFaqs.map((faq, idx) => {
                        const actualIdx = idx + primaryFaqs.length;
                        return (
                          <div 
                            key={`faq-sec-${actualIdx}`}
                            className="border-b border-gray-100 dark:border-slate-900 pb-4"
                          >
                            <button
                              onClick={() => toggleFaq(actualIdx)}
                              className="w-full flex items-center justify-between text-[#1F2937] dark:text-white hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] font-bold text-[15px] sm:text-[16px] text-left py-2 transition-colors cursor-pointer"
                            >
                              <span>{faq.q}</span>
                              {activeFaq === actualIdx ? (
                                <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                              )}
                            </button>

                            <AnimatePresence initial={false}>
                              {activeFaq === actualIdx && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed pt-2 font-normal">
                                    {faq.a}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => onNavigate?.('faq')}
                className="inline-flex items-center gap-1.5 text-xs.5 font-bold text-[#4F46E5] dark:text-[#818CF8] hover:underline cursor-pointer bg-transparent border-none p-0"
              >
                <span>
                  {isVi ? "Xem thêm câu hỏi thường gặp →" : "View more FAQ →"}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Newsletter Subscription */}
          <div className="text-left flex flex-col justify-center">
            <div className="p-8 rounded-3xl bg-slate-50/50 dark:bg-slate-900/10 border border-[#E5E7EB] dark:border-slate-800 relative overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] dark:text-white mb-3 tracking-tight">
                {t.newsletterHeader}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                {t.newsletterDesc}
              </p>

              {isSubscribed ? (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 animate-pulse" />
                  <span>{t.newsletterSuccess}</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      required
                      className="w-full px-5 py-3.5 rounded-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-sm.5 text-[#1F2937] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B6CFF]/25 shadow-sm"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-[#5B6CFF] hover:bg-[#4A5AF0] text-white font-bold text-xs.5 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
                  >
                    {t.subscribeBtn}
                  </motion.button>
                </form>
              )}

              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-4 font-medium font-sans">
                {t.privacyDisclaimer}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE DESIGNED BRAND FOOTER */}
      <footer className="pt-16 pb-0 px-6 lg:px-12 bg-white dark:bg-[#0B0F1A] border-t border-gray-100 dark:border-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          {/* Master columns layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 pb-16">
            
            {/* Column 1: Brand details card */}
            <div className="sm:col-span-2 md:col-span-4 lg:col-span-4 text-left flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BrandLogo className="h-9 w-9" />
                  <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">
                    Identra
                  </span>
                </div>
                
                <p className="text-xs.5 text-gray-400 dark:text-slate-400 leading-relaxed font-semibold max-w-xs mb-1 font-sans">
                  {t.brandTagline}
                </p>
              </div>

              {/* Social Round Link Circles */}
              <div className="flex gap-2.5">
                {[
                  { icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label: "X" },
                  { icon: <Github className="w-4 h-4" />, label: "GitHub" },
                  { icon: <MessageSquare className="w-4 h-4" />, label: "Discord" },
                  { icon: <Send className="w-4 h-4" />, label: "Telegram" },
                  { icon: <BookOpen className="w-4 h-4" />, label: "Medium" }
                ].map((item, idx) => (
                  <motion.a
                    key={`social-icon-${idx}`}
                    whileHover={{ scale: 1.15, translateY: -2 }}
                    href="#social"
                    title={item.label}
                    className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-gray-400 hover:text-[#5B6CFF] hover:bg-[#5B6CFF]/8 flex items-center justify-center transition-all shadow-sm cursor-pointer"
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>

            </div>

            {/* Column 2: Products */}
            <div className="sm:col-span-1 md:col-span-1 lg:col-span-2 text-left">
              <h4 className="text-[12px] font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">
                {t.productsHeader}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href={getPathForPage('features')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('features');
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-all duration-200 hover:translate-x-0.5 inline-block leading-relaxed cursor-pointer"
                  >
                    {t.footerLinks.features}
                  </a>
                </li>
                <li>
                  <a 
                    href={getPathForPage('tech-glossary')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('tech-glossary');
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-all duration-200 hover:translate-x-0.5 inline-block leading-relaxed cursor-pointer"
                  >
                    {t.footerLinks.tech}
                  </a>
                </li>
                <li>
                  <a 
                    href={getPathForPage('use-cases')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('use-cases');
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-all duration-200 hover:translate-x-0.5 inline-block leading-relaxed cursor-pointer"
                  >
                    {t.footerLinks.useCases}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="sm:col-span-1 md:col-span-1 lg:col-span-2 text-left">
              <h4 className="text-[12px] font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">
                {t.companyHeader}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href={getPathForPage('about')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('about');
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-all duration-200 hover:translate-x-0.5 inline-block leading-relaxed cursor-pointer"
                  >
                    {t.footerLinks.about}
                  </a>
                </li>
                <li>
                  <a 
                    href={getPathForPage('blog')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('blog');
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-all duration-200 hover:translate-x-0.5 inline-block leading-relaxed cursor-pointer"
                  >
                    {t.footerLinks.blog}
                  </a>
                </li>
                <li>
                  <a 
                    href={getPathForPage('careers')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('careers');
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-all duration-200 hover:translate-x-0.5 inline-block leading-relaxed cursor-pointer"
                  >
                    {t.footerLinks.careers}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div className="sm:col-span-1 md:col-span-1 lg:col-span-2 text-left">
              <h4 className="text-[12px] font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">
                {t.resourcesHeader}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href={getPathForPage('docs')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('docs');
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-all duration-200 hover:translate-x-0.5 inline-block leading-relaxed cursor-pointer"
                  >
                    {t.footerLinks.documents}
                  </a>
                </li>
                <li>
                  <a 
                    href={getPathForPage('guides')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('guides');
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-all duration-200 hover:translate-x-0.5 inline-block leading-relaxed cursor-pointer"
                  >
                    {t.footerLinks.guides}
                  </a>
                </li>
                <li>
                  <a 
                    href={getPathForPage('faq')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('faq');
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-all duration-200 hover:translate-x-0.5 inline-block leading-relaxed cursor-pointer"
                  >
                    {t.footerLinks.faq}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: Legals */}
            <div className="sm:col-span-1 md:col-span-1 lg:col-span-2 text-left">
              <h4 className="text-[12px] font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">
                {t.legalHeader}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href={getPathForPage('privacy')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('privacy');
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-all duration-200 hover:translate-x-0.5 inline-block leading-relaxed cursor-pointer"
                  >
                    {t.footerLinks.privacy}
                  </a>
                </li>
                <li>
                  <a 
                    href={getPathForPage('terms')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('terms');
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-all duration-200 hover:translate-x-0.5 inline-block leading-relaxed cursor-pointer"
                  >
                    {t.footerLinks.terms}
                  </a>
                </li>
                <li>
                  <a 
                    href={getPathForPage('cookies')}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('cookies');
                    }}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-all duration-200 hover:translate-x-0.5 inline-block leading-relaxed cursor-pointer"
                  >
                    {t.footerLinks.cookies}
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright signature */}
          <div 
            style={{ paddingTop: '15px', paddingBottom: '15px' }} 
            className="border-t border-gray-100 dark:border-slate-900 text-center flex flex-col items-center justify-center gap-1"
          >
            <span className="text-xs.5 text-gray-400 dark:text-slate-500 font-medium">
              © 2024 SSI Wallet. All rights reserved.
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
