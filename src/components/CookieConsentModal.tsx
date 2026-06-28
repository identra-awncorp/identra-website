import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface CookieConsentModalProps {
  lang: 'vi' | 'en';
  onNavigate: (page: string) => void;
}

export default function CookieConsentModal({ lang, onNavigate }: CookieConsentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isVi = lang === 'vi';

  useEffect(() => {
    // Check if user has already made a decision
    const checkConsent = () => {
      const consent = document.cookie.split(';').some((item) => item.trim().startsWith('cookie-consent='));
      if (!consent) {
        // Show cookie consent after a slight delay to let skeleton loader complete
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 2200);
        return () => clearTimeout(timer);
      }
    };
    checkConsent();
  }, []);

  const handleAcceptAll = () => {
    // Set cookie for 365 days
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = `cookie-consent=all; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    // Set cookie for 365 days
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = `cookie-consent=essential; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto md:max-w-[440px] z-50 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border border-[#5B6CFF]/20 dark:border-slate-800/80 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(2,4,12,0.7)] p-4 sm:p-5 text-left transition-colors duration-300 max-h-[85vh] flex flex-col overflow-hidden"
          id="cookie-consent-banner"
        >
          <div className="flex items-start gap-3 sm:gap-4 overflow-y-auto max-h-[40vh] sm:max-h-none pr-1 scrollbar-thin">
            {/* Elegant animated icon background */}
            <div className="p-2.5 sm:p-3 rounded-2xl bg-[#5B6CFF]/10 text-[#5B6CFF] dark:bg-[#5B6CFF]/15 dark:text-[#7C8CFF] shrink-0">
              <Cookie className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>

            <div className="space-y-1.5 flex-1 pr-6 min-w-0 break-words">
              <h4 className="text-xs sm:text-sm.5 font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 leading-snug">
                <span>{isVi ? "Tôn trọng sự riêng tư" : "Sovereignty & Privacy"}</span>
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B6CFF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5B6CFF]"></span>
                </span>
              </h4>
              <p className="text-[11px] sm:text-[12.5px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                {isVi 
                  ? "Identra chỉ sử dụng LocalStorage và SessionStorage cục bộ để lưu trữ trạng thái hiển thị (ngôn ngữ, giao diện sáng/tối) và bảo lưu an toàn ví SSI của bạn tuyệt đối không theo dấu hành vi hoặc quảng cáo." 
                  : "Identra only deploys local storage engines to secure display variables (language preferences, theme profiles) and host sovereign SSI wallets - completely free from tracking metrics or invasive marketing pixels."}
              </p>
            </div>

            {/* Absolute close button */}
            <button
              onClick={handleAcceptEssential}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-905 dark:hover:bg-slate-800 rounded-lg cursor-pointer outline-none border-none"
              title={isVi ? "Đóng và đồng ý tối thiểu" : "Close and accept essential"}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Links and Actions */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 shrink-0">
            <button
              onClick={() => onNavigate('cookies')}
              className="text-left text-[11px] font-black uppercase text-[#3B52FF] dark:text-[#7C8CFF] hover:underline cursor-pointer flex items-center gap-1 bg-transparent border-none outline-none py-1 w-full sm:w-auto"
            >
              <span>{isVi ? "Xem chính sách Cookie" : "Read Cookie Policy"}</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={handleAcceptEssential}
                style={{ padding: '8px 12px' }}
                className="text-[11px] font-bold text-slate-600 dark:text-slate-350 bg-slate-100/80 hover:bg-slate-200/50 dark:bg-slate-850 dark:hover:bg-slate-800 border-none rounded-xl cursor-pointer transition-all active:scale-[0.98] outline-none flex items-center justify-center w-full sm:w-auto"
              >
                {isVi ? "Bắt buộc" : "Essential only"}
              </button>
              
              <button
                onClick={handleAcceptAll}
                style={{ padding: '8px 14px' }}
                className="text-[11px] font-bold text-white bg-[#3B52FF] hover:bg-[#4A5AF0] border-none rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#3B52FF]/20 dark:shadow-[#3B52FF]/5 cursor-pointer transition-all active:scale-[0.98] outline-none w-full sm:w-auto"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-white/90" />
                <span>{isVi ? "Đồng ý tất cả" : "Accept all"}</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
