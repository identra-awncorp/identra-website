import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Phone, 
  Mail, 
  Send, 
  MapPin, 
  Clock,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface FloatingContactProps {
  lang?: 'vi' | 'en';
}

export default function FloatingContact({ lang = 'vi' }: FloatingContactProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: number; sender: 'user' | 'agent'; text: string; time: string }>>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Close when user clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Set default initial greeting when chat becomes active
  useEffect(() => {
    if (isChatActive && messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: 'agent',
          text: lang === 'vi'
            ? "Xin chào! Trợ lý hỗ trợ SSI Wallet có thể giúp gì cho bạn hôm nay?"
            : "Hello! How can the SSI Wallet technical assistant help you today?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [isChatActive, lang]);

  // Smooth scroll to bottom on new messages
  useEffect(() => {
    if (isChatActive) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [messages, isTyping, isChatActive]);

  const contactMethods = [
    {
      icon: <MessageSquare className="w-4 h-4 text-[#5B6CFF]" />,
      label: lang === 'vi' ? "Trò chuyện trực tiếp" : "Live Chat Support",
      value: lang === 'vi' ? "SSI Assistant (Phản hồi tức thì)" : "SSI Assistant (Instant Reply)",
      href: "#live-chat",
      description: lang === 'vi' ? "Hỏi đáp nhanh về giải pháp và demo tích hợp" : "Quick answers about solutions and integrations",
      isChat: true
    },
    {
      icon: <Phone className="w-4 h-4 text-emerald-500" />,
      label: lang === 'vi' ? "Hotline đối tác" : "Partner Hotline",
      value: "1900 5454 71",
      href: "tel:1900545471",
      description: lang === 'vi' ? "Hỗ trợ 24/7 kỹ thuật & tích hợp" : "24/7 Technical & Integration Support"
    },
    {
      icon: <Mail className="w-4 h-4 text-blue-500" />,
      label: lang === 'vi' ? "Email hỗ trợ" : "Support Email",
      value: "support@ssi-sandbox.vn",
      href: "mailto:support@ssi-sandbox.vn",
      description: lang === 'vi' ? "Phản hồi trong vòng 2 giờ làm việc" : "Reply within 2 business hours"
    },
    {
      icon: <Send className="w-4 h-4 text-sky-500" />,
      label: lang === 'vi' ? "Cộng đồng Telegram" : "Telegram Community",
      value: "t.me/ssi_sandbox_dev",
      href: "https://t.me",
      description: lang === 'vi' ? "Hơn 1,200+ nhà phát triển SSI" : "More than 1,200+ SSI developers"
    },
    {
      icon: <MapPin className="w-4 h-4 text-rose-500" />,
      label: lang === 'vi' ? "Trụ sở chính" : "Headquarters",
      value: lang === 'vi' ? "72 Nguyễn Huệ, Quận 1, TP. HCM" : "72 Nguyen Hue, District 1, HCMC, Vietnam",
      href: "https://maps.google.com",
      description: lang === 'vi' ? "Trung tâm phát triển Công nghệ Số" : "Digital Technology Development Center"
    }
  ];

  const getSimulatedResponse = (text: string): string => {
    const input = text.toLowerCase().trim();
    if (lang === 'vi') {
      if (input.includes('demo') || input.includes('chạy thử') || input.includes('trải nghiệm') || input.includes('thử nghiệm')) {
        return "Để trải nghiệm SSI Wallet, bạn hãy nhấn nút 'Thử Demo Chạy thực tế' ở phía trên thanh menu điều hướng. Tại đó bạn có thể tự mình phát hành và định danh CCCD Số / Chứng chỉ số!";
      }
      if (input.includes('sdk') || input.includes('tích hợp') || input.includes('lập trình') || input.includes('api') || input.includes('code')) {
        return "Bạn hoàn toàn có thể lấy tài liệu SDK trực tiếp tại phần 'Cổng nhà phát triển' ở cuối popup liên hệ này để xem chi tiết cách viết mã nguồn và tích hợp.";
      }
      if (input.includes('bảo mật') || input.includes('an toàn') || input.includes('khoá') || input.includes('private') || input.includes('key')) {
        return "SSI Wallet bảo mật khoá Private Key cục bộ hoàn toàn trên thiết bị của người dùng (Secure Enclave / Keystore), kết hợp giao thức Zero-Knowledge Proofs (ZKP) để bảo vệ danh tính tối đa.";
      }
      if (input.includes('phí') || input.includes('giá') || input.includes('tiền') || input.includes('cost')) {
        return "Nền tảng SSI Wallet Sandbox được cung cấp 100% MIỄN PHÍ phục vụ công việc nghiên cứu, thử nghiệm ý tưởng (PoC) và tích hợp hệ thống.";
      }
      if (input.includes('cccd') || input.includes('định danh') || input.includes('vc') || input.includes('did')) {
        return "Hệ thống hỗ trợ chuẩn W3C DID (Decentralized Identifier) và Verifiable Credentials (VC). Chức năng này cho phép xác thực phi trung gian không cần tiết lộ lộ lọt dữ liệu gốc bừa bãi.";
      }
      if (input.includes('chào') || input.includes('hello') || input.includes('hi')) {
        return "Xin chào! Rất vui được gặp bạn. Tôi có thể hỗ trợ gì cho bạn về các câu hỏi kỹ thuật, tài liệu SDK hay chạy thử quy trình demo?";
      }
      return "Cảm ơn bạn đã phản hồi! Hệ thống SSI Wallet Sandbox cung cấp khả năng phát hành và xác minh danh tính mã hoá chuẩn W3C DID/VC. Bạn có muốn hỗ trợ thêm thông tin về demo hay tài liệu không?";
    } else {
      if (input.includes('demo') || input.includes('try') || input.includes('test') || input.includes('experience')) {
        return "To experience the SSI Wallet, please look at the top menu and click 'Try Live Demo'. This allows you to experience Verifiable Credentials issuance and verification instantly.";
      }
      if (input.includes('sdk') || input.includes('integrate') || input.includes('code') || input.includes('api') || input.includes('doc')) {
        return "You can read the full SDK docs on the 'Developer Portal' listed at the bottom of the contact method sheet.";
      }
      if (input.includes('secure') || input.includes('security') || input.includes('key') || input.includes('private')) {
        return "SSI Wallet secures your private keys locally using mobile device hardware enclaves (Secure Enclave / Keystore). No third party ever has access to your credentials.";
      }
      if (input.includes('fee') || input.includes('price') || input.includes('cost') || input.includes('free')) {
        return "The SSI Wallet Sandbox is completely FREE for testing, Proof-of-Concept prototypes, and academic research purposes.";
      }
      if (input.includes('did') || input.includes('credential') || input.includes('vc') || input.includes('standards')) {
        return "We strictly adhere to W3C Decentralized Identifiers (DID) and Verifiable Credentials (VC) specifications including decentralized Zero-Knowledge Cryptography.";
      }
      if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
        return "Hello there! Glad to assist you. How can I help you with SSI specifications, API integrations, or sandbox trials?";
      }
      return "Thank you for reaching out! SSI Wallet Sandbox features strong, cryptographic identity structures complying with W3C standards. Are there any other topics like SDK guides or Demo help you'd like to ask?";
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsgText = inputText;
    setInputText('');

    const userMsg = {
      id: Date.now(),
      sender: 'user' as const,
      text: userMsgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate agent response with typing delay
    setTimeout(() => {
      const responseText = getSimulatedResponse(userMsgText);
      const agentMsg = {
        id: Date.now() + 1,
        sender: 'agent' as const,
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-40 font-sans text-left">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 40, y: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, x: 40, y: 40 }}
            style={{ originX: 1, originY: 1 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-[#0F172A] rounded-2xl border border-gray-150 dark:border-slate-800/80 shadow-2xl overflow-hidden p-5"
          >
            {!isChatActive ? (
              // Contact Option Menu View
              <>
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 dark:border-slate-800/80 mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#5B6CFF] dark:text-[#7C8CFF] uppercase tracking-widest block mb-0.5">SSI Support Network</span>
                    <h4 className="text-sm font-black text-gray-900 dark:text-white">
                      {lang === 'vi' ? 'Liên hệ với chúng tôi' : 'Get in Touch'}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                    <Clock className="w-3 h-3 text-emerald-500 animate-pulse" />
                    <span>Online</span>
                  </div>
                </div>

                {/* Methods list */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-0.5 scrollbar-thin">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={index}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={(e) => {
                        if (method.isChat) {
                          e.preventDefault();
                          setIsChatActive(true);
                        }
                      }}
                      whileHover={{ x: 4, backgroundColor: 'rgba(91, 108, 255, 0.04)' }}
                      className="flex items-start gap-3.5 p-2.5 rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-slate-800/60 transition-all text-left group cursor-pointer"
                    >
                      <div className="w-8.5 h-8.5 bg-gray-50 dark:bg-slate-900 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform relative">
                        {method.icon}
                        {method.isChat && (
                          <span className="absolute top-0 right-0 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold tracking-wide uppercase text-gray-400 block leading-none mb-1">
                          {method.label}
                        </span>
                        <span className="text-xs.5 font-bold text-gray-800 dark:text-white block truncate">
                          {method.value}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 block leading-normal mt-0.5">
                          {method.description}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>

                {/* Sandbox details */}
                <div className="mt-4.5 pt-3.5 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-gray-400 dark:text-gray-500">
                  <span>{lang === 'vi' ? 'Hỗ trợ kỹ thuật sandbox chuẩn W3C' : 'W3C sandbox technical support'}</span>
                  <a 
                    href="#developer-portal" 
                    className="flex items-center gap-1 font-bold text-[#5B6CFF] dark:text-[#7C8CFF] hover:underline"
                  >
                    {lang === 'vi' ? 'Cổng nhà phát triển' : 'Developer Portal'}
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </>
            ) : (
              // Chat Window Section
              <div className="flex flex-col h-[400px]">
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800/80 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <button 
                      onClick={() => setIsChatActive(false)}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-500 dark:text-gray-400 transition-colors"
                      title={lang === 'vi' ? "Quay lại" : "Back"}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-gray-900 dark:text-white">SSI Wallet AI Agent</span>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 block leading-tight">
                        {lang === 'vi' ? "Phản hồi ngay lập tức" : "Replies instantly"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono p-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md">
                    <Sparkles className="w-3 h-3" />
                    <span>AI Chat</span>
                  </div>
                </div>

                {/* Messages Panel */}
                <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 py-1 mb-3 scrollbar-thin">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                      }`}
                    >
                      <span className="text-[9px] text-gray-400 dark:text-gray-500 mb-1 px-1 font-mono">
                        {msg.sender === 'user' ? (lang === 'vi' ? 'Bạn' : 'You') : 'SSI Assistant'} • {msg.time}
                      </span>
                      <div className={`p-3 rounded-2xl text-[12.5px] leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-[#5B6CFF] text-white rounded-tr-none shadow-sm shadow-[#5B6CFF]/15' 
                          : 'bg-gray-100 dark:bg-slate-800/80 text-gray-800 dark:text-gray-200 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex flex-col items-start max-w-[85%] self-start">
                      <span className="text-[9px] text-gray-400 dark:text-gray-500 mb-1 px-1 font-mono">
                        SSI Assistant • {lang === 'vi' ? 'Đang soạn...' : 'Typing...'}
                      </span>
                      <div className="p-3.5 rounded-2xl bg-gray-100 dark:bg-slate-800/80 rounded-tl-none flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Message Input bar */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2 pt-2.5 border-t border-gray-100 dark:border-slate-800/80"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={lang === 'vi' ? "Nhập tin nhắn..." : "Type your message..."}
                    className="flex-1 px-3.5 py-2 text-xs.5 bg-gray-50 hover:bg-gray-100/50 dark:bg-slate-900 dark:hover:bg-slate-900 border border-gray-150 dark:border-slate-800/60 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#5B6CFF] focus:border-[#5B6CFF] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-2 bg-[#5B6CFF] hover:bg-[#4A5AF0] disabled:bg-gray-100 dark:disabled:bg-slate-800 disabled:text-gray-400 dark:disabled:text-gray-600 text-white rounded-xl shadow-md cursor-pointer transition-all shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.95 }}
        id="floating-contact-btn"
        className="w-13 h-13 bg-[#5B6CFF] hover:bg-[#4A5AF0] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#5B6CFF]/20 border border-[#5B6CFF]/25 cursor-pointer relative"
        title={lang === 'vi' ? "Liên hệ hỗ trợ" : "Contact Support"}
      >
        {/* Subtle glowing pulse halo around the button when inactive */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[#5B6CFF]/40 z-[-1]"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{
              opacity: 0,
              scale: 1.5,
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeOut",
            }}
          />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5.5 h-5.5" />
            </motion.div>
          ) : (
            <motion.div
              key="message-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="w-5.5 h-5.5" />
              {/* Ping notification mark */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
