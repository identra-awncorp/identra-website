/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  Search,
  Send,
  Check,
  Award,
  Compass,
  Zap,
  Workflow,
  Loader2,
  ArrowUpRight,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { PARTNERS_PAGE_TRANSLATIONS } from '../translations/PartnersPageTranslations';

interface PartnersPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
}

type PartnerCategory = 'all' | 'identity' | 'crm' | 'database' | 'security';

const interpolate = (template: string, values: Record<string, string>) =>
  Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, value), template);

export default function PartnersPage({ onOpenSandbox, onBackToLanding }: PartnersPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(PARTNERS_PAGE_TRANSLATIONS, language as keyof typeof PARTNERS_PAGE_TRANSLATIONS, 'PARTNERS_PAGE_TRANSLATIONS');

  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [activeSimulationLogs, setActiveSimulationLogs] = useState<string[]>([]);
  const [referralsCount, setReferralsCount] = useState<number>(12);
  const [formData, setFormData] = useState({
    partnerName: '',
    email: '',
    companyWebsite: '',
    partnerType: 'technology',
    integrationsProposed: '',
    consent: false
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [partnerTicketLogs, setPartnerTicketLogs] = useState<string[]>([]);
  const [partnerID, setPartnerID] = useState('');
  const [selectedDirectoryCategory, setSelectedDirectoryCategory] = useState<PartnerCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleConnectIntegration = (id: string) => {
    if (connectingId) return;

    const partner = t.integrations.find((item) => item.id === id);
    if (!partner) return;

    if (connectedIds.includes(id)) {
      setConnectedIds((prev) => prev.filter((itemId) => itemId !== id));
      return;
    }

    setConnectingId(id);
    setActiveSimulationLogs([]);

    const steps = [
      interpolate(t.simulator.logs.api, { partner: partner.name, id }),
      t.simulator.logs.oauth,
      interpolate(t.simulator.logs.security, { partner: partner.name, id }),
      interpolate(t.simulator.logs.webhook, { partner: partner.name, id }),
      t.simulator.logs.schemas,
      t.simulator.logs.test,
      interpolate(t.simulator.logs.complete, { partner: partner.name, id })
    ];

    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < steps.length) {
        const nextStep = steps[logIndex];
        setActiveSimulationLogs((prev) => [...prev, nextStep]);
        logIndex++;
      } else {
        clearInterval(interval);
        setConnectedIds((prev) => [...prev, id]);
        setConnectingId(null);
      }
    }, 350);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.partnerName.trim()) errors.partnerName = t.form.errors.partnerName;
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = t.form.errors.email;
    if (!formData.companyWebsite.trim()) errors.companyWebsite = t.form.errors.companyWebsite;
    if (!formData.consent) errors.consent = t.form.errors.consent;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormStatus('submitting');

    const randId = `PRT-${Math.floor(1000 + Math.random() * 9000)}`;
    setPartnerID(randId);

    const steps = [
      interpolate(t.form.logs.system, { name: formData.partnerName, domain: formData.companyWebsite, id: randId }),
      interpolate(t.form.logs.compliance, { name: formData.partnerName, domain: formData.companyWebsite, id: randId }),
      t.form.logs.sla,
      t.form.logs.router,
      interpolate(t.form.logs.success, { name: formData.partnerName, domain: formData.companyWebsite, id: randId })
    ];

    setPartnerTicketLogs([]);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < steps.length) {
        const nextTicketStep = steps[idx];
        setPartnerTicketLogs((prev) => [...prev, nextTicketStep]);
        idx++;
      } else {
        clearInterval(interval);
        setFormStatus('submitted');
      }
    }, 300);
  };

  const isMatchingTier = (tier: typeof t.calculator.tiers[number]) => {
    return referralsCount < tier.max + 1;
  };
  const calc = t.calculator.tiers.find(isMatchingTier) || t.calculator.tiers[t.calculator.tiers.length - 1];
  const directoryCategories: PartnerCategory[] = ['all', 'identity', 'crm', 'database', 'security'];

  const filteredDirectory = t.directory.partners.filter((partner) => {
    const matchesCategory = selectedDirectoryCategory === 'all' || partner.category === selectedDirectoryCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      partner.name.toLowerCase().includes(query) ||
      partner.desc.toLowerCase().includes(query) ||
      partner.rating.toLowerCase().includes(query) ||
      t.categories[partner.category].toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2 text-blue-100 hover:text-white text-xs font-semibold mb-8 transition cursor-pointer"
            id="partners_back_btn"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t.backToPlatform}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-yellow-300 uppercase border border-white/25 shadow-sm">
                <HeartHandshake className="w-3.5 h-3.5 text-yellow-300" />
                {t.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-sans font-semibold tracking-tight text-white leading-[1.1]">
                {t.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-white/95 max-w-xl font-normal leading-relaxed">
                {t.heroDesc}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-blue-100 font-light pt-2">
                {t.heroChecks.map((check) => (
                  <span key={check} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-yellow-300" />
                    {check}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {t.stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15">
                  <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1 text-white">{stat.value}</p>
                  <p className="text-[10px] text-blue-100/80 mt-1 font-light">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 space-y-12" id="app-store-simulator">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#354CE1] text-xs font-semibold rounded-full uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>{t.simulator.badge}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-semibold tracking-tight text-[#0F1E36]">
            {t.simulator.title}
          </h2>
          <p className="text-slate-500 text-sm">
            {t.simulator.descPrefix} <strong>{t.simulator.connectSyncQuoted}</strong> {t.simulator.descSuffix}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.integrations.map((item) => {
              const isConnecting = connectingId === item.id;
              const isConnected = connectedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`bg-white border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-lg relative overflow-hidden ${
                    isConnected ? 'border-[#354CE1] ring-1 ring-[#354CE1]/20' : 'border-slate-200 hover:border-slate-350'
                  }`}
                  id={`integration-card-${item.id}`}
                >
                  <div className="absolute top-4 right-4 text-[9px] font-mono tracking-wider font-bold text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full uppercase">
                    {t.categories[item.category]}
                  </div>

                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#354CE1] to-indigo-500/80 text-white flex items-center justify-center font-bold text-sm tracking-widest shadow-md">
                      {item.logo}
                    </div>

                    <h3 className="text-base font-bold text-[#0F1E36] mt-4 flex items-center gap-1.5">
                      {item.name}
                      {isConnected && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold border border-emerald-100">
                          <Check className="w-3 h-3" />
                          {t.simulator.active}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed font-light">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                      {item.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          <div className="w-1 h-1 rounded-full bg-[#354CE1]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => handleConnectIntegration(item.id)}
                      disabled={connectingId !== null && connectingId !== item.id}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                        isConnected
                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200'
                          : 'bg-[#354CE1] hover:bg-[#2539BE] text-white disabled:opacity-50'
                      }`}
                      id={`btn-connect-${item.id}`}
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>{t.simulator.connecting}</span>
                        </>
                      ) : isConnected ? (
                        <span>{t.simulator.disconnect}</span>
                      ) : (
                        <>
                          <Workflow className="w-3.5 h-3.5" />
                          <span>{t.simulator.connect}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-5 bg-slate-950 text-slate-300 p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[350px] font-mono text-xs">
            <div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-500 tracking-wider uppercase ml-1.5">{t.simulator.terminalTitle}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[9px] text-emerald-400 font-bold font-sans">{t.simulator.terminalStatus}</span>
                </div>
              </div>

              {activeSimulationLogs.length > 0 ? (
                <div className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-none pr-1">
                  {activeSimulationLogs.map((log) => {
                    let color = 'text-slate-400';
                    if (log.includes('[API]')) color = 'text-indigo-400';
                    if (log.includes('[SECURITY]') || log.includes('[SEGURIDAD]')) color = 'text-yellow-300';
                    if (log.includes('[COMPLETE]') || log.includes('[COMPLETO]')) color = 'text-emerald-400 font-semibold';
                    return (
                      <div key={log} className={`${color} leading-relaxed`}>
                        {log}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 space-y-3">
                  <Compass className="w-8 h-8 text-slate-600 mx-auto animate-spin" />
                  <p className="text-xs font-semibold">{t.simulator.readyTitle}</p>
                  <p className="text-[10px] font-light max-w-[200px] mx-auto">{t.simulator.readyDesc}</p>
                </div>
              )}
            </div>

            <div className="border-t border-slate-900 pt-4 mt-4 text-[10px] text-slate-500 flex items-center justify-between font-sans font-semibold">
              <div className="flex items-center gap-2">
                <span>{t.simulator.activePipes}</span>
                <span className="text-white font-mono">{connectedIds.length} / {t.integrations.length}</span>
              </div>
              <div>
                <span>{t.simulator.uptimeSla}</span>
                <span className="text-emerald-400 font-mono ml-1">99.999%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-150 py-16 px-6" id="referrals-calc-section">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100 uppercase">
              <Award className="w-4 h-4" />
              <span>{t.calculator.badge}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold tracking-tight text-[#0F1E36]">
              {t.calculator.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.calculator.desc}
            </p>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700 uppercase">{t.calculator.expectedReferrals}</span>
                <span className="text-xl font-bold font-mono text-[#354CE1]">{referralsCount} <span className="text-xs font-sans font-normal text-slate-400">{t.calculator.clientsPerMonth}</span></span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                value={referralsCount}
                onChange={(e) => setReferralsCount(parseInt(e.target.value))}
                className="w-full accent-[#354CE1] h-1.5 rounded-lg cursor-pointer bg-slate-100"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>{t.calculator.minLabel}</span>
                <span>{t.calculator.midLabel}</span>
                <span>{t.calculator.maxLabel}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-lg shadow-indigo-950/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-full pointer-events-none" />

            <div className="space-y-6">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">{t.calculator.activeTier}</p>
                <div className="flex items-center gap-3 mt-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F1E36] tracking-tight">{calc.tier}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${calc.badgeColor}`}>
                    {t.calculator.activeStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t.calculator.revenueShare}</span>
                  <p className="text-lg font-bold text-[#354CE1]">{calc.commission}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t.calculator.marketingBudget}</span>
                  <p className="text-lg font-bold text-slate-800">{calc.mktgBudget}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{t.calculator.supportSla}</span>
                  <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                    {calc.support}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-light">{t.calculator.note}</span>
                <button
                  onClick={onOpenSandbox}
                  className="text-[#354CE1] hover:underline font-bold flex items-center gap-1"
                >
                  {t.calculator.apply} <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 space-y-12" id="directory-section">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-150 pb-8">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#0F1E36] tracking-tight">
              {t.directory.title}
            </h2>
            <p className="text-xs text-slate-400">
              {t.directory.desc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t.directory.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs outline-none transition focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1]"
              />
            </div>

            <div className="flex bg-slate-100 p-1 rounded-full overflow-x-auto w-full sm:w-auto">
              {directoryCategories.map((categoryId) => (
                <button
                  key={categoryId}
                  onClick={() => setSelectedDirectoryCategory(categoryId)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    selectedDirectoryCategory === categoryId ? 'bg-[#354CE1] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.categories[categoryId]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDirectory.length > 0 ? (
            filteredDirectory.map((partner) => (
              <div key={partner.name} className="bg-white border border-slate-150 rounded-2xl p-6 hover:shadow-md transition flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] font-mono tracking-wider font-extrabold uppercase bg-[#354CE1]/15 text-[#354CE1] px-2 py-0.5 rounded-full">
                      {t.categories[partner.category]}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                      {partner.rating}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mt-4">{partner.name}</h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed font-light">{partner.desc}</p>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between text-xs font-semibold text-[#354CE1]">
                  <span>{partner.url}</span>
                  <a href={`https://${partner.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                    {t.directory.website} <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500 space-y-2">
              <p className="text-sm font-semibold">{t.directory.emptyTitle}</p>
              <p className="text-xs font-light">{t.directory.emptyDesc}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white border-y border-slate-150 py-16 px-6" id="become-partner-form">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-150 p-6 sm:p-10 shadow-lg shadow-indigo-950/5">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-8">
            <h3 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-[#0F1E36]">
              {t.form.title}
            </h3>
            <p className="text-slate-500 text-xs">
              {t.form.desc}
            </p>
          </div>

          {formStatus === 'idle' && (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">{t.form.contactName}</label>
                  <input
                    type="text"
                    placeholder={t.form.contactPlaceholder}
                    value={formData.partnerName}
                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs outline-none transition focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] ${
                      formErrors.partnerName ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200 bg-slate-50/30'
                    }`}
                  />
                  {formErrors.partnerName && (
                    <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">{formErrors.partnerName}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">{t.form.email}</label>
                  <input
                    type="email"
                    placeholder={t.form.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs outline-none transition focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] ${
                      formErrors.email ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200 bg-slate-50/30'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">{t.form.website}</label>
                  <input
                    type="text"
                    placeholder={t.form.websitePlaceholder}
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs outline-none transition focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] ${
                      formErrors.companyWebsite ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200 bg-slate-50/30'
                    }`}
                  />
                  {formErrors.companyWebsite && (
                    <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">{formErrors.companyWebsite}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">{t.form.partnerType}</label>
                  <select
                    value={formData.partnerType}
                    onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/30 text-xs outline-none transition focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1]"
                  >
                    {t.form.typeOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">{t.form.proposed}</label>
                <textarea
                  rows={3}
                  placeholder={t.form.proposedPlaceholder}
                  value={formData.integrationsProposed}
                  onChange={(e) => setFormData({ ...formData, integrationsProposed: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/30 text-xs outline-none transition focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] resize-none"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 accent-[#354CE1] rounded w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-500 leading-normal">
                    {t.form.consent}
                  </span>
                </label>
                {formErrors.consent && (
                  <p className="text-[10px] text-rose-500 font-medium flex items-center gap-1">{formErrors.consent}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs px-6 py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/15 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.form.submit}</span>
              </button>
            </form>
          )}

          {formStatus === 'submitting' && (
            <div className="space-y-4" id="partner-terminal">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#354CE1]">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.form.submitting}</span>
              </div>
              <div className="bg-slate-950 text-slate-300 p-5 rounded-2xl border border-slate-800 font-mono text-xs space-y-1.5 min-h-[160px]">
                {partnerTicketLogs.map((log) => (
                  <div key={log} className="leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {formStatus === 'submitted' && (
            <div className="text-center py-10 space-y-6" id="partner-success-view">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-150">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-slate-900">{t.form.successTitle}</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {t.form.successDescPrefix} <span className="font-semibold text-slate-800">{formData.companyWebsite}</span> {t.form.successDescSuffix}
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 text-slate-300 p-6 rounded-2xl max-w-sm mx-auto text-left font-mono text-xs space-y-1.5">
                <div className="text-[9px] text-slate-500 font-sans font-bold uppercase tracking-wide border-b border-slate-800 pb-2 mb-2">{t.form.recordTitle}</div>
                <div><span className="text-slate-500">{t.form.partnerId}</span> {partnerID}</div>
                <div><span className="text-slate-500">{t.form.name}</span> {formData.partnerName}</div>
                <div><span className="text-slate-500">{t.form.domain}</span> {formData.companyWebsite}</div>
                <div><span className="text-slate-500">{t.form.type}</span> {formData.partnerType.toUpperCase()}</div>
                <div><span className="text-slate-500">{t.form.status}</span> {t.form.reviewPending}</div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setFormData({ partnerName: '', email: '', companyWebsite: '', partnerType: 'technology', integrationsProposed: '', consent: false });
                    setFormStatus('idle');
                  }}
                  className="px-5 py-2 rounded-full border border-slate-200 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  {t.form.submitAnother}
                </button>
                <button
                  onClick={onBackToLanding}
                  className="bg-[#354CE1] hover:bg-[#2539BE] text-white text-xs font-bold px-5 py-2 rounded-full shadow-sm transition cursor-pointer"
                >
                  {t.form.returnHome}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
