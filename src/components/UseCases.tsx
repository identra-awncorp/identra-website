import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Plane, GraduationCap, Building2, ClipboardList, CheckCircle2, ChevronDown, ChevronUp, HeartPulse, Cpu, ArrowRight } from 'lucide-react';

interface UseCasesProps {
  lang?: 'vi' | 'en';
  onSeeMore: () => void;
}

export default function UseCases({ lang = 'vi', onSeeMore }: UseCasesProps) {
  const [showMoreCases, setShowMoreCases] = useState(false);

  const isVi = lang === 'vi';

  const t = {
    vi: {
      badge: "Trường hợp sử dụng",
      heading: "Ứng dụng thực tiễn của SSI trong đời sống",
      desc: "Công nghệ danh tính tự chủ giúp bảo hộ sự riêng tư của người dân Việt Nam trên thế giới toàn cầu.",
      liveBadge: "Sống thực tế",
      compatInfo: "Hoàn toàn tương thích chuẩn ví công cộng",
      seeAllBtn: "Xem thêm trường hợp ứng dụng",
    },
    en: {
      badge: "Use Cases",
      heading: "SSI Integration Scenarios in Action",
      desc: "Self-sovereign identity architecture shields consumer data rights across high-compliance domains.",
      liveBadge: "Active live",
      compatInfo: "Fully compliant with public standard credential schemas",
      seeAllBtn: "Expose all execution use cases",
    }
  }[lang];

  const cases = [
    {
      icon: <Landmark className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Tài chính & Ngân hàng (E-KYC)" : "Financial Services & E-KYC",
      usecase: isVi ? "Đăng ký mở tài khoản ngân hàng và thẻ tín dụng tức thì." : "Instant credit lines and bank accounts onboarding.",
      how: isVi 
        ? "Bỏ qua các bước chụp khuôn mặt, bổ sung hóa đơn điện nước hay mang thẻ cứng đến chi nhánh. Gửi gói Chứng minh CCCD và Quốc tịch có chữ ký từ Cục dân cư chỉ qua QR code."
        : "Skip complex facial liveness recording, static utility bills collection, or branches waiting lines. Securely emit verified ID claims directly over QR."
    },
    {
      icon: <Plane className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Hàng không & Khách sạn" : "Aviation & Hospitality Onboarding",
      usecase: isVi ? "Thủ tục lên tàu bay tự chủ tốc độ cao." : "Frictionless self check-in gate clearance.",
      how: isVi 
        ? "Đại lộ làm thủ tục tự động quét thẻ chứng thực bay và hộ chiếu số trên thiết bị di động mà không cần đối soát hộ chiếu giấy hay nhập dữ liệu thủ công."
        : "Automated turnstiles instantly cross-reference flight claims and passport cryptos stored on-device, bypassing repetitive manual desk registrations."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Văn bằng & Tuyển dụng" : "Academic Records & Talent Hiring",
      usecase: isVi ? "Nộp hồ sơ xin việc xác minh chuẩn mực." : "Streamlined background credential checks.",
      how: isVi 
        ? "Nhà tuyển dụng xác thực hồ sơ bằng cấp đính kèm chữ ký điện tử trực tiếp từ trường Đại học ban hành mà không lo sợ học vị giả hoặc bằng cấp khống."
        : "Verify diploma credibility in sub-second times. HR departments instantly confirm educational assertions signed directly by accredited universities, eliminating diploma fraud entirely."
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Dịch vụ hành chính công" : "e-Government & Federal Portals",
      usecase: isVi ? "Xử lý thủ tục hành chính liên tuyến." : "Cross-province unified public services.",
      how: isVi 
        ? "Truyền đạt thẻ cử tri số, giấy đăng ký cư trú, hoặc giấy phép đăng ký kinh doanh được chứng thực liên bang phục vụ nộp thuế hay xin giấy phép nhanh chóng."
        : "Present municipal voting certificates, residency proofs, or taxation ID attributes in one tap, speeding up license filings without local municipal lines."
    }
  ];

  const extraCases = [
    {
      icon: <HeartPulse className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Chăm sóc Sức khỏe (E-Health)" : "Patient Portals & Medical Care (E-Health)",
      usecase: isVi ? "Lưu giữ tóm tắt hồ sơ bệnh án cá nhân bảo mật." : "Decentralized unified electronic medical histories.",
      how: isVi 
        ? "Trao đổi bảo mật tóm tắt bệnh án, kết quả kiểm tra lâm sàng và lịch sử dị ứng thuốc trực tiếp từ ví di động đến y bác sĩ điều trị mà không qua máy chủ trung gian."
        : "Keep private health summaries, clinical blood test records, and pharmaceutical registries cryptographically locked on your phone, sharing them directly to care providers via edge transport."
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Định danh Thiết bị thông minh (IoT DIDs)" : "Autonomous Edge Devices (IoT DIDs)",
      usecase: isVi ? "Mã hóa danh tính an toàn cho thiết bị tự vận hành." : "Secure identity enclaves for IoT and Smart Grid devices.",
      how: isVi 
        ? "Tự động thiết lập hạ tầng danh tính mã hóa cho xe điện (EV) hoặc ngôi nhà thông minh của bạn để tương tác chi trả phí sạc xe tự chủ không cần thẻ vật lý."
        : "Automate machine-to-machine interactions. EVs and smart meters manage unique identity enclaves, paying road fees or grids autonomously over peer-to-peer tunnels."
    }
  ];

  return (
    <section id="cases" className="py-24 px-6 lg:px-12 bg-white dark:bg-[#0B0F1A] transition-colors duration-300 relative z-10 border-t border-[#E5E7EB] dark:border-[#374151]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] block mb-2">{t.badge}</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#1F2937] dark:text-white tracking-tight leading-tight">
            {t.heading}
          </h2>
          <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm sm:text-base mt-2">
            {t.desc}
          </p>
        </div>

        {/* Use Cases grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              key={idx}
              className="p-8 rounded-2xl border border-[#E5E7EB] dark:border-[#374151] bg-[#F7F8FC] dark:bg-slate-900/10 flex flex-col justify-between text-left hover:bg-white dark:hover:bg-slate-900/40 hover:shadow-xl hover:border-[#5B6CFF]/20 dark:hover:border-[#7C8CFF]/20 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-md shadow-gray-200/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 bg-white dark:bg-slate-900 p-1 px-2.5 rounded-full uppercase border border-gray-100 dark:border-slate-800">
                    {t.liveBadge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1F2937] dark:text-white mb-1.5 tracking-tight">
                  {item.title}
                </h3>
                <span className="block text-xs font-semibold text-[#5B6CFF] dark:text-[#7C8CFF] mb-4">
                  {item.usecase}
                </span>
                
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed font-normal">
                  {item.how}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-slate-800/60 flex items-center gap-2 text-[11px] text-[#22C55E] font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{t.compatInfo}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expandable extra use cases list */}
        <AnimatePresence>
          {showMoreCases && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {extraCases.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    key={`extra-case-${idx}`}
                    className="p-8 rounded-2xl border border-[#E5E7EB] dark:border-[#374151] bg-[#F7F8FC]/60 dark:bg-slate-900/10 flex flex-col justify-between text-left hover:bg-white dark:hover:bg-slate-900/40 hover:shadow-xl hover:border-[#5B6CFF]/20 dark:hover:border-[#7C8CFF]/20 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-md shadow-gray-200/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 bg-white dark:bg-slate-900 p-1 px-2.5 rounded-full uppercase border border-gray-100 dark:border-slate-800">
                          {t.liveBadge}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#1F2937] dark:text-white mb-1.5 tracking-tight">
                        {item.title}
                      </h3>
                      <span className="block text-xs font-semibold text-[#5B6CFF] dark:text-[#7C8CFF] mb-4">
                        {item.usecase}
                      </span>
                      
                      <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed font-normal">
                        {item.how}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-slate-800/60 flex items-center gap-2 text-[11px] text-[#22C55E] font-medium font-sans">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{t.compatInfo}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Xem thêm Button */}
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSeeMore}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#5B6CFF] hover:bg-[#4A5AF0] text-white font-bold text-xs.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>{t.seeAllBtn}</span>
            <ArrowRight className="w-4 h-4 text-white animate-pulse" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
