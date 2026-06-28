import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ArrowUpRight, BookOpen, MessageSquare, Info, Github, UserCheck, ShieldCheck, ChevronDown, ChevronUp, Cpu, Heart, Code2, ArrowRight } from 'lucide-react';

interface ResourcesAndAboutProps {
  lang?: 'vi' | 'en';
  onSeeMoreDocs: () => void;
  onSeeMoreBlog: () => void;
  onSeeMoreAbout: () => void;
}

export default function ResourcesAndAbout({ lang = 'vi', onSeeMoreDocs, onSeeMoreBlog, onSeeMoreAbout }: ResourcesAndAboutProps) {
  const [showDocs, setShowDocs] = useState(false);
  const [showBlogs, setShowBlogs] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const isVi = lang === 'vi';

  const t = {
    vi: {
      docsBadge: "Tài liệu & Hướng dẫn",
      docsHeading: "Thư viện phát triển phát hành nhanh",
      docsDesc: "Dễ dàng tối ưu hóa và tích hợp cơ sở dữ liệu định danh của doanh nghiệp bạn vào luồng chuẩn xác minh W3C quốc tế.",
      docsSeeAllBtn: "Xem thêm tài liệu SDK",

      blogBadge: "Bản tin công nghệ",
      blogHeading: "Bài viết mới cập nhật từ phòng nghiên cứu",
      blogSeeAllLink: "Xem tất cả bài viết",
      blogSeeAllBtn: "Xem thêm bài viết từ nghiên cứu",
      readNext: "Đọc tiếp",

      aboutBadge: "Về chúng tôi",
      aboutHeading: "Kiến thiết hạ tầng niềm tin số",
      aboutDesc: "Chúng tôi là tập thể kỹ sư đam mê bảo mật dữ liệu phi tập trung, hỗ trợ người tiêu dùng cá nhân hóa tài sản định danh số quốc gia.",
      aboutSeeAllBtn: "Xem thêm về sứ mệnh của chúng tôi",

      targetTitle: "Mục tiêu tối thượng",
      targetDesc: "Đưa quyền tự quyết thông tin cá nhân về lại tay người dân. Đóng góp tiêu chuẩn bảo hộ dữ liệu tuyệt đối.",
      complianceTitle: "Tuân thủ quy chuẩn",
      complianceDesc: "Tương thích tối đa với quy định W3C Decentralized Identifiers và luật bảo mật dữ liệu định danh của chính phủ Việt Nam.",
      privacyTitle: "Mã nguồn minh bạch",
      privacyDesc: "Cam kết các thư viện ví, bộ xác thực và nhân mã hóa đều được kiểm duyệt mã nguồn của chính người sử dụng.",

      optimizeTitle: "Tối ưu hóa thiết bị",
      optimizeDesc: "Thiết kế kiến trúc mật mã tinh giản, chạy mượt mà ngay trên các dòng điện thoại thông minh giá rẻ hoặc thế hệ cũ.",
      socialTitle: "Trách nhiệm xã hội",
      socialDesc: "Mở rộng khả năng tiếp cận dịch vụ số chuẩn công cộng đến vùng sâu vùng xa một cách bình đẳng và thân thiện nhất.",
      ecosystemTitle: "Hệ sinh thái mã mở",
      ecosystemDesc: "Chia sẻ miễn phí 100% các công cụ thư viện tạo mã, ký duyệt để tiếp sức cho cộng đồng lập trình viên Việt Nam."
    },
    en: {
      docsBadge: "Documentation & SDKs",
      docsHeading: "Developer Library Quickstart Guides",
      docsDesc: "Integrate your corporate or educational directory into internationally recognized W3C secure claim verification loops with ease.",
      docsSeeAllBtn: "Request all SDK documents",

      blogBadge: "R&D Intel Updates",
      blogHeading: "Latest Insights from our Security Enclave Labs",
      blogSeeAllLink: "View all logs",
      blogSeeAllBtn: "Browse all research publications",
      readNext: "Read article",

      aboutBadge: "Corporate Mission",
      aboutHeading: "Engineering Digital Social Trust Infrastructure",
      aboutDesc: "We are a passionate collective of system engineers building secure, privacy-preserving self-sovereign identity vectors.",
      aboutSeeAllBtn: "Explore our full mission details",

      targetTitle: "Sovereign Empowerment",
      targetDesc: "Returning total ownership of personal identity factors back into individual hands. Standardizing privacy.",
      complianceTitle: "Standardization",
      complianceDesc: "Strict adherence to the W3C DID specification framework guidelines and active personal privacy protocols.",
      privacyTitle: "Auditability First",
      privacyDesc: "All core modular SDK libraries, cryptographic cores, and QR parser frameworks are completely open source.",

      optimizeTitle: "Edge Optimization",
      optimizeDesc: "Cryptographic formulas parsed locally on device, performing extremely smoothly even on vintage processors.",
      socialTitle: "Societal Integrity",
      socialDesc: "Democratizing identity tools, guaranteeing equitable access to high secure services across underbanked regions.",
      ecosystemTitle: "Public Access Models",
      ecosystemDesc: "Providing 100% copyright-free software building blocks to foster decentralized engineering talents."
    }
  }[lang];

  const docs = [
    { 
      title: isVi ? "Ví dụ tích hợp SDK di động" : "Mobile Integration SDK Quickstart", 
      type: "React Native / Swift", 
      desc: isVi 
        ? "Hướng dẫn cài đặt nhanh thư viện ssi-wallet-sdk để gọi hàm yêu cầu chữ ký số danh tính." 
        : "Seamlessly query peer security drivers, request proofs vectors creation, and process digital handshakes locally."
    },
    { 
      title: isVi ? "Giao thức truyền gói VP W3C" : "W3C Verifiable Presentation Exchange Protocol", 
      type: "VP/Exchange Protocol", 
      desc: isVi 
        ? "Mô tả chuẩn kết cấu API truyền tin ngang hàng thông qua giao thức bảo mật Bluetooth LE hoặc QR quét." 
        : "Peer-to-peer secure transaction standardizing schemes utilizing Bluetooth LE channels, QR projections, and near-field (NFC)."
    },
    { 
      title: isVi ? "Độ tin cậy của mật mã ZKP" : "ZKP Math & Computational Bounds", 
      type: "Advanced Cryptography", 
      desc: isVi 
        ? "Nghiên cứu cấu hình vòng lặp bằng thuật toán zk-SNARKs nhằm tối ưu hóa việc chứng minh tuổi bí mật." 
        : "Theoretical complexity bounds analyzing mathematical zk-SNARK formulations for optimal zero-knowledge verification speed."
    }
  ];

  const extraDocs = [
    { 
      title: isVi ? "Cấu hình JSON-LD Định dạng" : "JSON-LD Context Schema Structuring", 
      type: "W3C Standards", 
      desc: isVi 
        ? "Cách định nghĩa danh sách các trường thông tin mở rộng (Schema) cho Chứng nhận học bạ hoặc Thẻ cư trú số." 
        : "Declare bespoke data schemas for student diplomas, corporate credentials structures, or state residencies claims."
    },
    { 
      title: isVi ? "Cơ chế Thu hồi Khóa (Revocation)" : "Revocation Protocols on Ledger Registers", 
      type: "Smart Contracts", 
      desc: isVi 
        ? "Sử dụng danh sách trạng thái mã hóa tích hợp trên mạng lưới để thu hồi chứng chỉ lập tức khi phát hiện rò rỉ." 
        : "Implement secure revocation mechanisms leveraging decentralized indexes to check credentials validation instantaneously."
    }
  ];

  const blogs = [
    {
      date: "12/05/2026",
      tag: isVi ? "Công nghệ" : "Technology",
      title: isVi ? "Giải pháp bảo mật danh diện phi tập trung quốc tế trên di động" : "Decentralized Personal Identity Safeguards on Edge Operating Systems",
      desc: isVi 
        ? "Làm thế nào để ứng dụng công nghệ SSI giảm thiểu rủi ro giả mạo thông tin định danh cá nhân trên không gian mạng hiện đại."
        : "Analyzing mobile architectural design spaces utilizing trusted execution environments (TEE) to anchor sovereign identity credentials safely."
    },
    {
      date: "08/04/2026",
      tag: isVi ? "Sự kiện" : "Announcements",
      title: isVi ? "Hợp tác cung cấp cổng định danh không mật khẩu cho tổ chức tài chính lớn" : "Deploying Passwordless Authentication Portals to Leading Banking Bodies",
      desc: isVi 
        ? "SSI Wallet tích hợp thành công chữ ký định danh vào hạ tầng giao dịch của các ngân hàng thương mại hàng đầu tại Việt Nam."
        : "Cooperative integrations successfully deliver cryptographic peer verification to financial institutions, cutting transactional onboarding risks."
    },
    {
      date: "24/03/2026",
      tag: isVi ? "Cập nhật" : "Updates",
      title: isVi ? "Nâng cấp tính năng Zero-Knowledge Proof bảo mật riêng tư tuyệt mật" : "ZKP Framework Enhancement delivers Seamless Private Age Checks",
      desc: isVi 
        ? "Chế độ mới hỗ trợ người dân ẩn giấu mốc ngày tháng sinh chi tiết và chỉ gửi chỉ báo xác thực tuổi hợp quy."
        : "Our production-ready cryptographic upgrade allows users to mathematically prove compliance with age barriers without disclosing physical birthdates."
    }
  ];

  const extraBlogs = [
    {
      date: "15/02/2026",
      tag: isVi ? "Tiêu chuẩn" : "Standards",
      title: isVi ? "Đóng góp thành công vào nhóm đặc tả kỹ thuật W3C DID Core 1.0" : "Successful Code Contributions Welcomed inside W3C DID Core 1.0",
      desc: isVi 
        ? "Kỹ sư SSI Wallet chính thức phát hành bản vá tối ưu hóa hiệu năng nén tài liệu JSON định danh trên môi trường di động cấu hình thấp."
        : "W3C core standard repository accepts our compression algorithm, significantly optimizing mobile memory usage on low-end processors."
    },
    {
      date: "02/01/2026",
      tag: isVi ? "Tương lai" : "Future Outlook",
      title: isVi ? "Xu hướng tích hợp thẻ căn cước thế hệ mới with định danh số tự chủ" : "Synthesizing Physical Chip Credentials inside Self-Sovereign Identity",
      desc: isVi 
        ? "Tầm nhìn tích hợp lưỡng tính giữa chip NFC vật lý quốc gia và giao thức xác thực không lưu trữ máy chủ."
        : "Future-facing research bridges decentralized W3C credentials with raw national NFC chips, guaranteeing cross-device interoperability."
    }
  ];

  return (
    <div className="relative z-10">
      
      {/* Tài liệu Section (Documentation) */}
      <section id="docs" className="py-24 px-6 lg:px-12 bg-[#F7F8FC] dark:bg-[#080B13] border-t border-[#E5E7EB] dark:border-[#1F2937] transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-left">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] block mb-2">{t.docsBadge}</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F2937] dark:text-white tracking-tight">{t.docsHeading}</h2>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-2 leading-relaxed">
              {t.docsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {docs.map((doc, idx) => (
              <a
                href="#download"
                key={idx}
                className="p-6.5 rounded-2xl border border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900/40 block hover:shadow-lg hover:border-[#5B6CFF]/20 group transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold text-[#5B6CFF] bg-[#5B6CFF]/8 p-1 px-2.5 rounded-full uppercase tracking-wider">
                    {doc.type}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#5B6CFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-sm.5 font-bold text-[#1F2937] dark:text-white mb-2 leading-snug group-hover:text-[#5B6CFF] transition-colors">
                  {doc.title}
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed font-normal">
                  {doc.desc}
                </p>
              </a>
            ))}
          </div>

          {/* Expandable docs list container */}
          <AnimatePresence>
            {showDocs && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {extraDocs.map((doc, idx) => (
                    <a
                      href="#download"
                      key={`extra-doc-${idx}`}
                      className="p-6.5 rounded-2xl border border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900/40 block hover:shadow-lg hover:border-[#5B6CFF]/20 group transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold text-[#5B6CFF] bg-[#5B6CFF]/8 p-1 px-2.5 rounded-full uppercase tracking-wider">
                          {doc.type}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#5B6CFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <h3 className="text-sm.5 font-bold text-[#1F2937] dark:text-white mb-2 leading-snug group-hover:text-[#5B6CFF] transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed font-normal">
                        {doc.desc}
                      </p>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive "Xem thêm" for docs */}
          <div className="mt-10 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onSeeMoreDocs}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#5B6CFF] hover:bg-[#4A5AF0] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>{t.docsSeeAllBtn}</span>
              <ArrowRight className="w-4 h-4 text-white animate-pulse" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 px-6 lg:px-12 bg-white dark:bg-[#0B0F1A] border-t border-[#E5E7EB] dark:border-[#374151] transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] block mb-2">{t.blogBadge}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1F2937] dark:text-white tracking-tight">{t.blogHeading}</h2>
            </div>
            <a 
              href="#view-all" 
              onClick={(e) => { e.preventDefault(); onSeeMoreBlog(); }}
              className="text-xs font-bold text-[#5B6CFF] hover:text-[#4A5AF0] flex items-center gap-1 shrink-0"
            >
              {t.blogSeeAllLink}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <article key={idx} className="flex flex-col text-left group cursor-pointer" onClick={onSeeMoreBlog}>
                <span className="text-xs font-mono text-gray-400 mb-2 block">{blog.date}</span>
                <h3 className="text-base font-bold text-[#1F2937] dark:text-white mb-2.5 leading-snug group-hover:text-[#5B6CFF] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4 flex-1 font-normal">
                  {blog.desc}
                </p>
                <div className="text-[11px] font-bold text-[#5B6CFF] uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t.readNext} 
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </article>
            ))}
          </div>

          {/* Expandable blog list container */}
          <AnimatePresence>
            {showBlogs && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-8 border-t border-gray-100 dark:border-slate-800/80 pt-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {extraBlogs.map((blog, idx) => (
                    <article key={`extra-blog-${idx}`} className="flex flex-col text-left group cursor-pointer p-6 rounded-2xl bg-[#F7F8FC] dark:bg-slate-900/20 hover:bg-white dark:hover:bg-slate-900/40 border border-transparent hover:border-[#5B6CFF]/10 transition-all" onClick={onSeeMoreBlog}>
                      <span className="text-xs font-mono text-gray-400 mb-2 block">{blog.date}</span>
                      <h3 className="text-base font-bold text-[#1F2937] dark:text-white mb-2.5 leading-snug group-hover:text-[#5B6CFF] transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4 font-normal">
                        {blog.desc}
                      </p>
                      <div className="text-[11px] font-bold text-[#5B6CFF] uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all mt-auto pt-2">
                        {t.readNext} 
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive "Xem thêm" for Blogs */}
          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onSeeMoreBlog}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#5B6CFF] hover:bg-[#4A5AF0] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>{t.blogSeeAllBtn}</span>
              <ArrowRight className="w-4 h-4 text-white animate-pulse" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Về chúng tôi (About Us) Section */}
      <section id="about" className="py-24 px-6 lg:px-12 bg-[#F7F8FC] dark:bg-[#080B13] border-t border-[#E5E7EB] dark:border-[#1F2937] transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] block mb-2">{t.aboutBadge}</span>
            <h2 className="text-3xl font-black text-[#1F2937] dark:text-white tracking-tight">{t.aboutHeading}</h2>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-2 max-w-xl mx-auto leading-relaxed">
              {t.aboutDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
              <UserCheck className="w-6 h-6 text-[#5B6CFF] mb-4" />
              <h3 className="text-sm.5 font-bold mb-1">{t.targetTitle}</h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed font-normal">
                {t.targetDesc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
              <ShieldCheck className="w-6 h-6 text-[#5B6CFF] mb-4" />
              <h3 className="text-sm.5 font-bold mb-1">{t.complianceTitle}</h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed font-normal">
                {t.complianceDesc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
              <Github className="w-6 h-6 text-[#5B6CFF] mb-4" />
              <h3 className="text-sm.5 font-bold mb-1">{t.privacyTitle}</h3>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed font-normal">
                {t.privacyDesc}
              </p>
            </div>
          </div>

          {/* Expandable about company details container */}
          <AnimatePresence>
            {showAbout && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-4">
                  <div className="p-6 rounded-2xl bg-[#5B6CFF]/5 border border-dashed border-[#5B6CFF]/20">
                    <Cpu className="w-6 h-6 text-[#5B6CFF] mb-4" />
                    <h3 className="text-sm.5 font-bold mb-1">{t.optimizeTitle}</h3>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed font-normal">
                      {t.optimizeDesc}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#5B6CFF]/5 border border-dashed border-[#5B6CFF]/20">
                    <Heart className="w-6 h-6 text-[#5B6CFF] mb-4" />
                    <h3 className="text-sm.5 font-bold mb-1">{t.socialTitle}</h3>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed font-normal">
                      {t.socialDesc}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#5B6CFF]/5 border border-dashed border-[#5B6CFF]/20">
                    <Code2 className="w-6 h-6 text-[#5B6CFF] mb-4" />
                    <h3 className="text-sm.5 font-bold mb-1">{t.ecosystemTitle}</h3>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed font-normal">
                      {t.ecosystemDesc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive "Xem thêm" for About section */}
          <div className="mt-12 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onSeeMoreAbout}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#5B6CFF] hover:bg-[#4A5AF0] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>{t.aboutSeeAllBtn}</span>
              <ArrowRight className="w-4 h-4 text-white animate-pulse" />
            </motion.button>
          </div>

        </div>
      </section>

    </div>
  );
}
