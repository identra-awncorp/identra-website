import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Home,
  ChevronRight,
  ShieldCheck, 
  Lock, 
  Eye, 
  Sparkles, 
  Smartphone, 
  Key, 
  RefreshCw, 
  Zap, 
  Network, 
  Users, 
  HelpCircle,
  Database,
  Check,
  X,
  Cpu,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface FeaturesSubpageProps {
  lang: 'vi' | 'en';
  onBack: () => void;
  onOpenDemo: () => void;
}

interface FeatureItem {
  icon: any;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  category: 'security' | 'architecture' | 'advanced';
  badgeVi?: string;
  badgeEn?: string;
  color: string;
}

export default function FeaturesSubpage({ lang, onBack, onOpenDemo }: FeaturesSubpageProps) {
  const isVi = lang === 'vi';
  const [activeCategory, setActiveCategory] = useState<'all' | 'security' | 'architecture' | 'advanced'>('all');
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features: FeatureItem[] = [
    {
      icon: Eye,
      titleVi: "Kiểm soát hiển thị",
      titleEn: "Display Control",
      descVi: "Người sử dụng hoàn toàn làm chủ việc cho phép hiển thị hay che giấu từng trường thông tin cá nhân cụ thể như Số điện thoại, Địa chỉ hoặc CCCD đối với các hệ thống yêu cầu.",
      descEn: "Users are fully in control of which fields of their private data—such as phone numbers, physical addresses, or ID cards—to reveal or seal away from asking verifiers.",
      category: 'security',
      badgeVi: "Bản quyền Người Dùng",
      badgeEn: "User Owned",
      color: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
    },
    {
      icon: ShieldCheck,
      titleVi: "Bảo mật phi tập trung",
      titleEn: "Decentralized Security",
      descVi: "Thông tin mã hóa bằng thuật toán bất đối xứng tinh vi, bảo đảm không bên thứ ba nào kể cả SSI Wallet có quyền can thiệp vào tài nguyên số của bạn.",
      descEn: "All records are encrypted using sophisticated asymmetric cryptography protocols, meaning no third party, not even SSI Wallet, has the right to pry into your digital logs.",
      category: 'security',
      badgeVi: "Mã Hoá 2 Đầu",
      badgeEn: "E2E Encrypted",
      color: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
    },
    {
      icon: Smartphone,
      titleVi: "Ví di động tinh gọn",
      titleEn: "Compact Mobile Wallet",
      descVi: "Giải pháp lưu trữ chuẩn W3C ngay trong thiết bị cá nhân của bạn, hỗ trợ xác minh một chạm không cần giấy tờ vật lý rườm rà.",
      descEn: "Native storage compliant with W3C standards located entirely on your physical machine. One-touch digital verification supersedes cumbersome paperwork.",
      category: 'architecture',
      badgeVi: "Tiêu Chuẩn W3C VC",
      badgeEn: "W3C VC Spec",
      color: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400"
    },
    {
      icon: Key,
      titleVi: "Mã hóa Zero-Knowledge Proved",
      titleEn: "Zero-Knowledge Encryption",
      descVi: "Chứng minh bạn trên 18 tuổi hay đủ điều kiện tài chính mà không cần tiết lộ ngày sinh hay số dư thực tế trong tài khoản thẻ.",
      descEn: "Validate complex predicates (e.g. older than 18) without disclosing actual critical numbers or underlying private raw values like exact birthday dates or bank balances.",
      category: 'advanced',
      badgeVi: "Bảo Mật ZKP",
      badgeEn: "ZKP Cryptography",
      color: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400"
    },
    {
      icon: RefreshCw,
      titleVi: "Đồng bộ tức thời",
      titleEn: "Instant Synchronization",
      descVi: "Tự động kiểm tra tính hợp lệ và thu hồi chứng chỉ số ngay lập tức khi tổ chức cấp phát có sự thay đổi quyền trạng thái.",
      descEn: "Automatically verifies validity and checks real-time public ledger statuses to implement instant revocation alerts the division makes any administrative changes.",
      category: 'architecture',
      badgeVi: "Giao Thức Đồng Bộ",
      badgeEn: "Sync Protocol",
      color: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400"
    },
    {
      icon: Zap,
      titleVi: "Kết nối siêu tốc 0.1 giây",
      titleEn: "0.1 Second Operations",
      descVi: "Quy trình xác thực ngang hàng (P2P) diễn ra tức thì nhờ hạ tầng chữ ký số phi tập trung, loại bỏ điểm nghẽn của máy chủ trung tâm.",
      descEn: "True point-to-point (P2P) authentication completes in fractions of a second due to the decentralized public key architecture, bypassing central server bottlenecks.",
      category: 'architecture',
      badgeVi: "Hiệu Năng Cao",
      badgeEn: "High Performance",
      color: "bg-amber-500/10 text-amber-650 dark:bg-amber-500/20 dark:text-amber-400"
    },
    {
      icon: Network,
      titleVi: "Bắc cầu đa chuỗi (Multi-chain Bridging)",
      titleEn: "Multi-chain Bridging",
      descVi: "Sẵn sàng liên kết khóa xác thực giữa các mạng lưới Blockchain chuẩn EVM hoặc Hyperledger Fabric hiệu năng cao.",
      descEn: "Seamless cryptographic cross-referencing support across modern EVM-compatible ledgers or enterprise Hyperledger Fabric clusters.",
      category: 'advanced',
      badgeVi: "Tương Thích EVM",
      badgeEn: "EVM Compatible",
      color: "bg-indigo-505/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
    },
    {
      icon: Users,
      titleVi: "Chữ ký ẩn danh nhóm (Group Signatures)",
      titleEn: "Group Signatures",
      descVi: "Cho phép ký duyệt đại diện tổ chức hay doanh nghiệp mà không làm hiển lộ trực tiếp danh định cá nhân của thành viên cụ thể.",
      descEn: "Authorize corporate assertions anonymously. Stake claims on behalf of a trust circle without ever exposing your individual personal name.",
      category: 'advanced',
      badgeVi: "Bảo Mật Nhóm",
      badgeEn: "Group Privacy",
      color: "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400"
    },
    {
      icon: HelpCircle,
      titleVi: "Khôi phục xã hội (Social Recovery)",
      titleEn: "Social Recovery",
      descVi: "Cơ chế khôi phục phân mảnh khóa quản trị ví thông qua người thân hoặc đối tác đáng tin cậy đã được cấu hình trước.",
      descEn: "Safely reconstruct wallet shards and secure keys using a pre-configured network of close friends, trusted associates, or institutional registrars.",
      category: 'security',
      badgeVi: "Khôi Phục Dự Phòng",
      badgeEn: "Backup Solution",
      color: "bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400"
    }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features
    : features.filter(item => item.category === activeCategory);

  const categoriesFilter = [
    { id: 'all', titleVi: 'Tất cả tính năng', titleEn: 'All Features' },
    { id: 'security', titleVi: 'Bảo mật & Riêng tư', titleEn: 'Security & Privacy' },
    { id: 'architecture', titleVi: 'Kiến trúc & Tương tác', titleEn: 'Architecture & Sync' },
    { id: 'advanced', titleVi: 'Công nghệ & Toán học', titleEn: 'Maths & Technologies' },
  ];

  // Matrix comparison table data
  const matrixRows = [
    {
      criteriaVi: "Kiến trúc dữ liệu",
      criteriaEn: "Data Architecture",
      centralizedVi: "Tập trung tại một máy chủ đơn lẻ thuộc quyền quản trị của một tổ chức.",
      centralizedEn: "Housed inside a single server controlled by a single organizational system.",
      federatedVi: "Liên kết qua các nhà cung cấp bên thứ ba (Google, Apple, SAML/IdP).",
      federatedEn: "Linked across standard third-party Identity Providers (e.g., Google, Apple).",
      ssiVi: "Lưu hoàn toàn cục bộ trên thiết bị cá nhân (Edge storage), không máy chủ trung gian.",
      ssiEn: "Resides purely locally inside the user's edge secure storage with no central registries."
    },
    {
      criteriaVi: "Quyền sở hữu (Sovereignty)",
      criteriaEn: "Data Sovereignty",
      centralizedVi: "Thấp - Nhà cung cấp nắm toàn quyền và có thể tạm khóa tài khoản của bạn.",
      centralizedEn: "Low. The service provider has top authority and can revoke your account at will.",
      federatedVi: "Trung bình - Phụ thuộc vào thỏa thuận và chính sách bảo mật của các IdP liên kết.",
      federatedEn: "Moderate. Dependent strictly on the target Federated IdP policies.",
      ssiVi: "Tối ưu - Người dùng làm chủ tuyệt đối, không ai có thể can thiệp hay đình chỉ.",
      ssiEn: "Perfect. Sovereign user holds absolute root keys and can never be disabled by others."
    },
    {
      criteriaVi: "Tôn trọng quyền riêng tư",
      criteriaEn: "Privacy Protection",
      centralizedVi: "Rất thấp - Dữ liệu cá nhân bị thu gom, phân tích hành vi khép kín.",
      centralizedEn: "Very low. User analytics are indexed, logged, and tracked extensively.",
      federatedVi: "Thấp - IdP ghi nhận thời điểm và địa chỉ mọi hành vi đăng nhập liên kết.",
      federatedEn: "Low. IdPs track metadata of every single authentication and linked login.",
      ssiVi: "Tuyệt đối - Trao đổi mã hóa ngang hàng, chế độ ẩn danh và tối thiểu hóa chia sẻ.",
      ssiEn: "Absolute E2E. Proof of claims bypasses central logs and prevents tracking."
    },
    {
      criteriaVi: "Khả năng chống lừa đảo (Phishing)",
      criteriaEn: "Phishing Resistance",
      centralizedVi: "Yếu - Dễ bị dụ nhập mật khẩu vào các trang web mạo danh.",
      centralizedEn: "Weak. Phishing attacks can easily grab passwords on spoofed interface forms.",
      federatedVi: "Trung bình - Vẫn có rủi ro bị tấn công chiếm giữ luồng chuyển tiếp (Redirect).",
      federatedEn: "Moderate. Susceptible to advanced redirect and state token hijack attempts.",
      ssiVi: "Tối ưu - Ràng buộc bằng cặp khóa riêng tư lưu trên phần cứng đầu cuối bảo mật.",
      ssiEn: "Optimal. Crytographic handshakes are tied to your device's secure hardware."
    },
    {
      criteriaVi: "Tiết lộ thông tin chọn lọc",
      criteriaEn: "Selective Disclosure",
      centralizedVi: "Không hỗ trợ - Luôn yêu cầu gửi đầy đủ hồ sơ gốc về máy chủ.",
      centralizedEn: "Not supported. Full profile attributes must be submitted to the verifier.",
      federatedVi: "Không hỗ trợ - Trả về dữ liệu lớn theo phạm vi (Scopes) cấu hình sẵn.",
      federatedEn: "Not supported. Returns broad structured profiles through scopes.",
      ssiVi: "Tuyệt đối - Hỗ trợ che giấu và ZKP để chứng minh thuộc tính mà không lộ giá trị.",
      ssiEn: "Absolute support. Prove attributes (e.g. over 18) without exposing true underlying values."
    },
    {
      criteriaVi: "Khôi phục dự phòng tài khoản",
      criteriaEn: "Backup & Recovery",
      centralizedVi: "Có hỗ trợ nhưng phụ thuộc vào nhà cung cấp cài đặt lại ví.",
      centralizedEn: "Yes, but dependent entirely on centralized resets via admin tools.",
      federatedVi: "Có hỗ trợ bằng cách phục hồi tài khoản thông qua chính IdP liên kết.",
      federatedEn: "Yes, via recovering roots inside the target Federated IdP networks.",
      ssiVi: "Khôi phục xã hội (Social Recovery) ưu việt thông qua hội nhóm tin cậy.",
      ssiEn: "Social Recovery mechanism via pre-configured group nodes."
    }
  ];

  return (
    <div className="bg-[#F7F8FC] dark:bg-[#0B0F1A] min-h-screen text-[#1F2937] dark:text-[#E5E7EB] pb-24 font-sans select-none overflow-x-hidden transition-colors duration-300">
      
      {/* 1. HERO SECTION - Synchronized EXACT SCHEDULING AND MARGINS with FAQ / UseCases */}
      <section className="py-16 pt-8 lg:pt-12 bg-gradient-to-b from-white dark:from-[#0F172A]/45 via-white dark:via-[#0F172A]/10 to-[#F7F8FC] dark:to-[#0B0F1A] border-b border-[#E5E7EB] dark:border-slate-800/80 px-6 lg:px-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation Bar outside the core grid */}
          <div className="mb-6 text-left border-none bg-transparent">
            <motion.button
              whileHover={{ x: -4 }}
              onClick={onBack}
              className="-ml-3 inline-flex min-h-9 items-center gap-2 rounded-xl px-3 py-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[2.25] text-xs font-bold text-[#5B6CFF] dark:text-[#7C8CFF] hover:text-[#4A5AF0] dark:hover:text-[#6b7bff] transition-colors cursor-pointer group bg-transparent border-none outline-none"
            >
              <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
              <span>{isVi ? 'Quay lại Trang chủ' : 'Back to Home'}</span>
            </motion.button>
          </div>

          <div className="relative text-[#1F2937] dark:text-gray-100 text-left">
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-12">
              
              {/* Left Hero Column matching the exact structure and spacing of UseCasesSubpage */}
              <div className="space-y-6 lg:col-span-7">

            {/* Standard subpage visual tag/pill */}
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/8 px-3.5 py-1.5 rounded-full border border-[#5B6CFF]/10 w-fit">
              <Sparkles className="w-3.5 h-3.5 mr-0.5" />
              <span>{isVi ? "Tính năng vượt trội" : "Outstanding Features"}</span>
            </div>

            {/* Structured Title updated to match the exact font size, weight and colors of UseCasesSubpage */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              {isVi ? "Tính năng vượt trội " : "Outstanding Features"} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#5B6CFF] to-[#8F9BFF] dark:from-[#7C8CFF] dark:to-[#8F9BFF] bg-clip-text text-transparent">
                {isVi ? "với bảo mật phi tập trung" : "with decentralized safety"}
              </span>
            </h1>

            {/* Styled Subtitle updated to match UseCasesSubpage text size, leading and color */}
            <p className="text-base sm:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl font-normal font-sans">
              {isVi 
                ? "Khám phá bộ các tính năng bảo mật mật mã cấp cao, giúp người dùng làm chủ danh tính số hoàn hảo tuân thủ tiêu chuẩn quốc tế và triệt tiêu thu thập dữ liệu bất hợp pháp."
                : "Explore the advanced cryptographic feature set returning absolute digital sovereignty to users under global standards without invasive corporate metrics."}
            </p>

            {/* Redesigned Row of Perks matching the exact design and icons of UseCasesSubpage */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-gray-100 dark:border-slate-850">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-gray-200">
                <ShieldCheck className="w-[22px] h-[22px] text-[#5B6CFF]" strokeWidth={2.5} />
                <span className="text-[15px] font-semibold text-[#374151] dark:text-gray-300 font-sans">{isVi ? "Dữ liệu của bạn" : "Your data"}</span>
              </div>
              
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-gray-200">
                <Lock className="w-5 h-5 text-[#5B6CFF]" strokeWidth={2.5} />
                <span className="text-[15px] font-semibold text-[#374151] dark:text-gray-300 font-sans">{isVi ? "Bạn quyết định chia sẻ" : "You control sharing"}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800 dark:text-gray-200">
                <ShieldCheck className="w-[22px] h-[22px] text-[#5B6CFF]" strokeWidth={2.5} />
                <span className="text-[15px] font-semibold text-[#374151] dark:text-gray-300 font-sans">{isVi ? "Xác minh tức thì" : "Instant verification"}</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column - Pristine browser-frame visualization matching UseCasesSubpage */}
          <div className="subpage-hero-visual w-full max-w-[30rem] mx-auto lg:col-span-5 lg:justify-self-end hidden lg:block relative">
            {/* Ambient background glow to align elegantly */}
            <div className="absolute w-72 h-72 bg-[#5B6CFF]/15 dark:bg-[#5B6CFF]/10 rounded-full blur-3xl -z-10 pointer-events-none -top-10 -right-10" />

            <div className="relative w-full aspect-[4/3] rounded-3xl bg-slate-900 shadow-xl overflow-hidden border border-slate-800 p-5 font-mono text-xs flex flex-col justify-between">
              
              {/* Browser window top bar controls */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 shrink-0 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80 block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
                </div>
                <div className="px-3 py-1 rounded-md bg-slate-800/80 text-[10px] text-gray-500 border border-slate-750">
                  identra_feature_matrix.html
                </div>
                <div className="flex gap-1.5 text-gray-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-700 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-700 block" />
                </div>
              </div>

              {/* Secure Graphic Console details */}
              <div className="flex-1 text-left space-y-4 text-gray-400 text-[11px] overflow-hidden">
                <div className="flex items-center gap-2 text-[10px] text-[#5B6CFF] dark:text-[#7C8CFF] font-black uppercase tracking-wider font-sans">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>{isVi ? "CHỨNG THỰC AN TOÀN MẬT MÃ" : "CRYPTOGRAPHIC TRUST COREGATION"}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/60 space-y-3 font-sans">
                  <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold tracking-wide">
                    <span>POLKADOT & W3C CORE DID</span>
                    <span className="text-blue-400">Zero-Knowledge Validated</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    <p className="font-bold text-slate-100 text-xs tracking-tight">
                      {isVi ? "Sơ đồ kiến trúc không tiết lộ" : "Selective Disclosure Credentials schema"}
                    </p>
                    <p className="text-[10px] text-gray-500 leading-tight">
                      {isVi 
                        ? "Hỗ trợ cấu hình: BBS+ Signatures, Ed25519, Secp256k1 & ZK-SNARK Prover" 
                        : "Engines: BBS+ Signatures, Ed25519 Secure, Secp256k1 & ZK-SNARK Prover"}
                    </p>
                  </div>

                  {/* Horizontal visual progress bars */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] text-gray-600">
                      <span>{isVi ? "QUY TRÌNH KIỂM TRA CHỮ KÝ PHÂN TÁN" : "ESTABLISHING TRUST DECENTRALIZED PROOFS"}</span>
                      <span>100%</span>
                    </div>
                    <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-full animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Simulated live execution logs */}
                <div className="space-y-1.5 pl-1.5 font-mono text-[9px] text-gray-500">
                  <p className="text-gray-600 font-bold">// cryptography_active:</p>
                  <p>✔ signature_valid: <span className="text-emerald-400">"bbs_plus_schema_verified"</span></p>
                  <p>⚡ selective_reveal: <span className="text-yellow-400">"active_claims_minimized"</span></p>
                </div>
              </div>

              {/* Floating Glassmorphic verification status card on top-left */}
              <div 
                className="absolute top-1/4 -left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-[#E5E7EB] dark:border-slate-800 p-4 shadow-lg flex items-center gap-3 animate-bounce" 
                style={{ animationDuration: '6s' }}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left font-sans">
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-wider block">W3C STANDARDS</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    {isVi ? "DID & VC Hoàn Hảo" : "Compliant DID & VC"}
                  </span>
                </div>
              </div>

              {/* Cloud secure indicator/Trust index on bottom-right */}
              <div className="absolute bottom-10 -right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-gray-150 dark:border-slate-800 p-4 shadow-md flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#5B6CFF]/10 text-[#5B6CFF] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left text-xs text-slate-900 dark:text-white font-sans">
                  <span className="font-bold block">Security Index</span>
                  <span className="text-[10px] text-gray-400 dark:text-[#E2E8F0] block leading-tight">
                    {isVi ? "Mỹ thuật mật mã chuẩn" : "State-of-the-art Cryptography"}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* 2. INTERACTIVE FEATURE CATEGORY EXPLORER - Elevating UI maturity */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B6CFF]/8 text-[#5B6CFF] text-[10.5px] font-extrabold uppercase tracking-widest leading-none">
              <Cpu className="w-3.5 h-3.5" />
              <span>{isVi ? "Thành phần công nghệ" : "Technology Architecture"}</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isVi ? "Khám phá bản đồ bảo mật tuyệt đối" : "Comprehensive Technical Capabilities"}
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-400 max-w-2xl leading-normal font-medium">
              {isVi 
                ? "Các mảnh ghép an toàn cấu thành nền tảng định danh tự chủ Identra. Lựa chọn phân hệ công nghệ bên dưới để đi sâu kiểm nghiệm."
                : "The vital modules establishing Identra's self-sovereign ecosystem. Select any technological pillar below to investigate details."}
            </p>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-gray-100 dark:border-slate-850/80">
          {categoriesFilter.map((cat) => {
            const isTabActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                style={{ padding: '10px 18px' }}
                className={`text-xs font-bold rounded-2xl transition-all cursor-pointer border-none outline-none flex items-center justify-center gap-2 ${
                  isTabActive
                  ? "bg-[#3B52FF] text-white shadow-md shadow-[#3B52FF]/20"
                  : "bg-white hover:bg-slate-50 dark:bg-slate-900/60 dark:hover:bg-slate-850/60 text-slate-655 dark:text-slate-350"
                }`}
              >
                <span>{isVi ? cat.titleVi : cat.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Cards Grid displaying filtered features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredFeatures.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.titleVi}
                  layout
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="p-8 rounded-3xl border border-slate-150/80 dark:border-slate-800/80 bg-white dark:bg-[#0F172A] flex flex-col justify-between hover:shadow-xl hover:border-[#5B6CFF]/20 dark:hover:border-[#7C8CFF]/20 hover:shadow-[#5B6CFF]/5 transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Decorative glowing background on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-[#5B6CFF]/5 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Vertical line accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-transparent group-hover:bg-[#5B6CFF] rounded-l-3xl transition-all duration-350" />

                  <div className="space-y-5">
                    
                    {/* Top bar with Icon and Category badge */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-xs border border-blue-500/5`}>
                        <IconComp className="w-5.5 h-5.5" />
                      </div>
                      
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/8 py-1.5 px-3 rounded-full leading-none">
                        {isVi ? item.badgeVi : item.badgeEn}
                      </span>
                    </div>

                    {/* Detailed titles */}
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-[#5B6CFF] dark:group-hover:text-[#7C8CFF] transition-colors">
                        {isVi ? item.titleVi : item.titleEn}
                      </h3>
                      <p className="text-xs sm:text-[13px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed font-sans min-h-[96px] line-clamp-5">
                        {isVi ? item.descVi : item.descEn}
                      </p>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. VERIFIABLE DATA TRUST TRIANGLE DIAGRAM - Adding educational depth */}
      <section className="bg-slate-100/50 dark:bg-[#0B0F19]/40 border-y border-gray-150 dark:border-slate-805/80 py-16 px-6 lg:px-12 text-left">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-[10.5px] font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>{isVi ? "Kiến trúc chuẩn W3C" : "W3C Trust Framework"}</span>
            </div>
            <h2 className="text-2.5xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {isVi ? "Mô hình tam giác niềm tin phi tập trung" : "The Decentralized Trust Triangle"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-405 leading-relaxed font-medium">
              {isVi
                ? "Dữ liệu được chuyển giao khép kín và an toàn tuyệt đối mà không cần qua trung gian lưu trữ thứ ba."
                : "Information flows directly and securely between sovereign parties, bounded by verified digital records."}
            </p>
          </div>

          {/* Diagram layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative">
            
            {/* Visual connector lines for desktop */}
            <div className="absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-dashed border-t-2 border-dashed border-[#5B6CFF]/20 hidden md:block -z-10" />

            {/* Issuer card */}
            <div className="bg-white dark:bg-[#0F172A] border border-slate-150/80 dark:border-slate-800 p-6 rounded-3xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-sm.5 font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                  {isVi ? "1. Tổ Chức Cấp Phát (Issuer)" : "1. Credential Issuer"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {isVi 
                    ? "Ngân hàng, Trường đại học hoặc Cơ quan nhà nước chịu trách nhiệm ký số nội dung thực chứng bằng khóa riêng của họ."
                    : "Universities, central registries, or state bodies sign digital assertions using highly secure cryptographic private keys."}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-805 text-[10px] font-mono text-gray-500 dark:text-gray-400">
                OUTPUT: Signed W3C VC
              </div>
            </div>

            {/* Holder (You) card */}
            <div className="bg-[#3B52FF]/5 dark:bg-[#3B52FF]/10 border-2 border-[#3B52FF]/20 p-6 rounded-3xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 bg-[#3B52FF]/10 text-[#3B52FF] dark:text-[#7C8CFF] rounded-2xl flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="text-sm.5 font-bold text-slate-900 dark:text-white tracking-tight leading-none flex items-center gap-1.5">
                  <span>{isVi ? "2. Chủ Sở Hữu (Holder)" : "2. Identity Holder"}</span>
                  <span className="text-[9px] bg-[#3B52FF]/10 text-[#3B52FF] dark:text-[#7C8CFF] font-black uppercase tracking-wider py-1 px-1.5 rounded-md leading-none">CHÍNH BẠN</span>
                </h4>
                <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-medium">
                  {isVi
                    ? "Tải các thực chứng về ví cá nhân bảo lưu cục bộ. Bạn là người kiểm soát tối cao, quyết định những gì sẽ xuất trình và bảo mật."
                    : "Keep credential assets stored in browser/mobile hardware. You dictate presentation scenarios without remote tracking vulnerabilities."}
                </p>
              </div>
              <div className="pt-2 border-t border-indigo-100 dark:border-slate-800 text-[10px] font-mono text-blue-500 font-bold">
                STORAGE: Private LocalStorage
              </div>
            </div>

            {/* Verifier card */}
            <div className="bg-white dark:bg-[#0F172A] border border-slate-150/80 dark:border-slate-800 p-6 rounded-3xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 bg-rose-500/10 text-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-sm.5 font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                  {isVi ? "3. Bên Xác Minh (Verifier)" : "3. Verifying Partner"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {isVi
                    ? "Ngân hàng đối tác, nhà tuyển dụng kiểm tra tính toán học của chữ ký đối soát trực tiếp mà không cần liên hệ lại tổ chức cấp gốc."
                    : "Employers and service websites test signature proofs securely without calling back standard servers over long distance loops."}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-805 text-[10px] font-mono text-gray-500 dark:text-gray-400">
                RESULT: cryptographic verification
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. COMPARISON MATRIX TABULAR VIEW - Making it incredibly rich and standard */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 text-left">
        <div className="space-y-3 mb-8">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-500/10 text-violet-500 dark:text-violet-400 text-[10.5px] font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isVi ? "Đối sánh hiệu năng" : "Competitive Comparison"}</span>
          </div>
          <h2 className="text-2.5xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {isVi ? "So sánh 3 mô hình định danh phổ biến" : "Comparison of 3 Popular Identity Models"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl font-medium">
            {isVi
              ? "Phân tích đối sánh chuyên sâu giữa Mô hình Định danh tập trung, Định danh liên kết và Định danh phi tập trung (SSI)."
              : "In-depth comparison analysis of Centralized Identity, Federated Identity, and Decentralized Identity (SSI)."}
          </p>
        </div>

        {/* Custom styled responsive scroll table */}
        <div className="bg-white dark:bg-[#0F172A] border border-slate-150/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-900/60 border-b border-gray-150 dark:border-slate-800 font-sans">
                  <th className="p-4 sm:p-5 text-xs font-black uppercase text-slate-500 dark:text-slate-400 select-none tracking-wide">
                    {isVi ? "Tiêu chí bảo mật & sử dụng" : "Operational Metrics"}
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-black uppercase text-slate-500 dark:text-slate-400 select-none tracking-wide text-left min-w-[130px]">
                    {isVi ? "Định danh tập trung (Centralized)" : "Centralized Identity"}
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-black uppercase text-slate-500 dark:text-slate-400 select-none tracking-wide text-left min-w-[130px]">
                    {isVi ? "Định danh liên kết (Federated)" : "Federated Identity"}
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-black uppercase text-[#3B52FF] dark:text-[#7C8CFF] bg-[#3B52FF]/5 dark:bg-[#3B52FF]/10 select-none tracking-wide text-left min-w-[150px]">
                    {isVi ? "Định danh phi tập trung (SSI)" : "Decentralized Identity (SSI)"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800/60 font-sans text-xs sm:text-[13px]">
                {matrixRows.map((row: any, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 dark:hover:bg-slate-850/10 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white text-left max-w-[180px] break-words">
                      {isVi ? row.criteriaVi : row.criteriaEn}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400 text-left font-normal max-w-[200px] break-words">
                      {isVi ? row.centralizedVi : row.centralizedEn}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400 text-left font-normal max-w-[200px] break-words">
                      {isVi ? row.federatedVi : row.federatedEn}
                    </td>
                    <td className="p-4 sm:p-5 bg-[#3B52FF]/3 dark:bg-[#3B52FF]/5 text-slate-800 dark:text-gray-100 text-left font-semibold max-w-[220px] break-words">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{isVi ? row.ssiVi : row.ssiEn}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>


    </div>
  );
}
