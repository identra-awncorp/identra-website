import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  Cpu,
  ArrowUpRight,
  Search,
  BookOpen,
  Filter,
  CheckCircle,
  HelpCircle,
  Hash,
  Terminal,
  Activity,
  UserCheck,
  Send,
  Database,
  RefreshCw,
  Copy,
  ChevronRight,
  Info,
  Clock,
  Sparkles,
  Award,
  ArrowLeft
} from 'lucide-react';

interface TechGlossarySubpageProps {
  lang: 'vi' | 'en';
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

type TabType = 'did' | 'vc' | 'zkp';

export default function TechGlossarySubpage({ lang, onBack, onNavigate }: TechGlossarySubpageProps) {
  const isVi = lang === 'vi';

  // State management for interactive terminal
  const [activeTab, setActiveTab] = useState<TabType>('did');
  const [copied, setCopied] = useState(false);

  // Search & filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Interactive Trust Triangle state
  const [activeRelation, setActiveRelation] = useState<'issue' | 'verify' | 'trust' | null>(null);

  // Interactive ZKP calculator states
  const [birthYear, setBirthYear] = useState<number>(2001);
  const [targetAgeGate, setTargetAgeGate] = useState<number>(18);
  const [zkpGenerating, setZkpGenerating] = useState<boolean>(false);
  const [zkpStep, setZkpStep] = useState<number>(0);
  const [zkpProof, setZkpProof] = useState<any | null>(null);

  const currentYear = new Date().getFullYear();
  const calculatedAge = currentYear - birthYear;
  const satisfiesGate = calculatedAge >= targetAgeGate;

  // Code snippets for terminal switch
  const codeSnippets = {
    did: {
      filename: 'did_document.json',
      content: `{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "did:identra:sol:8fP1k92Xm...N47uK",
  "verificationMethod": [{
    "id": "did:identra:sol:8fP1P...#key-1",
    "type": "Ed25519VerificationKey2020",
    "controller": "did:identra:sol:8fP1k92Xm...N47uK",
    "publicKeyMultibase": "z6MkpTHR8VNsBxas9m526g89K..."
  }],
  "authentication": [
    "did:identra:sol:8fP1P...#key-1"
  ],
  "assertionMethod": [
    "did:identra:sol:8fP1P...#key-1"
  ]
}`
    },
    vc: {
      filename: 'identra_degree_credential.json',
      content: `{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schema.org"
  ],
  "id": "urn:uuid:5d8a87ee-84cb-4d7a-af34-7223b9f3900b",
  "type": ["VerifiableCredential", "UniversityDegreeCredential"],
  "issuer": "did:identra:edu:hust-primary-node",
  "issuanceDate": "2026-05-18T08:30:00Z",
  "credentialSubject": {
    "id": "did:identra:user:tuan-hoang",
    "fullName": "HOÀNG ANH TUẤN",
    "university": "Đại Học Bách Khoa Hà Nội",
    "major": "Computer Science & Cryptography",
    "gpa": "3.85 / 4.0"
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2026-05-18T08:31:12Z",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:identra:edu:hust...#key-1",
    "proofValue": "z9GjK4pS7aXmN...9dK2P3yL0wQ..."
  }
}`
    },
    zkp: {
      filename: 'zk_snark_proof_groth16.json',
      content: `{
  "curve": "bn128",
  "scheme": "groth16",
  "proof": {
    "pi_a": [
      "0x1cb904ef2b34cd8ffea...",
      "0x09da77fc243ab90ff21..."
    ],
    "pi_b": [
      ["0x1d3a04e5...", "0x0b220e98..."],
      ["0x23aa1ff2...", "0x14bc55fb..."]
    ],
    "pi_c": [
      "0x04fbe1b899a7cd6ac7...",
      "0x2aa78de0019ff20dfb..."
    ]
  },
  "publicInputs": [
    "0x0000000000000000000000000000000000000012", // Threshold is 18
    "0x0000000000000000000000000000000000000001" // Condition is met (True)
  ]
}`
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Run ZK SNARK simulation process
  const triggerZkpSimulation = () => {
    setZkpGenerating(true);
    setZkpStep(1);
    setZkpProof(null);

    setTimeout(() => {
      setZkpStep(2);
      setTimeout(() => {
        setZkpStep(3);
        setTimeout(() => {
          setZkpStep(4);
          setTimeout(() => {
            setZkpGenerating(false);
            setZkpProof({
              timestamp: new Date().toISOString(),
              algorithm: 'zk-SNARKs Groth16',
              constraintsCount: 14208,
              proofValue: `0x${Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
              publicInputs: {
                minAge: targetAgeGate,
                satisfied: satisfiesGate ? 'TRUE (1)' : 'FALSE (0)'
              },
              verificationResult: 'SUCCESSFULLY VERIFIED BY CRYTOGRAPHIC GATE'
            });
          }, 600);
        }, 800);
      }, 700);
    }, 600);
  };

  // Detailed standard terms
  const specsTable = [
    {
      tech: "Decentralized Identifiers (DIDs)",
      standard: "W3C DID Core 1.0 Spec",
      usage: isVi ? "Chìa khóa nhận danh toàn cầu không máy chủ trung tâm" : "Globally unique decentralized URI string identifiers",
      strength: isVi ? "Mật mã 256-bit chống va chạm tuyệt đối" : "Cryptographically unique, collision-proof 256-bit entropy"
    },
    {
      tech: "Verifiable Credentials (VCs)",
      standard: "W3C Verifiable Credentials Data Model v1.1",
      usage: isVi ? "Hồ sơ, Căn cước công dân số có đóng mộc điện tử" : "Electronic tamper-proof certificates issued by state/universities",
      strength: isVi ? "Chữ ký mã hóa của đại lượng phát hành" : "JSON-LD cryptographic assertions binding issuer private key"
    },
    {
      tech: "Verifiable Presentations (VPs)",
      standard: "W3C VP Exchange Spec Model",
      usage: isVi ? "Bộ bằng chứng kết xuất thông tin có chọn lọc của người dùng" : "User-packaged credential attributes shared with verifiers",
      strength: isVi ? "Ký số lâm thời bằng cặp khóa của Ví" : "Ephemeral signature created by holder's device keys on-the-fly"
    },
    {
      tech: "Zero-Knowledge Proofs (ZKP)",
      standard: "zk-SNARKs (Groth16 / Plonk)",
      usage: isVi ? "Chứng minh điều kiện đúng không rò thông tin thô" : "Verify raw claims without revealing underlying secrets",
      strength: isVi ? "Toán học đa thức phi tuyến tính" : "Higher-order non-linear mathematics, zero data transfer leak"
    },
    {
      tech: "OpenID Connect for VCs",
      standard: "OIDC4VC / OIDC4VP Protocol Draft",
      usage: isVi ? "Truyền nhận VC/VP qua hạ tầng Web quen thuộc" : "Federated Web-ready presentation exchange architecture",
      strength: isVi ? "Sử dụng JSON Web Token & Bearer Tokens bảo mật" : "Re-uses enterprise OAuth infrastructure with DID keys"
    },
    {
      tech: "Decentralized Key Management",
      standard: "W3C DKMS v2 / BIP-39 Seeds",
      usage: isVi ? "Khôi phục và lưu trữ khóa cá nhân bảo mật cao" : "Decentralized secure user storage and key rotation schemes",
      strength: isVi ? "Khôi phục chuỗi phân mảnh Social Recovery" : "Multi-sig social shard distribution and offline hardware vaults"
    }
  ];

  type GlossaryItem = {
    id: string;
    termVi: string;
    termEn: string;
    category: 'identity' | 'cryptography' | 'protocol' | 'storage';
    descVi: string;
    descEn: string;
    standard: string;
    metricsVi: string;
    metricsEn: string;
  };

  const glossaryItems: GlossaryItem[] = [
    {
      id: "did",
      termVi: "Định danh phi tập trung (Decentralized Identifier - DID)",
      termEn: "Decentralized Identifier (DID)",
      category: "identity",
      descVi: "Là địa chỉ định danh số toàn cầu duy nhất có nguồn gốc từ toán học mật mã. Khác với email hay ID hệ thống do Google/Facebook cung cấp, DID do chính thiết bị của bạn tự sinh ra và không chịu sự quản lý, thu hồi của bất kỳ tổ chức trung gian nào.",
      descEn: "A globally unique digital address with roots in cryptography. Unlike emails or system IDs provided by Google/Facebook, DIDs are generated directly on your local device and are completely free from any risk of centralized revocation.",
      standard: "W3C DID Core 1.0 Spec",
      metricsVi: "Khóa mật mã RSA 4096-bit hoặc Ed25519 256-bit độ an toàn tuyệt đối.",
      metricsEn: "Highly secure RSA 4096-bit or Ed25519 256-bit public-private key pairs."
    },
    {
      id: "vc",
      termVi: "Thực chứng số có thể xác minh (Verifiable Credential - VC)",
      termEn: "Verifiable Credential (VC)",
      category: "identity",
      descVi: "Là văn bản số được cấp và ký số bởi một cơ quan có thẩm quyền (như Trường học, Cơ quan cấp CCCD). VC lưu trữ cục bộ trong ví Identra của bạn, chứa chữ ký số không thể giả mạo giúp bên thứ ba dễ dàng xác minh mức độ tin cậy.",
      descEn: "A core digital standard for credentials issued and cryptographically signed by authorized bodies (e.g., Universities, Governments). Stored locally in your Identra wallet, containing tamper-evident signatures.",
      standard: "W3C VC Data Model v1.1",
      metricsVi: "Ràng buộc tính toàn vẹn thông tin toán học bằng hàm băm SHA-256.",
      metricsEn: "Data integrity cryptographically bound via secure SHA-256 hash digests."
    },
    {
      id: "vp",
      termVi: "Bản trình diện có thể xác minh (Verifiable Presentation - VP)",
      termEn: "Verifiable Presentation (VP)",
      category: "protocol",
      descVi: "Khi một dịch vụ yêu cầu xác minh thông tin, bạn không trao gửi nguyên vẹn tệp VC gốc. Ví Identra sẽ trích xuất các trường thông tin cần thiết và ký một chữ ký tạm thời trên VP để chứng minh sở hữu mà không sợ lộ thông tin thừa.",
      descEn: "A package configured on-the-fly dynamically containing selective fields extracted from raw VCs. Signed dynamically with the holder's temporary interaction key to prove ownership without leakage.",
      standard: "W3C Verifiable Presentations Specs",
      metricsVi: "Sử dụng Thử thách-Phản hồi chống phát lại tấn công (Replay attack).",
      metricsEn: "Includes high-entropy challenge-response tokens preventing replay attacks."
    },
    {
      id: "zkp",
      termVi: "Bằng chứng Không Tiết Lộ (Zero-Knowledge Proof - ZKP)",
      termEn: "Zero-Knowledge Proof (ZKP)",
      category: "cryptography",
      descVi: "Phương pháp mật mã học hiện đại siêu cấp cho phép một bên chứng minh cho bên khác một phát biểu là chính xác (ví dụ: 'Tôi trên 18 tuổi') mà tuyệt đối không tiết lộ thông tin chi tiết (ngày tháng năm sinh hay tuổi thật).",
      descEn: "A premier cryptographic technique allowing a holder to prove that a specific statement is mathematically true (e.g. 'I am over 21') without disclosing any raw data or underlying parameters.",
      standard: "zk-SNARKs / Groth16 Framework",
      metricsVi: "Xử lý thông qua đường cong Elliptic BN254 chứng minh trong mili-giây.",
      metricsEn: "Operates using BN254 pairing-friendly elliptic curves with sub-second proof times."
    },
    {
      id: "did-doc",
      termVi: "Văn bản DID (DID Document)",
      termEn: "DID Document",
      category: "protocol",
      descVi: "Là tệp dữ liệu dạng JSON-LD mô tả kỹ thuật một DID cụ thể. Nó không chứa bất cứ dữ liệu nhạy cảm nào, chỉ lưu trữ các khóa công khai (Public Keys) dùng để kiểm thử chữ ký mật mã và các dịch vụ cổng kết nối ứng dụng tin cậy.",
      descEn: "A public JSON-LD file resolved from a DID. It contains no personal information, containing only public verification keys used by verifiers to mathematically cross-examine holding claims.",
      standard: "Decentralized Registry Core Spec",
      metricsVi: "Công khai vĩnh viễn trên mạng ngang hàng hoặc sổ cái phi tập trung.",
      metricsEn: "Non-custodially public, readable on P2P protocols or decentralized ledgers."
    },
    {
      id: "trust-triangle",
      termVi: "Tam giác Tin cậy (Trust Triangle Architecture)",
      termEn: "Trust Triangle Architecture",
      category: "protocol",
      descVi: "Kiến trúc tương tác ba chiều của danh tính phi tập trung bao gồm: Issuer (Bên Cấp VC) ký văn bằng, Holder (Người Dùng) lưu trữ an toàn trong ví, và Verifier (Bên Xác Minh) kiểm tra chữ ký tức thời mà không cần gọi hỏi máy chủ Issuer.",
      descEn: "The fundamental interaction loop of SSI consisting of representation roles: The Issuer (who signs), the Holder (who manages inside their local wallet), and the Verifier (who audits proofs in offline environments).",
      standard: "SSI Core Framework",
      metricsVi: "Loại bỏ hoàn toàn kiến trúc kết nối API liên tục (Zero API Dependency).",
      metricsEn: "Deletes back-and-forth server API check callbacks, reducing server load."
    },
    {
      id: "dkms",
      termVi: "Quản lý khóa phân tán (Decentralized Key Management - DKMS)",
      termEn: "Decentralized Key Management (DKMS)",
      category: "storage",
      descVi: "Cơ chế bảo mật đảm bảo người dùng tự làm chủ chìa khóa giải mã dữ liệu của mình mà không sợ mất mát. Hỗ trợ lưu trữ cục bộ bảo vệ trên phần cứng Keychain/Secure Enclave phối hợp với các nút Social Recovery tin cậy.",
      descEn: "An adaptive suite designed for sovereign key-pair storage without central storage servers. Promotes local hardware Secure Enclave integration combined with friendly social shard setups.",
      standard: "W3C DKMS Standard Guide v2",
      metricsVi: "Sử dụng Thuật toán Chia sẻ Bí mật hồi phục phân mảnh (Shamir's Secret Sharing).",
      metricsEn: "Secured using Shamir's Secret Sharing cryptography for social recovery."
    },
    {
      id: "selective-disclosure",
      termVi: "Tiết lộ Thông tin chọn lọc (Selective Disclosure)",
      termEn: "Selective Disclosure",
      category: "cryptography",
      descVi: "Khả năng phân tích và cắt lọc chỉ cung cấp các thuộc tính dữ liệu tối thiểu cần thiết trong một hồ sơ lớn. Khi trình diện bằng lái xe số, bạn có thể che giấu địa chỉ nhà và số căn cước, chỉ lộ ảnh thẻ đại diện và phân hạng giấy phép lái xe.",
      descEn: "An encryption ability to redact and reveal only the specific attributes required. When proving a digital driver license, you can blind your home address while supplying only your license class.",
      standard: "BBS+ Signatures / SD-JWT",
      metricsVi: "Đóng gói băm mù tự chủ và chữ ký đa thông điệp tiên tiến BBS+.",
      metricsEn: "Provides multi-message BBS+ digital signatures and blinding capabilities."
    }
  ];

  // Filtering list
  const filteredGlossary = glossaryItems.filter(item => {
    const matchesSearch = 
      item.termVi.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.termEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descEn.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && item.category === selectedCategory;
  });

  return (
    <div className="bg-[#F7F8FC] dark:bg-[#0B0F1A] min-h-screen text-[#1F2937] dark:text-[#E5E7EB] pb-24 font-sans select-none overflow-x-hidden transition-colors duration-300">
      
      {/* 1. HERO SECTION - Synchronized EXACTLY with FAQ / UseCases layout */}
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

          <div className="relative text-left">
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-12">
              
              {/* Left Hero Column matching structure of UseCasesSubpage.tsx */}
              <div className="space-y-6 lg:col-span-7">

            {/* Standard subpage visual tag/pill */}
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/8 px-3.5 py-1.5 rounded-full border border-[#5B6CFF]/10 w-fit">
              <Cpu className="w-3.5 h-3.5 mr-0.5" />
              <span>{isVi ? "Kiến trúc công nghệ" : "Technology & Framework"}</span>
            </div>

            {/* Structured Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              {isVi ? "Thuật ngữ & Kiến trúc " : "Glossary & Architecture "} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#5B6CFF] to-[#8F9BFF] dark:from-[#7C8CFF] dark:to-[#8F9BFF] bg-clip-text text-transparent">
                {isVi ? "nền tảng định danh SSI" : "of the SSI Platform"}
              </span>
            </h1>

            {/* Styled Subtitle */}
            <p className="text-base sm:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl font-normal">
              {isVi 
                ? "Báo cáo chi tiết các chuẩn mực kỹ thuật và hệ thống mật mã số tự giữ. SSI Wallet cam kết vận hành minh bách dựa trên nghiên cứu mật mã đột phá và tiêu chuẩn W3C mở."
                : "Technical specification of self-sovereign digital identity patterns and cryptography. Our platform aligns strictly with W3C recommendations and peer-vetted standards."}
            </p>

            {/* Row of Perks matching exact design and icons of UseCasesSubpage */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t border-gray-100 dark:border-slate-850">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-gray-200">
                <ShieldCheck className="w-[22px] h-[22px] text-[#5B6CFF]" strokeWidth={2.5} />
                <span className="text-[15px] font-semibold text-[#374151] dark:text-gray-300 font-sans">
                  {isVi ? "Tiêu chuẩn W3C" : "W3C Compliant"}
                </span>
              </div>
              
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-gray-200">
                <Lock className="w-5 h-5 text-[#5B6CFF]" strokeWidth={2.5} />
                <span className="text-[15px] font-semibold text-[#374151] dark:text-gray-300 font-sans">
                  {isVi ? "Không rò rỉ dữ liệu" : "Zero Data Leaks"}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800 dark:text-gray-200">
                <ShieldCheck className="w-[22px] h-[22px] text-[#5B6CFF]" strokeWidth={2.5} />
                <span className="text-[15px] font-semibold text-[#374151] dark:text-gray-300 font-sans">
                  {isVi ? "Xác minh toán học" : "Cryptographic Proof"}
                </span>
              </div>
            </div>

          </div>

          {/* Right Hero Column - Pristine browser-frame visualization matching UseCasesSubpage */}
          <div className="subpage-hero-visual w-full max-w-[30rem] mx-auto lg:col-span-5 lg:justify-self-end hidden lg:block relative">
            {/* Ambient background glow to align elegantly */}
            <div className="absolute w-72 h-72 bg-[#5B6CFF]/15 dark:bg-[#5B6CFF]/10 rounded-full blur-3xl -z-10 pointer-events-none -top-10 -right-10" />

            <div className="relative w-full aspect-[4/3] rounded-3xl bg-slate-900 shadow-xl overflow-hidden border border-slate-800 p-5 font-mono text-xs flex flex-col justify-between">
              
              {/* Browser window top bar controls */}
              <div className="flex items-center justify-between border-b border-slate-801 pb-3 mb-3 shrink-0 font-mono">
                <div className="flex items-center gap-1.5 font-sans">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80 block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
                </div>
                <div className="px-3 py-1 rounded-md bg-slate-800/80 text-[10px] text-gray-400 border border-slate-750 font-mono">
                  {codeSnippets[activeTab].filename}
                </div>
                <button 
                  onClick={handleCopyCode}
                  className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white transition-colors cursor-pointer border-none text-[9px] flex items-center gap-1"
                  title="Copy code"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Interactive JSON tab switcher inside browser header */}
              <div className="flex bg-slate-950 p-1.2 rounded-lg border border-slate-800/60 mb-3 shrink-0 text-[10px] gap-1 font-sans">
                <button
                  onClick={() => setActiveTab('did')}
                  className={`flex-1 py-1 px-2 text-center rounded-md font-bold transition-all cursor-pointer border-none ${
                    activeTab === 'did' 
                      ? 'bg-[#3B52FF] text-white' 
                      : 'text-gray-430 hover:text-gray-202 hover:bg-slate-900 bg-transparent'
                  }`}
                >
                  DID Document
                </button>
                <button
                  onClick={() => setActiveTab('vc')}
                  className={`flex-1 py-1 px-2 text-center rounded-md font-bold transition-all cursor-pointer border-none ${
                    activeTab === 'vc' 
                      ? 'bg-[#3B52FF] text-white' 
                      : 'text-gray-430 hover:text-gray-202 hover:bg-slate-900 bg-transparent'
                  }`}
                >
                  Verifiable Credential
                </button>
                <button
                  onClick={() => setActiveTab('zkp')}
                  className={`flex-1 py-1 px-2 text-center rounded-md font-bold transition-all cursor-pointer border-none ${
                    activeTab === 'zkp' 
                      ? 'bg-[#3B52FF] text-white' 
                      : 'text-gray-430 hover:text-gray-202 hover:bg-slate-900 bg-transparent'
                  }`}
                >
                  zk-SNARK Output
                </button>
              </div>

              {/* Console visual output display area with scroll support */}
              <div className="flex-1 text-left rounded-xl bg-slate-950 p-3.5 border border-slate-850/80 overflow-y-auto max-h-[180px] font-mono text-[10px] leading-relaxed text-[#BAC2E1]">
                <pre className="whitespace-pre-wrap word-break-all text-[9.5px]">
                  {codeSnippets[activeTab].content}
                </pre>
              </div>

              {/* Dynamic telemetry output bar */}
              <div className="flex justify-between items-center text-[8.5px] text-gray-500 font-mono mt-3 pt-2.5 border-t border-slate-800/60 shrink-0 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-pulse" />
                  <span>SYNTAX_COMPLIANT: W3C_V1_CORE</span>
                </div>
                <span>JSON-LD SECURE</span>
              </div>
            </div>

            {/* Floating cryptographic certificate status banner on bottom-right of browser frame */}
            <div 
              className="absolute -bottom-4 -left-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-800 p-3 shadow-xl flex items-center gap-2.5 animate-bounce" 
              style={{ animationDuration: '7s' }}
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-[#3B52FF] flex items-center justify-center shrink-0">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <div className="text-left font-sans">
                <span className="text-[10px] font-black text-[#3B52FF] uppercase tracking-wider block">ED25519 COMPATIBLE</span>
                <span className="text-[9px] text-gray-400 font-bold block">{isVi ? "Khóa công khai 256-bit" : "256-bit secure public key"}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>

      {/* 2. THE TRUST TRIANGLE INTERACTIVE ARCHITECTURE SECTION - visual mapping of roles */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 text-[#3B52FF] dark:text-[#7C8CFF] text-[10px] font-mono font-bold tracking-wider uppercase">
            <Activity className="w-3.5 h-3.5" />
            <span>{isVi ? "MÔ HÌNH VẬN HÀNH" : "SYSTEM DEPLOYMENT LOOPS"}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {isVi ? "Tam Giác Tin Cậy (W3C Trust Triangle)" : "The W3C Cryptographic Trust Triangle"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {isVi 
              ? "Quy trình khép kín ba góc không phụ thuộc trung gian. Chọn một nhánh kết nối bên dưới để tìm hiểu cơ chế mã hóa toán học hoạt động."
              : "A self-contained interaction framework. Tap on any connect line/role to explore the cryptographic equations in flight."}
          </p>
        </div>

        {/* Dynamic Graphic and explanations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-[#0F172A]/40 border border-gray-150 dark:border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-sm text-left">
          
          {/* Interactive SVG Diagram representing Triangle */}
          <div id="trust-triangle-svg-container" className="lg:col-span-6 flex flex-col items-center justify-center relative p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-gray-100 dark:border-slate-900 min-h-[400px]">
            {/* SVG Elements */}
            <svg className="w-full max-w-[540px] aspect-[4/3]" viewBox="0 0 600 450" fill="none">
              <defs>
                <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#3B52FF" />
                </marker>
                <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
                </marker>
                <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#F59E0B" />
                </marker>
                <marker id="arrow-gray" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#94A3B8" />
                </marker>
              </defs>

              {/* Decorative faint layout grid for structure alignment */}
              <polygon points="300,75 100,275 500,275" stroke="currentColor" strokeWidth="1" strokeDasharray="6,6" className="text-gray-200/50 dark:text-slate-800/30" />

              {/* Indirect trust anchor curved relationship (Dashed grey double-headed arc at the bottom) */}
              <path 
                d="M100,295 C150,375 450,375 500,295" 
                stroke={activeRelation === 'trust' ? '#F59E0B' : '#94A3B8'} 
                strokeWidth={activeRelation === 'trust' ? '3' : '2'} 
                strokeDasharray="5,5" 
                fill="none" 
                markerStart="url(#arrow-gray)" 
                markerEnd="url(#arrow-gray)" 
                className="transition-all duration-300 cursor-pointer hover:stroke-[#F59E0B]" 
                onClick={() => setActiveRelation('trust')} 
              />
              
              <text x="300" y="380" textAnchor="middle" className="font-sans text-[11.5px] font-bold fill-slate-500 dark:fill-slate-400 cursor-pointer" onClick={() => setActiveRelation('trust')}>
                {isVi ? "🛡️ Mối quan hệ tin cậy gián tiếp (Không đối soát hay gọi trực tiếp)" : "🛡️ Indirect Trust Loop (No direct communication or phone-home API)"}
              </text>
              <text x="300" y="398" textAnchor="middle" className="font-sans text-[10.5px] font-extrabold fill-emerald-500 dark:fill-emerald-450 cursor-pointer" onClick={() => setActiveRelation('trust')}>
                {isVi ? "✓ Hoàn toàn riêng tư, Bên phát hành không biết lịch sử xác minh của bạn" : "✓ Absolutely private; the original Issuer is blind to your verification events"}
              </text>

              {/* Glowing active animation overlays */}
              {activeRelation === 'issue' && (
                <>
                  <line x1="128" y1="247" x2="272" y2="103" stroke="#3B52FF" strokeWidth="6" className="animate-pulse" />
                  <line x1="140" y1="275" x2="180" y2="275" stroke="#3B52FF" strokeWidth="5" className="animate-pulse" />
                </>
              )}
              {activeRelation === 'verify' && (
                <>
                  <line x1="328" y1="103" x2="472" y2="247" stroke="#10B981" strokeWidth="6" className="animate-pulse" />
                  <line x1="460" y1="275" x2="420" y2="275" stroke="#10B981" strokeWidth="5" className="animate-pulse" />
                </>
              )}
              {activeRelation === 'trust' && (
                <>
                  <line x1="140" y1="275" x2="180" y2="275" stroke="#F59E0B" strokeWidth="5" className="animate-pulse" />
                  <line x1="460" y1="275" x2="420" y2="275" stroke="#F59E0B" strokeWidth="5" className="animate-pulse" />
                  <rect x="180" y="254" width="240" height="42" rx="12" stroke="#F59E0B" strokeWidth="3" className="animate-pulse" fill="none" />
                </>
              )}

              {/* Connection 1: ISSUER -> HOLDER (Issue VC) */}
              <line 
                x1="128" 
                y1="247" 
                x2="272" 
                y2="103" 
                stroke={activeRelation === 'issue' ? "#3B52FF" : "#94A3B8"} 
                strokeWidth="3.5" 
                markerEnd={activeRelation === 'issue' ? "url(#arrow-blue)" : "url(#arrow-gray)"} 
                className="cursor-pointer hover:stroke-[#3B52FF] transition-colors" 
                onClick={() => setActiveRelation('issue')} 
              />

              {/* Connection 2: HOLDER -> VERIFIER (Present VP) */}
              <line 
                x1="328" 
                y1="103" 
                x2="472" 
                y2="247" 
                stroke={activeRelation === 'verify' ? "#10B981" : "#94A3B8"} 
                strokeWidth="3.5" 
                markerEnd={activeRelation === 'verify' ? "url(#arrow-green)" : "url(#arrow-gray)"} 
                className="cursor-pointer hover:stroke-[#10B981] transition-colors" 
                onClick={() => setActiveRelation('verify')} 
              />

              {/* Connection 3: ISSUER -> REGISTRY (Write Public Schema / Key Registrations) */}
              <line 
                x1="140" 
                y1="275" 
                x2="180" 
                y2="275" 
                stroke={activeRelation === 'issue' || activeRelation === 'trust' ? "#3B52FF" : "#94A3B8"} 
                strokeWidth="3" 
                strokeDasharray="5,5" 
                markerEnd={activeRelation === 'issue' || activeRelation === 'trust' ? "url(#arrow-blue)" : "url(#arrow-gray)"} 
                className="cursor-pointer hover:stroke-[#3B52FF] transition-colors" 
                onClick={() => setActiveRelation('issue')} 
              />

              {/* Connection 4: VERIFIER -> REGISTRY (Read & Audit DID resolved public parameters) */}
              <line 
                x1="460" 
                y1="275" 
                x2="420" 
                y2="275" 
                stroke={activeRelation === 'verify' || activeRelation === 'trust' ? "#10B981" : "#94A3B8"} 
                strokeWidth="3" 
                strokeDasharray="5,5" 
                markerEnd={activeRelation === 'verify' || activeRelation === 'trust' ? "url(#arrow-green)" : "url(#arrow-gray)"} 
                className="cursor-pointer hover:stroke-[#10B981] transition-colors" 
                onClick={() => setActiveRelation('verify')} 
              />

              {/* Labels for Connections */}
              {/* Issue label block */}
              <g className="cursor-pointer" onClick={() => setActiveRelation('issue')}>
                <rect x="140" y="145" width="95" height="26" rx="6" fill="#E0E7FF" className="dark:fill-[#1e1b4b] stroke-[#3B52FF]/30 shadow-md" strokeWidth="1.5" />
                <path d="M148,160 L154,160 M148,156 L156,156 M150,152 L156,152" stroke="#3B52FF" strokeWidth="1.8" strokeLinecap="round" />
                <text x="162" y="162" className="font-sans text-[11px] font-black fill-[#3B52FF]">{isVi ? "Cấp phát VC" : "Issue VC"}</text>
              </g>

              {/* Present label block */}
              <g className="cursor-pointer" onClick={() => setActiveRelation('verify')}>
                <rect x="360" y="145" width="100" height="26" rx="6" fill="#D1FAE5" className="dark:fill-[#064e3b] stroke-[#10B981]/30 shadow-md" strokeWidth="1.5" />
                <path d="M368,157 L372,161 L379,153" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <text x="384" y="162" className="font-sans text-[11px] font-black fill-[#047857] dark:fill-[#34d399]">{isVi ? "Trình xuất VP" : "Present VP"}</text>
              </g>

              {/* Write label */}
              <text x="160" y="265" textAnchor="middle" className="font-mono text-[10px] font-black fill-indigo-600 dark:fill-indigo-400 cursor-pointer" onClick={() => setActiveRelation('issue')}>
                {isVi ? "Ghi" : "Write"}
              </text>

              {/* Read label */}
              <text x="440" y="265" textAnchor="middle" className="font-mono text-[10px] font-black fill-emerald-600 dark:fill-emerald-450 cursor-pointer" onClick={() => setActiveRelation('verify')}>
                {isVi ? "Đọc" : "Read"}
              </text>

              {/* Node 2: HOLDER (Người dùng / Ví) - TOP */}
              <g className="cursor-pointer" onClick={() => setActiveRelation('verify')}>
                <circle cx="300" cy="75" r="40" fill="#10B981" className="drop-shadow-lg" />
                {/* User icon */}
                <circle cx="300" cy="67" r="8" stroke="white" strokeWidth="3" fill="none" />
                <path d="M284,84 C284,76 290,73 300,73 C310,73 316,76 316,84" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                
                {/* Texts */}
                <text x="300" y="134" textAnchor="middle" className="font-sans text-[13.5px] font-bold fill-[#0D9488] dark:fill-teal-400 uppercase tracking-wider">
                  {isVi ? "2. CHỦ THỂ (HOLDER)" : "2. HOLDER (HOLDER)"}
                </text>
                <text x="300" y="152" textAnchor="middle" className="font-sans text-[10.5px] font-extrabold fill-slate-500 dark:fill-slate-400">
                  {isVi ? "Ví định danh lưu trữ bảo mật" : "Secure locally integrated wallet"}
                </text>
              </g>

              {/* Node 1: ISSUER (Cơ quan cấp) - BOTTOM LEFT */}
              <g className="cursor-pointer" onClick={() => setActiveRelation('issue')}>
                <circle cx="100" cy="275" r="40" fill="#3B52FF" className="drop-shadow-lg" />
                {/* Classical pillar authority icon */}
                <path d="M84,288 L116,288" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M90,288 L90,274 M100,288 L100,274 M110,288 L110,274" stroke="white" strokeWidth="3" strokeLinecap="round" />
                <path d="M84,270 L116,270 L100,258 Z" stroke="white" strokeWidth="3" fill="none" strokeLinejoin="round" />

                {/* Texts */}
                <text x="100" y="334" textAnchor="middle" className="font-sans text-[13.5px] font-bold fill-[#3B52FF] dark:fill-blue-400 uppercase tracking-wider">
                  {isVi ? "1. BÊN CẤP (ISSUER)" : "1. ISSUER (ISSUER)"}
                </text>
                <text x="100" y="352" textAnchor="middle" className="font-sans text-[10.5px] font-extrabold fill-slate-500 dark:fill-slate-400">
                  {isVi ? "Ký số & cấp phát VC" : "Signs and issues VCs"}
                </text>
              </g>

              {/* Node 3: VERIFIER (Bên xác minh) - BOTTOM RIGHT */}
              <g className="cursor-pointer" onClick={() => setActiveRelation('verify')}>
                <circle cx="500" cy="275" r="40" fill="#F59E0B" className="drop-shadow-lg" />
                {/* Shield Check Icon */}
                <path d="M490,264 C490,264 500,260 500,260 C500,260 510,264 510,264 C510,274 504,284 500,288 C496,284 490,274 490,264 Z" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M495,273 L499,277 L505,270" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                {/* Texts */}
                <text x="500" y="334" textAnchor="middle" className="font-sans text-[13.5px] font-bold fill-[#F59E0B] dark:fill-amber-400 uppercase tracking-wider">
                  {isVi ? "3. BÊN XÁC MINH (VERIFIER)" : "3. VERIFIER (VERIFIER)"}
                </text>
                <text x="500" y="352" textAnchor="middle" className="font-sans text-[10.5px] font-extrabold fill-slate-500 dark:fill-slate-400">
                  {isVi ? "Kiểm thử chữ ký gián tiếp" : "Validates claims independently"}
                </text>
              </g>

              {/* Middle core component: VERIFIABLE DATA REGISTRY (Blockchain / DID document repository) */}
              <g className="cursor-pointer" onClick={() => setActiveRelation('trust')}>
                {/* Registry solid background pill */}
                <rect x="180" y="254" width="240" height="42" rx="12" fill="#1E293B" className="dark:fill-slate-900 stroke-indigo-500/30 dark:stroke-slate-800 shadow-lg" strokeWidth="2" />
                
                {/* Database cylinder icon */}
                <path d="M194,270 C194,267.5 198,266 203,266 C208,266 212,267.5 212,270 M194,270 L194,281 C194,283.5 198,285 203,285 C208,285 212,283.5 212,281 L212,270 M194,275 C194,277.5 198,279 203,279 C208,279 212,277.5 212,275" fill="none" stroke="#818CF8" strokeWidth="2" />

                <text x="222" y="281" className="font-sans text-[11px] font-black fill-slate-100 uppercase tracking-wider">
                  {isVi ? "Kho Dữ Liệu Xác Minh" : "Verifiable Data Registry"}
                </text>
              </g>
            </svg>

            <span className="text-[10px] font-bold text-slate-400 uppercase mt-4 block text-center">
              {isVi ? "▲ Nhấp chuột vào nút liên kết, Sổ cái hoặc đỉnh tam giác để xem luồng cơ chế" : "▲ Click anywhere on connect lines, Registry or icons to explore technical details"}
            </span>
          </div>

          {/* Dynamic Explanations Panel */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              {!activeRelation && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="p-4.5 rounded-2xl bg-indigo-50/50 dark:bg-[#1E1B4B]/20 border border-indigo-120 dark:border-indigo-950 flex gap-3">
                    <Info className="w-5 h-5 text-[#3B52FF] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {isVi ? "Nguyên lý định danh tin cậy toán học" : "Mathematical Trust Philosophy"}
                      </h4>
                      <p className="text-[12.5px] text-slate-500 dark:text-gray-400 leading-relaxed mt-1">
                        {isVi
                          ? "Mô hình SSI hoạt động hoàn toàn khác biệt với các trung tâm định danh cũ. Không còn máy chủ đăng nhập tập trung, không còn nguy cơ sập luồng API liên kết (ví dụ Google/Facebook sập thì bạn kẹt không vào được trang khác)."
                          : "SSI framework cuts dependencies on single tech giants. If Apple or Google's authentication servers go down, you can still securely sign into systems using absolute mathematical assertions."}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                      {isVi ? "Ba tác nhân nòng cốt của mảng" : "The Core representation metrics"}
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl border border-dashed border-gray-200 dark:border-slate-800 text-center">
                        <span className="text-xl font-bold block text-[#3B52FF]">01</span>
                        <span className="text-[11px] font-bold text-slate-800 dark:text-gray-300">{isVi ? "Issuer (Bên Cấp)" : "Issuer (Who signs)"}</span>
                      </div>
                      <div className="p-3.5 rounded-xl border border-dashed border-gray-200 dark:border-slate-800 text-center">
                        <span className="text-xl font-bold block text-[#10B981]">02</span>
                        <span className="text-[11px] font-bold text-slate-800 dark:text-gray-300">{isVi ? "Holder (Bạn)" : "Holder (Your Wallet)"}</span>
                      </div>
                      <div className="p-3.5 rounded-xl border border-dashed border-gray-200 dark:border-slate-800 text-center">
                        <span className="text-xl font-bold block text-[#F59E0B]">03</span>
                        <span className="text-[11px] font-bold text-slate-800 dark:text-gray-300">{isVi ? "Verifier (Đối tác)" : "Verifier (Verifier)"}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeRelation === 'issue' && (
                <motion.div
                  key="issue"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#3B52FF]/10 text-[#3B52FF] text-[10px] font-bold uppercase tracking-wider">
                    {isVi ? "LUỒNG CẤP PHÁT (ISSUING)" : "ISSUANCE FLOW"}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {isVi ? "Từ Issuer (Cơ quan cấp) ➜ Holder (Bạn)" : "From Issuer (Issuing unit) ➜ Holder (Local Wallet)"}
                  </h3>
                  <p className="text-[12.5px] text-slate-600 dark:text-gray-400 leading-relaxed">
                    {isVi
                      ? "Khi một trường đại học ký bằng tốt nghiệp số hoặc Bộ công an phát hành CCCD số cho bạn: Họ đóng gói thông tin vào biểu mẫu JSON-LD, tạo mã băm (SHA-256) và dùng khóa bảo mật (Private Key) của họ để tạo chữ ký số Ed25519 gắn liền vào tài liệu (Verifiable Credential)."
                      : "When a trust authority issues credentials: they serialize details in a JSON-LD format, run SHA-256 integrity hashes, and sign with his private key. The secure signature is appended directly to the document payload, generating the Verifiable Credential (VC)."}
                  </p>
                  
                  <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4.5 border border-gray-150 dark:border-slate-850 space-y-2 font-mono text-[10.5px]">
                    <div className="flex justify-between border-b border-gray-200/60 dark:border-slate-800 pb-1 text-gray-500 font-bold">
                      <span>FLOW LOGS / TELEMETRY</span>
                      <span className="text-[#3B52FF]">COMPLETED</span>
                    </div>
                    <p className="text-[#3CD070]">✔ SHA-256 matching constraints: "0x1b9c0..."</p>
                    <p className="text-gray-400">✔ private_key_author: <span className="text-[#3CD070]">"did:identra:edu:hust#key-1"</span></p>
                    <p className="text-gray-400">✔ encryption_scheme: <span className="text-[#3CD070]">"Ed25519VerificationKey2020"</span></p>
                  </div>
                  <button onClick={() => setActiveRelation(null)} className="text-xs font-bold text-[#3B52FF] hover:underline bg-transparent border-none p-0 cursor-pointer">{isVi ? "Quay lại" : "Back to Overview"}</button>
                </motion.div>
              )}

              {activeRelation === 'verify' && (
                <motion.div
                  key="verify"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                    {isVi ? "LUỒNG TRÌNH DIỆN (PRESENTATION)" : "PRESENTATION FLOW"}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {isVi ? "Từ Holder (Ví của bạn) ➜ Verifier (Bên xác nhận)" : "From Holder (Active Wallet) ➜ Verifier (Verifier Partner)"}
                  </h3>
                  <p className="text-[12.5px] text-slate-600 dark:text-gray-400 leading-relaxed">
                    {isVi
                      ? "Khi bạn đăng nhập vào ngân hàng hay quét vé concert, họ gửi thách thức số ngẫu nhiên (Digital Challenge). Ví của bạn trích xuất dữ liệu VC tương ứng theo yêu cầu tối giản, bọc vào Verifiable Presentation (VP) và ký bằng Khóa riêng tư bảo mật của ví. Verifier nhận được và tự động giải băm độc lập."
                      : "When you authenticate into partner portals: the client system throws an unpredictable random digital challenge value. Your app extracts requested claims from offline VCs on-the-fly, boxes assertions into Verifiable Presentations (VPs) and locks with holder device root keys dynamically."}
                  </p>
                  
                  <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4.5 border border-gray-150 dark:border-slate-850 space-y-2 font-mono text-[10.5px]">
                    <div className="flex justify-between border-b border-gray-200/60 dark:border-slate-800 pb-1 text-gray-500 font-bold">
                      <span>CHALLENGE MATCHING SYSTEM</span>
                      <span className="text-emerald-500">ACTIVE</span>
                    </div>
                    <p className="text-[#3CD070]">✔ anti_replay_token: "challenge_ref_992a0bd8e"</p>
                    <p className="text-gray-400">✔ selective_disclosure: <span className="text-amber-500">Enable ZK-SNARK (Age Gate Approved)</span></p>
                    <p className="text-gray-400">✔ integrity_status: <span className="text-[#3CD070]">VALID</span></p>
                  </div>
                  <button onClick={() => setActiveRelation(null)} className="text-xs font-bold text-[#3B52FF] hover:underline bg-transparent border-none p-0 cursor-pointer">{isVi ? "Quay lại" : "Back to Overview"}</button>
                </motion.div>
              )}

              {activeRelation === 'trust' && (
                <motion.div
                  key="trust"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 text-[10px] font-bold uppercase tracking-wider">
                    {isVi ? "BẢO CHỨNG DUYÊN NỢ (TRUST ROOT)" : "DECIDED ROOT TRUST INDEX"}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {isVi ? "Truy vấn Khóa công khai từ DID Document" : "Query Public Key resolution via decentralized DID"}
                  </h3>
                  <p className="text-[12.5px] text-slate-600 dark:text-gray-400 leading-relaxed">
                    {isVi
                      ? "Điểm kỳ diệu tối thượng của SSI nằm ở đây: Bên xác minh (Verifier) KHÔNG cần gửi truy vấn kiểm tra dữ liệu ngược về máy chủ của Bên cấp (Issuer). Họ chỉ sử dụng địa chỉ DID của bên cấp giải mã trực tiếp ra Public Key trên sổ cái, rồi đối chiếu khớp biểu thức toán học là xong ngay tức thì!"
                      : "The ultimate peak of self-sovereign models: Verifiers NEVER require connecting background APIs back to the original Issuer servers. They simply resolve the Issuer's DID string to discover their public key multibase directly, solving math claims offline instantaneously."}
                  </p>
                  
                  <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4.5 border border-gray-150 dark:border-slate-850 space-y-2 font-mono text-[10.5px]">
                    <div className="flex justify-between border-b border-gray-200/60 dark:border-slate-800 pb-1 text-gray-500 font-bold">
                      <span>OFFLINE MATHEMATICAL CHECK</span>
                      <span className="text-amber-500">SUCCESS</span>
                    </div>
                    <p className="text-gray-400">✔ resolved_did_target: <span className="text-[#3CD070]">"did:identra:edu:hust-node"</span></p>
                    <p className="text-gray-400">✔ root_identity_status: <span className="text-[#3CD070]">"TRUST_REGISTRY_APPROVED"</span></p>
                    <p className="text-gray-400">✔ verify_signature_eval: <span className="text-[#3CD070]">"MATCH (TRUE)"</span></p>
                  </div>
                  <button onClick={() => setActiveRelation(null)} className="text-xs font-bold text-[#3B52FF] hover:underline bg-transparent border-none p-0 cursor-pointer">{isVi ? "Quay lại" : "Back to Overview"}</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE CRYPTOGRAPHIC & ZKP PLAYPEN - Lab thực hành bằng chứng không tiết lộ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div 
          onClick={() => onNavigate?.('zkp-demo')}
          className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-br from-indigo-950 via-slate-900 to-[#0F172A] border border-indigo-500/20 text-white relative overflow-hidden shadow-2xl text-left cursor-pointer group hover:border-[#3B52FF]/40 transition-all duration-300"
        >
          {/* Ambient glow effects */}
          <div className="absolute -right-16 -top-16 w-85 h-85 bg-gradient-to-br from-[#3B52FF]/20 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute left-10 bottom-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest uppercase">
                <Sparkles className="text-amber-400 w-3.5 h-3.5 animate-pulse" />
                <span className="text-indigo-200">{isVi ? "MODULE CHUYÊN SÂU" : "ADVANCED GRAPHIC SUITE"}</span>
              </div>
              
              {/* Main title */}
              <div className="space-y-3">
                <h3 className="text-2.5xl sm:text-4xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent group-hover:text-white transition-colors">
                  {isVi 
                    ? "Phòng Thực Hành Bằng Chứng Không Tiết Lộ (ZKP)" 
                    : "Zero-Knowledge Proof (ZKP) Lab Sandbox"}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl font-light">
                  {isVi
                    ? "Trải nghiệm trực quan hóa thuật toán mã hóa tối tân zk-SNARKs Groth16. Thử đóng vai trò là Chủ Thể (Holder) để chứng minh các điều kiện tuổi tác, quốc gia hoặc học lực mà hoàn toàn bảo mật, không rò rỉ bất kỳ thông tin nhạy cảm nào."
                    : "Test selective-disclosure credentials dynamically acting as the Holder. Experience modern zk-SNARK Groth16 verification loops and see how proofs are verified instantaneously on-the-fly without exposing personal raw metadata."}
                </p>
              </div>

              {/* Stats badges / visual indicators */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">{isVi ? "Công nghệ zk-SNARKs" : "zk-SNARKs Engine"}</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#3B52FF]" />
                  <span className="text-xs font-mono font-bold text-slate-300">Groth16 Prover</span>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">{isVi ? "Trực quan hóa thời gian thực" : "Real-time Telemetry"}</span>
                </div>
              </div>
            </div>

            {/* CTA action section on the right */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#3B52FF] to-indigo-600 opacity-20 blur group-hover:opacity-60 transition duration-300" />
                <button
                  type="button"
                  onClick={() => onNavigate?.('zkp-demo')}
                  style={{ padding: '14px 28px' }}
                  className="relative px-6 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm tracking-wider transition-all duration-200 outline-none border-none cursor-pointer flex items-center justify-center gap-3 shadow-xl uppercase group-hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>{isVi ? "Khám phá phòng Demo ZKP" : "Explore ZKP Demo Lab"}</span>
                  <ArrowUpRight className="w-4.5 h-4.5 text-[#3B52FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE COMPREHENSIVE SEARCHABLE GLOSSARY SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] block">
              {isVi ? "Tra cứu sâu" : "Deep Indexing"}
            </span>
            <h2 className="text-2.5xl sm:text-3.5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {isVi ? "Cơ sở dữ liệu thuật ngữ chuyên môn" : "Technical Dictionary & Terms Database"}
            </h2>
          </div>

          {/* Search bar & filter controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder={isVi ? "Tìm thuật ngữ hoặc chuẩn..." : "Search specs or standards..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-800 dark:text-gray-100 placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#3B52FF]/20 focus:border-[#3B52FF] transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {/* Category Filters List */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-gray-100 dark:border-slate-800/60 text-left">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${selectedCategory === 'all' ? 'bg-[#3B52FF] text-white shadow-md shadow-[#3B52FF]/15' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-gray-400 hover:text-slate-800 hover:bg-slate-50'}`}
          >
            {isVi ? "Tất cả" : "All Concepts"}
          </button>
          <button
            onClick={() => setSelectedCategory('identity')}
            className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${selectedCategory === 'identity' ? 'bg-[#3B52FF] text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-gray-400 hover:text-slate-800'}`}
          >
            {isVi ? "Định Danh & Vai Trò" : "Identity Entities"}
          </button>
          <button
            onClick={() => setSelectedCategory('cryptography')}
            className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${selectedCategory === 'cryptography' ? 'bg-[#3B52FF] text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-gray-400 hover:text-slate-800'}`}
          >
            {isVi ? "Mật Mã Học (ZKP/BBS+)" : "Advanced Cryptography"}
          </button>
          <button
            onClick={() => setSelectedCategory('protocol')}
            className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${selectedCategory === 'protocol' ? 'bg-[#3B52FF] text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-gray-400 hover:text-slate-800'}`}
          >
            {isVi ? "Giao Thức Truyền Tin" : "Data Protocols"}
          </button>
          <button
            onClick={() => setSelectedCategory('storage')}
            className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${selectedCategory === 'storage' ? 'bg-[#3B52FF] text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-gray-400 hover:text-slate-800'}`}
          >
            {isVi ? "Lưu Trữ & Quản Lý" : "Storage & Key Mgmt"}
          </button>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <AnimatePresence>
            {filteredGlossary.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="group p-6 rounded-2xl bg-white dark:bg-[#0F172A]/40 border border-gray-200 dark:border-slate-800/80 hover:border-[#3B52FF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-xl dark:hover:shadow-2xl/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Card category tag & Standard badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9.5px] font-black tracking-widest uppercase px-2.5 py-1 rounded bg-[#3B52FF]/8 dark:bg-[#3B52FF]/12 text-[#3B52FF] dark:text-[#7C8CFF] font-mono">
                      {item.category === 'identity' ? (isVi ? 'ĐỊNH DANH' : 'IDENTITY') :
                       item.category === 'cryptography' ? (isVi ? 'MẬT MÃ HỌC' : 'CRYPTOGRAPHY') :
                       item.category === 'protocol' ? (isVi ? 'GIAO THỨC' : 'PROTOCOL') :
                       (isVi ? 'QUẢN LÝ KHÓA' : 'KEY MANAGEMENT')}
                    </span>

                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-extrabold flex items-center gap-1 bg-slate-50 dark:bg-slate-950/40 px-2 py-0.5 rounded border border-gray-100 dark:border-slate-800/50">
                      <Hash className="w-3.5 h-3.5 text-[#3B52FF] dark:text-[#7C8CFF]" />
                      {item.standard}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight mb-2.5 group-hover:text-[#3B52FF] dark:group-hover:text-[#7C8CFF] transition-colors">
                    {isVi ? item.termVi : item.termEn}
                  </h3>

                  {/* Descr */}
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal mb-6">
                    {isVi ? item.descVi : item.descEn}
                  </p>
                </div>

                {/* Secure Metrics display at footer of card */}
                <div className="pt-4 border-t border-gray-150 dark:border-slate-800/80 font-sans text-xs flex items-start gap-2.5">
                  <div className="p-1 px-1.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] font-bold tracking-wider shrink-0 uppercase mt-0.5">
                    {isVi ? "Xác minh" : "Verified"}
                  </div>
                  <div>
                    <span className="font-extrabold text-[10px] text-slate-800 dark:text-slate-300 block mb-0.5 uppercase tracking-wide">
                      {isVi ? "Tham số bảo mật:" : "Security Parameter:"}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[10.5px] leading-relaxed font-mono">
                      {isVi ? item.metricsVi : item.metricsEn}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty search results backup rendering */}
          {filteredGlossary.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-500 bg-white dark:bg-[#0F172A]/50 border border-dashed border-gray-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-3">
              <Search className="w-12 h-12 text-[#3B52FF]/20" />
              <div>
                <p className="font-bold text-slate-800 dark:text-gray-200">{isVi ? "Không tìm thấy kết quả" : "No glossary items resolved"}</p>
                <p className="text-xs text-slate-500 mt-1">{isVi ? "Thay đổi từ khóa tìm kiếm của bạn và thử lại." : "Try clearing filter restrictions or typing other keywords."}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. SPECIFICATION MATRIX OVERVIEW TABLE - Full comparison standard conformed specifications */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="border border-gray-150 dark:border-slate-850/80 rounded-3xl overflow-hidden bg-white dark:bg-[#0F172A] shadow-md text-left">
          <div className="p-6 border-b border-gray-100 dark:border-slate-800/80">
            <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
              {isVi ? "Tổng hợp thông số các Tiêu Chuẩn Quốc Tế Áp Dụng" : "Conformed Specifications Conformance Matrix"}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mt-1">
              {isVi 
                ? "Dữ liệu cấu trúc tuân chuẩn hoàn hảo các tiêu chuẩn danh mục của tổ chức W3C, Decentralized Identity Foundation (DIF)." 
                : "Standard-vetted profile listings adhering directly to W3C Decentralized Identity Foundation standards."}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs select-text">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-950/40 text-gray-400 border-b border-gray-110 dark:border-slate-800">
                  <th className="p-4 sm:p-5 font-black uppercase text-[10px] tracking-wider">{isVi ? "Khái niệm cốt lõi" : "Technology Concept"}</th>
                  <th className="p-4 sm:p-5 font-black uppercase text-[10px] tracking-wider">{isVi ? "Chuẩn toàn cầu" : "Global Standard"}</th>
                  <th className="p-4 sm:p-5 font-black uppercase text-[10px] tracking-wider">{isVi ? "Kiến trúc / Vai trò" : "Concrete Application"}</th>
                  <th className="p-4 sm:p-5 font-black uppercase text-[10px] tracking-wider">{isVi ? "Bảo chứng toán học" : "Cryptographic Backing"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-850">
                {specsTable.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-slate-900/10 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">{item.tech}</td>
                    <td className="p-4 sm:p-5 font-mono text-gray-600 dark:text-[#7C8CFF] font-semibold">{item.standard}</td>
                    <td className="p-4 sm:p-5 text-slate-500 dark:text-gray-400 font-medium leading-relaxed max-w-xs">{item.usage}</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 font-sans">{item.strength}</td>
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
