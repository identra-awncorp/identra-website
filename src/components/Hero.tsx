import { motion } from 'motion/react';
import { ShieldCheck, Wallet, ArrowRight, Sparkles, CheckCircle2, ShieldAlert, Download } from 'lucide-react';
import backgroundImg from '../assets/images/topographic_bg_1779720247826.png';
import heroImg from '../assets/images/hero_wallet_mockup_1779843752812.png';

interface HeroProps {
  lang?: 'vi' | 'en';
  onOpenDemo: () => void;
  onOpenWallet: () => void;
}

export default function Hero({ lang = 'vi', onOpenDemo, onOpenWallet }: HeroProps) {
  // Translation table for Hero
  const t = {
    vi: {
      tagline: "Danh tính số thuộc về bạn",
      h1_1: "Bạn sở hữu.",
      h1_2: "Bạn kiểm soát.",
      h1_3: "Bạn quyết định chia sẻ.",
      desc: "SSI Wallet giúp bạn lưu trữ, quản lý và chia sẻ danh tính số một cách an toàn, riêng tư và không cần trung gian.",
      demoCta: "Dùng thử demo",
      downloadCta: "Tải xuống ngay",
      users: "10,000+ người dùng",
      userSub: "đã trải nghiệm thực tế công nghệ ssi",
      badgeTitle1: "MẬT MÃ BẢO MẬT",
      badgeDesc1: "Không mật khẩu, mã khóa tối tân",
      badgeTitle2: "ZERO KNOWLEDGE",
      badgeDesc2: "Ẩn thông tin nhạy cảm tối ưu",
      badgeTitle3: "TIÊU CHUẨN MỞ",
      badgeDesc3: "Theo chuẩn DID toàn cầu"
    },
    en: {
      tagline: "Your Digital Identity Belongs to You",
      h1_1: "You own it.",
      h1_2: "You control it.",
      h1_3: "You decide what to share.",
      desc: "SSI Wallet helps you store, manage, and share your digital identity securely, privately, and without intermediaries.",
      demoCta: "Try interactive demo",
      downloadCta: "Download now",
      users: "10,000+ active users",
      userSub: "have experienced SSI technology in action",
      badgeTitle1: "SECURE CRYPTO",
      badgeDesc1: "No passwords, cutting-edge keys",
      badgeTitle2: "ZERO KNOWLEDGE",
      badgeDesc2: "Exquisite identity privacy masking",
      badgeTitle3: "OPEN STANDARD",
      badgeDesc3: "Global W3C DID specification compliant"
    }
  }[lang];

  // Unsplash avatars
  const avatars = [
    { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120', alt: 'User 1' },
    { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120', alt: 'User 2' },
    { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120', alt: 'User 3' },
    { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120', alt: 'User 4' },
  ];

  return (
    <section id="hero" className="relative min-h-[calc(100vh-76px)] pt-24 pb-12 px-6 lg:px-12 flex items-center overflow-hidden bg-[#F7F8FC] dark:bg-[#0B0F1A] transition-colors duration-300">
      
      {/* Topographic Background Image Cover with soft opacity in light/dark mode */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden opacity-25 dark:opacity-45 mix-blend-multiply dark:mix-blend-overlay">
        <img 
          src={backgroundImg} 
          alt="Topographic Line Pattern" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Elegant, minimalist background gradients to keep it extremely clean without background images */}
      <div className="absolute top-0 right-0 w-[50%] h-[100%] pointer-events-none overflow-hidden select-none z-1">
        {/* Soft, beautiful radial glow on the right representing secure clouds */}
        <div className="absolute top-[20%] right-[10%] w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#5B6CFF]/10 to-[#8F9BFF]/5 blur-[120px] dark:from-[#5B6CFF]/8 dark:to-[#3b82f6]/5" />
        <div className="absolute bottom-[10%] right-[30%] w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-sky-400/8 to-blue-500/5 blur-[90px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left column: High-fidelity content */}
        <div className="col-span-1 lg:col-span-6 flex flex-col items-start text-left max-w-2xl lg:max-w-3xl pr-0 lg:pr-4">
          
          {/* Tagline Badge Capsule */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-[#5B6CFF]/15 bg-[#EEF0FF] dark:bg-[#5B6CFF]/10 text-[#5B6CFF] dark:text-[#7C8CFF] mb-6 shadow-sm shadow-[#5B6CFF]/5"
          >
            <ShieldCheck className="w-4 h-4 text-[#5B6CFF] dark:text-[#7C8CFF]" strokeWidth={2.5} />
            <span className="text-[14px] font-semibold tracking-wide font-sans">
              {t.tagline}
            </span>
          </motion.div>

          {/* Majestic Bold Typography Heading matching the mockup */}
          <div className="space-y-1.5 md:space-y-3 mb-6">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] text-[#0F172A] dark:text-white"
            >
              {t.h1_1}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] text-[#0F172A] dark:text-white"
            >
              {t.h1_2}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12] bg-gradient-to-r from-[#5B6CFF] to-[#3B82F6] bg-clip-text text-transparent transform origin-left"
            >
              {t.h1_3}
            </motion.h1>
          </div>

          {/* Subtitle description with high readability */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[15.5px] sm:text-[17px] leading-relaxed text-gray-500 dark:text-gray-400 font-normal mb-8 max-w-[580px]"
          >
            {t.desc}
          </motion.p>

          {/* Dual Action CTA Buttons matched exactly to styling of mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10.5"
          >
            {/* Primary Blue Gradient button with Arrow icon */}
            <motion.button
              whileHover={{ scale: 1.03, shadow: '0 10px 25px rgba(91,108,255,0.25)' }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenDemo}
              id="hero-primary-cta"
              className="flex items-center justify-center gap-2 px-7.5 py-3.5 text-[15px] font-bold text-white rounded-full bg-gradient-to-r from-[#5B6CFF] to-[#3B82F6] hover:from-[#4D5FEA] hover:to-blue-500 shadow-lg shadow-[#5B6CFF]/15 cursor-pointer group transition-all"
            >
              {t.demoCta}
              <ArrowRight className="w-4.5 h-4.5 transform group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </motion.button>

            {/* Secondary button with Download icon */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenWallet}
              id="hero-secondary-cta"
              className="flex items-center justify-center gap-2.5 px-7.5 py-3.5 text-[15px] font-bold text-gray-800 dark:text-white rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-[#334155] hover:bg-gray-50 dark:hover:bg-slate-800 shadow-sm cursor-pointer transition-all"
            >
              {t.downloadCta}
              <Download className="w-4.5 h-4.5 text-gray-500 dark:text-gray-400" />
            </motion.button>
          </motion.div>

          {/* Social Proof: Stacked Overlap avatars and count text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-3.5"
          >
            <div className="flex -space-x-3 overflow-hidden">
              {avatars.map((avatar, idx) => (
                <div key={idx} className="avatar-overlap relative inline-block">
                  <img
                    className="inline-block h-10 w-10 sm:h-11 sm:w-11 rounded-full ring-2 ring-white dark:ring-[#0B0F1A] object-cover"
                    src={avatar.src}
                    alt={avatar.alt}
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle active outline dots */}
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-[#22C55E] ring-2 ring-white dark:ring-[#0B0F1A]" />
                </div>
              ))}
            </div>

            <div className="text-left py-1">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                {t.users}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium font-sans">
                {t.userSub}
              </p>
            </div>
          </motion.div>

        </div>

        {/* Right column: Large Image with floating animation, hidden on mobile */}
        <div className="col-span-1 lg:col-span-6 hidden lg:flex items-center justify-center select-none w-full h-full">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [-12, 12, -12] 
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeOut" },
              scale: { duration: 1.5, ease: "easeOut" },
              y: {
                repeat: Infinity,
                duration: 7,
                ease: "easeInOut"
              }
            }}
            className="w-full h-full relative flex justify-center items-center"
          >
            <img
              id="hero-img"
              src={heroImg}
              alt="SSI Wallet Mockup on Smartphone"
              referrerPolicy="no-referrer"
              className="w-[750px] max-w-none h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.18)] select-none pointer-events-none"
            />
          </motion.div>
        </div>

      </div>

    </section>
  );
}

