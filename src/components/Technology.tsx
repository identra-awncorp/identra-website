import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, FileCheck, Landmark, ShieldAlert, Cpu, ArrowRight, ChevronDown, ChevronUp, FileCode, CheckCircle, Fingerprint, Lock } from 'lucide-react';

interface TechnologyProps {
  lang?: 'vi' | 'en';
  onSeeMore: () => void;
}

export default function Technology({ lang = 'vi', onSeeMore }: TechnologyProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showTechDetails, setShowTechDetails] = useState<boolean>(false);

  const isVi = lang === 'vi';

  const t = {
    vi: {
      badge: "Công nghệ lõi phi tập trung",
      title: "Mô hình tin cậy Tam giác SSI (SSI Trust Triangle)",
      desc: "Mô hình hoạt động dựa trên tiêu chuẩn kiến trúc định danh quốc tế từ W3C. Thay vì liên hệ trực tiếp máy chủ trung tâm để kiểm chứng dữ liệu nhạy cảm, bên đối soát chỉ cần giải mã chữ ký mật mã hóa đã lưu công khai.",
      subTitle: "Dòng luồng thực thi đang kích hoạt",
      actorLabel: "Thực thể chịu trách nhiệm:",
      flow1: "1. Phát hành",
      flow2: "2. Nhận & Giữ",
      flow3: "3. Chứng thực",
      noteTitle: "Lưu ý:",
      noteDesc: "Khác với các hệ thống tập trung (Centralized OIDC) khác như Đăng nhập bằng Google hay Facebook, SSI Trust Triangle không chia sẻ khóa liên kết hay dữ liệu nhật ký phân phối của bạn cho máy chủ trung tâm.",
      readMore: "Xem thêm chi tiết kỹ thuật",
      didDesc: "Mã xác nhận độc bản không tập trung, phân cấp trên hạ tầng lưu trữ bảo đảm quyền làm chủ tên định vị.",
      vcDesc: "Chứng chỉ dữ liệu số hóa có chữ ký bảo chứng từ các tổ chức chính quy, chống giả mạo hay bóp méo nội dung.",
      vpDesc: "Tập hợp các thuộc tính cá nhân trích từ VC được bạn tự ký bằng khóa bí mật riêng của ví di động để trình duyệt.",
      zkpDesc: "Mật mã toán học cấp cao giúp xác minh điều kiện đúng (Ví dụ: >18 tuổi) nhưng không tiết lộ số liệu thật ra ngoài.",
    },
    en: {
      badge: "Decentralized Core Technology",
      title: "SSI Trust Triangle Credential Model",
      desc: "An elegant framework based on W3C global standards. Instead of contacting risky centralized databases to match identities, verifying parties directly decrypt cryptographically bound payloads securely and instantly.",
      subTitle: "Current Active Execution Flow Segment",
      actorLabel: "Responsible Actor Entity:",
      flow1: "1. Distribute",
      flow2: "2. Accumulate",
      flow3: "3. Validate",
      noteTitle: "Important Notice:",
      noteDesc: "Unlike centralized auth systems (OIDC) like logging in with Google or Facebook, the Peer SSI Trust Triangle does not disclose session tracking, login histories, or physical logs to central entities.",
      readMore: "Request detailed specification review",
      didDesc: "Decentralized identity records storing fully decentralized, cryptographic address pointers without central directories.",
      vcDesc: "Digital records mirroring state-validated credential models. Every VC contains a secure, cryptographically bound signature payload.",
      vpDesc: "Spatially compact Verifiable Presentations extremely optimized for efficient QR scans or physical NFC transmissions.",
      zkpDesc: "Prove a specific criterion (e.g. older than 18) without releasing raw underlying private values.",
    }
  }[lang];

  const steps = [
    {
      title: isVi ? "1. Tổ chức cấp phát (Issuer)" : "1. Issuing Entity (Issuer)",
      actor: isVi ? "Trường học, Cơ quan Công an, Ngân hàng" : "Universities, Government Registries, Banks",
      action: isVi 
        ? "Ký số vào dữ liệu căn cước hoặc văn bằng của bạn bằng Khóa bảo mật riêng của họ, cung cấp cho bạn dưới dạng Verifiable Credential (VC)."
        : "Maintains unique master keys to digitally sign credentials (identity profiles, certificates, degrees) so that you hold verified data blocks.",
      icon: <Landmark className="w-5 h-5 text-indigo-500" />
    },
    {
      title: isVi ? "2. Chủ sở hữu lưu giữ (Holder / Bạn)" : "2. Secure Storage (Holder / You)",
      actor: isVi ? "Ví SSI Wallet trên điện thoại của bạn" : "SSI Wallet secure enclave on your device",
      action: isVi 
        ? "Lưu trữ VC an toàn trên bộ nhớ thiết bị. Khi cần chuẩn hóa, bạn chọn thông tin hiển thị và tự ký số xác minh để sinh ra Verifiable Presentation (VP)."
        : "Maintains files intact within fully local sandboxed edge storage. You customize reveal limits, then self-sign vectors to yield Verifiable Presentations (VP).",
      icon: <Cpu className="w-5 h-5 text-[#5B6CFF]" />
    },
    {
      title: isVi ? "3. Đơn vị kiểm duyệt (Verifier)" : "3. Verifying Entity (Verifier)",
      actor: isVi ? "Sân bay, Nhà tuyển dụng, Cổng dịch vụ trực tuyến" : "Airports, Remote Employers, Online Portals",
      action: isVi 
        ? "Đọc mã QR mã hóa từ bạn, đối chiếu chữ ký số gốc từ Blockchain/Hệ thống tin cậy để thẩm định độ xác thực lập tức mà không cần lưu giữ thông tin gốc của bạn."
        : "Reads incoming VP scans. Queries verifiable decentralized trust registries to check signature authenticity in sub-second speed without storage.",
      icon: <FileCheck className="w-5 h-5 text-emerald-500" />
    }
  ];

  return (
    <section id="technology" className="py-24 px-6 lg:px-12 bg-[#F7F8FC] dark:bg-[#080B13] transition-colors duration-300 relative z-10 border-t border-[#E5E7EB] dark:border-[#1F2937]">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block - Text Content */}
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] block mb-2">{t.badge}</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1F2937] dark:text-white tracking-tight leading-tight">
              {t.title}
            </h2>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm sm:text-base mt-4 leading-relaxed">
              {t.desc}
            </p>

            <div className="mt-8 space-y-3">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-4 ${
                    activeStep === idx 
                      ? 'bg-white dark:bg-slate-900 border-[#5B6CFF] dark:border-[#7C8CFF] shadow-md shadow-[#5B6CFF]/5' 
                      : 'bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-slate-800/10'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${activeStep === idx ? 'bg-[#5B6CFF]/10' : 'bg-gray-200/50 dark:bg-slate-800'}`}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${activeStep === idx ? 'text-[#5B6CFF] dark:text-[#7C8CFF]' : 'text-gray-800 dark:text-gray-300'}`}>
                      {step.title}
                    </h4>
                    <span className="block text-[11px] text-gray-400 font-medium mt-0.5">{step.actor}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Block - Dynamic Concept Visualiser Card */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl md:rounded-3xl bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] shadow-xl relative min-h-[440px] flex flex-col justify-between">
              
              {/* Header decorative controls */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-5 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-[11px] font-mono text-gray-400 ml-2">trust_scheme_simulator.json</span>
                </div>
                <span className="text-[10px] font-bold text-[#5B6CFF] bg-[#5B6CFF]/10 p-1 px-2.5 rounded-full uppercase tracking-wider">SSI Layer-3 Protocol</span>
              </div>

              {/* Dynamic visualization animation container */}
              <div className="flex-1 flex flex-col justify-center items-center py-4 relative">
                
                {/* Simulated cryptographic lines layout */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <Network className="w-80 h-80 text-[#5B6CFF]" />
                </div>

                <div className="w-full max-w-md bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-gray-150 dark:border-slate-900/60 shadow-inner text-left">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    {t.subTitle}
                  </span>

                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 font-sans">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                    {steps[activeStep].action}
                  </p>

                  <div className="pt-3 border-t border-gray-200/50 dark:border-slate-800/60 flex items-center justify-between text-[11px]">
                    <span className="text-gray-400 font-medium">{t.actorLabel}</span>
                    <strong className="text-gray-700 dark:text-gray-300 font-mono text-right">{steps[activeStep].actor}</strong>
                  </div>
                </div>

                {/* Animated connectors */}
                <div className="flex gap-4 mt-8 items-center text-xs text-gray-400 font-medium scale-95 md:scale-100">
                  <span className={`p-1.5 px-3 rounded-lg border text-xs ${activeStep === 0 ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/40' : 'bg-transparent border-gray-200 dark:border-slate-800'}`}>{t.flow1}</span>
                  <ArrowRight className="w-4 h-4 text-gray-300 animate-pulse" />
                  <span className={`p-1.5 px-3 rounded-lg border text-xs ${activeStep === 1 ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/40' : 'bg-transparent border-gray-200 dark:border-slate-800'}`}>{t.flow2}</span>
                  <ArrowRight className="w-4 h-4 text-gray-300 animate-pulse" />
                  <span className={`p-1.5 px-3 rounded-lg border text-xs ${activeStep === 2 ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40' : 'bg-transparent border-gray-200 dark:border-slate-800'}`}>{t.flow3}</span>
                </div>

              </div>

              {/* Informative alert bottom info */}
              <div className="mt-6 p-4.5 rounded-xl bg-orange-50 dark:bg-orange-950/10 border border-orange-100 dark:border-orange-900/30 text-xs text-orange-700 dark:text-orange-400 flex items-start gap-2.5 text-left leading-normal">
                <ShieldAlert className="w-4.5 h-4.5 shrink-0 text-orange-600 dark:text-orange-400 mt-0.5" />
                <span>
                  <strong>{t.noteTitle}</strong> {t.noteDesc}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Technical expansion glossary details */}
        <AnimatePresence>
          {showTechDetails && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: "auto" }}
              exit={{ opacity: 0, scale: 0.98, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-12 overflow-hidden"
            >
              <div className="p-8 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-left grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <h4 className="text-xs font-black text-indigo-500 font-mono uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <Fingerprint className="w-4 h-4" /> DIDs
                  </h4>
                  <h5 className="font-bold text-sm text-gray-800 dark:text-white mb-1">Decentralized Identifiers</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {t.didDesc}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#5B6CFF] font-mono uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <FileCode className="w-4 h-4" /> VCs
                  </h4>
                  <h5 className="font-bold text-sm text-gray-800 dark:text-white mb-1">Verifiable Credentials</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {t.vcDesc}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-emerald-500 font-mono uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <CheckCircle className="w-4 h-4" /> VPs
                  </h4>
                  <h5 className="font-bold text-sm text-gray-800 dark:text-white mb-1">Verifiable Presentations</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {t.vpDesc}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-amber-500 font-mono uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <Lock className="w-4 h-4" /> zk-SNARKs
                  </h4>
                  <h5 className="font-bold text-sm text-gray-800 dark:text-white mb-1">Zero-Knowledge Proofs</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {t.zkpDesc}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic see details or redirect */}
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSeeMore}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#5B6CFF] hover:bg-[#4A5AF0] text-white font-bold text-xs.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>{t.readMore}</span>
            <ArrowRight className="w-4 h-4 text-white animate-pulse" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
