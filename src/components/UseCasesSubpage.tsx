import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Home,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sliders,
  CheckCircle2,
  Sparkles,
  Key,
  GraduationCap,
  Landmark,
  Briefcase,
  Laptop,
  Plane,
  Ticket,
  ArrowLeftRight,
  Building2,
  Heart,
  Zap,
  Smartphone,
  Scan,
  Cpu,
  Layers,
  Check,
  Lock,
  X,
  Loader2,
  MapPin,
  DollarSign,
  Clock,
  AlertTriangle,
  Music,
  Plus,
  Minus,
  Gem,
  Star,
  ChevronLeft,
  CreditCard,
  Info,
  Calendar,
  Volume2,
  VolumeX,
  Phone,
  Video,
  Send,
  MoreHorizontal,
  User,
  RefreshCw,
  FileText,
  Image,
  ArrowLeft
} from 'lucide-react';

interface UseCasesSubpageProps {
  lang: 'vi' | 'en';
  onBack: () => void;
  onOpenDemo?: () => void;
}

export default function UseCasesSubpage({ lang, onBack, onOpenDemo }: UseCasesSubpageProps) {
  const isVi = lang === 'vi';

  const [showAll, setShowAll] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showQRDetail, setShowQRDetail] = useState(false);
  const [demoState, setDemoState] = useState<'list' | 'nhan_thuc_chung'>('list');
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(298); // 4 minutes 58 seconds
  const [scanSimulated, setScanSimulated] = useState(false);

  // Step 2/4 Bank account opening states
  const [showBankFormModal, setShowBankFormModal] = useState(false);
  const [bankStep, setBankStep] = useState(2); // 2: Form, 3: Auditing, 4: Success card
  const [bankFullName, setBankFullName] = useState('');
  const [bankDob, setBankDob] = useState('');
  const [bankNationality, setBankNationality] = useState('');
  const [bankAddress, setBankAddress] = useState('');
  const [bankEmail, setBankEmail] = useState('');
  const [bankPhone, setBankPhone] = useState('');
  const [fillType, setFillType] = useState<'none' | 'identra' | 'manual'>('none');
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [autoFillStep, setAutoFillStep] = useState(0); // 0: idle, 1: connecting, 2: reading, 3: validating, 4: completed
  const [showIdentraQR, setShowIdentraQR] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0); // 0: idle/checking first, 1: first done, 2: second done, 3: completed
  const [jobProgressCount, setJobProgressCount] = useState<number>(0);

  // Derive progress values cleanly to solve race conditions and timing bugs
  const jobVerProgressArray = Array.from({ length: 5 }, (_, i) => {
    if (jobProgressCount >= (i + 1) * 100) return 100;
    if (jobProgressCount <= i * 100) return 0;
    return jobProgressCount - (i * 100);
  });
  const currentJobVerIdx = Math.min(Math.floor(jobProgressCount / 100), 4);
  const [bankStepFourCompleted, setBankStepFourCompleted] = useState(false);
  const [bankStepFourTimeLeft, setBankStepFourTimeLeft] = useState(7);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Step 2/4 Concert ticketing states
  const [selectedTicketType, setSelectedTicketType] = useState<'standard' | 'vip' | 'backstage'>('vip');
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [concertKycVerified, setConcertKycVerified] = useState<boolean>(false);
  const [concertCheckoutActive, setConcertCheckoutActive] = useState<boolean>(false);
  const [isScanningConcertQR, setIsScanningConcertQR] = useState<boolean>(false);
  const [isConcertPaid, setIsConcertPaid] = useState<boolean>(false);
  const [concertPaymentTimer, setConcertPaymentTimer] = useState<number>(892); // 14 mins and 52 secs -> 892 secs

  // Concert Ticket Transfer Demo States
  const [transferSoundEnabled, setTransferSoundEnabled] = useState<boolean>(true);
  const [transferMgs, setTransferMgs] = useState<any[]>([]);
  const [isTypingA, setIsTypingA] = useState<boolean>(false);
  const [typingTextA, setTypingTextA] = useState<string>('');
  const [contractStage, setContractStage] = useState<'none' | 'initial' | 'waiting' | 'verifying' | 'completed'>('none');
  const [contractVerifiedChecks, setContractVerifiedChecks] = useState<number>(0);
  const [transferPayment, setTransferPayment] = useState<'none' | 'processing' | 'paid'>('none');
  const [transferCompletedState, setTransferCompletedState] = useState<boolean>(false);
  const [currentTransferStep, setCurrentTransferStep] = useState<number>(0);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Auto-scroll effect whenever messages array or typing state shifts
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [transferMgs, isTypingA, typingTextA, contractStage, transferPayment]);

  // Clean transition/sound teardown
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, []);

  const playSfx = (type: 'message' | 'typing' | 'success' | 'click') => {
    if (!transferSoundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      
      if (type === 'message') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'typing') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Crisp mechanical keyboard dynamic click sound synthesis
        const basePitch = 650 + Math.random() * 400; // slightly randomized keys pitch
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(basePitch, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(70 + Math.random() * 20, ctx.currentTime + 0.015);
        
        // Exquisite short high-fidelity dynamic keystroke sound envelope
        gain.gain.setValueAtTime(0.035, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.018);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.018);
      } else if (type === 'success') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
        osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.06);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      }
    } catch (e) {
      console.warn("AudioContext failure:", e);
    }
  };

  // Concert Ticketing Calculations helper
  const ticketInfo = {
    standard: {
      name: isVi ? 'Vé Standard' : 'Standard Ticket',
      price: 500000,
      area: isVi ? 'Khu vực: Tầng 3' : 'Level 3 Area',
    },
    vip: {
      name: isVi ? 'Vé VIP' : 'VIP Ticket',
      price: 2000000,
      area: isVi ? 'Khu vực: Tầng 1 - Khu VIP' : 'VIP Zone (Level 1)',
    },
    backstage: {
      name: isVi ? 'Vé Backstage' : 'Backstage Ticket',
      price: 5000000,
      area: isVi ? 'Khu vực: Backstage Lounge' : 'Backstage Lounge Area',
    }
  };
  const activeTicket = ticketInfo[selectedTicketType];
  const totalAmount = activeTicket.price * ticketQuantity;

  const showLocalToast = (msg: string) => {
    setToastMessage(msg);
    // Explicitly auto-dismiss after 4.5 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleIdentraFill = () => {
    // 🎧 Play high-fidelity digital chime tone (660Hz with lowpass exponential decay)
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        const audioCtx = new AudioCtxClass();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'sine';
        // Double tone or swift beep sound representing a high-tech scan confirmation chime
        oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5 note
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.08); // A5 note

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.22);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.25);
      }
    } catch (e) {
      console.warn('Web Audio API was blocked or unsupported on client:', e);
    }

    // 📱 Trigger lightweight haptic feedback device tick pulse (simulation)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([40, 20, 60]); // responsive double pulse feedback
      } catch (e) {}
    }

    setShowIdentraQR(false);
    setIsAutoFilling(true);
    setAutoFillStep(1);
    
    setTimeout(() => {
      setAutoFillStep(2);
      setTimeout(() => {
        setAutoFillStep(3);
        setTimeout(() => {
          setAutoFillStep(4);
          // Set real claims values representing Hoàng Anh Tuấn credential data
          setBankFullName('HOÀNG ANH TUẤN');
          setBankDob('12/03/2001');
          setBankNationality('Việt Nam');
          setBankAddress('123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh');
          setBankEmail('tuan.hoanganh@gmail.com');
          setBankPhone('0901234567');
          setFillType('identra');
          setIsAutoFilling(false);
          if (selectedScenarioIdx === 1) {
            setBankStep(3);
          }
        }, 500);
      }, 500);
    }, 500);
  };

  const handleConcertQrScanSimulate = () => {
    setIsScanningConcertQR(true);
    // 🎧 Play high-fidelity digital chime tone (660Hz with lowpass exponential decay)
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
    } catch (e) {
      console.warn('Web Audio API was blocked or unsupported on client:', e);
    }

    // 📱 Trigger lightweight haptic feedback device tick pulse (simulation)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([40, 20, 60]);
      } catch (e) {}
    }

    // Simulate scanning and resolving decentralized claims
    setTimeout(() => {
      setIsScanningConcertQR(false);
      setConcertKycVerified(true);
      
      // Auto populate claims values representing true verification
      setBankFullName('ĐÀO TRẦN KHÁNH HOÀNG');
      setBankDob('15/08/2005');
      setBankNationality('Việt Nam');
      setBankAddress('Tràng Tiền, Quận Hoàn Kiếm, Hà Nội');
      setBankEmail('khanhhoang@gmail.com');
      setBankPhone('0904567890');
      setFillType('identra');

      showLocalToast(isVi ? "Xác minh độ tuổi thành công! Nút 'Tiếp tục' đã được mở." : "Age verifications resolved! 'Proceed' button is now enabled.");
    }, 1200);
  };

  const handleManualFill = () => {
    setBankFullName('NGUYỄN VĂN A');
    setBankDob('15/08/1995');
    setBankNationality('Việt Nam');
    setBankAddress('321 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh');
    setBankEmail('nguyen.van.a@gmail.com');
    setBankPhone('0912345678');
    setFillType('manual');
  };

  // Timer countdown for credentials QR code
  useEffect(() => {
    if (demoState !== 'nhan_thuc_chung' || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [demoState, timeLeft]);


  // Start the Concert Ticket Transfer Demo
  const startTransferDemo = () => {
    setTransferMgs([]);
    setIsTypingA(false);
    setTypingTextA('');
    setContractStage('none');
    setContractVerifiedChecks(0);
    setTransferPayment('none');
    setTransferCompletedState(false);
    setCurrentTransferStep(0);
  };

  // Effect to automatically start and reset transfer demo
  useEffect(() => {
    if (showBankFormModal && selectedScenarioIdx === 6) {
      startTransferDemo();
    }
  }, [showBankFormModal, selectedScenarioIdx]);

  // Autoplay script for the Concert Ticket Transfer scenario
  useEffect(() => {
    if (!showBankFormModal || selectedScenarioIdx !== 6) return;
    
    let timer1: any;
    let timer2: any;
    
    const playNotification = () => {
      playSfx('message');
    };
    
    if (currentTransferStep === 0) {
      // Step 0: Open page, wait 1000ms, B sends opening message
      timer1 = setTimeout(() => {
        playNotification();
        setTransferMgs([{
          id: 'b1',
          sender: 'B',
          text: isVi 
            ? "Chào bạn, mình vừa thấy bài bạn đăng bán lại vé trên nhóm AwnTicket. Không biết bạn đã bán chưa ạ!"
            : "Hi there! I just saw your resale ticket post in the AwnTicket group. Is it still available?",
          attachment: 'resale_post',
          time: '12:04'
        }]);
        setCurrentTransferStep(1);
      }, 1000);
    } 
    
    else if (currentTransferStep === 1) {
      // Step 1: Wait 1800ms, A starts typing
      timer1 = setTimeout(() => {
        setIsTypingA(true);
        const sentence = isVi 
          ? "Mình chưa bạn ơi, bạn có nhu cầu thì mình để giá 500k."
          : "Not sold yet, friend! If you are interested, I can let it go for 500k.";
        
        let typed = '';
        let charIndex = 0;
        
        const typeInterval = setInterval(() => {
          if (charIndex < sentence.length) {
            typed += sentence[charIndex];
            setTypingTextA(typed);
            charIndex++;
            playSfx('typing');
          } else {
            clearInterval(typeInterval);
            setIsTypingA(false);
            setTypingTextA('');
            
            setTransferMgs(prev => [...prev, {
              id: 'a1',
              sender: 'A',
              text: sentence,
              time: '12:05'
            }]);
            
            setCurrentTransferStep(2);
          }
        }, 40);
        
        return () => clearInterval(typeInterval);
      }, 1800);
    } 
    
    else if (currentTransferStep === 2) {
      // Step 2: B sends reply after 2000ms
      timer1 = setTimeout(() => {
        playNotification();
        setTransferMgs(prev => [...prev, {
          id: 'b2',
          sender: 'B',
          text: isVi ? "Vâng vậy bạn để cho mình." : "Okay great, please reserve it for me.",
          time: '12:05'
        }]);
        setCurrentTransferStep(3);
      }, 2000);
    } 
    
    else if (currentTransferStep === 3) {
      // Step 3: B asks for Identra transaction after 1500ms
      timer1 = setTimeout(() => {
        playNotification();
        setTransferMgs(prev => [...prev, {
          id: 'b3',
          sender: 'B',
          text: isVi 
            ? "Nếu được thì mình muốn giao dịch qua Identra cho chắc chắn nhé."
            : "If possible, I would love to complete the exchange over Identra to be absolutely secure.",
          time: '12:05'
        }]);
        setCurrentTransferStep(4);
      }, 1500);
    } 
    
    else if (currentTransferStep === 4) {
      // Step 4: A typing reply after 1800ms
      timer1 = setTimeout(() => {
        setIsTypingA(true);
        const sentence = isVi 
          ? "Ok bạn, mình tạo hợp đồng giao dịch qua Identra đây nhé."
          : "Sure thing! I will draft the secure exchange contract via Identra right away.";
        
        let typed = '';
        let charIndex = 0;
        
        const typeInterval = setInterval(() => {
          if (charIndex < sentence.length) {
            typed += sentence[charIndex];
            setTypingTextA(typed);
            charIndex++;
            playSfx('typing');
          } else {
            clearInterval(typeInterval);
            setIsTypingA(false);
            setTypingTextA('');
            
            setTransferMgs(prev => [...prev, {
              id: 'a2',
              sender: 'A',
              text: sentence,
              time: '12:06'
            }]);
            
            setCurrentTransferStep(5);
          }
        }, 40);
        
        return () => clearInterval(typeInterval);
      }, 1800);
    } 
    
    else if (currentTransferStep === 5) {
      // Step 5: A sends Smart Contract Card
      timer1 = setTimeout(() => {
        playNotification();
        setContractStage('initial');
        setTransferMgs(prev => [...prev, {
          id: 'contract_msg',
          sender: 'A',
          attachment: 'contract_card',
          time: '12:06'
        }]);
        setCurrentTransferStep(6);
      }, 1000);
    }
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [currentTransferStep, showBankFormModal, selectedScenarioIdx, isVi]);

  // Click handler when user proceeds with contract
  const handleProceedTransfer = () => {
    playSfx('click');
    setContractStage('waiting');
    
    setTransferMgs(prev => [...prev, {
      id: 'sys1',
      sender: 'system',
      text: isVi 
        ? "Identra đã khóa tạm thời vé VIP A12 để tránh việc bán trùng trong thời gian giao dịch." 
        : "Identra has temporarily locked VIP Ticket A12 to prevent duplicate selling threats during transit."
    }]);
    
    setTimeout(() => {
      playSfx('message');
      setTransferMgs(prev => [...prev, {
        id: 'b_pay_prepare',
        sender: 'B',
        text: isVi 
          ? "Mình đã kiểm tra thông tin vé rồi, mình tiến hành thanh toán nhé." 
          : "I have verified the ticket claims. Proceeding to settle payment now.",
        time: '12:07'
      }]);
      
      setTimeout(() => {
        playSfx('message');
        setTransferPayment('processing');
        setTransferMgs(prev => [...prev, {
          id: 'payment_msg',
          sender: 'B',
          attachment: 'payment_card',
          time: '12:07'
        }]);
        
        setTimeout(() => {
          setTransferPayment('paid');
          playSfx('success');
          
          setTimeout(() => {
            setContractStage('verifying');
            setContractVerifiedChecks(0);
            
            let count = 0;
            const intervalId = setInterval(() => {
              count++;
              setContractVerifiedChecks(count);
              playSfx('click');
              
              if (count === 6) {
                clearInterval(intervalId);
                
                setTimeout(() => {
                  setContractStage('completed');
                  playSfx('success');
                  
                  setTransferMgs(prev => [...prev, {
                    id: 'sys2',
                    sender: 'system',
                    text: isVi 
                      ? "Identra đã hoàn tất giao dịch. Vé trong ví người bán không còn hiệu lực để vào cổng. Người mua hiện là chủ sở hữu hợp lệ của vé."
                      : "Identra has completed the transfer. The ticket inside the seller's wallet is now invalidated. The buyer is now the sole legal proprietor of the ticket."
                  }]);
                  
                  setTimeout(() => {
                    playSfx('message');
                    setTransferMgs(prev => [...prev, {
                      id: 'b4',
                      sender: 'B',
                      text: isVi 
                        ? "Cảm ơn bạn nhé, mình đã nhận được vé trong ví rồi."
                        : "Awesome, thank you so much! I've already received the verified ticket into my wallet profile.",
                      time: '12:08'
                    }]);
                    
                    setTimeout(() => {
                      setIsTypingA(true);
                      const replyText = isVi 
                        ? "Cảm ơn bạn. Giao dịch xong nhanh thật."
                        : "You're very welcome! That secure exchange was incredibly fast.";
                      
                      let typed = '';
                      let charIndex = 0;
                      const replyInterval = setInterval(() => {
                        if (charIndex < replyText.length) {
                          typed += replyText[charIndex];
                          setTypingTextA(typed);
                          charIndex++;
                          playSfx('typing');
                        } else {
                          clearInterval(replyInterval);
                          setIsTypingA(false);
                          setTypingTextA('');
                          setTransferMgs(prev => [...prev, {
                            id: 'a3',
                            sender: 'A',
                            text: replyText,
                            time: '12:08'
                          }]);
                          
                          setTimeout(() => {
                            setTransferCompletedState(true);
                          }, 800);
                        }
                      }, 40);
                    }, 1200);
                  }, 1800);
                }, 1000);
              }
            }, 800);
          }, 1205);
        }, 2500);
      }, 1200);
    }, 1800);
  };

  // Timer countdown for concert payment in Step 3/4
  useEffect(() => {
    if (bankStep === 3 && selectedScenarioIdx === 2 && !isConcertPaid && concertPaymentTimer > 0) {
      const interval = setInterval(() => {
        setConcertPaymentTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [bankStep, selectedScenarioIdx, isConcertPaid, concertPaymentTimer]);

  // Simulated validation checker for bank account opening Step 3/4
  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;

    if (bankStep === 3) {
      setVerificationProgress(0); // Start at 0: verifying first item
      
      t1 = setTimeout(() => {
        setVerificationProgress(1); // Item 1 verified, verifying second
        
        t2 = setTimeout(() => {
          setVerificationProgress(2); // Item 2 verified, verifying third
          
          t3 = setTimeout(() => {
            setVerificationProgress(3); // Item 3 verified, all complete!
          }, 1000);
        }, 1000);
      }, 1000);
    } else {
      setVerificationProgress(0);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [bankStep]);

  // Simulated validation progress for Scenario 1 (Nộp hồ sơ xin việc) Step 3/4
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (bankStep === 3 && selectedScenarioIdx === 1) {
      setJobProgressCount(0);
      
      // We want the total simulation to run across approximately 10 seconds.
      // 5 checks * 100 points = 500 total points.
      // Increasing by 5 points every 100ms gives exactly 100 ticks, which equals 10.0 seconds.
      interval = setInterval(() => {
        setJobProgressCount(prev => {
          if (prev >= 500) {
            clearInterval(interval);
            return 500;
          }
          return prev + 5;
        });
      }, 100);
    } else {
      setJobProgressCount(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [bankStep, selectedScenarioIdx]);

  // Step 4/4 7-second automatic lock release
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (bankStep === 4) {
      setBankStepFourCompleted(false);
      setBankStepFourTimeLeft(7);
      
      interval = setInterval(() => {
        setBankStepFourTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setBankStepFourCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBankStepFourCompleted(false);
      setBankStepFourTimeLeft(7);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [bankStep]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const demoScenarios = [
    {
      icon: <Landmark className="w-16 h-16 text-[#5B6CFF] dark:text-[#7C8CFF]" />,
      title: isVi ? "Mở tài khoản ngân hàng" : "Open Bank Account",
      desc: isVi 
        ? "Dùng thực chứng danh tính và nơi cư trú để mở tài khoản nhanh hơn, không cần chụp giấy tờ nhiều lần."
        : "Use verified identity and residency claims to open bank accounts in seconds without repeated uploads.",
    },
    {
      icon: <Briefcase className="w-16 h-16 text-emerald-500" />,
      title: isVi ? "Nộp hồ sơ xin việc" : "Apply for Jobs",
      desc: isVi 
        ? "Chia sẻ bằng cấp, chứng chỉ và kinh nghiệm đã được xác minh cho nhà tuyển dụng một cách chuyên nghiệp."
        : "Instantly share verified qualifications, degrees, and certified histories directly to hiring managers.",
    },
    {
      icon: <Ticket className="w-16 h-16 text-purple-500" />,
      title: isVi ? "Mua vé xem biểu diễn ca nhạc" : "Concert Ticket Booking",
      desc: isVi 
        ? "Mua vé sự kiện âm nhạc trực tuyến cực nhanh, tự động đối soát độ tuổi và thông tin thanh toán an toàn."
        : "Book music concert tickets instantly with secure age verification and automatic encrypted credential proof checks.",
    },
    {
      icon: <Plane className="w-16 h-16 text-sky-500" />,
      title: isVi ? "Hàng không & Khách sạn" : "Airlines & Hotels",
      desc: isVi 
        ? "Thủ tục lên tàu bay tự chủ tốc độ cao, nhận phòng nhanh chóng và an toàn bằng thực chứng số."
        : "Pass through secure gates and check-in autonomously using mathematical travel assertions.",
    },
    {
      icon: <Building2 className="w-16 h-16 text-amber-500" />,
      title: isVi ? "Dịch vụ hành chính công" : "e-Government Services",
      desc: isVi 
        ? "Xử lý thủ tục hành chính trực tuyến dễ dàng, rút ngắn thời gian và giảm giấy tờ phiền hà."
        : "Execute public requests online smoothly, greatly lowering processing times and paper wastes.",
    },
    {
      icon: <Heart className="w-16 h-16 text-rose-500" />,
      title: isVi ? "Chăm sóc Sức khỏe (E-Health)" : "Healthcare Scenarios",
      desc: isVi 
        ? "Lưu giữ tóm tắt hồ sơ bệnh án cá nhân bảo mật và chủ động chia sẻ khi cần thiết."
        : "Securely store private clinical test summaries on your wallet, sharing selective logs with doctors.",
    },
    {
      icon: <ArrowLeftRight className="w-16 h-16 text-violet-500" />,
      title: isVi ? "Chuyển nhượng vé xem biểu diễn ca nhạc" : "Concert Ticket Transfer",
      desc: isVi 
        ? "Chuyển nhượng vé sự kiện an toàn cho người khác thông qua ví phi tập trung, tránh rủi ro vé giả."
        : "Transfer event tickets securely to others using decentralized wallet assertions, preventing duplicate or fake reseller tags.",
    }
  ];

  const whyColumns = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: isVi ? "Hiểu nhanh, dễ hình dung" : "Quick Understanding",
      desc: isVi ? "Trải nghiệm trực quan cách Identra hoạt động trong thực tế." : "Visually experience decentralized cryptographic operations immediately.",
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: isVi ? "An toàn và riêng tư" : "Safe and Guarded",
      desc: isVi ? "Mọi thao tác chỉ mô phỏng, không sử dụng dữ liệu thật." : "Interactive simulations operate strictly in sandboxed space with zero data storage.",
      color: "bg-emerald-500/10 text-emerald-500"
    },
    {
      icon: <Sliders className="w-5 h-5" />,
      title: isVi ? "Bạn là người kiểm soát" : "You Are In Control",
      desc: isVi ? "Xem trước và quyết định thông tin nào được chia sẻ." : "Pre-review outbound identity claims list and selectively authorize sharing.",
      color: "bg-indigo-500/10 text-indigo-500"
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: isVi ? "Xác minh tức thì" : "Instant Authentication",
      desc: isVi ? "Bên nhận có thể xác minh tính hợp lệ của thực chứng ngay lập tức." : "Verifying nodes instantly check mathematically sealed signatures via open ledgers.",
      color: "bg-rose-500/10 text-rose-500"
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: isVi ? "Chọn kịch bản" : "Choose Scenario",
      desc: isVi ? "Chọn một trong ba tình huống thực tế ở trên." : "Choose one of the three real scenarios above.",
      icon: (
        <svg className="w-11 h-11 text-[#5B6CFF] dark:text-[#7C8CFF]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      )
    },
    {
      step: "02",
      title: isVi ? "Quét QR để bắt đầu" : "Scan QR to start",
      desc: isVi ? "Quét mã QR bằng Identra để nhận thực chứng demo." : "Scan the QR code with Identra to receive the demo credential.",
      icon: (
        <svg className="w-11 h-11 text-[#5B6CFF] dark:text-[#7C8CFF]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h3M16 3h3a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-3M8 21H5a2 2 0 01-2-2v-2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h6m-6 4h6m-3-6v8" />
        </svg>
      )
    },
    {
      step: "03",
      title: isVi ? "Xác nhận trên ví" : "Confirm on Wallet",
      desc: isVi ? "Xem trước thông tin và xác nhận chia sẻ." : "Pre-review outbound identity claims list and confirm sharing.",
      icon: (
        <svg className="w-11 h-11 text-[#5B6CFF] dark:text-[#7C8CFF]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <circle cx="12" cy="18" r="0.75" fill="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 11l1.5 1.5 3.5-3.5" />
        </svg>
      )
    },
    {
      step: "04",
      title: isVi ? "Bên nhận xác minh" : "Receiver verifies",
      desc: isVi ? "Hệ thống xác minh tính hợp lệ của thực chứng ngay lập tức." : "The verifying ledger confirms mathematical signatures in milliseconds.",
      icon: (
        <svg className="w-11 h-11 text-[#5B6CFF] dark:text-[#7C8CFF]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    },
    {
      step: "05",
      title: isVi ? "Hoàn tất" : "Complete",
      desc: isVi ? "Kết quả hiển thị và bạn có thể thử kịch bản khác." : "The result is displayed and you can try other scenarios.",
      icon: (
        <svg className="w-11 h-11 text-[#5B6CFF] dark:text-[#7C8CFF]" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <path d="M14 14 L5 21 L3 19 L10 10 Z" strokeWidth="1.6" />
          <path d="M14 8 L18 4" strokeLinecap="round" />
          <path d="M18 10 L21 9" strokeLinecap="round" />
          <path d="M11 5 L12 2" strokeLinecap="round" />
          <circle cx="15" cy="5" r="1.2" fill="currentColor" />
          <circle cx="19" cy="13" r="1.4" fill="currentColor" />
          <circle cx="8" cy="4" r="0.9" fill="currentColor" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-[#F7F8FC] dark:bg-[#0B0F1A] min-h-screen text-[#1F2937] dark:text-[#E5E7EB] pb-24 font-sans select-none overflow-x-hidden transition-colors duration-300">
      
      {/* 1. HERO SECTION - Restyled to match the premium, synchronized design of FAQ / UseCases */}
      <section className="py-16 pt-8 lg:pt-12 bg-gradient-to-b from-white dark:from-[#0F172A]/45 via-white dark:via-[#0F172A]/10 to-[#F7F8FC] dark:to-[#0B0F1A] border-b border-[#E5E7EB] dark:border-slate-800/80 px-6 lg:px-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation Bar outside the core grid */}
          <div className="mb-6 text-left border-none bg-transparent">
            <motion.button
              whileHover={{ x: -4 }}
              onClick={onBack}
              className="-ml-3 inline-flex min-h-9 items-center gap-2 rounded-xl px-3 py-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[2.25] text-xs font-bold text-[#5B6CFF] dark:text-[#7C8CFF] hover:text-[#4A5AF0] dark:hover:text-[#6b7bff] transition-colors cursor-pointer group bg-transparent border-none"
            >
              <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
              <span>{isVi ? 'Quay lại Trang chủ' : 'Back to Home'}</span>
            </motion.button>
          </div>

          <div className="relative text-left">
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-12">
              
              {/* Left Hero Column matching the exact structure and spacing of UseCasesSubpage */}
              <div className="space-y-6 lg:col-span-7">
                
                {/* Standard subpage visual tag/pill */}
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/8 px-3.5 py-1.5 rounded-full border border-[#5B6CFF]/10 w-fit">
                  <Sparkles className="w-3.5 h-3.5 mr-0.5" />
                  <span>{isVi ? "Trải nghiệm thực tế" : "Real-world Scenarios"}</span>
                </div>



            {/* Structured Title updated to match the exact font size, weight and colors of DocumentSubpage */}
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              {isVi ? "Trải nghiệm Identra " : "Experience Identra "} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#5B6CFF] to-[#8F9BFF] dark:from-[#7C8CFF] dark:to-[#8F9BFF] bg-clip-text text-transparent">
                {isVi ? "qua các tình huống thực tế" : "through real-world scenarios"}
              </span>
            </h1>

            {/* Styled Subtitle updated to match DocumentSubpage text size, leading and color */}
            <p className="text-base sm:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl font-normal">
              {isVi 
                ? "Khám phá cách ví định tin Identra giúp bạn nhận, lưu trữ và chia sẻ thực chứng số an toàn, riêng tư và luôn nằm trong quyền kiểm soát của bạn."
                : "Discover how the Identra identity wallet assists you in receiving, securely storing, and sharing selective digital credentials while staying in absolute control."}
            </p>

            {/* Redesigned Row of Perks matching the exact design and icons from the user's uploaded image */}
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

          {/* Right Hero Column - Pristine browser-frame visualization matching DocumentSubpage */}
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
                  identra_trust_verifier.html
                </div>
                <div className="flex gap-1.5 text-gray-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-700 block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-700 block" />
                </div>
              </div>

              {/* Secure Graphic Console details */}
              <div className="flex-1 text-left space-y-4 text-gray-400 text-[11px] overflow-hidden">
                <div className="flex items-center gap-2 text-[10px] text-[#5B6CFF] dark:text-[#7C8CFF] font-black uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>{isVi ? "Cổng Ủy Quyền Bản Thực Chứng" : "Credential Presentation Gateway"}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/60 space-y-3">
                  <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold tracking-wide">
                    <span>TRUST METRIC ID</span>
                    <span className="text-blue-400">W3C VERIFIED</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    <p className="font-bold text-slate-100 text-xs tracking-tight">
                      {isVi ? "Đại học Bách Khoa & Bộ Công An" : "Hanoi Univ of Tech & Gov Issuer"}
                    </p>
                    <p className="text-[10px] text-gray-500 leading-tight">
                      {isVi 
                        ? "Yêu cầu: Thực chứng [Mã sinh viên, Kết quả tốt nghiệp, Căn cước công dân]" 
                        : "Required: Credentials [Student ID, Graduation Status, Citizen Identity]"}
                    </p>
                  </div>

                  {/* Horizontal visual progress bars */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] text-gray-600">
                      <span>{isVi ? "ĐANG LẮNG NGHE KẾT NỐI (DID TUNNEL)" : "LISTENING FOR DID TUNNEL PRESENTATION"}</span>
                      <span>85%</span>
                    </div>
                    <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-[85%] animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Simulated live execution logs */}
                <div className="space-y-1.5 pl-1.5 font-mono text-[9px] text-gray-500">
                  <p className="text-gray-600 font-bold">// console_log_output:</p>
                  <p>✔ connection_secured: <span className="text-emerald-400">"channel://sec-did-tunnel-v2"</span></p>
                  <p>🚀 awaiting_presentation: <span className="text-yellow-400">"W3C_SELECTIVE_DISCLOSURE"</span></p>
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
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-wider block">Verified</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    {isVi ? "Thực Chứng Hợp Lệ" : "Valid Presentation"}
                  </span>
                </div>
              </div>

              {/* Cloud secure indicator/Trust index on bottom-right */}
              <div className="absolute bottom-10 -right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-gray-150 dark:border-slate-800 p-4 shadow-md flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#5B6CFF]/10 text-[#5B6CFF] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left text-xs text-slate-900 dark:text-white font-sans">
                  <span className="font-bold block">SSI Sandbox</span>
                  <span className="text-[10px] text-gray-400 dark:text-[#E2E8F0] block leading-tight">
                    {isVi ? "Mô phỏng an toàn" : "Simulation Sandbox"}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* 2. CHOOSE SCENARIO GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 text-center">
        
        {/* Scenario Header */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {isVi ? "Chọn một kịch bản để bắt đầu demo" : "Choose a scenario to start the demo"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2.5 max-w-xl mx-auto leading-relaxed">
            {isVi 
              ? "Trải nghiệm quy trình phê duyệt phi tập trung không mật khẩu, xác minh bảo chứng hoàn tất gần như tức thì."
              : "Witness how self-sovereign credentials complete complex integrations securely without central servers."}
          </p>
        </div>

        {/* 6 Grid items representing scenarios from request */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center">
          {(showAll ? demoScenarios : demoScenarios.slice(0, 3)).map((scenario, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, delay: showAll ? index * 0.05 : 0 }}
              whileHover={{ y: -6, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.05)" }}
              className="p-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl flex flex-col justify-between items-center hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="w-full flex flex-col items-center">
                <div className="flex items-center justify-center mb-6 shrink-0 mx-auto">
                  {scenario.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white tracking-tight font-sans mb-2.5 text-center">
                  {scenario.title}
                </h3>
                <p className="text-xs sm:text-xs.5 text-gray-500 dark:text-gray-400 leading-relaxed font-normal mb-8 text-center max-w-xs mx-auto">
                  {scenario.desc}
                </p>
              </div>

              {/* Trigger Interactive Demo callback */}
              <button
                onClick={() => {
                  setSelectedScenarioIdx(index);
                  setShowCheckModal(true);
                  setShowQRDetail(false);
                  setScanSimulated(false);
                  setTimeLeft(298);
                }}
                className="w-full py-2.5 rounded-xl bg-[#5B6CFF]/8 dark:bg-[#7C8CFF]/10 text-[#5B6CFF] dark:text-[#7C8CFF] hover:bg-[#5B6CFF] dark:hover:bg-[#7C8CFF] hover:text-white dark:hover:text-slate-950 transition-all duration-300 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer border-none mt-auto"
              >
                <span>{isVi ? "Bắt đầu demo" : "Start Demo"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Show more scenarios trigger */}
        <div className="flex justify-center mt-12 mb-16">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-gray-200 dark:border-slate-800 text-xs.5 md:text-sm font-bold text-[#5B6CFF] dark:text-[#7C8CFF] hover:text-[#5B6CFF] dark:hover:text-[#7C8CFF] hover:border-[#5B6CFF]/30 hover:shadow-sm transition-all cursor-pointer bg-white dark:bg-slate-900 group"
          >
            <span>
              {showAll 
                ? (isVi ? "Thu gọn bớt tình huống" : "Show less scenarios")
                : (isVi ? "Xem thêm các tình huống biểu diễn" : "Explore secondary demo scenarios")
              }
            </span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-[#5B6CFF] transition-colors" />
            ) : (
              <ChevronDown className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-[#5B6CFF] transition-colors" />
            )}
          </motion.button>
        </div>

      </section>

      {/* 3. WHY EXPERIENCE DEMO SECTION */}
      <section className="bg-white dark:bg-[#0B0F1A]/40 border-y border-gray-100 dark:border-slate-800/80 py-16 px-6 lg:px-12 text-center transition-colors">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isVi ? "Tại sao nên trải nghiệm công nghệ này?" : "Why Experience Identra?"}
            </h2>
            <p className="text-sm text-gray-450 mt-2 max-w-lg mx-auto">
              {isVi 
                ? "Sự kết hợp hoàn hảo giữa mật mã học hiện đại, mạng phi tập trung và tính bảo mật vượt trội trên thiết bị của bạn."
                : "A solid blend of modern cryptography, robust decentralized ledgers, and on-device privacy protections."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left">
            {whyColumns.map((col, index) => (
              <div
                key={index}
                className="p-6 bg-[#F7F8FC]/60 dark:bg-slate-900/10 border border-gray-100 dark:border-slate-850 rounded-2xl space-y-4"
              >
                <div className={`w-9 h-9 rounded-xl ${col.color} flex items-center justify-center shrink-0`}>
                  {col.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white font-sans">
                    {col.title}
                  </h4>
                  <p className="text-[11.5px] text-gray-450 leading-relaxed font-normal">
                    {col.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. WORKFLOW PROGRESS STEPS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 text-center">
        
        <div className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {isVi ? "Hành trình xác thực diễn ra như thế nào?" : "How the verification workflow completes?"}
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2 max-w-md mx-auto">
            {isVi 
              ? "Quy trình 5 bước liền mạch, không mật khẩu và an toàn tuyệt đối."
              : "5 simple horizontal steps powering secure information exchange."}
          </p>
        </div>

        {/* 5 columns showing interactive progress with connect indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 relative">
          {workflowSteps.map((item, index) => (
            <div 
              key={index} 
              className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40 rounded-[24px] p-6 pb-7 flex flex-col items-center justify-start text-center overflow-visible hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-md transition-all duration-300 min-h-[240px]"
            >
              
              {/* Absolute top-left step number badge */}
              <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-[#5B6CFF]/8 dark:bg-slate-800 text-[#5B6CFF] dark:text-[#7C8CFF] flex items-center justify-center text-[11px] font-black font-mono">
                {item.step}
              </div>

              {/* Centered High-Fidelity Icon wrapper with double border ring effect - enlarged with ultra soft ambient opacity background as requested */}
              <div className="w-20 h-20 rounded-full bg-[#5B6CFF]/[0.02] hover:bg-[#5B6CFF]/[0.05] dark:bg-[#5B6CFF]/[0.05] text-[#5B6CFF] dark:text-[#7C8CFF] flex items-center justify-center border border-[#5B6CFF]/[0.05] dark:border-[#5B6CFF]/15 shadow-sm mt-2 mb-6 relative transition-colors duration-300">
                {item.icon}
              </div>

              {/* Connecting dotted line with arrow matching the exact design in the user's screenshot - aligned with center of larger icon circle */}
              {index < 4 && (
                <div className="hidden lg:flex absolute top-[62px] -right-6 lg:-right-6.5 w-12 lg:w-13 h-6 items-center justify-center z-20 pointer-events-none">
                  <svg className="w-full text-[#A5B4FC] dark:text-slate-800" viewBox="0 0 40 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5H30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                    {/* Small arrow head */}
                    <path d="M27 2.5L30 5L27 7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Small diamond shape at the right end pointing to the next card */}
                    <path d="M35 5 L36.5 3.5 L38 5 L36.5 6.5 Z" fill="currentColor" />
                  </svg>
                </div>
              )}

              {/* Text details */}
              <div className="space-y-2 text-center">
                <h4 className="text-[13px] sm:text-sm font-black text-slate-900 dark:text-white font-sans leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal max-w-[165px] mx-auto">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* RENDER DYNAMIC WALLET CHECK MODAL */}
      {showCheckModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <style>{`
            @keyframes scan-move {
              0%, 100% { top: 12%; }
              50% { top: 86%; }
            }
          `}</style>

          {/* Semi-transparent dark blur backdrop exactly matching user screenshot */}
          <div 
            className="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300" 
            onClick={() => {
              setShowCheckModal(false);
              setShowQRDetail(false);
            }} 
          />
          
          {/* Main Modal container Card */}
          <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[28px] md:rounded-[36px] p-8 md:p-12 max-w-[640px] w-full text-center shadow-2xl z-10 overflow-hidden select-none animate-in fade-in zoom-in-95 duration-200">
            
            {/* Absolute close 'X' button in top right */}
            <button 
              onClick={() => {
                setShowCheckModal(false);
                setShowQRDetail(false);
              }}
              className="absolute top-6 right-6 text-[#94A3B8] hover:text-[#5B6CFF] hover:bg-gray-100 dark:hover:bg-slate-800 transition-all p-2 rounded-full cursor-pointer z-30"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!showQRDetail ? (
              <>
                {/* Centered Premium High-Fidelity wallet check badge */}
                <div className="mx-auto w-[88px] h-[88px] rounded-full bg-[#ECEFFF] dark:bg-[#5B6CFF]/10 text-[#5B6CFF] dark:text-[#7C8CFF] flex items-center justify-center border border-[#5B6CFF]/15 relative mt-2 mb-8">
                  {/* Digital Wallet drawing */}
                  <svg className="w-10 h-10 stroke-[1.6]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" />
                    <path d="M3 10H21" stroke="currentColor" />
                    <rect x="14" y="12" width="5" height="3" rx="1" fill="currentColor" />
                  </svg>
                  
                  {/* Overlay Check-Circle tag */}
                  <div className="absolute bottom-0.5 right-0.5 bg-white dark:bg-slate-900 rounded-full p-0.5 shadow-md border border-slate-50 dark:border-slate-800">
                    <div className="w-6 h-6 rounded-full bg-[#3B52FF] dark:bg-indigo-600 text-white flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>
                </div>

                {/* Structured Title matching Vietnamese grammar from file screenshot */}
                <h2 className="text-xl sm:text-[24px] font-black text-slate-900 dark:text-white tracking-tight leading-snug max-w-[360px] sm:max-w-[420px] mx-auto mb-4 font-sans">
                  {isVi ? "Bạn đã cài ví định tín Identra trên điện thoại chưa?" : "Have you installed the Identra credentials wallet on your phone?"}
                </h2>

                {/* Context helper detail lines */}
                <p className="text-[13px] sm:text-[14px] text-gray-500 dark:text-gray-400 font-medium max-w-md mx-auto leading-relaxed mb-9">
                  {isVi 
                    ? "Để trải nghiệm demo, bạn cần dùng Identra trên điện thoại để quét mã QR và xác nhận các thao tác chia sẻ dữ liệu." 
                    : "To experience the demo, you need to use Identra on your phone to scan the QR code and confirm the data sharing operations."}
                </p>

                {/* Left and Right inline buttons matching screenshot layout */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-[500px] mx-auto">
                  
                  {/* Trigger downloads state */}
                  <button
                    onClick={() => setShowQRDetail(true)}
                    className="w-full sm:w-1/2 h-[52px] px-6 rounded-full border border-gray-200 dark:border-slate-800 hover:border-[#5B6CFF]/40 text-[#475569] dark:text-gray-300 font-bold text-[13.5px] inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-950 transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <svg className="w-4 h-4 text-[#5B6CFF] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                    <span>{isVi ? "Tôi chưa cài Identra" : "I haven't installed Identra"}</span>
                  </button>

                  {/* Accept, close and open active trust triangle */}
                  <button
                    onClick={() => {
                      setShowCheckModal(false);
                      setDemoState('nhan_thuc_chung');
                    }}
                    className="w-full sm:w-1/2 h-[52px] px-6 rounded-full bg-[#3B52FF] hover:bg-[#2C41EB] text-white font-bold text-[13.5px] inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md shadow-blue-500/10 active:scale-98"
                  >
                    {/* Compact phone mock icon */}
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                    <span>{isVi ? "Tôi đã cài Identra" : "I have installed Identra"}</span>
                  </button>

                </div>

                {/* Shield check footer guarantee */}
                <div className="text-[11.5px] text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 mt-10 pt-2 border-t border-gray-100/40 dark:border-slate-800/20 w-full">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span>{isVi ? "Identra luôn bảo vệ dữ liệu của bạn an toàn và riêng tư." : "Identra always keeps your data safe and private."}</span>
                </div>
              </>
            ) : (
              <>
                {/* QR INSTALL SUBSTATE VIEW */}
                <div className="mx-auto w-[68px] h-[68px] rounded-full bg-[#ECEFFF] dark:bg-[#5B6CFF]/10 text-[#5B6CFF] dark:text-[#7C8CFF] flex items-center justify-center border border-[#5B6CFF]/15 mt-1 mb-6">
                  <Smartphone className="w-7 h-7" />
                </div>

                <h2 className="text-xl sm:text-[23px] font-black text-slate-900 dark:text-white tracking-tight mb-3">
                  {isVi ? "Quét mã QR để tải ứng dụng Identra" : "Scan QR code to install Identra application"}
                </h2>
                
                <p className="text-[12.5px] text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-7 font-normal">
                  {isVi 
                    ? "Mở ứng dụng Camera trên thiết bị di động của bạn để quét và giải quyết cài đặt tức thì."
                    : "Use any physical mobile phone camera lens to scan this code and easily proceed with your installation."}
                </p>

                {/* QR box container with animating scan laser line */}
                <div className="relative mx-auto w-48 h-48 bg-white border border-gray-100 dark:border-slate-800 rounded-2xl p-3.5 flex items-center justify-center shadow-lg mb-7">
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M5,5 h25 v5 h-20 v20 h-5 z M5,95 h25 v-5 h-20 v-20 h-5 z M95,5 h-25 v5 h-20 v20 h5 z M95,95 h-25 v-5 h-20 v-20 h5 z" className="text-[#5B6CFF]" />
                    
                    {/* Finder Patterns */}
                    <path d="M10,10 h20 v20 h-20 z M14,14 h12 v12 h-12 z M18,18 h4 v4 h-4 z" />
                    <path d="M70,10 h20 v20 h-20 z M74,14 h12 v12 h-12 z M78,18 h4 v4 h-4 z" />
                    <path d="M10,70 h20 v20 h-20 z M14,74 h12 v12 h-12 z M18,78 h4 v4 h-4 z" />
                    
                    {/* Simulated details inside QR */}
                    <g className="text-slate-900/85">
                      <rect x="36" y="10" width="4" height="4" />
                      <rect x="44" y="10" width="8" height="4" />
                      <rect x="56" y="12" width="4" height="8" />
                      <rect x="36" y="24" width="12" height="4" />
                      <rect x="52" y="20" width="4" height="4" />
                      <rect x="10" y="36" width="4" height="12" />
                      <rect x="20" y="36" width="8" height="4" />
                      <rect x="18" y="44" width="4" height="8" />
                      <rect x="36" y="36" width="8" height="8" />
                      <rect x="48" y="38" width="12" height="4" />
                      <rect x="36" y="48" width="4" height="8" />
                      <rect x="70" y="36" width="12" height="4" />
                      <rect x="86" y="36" width="4" height="12" />
                      <rect x="74" y="44" width="8" height="8" />
                      <rect x="36" y="70" width="4" height="12" />
                      <rect x="44" y="74" width="12" height="4" />
                      <rect x="52" y="80" width="8" height="8" />
                      <rect x="36" y="86" width="8" height="4" />
                      <rect x="70" y="70" width="8" height="4" />
                      <rect x="82" y="74" width="8" height="8" />
                    </g>
                    
                    {/* Small brand element in center */}
                    <rect x="39" y="39" width="22" height="22" rx="4" fill="white" className="stroke-indigo-505" strokeWidth="0.5" />
                    <g transform="translate(45, 45) scale(0.42)" className="text-[#3B52FF]">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    </g>
                  </svg>
                  
                  {/* Laser move line */}
                  <div className="absolute left-0 right-0 h-0.5 bg-[#3B52FF] shadow-[0_0_8px_#3B52FF] pointer-events-none" style={{ animation: "scan-move 3s linear infinite" }} />
                </div>

                {/* Sub Action buttons linking to stores */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto mb-7">
                  <a href="#" onClick={(e) => e.preventDefault()} className="w-full sm:w-1/2 py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition-all">
                    <span>App Store</span>
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} className="w-full sm:w-1/2 py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition-all">
                    <span>Google Play</span>
                  </a>
                </div>

                {/* Back and Done trigger anchors */}
                <div className="flex items-center justify-center gap-4 border-t border-slate-100/50 dark:border-slate-800/40 pt-5 w-full">
                  <button
                    onClick={() => setShowQRDetail(false)}
                    className="text-gray-400 hover:text-[#5B6CFF] font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    <span>{isVi ? "Quay lại" : "Back"}</span>
                  </button>

                  <span className="text-gray-300 dark:text-slate-800">|</span>

                  <button
                    onClick={() => {
                      setShowQRDetail(false);
                      setShowCheckModal(false);
                      setDemoState('nhan_thuc_chung');
                    }}
                    className="text-[#3B52FF] hover:text-[#2C41EB] dark:text-[#7C8CFF] font-black text-xs inline-flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>{isVi ? "Tôi đã cài đặt xong" : "I have completed setup"}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {/* RENDER NHAN THUC CHUNG MODAL */}
      {demoState === 'nhan_thuc_chung' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          
          {/* Semi-transparent dark blur backdrop exactly matching user preference */}
          <div 
            className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300" 
            onClick={() => {
              setDemoState('list');
              setScanSimulated(false);
            }} 
          />
          
          {/* Main Modal container Card */}
          <div className="relative bg-white dark:bg-[#111827] border border-slate-100 dark:border-slate-800/80 rounded-[32px] md:rounded-[40px] shadow-2xl p-6 md:p-10 lg:p-12 w-full max-w-5xl lg:max-w-6xl z-10 overflow-hidden select-none hover:border-slate-200/50 dark:hover:border-slate-850/50 transition-all duration-300 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Decentered soft dot matrix background graphic */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-35 dark:opacity-25 pointer-events-none bg-[radial-gradient(#5b6cff_1px,transparent_1px)] [background-size:16px_16px] -mr-8" />
            
            {/* Absolute close 'X' button in top right */}
            <button 
              onClick={() => {
                setDemoState('list');
                setScanSimulated(false);
              }}
              className="absolute top-6 right-6 text-slate-400 hover:text-[#5B6CFF] hover:bg-gray-100 dark:hover:bg-slate-800 transition-all p-2 rounded-full cursor-pointer z-30"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* TWO-COLUMN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
              
              {/* LEFT COLUMN */}
              <div className="lg:col-span-5 flex flex-col text-left justify-between space-y-6">
                <div className="space-y-5">
                  
                  {/* Steps tracker badge */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ECEFFF] dark:bg-[#5B6CFF]/15 text-[#3B52FF] dark:text-[#7C8CFF] text-[11px] font-black uppercase tracking-wider self-start border border-[#3B52FF]/10 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                    <span>{isVi ? "Bước 1/4" : "Step 1/4"}</span>
                  </div>

                  {/* Main heading */}
                  <h2 className="text-2xl sm:text-[32px] font-black text-slate-900 dark:text-white tracking-tight leading-tight font-sans">
                    {isVi ? "Nhận thực chứng" : "Receive credentials"}{" "}
                    <span className="bg-gradient-to-r from-[#3B52FF] to-[#7C8CFF] bg-clip-text text-transparent">
                      {isVi ? "demo vào ví Identra" : "demo into Identra wallet"}
                    </span>
                  </h2>

                  {/* Scenario description block */}
                  <p className="text-[13px] sm:text-[14px] text-[#6B7280] dark:text-gray-400 font-medium leading-relaxed">
                    {isVi 
                      ? `Quét mã QR tuyển chọn này bằng ứng dụng Identra để nhận thực chứng cần thiết cho kịch bản "${demoScenarios[selectedScenarioIdx ?? 0]?.title || ''}". Đây là dữ liệu mô phỏng, chỉ dùng trải nghiệm.`
                      : `Scan this tailored QR code with your Identra app to automatically load the verified credential tags matching the "${demoScenarios[selectedScenarioIdx ?? 0]?.title || ''}" scenario.`}
                  </p>

                  {/* Core list points with premium circle check cards */}
                  <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                    
                    {/* Point 1 */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-[38px] h-[38px] rounded-full bg-[#EBF0FF] dark:bg-slate-800 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center shrink-0 border border-[#3B52FF]/6">
                        <ShieldCheck className="w-4.5 h-4.5 stroke-[2.2]" />
                      </div>
                      <div className="text-left">
                        <p className="text-[13.5px] font-extrabold text-slate-900 dark:text-white leading-tight">
                          {isVi ? "Dữ liệu mô phỏng" : "Simulation Sandbox"}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                          {isVi ? "Hoàn toàn không chứa dữ liệu thật hay rủi ro bảo mật" : "Completely clean simulated claims for trial usage"}
                        </p>
                      </div>
                    </div>

                    {/* Point 2 */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-[38px] h-[38px] rounded-full bg-[#EBF0FF] dark:bg-slate-800 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center shrink-0 border border-[#3B52FF]/6">
                        <Lock className="w-4.5 h-4.5 stroke-[2.2]" />
                      </div>
                      <div className="text-left">
                        <p className="text-[13.5px] font-extrabold text-slate-900 dark:text-white leading-tight">
                          {isVi ? "An toàn & bảo mật" : "Robust Privacy Protection"}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                          {isVi ? "Các mảnh thực chứng chỉ lưu trữ cục bộ trên ví điện thoại" : "No centralized registry servers will archive your profile details"}
                        </p>
                      </div>
                    </div>

                    {/* Point 3 */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-[38px] h-[38px] rounded-full bg-[#EBF0FF] dark:bg-slate-800 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center shrink-0 border border-[#3B52FF]/6">
                        <Cpu className="w-4.5 h-4.5 stroke-[2.2]" />
                      </div>
                      <div className="text-left">
                        <p className="text-[13.5px] font-extrabold text-slate-900 dark:text-white leading-tight">
                          {isVi ? "Bạn toàn quyền kiểm soát" : "100% Personal Command"}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                          {isVi ? "Quyết định chia sẻ thông tin gì và vào thời điểm nào" : "Decide exactly what attributes you reveal on verifications"}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-150 dark:border-slate-800/80 pt-6 lg:pt-0 lg:pl-10 relative z-10 min-h-[360px]">
                
                {!scanSimulated ? (
                  <>
                    <div className="w-[64px] h-[64px] rounded-full bg-[#ECEFFF] dark:bg-[#5B6CFF]/10 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center border border-[#5B6CFF]/15 relative mb-3">
                      <svg className="w-7 h-7 stroke-[1.6]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="5" y="2" width="14" height="20" rx="3" />
                        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
                      </svg>
                      <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-0.5 shadow-md border border-slate-100 dark:border-slate-850">
                        <div className="w-5.5 h-5.5 rounded-full bg-[#3B52FF] dark:bg-indigo-600 text-white flex items-center justify-center animate-pulse">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-[20px] font-black text-slate-900 dark:text-white tracking-tight text-center">
                      {isVi ? "Quét mã QR bằng Identra" : "Scan QR code with Identra"}
                    </h3>

                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-relaxed max-w-sm mt-1 mb-5 text-center">
                      {isVi 
                        ? "Mở ứng dụng Identra trên điện thoại di động và thực hiện quét mã QR bên dưới:" 
                        : "Open your active Identra wallet profile on your handset and point the camera lens here:"}
                    </p>

                    {/* QR Box Container */}
                    <div 
                      onClick={() => {
                        setScanSimulated(true);
                      }}
                      className="group relative bg-white border border-gray-150 dark:border-slate-200 rounded-2xl p-3.5 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer select-none mb-5 overflow-hidden max-w-[190px]"
                      title={isVi ? "Nhấp vào QR để giả lập quét thành công!" : "Click to simulate successful connection!"}
                    >
                      {/* Laser scanning line */}
                      <div className="absolute left-0 right-0 h-0.5 bg-[#3B52FF] shadow-[0_0_10px_#3B52FF] pointer-events-none z-10" style={{ animation: "scan-move 3s linear infinite" }} />

                      {/* QR Code Graphic Elements */}
                      <svg className="w-36 h-36 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M5,5 h25 v5 h-20 v20 h-5 z M5,95 h25 v-5 h-20 v-20 h-5 z M95,5 h-25 v5 h-20 v-20 h5 z M95,95 h-25 v-5 h-20 v-20 h5 z" className="text-[#3B52FF]" />
                        
                        <path d="M10,10 h20 v20 h-20 z M14,14 h12 v12 h-12 z M18,18 h4 v4 h-4 z" />
                        <path d="M70,10 h20 v20 h-20 z M74,14 h12 v12 h-12 z M78,18 h4 v4 h-4 z" />
                        <path d="M10,70 h20 v20 h-20 z M14,74 h12 v12 h-12 z M18,78 h4 v4 h-4 z" />
                        
                        <g className="text-slate-850">
                          <rect x="36" y="10" width="4" height="4" />
                          <rect x="44" y="10" width="8" height="4" />
                          <rect x="56" y="12" width="4" height="8" />
                          <rect x="36" y="24" width="12" height="4" />
                          <rect x="52" y="20" width="4" height="4" />
                          <rect x="10" y="36" width="4" height="12" />
                          <rect x="20" y="36" width="8" height="4" />
                          <rect x="18" y="44" width="4" height="8" />
                          <rect x="36" y="36" width="8" height="8" />
                          <rect x="48" y="38" width="12" height="4" />
                          <rect x="36" y="48" width="4" height="8" />
                          <rect x="70" y="36" width="12" height="4" />
                          <rect x="86" y="36" width="4" height="12" />
                          <rect x="74" y="44" width="8" height="8" />
                          <rect x="36" y="70" width="4" height="12" />
                          <rect x="44" y="74" width="12" height="4" />
                          <rect x="52" y="80" width="8" height="8" />
                          <rect x="36" y="86" width="8" height="4" />
                          <rect x="70" y="70" width="8" height="4" />
                          <rect x="82" y="74" width="8" height="8" />
                        </g>
                        
                        <rect x="39" y="39" width="22" height="22" rx="4" fill="white" className="stroke-[#3B52FF]" strokeWidth="0.5" />
                        <g transform="translate(45, 45) scale(0.42)" className="text-[#3B52FF]">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        </g>
                      </svg>

                      {/* Interactive hover overlay */}
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all p-3 text-center rounded-2xl select-none z-25">
                        <div className="w-7 h-7 rounded-full bg-[#3B52FF] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <svg className="w-4.5 h-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286.628zM8 3.25h.008v.008H8V3.25z" />
                          </svg>
                        </div>
                        <span className="text-[9px] text-white font-black uppercase tracking-wider mt-2 fallback-shadow">
                          {isVi ? "Giả lập Quét QR" : "Simulate QR Scan"}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Counter Bar layout */}
                    <div className="flex items-center gap-4 justify-center py-2 px-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-950/45 border border-gray-150 dark:border-slate-850/60 font-medium select-none text-[11.5px]">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-gray-500 dark:text-gray-400">
                          {isVi ? `Mã QR có hiệu lực trong ` : `QR remains valid for `}
                          <span className="font-mono font-bold text-slate-900 dark:text-white">{formatTime(timeLeft)}</span>
                        </span>
                      </div>
                      
                      <span className="text-gray-200 dark:text-slate-800">|</span>

                      <button
                        onClick={() => setTimeLeft(298)}
                        className="text-xs font-black text-[#3B52FF] dark:text-[#7C8CFF] hover:text-[#2C41EB] inline-flex items-center gap-1 transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
                      >
                        <svg className="w-3.5 h-3.5 text-[#3B52FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                        </svg>
                        <span>{isVi ? "Làm mới mã" : "Refresh"}</span>
                      </button>
                    </div>

                    {/* "I already have it" Skip Step button */}
                    <button
                      onClick={() => {
                        setDemoState('list');
                        setScanSimulated(false);
                        setShowCheckModal(false);
                        setShowBankFormModal(true);
                        setBankStep(2); // Set step 2/4
                        // Reset form inputs empty
                        setBankFullName('');
                        setBankDob('');
                        setBankNationality('');
                        setBankAddress('');
                        setBankEmail('');
                        setBankPhone('');
                        setFillType('none');
                        setShowIdentraQR(false);
                        setSelectedTicketType('vip');
                        setTicketQuantity(1);
                        setConcertKycVerified(false);
                        setConcertCheckoutActive(false);
                        setIsScanningConcertQR(false);
                      }}
                      className="mt-4 w-full max-w-[280px] h-10.5 rounded-xl border border-dashed border-[#3B52FF]/30 hover:border-[#3B52FF] bg-[#3B52FF]/5 hover:bg-[#3B52FF]/10 text-[11px] font-black text-[#3B52FF] dark:text-[#7C8CFF] uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-98"
                    >
                      <span>{isVi ? "Tôi đã có thực chứng này (Bỏ qua)" : "I already have it (Skip)"}</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                ) : (
                  /* SIMULATION SUCCESS VIEW STATE */
                  <div className="text-center animate-in fade-in zoom-in-95 duration-300 max-w-sm space-y-6 py-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 mx-auto relative">
                      <svg className="w-8 h-8 animate-bounce text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {/* Floating check rings */}
                      <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        {isVi ? "Xác nhận thành công!" : "Credential Received Easily!"}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed font-semibold">
                        {isVi 
                          ? `Thiết bị di động của bạn đã bảo lưu các mã hóa định danh từ kịch bản "${demoScenarios[selectedScenarioIdx ?? 0]?.title || ''}" thành công.` 
                          : `Your physical handset has securely verified and hosted the cryptographic tags for "${demoScenarios[selectedScenarioIdx ?? 0]?.title || ''}".`}
                      </p>
                    </div>

                    {/* Primary trigger button */}
                    <div className="flex flex-col gap-2.5 pt-1 w-full">
                      <button
                        onClick={() => {
                          setDemoState('list');
                          setScanSimulated(false);
                          setShowCheckModal(false);
                          setShowBankFormModal(true);
                          setBankStep(2); // Set step 2/4
                          // Reset form inputs empty
                          setBankFullName('');
                          setBankDob('');
                          setBankNationality('');
                          setBankAddress('');
                          setBankEmail('');
                          setBankPhone('');
                          setFillType('none');
                          setShowIdentraQR(false);
                          setSelectedTicketType('vip');
                          setTicketQuantity(1);
                          setConcertKycVerified(false);
                          setConcertCheckoutActive(false);
                          setIsScanningConcertQR(false);
                        }}
                        className="w-full h-11 rounded-xl bg-[#3B52FF] hover:bg-[#2C41EB] text-white font-extrabold text-[#111] dark:text-[#fff] bg-[#3B52FF] hover:bg-[#2C41EB] dark:bg-[#7C8CFF] font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/20 active:scale-98 border-none"
                      >
                        <span>{isVi ? "Mở Ví Sandbox & Đối soát (Bước 2/4) →" : "Launch Sandbox Verifier (Step 2/4) →"}</span>
                      </button>

                      <button
                        onClick={() => setScanSimulated(false)}
                        className="text-xs font-bold text-gray-405 hover:text-gray-600 dark:hover:text-white cursor-pointer bg-transparent border-none outline-none"
                      >
                        {isVi ? "Quay lại quét lại mã QR" : "Back to scan QR again"}
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* BOTTOM NOTE CARD REGION */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
              <div className="flex flex-col md:flex-row items-center justify-between p-5 rounded-2xl bg-[#ECEFFF]/60 dark:bg-[#5B6CFF]/8 border border-[#5B6CFF]/15 gap-4 text-left">
                <div className="flex items-center gap-3.5">
                  <div className="w-[40px] h-[40px] rounded-xl bg-[#3B52FF]/10 text-[#3B52FF] flex items-center justify-center shrink-0 border border-[#3B52FF]/10">
                    <svg className="w-5 h-5 text-[#3B52FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v1m0 3h.01M9 15h6M12 3a9 9 0 00-6.364 15.364l1.414-1.414a7 7 0 119.9 0l1.414 1.414A9 9 0 0012 3z" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs.5 font-extrabold text-[#3B52FF] dark:text-[#7C8CFF]">
                      {isVi ? "Dành cho trải nghiệm hoàn chỉnh" : "For complete experience"}
                    </p>
                    <p className="text-[11px] sm:text-[11.5px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-2xl">
                      {isVi 
                        ? "Sau khi quét mã thành công, thực chứng sẽ được lưu trong ví Identra của bạn và bạn có thể tiếp tục bằng cách kết nối với bên đối soát." 
                        : "Once scanned successfully, the credentials will be instantly loaded inside your Identra wallet device to continue the validation flow."}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    alert(isVi ? "Hướng dẫn kết nối ví và gỡ rối quét mã định danh." : "Opening credentials wallet integration instructions manual.");
                  }}
                  className="px-4 py-2.5 rounded-xl border border-[#3B52FF]/20 hover:border-[#3B52FF]/50 dark:border-slate-850 text-[#3B52FF] dark:text-[#7C8CFF] font-black text-xs hover:bg-[#3B52FF] hover:text-white dark:hover:text-slate-105 transition-all shrink-0 inline-flex items-center gap-1.5 cursor-pointer bg-white/40 dark:bg-slate-950/20"
                >
                  <span>{isVi ? "Hướng dẫn sử dụng" : "User Guide"}</span>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {showBankFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/65 dark:bg-slate-950/85 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setShowBankFormModal(false)}
          />
          
          {/* Modal Container */}
          <div className="relative bg-[#F8FAFC] dark:bg-[#0F172A] border border-slate-205 dark:border-slate-800 rounded-[28px] md:rounded-[36px] shadow-2xl p-6 md:p-8 lg:p-10 w-full max-w-5xl z-10 overflow-hidden select-none transition-all duration-300 animate-in fade-in zoom-in-95">
            {/* Soft dot pattern background graphic */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 dark:opacity-10 pointer-events-none bg-[radial-gradient(#3c53ff_1px,transparent_1px)] [background-size:16px_16px] -mr-8" />
            
            {/* Close Button */}
            <button 
              onClick={() => setShowBankFormModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-[#3B52FF] dark:hover:text-[#7C8CFF] hover:bg-gray-100 dark:hover:bg-slate-800 transition-all p-2 rounded-full cursor-pointer z-30"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedScenarioIdx === 6 ? (
              /* CONCERT TICKET TRANSFER HIGH-FIDELITY CHAT-STYLE DEMO */
              <div className="w-full relative z-10 text-left flex flex-col md:flex-row gap-6 lg:gap-8 max-h-[82vh] overflow-y-auto pr-1 scrollbar-thin">
                {/* Left Area: Facebook Messenger-Style Chat Interface */}
                <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden h-[540px]">
                  {/* Chat Header */}
                  <div className="px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-sm border border-indigo-100 dark:border-indigo-950 shadow-sm leading-none shrink-0 text-center">
                          TB
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                      </div>
                      
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white leading-none">Trần Văn B</h4>
                        <p className="text-[10px] text-gray-400 dark:text-slate-500 font-medium leading-none flex items-center gap-1">
                          {isVi ? "Vừa mới hoạt động" : "Active now"}
                        </p>
                      </div>
                    </div>
                    
                    {/* Header Icons Mock (Messenger-style) */}
                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-550">
                      <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer bg-transparent border-none">
                        <Phone className="w-4 h-4 text-[#3C53FF] dark:text-[#7C8CFF]" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer bg-transparent border-none">
                        <Video className="w-4 h-4 text-[#3C53FF] dark:text-[#7C8CFF]" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer bg-transparent border-none">
                        <Info className="w-4 h-4 text-slate-405 dark:text-slate-500" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Message Stream */}
                  <div 
                    ref={chatScrollRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/20 scrollbar-thin"
                  >
                    {transferMgs.map((msg) => {
                      const isMe = msg.sender === 'A';
                      const isSys = msg.sender === 'system';
                      
                      if (isSys) {
                        return (
                          <div key={msg.id} className="flex justify-center my-3.5 px-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-[#EBF0FF] dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800/60 p-3 rounded-xl flex items-start gap-2.5 max-w-lg shadow-sm">
                              <Lock className="w-4 h-4 text-[#3C53FF] dark:text-[#7C8CFF] shrink-0 mt-0.5" />
                              <p className="text-[10.5px] text-slate-600 dark:text-slate-300 font-bold leading-relaxed text-left">
                                {msg.text}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={msg.id} 
                          className={`flex gap-2.5 items-end max-w-[85%] ${isMe ? 'ml-auto flex-row-reverse text-right' : 'mr-auto text-left'} animate-in fade-in slide-in-from-bottom-3 duration-250`}
                        >
                          {/* Avatar */}
                          {!isMe && (
                            <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-[10px] border border-slate-200 dark:border-slate-800 shrink-0 select-none shadow-sm leading-none text-center">
                              TB
                            </div>
                          )}
                          
                          <div className="space-y-1">
                            {/* Text Bubble */}
                            {msg.text && (
                              <div className={`px-4 py-2.5 rounded-2xl text-[12.5px] font-semibold leading-relaxed shadow-xs inline-block max-w-full ${
                                isMe 
                                  ? 'bg-[#3B52FF] text-white rounded-br-xs text-left font-bold' 
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-xs text-left'
                              }`}>
                                {msg.text}
                              </div>
                            )}
                            
                            {/* Attachment: Resale Post screenshot-style card */}
                            {msg.attachment === 'resale_post' && (
                              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden text-left max-w-[290px] mt-1.5 animate-in fade-in duration-300">
                                <div className="bg-blue-500/5 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-2.5 flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-md bg-[#1877F2] text-white flex items-center justify-center font-black text-[9px] uppercase tracking-wider select-none leading-none shrink-0 text-center">
                                    AT
                                  </div>
                                  <div>
                                    <h5 className="text-[10px] font-black text-slate-900 dark:text-slate-100 leading-none">AwnTicket Resale Group</h5>
                                    <p className="text-[7.5px] text-slate-500 dark:text-slate-400 font-bold leading-none mt-0.5">{isVi ? "Cộng đồng mua bán vé" : "Verified Ticket Resale"}</p>
                                  </div>
                                </div>
                                <div className="p-3 space-y-2 font-medium">
                                  <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-slate-900 dark:bg-slate-800 font-black text-white text-[8px] flex items-center justify-center select-none uppercase shrink-0 text-center leading-none">MA</div>
                                    <div className="leading-tight">
                                      <p className="text-[9.5px] font-black text-slate-855 dark:text-white flex items-center gap-1">
                                        <span>Nguyễn Minh Anh</span>
                                        <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                      </p>
                                      <p className="text-[7.5px] text-slate-400 dark:text-slate-500">10 {isVi ? "giờ trước" : "hours ago"}</p>
                                    </div>
                                  </div>
                                  
                                  <p className="text-[10.5px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                                    {isVi 
                                      ? "Mình cần nhượng lại 1 vé VIP concert ca nhạc sắp tới do có việc đột xuất trùng lịch đi công tác. Vé chính chủ mua đợt đầu..." 
                                      : "Reselling 1 VIP ticket for the upcoming music concert due to overlapping work schedule constraints..."}
                                  </p>
                                  
                                  {/* Ticket Preview visual container inside post */}
                                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100/50 dark:from-slate-800 dark:to-slate-800/40 border border-indigo-100/45 dark:border-slate-700/60 text-[10px] space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-extrabold text-[#3C53FF] dark:text-[#7C8CFF] uppercase tracking-wider text-[8px]">Live Concert 2027</span>
                                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-black text-[7.5px] uppercase tracking-wider scale-95 shrink-0 flex items-center gap-0.5">
                                        <ShieldCheck className="w-2.5 h-2.5 shrink-0 animate-pulse" />
                                        <span>{isVi ? "Đã xác thực" : "Verified"}</span>
                                      </span>
                                    </div>
                                    <p className="font-black text-slate-800 dark:text-slate-100">{isVi ? "Vé VIP · Tầng 1 - Khu VIP · Ghế A12" : "VIP Ticket · Zone VIP 1 · Seat A12"}</p>
                                    <div className="flex justify-between text-[8px] text-slate-400 dark:text-slate-500 font-bold">
                                      <span>ID: TICKET-2027-000123</span>
                                      <span>Issuer: Live Concert Organization</span>
                                    </div>
                                    <div className="pt-1.5 border-t border-indigo-100/40 dark:border-slate-800 border-dashed flex justify-between items-center">
                                      <span className="text-slate-400 dark:text-slate-500 font-bold text-[8.5px]">Orig Price</span>
                                      <span className="font-bold text-[10.5px] text-slate-900 dark:text-indigo-300">500.000 VNĐ</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Attachment: Smart Contract Transaction Card */}
                            {msg.attachment === 'contract_card' && (
                              <div className="bg-white dark:bg-slate-900 border-2 border-indigo-500/35 dark:border-indigo-500/30 rounded-2xl shadow-md overflow-hidden text-left max-w-[340px] mt-2 animate-in fade-in duration-300">
                                <div className="bg-[#3B52FF]/5 dark:bg-[#3B52FF]/10 p-3.5 border-b border-indigo-100 dark:border-slate-800 flex items-start gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-[#3B52FF]/10 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-5 h-5 stroke-[2]" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <h5 className="text-[12px] font-black text-slate-900 dark:text-white leading-none">{isVi ? "Giao dịch chuyển nhượng vé" : "Secure Ticket Transfer"}</h5>
                                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-black text-[7.5px] uppercase tracking-wider shrink-0 flex items-center gap-0.5 leading-none">
                                        <ShieldCheck className="w-2.5 h-2.5 shrink-0" />
                                        <span>Identra Verified</span>
                                      </span>
                                    </div>
                                    <p className="text-[9.5px] text-slate-450 dark:text-slate-500 font-bold mt-1 line-clamp-1">Smart Transfer Contract · Identra Secure Exchange</p>
                                  </div>
                                </div>
                                <div className="p-4 space-y-3.5">
                                  {/* Ticket details inside contract */}
                                  <div className="space-y-1 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/50 dark:border-gray-850/80 text-[11px]">
                                    <p className="text-[9px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest leading-none">{isVi ? "Tài sản chuyển nhượng" : "Asset Details"}</p>
                                    <p className="font-extrabold text-[#0D172A] dark:text-white text-xs mt-0.5">Live Concert 2027</p>
                                    <p className="text-slate-600 dark:text-slate-350 font-bold">{isVi ? "Vé VIP · Tầng 1 - Khu VIP · Hàng A · Ghế 12" : "VIP Ticket · Zone Level 1 · Row A · Seat 12"}</p>
                                    <div className="grid grid-cols-2 gap-2 text-[9px] text-slate-400 dark:text-slate-500 font-bold pt-1.5 mt-1 border-t border-slate-200/40 border-dashed">
                                      <div>
                                        <span className="block font-medium uppercase text-[7.5px] text-slate-400">Credential ID</span>
                                        <span className="font-mono mt-0.5 block text-slate-700 dark:text-slate-350">TICKET-2027-000123</span>
                                      </div>
                                      <div>
                                        <span className="block font-medium uppercase text-[7.5px] text-slate-400">Issuer</span>
                                        <span className="mt-0.5 block text-slate-800 dark:text-slate-350">{isVi ? "Live Concert BTC" : "Live Concert Org"}</span>
                                      </div>
                                      <div>
                                        <span className="block font-medium uppercase text-[7.5px] text-slate-400">Owner</span>
                                        <span className="mt-0.5 block text-slate-800 dark:text-slate-350">Nguyễn Minh Anh</span>
                                      </div>
                                      <div>
                                        <span className="block font-medium uppercase text-[7.5px] text-slate-400">Owner Status</span>
                                        <span className="mt-0.5 block text-emerald-500 font-black">{isVi ? "Hợp lệ" : "Valid ID"}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Pricing details row */}
                                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/50 dark:border-gray-800/80">
                                    <span className="text-[11px] font-black text-slate-600 dark:text-slate-400">{isVi ? "Giá trị giao dịch" : "Transfer amount"}</span>
                                    <span className="text-base font-black text-[#5B6CFF] dark:text-[#7C8CFF]">500.000 VNĐ</span>
                                  </div>
                                  
                                  {/* Conditions list */}
                                  <div className="space-y-1.5 text-[10.5px]">
                                    <p className="text-[9.5px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">{isVi ? "Các điều kiện bảo hoàn" : "Transfer Conditions"}</p>
                                    
                                    <div className="space-y-1 font-semibold text-slate-650 dark:text-slate-300">
                                      <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                        <span>{isVi ? "Người mua thanh toán đủ 500.000 VNĐ" : "Buyer pays exactly 500.000 VNĐ"}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${contractStage !== 'initial' ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'}`} />
                                        <span>{isVi ? "Vé được khóa tạm thời trong giao dịch" : "Ticket is temporarily escrow locked"}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${contractStage === 'completed' ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'}`} />
                                        <span>{isVi ? "Quyền sở hữu vé chuyển sang Trần Văn B" : "Transfer ownership to Trần Văn B"}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${contractStage === 'completed' ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'}`} />
                                        <span>{isVi ? "Vé trong ví người bán cập nhập: Đã chuyển nhượng" : "Seller wallet status blocks: Transferred"}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                        <span>{isVi ? "Nếu hết hạn/hủy, vé mở khóa trả lại người bán" : "Auto refund and unlock if cancelled"}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Safety Info Note */}
                                  <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/15 flex gap-2 text-[9.5px] text-amber-600 dark:text-amber-450 leading-normal font-semibold">
                                    <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <span>
                                      {isVi 
                                        ? "Identra bảo lãnh giao dịch an toàn. Người bán chỉ mất vé sau khi người mua đã thanh toán thành công. Người mua nhận vé thật hoặc hoàn lại tiền." 
                                        : "Identra guarantees absolute safety. Resellers lose keys only upon settlement confirmation. Buyers only ever receive cryptographically valid tickets."}
                                    </span>
                                  </div>
                                  
                                  {/* Stage specific progress or buttons */}
                                  {contractStage === 'initial' && (
                                    <div className="flex gap-2 pt-1">
                                      <button 
                                        onClick={handleProceedTransfer}
                                        className="h-10 px-4 flex-1 rounded-xl bg-[#3B52FF] hover:bg-[#2C41EB] dark:bg-[#7C8CFF] text-white dark:text-slate-950 font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-md select-none border-none inline-flex items-center justify-center gap-1.5 active:scale-98"
                                      >
                                        <ArrowLeftRight className="w-4 h-4" />
                                        <span>{isVi ? "Tiến hành giao dịch" : "Proceed to transaction"}</span>
                                      </button>
                                      <button 
                                        onClick={() => showLocalToast(isVi ? "Đã hủy bỏ đề xuất giao dịch" : "Proposed transfer rejected")}
                                        className="h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-505 dark:text-slate-400 font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer bg-transparent"
                                      >
                                        {isVi ? "Hủy" : "Cancel"}
                                      </button>
                                    </div>
                                  )}
                                  
                                  {contractStage === 'waiting' && (
                                    <div className="p-3 bg-indigo-50/50 dark:bg-slate-900 border border-indigo-100/40 dark:border-slate-800 rounded-xl space-y-2">
                                      <div className="flex items-center gap-1.5 justify-center text-xs font-black text-[#3C53FF] dark:text-[#7C8CFF] uppercase tracking-wider select-none">
                                        <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                                        <span>{isVi ? "Đang chờ người mua xác nhận" : "Waiting for buyer response"}</span>
                                      </div>
                                      <div className="space-y-1 text-[10px] text-gray-500 dark:text-gray-400 font-semibold">
                                        <div className="flex items-center gap-1.5 text-emerald-500">
                                          <Check className="w-3 h-3 text-emerald-500" />
                                          <span>{isVi ? "Hợp đồng đã được tạo" : "Contract successfully written"}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-emerald-505">
                                          <Check className="w-3 h-3 text-emerald-500" />
                                          <span>{isVi ? "Vé đã được khóa tạm thời" : "Ticket temporarily escrow locked"}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-indigo-500 animate-pulse font-bold">
                                          <Loader2 className="w-3 h-3 animate-spin" />
                                          <span>{isVi ? "Đang chờ Trần Văn B xác nhận giao dịch" : "Awaiting Trần Văn B confirmation"}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-slate-400/60 pl-4.5">
                                          <span>{isVi ? "Đang chờ thanh toán" : "Awaiting payment settlement"}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {contractStage === 'verifying' && (
                                    <div className="p-3 bg-violet-50/50 dark:bg-indigo-950/20 border border-indigo-100/45 dark:border-slate-805 rounded-xl space-y-2">
                                      <div className="flex items-center gap-1.5 justify-center text-xs font-extrabold text-[#3C53FF] dark:text-[#7C8CFF] uppercase tracking-wider select-none">
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        <span>{isVi ? "Đang đối soát mật mã & chuyển quyền" : "Executing title handover"}</span>
                                      </div>
                                      
                                      <div className="space-y-1 text-[10px] text-gray-500 dark:text-gray-400 font-bold">
                                        <div className={`flex items-center gap-1.5 ${contractVerifiedChecks >= 1 ? 'text-emerald-500 font-extrabold' : 'text-slate-400/85'}`}>
                                          {contractVerifiedChecks >= 1 ? <Check className="w-3.5 h-3.5 shrink-0" /> : <div className="w-3 h-3 rounded-full border border-slate-350 animate-pulse shrink-0" />}
                                          <span>{isVi ? "Kiểm tra chữ ký vé" : "Verify ticket cryptographic signature"}</span>
                                        </div>
                                        <div className={`flex items-center gap-1.5 ${contractVerifiedChecks >= 2 ? 'text-emerald-500 font-extrabold' : 'text-slate-400/85'}`}>
                                          {contractVerifiedChecks >= 2 ? <Check className="w-3.5 h-3.5 shrink-0" /> : contractVerifiedChecks === 1 ? <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" /> : <div className="w-3 h-3 rounded-full border border-slate-300 shrink-0" />}
                                          <span>{isVi ? "Kiểm tra tổ chức phát hành" : "Check credential ticket issuer"}</span>
                                        </div>
                                        <div className={`flex items-center gap-1.5 ${contractVerifiedChecks >= 3 ? 'text-emerald-500 font-extrabold' : 'text-slate-400/85'}`}>
                                          {contractVerifiedChecks >= 3 ? <Check className="w-3.5 h-3.5 shrink-0" /> : contractVerifiedChecks === 2 ? <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" /> : <div className="w-3 h-3 rounded-full border border-slate-300 shrink-0" />}
                                          <span>{isVi ? "Kiểm tra trạng thái vé" : "Check current ticket lock-status"}</span>
                                        </div>
                                        <div className={`flex items-center gap-1.5 ${contractVerifiedChecks >= 4 ? 'text-emerald-500 font-extrabold' : 'text-slate-400/85'}`}>
                                          {contractVerifiedChecks >= 4 ? <Check className="w-3.5 h-3.5 shrink-0" /> : contractVerifiedChecks === 3 ? <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" /> : <div className="w-3 h-3 rounded-full border border-slate-300 shrink-0" />}
                                          <span>{isVi ? "Kiểm tra vé chưa được sử dụng" : "Confirm ticket remains unused"}</span>
                                        </div>
                                        <div className={`flex items-center gap-1.5 ${contractVerifiedChecks >= 5 ? 'text-emerald-500 font-extrabold' : 'text-slate-400/85'}`}>
                                          {contractVerifiedChecks >= 5 ? <Check className="w-3.5 h-3.5 shrink-0" /> : contractVerifiedChecks === 4 ? <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" /> : <div className="w-3 h-3 rounded-full border border-slate-300 shrink-0" />}
                                          <span>{isVi ? "Cập nhật chủ sở hữu mới" : "Update new owner verified keys"}</span>
                                        </div>
                                        <div className={`flex items-center gap-1.5 ${contractVerifiedChecks >= 6 ? 'text-emerald-500 font-extrabold' : 'text-slate-400/85'}`}>
                                          {contractVerifiedChecks >= 6 ? <Check className="w-3.5 h-3.5 shrink-0" /> : contractVerifiedChecks === 5 ? <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" /> : <div className="w-3 h-3 rounded-full border border-slate-300 shrink-0" />}
                                          <span>{isVi ? "Thu hồi quyền sử dụng của chủ cũ" : "Revoke old owner key proof"}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {contractStage === 'completed' && (
                                    <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl space-y-2.5 animate-in fade-in duration-305">
                                      <div className="flex items-center gap-1.5 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider justify-center">
                                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                                        <span>{isVi ? "Chuyển nhượng thành công" : "Completed Successfully"}</span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 text-[9.5px] bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-emerald-500/10 text-slate-600 dark:text-slate-400 font-semibold gap-x-2 gap-y-1.5">
                                        <div>
                                          <span className="block font-medium uppercase text-[7px] text-slate-400">{isVi ? "Chủ cũ" : "OLD OWNER"}</span>
                                          <span className="mt-0.5 block line-through text-red-500">Nguyễn Minh Anh</span>
                                        </div>
                                        <div>
                                          <span className="block font-medium uppercase text-[7px] text-slate-400">{isVi ? "Chủ mới" : "NEW OWNER"}</span>
                                          <span className="mt-0.5 block text-emerald-500 font-black">Trần Văn B</span>
                                        </div>
                                        <div className="col-span-2 border-t border-slate-100 dark:border-slate-850 pt-1.5">
                                          <span className="block font-medium uppercase text-[7px] text-slate-400">{isVi ? "Mã giao dịch an toàn" : "CRYPTOGRAPHIC TX ID"}</span>
                                          <span className="mt-0.5 block font-mono text-[9.5px] text-[#3B52FF] dark:text-[#7C8CFF] select-all">TX-TRANSFER-2027-000451</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {/* Attachment: B's Payment Card */}
                            {msg.attachment === 'payment_card' && (
                              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md overflow-hidden text-left max-w-[280px] mt-2 animate-in fade-in duration-300">
                                <div className="bg-slate-50 dark:bg-slate-905 p-3 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="w-5.5 h-4 bg-indigo-600 rounded flex items-center justify-center p-0.5 shadow-sm text-white shrink-0 font-bold text-[6px]">BANK</div>
                                    <h5 className="text-[11px] font-black text-slate-900 dark:text-white leading-none">{isVi ? "Yêu cầu thanh toán" : "Bank Settle Order"}</h5>
                                  </div>
                                  <span className="text-[8px] text-gray-400 font-bold">{msg.time}</span>
                                </div>
                                <div className="p-3.5 space-y-3 font-semibold text-[11px]">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">{isVi ? "Số tiền" : "Total amount"}</span>
                                    <span className="text-slate-850 dark:text-slate-100 font-black">500.000 VNĐ</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">{isVi ? "Kênh thanh toán" : "Gateway"}</span>
                                    <span className="text-slate-850 dark:text-slate-100 font-bold">{isVi ? "Tài khoản liên kết ví" : "Linked Bank Account"}</span>
                                  </div>
                                  
                                  <div className="pt-2 border-t border-gray-150 dark:border-slate-850 flex justify-between items-center text-xs">
                                    <span className="text-gray-400 text-[10.5px] font-bold">{isVi ? "Trạng thái" : "Status"}</span>
                                    {transferPayment === 'processing' ? (
                                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[9px] font-black uppercase tracking-wider flex items-center gap-0.5 shrink-0 animate-pulse">
                                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                        <span>{isVi ? "Đang xử lý..." : "Processing"}</span>
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-wider flex items-center gap-0.5 shrink-0">
                                        <Check className="w-2.5 h-2.5 shrink-0 stroke-[2.5]" />
                                        <span>{isVi ? "Đã thanh toán" : "Paid"}</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Floating typing indicator of A */}
                    {isTypingA && (
                      <div className="flex gap-2.5 ml-auto flex-row-reverse text-right max-w-[85%] items-end animate-in fade-in duration-200">
                        <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-950/40 text-indigo-650 dark:text-indigo-400 font-bold text-[10px] flex items-center justify-center shrink-0 text-center leading-none">MA</div>
                        <div className="px-4 py-2.5 rounded-2xl bg-[#3B52FF]/10 dark:bg-slate-800/80 border border-[#3B52FF]/20 dark:border-slate-800 font-bold text-[12px] flex items-center gap-1 text-slate-500 rounded-br-xs">
                          <div className="flex gap-1 py-1.5 px-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Chat Composer bar */}
                  <div className="px-4 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3 shrink-0">
                    <button className="text-slate-400 hover:text-[#3B52FF] transition-colors cursor-pointer bg-transparent border-none">
                      <Image className="w-5 h-5 animate-pulse" />
                    </button>
                    <button className="text-slate-400 hover:text-[#3B52FF] transition-colors cursor-pointer bg-transparent border-none">
                      <FileText className="w-5 h-5 animate-pulse" />
                    </button>
                    <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-full px-4 py-2 text-xs border border-slate-200 dark:border-slate-800 relative flex items-center min-h-[38px] overflow-hidden">
                      {isTypingA && typingTextA ? (
                        <div className="flex items-center text-slate-800 dark:text-slate-200 font-semibold w-full">
                          <span className="truncate">{typingTextA}</span>
                          <span className="w-1.5 h-3.5 bg-[#3B52FF] dark:bg-[#7C8CFF] ml-0.5 animate-pulse shrink-0" />
                        </div>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-600 font-medium">
                          {isVi ? "Kịch bản tự động chạy..." : "Autoplay conversation in progress..."}
                        </span>
                      )}
                    </div>
                    <button className={`p-1.5 rounded-full transition-colors shrink-0 cursor-pointer border-none flex items-center justify-center ${
                      isTypingA && typingTextA
                        ? 'bg-[#3B52FF] text-white animate-pulse'
                        : 'bg-indigo-50 dark:bg-slate-800 text-[#3C53FF] dark:text-[#7C8CFF] hover:bg-indigo-100'
                    }`}>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                
                {/* Right Area: Explanations and Settings Dashboard */}
                <div className="md:w-[320px] flex flex-col justify-between space-y-6 shrink-0 lg:max-h-[540px] overflow-y-auto pr-1 scrollbar-thin">
                  {/* Header info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] tracking-wider uppercase font-black px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-550 dark:text-indigo-400 select-none">
                        {isVi ? "KỊCH BẢN" : "CASE SCENARIO"}
                      </span>
                      <span className="text-slate-450 dark:text-slate-500 font-extrabold text-[11px] ml-auto">{isVi ? "Bước 2/4" : "Step 2/4"}</span>
                    </div>
                    <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                      {isVi ? "Chuyển nhượng vé Concert" : "Concert Ticket Transfer"}
                    </h2>
                    <p className="text-[11px] leading-relaxed text-gray-500 dark:text-slate-400 font-semibold">
                      {isVi 
                        ? "Thực tế mô phỏng mua bán vé concert trực tiếp giữa hai cá nhân. Identra cung cấp cơ chế thông minh bảo chứng chu toàn, đồng thời xóa nguy cơ lừa đảo vé giả hay bán trùng."
                        : "Real-world simulator tracking peer-to-peer ticket transactions. Identra guarantees secure and double-spend proof digital asset transfers."}
                    </p>
                  </div>
                  
                  {/* Conditional Explanation: What just happened panel */}
                  {transferCompletedState && (
                    <div className="bg-emerald-500/5 dark:bg-slate-900 border border-emerald-500/20 dark:border-slate-800 rounded-2xl p-4 space-y-3 text-left animate-in fade-in zoom-in-95 duration-500">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4.5 h-4.5 text-emerald-500 animate-pulse shrink-0" />
                        <h4 className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{isVi ? "Điều gì vừa xảy ra?" : "What just occurred?"}</h4>
                      </div>
                      
                      <ol className="list-decimal pl-4.5 space-y-2.5 text-[10.5px] leading-relaxed text-slate-655 dark:text-slate-350 font-bold font-semibold">
                        <li>
                          <strong className="text-[#3B52FF] dark:text-[#7C8CFF]">{isVi ? "Khóa Bảo chứng Hợp đồng:" : "Smart Contract Escrow:"}</strong>{' '}
                          {isVi 
                            ? "Vé VIP A12 của người bán được khóa tạm trong Sandbox nhằm hủy khả năng bán chồng bán chéo trong lúc giao dịch diễn ra." 
                            : "Ticket A12 was automatically escrow-locked by Identra's contract, eliminating double-selling fears."}
                        </li>
                        <li>
                          <strong className="text-[#3B52FF] dark:text-[#7C8CFF]">{isVi ? "Thanh toán bảo toàn:" : "Guaranteed Settle:"}</strong>{' '}
                          {isVi 
                            ? "Hệ thống xác minh Trần Văn B thanh toán thành công 500.000 VNĐ sòng phẳng thông qua ví điện tử liên kết ngân hàng." 
                            : "The verifier engine confirmed Trần Văn B successfully settled 500k VNĐ."}
                        </li>
                        <li>
                          <strong className="text-[#3B52FF] dark:text-[#7C8CFF]">{isVi ? "Chuyển tiếp quyền sở hữu:" : "Cryptographic Handover:"}</strong>{' '}
                          {isVi 
                            ? "Hợp đồng thông minh đối đối chuẩn mật mã chữ ký số, đồng thời hủy vé cũ của người bán, cấp vé mới duy nhất hợp chuẩn cho người mua." 
                            : "The contract matched mathematical signatures, revoked seller's license and issued a brand new cryptographically verified ticket asset to the buyer."}
                        </li>
                      </ol>
                    </div>
                  )}
                  
                  {/* Bottom functional settings dashboard box */}
                  <div className="space-y-3 pt-3.5 border-t border-slate-200 dark:border-slate-800/80">
                    {/* Audio Toggle switch row */}
                    <div className="flex items-center justify-between py-1 px-1 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/50 dark:border-slate-800">
                      <span className="text-[10px] text-gray-400 dark:text-slate-400 font-extrabold ml-2 inline-flex items-center gap-1">
                        {transferSoundEnabled ? <Volume2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                        <span>{isVi ? "Âm thanh mô phỏng" : "Simulation Sound"}</span>
                      </span>
                      <button 
                        onClick={() => {
                          setTransferSoundEnabled(!transferSoundEnabled);
                          playSfx('click');
                        }}
                        className={`h-7 px-3 rounded-lg text-[9px] uppercase font-black tracking-wider shadow-xs transform active:scale-95 transition-all border-none cursor-pointer ${
                          transferSoundEnabled 
                            ? 'bg-[#3B52FF] hover:bg-[#2C41EB] text-white dark:bg-[#7C8CFF] dark:text-slate-950 font-black' 
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {transferSoundEnabled ? (isVi ? "Bật" : "On") : (isVi ? "Tắt" : "Off")}
                      </button>
                    </div>
                    
                    {/* Replay demo button row */}
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          playSfx('click');
                          startTransferDemo();
                        }}
                        className="h-10 px-3 rounded-xl border border-slate-205 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-350 font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-transparent flex-1 shadow-sm"
                      >
                        <RefreshCw className="w-4 h-4 text-slate-400 rotate-180" />
                        <span>{isVi ? "Chạy lại" : "Replay"}</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          playSfx('click');
                          setShowBankFormModal(false);
                        }}
                        className="h-10 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider transition-all cursor-pointer border-none shadow-md"
                      >
                        <span>{isVi ? "Hoàn tất" : "Close"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
              {/* STEP 2: BANK PROFILE FORM STAGE */}
              {bankStep === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 relative z-10 text-left">
                {/* Left Side: Traditional Banking Form */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    {/* Header line and Step */}
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center">
                        {selectedScenarioIdx === 1 ? (
                          <Briefcase className="w-4 h-4" />
                        ) : selectedScenarioIdx === 2 ? (
                          <Ticket className="w-4 h-4" />
                        ) : selectedScenarioIdx === 3 ? (
                          <Plane className="w-4 h-4" />
                        ) : selectedScenarioIdx === 4 ? (
                          <Building2 className="w-4 h-4" />
                        ) : selectedScenarioIdx === 5 ? (
                          <Heart className="w-4 h-4" />
                        ) : selectedScenarioIdx === 6 ? (
                          <ArrowLeftRight className="w-4 h-4" />
                        ) : (
                          <Landmark className="w-4 h-4" />
                        )}
                      </div>
                      <span className="text-[14px] font-extrabold text-slate-600 dark:text-slate-350">
                        {demoScenarios[selectedScenarioIdx ?? 0]?.title}
                      </span>
                      <div className="px-2.5 py-0.5 rounded-full bg-[#EBF0FF] dark:bg-blue-500/10 text-[#3C53FF] dark:text-[#7C8CFF] text-[10px] font-black uppercase tracking-wider ml-auto">
                        {isVi ? "Bước 2/4" : "Step 2/4"}
                      </div>
                    </div>

                    {selectedScenarioIdx !== 1 && (
                      <div className="space-y-1">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                          {selectedScenarioIdx === 0 ? (
                            isVi ? "Biểu mẫu mở tài khoản" : "Account opening form"
                          ) : selectedScenarioIdx === 1 ? (
                            isVi ? "Hồ sơ tuyển dụng ứng tuyển" : "Job candidacy profile"
                          ) : selectedScenarioIdx === 2 ? (
                            isVi ? "Thanh toán vé ca nhạc" : "Concert Ticket Checkout"
                          ) : selectedScenarioIdx === 3 ? (
                            isVi ? "Thẻ lên tàu và check-in khách sạn" : "Boarding & hotel check-in claim"
                          ) : selectedScenarioIdx === 4 ? (
                            isVi ? "Hồ sơ dịch vụ hành chính công" : "e-Government workflow form"
                          ) : selectedScenarioIdx === 5 ? (
                            isVi ? "Yêu cầu chăm sóc sức khỏe số" : "Digital health claims dashboard"
                          ) : (
                            isVi ? "Biểu mẫu liên kết kịch bản" : "Scenario connection profile"
                          )}
                        </h2>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                          {selectedScenarioIdx === 0 ? (
                            isVi ? "Vui lòng cung cấp thông tin dưới đây để mở tài khoản tại Ngân hàng An Tín." : "Please provide the information below to open an account at An Tin Bank."
                          ) : selectedScenarioIdx === 1 ? (
                            isVi ? "Nhấp chọn phương thức điền thông tin bên phải để tiếp tục ứng tuyển." : "Choose a fast-filling option on the right to proceed with application."
                          ) : (
                            isVi 
                              ? `Vui lòng liên kết định danh để tự động điền biểu mẫu cho kịch bản "${demoScenarios[selectedScenarioIdx ?? 0]?.title}".` 
                              : `Please link your verified wallet ID to fill the profile details for "${demoScenarios[selectedScenarioIdx ?? 0]?.title}" scenario.`
                          )}
                        </p>
                      </div>
                    )}

                    {selectedScenarioIdx === 1 ? (
                      /* RECRUITMENT JOB CARD DESIGN FOR SCENARIO 1 (Nộp hồ sơ xin việc) */
                      fillType === 'none' ? (
                        <div className="space-y-6 pt-1">
                          {/* Title and Company Header */}
                          <div className="space-y-2">
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                              Backend Developer
                            </h1>
                            <div className="flex items-center gap-3">
                              {/* Company Logo Mockup */}
                              <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-lg select-none shrink-0 shadow-md">
                                N
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-gray-200 uppercase tracking-tight">NovaTech</span>
                                  <span className="w-4 h-4 rounded-full bg-[#3B52FF] text-white flex items-center justify-center text-[9px] font-black">
                                    ✓
                                  </span>
                                </div>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold">
                                  {isVi ? "Công nghệ thông tin • 201–500 nhân viên" : "Information Technology • 201–500 employees"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Bento Grid Info Badges Row */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {/* Item 1 */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-3 flex flex-col justify-between min-h-[75px] shadow-xs">
                              <span className="text-[10px] font-black text-slate-400 tracking-wider flex items-center gap-1 uppercase">
                                <MapPin className="w-3.5 h-3.5 text-[#3B52FF]" />
                                {isVi ? "Địa điểm" : "Location"}
                              </span>
                              <span className="text-xs font-black text-slate-800 dark:text-white leading-tight mt-1.5 block">
                                {isVi ? "Hà Nội, Việt Nam" : "Hanoi, Vietnam"}
                              </span>
                            </div>

                            {/* Item 2 */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-3 flex flex-col justify-between min-h-[75px] shadow-xs">
                              <span className="text-[10px] font-black text-slate-400 tracking-wider flex items-center gap-1 uppercase">
                                <Briefcase className="w-3.5 h-3.5 text-[#3B52FF]" />
                                {isVi ? "Hình thức" : "Job Type"}
                              </span>
                              <span className="text-xs font-black text-slate-800 dark:text-white leading-tight mt-1.5 block">
                                {isVi ? "Toàn thời gian" : "Full Time"}
                              </span>
                            </div>

                            {/* Item 3 */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-3 flex flex-col justify-between min-h-[75px] shadow-xs">
                              <span className="text-[10px] font-black text-slate-400 tracking-wider flex items-center gap-1 uppercase">
                                <DollarSign className="w-3.5 h-3.5 text-[#3B52FF]" />
                                {isVi ? "Mức lương" : "Salary"}
                              </span>
                              <span className="text-xs font-black text-slate-800 dark:text-white leading-tight mt-1.5 block">
                                {isVi ? "Thỏa thuận" : "Negotiable"}
                              </span>
                            </div>

                            {/* Item 4 */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl p-3 flex flex-col justify-between min-h-[75px] shadow-xs">
                              <span className="text-[10px] font-black text-slate-400 tracking-wider flex items-center gap-1 uppercase">
                                <Clock className="w-3.5 h-3.5 text-[#3B52FF]" />
                                {isVi ? "Kinh nghiệm" : "Experience"}
                              </span>
                              <span className="text-xs font-black text-slate-800 dark:text-white leading-tight mt-1.5 block">
                                {isVi ? "2–4 năm" : "2–4 Years"}
                              </span>
                            </div>
                          </div>

                          {/* Job Description section */}
                          <div className="space-y-2 text-left">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">
                              {isVi ? "Mô tả công việc" : "Job Description"}
                            </h3>
                            <p className="text-[11.5px] leading-relaxed text-slate-650 dark:text-slate-350 font-medium">
                              {isVi 
                                ? "Tham gia phát triển các hệ thống backend có quy mô lớn, hiệu năng cao và khả năng mở rộng tốt. Làm việc trong môi trường Agile, cùng đội ngũ kỹ sư giàu kinh nghiệm để xây dựng các sản phẩm công nghệ đột phá."
                                : "Build large-scale high-performance distributed backend architectures. Collaborate closely in cross-functional agile squads with senior engineers to birth breakthrough tech innovations."}
                            </p>
                            <button className="text-[10.5px] font-black text-[#3B52FF] dark:text-[#7C8CFF] hover:underline cursor-pointer bg-transparent border-none outline-none p-0 inline-flex items-center gap-1">
                              <span>{isVi ? "Xem thêm" : "Read More"}</span>
                              <ChevronDown className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Job Requirements section */}
                          <div className="space-y-3.5 border-t border-slate-200/60 dark:border-slate-800/80 pt-5">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">
                              {isVi ? "Yêu cầu tuyển dụng" : "Job Requirements"}
                            </h3>
                            <div className="space-y-2.5">
                              <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-blue-500/10 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center text-[10px] shrink-0 font-bold border border-[#3B52FF]/10 mt-0.5">✔</span>
                                <span className="text-[11.5px] text-slate-700 dark:text-slate-300 font-bold">{isVi ? "Có bằng đại học liên quan đến công nghệ thông tin" : "Bachelor's degree in Computer Science, Software Engineering or related subjects."}</span>
                              </div>
                              <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-blue-500/10 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center text-[10px] shrink-0 font-bold border border-[#3B52FF]/10 mt-0.5">✔</span>
                                <span className="text-[11.5px] text-slate-700 dark:text-slate-300 font-bold">{isVi ? "Có kinh nghiệm backend (Node.js / Java / Python / Go, v.v.)" : "Proven background coding server-side nodes (Node.js / Java / Python / Go, etc)."}</span>
                              </div>
                              <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-blue-500/10 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center text-[10px] shrink-0 font-bold border border-[#3B52FF]/10 mt-0.5">✔</span>
                                <span className="text-[11.5px] text-slate-700 dark:text-slate-300 font-bold">{isVi ? "Có chứng chỉ hoặc dự án chứng minh năng lực" : "Possess verifiable digital tags or public portfolios showing competence."}</span>
                              </div>
                              <div className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-blue-500/10 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center text-[10px] shrink-0 font-bold border border-[#3B52FF]/10 mt-0.5">✔</span>
                                <span className="text-[11.5px] text-emerald-600 dark:text-emerald-400 font-bold">{isVi ? "Ưu tiên hồ sơ có thể xác minh" : "Preferred candidates with instantly verifiable cryptographically verified tags."}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* RECRUITMENT JOB CARD DESIGN - FILLED STATE */
                        <div className="space-y-5 pt-1">
                          <div className="space-y-1">
                            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                              {fillType === 'identra' 
                                ? (isVi ? "Đơn ứng tuyển: HOÀNG ANH TUẤN" : "Application: HOANG ANH TUAN") 
                                : (isVi ? "Đơn ứng tuyển: NGUYỄN VĂN A" : "Application: NGUYEN VAN A")}
                            </h3>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                              {fillType === 'identra' 
                                ? (isVi ? "Hồ sơ ứng tuyển tự động điền và xác thực thành công qua Identra" : "Candidacy application fully validated & compiled through Identra") 
                                : (isVi ? "Hồ sơ khai báo qua dữ liệu tệp CV tải lên thủ công" : "Manual CV scanned metadata summary")}
                            </p>
                          </div>

                          {/* List of mapped candidates credentials */}
                          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                            {/* Candidate field 1 */}
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">{isVi ? "Học vấn" : "Education"}</span>
                              <div className="flex items-center gap-1.5 text-right">
                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                  {fillType === 'identra' ? (isVi ? "Đại học Bách Khoa - Cử nhân KHMT" : "Hanoi Univ of Science - BCs CS") : (isVi ? "Đại học Bách Khoa (Khai báo)" : "Hanoi Univ of Science")}
                                </span>
                                {fillType === 'identra' && (
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-55/10 text-emerald-500 text-[8px] font-black uppercase flex items-center gap-0.5 border border-emerald-500/10">
                                    ✓ {isVi ? "Xác thực" : "Verified"}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Candidate field 2 */}
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">{isVi ? "Điểm tích lũy (GPA)" : "Aggregate GPA"}</span>
                              <div className="flex items-center gap-1.5 text-right">
                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                  {fillType === 'identra' ? "3.85 / 4.00" : "3.20 / 4.00"}
                                </span>
                                {fillType === 'identra' && (
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-55/10 text-emerald-500 text-[8px] font-black uppercase flex items-center gap-0.5 border border-emerald-500/10">
                                    ✓ {isVi ? "Mật mã" : "Sig Signed"}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Candidate field 3 */}
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">{isVi ? "Chứng chỉ chính" : "Core Certification"}</span>
                              <div className="flex items-center gap-1.5 text-right">
                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                  {fillType === 'identra' ? "Google Cloud Professional Architect" : "AWS Solutions Architect Associate"}
                                </span>
                                {fillType === 'identra' && (
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-55/10 text-emerald-500 text-[8px] font-black uppercase flex items-center gap-0.5 border border-emerald-500/10">
                                    ✓ {isVi ? "Xác thực" : "Verified"}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Candidate field 4 */}
                            <div className="flex items-center justify-between pb-1">
                              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">{isVi ? "Thông tin liên hệ" : "Contact details"}</span>
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 text-right">
                                {fillType === 'identra' ? "tuan.hoanganh@gmail.com | +84 901234567" : "nguyen.van.a@gmail.com | +84 912345678"}
                              </span>
                            </div>
                          </div>

                          {/* Extra feedback for the candidate profile type */}
                          {fillType === 'identra' ? (
                            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-start gap-2.5">
                              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                              <div className="space-y-0.5">
                                <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 leading-none">
                                  {isVi ? "Hồ sơ Đạt tiêu chuẩn Vàng" : "Gold Verified Standards Profile"}
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                                  {isVi 
                                    ? "Tất cả bằng cấp và kết quả học tập đều mang dấu niêm phong mật mã của Đại học Bách Khoa và Google Cloud. NovaTech ưu tiên phỏng vấn ngay lập tức." 
                                    : "All qualification credentials bear authorized digital seals from original institutions. NovaTech fast-tracks this candidate automatically."}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">!</div>
                              <div className="space-y-0.5">
                                <p className="text-xs font-black text-amber-600 dark:text-amber-400 leading-none">
                                  {isVi ? "Hồ sơ chưa được xác thực" : "Manual CV Profile Unverified"}
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                                  {isVi 
                                    ? "NovaTech yêu cầu bạn cung cấp bản gốc bằng đại học và chứng chỉ ở vòng phỏng vấn trực tiếp để xác minh tính chính xác (mất 5-7 ngày làm việc)." 
                                    : "You will need to manually bring original documents and transcripts during face-to-face evaluation rounds to certify this claim (takes 5-7 working days)."}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    ) : selectedScenarioIdx === 2 ? (
                      /* CONCERT TICKET SELECTION SCENARIO 2 (Mua vé xem biểu diễn ca nhạc) */
                      <div className="space-y-6 pt-1">
                        {/* Event details card */}
                        <div className="p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm space-y-3">
                          <div className="flex gap-4">
                            {/* Concert Thumbnail Mockup */}
                            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex flex-col items-center justify-center text-white shrink-0 shadow-md relative overflow-hidden">
                              <div className="absolute inset-0 bg-black/15" />
                              <Music className="w-8 h-8 relative z-10 text-white/90 drop-shadow" />
                              <div className="absolute bottom-1 text-[8px] font-black uppercase tracking-wider bg-black/40 px-1.5 py-0.5 rounded text-white/95 z-10">Live</div>
                            </div>
                            <div className="space-y-1">
                              <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-wide border border-indigo-200/10">CONCERT 2027</span>
                              <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">Live Concert 2027</h3>
                              <p className="text-[10.5px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Đêm nhạc hoành tráng với dàn nghệ sĩ hàng đầu và sân khấu đẳng cấp quốc tế.</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px] font-bold text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-850/80">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-indigo-500" />
                              <span>15/08/2027 (Thứ Bảy) - 19:00</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                              <span>Sân vận động Mỹ Đình, Hà Nội</span>
                            </div>
                          </div>
                        </div>

                        {/* Title Select Ticket */}
                        <div className="space-y-3 pt-1">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                            {isVi ? "Chọn loại vé" : "Select ticket class"}
                          </h4>
                          
                          {/* Ticket options */}
                          <div className="space-y-3">
                            {/* Standard Ticket */}
                            <div 
                              onClick={() => setSelectedTicketType('standard')}
                              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between shadow-sm relative group ${
                                selectedTicketType === 'standard' 
                                  ? 'border-[#3B52FF] bg-[#3B52FF]/[0.02] dark:bg-blue-500/[0.01] shadow-blue-500/5' 
                                  : 'border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950/30 hover:border-slate-350'
                              }`}
                            >
                              <div className="flex items-center gap-3.5">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                                  selectedTicketType === 'standard' ? 'bg-[#3B52FF]/10 text-[#3B52FF]' : 'bg-slate-100 dark:bg-slate-850 text-slate-500'
                                }`}>
                                  <Ticket className="w-5 h-5" />
                                </div>
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-black text-slate-900 dark:text-white">{isVi ? "Vé Standard" : "Standard Ticket"}</span>
                                    <span className="text-[8.5px] font-black px-1.5 py-0.5 bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-md uppercase border border-blue-200/10">Tầng 3</span>
                                  </div>
                                  <p className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium">{isVi ? "Còn 12.000 vé" : "12,000 tickets left"}</p>
                                </div>
                              </div>
                              <div className="text-right flex items-center gap-4">
                                <div className="space-y-0.5">
                                  <p className="text-sm font-black text-[#3B52FF] dark:text-[#7C8CFF]">500.000 VNĐ</p>
                                  <p className="text-[9.5px] text-right font-bold text-slate-400">{isVi ? "Mỗi vé" : "each"}</p>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                  selectedTicketType === 'standard' ? 'border-[#3B52FF] bg-[#3B52FF]' : 'border-slate-300 dark:border-slate-700 bg-transparent'
                                }`}>
                                  {selectedTicketType === 'standard' && <div className="w-2 h-2 rounded-full bg-white animate-in zoom-in-75 duration-100" />}
                                </div>
                              </div>
                            </div>

                            {/* VIP Ticket */}
                            <div 
                              onClick={() => setSelectedTicketType('vip')}
                              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between shadow-sm relative group ${
                                selectedTicketType === 'vip' 
                                  ? 'border-[#3B52FF] bg-[#3B52FF]/[0.02] dark:bg-blue-500/[0.01] shadow-blue-500/5' 
                                  : 'border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950/30 hover:border-slate-350'
                              }`}
                            >
                              <div className="flex items-center gap-3.5">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                                  selectedTicketType === 'vip' ? 'bg-[#3B52FF]/10 text-[#3B52FF]' : 'bg-slate-100 dark:bg-slate-850 text-slate-500'
                                }`}>
                                  <Gem className="w-5 h-5" />
                                </div>
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-black text-slate-900 dark:text-white">{isVi ? "Vé VIP" : "VIP Ticket"}</span>
                                    <span className="text-[8.5px] font-black px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-950/45 text-indigo-600 dark:text-indigo-400 rounded-md uppercase border border-indigo-200/50">Tầng 1 - VIP</span>
                                  </div>
                                  <p className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium">{isVi ? "Còn 500 vé" : "500 tickets left"}</p>
                                </div>
                              </div>
                              <div className="text-right flex items-center gap-4">
                                <div className="space-y-0.5">
                                  <p className="text-sm font-black text-[#3B52FF] dark:text-[#7C8CFF]">2.000.000 VNĐ</p>
                                  <p className="text-[9.5px] text-right font-bold text-slate-400">{isVi ? "Mỗi vé" : "each"}</p>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                  selectedTicketType === 'vip' ? 'border-[#3B52FF] bg-[#3B52FF]' : 'border-slate-300 dark:border-slate-700 bg-transparent'
                                }`}>
                                  {selectedTicketType === 'vip' && <div className="w-2 h-2 rounded-full bg-white animate-in zoom-in-75 duration-100" />}
                                </div>
                              </div>
                            </div>

                            {/* Backstage Ticket */}
                            <div 
                              onClick={() => setSelectedTicketType('backstage')}
                              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between shadow-sm relative group ${
                                selectedTicketType === 'backstage' 
                                  ? 'border-[#3B52FF] bg-[#3B52FF]/[0.02] dark:bg-blue-500/[0.01] shadow-blue-500/5' 
                                  : 'border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950/30 hover:border-slate-350'
                              }`}
                            >
                              <div className="flex items-center gap-3.5">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                                  selectedTicketType === 'backstage' ? 'bg-[#3B52FF]/10 text-[#3B52FF]' : 'bg-slate-100 dark:bg-slate-850 text-slate-500'
                                }`}>
                                  <Star className="w-5 h-5" />
                                </div>
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-black text-slate-900 dark:text-white">{isVi ? "Vé Backstage" : "Backstage Ticket"}</span>
                                    <span className="text-[8.5px] font-black px-1.5 py-0.5 bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-md uppercase border border-amber-200/10">Backstage</span>
                                  </div>
                                  <p className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium">{isVi ? "Còn 30 vé" : "30 tickets left"}</p>
                                </div>
                              </div>
                              <div className="text-right flex items-center gap-4">
                                <div className="space-y-0.5">
                                  <p className="text-sm font-black text-[#3B52FF] dark:text-[#7C8CFF]">5.000.000 VNĐ</p>
                                  <p className="text-[9.5px] text-right font-bold text-slate-400">{isVi ? "Mỗi vé" : "each"}</p>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                  selectedTicketType === 'backstage' ? 'border-[#3B52FF] bg-[#3B52FF]' : 'border-slate-300 dark:border-slate-700 bg-transparent'
                                }`}>
                                  {selectedTicketType === 'backstage' && <div className="w-2 h-2 rounded-full bg-white animate-in zoom-in-75 duration-100" />}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Info banner info */}
                        <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-slate-900/50 border border-blue-100/50 dark:border-slate-800/80 flex items-center gap-2 text-slate-500 dark:text-slate-400 shadow-xs">
                          <svg className="w-4 h-4 text-[#3B52FF] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                          </svg>
                          <span className="text-[10.5px] font-semibold leading-relaxed">
                            {isVi ? "Vé sẽ được phát hành dưới dạng thực chứng lưu trong ví định tín của bạn." : "Concert passes are digital credentials securely registered to your Identra container."}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* TRADITIONAL BANKING FORM */
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3.5">
                          {isVi ? "Thông tin cá nhân" : "Personal Information"}
                        </h4>

                        {/* Inputs fields */}
                        <div className="space-y-3.5">
                          {/* Name field */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:items-center">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isVi ? "Họ và tên" : "Full Name"}</label>
                            <div className="sm:col-span-2 relative">
                              <input 
                                type="text"
                                value={bankFullName}
                                onChange={(e) => {
                                  setBankFullName(e.target.value);
                                  if (fillType === 'identra') setFillType('manual');
                                }}
                                placeholder={isVi ? "Nhập họ và tên" : "Specify your name"}
                                className={`w-full h-10 px-4 text-xs.5 font-bold rounded-xl border ${fillType === 'identra' ? 'border-emerald-500 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02]' : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950'} transition-all text-slate-900 dark:text-white focus:outline-none focus:border-[#3B52FF]`}
                              />
                              {fillType === 'identra' && (
                                <span className="absolute right-3 top-2.5 px-1.5 py-0.5 rounded bg-emerald-55/15 dark:bg-emerald-500/10 text-emerald-500 text-[8.5px] font-black uppercase flex items-center gap-1 border border-emerald-500/20">
                                  <Check className="w-2.5 h-2.5 stroke-[3.5]" /> {isVi ? "Đã đối soát" : "Verified"}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* DOB Field */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:items-center">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isVi ? "Ngày sinh" : "Date of Birth"}</label>
                            <div className="sm:col-span-2 relative">
                              <input 
                                type="text"
                                value={bankDob}
                                onChange={(e) => {
                                  setBankDob(e.target.value);
                                  if (fillType === 'identra') setFillType('manual');
                                }}
                                placeholder="DD/MM/YYYY"
                                className={`w-full h-10 px-4 text-xs.5 font-bold rounded-xl border ${fillType === 'identra' ? 'border-emerald-500 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02]' : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950'} transition-all text-slate-900 dark:text-white focus:outline-none focus:border-[#3B52FF]`}
                              />
                              {fillType === 'identra' && (
                                <span className="absolute right-3 top-2.5 px-1.5 py-0.5 rounded bg-emerald-55/15 dark:bg-emerald-500/10 text-emerald-500 text-[8.5px] font-black uppercase flex items-center gap-1 border border-emerald-500/20">
                                  <Check className="w-2.5 h-2.5 stroke-[3.5]" /> {isVi ? "Đã đối soát" : "Verified"}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Nationality Field */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:items-center">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isVi ? "Quốc tịch" : "Nationality"}</label>
                            <div className="sm:col-span-2 relative">
                              <input 
                                type="text"
                                value={bankNationality}
                                onChange={(e) => {
                                  setBankNationality(e.target.value);
                                  if (fillType === 'identra') setFillType('manual');
                                }}
                                placeholder={isVi ? "Chọn hoặc nhập quốc tịch" : "State origin nationality"}
                                className={`w-full h-10 px-4 text-xs.5 font-bold rounded-xl border ${fillType === 'identra' ? 'border-emerald-500 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02]' : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950'} transition-all text-slate-900 dark:text-white focus:outline-none focus:border-[#3B52FF]`}
                              />
                              {fillType === 'identra' && (
                                <span className="absolute right-3 top-2.5 px-1.5 py-0.5 rounded bg-emerald-55/15 dark:bg-emerald-500/10 text-emerald-500 text-[8.5px] font-black uppercase flex items-center gap-1 border border-emerald-500/20">
                                  <Check className="w-2.5 h-2.5 stroke-[3.5]" /> {isVi ? "Đã đối soát" : "Verified"}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Address Field */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:items-center">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isVi ? "Địa chỉ" : "Address"}</label>
                            <div className="sm:col-span-2 relative">
                              <input 
                                type="text"
                                value={bankAddress}
                                onChange={(e) => {
                                  setBankAddress(e.target.value);
                                  if (fillType === 'identra') setFillType('manual');
                                }}
                                placeholder={isVi ? "Nhập địa chỉ thường trú" : "Permanent physical address"}
                                className={`w-full h-10 px-4 text-xs.5 font-bold rounded-xl border ${fillType === 'identra' ? 'border-emerald-500 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02]' : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950'} transition-all text-slate-900 dark:text-white focus:outline-none focus:border-[#3B52FF]`}
                              />
                              {fillType === 'identra' && (
                                <span className="absolute right-3 top-2.5 px-1.5 py-0.5 rounded bg-emerald-55/15 dark:bg-emerald-500/10 text-emerald-500 text-[8.5px] font-black uppercase flex items-center gap-1 border border-emerald-500/20">
                                  <Check className="w-2.5 h-2.5 stroke-[3.5]" /> {isVi ? "Đã đối soát" : "Verified"}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Email Field */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:items-center">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isVi ? "Email" : "Email ID"}</label>
                            <div className="sm:col-span-2 relative">
                              <input 
                                type="email"
                                value={bankEmail}
                                onChange={(e) => {
                                  setBankEmail(e.target.value);
                                  if (fillType === 'identra') setFillType('manual');
                                }}
                                placeholder={isVi ? "Nhập email liên hệ" : "Electronic email address"}
                                className={`w-full h-10 px-4 text-xs.5 font-bold rounded-xl border ${fillType === 'identra' ? 'border-emerald-500 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02]' : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950'} transition-all text-slate-900 dark:text-white focus:outline-none focus:border-[#3B52FF]`}
                              />
                              {fillType === 'identra' && (
                                <span className="absolute right-3 top-2.5 px-1.5 py-0.5 rounded bg-emerald-55/15 dark:bg-emerald-500/10 text-emerald-500 text-[8.5px] font-black uppercase flex items-center gap-1 border border-emerald-500/20">
                                  <Check className="w-2.5 h-2.5 stroke-[3.5]" /> {isVi ? "Đã đối soát" : "Verified"}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Phone Field */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:items-center">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{isVi ? "Số điện thoại" : "Phone number"}</label>
                            <div className="sm:col-span-2 flex gap-2">
                              <div className="w-[75px] h-10 rounded-xl border border-gray-200 dark:border-slate-800 px-3 flex items-center justify-between text-xs font-black bg-gray-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 select-none">
                                <span>+84</span>
                                <ChevronDown className="w-3 h-3" />
                              </div>
                              <div className="flex-1 relative">
                                <input 
                                  type="tel"
                                  value={bankPhone}
                                  onChange={(e) => {
                                    setBankPhone(e.target.value);
                                    if (fillType === 'identra') setFillType('manual');
                                  }}
                                  placeholder={isVi ? "Nhập số điện thoại" : "Mobile subscription digits"}
                                  className={`w-full h-10 px-4 text-xs.5 font-bold rounded-xl border ${fillType === 'identra' ? 'border-emerald-500 bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02]' : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950'} transition-all text-slate-900 dark:text-white focus:outline-none focus:border-[#3B52FF]`}
                                />
                                {fillType === 'identra' && (
                                  <span className="absolute right-3 top-2.5 px-1.5 py-0.5 rounded bg-emerald-55/15 dark:bg-emerald-500/10 text-emerald-500 text-[8.5px] font-black uppercase flex items-center gap-1 border border-emerald-500/20">
                                    <Check className="w-2.5 h-2.5 stroke-[3.5]" /> {isVi ? "Đã đối soát" : "Verified"}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Security protection note */}
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500 font-bold max-w-md pb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>
                      {selectedScenarioIdx === 1 
                        ? (isVi ? "Thông tin ứng tuyển của bạn được mã hóa hoàn toàn và chỉ gửi tới nhà tuyển dụng NovaTech khi được sự cho phép." : "Your candidacy profile is fully encrypted and only transmitted to hiring managers when you authorize it.")
                        : (isVi ? "Thông tin của bạn được mã hóa hoàn toàn và chỉ giải mã phục vụ mở tài khoản an toàn." : "Your data credentials are encrypted and only decrypted securely at your authorized point.")
                      }
                    </span>
                  </div>
                </div>

                {/* Right Side: Identra Promotion Card and trigger buttons */}
                <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-150 dark:border-slate-800/85 pt-6 lg:pt-0 lg:pl-10 relative z-10 min-h-[460px]">
                  
                  {isAutoFilling ? (
                    /* SIMULATION CONNECTING WALLET SCREEN OVERLAY */
                    <div className="flex-1 flex flex-col items-center justify-center p-4 self-center max-w-sm space-y-6 animate-in fade-in duration-250">
                      {/* Animating spinner block */}
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full border-4 border-[#3B52FF]/25 border-t-[#3B52FF] animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center text-[#3B52FF]">
                          <Cpu className="w-5 h-5 animate-pulse" />
                        </div>
                      </div>

                      <div className="space-y-4 text-center w-full">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white tracking-wide uppercase">
                          {isVi ? "ĐANG LIÊN KẾT VÍ IDENTRA..." : "CONNECTING IDENTRA..."}
                        </h4>
                        
                        <div className="space-y-3 max-w-[240px] mx-auto text-left">
                          <div className="flex items-center gap-2.5">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black leading-none ${autoFillStep >= 1 ? 'bg-emerald-500 text-white' : 'bg-gray-250 dark:bg-slate-800 text-gray-450 dark:text-slate-500'}`}>
                              {autoFillStep >= 1 ? "✓" : "1"}
                            </span>
                            <span className={`text-[11px] font-bold ${autoFillStep === 1 ? 'text-[#3B52FF] dark:text-[#7C8CFF]' : 'text-gray-400 dark:text-slate-600'}`}>
                              {isVi ? "Thiết lập đường truyền bảo mật" : "Secure Handshake"}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2.5">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black leading-none ${autoFillStep >= 2 ? 'bg-emerald-500 text-white' : 'bg-gray-250 dark:bg-slate-800 text-gray-450 dark:text-slate-500'}`}>
                              {autoFillStep >= 2 ? "✓" : "2"}
                            </span>
                            <span className={`text-[11px] font-bold ${autoFillStep === 2 ? 'text-[#3B52FF] dark:text-[#7C8CFF]' : 'text-gray-400 dark:text-slate-600'}`}>
                              {isVi ? "Lấy thông tin định danh số" : "Retrieve Digital ID Claim"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black leading-none ${autoFillStep >= 3 ? 'bg-emerald-500 text-white' : 'bg-gray-250 dark:bg-slate-800 text-gray-450 dark:text-slate-500'}`}>
                              {autoFillStep >= 3 ? "✓" : "3"}
                            </span>
                            <span className={`text-[11px] font-bold ${autoFillStep === 3 ? 'text-[#3B52FF] dark:text-[#7C8CFF]' : 'text-gray-400 dark:text-slate-600'}`}>
                              {isVi ? "Đối chuẩn chữ ký mật mã" : "Verify Cryptographic Seal"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : showIdentraQR ? (
                    /* QR CODE SCREEN OVERLAY */
                    <div className="flex-1 flex flex-col items-center justify-center p-4 self-center w-full max-w-sm space-y-5 animate-in fade-in duration-250 text-center">
                      
                      {/* Sub-header step or tag */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-[#3B52FF] dark:text-[#7C8CFF] text-[9px] font-black uppercase tracking-wider">
                        <Scan className="w-3.5 h-3.5" />
                        <span>{isVi ? "Yêu cầu chia sẻ thực chứng" : "Verification Request"}</span>
                      </span>

                      <div className="space-y-1 text-center w-full">
                        <h4 className="text-sm font-black text-slate-800 dark:text-white tracking-tight uppercase">
                          {isVi ? "Quét mã QR để liên kết" : "Scan QR to connect wallet"}
                        </h4>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                          {isVi 
                            ? "Sử dụng ứng dụng Ví Identra trên thiết bị di động quét mã này để hoàn thành thủ tục tự động." 
                            : "Scan with your Identra Mobile App to automatically stream secure identity claims."}
                        </p>
                      </div>

                      {/* Interactive QR Code Frame container */}
                      <div 
                        onClick={handleIdentraFill}
                        className="relative group cursor-pointer p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 hover:border-[#3B52FF] dark:hover:border-[#7C8CFF] shadow-md transition-all active:scale-98"
                      >
                        {/* Scanning green line simulation */}
                        <div className="absolute left-4 right-4 h-0.5 bg-emerald-500/85 shadow-[0_0_8px_rgba(16,185,129,0.85)] animate-bounce pointer-events-none z-20" style={{ top: '35%' }} />

                        {/* Top-left corners of camera frame style */}
                        <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#3B52FF] dark:border-[#7C8CFF]" />
                        <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#3B52FF] dark:border-[#7C8CFF]" />
                        <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#3B52FF] dark:border-[#7C8CFF]" />
                        <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#3B52FF] dark:border-[#7C8CFF]" />

                        {/* SVG QR Code */}
                        <div className="w-[180px] h-[180px] flex items-center justify-center p-1">
                          <svg className="w-full h-full text-slate-800 dark:text-white" viewBox="0 0 100 100" fill="currentColor">
                            {/* Top Left Anchor */}
                            <path d="M5,5 h25 v25 h-25 z M10,10 h15 v15 h-15 z M15,15 h5 v5 h-5 z" />
                            {/* Top Right Anchor */}
                            <path d="M70,5 h25 v25 h-25 z M75,10 h15 v15 h-15 z M80,15 h5 v5 h-5 z" />
                            {/* Bottom Left Anchor */}
                            <path d="M5,70 h25 v25 h-25 z M10,75 h15 v15 h-15 z M15,80 h5 v5 h-5 z" />
                            
                            {/* Random sophisticated digital QR patterns representation */}
                            <path d="M35,5 h5 v5 h-5 z M45,5 h10 v5 h-10 z M60,5 h5 v5 h-5 z" />
                            <path d="M35,15 h10 v5 h-10 z M50,10 h5 v10 h-5 z M60,15 h5 v5 h-5 z" />
                            <path d="M35,25 h5 v5 h-5 z M45,25 h5 v5 h-5 z M55,20 h10 v5 h-10 z" />
                            <path d="M5,35 h5 v10 h-5 z M15,35 h15 v5 h-15 z M10,45 h5 v5 h-5 z M25,45 h5 v5 h-5 z" />
                            <path d="M35,35 h10 v10 h-10 z M50,35 h10 v5 h-10 z M65,35 h15 v5 h-15 z" />
                            <path d="M5,50 h10 v5 h-10 z M20,50 h5 v5 h-5 z M30,50 h15 v5 h-15 z" />
                            <path d="M50,45 h5 v15 h-5 z M60,50 h15 v5 h-15 z M80,45 h15 v5 h-15 z" />
                            <path d="M5,60 h10 v5 h-10 z M20,60 h5 v5 h-5 z M30,60 h5 v5 h-5 z" />
                            <path d="M60,60 h10 v5 h-10 z M75,60 h5 v5 h-5 z M85,55 h10 v10 h-10 z" />
                            <path d="M35,70 h15 v5 h-15 z M55,70 h10 v5 h-10 z M75,70 h10 v5 h-10 z" />
                            <path d="M35,80 h5 v15 h-5 z M45,80 h15 v5 h-15 z M65,80 h5 v5 h-5 z M75,80 h15 v15 h-15 z" />
                            <path d="M35,90 h10 v5 h-10 z M55,90 h15 v5 h-15 z" />
                          </svg>

                          {/* Pulsing center badge representing the wallet */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-11 h-11 rounded-xl bg-[#3B52FF] dark:bg-[#7C8CFF] shadow-md border border-white dark:border-slate-800 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300">
                              <svg className="w-5 h-5 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor"/>
                                <path d="M3 10H21" stroke="currentColor" strokeWidth="2.5" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Hover prompt banner inside QR Box */}
                        <div className="absolute inset-0 bg-slate-900/95 dark:bg-slate-950/98 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-3 rounded-2xl select-none text-white gap-2 text-center">
                          <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <Smartphone className="w-5 h-5 animate-bounce" />
                          </div>
                          <p className="text-xs font-black text-center text-emerald-400 tracking-wider uppercase leading-none">
                            {isVi ? "Giả lập Quét mã" : "Simulate QR Scan"}
                          </p>
                          <p className="text-[10px] text-slate-300 max-w-[150px]">
                            {isVi ? "Nhấp chuột vào mã QR để giả lập ứng dụng ví điện thoại quét mã thành công" : "Click code to mock the physical phone wallet handover action"}
                          </p>
                        </div>
                      </div>

                      {/* Explicit button beneath to guide users clearly */}
                      <button 
                        onClick={handleIdentraFill}
                        className="w-full py-2.5 px-4 rounded-xl border border-dashed border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-all cursor-pointer border-none"
                      >
                        <Smartphone className="w-4 h-4 shrink-0" />
                        <span>{isVi ? "Xác nhận đã quét" : "Confirm scans"}</span>
                      </button>

                      {/* Help/tip explanation tag */}
                      <div className="flex items-center gap-1.5 justify-center text-[10px] text-gray-400 dark:text-gray-500 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                        <span>{isVi ? "Nhấp trực tiếp vào QR để đi tiếp nhanh" : "Click standard QR code block to fast-forward"}</span>
                      </div>
                    </div>
                  ) : selectedScenarioIdx === 2 ? (
                    /* CUSTOM ORDER INFO FOR CONCERT TICKETS AT STEP 2/4 */
                    concertCheckoutActive ? (
                      /* QR CODE VERIFICATION FOR CONCERT TICKETS AT STEP 2/4 */
                      <div className="flex-1 flex flex-col justify-between space-y-4 text-left animate-in fade-in duration-300">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-2">
                            <h3 className="text-[15px] font-bold text-[#0F172A] dark:text-white pb-0.5 flex items-center gap-1.5">
                              <ShieldCheck className="w-5 h-5 text-[#3B52FF] dark:text-[#7C8CFF]" />
                              <span>{isVi ? "Xác minh điều kiện đặt vé" : "Ticket criteria verification"}</span>
                            </h3>
                            <button 
                              onClick={() => setConcertCheckoutActive(false)}
                              className="text-[10.5px] font-bold text-slate-400 hover:text-[#3B52FF] dark:hover:text-[#7C8CFF] inline-flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                            >
                              <span>← {isVi ? "Quay lại" : "Back"}</span>
                            </button>
                          </div>

                          <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            {isVi 
                              ? "Trước khi tiến hành thanh toán, ban tổ chức cần xác thực điều kiện độ tuổi tối thiểu (>18 tuổi) bằng chữ ký mật mã không tiết lộ danh tính từ Ví Identra."
                              : "Before proceeding with payment, we need to verify some of your information as required (whether you are 18 years old or older, etc.)."}
                          </p>

                          {/* QR Box Container */}
                          <div className="flex flex-col items-center justify-center space-y-3 pt-1">
                            <div 
                              onClick={() => {
                                setConcertKycVerified(true);
                                setBankFullName("NGUYEN MINH ANH");
                                setBankDob("12/10/1998");
                                setBankNationality("Vietnam");
                                setBankAddress("Hanoi, Vietnam");
                                setBankEmail("nguyenminhanh@gmail.com");
                                setBankPhone("0912345678");
                                setBankStep(3);
                                setVerificationProgress(0);
                              }}
                              className="relative group cursor-pointer p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 hover:border-[#3B52FF] dark:hover:border-[#7C8CFF] shadow-md transition-all active:scale-98"
                            >
                              {/* Scanning green line simulation */}
                              <div className="absolute left-4 right-4 h-0.5 bg-emerald-500/85 shadow-[0_0_8px_rgba(16,185,129,0.85)] animate-bounce pointer-events-none z-20" style={{ top: '35%' }} />

                              {/* Top-left corners of camera frame style */}
                              <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#3B52FF] dark:border-[#7C8CFF]" />
                              <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#3B52FF] dark:border-[#7C8CFF]" />
                              <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#3B52FF] dark:border-[#7C8CFF]" />
                              <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#3B52FF] dark:border-[#7C8CFF]" />

                              {/* SVG QR Code */}
                              <div className="w-[180px] h-[180px] flex items-center justify-center p-1">
                                <svg className="w-full h-full text-slate-800 dark:text-white" viewBox="0 0 100 100" fill="currentColor">
                                  {/* Top Left Anchor */}
                                  <path d="M5,5 h25 v25 h-25 z M10,10 h15 v15 h-15 z M15,15 h5 v5 h-5 z" />
                                  {/* Top Right Anchor */}
                                  <path d="M70,5 h25 v25 h-25 z M75,10 h15 v15 h-15 z M80,15 h5 v5 h-5 z" />
                                  {/* Bottom Left Anchor */}
                                  <path d="M5,70 h25 v25 h-25 z M10,75 h15 v15 h-15 z M15,80 h5 v5 h-5 z" />
                                  
                                  {/* Random sophisticated digital QR patterns representation */}
                                  <path d="M35,5 h5 v5 h-5 z M45,5 h10 v5 h-10 z M60,5 h5 v5 h-5 z" />
                                  <path d="M35,15 h10 v5 h-10 z M50,10 h5 v10 h-5 z M60,15 h5 v5 h-5 z" />
                                  <path d="M35,25 h5 v5 h-5 z M45,25 h5 v5 h-5 z M55,20 h10 v5 h-10 z" />
                                  <path d="M5,35 h5 v10 h-5 z M15,35 h15 v5 h-15 z M10,45 h5 v5 h-5 z M25,45 h5 v5 h-5 z" />
                                  <path d="M35,35 h10 v10 h-10 z M50,35 h10 v5 h-10 z M65,35 h15 v5 h-15 z" />
                                  <path d="M5,50 h10 v5 h-10 z M20,50 h5 v5 h-5 z M30,50 h15 v5 h-15 z" />
                                  <path d="M50,45 h5 v15 h-5 z M60,50 h15 v5 h-15 z M80,45 h15 v5 h-15 z" />
                                  <path d="M5,60 h10 v5 h-10 z M20,60 h5 v5 h-5 z M30,60 h5 v5 h-5 z" />
                                  <path d="M60,60 h10 v5 h-10 z M75,60 h5 v5 h-5 z M85,55 h10 v10 h-10 z" />
                                  <path d="M35,70 h15 v5 h-15 z M55,70 h10 v5 h-10 z M75,70 h10 v5 h-10 z" />
                                  <path d="M35,80 h5 v15 h-5 z M45,80 h15 v5 h-15 z M65,80 h5 v5 h-5 z M75,80 h15 v15 h-15 z" />
                                  <path d="M35,90 h10 v5 h-10 z M55,90 h15 v5 h-15 z" />
                                </svg>

                                {/* Pulsing center badge representing the wallet */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <div className="w-11 h-11 rounded-xl bg-[#3B52FF] dark:bg-[#7C8CFF] shadow-md border border-white dark:border-slate-800 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300">
                                    <svg className="w-5 h-5 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor"/>
                                      <path d="M3 10H21" stroke="currentColor" strokeWidth="2.5" />
                                    </svg>
                                  </div>
                                </div>
                              </div>

                              {/* Interactive Hover prompt banner inside QR Box */}
                              <div className="absolute inset-0 bg-slate-900/95 dark:bg-slate-950/98 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-3 rounded-2xl select-none text-white gap-2 text-center">
                                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                  <Smartphone className="w-5 h-5 animate-bounce" />
                                </div>
                                <p className="text-xs font-black text-center text-emerald-400 tracking-wider uppercase leading-none">
                                  {isVi ? "Giả lập Quét mã" : "Simulate QR Scan"}
                                </p>
                                <p className="text-[10px] text-slate-300 max-w-[150px]">
                                  {isVi ? "Nhấp chuột vào mã QR để giả lập ứng dụng ví điện thoại quét mã thành công" : "Click code to mock the physical phone wallet handover action"}
                                </p>
                              </div>
                            </div>

                            {/* Verification Feedbacks */}
                            {concertKycVerified ? (
                              <div className="w-full p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5 animate-in slide-in-from-bottom-2 duration-300">
                                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <div className="space-y-0.5">
                                  <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                                    {isVi ? "Xác thực thành công!" : "Verification successful!"}
                                  </p>
                                  <p className="text-[10px] text-slate-450 dark:text-slate-400 font-semibold leading-relaxed">
                                    {isVi 
                                      ? "Đã xác thực bạn trên 18 tuổi bằng thực chứng số thành công." 
                                      : "Successfully confirmed age (>18) threshold via zero-knowledge proofs."}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 justify-center text-[10px] text-gray-400 dark:text-gray-500 font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                                <span>{isVi ? "Nhấp trực tiếp vào QR để đi tiếp nhanh" : "Click QR code block directly to fast-forward"}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* QR scan actions or Next step buttons */}
                        <div className="space-y-2 pt-2">
                          <button
                            onClick={() => {
                              setConcertKycVerified(true);
                              setBankFullName("NGUYEN MINH ANH");
                              setBankDob("12/10/1998");
                              setBankNationality("Vietnam");
                              setBankAddress("Hanoi, Vietnam");
                              setBankEmail("nguyenminhanh@gmail.com");
                              setBankPhone("0912345678");
                              setBankStep(3);
                              setVerificationProgress(0);
                            }}
                            className="w-full h-11.5 py-2.5 px-4 rounded-2xl border border-dashed border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-all cursor-pointer border-none"
                          >
                            <Smartphone className="w-4 h-4 shrink-0" />
                            <span>{isVi ? "Mô phỏng quét mã" : "Simulate QR Scan"}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col justify-between space-y-4 text-left">
                        <div className="space-y-4">
                          <h3 className="text-[15px] font-bold text-[#0F172A] dark:text-white pb-0.5">
                            {isVi ? "Thông tin đơn hàng" : "Order Information"}
                          </h3>

                          {/* Concert Event Details Row */}
                          <div className="flex gap-4 items-start">
                            {/* Concert Thumbnail Card with purple/blue concert crowd design */}
                            <div className="w-[100px] h-[100px] rounded-2xl bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 flex flex-col items-center justify-center text-white shrink-0 shadow-md relative overflow-hidden border border-slate-150/15">
                              {/* Abstract spotlight background layers */}
                              <div className="absolute inset-x-0 top-0 h-full opacity-65 bg-[radial-gradient(ellipse_at_top,rgba(165,180,252,0.6),transparent_50%)]" />
                              <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-indigo-500/30 rounded-full blur-md" />
                              <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-pink-500/20 rounded-full blur-md" />
                              
                              {/* Concentric light rays using CSS borders */}
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 border-l border-r border-indigo-400/25 rotate-45 pointer-events-none" />
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 border-l border-r border-indigo-300/15 -rotate-12 pointer-events-none" />
                              
                              {/* Text "LIVE CONCERT 2027" */}
                              <div className="relative z-10 text-center px-1">
                                <span className="block font-mono text-[9px] font-bold tracking-widest text-indigo-205 leading-tight">LIVE</span>
                                <span className="block font-sans text-xs font-black uppercase text-white leading-tight">CONCERT</span>
                                <span className="block font-sans text-xs font-black text-white leading-none">2027</span>
                              </div>
                              
                              {/* Bottom crowd simulated nodes */}
                              <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-0.5 gap-0.5 opacity-60">
                                <div className="w-1.5 h-1.5 bg-indigo-300/40 rounded-full animate-pulse" />
                                <div className="w-1.5 h-1.5 bg-pink-300/40 rounded-full animate-ping" />
                                <div className="w-1.5 h-1.5 bg-indigo-300/40 rounded-full animate-pulse" />
                              </div>
                            </div>

                            <div className="space-y-1 py-0.5 flex-1">
                              <h4 className="text-[15px] font-black text-slate-900 dark:text-white leading-snug">
                                Live Concert 2027
                              </h4>
                              
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>15/08/2027 - 19:00</span>
                              </div>

                              <div className="flex items-start gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                <span className="leading-tight">Sân vận động Mỹ Đình, Hà Nội</span>
                              </div>
                            </div>
                          </div>

                          {/* Order Options Row Stack */}
                          <div className="space-y-3.5 pt-2">
                            {/* Ticket Class */}
                            <div className="flex items-center justify-between text-xs.5 font-bold">
                              <span className="text-slate-500 dark:text-slate-400">{isVi ? "Loại vé" : "Ticket class"}</span>
                              <span className="text-slate-800 dark:text-slate-100 font-extrabold">{activeTicket.name}</span>
                            </div>

                            {/* Ticket Quantity Stepper */}
                            <div className="flex items-center justify-between text-xs.5 font-bold">
                              <span className="text-slate-500 dark:text-slate-400">{isVi ? "Số lượng" : "Quantity"}</span>
                              
                              {/* Interactive Swappable Stepper capsule */}
                              <div className="flex items-center border border-gray-200 dark:border-slate-800 rounded-xl px-1 py-0.5 bg-white dark:bg-slate-950">
                                <button 
                                  onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                                  className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-[#3B52FF] dark:hover:text-white font-bold text-base transition-colors bg-transparent border-none cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className="px-3.5 font-sans font-extrabold text-[12.5px] text-slate-900 dark:text-white min-w-6 text-center">
                                  {ticketQuantity}
                                </span>
                                <button 
                                  onClick={() => setTicketQuantity(ticketQuantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-[#3B52FF] dark:hover:text-white font-bold text-base transition-colors bg-transparent border-none cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Seat Selection info */}
                            <div className="flex items-center justify-between text-xs.5 font-bold pb-1">
                              <span className="text-slate-500 dark:text-slate-400">{isVi ? "Ghế" : "Seat"}</span>
                              <span className="text-slate-405 dark:text-slate-450 font-medium">{isVi ? "Chọn sau" : "Select later"}</span>
                            </div>

                            {/* subtle horizontal boundary ruler */}
                            <div className="border-t border-gray-150/65 dark:border-slate-800/80" />

                            {/* Provisional Sum sub-total */}
                            <div className="flex items-center justify-between text-xs.5 font-bold">
                              <span className="text-slate-500 dark:text-slate-400">{isVi ? "Tạm tính" : "Sub-total"}</span>
                              <span className="text-slate-800 dark:text-slate-205 font-extrabold">
                                {totalAmount.toLocaleString('vi-VN')} VNĐ
                              </span>
                            </div>

                            {/* Final Total row */}
                            <div className="flex items-center justify-between text-[13.5px] pt-1">
                              <span className="font-extrabold text-slate-900 dark:text-white">{isVi ? "Tổng tiền" : "Total amount"}</span>
                              <span className="text-xl sm:text-2xl font-black text-[#3C53FF] dark:text-[#7C8CFF]">
                                {totalAmount.toLocaleString('vi-VN')} VNĐ
                              </span>
                            </div>
                          </div>

                          {/* Soft blue credentials info box */}
                          <div className="p-4 rounded-2xl bg-[#ECEFFF]/60 dark:bg-[#5B6CFF]/8 border border-[#5B6CFF]/15 flex items-start gap-3.5 text-left transition-all">
                            <ShieldCheck className="w-5 h-5 text-[#3C53FF] dark:text-[#7C8CFF] shrink-0 mt-0.5" />
                            <p className="text-[11.5px] sm:text-[12px] text-slate-650 dark:text-gray-300 font-semibold leading-relaxed">
                              {isVi 
                                ? "Vé của bạn sẽ được phát hành dưới dạng thực chứng số và lưu trong ví Identra." 
                                : "Your ticket will be issued as a digital credential and securely saved in your Identra wallet."}
                            </p>
                          </div>
                        </div>

                        {/* Main Drive CTA primary button */}
                        <button
                          onClick={() => {
                            setConcertCheckoutActive(true);
                          }}
                          className="w-full h-11.5 rounded-2xl bg-[#3B52FF] hover:bg-[#2C41EB] dark:bg-[#7C8CFF] text-white dark:text-slate-950 font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/10 active:scale-98 border-none mt-2"
                        >
                          <span>{isVi ? "Thanh toán" : "Checkout"}</span>
                        </button>
                      </div>
                    )
                  ) : (
                    /* NORMAL AD CARD WITH CTA DRIVERS */
                    <div className="flex-1 flex flex-col justify-between space-y-5">
                      
                      {/* Premium wallet illustration container */}
                      <div className="relative bg-gradient-to-tr from-[#ECEFFF] to-blue-50/10 dark:from-slate-900/60 dark:to-slate-950/20 border border-[#3B52FF]/10 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center overflow-hidden min-h-[140px] shadow-sm select-none">
                        
                        {/* Dot pattern matrix inside */}
                        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3c53ff_1px,transparent_1px)] [background-size:12px_12px]" />

                        {/* Visual mockup layered element representation */}
                        <div className="relative flex items-center justify-center z-10 w-20 h-20">
                          {/* Wallet cover overlay */}
                          <div className="absolute w-[68px] h-[48px] bg-[#3B52FF] dark:bg-blue-650 rounded-xl shadow-lg flex items-center justify-end pr-2 text-white transform -rotate-12 translate-x-[-8px] border border-blue-400/20">
                            {/* Visual strip or chip representation */}
                            <div className="w-1 h-3.5 bg-amber-400 rounded-xs mr-1 opacity-70" />
                            <div className="w-3 h-3 bg-white/20 rounded-full" />
                          </div>
                          
                          {/* Top Card peeking up */}
                          <div className="absolute w-[65px] h-[44px] bg-slate-50 dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 flex flex-col justify-between p-1.5 transform rotate-6 translate-y-[-14px] translate-x-[10px] overflow-hidden">
                            <div className="flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-emerald-500" />
                              <div className="w-6 h-0.5 bg-gray-300 dark:bg-slate-600 rounded" />
                            </div>
                            <div className="space-y-0.5">
                              <div className="w-8 h-1 bg-[#3B52FF]/60 rounded" />
                              <div className="w-5 h-0.5 bg-gray-300 dark:bg-slate-600 rounded" />
                            </div>
                          </div>

                          {/* Float Sparkles around logo */}
                          <div className="absolute top-1 right-1 text-amber-400 animate-bounce">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Header message block */}
                      <div className="space-y-1.5 text-left">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug tracking-tight">
                          {isVi ? "Bạn có thể điền nhanh biểu mẫu này bằng " : "Fill this profile instantly using "}
                          <span className="text-[#3B52FF] dark:text-[#7C8CFF] font-black">{isVi ? "ví Identra." : "Identra wallet."}</span>
                        </h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                          {isVi ? "Giải pháp đột phá tự động thu thập và đối soát thực chứng danh tính số toàn vẹn, bảo vệ quyền riêng tư cá nhân của bạn." : "Avoid entering everything manually. Enjoy zero-error claims mapping with high privacy encryption."}
                        </p>
                      </div>

                      {/* Highlighted bullets listed with exquisite check circles */}
                      <div className="space-y-3 pt-1 text-left">
                        
                        {/* Bullet 1 */}
                        <div className="flex items-start gap-2.5">
                          <div className="w-6.5 h-6.5 rounded-full bg-[#EBF0FF] dark:bg-slate-800 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center shrink-0 border border-[#3B52FF]/8">
                            <Zap className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold text-slate-800 dark:text-gray-200 leading-none">
                              {isVi ? "Tiết kiệm thời gian" : "Exceptional Speed"}
                            </p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-450 leading-relaxed max-w-xs">
                              {isVi ? "Tự động điền các thông tin đã được xác minh trong ví." : "Automatically stream and populate claims from standard wallet nodes."}
                            </p>
                          </div>
                        </div>

                        {/* Bullet 2 */}
                        <div className="flex items-start gap-2.5">
                          <div className="w-6.5 h-6.5 rounded-full bg-[#E1F9EB] dark:bg-emerald-500/10 text-[#22C55E] flex items-center justify-center shrink-0 border border-[#22C55E]/8">
                            <ShieldCheck className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold text-slate-800 dark:text-gray-200 leading-none">
                              {isVi ? "Chính xác & đáng tin cậy" : "Mathematical Authenticity"}
                            </p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-450 leading-relaxed max-w-xs">
                              {isVi ? "Thông tin đến từ các tổ chức phát hành uy tín." : "Data holds cryptography signatures authorized by public sovereign registries."}
                            </p>
                          </div>
                        </div>

                        {/* Bullet 3 */}
                        <div className="flex items-start gap-2.5">
                          <div className="w-6.5 h-6.5 rounded-full bg-amber-55/15 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/8">
                            <Lock className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold text-slate-800 dark:text-gray-200 leading-none">
                              {isVi ? "Giữ quyền kiểm soát" : "Full Sovereignty"}
                            </p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-450 leading-relaxed max-w-xs">
                              {isVi ? "Bạn luôn được xem trước trước khi chia sẻ." : "Pre-review claims manifest and decide what is transferred."}
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Main Drive Action Buttons */}
                      <div className="space-y-2 pt-2 w-full">
                        <button
                          onClick={() => setShowIdentraQR(true)}
                          className="w-full h-[45px] rounded-xl bg-[#3B52FF] hover:bg-[#2C41EB] dark:bg-[#7C8CFF] text-white dark:text-slate-950 font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/10 hover:shadow-blue-500/15 active:scale-98 border-none"
                        >
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor"/>
                            <path d="M3 10H21" stroke="currentColor" strokeWidth="2.2" />
                          </svg>
                          <span>
                            {selectedScenarioIdx === 1 
                              ? (isVi ? "Ứng tuyển với Identra" : "Apply with Identra")
                              : (isVi ? "Điền bằng Identra" : "Fill with Identra")
                            }
                          </span>
                        </button>

                        <button
                          onClick={handleManualFill}
                          className="w-full h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:border-slate-350 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          <span>
                            {selectedScenarioIdx === 1
                              ? (isVi ? "Bạn có thể tải lên CV ở đây" : "You can upload CV here")
                              : (isVi ? "Nhập thủ công" : "Manual Fill Entry")
                            }
                          </span>
                        </button>

                      </div>

                    </div>
                  )}

                </div>
              </div>
            )}

            {/* STEP 3: CRYPTOGRAPHIC VERIFICATION PANEL */}
            {bankStep === 3 && (
              selectedScenarioIdx === 1 ? (
                /* CUSTOM JOB AUDIT & RECRUITMENT VERIFICATION STEP 3/4 */
                <div className="relative z-10 text-left space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-[#7C8CFF] flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <span className="text-[14px] font-extrabold text-slate-650 dark:text-slate-350">{isVi ? "Ứng tuyển Backend Developer - NovaTech" : "Apply Backend Developer - NovaTech"}</span>
                    <div className="px-2.5 py-0.5 rounded-full bg-[#EBF0FF] dark:bg-blue-500/10 text-[#3C53FF] dark:text-[#7C8CFF] text-[10px] font-black uppercase tracking-wider ml-auto">
                      {isVi ? "Bước 3/4" : "Step 3/4"}
                    </div>
                  </div>

                  <div className="max-w-2xl bg-indigo-50/50 dark:bg-slate-900/60 border border-indigo-100/45 dark:border-slate-800 p-4 rounded-xl flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4.5 h-4.5 shrink-0 stroke-[2.5]" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-extrabold text-slate-800 dark:text-white leading-tight">
                        {isVi ? "NovaTech đã nhận được hồ sơ ứng tuyển của bạn." : "NovaTech has received your candidacy profile."}
                      </h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                        {isVi 
                          ? "Hệ thống đang tiến hành đối chuẩn các thuộc tính chứng chỉ số công nghệ, bằng cấp đại học và lịch sử kinh nghiệm tự chủ ký số." 
                          : "The recruitment engine is now verifying your cryptographic university degree, active engineering certificates, and career history proofs."}
                      </p>
                    </div>
                  </div>

                  {/* 2-Column Split: Hồ sơ đã nhận & Checklist */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-1">
                    {/* Left Column: Hồ sơ đã nhận lists */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 shadow-sm space-y-4 max-h-[380px] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800/80 pb-2">
                          <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-wider uppercase flex items-center gap-1.5">
                            <span className="w-1 bg-[#3B52FF] h-3.5 rounded-sm" />
                            {isVi ? "HỒ SƠ ỨNG VIÊN ĐÃ NHẬN" : "CANDIDATE DOSSIER RECEIVED"}
                          </h3>
                        </div>

                        {/* Block 1: Thong tin ung vien */}
                        <div className="space-y-1 text-[11.5px]">
                          <h4 className="text-[10px] font-black text-[#3B52FF] dark:text-[#7C8CFF] uppercase tracking-wider">{isVi ? "Thông tin ứng viên" : "Personal Particulars"}</h4>
                          <div className="grid grid-cols-12 gap-y-1 font-semibold text-slate-650 dark:text-slate-350">
                            <div className="col-span-4 text-slate-400 dark:text-slate-500 font-medium">{isVi ? "Họ và Tên:" : "Full Name:"}</div>
                            <div className="col-span-8 text-slate-800 dark:text-white font-extrabold">Nguyễn Minh Anh</div>
                            <div className="col-span-4 text-slate-400 dark:text-slate-500 font-medium">{isVi ? "Thư điện tử:" : "Email Address:"}</div>
                            <div className="col-span-8 text-slate-800 dark:text-white font-extrabold">minh.anh@example.com</div>
                          </div>
                        </div>

                        {/* Block 2: Bang cap */}
                        <div className="space-y-1 text-[11.5px] border-t border-dashed border-gray-150 dark:border-slate-800/80 pt-3">
                          <h4 className="text-[10px] font-black text-[#3B52FF] dark:text-[#7C8CFF] uppercase tracking-wider">{isVi ? "Bằng cấp" : "Academic Degree"}</h4>
                          <div className="grid grid-cols-12 gap-y-1 font-semibold text-slate-650 dark:text-slate-350">
                            <div className="col-span-4 text-slate-400 dark:text-slate-500 font-medium">{isVi ? "Chuyên ngành:" : "Major field:"}</div>
                            <div className="col-span-8 text-slate-800 dark:text-white font-extrabold">{isVi ? "Khoa học Máy tính" : "Computer Science"}</div>
                            <div className="col-span-4 text-slate-400 dark:text-slate-500 font-medium">{isVi ? "Học vị:" : "Degree obtained:"}</div>
                            <div className="col-span-8 text-slate-800 dark:text-white font-extrabold">{isVi ? "Cử nhân" : "Bachelor of Science"}</div>
                            <div className="col-span-4 text-slate-400 dark:text-slate-500 font-medium">{isVi ? "Cấp bởi:" : "Issued by:"}</div>
                            <div className="col-span-8 text-[#3B52FF] dark:text-[#7C8CFF] font-extrabold">{isVi ? "Đại học Quốc gia Demo" : "National Demo University"}</div>
                          </div>
                        </div>

                        {/* Block 3: Chung chi */}
                        <div className="space-y-2 border-t border-dashed border-gray-150 dark:border-slate-800/80 pt-3 text-[11.5px]">
                          <h4 className="text-[10px] font-black text-[#3B52FF] dark:text-[#7C8CFF] uppercase tracking-wider">{isVi ? "Chứng chỉ" : "Professional Certificates"}</h4>
                          
                          <div className="space-y-1 border-l-2 border-slate-100 dark:border-slate-800 pl-2">
                             <div className="grid grid-cols-12 gap-y-0.5 font-semibold text-slate-650 dark:text-slate-350">
                              <div className="col-span-4 text-slate-400 dark:text-slate-400 font-medium">{isVi ? "Chứng chỉ:" : "Title:"}</div>
                              <div className="col-span-8 text-slate-800 dark:text-white font-extrabold">Backend Engineering Certificate</div>
                              <div className="col-span-4 text-slate-400 dark:text-slate-400 font-medium">{isVi ? "Cấp bởi:" : "Issuer:"}</div>
                              <div className="col-span-8 text-slate-500 dark:text-slate-400">Identra Academy Demo</div>
                            </div>
                          </div>

                          <div className="space-y-1 border-l-2 border-slate-100 dark:border-slate-800 pl-2 mt-2">
                             <div className="grid grid-cols-12 gap-y-0.5 font-semibold text-slate-650 dark:text-slate-350">
                              <div className="col-span-4 text-slate-400 dark:text-slate-400 font-medium">{isVi ? "Chứng chỉ:" : "Title:"}</div>
                              <div className="col-span-8 text-slate-800 dark:text-white font-extrabold">AWS cloud</div>
                              <div className="col-span-4 text-slate-400 dark:text-slate-400 font-medium">{isVi ? "Cấp bởi:" : "Issuer:"}</div>
                              <div className="col-span-8 text-slate-500 dark:text-slate-400">AWS Education</div>
                            </div>
                          </div>
                        </div>

                        {/* Block 4: Kinh nghiem */}
                        <div className="space-y-2 border-t border-dashed border-gray-150 dark:border-slate-800/80 pt-3 text-[11.5px]">
                          <h4 className="text-[10px] font-black text-[#3B52FF] dark:text-[#7C8CFF] uppercase tracking-wider">{isVi ? "Kinh nghiệm" : "Employment Career History"}</h4>
                          
                          <div className="space-y-1 border-l-2 border-slate-100 dark:border-slate-800 pl-2">
                             <div className="grid grid-cols-12 gap-y-0.5 font-semibold text-slate-650 dark:text-slate-350">
                              <div className="col-span-4 text-slate-400 dark:text-slate-400 font-medium">{isVi ? "Vai trò:" : "Role:"}</div>
                              <div className="col-span-8 text-slate-800 dark:text-white font-extrabold">Backend Developer</div>
                              <div className="col-span-4 text-slate-400 dark:text-slate-400 font-medium">{isVi ? "Công ty:" : "Company:"}</div>
                              <div className="col-span-8 text-slate-500 dark:text-slate-400">{isVi ? "Công nghệ Demo" : "Demo Technology"}</div>
                              <div className="col-span-4 text-slate-400 dark:text-slate-400 font-medium">{isVi ? "Thời gian:" : "Term:"}</div>
                              <div className="col-span-8 text-slate-800 dark:text-white font-bold">2022–2025</div>
                            </div>
                          </div>

                          <div className="space-y-1 border-l-2 border-slate-100 dark:border-slate-800 pl-2 mt-2">
                             <div className="grid grid-cols-12 gap-y-0.5 font-semibold text-slate-650 dark:text-slate-350">
                              <div className="col-span-4 text-slate-400 dark:text-slate-400 font-medium">{isVi ? "Vai trò:" : "Role:"}</div>
                              <div className="col-span-8 text-slate-800 dark:text-white font-extrabold">Backend Developer</div>
                              <div className="col-span-4 text-slate-400 dark:text-slate-400 font-medium">{isVi ? "Công ty:" : "Company:"}</div>
                              <div className="col-span-8 text-slate-500 dark:text-slate-400">{isVi ? "Công nghệ ACD" : "ACD Technology"}</div>
                              <div className="col-span-4 text-slate-400 dark:text-slate-400 font-medium">{isVi ? "Thời gian:" : "Term:"}</div>
                              <div className="col-span-8 text-slate-800 dark:text-white font-bold">2025–2026</div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Right Column: Verification checklist */}
                    <div className="lg:col-span-5 h-full flex flex-col justify-between space-y-4">
                      <div className="p-5 rounded-2xl bg-[#ECEFFF]/40 dark:bg-slate-900/40 border border-[#3B52FF]/10 space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-150 dark:border-slate-800/80 pb-2">
                          <h4 className="text-[10px] font-black text-slate-400 tracking-wider uppercase leading-none">{isVi ? "Trạng thái thẩm định" : "Verification state"}</h4>
                          <span className="text-[8.5px] font-black text-xs uppercase text-slate-500">
                            {fillType === 'identra' ? (isVi ? "Qua Identra" : "Via Identra") : (isVi ? "Thủ công" : "Manual")}
                          </span>
                        </div>

                        {/* List 5 Progress Checks */}
                        {[
                          {
                            titleVi: "1. Kiểm tra chữ ký thực chứng bằng cấp",
                            titleEn: "1. Check degree proof crypto-signature",
                            stepIdx: 0,
                          },
                          {
                            titleVi: "2. Kiểm tra tổ chức phát hành",
                            titleEn: "2. Verify issuing organization authenticity",
                            stepIdx: 1,
                          },
                          {
                            titleVi: "3. Kiểm tra chứng chỉ còn hiệu lực",
                            titleEn: "3. Verify active certificates validity term",
                            stepIdx: 2,
                          },
                          {
                            titleVi: "4. Kiểm tra trạng thái thu hồi",
                            titleEn: "4. Assert real-time ledger revocation register",
                            stepIdx: 3,
                          },
                          {
                            titleVi: "5. Hồ sơ hợp lệ",
                            titleEn: "5. Candidacy profile compliant and valid",
                            stepIdx: 4,
                          },
                        ].map((item, index) => {
                          const progressValue = jobVerProgressArray[index];
                          const isChecking = currentJobVerIdx === index && progressValue < 100;
                          const isFinished = progressValue >= 100;

                          return (
                            <div 
                              key={index}
                              className="flex flex-col p-2.5 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-100 dark:border-slate-850/80 transition-all duration-300 gap-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {isFinished ? (
                                    fillType === 'identra' ? (
                                      <Check className="w-4 h-4 text-emerald-500 stroke-[3] shrink-0" />
                                    ) : (
                                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                                    )
                                  ) : isChecking ? (
                                    <Loader2 className="w-4 h-4 text-[#3B52FF] dark:text-[#7C8CFF] animate-spin shrink-0" />
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-slate-205 dark:border-slate-800 bg-transparent shrink-0" />
                                  )}
                                  <span className={`${isFinished ? 'text-slate-700 dark:text-slate-350' : isChecking ? 'text-slate-900 dark:text-white font-extrabold' : 'text-slate-400 dark:text-slate-550'} text-[11px] font-bold transition-colors duration-305`}>
                                    {isVi ? item.titleVi : item.titleEn}
                                  </span>
                                </div>

                                {/* Badge status */}
                                {isFinished ? (
                                  fillType === 'identra' ? (
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/10">
                                      Verified
                                    </span>
                                  ) : (
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/10">
                                      Unverified
                                    </span>
                                  )
                                ) : isChecking ? (
                                  <span className="text-[9px] font-mono font-black text-[#3B52FF] dark:text-[#7C8CFF] animate-pulse">
                                    {progressValue}%
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-bold text-slate-350 dark:text-slate-650">
                                    {isVi ? "Chờ..." : "Pending"}
                                  </span>
                                )}
                              </div>

                              {/* Progress bar line */}
                              {isChecking && (
                                <div className="w-full h-1 bg-slate-100 dark:bg-slate-850 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-blue-500 to-[#3B52FF] transition-all duration-100" 
                                    style={{ width: `${progressValue}%` }}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Shield confirmation dynamic panel */}
                      {jobVerProgressArray[4] < 100 ? (
                        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3 animate-pulse">
                          <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                            <Loader2 className="w-3 h-3 animate-spin" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs font-black text-amber-600 dark:text-amber-400">
                              {isVi ? "Đang chạy đối chuẩn an toàn..." : "Processing dynamic proofs compliance..."}
                            </p>
                            <p className="text-[10.5px] text-gray-500 dark:text-gray-400 leading-normal">
                              {isVi 
                                ? "Vui lòng giữ kết nối trong khi hệ thống xác thực phi tập trung kiểm tra danh tính." 
                                : "Querying cryptographic issuer key states against our decentralized anchor database."}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className={`p-4 rounded-xl border flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                          fillType === 'identra' 
                            ? 'bg-emerald-500/5 border-emerald-500/20' 
                            : 'bg-amber-500/5 border-amber-500/20'
                        }`}>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            fillType === 'identra' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                          }`}>
                            {fillType === 'identra' ? (
                              <Check className="w-3 h-3 stroke-[3]" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5" />
                            )}
                          </div>
                          <div className="space-y-0.5">
                            <p className={`text-xs font-black ${fillType === 'identra' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                              {fillType === 'identra' 
                                ? (isVi ? "Hồ sơ hợp lệ và tự động đạt!" : "Candidacy Validated Automatically!")
                                : (isVi ? "Hồ sơ chứa chứng chỉ Chưa Đối Soát!" : "Dossier includes Unverified elements!")
                              }
                            </p>
                            <p className="text-[10.5px] text-gray-500 dark:text-gray-400 leading-normal">
                              {fillType === 'identra' 
                                ? (isVi ? "100% bằng Đại học và Chứng chỉ đều hợp lệ và được ký số. Bạn sẽ chuyển tới cổng xác minh thành công." : "All degree certifications and qualifications are signed & certified. Ready to confirm application!")
                                : (isVi ? "Các chứng thư PDF không mang chữ ký mật mã. NovaTech yêu cầu hậu kiểm thủ công (3-5 ngày làm việc)." : "Missing cryptographic seals for qualifications. Manual verifications required by the HR operations team.")
                              }
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : selectedScenarioIdx === 2 ? (
                /* CUSTOM CONCERT TICKET PAYMENT AND ISSUE PANEL STEP 3/4 */
                <div className="relative z-10 text-left space-y-5 animate-in fade-in duration-300">
                  {/* Header Row */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-[#7C8CFF] flex items-center justify-center">
                      <Ticket className="w-4 h-4" />
                    </div>
                    <span className="text-[14px] font-extrabold text-slate-650 dark:text-slate-350">
                      {isVi ? "Mua vé xem biểu diễn ca nhạc" : "Buy Concert Tickets"}
                    </span>
                    <div className="px-2.5 py-0.5 rounded-full bg-[#EBF0FF] dark:bg-blue-500/10 text-[#3C53FF] dark:text-[#7C8CFF] text-[10px] font-black uppercase tracking-wider ml-auto">
                      {isVi ? "Bước 3/4" : "Step 3/4"}
                    </div>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-1">
                    
                    {/* Left Column: Highly styled ticket and confirmation status */}
                    <div className="lg:col-span-7 flex flex-col justify-start">
                      <div className="relative w-full rounded-3xl bg-gradient-to-tr from-[#0B0A26] via-[#120F43] to-[#0A0923] text-white p-6 shadow-2xl flex flex-col justify-between overflow-hidden border border-indigo-900/60 transition-transform hover:scale-[1.01] duration-300 font-sans text-left">
                        
                        {/* Decorative cosmic blurs */}
                        <div className="absolute -right-16 -top-16 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
                        
                        {/* Notched tickets cut-out simulation inside the card edges */}
                        <div className="absolute right-[88px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FAFAFC] dark:bg-[#090D1A] -mr-2 z-10" />
                        <div className="absolute left-[88px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FAFAFC] dark:bg-[#090D1A] -ml-2 z-10" />

                        {/* Top section: Ticket name and type */}
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-[10px] font-black tracking-widest uppercase text-indigo-300">LIVE CONCERT 2027</p>
                            <div className="flex items-center gap-2 mt-2 text-slate-400 text-xs">
                              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                              <span className="font-semibold text-[10.5px]">15/08/2027 ({isVi ? "Thứ Bảy" : "Saturday"}) - 19:00</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-slate-400 text-xs">
                              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                              <span className="font-semibold text-[10.5px]">{isVi ? "Sân vận động Mỹ Đình, Hà Nội" : "My Dinh National Stadium, Hanoi"}</span>
                            </div>
                          </div>
                          
                          {/* Rich Badge VIP */}
                          <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600/35 to-indigo-600/35 text-indigo-200 font-black px-3.5 py-1.5 rounded-full border border-indigo-500/35 text-[10.5px]">
                            <svg className="w-3.5 h-3.5 text-indigo-300" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span>VIP</span>
                          </div>
                        </div>

                        {/* Styled Dashed divider with nice layout gap */}
                        <div className="relative py-4 my-2">
                          <div className="border-t border-dashed border-white/20" />
                        </div>

                        {/* Middle section: Seats & Details */}
                        <div className="grid grid-cols-4 gap-4 text-left">
                          <div>
                            <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-1">{isVi ? "Khu vực" : "Zone"}</p>
                            <p className="text-white text-xs font-black truncate">{isVi ? "Tầng 1 - Khu VIP" : "Level 1 - VIP Area"}</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-1">{isVi ? "Hạng" : "Class"}</p>
                            <p className="text-white text-xs font-black">A</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-1">{isVi ? "Ghế" : "Seat"}</p>
                            <p className="text-white text-xs font-black">12</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase font-bold text-slate-700 dark:text-slate-500 tracking-wider mb-1">Credential ID</p>
                            <div className="flex items-center gap-1">
                              <p className="text-indigo-300 text-xs font-black font-mono tracking-tight select-all truncate">TICKET-2027-000123</p>
                              <button 
                                onClick={() => {
                                  try {
                                    navigator.clipboard.writeText("TICKET-2027-000123");
                                  } catch (err) {}
                                  showLocalToast(isVi ? "Đã sao chép Credential ID!" : "Copied Credential ID!");
                                }}
                                className="text-slate-400 hover:text-white transition-colors p-0.5 bg-transparent border-none cursor-pointer inline-flex items-center"
                                title={isVi ? "Sao chép" : "Copy ID"}
                              >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Subtle divider line above issuer row */}
                        <div className="border-t border-white/5 my-4" />

                        {/* Bottom Section: Issuer & Issue Date */}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black uppercase text-slate-550 dark:text-slate-500 tracking-wider">{isVi ? "Tổ Chức Phát Hành" : "Credential Issuer"}</span>
                            <div className="flex items-center gap-1.5 mt-1.5">
                              {/* SSI circular small logo avatar */}
                              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center font-black text-[9px] text-white">N</div>
                              <span className="text-white text-[11px] font-black">{isVi ? "Live Concert Organization" : "Live Concert Organization"}</span>
                              {/* Small verified icon circle */}
                              <div className="w-3.5 h-3.5 bg-blue-500 text-white rounded-full flex items-center justify-center">
                                <Check className="w-2 h-2 stroke-[3.5]" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col text-right">
                            <span className="text-[8px] font-black uppercase text-slate-550 dark:text-slate-500 tracking-wider">{isVi ? "Ngày phát hành" : "Date Issued"}</span>
                            <span className="text-slate-300 text-[10.5px] font-bold mt-1.5">20/05/2027 - 14:32</span>
                          </div>
                        </div>

                      </div>

                      {/* Removed Verified Badge & Left Info box per focus layout selection */}

                    </div>

                    {/* Right Column: Checkout Order Payment */}
                    <div 
                      className="lg:col-span-5 space-y-5 text-left overflow-y-auto pr-2 scrollbar-thin scroll-smooth"
                      style={{ maxHeight: '380px', overflowY: 'auto' }}
                    >
                      
                      {/* Checkout Header and Price Block */}
                      <div className="space-y-2">
                        <h3 className="text-slate-900 dark:text-white font-black text-sm tracking-tight uppercase border-b border-gray-100 dark:border-slate-800 pb-1.5">
                          {isVi ? "Thanh toán đơn hàng" : "Order Payment Details"}
                        </h3>
                        
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-slate-550 dark:text-slate-450 font-bold text-xs opacity-90">
                            {isVi ? "Số tiền cần thanh toán" : "Total amount due"}
                          </span>
                          
                          {/* Timer Countdown Badge */}
                          <div className="flex flex-col items-end">
                            <div className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-450 text-[10.5px] font-black tracking-wider flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 stroke-[2.5]" />
                              <span>{Math.floor(concertPaymentTimer / 60)}:{(concertPaymentTimer % 60) < 10 ? '0' : ''}{concertPaymentTimer % 60}</span>
                            </div>
                            <span className="text-[8.5px] font-bold text-slate-400">{isVi ? "Mã sẽ hết hạn sau" : "Code will expire in"}</span>
                          </div>
                        </div>

                        {/* Big display of total price */}
                        <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-indigo-400 tracking-tight leading-none">
                          {totalAmount.toLocaleString('vi-VN')} VNĐ
                        </div>
                      </div>

                      {/* Main VetQR payment card block */}
                      <div className="p-5 rounded-2xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm flex flex-col items-center text-center space-y-4 relative overflow-hidden group">
                        
                        <div className="space-y-1">
                          <h4 className="text-[12.5px] font-black text-slate-800 dark:text-white tracking-wide leading-none">
                            {isVi ? "Quét mã QR để thanh toán" : "Scan QR code to pay"}
                          </h4>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal max-w-[280px] mx-auto font-medium">
                            {isVi 
                              ? "Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét mã và thanh toán." 
                              : "Use banking apps or e-wallets to scan the code and settle the transaction instantly."}
                          </p>
                        </div>

                        {/* Interactive scanning container box with VIETQR style */}
                        <div className="relative p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 w-full max-w-[220px] aspect-square flex flex-col justify-between items-center group-hover:scale-102 transition-transform duration-300">
                          
                          {/* Top row VietQR emblem bar snippet */}
                          <div className="flex items-center justify-between w-full text-[9px] font-black font-sans px-1 text-slate-650">
                            <span className="text-emerald-500 dark:text-emerald-400">viet<span className="text-rose-500 font-extrabold">QR</span></span>
                            <span className="text-blue-600 dark:text-blue-400 font-bold italic tracking-wide">napas<span className="text-slate-400 font-medium">247</span></span>
                          </div>

                          {/* The SVG QR code representer */}
                          <div className="w-[130px] h-[130px] flex items-center justify-center p-0.5 relative">
                            {/* Scanning horizontal line effect for active/unpaid QR */}
                            {!isConcertPaid && (
                              <div className="absolute left-1 right-1 h-0.5 bg-indigo-500/80 shadow-[0_0_6px_rgba(99,102,241,0.85)] animate-bounce pointer-events-none z-20" style={{ top: '35%' }} />
                            )}

                            <svg className={`w-full h-full text-slate-800 dark:text-white transition-opacity duration-300 ${isConcertPaid ? 'opacity-10' : 'opacity-100'}`} viewBox="0 0 100 100" fill="currentColor">
                              {/* Top Left Anchor */}
                              <path d="M5,5 h25 v25 h-25 z M10,10 h15 v15 h-15 z M15,15 h5 v5 h-5 z" />
                              {/* Top Right Anchor */}
                              <path d="M70,5 h25 v25 h-25 z M75,10 h15 v15 h-15 z M80,15 h5 v5 h-5 z" />
                              {/* Bottom Left Anchor */}
                              <path d="M5,70 h25 v25 h-25 z M10,75 h15 v15 h-15 z M15,80 h5 v5 h-5 z" />
                              {/* Patterns */}
                              <path d="M35,5 h5 v5 h-5 z M45,5 h10 v5 h-10 z M60,5 h5 v5 h-5 z" />
                              <path d="M35,15 h10 v5 h-10 z M50,10 h5 v10 h-5 z M60,15 h5 v5 h-5 z" />
                              <path d="M35,25 h5 v5 h-5 z M45,25 h5 v5 h-5 z M55,20 h10 v5 h-10 z" />
                              <path d="M5,35 h5 v10 h-5 z M15,35 h15 v5 h-15 z M10,45 h5 v5 h-5 z M25,45 h5 v5 h-5 z" />
                              <path d="M35,35 h10 v10 h-10 z M50,35 h10 v5 h-10 z M65,35 h15 v5 h-15 z" />
                              <path d="M5,50 h10 v5 h-10 z M20,50 h5 v5 h-5 z M30,50 h15 v5 h-15 z" />
                              <path d="M50,45 h5 v15 h-5 z M60,50 h15 v5 h-15 z M80,45 h15 v5 h-15 z" />
                              <path d="M5,60 h10 v5 h-10 z M20,60 h5 v5 h-5 z M30,60 h5 v5 h-5 z" />
                              <path d="M60,60 h10 v5 h-10 z M75,60 h5 v5 h-5 z M85,55 h10 v10 h-10 z" />
                              <path d="M35,70 h15 v5 h-15 z M55,70 h10 v5 h-10 z M75,70 h10 v5 h-10 z" />
                              <path d="M35,80 h5 v15 h-5 z M45,80 h15 v5 h-15 z M65,80 h5 v5 h-5 z M75,80 h15 v15 h-15 z" />
                              <path d="M35,90 h10 v5 h-10 z M55,90 h15 v5 h-15 z" />
                            </svg>

                            {/* Center payment logo mark */}
                            {!isConcertPaid && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center border border-white text-white">
                                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16V5" />
                                  </svg>
                                </div>
                              </div>
                            )}

                            {/* Payment Completed success circle banner check overlay */}
                            {isConcertPaid && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-500 bg-transparent animate-in zoom-in duration-300">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 border border-emerald-505/25 animate-bounce">
                                  <Check className="w-7 h-7 stroke-[3.5]" />
                                </div>
                                <span className="text-[11px] font-black block mt-2 text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{isVi ? "Đã Thanh Toán!" : "Paid Successful!"}</span>
                              </div>
                            )}
                          </div>

                          {/* Quick simulated click-action overlay */}
                          {!isConcertPaid && (
                            <div 
                              onClick={() => {
                                setIsConcertPaid(true);
                                // Chime/Vibrate
                                try {
                                  const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
                                  if (AudioCtxClass) {
                                    const audioCtx = new AudioCtxClass();
                                    const oscillator = audioCtx.createOscillator();
                                    const gainNode = audioCtx.createGain();
                            
                                    oscillator.connect(gainNode);
                                    gainNode.connect(audioCtx.destination);
                            
                                    oscillator.type = 'sine';
                                    oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
                                    oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08); // E5
                                    oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.16); // G5
                                    oscillator.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.24); // C6 Note
                            
                                    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
                                    gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.02);
                                    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
                            
                                    oscillator.start(audioCtx.currentTime);
                                    oscillator.stop(audioCtx.currentTime + 0.40);
                                  }
                                } catch (e) {}

                                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                                  try { navigator.vibrate([100, 50, 100]); } catch (e) {}
                                }

                                showLocalToast(isVi ? "Mô phỏng thanh toán hoàn tất! Nút 'Tiếp tục' đã được mở." : "Simulation Payment Complete! Proceed button is now enabled.");
                              }}
                              className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer flex flex-col items-center justify-center p-3 select-none text-white gap-2 text-center rounded-xl"
                            >
                              <div className="w-8 h-8 rounded-full bg-emerald-500/25 flex items-center justify-center text-emerald-400">
                                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                </svg>
                              </div>
                              <p className="text-[10.5px] font-black text-center text-emerald-400 tracking-wider uppercase leading-none">
                                {isVi ? "Giả lập Thanh Toán" : "Simulate Payment"}
                              </p>
                              <p className="text-[8.5px] text-slate-300 font-medium">
                                {isVi ? "Bấm vào để xác nhận đã chuyển khoản" : "Click to complete payment demo"}
                              </p>
                            </div>
                          )}

                          {/* Static Napas branding row at bottom */}
                          <div className="text-[6.5px] uppercase font-black tracking-widest text-slate-400 select-none">
                            NAPAS FAST 247 SERVICE
                          </div>

                        </div>

                        {/* Text separator label "HOAC" or "OR" style */}
                        <div className="flex items-center w-full px-4 text-slate-350 dark:text-slate-650">
                          <div className="flex-1 border-t border-slate-100 dark:border-slate-805" />
                          <span className="px-3 text-[9px] font-black uppercase text-slate-450 dark:text-slate-550 tracking-widest">
                            {isVi ? "HOẶC" : "OR"}
                          </span>
                          <div className="flex-1 border-t border-slate-100 dark:border-slate-805" />
                        </div>

                        {/* Banking Account details block */}
                        <div className="w-full text-[11px] font-semibold space-y-2.5">
                          <div className="flex items-center justify-between p-2 rounded bg-slate-55 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-900">
                            <span className="text-slate-450 font-bold">{isVi ? "Số tài khoản:" : "Account Number:"}</span>
                            <span className="text-slate-800 dark:text-white font-black font-mono select-all flex items-center gap-1.5">
                              1234 5678 9012
                              <button
                                onClick={() => {
                                  try { navigator.clipboard.writeText("123456789012"); } catch (e) {}
                                  showLocalToast(isVi ? "Đã sao chép Số tài khoản!" : "Copied Account Number!");
                                }}
                                className="text-slate-450 hover:text-slate-700 dark:hover:text-white bg-transparent border-none cursor-pointer p-0.5"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                              </button>
                            </span>
                          </div>

                          <div className="flex items-center justify-between p-2 rounded bg-slate-55 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-900">
                            <span className="text-slate-450 font-bold">{isVi ? "Chủ tài khoản:" : "Account Holder:"}</span>
                            <span className="text-slate-800 dark:text-white font-extrabold text-right truncate">LIVE CONCERT ORGANIZATION</span>
                          </div>

                          <div className="flex items-center justify-between p-2 rounded bg-slate-55 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-900">
                            <span className="text-slate-450 font-bold">{isVi ? "Ngân hàng:" : "Bank name:"}</span>
                            <span className="text-slate-800 dark:text-white font-extrabold text-right truncate">Techcombank - CN Hà Nội</span>
                          </div>
                        </div>

                      </div>

                      {/* Info warning box footer */}
                      <div className="p-3 rounded-xl bg-indigo-500/5 dark:bg-slate-950/10 border border-indigo-500/10 flex flex-col gap-1.5 text-left">
                        <div className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-indigo-500/10 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center shrink-0 mt-0.5">
                            <Info className="w-2.5 h-2.5 stroke-[2.5]" />
                          </div>
                          <p className="text-[10px] text-slate-650 dark:text-slate-450 font-medium leading-relaxed">
                            {isVi 
                              ? "Vui lòng không ghi nội dung chuyển khoản. Sau khi thanh toán, hệ thống sẽ tự động xác nhận." 
                              : "Please do not write custom message on bank remarks. The system uses real-time API polling to reconcile payments automatically."}
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              ) : (
                /* DEFAULT BANK CRYPTOGRAPHIC VERIFICATION PANEL */
                <div className="relative z-10 text-left space-y-5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-[#3B52FF] dark:text-[#7C8CFF] flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-[14px] font-extrabold text-slate-650 dark:text-slate-350">
                      {selectedScenarioIdx === 2 
                        ? (isVi ? "Mua vé xem biểu diễn ca nhạc" : "Buy Concert Tickets") 
                        : (isVi ? "Mở tài khoản ngân hàng" : "Open Bank Account")}
                    </span>
                    <div className="px-2.5 py-0.5 rounded-full bg-[#EBF0FF] dark:bg-blue-500/10 text-[#3C53FF] dark:text-[#7C8CFF] text-[10px] font-black uppercase tracking-wider ml-auto">
                      {isVi ? "Bước 3/4" : "Step 3/4"}
                    </div>
                  </div>

                  <div className="max-w-2xl">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {selectedScenarioIdx === 2 
                        ? (isVi ? "Xác minh điều kiện nhận vé concert" : "Ticket criteria verification") 
                        : (isVi ? "Thẩm định dịch vụ đối soát" : "Cryptographic verification")}
                    </h2>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">
                      {selectedScenarioIdx === 2 
                        ? (isVi ? "Hệ thống tự động đối soát mật mã để xác thực độ tuổi hợp lệ (>18 tuổi) từ ví Identra giúp bạn đặt vé nhanh gọn và an toàn." : "The system securely validates zero-knowledge cryptography claims from your Identra wallet for age verification and identity ownership.") 
                        : (isVi ? "Hệ thống tự động sử dụng khoá đăng ký công khai của Cục QLHC Dân cư để xác thực tính toàn vẹn dữ liệu từ ví Identra." : "An Tin decentralized verifier node validates identity signatures using issuer's public keys.")}
                    </p>
                  </div>

                  {/* Audit Checklist Table Card */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
                    <div className="md:col-span-7 space-y-4">
                      <div className="p-5 rounded-2xl bg-[#ECEFFF]/40 dark:bg-slate-900/40 border border-[#3B52FF]/10 space-y-3">
                        <h4 className="text-[10px] font-black text-slate-400 tracking-wider uppercase leading-none">{isVi ? "Kết quả kiểm tra mật mã" : "Mathematical audit logs"}</h4>
                        
                        {/* Item 1 */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-100 dark:border-slate-850/80 transition-all duration-300">
                          <div className="flex items-center gap-2.5">
                            {verificationProgress >= 1 ? (
                              <Check className="w-4 h-4 text-emerald-500 stroke-[3] animate-in zoom-in duration-200 shrink-0" />
                            ) : (
                              <Loader2 className="w-4 h-4 text-[#3B52FF] dark:text-[#7C8CFF] animate-spin shrink-0" />
                            )}
                            <span className={`${verificationProgress >= 1 ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'} text-xs font-bold transition-colors duration-300`}>
                              {isVi ? "Xác minh Chữ ký số Cục QLHC" : "Verify Issuer Government Signature"}
                            </span>
                          </div>
                          <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider transition-colors duration-300 ${verificationProgress >= 1 ? 'text-emerald-500' : 'text-[#3B52FF] animate-pulse'}`}>
                            {verificationProgress >= 1 ? (isVi ? "Hợp Lệ" : "Valid") : (isVi ? "Đang quét..." : "Validating...")}
                          </span>
                        </div>

                        {/* Item 2 */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-100 dark:border-slate-850/80 transition-all duration-300">
                          <div className="flex items-center gap-2.5">
                            {verificationProgress >= 2 ? (
                              <Check className="w-4 h-4 text-emerald-500 stroke-[3] animate-in zoom-in duration-200 shrink-0" />
                            ) : verificationProgress === 1 ? (
                              <Loader2 className="w-4 h-4 text-[#3B52FF] dark:text-[#7C8CFF] animate-spin shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-slate-200 dark:border-slate-800 bg-transparent shrink-0" />
                            )}
                            <span className={`${verificationProgress >= 2 ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'} text-xs font-bold transition-colors duration-300`}>
                              {isVi ? "Đối chuẩn tính toàn vẹn mật mã" : "SHA-256 Hash Code Matching"}
                            </span>
                          </div>
                          <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider transition-colors duration-300 ${verificationProgress >= 2 ? 'text-emerald-500' : verificationProgress === 1 ? 'text-[#3B52FF] animate-pulse' : 'text-slate-350 dark:text-slate-650'}`}>
                            {verificationProgress >= 2 ? (isVi ? "Trùng khớp" : "Matched") : verificationProgress === 1 ? (isVi ? "Đang quét..." : "Validating...") : (isVi ? "Chờ..." : "Pending...")}
                          </span>
                        </div>

                        {/* Item 3 */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-100 dark:border-slate-850/80 transition-all duration-300">
                          <div className="flex items-center gap-2.5">
                            {verificationProgress >= 3 ? (
                              <Check className="w-4 h-4 text-emerald-500 stroke-[3] animate-in zoom-in duration-200 shrink-0" />
                            ) : verificationProgress === 2 ? (
                              <Loader2 className="w-4 h-4 text-[#3B52FF] dark:text-[#7C8CFF] animate-spin shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-slate-200 dark:border-slate-800 bg-transparent shrink-0" />
                            )}
                            <span className={`${verificationProgress >= 3 ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'} text-xs font-bold transition-colors duration-300`}>
                              {isVi ? "Kiểm tra danh sách thu hồi" : "Dynamic Revocation Registry Checking"}
                            </span>
                          </div>
                          <span className={`text-[10px] sm:text-xs font-black uppercase tracking-wider transition-colors duration-300 ${verificationProgress >= 3 ? 'text-emerald-500' : verificationProgress === 2 ? 'text-[#3B52FF] animate-pulse' : 'text-slate-350 dark:text-slate-650'}`}>
                            {verificationProgress >= 3 ? (isVi ? "An toàn" : "Active") : verificationProgress === 2 ? (isVi ? "Đang quét..." : "Validating...") : (isVi ? "Chờ..." : "Pending...")}
                          </span>
                        </div>
                      </div>

                      {/* Shield confirmation banner card */}
                      {verificationProgress < 3 ? (
                        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3 animate-pulse">
                          <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                            <Loader2 className="w-3 h-3 animate-spin" />
                          </div>
                          <div className="space-y-0.5 text-left">
                            <p className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                              {isVi ? "Đang phân tích định chất thực chứng..." : "Analyzing credential proof details..."}
                            </p>
                            <p className="text-[10.5px] text-gray-500 dark:text-gray-405 leading-relaxed">
                              {isVi 
                                ? "Vui lòng giữ kết nối trong khi hệ thống xác thực phi tập trung kiểm tra danh tính và khớp khoá mật mã." 
                                : "Please wait while local verifying nodes parse claims payload structures with zero-knowledge keys."}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <div className="space-y-0.5 text-left">
                            <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                              {selectedScenarioIdx === 2 
                                ? (isVi ? "Thẩm định điều kiện thành công!" : "Criteria verification passed!") 
                                : (isVi ? "Thẩm định thành công!" : "Verification successful!")}
                            </p>
                            <p className="text-[10.5px] text-gray-500 dark:text-gray-450 leading-relaxed">
                              {selectedScenarioIdx === 2 
                                ? (isVi 
                                    ? "Đã xác thực bạn trên 18 tuổi bằng thực chứng số. Bạn có thể chọn Kích hoạt vé để nhận vé concert." 
                                    : "Successfully confirmed age (>18) threshold via zero-knowledge proofs. Click Activate Ticket to receive your concert ticket.")
                                : (isVi 
                                    ? "Mật mã trùng khớp tuyệt đối cơ sở chính phủ. Bạn có thể nhấn Kích hoạt Tài khoản để hoàn tất." 
                                    : "Zero-knowledge mathematical signatures successfully authenticated and matched. Ready to activate.")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-12 lg:col-span-5 space-y-4">
                      {selectedScenarioIdx === 2 ? (
                        /* Highly styled Concert Ticket preview */
                        <div className="relative w-full max-w-[325px] h-[195px] mx-auto rounded-3xl bg-gradient-to-tr from-[#1E1B4B] via-purple-950 to-indigo-950 text-white p-5 shadow-2xl flex flex-col justify-between overflow-hidden border border-indigo-900/60 transition-transform hover:scale-103 duration-300 font-sans text-left opacity-90 select-none">
                          <div className="absolute -right-12 -top-12 w-32 h-32 bg-indigo-500/25 rounded-full blur-2xl pointer-events-none" />
                          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />
                          
                          {/* Ticket tear strip effect via CSS pattern */}
                          <div className="absolute right-16 top-0 bottom-0 border-r-2 border-dashed border-white/20" />
                          <div className="absolute right-[60px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-950 dark:bg-slate-905" />
                          <div className="absolute right-[60px] -top-2 w-4 h-4 rounded-full bg-slate-950 dark:bg-slate-905" />
                          <div className="absolute right-[60px] -bottom-2 w-4 h-4 rounded-full bg-slate-950 dark:bg-slate-905" />

                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-[9px] font-black tracking-widest uppercase text-indigo-300">LIVE CONCERT 2027</p>
                              <p className="text-[7.5px] font-bold tracking-widest uppercase text-emerald-400 mt-1">{isVi ? "VÉ CHỜ KÍCH HOẠT" : "PENDING ACTIVATION"}</p>
                            </div>
                            <span className="text-[10px] bg-indigo-500/30 text-indigo-200 font-black px-2 py-0.5 rounded-full border border-indigo-400/20">{activeTicket.name}</span>
                          </div>

                          <div className="space-y-1">
                            <p className="font-mono text-[14px] tracking-widest text-slate-350">{isVi ? "Số lượng: " : "Qty: "}{ticketQuantity} {isVi ? "Vé" : "Ticket"}</p>
                            <div className="flex items-end justify-between font-mono text-[9px] text-slate-400">
                              <div>
                                <p className="text-[6.5px] uppercase text-slate-500 font-sans tracking-wide leading-none">{isVi ? "Chủ sở hữu" : "TICKET HOLDER"}</p>
                                <p className="text-white font-extrabold uppercase mt-1 tracking-wider">{bankFullName || "NGUYEN MINH ANH"}</p>
                              </div>
                              <div className="text-right pr-6">
                                <p className="text-[6.5px] uppercase text-slate-500 font-sans tracking-wide leading-none">{isVi ? "KHU VỰC" : "ZONE"}</p>
                                <p className="text-emerald-400 font-extrabold mt-1">{isVi ? "Chờ" : "Pending"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Highly styled Bank Card preview */
                        <div className="relative w-full max-w-[325px] h-[195px] mx-auto rounded-2xl bg-gradient-to-tr from-slate-900 via-[#1E293B] to-slate-950 text-white p-5 shadow-2xl flex flex-col justify-between overflow-hidden border border-slate-800 transition-transform hover:scale-103 duration-300 font-sans text-left opacity-80 select-none">
                          <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#3c53ff]/10 rounded-full blur-2xl pointer-events-none" />
                          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-[9.5px] font-black tracking-widest uppercase text-slate-400">AN TIN BANK</p>
                              <p className="text-[7.5px] font-bold tracking-widest uppercase text-slate-500 mt-0.5">{isVi ? "THẺ CHỜ KÍCH HOẠT" : "PENDING ACTIVATION"}</p>
                            </div>
                            <Landmark className="w-4.5 h-4.5 text-slate-600" />
                          </div>

                          <div className="space-y-1">
                            <p className="font-mono text-[14.5px] tracking-widest text-slate-500">•••• •••• •••• ••••</p>
                            <div className="flex items-end justify-between font-mono text-[10px]">
                              <div>
                                <p className="text-[7px] uppercase text-slate-600 font-sans tracking-wide leading-none">{isVi ? "Chủ tài khoản" : "CARD HOLDER"}</p>
                                <p className="text-slate-450 font-extrabold uppercase mt-1 tracking-wider">{bankFullName || "HOÀNG ANH TUẤN"}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[7px] uppercase text-slate-600 font-sans tracking-wide leading-none">VALID THRU</p>
                                <p className="text-slate-450 font-extrabold mt-1">12/31</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}

            {/* STEP 4: SUCCESS REWARDS FINAL SCREEN */}
            {bankStep === 4 && (
              selectedScenarioIdx === 1 ? (
                /* CUSTOM JOB RECRUITMENT SUCCESS STEP 4/4 */
                <div className="relative z-10 text-center py-6 max-w-xl mx-auto space-y-6 animate-in fade-in duration-300">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-550 text-[10px] font-black uppercase tracking-wider border border-indigo-500/20">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>{isVi ? "Ứng tuyển thành công" : "Application Submitted"}</span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {isVi ? "Nộp hồ sơ ứng tuyển thành công!" : "Application Submitted Successfully!"}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-md mx-auto">
                      {isVi 
                        ? "NovaTech và ví Identra đã hoàn tất đối soát và lưu lại thông báo ứng tuyển. Chúc mừng bạn đã vượt qua vòng sơ loại hồ sơ tự động!" 
                        : "NovaTech and your Identra Wallet have securely completed cryptography validation. You have passed the automatic qualifications screening filter!"}
                    </p>
                  </div>

                  {/* Highly styled recruitment verified candidacy ticket card */}
                  <div className="relative w-full max-w-[340px] h-[200px] mx-auto rounded-3xl bg-gradient-to-tr from-slate-900 via-[#1E1B4B] to-slate-950 text-white p-5.5 shadow-2xl flex flex-col justify-between overflow-hidden border border-indigo-950 transition-transform hover:scale-102 duration-300 font-sans text-left">
                    <div className="absolute -right-12 -top-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[9.5px] font-black tracking-widest uppercase text-slate-400">NOVATECH RECRUITMENT</p>
                        <p className="text-[7.5px] font-extrabold tracking-widest uppercase text-emerald-400 mt-1">{isVi ? "ỨNG VIÊN ĐÃ THẨM ĐỊNH" : "VERIFIED CANDIDATE RECORD"}</p>
                      </div>
                      <Briefcase className="w-5 h-5 text-indigo-400" />
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-[9px] uppercase tracking-wider text-indigo-300 font-semibold">{isVi ? "VỊ TRÍ ỨNG TUYỂN" : "POSITION INTERESTED"}</p>
                      <p className="text-sm font-black text-white">Backend Systems Engineer</p>
                    </div>

                    <div className="flex items-end justify-between font-mono text-[9px] text-slate-350">
                      <div>
                        <p className="text-[7px] uppercase font-sans tracking-wide leading-none">{isVi ? "Ứng viên" : "CANDIDATE"}</p>
                        <p className="text-xs text-white font-extrabold uppercase mt-1 tracking-wider">Nguyen Minh Anh</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[7px] uppercase font-sans tracking-wide leading-none">{isVi ? "MÃ ĐỐI SOÁT" : "HASH ASSERTER"}</p>
                        <p className="text-xs text-emerald-400 font-extrabold mt-1">VER_PASS#772</p>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Credential Handover Notice Card */}
                  <div className="w-full max-w-sm mx-auto transition-all duration-300 pt-2">
                    {!bankStepFourCompleted ? (
                      <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 flex items-start gap-3 text-left animate-pulse shadow-sm">
                        <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-550 flex items-center justify-center shrink-0 mt-0.5">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-black text-slate-800 dark:text-slate-100 flex items-center justify-between">
                            <span>{isVi ? "Đang ký chứng thư nộp hồ sơ..." : "Signing submission proof..."}</span>
                            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono tracking-wider ml-2 bg-indigo-50 dark:bg-slate-900 px-1.5 py-0.5 rounded">{isVi ? `Còn ${bankStepFourTimeLeft}s` : `${bankStepFourTimeLeft}s left`}</span>
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-gray-400 font-medium leading-relaxed mt-1">
                            {isVi 
                              ? 'Một chứng thư xác thực ứng tuyển đã được ký số và đang được gửi về ví Identra của bạn để theo dõi hành trình tuyển dụng.' 
                              : "An encrypted candidacy verification certificate is being issued back to your Identra app to secure your interview seat."}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3 text-left animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-sm">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5 animate-bounce">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">{isVi ? "Đã xác nhận nộp hồ sơ!" : "Candidacy Receipt Issued!"}</p>
                          <p className="text-[11px] text-slate-650 dark:text-gray-300 font-medium leading-relaxed mt-1">
                            {isVi 
                              ? "Một chứng thư xác nhận việc nộp hồ sơ đã được lưu lại trong ví Identra của bạn thành công. Bạn sẽ nhận được liên hệ trực tiếp từ Hr tuyển dụng." 
                              : "The digital career verification seal is stored in your Identra app. HR operations will contact you directly."}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* DEFAULT BANK ACCOUNT SUCCESS STEP 4/4 OR CONCERT TICKET SUCCESS STEP 4/4 */
                <div className="relative z-10 text-center py-6 max-w-xl mx-auto space-y-6 animate-in fade-in duration-300">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>
                      {selectedScenarioIdx === 2 
                        ? (isVi ? "Kích hoạt vé thành công" : "Ticket Issued Successfully") 
                        : (isVi ? "Khởi tạo thành công" : "Activation Complete")}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {selectedScenarioIdx === 2 
                        ? (isVi ? "Vé concert kích hoạt thành công!" : "Concert Ticket Activated Successfully!") 
                        : (isVi ? "Kích hoạt tài khoản thành công!" : "Active Payment Card Opened!")}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-405 font-medium leading-relaxed max-w-md mx-auto">
                      {selectedScenarioIdx === 2 
                        ? (isVi 
                            ? "Vé biểu diễn Live Concert 2027 đã được ký số thành công dưới dạng thực chứng và lưu trực tiếp trong ví Identra của bạn." 
                            : "Your entrance pass for Live Concert 2027 has been successfully issued as a digital credential and saved in your Identra wallet.") 
                        : (isVi 
                            ? "Chúc mừng bạn đã hoàn thiện thủ tục mở tài khoản trong chưa đầy 10 giây nhờ sức mạnh công nghệ Định danh số tự chủ." 
                            : "Congratulations! Your secure financial credential and primary debit card is fully provisioned in under 10 seconds.")}
                    </p>
                  </div>

                  {selectedScenarioIdx === 2 ? (
                    /* Highly styled Concert Ticket visual */
                    <div className="relative w-full max-w-[325px] h-[195px] mx-auto rounded-3xl bg-gradient-to-tr from-[#1E1B4B] via-purple-950 to-indigo-950 text-white p-5 shadow-2xl flex flex-col justify-between overflow-hidden border border-emerald-500/30 transition-transform hover:scale-103 duration-300 font-sans text-left opacity-95">
                      <div className="absolute -right-12 -top-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
                      
                      {/* Ticket tear strip effect via CSS pattern */}
                      <div className="absolute right-16 top-0 bottom-0 border-r-2 border-dashed border-white/20" />
                      <div className="absolute right-[60px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-950 dark:bg-slate-905" />
                      <div className="absolute right-[60px] -top-2 w-4 h-4 rounded-full bg-slate-950 dark:bg-slate-905" />
                      <div className="absolute right-[60px] -bottom-2 w-4 h-4 rounded-full bg-slate-950 dark:bg-slate-905" />

                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[9px] font-black tracking-widest uppercase text-indigo-300">LIVE CONCERT 2027</p>
                          <p className="text-[7.5px] font-extrabold tracking-widest uppercase text-emerald-400 mt-1">{isVi ? "VÉ SỐ HOÁ THÀNH CÔNG" : "DIGITAL TICKET ACTIVE"}</p>
                        </div>
                        <span className="text-[10px] bg-emerald-500/25 text-emerald-300 font-black px-2.2 py-0.5 rounded-full border border-emerald-400/20">{activeTicket.name}</span>
                      </div>

                      {/* Barcode representation */}
                      <div className="flex items-center gap-1 opacity-85 my-0.5">
                        <div className="w-1 h-5 bg-white rounded-xs" />
                        <div className="w-2 h-5 bg-white rounded-xs" />
                        <div className="w-0.5 h-5 bg-white rounded-xs" />
                        <div className="w-1.5 h-5 bg-white rounded-xs" />
                        <div className="w-1 h-5 bg-white rounded-xs" />
                        <div className="w-2 h-5 bg-white rounded-xs" />
                        <div className="w-0.5 h-5 bg-white rounded-xs" />
                        <div className="w-1.5 h-5 bg-white rounded-xs" />
                        <div className="w-1.5 h-5 bg-white rounded-xs" />
                        <span className="text-[8px] font-mono text-slate-400 ml-1.5 tracking-wider font-bold">#TCK-{(activeTicket.name).toUpperCase()}-9011</span>
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-end justify-between font-mono text-[9px] text-slate-400">
                          <div>
                            <p className="text-[6.5px] uppercase text-slate-500 font-sans tracking-wide leading-none">{isVi ? "Chủ sở hữu" : "TICKET OWNER"}</p>
                            <p className="text-white font-extrabold uppercase mt-1 tracking-wider">{bankFullName || "NGUYEN MINH ANH"}</p>
                          </div>
                          <div className="text-right pr-6">
                            <p className="text-[6.5px] uppercase text-slate-500 font-sans tracking-wide leading-none">{isVi ? "GHẾ NGỒI" : "SEAT"}</p>
                            <p className="text-emerald-400 font-extrabold mt-1">{isVi ? "TỰ CHỌN" : "AUTO"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Highly styled Bank Card visual */
                    <div className="relative w-full max-w-[325px] h-[195px] mx-auto rounded-2xl bg-gradient-to-tr from-slate-900 via-[#1E293B] to-slate-950 text-white p-5 shadow-2xl flex flex-col justify-between overflow-hidden border border-slate-800 transition-transform hover:scale-103 duration-300 font-sans text-left">
                      <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#3c53ff]/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[9.5px] font-black tracking-widest uppercase text-slate-400">AN TIN BANK</p>
                          <p className="text-[7.5px] font-bold tracking-widest uppercase text-amber-400 mt-0.5">SSI DIGITAL DEBIT</p>
                        </div>
                        <Landmark className="w-4.5 h-4.5 text-slate-500" />
                      </div>

                      <div className="w-8 h-6 rounded bg-amber-450/40 border border-amber-450/30 flex items-center justify-center overflow-hidden">
                        <svg className="w-5 h-3.5 text-amber-500/60" viewBox="0 0 24 16" fill="currentColor">
                          <rect x="2" y="2" width="20" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
                          <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="16" y1="2" x2="16" y2="14" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="2" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </div>

                      <div className="space-y-1">
                        <p className="font-mono text-[14.5px] tracking-widest text-slate-350">9801 4458 2063 7114</p>
                        <div className="flex items-end justify-between font-mono text-[10px]">
                          <div>
                            <p className="text-[7px] uppercase text-slate-550 font-sans tracking-wide leading-none">{isVi ? "Chủ tài khoản" : "CARD HOLDER"}</p>
                            <p className="text-white font-extrabold uppercase mt-1 tracking-wider">{bankFullName || "HOÀNG ANH TUẤN"}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[7px] uppercase text-slate-550 font-sans tracking-wide leading-none">VALID THRU</p>
                            <p className="text-white font-extrabold mt-1">12/31</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}

            {/* BOTTOM CONTROLS FOOTER */}
            <div className="mt-8 pt-5 border-t border-gray-150 dark:border-slate-800 flex items-center justify-between">
              
              {/* Left Action: Quay lai / Back */}
              {bankStep === 2 ? (
                <button
                  onClick={() => {
                    if (showIdentraQR) {
                      setShowIdentraQR(false);
                    } else {
                      setShowBankFormModal(false);
                    }
                  }}
                  className="px-4.5 py-2 rounded-xl border border-gray-200 dark:border-slate-850 text-slate-600 dark:text-gray-300 font-bold text-xs inline-flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span>{isVi ? "Quay lại" : "Back"}</span>
                </button>
              ) : bankStep === 3 ? (
                <button
                  onClick={() => setBankStep(2)}
                  className="px-4.5 py-2 rounded-xl border border-gray-200 dark:border-slate-850 text-slate-600 dark:text-gray-300 font-bold text-xs inline-flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span>{isVi ? "Quay lại" : "Back"}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setBankStep(2);
                    // Reset fields
                    setBankFullName('');
                    setBankDob('');
                    setBankNationality('');
                    setBankAddress('');
                    setBankEmail('');
                    setBankPhone('');
                    setFillType('none');
                  }}
                  className="px-4.5 py-2 rounded-xl border border-gray-205 text-slate-600 dark:text-slate-400 font-bold text-xs inline-flex items-center hover:bg-gray-50 hover:text-[#3B52FF] transition-all cursor-pointer bg-transparent"
                >
                  {isVi ? "Thử lại biểu mẫu" : "Retry with form"}
                </button>
              )}

              {/* Right Action: Tiep tuc / Finished */}
              {bankStep === 2 ? (
                <button
                  disabled={!bankFullName || !bankDob || !bankNationality || !bankAddress || !bankEmail || !bankPhone}
                  onClick={() => {
                    if (selectedScenarioIdx !== 0 && selectedScenarioIdx !== 1 && selectedScenarioIdx !== 2) {
                      const scenarioTitle = demoScenarios[selectedScenarioIdx ?? 0]?.title || '';
                      showLocalToast(isVi ? `Kịch bản "${scenarioTitle}" đang được xây dựng!` : `The scenario "${scenarioTitle}" is under construction!`);
                      return;
                    }
                    setBankStep(3);
                  }}
                  className={`h-10 px-5.5 rounded-xl font-extrabold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer border-none ${
                    (bankFullName && bankDob && bankNationality && bankAddress && bankEmail && bankPhone)
                      ? 'bg-[#3B52FF] hover:bg-[#2C41EB] dark:bg-[#7C8CFF] text-white dark:text-slate-950 font-black'
                      : 'bg-gray-150 dark:bg-slate-800 text-gray-400 dark:text-slate-650 cursor-not-allowed'
                  }`}
                >
                  <span>{isVi ? "Tiếp tục" : "Proceed"}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              ) : bankStep === 3 ? (
                <button
                  disabled={
                    selectedScenarioIdx === 1 
                      ? (jobVerProgressArray[4] < 100) 
                      : selectedScenarioIdx === 2 
                      ? !isConcertPaid 
                      : (verificationProgress < 3)
                  }
                  onClick={() => setBankStep(4)}
                  className={`h-10 px-5.5 rounded-xl font-extrabold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all border-none shadow-md ${
                    (selectedScenarioIdx === 1 
                      ? jobVerProgressArray[4] === 100 
                      : selectedScenarioIdx === 2 
                      ? isConcertPaid 
                      : verificationProgress === 3)
                      ? 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white cursor-pointer shadow-emerald-500/10 active:scale-98'
                      : 'bg-gray-150 dark:bg-slate-850 text-gray-400 dark:text-slate-650 cursor-not-allowed shadow-none'
                  }`}
                >
                  <span>
                    {selectedScenarioIdx === 1
                      ? (isVi ? "Xác nhận nộp hồ sơ" : "Confirm Application")
                      : selectedScenarioIdx === 2
                      ? (isVi ? "Tiếp tục" : "Proceed")
                      : (isVi ? "Kích hoạt tài khoản" : "Activate Account")
                    }
                  </span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              ) : (
                <button
                  disabled={!bankStepFourCompleted}
                  onClick={() => setShowBankFormModal(false)}
                  className={`h-10 px-5.5 rounded-xl font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-all border-none ${
                    bankStepFourCompleted
                      ? 'bg-[#3B52FF] hover:bg-[#2C41EB] dark:bg-[#7C8CFF] text-white dark:text-slate-950 cursor-pointer active:scale-98'
                      : 'bg-gray-150 dark:bg-slate-850 text-gray-400 dark:text-slate-650 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>{isVi ? "Hoàn tất" : "Close Demo"}</span>
                  <Check className="w-4 h-4 shrink-0" />
                </button>
              )}

            </div>
            </>
            )}
          </div>
        </div>
      )}

      {/* OVERLAY TOAST SYSTEM */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-slate-900/95 dark:bg-slate-950/98 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700/50 animate-in fade-in slide-in-from-bottom-5 duration-300 md:max-w-md w-[calc(100%-2rem)]">
          <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <span className="text-[11.5px] font-bold leading-normal">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)} 
            className="ml-auto text-slate-400 hover:text-white p-1 rounded-full cursor-pointer bg-transparent border-none outline-none transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
