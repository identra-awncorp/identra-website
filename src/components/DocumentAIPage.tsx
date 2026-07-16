/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { TRANSLATIONS } from '../translations/DocumentAIPageTranslations';
import { 
  ArrowRight, FileText, Check, AlertTriangle, ShieldCheck, 
  Cpu, ScanLine, ArrowLeft, RefreshCw, Layers, CheckCircle2, 
  Users, Globe, FileBadge, Search, Eye, AlertCircle, FileSpreadsheet, Lock
} from 'lucide-react';

interface DocumentAIPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

// Mock documents for the playground
interface PlaygroundDoc {
  id: string;
  name: string;
  type: 'Utility Bill' | 'Bank Statement' | 'W-2 Tax Form';
  status: 'CLEARED' | 'SUSPICIOUS';
  tampered: boolean;
  description: string;
  extractedData: Record<string, string>;
  fraudChecks: {
    label: string;
    status: 'PASS' | 'WARN' | 'FAIL';
    details: string;
  }[];
  regions: {
    label: string;
    top: string;
    left: string;
    width: string;
    height: string;
    isTampered?: boolean;
  }[];
}

const getMockDocuments = (t: any): PlaygroundDoc[] => [
  {
    id: 'doc-1',
    name: t.doc1Name,
    type: 'Utility Bill',
    status: 'CLEARED',
    tampered: false,
    description: t.doc1Desc,
    extractedData: {
      [t.keyVendor]: 'Metro Grid Energy',
      [t.keyAccountHolder]: 'Sarah Jenkins',
      [t.keyServiceAddress]: '1048 Pine Street, San Francisco, CA 94109',
      [t.keyStatementDate]: 'May 12, 2026',
      [t.keyDueDate]: 'June 10, 2026',
      [t.keyTotalAmountDue]: '$142.50',
    },
    fraudChecks: [
      { label: t.fraudExifLabel, status: 'PASS', details: t.fraudExifDetailClear },
      { label: t.fraudFontLabel, status: 'PASS', details: t.fraudFontDetailClear },
      { label: t.fraudCopyPasteLabel, status: 'PASS', details: t.fraudCopyPasteDetailClear },
      { label: t.fraudAiLabel, status: 'PASS', details: t.fraudAiDetailClear },
      { label: t.fraudRecencyLabel, status: 'PASS', details: t.fraudRecencyDetailClear }
    ],
    regions: [
      { label: t.regionVendorLogo, top: '10%', left: '10%', width: '35%', height: '8%' },
      { label: t.regionAccountHolderAddress, top: '24%', left: '10%', width: '45%', height: '14%' },
      { label: t.regionStatementDate, top: '24%', left: '60%', width: '30%', height: '6%' },
      { label: t.regionTotalAmountDue, top: '75%', left: '60%', width: '30%', height: '10%' }
    ]
  },
  {
    id: 'doc-2',
    name: t.doc2Name,
    type: 'Bank Statement',
    status: 'SUSPICIOUS',
    tampered: true,
    description: t.doc2Desc,
    extractedData: {
      [t.keyFinancialInstitution]: 'Apex Global Bank',
      [t.keyAccountHolder]: 'Thomas Miller',
      [t.keyStatementPeriod]: 'Apr 01, 2026 - Apr 30, 2026',
      [t.keyEndingBalance]: '$954,250.00',
      [t.keyRoutingNumber]: '××××0119',
    },
    fraudChecks: [
      { label: t.fraudExifLabel, status: 'FAIL', details: t.fraudExifDetailSuspicious },
      { label: t.fraudFontLabel, status: 'FAIL', details: t.fraudFontDetailSuspicious },
      { label: t.fraudCopyPasteLabel, status: 'WARN', details: t.fraudCopyPasteDetailSuspicious },
      { label: t.fraudAiLabel, status: 'PASS', details: t.fraudAiDetailSuspicious },
      { label: t.fraudRecencyLabel, status: 'PASS', details: t.fraudRecencyDetailSuspicious }
    ],
    regions: [
      { label: t.regionInstitutionLogo, top: '12%', left: '10%', width: '30%', height: '8%' },
      { label: t.regionAccountHolderTampered, top: '26%', left: '10%', width: '40%', height: '10%', isTampered: true },
      { label: t.regionEndingBalanceAltered, top: '55%', left: '55%', width: '35%', height: '12%', isTampered: true }
    ]
  },
  {
    id: 'doc-3',
    name: t.doc3Name,
    type: 'W-2 Tax Form',
    status: 'SUSPICIOUS',
    tampered: true,
    description: t.doc3Desc,
    extractedData: {
      [t.keyEmployerName]: 'Synergy Tech Corp (AI)',
      [t.keyEmployeeName]: 'David Vance',
      [t.keyWagesTips]: '$185,000.00',
      [t.keySocialSecurityTax]: '$11,470.00',
      [t.keyTaxYear]: '2025',
    },
    fraudChecks: [
      { label: t.fraudExifLabel, status: 'WARN', details: t.fraudExifDetailW2 },
      { label: t.fraudFontLabel, status: 'FAIL', details: t.fraudFontDetailW2 },
      { label: t.fraudCopyPasteLabel, status: 'PASS', details: t.fraudCopyPasteDetailW2 },
      { label: t.fraudAiLabel, status: 'FAIL', details: t.fraudAiDetailW2 },
      { label: t.fraudRecencyLabel, status: 'PASS', details: t.fraudRecencyDetailW2 }
    ],
    regions: [
      { label: t.regionEmployerInfo, top: '15%', left: '8%', width: '40%', height: '15%' },
      { label: t.regionEmployeeNameGibberish, top: '35%', left: '8%', width: '40%', height: '10%', isTampered: true },
      { label: t.regionWagesCompensation, top: '15%', left: '55%', width: '38%', height: '12%', isTampered: true }
    ]
  }
];


// Use english as default for others



export default function DocumentAIPage({ onOpenSandbox, onBackToLanding, onViewChange }: DocumentAIPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(TRANSLATIONS, language as keyof typeof TRANSLATIONS, 'DocumentAIPageTranslations');
  const mockDocs = getMockDocuments(t);

  // Playground state
  const [selectedDoc, setSelectedDoc] = useState<PlaygroundDoc>(mockDocs[0]);

  // Translate active document when language changes
  useEffect(() => {
    const updatedDocs = getMockDocuments(t);
    const match = updatedDocs.find(d => d.id === selectedDoc.id);
    if (match) {
      setSelectedDoc(match);
    }
  }, [language]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(true);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Accordion state
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(0);

  // Core Pillars / active workflow showcase step
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);

  // Simulate Document AI scanning process
  const triggerScan = (doc: PlaygroundDoc) => {
    setSelectedDoc(doc);
    setIsScanning(true);
    setScanComplete(false);
    setScanProgress(0);
  };

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setScanComplete(true);
            return 100;
          }
          return prev + 5;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const toggleAccordion = (index: number) => {
    setExpandedAccordion(prev => (prev === index ? null : index));
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen py-10 px-4 md:px-8">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#354CE1] transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t.backToHome}
        </button>
      </div>

      {/* Hero Section Banner */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="relative overflow-hidden bg-[#1cb080] rounded-[2.5rem] p-8 md:p-16 text-white shadow-xl flex flex-col justify-between min-h-[460px]">
          {/* Decorative geometric blobs */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-emerald-400/20 rounded-full blur-2xl translate-y-1/3 pointer-events-none" />

          {/* Tag */}
          <div className="relative z-10 flex items-center gap-2 mb-8 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/10 text-xs font-semibold tracking-wide">
            <ScanLine className="w-4 h-4 text-emerald-100" />
            <span>{t.tag}</span>
          </div>

          {/* Title & Description */}
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              {t.title}
            </h1>
            <p className="text-lg md:text-2xl text-emerald-50/90 font-light mb-8 max-w-2xl leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Button CTAs */}
          <div className="relative z-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenSandbox}
              className="bg-white hover:bg-emerald-50 text-slate-950 font-semibold px-8 py-4 rounded-full shadow-lg transition flex items-center gap-2 group text-sm"
            >
              {t.getDemo}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#playground"
              className="text-white hover:text-emerald-100 font-semibold text-sm transition underline underline-offset-4 decoration-2"
            >
              {t.tryPlayground}
            </a>
          </div>
        </div>
      </div>

      {/* INTERACTIVE PLAYGROUND SECTION */}
      <section id="playground" className="max-w-7xl mx-auto mb-24 scroll-mt-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#354CE1] font-semibold text-xs uppercase tracking-wider block mb-2">{t.sandboxLabel}</span>
          <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
            {t.sandboxTitle}
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            {t.sandboxDesc}
          </p>
        </div>

        {/* Sandbox Board Container */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          
          {/* Left Column: Selector & Output Results (span 5) */}
          <div className="lg:col-span-5 p-6 md:p-8 bg-slate-50/80 border-r border-slate-100 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                {t.selectTemplate}
              </h3>
              
              {/* Document Option Cards */}
              <div className="space-y-3 mb-8">
                {mockDocs.map((doc) => {
                  const isSelected = selectedDoc.id === doc.id;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => triggerScan(doc)}
                      disabled={isScanning}
                      className={`w-full text-left p-4 rounded-2xl border transition duration-200 flex items-center justify-between ${
                        isSelected 
                          ? 'bg-white border-[#354CE1] shadow-md ring-2 ring-[#354CE1]/15' 
                          : 'bg-white/50 hover:bg-white border-slate-200 hover:border-slate-300'
                      } ${isScanning ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          doc.status === 'CLEARED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{doc.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{doc.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {doc.status === 'CLEARED' ? (
                          <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded bg-emerald-100 text-emerald-800">
                            {t.clear}
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded bg-amber-100 text-amber-800 flex items-center gap-1">
                            <AlertTriangle className="w-2.5 h-2.5" /> {t.suspicious}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Extraction / AI Metadata Output Block */}
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-slate-200/50 pb-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t.extractedData}
                  </h3>
                  {scanComplete && (
                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> {t.confidence}
                    </span>
                  )}
                </div>

                {isScanning ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin text-[#354CE1]" />
                    <p className="text-xs font-medium">{t.extracting} {scanProgress}%</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {Object.entries(selectedDoc.extractedData).map(([key, val]) => (
                      <div 
                        key={key} 
                        className="flex items-start justify-between text-xs py-1 border-b border-dashed border-slate-200 last:border-0"
                        onMouseEnter={() => setHoveredRegion(key)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      >
                        <span className="text-slate-400 font-medium">{key}</span>
                        <span className="text-slate-800 font-bold text-right hover:text-[#354CE1] transition cursor-help max-w-[65%] truncate">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Run manual trigger button */}
            <div className="mt-8 pt-6 border-t border-slate-200/50">
              <button
                onClick={() => triggerScan(selectedDoc)}
                disabled={isScanning}
                className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold py-3 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 text-xs"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {t.scanning}
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    {t.rerunAnalysis}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Middle/Right Column: Image Mockup Canvas & Regions (span 7) */}
          <div className="lg:col-span-7 p-6 md:p-8 bg-slate-100/50 flex flex-col lg:flex-row gap-6 relative">
            
            {/* Visual Document Frame */}
            <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-lg p-5 relative overflow-hidden flex flex-col justify-between min-h-[440px]">
              
              {/* Document Scan Overlay Laser Animation */}
              {isScanning && (
                <div 
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#354CE1] to-transparent shadow-[0_0_12px_#354CE1] z-10 animate-pulse"
                  style={{
                    top: `${scanProgress}%`,
                    transition: 'top 0.08s linear',
                  }}
                />
              )}

              {/* Document Content Simulation */}
              <div className="relative flex-1 flex flex-col justify-between h-full opacity-90">
                {/* Header of doc */}
                <div className="border-b-2 border-slate-300 pb-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="w-1/3 h-5 bg-slate-300 rounded" />
                    <div className="w-1/4 h-3 bg-slate-200 rounded" />
                  </div>
                  <div className="mt-2 w-1/2 h-3 bg-slate-200 rounded" />
                </div>

                {/* Body lines */}
                <div className="space-y-4 my-6 flex-1">
                  <div className="space-y-2">
                    <div className="w-full h-2.5 bg-slate-200 rounded" />
                    <div className="w-5/6 h-2.5 bg-slate-200 rounded" />
                    <div className="w-4/5 h-2.5 bg-slate-200 rounded" />
                  </div>

                  {/* Highlight regions layer */}
                  {scanComplete && selectedDoc.regions.map((reg, idx) => {
                    const isHovered = hoveredRegion === reg.label || hoveredRegion === 'Account Holder' && reg.label.includes('Account') || hoveredRegion === 'Ending Balance' && reg.label.includes('Balance');
                    return (
                      <div
                        key={idx}
                        className={`absolute border-2 rounded transition-all duration-200 cursor-pointer flex items-center justify-center ${
                          reg.isTampered 
                            ? 'border-red-500 bg-red-500/10 hover:bg-red-500/20' 
                            : 'border-[#354CE1] bg-[#354CE1]/5 hover:bg-[#354CE1]/15'
                        } ${isHovered ? 'ring-4 ring-offset-1 ' + (reg.isTampered ? 'ring-red-400' : 'ring-[#354CE1]/30') : ''}`}
                        style={{
                          top: reg.top,
                          left: reg.left,
                          width: reg.width,
                          height: reg.height,
                        }}
                        onMouseEnter={() => setHoveredRegion(reg.label)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      >
                        <span className={`text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded absolute -top-4 left-0 select-none shadow-sm ${
                          reg.isTampered ? 'bg-red-500 text-white' : 'bg-[#354CE1] text-white'
                        }`}>
                          {reg.label}
                        </span>
                      </div>
                    );
                  })}

                  <div className="space-y-2 pt-4">
                    <div className="w-11/12 h-2.5 bg-slate-200 rounded" />
                    <div className="w-full h-2.5 bg-slate-200 rounded" />
                  </div>
                </div>

                {/* Footer of doc */}
                <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                  <span>METRIC_BLOCK_IDV_V1</span>
                  <span>CONFIDENTIAL</span>
                </div>
              </div>
            </div>

            {/* Right details of fraud indicators */}
            <div className="w-full lg:w-56 bg-white p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  {t.aiRiskSignals}
                </h4>
                
                {isScanning ? (
                  <div className="space-y-3 py-6">
                    <div className="h-3 bg-slate-100 rounded animate-pulse" />
                    <div className="h-3 bg-slate-100 rounded animate-pulse" />
                    <div className="h-3 bg-slate-100 rounded animate-pulse" />
                    <div className="h-3 bg-slate-100 rounded animate-pulse" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDoc.fraudChecks.map((check, idx) => (
                      <div key={idx} className="group border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="text-[10px] font-bold text-slate-700 leading-snug truncate">
                            {check.label}
                          </span>
                          {check.status === 'PASS' && (
                            <span className="text-[8px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded shrink-0">
                              {t.pass}
                            </span>
                          )}
                          {check.status === 'WARN' && (
                            <span className="text-[8px] font-bold bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded shrink-0">
                              {t.warn}
                            </span>
                          )}
                          {check.status === 'FAIL' && (
                            <span className="text-[8px] font-bold bg-red-50 text-red-600 px-1.5 py-0.5 rounded shrink-0 animate-pulse">
                              {t.fail}
                            </span>
                          )}
                        </div>
                        <p className="text-[9px] text-slate-400 mt-0.5 leading-snug group-hover:text-slate-600 transition">
                          {check.details}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Overall status badge */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {t.verdict}
                </span>
                {isScanning ? (
                  <div className="h-6 bg-slate-100 rounded animate-pulse" />
                ) : selectedDoc.status === 'CLEARED' ? (
                  <div className="bg-emerald-500 text-white rounded-xl p-2.5 text-center flex items-center justify-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">{t.cleared}</span>
                  </div>
                ) : (
                  <div className="bg-red-500 text-white rounded-xl p-2.5 text-center flex items-center justify-center gap-1.5 shadow-sm animate-bounce">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">{t.flagged}</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE WORKFLOWS SECTION ("How teams can use Document AI") */}
      <section className="max-w-7xl mx-auto mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text (span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#354CE1] font-semibold text-xs uppercase tracking-wider">{t.workflowLabel}</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              {t.workflowTitle}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.workflowDesc}
            </p>

            {/* Workflow steps navigation */}
            <div className="space-y-3 mt-8">
              {[
                { step: 1, title: t.step1, desc: t.step1Desc },
                { step: 2, title: t.step2, desc: t.step2Desc },
                { step: 3, title: t.step3, desc: t.step3Desc },
                { step: 4, title: t.step4, desc: t.step4Desc }
              ].map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveWorkflowStep(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition flex items-start gap-3.5 ${
                    activeWorkflowStep === idx 
                      ? 'bg-white border-[#354CE1] shadow-md ring-1 ring-[#354CE1]/10' 
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    activeWorkflowStep === idx ? 'bg-[#354CE1] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {s.step}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{s.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">{s.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column Dynamic Visual Showcase (span 7) */}
          <div className="lg:col-span-7 bg-[#FAFBFD] p-6 md:p-10 rounded-3xl border border-slate-150/80 shadow-inner min-h-[460px] flex items-center justify-center relative overflow-hidden">
            
            {/* Step 1 Visual Mock */}
            {activeWorkflowStep === 0 && (
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FileText className="w-5 h-5 text-[#354CE1]" />
                  <span className="text-xs font-bold text-slate-800">{t.collectFiles}</span>
                </div>
                <p className="text-[11px] text-slate-500">{t.collectFilesDesc}</p>
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.acceptedCategories}</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[t.catUtilityBills, t.catBankRecords, t.catTaxDeclarations, t.catW2Form, t.catBusinessLicense].map((item, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.recencyLimit}</label>
                  <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-600">{t.withinPast90}</span>
                    <span className="text-slate-800 font-bold">{t.past90}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 Visual Mock */}
            {activeWorkflowStep === 1 && (
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Cpu className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-bold text-slate-800">{t.advancedOcr}</span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400 font-bold uppercase">{t.jsonOutput}</span>
                      <span className="text-emerald-500 font-semibold">{t.success}</span>
                    </div>
                    <pre className="text-[9px] text-[#354CE1] font-mono leading-relaxed bg-slate-900 text-white/90 p-2.5 rounded-lg overflow-x-auto">
{`{
  "document_type": "BANK_STATEMENT",
  "holder_name": "Sarah Jenkins",
  "address_extracted": "1048 Pine St, SF, CA",
  "ending_balance": 14250.00,
  "confidence_score": 0.994
}`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 Visual Mock */}
            {activeWorkflowStep === 2 && (
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-500" />
                    <span className="text-xs font-bold text-slate-800">{t.tamperInspection}</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded uppercase">{t.analyzing}</span>
                </div>
                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-red-50/50 rounded-xl border border-red-200 text-red-800">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span>{t.clonedLogo}</span>
                    </div>
                    <span className="font-bold">Photoshop CS6</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-200 text-emerald-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{t.exifMatch}</span>
                    </div>
                    <span className="font-bold">{t.statusOriginal}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 Visual Mock */}
            {activeWorkflowStep === 3 && (
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Users className="w-5 h-5 text-indigo-500" />
                  <span className="text-xs font-bold text-slate-800">{t.casesBoard}</span>
                </div>
                <p className="text-[11px] text-slate-400">{t.casesBoardDesc}</p>
                <div className="p-3 bg-[#FAFBFD] rounded-xl border border-slate-150 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{t.caseNumber}</span>
                    <span className="text-xs font-bold text-slate-800">{t.caseName}</span>
                  </div>
                  <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-3 py-1.5 rounded-lg text-[10px] shadow transition">
                    {t.inspectFlag}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* DETAILED FEATURES PILLARS & DESCRIPTION */}
      <section className="max-w-7xl mx-auto mb-28">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-slate-800">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 leading-snug">{t.pillar1Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.pillar1Desc}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 leading-snug">{t.pillar2Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.pillar2Desc}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 leading-snug">{t.pillar3Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.pillar3Desc}
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 leading-snug">{t.pillar4Title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.pillar4Desc}
            </p>
          </div>
        </div>
      </section>

      {/* ACCORDION MODULES ("Cutting-edge document capabilities for any use case") */}
      <section className="max-w-7xl mx-auto mb-24 bg-white rounded-3xl border border-slate-100 p-8 md:p-12 shadow-md">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight">
            {t.accordionTitle}
          </h2>
        </div>

        <div className="divide-y divide-slate-150">
          {/* Accordion Item 1 */}
          <div className="py-5">
            <button
              onClick={() => toggleAccordion(0)}
              className="w-full flex items-center justify-between text-left focus:outline-none"
            >
              <span className="text-base font-bold text-slate-900">
                {t.acc1Title}
              </span>
              <span className="text-slate-400 font-bold text-lg select-none ml-2">
                {expandedAccordion === 0 ? '—' : '+'}
              </span>
            </button>
            {expandedAccordion === 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#354CE1]" />
                    {t.acc1_1Title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.acc1_1Desc}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#354CE1]" />
                    {t.acc1_2Title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.acc1_2Desc}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <FileBadge className="w-4 h-4 text-[#354CE1]" />
                    {t.acc1_3Title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.acc1_3Desc}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#354CE1]" />
                    {t.acc1_4Title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t.acc1_4Desc}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Accordion Item 2 */}
          <div className="py-5">
            <button
              onClick={() => toggleAccordion(1)}
              className="w-full flex items-center justify-between text-left focus:outline-none"
            >
              <span className="text-base font-bold text-slate-900">
                {t.acc2Title}
              </span>
              <span className="text-slate-400 font-bold text-lg select-none ml-2">
                {expandedAccordion === 1 ? '—' : '+'}
              </span>
            </button>
            {expandedAccordion === 1 && (
              <div className="mt-6 space-y-4 text-xs text-slate-500 leading-relaxed animate-in fade-in duration-200 max-w-3xl">
                <p>
                  {t.acc2Desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <h5 className="font-bold text-slate-800 mb-1">{t.acc2_1Title}</h5>
                    <p className="text-[11px] text-slate-400">{t.acc2_1Desc}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <h5 className="font-bold text-slate-800 mb-1">{t.acc2_2Title}</h5>
                    <p className="text-[11px] text-slate-400">{t.acc2_2Desc}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <h5 className="font-bold text-slate-800 mb-1">{t.acc2_3Title}</h5>
                    <p className="text-[11px] text-slate-400">{t.acc2_3Desc}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion Item 3 */}
          <div className="py-5">
            <button
              onClick={() => toggleAccordion(2)}
              className="w-full flex items-center justify-between text-left focus:outline-none"
            >
              <span className="text-base font-bold text-slate-900">
                {t.acc3Title}
              </span>
              <span className="text-slate-400 font-bold text-lg select-none ml-2">
                {expandedAccordion === 2 ? '—' : '+'}
              </span>
            </button>
            {expandedAccordion === 2 && (
              <div className="mt-6 text-xs text-slate-500 leading-relaxed animate-in fade-in duration-200 max-w-3xl">
                <p>
                  {t.acc3Desc}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EXPLORE MORE OF IDENTRA'S IDENTITY PLATFORM SECTION */}
      <section className="max-w-7xl mx-auto mb-20 bg-[#E6F7F0] p-8 md:p-16 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/40 rounded-full blur-2xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-tight mb-8">
          {t.exploreMore}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: KYB-KYC */}
          <div className="bg-[#4285f4] text-white p-8 rounded-3xl flex flex-col justify-between min-h-[220px] shadow-md hover:scale-[1.01] transition-transform cursor-pointer" onClick={() => onViewChange?.('kyb')}>
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold leading-tight mb-2">
                {t.kybKyc}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold mt-4">
              <span>{t.exploreKyb}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Sanctions screening */}
          <div className="bg-[#ffbb00] text-slate-950 p-8 rounded-3xl flex flex-col justify-between min-h-[220px] shadow-md hover:scale-[1.01] transition-transform cursor-pointer" onClick={() => onViewChange?.('business-fraud')}>
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold leading-tight mb-2">
                {t.sanctions}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold mt-4">
              <span>{t.exploreSanctions}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* READY TO GET STARTED BANNER */}
      <section className="max-w-7xl mx-auto mb-16 bg-[#7F92FF] text-white p-8 md:p-16 rounded-[2.5rem] text-center shadow-lg relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t.readyToStartTitle}
          </h2>
          <p className="text-indigo-50 font-light text-sm mb-8 leading-relaxed">
            {t.readyToStartDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenSandbox}
              className="bg-white hover:bg-indigo-50 text-slate-950 font-bold px-8 py-3.5 rounded-full shadow-md transition"
            >
              {t.getDemo}
            </button>
            <button
              onClick={onOpenSandbox}
              className="text-white hover:text-indigo-100 font-bold flex items-center gap-1 transition"
            >
              <span>{t.tryItNow}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
