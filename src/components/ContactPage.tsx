/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, ArrowRight, PhoneCall, MapPin, Clock, 
  CheckCircle2, ShieldCheck, AlertCircle, Loader2, Building2, 
  HelpCircle, ChevronDown, ChevronUp, Search, Sparkles, Send, Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { CONTACT_TRANSLATIONS } from '../translations/ContactPageTranslations';

interface ContactPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
}

interface Office {
  id: 'sf' | 'ny' | 'london' | 'tokyo';
  timezone: string;
  phone: string;
}

const OFFICES: Office[] = [
  { id: 'sf', timezone: 'America/Los_Angeles', phone: '+1 (800) 555-0199' },
  { id: 'ny', timezone: 'America/New_York', phone: '+1 (800) 555-0212' },
  { id: 'london', timezone: 'Europe/London', phone: '+44 20 7946 0192' },
  { id: 'tokyo', timezone: 'Asia/Tokyo', phone: '+81 3 5555 0173' }
];

export default function ContactPage({ onOpenSandbox, onBackToLanding }: ContactPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(CONTACT_TRANSLATIONS, language as keyof typeof CONTACT_TRANSLATIONS, 'CONTACT_TRANSLATIONS');
  const tabs = useMemo(() => [
    { id: 'sales' as const, ...t.tabs.sales },
    { id: 'support' as const, ...t.tabs.support },
    { id: 'partnership' as const, ...t.tabs.partnership }
  ], [t.tabs]);
  const offices = useMemo(() => OFFICES.map(office => ({
    ...office,
    ...t.offices[office.id]
  })), [t.offices]);

  // Tabs for Inquiry Types
  const [activeTab, setActiveTab] = useState<'sales' | 'support' | 'partnership'>('sales');
  
  // Local Clocks State
  const [officeTimes, setOfficeTimes] = useState<Record<string, string>>({});
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    subject: '',
    message: '',
    consent: false
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  
  // Simulated Terminal State for Ticket Submission
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [ticketId, setTicketId] = useState('');
  
  // FAQs Search and Expand State
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Update clocks every second
  useEffect(() => {
    const updateClocks = () => {
      const times: Record<string, string> = {};
      offices.forEach(office => {
        try {
          times[office.id] = new Intl.DateTimeFormat('en-US', {
            timeZone: office.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }).format(new Date());
        } catch (e) {
          times[office.id] = new Date().toLocaleTimeString();
        }
      });
      setOfficeTimes(times);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, [offices]);

  // Set default message subject based on active tab
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      subject: t.tabs[activeTab].subject
    }));
  }, [activeTab, t.tabs]);

  // Form Field Updates
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
    
    // Clear error
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Submission validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = t.errors.name;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = t.errors.emailRequired;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = t.errors.emailInvalid;
    }
    
    if (!formData.company.trim()) errors.company = t.errors.company;
    if (!formData.message.trim()) errors.message = t.errors.message;
    if (!formData.consent) errors.consent = t.errors.consent;
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus('submitting');
    
    // Generate a beautiful mock ticket ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const generatedTicket = `TKT-${randomNum}`;
    setTicketId(generatedTicket);

    // Simulated terminal pipeline sequence
    const systemLogs = [
      t.terminal.system,
      t.terminal.security,
      t.terminal.routingAnalyze,
      t.terminal.routingType.replace('{type}', activeTab.toUpperCase()),
      t.terminal.parsing.replace('{name}', formData.name).replace('{company}', formData.company),
      t.terminal.integration,
      t.terminal.agent,
      t.terminal.queue,
      t.terminal.database,
      t.terminal.success.replace('{ticket}', generatedTicket)
    ];

    setTerminalLogs([]);

    // Staggered output of logs in the beautiful simulator
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < systemLogs.length) {
        const nextLog = systemLogs[logIndex];
        setTerminalLogs(prev => [...prev, nextLog]);
        logIndex++;
      } else {
        clearInterval(interval);
        setFormStatus('submitted');
      }
    }, 250);
  };

  // Filtered FAQs
  const filteredFaqs: Array<{ question: string; answer: string }> = t.faqs.filter((faq: { question: string; answer: string }) => {
    const query = faqSearch.toLowerCase();
    return faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query);
  });

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. Header Hero Section with beautiful signature brand blue gradient */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Glowing background graphic accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Back Button */}
          <button 
            onClick={onBackToLanding}
            className="group inline-flex items-center gap-2 text-blue-100 hover:text-white text-xs font-semibold mb-8 transition cursor-pointer"
            id="contact_back_btn"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t.backToPlatform}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider text-yellow-300 uppercase border border-white/25 shadow-sm">
                <PhoneCall className="w-3.5 h-3.5 text-yellow-300" />
                {t.badge}
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-sans font-semibold tracking-tight text-white leading-[1.1]">
                {t.heroTitle}
              </h1>
              <p className="text-base sm:text-lg text-white/95 max-w-xl font-normal leading-relaxed">
                {t.heroDesc}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-blue-100 font-light pt-2">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-yellow-300" />
                  {t.slaResponse}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-yellow-300" />
                  {t.liveSupport}
                </span>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15">
                <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">{t.inquiriesHandled}</p>
                <p className="text-3xl font-bold mt-1 text-white">{t.inquiriesValue}</p>
                <p className="text-[10px] text-blue-100/80 mt-1 font-light">{t.slaDeliveries}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15">
                <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">{t.globalPresence}</p>
                <p className="text-3xl font-bold mt-1 text-white">{t.globalPresenceValue}</p>
                <p className="text-[10px] text-blue-100/80 mt-1 font-light">{t.hubOffices}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Page Grid: Form and Global Office local times */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-main-grid">
        
        {/* Left Form Column (8 of 12) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-150 p-6 sm:p-10 shadow-lg shadow-indigo-950/5">
          
          {/* Tab selectors for Contact Type */}
          <div className="flex border-b border-slate-100 pb-2 mb-8 gap-4 overflow-x-auto" id="contact-category-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  if (formStatus !== 'submitting') {
                    setActiveTab(tab.id as 'sales' | 'support' | 'partnership');
                  }
                }}
                disabled={formStatus === 'submitting'}
                className={`pb-4 px-1 text-left relative min-w-[120px] transition cursor-pointer flex-1 disabled:opacity-50`}
                id={`tab-btn-${tab.id}`}
              >
                <span className={`text-xs font-bold block ${activeTab === tab.id ? 'text-[#354CE1]' : 'text-slate-500 hover:text-slate-800'}`}>
                  {tab.label}
                </span>
                <span className="text-[10px] text-slate-400 font-normal leading-tight hidden sm:block mt-0.5">
                  {tab.desc}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#354CE1] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {formStatus === 'idle' && (
            <form onSubmit={handleSubmit} className="space-y-6" id="contact-form-flow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">{t.fullName}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t.namePlaceholder}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] outline-none ${
                      formErrors.name ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200 bg-slate-50/30'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">{t.workEmail}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.emailPlaceholder}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] outline-none ${
                      formErrors.email ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200 bg-slate-50/30'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">{t.companyName}</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={t.companyPlaceholder}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] outline-none ${
                      formErrors.company ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200 bg-slate-50/30'
                    }`}
                  />
                  {formErrors.company && (
                    <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.company}
                    </p>
                  )}
                </div>

                {/* Job Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">{t.jobTitle}</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder={t.rolePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/30 text-sm transition focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] outline-none"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">{t.inquirySubject}</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/30 text-sm font-medium text-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] outline-none"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">{t.helpLabel}</label>
                  <span className="text-[10px] text-slate-400 font-mono font-medium">
                    {formData.message.length} {t.characters}
                  </span>
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={t.messagePlaceholder}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] outline-none resize-none ${
                    formErrors.message ? 'border-rose-500 bg-rose-50/10' : 'border-slate-200 bg-slate-50/30'
                  }`}
                />
                {formErrors.message && (
                  <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Legal Consent checkbox */}
              <div className="space-y-2 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 accent-[#354CE1] rounded w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[11px] sm:text-xs text-slate-500 leading-normal">
                    {t.consentPrefix} <a href="#" className="text-[#354CE1] hover:underline font-semibold">{t.privacyPolicy}</a>. {t.consentSuffix}
                  </span>
                </label>
                {formErrors.consent && (
                  <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1 ml-7">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {formErrors.consent}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-sm px-6 py-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/20 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Send className="w-4.5 h-4.5" />
                  <span>{t.submitInquiry}</span>
                </button>
              </div>
            </form>
          )}

          {/* Form Pipeline Terminal Simulation (Loading State) */}
          {formStatus === 'submitting' && (
            <div className="space-y-6" id="submitting-pipeline-terminal">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 text-[#354CE1] animate-spin" />
                  <span className="text-sm font-semibold text-[#354CE1]">{t.terminal.processing}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-medium">{t.terminal.estimated}</span>
              </div>

              {/* Code Terminal styled container as requested in design.md Section 2 */}
              <div className="bg-slate-950 text-slate-350 p-5 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden font-mono text-xs leading-relaxed min-h-[220px]">
                {/* Header browser buttons */}
                <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div className="text-[10px] text-slate-500 font-sans tracking-wide ml-2 uppercase">{t.terminal.title}</div>
                </div>

                <div className="space-y-1.5 overflow-y-auto max-h-[160px] scrollbar-none">
                  {terminalLogs.map((log, index) => {
                    let color = 'text-slate-300';
                    if (log.startsWith('[SYSTEM]')) color = 'text-[#354CE1]';
                    if (log.startsWith('[SUCCESS]')) color = 'text-emerald-400 font-semibold';
                    if (log.startsWith('[SECURITY]')) color = 'text-[#00E5FF]';
                    if (log.startsWith('[ROUTING]')) color = 'text-yellow-300';
                    if (log.startsWith('[PARSING]')) color = 'text-amber-400';
                    return (
                      <div key={index} className={color}>
                        {log}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Success Submission Screen */}
          {formStatus === 'submitted' && (
            <div className="text-center py-12 px-6 space-y-6 animate-in fade-in zoom-in-95 duration-300" id="contact-success-state">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{t.successTitle}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t.successDescPrefix} <span className="font-semibold text-slate-800">{formData.email}</span>.
                </p>
              </div>

              {/* Stored Ticket Record code pane */}
              <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 text-slate-300 p-6 rounded-2xl text-left font-mono text-xs space-y-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
                  <span className="text-[10px] text-slate-500 font-sans font-bold uppercase tracking-wider">{t.metadataTitle}</span>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-sans font-semibold border border-emerald-500/20">
                    <Check className="w-3 h-3" />
                    {t.encrypted}
                  </div>
                </div>
                <div><span className="text-slate-500">{t.ticketId}</span> {ticketId}</div>
                <div><span className="text-slate-500">{t.senderOrg}</span> {formData.company}</div>
                <div><span className="text-slate-500">{t.category}</span> {activeTab.toUpperCase()}</div>
                <div><span className="text-slate-500">{t.slaPriority}</span> {t.tierCritical}</div>
                <div><span className="text-slate-500">{t.avgResponse}</span> {t.avgResponseValue}</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setFormData({ name: '', email: '', company: '', role: '', subject: '', message: '', consent: false });
                    setFormStatus('idle');
                  }}
                  className="px-6 py-2.5 text-xs font-bold text-[#354CE1] hover:text-[#2539BE] hover:bg-slate-50 rounded-full transition border border-slate-200 cursor-pointer"
                >
                  {t.submitAnother}
                </button>
                <button
                  onClick={onBackToLanding}
                  className="bg-[#354CE1] hover:bg-[#2539BE] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md transition cursor-pointer"
                >
                  {t.returnHome}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Info Column: Global Clocks & Details (4 of 12) */}
        <div className="lg:col-span-5 space-y-8" id="contact-info-grid">
          
          {/* Support Channels Card */}
          <div className="bg-gradient-to-tr from-[#0F1E36] to-[#1E355E] text-white rounded-3xl p-6 md:p-8 border border-[#354CE1]/10 shadow-xl space-y-6">
            <div className="space-y-2">
              <h4 className="text-lg font-bold font-display">{t.channelsTitle}</h4>
              <p className="text-xs text-indigo-200 leading-relaxed font-light">
                {t.channelsDesc}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <ShieldCheck className="w-6 h-6 text-yellow-300 shrink-0" />
                <div>
                  <p className="text-xs font-bold">{t.securityTitle}</p>
                  <p className="text-[10px] text-indigo-200/80 mt-1 leading-normal">
                    {t.securityDesc}
                  </p>
                  <a href="mailto:security@withidentra.com" className="text-xs text-yellow-300 hover:underline font-semibold mt-1.5 block">
                    {t.securityEmail}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <Building2 className="w-6 h-6 text-[#00E5FF] shrink-0" />
                <div>
                  <p className="text-xs font-bold">{t.pressTitle}</p>
                  <p className="text-[10px] text-indigo-200/80 mt-1 leading-normal">
                    {t.pressDesc}
                  </p>
                  <a href="mailto:press@withidentra.com" className="text-xs text-[#00E5FF] hover:underline font-semibold mt-1.5 block">
                    {t.pressEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Global Office Clocks Board */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 md:p-8 shadow-lg shadow-indigo-950/5 space-y-6">
            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#0F1E36] tracking-tight">{t.officesTitle}</h4>
              <p className="text-xs text-slate-500 leading-normal">
                {t.officesDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offices.map((office, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-400 tracking-wide uppercase">
                      <MapPin className="w-3 h-3 text-[#354CE1]" />
                      {office.location}
                    </span>
                    <p className="text-xs font-bold text-slate-900 mt-1 leading-tight">{office.name}</p>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-light leading-normal">{office.address}</p>
                  </div>
                  
                  <div className="border-t border-slate-200/60 pt-3 flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-[#354CE1] uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {t.localTime}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-800">
                      {officeTimes[office.id] || '--:--:-- --'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. FAQ Section with Accordion Selector */}
      <section className="bg-slate-50 border-y border-slate-150 py-20 px-6" id="faq-accordions-section">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#354CE1]/10 rounded-full text-xs font-bold text-[#354CE1]">
              <HelpCircle className="w-4 h-4 text-[#354CE1]" />
              <span>{t.faqBadge}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold tracking-tight text-[#0F1E36]">
              {t.faqTitle}
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              {t.faqDesc}
            </p>
          </div>

          {/* Interactive Search */}
          <div className="relative max-w-md mx-auto" id="faq-searchbar-container">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t.faqSearchPlaceholder}
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-full text-sm outline-none transition focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] placeholder-slate-400 shadow-sm"
            />
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isExpanded = expandedFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition duration-200"
                    id={`faq-accordion-item-${idx}`}
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                      className="w-full p-5 flex items-center justify-between text-left gap-4 font-semibold text-slate-800 hover:text-[#354CE1] transition cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm">{faq.question}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#354CE1] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-50/50 animate-in fade-in slide-in-from-top-1 duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-slate-500 space-y-2">
                <p className="text-sm font-semibold">{t.noFaqTitle}</p>
                <p className="text-xs font-light">{t.noFaqDesc}</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 4. Footer CTA (as shown in standard subpages) */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] rounded-[2.5rem] p-8 sm:p-16 text-white text-left relative overflow-hidden shadow-2xl">
          {/* Decorative shapes */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-yellow-400/20 rounded-full filter blur-2xl animate-pulse" />
          <div className="absolute left-1/3 top-10 w-48 h-48 bg-indigo-400/20 rounded-full filter blur-xl" />

          <div className="max-w-2xl space-y-8 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-yellow-300 border border-white/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.footerBadge}</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold leading-tight">
              {t.footerTitle}
            </h2>
            <p className="text-indigo-50 text-lg leading-relaxed max-w-xl font-light">
              {t.footerDesc}
            </p>
            <div>
              <button 
                onClick={onOpenSandbox}
                className="inline-flex items-center gap-2 px-6 py-4 bg-white hover:bg-teal-50 text-[#354CE1] font-bold rounded-full text-xs shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                id="contact-footer-sandbox-btn"
              >
                <span>{t.launchSandbox}</span>
                <ArrowRight className="w-4 h-4 text-[#354CE1]" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
