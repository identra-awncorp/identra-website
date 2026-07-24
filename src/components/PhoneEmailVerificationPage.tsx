/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  ChevronRight,
  Database,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { PHONE_EMAIL_VERIFICATION_TRANSLATIONS } from '../translations/PhoneEmailVerificationPageTranslations';

interface PhoneEmailVerificationPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

type SandboxTab = 'otp-sms' | 'otp-email' | 'carrier-db' | 'risk-score';
type CarrierStatus = 'MATCHED' | 'PARTIAL_MATCH' | 'MISMATCH';
type RiskFlagKey = 'voipLine' | 'recentSimSwap' | 'disposableDomain' | 'spamListed';

interface CarrierRecord {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  carrier: string;
  lineType: 'Mobile' | 'Landline' | 'VoIP';
  billingZip: string;
  simSwapAgeDays: number;
}

const CARRIER_REGISTRY: Record<string, CarrierRecord> = {
  '5550199': { phoneNumber: '+1 (555) 019-9234', firstName: 'Alex', lastName: 'Rivera', carrier: 'Verizon', lineType: 'Mobile', billingZip: '94103', simSwapAgeDays: 450 },
  '5550144': { phoneNumber: '+1 (555) 014-4321', firstName: 'Jane', lastName: 'Doe', carrier: 'AT&T', lineType: 'Mobile', billingZip: '10001', simSwapAgeDays: 12 },
  '5550188': { phoneNumber: '+1 (555) 018-8765', firstName: 'John', lastName: 'Smith', carrier: 'VoIP/Virtual', lineType: 'VoIP', billingZip: '90210', simSwapAgeDays: 0 }
};

const SESSION_ID = 'PE-74291-B';
const SAMPLE_PHONE = '+1 (555) 019-9234';
const SAMPLE_EMAIL = 'alex.rivera@example.com';

export default function PhoneEmailVerificationPage({ onOpenSandbox, onBackToLanding, onViewChange }: PhoneEmailVerificationPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(PHONE_EMAIL_VERIFICATION_TRANSLATIONS, language as keyof typeof PHONE_EMAIL_VERIFICATION_TRANSLATIONS, 'PHONE_EMAIL_VERIFICATION_TRANSLATIONS');

  const [sandboxTab, setSandboxTab] = useState<SandboxTab>('otp-sms');
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [activeMethod, setActiveMethod] = useState<string>('2fa-phone');

  const [smsPhoneInput, setSmsPhoneInput] = useState(SAMPLE_PHONE);
  const [smsStatus, setSmsStatus] = useState<'idle' | 'sending' | 'otp-sent' | 'verifying' | 'verified' | 'error'>('idle');
  const [smsOtpCode, setSmsOtpCode] = useState('');
  const [sentSmsCode, setSentSmsCode] = useState('');

  const [emailInput, setEmailInput] = useState(SAMPLE_EMAIL);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'otp-sent' | 'verifying' | 'verified' | 'error'>('idle');
  const [emailOtpCode, setEmailOtpCode] = useState('');
  const [sentEmailCode, setSentEmailCode] = useState('');

  const [carrierPhoneInput, setCarrierPhoneInput] = useState(SAMPLE_PHONE);
  const [carrierFirstNameInput, setCarrierFirstNameInput] = useState('Alex');
  const [carrierLastNameInput, setCarrierLastNameInput] = useState('Rivera');
  const [carrierZipInput, setCarrierZipInput] = useState('94103');
  const [carrierLookupStatus, setCarrierLookupStatus] = useState<'idle' | 'searching' | 'completed'>('idle');
  const [carrierResults, setCarrierResults] = useState<any>(null);

  const [riskPhoneInput, setRiskPhoneInput] = useState('+1 (555) 014-4321');
  const [riskEmailInput, setRiskEmailInput] = useState('john.smith99@temp-mail.org');
  const [riskFlags, setRiskFlags] = useState<Record<RiskFlagKey, boolean>>({
    voipLine: true,
    recentSimSwap: true,
    disposableDomain: true,
    spamListed: false
  });
  const [riskAnalysisStatus, setRiskAnalysisStatus] = useState<'idle' | 'analyzing' | 'completed'>('idle');
  const [riskAnalysisResult, setRiskAnalysisResult] = useState<any>(null);

  const makeCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendSms = (event: React.FormEvent) => {
    event.preventDefault();
    setSmsStatus('sending');
    setTimeout(() => {
      setSentSmsCode(makeCode());
      setSmsStatus('otp-sent');
    }, 700);
  };

  const handleVerifySms = (event: React.FormEvent) => {
    event.preventDefault();
    setSmsStatus('verifying');
    setTimeout(() => setSmsStatus(smsOtpCode === sentSmsCode || smsOtpCode === '123456' ? 'verified' : 'error'), 500);
  };

  const handleSendEmail = (event: React.FormEvent) => {
    event.preventDefault();
    setEmailStatus('sending');
    setTimeout(() => {
      setSentEmailCode(makeCode());
      setEmailStatus('otp-sent');
    }, 700);
  };

  const handleVerifyEmail = (event: React.FormEvent) => {
    event.preventDefault();
    setEmailStatus('verifying');
    setTimeout(() => setEmailStatus(emailOtpCode === sentEmailCode || emailOtpCode === '123456' ? 'verified' : 'error'), 500);
  };

  const handleCarrierLookup = (event: React.FormEvent) => {
    event.preventDefault();
    setCarrierLookupStatus('searching');
    setTimeout(() => {
      const digits = carrierPhoneInput.replace(/\D/g, '');
      const foundKey = digits.includes('5550144') || carrierLastNameInput.toLowerCase() === 'doe'
        ? '5550144'
        : digits.includes('5550188') || carrierLastNameInput.toLowerCase() === 'smith'
          ? '5550188'
          : '5550199';
      const record = CARRIER_REGISTRY[foundKey];
      const firstNameMatched = carrierFirstNameInput.trim().toLowerCase() === record.firstName.toLowerCase();
      const lastNameMatched = carrierLastNameInput.trim().toLowerCase() === record.lastName.toLowerCase();
      const zipMatched = carrierZipInput.trim() === record.billingZip;
      const recentSimSwap = record.simSwapAgeDays < 30;
      const score = 100 - (firstNameMatched ? 0 : 30) - (lastNameMatched ? 0 : 35) - (zipMatched ? 0 : 15) - (recentSimSwap ? 10 : 0) - (record.lineType === 'VoIP' ? 10 : 0);
      const overallStatus: CarrierStatus = score >= 80 ? 'MATCHED' : score >= 40 ? 'PARTIAL_MATCH' : 'MISMATCH';
      setCarrierResults({ record, firstNameMatched, lastNameMatched, zipMatched, recentSimSwap, score, overallStatus });
      setCarrierLookupStatus('completed');
    }, 900);
  };

  const handleRiskAnalysis = (event: React.FormEvent) => {
    event.preventDefault();
    setRiskAnalysisStatus('analyzing');
    setTimeout(() => {
      let score = 15;
      const details: string[] = [];
      if (riskFlags.voipLine) {
        score += 25;
        details.push(t.risk.details.voip);
      } else {
        details.push(t.risk.details.physical);
      }
      if (riskFlags.recentSimSwap) {
        score += 30;
        details.push(t.risk.details.sim);
      }
      if (riskFlags.disposableDomain) {
        score += 20;
        details.push(t.risk.details.disposable);
      }
      if (riskFlags.spamListed) {
        score += 10;
        details.push(t.risk.details.spam);
      }
      setRiskAnalysisResult({ score, rating: score >= 60 ? 'HIGH' : score >= 35 ? 'MEDIUM' : 'LOW', details });
      setRiskAnalysisStatus('completed');
    }, 900);
  };

  const carrierStatusText = (status: CarrierStatus) =>
    status === 'MATCHED' ? t.carrier.matched : status === 'PARTIAL_MATCH' ? t.carrier.partial : t.carrier.mismatch;

  const riskRatingText = (rating: string) =>
    rating === 'HIGH' ? t.risk.high : rating === 'MEDIUM' ? t.risk.medium : t.risk.safe;

  const tabIcons = [Phone, Mail, Database, ShieldAlert];
  const methodIcons = [Smartphone, Database, Mail, ShieldAlert];
  const signalIcons = [Smartphone, ShieldCheck, Settings];
  const articleImages = [
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600'
  ];

  return (
    <div id="phone-email-ownership-page" className="relative w-full overflow-hidden bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-12 sm:px-6 lg:px-8">
        <button onClick={onBackToLanding} className="group mb-8 flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4 transform transition-transform group-hover:-translate-x-1" />
          {t.back}
        </button>

        <section className="relative overflow-hidden rounded-3xl bg-emerald-500 text-white shadow-xl">
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-400 opacity-20 blur-3xl" />
          <div className="absolute left-1/3 top-0 h-64 w-64 rounded-full bg-teal-300 opacity-20 blur-2xl" />
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/50 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm border border-emerald-400/20 mb-6">
              <Phone className="h-4 w-4" />
              <span>{t.badge}</span>
            </div>
            <h1 className="max-w-4xl text-3xl font-normal leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">{t.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-emerald-50 leading-relaxed">{t.heroDesc}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={onOpenSandbox} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-emerald-700 shadow-md hover:bg-emerald-50 transition">
                {t.tryDemo}
                <ArrowRight className="h-4 w-4" />
              </button>

            </div>
            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
              {t.benefits.map((benefit: any) => (
                <div key={benefit.title} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-emerald-50 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-6 border-b border-slate-100 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600">
                <Sparkles className="h-3.5 w-3.5" />
                {t.playground.eyebrow}
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">{t.playground.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">{t.playground.desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              {t.playground.tabs.map((tab: any, index: number) => {
                const Icon = tabIcons[index];
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSandboxTab(tab.id)}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${sandboxTab === tab.id ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {sandboxTab === 'otp-sms' && (
                <Panel title={t.sms.title} icon={<Smartphone className="h-5 w-5" />}>
                  <form onSubmit={handleSendSms} className="space-y-4">
                    <Field label={t.sms.phoneLabel} value={smsPhoneInput} onChange={setSmsPhoneInput} />
                    <button className="w-full rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600 disabled:bg-slate-300" disabled={smsStatus === 'sending'}>
                      {smsStatus === 'sending' ? t.sms.sending : t.sms.send}
                    </button>
                  </form>
                  {smsStatus === 'sending' && <Loading title={t.sms.sending} desc={t.sms.sendingSub} />}
                  {smsStatus === 'otp-sent' && <Notice title={t.sms.sentTitle} desc={t.sms.sentDesc} />}
                  {smsStatus === 'otp-sent' || smsStatus === 'error' ? (
                    <form onSubmit={handleVerifySms} className="mt-4 space-y-4">
                      <Field label={t.sms.codeLabel} value={smsOtpCode} onChange={setSmsOtpCode} placeholder={sentSmsCode || '123456'} />
                      {smsStatus === 'error' && <p className="text-xs font-semibold text-red-500">{t.sms.error}</p>}
                      <button className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">{t.sms.verify}</button>
                    </form>
                  ) : null}
                  {smsStatus === 'verifying' && <Loading title={t.sms.verifying} desc={t.sms.sendingSub} />}
                  {smsStatus === 'verified' && <Success title={t.sms.successTitle} desc={`${t.sms.successDesc} ${SESSION_ID}.`} />}
                </Panel>
              )}

              {sandboxTab === 'otp-email' && (
                <Panel title={t.email.title} icon={<Mail className="h-5 w-5" />}>
                  <form onSubmit={handleSendEmail} className="space-y-4">
                    <Field label={t.email.emailLabel} value={emailInput} onChange={setEmailInput} />
                    <button className="w-full rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600 disabled:bg-slate-300" disabled={emailStatus === 'sending'}>
                      {emailStatus === 'sending' ? t.email.sending : t.email.send}
                    </button>
                  </form>
                  {emailStatus === 'sending' && <Loading title={t.email.sending} desc={t.email.sendingSub} />}
                  {emailStatus === 'otp-sent' && <Notice title={t.email.sentTitle} desc={t.email.sentDesc} />}
                  {emailStatus === 'otp-sent' || emailStatus === 'error' ? (
                    <form onSubmit={handleVerifyEmail} className="mt-4 space-y-4">
                      <Field label={t.email.codeLabel} value={emailOtpCode} onChange={setEmailOtpCode} placeholder={sentEmailCode || '123456'} />
                      {emailStatus === 'error' && <p className="text-xs font-semibold text-red-500">{t.email.error}</p>}
                      <button className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">{t.email.verify}</button>
                    </form>
                  ) : null}
                  {emailStatus === 'verifying' && <Loading title={t.email.verifying} desc={t.email.sendingSub} />}
                  {emailStatus === 'verified' && <Success title={t.email.successTitle} desc={`${t.email.successDescBefore} ${t.email.successRating}.`} />}
                </Panel>
              )}

              {sandboxTab === 'carrier-db' && (
                <Panel title={t.carrier.title} icon={<Database className="h-5 w-5" />}>
                  <form onSubmit={handleCarrierLookup} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label={t.carrier.phoneLabel} value={carrierPhoneInput} onChange={setCarrierPhoneInput} />
                    <Field label={t.carrier.zipLabel} value={carrierZipInput} onChange={setCarrierZipInput} />
                    <Field label={t.carrier.firstNameLabel} value={carrierFirstNameInput} onChange={setCarrierFirstNameInput} />
                    <Field label={t.carrier.lastNameLabel} value={carrierLastNameInput} onChange={setCarrierLastNameInput} />
                    <button className="sm:col-span-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600 disabled:bg-slate-300" disabled={carrierLookupStatus === 'searching'}>
                      {carrierLookupStatus === 'searching' ? t.carrier.searching : t.carrier.run}
                    </button>
                  </form>
                  <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
                    <span>{t.carrier.carriersLabel}</span>
                    <span className="ml-2 font-semibold text-slate-700">{t.carrier.carriers}</span>
                  </div>
                  {carrierLookupStatus === 'searching' && <Loading title={t.carrier.searching} desc={t.carrier.logsSearching} />}
                  {carrierResults && (
                    <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                      <p className="text-xs font-bold uppercase text-slate-400">{t.carrier.result}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xl font-bold">{carrierStatusText(carrierResults.overallStatus)}</span>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">{carrierResults.score}%</span>
                      </div>
                      <div className="mt-4 grid gap-3 text-sm">
                        <CheckRow label={t.carrier.firstNameMatch} ok={carrierResults.firstNameMatched} yes={t.carrier.yes} no={t.carrier.no} />
                        <CheckRow label={t.carrier.lastNameMatch} ok={carrierResults.lastNameMatched} yes={t.carrier.yes} no={t.carrier.no} />
                        <CheckRow label={t.carrier.zipMatch} ok={carrierResults.zipMatched} yes={t.carrier.yes} no={t.carrier.no} />
                        <CheckRow label={t.carrier.simSwap} ok={!carrierResults.recentSimSwap} yes={t.carrier.noRecentSwap} no={t.carrier.recentSwap} />
                      </div>
                    </div>
                  )}
                </Panel>
              )}

              {sandboxTab === 'risk-score' && (
                <Panel title={t.risk.title} icon={<ShieldAlert className="h-5 w-5" />}>
                  <form onSubmit={handleRiskAnalysis} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label={t.risk.phoneLabel} value={riskPhoneInput} onChange={setRiskPhoneInput} />
                      <Field label={t.risk.emailLabel} value={riskEmailInput} onChange={setRiskEmailInput} />
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {t.risk.flags.map((flag: any) => (
                        <button
                          type="button"
                          key={flag.key}
                          onClick={() => setRiskFlags((prev) => ({ ...prev, [flag.key]: !prev[flag.key as RiskFlagKey] }))}
                          className={`rounded-xl border p-4 text-left transition ${riskFlags[flag.key as RiskFlagKey] ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-slate-50'}`}
                        >
                          <span className="block text-sm font-semibold">{flag.title}</span>
                          <span className="mt-1 block text-xs text-slate-500">{flag.desc}</span>
                        </button>
                      ))}
                    </div>
                    <button className="w-full rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600 disabled:bg-slate-300" disabled={riskAnalysisStatus === 'analyzing'}>
                      {riskAnalysisStatus === 'analyzing' ? t.risk.analyzing : t.risk.run}
                    </button>
                  </form>
                  {riskAnalysisStatus === 'analyzing' && <Loading title={t.risk.analyzing} desc={t.risk.visualizerHint} />}
                  {riskAnalysisResult && (
                    <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                      <p className="text-xs font-bold uppercase text-slate-400">{t.risk.verdict}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xl font-bold">{riskRatingText(riskAnalysisResult.rating)}</span>
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">{riskAnalysisResult.score}/100</span>
                      </div>
                      <p className="mt-5 text-xs font-bold uppercase text-slate-400">{t.risk.breakdown}</p>
                      <div className="mt-3 space-y-3">
                        {riskAnalysisResult.details.map((detail: any) => (
                          <div key={detail.type} className="rounded-xl bg-slate-50 p-3">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold">{detail.type}</span>
                              <span className="text-[10px] font-bold text-slate-500">{detail.severity}</span>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">{detail.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Panel>
              )}
            </div>

            <div className="lg:col-span-5">
              <DevicePreview t={t} sandboxTab={sandboxTab} smsStatus={smsStatus} emailStatus={emailStatus} sentSmsCode={sentSmsCode} sentEmailCode={sentEmailCode} carrierResults={carrierResults} riskAnalysisResult={riskAnalysisResult} />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-xs font-mono text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span>{t.playground.endpoint}</span>
            <span className="text-emerald-400">{t.playground.response}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-white rounded-3xl my-16 shadow-sm border border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-medium tracking-tight text-slate-900">{t.how.title}</h2>
          <p className="mt-4 text-base text-slate-500">{t.how.desc}</p>
          <div className="mt-8 inline-flex items-center gap-1 sm:gap-2 bg-slate-50 p-1 rounded-full border border-slate-100">
            {t.how.tabs.map((tab: string, index: number) => (
              <button
                key={tab}
                onClick={() => setActiveStep((index + 1) as 1 | 2 | 3)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${activeStep === index + 1 ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg shadow-sm">{activeStep}</div>
            <h3 className="text-2xl font-bold text-slate-900">{t.how.steps[activeStep - 1].title}</h3>
            <p className="text-base text-slate-500 leading-relaxed">{t.how.steps[activeStep - 1].desc}</p>
            <div className="space-y-3 pt-2">
              {t.how.steps[activeStep - 1].bullets.map((bullet: string) => (
                <div key={bullet} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
          <HowMock t={t} activeStep={activeStep} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-left">
          <h2 className="text-3xl font-medium tracking-tight text-slate-900">{t.methods.title}</h2>
          <p className="mt-4 text-base text-slate-500 max-w-3xl leading-relaxed">{t.methods.desc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.methods.cards.map((method: any, index: number) => {
            const Icon = methodIcons[index];
            return (
              <button
                key={method.id}
                onClick={() => setActiveMethod(method.id)}
                className={`text-left p-8 rounded-2xl border transition-all ${activeMethod === method.id ? 'bg-white border-emerald-500 shadow-sm' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50 hover:border-slate-300'}`}
              >
                <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{method.title}</h3>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">{method.desc}</p>
                {activeMethod === method.id && (
                  <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                    <span>{t.methods.active}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <button onClick={onOpenSandbox} className="mt-8 inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline gap-1">
          {t.methods.learn}
          <ChevronRight className="h-4 w-4" />
        </button>
      </section>

      <section className="bg-slate-100/50 py-16 border-y border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-12">{t.signals.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.signals.cards.map((card: any, index: number) => {
              const Icon = signalIcons[index];
              return (
                <div key={card.title} className="bg-white p-8 rounded-2xl border border-slate-200/50 shadow-sm text-left">
                  <div className="h-12 w-12 rounded-xl bg-slate-50 text-emerald-600 flex items-center justify-center mb-6 border border-slate-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-10 text-left">{t.learning.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {t.learning.articles.map((article: any, index: number) => (
            <div key={article.title} className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl aspect-[1.6] bg-slate-200 relative mb-4">
                <img src={articleImages[index]} alt={article.alt} className="object-cover w-full h-full transform transition-transform group-hover:scale-[1.03]" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-slate-900/10" />
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-2">{article.meta}</span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">{article.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-10 text-left">{t.explore.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {t.explore.cards.map((card: any, index: number) => (
              <button key={card.title} onClick={() => onViewChange?.(index === 0 ? 'workflows' : 'database-checks')} className="group p-8 rounded-2xl bg-slate-800 border border-slate-700/60 hover:border-slate-600 transition-all cursor-pointer relative overflow-hidden text-left">
                <div className={`absolute right-0 bottom-0 h-48 w-48 rounded-full blur-3xl ${index === 0 ? 'bg-blue-500/10' : 'bg-emerald-500/10'}`} />
                <div className="relative z-10">
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${index === 0 ? 'text-blue-400' : 'text-emerald-400'}`}>{card.eyebrow}</span>
                  <h3 className="text-xl font-bold mt-2 mb-4">{card.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                  <div className={`mt-6 flex items-center gap-1.5 text-xs font-semibold ${index === 0 ? 'text-blue-400 group-hover:text-blue-300' : 'text-emerald-400 group-hover:text-emerald-300'}`}>
                    <span>{card.cta}</span>
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-indigo-500 text-white overflow-hidden py-16 sm:py-20 md:py-24">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-400 opacity-30 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-purple-400 opacity-20 blur-2xl" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">{t.finalCta.title}</h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-indigo-100 leading-relaxed">{t.finalCta.desc}</p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button onClick={onOpenSandbox} className="rounded-full bg-white px-6 py-3.5 text-sm sm:text-base font-medium text-indigo-600 shadow-md hover:bg-slate-50 transition-all">{t.finalCta.primary}</button>

          </div>
        </div>
      </section>
    </div>
  );
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">{icon}</div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-400">{label}</span>
      <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100" />
    </label>
  );
}

function Loading({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mt-4 rounded-xl border border-emerald-100 bg-white p-4">
      <div className="flex items-center gap-3">
        <RefreshCw className="h-4 w-4 animate-spin text-emerald-500" />
        <div>
          <p className="text-sm font-semibold text-slate-800">{title}</p>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Notice({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
      <p className="text-sm font-semibold text-emerald-800">{title}</p>
      <p className="mt-1 text-xs text-emerald-700">{desc}</p>
    </div>
  );
}

function Success({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mt-4 rounded-xl border border-emerald-100 bg-white p-5 text-center">
      <CheckCircle className="mx-auto h-10 w-10 text-emerald-500" />
      <p className="mt-3 text-xl font-bold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{desc}</p>
    </div>
  );
}

function CheckRow({ label, ok, yes, no }: { label: string; ok: boolean; yes: string; no: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className={`text-xs font-bold ${ok ? 'text-emerald-600' : 'text-red-500'}`}>{ok ? yes : no}</span>
    </div>
  );
}

function DevicePreview({ t, sandboxTab, smsStatus, emailStatus, sentSmsCode, sentEmailCode, carrierResults, riskAnalysisResult }: any) {
  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-4 text-slate-200 shadow-2xl">
      <div className="mx-auto max-w-sm rounded-[1.75rem] border border-slate-800 bg-slate-900 p-4">
        <div className="mb-4 flex items-center justify-between text-[10px] text-slate-400">
          <span>{t.playground.network}</span>
          <span>{sandboxTab}</span>
        </div>
        {sandboxTab === 'otp-sms' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-800 p-4">
              <p className="text-[11px] font-bold text-slate-200">{t.sms.previewLabel}</p>
              <p className="text-[9px] text-emerald-400">{t.sms.previewStatus}</p>
            </div>
            <div className="rounded-2xl bg-emerald-500 p-4 text-white">
              <p className="text-xs font-bold">{t.sms.notificationTitle}</p>
              <p className="mt-2 text-sm">{smsStatus === 'otp-sent' || smsStatus === 'verified' ? t.sms.notificationBody.replace('{code}', sentSmsCode || '123456') : t.sms.previewWaiting}</p>
            </div>
            <p className="text-xs text-slate-500">{t.sms.previewTyping}</p>
          </div>
        )}
        {sandboxTab === 'otp-email' && (
          <div className="space-y-4">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">{t.email.secureClient}</span>
            <div className="rounded-2xl bg-slate-800 p-4">
              <p className="text-[11px] text-slate-400">{emailStatus === 'sending' ? t.email.synthesizing : t.email.waiting}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 text-slate-900">
              <span className="block text-[11px] font-bold">{t.email.sender}</span>
              <span className="text-[10px] text-slate-500">{t.email.subject}</span>
              <p className="mt-3 text-2xl font-black tracking-widest">{sentEmailCode || '123456'}</p>
            </div>
          </div>
        )}
        {sandboxTab === 'carrier-db' && (
          <div className="space-y-4">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">{t.carrier.logsEyebrow}</span>
            <h4 className="text-xs font-black text-white">{t.carrier.logsTitle}</h4>
            <div className="space-y-2 rounded-2xl bg-slate-950 p-4 text-xs font-mono">
              <p className="text-slate-500">{carrierResults ? t.carrier.logsDetails : t.carrier.logsIdle}</p>
              <p className="text-amber-400">{t.carrier.logsSearching}</p>
              {carrierResults && <p className="text-emerald-500">{t.carrier.logsDone}</p>}
            </div>
            <div className="rounded-xl border border-slate-800 p-3 text-xs text-slate-400">{t.carrier.registryLink}</div>
          </div>
        )}
        {sandboxTab === 'risk-score' && (
          <div className="space-y-4">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">{t.risk.visualizer}</span>
            <p className="text-[10px] text-slate-400">{t.risk.visualizerHint}</p>
            <div className="rounded-2xl bg-slate-800 p-5">
              <span className="block text-[9px] uppercase text-slate-400">{t.risk.target}</span>
              <p className="mt-2 text-4xl font-black text-white">{riskAnalysisResult?.score || 0}</p>
              <p className="text-xs text-emerald-400">{riskAnalysisResult ? t.risk.threatIndex : t.risk.analyzing}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HowMock({ t, activeStep }: { t: any; activeStep: 1 | 2 | 3 }) {
  return (
    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex justify-center items-center min-h-[340px] relative overflow-hidden">
      {activeStep === 1 && (
        <div className="w-full max-w-sm bg-white rounded-xl shadow-md border border-slate-200/60 p-6 space-y-4">
          <span className="text-[10px] uppercase font-bold text-emerald-600">{t.how.mock.step1}</span>
          <h4 className="text-sm font-bold text-slate-800">{t.how.mock.prompt}</h4>
          <label className="block text-[10px] font-bold text-slate-400 uppercase">{t.how.mock.mobile}</label>
          <div className="border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 bg-slate-50">{SAMPLE_PHONE}</div>
          <div className="h-9 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-xs font-semibold">{t.how.mock.continue}</div>
        </div>
      )}
      {activeStep === 2 && (
        <div className="w-full max-w-xs bg-slate-900 text-slate-200 rounded-2xl shadow-lg border border-slate-800 p-5 space-y-3 text-left">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[10px] font-bold text-emerald-400">{t.how.mock.rail}</span>
            <span className="text-[9px] text-slate-500">{t.how.mock.railName}</span>
          </div>
          <p className="text-xs text-slate-300 leading-normal">{t.how.mock.routing} <strong className="text-white">{SAMPLE_PHONE}</strong>.</p>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 w-2/3 rounded-full animate-pulse" />
          </div>
          <p className="text-[9px] text-slate-500 italic">{t.how.mock.dispatchTime}</p>
        </div>
      )}
      {activeStep === 3 && (
        <div className="w-full max-w-sm bg-white rounded-xl shadow-md border border-slate-200/60 p-6 space-y-4 text-center">
          <div className="h-12 w-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Check className="h-6 w-6 stroke-[3]" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">{t.how.mock.ownership}</h4>
          <p className="text-xs text-slate-400 leading-relaxed">{t.how.mock.ownershipDesc}</p>
          <div className="border border-emerald-100 bg-emerald-50/50 p-2.5 rounded text-[11px] font-mono text-emerald-800 text-left">{t.how.mock.status}</div>
        </div>
      )}
    </div>
  );
}
