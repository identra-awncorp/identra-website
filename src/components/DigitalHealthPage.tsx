/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowRight, Check, ShieldCheck, Stethoscope, ArrowLeft, RefreshCw, Layers, CheckCircle2, 
  Users, Search, Eye, AlertCircle, Sparkles, Smartphone, Landmark,
  Shield, CreditCard, ShieldAlert, BookOpen, ChevronDown, ChevronUp, Database, FileText, 
  Activity, Fingerprint, Lock, ShieldCheck as VerifiedIcon, Scale, Play, Trash2, HeartPulse,
  Workflow, CheckSquare, Plus, FileSpreadsheet, Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { DIGITAL_HEALTH_PAGE_TRANSLATIONS } from '../translations/DigitalHealthPageTranslations';

interface DigitalHealthPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface PatientScenario {
  name: string;
  insuranceProvider: string;
  status: 'Approve' | 'Review' | 'Denied';
  idMatch: 'Match' | 'Mismatch' | 'Unverified';
  insuranceVerified: boolean;
  hipaaChecked: boolean;
  notes: string[];
}

type PatientScenarioKey = 'good' | 'review' | 'flagged';

interface VerificationLog {
  text: string;
  tone: 'default' | 'success' | 'error';
}

const PATIENT_SCENARIOS: Record<PatientScenarioKey, PatientScenario> = {
  good: {
    name: 'Sarah Jenkins',
    insuranceProvider: 'Blue Cross Blue Shield',
    status: 'Approve',
    idMatch: 'Match',
    insuranceVerified: true,
    hipaaChecked: true,
    notes: [
      'Selfie matches government ID photo with 98.6% confidence.',
      'Active health insurance policy confirmed via real-time carrier lookup.',
      'Name and DOB perfectly match both ID and insurance record.',
      'HIPAA consent signed and logged in secure, redacted storage.'
    ]
  },
  review: {
    name: 'David Miller',
    insuranceProvider: 'Aetna (Out of Network)',
    status: 'Review',
    idMatch: 'Match',
    insuranceVerified: false,
    hipaaChecked: true,
    notes: [
      'ID photo verified, but insurance card image is partially blurry.',
      'Carrier check returned "Plan Inactive" or "Incorrect Policy ID".',
      'Requires quick manual validation of card OCR text.',
      'HIPAA consent is fully signed.'
    ]
  },
  flagged: {
    name: 'Unknown Applicant',
    insuranceProvider: 'Cigna (Claimed)',
    status: 'Denied',
    idMatch: 'Mismatch',
    insuranceVerified: false,
    hipaaChecked: false,
    notes: [
      'Presentation attack detected: Selfie matches a pre-recorded video stream.',
      'Insurance ID format does not match Cigna database standards.',
      'Social Security Number is linked to an active identity theft watchlist.',
      'HIPAA authorization bypassed or refused.'
    ]
  }
};

export default function DigitalHealthPage({ onOpenSandbox, onBackToLanding, onViewChange }: DigitalHealthPageProps) {
  const { language } = useLanguage();
  const t = DIGITAL_HEALTH_PAGE_TRANSLATIONS[language];
  const patientStatusLabels: Record<PatientScenario['status'], string> = {
    Approve: t.copy.approve,
    Review: t.copy.review,
    Denied: t.copy.denied
  };

  // Mobile Simulator States
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hasId, setHasId] = useState<boolean>(false);
  const [hasStateId, setHasStateId] = useState<boolean>(false);
  const [hasInsurance, setHasInsurance] = useState<boolean>(false);
  
  // Toggles for Custom Rule Configuration Mockup
  const [requireInsuranceCard, setRequireInsuranceCard] = useState<boolean>(true);
  const [requireInsuranceStatement, setRequireInsuranceStatement] = useState<boolean>(false);
  const [requireSelfie, setRequireSelfie] = useState<boolean>(true);

  // Verification Simulator States
  const [activeScenario, setActiveScenario] = useState<PatientScenarioKey>('good');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifyStep, setVerifyStep] = useState<number>(0);

  // Demo Request Form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [isDemoSubmitted, setIsDemoSubmitted] = useState(false);

  const verificationSteps = React.useMemo<VerificationLog[]>(() => {
    const scenario = PATIENT_SCENARIOS[activeScenario];

    return [
      { text: t.copy.scanningPatientGovernmentIdAndVerifyingBiometrics, tone: 'default' },
      {
        text: `${t.copy.idvEngineSelfieFaceComparison} ${scenario.idMatch === 'Match' ? t.copy.matchConfidence : t.copy.mismatchDetected}.`,
        tone: scenario.idMatch === 'Match' ? 'success' : 'error'
      },
      { text: t.copy.executingRealtimeHealthInsuranceEligibilityLookup, tone: 'default' },
      {
        text: `${t.copy.insuranceCheckProvider} ${scenario.insuranceProvider}. ${t.copy.verification} ${scenario.insuranceVerified ? t.copy.verificationSuccessUpper : t.copy.verificationFailedUpper}.`,
        tone: scenario.insuranceVerified ? 'success' : 'error'
      },
      { text: t.copy.runningHipaaValidationAndDataMaskingProcedures, tone: 'default' },
      {
        text: `${t.copy.privacyShieldPiiRedactedFromStandardServerLogsHipaaAuthorization} ${scenario.hipaaChecked ? t.copy.verified : t.copy.missing}.`,
        tone: scenario.hipaaChecked ? 'success' : 'error'
      },
      { text: t.copy.finalizingAutomatedDecisionRules, tone: 'default' },
      {
        text: `${t.copy.systemAutoResolutionStatus} ${patientStatusLabels[scenario.status].toLocaleUpperCase()}.`,
        tone: scenario.status === 'Approve' ? 'success' : scenario.status === 'Denied' ? 'error' : 'default'
      }
    ];
  }, [activeScenario, patientStatusLabels, t]);
  const verifyLogs = verificationSteps.slice(0, verifyStep);

  const startVerificationSimulator = (key: PatientScenarioKey) => {
    setActiveScenario(key);
    setIsVerifying(true);
    setVerifyStep(0);

    let current = 0;
    const interval = setInterval(() => {
      setVerifyStep(current + 1);
      current++;
      if (current >= verificationSteps.length) {
        clearInterval(interval);
      }
    }, 900);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !organization) {
      alert(t.copy.pleaseFillOutAllRequiredFields);
      return;
    }
    setIsDemoSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-blue-600/10 selection:text-blue-600">
      
      {/* Back button header for simple routing inside App.tsx */}
      <div className="max-w-7xl mx-auto px-4 pt-6 md:px-8">
        <button 
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />{t.copy.backToSolutions}</button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-blue-600 rounded-[2.5rem] text-white p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl shadow-blue-600/10">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -ml-20 -mb-20"></div>

            <div className="relative z-10 max-w-4xl">
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-500/30 text-blue-100 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8 border border-white/10">
                <Stethoscope className="w-4 h-4 text-blue-200" />{t.copy.digitalHealth}</div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1] mb-8">{t.copy.headacheFreePatientVerification}<br />
                <span className="text-blue-100">{t.copy.givePatientsSeamlessOnboardingExperiencesWhileOrchestratingHipaa}</span>
              </h1>

              {/* Try the demo button */}
              <a 
                href="#demo-form"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-base font-semibold transition shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95"
              >{t.copy.tryTheDemo}<ArrowRight className="w-5 h-5" />
              </a>

              {/* Divider */}
              <div className="border-t border-blue-500/40 my-12 pt-8"></div>

              {/* Three column grid of benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">{t.copy.reducePatientDropOff}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{t.copy.minimizePatientFrustrationDuringTheIntakeProcessWith}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">{t.copy.stayHipaaCompliant}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{t.copy.protectSensitiveDataBySettingRedactionAndAccess}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">{t.copy.streamlineOperations}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{t.copy.consolidateIdentityDataScreenDocumentsSendEmailsAnd}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-y border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-6">{t.copy.trustedByStartupsTheWorldsLargestHealthcareCompanies}</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
            <div className="flex items-center gap-2 font-bold text-slate-700 text-lg">
              <span className="text-blue-600 font-extrabold">+</span> {t.brands.kHealth}
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700 text-lg italic">
              Monash IVF
            </div>
            <div className="flex items-center gap-1 font-extrabold text-slate-800 text-xl tracking-tight">
              Ro<span className="text-red-500">.</span>
            </div>
            <div className="flex items-center gap-2 font-mono font-bold text-slate-700 text-lg">
              oscar
            </div>
            <div className="flex items-center gap-1 font-sans font-bold text-slate-700 text-lg">
              <span className="text-green-500">◆</span> GreenHealth
            </div>
          </div>
        </div>
      </section>

      {/* Collect, Verify, and Decide - Interactive App Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-6">{t.copy.collectVerifyAndMakeDecisionsAllInOne}</h2>
            <p className="text-slate-500 text-lg">{t.copy.empowerYourClinicalAndAdministrativeTeamsWithCustom}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Explanations and configurations */}
            <div className="lg:col-span-5 space-y-12">
              
              {/* Step 1: Collect */}
              <div className="border-l-4 border-blue-500 pl-6 space-y-4">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest">{t.copy.step01}</div>
                <h3 className="text-2xl font-semibold text-slate-900">{t.copy.collectPatientsInformation}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{t.copy.chooseWhatInformationToCollectFromGovernmentIds}</p>
                
                {/* Configuration controls */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3 mt-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.copy.configureRulesLiveDemo}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">{t.copy.requireHealthInsuranceCard}</span>
                    <button 
                      onClick={() => setRequireInsuranceCard(!requireInsuranceCard)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${requireInsuranceCard ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${requireInsuranceCard ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">{t.copy.requireGovernmentIdSelfie}</span>
                    <button 
                      onClick={() => setRequireSelfie(!requireSelfie)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${requireSelfie ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${requireSelfie ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">{t.copy.requireInsuranceStatement}</span>
                    <button 
                      onClick={() => setRequireInsuranceStatement(!requireInsuranceStatement)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${requireInsuranceStatement ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${requireInsuranceStatement ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 2: Verify */}
              <div className="border-l-4 border-slate-200 hover:border-blue-500 pl-6 space-y-4 transition-colors">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t.copy.step02}</div>
                <h3 className="text-2xl font-semibold text-slate-900">{t.copy.verifyPatientsIdentities}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{t.copy.authenticatePatientsIdentitiesAndConfirmInsuranceCardsTo}</p>
              </div>

              {/* Step 3: Automatically Approve/Deny */}
              <div className="border-l-4 border-slate-200 hover:border-blue-500 pl-6 space-y-4 transition-colors">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t.copy.step03}</div>
                <h3 className="text-2xl font-semibold text-slate-900">{t.copy.automaticallyApproveOrDeny}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{t.copy.configureRulesToAutomaticallyApproveOrDeclinePatients}</p>
              </div>

            </div>

            {/* Right Column: Live Interactive Simulator Block */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Box 1: The Patient Onboarding Mobile Screen Mockup (Col span 7) */}
              <div className="md:col-span-7 bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden relative flex flex-col min-h-[460px]">
                {/* Mobile Header Bar */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-medium">patient_intake_flow.exe</span>
                  <Smartphone className="w-4 h-4 text-slate-400" />
                </div>

                {/* Simulated Screen Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  {currentStep === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="text-xl font-semibold text-slate-900">{t.copy.uploadDocuments}</h4>
                        <p className="text-slate-500 text-xs mt-1">{t.copy.weRequirePhotoUploadsOfYourGovernmentId}</p>
                      </div>

                      <div className="space-y-3">
                        {/* Driver's license block */}
                        <button 
                          onClick={() => setHasId(!hasId)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-center justify-between transition ${hasId ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200 hover:bg-slate-50'}`}
                        >
                          <div className="flex items-center gap-3">
                            <VerifiedIcon className={`w-4 h-4 ${hasId ? 'text-blue-600' : 'text-slate-400'}`} />
                            <span className="font-semibold text-slate-700">{t.copy.driversLicense}</span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${hasId ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {hasId ? t.copy.selected : t.copy.required}
                          </span>
                        </button>

                        {/* State ID option */}
                        <button 
                          onClick={() => setHasStateId(!hasStateId)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-center justify-between transition ${hasStateId ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200 hover:bg-slate-50'}`}
                        >
                          <div className="flex items-center gap-3">
                            <VerifiedIcon className={`w-4 h-4 ${hasStateId ? 'text-blue-600' : 'text-slate-400'}`} />
                            <span className="font-semibold text-slate-700">{t.copy.stateIdCard}</span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${hasStateId ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {hasStateId ? t.copy.selected : t.copy.optional}
                          </span>
                        </button>

                        {/* Health Insurance Card */}
                        {requireInsuranceCard && (
                          <button 
                            onClick={() => setHasInsurance(!hasInsurance)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-center justify-between transition ${hasInsurance ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200 hover:bg-slate-50'}`}
                          >
                            <div className="flex items-center gap-3">
                              <HeartPulse className={`w-4 h-4 ${hasInsurance ? 'text-blue-600' : 'text-slate-400'}`} />
                              <span className="font-semibold text-slate-700">{t.copy.proofOfInsurance}</span>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${hasInsurance ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                              {hasInsurance ? t.copy.selected : t.copy.required}
                            </span>
                          </button>
                        )}

                        {/* Health Insurance Statement option */}
                        {requireInsuranceStatement && (
                          <div className="p-3.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3 opacity-65">
                              <FileText className="w-4 h-4 text-slate-400" />
                              <span className="font-semibold text-slate-700">{t.copy.insuranceStatement}</span>
                            </div>
                            <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded font-bold">{t.copy.unsubmitted}</span>
                          </div>
                        )}
                      </div>

                      <button 
                        disabled={!(hasId || hasStateId)}
                        onClick={() => setCurrentStep(1)}
                        className={`w-full py-3 rounded-xl text-center text-xs font-bold transition duration-200 mt-4 ${
                          (hasId || hasStateId) ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >{t.copy.nextStep}</button>
                    </motion.div>
                  )}

                  {currentStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6 text-center py-6"
                    >
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        {requireSelfie ? (
                          <Smartphone className="w-8 h-8" />
                        ) : (
                          <ShieldCheck className="w-8 h-8" />
                        )}
                      </div>

                      {requireSelfie ? (
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-slate-900 font-sans">{t.copy.verificationSelfie}</h4>
                          <p className="text-xs text-slate-500 max-w-sm mx-auto">{t.copy.pleasePositionYourFaceWithinTheFrameOn}</p>
                          <div className="relative w-36 h-36 mx-auto rounded-full border-4 border-dashed border-blue-500 overflow-hidden bg-slate-100 flex items-center justify-center">
                            <motion.div 
                              animate={{ scale: [1, 1.05, 1] }} 
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="w-24 h-24 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center"
                            >
                              <Users className="w-10 h-10 text-slate-400" />
                            </motion.div>
                            <div className="absolute inset-x-0 bottom-0 bg-blue-600/80 text-white text-[9px] py-1 font-bold tracking-wider uppercase">{t.copy.scanning}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-slate-900">{t.copy.documentsReceived}</h4>
                          <p className="text-xs text-slate-500 max-w-sm mx-auto">{t.copy.documentsUploadedSuccessfullyWithoutBiometricSelfieGate}</p>
                        </div>
                      )}

                      <div className="flex gap-3 pt-4">
                        <button 
                          onClick={() => setCurrentStep(0)}
                          className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 transition"
                        >{t.copy.back}</button>
                        <button 
                          onClick={() => setCurrentStep(2)}
                          className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
                        >{t.copy.submitOnboarding}</button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12 space-y-6"
                    >
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">{t.copy.onboardingSubmitted}</h4>
                        <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">{t.copy.thankYouYourPatientCredentialsAndHealthInsurance}</p>
                      </div>
                      <button 
                        onClick={() => {
                          setCurrentStep(0);
                          setHasId(false);
                          setHasStateId(false);
                          setHasInsurance(false);
                        }}
                        className="text-xs text-blue-600 font-bold hover:underline"
                      >{t.copy.startOverSimulatorReset}</button>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Box 2: Accepted rules & Decision center (Col span 5) */}
              <div className="md:col-span-5 flex flex-col gap-6">
                
                {/* Rules Summary Widget */}
                <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-lg border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Activity className="w-4 h-4 text-blue-400" />{t.copy.eligibilityRules}</div>
                  <h4 className="text-sm font-semibold text-slate-100">{t.copy.intakePolicyProfile}</h4>
                  
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2 justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">{t.copy.idPhotoMatchSelfie}</span>
                      <span className={`font-semibold ${requireSelfie ? 'text-green-400' : 'text-yellow-400'}`}>
                        {requireSelfie ? t.copy.required : t.copy.skipped}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">{t.copy.activeInsurancePolicyCheck}</span>
                      <span className={`font-semibold ${requireInsuranceCard ? 'text-green-400' : 'text-slate-500'}`}>
                        {requireInsuranceCard ? t.copy.instantApi : t.copy.off}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 justify-between py-1">
                      <span className="text-slate-400">{t.copy.statementReview}</span>
                      <span className={`font-semibold ${requireInsuranceStatement ? 'text-green-400' : 'text-slate-500'}`}>
                        {requireInsuranceStatement ? t.copy.yes : t.copy.no}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instant Verification Trial */}
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">{t.copy.runIntakeDecision}</h4>
                    
                    {/* Scenario selectors */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <button 
                        onClick={() => startVerificationSimulator('good')}
                        className={`py-2 rounded-lg text-[10px] font-bold border transition ${activeScenario === 'good' ? 'bg-green-50 border-green-400 text-green-700' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                      >{t.copy.perfectPatient}</button>
                      <button 
                        onClick={() => startVerificationSimulator('review')}
                        className={`py-2 rounded-lg text-[10px] font-bold border transition ${activeScenario === 'review' ? 'bg-amber-50 border-amber-400 text-amber-700' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                      >{t.copy.outOfNetwork}</button>
                      <button 
                        onClick={() => startVerificationSimulator('flagged')}
                        className={`py-2 rounded-lg text-[10px] font-bold border transition ${activeScenario === 'flagged' ? 'bg-red-50 border-red-400 text-red-700' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                      >{t.copy.identityFraud}</button>
                    </div>

                    {/* Console simulation log output */}
                    <div className="bg-slate-950 rounded-xl p-3.5 min-h-[140px] max-h-[140px] overflow-y-auto font-mono text-[9px] text-slate-300 leading-normal space-y-1">
                      {isVerifying ? (
                        <>
                          {verifyLogs.map((log, index) => (
                            <div key={index} className={log.tone === 'error' ? 'text-red-400' : log.tone === 'success' ? 'text-green-400' : 'text-slate-300'}>
                              {log.text}
                            </div>
                          ))}
                          {verifyStep < 4 && (
                            <div className="text-blue-400 animate-pulse">{t.copy.runningVerificationSequence}</div>
                          )}
                        </>
                      ) : (
                        <div className="text-slate-500">{t.copy.selectAnOnboardingScenarioAboveToTriggerAutomated}</div>
                      )}
                    </div>
                  </div>

                  {/* Resolution status indicators */}
                  {isVerifying && verifyStep >= 4 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between"
                    >
                      <span className="text-xs font-semibold text-slate-500">{t.copy.resolutionAutoResult}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        PATIENT_SCENARIOS[activeScenario].status === 'Approve' ? 'bg-green-100 text-green-700' :
                        PATIENT_SCENARIOS[activeScenario].status === 'Review' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {patientStatusLabels[PATIENT_SCENARIOS[activeScenario].status]}
                      </span>
                    </motion.div>
                  )}
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Grid of 6 Key Features Section */}
      <section className="bg-white py-24 md:py-32 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">{t.copy.configuredSpecificallyForHealthcareWorkloads}</h2>
            <p className="text-slate-500 text-base">{t.copy.fromHipaaValidationToCustomMedicalCredentialingDeploy}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="p-8 rounded-2xl border border-slate-100 hover:border-slate-200 transition bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t.copy.libraryOfVerificationMethods}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.copy.buildAProcessThatCanVerifyPatientsWho}</p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl border border-slate-100 hover:border-slate-200 transition bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t.copy.platformIntegrations}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.copy.incorporateDataFromThirdPartyVendorsOrYour}</p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl border border-slate-100 hover:border-slate-200 transition bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t.copy.flowEditor}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.copy.preventPatientConfusionWithAnIntuitiveFlowThat}</p>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-2xl border border-slate-100 hover:border-slate-200 transition bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t.copy.dynamicFlow}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.copy.chooseWhatInformationToCollectWhichDocumentsTo}</p>
            </div>

            {/* Card 5 */}
            <div className="p-8 rounded-2xl border border-slate-100 hover:border-slate-200 transition bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t.copy.patientFollowUpMethods}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.copy.requestAdditionalInformationFromPatientsWithoutLeavingIdentras}</p>
            </div>

            {/* Card 6 */}
            <div className="p-8 rounded-2xl border border-slate-100 hover:border-slate-200 transition bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t.copy.sensitiveDataProtections}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t.copy.safeguardPiiAndStayHipaaCompliantWithData}</p>
            </div>

          </div>

        </div>
      </section>

      {/* Explore More of Identra's Identity Platform Cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-10 text-center font-sans">{t.copy.exploreMoreOfIdentrasIdentityPlatform}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Build a safer platform */}
            <div 
              onClick={() => onViewChange && onViewChange('platform')}
              className="bg-blue-600 hover:bg-blue-700 transition cursor-pointer text-white p-8 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full filter blur-xl transform translate-x-12 -translate-y-12"></div>
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
                <div>
                  <div className="bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center mb-6 font-bold">
                    →
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">{t.copy.buildASaferMoreTrustedPlatform}</h3>
                </div>
              </div>
            </div>

            {/* Card 2: Verify with AI */}
            <div 
              onClick={() => onViewChange && onViewChange('document-ai')}
              className="bg-emerald-500 hover:bg-emerald-600 transition cursor-pointer text-white p-8 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full filter blur-xl transform translate-x-12 -translate-y-12"></div>
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
                <div>
                  <div className="bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center mb-6 font-bold">
                    →
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">{t.copy.verifyDocumentsConfidentlyWithAi}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Form Section */}
      <section id="demo-form" className="py-24 md:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left side info */}
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">{t.copy.readyToGetStarted}</h2>
              <p className="text-slate-400 text-lg leading-relaxed">{t.copy.contactOurSolutionsConsultingTeamToCustomTailor}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">✓</div>
                  <span className="text-sm text-slate-300">{t.copy.customBusinessAssociateAgreementBaaOnboardingSupport}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">✓</div>
                  <span className="text-sm text-slate-300">{t.copy.fastSandboxToProductionDeploymentUnder72Hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">✓</div>
                  <span className="text-sm text-slate-300">{t.copy.secureRedactionProfilesForHipaaAndClinicalData}</span>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl">
              <AnimatePresence mode="wait">
                {!isDemoSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleDemoSubmit} 
                    className="space-y-5"
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{t.copy.getInTouchOrStartExploringIdentraToday}</h3>
                    <p className="text-xs text-slate-500 mb-6">{t.copy.fillOutTheQuickQuestionnaireBelowToReceive}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.copy.firstName}</label>
                        <input 
                          type="text" 
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={t.copy.jane}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.copy.lastName}</label>
                        <input 
                          type="text" 
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder={t.copy.doe}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.copy.workEmail}</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.copy.janeDoeOrganizationOrg}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.copy.healthcareOrganization}</label>
                      <input 
                        type="text" 
                        required
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder={t.copy.eGOakridgeGeneralClinic}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.copy.rolePracticeField}</label>
                      <input 
                        type="text" 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder={t.copy.eGClinicalIntakeCoordinator}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg mt-4 flex items-center justify-center gap-2"
                    >{t.copy.requestSandboxToken}<ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <Sparkle className="w-8 h-8 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-slate-900">{t.copy.requestSentSuccessfully}</h3>
                      <p className="text-sm text-slate-500 max-w-sm mx-auto">{t.copy.hi}{firstName}{t.copy.weveGeneratedASandboxAccessTokenAndEmailed} <span className="font-semibold text-slate-800">{email}</span>{t.copy.oneOfOurHealthcareIntegrationDirectorsWillConnect}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setIsDemoSubmitted(false);
                        setFirstName('');
                        setLastName('');
                        setEmail('');
                        setOrganization('');
                        setRole('');
                      }}
                      className="text-xs text-blue-600 font-bold hover:underline"
                    >{t.copy.submitAnotherInquiry}</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
