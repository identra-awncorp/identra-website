import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  HelpCircle, 
  ChevronDown, 
  Search,
  BookOpen,
  ShieldCheck,
  Cpu,
  Key,
  Globe,
  Award,
  Sparkles,
  Layers,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import SubpageBrowserHeroVisual from './SubpageBrowserHeroVisual';

interface FaqSubpageProps {
  lang: 'vi' | 'en';
  onBack: () => void;
  onOpenDemo: () => void;
}

export default function FaqSubpage({ lang, onBack, onOpenDemo }: FaqSubpageProps) {
  const isVi = lang === 'vi';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'security' | 'integration'>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    { id: 'all', vi: 'Tất cả chủ đề', en: 'All Topics', icon: HelpCircle, desc: { vi: 'Toàn bộ nội dung hỏi đáp', en: 'Check out all system guides' } },
    { id: 'general', vi: 'Tổng quan ví SSI', en: 'General SSI', icon: Layers, desc: { vi: 'Khái niệm, lợi ích cốt lõi', en: 'Core concepts & major benefits' } },
    { id: 'security', vi: 'An ninh & Mật mã', en: 'Security & Crypto', icon: ShieldCheck, desc: { vi: 'Bản chất mã hóa, ZKPs', en: 'Zero-Knowledge, hardware logic' } },
    { id: 'integration', vi: 'Tích hợp & Kỹ thuật', en: 'Integration & SDK', icon: Cpu, desc: { vi: 'Hướng dẫn SDK, ví Sandbox', en: 'OpenID protocols & web tools' } }
  ];

  const faqsData = [
    {
      id: 1,
      category: 'general',
      q: {
        vi: "SSI Wallet là gì và nó hoạt động như thế nào?",
        en: "What is SSI Wallet and how does it function?"
      },
      a: {
        vi: "SSI Wallet là ví định danh số tự chủ (Self-Sovereign Identity) thế hệ mới, cho phép bạn lưu giữ, bảo quản và tự chủ chia sẻ các giấy tờ số hóa như CCCD, bằng lái xe, bằng cấp... với mức độ bảo mật cao nhất bằng mật mã học mà không phụ thuộc vào bất kỳ máy chủ trung tâm nào. Tất cả giao dịch chứng thực đều tuân thủ mô hình 3 bên (Holder - Issuer - Verifier) chuẩn quốc tế W3C.",
        en: "SSI Wallet is a next-generation Self-Sovereign Identity (SSI) digital wallet that empowers you to store, manage, and autonomously share verifiable proof of your credentials (such as ID cards, driver licenses, degrees) using supreme cryptographical security without depending on any central server. All credential cycles align with the standard 3-party (Holder - Issuer - Verifier) international W3C architecture."
      }
    },
    {
      id: 2,
      category: 'general',
      q: {
        vi: "\"Tự chủ danh tính\" (Self-Sovereign) mang lại quyền lợi thực tế gì?",
        en: "What practical rights does \"Self-Sovereign Identity\" yield?"
      },
      a: {
        vi: "Nghĩa là bạn hoàn toàn làm chủ định danh và các chứng thực của mình. Không một ai (kể cả cơ quan phát hành hay nhà phát triển ví) có quyền thu giữ, đóng băng tài khoản, theo dõi hành vi hay kiểm duyệt thông tin bạn sử dụng. Bạn tự quyết định khi nào, cung cấp cho ai và những thông tin cụ thể nào được hiển lộ trên môi trường số.",
        en: "It means you are the absolute sovereign of your digital identity. No third party (including government issuers or wallet developers) has the right to freeze your records, disable your wallet, track your transaction histories, or censor how you manifest your private data. You decide when, to whom, and exactly which attributes are revealed online."
      }
    },
    {
      id: 3,
      category: 'general',
      q: {
        vi: "Lợi ích lớn nhất khi chuyển đổi từ ví truyền thống sang SSI Wallet?",
        en: "What is the primary upgrade when moving to an SSI Wallet?"
      },
      a: {
        vi: "Giải pháp loại bỏ hoàn toàn sự phiền toái khi mang theo giấy tờ vật lý thô sơ, bảo vệ thông tin hoàn hảo khỏi rò rỉ dữ liệu đám mây lớn, ký xác thực danh tính tức thì dưới 0.1 giây và đặc biệt là khả năng chứng minh các điều kiện phụ thuộc (nhờ ZKP) mà tuyệt đối không làm phát sinh rò rỉ thông tin cá nhân thô ra ngoài.",
        en: "Our platform completely eliminates the hassle of carrying physical papers, shields records from major cloud data breaches, completes lightning-fast digital verification in under 0.1 seconds, and uniquely allows you to prove conditional constraints (via ZKP) without exposing any raw personal parameters."
      }
    },
    {
      id: 4,
      category: 'general',
      q: {
        vi: "Ví SSI khác biệt như thế nào so với Apple Wallet hay Google Wallet?",
        en: "How does SSI Wallet differ from Apple Wallet or Google Wallet?"
      },
      a: {
        vi: "Trong khi Apple hay Google Wallet chủ yếu số hóa thẻ bằng cách lưu trữ hình ảnh/PDF hoặc các token định danh đóng liên kết trực tiếp với máy chủ tập trung của họ, Identra SSI Wallet sử dụng cấu trúc Verifiable Credentials thực tế theo chuẩn W3C, được ký điện tử trực tiếp và phục vụ xác thực ngang hàng (p2p) độc lập mà không gửi dữ liệu thô hay lịch sử log của bạn về hệ thống trung gian.",
        en: "While Apple/Google Wallet mostly digitize physical cards by storing copies/PDFs or tokenized versions tied to their central clouds, Identra SSI Wallet uses real W3C DID and Verifiable Credentials standard models. They are digitally signed, edge-stored, and peer-to-peer verified without sending background logs or metadata history back to any central developer's infrastructure."
      }
    },
    {
      id: 5,
      category: 'general',
      q: {
        vi: "Tôi có phải chi trả bất kỳ khoản phí nào khi sử dụng ví cá nhân không?",
        en: "Do I have to purchase any subscription plane to use the personal wallet?"
      },
      a: {
        vi: "Không. Đối với người dùng cá nhân (Holder), dịch vụ Identra Wallet hoàn toàn miễn phí trọn đời. Mô hình phi tập trung tuyệt đối của chúng tôi giúp cắt giảm chi phí hạ tầng máy chủ lưu trữ khổng lồ. Doanh nghiệp hoặc tổ chức tích hợp (Issuer/Verifier) mới là bên chi trả cho các gói SDK tích hợp hoặc phí gas tối thiểu nếu cần ghi nhận trạng thái thu hồi chứng chỉ lên blockchain.",
        en: "No. SSI Wallet is entirely free forever for individual consumers (Holders) because decentralized designs cut out hosting costs. Corporations or issuing agencies only purchase setup plans, system support packages, or minimal computation gas if they elect to store credential revocation registries on a public decentralized ledger."
      }
    },
    {
      id: 6,
      category: 'security',
      q: {
        vi: "Dữ liệu cá nhân và khóa bí mật của tôi cụ thể được lưu trữ ở đâu?",
        en: "Where exactly are my private keys and credentials saved?"
      },
      a: {
        vi: "Toàn bộ thông tin định danh và khóa bí mật của bạn nằm cục bộ trên chip phần cứng bảo mật chuyên biệt của thiết bị (Secure Enclave của iOS hoặc Keystore của Android) và được bảo vệ bằng nhận diện sinh trắc học FaceID/Vân tay. Tuyệt đối không có cơ sở dữ liệu đám mây trung tâm lưu giữ thông tin nhạy cảm của bạn, loại bỏ triệt để nguy cơ tin tặc tấn công tập trung đánh cắp dữ liệu.",
        en: "All of your identity attributes reside exclusively on the secure local hardware chip of your own device (iOS Secure Enclave or Android Keystore) protected under biometric facial/fingerprint scans. Absolute zero central cloud databases store your secret logs, rendering bulk data breaches mathematically irrelevant."
      }
    },
    {
      id: 7,
      category: 'security',
      q: {
        vi: "Mô hình Mật mã bằng chứng không tri thức (Zero-Knowledge Proofs) hoạt động như thế nào?",
        en: "How does the Zero-Knowledge Proof (ZKP) mechanism work in Identra?"
      },
      a: {
        vi: "ZKP cho phép bạn ký xác nhận một khẳng định là đúng (ví dụ: \"Tôi trên 18 tuổi\" hoặc \"Tôi có thu nhập hợp lệ\") mà không cần cung cấp hay gửi đi thông tin thô thực tế (như ngày sinh \"25/11/2005\" hay số dư ngân hàng chuẩn xác). Thuật toán giải toán học đa thức chứng minh thông tin là đúng dựa trên cơ chế phản hồi mật mã mà không để lại bất kỳ vết dấu số hay rò rỉ dữ liệu nhạy cảm nào.",
        en: "ZKP enables you to prove standard assertions (e.g., \"Over 18 years of age\" or \"Possess valid income\") without forwarding the actual raw digit values (such as your birthdate \"Nov 25, 2005\" or specific account balance). High-level algebra proves your truth to asking verifiers without leaving any digital footprints or leaking sensitive numbers."
      }
    },
    {
      id: 8,
      category: 'security',
      q: {
        vi: "Identra áp dụng các giải thuật mã hóa bất đối xứng tiêu chuẩn nào?",
        en: "Which asymmetric cryptography standards are integrated in the ecosystem?"
      },
      a: {
        vi: "Hệ thống ví sử dụng các thuật toán mật mã đường cong elliptic hiện đại hàng đầu như ED25519 và Secp256k1 để tự động thiết lập cặp khóa chữ ký DID bảo mật cao. Các chữ ký được tính toán nhanh chóng, tiêu thụ cực ít dung lượng pin nhưng cung cấp khả năng phòng thủ tuyệt đối chống lại các cuộc tấn công giải mã hay dò tìm khóa thô bạo bằng siêu máy tính.",
        en: "Out-of-the-box support for elliptic curves such as ED25519 and Secp256k1 to generate master DID signature pairs. High entropy key generators guarantee supreme defense against complex supercomputer brute force searches while maintaining high performance on modern handheld devices."
      }
    },
    {
      id: 9,
      category: 'security',
      q: {
        vi: "Bằng cách nào hệ thống chứng minh một Chứng chỉ số (VC) không thể bị thay đổi hay giả mạo?",
        en: "How can we prove a Verifiable Credential (VC) is tamper-proof?"
      },
      a: {
        vi: "Mỗi chứng chỉ VC được áp dấu chữ ký số mật mã của tổ chức phát hành (Issuer). Chữ ký số này liên kết không thể tách rời với nội dung chi tiết bằng hàm băm mật mã an toàn (Secure Hash). Nếu bất kỳ ký tự hoặc chi tiết nhỏ nào bị thay đổi hay chỉnh sửa trái phép, phép tính kiểm tra chữ ký số sẽ tự động sai lệch, hệ thống đối soát (Verifier) sẽ phát hiện và từ chối chứng chỉ số đó trong chưa đầy một giây.",
        en: "Every Verifiable Credential contains a mathematical digital signature applied by the issuing agency. This signature binds the original claims to a secure cryptographic hash. Any change, editing, or tampering of even a single character invalidates the equation, allowing the verifier to detect forgery in fractions of a second."
      }
    },
    {
      id: 10,
      category: 'security',
      q: {
        vi: "Làm sao ví định danh Identra bảo vệ người dùng trước các cuộc tấn công từ máy tính lượng tử tương lai?",
        en: "How does Identra secure my digital credentials from future Quantum computing threats?"
      },
      a: {
        vi: "Chúng tôi tích cực nghiên cứu và thử nghiệm chuẩn toán mật mã kháng lượng tử (Post-Quantum Cryptography - PQC) dựa trên cấu trúc mạng lưới (lattice-based mathematical algorithms) đạt chứng nhận NIST như Dilithium và Kyber. Lộ trình nâng cấp thuật toán của ví sẽ tích hợp tự động qua các bản phát hành chuẩn DID thế hệ mới mà không làm gián đoạn trải nghiệm của Holder.",
        en: "We are actively monitoring and testing Post-Quantum Cryptography (PQC) standards based on lattice-based math constructs, such as NIST's Dilithium and Kyber. Algorithm transitions will complete smoothly via future update packages and progressive did:key formats without disrupting current user experiences."
      }
    },
    {
      id: 11,
      category: 'integration',
      q: {
        vi: "Lập trình viên và doanh nghiệp bắt đầu phát hành hoặc đối soát chứng chỉ thế nào?",
        en: "How do developers and organizations begin issuing or checking credentials?"
      },
      a: {
        vi: "Doanh nghiệp có thể tích hợp thư viện SDK chuyên biệt `@ssi-sandbox/sdk-core` hoặc `@ssi-sandbox/sdk-web` của chúng tôi. Chúng tôi hỗ trợ sẵn các luồng phát hành (Issuer Portal) thông minh và bộ mẫu cổng đối soát (Verifier Gate) cấu hình linh hoạt chỉ trong vài bước cấu hình ngắn gọn. Xem thêm chi tiết ở trang Tài liệu kỹ thuật.",
        en: "Simply navigate to our developer Docs page to install the open-source mobile `@ssi-sandbox/sdk-core` package. Our templates support streamlined flow setup for W3C-compliant issuing and checking in just a few lines of configuration."
      }
    },
    {
      id: 12,
      category: 'integration',
      q: {
        vi: "Giao thức OID4VCI và OID4VP đóng vai trò gì trong kiến trúc ví định danh?",
        en: "What active roles do OID4VCI and OID4VP play inside the architecture?"
      },
      a: {
        vi: "OID4VCI (OpenID for Verifiable Credential Issuance) là giao thức chuẩn toàn cầu dùng để truyền đạt an toàn các chứng chỉ số hóa từ bên phát hành vào thiết bị cá nhân của bạn thông qua liên kết QR bảo mật. OID4VP (OpenID for Verifiable Presentations) định nghĩa quy trình chuẩn hóa để bên xác thực gửi truy vấn và nhận lại bằng chứng hiển lộ một cách bảo mật.",
        en: "OID4VCI outlines how issuers safely deliver digital credentials to active wallets via secure QR tags or intent links. OID4VP provides a systematic protocol for verifiers to request and accept precise, tamper-proof user presentations, ensuring worldwide standards compliance."
      }
    },
    {
      id: 13,
      category: 'integration',
      q: {
        vi: "Nếu tôi bị mất hoặc hỏng thiết bị, làm sao tôi khôi phục lại các chứng chỉ và khóa của mình?",
        en: "If I lose my device, how do I recover my keys and digital credentials?"
      },
      a: {
        vi: "Khi mở ví lần đầu, bạn sẽ được tự động thiết lập một Cụm từ khôi phục (Recovery Phrase) dài 12 hoặc 24 từ tiếng Anh ngẫu nhiên bảo mật cao. Khi chuyển sang máy mới, bạn chỉ cần tải ứng dụng Identra và nhập chính xác cụm từ hạt giống này để khôi phục lại toàn bộ khóa định danh và danh sách chứng chỉ đã liên kết. Hãy lưu ý viết cụm từ này ra giấy vật lý, cất giữ nơi an toàn và tuyệt đối không bao giờ chia sẻ cho bất cứ ai.",
        en: "Upon initial sandbox setup, you receive a highly secure 12-to-24 word master seed phrase. If your phone gets lost or broken, simply download the wallet onto your new handset and import your phrase to restore all decentralized credentials. Write this down on a physical paper and never share it."
      }
    },
    {
      id: 14,
      category: 'integration',
      q: {
        vi: "Có thư viện SDK tương thích hoàn toàn để lập trình các ứng dụng web thông thường không?",
        en: "Are there Web-compatible SDK packages to develop decentralized web apps?"
      },
      a: {
        vi: "Có, bên cạnh bộ SDK di động Native (Swift & Kotlin), chúng tôi phân phối chính thức gói thư viện `@ssi-sandbox/sdk-web` tương thích hoàn toàn với các Framework phổ biến như React, Vue, Angular và môi trường Node.js phía máy chủ. Lập trình viên có thể xây dựng tính năng đăng nhập không mật khẩu bằng mã QR hoặc cổng xác minh chứng minh độ tuổi chỉ trong dưới 15 dòng mã sạch.",
        en: "Yes, in addition to our native mobile modules, we actively distribute the `@ssi-sandbox/sdk-web` package for JS/TS environments. It integrates smoothly with React, Vue, and backend Node.js runtimes. Developers can construct passwordless authentication doors or automated verification prompts in under 15 lines of code."
      }
    },
    {
      id: 15,
      category: 'integration',
      q: {
        vi: "Ví SSI có thể thực sự hoạt động hoàn hảo khi không có kết nối internet (Ngoại tuyến) không?",
        en: "Can the SSI Wallet operate efficiently when completely offline?"
      },
      a: {
        vi: "Hoàn toàn có thể. Quy trình thiết lập Verifiable Presentation, áp chữ ký khóa của Holder và kiểm chứng giải mã ZKP cơ bản đều được thiết kế để xử lý trực tiếp trên phần cứng máy khách (thiết bị di động của bạn) bằng thuật toán bất đối xứng. Bạn có thể tự tin trình diện thẻ nhân viên, vé sự kiện hay chứng minh độ tuổi qua Bluetooth Low Energy (BLE) hoặc mã QR cục bộ ở các hầm ga tàu hay vùng rừng núi không có mạng di động.",
        en: "Absolutely yes. The assembly of Verifiable Presentations (VPs), holders' private key signing, and ZKP checking happen entirely locally on device. You can securely authenticate airport checks or transit cards via physical QR codes or Bluetooth standard handshakes even in areas with zero cell coverage."
      }
    }
  ];

  // Dynamic Filtering Logic
  const filteredFaqs = faqsData.filter(item => {
    const qText = isVi ? item.q.vi : item.q.en;
    const aText = isVi ? item.a.vi : item.a.en;
    const matchesSearch = qText.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          aText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="bg-[#F7F8FC] dark:bg-[#0B0F1A] min-h-screen text-slate-900 dark:text-slate-100 font-sans antialiased pb-20 transition-colors duration-300">
      
      {/* 1. HERO HEADER SECTION (Aesthetic mirroring of AboutSubpage's grid arrangement) */}
      <section className="py-16 pt-8 lg:pt-12 bg-gradient-to-b from-white dark:from-[#0F172A]/45 via-white dark:via-[#0F172A]/10 to-[#F7F8FC] dark:to-[#0B0F1A] border-b border-[#E5E7EB] dark:border-slate-800/80 px-6 lg:px-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation Bar */}
          <div className="mb-6 text-left">
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
                  <HelpCircle className="w-3.5 h-3.5 mr-0.5" />
                  <span>{isVi ? "Kho tri thức & Hỗ trợ tích hợp" : "Knowledge Base & Security Q&A"}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {isVi ? 'Câu hỏi thường' : 'Frequently Asked'}
                  <span className="bg-gradient-to-r from-[#5B6CFF] to-[#8F9BFF] dark:from-[#7C8CFF] dark:to-[#8F9BFF] bg-clip-text text-transparent ml-2">
                    {isVi ? 'gặp về SSI' : 'Inquiries'}
                  </span>
                </h1>

                <p className="text-base text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl font-normal">
                  {isVi 
                    ? 'Giải đáp chi tiết về hạ tầng kiến trúc định danh W3C, cơ chế xác minh không tiết lộ thông tin Zero-Knowledge Proofs và giao thức tích hợp mật mã bền vững.'
                    : 'Systematically explore detailed answers for decentralized W3C schema structures, Zero-Knowledge cryptographic algorithms, and standard OID4VCI integration protocols.'
                  }
                </p>

                {/* Streamlined Live Interactive Search Bar with instant glow effects */}
                <div className="relative w-full max-w-2xl group pt-2 transition-all">
                  <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-550">
                    <Search className="w-5 h-5 text-[#5B6CFF] dark:text-[#7C8CFF]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isVi ? "Tìm câu hỏi về bảo mật, định danh, ZKP, Key, SDK..." : "Search keywords e.g., signature curves, W3C DID, ZKP, key..."}
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

                {/* Popular Keywords to fill horizontal space elegantly */}
                <div className="flex flex-wrap items-center gap-2 pt-1.5 text-xs text-slate-450 dark:text-slate-500">
                  <span className="font-semibold">{isVi ? "Gợi ý tìm kiếm:" : "Suggestions:"}</span>
                  {['ZKP', 'did:key', 'Secure Enclave', 'OID4VCI', 'QR Code'].map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => setSearchQuery(keyword)}
                      className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border border-gray-150 dark:border-slate-800/80 transition-all font-mono text-[10px] text-slate-600 dark:text-slate-400"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>

              <SubpageBrowserHeroVisual
                fileName="identra_knowledge_base.ts"
                eyebrow={isVi ? 'IDENTRA · KHO TRI THỨC' : 'IDENTRA · KNOWLEDGE BASE'}
                meta="SSI + W3C + SDK"
                status={isVi ? `${faqsData.length} GIẢI ĐÁP` : `${faqsData.length} ANSWERS`}
                title={isVi ? 'Tra cứu kiến thức SSI theo ngữ cảnh' : 'Context-aware SSI knowledge search'}
                description={isVi ? 'DID · VC · ZKP · Secure Enclave · OID4VCI · DIDComm' : 'DID · VC · ZKP · Secure Enclave · OID4VCI · DIDComm'}
                progressLabel={isVi ? 'CHỈ MỤC KIẾN THỨC ĐÃ ĐỒNG BỘ' : 'KNOWLEDGE INDEX SYNCHRONIZED'}
                progressValue="100%"
                logsLabel="knowledge_query"
                logs={[
                  { label: '✓ security_topics', value: 'indexed', tone: 'success' },
                  { label: '✓ sdk_integration', value: 'indexed', tone: 'success' },
                  { label: '→ answer_match', value: 'ready_for_query', tone: 'info' },
                ]}
                primaryStatus={{
                  icon: <ShieldCheck className="size-5" />,
                  eyebrow: 'W3C standards',
                  title: isVi ? 'Nội dung đã kiểm chứng' : 'Verified knowledge',
                }}
                secondaryStatus={{
                  icon: <Search className="size-5" />,
                  eyebrow: isVi ? 'Tìm kiếm tức thì' : 'Instant search',
                  title: isVi ? 'Theo chủ đề và từ khóa' : 'By topic and keyword',
                }}
              />

            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA (Harmonized structural layout matching AboutSubpage) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Navigation Pillar: Clean vertical sticky categories */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="p-1 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-gray-150 dark:border-slate-800/60">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-4 py-2 block">
                {isVi ? "Chọn phân mục giải đáp" : "BROWSE FAQ CATEGORIES"}
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
                        setExpandedFaq(null);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl transition-all duration-300 flex items-start gap-3.5 group cursor-pointer border-none bg-transparent`}
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

            {/* Quick Helper Tech Card on bottom Left */}
            <div className="p-5 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/20 text-left space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs.5 font-bold uppercase tracking-wider text-slate-800 dark:text-slate-300">
                  {isVi ? "Yêu cầu hỗ trợ thêm?" : "Need Custom Integration?"}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed font-normal">
                {isVi 
                  ? "Nếu bạn không tìm thấy giải pháp kỹ thuật cụ thể trong tài liệu, hãy kết nối ngay với bộ phận hỗ trợ kỹ thuật Identra."
                  : "If you are struggling on specific curves integration or mobile storage sandboxes, feel free to submit developer logs."}
              </p>
              <button 
                onClick={onOpenDemo}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5B6CFF] hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                <span>{isVi ? "Liên hệ chuyên gia kỹ thuật →" : "Consult a security expert →"}</span>
              </button>
            </div>
          </div>

          {/* Right Accordion Side: Interactive answers */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] dark:border-slate-800/50 mb-6">
              <div className="text-left">
                <h3 className="text-xs.5 font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {isVi ? "Danh sách câu hỏi liên quan" : "CORRESPONDING FAQS"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-450">
                  {isVi 
                    ? `Hiển thị ${filteredFaqs.length} nội dung phân loại` 
                    : `Showing ${filteredFaqs.length} matching entries`
                  }
                </p>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-[#5B6CFF] hover:underline bg-transparent border-none cursor-pointer"
                >
                  {isVi ? "Đặt lại tìm kiếm" : "Reset filters"}
                </button>
              )}
            </div>

            <AnimatePresence initial={false}>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item, index) => {
                  const isOpen = expandedFaq === item.id;
                  const qText = isVi ? item.q.vi : item.q.en;
                  const aText = isVi ? item.a.vi : item.a.en;
                  
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
                        onClick={() => toggleAccordion(item.id)}
                        className="w-full px-5 py-4.5 flex items-center justify-between text-left font-bold text-slate-900 dark:text-white hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] transition-colors cursor-pointer gap-4 text-sm sm:text-base bg-transparent border-none"
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Numbered step indicator styled elegantly */}
                          <div className={`w-6.5 h-6.5 rounded-lg text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            isOpen 
                              ? 'bg-[#5B6CFF] text-white' 
                              : 'bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400'
                          }`}>
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <span className="leading-snug">{qText}</span>
                        </div>
                        <span className={`p-1 rounded-lg transition-transform duration-300 shrink-0 ${
                          isOpen ? 'bg-[#5B6CFF]/10 text-[#5B6CFF] rotate-180' : 'bg-slate-100 dark:bg-slate-850 text-[#6B7280]'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
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
                              {aText}
                              {/* Action helper inside expanded Accordion */}
                              <div className="mt-4 pt-3 border-t border-dashed border-gray-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                                <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                                  {isVi ? `Phân mục: ${categories.find(c => c.id === item.category)?.vi}` : `Domain: ${categories.find(c => c.id === item.category)?.en}`}
                                </span>
                                <button
                                  onClick={onOpenDemo}
                                  className="inline-flex items-center gap-1 text-[#5B6CFF] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer text-[11px]"
                                >
                                  <span>{isVi ? "Thử nghiệm trực quan ngay" : "See interactive demo"}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </button>
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
                    {isVi ? "Không tìm thấy câu hỏi phù hợp" : "No matching questions"}
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed font-normal">
                    {isVi 
                      ? "Hãy thử tìm kiếm bằng từ khóa ngắn gọn khác hoặc thay đổi bộ lọc phân mục lựa chọn ở phía bên tay trái."
                      : "Try broadening your query keywords or selecting standard 'All Topics' filters from the left directory."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* 3. EXPERIENCE SANDBOX CALL TO ACTION (Exactly matching AboutSubpage style to preserve consistency) */}
        <div className="max-w-7xl mx-auto py-12 mt-12 text-center">
          <div className="bg-[#3B52FF]/5 dark:bg-[#3B52FF]/10 rounded-3xl p-8 border border-[#3B52FF]/10 max-w-4xl mx-auto space-y-4">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#3B52FF] dark:text-[#7C8CFF] block">
              {isVi ? "Xã hội và niềm tin phi tập trung" : "Experience Self-Sovereignty"}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isVi ? "Bạn đã sẵn sàng khám phá hệ sinh thái?" : "Ready to discover our ecosystem?"}
            </h2>
            <p className="text-xs sm:text-xs.5 text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
              {isVi 
                ? "Thử nghiệm ngay ứng dụng ví định danh độc lập (Sandbox) của chúng tôi để tự khám phá các quy trình phát hành, lưu trữ và ZKP mật mã một cách trực quan nhất!"
                : "Boot up our interactive standalone sandbox dashboard to generate decentralized W3C credentials and test secure Zero-Knowledge Proof validations."}
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
