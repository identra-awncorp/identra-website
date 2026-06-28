import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  ChevronRight, 
  Search, 
  MapPin, 
  Clock, 
  Send, 
  FileText, 
  Users, 
  Rocket, 
  ArrowLeft, 
  Check, 
  Loader2, 
  Shield, 
  Code2, 
  Box, 
  BarChart3, 
  RefreshCw,
  X,
  Upload,
  AlertCircle
} from 'lucide-react';

interface CareersSubpageProps {
  lang: 'vi' | 'en';
  onBack: () => void;
  onOpenDemo?: () => void;
  onNavigate?: (page: string) => void;
}

interface Job {
  id: string;
  title: string;
  department: string;
  deptKey: 'engineering' | 'product' | 'security';
  deptLabelVi: string;
  deptLabelEn: string;
  location: string;
  locationKey: 'hanoi' | 'hcm';
  type: string;
  typeKey: 'fulltime' | 'parttime';
  icon: any;
  color: string;
}

export default function CareersSubpage({ lang, onBack, onOpenDemo, onNavigate }: CareersSubpageProps) {
  const isVi = lang === 'vi';

  // State filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedLoc, setSelectedLoc] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Interactive candidacy modal states
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<Job | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [formFullName, setFormFullName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fillType, setFillType] = useState<'none' | 'identra' | 'manual'>('none');
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [autoFillStep, setAutoFillStep] = useState(0); // 0: idle, 1: connecting, 2: fetching/reading, 3: validating, 4: done
  const [applyState, setApplyState] = useState<'form' | 'submitting' | 'success'>('form');

  // Hardcoded job items matching the design total 12 positions represented elegantly
  const jobs: Job[] = [
    {
      id: 'job-1',
      title: isVi ? 'Backend Developer' : 'Backend Developer',
      department: isVi ? 'Kỹ sư phần mềm' : 'Software Engineering',
      deptKey: 'engineering',
      deptLabelVi: 'Công nghệ',
      deptLabelEn: 'Engineering',
      location: isVi ? 'Hà Nội' : 'Hanoi',
      locationKey: 'hanoi',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      typeKey: 'fulltime',
      icon: Code2,
      color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
    },
    {
      id: 'job-2',
      title: isVi ? 'Blockchain Engineer' : 'Blockchain Engineer',
      department: isVi ? 'Kỹ sư Blockchain' : 'Blockchain Engineering',
      deptKey: 'engineering',
      deptLabelVi: 'Công nghệ',
      deptLabelEn: 'Engineering',
      location: isVi ? 'Hồ Chí Minh' : 'Ho Chi Minh',
      locationKey: 'hcm',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      typeKey: 'fulltime',
      icon: Box,
      color: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400'
    },
    {
      id: 'job-3',
      title: isVi ? 'Security Engineer' : 'Security Engineer',
      department: isVi ? 'An ninh thông tin' : 'Information Security',
      deptKey: 'security',
      deptLabelVi: 'An ninh',
      deptLabelEn: 'Security',
      location: isVi ? 'Hà Nội' : 'Hanoi',
      locationKey: 'hanoi',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      typeKey: 'fulltime',
      icon: Shield,
      color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
    },
    {
      id: 'job-4',
      title: isVi ? 'Product Manager' : 'Product Manager',
      department: isVi ? 'Quản lý sản phẩm' : 'Product Management',
      deptKey: 'product',
      deptLabelVi: 'Sản phẩm',
      deptLabelEn: 'Product',
      location: isVi ? 'Hồ Chí Minh' : 'Ho Chi Minh',
      locationKey: 'hcm',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      typeKey: 'fulltime',
      icon: BarChart3,
      color: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
    },
    {
      id: 'job-5',
      title: isVi ? 'Frontend Developer (React)' : 'Frontend Developer (React)',
      department: isVi ? 'Kỹ sư phần mềm' : 'Software Engineering',
      deptKey: 'engineering',
      deptLabelVi: 'Công nghệ',
      deptLabelEn: 'Engineering',
      location: isVi ? 'Hà Nội' : 'Hanoi',
      locationKey: 'hanoi',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      typeKey: 'fulltime',
      icon: Code2,
      color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
    },
    {
      id: 'job-6',
      title: isVi ? 'DevOps Engineer' : 'DevOps Engineer',
      department: isVi ? 'Hạ tầng hệ thống' : 'Cloud Architecture',
      deptKey: 'engineering',
      deptLabelVi: 'Công nghệ',
      deptLabelEn: 'Engineering',
      location: isVi ? 'Hà Nội' : 'Hanoi',
      locationKey: 'hanoi',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      typeKey: 'fulltime',
      icon: Box,
      color: 'bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400'
    },
    {
      id: 'job-7',
      title: isVi ? 'Cryptography Researcher' : 'Cryptography Researcher',
      department: isVi ? 'Nghiên cứu mật mã học' : 'Cryptography R&D',
      deptKey: 'engineering',
      deptLabelVi: 'Công nghệ',
      deptLabelEn: 'Engineering',
      location: isVi ? 'Hà Nội' : 'Hanoi',
      locationKey: 'hanoi',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      typeKey: 'fulltime',
      icon: Shield,
      color: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400'
    },
    {
      id: 'job-8',
      title: isVi ? 'UX/UI Product Designer' : 'UX/UI Product Designer',
      department: isVi ? 'Thiết kế sản phẩm' : 'Product Design',
      deptKey: 'product',
      deptLabelVi: 'Sản phẩm',
      deptLabelEn: 'Product',
      location: isVi ? 'Hồ Chí Minh' : 'Ho Chi Minh',
      locationKey: 'hcm',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      typeKey: 'fulltime',
      icon: BarChart3,
      color: 'bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400'
    },
    {
      id: 'job-9',
      title: isVi ? 'Product Owner (SSI Enclave)' : 'Product Owner (SSI Enclave)',
      department: isVi ? 'Quản lý sản phẩm' : 'Product Management',
      deptKey: 'product',
      deptLabelVi: 'Sản phẩm',
      deptLabelEn: 'Product',
      location: isVi ? 'Hà Nội' : 'Hanoi',
      locationKey: 'hanoi',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      typeKey: 'fulltime',
      icon: BarChart3,
      color: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
    },
    {
      id: 'job-10',
      title: isVi ? 'Smart Contract Auditor' : 'Smart Contract Auditor',
      department: isVi ? 'An ninh thông tin' : 'Smart Contract Auditor',
      deptKey: 'security',
      deptLabelVi: 'An ninh',
      deptLabelEn: 'Security',
      location: isVi ? 'Hồ Chí Minh' : 'Ho Chi Minh',
      locationKey: 'hcm',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      typeKey: 'fulltime',
      icon: Shield,
      color: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
    },
    {
      id: 'job-11',
      title: isVi ? 'Technical Writer (SSI/ZKP)' : 'Technical Writer (SSI/ZKP)',
      department: isVi ? 'Soạn thảo tài liệu kỹ thuật' : 'Technical Docs Creator',
      deptKey: 'engineering',
      deptLabelVi: 'Công nghệ',
      deptLabelEn: 'Engineering',
      location: isVi ? 'Từ xa' : 'Remote',
      locationKey: 'hcm',
      type: isVi ? 'Bán thời gian' : 'Part-time',
      typeKey: 'parttime',
      icon: Code2,
      color: 'bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400'
    },
    {
      id: 'job-12',
      title: isVi ? 'QA Test Automation Engineer' : 'QA Test Automation Engineer',
      department: isVi ? 'Kiểm thử phần mềm tự động' : 'QA Automation Engineering',
      deptKey: 'engineering',
      deptLabelVi: 'Công nghệ',
      deptLabelEn: 'Engineering',
      location: isVi ? 'Hồ Chí Minh' : 'Ho Chi Minh',
      locationKey: 'hcm',
      type: isVi ? 'Toàn thời gian' : 'Full-time',
      typeKey: 'fulltime',
      icon: Code2,
      color: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
    }
  ];

  // Search and filter operations
  const filteredJobs = jobs.filter(job => {
    const matchesQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDept = selectedDept === 'all' || job.deptKey === selectedDept;
    const matchesLoc = selectedLoc === 'all' || job.locationKey === selectedLoc;
    const matchesType = selectedType === 'all' || job.typeKey === selectedType;

    return matchesQuery && matchesDept && matchesLoc && matchesType;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDept('all');
    setSelectedLoc('all');
    setSelectedType('all');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  // Automated auto-fill via simulated Identra identity wallet matching the flow in UseCasesSubpage
  const triggerIdentraFill = () => {
    // Play SFX if active
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        const audioCtx = new AudioCtxClass();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5 note
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.08); // A5 note
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.22);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.25);
      }
    } catch {}

    setIsAutoFilling(true);
    setAutoFillStep(1); // Connecting

    setTimeout(() => {
      setAutoFillStep(2); // Reading identity claims
      setTimeout(() => {
        setAutoFillStep(3); // Validating digital signatures
        setTimeout(() => {
          setAutoFillStep(4); // Completed
          setFormFullName('HOÀNG ANH TUẤN');
          setFormEmail('tuan.hoanganh@gmail.com');
          setFormPhone('0901234567');
          setFillType('identra');
          setIsAutoFilling(false);
          
          // Generate an elegant simulated CV file for convenience
          const mockFile = new File(["Mock SSI Certified Candidate Resume"], "Certificate_HoangAnhTuan.pdf", { type: "application/pdf" });
          setUploadedFile(mockFile);
        }, 600);
      }, 600);
    }, 600);
  };

  const handleManualFill = () => {
    setFormFullName('Nguyễn Văn A');
    setFormEmail('nguyen.van.a@example.com');
    setFormPhone('0912345678');
    setFillType('manual');
  };

  const handleOpenDetails = (job: Job) => {
    setSelectedJobForDetails(job);
    setShowDetailsModal(true);
  };

  const handleOpenApply = (job: Job) => {
    setSelectedJob(job);
    setFormFullName('');
    setFormEmail('');
    setFormPhone('');
    setUploadedFile(null);
    setFillType('none');
    setApplyState('form');
    setShowApplyModal(true);
  };

  const handleOpenGeneralApply = () => {
    // Open application representing all/unspecific roles
    setSelectedJob(null);
    setFormFullName('');
    setFormEmail('');
    setFormPhone('');
    setUploadedFile(null);
    setFillType('none');
    setApplyState('form');
    setShowApplyModal(true);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFullName || !formEmail) return;

    setApplyState('submitting');
    setTimeout(() => {
      // Simulate success report after 1200ms
      setApplyState('success');
      
      // Play crisp digital victory chime representation
      try {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtxClass) {
          const audioCtx = new AudioCtxClass();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime);
          oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08);
          oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.16);
          oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.28);
          gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.5);
        }
      } catch {}
    }, 1500);
  };

  return (
    <div className="bg-[#F7F8FC] dark:bg-[#0B0F1A] min-h-screen text-[#1F2937] dark:text-[#E5E7EB] pb-24 font-sans select-none overflow-x-hidden transition-colors duration-300">
      
      {/* 1. HERO HEADER SECTION (Aesthetic mirroring of FAQ subpage's grid arrangement) */}
      <section className="py-16 pt-8 lg:pt-12 bg-gradient-to-b from-white dark:from-[#0F172A]/45 via-white dark:via-[#0F172A]/10 to-[#F7F8FC] dark:to-[#0B0F1A] border-b border-[#E5E7EB] dark:border-slate-800/80 px-6 lg:px-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <div className="relative text-left">
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-12">
              
              {/* Left Column matching the exact structure and spacing of FAQ subpage */}
              <div className="space-y-6 lg:col-span-7 h-full">
                
                {/* Back Navigation Bar nested nicely inside the same layout block */}
                <div className="text-left">
                  <motion.button
                    whileHover={{ x: -4 }}
                    onClick={onBack}
                    className="-ml-3 inline-flex min-h-9 items-center gap-2 rounded-xl px-3 py-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[2.25] text-xs font-bold text-[#5B6CFF] dark:text-[#7C8CFF] hover:text-[#4A5AF0] dark:hover:text-[#6b7bff] transition-colors cursor-pointer group bg-transparent border-none"
                  >
                    <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
                    <span>{isVi ? "Quay lại Trang chủ" : "Back to Home"}</span>
                  </motion.button>
                </div>

                {/* Standard subpage visual tag/pill */}
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/8 px-3.5 py-1.5 rounded-full border border-[#5B6CFF]/10">
                  <Users className="w-3.5 h-3.5 mr-0.5" />
                  <span>{isVi ? "Cơ hội nghề nghiệp & Thành viên" : "Careers & Global Talent Network"}</span>
                </div>

                {/* Title updated to match template typography pairing and spacing perfectly */}
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {isVi ? "Gia nhập đội ngũ" : "Join the SSI"}
                  <span className="bg-gradient-to-r from-[#5B6CFF] to-[#8F9BFF] dark:from-[#7C8CFF] dark:to-[#8F9BFF] bg-clip-text text-transparent ml-2">
                    {isVi ? "định danh tự chủ" : "Decentralized Team"}
                  </span>
                </h1>

                {/* Subtitle updated to match standard dark/light body colors and typography */}
                <p className="text-base text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl font-normal">
                  {isVi 
                    ? "Tại SSI, chúng tôi tin rằng danh tính số là nền tảng của một thế giới an toàn, minh bạch và trao quyền cho mọi người."
                    : "At SSI, we believe that decentralized digital identity is the cornerstone of a safe, transparent, and user-empowered global digital society."}
                </p>

                {/* Row of Perks adapted perfectly to match the exact spacing, font size, and layout rules */}
                <div className="space-y-4 pt-6 border-t border-gray-150 dark:border-slate-850">
                  <div className="flex gap-4.5 text-slate-800 dark:text-gray-200">
                    <div className="w-[38px] h-[38px] rounded-xl bg-blue-500/10 text-[#3B52FF] flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-slate-900 dark:text-white leading-tight">{isVi ? "Sứ mệnh ý nghĩa" : "Meaningful Mission"}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{isVi ? "Xây dựng hạ tầng danh tính số tin cậy cho mọi người." : "Building reliable decentralized digital trusted identities globally."}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4.5 text-slate-800 dark:text-gray-200">
                    <div className="w-[38px] h-[38px] rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                      <Rocket className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-slate-900 dark:text-white leading-tight">{isVi ? "Đổi mới không ngừng" : "Continuous Innovation"}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{isVi ? "Giải quyết những bài toán lớn bằng công nghệ tiên tiến." : "Solving deep mathematical and engineering constraints using advanced technology."}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Hero Column - Claymorphic 3D Suitcase design generated precisely via custom layered CSS */}
              <div className="subpage-hero-visual w-full max-w-[30rem] mx-auto lg:col-span-5 lg:justify-self-end lg:self-start lg:mt-15 hidden lg:block relative">
                <div className="absolute w-80 h-80 bg-[#3B52FF]/15 dark:bg-[#3B52FF]/10 rounded-full blur-3xl -z-10 pointer-events-none -top-10 -right-10" />

                {/* Circular Base and 3D suitcase center representation */}
                <div className="relative w-full aspect-square flex flex-col items-center justify-center">
                  
                  {/* Outer halo circular paths representing digital connection grid */}
                  <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-blue-500/15 animate-spin" style={{ animationDuration: '45s' }} />
                  <div className="absolute w-[60%] h-[60%] rounded-full border border-blue-500/8 border-spacing-2" />

                  {/* Pedestal Circular Base */}
                  <div className="absolute bottom-[20%] w-[75%] h-[12%] rounded-full bg-gradient-to-b from-blue-100 to-blue-200/50 dark:from-slate-800 dark:to-slate-900/40 border-b-4 border-blue-300 dark:border-slate-950 shadow-2xl skew-x-[-12deg]" />

                  {/* Detailed 3D Suitcase */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 w-[55%] aspect-square rounded-[36px] bg-gradient-to-tr from-blue-700 via-blue-500 to-indigo-400 dark:from-indigo-800 dark:via-blue-600 dark:to-indigo-500 shadow-3xl flex flex-col items-center justify-center border border-white/20"
                  >
                    {/* Suitcase Handle */}
                    <div className="absolute -top-[12%] w-[45%] h-[16%] rounded-t-2xl border-4 border-b-0 border-blue-400 dark:border-indigo-400 flex justify-between" />
                    
                    {/* Premium Metallics locks */}
                    <div className="absolute top-[8%] left-[22%] w-3 h-4 rounded-sm bg-blue-300/80 dark:bg-silver-400" />
                    <div className="absolute top-[8%] right-[22%] w-3 h-4 rounded-sm bg-blue-300/80 dark:bg-silver-400" />

                    {/* Triple-wings of SSI logo in high contrast white */}
                    <div className="w-[45%] h-[45%] flex flex-col justify-between items-center transform -skew-x-[15deg] pr-1.5 opacity-90">
                      {/* Wing Bar 1 */}
                      <div className="w-full h-[6px] bg-white rounded-full self-start transform shadow-xs" />
                      {/* Wing Bar 2 - split/overlapping layout */}
                      <div className="w-[85%] h-[6px] bg-white rounded-full self-center transform shadow-xs" />
                      {/* Wing Bar 3 */}
                      <div className="w-[60%] h-[6px] bg-white rounded-full self-end transform shadow-xs" />
                    </div>
                    
                    {/* Horizontal dividing strip */}
                    <div className="absolute bottom-[35%] w-full h-[1.5px] bg-white/20" />
                  </motion.div>

                  {/* Floating holographic elements representing user credentials around briefcase */}
                  
                  {/* Bottom-Left: Chart performance metrics */}
                  <motion.div 
                    animate={{ y: [0, 8, 0], x: [0, -3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="absolute top-[22%] left-[12%] w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-md flex items-center justify-center text-[#3B52FF]"
                  >
                    <Users className="w-5 h-5" />
                  </motion.div>

                  {/* Top-Right: Code brackets tag */}
                  <motion.div 
                    animate={{ y: [0, -8, 0], x: [0, 3, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="absolute top-[22%] right-[12%] w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-md flex items-center justify-center text-[#3B52FF]"
                  >
                    <span className="font-mono text-sm.5 font-black">&lt;/&gt;</span>
                  </motion.div>

                  {/* Bottom-Left: Chart performance metrics */}
                  <motion.div 
                    animate={{ y: [0, 6, 0], x: [0, 4, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                    className="absolute bottom-[28%] left-[10%] w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-md flex items-center justify-center text-[#3B52FF]"
                  >
                    <BarChart3 className="w-5 h-5" />
                  </motion.div>

                  {/* Bottom-Right: Secure check shield */}
                  <motion.div 
                    animate={{ y: [0, -6, 0], x: [0, -4, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
                    className="absolute bottom-[28%] right-[10%] w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-md flex items-center justify-center text-emerald-500"
                  >
                    <Check className="w-5 h-5 stroke-[3]" />
                  </motion.div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. SEARCH & FILTER SECTION - Elegant white floating bar with soft shadows, responsive with dark mode */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-7 relative z-20">
        <div className="bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-slate-800 rounded-3xl shadow-xl p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            
            {/* Search inputs */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 relative">
              <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                <Search className="w-4.5 h-4.5" />
              </span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isVi ? "Tìm kiếm vị trí, kỹ năng..." : "Search positions, skills..."}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-transparent focus:border-blue-500/30 text-xs sm:text-sm font-semibold placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none"
              />
            </div>

            {/* Department Select Filter */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-3">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-transparent text-xs sm:text-sm font-semibold select-none outline-none cursor-pointer"
              >
                <option value="all">{isVi ? "Tất cả phòng ban" : "All Departments"}</option>
                <option value="engineering">{isVi ? "Công nghệ" : "Engineering"}</option>
                <option value="product">{isVi ? "Sản phẩm" : "Product Management"}</option>
                <option value="security">{isVi ? "An ninh" : "Information Security"}</option>
              </select>
            </div>

            {/* Location Select Filter */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-3">
              <select
                value={selectedLoc}
                onChange={(e) => setSelectedLoc(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-transparent text-xs sm:text-sm font-semibold select-none outline-none cursor-pointer"
              >
                <option value="all">{isVi ? "Tất cả địa điểm" : "All Locations"}</option>
                <option value="hanoi">{isVi ? "Hà Nội" : "Hanoi"}</option>
                <option value="hcm">{isVi ? "Hồ Chí Minh" : "Ho Chi Minh"}</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-transparent text-xs sm:text-sm font-semibold select-none outline-none cursor-pointer"
              >
                <option value="all">{isVi ? "Tất cả loại hình" : "All Job Types"}</option>
                <option value="fulltime">{isVi ? "Toàn thời gian" : "Full-time"}</option>
                <option value="parttime">{isVi ? "Bán thời gian" : "Part-time"}</option>
              </select>
            </div>

            {/* Clear Filter Button */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-1 flex justify-end">
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-blue-500 hover:text-[#3B52FF] inline-flex items-center gap-1 cursor-pointer transition-colors active:scale-95 py-2 px-1"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-hover:spin" />
                <span>{isVi ? "Xóa" : "Clear"}</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. LIST OF POSITIONS SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        
        {/* Title & Stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="text-left">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <span>{isVi ? "Vị trí đang tuyển dụng" : "Open Positions"}</span>
              <span className="text-xs bg-blue-500/10 text-[#3B52FF] px-2.5 py-1 rounded-full font-black font-mono">
                {filteredJobs.length}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">{isVi ? "Khám phá cơ hội và ứng tuyển nhanh qua ví định danh Identra" : "Explore open engineering, product requirements, and apply instantly via Identra"}</p>
          </div>
          
          <button 
            onClick={handleResetFilters}
            className="text-xs font-extrabold text-[#3B52FF] hover:underline cursor-pointer flex items-center gap-1"
          >
            {isVi ? "Xem tất cả vị trí" : "View all roles"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Jobs Grid Cards layout */}
        {filteredJobs.length === 0 ? (
          <div className="p-16 border rounded-3xl text-center bg-white dark:bg-slate-900 border-dashed border-gray-200 dark:border-slate-800 space-y-3">
            <div className="text-slate-350 dark:text-slate-650 flex justify-center">
              <AlertCircle className="w-12 h-12" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">{isVi ? "Không tìm thấy kết quả phù hợp" : "No Job Roles Found"}</h4>
            <p className="text-xs text-slate-405 leading-relaxed max-w-sm mx-auto">
              {isVi 
                ? "Thử thay đổi bộ lọc tìm kiếm hoặc từ khóa của bạn để tìm thấy tin tuyển dụng mong muốn." 
                : "Try resetting specific filtering select keys or modify search query query to resolve lists."}
            </p>
            <button 
              onClick={handleResetFilters}
              className="mt-2 text-xs font-black text-white bg-[#3B52FF] px-4 py-2 rounded-xl hover:bg-[#2B42EF]"
            >
              {isVi ? "Xóa bộ lọc" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredJobs.map((job) => {
              const JobIcon = job.icon;
              return (
                <motion.div
                  key={job.id}
                  whileHover={{ y: -5 }}
                  onClick={() => handleOpenDetails(job)}
                  className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-slate-800 hover:border-blue-500/20 hover:bg-slate-50/40 dark:hover:bg-slate-850/30 shadow-xs hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Top Row Icon + Tag */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl ${job.color} flex items-center justify-center shrink-0`}>
                        <JobIcon className="w-5 h-5" />
                      </div>
                      
                      <span className="text-[10.5px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 px-2.5 py-0.5 rounded-full">
                        {isVi ? job.deptLabelVi : job.deptLabelEn}
                      </span>
                    </div>

                    {/* Job Title & Subdepartment */}
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-[#3B52FF] dark:group-hover:text-[#7C8CFF] transition-colors">{job.title}</h3>
                    <p className="text-xs text-[#5B6CFF] dark:text-[#7C8CFF] font-semibold mt-1 mb-4">{job.department}</p>
                  </div>

                  {/* Location and properties indicators */}
                  <div className="pt-4 border-t border-slate-50 dark:border-slate-900/40 flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold gap-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{job.type}</span>
                    </div>

                    {/* Small button trigger */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenApply(job);
                      }}
                      className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-slate-900/60 text-[#3B52FF] flex items-center justify-center hover:bg-[#3B52FF] hover:text-white transition-all cursor-pointer group-hover:bg-[#3B52FF] group-hover:text-white"
                      title={isVi ? "Ứng tuyển nhanh" : "Fast Apply"}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. CTA BENTO CARD - Submit General CV representation matching image design */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#E0E7FF]/40 dark:bg-[#1E1B4B]/30 border border-[#C7D2FE]/40 dark:border-[#3730A3]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-start sm:items-center gap-4.5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#3B52FF] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#3B52FF]/20">
              <Send className="w-5 h-5 transform rotate-[-10deg]" />
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-950 dark:text-white leading-tight">
                {isVi ? "Không tìm thấy vị trí phù hợp?" : "Can't find an exact matching fit?"}
              </h3>
              <p className="text-xs sm:text-xs.5 text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                {isVi 
                  ? "Gửi CV cho chúng tôi, chúng tôi luôn sẵn sàng kết nối với những tài năng tuyệt vời." 
                  : "Submit your comprehensive resume directly, we are always eager to recruit incredible talents."}
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenGeneralApply}
            className="w-full md:w-auto px-6 py-3 rounded-2xl bg-[#3B52FF] hover:bg-[#2B42EF] text-white text-xs sm:text-sm font-black inline-flex items-center justify-center gap-2 transition-all shadow-md shadow-[#3B52FF]/15 group cursor-pointer"
          >
            <span>{isVi ? "Gửi CV của bạn" : "Submit your CV"}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </section>

      {/* 5. INTERACTIVE FORM MODAL WITH INTEGRATED DECENTRALIZED IDENTRA AUTO-FILL */}
      <AnimatePresence>
        {showDetailsModal && selectedJobForDetails && (() => {
          const details = getJobDetails(selectedJobForDetails.id, isVi);
          const DetailsIcon = selectedJobForDetails.icon;
          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowDetailsModal(false);
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-4xl bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
              >
                {/* Modal Header Banner */}
                <div className="p-6 md:p-8 border-b border-gray-100 dark:border-slate-850 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-50/50 dark:bg-slate-950/25">
                  <div className="flex items-start md:items-center gap-4 text-left">
                    <div className={`w-14 h-14 rounded-2xl ${selectedJobForDetails.color} flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/5`}>
                      <DetailsIcon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                          {isVi ? selectedJobForDetails.deptLabelVi : selectedJobForDetails.deptLabelEn}
                        </span>
                        <span className="text-[10px] font-extrabold text-[#5B6CFF] dark:text-[#7C8CFF] uppercase tracking-wider bg-[#5B6CFF]/10 px-2.5 py-0.5 rounded-full">
                          {selectedJobForDetails.type}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1.5 leading-tight">
                        {selectedJobForDetails.title}
                      </h3>
                      <p className="text-xs text-slate-405 dark:text-slate-400 mt-1 font-semibold flex flex-wrap items-center gap-1.5">
                        <span>{selectedJobForDetails.department}</span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-0.5 text-slate-500"><MapPin className="w-3.5 h-3.5" /> {selectedJobForDetails.location}</span>
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowDetailsModal(false)}
                    className="absolute top-6 right-6 p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-slate-500 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white outline-none cursor-pointer transition-all"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(85vh-200px)]">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column (Details 8/12) */}
                    <div className="lg:col-span-8 space-y-8 text-left">
                      
                      {/* Job Description */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-gray-150/50 dark:border-slate-850">
                          <span className="w-1.5 h-4 bg-[#3B52FF] rounded-full" />
                          <span>{isVi ? "Mô tả công việc" : "Job Description"}</span>
                        </h4>
                        <ul className="space-y-3">
                          {details.description.map((item, idx) => (
                            <li key={idx} className="flex gap-2.5 text-slate-600 dark:text-slate-305 text-xs sm:text-sm leading-relaxed">
                              <span className="text-[#3B52FF] dark:text-[#7C8CFF] mt-1 shrink-0 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-gray-150/50 dark:border-slate-850">
                          <span className="w-1.5 h-4 bg-[#3B52FF] rounded-full" />
                          <span>{isVi ? "Yêu cầu ứng viên" : "Job Requirements"}</span>
                        </h4>
                        <ul className="space-y-3">
                          {details.requirements.map((item, idx) => (
                            <li key={idx} className="flex gap-2.5 text-slate-600 dark:text-slate-305 text-xs sm:text-sm leading-relaxed">
                              <span className="text-[#3B52FF] dark:text-[#7C8CFF] mt-1 shrink-0 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-gray-150/50 dark:border-slate-850">
                          <span className="w-1.5 h-4 bg-[#4ade80] rounded-full" />
                          <span>{isVi ? "Quyền lợi được hưởng" : "Employee Benefits"}</span>
                        </h4>
                        <ul className="space-y-3">
                          {details.benefits.map((item, idx) => (
                            <li key={idx} className="flex gap-2.5 text-slate-600 dark:text-slate-305 text-xs sm:text-sm leading-relaxed">
                              <span className="text-emerald-500 mt-1 shrink-0 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Right Column (Sidebar 4/12) */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* Highlights Card */}
                      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 text-left space-y-4">
                        <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
                          {isVi ? "Tổng quan công việc" : "Role Overview"}
                        </h4>
                        
                        <div className="space-y-3.5">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">{isVi ? "Mức lương đề xuất" : "Salary Estimate"}</span>
                            <span className="text-sm font-extrabold text-[#3B52FF] dark:text-[#7C8CFF] block mt-1">{details.salary}</span>
                          </div>
                          
                          <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800">
                            <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">{isVi ? "Địa điểm làm việc" : "Location"}</span>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-1">{selectedJobForDetails.location}</span>
                          </div>

                          <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800">
                            <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">{isVi ? "Hình thức" : "Employment Type"}</span>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-1">{selectedJobForDetails.type}</span>
                          </div>

                          <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800">
                            <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">{isVi ? "Phòng ban" : "Business Department"}</span>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-1">{selectedJobForDetails.department}</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Action Call (Apply trigger) */}
                      <button
                        onClick={() => {
                          setShowDetailsModal(false);
                          handleOpenApply(selectedJobForDetails);
                        }}
                        className="w-full py-3.5 rounded-2xl bg-[#3B52FF] hover:bg-[#2B42EF] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#3B52FF]/20 group transition-all transform active:scale-[0.98]"
                      >
                        <span>{isVi ? "Ứng tuyển vị trí này" : "Apply for this Role"}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </button>

                      {/* Quick reminder info text */}
                      <p className="text-[10px] text-slate-450 dark:text-slate-500 leading-normal font-medium text-center">
                        {isVi 
                          ? "Hãy chuẩn bị sẵn sàng tệp CV dạng PDF của bạn để quá trình nộp hồ sơ diễn ra nhanh chóng dưới 1 phút." 
                          : "Upload documents directly or link with Verified Identra credentials under 1 minute."}
                      </p>

                    </div>

                  </div>
                </div>

              </motion.div>
            </div>
          );
        })()}

        {showApplyModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto bg-slate-900/60 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowApplyModal(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-left"
            >
              
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 dark:border-slate-850 flex justify-between items-center bg-gray-50/50 dark:bg-slate-950/20">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {selectedJob 
                      ? (isVi ? `Ứng tuyển ${selectedJob.title}` : `Apply for ${selectedJob.title}`)
                      : (isVi ? "Nộp hồ sơ tự tiến cử" : "Submit Open Candidacy")
                    }
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedJob 
                      ? (isVi ? `${selectedJob.department} · ${selectedJob.location}` : `${selectedJob.department} · ${jobLocationStr(selectedJob, isVi)}`)
                      : (isVi ? "Kỹ sư & Nhân tài xuất sắc" : "Open Engineering talent pool")
                    }
                  </p>
                </div>
                
                <button 
                  onClick={() => setShowApplyModal(false)}
                  className="p-1.5 rounded-xl bg-gray-150/40 hover:bg-gray-150/80 dark:bg-slate-800/40 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 outline-none cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {applyState === 'form' && (
                <form onSubmit={handleApplySubmit} className="p-6 space-y-5">
                  
                  {/* Digital fast fill Identra section representation */}
                  <div className="p-4 rounded-2xl bg-[#EEF2FF] dark:bg-[#1E1B4B]/30 border border-[#CDB4DB]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-left max-w-md">
                      <span className="text-[10px] font-bold text-indigo-500 dark:text-[#7C8CFF] uppercase tracking-wider block leading-none">{isVi ? "Được cung cấp bởi Identra" : "Powered by Identra"}</span>
                      <h4 className="text-xs sm:text-sm font-black text-[#374151] dark:text-slate-200 mt-1 leading-snug">{isVi ? "Ứng tuyển nhanh qua Ví định danh" : "Apply Instantly with Identra"}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {isVi 
                          ? "Chọn chia sẻ thông tin đã được đóng dấu chữ ký W3C từ ví của bạn để điền và ứng tuyển tức thì bảo mật." 
                          : "Instantly share physical-verified ID attributes from your cryptographic ledger wallet to auto-fill forms."}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={triggerIdentraFill}
                        disabled={isAutoFilling}
                        className="px-4 py-2 text-xs font-black text-white bg-[#3B52FF] rounded-xl hover:bg-[#2B42EF] flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50 transition-all cursor-pointer bg-none border-none"
                      >
                        {isAutoFilling ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>{isVi ? "Đang điền..." : "Filling..."}</span>
                          </>
                        ) : (
                          <>
                            <Shield className="w-3.5 h-3.5" />
                            <span>{isVi ? "Ứng tuyển qua Identra" : "Apply with Identra"}</span>
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleManualFill}
                        className="px-3.5 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                      >
                        {isVi ? "Điền mẫu" : "Demo Fill"}
                      </button>
                    </div>
                  </div>

                  {/* Auto fitting animated logs panel */}
                  {isAutoFilling && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-3.5 rounded-xl bg-slate-900 text-slate-400 font-mono text-[10px] space-y-1.5 border border-slate-800"
                    >
                      <p className="text-blue-400 font-black tracking-wider uppercase">DID PRESENTATION SECURED BRIDGE ACTIVE...</p>
                      <p className="flex items-center justify-between">
                        <span>[1/3] {isVi ? "Tìm kiếm đường hầm dữ liệu của holder..." : "Scanning for active Holder Tunnel..."}</span>
                        <span className={autoFillStep >= 1 ? 'text-emerald-400 font-bold' : ''}>
                          {autoFillStep >= 1 ? '✔ OK' : 'SYNCING'}
                        </span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span>[2/3] {isVi ? "Giải nén gói thực chứng định danh được ký số..." : "Opening Verifiable Presentation claims package..."}</span>
                        <span className={autoFillStep >= 2 ? 'text-emerald-400 font-bold' : ''}>
                          {autoFillStep >= 2 ? '✔ OK' : autoFillStep === 1 ? 'READING...' : 'AWAITING'}
                        </span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span>[3/3] {isVi ? "Xác minh mật mã chữ ký điện tử..." : "Asserting mathematical Cryptographic signatures..."}</span>
                        <span className={autoFillStep >= 3 ? 'text-emerald-400 font-bold' : ''}>
                          {autoFillStep >= 3 ? '✔ MATCH' : autoFillStep === 2 ? 'VERIFYING...' : 'AWAITING'}
                        </span>
                      </p>
                    </motion.div>
                  )}

                  {/* Standard Text fields */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Name input */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{isVi ? "Họ và tên" : "Full Name"} <span className="text-red-500">*</span></label>
                        <input 
                          type="text"
                          required
                          value={formFullName}
                          onChange={(e) => {
                            setFormFullName(e.target.value);
                            setFillType('none');
                          }}
                          placeholder={isVi ? "Nhập họ tên đầy đủ" : "e.g. John Doe"}
                          className={`w-full px-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-[#1E293B] border focus:border-blue-500/30 text-xs sm:text-sm font-semibold outline-none transition-all ${
                            fillType === 'identra' ? 'border-emerald-400 focus:border-emerald-400' : 'border-[#E5E7EB] dark:border-slate-800'
                          }`}
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{isVi ? "Email liên hệ" : "Email Address"} <span className="text-red-500">*</span></label>
                        <input 
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => {
                            setFormEmail(e.target.value);
                            setFillType('none');
                          }}
                          placeholder="name@example.com"
                          className={`w-full px-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-[#1E293B] border focus:border-blue-500/30 text-xs sm:text-sm font-semibold outline-none transition-all ${
                            fillType === 'identra' ? 'border-emerald-400 focus:border-emerald-400' : 'border-[#E5E7EB] dark:border-slate-800'
                          }`}
                        />
                      </div>

                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{isVi ? "Số điện thoại" : "Phone Number"}</label>
                      <input 
                        type="tel"
                        value={formPhone}
                        onChange={(e) => {
                          setFormPhone(e.target.value);
                          setFillType('none');
                        }}
                        placeholder="e.g. 0901234567"
                        className={`w-full px-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-[#1E293B] border focus:border-blue-500/30 text-xs sm:text-sm font-semibold outline-none transition-all ${
                          fillType === 'identra' ? 'border-emerald-400 focus:border-emerald-400' : 'border-[#E5E7EB] dark:border-slate-800'
                        }`}
                      />
                    </div>

                    {/* Drag and Drop CV File Area */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{isVi ? "Hồ sơ đính kèm (CV)" : "Attached Resume (CV)"} <span className="text-red-500">*</span></label>
                      
                      <div 
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`p-6 border-2 border-dashed rounded-2xl text-center flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                          dragActive ? 'border-[#3B52FF] bg-blue-50/20' : 'border-[#E5E7EB] dark:border-slate-800 hover:border-slate-350'
                        } ${uploadedFile ? 'bg-emerald-500/5 border-emerald-400/40' : ''}`}
                      >
                        <input 
                          type="file"
                          id="cv-file-uploader"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        
                        {uploadedFile ? (
                          <div className="space-y-2">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                              <FileText className="w-5.5 h-5.5" />
                            </div>
                            <div className="text-center font-sans">
                              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block">{uploadedFile.name}</span>
                              <span className="text-[10px] text-gray-400 dark:text-gray-500 block leading-none mt-1">
                                {(uploadedFile.size / 1024).toFixed(1)} KB · PDF/Doc format loaded
                              </span>
                            </div>
                            
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setUploadedFile(null);
                              }}
                              className="text-[10px] font-bold text-red-500 hover:text-red-700 bg-transparent border-none mt-1 uppercase tracking-wide cursor-pointer"
                            >
                              {isVi ? "Gỡ bỏ tệp" : "Remove file"}
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-850 text-slate-505 flex items-center justify-center mx-auto">
                              <Upload className="w-5 h-5 text-slate-500" />
                            </div>
                            <div className="font-sans">
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-350 block">
                                {isVi ? "Kéo thả file CV tại đây hoặc nhấp chọn" : "Drag & drop CV file here or browse files"}
                              </span>
                              <span className="text-[10.5px] text-gray-400 dark:text-gray-500 block mt-1">
                                {isVi ? "Hỗ trợ tệp định dạng PDF, DOC, DOCX tối đa 5MB" : "Supports PDF, DOC, DOCX up to 5MB file sizes"}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Submit CTA button */}
                  <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-slate-850">
                    <button
                      type="button"
                      onClick={() => setShowApplyModal(false)}
                      className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                    >
                      {isVi ? "Đóng lại" : "Cancel"}
                    </button>
                    
                    <button
                      type="submit"
                      disabled={!formFullName || !formEmail || !uploadedFile}
                      className="px-6 py-2.5 text-xs font-black text-white bg-[#3B52FF] hover:bg-[#2B42EF] rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isVi ? "Nộp hồ sơ ứng tuyển" : "Submit candidacy profile"}
                    </button>
                  </div>

                </form>
              )}

              {applyState === 'submitting' && (
                <div className="p-16 text-center space-y-4">
                  <div className="flex justify-center">
                    <Loader2 className="w-12 h-12 text-[#3B52FF] animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">{isVi ? "Đang gửi hồ sơ..." : "Uploading application..."}</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                      {isVi 
                        ? "Hồ sơ của bạn đang được mã hóa và gửi đến cổng thông tin tuyển dụng an toàn của SSI." 
                        : "Your certified candidacy presentation package is being safely uploaded and encrypted."}
                    </p>
                  </div>
                </div>
              )}

              {applyState === 'success' && (
                <div className="p-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-9 h-9 stroke-[3]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">
                      {isVi ? "Nộp hồ sơ thành công!" : "Application Submitted Successfully!"}
                    </h4>
                    
                    {fillType === 'identra' ? (
                      <div className="inline-block p-3 rounded-2xl bg-emerald-500/5 border border-emerald-400/20 text-xs text-emerald-700 dark:text-emerald-400 text-left max-w-md">
                        <span className="font-extrabold block">SSI Certified Credentials Applied Successfully:</span>
                        <p className="mt-1 leading-relaxed text-[11px]">
                          {isVi 
                            ? "Tính chân thực hồ sơ (Họ tên, Sđt, Email) đã được chứng thực bằng chữ ký số trong blockchain. Điểm tin cậy ứng viên tăng thêm +30%."
                            : "Candidate information is secured using authenticated cryptographic zero-knowledge presentation tokens."}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                        {isVi 
                          ? "Cảm ơn bạn đã ứng tuyển! Trưởng bộ phận phụ trách sẽ liên hệ trực tiếp với bạn qua email hoặc số điện thoại trong vòng 2-3 ngày làm việc." 
                          : "Thank you for applying! Our hiring managers and engineers will contact you within 2-3 business days."}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setShowApplyModal(false)}
                    className="px-6 py-2.5 text-xs font-black text-white bg-slate-900 dark:bg-blue-600 rounded-xl cursor-pointer hover:bg-slate-800"
                  >
                    {isVi ? "Hoàn tất" : "Done"}
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Location and auxiliary formatting string builders
function jobLocationStr(job: Job, isVi: boolean): string {
  if (job.locationKey === 'hanoi') return 'Hanoi';
  if (job.locationKey === 'hcm') return 'Ho Chi Minh';
  return 'Remote';
}

interface JobDetailContent {
  salary: string;
  description: string[];
  requirements: string[];
  benefits: string[];
}

function getJobDetails(jobId: string, isVi: boolean): JobDetailContent {
  if (jobId === 'job-1') {
    return {
      salary: isVi ? "$1,800 - $2,500" : "$1,800 - $2,500",
      description: isVi ? [
        "Thiết kế và tối ưu các hệ thống API bảo mật, hiệu năng cao phục vụ quá trình phát hành và kiểm chứng dữ liệu số phi tập trung.",
        "Nghiên cứu triển khai các tiêu chuẩn định danh mở của tổ chức W3C bao gồm DIDs (Decentralized Identifiers) và Verifiable Credentials.",
        "Xây dựng hạ tầng lưu trữ phân tán, bảo vệ mã hóa dữ liệu riêng tư tối ưu hiệu suất truy vấn.",
        "Hợp tác phát triển luồng giao vận lý tưởng với nhóm kỹ sư mật mã (Cryptography) và Blockchain."
      ] : [
        "Design and optimize high-throughput, secure API services executing self-sovereign identity issuance protocols.",
        "Build fully standard compliant integrations for W3C Decentralized Identifiers (DIDs) and Verifiable Credentials.",
        "Develop distributed storage engines protecting cryptographic keys and user identity schemas with extreme density.",
        "Coordinate with cryptographers and smart contract ledger engineers to streamline secure presentation verification."
      ],
      requirements: isVi ? [
        "Hơn 3 năm kinh nghiệm lập trình Backend với một trong các ngôn ngữ: Node.js, Golang, hoặc Rust.",
        "Am hiểu các nguyên lý thiết kế hệ thống phân tán, cơ sở dữ liệu quy mô lớn (PostgreSQL, NoSQL Redis).",
        "Có kiến thức nền tảng tốt về mật mã học cơ bản (Chữ ký điện tử, mã khóa công khai, cặp khóa RSA/ECDSA).",
        "Tư duy thuật toán tốt, phân tích hành vi mã lỗi nhanh chóng, quen thuộc hạ tầng Docker/Kubernetes."
      ] : [
        "3+ years experience engineering secure backends using Node.js, Golang, or Rust.",
        "Strong familiarity with high-availability distributed systems and database engines (PostgreSQL, Redis).",
        "Solid foundations in symmetric/asymmetric cryptography (ECC, ECDSA signatures, RSA public keys).",
        "Excellent analytical mindset, debug instincts, and comfort with Docker containerized environments."
      ],
      benefits: isVi ? [
        "Mức lương cạnh tranh theo năng lực cùng thưởng hiệu quả theo dự án.",
        "Bảo hiểm sức khỏe toàn diện cao cấp tại các cơ sở y tế 5 sao.",
        "Được cung cấp đầy đủ thiết bị cao cấp (Macbook Pro, màn hình cỡ lớn).",
        "Hỗ trợ chi phí nâng cao kỹ năng và tham dự hội thảo công nghệ quốc tế."
      ] : [
        "Highly competitive salary package and quarterly performance milestone bonuses.",
        "Premium personal medical insurance plans and modern diagnostic healthcare services.",
        "Complete enterprise hardware setup (MacBook Pro M3, external high-res monitors).",
        "Full subsidy sponsorship for advanced academic qualifications and security conferences."
      ]
    };
  } else if (jobId === 'job-2') {
    return {
      salary: isVi ? "$2,500 - $3,500" : "$2,500 - $3,500",
      description: isVi ? [
        "Thiết kế và lập trình các Hợp đồng thông minh (Smart Contracts) tối ưu và cực kỳ an toàn trên EVM và các mạng công nghệ mới.",
        "Nghiên cứu ứng dụng các thuật toán không tiết lộ thông tin Zero-Knowledge Proofs (ZKP, zk-SNARKs) nhằm xác thực danh tính giấu tên.",
        "Phát triển các cơ chế phân quyền lưu trữ thông tin neo dấu vết gốc trên blockchain không lo sợ rò rỉ dữ liệu cá nhân.",
        "Triển khai tích hợp các giải pháp Multi-Party Computation (MPC) nâng cấp trải nghiệm quản lý khóa."
      ] : [
        "Write, audit, and deploy highly secure and gas-efficient Smart Contracts on EVM and target layer blockchains.",
        "Implement advanced Zero-Knowledge Proofs (ZKP, zk-SNARKs) to facilitate fully anonymous yet valid identity claims.",
        "Develop anchoring consensus protocols validating credentials against tamperproof ledgers preserving user privacy.",
        "Co-design secure cryptographic multi-party computation (MPC) threshold cryptosystems."
      ],
      requirements: isVi ? [
        "Có kinh nghiệm thực chiến lập trình solidity hoặc Rust trên 2 năm trong các dự án Web3/Defi.",
        "Am hiểu sâu sắc về kiến trúc EVM, cấu trúc Merkle Tree, bảo mật Smart Contract ngăn ngừa re-entrancy.",
        "Có tư duy tốt về mật mã học tiên tiến và lý thuyết trò chơi (Game theory).",
        "Có kinh nghiệm vận hành node, sử dụng các framework phát triển như Hardhat, Foundry."
      ] : [
        "2+ years expertise deploying smart contracts via Solidity/Rust for high-profile Web3 systems.",
        "Deep familiarity with EVM internals, Merkle state proofs, and smart contract audit procedures.",
        "Excellent knowledge of cryptography, cryptography standards, and computer science theories.",
        "Practical experience operating full nodes and using modern toolchains (Foundry, Hardhat)."
      ],
      benefits: isVi ? [
        "Thu nhập đột phá, thưởng theo token dự án hấp dẫn.",
        "Làm việc trực tiếp cùng các chuyên gia hàng đầu lĩnh vực mật mã học toàn cầu.",
        "Thời gian làm việc linh hoạt tối đa, thúc đẩy văn hóa tự quản trị.",
        "Được cử đi đào tạo trực tiếp tại các trung tâm R&D mật mã quốc tế."
      ] : [
        "Outstanding base salary paired with flexible potential project milestone incentive token provisions.",
        "Direct collaboration with world-renowned cryptographic scientists and pioneers.",
        "Ultra-flexible workspace culture focusing entirely on functional delivery and autonomy.",
        "Sponsored continuous education workshops and overseas cryptographic engineering training."
      ]
    };
  } else if (jobId === 'job-3') {
    return {
      salary: isVi ? "$2,000 - $2,800" : "$2,000 - $2,800",
      description: isVi ? [
        "Xây dựng ma trận giám sát an ninh mạng phòng thủ, phát hiện và phản ứng nhanh với các sự cố xâm nhập.",
        "Thực hiện Pentest (tấn công thử thử nghiệm bảo mật) định kỳ hệ thống API, máy chủ Cloud hạ tầng.",
        "Rà soát mã nguồn (Code review) hỗ trợ đội phát triển phát hiện các lỗ hổng logic nghiêm trọng trước khi triển khai.",
        "Đảm bảo hệ sinh thái SSI của công ty tuân thủ các chứng chỉ bảo mật cấp cao toàn cầu (ISO 27001, SOC 2)."
      ] : [
        "Build high-grade continuous monitoring alerts detecting multi-layered infrastructure intrusions.",
        "Perform systematic web application penetration testing and cloud microservice vulnerability assessments.",
        "Participate in secure code reviews assisting developers in resolving logical exploits.",
        "Lead corporate compliance strategies towards top security designations (ISO 27001, SOC 2)."
      ],
      requirements: isVi ? [
        "Kinh nghiệm tối thiểu 3 năm trong mảng An ninh thông tin, DevSecOps hoặc Pentest hệ thống.",
        "Sử dụng thành thạo các công cụ Burp Suite, OWASP ZAP, Metasploit, Wireshark.",
        "Nắm rõ kiến trúc bảo mật đám mây (AWS, GCP), hệ điều hành Linux và cấu hình chính sách mạng.",
        "Các chứng chỉ bảo mật quốc tế CEH, CompTIA Security+, OSCP là lợi thế lớn."
      ] : [
        "3+ years active tenure in Cybersecurity engineering, penetration testing, or DevSecOps.",
        "Fluency in industry tools (e.g., Burp Suite, OWASP ZAP, Metasploit, Wireshark, Nessus).",
        "Rich understanding of public cloud security postures (GCP, AWS) and firewall configurations.",
        "High value certifications (OSCP, CEH, CISSP) are intensely preferred."
      ],
      benefits: isVi ? [
        "Thu nhập thỏa thuận cao kèm quà tặng các chứng chỉ quốc tế được công ty chi trả hoàn toàn.",
        "Chế độ làm việc linh hoạt Work From Anywhere (WFA) thông minh tự chủ.",
        "Teambuilding kết nối sâu rộng, môi trường công nghệ cực kỳ năng động sáng tạo.",
        "Gói chăm sóc sức khỏe VIP cho người thân trong gia đình."
      ] : [
        "Excellent compensatory salary, with 100% company-funded professional certifications.",
        "Smart Work-From-Anywhere flex-work options that value productivity over desk hours.",
        "Highly authentic, creative culture alongside high-standard peer developers.",
        "All-inclusive VIP healthcare checkup program extended to immediate family."
      ]
    };
  } else if (jobId === 'job-4') {
    return {
      salary: isVi ? "$2,200 - $3,200" : "$2,200 - $3,200",
      description: isVi ? [
        "Chịu trách nhiệm nghiên cứu sản phẩm, định hình lộ trình phát triển lâu dài cho các dự án ví định danh và cổng xác thực.",
        "Thực hiện phỏng vấn người dùng, khảo sát thị trường để nắm rõ nhu cầu bảo mật thông tin thiết thực.",
        "Cụ thể hóa yêu cầu nghiệp vụ thành tài liệu PRD, kịch bản người dùng chi tiết, truyền tải thông suốt tới kỹ sư.",
        "Tối ưu hóa các chỉ số thành công cốt lõi, cải thiện trải nghiệm tương tác liên kết định danh người dùng."
      ] : [
        "Own the core product roadmap and feature strategy representing the Identra decentralized wallet.",
        "Conduct systematic user-research and competitor analytics mapping the self-sovereign identity landscape.",
        "Synthesize high-fidelity Product Requirement Documents (PRDs) and user journeys for developer pipelines.",
        "Consistently evaluate product usage funnels to ease non-technical user trust and wallet interface adoption."
      ],
      requirements: isVi ? [
        "Hơn 3 năm kinh nghiệm làm Quản lý Sản phẩm (Product Manager / Product Owner) trong mảng Fintech, Security hoặc Web3.",
        "Có tư duy logic xuất sắc, ra quyết định dựa trên số liệu thực tế khoa học.",
        "Kỹ năng điều phối, dẫn dắt đội nhóm xuất sắc, giao tiếp tiếng Anh trôi chảy phục vụ đối tác toàn cầu.",
        "Hiểu chi tiết cơ chế bảo mật danh tính, tài chính số hoặc quản lý khóa là điểm cộng."
      ] : [
        "3+ years product management experience directing modern Fintech, SaaS, or complex Web3 mobile/web apps.",
        "Distinguished logical deduction mindset crafting product milestones purely from evidence, metrics, and data.",
        "Masterful interpersonal coordination capabilities with high English command for global stakeholders.",
        "Clear baseline awareness of digital signature mechanics, data compliance, or identity management."
      ],
      benefits: isVi ? [
        "Thưởng đặc quyền dựa trên tiến độ bàn giao sản phẩm độc đáo vượt trội.",
        "Văn phòng làm việc cực kỳ sang trọng, trang thiết bị rực rỡ, đầy đủ tiện ích giải trí.",
        "Cơ hội khẳng định dấu ấn cá nhân trong lĩnh vực công nghệ có tốc độ bùng nổ hàng đầu.",
        "Lương tháng 13 cam kết tối thiểu và thưởng hiệu suất cuối năm dồi dào."
      ] : [
        "Incredible product performance milestone reward packages.",
        "Ultra-modern downtown office lounge with creative recreation spaces and full-service gourmet pantry.",
        "Unfettered creative freedom to build regional and global digital identity infrastructure solutions.",
        "Guaranteed minimum 13th-month payroll with generous variable performance end-of-year bonuses."
      ]
    };
  } else {
    return {
      salary: isVi ? "Thỏa thuận" : "Negotiable",
      description: isVi ? [
        "Tham gia nghiên cứu, phát triển hoặc tối ưu hóa các phân hệ thuộc nền tảng SSI và giải pháp công nghệ Identra của công ty.",
        "Hợp tác chặt chẽ cùng các kỹ sư và chuyên gia liên quan để đảm bảo khả năng mở rộng hệ thống, tính ổn định cao.",
        "Đóng góp ý kiến cải tiến quy trình công nghệ bảo vệ lợi ích và quyền riêng tư tối thượng của người sử dụng.",
        "Tài liệu hóa và chuẩn hóa các luồng xử lý phục vụ mục tiêu hướng tới mã nguồn mở chất lượng cao."
      ] : [
        "Contribute directly to the research, development, and delivery of our enterprise SSI wallet platforms.",
        "Work collaboratively in multidisciplinary teams to ensure system scaling, secure integrations, and high resilience.",
        "Actively pitch quality improvements protecting fundamental digital human privacy and usability.",
        "Publish well-structured documentation helping community devs integrate open-source decentralized modules."
      ],
      requirements: isVi ? [
        "Độ tuổi từ 22-35, tốt nghiệp Đại học chuyên ngành Công nghệ thông tin, Toán tin hoặc tương đương.",
        "Có tối thiểu 1-3 năm kinh nghiệm thực tế liên quan mật thiết đến vị trí ứng tuyển.",
        "Nắm vững tư duy giải quyết vấn đề, chủ động tìm tòi nghiên cứu các công nghệ tiến bộ mới.",
        "Tinh thần làm việc nhóm cao, trách nhiệm với sản phẩm chung, trung thực và cầu thị."
      ] : [
        "Bachelor's in Computer Science, Mathematics, Cybernetics, or equivalent engineering disciplines.",
        "1-3 years practical experience tightly linked to the targeted technical domain or adjacent areas.",
        "Highly adaptive problem-solving approach combined with proactive research into emerging frameworks.",
        "Stellar team-cohesion attitude, deep product ownership, transparency, and personal initiative."
      ],
      benefits: isVi ? [
        "Mức lương cứng hấp dẫn kèm các khoản trợ cấp ăn trưa, xăng xe thiết yếu hàng tháng.",
        "Làm việc trong môi trường thân thiện, hòa đồng, cơ hội thăng tiến rộng mở và nhanh chóng.",
        "Sự kiện gắn kết hàng tháng, dã ngoại sinh nhật cùng đồng nghiệp.",
        "Có cơ hội trải nghiệm các khóa đào tạo chuyên sâu nội bộ định kỳ miễn phí."
      ] : [
        "Highly attractive base package with dynamic monthly allowances (lunch, transportation, workspace).",
        "Engaging, vibrant workspace that ensures rapid career acceleration and high ownership milestones.",
        "Monthly social events, team bonding dinners, and corporate birthday celebrations.",
        "Periodic access to professional certified crash courses hosted internally for free."
      ]
    };
  }
}
