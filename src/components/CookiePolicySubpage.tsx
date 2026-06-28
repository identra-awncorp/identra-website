import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Cookie, 
  Info, 
  Sliders, 
  Database, 
  EyeOff, 
  Clock, 
  RefreshCw, 
  Mail, 
  ChevronRight,
  Shield,
  HelpCircle,
  FileText,
  Search,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Settings
} from 'lucide-react';

interface CookiePolicySubpageProps {
  lang: 'vi' | 'en';
  onBack: () => void;
  onNavigate?: (page: string) => void;
  onOpenDemo?: () => void;
}

interface CookieSection {
  id: string;
  num: number;
  category: 'essential' | 'tracking' | 'control' | 'general';
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

export default function CookiePolicySubpage({ lang, onBack, onNavigate, onOpenDemo }: CookiePolicySubpageProps) {
  const isVi = lang === 'vi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'essential' | 'tracking' | 'control' | 'general'>('all');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const categories = [
    { id: 'all', vi: 'Tất cả chính sách', en: 'All Storage Rules', icon: Cookie, desc: { vi: 'Toàn bộ mô hình lưu giữ số', en: 'View all localized storage specs' } },
    { id: 'essential', vi: 'Thiết yếu cục bộ', en: 'Essential Sessions', icon: Database, desc: { vi: 'Các tệp duy trì trạng thái của ví', en: 'Required functional client keys' } },
    { id: 'tracking', vi: 'Nói không với theo vết', en: 'Anti-Tracking Standards', icon: EyeOff, desc: { vi: 'Không pixel, không quảng cáo bám đuôi', en: 'Zero trackers & marketing logs' } },
    { id: 'control', vi: 'Tẩy xóa & Tự quản', en: 'Sovereign Control', icon: Sliders, desc: { vi: 'Bộ nhớ cục bộ và cách xóa thủ công', en: 'Wipe settings & inspect keys' } }
  ];

  const cookieSections: CookieSection[] = [
    {
      id: 'ck-1',
      num: 1,
      category: 'essential',
      title: {
        vi: "Đồng thuận kỹ thuật tối giản",
        en: "Minimalist Technical Storage Consent"
      },
      desc: {
        vi: "Identra chỉ lưu trữ các tham số cấu hình, trạng thái phiên làm việc cục bộ trực tiếp trên trình duyệt của bạn nhằm đảm bảo app hoạt động an toàn. Chúng tôi không bao giờ nạp tệp hay lưu hồ sơ của bạn lên máy chủ trung tâm.",
        en: "Identra targets only functional client state keys necessary for safe platform navigations. We enforce strict decentralized boundaries, preventing profile creation or telemetry collection."
      },
      icon: ShieldCheck,
      color: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
      details: {
        vi: [
          "Hiệu lực bắt đầu ngay khi bạn khởi động ví giả lập hoặc liên minh phát triển.",
          "Không tích hợp cơ chế lưu vết trung gian ngoài cấu trúc định danh do chính bạn nắm giữ.",
          "Tuyệt đối không sử dụng tệp ẩn hay cookies trung gian trên hệ thống."
        ],
        en: [
          "Valid immediately upon launching the simulator workspace or native client components.",
          "Transmits absolutely zero metadata logs outside of standard signed JSON-LD configurations.",
          "Completely abstains from aggregating cross-site visitor cookies through server registries."
        ]
      }
    },
    {
      id: 'ck-2',
      num: 2,
      category: 'essential',
      title: {
        vi: "Lưu giữ trong Safe Enclave & LocalStorage",
        en: "LocalStorage & Hardware Compartments"
      },
      desc: {
        vi: "Thay vì sử dụng cookies truyền thống gửi dữ liệu lên đám mây, Identra sử dụng LocalStorage và SessionStorage - các phương thức lưu trữ an toàn, trực quan được đặt hoàn toàn trong lòng ổ cứng thiết bị của bạn.",
        en: "Instead of traditional cloud cookies, Identra defaults to client-side LocalStorage and SessionStorage systems residing directly within your browser client sandbox or mobile hardware partitioned storage."
      },
      icon: Database,
      color: "bg-[#5B6CFF]/10 text-[#5B6CFF] dark:bg-[#5B6CFF]/20 dark:text-[#7C8CFF]",
      details: {
        vi: [
          "Mô hình lưu giữ cặp khóa-trị (Key-Value) chuẩn W3C ngay trong phân vùng ẩn của trình duyệt.",
          "Được bảo mật nghiêm ngặt chống lại việc rò rỉ thông tin sang ứng dụng trung gian khác.",
          "Dữ liệu không bao giờ rời khỏi tầm kiểm soát vật lý của bạn nếu không được bạn quét mã chia sẻ."
        ],
        en: [
          "Encodes simple W3C key-val pairs stored locally in your browser sandbox memory space.",
          "Secured natively by the browser against scrapers or cross-origin request attempts.",
          "Strict data boundaries ensuring keys never escape your physical machine environment."
        ]
      }
    },
    {
      id: 'ck-3',
      num: 3,
      category: 'essential',
      title: {
        vi: "Ghi nhớ cấu hình Ngôn ngữ giao diện",
        en: "Language Preference Retention"
      },
      desc: {
        vi: "Hệ thống ghi nhận tùy chọn ngôn ngữ hiển thị (Bao gồm Tiếng Việt và Tiếng Anh) nhằm mang lại cảm giác nhất quán giữa các trang, giúp bạn không phải thiết đặt lại ở lần truy cập tiếp theo.",
        en: "This records your selected interface language preference (Vietnamese / English) to retain your visual settings across components without requiring recurrent configuration changes."
      },
      icon: Sliders,
      color: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
      details: {
        vi: [
          "Lưu giữ một trường khóa chuỗi kí tự 'lang' siêu nhẹ với giá trị 'vi' hoặc 'en' cực kỳ an toàn.",
          "Thời gian tồn tại vĩnh viễn trên ổ cứng cá nhân trừ khi bạn chủ động thao tác xóa bộ nhớ ứng dụng.",
          "Hoàn toàn không thu thập thông tin về địa điểm thực tế của thiết bị."
        ],
        en: [
          "Stores a quick visual string attribute ('lang' with values 'vi' or 'en') natively.",
          "Undergoes no automatic expiration cycles unless you command a local cookie cleanup.",
          "Independent of tracking systems, browser history catalogs, or geographic GPS metadata."
        ]
      }
    },
    {
      id: 'ck-4',
      num: 4,
      category: 'essential',
      title: {
        vi: "Tùy chọn hiển thị Giao diện Sáng/Tối (Light/Dark)",
        en: "Theme Configurations (Light/Dark Mode)"
      },
      desc: {
        vi: "Cung cấp độ tương phản an toàn cho thị lực bằng cách lưu lại thiết lập giao diện Sáng hoặc Tối mà bạn đã bấm chọn, tối ưu hóa hiển thị dựa trên cảm quan môi trường.",
        en: "Safeguards visual comfort by retaining your custom choices for Light or Dark visual theme settings based on your preferred workspace look and feel."
      },
      icon: Settings,
      color: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
      details: {
        vi: [
          "Lưu giữ một trường trạng thái đơn giản 'dark' hoặc 'light' trong cấu hình cục bộ.",
          "Thời gian nạp tệp nhỏ hơn một phần triệu giây, triệt tiêu hiện tượng nhấp nháy màn hình.",
          "Mã hóa kỹ thuật số tối giản theo tiêu chuẩn thiết kế an toàn dòng mã."
        ],
        en: [
          "Maintains simple 'dark' or 'light' tags on your local workstation's storage directory.",
          "Loads in milliseconds, preventing distracting page flicker transitions when changing pages.",
          "Stays bounded inside your terminal container without external server calls."
        ]
      }
    },
    {
      id: 'ck-5',
      num: 5,
      category: 'tracking',
      title: {
        vi: "Từ chối tuyệt đối mã Pixel bám đuổi & Analytics",
        en: "100% Ban on Analytical Pixels & Retargeting"
      },
      desc: {
        vi: "Cam kết tối thượng của chúng tôi: Identra nói không với các SDK phân tích hành vi thương mại (như Google Analytics, Facebook Pixel, Hotjar). Thói quen duyệt web của bạn là bất xâm phạm.",
        en: "Our paramount commitment: Identra completely disables analytical scripts, search cookies, or marketing pixel trackers (such as Google Analytics or Facebook beacons)."
      },
      icon: EyeOff,
      color: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
      details: {
        vi: [
          "Không ghi nhận bản đồ nhiệt (Heatmaps), cử động chuột hay hành vi bấm nút của bạn.",
          "Tuyệt đối ngắt bỏ và không truyền dữ liệu cho các đại lý quảng cáo bên ngoài hoặc bên thứ ba.",
          "Mã nguồn phân phối tĩnh 100% minh bạch công khai trên kho lưu trữ cộng đồng."
        ],
        en: [
          "Zero records of click-streams, session heatmaps, or user mouse configurations.",
          "Zero telemetry plugins transmitting tracking variables to corporate advertisement partners.",
          "Core scripts serve natively and are fully auditable through open Git records."
        ]
      }
    },
    {
      id: 'ck-6',
      num: 6,
      category: 'essential',
      title: {
        vi: "Trạng thái phiên làm việc của phần mềm Ví SSI",
        en: "Ephemeral States for Sandbox Wallet Simulations"
      },
      desc: {
        vi: "Khi thử nghiệm ví giả lập trực quan (Sandbox), hệ thống sử dụng Session Storage tích hợp nhằm điều khiển tạm thời cặp khóa, lịch sử tệp chữ ký số và kết quả toán học.",
        en: "When testing our interactive Identra Simulator Wallet, local memory keys are temporarily set in Session Storage to manage DID generation and cryptographic signatures."
      },
      icon: Cookie,
      color: "bg-indigo-500/10 text-indigo-650 dark:bg-indigo-500/20 dark:text-indigo-400",
      details: {
        vi: [
          "Nạp các phép tính chứng minh phi tri thức (ZKP) trực tiếp trên trình duyệt của bạn.",
          "Khóa giả lập phiên (Session Key) tự giải phóng và hủy vĩnh viễn ngay khi bạn tắt tab trình duyệt.",
          "Không phân luồng dữ liệu ví về bất kỳ đám mây tập trung nào."
        ],
        en: [
          "Processes computational Zero-Knowledge math equations directly inside candidate browser frames.",
          "Grants safe sandbox environments that wipe private variables instantly when browser tab is closed.",
          "No seed mnemonics or certificates are mirrored to corporate data servers."
        ]
      }
    },
    {
      id: 'ck-7',
      num: 7,
      category: 'control',
      title: {
        vi: "Cách ly tối thượng và Mã hóa khóa đối xứng",
        en: "Military-Grade Symmetrical Encryption"
      },
      desc: {
        vi: "Các cặp khóa hạt giống sinh ra trong ví (Private Keys, DID Seeds) được mã hóa bằng chuẩn AES-GCM 256-bit cực mạnh trước khi lưu vào phân vùng bảo vệ cục bộ.",
        en: "Private client keys and structural DID seeds originate inside highly secure sandboxes, protected under AES-256 symmetrical cryptographic standards before reaching browsers."
      },
      icon: Shield,
      color: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
      details: {
        vi: [
          "Khai thác API WebCrypto tiêu chuẩn được bảo hộ trực tiếp bởi nhân hệ điều hành.",
          "Mỗi thiết bị tự cô lập dữ liệu tệp, ngăn ngừa rò rỉ chéo do mã độc hay cookie mở rộng.",
          "Mật mã mở khóa do chỉ một mình bạn tạo ra và ghi nhớ."
        ],
        en: [
          "Utilizes standard native WebCrypto engine APIs embedded deep inside safe browser cores.",
          "Isolates parameters preventing cross-origin scraping by other active browser plug-ins.",
          "The user continues as the unique entity tasked with memorizing local master passwords."
        ]
      }
    },
    {
      id: 'ck-8',
      num: 8,
      category: 'control',
      title: {
        vi: "Thời hạn tồn tại và Hủy bộ nhớ mặc định",
        en: "Storage Lifespans & Clean Reboots"
      },
      desc: {
        vi: "Các tệp được phân vùng thời hạn rõ rệt: tệp năng động của ví giả định biến mất tức khắc khi tắt máy, tệp tùy chọn cài đặt ngôn ngữ được giữ để hiển thị hữu ích lâu dài.",
        en: "Technical records maintain distinct lifetimes: session indicators vanish the microsecond you quit active windows, whereas display preferences stay to avoid annoying visual resets."
      },
      icon: Clock,
      color: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      details: {
        vi: [
          "Session Storage thu hồi RAM máy chủ của chính bạn ngay khi thoát ứng dụng.",
          "Local Storage bảo lưu thuận tiện tệp tùy chọn giao diện giữa các lượt truy cập.",
          "Tích hợp nút dọn dẹp cấp tốc toàn diện bộ nhớ bất cứ lúc nào."
        ],
        en: [
          "Session Storage releases allocated RAM registers immediately upon connection terminations.",
          "Local Storage retains simple styling components (Language, Dark Mode) to keep views consistent.",
          "Built-in manual wipe triggers are built into our sandbox UI for simplified system resets."
        ]
      }
    },
    {
      id: 'ck-9',
      num: 9,
      category: 'control',
      title: {
        vi: "Kiểm tra và Xóa bỏ thủ công qua Trình duyệt",
        en: "Manual Inspection & Cookie Clearance Paths"
      },
      desc: {
        vi: "Quyền tự giác là của bạn. Bất luận lúc nào, bạn cũng có thể mở trực tiếp bảng phát triển (Developer Console) của trình duyệt để kiểm kê và tự tay xóa sạch mọi thông số lưu trữ.",
        en: "You maintain sovereign control. At any point, developers can launch native browser inspect modules to explore, modify, or forcefully eliminate all Identra variables on disk."
      },
      icon: RefreshCw,
      color: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400",
      details: {
        vi: [
          "Nhấn phím F12 (hoặc chuột phải chọn 'Kiểm tra tệp/Inspect') trên tab trình duyệt.",
          "Chuyển qua mục máy khách 'Ứng dụng' (Application) -> chọn 'Lưu trữ cục bộ' (LocalStorage).",
          "Bấm chọn địa chỉ tên miền của Identra và click chuỗi 'Clear All' để phục hồi bộ nhớ nguyên sơ."
        ],
        en: [
          "Press hotkey F12 or right-click to choose current inspection paths inside active browser screens.",
          "Direct cursor focus onto the 'Application' settings, open 'Storage', then expand 'LocalStorage'.",
          "Identify and highlight candidate domains, and trigger 'Clear All' to wipe items instantly."
        ]
      }
    },
    {
      id: 'ck-10',
      num: 10,
      category: 'general',
      title: {
        vi: "Liên hệ đóng góp ý kiến về chính sách lưu trữ",
        en: "Sovereign Privacy Feedback & Audit Paths"
      },
      desc: {
        vi: "Chúng tôi luôn lắng nghe cộng đồng. Nếu bạn dò quét thấy bất kỳ dòng mã nào lưu trữ hoặc rò rỉ dấu vết dữ liệu trái với tôn chỉ tối giản này, hãy gửi phản hồi cấp tốc cho chúng tôi.",
        en: "We co-operate closely with compliance teams. If developers identify any script logging metrics violating our privacy charter, notify us immediately via official community rooms."
      },
      icon: Mail,
      color: "bg-[#3B52FF]/10 text-[#3B52FF] dark:bg-[#3B52FF]/20 dark:text-[#7C8CFF]",
      details: {
        vi: [
          "Báo cáo hoặc đóng góp mã nguồn (Pull Request) ngay trên GitHub mã nguồn mở.",
          "Trao đổi kỹ thuật với ban mật mã học qua diễn đàn an toàn của cộng đồng.",
          "Đóng góp các giải pháp tinh giản hóa lưu trữ nhằm giảm tải dung lượng bộ nhớ đệm khách hàng."
        ],
        en: [
          "Construct descriptive PRs or outline concerns transparently under the project's GitHub repo.",
          "Gather immediate diagnostic feedback inside our open Slack / Discord communication boards.",
          "Propose optimal compression paths assisting us in minimizing stored footprints."
        ]
      }
    }
  ];

  const filteredCookies = cookieSections.filter(item => {
    const titleText = isVi ? item.title.vi : item.title.en;
    const descText = isVi ? item.desc.vi : item.desc.en;
    const detailsText = isVi ? item.details.vi.join(' ') : item.details.en.join(' ');
    
    const matchesSearch = titleText.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          descText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          detailsText.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (num: number) => {
    setExpandedSection(expandedSection === num ? null : num);
  };

  return (
    <div className="bg-[#F7F8FC] dark:bg-[#0B0F1A] min-h-screen text-slate-900 dark:text-slate-100 font-sans antialiased pb-20 transition-colors duration-300">
      
      {/* 1. HERO HEADER SECTION (AboutSubpage/FaqSubpage style sync) */}
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
              
              {/* Left Column: Title, Subheading & Quick Search */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/8 px-3.5 py-1.5 rounded-full border border-[#5B6CFF]/10">
                  <Cookie className="w-3.5 h-3.5 mr-0.5" />
                  <span>{isVi ? "CHỈ SỐ LƯU TRỮ KỸ THUẬT" : "MINIMALIST LOCAL FILES CHARTER"}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {isVi ? 'Chính sách Cookie' : 'Sovereign Local'}
                  <span className="bg-gradient-to-r from-[#5B6CFF] to-[#8F9BFF] dark:from-[#7C8CFF] dark:to-[#8F9BFF] bg-clip-text text-transparent ml-2">
                    {isVi ? 'thiết yếu' : 'Cookie Charter'}
                  </span>
                </h1>

                <p className="text-base text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl font-normal">
                  {isVi 
                    ? 'Bộ nhớ thiết bị là không gian tối thượng của bạn. Identra chỉ lưu giữ cấu hình kỹ thuật cục bộ, ngôn ngữ hiển thị và theme mà bạn chọn. Tuyệt đối không tích hợp cookies theo dõi hành vi.'
                    : 'Your computer is your personal sanctuary. Identra stores strictly essential setup variables, theme codes, and UI languages. Zero telemetry arrays or marketing cookies are permitted.'
                  }
                </p>

                {/* Unified Live Interactive Search Bar identical to FAQ */}
                <div className="relative w-full max-w-2xl group pt-2 transition-all">
                  <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-550">
                    <Search className="w-5 h-5 text-[#5B6CFF] dark:text-[#7C8CFF]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isVi ? "Kiểm tra tệp: không pixel, AES-GCM, LocalStorage, F12..." : "Verify cookies: no trackers, AES-GCM, LocalStorage, inspect..."}
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

                {/* Popular Keywords suggestion list */}
                <div className="flex flex-wrap items-center gap-2 pt-1.5 text-xs text-slate-450 dark:text-slate-550">
                  <span className="font-semibold">{isVi ? "Từ khóa tìm nhanh:" : "Popular tags:"}</span>
                  {['LocalStorage', 'Không pixel', 'WebCrypto API', 'Giao diện', 'F12 Inspect'].map((keyword) => (
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

              {/* Right Column: Sovereign Trust Status Board */}
              <div 
                className="subpage-hero-visual w-full max-w-[30rem] mx-auto lg:col-span-5 lg:justify-self-end relative group rounded-3xl p-6 md:p-8 bg-white dark:bg-slate-900/90 border border-gray-150 dark:border-slate-800/80 shadow-xs hover:shadow-sm transition-all"
              >
                <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  <span className="text-[10.5px] font-bold uppercase tracking-wider">{isVi ? "Không bám dấu" : "No analytical cookies"}</span>
                </div>

                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-[#5B6CFF]/10 text-[#5B6CFF] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-xs.5 font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF]">
                      {isVi ? "CHỈ SỐ BỘ NHỚ KHÁCH" : "CLIENT STORAGE DEPLOYMENTS"}
                    </h4>
                    <p className="text-[11px] text-slate-450 dark:text-slate-550 font-medium">
                      Sandbox Cookie Inspection Node
                    </p>
                  </div>
                </div>

                {/* Audit points list */}
                <div className="space-y-3.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-800/40">
                    <span className="text-slate-450">{isVi ? "Vị trí lưu giữ" : "Storage Environment"}</span>
                    <span className="font-bold text-slate-800 dark:text-white">Strict client browsers only</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-800/40">
                    <span className="text-slate-450">{isVi ? "Mã theo dõi hành vi" : "Third-Party Trackers"}</span>
                    <span className="font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                      {isVi ? "Đã triệt tiêu (0)" : "None Detected (0)"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-800/40">
                    <span className="text-slate-450">{isVi ? "Mỹ thuật lưu mật" : "Seed & Key Protection"}</span>
                    <span className="font-bold text-slate-800 dark:text-white">AES-GCM WebCrypto API</span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-slate-450">{isVi ? "Cơ chế dọn bộ nhớ" : "Storage Cleans"}</span>
                    <span className="font-bold text-[#5B6CFF] dark:text-[#7C8CFF] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Integrated browser F12
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-sans text-slate-450 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{isVi ? "Xem đổi hiến chương" : "Declaration updated"}</span>
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
                {isVi ? "DANH MỤC THIẾT LẬP" : "LOCAL CODES SECTIONS"}
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
                          : 'bg-white dark:bg-slate-900 text-slate-450 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-800/80 group-hover:text-slate-800 dark:group-hover:text-white'
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
                        <div className="text-[11px] text-slate-440 dark:text-slate-550 font-normal leading-tight">
                          {isVi ? cat.desc.vi : cat.desc.en}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Helper Tech Card on bottom Left */}
            <div className="p-5 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/20 text-left space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <h4 className="text-xs.5 font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300">
                  {isVi ? "Trần trừ nghi vấn?" : "Want real verification?"}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed font-normal">
                {isVi 
                  ? "Bảo mật không thể chỉ nói bằng lời chính sách tĩnh. Bạn hoàn toàn có thể khởi động Trình phát lập ví giả lập (Sandbox) của chúng tôi để tự kiểm định bộ nhớ Cache."
                  : "Security statements are not just paper commitments. Launch our real-time simulation sandbox and check variables with standard tools directly."}
              </p>
              {onOpenDemo && (
                <button 
                  onClick={onOpenDemo}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5B6CFF] hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  <span>{isVi ? "Trải nghiệm hộp cát Sandbox →" : "Audit sandbox credentials →"}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Accordion Side: Interactive answers */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] dark:border-slate-800/50 mb-6">
              <div className="text-left">
                <h3 className="text-xs.5 font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {isVi ? "CHI TIẾT HIẾN CHƯƠNG LƯU TRỮ" : "DETAILED STORAGE PROVISIONS"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-450">
                  {isVi 
                    ? `Hiển thị ${filteredCookies.length} tiêu chuẩn an toàn tệp` 
                    : `Showing ${filteredCookies.length} active storage guidelines`
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
              {filteredCookies.length > 0 ? (
                filteredCookies.map((item, index) => {
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
                                  {isVi ? "Các phụ lục kiểm chuẩn chi tiết:" : "Interactive compliance markers:"}
                                </span>
                                {detailsList.map((pt, pIdx) => (
                                  <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{pt}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-4 pt-3 border-t border-dashed border-gray-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                                <span className="text-[11px] text-slate-450 dark:text-slate-500 italic">
                                  {isVi ? `Thuộc danh mục: ${categories.find(c => c.id === item.category)?.vi}` : `Domain: ${categories.find(c => c.id === item.category)?.en}`}
                                </span>
                                {onOpenDemo && (
                                  <button
                                    onClick={onOpenDemo}
                                    className="inline-flex items-center gap-1 text-[#5B6CFF] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer text-[11px]"
                                  >
                                    <span>{isVi ? "Kiểm định qua ví Sandbox" : "Launch wallet sandbox tracker"}</span>
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
                  <h3 className="text-base font-bold text-slate-700 dark:text-slate-350">
                    {isVi ? "Không tìm thấy điều khoản tương ứng" : "No matching clauses found"}
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed font-normal">
                    {isVi 
                      ? "Hãy thử tìm kiếm với các từ khóa ngắn gọn hơn như 'LocalStorage', 'kiểm tra', 'pixel' hoặc đặt lại bộ lọc danh mục bên trái."
                      : "Try checking with other single terms like 'LocalStorage', 'inspect', 'pixels', or reset the category filters."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* 3. EXPERIENCE STANDBOX CALL TO ACTION (Preserving exact visual consistency) */}
        <div className="max-w-7xl mx-auto py-12 mt-12 text-center">
          <div className="bg-[#3B52FF]/5 dark:bg-[#3B52FF]/10 rounded-3xl p-8 border border-[#3B52FF]/10 max-w-4xl mx-auto space-y-4">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#3B52FF] dark:text-[#7C8CFF] block">
              {isVi ? "XÁC MINH CƠ CHẾ LƯU TRỮ CỰC BỘ" : "REAL-TIME WORKSPACE INSPECTION"}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isVi ? "Trực tiếp kiểm định tệp lưu trữ?" : "Audit our storage registers live?"}
            </h2>
            <p className="text-xs sm:text-xs.5 text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
              {isVi 
                ? "Dành cho các chuyên gia kiểm thử bảo mật. Hãy mở ngay Trình giả lập ví Sandbox, khởi tạo mã DID và trực quan hóa toàn bộ tệp LocalStorage của bạn trên trình duyệt để kiểm tra tính an mật."
                : "For compliance researchers, system auditors, and security teams. Boot up our simulator wallet environment to see exactly where cryptographic keys, master files, and metadata are saved."}
            </p>
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenDemo}
                className="px-6 py-3 rounded-full bg-[#3B52FF] hover:bg-[#2A41EE] text-white font-bold text-xs.5 tracking-wide shadow-xs hover:shadow-md transition-all cursor-pointer border-none"
              >
                {isVi ? "Kích hoạt Sandbox Thử nghiệm →" : "Launch Sandbox Workspace →"}
              </motion.button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
