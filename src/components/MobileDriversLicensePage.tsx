/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Smartphone,
  ShieldCheck,
  Check,
  Lock,
  RefreshCw,
  Sparkles,
  UserCheck,
  SmartphoneCharging,
  Sliders,
  IdCard,
  BookOpen,
  WalletCards
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { MOBILE_DRIVERS_LICENSE_PAGE_TRANSLATIONS } from '../translations/MobileDriversLicensePageTranslations';

interface MobileDriversLicensePageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

export default function MobileDriversLicensePage({ onOpenSandbox, onBackToLanding, onViewChange }: MobileDriversLicensePageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(MOBILE_DRIVERS_LICENSE_PAGE_TRANSLATIONS, language as keyof typeof MOBILE_DRIVERS_LICENSE_PAGE_TRANSLATIONS, 'MOBILE_DRIVERS_LICENSE_PAGE_TRANSLATIONS');

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [activeAccordion, setActiveAccordion] = useState<string>('encryption');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [allowMdlToggle, setAllowMdlToggle] = useState(true);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptionComplete, setDecryptionComplete] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'checking' | 'passed'>('idle');

  const stepOne = t.steps[0];
  const stepTwo = t.steps[1];
  const stepThree = t.steps[2];
  const statusIsPassed = verificationStatus === 'passed';

  const handleDecrypt = () => {
    setIsDecrypting(true);
    setTimeout(() => {
      setIsDecrypting(false);
      setDecryptionComplete(true);
    }, 1200);
  };

  const handleVerify = () => {
    setVerificationStatus('checking');
    setTimeout(() => {
      setVerificationStatus('passed');
    }, 1500);
  };

  const phoneOptions = [
    { label: t.phoneMockup.driversLicense, Icon: IdCard },
    { label: t.phoneMockup.passport, Icon: BookOpen }
  ];

  const teamCardIcons = [Sliders, UserCheck, RefreshCw];
  const teamCardStyles = [
    'bg-emerald-50 text-emerald-700',
    'bg-blue-50 text-blue-700',
    'bg-purple-50 text-purple-700'
  ];

  const resourceIcons = [Smartphone, ShieldCheck, Sliders];
  const resourceStyles = [
    {
      wrapper: 'bg-emerald-50',
      overlay: 'bg-[#1cb080]/10 group-hover:bg-[#1cb080]/5',
      icon: 'text-[#1cb080]/40'
    },
    {
      wrapper: 'bg-indigo-50',
      overlay: 'bg-[#354CE1]/10 group-hover:bg-[#354CE1]/5',
      icon: 'text-[#354CE1]/40'
    },
    {
      wrapper: 'bg-purple-50',
      overlay: 'bg-purple-100 group-hover:bg-purple-50',
      icon: 'text-purple-400/60'
    }
  ];

  const exploreTargets = ['government-id', 'database-checks'] as const;
  const exploreStyles = ['bg-emerald-600', 'bg-indigo-600'];

  return (
    <div className="bg-[#FAFBFD] min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#354CE1] transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t.backToHome}
        </button>
      </div>

      <div className="max-w-7xl mx-auto mb-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1cb080] to-[#128a62] rounded-[2.5rem] p-8 md:p-16 text-white shadow-xl flex flex-col justify-between min-h-[520px]">
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[320px] h-[320px] bg-emerald-400/20 rounded-full blur-2xl translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 flex items-center gap-2 mb-8 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/10 text-xs font-semibold tracking-wide">
            <Smartphone className="w-4 h-4 text-emerald-100" />
            <span>{t.badge}</span>
          </div>

          <div className="relative z-10 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.15]">
              {t.heroTitle}
            </h1>
            <div className="mt-8 mb-10">
              <button
                onClick={onOpenSandbox}
                className="bg-white hover:bg-emerald-50 text-slate-950 font-bold px-8 py-4 rounded-full shadow-lg transition flex items-center gap-2 group text-sm"
              >
                {t.tryDemo}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/20">
            {t.pillars.map((pillar) => (
              <div key={pillar.title} className="space-y-2">
                <h3 className="font-bold text-sm text-white">{pillar.title}</h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto mb-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider">{t.simulatorLabel}</span>
            <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight mt-1">{t.howItWorksTitle}</h2>
          </div>

          <div className="flex items-center gap-1 md:gap-4 mt-4 md:mt-0 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {t.steps.map((step, index) => {
              const stepNumber = (index + 1) as 1 | 2 | 3;
              return (
                <button
                  key={step.label}
                  onClick={() => setActiveStep(stepNumber)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    activeStep === stepNumber
                      ? 'bg-white text-[#354CE1] shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] ${
                    activeStep === stepNumber ? 'bg-[#354CE1] text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {stepNumber}
                  </span>
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 rounded-[2.5rem] p-8 md:p-12 border border-emerald-100 shadow-xs">
          {activeStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold">{stepOne.badge}</span>
                <h3 className="text-3xl font-display font-bold text-slate-900 leading-tight">
                  {stepOne.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {stepOne.desc}
                </p>

                <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Sliders className="w-5 h-5 text-emerald-600" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{t.setupControl.title}</h4>
                        <p className="text-[10px] text-slate-500">{t.setupControl.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setAllowMdlToggle(!allowMdlToggle)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        allowMdlToggle ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        allowMdlToggle ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative w-full max-w-[340px] bg-slate-950 rounded-[3rem] p-3.5 shadow-2xl border-[5px] border-slate-800 ring-4 ring-slate-900/10">
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-slate-900 rounded-full mr-2" />
                    <div className="w-1 h-1 bg-slate-900 rounded-full" />
                  </div>

                  <div className="bg-slate-50 rounded-[2.3rem] min-h-[460px] p-6 pt-10 overflow-hidden flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                        <span>{t.phoneMockup.appName}</span>
                        <span>{t.phoneMockup.time}</span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-sm">{t.phoneMockup.title}</h4>
                        <p className="text-[10px] text-slate-500">{t.phoneMockup.desc}</p>
                      </div>

                      <div className="space-y-2">
                        {phoneOptions.map(({ label, Icon }) => (
                          <div key={label} className="bg-white p-3 rounded-xl border border-slate-150 flex items-center justify-between text-xs font-semibold text-slate-800 shadow-2xs">
                            <span className="flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5 text-slate-400" />
                              {label}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                        ))}

                        {allowMdlToggle && (
                          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-800 shadow-sm animate-fade-in">
                            <span className="flex items-center gap-2">
                              <WalletCards className="w-3.5 h-3.5 text-emerald-600" />
                              {t.phoneMockup.mobileDriversLicense}
                            </span>
                            <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded-md font-mono">{t.phoneMockup.wallet}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button className="w-full bg-[#354CE1] hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition">
                      {t.phoneMockup.continue}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold">{stepTwo.badge}</span>
                <h3 className="text-3xl font-display font-bold text-slate-900 leading-tight">
                  {stepTwo.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {stepTwo.desc}
                </p>

                <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{t.decrypt.title}</h4>
                      <p className="text-[10px] text-slate-500">{t.decrypt.desc}</p>
                    </div>
                    <button
                      onClick={handleDecrypt}
                      disabled={isDecrypting || decryptionComplete}
                      className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition flex items-center gap-2"
                    >
                      {isDecrypting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          {t.decrypt.decrypting}
                        </>
                      ) : decryptionComplete ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          {t.decrypt.decrypted}
                        </>
                      ) : (
                        t.decrypt.run
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 font-mono text-xs text-slate-300 shadow-2xl h-[340px] flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-3 text-[10px] text-slate-500 font-sans">
                  <span>{t.decrypt.handshake}</span>
                  <span className="text-emerald-500">{t.decrypt.terminal}</span>
                </div>

                {!decryptionComplete && !isDecrypting && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
                    <Lock className="w-8 h-8 text-slate-600" />
                    <p className="text-slate-500 text-xs">{t.decrypt.encryptedReceived}</p>
                    <code className="text-[10px] bg-slate-950 p-2 rounded text-slate-600 w-full truncate font-mono">
                      {t.decrypt.encryptedSample}
                    </code>
                  </div>
                )}

                {isDecrypting && (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                    <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
                    <p className="text-emerald-500 animate-pulse text-[11px]">{t.decrypt.exchanging}</p>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full animate-[progress_1.2s_ease-in-out_infinite]" style={{ width: '40%' }} />
                    </div>
                  </div>
                )}

                {decryptionComplete && (
                  <div className="flex-1 flex flex-col justify-between overflow-auto scrollbar-thin text-[11px] space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-sans font-bold">
                      <Check className="w-4 h-4" />
                      {t.decrypt.success}
                    </div>
                    <pre className="text-emerald-500 bg-slate-950 p-3 rounded-lg overflow-x-auto text-[10px] leading-relaxed">
                      {t.decrypt.decryptedPayload}
                    </pre>
                  </div>
                )}

                <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-500 font-sans flex justify-between">
                  <span>{t.decrypt.shaVerified}</span>
                  <span>{t.decrypt.aes}</span>
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold">{stepThree.badge}</span>
                <h3 className="text-3xl font-display font-bold text-slate-900 leading-tight">
                  {stepThree.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {stepThree.desc}
                </p>

                <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{t.verify.title}</h4>
                      <p className="text-[10px] text-slate-500">{t.verify.desc}</p>
                    </div>
                    <button
                      onClick={handleVerify}
                      disabled={verificationStatus === 'checking' || statusIsPassed}
                      className="bg-[#354CE1] hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition flex items-center gap-2"
                    >
                      {verificationStatus === 'checking' ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          {t.verify.checking}
                        </>
                      ) : statusIsPassed ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          {t.verify.passed}
                        </>
                      ) : (
                        t.verify.run
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xl space-y-4">
                <h4 className="font-bold text-slate-950 text-sm border-b border-slate-100 pb-3">{t.verify.reportTitle}</h4>

                <div className="space-y-3">
                  {t.verify.rows.map((row, index) => {
                    const RowIcon = [ShieldCheck, UserCheck, SmartphoneCharging][index];
                    return (
                      <div key={row.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <RowIcon className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-slate-900">{row.label}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          statusIsPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {statusIsPassed ? row.passed : t.verify.pending}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {statusIsPassed && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2.5 text-emerald-800 text-[11px] leading-relaxed animate-fade-in">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">{t.verify.verdictTitle}</span> {t.verify.verdictDesc}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider">{t.keyFeatures.label}</span>
            <h2 className="text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              {t.keyFeatures.title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t.keyFeatures.desc}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {t.accordions.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === item.id ? '' : item.id)}
                  className="w-full text-left p-6 flex items-center justify-between text-slate-900 font-bold hover:text-[#354CE1] transition gap-4 text-sm md:text-base"
                >
                  <span>{item.title}</span>
                  <span className="text-lg font-mono text-slate-400 shrink-0">
                    {activeAccordion === item.id ? '-' : '+'}
                  </span>
                </button>

                {activeAccordion === item.id && (
                  <div className="px-6 pb-6 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-4 animate-fade-in">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto mb-24">
        <h2 className="text-2xl font-display font-bold text-slate-950 text-center mb-12 tracking-tight">
          {t.teamUseTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.teamUseCards.map((card, index) => {
            const CardIcon = teamCardIcons[index];
            return (
              <div key={card.title} className="bg-white rounded-3xl p-8 border border-slate-150/80 shadow-2xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className={`${teamCardStyles[index]} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                    <CardIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{card.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto mb-24">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-slate-950 tracking-tight">{t.learningTitle}</h3>
          <button className="text-xs font-bold text-[#354CE1] hover:underline flex items-center gap-1 group">
            {t.viewAllResources}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.resources.map((resource, index) => {
            const ResourceIcon = resourceIcons[index];
            const style = resourceStyles[index];
            return (
              <div key={resource.title} className="bg-white rounded-3xl border border-slate-150/80 shadow-xs overflow-hidden group hover:shadow-md transition">
                <div className={`aspect-video ${style.wrapper} relative overflow-hidden flex items-center justify-center`}>
                  <div className={`absolute inset-0 ${style.overlay} transition`} />
                  <ResourceIcon className={`w-12 h-12 ${style.icon}`} />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{resource.meta}</span>
                  <h4 className="font-bold text-slate-900 group-hover:text-[#354CE1] transition text-sm">
                    {resource.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {resource.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto mb-24">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8">
          {t.exploreTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.exploreCards.map((card, index) => (
            <button
              key={card.title}
              onClick={() => { if (onViewChange) onViewChange(exploreTargets[index]); }}
              className={`group text-left relative overflow-hidden ${exploreStyles[index]} rounded-[2rem] p-8 text-white shadow-md hover:shadow-lg transition duration-200 flex flex-col justify-between min-h-[160px]`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl translate-x-1/4 -translate-y-1/4" />
              <h4 className="text-2xl font-bold leading-tight max-w-sm relative z-10">
                {card.title}
              </h4>
              <div className="flex items-center gap-2 text-xs font-semibold mt-4 group-hover:translate-x-1 transition-transform">
                <span>{card.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto mb-24 bg-white rounded-3xl p-8 border border-slate-150/80 shadow-xs">
        <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight text-center">{t.faqTitle}</h3>
        <div className="space-y-4">
          {t.faqs.map((faq, index) => (
            <div key={faq.q} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full text-left py-2 flex items-center justify-between text-slate-900 font-semibold text-sm hover:text-[#354CE1] transition"
              >
                <span>{faq.q}</span>
                <span className="text-xs text-slate-400 font-mono ml-4 shrink-0">{activeFaq === index ? '-' : '+'}</span>
              </button>
              {activeFaq === index && (
                <p className="text-xs text-slate-500 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl animate-fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto mb-16">
        <div className="bg-[#5B6DFF] rounded-[2.5rem] p-8 md:p-12 text-white text-center flex flex-col items-center justify-center space-y-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight relative z-10 max-w-xl">
            {t.cta.title}
          </h2>
          <p className="text-sm md:text-base text-indigo-100 relative z-10 max-w-md">
            {t.cta.desc}
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <button
              onClick={onOpenSandbox}
              className="bg-white hover:bg-indigo-50 text-[#5B6DFF] font-bold px-8 py-3 rounded-full shadow-md transition text-xs"
            >
              {t.cta.primary}
            </button>
            <button
              onClick={onOpenSandbox}
              className="border border-white hover:bg-white/10 text-white font-bold px-8 py-3 rounded-full transition text-xs"
            >
              {t.cta.secondary}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
