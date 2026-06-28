import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Code2, 
  Heart, 
  Database, 
  Share2, 
  User, 
  Cloud, 
  RefreshCw, 
  Mail,
  ChevronRight,
  Shield,
  HelpCircle,
  EyeOff,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Fingerprint,
  Info,
  Clock,
  Search,
  Sparkles,
  Home
} from 'lucide-react';

interface PrivacyPolicySubpageProps {
  lang: 'vi' | 'en';
  onBack: () => void;
  onNavigate?: (page: string) => void;
  onOpenDemo?: () => void;
}

interface PolicySection {
  id: string;
  num: number;
  category: 'collection' | 'control' | 'project' | 'general';
  title: {
    vi: string;
    en: string;
  };
  desc: {
    vi: string;
    en: string;
  };
  icon: any;
  color: string;
  details: {
    vi: string[];
    en: string[];
  };
}

export default function PrivacyPolicySubpage({ lang, onBack, onNavigate, onOpenDemo }: PrivacyPolicySubpageProps) {
  const isVi = lang === 'vi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'collection' | 'control' | 'project'>('all');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const categories = [
    { id: 'all', vi: 'Tất cả chính sách', en: 'All Provisions', icon: Shield, desc: { vi: 'Toàn bộ cam kết bảo mật', en: 'View all core design promises' } },
    { id: 'general', vi: 'Tuyên bố chung', en: 'General Proclamation', icon: Info, desc: { vi: 'Nguyên lý thiết kế cốt lõi v1.0', en: 'Core design principles & v1.0' } },
    { id: 'collection', vi: 'Lưu trữ & Thu thập', en: 'Storage & Zero Data', icon: Database, desc: { vi: 'Cam kết không lưu trữ máy chủ', en: 'Local device encryption rules' } },
    { id: 'control', vi: 'Quyền tự quyết', en: 'Sovereign Control', icon: Fingerprint, desc: { vi: 'Quyền của người dùng, chữ ký số', en: 'User keys and standard permissions' } },
    { id: 'project', vi: 'Vận hành dự án', en: 'Project Operations', icon: Code2, desc: { vi: 'Mã nguồn mở, hạ tầng p2p', en: 'Open source compliance & contacts' } }
  ];

  const policySections: PolicySection[] = [
    {
      id: 'ps-1',
      num: 1,
      category: 'general',
      title: {
        vi: "Tuyên bố chung về quyền riêng tư",
        en: "General Privacy Declaration"
      },
      desc: {
        vi: "Identra là một dự án cộng đồng, phi lợi nhuận với sứ mệnh thúc đẩy công nghệ SSI trở nên dễ tiếp cận và hữu ích cho mọi người. Chúng tôi tôn trọng quyền riêng tư và luôn đặt người dùng làm trung tâm tuyệt đối trong mọi dòng mã nguồn.",
        en: "Identra is a community-driven, non-profit project pioneering open-source SSI tools globally. We respect user privacy as a sacred human right and always place individuals at the central focal point of our design architecture."
      },
      icon: ShieldCheck,
      color: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
      details: {
        vi: [
          "Mô hình quyền riêng tư được thiết lập theo triết lý 'Privacy by Design' - mặc định bảo mật tối đa.",
          "Cam kết không theo dõi hành vi, không gắn mã pixel quảng cáo hay thu thập cookies tùy tiện.",
          "Cung cấp giải pháp minh bạch, hỗ trợ tối đa việc xác minh tự động trực tiếp trên thiết bị đầu cuối."
        ],
        en: [
          "Privacy is structured based on standard 'Privacy by Design' frameworks — securing settings by default.",
          "Zero telemetry plugins, backend tracking pixels, or advertising beacons are integrated on this portal.",
          "Enabling decentralized, peer-to-peer verification protocols that process on client-side sandboxes."
        ]
      }
    },
    {
      id: 'ps-2',
      num: 2,
      category: 'collection',
      title: {
        vi: "Cam kết không thu thập dữ liệu cá nhân",
        en: "No Data Collection Commitment"
      },
      desc: {
        vi: "Identra không thu thập, không xử lý, không lưu trữ hay chia sẻ bất kỳ dữ liệu cá nhân nào của người dùng. Tất cả thông tin định danh và tài liệu số của bạn đều do bạn tự kiểm soát.",
        en: "Identra does not collect, capture, process, store, or share your personal profile logs. All digital identity attributes and certifications are managed exclusively on your side."
      },
      icon: EyeOff,
      color: "bg-[#5B6CFF]/10 text-[#5B6CFF] dark:bg-[#5B6CFF]/20 dark:text-[#7C8CFF]",
      details: {
        vi: [
          "Chúng tôi không có máy chủ cơ sở dữ liệu làm nhiệm vụ lưu trữ hồ sơ định tính người dùng.",
          "Lịch sử phát hành và kiểm chứng chứng chỉ hoàn toàn ngang hàng (P2P), không ghi nhận log về hệ thống trung tâm.",
          "Bạn không cần đăng ký tài khoản email hay số điện thoại để cài đặt và kích hoạt hệ thống ví SSI."
        ],
        en: [
          "We maintain absolute zero database backends dedicated to accumulating user credentials or profiles.",
          "P2P generation routes and checks operate on secure transport envelopes without generating index metadata logs.",
          "Zero sign-up sheets, background email registrations, or mobile numbers are requested to start the app."
        ]
      }
    },
    {
      id: 'ps-3',
      num: 3,
      category: 'project',
      title: {
        vi: "Dự án mã nguồn mở tuyệt đối",
        en: "100% Open Source Ecosystem"
      },
      desc: {
        vi: "Toàn bộ phần mềm của Identra được phân phối minh bạch công khai trên GitHub. Bất kỳ lập trình viên hoặc chuyên gia bảo mật nào đều có toàn quyền kiểm tra mã nguồn.",
        en: "All of Identra's client codebases, schemas, and configurations are distributed openly on GitHub. Developers can audit our code and compile individual instances independently."
      },
      icon: Code2,
      color: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
      details: {
        vi: [
          "Mã nguồn được phát hành theo giấy phép MIT/Apache 2.0 thân thiện với đóng góp cộng đồng.",
          "Công khai quy trình kiểm chứng toán học an toàn thông tin và thuật toán chứng minh phi tri thức.",
          "Hỗ trợ phân tách nhanh chóng sang các nhánh phát triển độc lập (Forking) để phục vụ giải pháp địa phương."
        ],
        en: [
          "Released under standard permissive licenses (MIT/Apache 2.0) to maximize utility and transparent collaboration.",
          "Mathematical verification paths and ZK polynomial calculations are auditable via open repos.",
          "We encourage forking codes to set up customized state structures or distinct sandbox test networks."
        ]
      }
    },
    {
      id: 'ps-4',
      num: 4,
      category: 'project',
      title: {
        vi: "Sứ mệnh phi lợi nhuận & Sáng tạo Số",
        en: "Non-profit Digital Public Goods"
      },
      desc: {
        vi: "Identra hoạt động phi lợi nhuận. Chúng tôi không kinh doanh dữ liệu, không bán gói quảng cáo và không áp dụng bất kỳ hình thức thương mại hóa thông tin nào.",
        en: "Identra operates strictly as a non-profit initiative. We do not monetize demographic files, trade identifiers, or incorporate promotional monetization overlays."
      },
      icon: Heart,
      color: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
      details: {
        vi: [
          "Chúng tôi được tài trợ bởi các quỹ phát triển công nghệ nguồn mở vì lợi ích số cộng đồng toàn cầu.",
          "Sản phẩm cung cấp miễn phí vĩnh viễn cho người dùng cá nhân (Holders) trên toàn thế giới.",
          "Mọi nguồn tài nguyên lập trình viên cung cấp đều phục vụ cho việc phổ cập kiến thức xã hội số."
        ],
        en: [
          "Funded exclusively globally by foundations advancing software utilities as critical public infrastructure.",
          "Our software packages are free for individual consumer (Holder) integration paths globally.",
          "We measure success based on active knowledge-sharing standards rather than commercial valuation metrics."
        ]
      }
    },
    {
      id: 'ps-5',
      num: 5,
      category: 'collection',
      title: {
        vi: "Kiến trúc Lưu trữ Cục bộ Ưu tiên (Local-first)",
        en: "Local-First Storage Architecture"
      },
      desc: {
        vi: "Toàn bộ thông tin ví, khóa mật mã và chứng chỉ Verifiable Credential được mã hóa an toàn và chỉ lưu trữ trực tiếp trên phần cứng máy khách của chính người dùng.",
        en: "Your absolute private keys, master seeds, and certificates are securely encrypted and reside solely on the physical microchips of your personal device."
      },
      icon: Database,
      color: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
      details: {
        vi: [
          "Mã hóa đối xứng AES-256 GCM chuẩn quân đội bảo vệ toàn bộ tệp dữ liệu ví cục bộ.",
          "Kết hợp kiểm soát quyền truy cập sinh trắc học FaceID/Vân tay thông qua API của hệ điều hành di động.",
          "Hệ thống không tự ý đồng bộ tệp dữ liệu nhạy cảm này lên bất kỳ đám mây iCloud hay Google Drive nào."
        ],
        en: [
          "Military-grade standard AES-256 GCM symmetrical encryption guards your data layers directly on disk.",
          "Integrated strictly with local device biometric controls (FaceID/Passcode) via operating system hardware bridges.",
          "Identra never synchronizes raw backups automatically with storage drives like iCloud or Google Cloud."
        ]
      }
    },
    {
      id: 'ps-6',
      num: 6,
      category: 'collection',
      title: {
        vi: "Cơ chế Chủ động Chia sẻ Dữ liệu (Holder-Driven)",
        en: "Autonomous Data Sharing Framework"
      },
      desc: {
        vi: "Việc chia sẻ bất kỳ chi tiết thông tin nào chỉ được kích hoạt khi có sự đồng ý tường minh từ chính bạn thông qua hoạt động quét mã hoặc phê duyệt trực tiếp trên màn hình ví.",
        en: "The transmission of custom attributes only commences when you trigger explicit confirmation via scanning and approval prompts."
      },
      icon: Share2,
      color: "bg-indigo-500/10 text-indigo-650 dark:bg-indigo-500/20 dark:text-indigo-400",
      details: {
        vi: [
          "Không hỗ trợ tính năng truy vấn ngầm hay kiểm tra thuộc tính thẻ tự động từ xa mà người dùng không biết.",
          "Sau khi chia sẻ, bên đối soát (Verifier) chỉ nhận chứng chỉ ký số, không giữ lại liên kết trực tiếp tới ví gốc.",
          "Áp dụng triệt để Zero-Knowledge Proofs để ẩn giấu dữ liệu gốc khi kiểm thử các điều kiện logic."
        ],
        en: [
          "Absolutely no background transmissions or remote automated diagnostics can analyze your wallet content.",
          "Once presented, asking verifiers receive structured, untrackable certificates without persisting real device tags.",
          "Zero-Knowledge protocols enable age-checks and financial range claims without sharing exact date values."
        ]
      }
    },
    {
      id: 'ps-7',
      num: 7,
      category: 'control',
      title: {
        vi: "Bảo mật Tối cao dựa trên Chip Phần cứng",
        en: "Hardware-Level Cryptography Control"
      },
      desc: {
        vi: "Bảo vệ cặp khóa chính bằng cách lưu trữ các tham số nhạy cảm trong phân vùng tách biệt của phần cứng di động chuyên biệt, không cho phép phần mềm can thiệp thô.",
        en: "Secure key generation and encryption steps execute inside the device's isolated hardware compartment (Secure Enclave / Keystore)."
      },
      icon: Lock,
      color: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
      details: {
        vi: [
          "Khóa riêng tư (Private Key) được tạo lập ngẫu nhiên và bảo vệ bên trong chip bảo mật phần cứng.",
          "Không một ứng dụng thứ ba nào (bao gồm cả virus hay phần mềm gián điệp) có khả năng trích xuất mã khóa này.",
          "Mức độ bảo mật tương đương với hạ tầng ứng dụng ví tài chính tiền mã hóa phi tập trung của ngân hàng."
        ],
        en: [
          "Private keys are safely created using on-chip TRNG sources and held in isolated internal logic gates.",
          "It is mathematically impossible for other third-party software applications to scrape your hardware seeds.",
          "Security parameters follow the ultimate standard profiles used in high-grade bank vaults."
        ]
      }
    },
    {
      id: 'ps-8',
      num: 8,
      category: 'control',
      title: {
        vi: "Quyền Định danh Tự chủ Tuyệt đối",
        en: "Absolute Digital Sovereign Rights"
      },
      desc: {
        vi: "Người dùng có quyền can thiệp trọn vẹn vào lịch sử, thu hồi, sao lưu hay xóa bỏ vĩnh viễn định danh cá nhân mà không cần xin phép bất kỳ máy chủ điều phối nào.",
        en: "You maintain sovereign jurisdiction over your records, with total freedom to burn, export, or revoke your digital IDs instantly."
      },
      icon: User,
      color: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
      details: {
        vi: [
          "Dễ dàng xuất toàn bộ tệp dữ liệu chuẩn Verifiable Credential của bạn sang ứng dụng lưu trữ tương thích khác.",
          "Tính năng 'Xóa ví vĩnh viễn' sẽ giải phóng bộ nhớ và hủy sạch khóa cục bộ trên thiết bị ngay lập tức.",
          "Không bị ràng buộc hay khóa trói bởi một nhà phát triển phần mềm duy nhất (Zero Vendor Lock-in)."
        ],
        en: [
          "Instantly export your certificates in standard JSON-LD structures to secondary standards-compliant app vaults.",
          "Invoking the 'Factory Reset Wallet' securely sweeps all local storage indexes and wipes hardware registers.",
          "Absolute freedom from corporate ecosystems, preventing cloud dependencies or ecosystem lock-ins."
        ]
      }
    },
    {
      id: 'ps-9',
      num: 9,
      category: 'project',
      title: {
        vi: "Hạ tầng Bên thứ ba An toàn tuyệt đối",
        en: "Compliant Third-party Operations"
      },
      desc: {
        vi: "Identra lưu trữ trang web tĩnh và phân phối bản tải ví thông qua các mạng phân phối an toàn (như GitHub, Cloudflare), cam kết không truyền bất ngờ dữ liệu định danh.",
        en: "Identra serves standard Web static files and stores open releases through top-tier decentralized network infrastructures."
      },
      icon: Cloud,
      color: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400",
      details: {
        vi: [
          "Toàn bộ liên kết truyền tải tệp tĩnh được bảo vệ mã hóa HTTPS/TLS 1.3 nghiêm ngặt.",
          "Chúng tôi không sử dụng các dịch vụ thu thập hành vi người dùng (SDK Analytics thương mại) của bên thứ ba.",
          "Mọi kết nối kiểm tra cập nhật mới nhất chỉ lấy dữ liệu tĩnh là số phiên bản phát hành công khai."
        ],
        en: [
          "All web assets and bundle packages serve strictly via secured HTTPS/TLS 1.3 cryptographical channels.",
          "We discard marketing-based analytical platforms or external behavior-scraping JavaScript snippets.",
          "Checking for new updates only requests plain static text containing public software version tag indices."
        ]
      }
    },
    {
      id: 'ps-10',
      num: 10,
      category: 'project',
      title: {
        vi: "Quy trình Cập nhật Chính sách Riêng tư",
        en: "Transparent Policy Updates"
      },
      desc: {
        vi: "Trong tương lai, nếu có sự phát triển giải thuật hoặc tiêu chuẩn W3C mới, tài liệu này sẽ được bổ sung minh bạch trực tiếp trên kho lưu trữ mã nguồn chung.",
        en: "If W3C schemas or cryptographic standards shift, revisions will be published openly directly inside our version control logs."
      },
      icon: RefreshCw,
      color: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      details: {
        vi: [
          "Mọi phiên bản cập nhật sẽ được lưu vết lịch sử công khai trên hệ thống kiểm soát mã nguồn Git.",
          "Chúng tôi không thu thập thông tin liên hệ của bạn nên sẽ không gửi email thông báo gián đoạn phiền hà.",
          "Cấp bản chứng minh toán học chống giả mạo cho từng tệp cập nhật chính sách từ máy chủ."
        ],
        en: [
          "All updates retain public change histories accessible permanently inside the open Git repository.",
          "Because we do not catalog your email logs, we never push spam alerts or tracking notification prompts.",
          "Each policy release commits cryptographically onto our decentralized hosting directory."
        ]
      }
    }
  ];

  // Dynamic Filtering Logic
  const filteredPolicy = policySections.filter(item => {
    const titleText = isVi ? item.title.vi : item.title.en;
    const descText = isVi ? item.desc.vi : item.desc.en;
    const detailsText = isVi ? item.details.vi.join(' ') : item.details.en.join(' ');
    
    const matchesSearch = titleText.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          descText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          detailsText.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (id: number) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="bg-[#F7F8FC] dark:bg-[#0B0F1A] min-h-screen text-slate-900 dark:text-slate-100 font-sans antialiased pb-20 transition-colors duration-300">
      
      {/* 1. HERO HEADER SECTION (Aesthetic mirroring of AboutSubpage's and FaqSubpage's arrangement) */}
      <section className="py-16 pt-8 lg:pt-12 bg-gradient-to-b from-white dark:from-[#0F172A]/45 via-white dark:via-[#0F172A]/10 to-[#F7F8FC] dark:to-[#0B0F1A] border-b border-[#E5E7EB] dark:border-slate-800/80 px-6 lg:px-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation Bar */}
          <div className="mb-6 text-left border-none bg-transparent">
            <motion.button
              whileHover={{ x: -4 }}
              onClick={onBack}
              className="-ml-3 inline-flex min-h-9 items-center gap-2 rounded-xl px-3 py-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[2.25] text-xs font-bold text-[#5B6CFF] dark:text-[#7C8CFF] hover:text-[#4A5AF0] dark:hover:text-[#6b7bff] transition-colors cursor-pointer group bg-transparent border-none"
            >
              <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
              <span>{isVi ? "Quay lại Trang chủ" : "Back to Home"}</span>
            </motion.button>
          </div>

          <div className="relative text-left">
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-12">
              
              {/* Left Column: Strategic Slogan, Title, Subheading & Quick Search */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/8 px-3.5 py-1.5 rounded-full border border-[#5B6CFF]/10">
                  <Shield className="w-3.5 h-3.5 mr-0.5" />
                  <span>{isVi ? "HIẾN CHƯƠNG QUYỀN RIÊNG TƯ DỮ LIỆU" : "DATA PRIVACY SOVEREIGNTY"}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {isVi ? 'Chính sách bảo mật' : 'Core Sovereign'}
                  <span className="bg-gradient-to-r from-[#5B6CFF] to-[#8F9BFF] dark:from-[#7C8CFF] dark:to-[#8F9BFF] bg-clip-text text-transparent ml-2">
                    {isVi ? 'tối thượng' : 'Privacy Code'}
                  </span>
                </h1>

                <p className="text-base text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl font-normal">
                  {isVi 
                    ? 'Identra được xây dựng trên triết lý Không thu thập dữ liệu cá nhân. Toàn bộ thông tin định danh và khóa mật mã được lưu trữ cục bộ, bảo mật tuyệt đối trên thiết bị của bạn.'
                    : 'A transparent framework securing user identities from surveillance. Absolute zero database integrations, military-grade client keys, and 100% open-source software execution.'
                  }
                </p>

                {/* Streamlined Live Interactive Search Bar identical to FAQ */}
                <div className="relative w-full max-w-2xl group pt-2 transition-all">
                  <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-550">
                    <Search className="w-5 h-5 text-[#5B6CFF] dark:text-[#7C8CFF]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isVi ? "Tìm chi tiết: không thu dữ liệu, khóa cục bộ, mã nguồn mở..." : "Filter privacy terms: zero logs, Secure Enclave, MIT, local..."}
                    className="w-full pl-12 pr-16 py-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-gray-150 dark:border-slate-800 text-sm md:text-base text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B6CFF]/20 focus:border-[#5B6CFF] transition-all duration-300 shadow-xs placeholder-slate-400 dark:placeholder-slate-500 font-normal"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-[#5B6CFF] dark:text-[#7C8CFF] hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none"
                    >
                      {isVi ? "Xóa" : "Clear"}
                    </button>
                  )}
                </div>

                {/* Popular Keywords search suggestions */}
                <div className="flex flex-wrap items-center gap-2 pt-1.5 text-xs text-slate-450 dark:text-slate-550">
                  <span className="font-semibold">{isVi ? "Từ khóa bảo mật:" : "Privacy keys:"}</span>
                  {['Không thu thập', 'AES-256', 'Secure Enclave', 'Mã nguồn mở', 'MIT License'].map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => setSearchQuery(keyword)}
                      className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border border-gray-150 dark:border-slate-800/80 transition-all font-mono text-[10px] text-slate-600 dark:text-slate-400 cursor-pointer"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Sovereign Trust Status Board (Matches FAQ and About aesthetic completely) */}
              <div 
                className="subpage-hero-visual w-full max-w-[30rem] mx-auto lg:col-span-5 lg:justify-self-end relative group rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-900/90 border border-gray-150 dark:border-slate-800/80 shadow-xs hover:shadow-sm transition-all"
              >
                <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  <span className="text-[10.5px] font-bold uppercase tracking-wider">{isVi ? "Tuyệt đối an toàn" : "Zero-Storage"}</span>
                </div>

                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-[#5B6CFF]/10 text-[#5B6CFF] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-xs.5 font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF]">
                      {isVi ? "CHỈ SỐ TIN CẬY" : "PRIVACY COVENANTS"}
                    </h4>
                    <p className="text-[11px] text-slate-450 dark:text-slate-550 font-medium">
                      Decentralized Client Audit Node
                    </p>
                  </div>
                </div>

                {/* Audit points list */}
                <div className="space-y-3.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-800/40">
                    <span className="text-slate-450">{isVi ? "Dữ liệu máy chủ" : "Cloud Storage Volume"}</span>
                    <span className="font-bold text-slate-800 dark:text-white">0.00 Bytes (None)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-800/40">
                    <span className="text-slate-450">{isVi ? "Cookie Theo dõi" : "Tracking Pixels"}</span>
                    <span className="font-bold text-rose-500 dark:text-rose-400 flex items-center gap-1">
                      <EyeOff className="w-3.5 h-3.5" /> {isVi ? "Đã tắt hoàn toàn" : "Completely Disabled"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-800/40">
                    <span className="text-slate-450">{isVi ? "Bảo mật khóa" : "Local Master Keys"}</span>
                    <span className="font-bold text-slate-800 dark:text-white">Hardware AES-256 GCM</span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-slate-450">{isVi ? "Cơ chế đồng thuật" : "Trust Validation"}</span>
                    <span className="font-bold text-[#5B6CFF] dark:text-[#7C8CFF] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> 100% P2P Handshakes
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-sans text-slate-450 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{isVi ? "Cập nhật chính sách" : "Policy Revision"}</span>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-350">{isVi ? "01/05/2025" : "v1.0 Standard"}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA (Harmonized structural layout matching AboutSubpage/FaqSubpage exactly) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Navigation Pillar: Clean vertical sticky categories */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="p-1 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-gray-150 dark:border-slate-800/60">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-4 py-2 block">
                {isVi ? "MỤC LỤC CHÍNH SÁCH" : "SECURITY PROVISIONS"}
              </span>
              
              <div className="space-y-1">
                {categories.map((cat) => {
                  const CatIcon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id as any);
                        setExpandedSection(null);
                      }}
                      className="w-full text-left p-3.5 rounded-xl transition-all duration-300 flex items-start gap-3.5 group cursor-pointer border-none bg-transparent"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive 
                          ? 'bg-[#5B6CFF] text-white shadow-xs' 
                          : 'bg-white dark:bg-slate-900 text-slate-450 dark:text-slate-450 group-hover:bg-slate-200 dark:group-hover:bg-slate-800/80 group-hover:text-slate-800 dark:group-hover:text-white'
                      }`}>
                        <CatIcon className="w-4.5 h-4.5" />
                      </div>
                      
                      <div className="space-y-0.5">
                        <div className={`text-xs.5 sm:text-sm font-bold transition-all ${
                          isActive 
                            ? 'text-[#5B6CFF] dark:text-[#7C8CFF]' 
                            : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white'
                        }`}>
                          {isVi ? cat.vi : cat.en}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 font-normal leading-tight">
                          {isVi ? cat.desc.vi : cat.desc.en}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Audit Helper Tech Card on bottom Left */}
            <div className="p-5 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/20 text-left space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <h4 className="text-xs.5 font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300">
                  {isVi ? "Tự chủ Tuyệt đối?" : "Verifiable Proofs?"}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed font-normal">
                {isVi 
                  ? "Xép loại chính sách về bảo mật của chúng tôi hoạt động song hành cùng mã nguồn được biên dịch công khai 100% trên GitHub."
                  : "Every statement mentioned in this policy can be verified structurally by auditing local storage partitions in our developer sandbox."}
              </p>
              {onOpenDemo && (
                <button 
                  onClick={onOpenDemo}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5B6CFF] hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  <span>{isVi ? "Thử nghiệm lưu trữ Sandbox →" : "Audit via Sandbox storage →"}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Accordion Side: Interactive answers */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] dark:border-slate-800/50 mb-6">
              <div className="text-left">
                <h3 className="text-xs.5 font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {isVi ? "CHI TIẾT HIẾN CHƯƠNG BẢO MẬT" : "SOVEREIGN LAWS"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-450">
                  {isVi 
                    ? `Hiển thị ${filteredPolicy.length} điều khoản bảo vệ` 
                    : `Showing ${filteredPolicy.length} active clauses`
                  }
                </p>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-[#5B6CFF] hover:underline bg-transparent border-none cursor-pointer"
                >
                  {isVi ? "Đặt lại bộ lọc" : "Reset filters"}
                </button>
              )}
            </div>

            <AnimatePresence initial={false}>
              {filteredPolicy.length > 0 ? (
                filteredPolicy.map((item, index) => {
                  const isOpen = expandedSection === item.num;
                  const titleText = isVi ? item.title.vi : item.title.en;
                  const descText = isVi ? item.desc.vi : item.desc.en;
                  const detailsList = isVi ? item.details.vi : item.details.en;
                  
                  return (
                    <motion.div
                      layout
                      key={item.id}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white dark:bg-slate-900/60 ${
                        isOpen 
                          ? 'border-[#5B6CFF] dark:border-[#5B6CFF]/80 shadow-xs' 
                          : 'border-gray-150 dark:border-slate-800 hover:border-[#5B6CFF]/20 dark:hover:border-[#7C8CFF]/20'
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(item.num)}
                        className="w-full px-5 py-4.5 flex items-center justify-between text-left font-bold text-slate-900 dark:text-white hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-colors cursor-pointer gap-4 text-sm sm:text-base bg-transparent border-none"
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Numbered index styling */}
                          <div className={`w-6.5 h-6.5 rounded-lg text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            isOpen 
                              ? 'bg-[#5B6CFF] text-white' 
                              : 'bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400'
                          }`}>
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <span className="leading-snug">{titleText}</span>
                        </div>
                        <span className={`p-1 rounded-lg transition-transform duration-300 shrink-0 ${
                          isOpen ? 'bg-[#5B6CFF]/10 text-[#5B6CFF] rotate-180' : 'bg-slate-100 dark:bg-slate-850 text-[#6B7280]'
                        }`}>
                          <ChevronRight className="w-4 h-4 rotate-90" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-5 pb-5 pt-2 text-xs.5 sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-gray-50 dark:border-slate-800/40 font-normal">
                              <p className="mb-4 text-slate-700 dark:text-slate-300 font-medium">
                                {descText}
                              </p>
                              
                              {/* Detailed checklist points */}
                              <div className="space-y-2 mt-3 bg-slate-50/50 dark:bg-slate-950/30 p-4 rounded-xl border border-gray-150/40 dark:border-slate-850/60">
                                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500 block mb-1">
                                  {isVi ? "Các điều mục kiểm toán độc lập:" : "Specific compliance items:"}
                                </span>
                                {detailsList.map((pt, pIdx) => (
                                  <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{pt}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-4 pt-3 border-t border-dashed border-gray-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                                <span className="text-[11px] text-slate-450 dark:text-slate-500 italic">
                                  {isVi ? `Mục: ${categories.find(c => c.id === item.category)?.vi}` : `Domain: ${categories.find(c => c.id === item.category)?.en}`}
                                </span>
                                {onOpenDemo && (
                                  <button
                                    onClick={onOpenDemo}
                                    className="inline-flex items-center gap-1 text-[#5B6CFF] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer text-[11px]"
                                  >
                                    <span>{isVi ? "Trải nghiệm hộp cát Sandbox" : "Launch developer sandbox"}</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-white dark:bg-slate-900/30 border border-gray-150 dark:border-slate-800 rounded-3xl"
                >
                  <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
                    {isVi ? "Không tìm thấy điều khoản tương ứng" : "No matching clauses found"}
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed font-normal">
                    {isVi 
                      ? "Hãy thử tìm kiếm với các từ khóa ngắn gọn hơn như 'cục bộ', 'mã nguồn', 'chữ ký' hoặc đặt lại bộ lọc danh mục bên trái."
                      : "Try checking with other single terms like 'local', 'enclave', 'open source', or reset the category parameters."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* 3. EXPERIENCE STANDBOX CALL TO ACTION (Preserving exact visual sync) */}
        <div className="max-w-7xl mx-auto py-12 mt-12 text-center">
          <div className="bg-[#3B52FF]/5 dark:bg-[#3B52FF]/10 rounded-3xl p-8 border border-[#3B52FF]/10 max-w-4xl mx-auto space-y-4">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#3B52FF] dark:text-[#7C8CFF] block">
              {isVi ? "KỶ NGUYÊN ĐỊNH DANH SỐ TỰ CHỦ" : "SOVEREIGN PERSONAL STORAGE"}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isVi ? "Kiểm tra thực tế các tuyên bố bảo mật?" : "Verify our privacy code in realtime?"}
            </h2>
            <p className="text-xs sm:text-xs.5 text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
              {isVi 
                ? "Bên cạnh tài liệu chính sách tĩnh, hãy mở trực tiếp ứng dụng ví giả lập (Sandbox) để quan sát các tệp lưu trữ cục bộ, cặp khóa chữ ký DID và các phép tính ZKP toán học."
                : "Launch our interactive sandbox playground to check how DID seeds, local cookies, and Zero-Knowledge equations calculate completely on your client-side window."}
            </p>
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenDemo}
                className="px-6 py-3 rounded-full bg-[#3B52FF] hover:bg-[#2A41EE] text-white font-bold text-xs.5 tracking-wide shadow-xs hover:shadow-md transition-all cursor-pointer border-none"
              >
                {isVi ? "Mở Ví Sandbox Ngay →" : "Launch Wallet Sandbox →"}
              </motion.button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
