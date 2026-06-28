import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Smartphone, 
  Search, 
  HelpCircle, 
  Cpu, 
  Zap, 
  Send, 
  CheckCircle, 
  XCircle, 
  EyeOff, 
  RefreshCw, 
  Lock, 
  Unlock, 
  AlertTriangle,
  Code,
  FileBadge
} from 'lucide-react';

interface ZkpVisualizerProps {
  lang: 'vi' | 'en';
  onBack: () => void;
  onOpenDemo?: () => void;
}

export default function ZkpVisualizer({ lang, onBack, onOpenDemo }: ZkpVisualizerProps) {
  const isVi = lang === 'vi';

  // State parameters
  const [birthDate, setBirthDate] = useState<string>('1998-06-15');
  const [eligibilityType, setEligibilityType] = useState<'over18' | 'over21' | 'under65'>('over18');
  const [stage, setStage] = useState<'setup' | 'proof_generation' | 'payload' | 'verification' | 'complete'>('setup');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [secretSalt, setSecretSalt] = useState<string>('');
  const [proofData, setProofData] = useState<any>(null);
  const [isTampered, setIsTampered] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Regenerate secure salt on mount or birthdate change
  useEffect(() => {
    generateNewSalt();
  }, [birthDate]);

  const generateNewSalt = () => {
    const randomHex = Array.from({ length: 32 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setSecretSalt(`0x${randomHex}`);
  };

  const calculateAge = (dateStr: string): number => {
    const born = new Date(dateStr);
    const now = new Date('2026-05-26'); // Stable current year as metadata
    let age = now.getFullYear() - born.getFullYear();
    const m = now.getMonth() - born.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < born.getDate())) {
      age--;
    }
    return age;
  };

  const checkEligibility = (age: number, type: typeof eligibilityType): boolean => {
    if (type === 'over18') return age >= 18;
    if (type === 'over21') return age >= 21;
    if (type === 'under65') return age <= 65 && age > 0;
    return false;
  };

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);
  };

  // Trigger ZKP generator
  const handleGenerateProof = () => {
    setIsGenerating(true);
    setStage('proof_generation');
    setLogs([]);
    addLog(isVi ? "Khởi tạo tiến trình sinh chứng chứng mật mã ZKP..." : "Initializing ZKP crypto proof pipeline...");
    
    setTimeout(() => {
      addLog(isVi ? "Truy xuất Thuộc tính Ngày Sinh cục bộ: " + birthDate : "Reading local Date of Birth: " + birthDate);
    }, 450);

    setTimeout(() => {
      const age = calculateAge(birthDate);
      const isEligible = checkEligibility(age, eligibilityType);
      addLog(isVi 
        ? `Xác định tuổi: ${age} tuổi. Trạng thái thỏa mãn: ${isEligible ? 'ĐẠT' : 'KHÔNG ĐẠT'}`
        : `Calculated age: ${age}. Constraint satisfied: ${isEligible ? 'YES' : 'NO'}`
      );
    }, 900);

    setTimeout(() => {
      addLog(isVi 
        ? "Tính toán hàm băm Pedersen Commitment với salt ngẫu nhiên..." 
        : "Computing Pedersen Commitment with entropy salt..."
      );
    }, 1400);

    setTimeout(() => {
      addLog(isVi 
        ? "Đóng gói đa thức tối giản zk-SNARK (Groth16 protocol)..." 
        : "Assembling quadratic arithmetic constraints (Groth16 system)..."
      );
    }, 2000);

    setTimeout(() => {
      const age = calculateAge(birthDate);
      const verifiedResult = checkEligibility(age, eligibilityType);
      
      const payload = {
        protocol: "Groth16 zk-SNARK",
        curve: "bn254 (alt_bn128)",
        publicInputs: {
          verificationPredicate: eligibilityType === 'over18' 
            ? "Age >= 18" 
            : eligibilityType === 'over21' 
              ? "Age >= 21" 
              : "Age <= 65",
          assertionTruth: verifiedResult ? "true" : "false",
          commitmentHash: "0xec9ab42" + Math.floor(Math.random() * 1000000) + "fbc0082d"
        },
        proofParameters: {
          pi_a: ["0x" + Array.from({length:16},()=>Math.floor(Math.random()*16).toString(16)).join(''), "0x" + Array.from({length:16},()=>Math.floor(Math.random()*16).toString(16)).join('')],
          pi_b: [["0x...","0x..."], ["0x...","0x..."]],
          pi_c: ["0x" + Array.from({length:16},()=>Math.floor(Math.random()*16).toString(16)).join(''), "0x" + Array.from({length:16},()=>Math.floor(Math.random()*16).toString(16)).join('')]
        }
      };

      setProofData(payload);
      addLog(isVi ? "Khởi tạo thành công Proof JSON! Không có dữ liệu ngày sinh của bạn trong file payload." : "Successfully compiled ZKP Proof JSON! Absolutely no birthday variables are recorded in this payload.");
      setIsGenerating(false);
      setStage('payload');
    }, 2600);
  };

  // Trigger ZKP verification
  const handleVerifyProof = () => {
    setIsVerifying(true);
    setStage('verification');
    addLog(isVi ? "Truyền tải Proof Payload sang Bên Xác thực (Verifier) qua kênh an toàn..." : "Streaming Proof Payload to Verifier over secure channel...");

    setTimeout(() => {
      addLog(isVi ? "Yêu cầu kiểm chứng chữ ký của Issuer đối với Commitment Hash..." : "Verifying Issuer's cryptographic endorsement on Commitment Hash...");
    }, 850);

    setTimeout(() => {
      if (isTampered) {
        addLog(isVi 
          ? "🚨 PHÁT HIỆN LỖI: Chữ ký đa thức bị sai lệch! Ai đó đã cố tình sửa đổi dữ liệu sau khi ký." 
          : "🚨 FAIL: Quadratic mathematics mismatch! The proof signature has been tampered with or modified."
        );
      } else {
        addLog(isVi 
          ? "Giải phương trình Bilinear Pairing: e(A, B) == e(Alpha, Beta) * e(Commitment, Gamma)..." 
          : "Solving Bilinear Pairing equation: e(A, B) == e(Alpha, Beta) * e(Commitment, Gamma)..."
        );
      }
    }, 1600);

    setTimeout(() => {
      setIsVerifying(false);
      setStage('complete');
      if (isTampered) {
        addLog(isVi ? "❌ Xác thực THẤT BẠI. Từ chối yêu cầu truy cập." : "❌ Verification FAILED. Rejected entry request.");
      } else {
        const age = calculateAge(birthDate);
        const result = checkEligibility(age, eligibilityType);
        if (result) {
          addLog(isVi ? "✅ Xác thực THÀNH CÔNG. Khách hàng ĐỦ ĐIỀU KIỆN." : "✅ Verification APPROVED. Holder is ELIGIBLE.");
        } else {
          addLog(isVi ? "❌ Xác thực THÀNH CÔNG. Khách hàng KHÔNG ĐỦ ĐIỀU KIỆN." : "❌ Verification APPROVED. Holder is INELIGIBLE.");
        }
      }
    }, 2500);
  };

  const handleReset = () => {
    setStage('setup');
    setLogs([]);
    setIsTampered(false);
    setProofData(null);
  };

  const currentAge = calculateAge(birthDate);
  const expectationPassed = checkEligibility(currentAge, eligibilityType);

  return (
    <div className="max-w-6xl mx-auto text-left py-6 md:py-12">
      {/* Back to Home Button */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs.5 md:text-sm font-bold text-[#5B6CFF] hover:text-[#4A5AF0] cursor-pointer mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isVi ? "Quay lại trang chủ" : "Back to Homepage"}</span>
      </motion.button>

      {/* Hero / Header info explaining ZKP beautifully */}
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] block mb-2">
          {isVi ? "Công cụ tương tác trực quan" : "Interactive Sandbox Visualizer"}
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          {isVi ? "Trải nghiệm Zero-Knowledge Proofs" : "Zero-Knowledge Proof Playground"}
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed max-w-3xl">
          {isVi 
            ? "Tìm hiểu cách công nghệ Không tiết lộ (ZKP) cho phép bạn chứng minh các điều kiện phức tạp (như độ tuổi, quốc tịch, tài chính) mà không cần để lộ dữ liệu nhạy cảm thô của bạn ra ngoài thiết bị."
            : "Learn how ZKP allows you to prove complex logical predicates (such as being of legal age or meeting wealth limits) without exposing your raw private details to the verifying entity."}
        </p>
      </div>

      {/* Main Container: Holder Device on Left, Wireless in Middle, Verifier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Client/Holder Device */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900/65 rounded-3xl border border-gray-150 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800/80 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-[#5B6CFF]" />
                <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  {isVi ? "1. Thiết bị chủ (Holder)" : "1. Holder Device"}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#5B6CFF]/10 text-[#5B6CFF] font-bold border border-[#5B6CFF]/20">
                LOCAL EDGE SECURED
              </span>
            </div>

            {/* Instruction block */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              {isVi 
                ? "Dữ liệu riêng tư của bạn nằm an toàn trong chip bảo mật cục bộ của máy. Hãy nhập thông tin của bạn bên dưới:"
                : "Your private details sit isolated on disk. Specify the attributes to initiate ZKP compiling:"}
            </p>

            {/* Simulated Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-500 tracking-wider block mb-1.5">
                  {isVi ? "Ngày sinh của bạn (Bí mật 🔒)" : "Your Private Birthday (Secret 🔒)"}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={birthDate}
                    disabled={stage !== 'setup'}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B6CFF]/20 disabled:opacity-65"
                  />
                  <div className="absolute right-3.5 top-3 flex items-center gap-1.5 pointer-events-none">
                    <span className="text-[11px] font-mono text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded font-black uppercase">
                      {currentAge} {isVi ? "Tuổi" : "Y/O"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-500 tracking-wider block mb-1.5">
                  {isVi ? "Mã muối chống dò phá (Salt)" : "Cryptographic Entropy Salt"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={secretSalt}
                    readOnly
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-150 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-gray-400 dark:text-gray-500 focus:outline-none"
                  />
                  <button 
                    onClick={generateNewSalt}
                    disabled={stage !== 'setup'}
                    className="absolute right-3 top-2 px-2.5 py-1 rounded bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-[10px] font-mono text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-50"
                  >
                    Refresh
                  </button>
                </div>
                <span className="text-[10px] text-gray-400 leading-relaxed mt-1 block">
                  {isVi 
                    ? "* Trộn muối ngẫu nhiên ngăn chặn Hacker suy dịch ngược dữ liệu gốc từ hash."
                    : "* Dynamic salt prevents malicious brute force dictionary lookups on hash commitments."}
                </span>
              </div>

              <div>
                <label className="text-xs font-black uppercase text-gray-400 dark:text-gray-500 tracking-wider block mb-1.5">
                  {isVi ? "Chọn Điều kiện cần chứng minh" : "Choose Logic Predicate to Prove"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'over18', label: isVi ? ">= 18 Tuổi" : "Age >= 18" },
                    { id: 'over21', label: isVi ? ">= 21 Tuổi" : "Age >= 21" },
                    { id: 'under65', label: isVi ? "<= 65 Tuổi" : "Age <= 65" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      disabled={stage !== 'setup'}
                      onClick={() => setEligibilityType(item.id as any)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                        eligibilityType === item.id 
                          ? 'bg-[#5B6CFF] border-[#5B6CFF] text-white' 
                          : 'bg-white dark:bg-slate-950 border-gray-150 dark:border-slate-800 text-gray-550 dark:text-gray-400 hover:border-gray-300 dark:hover:border-slate-700'
                      } disabled:opacity-55`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Theoretical preview mathematical function block */}
            <div className="mt-6 p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-950/60 border border-gray-100 dark:border-slate-800/80">
              <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest block mb-1">
                {isVi ? "Phương trình cam kết" : "Pedersen Polynomial Commitment"}
              </span>
              <p className="text-xs.5 font-mono text-gray-700 dark:text-gray-300 leading-relaxed">
                C = g<sup>dob</sup> &middot; h<sup>salt</sup> mod p
              </p>
              <div className="flex items-center gap-1.5 mt-2.5 text-indigo-500">
                <EyeOff className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[10px] font-bold">
                  {isVi 
                    ? "Dữ liệu Dob & Salt sẽ hoàn toàn được ẩn giấu trong toán học."
                    : "Explicit inputs are masked with high randomness exponentiation."}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-50 dark:border-slate-800/40">
            {stage === 'setup' ? (
              <button
                onClick={handleGenerateProof}
                disabled={isGenerating}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#5B6CFF] to-[#8F9BFF] hover:from-[#4B5AE5] hover:to-[#7C8CD5] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#5B6CFF]/15 transition-all cursor-pointer"
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Cpu className="w-4.5 h-4.5" />
                )}
                <span>{isVi ? "TẠO BẰNG CHỨNG ZKP" : "SYNTHESIZE ZKP PROOF"}</span>
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="w-full py-3.5 px-6 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-200 font-bold text-sm transition-all"
              >
                {isVi ? "Nhập lại Thông tin (Xóa Proof)" : "Reset Configuration"}
              </button>
            )}
          </div>
        </div>

        {/* Center: Wireless Transmission Channel & Live Visual State */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-6">
          
          <div className="relative w-full flex flex-col items-center justify-center min-h-[100px] lg:min-h-full">
            
            {/* Visual Wireless Wave Animations running between devices on Desktop */}
            <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none overflow-hidden max-w-full">
              {stage === 'payload' && (
                <div className="w-full flex justify-between items-center px-4 max-w-full">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0.2 }}
                    animate={{ scale: [1, 2.2, 1], opacity: [0.1, 0.7, 0.1] }}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                    className="w-6 h-6 rounded-full bg-[#5B6CFF]/20 absolute left-4"
                  />
                  <motion.div 
                    initial={{ x: "0%" }}
                    animate={{ x: "180%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500 shadow-sm"
                  >
                    <Send className="w-4 h-4 animate-pulse" />
                  </motion.div>
                </div>
              )}
            </div>

            {/* Visual Wireless Wave Animations running between devices on Mobile */}
            <div className="absolute inset-0 lg:hidden flex flex-col items-center justify-center pointer-events-none overflow-hidden max-w-full">
              {stage === 'payload' && (
                <div className="h-full w-full flex flex-col justify-between items-center py-2 relative">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0.2 }}
                    animate={{ scale: [1, 2.2, 1], opacity: [0.1, 0.7, 0.1] }}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                    className="w-6 h-6 rounded-full bg-[#5B6CFF]/20 absolute top-2"
                  />
                  <motion.div 
                    initial={{ y: "-100%" }}
                    animate={{ y: "150%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500 shadow-sm z-20"
                  >
                    <Send className="w-4 h-4 rotate-90 animate-pulse" />
                  </motion.div>
                </div>
              )}
            </div>

            {/* Large State Status Bubble */}
            <div className="z-10 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-gray-150 dark:border-slate-800 text-center flex flex-col items-center max-w-[150px] shadow-sm">
              <span className="text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-widest block mb-2">
                {isVi ? "Trạng thái" : "STAGE STATE"}
              </span>

              {stage === 'setup' && (
                <div className="flex flex-col items-center">
                  <span className="p-2 rounded-full bg-amber-500/10 text-amber-500 mb-1">
                    <Lock className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-black text-gray-700 dark:text-gray-300">
                    {isVi ? "Chưa tạo" : "No Proof"}
                  </span>
                </div>
              )}

              {stage === 'proof_generation' && (
                <div className="flex flex-col items-center">
                  <span className="p-2 rounded-full bg-indigo-500/10 text-indigo-500 mb-1 animate-spin">
                    <RefreshCw className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-black text-indigo-500 animate-pulse">
                    {isVi ? "Đang tính..." : "Compiling..."}
                  </span>
                </div>
              )}

              {stage === 'payload' && (
                <div className="flex flex-col items-center">
                  <span className="p-2 rounded-full bg-teal-500/10 text-teal-500 mb-1 animate-bounce">
                    <Code className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-black text-teal-500">
                    {isVi ? "Có Payload" : "Ready"}
                  </span>
                </div>
              )}

              {stage === 'verification' && (
                <div className="flex flex-col items-center">
                  <span className="p-2 rounded-full bg-blue-500/10 text-blue-500 mb-1 animate-pulse">
                    <Zap className="w-5 h-5 text-blue-500" />
                  </span>
                  <span className="text-xs font-black text-blue-500">
                    {isVi ? "Đang đối soát" : "Verifying..."}
                  </span>
                </div>
              )}

              {stage === 'complete' && (
                <div className="flex flex-col items-center">
                  {isTampered ? (
                    <span className="p-2 rounded-full bg-red-500/10 text-red-500 mb-1">
                      <XCircle className="w-5 h-5" />
                    </span>
                  ) : (
                    <span className="p-2 rounded-full bg-green-500/10 text-green-500 mb-1">
                      <CheckCircle className="w-5 h-5" />
                    </span>
                  )}
                  <span className={`text-xs font-black ${isTampered ? 'text-red-500' : 'text-green-500'}`}>
                    {isTampered ? (isVi ? "Từ chối" : "Rejected") : (isVi ? "Hoàn tất" : "Approved")}
                  </span>
                </div>
              )}
            </div>

            {/* Direct visual indicator that raw DOBS do not transfer */}
            <div className="mt-6 hidden lg:block text-center max-w-[120px]">
              <span className="text-[10px] font-bold text-red-500 dark:text-red-400 uppercase tracking-wide flex items-center justify-center gap-1">
                <EyeOff className="w-3.5 h-3.5 shrink-0" />
                No raw data
              </span>
              <p className="text-[9px] text-gray-400 leading-normal mt-1">
                {isVi ? "Không truyền tải ngày sinh thô." : "Zero credentials leave the device memory."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Verifier Sandbox Node */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900/65 rounded-3xl border border-gray-150 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800/80 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  {isVi ? "2. Bên kiểm định (Verifier)" : "2. Verifier Node"}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-950 text-gray-500 font-bold border border-gray-150 dark:border-slate-800">
                P2P ANONYMOUS
              </span>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              {isVi 
                ? "Bên kiểm định đối soát tài liệu chỉ nhận được bằng chứng mật mã. Họ không hề có quyền hạn xem Ngày sinh thực tế của bạn."
                : "The auditing party receives ONLY the polynomial proof. They have zero visibility into your actual raw DOB parameters."}
            </p>

            {/* Interactive Attack/Tampering simulator */}
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-dashed border-amber-300/30 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                    {isVi ? "Giả lập tấn công can thiệp dữ liệu" : "Simulate Payload Tampering"}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-amber-400/80 mt-1 leading-relaxed">
                    {isVi 
                      ? "Bật tùy chọn này để giả định kẻ xấu can thiệp trái phép, chỉnh sửa thông tin trong Proof Object. Hệ thống ZKP sẽ lập tức nhận biết."
                      : "Inject mathematical mismatch anomalies into the proof file. Watch how the P2P quadratic verification equation instantly detects tampering."}
                  </p>
                  <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isTampered}
                      disabled={stage !== 'payload' && stage !== 'setup'}
                      onChange={(e) => {
                        setIsTampered(e.target.checked);
                        if (e.target.checked && stage === 'payload') {
                          addLog(isVi 
                            ? "⚠️ GIẢ LẬP CAN THIỆP: Sửa giá trị `assertionTruth` thành 'true' giả mạo!" 
                            : "⚠️ INJECTING ATTACK: Forging the verification parameters inside the active payload!"
                          );
                        } else if (!e.target.checked && stage === 'payload') {
                          addLog(isVi ? "Đã gỡ cấu hình giả lập hack." : "Cleared malicious data injection configurations.");
                        }
                      }}
                      className="w-4 h-4 rounded text-indigo-500 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                      {isVi ? "Kích hoạt can thiệp dữ liệu (Hack payload)" : "Simulate Tampered Parameters"}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Verification Results Panel */}
            <AnimatePresence mode="wait">
              {stage === 'complete' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`p-5 rounded-2xl border text-left ${
                    isTampered 
                      ? 'bg-red-500/5 border-red-200/50 text-red-900 dark:text-red-300' 
                      : expectationPassed
                        ? 'bg-green-550/5 border-green-200/50 text-green-900 dark:text-green-300'
                        : 'bg-indigo-500/5 border-indigo-200/50 text-indigo-900 dark:text-indigo-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isTampered ? (
                      <XCircle className="w-5.5 h-5.5 text-red-500 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-5.5 h-5.5 text-green-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wider">
                        {isTampered 
                          ? (isVi ? "KẾT QUẢ: TỪ CHỐI (TAMPERED)" : "STATUS: REJECTED (SIG FAIL)")
                          : (isVi ? "KẾT QUẢ: KIỂM CHỨNG HOÀN THÀNH" : "STATUS: MATHEMATICALLY CONFIRMED")
                        }
                      </h4>
                      <p className="text-xs mt-2.5 leading-relaxed text-gray-500 dark:text-gray-300">
                        {isTampered ? (
                          isVi 
                            ? "Toán học ZKP phát hiện dữ liệu không đồng nhất lý thuyết mật mã. Chứng chỉ đã bị thay đổi trái phép hoặc giả mạo chữ ký số."
                            : "Bilinear matching failed. Signature index values computed on standard curves show explicit discrepancies. Permission denied."
                        ) : expectationPassed ? (
                          isVi 
                            ? "✔️ Khách hàng ĐỦ ĐIỀU KIỆN TUỔI. Tuyệt đối không lưu lại bất cứ dữ liệu ngày sinh nào trên cơ sở dữ liệu."
                            : "✔️ Holder meets age constraints perfectly under strict cryptographical guarantees. Zero underlying birthday records are disclosed to verifier server."
                        ) : (
                          isVi
                            ? "❌ Khách hàng KHÔNG ĐỦ TIÊU CHUẨN TUỔI (Thiếu niên). Tuy nhiên, Bên kiểm định không biết chính xác tuổi thô của bạn."
                            : "❌ Holder fails eligibility restrictions (Under Age). However, the auditing server has zero access to learn raw date variables."
                        )}
                      </p>

                      <div className="mt-4 pt-3.5 border-t border-gray-100 dark:border-slate-800/40 grid grid-cols-2 gap-3 text-[10px] font-mono">
                        <div>
                          <span className="text-gray-400 block">{isVi ? "Thời gian chạy" : "Verify Latency"}</span>
                          <span className="font-bold text-gray-700 dark:text-gray-300">~ 112ms</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">{isVi ? "Dữ liệu rò rỉ" : "Leaked Private Fields"}</span>
                          <span className="font-bold text-red-500 dark:text-red-400">NONE (0 bytes)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Static Verifier View (when idle) */}
            {stage !== 'complete' && (
              <div className="p-12 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 text-center flex flex-col items-center justify-center bg-[#FAFAFC] dark:bg-slate-950/20">
                <FileBadge className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3" />
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
                  {stage === 'payload' 
                    ? (isVi ? "Chờ truyền dữ liệu Proof..." : "Ready to receive proof payload...") 
                    : (isVi ? "Chờ thiết bị Holder sinh Proof..." : "Awaiting Holder device to synthesize proof...")}
                </span>
              </div>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-50 dark:border-slate-800/40">
            <button
              onClick={handleVerifyProof}
              disabled={stage !== 'payload' || isVerifying}
              className={`w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                stage === 'payload' 
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/10' 
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              {isVerifying ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Unlock className="w-4.5 h-4.5" />
              )}
              <span>{isVi ? "GỬI & ĐỐI SOÁT NGAY" : "TRANSMIT & VERIFY PROOF"}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Code Payload Inspector View */}
      {proofData && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 p-6 rounded-3xl bg-slate-900 border border-slate-800 text-left"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-bold font-mono text-gray-300 uppercase tracking-widest">
                {isVi ? "Gói tin truyền tải (Verifiable Presentation Payload)" : "Verifiable Presentation JSON Payload"}
              </span>
            </div>
            <span className="text-[10px] text-green-400 font-mono">
              ★ NO PRIVACY CORRELATION LEAKS ★
            </span>
          </div>

          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            {isVi 
              ? "Đây là toàn bộ cấu trúc dữ liệu gửi qua mạng không dây. Bạn có thể tự mình kiểm chứng: Tuyệt đối không chứa trường thông tin ngày tháng năm sinh hoặc dữ liệu gốc của bạn."
              : "Below represents the cryptographic object transmitted wirelessly over QR, NFC, or mesh channels. Observe that no Birth Date is mentioned:"}
          </p>

          <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-indigo-300 overflow-x-auto max-w-full">
            {isTampered ? (
              <code>
{`{
  "proof_protocol": "Groth16 zk-SNARK",
  "curve": "bn254",
  "verifier_input": {
    "predicate": "${proofData.publicInputs.verificationPredicate}",
    "assertionTruth": "true", /* ⚠️ FAKED ATTACK VALUE! */
    "commitmentHash": "0xec9ab42_TAMPERED_0082d"
  },
  "proof": {
    "pi_a": ["${proofData.proofParameters.pi_a[0]}", "${proofData.proofParameters.pi_a[1]}"],
    "pi_b": [["0x_MALICIOUS_FORGERY...", "0x00"], ["0x00", "0x00"]],
    "pi_c": ["${proofData.proofParameters.pi_c[0]}", "${proofData.proofParameters.pi_c[1]}"]
  }
}`}
              </code>
            ) : (
              <code>
{JSON.stringify(proofData, null, 2)}
              </code>
            )}
          </pre>
        </motion.div>
      )}

      {/* Interactive Logger Terminal */}
      {logs.length > 0 && (
        <div className="mt-8 p-6 rounded-3xl bg-black border border-slate-900 text-left">
          <span className="text-xs font-bold font-mono text-[#5B6CFF] uppercase tracking-widest block mb-3">
            {isVi ? "Nhật ký tính toán mật mã" : "Mathematical Cryptographic Computation Logs"}
          </span>
          <div className="space-y-1.5 font-mono text-xs text-gray-450 dark:text-gray-400 max-h-[180px] overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="flex gap-2.5">
                <span className="text-[#5B6CFF] select-none">&gt;</span>
                <span className={log.includes('🚨') || log.includes('❌') ? 'text-red-400' : log.includes('✅') || log.includes('Suitable') ? 'text-green-400' : 'text-gray-300'}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Concept learning guide cards */}
      <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest mt-16 mb-6">
        {isVi ? "Zero-Knowledge Proof hoạt động như thế nào?" : "Understanding the Mathematical Mechanics"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {[
          {
            step: "01",
            title: isVi ? "Cam kết chứng chỉ (Setup)" : "Polynomial Setup",
            desc: isVi 
              ? "Tổ chức phát hành (ví dụ: Công an cấp CCCD) mã hóa và ký số lên dữ liệu của bạn dưới dạng Cam kết số học rời rạc. Cam kết này được lưu trực tiếp trên máy của bạn."
              : "Issuers convert physical details into highly compact polynomial commitments. They sign them digitally without knowing when or how you manifest them."
          },
          {
            step: "02",
            title: isVi ? "Sinh bằng chứng (Prover)" : "Proof Compilation",
            desc: isVi 
              ? "Khi cần chứng minh, điện thoại của bạn xây dựng một phương trình toán đại số zk-SNARK chứng tỏ thuộc tính ngày sinh của bạn thỏa mãn điều kiện, đóng gói thành file Proof cực nhỏ."
              : "During active verification checks, your device solves local arithmetic constraints yielding proof vectors that testify to eligibility claims inside BN254 curves."
          },
          {
            step: "03",
            title: isVi ? "Đối soát bảo mật (Verifier)" : "Peer verification",
            desc: isVi 
              ? "Bên scan chỉ việc nhập Proof và Public Keys vào kiểm chứng một phương trình đối soát. Phương trình khớp chứng tỏ bạn hợp lệ, mà không rò rỉ bất cứ thông tin thô nào."
              : "Verifying systems match public keys and proof artifacts within mathematical formulas. Valid checks assure perfect correctness with zero security leaks."
          }
        ].map((item, idx) => (
          <div 
            key={idx}
            className="p-6 rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-left shadow-sm"
          >
            <span className="text-3xl font-black text-[#5B6CFF]/20 dark:text-[#7C8CFF]/15 block mb-2 font-mono">
              {item.step}
            </span>
            <h4 className="text-sm font-black text-gray-900 dark:text-white mb-2 leading-snug">
              {item.title}
            </h4>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
