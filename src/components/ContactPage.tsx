/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft, ArrowRight, PhoneCall, CheckCircle2, AlertCircle, Loader2,
  HelpCircle, ChevronDown, ChevronUp, Search, Send, Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { CONTACT_TRANSLATIONS } from '../translations/ContactPageTranslations';
import { Link } from 'react-router-dom';
import { demoScenarioPath, viewToPath } from '../types/routes';

interface ContactPageProps {
  onBackToLanding: () => void;
}

export default function ContactPage({ onBackToLanding }: ContactPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(CONTACT_TRANSLATIONS, language as keyof typeof CONTACT_TRANSLATIONS, 'CONTACT_TRANSLATIONS');
  const tabs = useMemo(() => [
    { id: 'sales' as const, ...t.tabs.sales },
    { id: 'support' as const, ...t.tabs.support },
    { id: 'partnership' as const, ...t.tabs.partnership }
  ], [t.tabs]);

  // Tabs for Inquiry Types
  const [activeTab, setActiveTab] = useState<'sales' | 'support' | 'partnership'>('sales');
  
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
            className="type-control group inline-flex items-center gap-2 text-blue-100 hover:text-white mb-8 transition cursor-pointer"
            id="contact_back_btn"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {t.backToPlatform}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="type-label inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-yellow-300 uppercase border border-white/25 shadow-sm">
                <PhoneCall className="w-3.5 h-3.5 text-yellow-300" />
                {t.badge}
              </div>
              
              <h1 className="type-page-title measure-display text-balance text-white">
                {t.heroTitle}
              </h1>
              <p className="type-lead measure-lead text-white/95 max-w-xl">
                {t.heroDesc}
              </p>
              
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
                <span className={`type-control block ${activeTab === tab.id ? 'text-[#354CE1]' : 'text-slate-500 hover:text-slate-800'}`}>
                  {tab.label}
                </span>
                <span className="type-caption text-slate-400 hidden sm:block mt-0.5">
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
                  <label className="type-label text-slate-700 uppercase">{t.fullName}</label>
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
                    <p className="type-body-sm text-rose-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <label className="type-label text-slate-700 uppercase">{t.workEmail}</label>
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
                    <p className="type-body-sm text-rose-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="type-label text-slate-700 uppercase">{t.companyName}</label>
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
                    <p className="type-body-sm text-rose-500 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {formErrors.company}
                    </p>
                  )}
                </div>

                {/* Job Title */}
                <div className="space-y-1.5">
                  <label className="type-label text-slate-700 uppercase">{t.jobTitle}</label>
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
                <label className="type-label text-slate-700 uppercase">{t.inquirySubject}</label>
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
                  <label className="type-label text-slate-700 uppercase">{t.helpLabel}</label>
                  <span className="type-technical text-slate-400">
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
                  <p className="type-body-sm text-rose-500 font-medium flex items-center gap-1">
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
                  <span className="type-body-sm text-slate-500">
                    {t.consentPrefix} <a href={viewToPath('privacy-overview', language)} className="text-[#354CE1] hover:underline font-semibold">{t.privacyPolicy}</a>. {t.consentSuffix}
                  </span>
                </label>
                {formErrors.consent && (
                  <p className="type-body-sm text-rose-500 font-medium flex items-center gap-1 ml-7">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {formErrors.consent}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="type-control w-full bg-[#354CE1] hover:bg-[#2539BE] text-white px-6 py-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/20 hover:-translate-y-0.5 cursor-pointer"
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
                  <span className="type-control text-[#354CE1]">{t.terminal.processing}</span>
                </div>
                <span className="type-technical text-slate-400">{t.terminal.estimated}</span>
              </div>

              {/* Code Terminal styled container as requested in design.md Section 2 */}
              <div className="bg-slate-950 text-slate-350 p-5 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden font-mono text-xs leading-relaxed min-h-[220px]">
                {/* Header browser buttons */}
                <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div className="type-label text-slate-500 ml-2 uppercase">{t.terminal.title}</div>
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
                <h3 className="type-section-title-compact text-slate-900">{t.successTitle}</h3>
                <p className="type-body text-slate-500">
                  {t.successDescPrefix} <span className="font-semibold text-slate-800">{formData.email}</span>.
                </p>
              </div>

              {/* Stored Ticket Record code pane */}
              <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 text-slate-300 p-6 rounded-2xl text-left font-mono text-xs space-y-2 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
                  <span className="type-label text-slate-500 uppercase">{t.metadataTitle}</span>
                  <div className="type-label flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Check className="w-3 h-3" />
                    {t.encrypted}
                  </div>
                </div>
                <div><span className="text-slate-500">{t.ticketId}</span> {ticketId}</div>
                <div><span className="text-slate-500">{t.senderOrg}</span> {formData.company}</div>
                <div><span className="text-slate-500">{t.category}</span> {activeTab.toUpperCase()}</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setFormData({ name: '', email: '', company: '', role: '', subject: '', message: '', consent: false });
                    setFormStatus('idle');
                  }}
                  className="type-control px-6 py-2.5 text-[#354CE1] hover:text-[#2539BE] hover:bg-slate-50 rounded-full transition border border-slate-200 cursor-pointer"
                >
                  {t.submitAnother}
                </button>
                <button
                  onClick={onBackToLanding}
                  className="type-control bg-[#354CE1] hover:bg-[#2539BE] text-white px-6 py-2.5 rounded-full shadow-md transition cursor-pointer"
                >
                  {t.returnHome}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right column: the two working demos and the security page */}
        <div className="lg:col-span-5" id="contact-info-grid">
          <div className="bg-[#0F1E36] text-white rounded-3xl p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="type-section-title-compact">{t.channelsTitle}</h2>
              <p className="type-body text-blue-100">{t.channelsDesc}</p>
            </div>
            <ul className="space-y-3">
              {[
                { label: t.demoDiploma, to: demoScenarioPath('diploma', language) },
                { label: t.demoProduct, to: demoScenarioPath('product-journey', language) },
                { label: t.securityLink, to: viewToPath('security', language) },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="type-control flex min-h-11 items-center justify-between gap-3 rounded-2xl bg-white/5 px-4 py-3 text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>{item.label}</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. FAQ Section with Accordion Selector */}
      <section className="bg-slate-50 border-y border-slate-150 py-20 px-6" id="faq-accordions-section">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="type-label inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#354CE1]/10 rounded-full text-[#354CE1]">
              <HelpCircle className="w-4 h-4 text-[#354CE1]" />
              <span>{t.faqBadge}</span>
            </span>
            <h2 className="type-section-title-compact text-[#0F1E36]">
              {t.faqTitle}
            </h2>
            <p className="type-body text-slate-500 max-w-lg mx-auto">
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
                    
                      <div data-seo-disclosure hidden={!isExpanded} className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-50/50 animate-in fade-in slide-in-from-top-1 duration-200">
                        {faq.answer}
                      </div>
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

    </div>
  );
}
