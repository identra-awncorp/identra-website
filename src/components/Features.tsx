import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Key, Shield, Smartphone, RefreshCw, Zap, ChevronDown, ChevronUp, Network, Users, HelpCircle, ArrowRight } from 'lucide-react';

interface FeaturesProps {
  lang?: 'vi' | 'en';
  onOpenDemo: () => void;
  onSeeMore: () => void;
}

export default function Features({ lang = 'vi', onOpenDemo, onSeeMore }: FeaturesProps) {
  const [showMore, setShowMore] = useState(false);

  const isVi = lang === 'vi';

  const t = {
    vi: {
      badge: "Tính năng cốt lõi",
      heading: "Tái định nghĩa quyền riêng tư số",
      desc: "Bạn không cần giao nộp toàn bộ giấy tờ tùy thân của mình cho mỗi ứng dụng nữa. Thay vào đó, bạn chỉ cung cấp đúng những gì tối thiểu cần thiết.",
      demoBtn: "Mở mô phỏng tính năng ví",
      seeAllBtn: "Xem thêm tất cả tính năng",
    },
    en: {
      badge: "Core Features",
      heading: "Redefining Digital Privacy",
      desc: "No more handing over your raw identity documents to every app you use. Web-standard cryptographic verification filters just the required values.",
      demoBtn: "Interactive simulator keys",
      seeAllBtn: "Expose all core features",
    }
  }[lang];

  const list = [
    {
      icon: <Eye className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Kiểm soát hiển thị" : "Granular Selective Reveal",
      desc: isVi 
        ? "Người sử dụng hoàn toàn làm chủ việc cho phép hiển thị hay che giấu từng trường thông tin cá nhân cụ thể như Số điện thoại, Địa chỉ hoặc CCCD đối với các hệ thống yêu cầu."
        : "Users maintain complete, perfect control over exposing or concealing specific metadata subfields: email, age, or physical address attributes."
    },
    {
      icon: <Shield className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Bảo mật phi tập trung" : "Decentralized Key Cryptography",
      desc: isVi 
        ? "Thông tin mã hóa bằng thuật toán bất đối xứng tinh vi, bảo đảm không bên thứ ba nào kể cả SSI Wallet có quyền can thiệp vào tài nguyên số của bạn."
        : "Utilizing asymmetric keypairs securely sandboxed inside your local hardware secure enclave. No external servers or wallets can intercept private credentials."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Ví di động tinh gọn" : "Lightweight Mobile Enclave",
      desc: isVi 
        ? "Giải pháp lưu trữ chuẩn W3C ngay trong thiết bị cá nhân của bạn, hỗ trợ xác minh một chạm không cần giấy tờ vật lý rườm rà."
        : "Full compliance with the global W3C DID framework in a mobile application. Complete credentials verification requests offline via a fluid, physical NFC tap or scan."
    },
    {
      icon: <Key className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Mã hóa Zero-Knowledge Proven" : "Zero-Knowledge Cryptography",
      desc: isVi 
        ? "Chứng minh bạn trên 18 tuổi hay đủ điều kiện tài chính mà không cần tiết lộ ngày sinh hay số dư thực tế trong tài khoản thẻ."
        : "Confirm criteria (e.g. proof of age threshold compliance) without transferring details like your raw biological birthday or precise address indices."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Đồng bộ tức thời" : "Realtime State Revocation",
      desc: isVi 
        ? "Tự động kiểm tra tính hợp lệ và thu hồi chứng chỉ số ngay lập tức khi tổ chức cấp phát có sự thay đổi quyền trạng thái."
        : "Immediately verify key status. Credentials keep an active cryptographically secure status indicator connected directly to decentralized trust registries."
    },
    {
      icon: <Zap className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Kết nối siêu tốc 0.1 giây" : "Peer-to-Peer Sub-second Speed",
      desc: isVi 
        ? "Quy trình xác thực ngang hàng (P2P) diễn ra tức thì nhờ hạ tầng chữ ký số phi tập trung, loại bỏ điểm nghẽn của máy chủ trung tâm."
        : "Verification resolves in less than 100 milliseconds. Secure edge devices bypass standard API delays, executing complete credential checks safely on device."
    }
  ];

  const extraList = [
    {
      icon: <Network className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Bắc cầu đa chuỗi (Multi-chain Bridging)" : "Multi-chain EVM Bridging",
      desc: isVi 
        ? "Sẵn sàng liên kết khóa xác thực giữa các mạng lưới Blockchain chuẩn EVM hoặc Hyperledger Fabric hiệu năng cao."
        : "Easily integrate public key infrastructure across high performance EVM networks or enterprise-grade Hyperledger Fabric ledger structures."
    },
    {
      icon: <Users className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Chữ ký ẩn danh nhóm (Group Signatures)" : "Cryptographic Ring Signatures",
      desc: isVi 
        ? "Cho phép ký duyệt đại diện tổ chức hay doanh nghiệp mà không làm hiển lộ trực tiếp danh định cá nhân của thành viên cụ thể."
        : "Allows individuals to execute cryptographic verifications representing complete corporate bodies without exposing private identities."
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-[#5B6CFF]" />,
      title: isVi ? "Khôi phục xã hội (Social Recovery)" : "Secure Guardian Relays",
      desc: isVi 
        ? "Cơ chế khôi phục phân mảnh khóa quản trị ví thông qua người thân hoặc đối tác đáng tin cậy đã được cấu hình trước."
        : "Advanced secret-sharing scheme allowing secure account recoveries backed by pre-nominated trusted contacts or external cold keys."
    }
  ];

  return (
    <section id="features" className="py-24 px-6 lg:px-12 bg-white dark:bg-[#0B0F1A] transition-colors duration-300 relative z-10 border-t border-[#E5E7EB] dark:border-[#374151]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] block mb-2">{t.badge}</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1F2937] dark:text-white tracking-tight leading-tight">
              {t.heading}
            </h2>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] text-sm sm:text-base mt-2 leading-relaxed">
              {t.desc}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenDemo}
            className="shrink-0 px-6 py-3 rounded-full bg-[#5B6CFF]/10 text-[#5B6CFF] hover:bg-[#5B6CFF]/15 text-sm font-bold transition-all cursor-pointer"
          >
            {t.demoBtn}
          </motion.button>
        </div>

        {/* Features Bento layout list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              key={idx}
              className="p-8 rounded-2xl border border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-slate-900/30 flex flex-col justify-between hover:shadow-lg hover:border-[#5B6CFF]/25 dark:hover:border-[#7C8CFF]/25 hover:shadow-[#5B6CFF]/5 transition-all duration-300 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#5B6CFF]/8 dark:bg-[#7C8CFF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1F2937] dark:text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expandable Features list container */}
        <AnimatePresence>
          {showMore && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden mt-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                {extraList.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    key={`extra-${idx}`}
                    className="p-8 rounded-2xl border border-[#E5E7EB] dark:border-[#374151] bg-[#F7F8FC]/60 dark:bg-slate-900/40 flex flex-col justify-between hover:shadow-lg hover:border-[#5B6CFF]/25 dark:hover:border-[#7C8CFF]/25 hover:shadow-[#5B6CFF]/5 transition-all duration-300 group"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#5B6CFF]/8 dark:bg-[#7C8CFF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-bold text-[#1F2937] dark:text-white mb-3 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive "Xem thêm" button */}
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
