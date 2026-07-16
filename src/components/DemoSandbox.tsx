/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, User, FileText, CheckCircle2, AlertTriangle, 
  Loader2, ArrowRight, Shield, Fingerprint, RefreshCw, X, 
  Smartphone, Smile, Sparkles, Network, Database, ShieldAlert
} from 'lucide-react';
import { SandboxStep, SandboxUserData, VerificationLog } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { DEMO_SANDBOX_TRANSLATIONS } from '../translations/DemoSandboxTranslations';

interface DemoSandboxProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_DOCS = [
  {
    id: 'mock_alice',
    name: 'Alice Vance',
    dob: '1992-10-14',
    num: 'DL-98214-X3',
    preview: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' // Portrait of a smiling professional
  },
  {
    id: 'mock_marcus',
    name: 'Marcus Aurelius',
    dob: '1988-04-26',
    num: 'PP-4412995-M',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' // Portrait of a man
  }
];

const formatText = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));

export default function DemoSandbox({ isOpen, onClose }: DemoSandboxProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(DEMO_SANDBOX_TRANSLATIONS, language as keyof typeof DEMO_SANDBOX_TRANSLATIONS, 'DEMO_SANDBOX_TRANSLATIONS');
  const [step, setStep] = useState<SandboxStep>('welcome');
  const [userData, setUserData] = useState<SandboxUserData>({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    documentType: 'drivers_license',
    documentImage: null,
    selfieImage: null,
    ocrExtracted: {
      nameMatch: false,
      dobMatch: false,
      expiryOk: true,
      documentNumber: '',
      extractedDob: '',
      extractedName: ''
    }
  });

  const [logs, setLogs] = useState<VerificationLog[]>([]);
  const [ocrScanning, setOcrScanning] = useState(false);
  const [livenessSubStep, setLivenessSubStep] = useState<number>(0); // 0: look straight, 1: blink, 2: captured
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'certificate' | 'graph' | 'logs'>('certificate');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Add standard logs helper
  const addLog = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [{ timestamp: time, type, message }, ...prev]);
  };

  // Reset demo sandbox
  const handleReset = () => {
    setStep('welcome');
    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      documentType: 'drivers_license',
      documentImage: null,
      selfieImage: null,
      ocrExtracted: {
        nameMatch: false,
        dobMatch: false,
        expiryOk: true,
        documentNumber: '',
        extractedDob: '',
        extractedName: ''
      }
    });
    setLogs([]);
    setLivenessSubStep(0);
    setSimulatedProgress(0);
    stopCamera();
  };

  // Setup/Teardown Camera
  const startCamera = async () => {
    try {
      addLog(t.logs.webcamRequest, 'info');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 480, height: 480, facingMode: 'user' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraPermission(true);
      setUseWebcam(true);
      addLog(t.logs.webcamActive, 'success');
    } catch (err) {
      console.warn(err);
      setCameraPermission(false);
      setUseWebcam(false);
      addLog(t.logs.webcamFallback, 'warning');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setUseWebcam(false);
  };

  useEffect(() => {
    if (step === 'selfie-check') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [step]);

  // Handle step completion
  const nextStep = (next: SandboxStep) => {
    setStep(next);
  };

  // Pre-fill user data
  const fillMockData = (mockId: string) => {
    const selected = MOCK_DOCS.find(d => d.id === mockId);
    if (selected) {
      const parts = selected.name.split(' ');
      setUserData(prev => ({
        ...prev,
        firstName: parts[0] || 'Alice',
        lastName: parts[1] || 'Vance',
        birthDate: selected.dob,
        email: `${parts[0]?.toLowerCase()}@example.com`,
        documentImage: selected.preview,
        ocrExtracted: {
          nameMatch: true,
          dobMatch: true,
          expiryOk: true,
          documentNumber: selected.num,
          extractedDob: selected.dob,
          extractedName: selected.name
        }
      }));
      addLog(formatText(t.logs.selectedPreset, { name: selected.name }), 'info');
      nextStep('doc-upload');
    }
  };

  // OCR Extraction Animation
  const runOcrScanner = () => {
    setOcrScanning(true);
    addLog(t.logs.scanningStructure, 'info');
    
    setTimeout(() => {
      addLog(t.logs.mrzChecks, 'info');
    }, 1000);

    setTimeout(() => {
      // If we don't have simulated OCR, make some up
      const docName = `${userData.firstName} ${userData.lastName}`.trim() || 'Jane Doe';
      const docDob = userData.birthDate || '1995-06-15';
      const docNum = 'DL-' + Math.floor(10000 + Math.random() * 90000) + '-A2';

      setUserData(prev => ({
        ...prev,
        ocrExtracted: {
          nameMatch: prev.firstName ? true : false,
          dobMatch: prev.birthDate ? true : false,
          expiryOk: true,
          documentNumber: prev.ocrExtracted.documentNumber || docNum,
          extractedDob: prev.ocrExtracted.extractedDob || docDob,
          extractedName: prev.ocrExtracted.extractedName || docName
        }
      }));
      setOcrScanning(false);
      addLog(t.logs.ocrSuccess, 'success');
      nextStep('selfie-check');
    }, 2800);
  };

  // Liveness simulator
  const advanceLiveness = () => {
    if (livenessSubStep === 0) {
      addLog(t.logs.facialAlignment, 'info');
      setTimeout(() => {
        setLivenessSubStep(1);
        addLog(t.logs.blinkInstruction, 'info');
      }, 1500);
    } else if (livenessSubStep === 1) {
      addLog(t.logs.blinkDetected, 'success');
      setTimeout(() => {
        setLivenessSubStep(2);
        const placeholderSelfie = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'; // Selfie placeholder
        setUserData(prev => ({ ...prev, selfieImage: placeholderSelfie }));
        addLog(t.logs.livenessComplete, 'success');
        
        setTimeout(() => {
          nextStep('processing');
        }, 1200);
      }, 1500);
    }
  };

  // Run analyzing step progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'processing') {
      setSimulatedProgress(0);
      addLog(t.logs.processingStart, 'info');
      
      const stages = [
        { time: 1000, log: t.logs.selfieMatch, type: 'info' as const },
        { time: 2000, log: t.logs.biometricScore, type: 'success' as const },
        { time: 3000, log: t.logs.registryChecks, type: 'info' as const },
        { time: 4000, log: t.logs.riskComplete, type: 'success' as const },
        { time: 4800, log: t.logs.finalizing, type: 'info' as const }
      ];

      stages.forEach(stage => {
        setTimeout(() => {
          addLog(stage.log, stage.type);
        }, stage.time);
      });

      interval = setInterval(() => {
        setSimulatedProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              nextStep('results');
            }, 600);
            return 100;
          }
          return prev + 5;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [step]);

  // Handle Drag & Drop / File Select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData(prev => ({
          ...prev,
          documentImage: event.target?.result as string
        }));
        addLog(formatText(t.logs.uploaded, { name: file.name }), 'info');
        nextStep('doc-upload');
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh] border border-slate-100">
        
        {/* Left Side: interactive container */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto border-b md:border-b-0 md:border-r border-slate-100">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-slate-900 leading-tight">{t.productTitle}</h3>
                <p className="text-xs text-slate-500 font-mono uppercase">{t.environment}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleReset}
                className="text-slate-400 hover:text-indigo-600 transition p-1.5 rounded-lg hover:bg-slate-50 text-xs flex items-center gap-1 font-medium"
                title={t.restartTitle}
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">{t.reset}</span>
              </button>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition p-1.5 rounded-lg hover:bg-slate-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sandbox content based on step */}
          <div className="flex-1 py-6 flex flex-col justify-center">
            
            {/* 1. Welcome Step */}
            {step === 'welcome' && (
              <div className="space-y-6 max-w-md mx-auto text-center">
                <div className="mx-auto w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center animate-float">
                  <Fingerprint className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full">{t.welcomeBadge}</span>
                  <h4 className="text-2xl font-display font-bold text-slate-900">{t.welcomeTitle}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t.welcomeDesc}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-3">
                  <p className="text-xs font-semibold text-slate-700">{t.beginPrompt}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button 
                      onClick={() => nextStep('info-entry')}
                      className="p-3 text-left bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl transition group text-sm font-medium"
                    >
                      <User className="w-4 h-4 mb-1 text-slate-500 group-hover:text-indigo-600" />
                      {t.customSetup}
                      <p className="text-xs text-slate-400 font-normal">{t.customSetupDesc}</p>
                    </button>
                    <button 
                      onClick={() => fillMockData('mock_alice')}
                      className="p-3 text-left bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl transition group text-sm font-medium"
                    >
                      <Sparkles className="w-4 h-4 mb-1 text-indigo-500" />
                      {t.instantDemo}
                      <p className="text-xs text-slate-400 font-normal">{t.instantDemoDesc}</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Personal Info Entry */}
            {step === 'info-entry' && (
              <div className="space-y-5 max-w-md mx-auto w-full">
                <div className="space-y-2">
                  <h4 className="text-xl font-display font-bold text-slate-900">{t.personalInfoTitle}</h4>
                  <p className="text-sm text-slate-500">{t.personalInfoDesc}</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); nextStep('doc-select'); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-700">{t.firstName}</label>
                      <input 
                        type="text" 
                        required
                        value={userData.firstName} 
                        onChange={e => setUserData({...userData, firstName: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800" 
                        placeholder="Alice"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-700">{t.lastName}</label>
                      <input 
                        type="text" 
                        required
                        value={userData.lastName} 
                        onChange={e => setUserData({...userData, lastName: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800" 
                        placeholder="Vance"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">{t.emailAddress}</label>
                    <input 
                      type="email" 
                      required
                      value={userData.email} 
                      onChange={e => setUserData({...userData, email: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800" 
                      placeholder="alice@example.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">{t.dateOfBirth}</label>
                    <input 
                      type="date" 
                      required
                      value={userData.birthDate} 
                      onChange={e => setUserData({...userData, birthDate: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-800" 
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-850 text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    {t.continueToDoc}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* 3. Document Selection */}
            {step === 'doc-select' && (
              <div className="space-y-5 max-w-md mx-auto w-full">
                <div className="space-y-2">
                  <h4 className="text-xl font-display font-bold text-slate-900">{t.docSelectTitle}</h4>
                  <p className="text-sm text-slate-500">{t.docSelectDesc}</p>
                </div>

                <div className="space-y-3">
                  {(['drivers_license', 'passport', 'national_id'] as const).map(docId => {
                    const docOpt = t.documentTypes[docId];
                    return (
                    <button
                      key={docId}
                      onClick={() => {
                        setUserData({ ...userData, documentType: docId as any });
                        nextStep('doc-upload');
                        addLog(formatText(t.logs.selectedDocumentType, { label: docOpt.label }), 'info');
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition flex items-center gap-4 ${
                        userData.documentType === docId 
                          ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${userData.documentType === docId ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">{docOpt.label}</p>
                        <p className="text-xs text-slate-500">{docOpt.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </button>
                  )})}
                </div>
              </div>
            )}

            {/* 4. Document Upload */}
            {step === 'doc-upload' && (
              <div className="space-y-5 max-w-lg mx-auto w-full">
                <div className="space-y-1 text-center md:text-left">
                  <h4 className="text-xl font-display font-bold text-slate-900">{t.uploadTitle}</h4>
                  <p className="text-sm text-slate-500">{t.uploadDesc}</p>
                </div>

                {userData.documentImage ? (
                  <div className="border border-slate-200 rounded-2xl overflow-hidden relative group bg-slate-50 p-3">
                    <img 
                      src={userData.documentImage} 
                      alt={t.uploadedAlt}
                      className="max-h-64 object-contain mx-auto rounded-xl"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        onClick={() => setUserData({ ...userData, documentImage: null })}
                        className="bg-black/70 hover:bg-black text-white p-2 rounded-full transition shadow-md"
                        title={t.removeImageTitle}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-3 text-center">
                      <button
                        onClick={runOcrScanner}
                        disabled={ocrScanning}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-6 py-2.5 rounded-xl inline-flex items-center gap-2 shadow-sm transition disabled:bg-indigo-400"
                      >
                        {ocrScanning ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {t.scanningDocument}
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            {t.runOcr}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Drag and Drop Zone */}
                    <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 transition bg-slate-50 hover:bg-indigo-50/20 p-8 rounded-3xl text-center relative cursor-pointer group">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="mx-auto w-12 h-12 bg-white text-slate-600 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:text-indigo-600 transition">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{t.dropZone}</p>
                      <p className="text-xs text-slate-500 mt-1">{t.supportedFiles}</p>
                      <span className="inline-block mt-4 text-xs font-semibold text-indigo-600 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm hover:shadow transition">
                        {t.browseFiles}
                      </span>
                    </div>

                    {/* Pre-made mock selection */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-700">{t.mockPrompt}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {MOCK_DOCS.map(mock => (
                          <button
                            key={mock.id}
                            onClick={() => fillMockData(mock.id)}
                            className="p-3 text-left bg-white border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/30 rounded-xl transition flex items-center gap-3"
                          >
                            <img src={mock.preview} className="w-10 h-10 object-cover rounded-lg border border-slate-100" />
                            <div className="overflow-hidden">
                              <p className="text-xs font-semibold text-slate-800 truncate">{t.mockDocs[mock.id]}</p>
                              <p className="text-[10px] text-slate-500">{t.presetDemoData}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. Selfie Check (Liveness Verification) */}
            {step === 'selfie-check' && (
              <div className="space-y-5 max-w-md mx-auto w-full text-center">
                <div className="space-y-1 text-center">
                  <h4 className="text-xl font-display font-bold text-slate-900">{t.selfieTitle}</h4>
                  <p className="text-sm text-slate-500">{t.selfieDesc}</p>
                </div>

                <div className="relative aspect-square max-w-80 mx-auto rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center shadow-lg">
                  {useWebcam ? (
                    <video 
                      ref={videoRef} 
                      className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                      playsInline
                      muted
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 space-y-4 text-slate-400 bg-slate-900/60">
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-400 flex items-center justify-center animate-spin" />
                      <p className="text-xs font-medium text-center">{t.secureMesh}</p>
                    </div>
                  )}

                  {/* Oval Portrait Guide Frame */}
                  <div className="absolute inset-0 border-[24px] border-black/40 pointer-events-none flex items-center justify-center">
                    <div className={`w-[85%] h-[85%] rounded-[50%/40%] border-4 ${
                      livenessSubStep === 2 ? 'border-emerald-500 animate-pulse' : 'border-indigo-500 animate-pulse-slow'
                    } bg-transparent`} />
                  </div>

                  {/* HUD Elements */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-md py-2 px-3 rounded-xl border border-slate-800/80 text-white flex items-center justify-between text-[11px] font-mono pointer-events-none">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      {t.hudSystem}
                    </div>
                    <div>{t.hudFps}</div>
                    <div>{t.hudMatch} {livenessSubStep === 2 ? '98.4%' : '--%'}</div>
                  </div>
                </div>

                {/* Feedback Indicator */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 text-left">
                  <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                    <Smile className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 uppercase tracking-wider font-mono">
                      {livenessSubStep === 0 && t.liveness.step1}
                      {livenessSubStep === 1 && t.liveness.step2}
                      {livenessSubStep === 2 && t.liveness.complete}
                    </p>
                    <p className="text-sm font-medium text-slate-600 mt-0.5">
                      {livenessSubStep === 0 && t.liveness.desc1}
                      {livenessSubStep === 1 && t.liveness.desc2}
                      {livenessSubStep === 2 && t.liveness.descComplete}
                    </p>
                  </div>
                </div>

                <button
                  onClick={advanceLiveness}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition text-sm flex items-center justify-center gap-2"
                >
                  {livenessSubStep === 0 && t.liveness.action1}
                  {livenessSubStep === 1 && t.liveness.action2}
                  {livenessSubStep === 2 && t.liveness.actionComplete}
                </button>
              </div>
            )}

            {/* 6. Processing Verification */}
            {step === 'processing' && (
              <div className="space-y-6 max-w-sm mx-auto w-full text-center">
                <div className="mx-auto relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
                  <div className="absolute inset-2 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-display font-bold text-slate-900">{t.processingTitle}</h4>
                  <p className="text-sm text-slate-500">{t.processingDesc}</p>
                </div>

                <div className="space-y-1.5 text-left">
                  <div className="flex justify-between text-xs font-semibold text-slate-600 font-mono">
                    <span>{t.progress}</span>
                    <span>{simulatedProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-300 rounded-full" style={{ width: `${simulatedProgress}%` }} />
                  </div>
                </div>
              </div>
            )}

            {/* 7. Verification Results & Dynamic Dashboard */}
            {step === 'results' && (
              <div className="space-y-5 w-full">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3.5">
                  <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-900">{t.resultsTitle}</h4>
                    <p className="text-xs text-emerald-700 mt-1">
                      {t.resultsDesc}
                    </p>
                  </div>
                </div>

                {/* Mini Navigation tabs for results page */}
                <div className="flex border-b border-slate-200">
                  <button 
                    onClick={() => setActiveTab('certificate')}
                    className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition ${
                      activeTab === 'certificate' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {t.tabs.certificate}
                  </button>
                  <button 
                    onClick={() => setActiveTab('graph')}
                    className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition ${
                      activeTab === 'graph' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {t.tabs.graph}
                  </button>
                  <button 
                    onClick={() => setActiveTab('logs')}
                    className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition ${
                      activeTab === 'logs' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {t.tabs.logs}
                  </button>
                </div>

                {/* Interactive views */}
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 min-h-64">
                  {activeTab === 'certificate' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                        <div>
                          <p className="text-[10px] text-slate-400 font-mono font-bold uppercase">{t.certificate.transactionId}</p>
                          <p className="text-xs font-mono font-medium text-slate-600">TXN-49102-AI982</p>
                        </div>
                        <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full font-mono">
                          {t.certificate.passed}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{t.certificate.verifiedEntity}</p>
                          <p className="text-sm font-semibold text-slate-800">
                            {userData.firstName} {userData.lastName || 'Alice Vance'}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{t.certificate.dateOfBirth}</p>
                          <p className="text-sm font-semibold text-slate-800 font-mono">
                            {userData.birthDate || '1992-10-14'}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{t.certificate.idDocumentMatch}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{t.certificate.ocrVerified}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{t.certificate.biometricSimilarity}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{t.certificate.biometricPass}</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-200/60 pt-3 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Shield className="w-3.5 h-3.5 text-slate-400" />
                          {t.certificate.complianceGuard}
                        </span>
                        <span>{t.certificate.capturedAgo}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'graph' && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500">
                        {t.graphDesc}
                      </p>
                      
                      {/* Live stylized node graph mockup */}
                      <div className="h-44 bg-white rounded-xl border border-slate-200 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />
                        
                        {/* Nodes */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                          <div className="w-10 h-10 bg-indigo-600 rounded-full text-white flex items-center justify-center shadow-md border-2 border-white z-10">
                            <User className="w-5 h-5" />
                          </div>
                          <p className="text-[10px] font-bold text-slate-800 mt-1">{t.graphNodes.user}</p>
                        </div>

                        <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
                          <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shadow-sm border border-emerald-200 z-10">
                            <FileText className="w-4 h-4" />
                          </div>
                          <p className="text-[9px] font-medium text-slate-500 mt-1">{t.graphNodes.document}</p>
                        </div>

                        <div className="absolute top-1/4 right-1/4 flex flex-col items-center">
                          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shadow-sm border border-indigo-100 z-10">
                            <Smartphone className="w-4 h-4" />
                          </div>
                          <p className="text-[9px] font-medium text-slate-500 mt-1">{t.graphNodes.device}</p>
                        </div>

                        <div className="absolute bottom-1/4 left-1/3 flex flex-col items-center">
                          <div className="w-8 h-8 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center shadow-sm border border-sky-100 z-10">
                            <Smile className="w-4 h-4" />
                          </div>
                          <p className="text-[9px] font-medium text-slate-500 mt-1">{t.graphNodes.liveness}</p>
                        </div>

                        <div className="absolute bottom-1/4 right-1/3 flex flex-col items-center">
                          <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shadow-sm border border-purple-100 z-10">
                            <Network className="w-4 h-4" />
                          </div>
                          <p className="text-[9px] font-medium text-slate-500 mt-1">{t.graphNodes.location}</p>
                        </div>

                        {/* Connecting SVGs lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="50%" y1="50%" x2="33%" y2="75%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="50%" y1="50%" x2="67%" y2="75%" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {activeTab === 'logs' && (
                    <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                      {logs.map((log, i) => (
                        <div key={i} className="flex gap-2 text-xs font-mono py-1 border-b border-slate-200/40 last:border-0">
                          <span className="text-slate-400">{log.timestamp}</span>
                          <span className={`font-bold ${
                            log.type === 'success' ? 'text-emerald-600' :
                            log.type === 'warning' ? 'text-amber-600' :
                            log.type === 'error' ? 'text-rose-600' : 'text-indigo-600'
                          }`}>
                            [{t.logTypes[log.type]}]
                          </span>
                          <span className="text-slate-600">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-slate-900 hover:bg-slate-850 text-white font-medium py-3 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {t.verifyAnother}
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 border border-slate-200 hover:bg-slate-50 text-slate-700 py-3 rounded-xl font-medium text-sm transition"
                  >
                    {t.finishSandbox}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Sandbox Footer indicators */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              {t.apiStatus}
            </div>
            <span>{t.stackLabel}</span>
          </div>

        </div>

        {/* Right Side: Log Feed / Console Terminal */}
        <div className="w-full md:w-80 bg-slate-950 p-6 text-slate-300 flex flex-col justify-between overflow-y-auto font-mono text-xs max-h-48 md:max-h-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-indigo-400" />
                {t.consoleTitle}
              </span>
              <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-bold">{t.consoleVersion}</span>
            </div>

            <div className="space-y-3 max-h-[300px] md:max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 pr-1">
              {logs.length === 0 ? (
                <div className="text-slate-500 py-8 text-center italic">
                  {t.waiting}
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="space-y-1 border-l border-slate-800 pl-3 leading-relaxed">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{log.timestamp}</span>
                      <span className={
                        log.type === 'success' ? 'text-emerald-400' :
                        log.type === 'warning' ? 'text-amber-400' :
                        log.type === 'error' ? 'text-rose-400' : 'text-indigo-400'
                      }>
                        {t.logTypes[log.type]}
                      </span>
                    </div>
                    <p className="text-slate-200 text-xs font-mono">{log.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 text-[10px] text-slate-500 leading-tight space-y-1.5 hidden md:block">
            <div className="flex items-center gap-1 text-slate-400">
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.orchestrationTitle}</span>
            </div>
            <p>{t.orchestrationDesc}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
