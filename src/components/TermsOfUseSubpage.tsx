import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Target, 
  User, 
  ListChecks, 
  Code2, 
  ShieldAlert, 
  Info, 
  AlertTriangle, 
  FileEdit, 
  Power, 
  Scale, 
  Mail,
  ChevronRight,
  Shield,
  HelpCircle,
  FileText,
  Search,
  Sparkles,
  Home,
  CheckCircle2,
  ExternalLink,
  Clock
} from 'lucide-react';

interface TermsOfUseSubpageProps {
  lang: 'vi' | 'en';
  onBack: () => void;
  onNavigate?: (page: string) => void;
  onOpenDemo?: () => void;
}

interface TermsSection {
  id: string;
  num: number;
  category: 'acceptance' | 'conduct' | 'legal' | 'general';
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

export default function TermsOfUseSubpage({ lang, onBack, onNavigate, onOpenDemo }: TermsOfUseSubpageProps) {
  const isVi = lang === 'vi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'acceptance' | 'conduct' | 'legal' | 'general'>('all');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const categories = [
    { id: 'all', vi: 'Tất cả điều khoản', en: 'All General Terms', icon: FileText, desc: { vi: 'Toàn bộ cam kết vận hành', en: 'View all core terms modules' } },
    { id: 'acceptance', vi: 'Chấp nhận & Mục tiêu', en: 'Acceptance & Mission', icon: ShieldCheck, desc: { vi: 'Chấp thuận, định hướng phi lợi nhuận', en: 'Core acceptance & purpose' } },
    { id: 'conduct', vi: 'Tài khoản & Trách nhiệm', en: 'Accounts & Conduct', icon: User, desc: { vi: 'Người dùng tự bảo mật ví, hành vi', en: 'Key management & safe behavior' } },
    { id: 'legal', vi: 'Bản quyền & Miễn trừ', en: 'License & Disclaimers', icon: Scale, desc: { vi: 'Giấy phép nguồn mở, miễn trách nhiệm', en: 'MIT/Apache 2.0 & liability limits' } },
    { id: 'general', vi: 'Cập nhật & Liên hệ', en: 'Updates & Contact', icon: FileEdit, desc: { vi: 'Cơ chế thay đổi, kênh liên hệ', en: 'Modifications & community gateways' } }
  ];

  const termsSections: TermsSection[] = [
    {
      id: 'ts-1',
      num: 1,
      category: 'acceptance',
      title: {
        vi: "Sự đồng thuận của Người sử dụng",
        en: "User Terms Acceptance Agreement"
      },
      desc: {
        vi: "Bằng việc truy cập hoặc sử dụng ví Identra Wallet, ứng dụng Identra SDK, Identra Explorer hoặc bất kỳ dịch vụ phân tán nào thuộc dự án chúng tôi, bạn đồng ý vô điều kiện sự ràng buộc của bản hiến chương này.",
        en: "By initiating, downloading, or integrating Identra Wallet, Identra SDK, Identra Explorer, or connected resources (collectively, \"Services\"), you agree unconditionally to be bound by these Terms."
      },
      icon: ShieldCheck,
      color: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
      details: {
        vi: [
          "Có hiệu lực tức thì ngay khi bạn mở ứng dụng ở chế độ thử nghiệm hoặc phát hành chính thức.",
          "Nếu không đồng thuận với bất kỳ điều khoản nào, vui lòng gỡ cài đặt và ngừng tải về mã nguồn.",
          "Áp dụng cho cả hai chế độ chạy trên trình duyệt web và chạy nguyên bản/ứng dụng di động."
        ],
        en: [
          "Takes immediate effect upon opening the local application or deploying custom instances.",
          "If you object to any structural terms, kindly cease utilizing the system packages immediately.",
          "Applies universally to both web-sandboxes and native mobile runtime packages."
        ]
      }
    },
    {
      id: 'ts-2',
      num: 2,
      category: 'acceptance',
      title: {
        vi: "Sứ mệnh Công nghệ Định danh Phi lợi nhuận",
        en: "SSI Mission & Non-Profit Intent"
      },
      desc: {
        vi: "Identra hoạt động chuẩn mực như một dự án phi lợi nhuận của cộng đồng nhằm thúc đẩy công nghệ định danh tự chủ (Self-Sovereign Identity) dễ tiếp cận hơn cho xã hội.",
        en: "Identra is a transparent non-profit research and technology project. We aim to advance secure Self-Sovereign Identity (SSI) public standards for society."
      },
      icon: Target,
      color: "bg-indigo-500/10 text-indigo-650 dark:bg-indigo-500/20 dark:text-indigo-400",
      details: {
        vi: [
          "Dịch vụ được phục vụ bình đẳng, miễn hoàn toàn phí duy trì hay phụ thu phí bản quyền phát triển.",
          "Không tích hợp cơ chế thương mại hóa, quảng cáo chéo hay khai thác cookies kiếm lời.",
          "Chúng tôi hoan nghênh đóng góp mã nguồn từ các kỹ sư mật mã học trên cơ sở liên minh phi chính phủ."
        ],
        en: [
          "All software tools are accessible free of subscription tariffs or commercial design pricing.",
          "We refuse client telemetry platforms, overlay ads, and tracking pixels categorically.",
          "Contributions to repositories occur transparently via community pull-request standards."
        ]
      }
    },
    {
      id: 'ts-3',
      num: 3,
      category: 'conduct',
      title: {
        vi: "Bảo mật khóa Mật mã & Tính Phi tập trung",
        en: "Sovereign Key Responsibilities & Wallet Controls"
      },
      desc: {
        vi: "Identra hoạt động theo kiến trúc 'Zero-knowledge, Local-storage'. Chúng tôi không lưu trữ, không quản trị và không có khả năng khôi phục cụm từ hạt giống (Seed phrase) hay khóa bảo mật của bạn.",
        en: "Identra operates a robust serverless localized architecture. Critical seeds, mnemonics, and private keys reside exclusively inside user-controlled environments."
      },
      icon: User,
      color: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
      details: {
        vi: [
          "Hộp lưu trữ mật mã cục bộ được mã hóa bằng chuẩn AES-GCM 256-bit trực tiếp trên phần cứng máy khách.",
          "Khách hàng chịu trách nhiệm sao lưu ngoại tuyến an toàn khóa riêng tư của mình.",
          "Identra hoàn toàn không có tính năng đặt lại hay phục hồi tài khoản từ máy chủ trung tâm."
        ],
        en: [
          "Raw wallets encrypt natively under symmetrical military standards on user disks.",
          "Users shoulder sovereign accountability to create independent backups of their key chains.",
          "No administrative tools or cloud support desks can alter or recover user identities remotelly."
        ]
      }
    },
    {
      id: 'ts-4',
      num: 4,
      category: 'conduct',
      title: {
        vi: "Nghĩa vụ và Ứng xử lành mạnh của Người dùng",
        en: "Explicit User Conduct Rules & Consent Paths"
      },
      desc: {
        vi: "Khi tham gia tương tác trao đổi thông tin định danh số, người dùng có trách nhiệm duy trì luật pháp quốc gia sở tại và tính minh bạch của dữ liệu được ký số.",
        en: "When sharing or verifying digital identity attributes, you agree to respect local regulations and the digital integrity of shared credentials."
      },
      icon: ListChecks,
      color: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
      details: {
        vi: [
          "Không mạo danh tổ chức hợp pháp để phát hành chứng chỉ giả mạo thông qua cổng ký số tự do.",
          "Chỉ chia sẻ dữ liệu khi được sự đồng ý tuyệt đối của các chủ thể dữ liệu có liên quan.",
          "Tránh sử dụng các cơ chế tự động gửi thư rác hay spam thông điệp thông qua mạng ngang hàng."
        ],
        en: [
          "Do not impersonate valid institutions when signing custom credentials inside the portal.",
          "Only relay custom profiles and claims with absolute prior consent from corresponding human subjects.",
          "Refrain from spamming standard peer networks with artificial validation packets."
        ]
      }
    },
    {
      id: 'ts-5',
      num: 5,
      category: 'legal',
      title: {
        vi: "Quyền sở hữu Trí tuệ & Giấy phép Nguồn mở",
        en: "Permissive Open Source Licenses & IP"
      },
      desc: {
        vi: "Mã nguồn Identra được công khai toàn diện trên GitHub và phân phối theo giấy phép MIT / Apache 2.0. Bạn được quyền can thiệp, chỉnh sửa và tạo nhánh độc lập.",
        en: "The entire Identra core code, build scripts, and static templates serve openly under standard permissive open source licenses (MIT/Apache 2.0)."
      },
      icon: Code2,
      color: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
      details: {
        vi: [
          "Thương hiệu 'Identra' phi lợi nhuận thuộc quyền quản lý chung của cộng đồng mã nguồn mở tự do.",
          "Cho phép và khuyến khích việc đóng gói, fork mã nguồn của chúng tôi để nghiên cứu học thuật.",
          "Cần giữ nguyên các ghi chú bản quyền gốc của các nhà phát triển đóng góp thế hệ đầu."
        ],
        en: [
          "The non-profit name 'Identra' is stewarded co-operatively by general project contributors and community.",
          "Academic forks and security-focused localized builds are highly encouraged.",
          "Keep historical copyright statements of foundational authors active in custom deployments."
        ]
      }
    },
    {
      id: 'ts-6',
      num: 6,
      category: 'conduct',
      title: {
        vi: "Các hành vi bị nghiêm cấm trên hệ thống",
        en: "Strictly Prohibited Exploitations"
      },
      desc: {
        vi: "Nghiêm cấm triển khai các hoạt động tấn công, chèn mã độc, dò quét lỗ hổng hoặc sử dụng thuật toán bẻ khóa bất hợp pháp làm suy giảm hệ sinh thái định danh an toàn.",
        en: "Users must never deploy hacking mechanisms, inject malicious scripts, brute-force algorithms, or compromise the digital ledger networks."
      },
      icon: ShieldAlert,
      color: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
      details: {
        vi: [
          "Không can thiệp dịch ngược để chiếm đoạt khóa sinh trắc học FaceID/Vân tay của ứng dụng khác.",
          "Nghiêm cấm hành vi gửi bom thư, nạp đầy bộ nhớ cache hoặc làm nghẽn hạ tầng p2p.",
          "Tuyệt đối không lợi dụng hệ thống để lưu trữ các tệp có ký tự độc hại, bất hợp pháp."
        ],
        en: [
          "Do not reverse-engineer mobile APIs to bypass hardware biometric authentication gates.",
          "Do not execute DDoS campaigns or overflow routing endpoints of verified node aggregators.",
          "Storing malicious data binaries or illegal hashes in decentralized metadata templates is blocked."
        ]
      }
    },
    {
      id: 'ts-7',
      num: 7,
      category: 'legal',
      title: {
        vi: "Tuyên bố Miễn trừ Trách nhiệm Pháp lý",
        en: "Disclaimer of Warranties & 'As-is' Delivery"
      },
      desc: {
        vi: "Chúng tôi phân phối toàn bộ phần mềm theo mô hình 'Hiện trạng thực tế' (As-Is). Chúng tôi không đo lường cũng như không đảm bảo tính sẵn sàng 100% hay không có lỗi hệ thống.",
        en: "All services, software packages, and visual code templates are delivered on an \"As-Is\" and \"As Available\" basis without warranties of any kind."
      },
      icon: Info,
      color: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      details: {
        vi: [
          "Identra không cam kết tính hoàn thiện tối thượng trước các sai sót do người dùng làm mất khóa bí mật.",
          "Chúng tôi không chịu trách nhiệm nếu nền tảng bị gián đoạn do sự sụp đổ của mạng viễn thông toàn cầu.",
          "Công nghệ phi tập trung yêu cầu người học và người dùng tự trang bị kiến thức an toàn thông tin cơ bản."
        ],
        en: [
          "We offer no guarantees regarding key recoveries, since master backups are absent from cloud storage.",
          "No liability is assumed for network failures or connection delays caused by outer ISPs.",
          "The end user accepts full technological risks inherent to deploying client-side cryptological routines."
        ]
      }
    },
    {
      id: 'ts-8',
      num: 8,
      category: 'legal',
      title: {
        vi: "Giới hạn Trách nhiệm bồi thường thiệt hại",
        en: "Strict Limitation of Legal Liability"
      },
      desc: {
        vi: "Trong mọi tình huống, nhà sáng lập, các nhà phát triển đóng góp mã nguồn vì cộng đồng sẽ không chịu trách nhiệm với bất kỳ tổn thất tài chính, dữ liệu hay danh tiếng nào của bạn.",
        en: "Under no legal theory shall Identra, core developers, or code contributors be liable for any direct, indirect, special, or consequential damages."
      },
      icon: AlertTriangle,
      color: "bg-yellow-500/10 text-yellow-650 dark:bg-yellow-500/20 dark:text-yellow-400",
      details: {
        vi: [
          "Không bồi thường tổn thất cơ hội kinh doanh khi người dùng không trình diễn thành công thẻ số.",
          "Mức giới hạn trách nhiệm bồi thường tích lũy tối đa trong mọi điều kiện pháp lý là bằng Không (0 USD).",
          "Mọi rủi ro trong quản lý bảo mật thuộc về ranh giới vận hành thiết bị cá nhân của bạn."
        ],
        en: [
          "No payouts or liability claims cover commercial opportunity losses or device crashes.",
          "The maximum cumulative financial liability is strictly capped at zero dollars ($0.00).",
          "Responsibility for system management is fully bounded by your private hardware choices."
        ]
      }
    },
    {
      id: 'ts-9',
      num: 9,
      category: 'general',
      title: {
        vi: "Cơ chế cập nhật và bổ sung Điều khoản sử dụng",
        en: "Autonomous Modifications & Active Revisions"
      },
      desc: {
        vi: "Chúng tôi bảo lưu quyền thay đổi tài liệu điều khoản này nhằm tối ưu hóa theo sự biến đổi của tiêu chuẩn định dạng định danh W3C tương lai.",
        en: "We reserve the right to revise or adjust this terms policy document dynamically to maintain compliance with evolving W3C and decentralized network standards."
      },
      icon: FileEdit,
      color: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400",
      details: {
        vi: [
          "Phiên bản cập nhật mới nhất sẽ mang mốc thời gian hiển thị rõ ràng tại đầu trang web.",
          "Do không thu thập thông tin người dùng nên chúng tôi sẽ không gửi thông báo bắt buộc qua hòm thư.",
          "Mọi thay đổi có hiệu lực thi hành ngay khi được cam kết ghi nhận (commit) công khai trên kho Git."
        ],
        en: [
          "The latest updated active timestamps will always display prominently at the head of the portal.",
          "Since emails are discarded by design, we do not issue alerts or newsletter update prompts.",
          "Sovereign revisions apply and bind users immediately upon general commit logs inside our main repository."
        ]
      }
    },
    {
      id: 'ts-10',
      num: 10,
      category: 'general',
      title: {
        vi: "Tính độc lập và Tự ngắt kết nối tuyệt đối",
        en: "Self-Sovereign Cessation & Account Dismantling"
      },
      desc: {
        vi: "Vì là kiến trúc 'Local-first', bất kỳ khi nào muốn chấm dứt điều khoản này, bạn chỉ cần gỡ bỏ phần mềm ví trên điện thoại của mình.",
        en: "Since our application implements local-first offline paradigms, terminating your agreement is as simple as wiping the app data from your personal hardware."
      },
      icon: Power,
      color: "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400",
      details: {
        vi: [
          "Hành động xóa sạch bộ nhớ đệm (Clear cache) sẽ hủy toàn quyền truy cập ví và xóa sạch dữ liệu vĩnh viễn.",
          "Chúng tôi không níu giữ tệp lưu trữ lịch sử hoạt động hay lưu vết khóa thông tin cá nhân của bạn.",
          "Quyền năng rời bỏ hệ thống nằm trọn trong lòng bàn tay người dùng."
        ],
        en: [
          "Triggering a master cache sweep instantly neutralizes private keys and erases logs permanently.",
          "We construct no visual trap barriers, tracking exit logs, or locked data files.",
          "The sovereign freedom to disengage from the network is globally complete at any time."
        ]
      }
    },
    {
      id: 'ts-11',
      num: 11,
      category: 'legal',
      title: {
        vi: "Luật pháp áp dụng và Cách thức Giải quyết Tranh chấp",
        en: "Governing Law & Equitable Settlement"
      },
      desc: {
        vi: "Điều khoản sử dụng này được xây dựng, diễn giải và điều chỉnh trực tiếp theo hệ thống pháp lý Việt Nam hiện hành trên tinh thần tôn trọng hiến chương mở rộng tự do số toàn cầu.",
        en: "These operating terms are compiled, interpreted, and governed in alignment with the legal system of Vietnam, respecting global open software principles."
      },
      icon: Scale,
      color: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
      details: {
        vi: [
          "Mọi bất đồng sẽ được ưu tiên giải quyết qua thương lượng thiện chí, hòa giải nội bộ cộng đồng.",
          "Nếu không thể tự thỏa thuận, tranh chấp sẽ được chuyển giao đến trọng tài thương mại có thẩm quyền.",
          "Tính vô danh của các tác giả đóng góp được bảo vệ tối đa theo định nghĩa đạo đức lập trình mã nguồn mở."
        ],
        en: [
          "Any conflicts should first seek friendly mitigation inside our voluntary community forums.",
          "If amicable settlements fail, disputes proceed through recognized local commercial arbitration chambers.",
          "Maintainer anonymity and liability rules align strictly with permissive open software code ethics."
        ]
      }
    },
    {
      id: 'ts-12',
      num: 12,
      category: 'general',
      title: {
        vi: "Kênh thông tin Liên hệ & Đóng góp Ý kiến",
        en: "Official Community Gateways & Inquiries"
      },
      desc: {
        vi: "Nếu bạn có câu hỏi, đề xuất báo lỗi hoặc muốn tham gia đóng góp mã nguồn mở cho hệ thống Identra, hãy kết nối thông qua các kênh phát triển chính thức.",
        en: "For bugs, code suggestions, standard architectural reviews, or scaling requests, connect securely with Identra's open channels."
      },
      icon: Mail,
      color: "bg-[#3B52FF]/10 text-[#3B52FF] dark:bg-[#3B52FF]/20 dark:text-[#7C8CFF]",
      details: {
        vi: [
          "Gửi yêu cầu kéo mã nguồn (Pull Request) trực tiếp trên GitHub dự án Identra.",
          "Trao đổi học thuật qua kênh thảo luận cộng đồng trên diễn đàn Discord.",
          "Liên hệ email phi lợi nhuận chính thức để được định hướng bảo trợ công nghệ nguồn mở."
        ],
        en: [
          "Submit transparent code improvements via standard Pull Requests on our main GitHub repos.",
          "Seek quick interactive responses on our developer Discussion forums or community channels.",
          "Reach out to our non-profit coordination desks for open technology mentorship paths."
        ]
      }
    }
  ];

  // Dynamic Filtering Logic
  const filteredTerms = termsSections.filter(item => {
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
      
      {/* 1. HERO HEADER SECTION */}
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
                  <Shield className="w-3.5 h-3.5 mr-0.5" />
                  <span>{isVi ? "QUY TẮC VẬN HÀNH PHI TẬP TRUNG" : "DECENTRALIZED OPERATING CHARTER"}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {isVi ? 'Điều khoản sử dụng' : 'Decentralized'}
                  <span className="bg-gradient-to-r from-[#5B6CFF] to-[#8F9BFF] dark:from-[#7C8CFF] dark:to-[#8F9BFF] bg-clip-text text-transparent ml-2">
                    {isVi ? 'định danh số' : 'Terms of Use'}
                  </span>
                </h1>

                <p className="text-base text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl font-normal">
                  {isVi 
                    ? 'Chào mừng bạn đến với Identra. Hệ quả của việc ứng dụng mô hình phi tập trung hoàn toàn là bạn được quyền tự quản tối thượng, song hành cùng trách nhiệm tối cao với tài sản mật mã cá nhân.'
                    : 'Welcome to the sovereign world of Identra. Guided by non-profit structures, we serve permissive public standard tools granting you total code liberty alongside pure key responsibility.'
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
                    placeholder={isVi ? "Nhập từ khóa tìm kiếm: khóa bí mật, miễn trừ, Apache 2.0..." : "Filter terms: private key, disclaimers, Apache 2.0, MIT..."}
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
                  <span className="font-semibold">{isVi ? "Từ khóa tìm nhanh:" : "Popular keys:"}</span>
                  {['Không lưu giữ', 'Giới hạn bồi thường', 'Mã nguồn mở', 'MIT License Discord', 'Luật Việt Nam'].map((keyword) => (
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
                <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 border border-indigo-505/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block animate-pulse"></span>
                  <span className="text-[10.5px] font-bold uppercase tracking-wider">{isVi ? "Phi thương mại" : "Non-Profit Standard"}</span>
                </div>

                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-[#5B6CFF]/10 text-[#5B6CFF] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className="text-xs.5 font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF]">
                      {isVi ? "CAM KẾT VẬN HÀNH" : "SYSTEM COVENANTS"}
                    </h4>
                    <p className="text-[11px] text-slate-450 dark:text-slate-550 font-medium">
                      Self-Sovereign Code Integration
                    </p>
                  </div>
                </div>

                {/* Audit points list */}
                <div className="space-y-3.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-800/40">
                    <span className="text-slate-450">{isVi ? "Mô hình ví" : "Wallet Nature"}</span>
                    <span className="font-bold text-slate-800 dark:text-white">Non-Custodial / Local-first</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-800/40">
                    <span className="text-slate-450">{isVi ? "Lệ phí dịch vụ" : "Licensing Tariffs"}</span>
                    <span className="font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                      {isVi ? "Miễn Phí Vĩnh Viễn" : "100% Free Forever"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-slate-800/40">
                    <span className="text-slate-450">{isVi ? "Mã nguồn" : "Repository Licenses"}</span>
                    <span className="font-bold text-slate-800 dark:text-white">MIT / Apache 2.0 Docs</span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-slate-450">{isVi ? "Mức bồi thường tối đa" : "Financial Liability"}</span>
                    <span className="font-bold text-rose-500 dark:text-rose-450 flex items-center gap-0.5">
                      $0.00 Limit
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-sans text-slate-450 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{isVi ? "Cập nhật điều khoản" : "Terms Version"}</span>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-350">{isVi ? "01/05/2025" : "v1.0 Standard"}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Navigation Pillar: Clean vertical sticky categories */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="p-1 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-gray-150 dark:border-slate-800/60">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-4 py-2 block">
                {isVi ? "DANH MỤC ĐIỀU KHOẢN" : "TERMS PROVISIONS"}
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
                        <div className="text-[11px] text-slate-440 dark:text-slate-500 font-normal leading-tight">
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
                  {isVi ? "Mã nguồn tin cậy?" : "Auditable Systems?"}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed font-normal">
                {isVi 
                  ? "Bởi vì chúng tôi cam kết chịu giới hạn bồi thường tối thiểu, mọi dòng mã toán học mật mã học của chúng tôi đều được kiểm duyệt chặt chẽ 100% trên Git."
                  : "Due to serverless architecture constraints, our cryptographic flow elements are designed to be public, inspectable, and auditable line-by-line."}
              </p>
              {onOpenDemo && (
                <button 
                  onClick={onOpenDemo}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5B6CFF] hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  <span>{isVi ? "Trải nghiệm hộp cát Sandbox →" : "Verify raw storage Sandbox →"}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Accordion Side: Interactive answers */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] dark:border-slate-800/50 mb-6 font-sans">
              <div className="text-left">
                <h3 className="text-xs.5 font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {isVi ? "CHI TIẾT HIẾN CHƯƠNG ĐIỀU KHOẢN" : "CORE LEGAL SECTIONS"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-450">
                  {isVi 
                    ? `Hiển thị ${filteredTerms.length} điều mục điều khoản thỏa thuận` 
                    : `Showing ${filteredTerms.length} active legal clauses`
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
              {filteredTerms.length > 0 ? (
                filteredTerms.map((item, index) => {
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
                          : 'border-gray-150 dark:border-slate-800/85 hover:border-[#5B6CFF]/20 dark:hover:border-[#7C8CFF]/20'
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
                                  {isVi ? "Các phụ lục cam kết chi tiết:" : "Interactive compliance criteria:"}
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
                                  {isVi ? `Thuộc nhóm: ${categories.find(c => c.id === item.category)?.vi}` : `Domain: ${categories.find(c => c.id === item.category)?.en}`}
                                </span>
                                {onOpenDemo && (
                                  <button
                                    onClick={onOpenDemo}
                                    className="inline-flex items-center gap-1 text-[#5B6CFF] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer text-[11px]"
                                  >
                                    <span>{isVi ? "Kiểm tra bằng Hộp cát Sandbox" : "Launch regulatory sandbox"}</span>
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
                    {isVi ? "Không tìm thấy điều mục tương ứng" : "No matching clauses found"}
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed font-normal">
                    {isVi 
                      ? "Hãy thử tìm kiếm với các từ khóa ngắn gọn hơn như 'bồi thường', 'khóa riêng', 'luật' hoặc đặt lại bộ lọc bên danh mục trái."
                      : "Try checking with other single terms like 'liability', 'private key', 'Vietnamese law', or reset the category filters."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* 3. EXPERIENCE STANDBOX CALL TO ACTION */}
        <div className="max-w-7xl mx-auto py-12 mt-12 text-center">
          <div className="bg-[#3B52FF]/5 dark:bg-[#3B52FF]/10 rounded-3xl p-8 border border-[#3B52FF]/10 max-w-4xl mx-auto space-y-4">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#3B52FF] dark:text-[#7C8CFF] block">
              {isVi ? "AN AN TOÀN TRỰC QUAN" : "SERVERLESS REGULATORY SANDBOX"}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isVi ? "Thách thức việc thực thi quy tắc phi tập trung?" : "Audit our decentralized principles live?"}
            </h2>
            <p className="text-xs sm:text-xs.5 text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
              {isVi 
                ? "Dành cho nhà nghiên cứu chính sách và kiểm thử bảo mật. Hãy mở ngay hộp cát để xem phương pháp lưu trữ cục bộ, kiểm tra chữ ký số DID và xác nhận các phép tính toán học ZKP bảo vệ quyền lợi cá nhân của bạn."
                : "For legal researchers, code auditors, and compliance teams. Open our live sandbox workspace to inspect how credentials, metadata packages, and cryptographic keys persist."}
            </p>
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenDemo}
                className="px-6 py-3 rounded-full bg-[#3B52FF] hover:bg-[#2A41EE] text-white font-bold text-xs.5 tracking-wide shadow-xs hover:shadow-md transition-all cursor-pointer border-none"
              >
                {isVi ? "Khởi động Ví Sandbox →" : "Launch Wallet Sandbox →"}
              </motion.button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
