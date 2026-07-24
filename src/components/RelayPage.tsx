/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, ArrowRight, Play, RefreshCw, Settings, Sparkles, Check, 
  Smartphone, Eye, Layers, Split, Palette, Code, Sliders, CheckCircle, 
  CheckCircle2, AlertTriangle, UserCheck, Shield, ShieldCheck, Database, 
  SlidersHorizontal, Layout, Zap, Users, BarChart3, HelpCircle, ChevronDown, 
  ChevronUp, Lock, MapPin, Mail, Phone, MessageSquare, Trash2, Send, Terminal,
  Maximize2, Laptop, Monitor, Undo, Redo, Plus, Trash
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import { relayPageTranslations } from '../translations/RelayPageTranslations';

interface RelayPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

type NodeID = 'start' | 'id_verify' | 'selfie_check' | 'db_screen' | 'outcome';

interface StartConfig {
  title: string;
  buttonText: string;
  brandColor: string;
  borderRadius: 'sharp' | 'rounded' | 'pill';
  showLogo: boolean;
}

interface IdVerifyConfig {
  skip: boolean;
  requireBack: boolean;
  allowUploads: boolean;
  docType: 'all' | 'passport' | 'dl';
}

interface SelfieConfig {
  skip: boolean;
  strictLiveness: boolean;
  maskOverlay: 'oval' | 'grid' | 'none';
}

interface DbScreenConfig {
  skip: boolean;
  runSanctions: boolean;
  runPep: boolean;
  runAdverseMedia: boolean;
}

interface OutcomeConfig {
  title: string;
  autoApprove: boolean;
  redirectUrl: string;
}

type RelayLanguage = keyof typeof relayPageTranslations;
type RelayPageTranslationKey = keyof typeof relayPageTranslations.en;

const relayStartTitleKeys: readonly RelayPageTranslationKey[] = [
  'defaultStartTitle',
  'presetFintechStartTitle',
  'presetGigStartTitle',
  'presetAgeStartTitle'
];

const relayStartButtonKeys: readonly RelayPageTranslationKey[] = [
  'defaultStartButton',
  'presetFintechButton',
  'presetGigButton',
  'presetAgeButton'
];

const relayOutcomeTitleKeys: readonly RelayPageTranslationKey[] = [
  'defaultOutcomeTitle',
  'presetFintechOutcomeTitle',
  'presetGigOutcomeTitle',
  'presetAgeOutcomeTitle'
];

const relayFlowNameKeys: readonly RelayPageTranslationKey[] = [
  'defaultFlowName'
];

const findRelayTranslationKey = (
  value: string,
  keys: readonly RelayPageTranslationKey[]
): RelayPageTranslationKey | null => (
  keys.find((key) => Object.values(relayPageTranslations).some((translations) => translations[key] === value)) ?? null
);

export default function RelayPage({ onOpenSandbox, onBackToLanding, onViewChange }: RelayPageProps) {
  const { language } = useLanguage();
  const t = (key: RelayPageTranslationKey) => {
    const lang = language as RelayLanguage;
    return getLocalizedValue(getLocalizedRecord(relayPageTranslations, lang as keyof typeof relayPageTranslations, 'relayPageTranslations'), key, lang, 'relayPageTranslations');
  };

  // 1. Flow Editor State Configuration
  const [activeNode, setActiveNode] = useState<NodeID>('start');
  const [activeTab, setActiveTab] = useState<'collect' | 'verify' | 'route' | 'refine'>('collect');
  const [useCasePreset, setUseCasePreset] = useState<'fintech' | 'gig' | 'age_gate'>('fintech');

  // Node configurations
  const [startConfig, setStartConfig] = useState<StartConfig>({
    title: t('defaultStartTitle'),
    buttonText: t('defaultStartButton'),
    brandColor: '#354CE1',
    borderRadius: 'rounded',
    showLogo: true
  });

  const [idVerifyConfig, setIdVerifyConfig] = useState<IdVerifyConfig>({
    skip: false,
    requireBack: true,
    allowUploads: true,
    docType: 'all'
  });

  const [selfieConfig, setSelfieConfig] = useState<SelfieConfig>({
    skip: false,
    strictLiveness: true,
    maskOverlay: 'oval'
  });

  const [dbScreenConfig, setDbScreenConfig] = useState<DbScreenConfig>({
    skip: false,
    runSanctions: true,
    runPep: true,
    runAdverseMedia: false
  });

  const [outcomeConfig, setOutcomeConfig] = useState<OutcomeConfig>({
    title: t('defaultOutcomeTitle'),
    autoApprove: true,
    redirectUrl: 'https://acme-fintech.com/dashboard'
  });

  // 4. Sandbox Credentials Generator
  const [flowName, setFlowName] = useState<string>(t('defaultFlowName'));
  const [environment, setEnvironment] = useState<'sandbox' | 'production'>('sandbox');
  const [generatedSnippet, setGeneratedSnippet] = useState<boolean>(false);
  const [snippetLanguage, setSnippetLanguage] = useState<'react' | 'html' | 'node' | 'curl'>('react');

  // Sync state values with language changes when they are at their defaults
  useEffect(() => {
    const startTitleKey = findRelayTranslationKey(startConfig.title, relayStartTitleKeys);
    const startButtonKey = findRelayTranslationKey(startConfig.buttonText, relayStartButtonKeys);
    const outcomeTitleKey = findRelayTranslationKey(outcomeConfig.title, relayOutcomeTitleKeys);
    const flowNameKey = findRelayTranslationKey(flowName, relayFlowNameKeys);

    if (startTitleKey || startButtonKey) {
      setStartConfig(prev => ({
        ...prev,
        title: startTitleKey ? t(startTitleKey) : prev.title,
        buttonText: startButtonKey ? t(startButtonKey) : prev.buttonText
      }));
    }
    if (outcomeTitleKey) {
      setOutcomeConfig(prev => ({
        ...prev,
        title: t(outcomeTitleKey)
      }));
    }
    if (flowNameKey) {
      setFlowName(t(flowNameKey));
    }
  }, [language]);

  // 2. Mobile Simulator States
  const [simStep, setSimStep] = useState<'start' | 'id_verify' | 'selfie_check' | 'db_screen' | 'complete'>('start');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simProgress, setSimProgress] = useState<number>(0);
  const [idCapturedFront, setIdCapturedFront] = useState<boolean>(false);
  const [idCapturedBack, setIdCapturedBack] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [selfieStatus, setSelfieStatus] = useState<'idle' | 'scanning' | 'analyzing' | 'done'>('idle');
  const [dbScanStatus, setDbScanStatus] = useState<'idle' | 'checking_sanctions' | 'checking_pep' | 'analyzing_ip' | 'done'>('idle');

  // 3. Dropdown FAQs State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Apply use case presets
  useEffect(() => {
    if (useCasePreset === 'fintech') {
      setStartConfig({
        title: t('presetFintechStartTitle'),
        buttonText: t('presetFintechButton'),
        brandColor: '#10B981', // emerald-500
        borderRadius: 'rounded',
        showLogo: true
      });
      setIdVerifyConfig({
        skip: false,
        requireBack: true,
        allowUploads: false,
        docType: 'all'
      });
      setSelfieConfig({
        skip: false,
        strictLiveness: true,
        maskOverlay: 'oval'
      });
      setDbScreenConfig({
        skip: false,
        runSanctions: true,
        runPep: true,
        runAdverseMedia: true
      });
      setOutcomeConfig({
        title: t('presetFintechOutcomeTitle'),
        autoApprove: true,
        redirectUrl: 'https://acme-bank.com/dashboard'
      });
    } else if (useCasePreset === 'gig') {
      setStartConfig({
        title: t('presetGigStartTitle'),
        buttonText: t('presetGigButton'),
        brandColor: '#F59E0B', // amber-500
        borderRadius: 'pill',
        showLogo: false
      });
      setIdVerifyConfig({
        skip: false,
        requireBack: false,
        allowUploads: true,
        docType: 'dl'
      });
      setSelfieConfig({
        skip: false,
        strictLiveness: false,
        maskOverlay: 'grid'
      });
      setDbScreenConfig({
        skip: true,
        runSanctions: false,
        runPep: false,
        runAdverseMedia: false
      });
      setOutcomeConfig({
        title: t('presetGigOutcomeTitle'),
        autoApprove: true,
        redirectUrl: 'https://gigforce.app/dashboard'
      });
    } else if (useCasePreset === 'age_gate') {
      setStartConfig({
        title: t('presetAgeStartTitle'),
        buttonText: t('presetAgeButton'),
        brandColor: '#3B82F6', // blue-500
        borderRadius: 'sharp',
        showLogo: true
      });
      setIdVerifyConfig({
        skip: true,
        requireBack: false,
        allowUploads: false,
        docType: 'all'
      });
      setSelfieConfig({
        skip: false,
        strictLiveness: true,
        maskOverlay: 'oval'
      });
      setDbScreenConfig({
        skip: false,
        runSanctions: false,
        runPep: false,
        runAdverseMedia: false
      });
      setOutcomeConfig({
        title: t('presetAgeOutcomeTitle'),
        autoApprove: true,
        redirectUrl: 'https://restricted-media.net/home'
      });
    }
  }, [useCasePreset]);

  // Handle flow simulator animation run
  const runOnboardingSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep('start');
    setSimProgress(0);
    setIdCapturedFront(false);
    setIdCapturedBack(false);
    setSelfieStatus('idle');
    setDbScanStatus('idle');

    // Interval timers to step through the sequence, skipping skipped steps
    let current = 'start';
    let progress = 10;
    setSimProgress(progress);

    const runNext = () => {
      if (current === 'start') {
        if (!idVerifyConfig.skip) {
          current = 'id_verify';
          setSimStep('id_verify');
          progress = 30;
          setSimProgress(progress);
        } else if (!selfieConfig.skip) {
          current = 'selfie_check';
          setSimStep('selfie_check');
          progress = 55;
          setSimProgress(progress);
        } else if (!dbScreenConfig.skip) {
          current = 'db_screen';
          setSimStep('db_screen');
          progress = 80;
          setSimProgress(progress);
        } else {
          current = 'complete';
          setSimStep('complete');
          progress = 100;
          setSimProgress(progress);
          setIsSimulating(false);
        }
      } else if (current === 'id_verify') {
        // Trigger capture front
        setIsCapturing(true);
        setTimeout(() => {
          setIdCapturedFront(true);
          setIsCapturing(false);
          
          if (idVerifyConfig.requireBack) {
            setTimeout(() => {
              setIsCapturing(true);
              setTimeout(() => {
                setIdCapturedBack(true);
                setIsCapturing(false);
                goToPostId();
              }, 1000);
            }, 1000);
          } else {
            goToPostId();
          }
        }, 1000);

        const goToPostId = () => {
          setTimeout(() => {
            if (!selfieConfig.skip) {
              current = 'selfie_check';
              setSimStep('selfie_check');
              progress = 55;
              setSimProgress(progress);
            } else if (!dbScreenConfig.skip) {
              current = 'db_screen';
              setSimStep('db_screen');
              progress = 80;
              setSimProgress(progress);
            } else {
              current = 'complete';
              setSimStep('complete');
              progress = 100;
              setSimProgress(progress);
              setIsSimulating(false);
            }
          }, 1200);
        };
      } else if (current === 'selfie_check') {
        setSelfieStatus('scanning');
        setTimeout(() => {
          setSelfieStatus('analyzing');
          setTimeout(() => {
            setSelfieStatus('done');
            setTimeout(() => {
              if (!dbScreenConfig.skip) {
                current = 'db_screen';
                setSimStep('db_screen');
                progress = 80;
                setSimProgress(progress);
              } else {
                current = 'complete';
                setSimStep('complete');
                progress = 100;
                setSimProgress(progress);
                setIsSimulating(false);
              }
            }, 1200);
          }, 1200);
        }, 1200);
      } else if (current === 'db_screen') {
        setDbScanStatus('checking_sanctions');
        setTimeout(() => {
          setDbScanStatus('checking_pep');
          setTimeout(() => {
            setDbScanStatus('analyzing_ip');
            setTimeout(() => {
              setDbScanStatus('done');
              setTimeout(() => {
                current = 'complete';
                setSimStep('complete');
                progress = 100;
                setSimProgress(progress);
                setIsSimulating(false);
              }, 1200);
            }, 1000);
          }, 1000);
        }, 1000);
      }
    };

    // Kick off intervals manually
    setTimeout(() => {
      runNext();
    }, 1500);
  };

  useEffect(() => {
    // Keep simulation step aligned with activeNode if user is configuring manually
    if (!isSimulating) {
      if (activeNode === 'start') setSimStep('start');
      else if (activeNode === 'id_verify' && !idVerifyConfig.skip) setSimStep('id_verify');
      else if (activeNode === 'selfie_check' && !selfieConfig.skip) setSimStep('selfie_check');
      else if (activeNode === 'db_screen' && !dbScreenConfig.skip) setSimStep('db_screen');
      else if (activeNode === 'outcome') setSimStep('complete');
    }
  }, [activeNode, isSimulating, idVerifyConfig.skip, selfieConfig.skip, dbScreenConfig.skip]);

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => (prev === index ? null : index));
  };

  const handleCreateFlow = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedSnippet(true);
  };

  // Helper styles for phone radius configuration
  const getRadiusClass = (type: 'sharp' | 'rounded' | 'pill') => {
    if (type === 'sharp') return 'rounded-none';
    if (type === 'pill') return 'rounded-3xl';
    return 'rounded-xl';
  };

  const getButtonRadiusClass = (type: 'sharp' | 'rounded' | 'pill') => {
    if (type === 'sharp') return 'rounded-none';
    if (type === 'pill') return 'rounded-full';
    return 'rounded-lg';
  };

  const getCodeSnippet = () => {
    const activeSteps = [
      'InquiryStartStep',
      !idVerifyConfig.skip ? 'GovernmentIdStep' : null,
      !selfieConfig.skip ? 'SelfieLivenessStep' : null,
      !dbScreenConfig.skip ? 'DatabaseWatchlistStep' : null,
      'InquiryOutcomeStep'
    ].filter(Boolean);

    if (snippetLanguage === 'react') {
      return `import React from 'react';
import Identra from 'identra-react';

export default function IdentityOnboarding() {
  return (
    <Identra.Inquiry
      templateId="itmpl_flow_editor_live"
      environment="${environment}"
      onComplete={({ inquiryId, status }) => {
        console.log(\`${t('codeVerifiedLog')} \${inquiryId} ${t('codeWithStateLog')} \${status}\`);
        window.location.href = "${outcomeConfig.redirectUrl}";
      }}
      theme={{
        brandColor: "${startConfig.brandColor}",
        borderRadius: "${startConfig.borderRadius === 'sharp' ? 0 : startConfig.borderRadius === 'pill' ? 24 : 12}",
        fontFamily: "system-ui, sans-serif"
      }}
      config={{
        steps: ${JSON.stringify(activeSteps, null, 8)}
      }}
    />
  );
}`;
    }
    if (snippetLanguage === 'node') {
      return `const Identra = require('@identra/node');
const client = new Identra.Client({
  apiKey: process.env.IDENTRA_API_KEY,
  environment: '${environment}'
});

async function configureInquiryFlow() {
  const template = await client.templates.update('itmpl_flow_editor_live', {
    name: "${flowName}",
    config: {
      steps: ${JSON.stringify(activeSteps)}
    },
    theme: {
      primary_color: "${startConfig.brandColor}",
      border_radius: "${startConfig.borderRadius}"
    }
  });
  console.log('${t('codeFlowConfiguredLog')}', template.id);
}`;
    }
    if (snippetLanguage === 'html') {
      return `<!-- ${t('codeIncludeSdkComment')} -->
<script src="https://cdn.withidentra.com/dist/identra-v4.js"></script>

<button id="verify-btn" style="background: ${startConfig.brandColor}; border-radius: ${startConfig.borderRadius === 'pill' ? '24px' : startConfig.borderRadius === 'rounded' ? '8px' : '0px'}">
  ${startConfig.buttonText}
</button>

<script>
  const client = new Identra.Client({
    templateId: "itmpl_flow_editor_live",
    environment: "${environment}",
    onComplete: (data) => {
      window.location.href = "${outcomeConfig.redirectUrl}";
    }
  });
  
  document.getElementById('verify-btn').addEventListener('click', () => {
    client.open();
  });
</script>`;
    }
    return `curl -X POST https://api.withidentra.com/v1/inquiry-templates \\
  -H "Authorization: Bearer $IDENTRA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": {
      "type": "inquiry-template",
      "attributes": {
        "name": "${flowName}",
        "environment": "${environment}",
        "steps": ${JSON.stringify(activeSteps)},
        "theme": {
          "brand_color": "${startConfig.brandColor}",
          "border_shape": "${startConfig.borderRadius}"
        }
      }
    }
  }'`;
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased font-sans">
      
      {/* Top Breadcrumb Header Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <button 
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-950 transition font-medium group"
          id="flow_editor_back_btn"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t('backToLanding')}</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#354CE1]/10 text-[#354CE1] rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#354CE1]" />
              <span>{t('flowEditor')}</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.05]" id="flow_editor_hero_title">
              {t('heroTitle')}
            </h1>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              {t('heroDesc')}
            </p>

            {/* Quick Presets */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{t('loadTemplate')}</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setUseCasePreset('fintech')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                    useCasePreset === 'fintech' 
                      ? 'bg-slate-900 border-transparent text-white' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  {t('fintechKyc')}
                </button>
                <button
                  onClick={() => setUseCasePreset('gig')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                    useCasePreset === 'gig' 
                      ? 'bg-slate-900 border-transparent text-white' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  {t('gigSignup')}
                </button>
                <button
                  onClick={() => setUseCasePreset('age_gate')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                    useCasePreset === 'age_gate' 
                      ? 'bg-slate-900 border-transparent text-white' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  {t('ageAssurance')}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button 
                onClick={onOpenSandbox}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#354CE1] hover:bg-[#2A3EB3] text-white font-bold rounded-full text-sm shadow-md transition"
                id="flow_editor_hero_cta_sandbox"
              >
                <span>{t('requestApiCreds')}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('flow_editor_workspace');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-full transition"
                id="flow_editor_hero_cta_workspace"
              >
                <span>{t('enterInteractiveEditor')}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Right Visual: Isometric Layout Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[480px] h-[340px] bg-white border border-slate-200 rounded-[32px] p-6 shadow-xl overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
              
              {/* Isometric blocks graphic */}
              <div className="relative z-10 flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 font-mono">{t('flowTemplateProd')}</span>
              </div>

              {/* Graphic Flow Nodes stacked */}
              <div className="relative z-10 space-y-3.5 flex-1 flex flex-col justify-center py-4">
                
                {/* Node item 1 */}
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl max-w-sm ml-0 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-[#354CE1]">
                      <Layout className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">{t('startScreen')}</h4>
                      <p className="text-[10px] text-slate-400">{t('startScreenDesc')}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">{t('active')}</span>
                </div>

                {/* Node item 2 */}
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl max-w-sm ml-8 shadow-sm relative">
                  {/* Connection Line */}
                  <div className="absolute -left-4 -top-3 w-4 h-6 border-l-2 border-b-2 border-dashed border-slate-300 rounded-bl-lg" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-[#354CE1]">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">{t('idScanSelfie')}</h4>
                      <p className="text-[10px] text-slate-400">{t('idScanSelfieDesc')}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">{t('active')}</span>
                </div>

                {/* Node item 3 */}
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl max-w-sm ml-16 shadow-sm relative">
                  {/* Connection Line */}
                  <div className="absolute -left-4 -top-3 w-4 h-6 border-l-2 border-b-2 border-dashed border-slate-300 rounded-bl-lg" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                      <Split className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">{t('smartRiskCheck')}</h4>
                      <p className="text-[10px] text-slate-400">{t('smartRiskCheckDesc')}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono bg-[#354CE1]/10 text-[#354CE1] px-1.5 py-0.5 rounded font-bold">{t('conditional')}</span>
                </div>

              </div>

              {/* Stat footer */}
              <div className="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[10px] font-mono">
                <span>{t('systemSpeed')}</span>
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {t('instantHotReloadBadge')}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Feature Area: The Visual Flow Workspace */}
      <div className="bg-slate-900 text-white border-y border-slate-950 py-20" id="flow_editor_workspace">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('interactiveFlowWorkspace')}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {t('workspaceDesc')}
            </p>
          </div>

          {/* Interactive Workbench */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Dynamic visual node graph editor (6 cols) */}
            <div className="xl:col-span-7 flex flex-col justify-between bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
              
              <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-slate-400 font-mono">{t('flowBuilderCanvas')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setUseCasePreset('fintech')} 
                      className="p-1 bg-slate-900 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition"
                      title={t('resetParams')}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-mono">{t('builderVersion')}</span>
                  </div>
                </div>

                {/* Node Stack Panel */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">{t('flowPathSteps')}</span>
                  
                  {/* 1. Start Screen Node */}
                  <button type="button"
                    onClick={() => setActiveNode('start')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      activeNode === 'start' 
                        ? 'bg-[#354CE1]/15 border-[#354CE1] shadow-[0_0_15px_rgba(53,76,225,0.15)]' 
                        : 'bg-slate-900 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeNode === 'start' ? 'bg-[#354CE1] text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <Layout className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white">{t('startScreenNode')}</h4>
                        <p className="text-xs text-slate-400">{t('startScreenNodeDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-900/30 rounded">{t('required')}</span>
                    </div>
                  </button>

                  {/* 2. Gov ID Node */}
                  <button type="button"
                    onClick={() => setActiveNode('id_verify')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      activeNode === 'id_verify' 
                        ? 'bg-[#354CE1]/15 border-[#354CE1] shadow-[0_0_15px_rgba(53,76,225,0.15)]' 
                        : 'bg-slate-900 border-slate-800/80 hover:border-slate-700'
                    } ${idVerifyConfig.skip ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeNode === 'id_verify' ? 'bg-[#354CE1] text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <Smartphone className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                          <span>{t('governmentIdScan')}</span>
                          {idVerifyConfig.skip && <span className="text-[10px] font-normal text-slate-500">({t('bypassed')})</span>}
                        </h4>
                        <p className="text-xs text-slate-400">{t('governmentIdScanDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${idVerifyConfig.skip ? 'bg-slate-900 text-slate-500 border-slate-800' : 'bg-[#354CE1]/10 text-[#7185FF] border-[#354CE1]/20'}`}>
                        {idVerifyConfig.skip ? t('disabled') : t('active')}
                      </span>
                    </div>
                  </button>

                  {/* 3. Selfie Match Node */}
                  <button type="button"
                    onClick={() => setActiveNode('selfie_check')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      activeNode === 'selfie_check' 
                        ? 'bg-[#354CE1]/15 border-[#354CE1] shadow-[0_0_15px_rgba(53,76,225,0.15)]' 
                        : 'bg-slate-900 border-slate-800/80 hover:border-slate-700'
                    } ${selfieConfig.skip ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeNode === 'selfie_check' ? 'bg-[#354CE1] text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <UserCheck className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                          <span>{t('selfieLivenessCheck')}</span>
                          {selfieConfig.skip && <span className="text-[10px] font-normal text-slate-500">({t('bypassed')})</span>}
                        </h4>
                        <p className="text-xs text-slate-400">{t('selfieLivenessCheckDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${selfieConfig.skip ? 'bg-slate-900 text-slate-500 border-slate-800' : 'bg-[#354CE1]/10 text-[#7185FF] border-[#354CE1]/20'}`}>
                        {selfieConfig.skip ? t('disabled') : t('active')}
                      </span>
                    </div>
                  </button>

                  {/* 4. DB Screening Node */}
                  <button type="button"
                    onClick={() => setActiveNode('db_screen')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      activeNode === 'db_screen' 
                        ? 'bg-[#354CE1]/15 border-[#354CE1] shadow-[0_0_15px_rgba(53,76,225,0.15)]' 
                        : 'bg-slate-900 border-slate-800/80 hover:border-slate-700'
                    } ${dbScreenConfig.skip ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeNode === 'db_screen' ? 'bg-[#354CE1] text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <Database className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                          <span>{t('databaseScreening')}</span>
                          {dbScreenConfig.skip && <span className="text-[10px] font-normal text-slate-500">({t('bypassed')})</span>}
                        </h4>
                        <p className="text-xs text-slate-400">{t('databaseScreeningDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${dbScreenConfig.skip ? 'bg-slate-900 text-slate-500 border-slate-800' : 'bg-[#354CE1]/10 text-[#7185FF] border-[#354CE1]/20'}`}>
                        {dbScreenConfig.skip ? t('disabled') : t('active')}
                      </span>
                    </div>
                  </button>

                  {/* 5. Outcome Node */}
                  <button type="button"
                    onClick={() => setActiveNode('outcome')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      activeNode === 'outcome' 
                        ? 'bg-[#354CE1]/15 border-[#354CE1] shadow-[0_0_15px_rgba(53,76,225,0.15)]' 
                        : 'bg-slate-900 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeNode === 'outcome' ? 'bg-[#354CE1] text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <CheckCircle2 className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-white">{t('inquiryOutcomeNode')}</h4>
                        <p className="text-xs text-slate-400">{t('inquiryOutcomeNodeDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-[#354CE1]/10 text-[#7185FF] border border-[#354CE1]/20 px-2 py-0.5 rounded">{t('outcome')}</span>
                    </div>
                  </button>

                </div>
              </div>

              {/* Dynamic Editor Panel underneath based on active node */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 bg-slate-900/40 p-5 rounded-2xl border border-slate-850">
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    {activeNode === 'start' && t('configStartScreen')}
                    {activeNode === 'id_verify' && t('configGovId')}
                    {activeNode === 'selfie_check' && t('configSelfie')}
                    {activeNode === 'db_screen' && t('configDatabase')}
                    {activeNode === 'outcome' && t('configOutcome')}
                  </span>
                </div>

                {/* Sub-panels for configurations */}
                {activeNode === 'start' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 block">{t('customScreenTitle')}</label>
                      <input 
                        type="text" 
                        value={startConfig.title}
                        onChange={(e) => setStartConfig(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#354CE1]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 block">{t('customCtaButton')}</label>
                      <input 
                        type="text" 
                        value={startConfig.buttonText}
                        onChange={(e) => setStartConfig(prev => ({ ...prev, buttonText: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#354CE1]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 block">{t('brandAccentColor')}</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="color" 
                          value={startConfig.brandColor}
                          onChange={(e) => setStartConfig(prev => ({ ...prev, brandColor: e.target.value }))}
                          className="w-10 h-8 bg-slate-950 border border-slate-850 p-1 rounded cursor-pointer"
                        />
                        <span className="text-xs font-mono text-slate-400">{startConfig.brandColor}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 block">{t('borderRadiusStyle')}</label>
                      <select 
                        value={startConfig.borderRadius}
                        onChange={(e) => setStartConfig(prev => ({ ...prev, borderRadius: e.target.value as 'sharp' | 'rounded' | 'pill' }))}
                        className="w-full bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#354CE1]"
                      >
                        <option value="sharp">{t('sharpEdges')}</option>
                        <option value="rounded">{t('roundedCorners')}</option>
                        <option value="pill">{t('pillCurves')}</option>
                      </select>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex items-center gap-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="show_logo_chk" 
                        checked={startConfig.showLogo}
                        onChange={(e) => setStartConfig(prev => ({ ...prev, showLogo: e.target.checked }))}
                        className="rounded bg-slate-950 border-slate-800 text-[#354CE1] focus:ring-[#354CE1]"
                      />
                      <label htmlFor="show_logo_chk" className="text-xs text-slate-300">{t('displayShieldLogo')}</label>
                    </div>
                  </div>
                )}

                {activeNode === 'id_verify' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="id_skip_chk" 
                          checked={idVerifyConfig.skip}
                          onChange={(e) => setIdVerifyConfig(prev => ({ ...prev, skip: e.target.checked }))}
                          className="rounded bg-slate-950 border-slate-800 text-[#354CE1] focus:ring-[#354CE1]"
                        />
                        <label htmlFor="id_skip_chk" className="text-xs text-slate-300 font-bold">{t('skipIdStep')}</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="id_back_chk" 
                          disabled={idVerifyConfig.skip}
                          checked={idVerifyConfig.requireBack}
                          onChange={(e) => setIdVerifyConfig(prev => ({ ...prev, requireBack: e.target.checked }))}
                          className="rounded bg-slate-950 border-slate-800 text-[#354CE1] focus:ring-[#354CE1] disabled:opacity-50"
                        />
                        <label htmlFor="id_back_chk" className="text-xs text-slate-300 disabled:opacity-50">{t('requireIdBack')}</label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 block disabled:opacity-50">{t('allowedDocTypes')}</label>
                        <select 
                          disabled={idVerifyConfig.skip}
                          value={idVerifyConfig.docType}
                          onChange={(e) => setIdVerifyConfig(prev => ({ ...prev, docType: e.target.value as 'all' | 'passport' | 'dl' }))}
                          className="w-full bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#354CE1] disabled:opacity-50"
                        >
                          <option value="all">{t('acceptAllDocs')}</option>
                          <option value="passport">{t('passportsOnly')}</option>
                          <option value="dl">{t('dlOnly')}</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <input 
                          type="checkbox" 
                          id="id_upload_chk" 
                          disabled={idVerifyConfig.skip}
                          checked={idVerifyConfig.allowUploads}
                          onChange={(e) => setIdVerifyConfig(prev => ({ ...prev, allowUploads: e.target.checked }))}
                          className="rounded bg-slate-950 border-slate-800 text-[#354CE1] focus:ring-[#354CE1] disabled:opacity-50"
                        />
                        <label htmlFor="id_upload_chk" className="text-xs text-slate-300 disabled:opacity-50">{t('allowUploads')}</label>
                      </div>
                    </div>
                  </div>
                )}

                {activeNode === 'selfie_check' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="selfie_skip_chk" 
                          checked={selfieConfig.skip}
                          onChange={(e) => setSelfieConfig(prev => ({ ...prev, skip: e.target.checked }))}
                          className="rounded bg-slate-950 border-slate-800 text-[#354CE1] focus:ring-[#354CE1]"
                        />
                        <label htmlFor="selfie_skip_chk" className="text-xs text-slate-300 font-bold">{t('skipSelfieStep')}</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="strict_live_chk" 
                          disabled={selfieConfig.skip}
                          checked={selfieConfig.strictLiveness}
                          onChange={(e) => setSelfieConfig(prev => ({ ...prev, strictLiveness: e.target.checked }))}
                          className="rounded bg-slate-950 border-slate-800 text-[#354CE1] focus:ring-[#354CE1] disabled:opacity-50"
                        />
                        <label htmlFor="strict_live_chk" className="text-xs text-slate-300 disabled:opacity-50">{t('enforceStrictLiveness')}</label>
                      </div>
                    </div>
                    <div className="space-y-2 pt-2 max-w-sm">
                      <label className="text-[11px] font-bold text-slate-400 block disabled:opacity-50">{t('cameraGuideMask')}</label>
                      <select 
                        disabled={selfieConfig.skip}
                        value={selfieConfig.maskOverlay}
                        onChange={(e) => setSelfieConfig(prev => ({ ...prev, maskOverlay: e.target.value as 'oval' | 'grid' | 'none' }))}
                        className="w-full bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#354CE1] disabled:opacity-50"
                      >
                        <option value="oval">{t('silhouetteOval')}</option>
                        <option value="grid">{t('meshGrid')}</option>
                        <option value="none">{t('noLayoutMask')}</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeNode === 'db_screen' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="db_skip_chk" 
                        checked={dbScreenConfig.skip}
                        onChange={(e) => setDbScreenConfig(prev => ({ ...prev, skip: e.target.checked }))}
                        className="rounded bg-slate-950 border-slate-800 text-[#354CE1] focus:ring-[#354CE1]"
                      />
                      <label htmlFor="db_skip_chk" className="text-xs text-slate-300 font-bold">{t('skipDbStep')}</label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="sanctions_chk" 
                          disabled={dbScreenConfig.skip}
                          checked={dbScreenConfig.runSanctions}
                          onChange={(e) => setDbScreenConfig(prev => ({ ...prev, runSanctions: e.target.checked }))}
                          className="rounded bg-slate-950 border-slate-800 text-[#354CE1] focus:ring-[#354CE1] disabled:opacity-50"
                        />
                        <label htmlFor="sanctions_chk" className="text-xs text-slate-300 disabled:opacity-50">{t('ofacSanctions')}</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="pep_chk" 
                          disabled={dbScreenConfig.skip}
                          checked={dbScreenConfig.runPep}
                          onChange={(e) => setDbScreenConfig(prev => ({ ...prev, runPep: e.target.checked }))}
                          className="rounded bg-slate-950 border-slate-800 text-[#354CE1] focus:ring-[#354CE1] disabled:opacity-50"
                        />
                        <label htmlFor="pep_chk" className="text-xs text-slate-300 disabled:opacity-50">{t('screenPep')}</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="adv_chk" 
                          disabled={dbScreenConfig.skip}
                          checked={dbScreenConfig.runAdverseMedia}
                          onChange={(e) => setDbScreenConfig(prev => ({ ...prev, runAdverseMedia: e.target.checked }))}
                          className="rounded bg-slate-950 border-slate-800 text-[#354CE1] focus:ring-[#354CE1] disabled:opacity-50"
                        />
                        <label htmlFor="adv_chk" className="text-xs text-slate-300 disabled:opacity-50">{t('adverseMedia')}</label>
                      </div>
                    </div>
                  </div>
                )}

                {activeNode === 'outcome' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 block">{t('outcomeScreenTitle')}</label>
                      <input 
                        type="text" 
                        value={outcomeConfig.title}
                        onChange={(e) => setOutcomeConfig(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-xl text-xs text-white focus:outline-none focus:border-[#354CE1]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 block">{t('postVerifyRedirect')}</label>
                      <input 
                        type="text" 
                        value={outcomeConfig.redirectUrl}
                        onChange={(e) => setOutcomeConfig(prev => ({ ...prev, redirectUrl: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#354CE1]"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex items-center gap-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="auto_approve_chk" 
                        checked={outcomeConfig.autoApprove}
                        onChange={(e) => setOutcomeConfig(prev => ({ ...prev, autoApprove: e.target.checked }))}
                        className="rounded bg-slate-950 border-slate-800 text-[#354CE1] focus:ring-[#354CE1]"
                      />
                      <label htmlFor="auto_approve_chk" className="text-xs text-slate-300">{t('autoApproveInquiry')}</label>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right: Live user onboarding emulator (5 cols) */}
            <div className="xl:col-span-5 flex flex-col items-center justify-between bg-slate-950 border border-slate-800 rounded-3xl p-6 relative">
              
              <div className="w-full space-y-4">
                {/* Emulator control bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 font-mono">
                    <Smartphone className="w-4 h-4" />
                    <span>{t('emulatorPreview')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span>{t('liveConnected')}</span>
                  </div>
                </div>

                {/* Simulated Step Progress Indicator */}
                <div className="bg-slate-900 border border-slate-800/60 p-2.5 rounded-2xl flex items-center justify-between gap-2.5">
                  <span className="text-[10px] font-bold text-slate-400 font-mono">{t('stepState')}{simStep.toUpperCase()}</span>
                  <div className="flex-1 max-w-[140px] h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#354CE1] transition-all duration-500"
                      style={{ width: `${isSimulating ? simProgress : simStep === 'start' ? 10 : simStep === 'id_verify' ? 30 : simStep === 'selfie_check' ? 55 : simStep === 'db_screen' ? 80 : 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#7185FF] font-mono">
                    {isSimulating ? `${simProgress}%` : simStep === 'start' ? '10%' : simStep === 'id_verify' ? '30%' : simStep === 'selfie_check' ? '55%' : simStep === 'db_screen' ? '80%' : '100%'}
                  </span>
                </div>
              </div>

              {/* Mobile device frame casing */}
              <div className="my-6 w-full max-w-[290px] aspect-[9/18] bg-slate-900 border-[6px] border-slate-800 rounded-[38px] overflow-hidden shadow-2xl relative">
                
                {/* Speaker top detail */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-full z-20 flex items-center justify-center">
                  <div className="w-10 h-0.5 bg-slate-950 rounded-full" />
                </div>

                {/* Device Screen Area */}
                <div className="bg-slate-950 p-5 pt-10 h-full text-slate-800 flex flex-col justify-between">
                  
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono mb-4">
                    <span>{t('mockTime')}</span>
                    <div className="flex items-center gap-1">
                      <span>{t('mockNetwork')}</span>
                      <div className="w-3.5 h-1.5 border border-slate-500 rounded bg-slate-500" />
                    </div>
                  </div>

                  {/* SCREEN 1: Start Screen */}
                  {simStep === 'start' && (
                    <div className="flex-1 flex flex-col justify-between py-2 text-center">
                      <div className="space-y-4">
                        {startConfig.showLogo && (
                          <div className="mx-auto w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#354CE1] shadow-inner">
                            <Shield className="w-5.5 h-5.5" />
                          </div>
                        )}
                        <h4 className="font-display font-black text-lg text-white leading-tight">
                          {startConfig.title || t('outcomeCompleteTitle')}
                        </h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                          {t('protectAssetsTip')}
                        </p>
                      </div>

                      <div className="space-y-3 pt-6 border-t border-slate-900">
                        <button 
                          onClick={() => {
                            if (!idVerifyConfig.skip) setSimStep('id_verify');
                            else if (!selfieConfig.skip) setSimStep('selfie_check');
                            else if (!dbScreenConfig.skip) setSimStep('db_screen');
                            else setSimStep('complete');
                          }}
                          className={`w-full py-2.5 font-extrabold text-xs text-white shadow transition-transform active:scale-95 flex items-center justify-center gap-1`}
                          style={{ 
                            backgroundColor: startConfig.brandColor,
                            borderRadius: startConfig.borderRadius === 'sharp' ? '0px' : startConfig.borderRadius === 'pill' ? '9999px' : '10px'
                          }}
                        >
                          <span>{startConfig.buttonText || t('getStartedDefault')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <p className="text-[8px] text-slate-500">
                          {t('authorizetip')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 2: Government ID Capture */}
                  {simStep === 'id_verify' && (
                    <div className="flex-1 flex flex-col justify-between py-1 text-slate-300">
                      <div className="space-y-3">
                        <h4 className="font-bold text-sm text-white text-center">{t('scanGovId')}</h4>
                        <p className="text-[9px] text-slate-400 text-center leading-normal">
                          {t('scanGovIdDesc')}
                        </p>

                        {/* Scanner Frame Viewport */}
                        <div className="border border-slate-800 rounded-xl bg-slate-900 aspect-video relative overflow-hidden flex flex-col items-center justify-center text-slate-500">
                          
                          {/* Animated scanner line */}
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-[bounce_2.5s_infinite]" />

                          {isCapturing ? (
                            <div className="flex flex-col items-center gap-1 text-indigo-400 animate-pulse">
                              <RefreshCw className="w-5 h-5 animate-spin" />
                              <span className="text-[8px] font-bold uppercase tracking-wider">{t('capturingDoc')}</span>
                            </div>
                          ) : (
                            <div className="space-y-1.5 text-center px-4">
                              <span className="text-[10px] font-bold text-slate-300">
                                {idCapturedFront ? t('idFrontCaptured') : t('scanIdFront')}
                              </span>
                              {idVerifyConfig.requireBack && (
                                <p className="text-[8px] text-slate-500">
                                  {idCapturedBack ? t('idBackCaptured') : t('scanIdBackRequired')}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Silhouette framing corners */}
                          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-indigo-400" />
                          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-indigo-400" />
                          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-indigo-400" />
                          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-indigo-400" />
                        </div>
                      </div>

                      {/* Control buttons */}
                      <div className="space-y-2 pt-3 border-t border-slate-900">
                        {idVerifyConfig.allowUploads && !idCapturedFront && (
                          <button 
                            onClick={() => setIdCapturedFront(true)}
                            className="w-full py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-[9px] text-slate-400 hover:text-white transition"
                          >
                            {t('uploadImageFile')}
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            if (!selfieConfig.skip) setSimStep('selfie_check');
                            else if (!dbScreenConfig.skip) setSimStep('db_screen');
                            else setSimStep('complete');
                          }}
                          className="w-full py-2 bg-[#354CE1] hover:bg-[#2A3EB3] rounded-lg text-[10px] font-extrabold text-white transition active:scale-95 flex items-center justify-center gap-1"
                        >
                          <span>{t('skipNextStep')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 3: Selfie Liveness Check */}
                  {simStep === 'selfie_check' && (
                    <div className="flex-1 flex flex-col justify-between py-1 text-slate-300">
                      <div className="space-y-3">
                        <h4 className="font-bold text-sm text-white text-center">{t('selfieLivenessVerify')}</h4>
                        <p className="text-[9px] text-slate-400 text-center leading-normal">
                          {t('selfieLivenessVerifyDesc')}
                        </p>

                        {/* Camera Silhouette overlay */}
                        <div className="aspect-square bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center text-slate-500">
                          
                          {/* Silhouette Oval Mask */}
                          {selfieConfig.maskOverlay === 'oval' && (
                            <div className="absolute w-2/3 h-4/5 rounded-[50%/60%] border-2 border-dashed border-indigo-400/40 flex items-center justify-center" />
                          )}

                          {/* wireframe 3D mesh grid */}
                          {selfieConfig.maskOverlay === 'grid' && (
                            <div className="absolute inset-2 grid grid-cols-6 grid-rows-6 gap-1 opacity-25">
                              {Array.from({ length: 36 }).map((_, idx) => (
                                <div key={idx} className="border border-indigo-500/30 rounded-xs" />
                              ))}
                            </div>
                          )}

                          {selfieStatus === 'idle' && (
                            <span className="text-[9px] text-slate-400 font-mono">{t('cameraFeedIdle')}</span>
                          )}
                          {selfieStatus === 'scanning' && (
                            <div className="flex flex-col items-center gap-1.5 text-indigo-400">
                              <div className="w-5 h-5 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                              <span className="text-[8px] font-bold uppercase tracking-wider">{t('detectingLiveness')}</span>
                            </div>
                          )}
                          {selfieStatus === 'analyzing' && (
                            <div className="flex flex-col items-center gap-1.5 text-amber-400 animate-pulse">
                              <ShieldCheck className="w-6 h-6 text-amber-500" />
                              <span className="text-[8px] font-bold uppercase tracking-wider font-mono">{t('analyzingHeadRotation')}</span>
                            </div>
                          )}
                          {selfieStatus === 'done' && (
                            <div className="flex flex-col items-center gap-1.5 text-emerald-400">
                              <Check className="w-6 h-6 text-emerald-500 border border-emerald-500/20 rounded-full p-0.5 bg-emerald-950/20" />
                              <span className="text-[8px] font-bold uppercase tracking-wider">{t('faceBiometricConfirmed')}</span>
                            </div>
                          )}

                        </div>
                      </div>

                      {/* Control buttons */}
                      <div className="pt-3 border-t border-slate-900">
                        <button 
                          onClick={() => {
                            if (!dbScreenConfig.skip) setSimStep('db_screen');
                            else setSimStep('complete');
                          }}
                          className="w-full py-2 bg-[#354CE1] hover:bg-[#2A3EB3] rounded-lg text-[10px] font-extrabold text-white transition active:scale-95 flex items-center justify-center gap-1"
                        >
                          <span>{t('skipNextStep')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 4: Database background checks */}
                  {simStep === 'db_screen' && (
                    <div className="flex-1 flex flex-col justify-between py-1 text-slate-300">
                      <div className="space-y-4">
                        <h4 className="font-bold text-sm text-white text-center">{t('bgDbScreening')}</h4>
                        
                        <div className="space-y-2.5">
                          {/* OFAC Check line */}
                          <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-2">
                              <Database className="w-3.5 h-3.5 text-slate-400" />
                              <span>{t('ofacSanctionsLabel')}</span>
                            </div>
                            {dbScanStatus === 'idle' && <span className="text-slate-500 font-mono">{t('pending')}</span>}
                            {dbScanStatus === 'checking_sanctions' && <span className="text-indigo-400 font-bold animate-pulse font-mono">{t('screeningProgress')}</span>}
                            {['checking_pep', 'analyzing_ip', 'done'].includes(dbScanStatus) && <span className="text-emerald-400 font-bold font-mono">{t('pass')}</span>}
                          </div>

                          {/* PEP check line */}
                          <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-2">
                              <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                              <span>{t('pepLabel')}</span>
                            </div>
                            {['idle', 'checking_sanctions'].includes(dbScanStatus) && <span className="text-slate-500 font-mono">{t('pending')}</span>}
                            {dbScanStatus === 'checking_pep' && <span className="text-indigo-400 font-bold animate-pulse font-mono">{t('screeningProgress')}</span>}
                            {['analyzing_ip', 'done'].includes(dbScanStatus) && <span className="text-emerald-400 font-bold font-mono">{t('pass')}</span>}
                          </div>

                          {/* Risk IP check line */}
                          <div className="p-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{t('ipDeviceRiskAudit')}</span>
                            </div>
                            {['idle', 'checking_sanctions', 'checking_pep'].includes(dbScanStatus) && <span className="text-slate-500 font-mono">{t('pending')}</span>}
                            {dbScanStatus === 'analyzing_ip' && <span className="text-indigo-400 font-bold animate-pulse font-mono">{t('analyzingProgress')}</span>}
                            {dbScanStatus === 'done' && <span className="text-emerald-400 font-bold font-mono">{t('pass')}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Control buttons */}
                      <div className="pt-3 border-t border-slate-900">
                        <button 
                          onClick={() => setSimStep('complete')}
                          className="w-full py-2 bg-[#354CE1] hover:bg-[#2A3EB3] rounded-lg text-[10px] font-extrabold text-white transition active:scale-95 flex items-center justify-center gap-1"
                        >
                          <span>{t('completeScreening')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 5: Onboarding Outcome Complete */}
                  {simStep === 'complete' && (
                    <div className="flex-1 flex flex-col justify-between py-2 text-center text-slate-300">
                      <div className="space-y-4">
                        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-900/30 flex items-center justify-center text-emerald-400">
                          <Check className="w-7 h-7" />
                        </div>
                        <h4 className="font-display font-black text-lg text-white leading-tight">
                          {outcomeConfig.title || t('outcomeCompleteTitle')}
                        </h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed px-2">
                          {t('outcomeCompleteDesc')}
                        </p>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-slate-900">
                        <a 
                          href={outcomeConfig.redirectUrl} 
                          target="_blank" 
                          referrerPolicy="no-referrer"
                          className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-[10px] font-extrabold text-white transition active:scale-95 block text-center"
                        >
                          {t('goToDashboard')}
                        </a>
                        <button 
                          onClick={() => {
                            setSimStep('start');
                            setSimProgress(0);
                            setIdCapturedFront(false);
                            setIdCapturedBack(false);
                          }}
                          className="w-full py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-[9px] text-slate-400 hover:text-white transition"
                        >
                          {t('testSimulateAgain')}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Run Simulation CTA */}
              <button 
                onClick={runOnboardingSimulation}
                disabled={isSimulating}
                className="w-full py-3.5 bg-[#354CE1] hover:bg-[#2A3EB3] text-white font-bold text-xs rounded-2xl uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                id="flow_editor_run_sim_btn"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t('executingRun')}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-white fill-white" />
                    <span>{t('runFlowSim')}</span>
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* Key Capabilities Bento Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            {t('keyCapabilitiesTitle')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t('keyCapabilitiesDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-4 hover:shadow-lg transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#354CE1]">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">{t('visualDragDrop')}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('visualDragDropDesc')}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-4 hover:shadow-lg transition">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Split className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">{t('smartRoutingRules')}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('smartRoutingRulesDesc')}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-4 hover:shadow-lg transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">{t('noCodeBrandStyling')}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('noCodeBrandStylingDesc')}
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-4 hover:shadow-lg transition">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">{t('instantHotReload')}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('instantHotReloadDesc')}
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-4 hover:shadow-lg transition">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">{t('builtInLoc')}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('builtInLocDesc')}
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-4 hover:shadow-lg transition">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#354CE1]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">{t('abTestingExps')}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t('abTestingExpsDesc')}
            </p>
          </div>

        </div>
      </div>

      {/* Interactive Tabs: How Flow Editor helps different stages */}
      <div className="bg-slate-100/50 border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Description & Selectors */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider block">{t('flowLifecycle')}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                {t('optimizePhaseTitle')}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t('optimizePhaseDesc')}
              </p>

              {/* Selector list */}
              <div className="space-y-3 pt-4">
                {[
                  { id: 'collect', title: t('collect'), desc: t('collectSub') },
                  { id: 'verify', title: t('verify'), desc: t('verifySub') },
                  { id: 'route', title: t('route'), desc: t('routeSub') },
                  { id: 'refine', title: t('refine'), desc: t('refineSub') }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'collect' | 'verify' | 'route' | 'refine')}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      activeTab === tab.id 
                        ? 'bg-white border-transparent shadow-md' 
                        : 'bg-transparent border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{tab.title}</h4>
                      <p className="text-xs text-slate-400">{tab.desc}</p>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform ${activeTab === tab.id ? 'translate-x-1 text-[#354CE1]' : 'text-slate-400'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Visualizer panel reflecting active tab */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-8 rounded-[32px] text-white min-h-[380px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-45" />

              <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-mono">{t('flowPhaseLabel')}: {activeTab.toUpperCase()}</span>
                <span className="text-[10px] text-slate-500 font-mono">{t('codeLabel')}: PL_ENG_v4</span>
              </div>

              {activeTab === 'collect' && (
                <div className="relative z-10 py-6 space-y-4">
                  <h3 className="font-extrabold text-lg text-white">{t('dynamicFieldCollection')}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t('dynamicFieldCollectionDesc')}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-white mb-1">{t('ocrExtraction')}</h4>
                      <p className="text-[11px] text-slate-400">{t('ocrExtractionDesc')}</p>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-white mb-1">{t('uploadFallbacks')}</h4>
                      <p className="text-[11px] text-slate-400">{t('uploadFallbacksDesc')}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'verify' && (
                <div className="relative z-10 py-6 space-y-4">
                  <h3 className="font-extrabold text-lg text-white">{t('advBiometricLiveness')}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t('advBiometricLivenessDesc')}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-white mb-1">{t('biometricSelfieMatch')}</h4>
                      <p className="text-[11px] text-slate-400">{t('biometricSelfieMatchDesc')}</p>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-white mb-1">{t('instantDbRouting')}</h4>
                      <p className="text-[11px] text-slate-400">{t('instantDbRoutingDesc')}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'route' && (
                <div className="relative z-10 py-6 space-y-4">
                  <h3 className="font-extrabold text-lg text-white">{t('riskLogicBranches')}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t('riskLogicBranchesDesc')}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-white mb-1">{t('deviceFingerprinting')}</h4>
                      <p className="text-[11px] text-slate-400">{t('deviceFingerprintingDesc')}</p>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-white mb-1">{t('txSizeGates')}</h4>
                      <p className="text-[11px] text-slate-400">{t('txSizeGatesDesc')}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'refine' && (
                <div className="relative z-10 py-6 space-y-4">
                  <h3 className="font-extrabold text-lg text-white">{t('dynamicThemeUpdates')}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t('dynamicThemeUpdatesDesc')}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-white mb-1">{t('builtInLoc')}</h4>
                      <p className="text-[11px] text-slate-400">{t('globalLocDesc')}</p>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <h4 className="font-bold text-white mb-1">{t('dropoffAnalytics')}</h4>
                      <p className="text-[11px] text-slate-400">{t('dropoffAnalyticsDesc')}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="relative z-10 pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                <span>{t('configureStepsNotice')}</span>
                <button type="button" className="text-indigo-400 hover:underline" onClick={onOpenSandbox}>{t('openCoreSdkDoc')}</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Analytical Insights & Mock Metrics */}
      <div className="max-w-7xl mx-auto px-6 py-24 border-b border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel graph layout */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-[32px] shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 font-mono">{t('metricConversionOptimizer')}</span>
                <h3 className="text-base font-extrabold text-slate-950">{t('activeAbTest')}</h3>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">{t('conversionLift')}</span>
            </div>

            {/* Mock chart blocks */}
            <div className="space-y-4">
              
              {/* Flow A */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold text-slate-800">{t('flowA')}</span>
                  <span className="font-mono font-bold">{t('conversion965')}</span>
                </div>
                <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden relative">
                  <div className="h-full bg-emerald-500 rounded-lg" style={{ width: '96.5%' }} />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">{t('flowAOTPDesc')}</span>
                </div>
              </div>

              {/* Flow B */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold text-slate-800">{t('flowB')}</span>
                  <span className="font-mono font-bold">{t('conversion781')}</span>
                </div>
                <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden relative">
                  <div className="h-full bg-[#354CE1] rounded-lg animate-pulse" style={{ width: '78.1%' }} />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">{t('flowBStrictDesc')}</span>
                </div>
              </div>

              {/* Flow C */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold text-slate-800">{t('flowC')}</span>
                  <span className="font-mono font-bold text-emerald-600">{t('conversion924')}</span>
                </div>
                <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-[#354CE1] to-indigo-500 rounded-lg" style={{ width: '92.4%' }} />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white">{t('flowCDynamicDesc')}</span>
                </div>
              </div>

            </div>

            <p className="text-[10px] text-slate-400 font-mono leading-normal pt-2">
              {t('flowCNotice')}
            </p>
          </div>

          {/* Right panel text layout */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              {t('optimizeConversionTitle')}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('optimizeConversionDesc')}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('optimizeConversionDetail')}
            </p>
            <div className="pt-4 border-t border-slate-200 flex items-center gap-6">
              <div>
                <p className="font-display text-2xl font-black text-slate-950">+24%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{t('completionRate')}</p>
              </div>
              <div>
                <p className="font-display text-2xl font-black text-[#354CE1]">{t('under10s')}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{t('avgRunTime')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Corporate FAQ Accordion */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-display text-3xl font-extrabold text-slate-950 tracking-tight">
            {t('faqTitle')}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {t('faqDesc')}
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: t('faq1Q'),
              a: t('faq1A')
            },
            {
              q: t('faq2Q'),
              a: t('faq2A')
            },
            {
              q: t('faq3Q'),
              a: t('faq3A')
            },
            {
              q: t('faq4Q'),
              a: t('faq4A')
            }
          ].map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left font-bold text-slate-950 flex items-center justify-between text-sm sm:text-base hover:bg-slate-50 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedFaq === idx ? 'rotate-180 text-[#354CE1]' : ''}`} />
              </button>
              {expandedFaq === idx && (
                <div className="p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-500 leading-relaxed bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* API Sandbox Credentials Generator CTA Section */}
      <div className="bg-slate-950 border-t border-slate-900 py-24 text-white" id="relay_early_access_section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left panel: form */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block font-mono">{t('sandboxEngine')}</span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {t('generateSnippetTitle')}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t('generateSnippetDesc')}
                </p>
              </div>

              <form onSubmit={handleCreateFlow} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block font-mono">{t('flowNameLabel')}</label>
                  <input 
                     type="text" 
                     value={flowName}
                     onChange={(e) => setFlowName(e.target.value)}
                     required
                     className="w-full bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl text-xs text-white focus:outline-none focus:border-indigo-500"
                     placeholder={t('placeholderFlowName')}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block font-mono">{t('envTargetLabel')}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setEnvironment('sandbox')}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold transition border ${
                        environment === 'sandbox' 
                          ? 'bg-indigo-600 text-white border-transparent' 
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      🧪 {t('sandboxEnvButton')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEnvironment('production')}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold transition border ${
                        environment === 'production' 
                          ? 'bg-indigo-600 text-white border-transparent' 
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      🚀 {t('productionEnvButton')}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-2xl text-xs uppercase tracking-wider transition-all"
                >
                  {t('generateSnippetButton')}
                </button>
              </form>
            </div>

            {/* Right panel: code terminal showing dynamic generated snippet */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-[32px] p-6 shadow-2xl space-y-4 min-h-[360px] flex flex-col justify-between">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4.5 h-4.5 text-indigo-400" />
                  <span className="text-[11px] text-slate-400 font-mono font-bold">{t('sdkSnippetBuilder')}</span>
                </div>
                <div className="flex gap-2">
                  {(['react', 'html', 'node', 'curl'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSnippetLanguage(lang)}
                      className={`text-[9px] font-mono px-2 py-0.5 rounded transition ${
                        snippetLanguage === lang 
                          ? 'bg-indigo-600 text-white font-bold' 
                          : 'bg-slate-950 text-slate-400 border border-slate-850 hover:text-white'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Snippet Code block */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-900 font-mono text-[10px] leading-relaxed text-slate-300 overflow-x-auto min-h-[220px]">
                {generatedSnippet ? (
                  <pre className="text-indigo-300">
                    {getCodeSnippet()}
                  </pre>
                ) : (
                  <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                    <Code className="w-8 h-8 text-slate-600 animate-pulse" />
                    <p className="text-xs">{t('submitFormPrompt')}</p>
                  </div>
                )}
              </div>

              {/* Notice text */}
              <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 leading-normal flex items-center justify-between">
                <span>{t('snippetNotice')}</span>
                <button type="button" className="text-slate-400 hover:text-white underline" onClick={onOpenSandbox}>{t('readSdkApiDoc')}</button>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
