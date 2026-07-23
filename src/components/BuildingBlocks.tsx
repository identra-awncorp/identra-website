/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUILDING_BLOCKS_TRANSLATIONS } from '../translations/BuildingBlocksTranslations';
import { 
  FileText, ArrowRight, Shield, RefreshCw, Layers, CheckCircle2, 
  MapPin, AlertCircle, Sparkles, Smartphone, Users, ChevronRight, Check, X
} from 'lucide-react';
import { ProductId } from '../types';

interface BuildingBlocksProps {
  onOpenSandbox: () => void;
}

export default function BuildingBlocks({ onOpenSandbox }: BuildingBlocksProps) {
  const { language } = useLanguage();
  const buildingBlocksT = BUILDING_BLOCKS_TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<ProductId>('verifications');
  
  // Interactive mini states
  // Dynamic Flow logic trigger
  const [flowRiskRule, setFlowRiskRule] = useState<'low' | 'high'>('low');
  
  // Workflows country tester
  const [workflowCountry, setWorkflowCountry] = useState<'US' | 'EU' | 'HIGH_RISK'>('US');

  // Cases queue
  const [cases, setCases] = useState([
    { id: 'case_01', name: 'James Carter', risk: 'Suspicious IP Location', flag: 'High', status: 'Unresolved' },
    { id: 'case_02', name: 'Seraphina Lin', risk: 'Document Expiry Date mismatch', flag: 'Medium', status: 'Unresolved' },
    { id: 'case_03', name: 'Viktor Kael', risk: 'Name typo on passport', flag: 'Low', status: 'Unresolved' }
  ]);

  const handleResolveCase = (id: string, decision: 'Approved' | 'Rejected') => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, status: decision } : c));
  };

  return (
    <section id="platform-solution" className="bg-[#FAFBFD] py-20 md:py-28 border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#354CE1] bg-[#E2E6FF] px-3.5 py-1.5 rounded-full">
            {buildingBlocksT.blocksBadge}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight">
            {buildingBlocksT.blocksTitle}
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {buildingBlocksT.blocksDesc}
          </p>

          <div>
            <button
              onClick={onOpenSandbox}
              className="inline-flex items-center gap-1.5 bg-black hover:bg-slate-850 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow transition cursor-pointer"
            >
              {buildingBlocksT.seeFullPlatform}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dynamic tabs selector for Mobile (or responsive layout toggle) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 border-b border-slate-200 pb-3">
          {[
            { id: 'verifications', label: buildingBlocksT.tabVerifications },
            { id: 'flow', label: buildingBlocksT.tabFlow },
            { id: 'workflows', label: buildingBlocksT.tabWorkflows },
            { id: 'graph', label: buildingBlocksT.tabGraph },
            { id: 'cases', label: buildingBlocksT.tabCases }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ProductId)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition ${
                activeTab === tab.id 
                  ? 'bg-[#354CE1] text-white shadow-sm' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab display grids with interactive visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-100 p-6 md:p-10 rounded-3xl shadow-sm">
          
          {/* Left Column: Product Info */}
          <div className="lg:col-span-5 space-y-6">
            {activeTab === 'verifications' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <span className="text-[10px] font-bold text-[#354CE1] bg-[#E2E6FF] px-2.5 py-1 rounded-full font-mono uppercase">{buildingBlocksT.badgeVerifyClients}</span>
                <h3 className="text-2xl font-display font-bold text-slate-900">{buildingBlocksT.verifyClientsTitle}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {buildingBlocksT.verifyClientsDesc}
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#354CE1]" />
                    <span>{buildingBlocksT.verifyCheck1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#354CE1]" />
                    <span>{buildingBlocksT.verifyCheck2}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'flow' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full font-mono uppercase">{buildingBlocksT.badgeDynamicUi}</span>
                <h3 className="text-2xl font-display font-bold text-slate-900">{buildingBlocksT.dynamicFlowTitle}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {buildingBlocksT.dynamicFlowDesc}
                </p>
                <div className="space-y-3 pt-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs font-semibold text-slate-700">{buildingBlocksT.interactiveSetRisk}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setFlowRiskRule('low')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition ${
                        flowRiskRule === 'low' ? 'bg-white border-slate-900 text-slate-900 shadow-sm' : 'bg-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {buildingBlocksT.lowRiskClientBtn}
                    </button>
                    <button 
                      onClick={() => setFlowRiskRule('high')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition ${
                        flowRiskRule === 'high' ? 'bg-white border-rose-400 text-rose-600 shadow-sm' : 'bg-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {buildingBlocksT.suspiciousSignalBtn}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workflows' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full font-mono uppercase">{buildingBlocksT.badgeOrchestrate}</span>
                <h3 className="text-2xl font-display font-bold text-slate-900">{buildingBlocksT.workflowsTitle}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {buildingBlocksT.workflowsDesc}
                </p>
                <div className="space-y-3 pt-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs font-semibold text-slate-700 font-mono">{buildingBlocksT.simulateKycRouting}</p>
                  <div className="flex gap-1.5">
                    {['US', 'EU', 'HIGH_RISK'].map(country => (
                      <button
                        key={country}
                        onClick={() => setWorkflowCountry(country as any)}
                        className={`px-3 py-1 text-xs font-bold font-mono rounded-lg border transition ${
                          workflowCountry === country 
                            ? 'bg-slate-900 border-slate-900 text-white' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'graph' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full font-mono uppercase">{buildingBlocksT.badgeFraudDiscovery}</span>
                <h3 className="text-2xl font-display font-bold text-slate-900">{buildingBlocksT.graphTitle}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {buildingBlocksT.graphDesc}
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span>{buildingBlocksT.graphCheck1}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span>{buildingBlocksT.graphCheck2}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cases' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-mono uppercase">{buildingBlocksT.badgeManualReview}</span>
                <h3 className="text-2xl font-display font-bold text-slate-900">{buildingBlocksT.casesTitle}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {buildingBlocksT.casesDesc}
                </p>
                <p className="text-xs text-slate-400 leading-normal italic">
                  {buildingBlocksT.casesInboxDesc}
                </p>
              </div>
            )}

            <button
              onClick={onOpenSandbox}
              className="text-xs font-bold text-[#354CE1] hover:text-[#2539BE] flex items-center gap-1.5 pt-2 hover:underline"
            >
              {buildingBlocksT.launchSandboxDemo}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: Dynamic Interactive Mockups */}
          <div className="lg:col-span-7 bg-[#FAFBFD] rounded-2xl border border-slate-100 p-6 min-h-[340px] flex items-center justify-center relative overflow-hidden">
            
            {/* Ambient visual styles based on active tabs */}
            
            {/* 1. Verifications Mock */}
            {activeTab === 'verifications' && (
              <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200/80 p-5 shadow-lg space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4.5 h-4.5 text-[#354CE1]" />
                    <span className="text-xs font-semibold text-slate-800">{buildingBlocksT.verificationsDesk}</span>
                  </div>
                  <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">{buildingBlocksT.signalEngine}</span>
                </div>

                <div className="space-y-2">
                  {[
                    { label: buildingBlocksT.govtIdAuth, status: 'PASS', score: '99.2%', color: 'text-emerald-600 bg-emerald-50' },
                    { label: buildingBlocksT.biometricLiveness, status: 'PASS', score: '98.4%', color: 'text-emerald-600 bg-emerald-50' },
                    { label: buildingBlocksT.watchlistPep, status: 'CLEAR', score: '0 hits', color: 'text-[#354CE1] bg-[#E2E6FF]' },
                    { label: buildingBlocksT.nfcChipCheck, status: 'SKIPPED', score: 'No chip', color: 'text-slate-400 bg-slate-50' }
                  ].map((chk, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-medium text-slate-700">{chk.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        <span className="text-slate-400">{chk.score}</span>
                        <span className={`font-bold px-1.5 py-0.5 rounded ${chk.color}`}>{chk.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Dynamic Flow Mock */}
            {activeTab === 'flow' && (
              <div className="w-full max-w-sm space-y-4 animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-md text-center">
                  <p className="text-[10px] font-bold text-slate-400 font-mono">{buildingBlocksT.dynamicRoutingPreview}</p>
                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {buildingBlocksT.clientFlowSequencing}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3 relative">
                  <div className="w-48 bg-[#354CE1] text-white p-3 rounded-xl shadow text-xs font-semibold text-center">
                    {buildingBlocksT.documentUploadStep}
                  </div>
                  <div className="w-0.5 h-6 bg-slate-300" />
                  
                  {flowRiskRule === 'low' ? (
                    <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl shadow border border-emerald-200 text-xs text-center w-56 animate-in zoom-in-95 duration-200">
                      <p className="font-bold">{buildingBlocksT.lowRiskPath}</p>
                      <p className="text-[10px] text-emerald-600 mt-0.5">{buildingBlocksT.allowInstantBank}</p>
                    </div>
                  ) : (
                    <div className="space-y-3 w-64 animate-in zoom-in-95 duration-200 flex flex-col items-center">
                      <div className="bg-amber-50 text-amber-800 border border-amber-200 p-3 rounded-xl text-xs text-center w-full">
                        <p className="font-bold">{buildingBlocksT.suspiciousDeviceSig}</p>
                        <p className="text-[10px] text-amber-600 mt-0.5">{buildingBlocksT.routeToExtra}</p>
                      </div>
                      <div className="w-0.5 h-4 bg-slate-300" />
                      <div className="w-48 bg-purple-600 text-white p-2.5 rounded-xl text-xs font-semibold text-center shadow">
                        {buildingBlocksT.liveSelfieChallenge}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. Workflows Mock */}
            {activeTab === 'workflows' && (
              <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-5 shadow-lg space-y-3 animate-in fade-in duration-300">
                <p className="text-[10px] font-bold text-indigo-600 font-mono">{buildingBlocksT.routingEngineConfig}</p>
                
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-xs text-slate-700 space-y-1">
                  <p className="text-slate-400">{buildingBlocksT.workflowRulesConfig}</p>
                  <p><span className="text-purple-600">IF</span> {buildingBlocksT.countryEquals} <span className="text-emerald-600">&quot;{workflowCountry}&quot;</span></p>
                  {workflowCountry === 'US' && (
                    <>
                      <p className="pl-4"><span className="text-indigo-600">REQUIRE</span> {buildingBlocksT.driversLicense}</p>
                      <p className="pl-4"><span className="text-indigo-600">TRIGGER</span> {buildingBlocksT.ssnMatchCheck}</p>
                    </>
                  )}
                  {workflowCountry === 'EU' && (
                    <>
                      <p className="pl-4"><span className="text-indigo-600">REQUIRE</span> {buildingBlocksT.nationalPassport}</p>
                      <p className="pl-4"><span className="text-indigo-600">TRIGGER</span> {buildingBlocksT.gdprPrivacyPortal}</p>
                    </>
                  )}
                  {workflowCountry === 'HIGH_RISK' && (
                    <>
                      <p className="pl-4"><span className="text-rose-600 font-bold">{buildingBlocksT.requireMultiFactor}</span></p>
                      <p className="pl-8">1. {buildingBlocksT.govPhotoId}</p>
                      <p className="pl-8">2. {buildingBlocksT.liveFacialSelfie}</p>
                      <p className="pl-8">3. {buildingBlocksT.activeWatchlistDb}</p>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                  <span>{buildingBlocksT.verifiedRoutingStatus}</span>
                </div>
              </div>
            )}

            {/* 4. Graph Mock */}
            {activeTab === 'graph' && (
              <div className="w-full max-w-sm text-center space-y-4 animate-in fade-in duration-300">
                <div className="h-48 bg-white rounded-2xl border border-slate-200 shadow-md relative overflow-hidden flex items-center justify-center">
                  {/* Dynamic nodes showing linkage analysis */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full text-white flex items-center justify-center border-2 border-white shadow">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-800 mt-1">{buildingBlocksT.userCluster}</span>
                  </div>

                  <div className="absolute top-6 left-12 flex flex-col items-center">
                    <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center border border-purple-200">
                      <span className="text-[10px] font-mono">IP</span>
                    </div>
                    <span className="text-[8px] text-slate-400 mt-0.5">{buildingBlocksT.sharedIpAddress}</span>
                  </div>

                  <div className="absolute bottom-6 right-12 flex flex-col items-center">
                    <div className="w-8 h-8 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center border border-rose-200">
                      <span className="text-[10px] font-mono">DEV</span>
                    </div>
                    <span className="text-[8px] text-slate-400 mt-0.5">{buildingBlocksT.duplicateDevice}</span>
                  </div>

                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                    <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3 3" />
                  </svg>

                  {/* alert header */}
                  <div className="absolute top-2.5 right-2.5 bg-amber-50 border border-amber-200 text-amber-700 py-0.5 px-2 rounded-full text-[9px] font-bold font-mono">
                    {buildingBlocksT.probableSyndicate}
                  </div>
                </div>
              </div>
            )}

            {/* 5. Cases Mock */}
            {activeTab === 'cases' && (
              <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-5 shadow-lg space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    {buildingBlocksT.reviewInvestigatorInbox}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{buildingBlocksT.activeAssignments}</span>
                </div>

                <div className="space-y-2">
                  {cases.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white transition text-xs">
                      <div>
                        <p className="font-semibold text-slate-800">{c.name}</p>
                        <p className="text-[10px] text-slate-500">
                          {c.risk === 'Suspicious IP Location' ? buildingBlocksT.suspiciousIpLocation :
                           c.risk === 'Document Expiry Date mismatch' ? buildingBlocksT.docExpiryMismatch :
                           buildingBlocksT.nameTypoPassport}
                          &bull; <span className="font-semibold text-rose-600">{c.flag === 'High' ? buildingBlocksT.relayRiskHigh : c.flag === 'Medium' ? buildingBlocksT.relayRiskMedium : buildingBlocksT.relayRiskLow}</span>
                        </p>
                      </div>

                      <div className="flex gap-1.5">
                        {c.status === 'Unresolved' ? (
                          <>
                            <button
                              onClick={() => handleResolveCase(c.id, 'Approved')}
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-1.5 rounded-lg transition"
                              title={buildingBlocksT.approveUser}
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleResolveCase(c.id, 'Rejected')}
                              className="bg-rose-50 hover:bg-rose-100 text-rose-700 p-1.5 rounded-lg transition"
                              title={buildingBlocksT.rejectUser}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <span className={`text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded ${
                            c.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {c.status === 'Approved' ? buildingBlocksT.caseApproved : buildingBlocksT.caseRejected}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
