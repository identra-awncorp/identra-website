/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  AlertTriangle,
  ShieldCheck,
  Database,
  Search,
  ArrowLeft,
  Users,
  Globe,
  CheckCircle,
  Sliders,
  ChevronRight,
  RefreshCw,
  FileText,
  Landmark,
  User,
  HelpCircle,
  Building
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { DATABASE_CHECKS_TRANSLATIONS } from '../translations/DatabaseChecksPageTranslations';

interface DatabaseChecksPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

interface DBRecord {
  firstName: string;
  lastName: string;
  dob: string;
  ssnTail: string;
  state: string;
  zip: string;
  tin: string;
}

type DbSource = 'AAMVA' | 'eCBSV' | 'IRS_TIN' | 'GLOBAL';
type MatchStatus = 'MATCH' | 'MISMATCH';
type OverallStatus = 'VERIFIED' | 'REJECTED' | 'REVIEW_REQUIRED';
type SummaryKey = 'notFound' | 'passed' | 'review';

interface SimDetail {
  fieldKey: string;
  status: MatchStatus;
  value: string;
  expected: string;
}

interface SimResults {
  overallStatus: OverallStatus;
  matchScore: number;
  color: string;
  details: SimDetail[];
  summaryKey: SummaryKey;
}

const SIMULATED_GOVERNMENT_RECORDS: DBRecord[] = [
  {
    firstName: 'Alex',
    lastName: 'Rivera',
    dob: '1988-11-23',
    ssnTail: '4321',
    state: 'CA',
    zip: '94103',
    tin: '12-3456789'
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    dob: '1992-05-14',
    ssnTail: '9876',
    state: 'NY',
    zip: '10001',
    tin: '98-7654321'
  }
];

const SOURCE_OPTIONS: DbSource[] = ['AAMVA', 'eCBSV', 'IRS_TIN', 'GLOBAL'];

const formatText = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));

export default function DatabaseChecksPage({ onOpenSandbox, onBackToLanding, onViewChange }: DatabaseChecksPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(DATABASE_CHECKS_TRANSLATIONS, language as keyof typeof DATABASE_CHECKS_TRANSLATIONS, 'DATABASE_CHECKS_TRANSLATIONS');

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [activeAccordion, setActiveAccordion] = useState<string>('geo');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [inputFirstName, setInputFirstName] = useState('Alex');
  const [inputLastName, setInputLastName] = useState('Rivera');
  const [inputDob, setInputDob] = useState('1988-11-23');
  const [inputSsn, setInputSsn] = useState('4321');
  const [inputState, setInputState] = useState('CA');
  const [inputZip, setInputZip] = useState('94103');
  const [inputTin, setInputTin] = useState('12-3456789');

  const [selectedDbSource, setSelectedDbSource] = useState<DbSource>('AAMVA');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [simResults, setSimResults] = useState<SimResults | null>(null);

  const activeStepCopy = t.steps[activeStep - 1];
  const StepIcon = [FileText, Search, Sliders][activeStep - 1];
  const dbIcons = [Database, Building, Landmark, FileText, Globe];
  const useCaseIcons = [ShieldCheck, Users, Sliders];
  const learningIcons = [Database, Landmark, Sliders];

  const runDatabaseCheck = () => {
    setIsSimulating(true);
    setSimulationComplete(false);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);

      const targetRecord = SIMULATED_GOVERNMENT_RECORDS.find(
        record => record.lastName.toLowerCase() === inputLastName.trim().toLowerCase()
      );

      if (!targetRecord) {
        setSimResults({
          overallStatus: 'REJECTED',
          matchScore: 15,
          color: 'text-red-600 bg-red-50 border-red-100',
          details: [
            { fieldKey: 'firstName', status: 'MISMATCH', value: inputFirstName, expected: t.sandbox.unknown },
            { fieldKey: 'lastName', status: 'MISMATCH', value: inputLastName, expected: t.sandbox.unknown },
            { fieldKey: 'dobShort', status: 'MISMATCH', value: inputDob, expected: t.sandbox.unknown },
            { fieldKey: 'ssnEcbs', status: 'MISMATCH', value: inputSsn, expected: t.sandbox.unknown }
          ],
          summaryKey: 'notFound'
        });
        return;
      }

      const isFirstMatch = targetRecord.firstName.toLowerCase() === inputFirstName.trim().toLowerCase();
      const isDobMatch = targetRecord.dob === inputDob;
      const isSsnMatch = targetRecord.ssnTail === inputSsn.trim();
      const isStateMatch = targetRecord.state === inputState;
      const isZipMatch = targetRecord.zip === inputZip.trim();
      const isTinMatch = targetRecord.tin === inputTin.trim();

      const details: SimDetail[] = [];
      let matchCount = 0;
      let totalCount = 4;

      details.push({
        fieldKey: 'firstName',
        status: isFirstMatch ? 'MATCH' : 'MISMATCH',
        value: inputFirstName,
        expected: targetRecord.firstName
      });
      if (isFirstMatch) matchCount++;

      details.push({
        fieldKey: 'lastName',
        status: 'MATCH',
        value: inputLastName,
        expected: targetRecord.lastName
      });
      matchCount++;

      details.push({
        fieldKey: 'dob',
        status: isDobMatch ? 'MATCH' : 'MISMATCH',
        value: inputDob,
        expected: targetRecord.dob
      });
      if (isDobMatch) matchCount++;

      if (selectedDbSource === 'AAMVA') {
        totalCount += 2;
        details.push({
          fieldKey: 'stateDmv',
          status: isStateMatch ? 'MATCH' : 'MISMATCH',
          value: inputState,
          expected: targetRecord.state
        });
        if (isStateMatch) matchCount++;

        details.push({
          fieldKey: 'zip',
          status: isZipMatch ? 'MATCH' : 'MISMATCH',
          value: inputZip,
          expected: targetRecord.zip
        });
        if (isZipMatch) matchCount++;
      } else if (selectedDbSource === 'eCBSV') {
        totalCount += 1;
        details.push({
          fieldKey: 'ssaSsn',
          status: isSsnMatch ? 'MATCH' : 'MISMATCH',
          value: `***-**-${inputSsn}`,
          expected: `***-**-${targetRecord.ssnTail}`
        });
        if (isSsnMatch) matchCount++;
      } else if (selectedDbSource === 'IRS_TIN') {
        totalCount += 1;
        details.push({
          fieldKey: 'irsTin',
          status: isTinMatch ? 'MATCH' : 'MISMATCH',
          value: inputTin,
          expected: targetRecord.tin
        });
        if (isTinMatch) matchCount++;
      } else {
        totalCount += 1;
        details.push({
          fieldKey: 'globalRegistry',
          status: isZipMatch ? 'MATCH' : 'MISMATCH',
          value: inputZip,
          expected: targetRecord.zip
        });
        if (isZipMatch) matchCount++;
      }

      const score = Math.round((matchCount / totalCount) * 100);
      const passed = score >= 80;

      setSimResults({
        overallStatus: passed ? 'VERIFIED' : 'REVIEW_REQUIRED',
        matchScore: score,
        color: passed ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 'text-amber-700 bg-amber-50 border-amber-100',
        details,
        summaryKey: passed ? 'passed' : 'review'
      });
    }, 1200);
  };

  const loadPreset = (presetName: 'alex' | 'jane' | 'fraudster') => {
    if (presetName === 'alex') {
      setInputFirstName('Alex');
      setInputLastName('Rivera');
      setInputDob('1988-11-23');
      setInputSsn('4321');
      setInputState('CA');
      setInputZip('94103');
      setInputTin('12-3456789');
    } else if (presetName === 'jane') {
      setInputFirstName('Jane');
      setInputLastName('Doe');
      setInputDob('1992-05-14');
      setInputSsn('9876');
      setInputState('NY');
      setInputZip('10001');
      setInputTin('98-7654321');
    } else {
      setInputFirstName('Alex');
      setInputLastName('Rivera');
      setInputDob('1990-01-01');
      setInputSsn('0000');
      setInputState('TX');
      setInputZip('77001');
      setInputTin('00-0000000');
    }
    setSimulationComplete(false);
  };

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
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1cb080] to-[#128a62] rounded-[2.5rem] p-8 md:p-16 text-white shadow-xl flex flex-col justify-between min-h-[480px]">
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[320px] h-[320px] bg-emerald-400/20 rounded-full blur-2xl translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 flex items-center gap-2 mb-8 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/10 text-xs font-semibold tracking-wide">
            <Database className="w-4 h-4 text-emerald-100" />
            <span>{t.heroBadge}</span>
          </div>

          <div className="relative z-10 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-emerald-50/95 font-light mb-8 max-w-3xl leading-relaxed">
              {t.heroDesc}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenSandbox}
              className="bg-white hover:bg-emerald-50 text-slate-950 font-bold px-8 py-4 rounded-full shadow-lg transition flex items-center gap-2 group text-sm animate-fade-in"
            >
              {t.tryDemo}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#sandbox"
              className="text-white hover:text-emerald-100 font-semibold text-sm transition underline underline-offset-4 decoration-2"
            >
              {t.trySandbox}
            </a>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 mt-12 border-t border-white/10">
            {t.pillars.map((pillar: any) => (
              <div key={pillar.title}>
                <h3 className="font-bold text-base mb-1.5 text-white">{pillar.title}</h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto mb-24 bg-white rounded-[3rem] border border-slate-150/80 shadow-xs overflow-hidden">
        <div className="p-8 md:p-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-[#354CE1] font-semibold text-xs uppercase tracking-wider block mb-2">{t.workflowBadge}</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">{t.workflowTitle}</h2>
            </div>
            <div className="flex items-center gap-6 border-b border-slate-100 pb-2">
              {[1, 2, 3].map((step) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(step as 1 | 2 | 3)}
                  className={`text-xs font-mono font-bold tracking-wider transition ${activeStep === step ? 'text-[#354CE1] border-b-2 border-[#354CE1] pb-2' : 'text-slate-400'}`}
                >
                  {t.stepTabs[step - 1]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                <div className="bg-[#354CE1]/5 w-12 h-12 rounded-2xl flex items-center justify-center text-[#354CE1]">
                  <StepIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 leading-snug">{activeStepCopy.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{activeStepCopy.desc}</p>
                <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                  {activeStepCopy.bullets.map((bullet: string) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => setActiveStep(prev => (prev === 3 ? 1 : prev + 1) as 1 | 2 | 3)}
                  className="bg-[#354CE1] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-[#354CE1]/90 transition flex items-center gap-2"
                >
                  <span>{t.nextStep}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#1cb080]/10 border border-[#1cb080]/20 rounded-[2rem] p-6 md:p-12 flex items-center justify-center min-h-[360px] relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl" />
              <div className="relative bg-white w-full max-w-[300px] rounded-[2.2rem] border-[6px] border-slate-900 shadow-xl overflow-hidden font-sans">
                <div className="h-4 bg-slate-900 flex justify-center items-center">
                  <div className="w-16 h-3 bg-slate-950 rounded-b-md" />
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">{t.phone.verifying}</span>
                    <span className="text-[9px] bg-emerald-50 text-emerald-600 font-mono font-bold px-1.5 py-0.5 rounded">{t.phone.api}</span>
                  </div>

                  {activeStep === 1 && (
                    <div className="space-y-3 animate-fade-in">
                      {[
                        [t.phone.firstName, 'Alex'],
                        [t.phone.lastName, 'Rivera'],
                        [t.phone.dob, '11 / 23 / 1988']
                      ].map(([label, value]) => (
                        <div key={label} className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase">{label}</label>
                          <div className="p-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 bg-slate-50">{value}</div>
                        </div>
                      ))}
                      <div className="p-2 bg-[#354CE1]/5 border border-[#354CE1]/15 rounded-xl text-[10px] text-[#354CE1] font-semibold text-center">
                        {t.phone.extractionSuccess}
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <Landmark className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-700">{t.phone.registryTitle}</p>
                          <p className="text-[9px] text-slate-400">{t.phone.registryDesc}</p>
                        </div>
                      </div>

                      {[
                        [t.phone.checkingSsn, t.phone.match100],
                        [t.phone.addressAlignment, t.phone.matched]
                      ].map(([label, value]) => (
                        <div key={label} className="space-y-2">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-slate-400 font-medium">{label}</span>
                            <span className="text-emerald-500 font-bold">{value}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[100%]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="space-y-3 text-center py-4 animate-fade-in">
                      <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-[#1cb080] mx-auto mb-2">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{t.phone.verifiedTitle}</h4>
                      <p className="text-[9px] text-slate-400 px-2 leading-relaxed">{t.phone.verifiedDesc}</p>
                      <div className="pt-2">
                        <span className="bg-emerald-500 text-white font-bold text-[9px] px-4 py-1.5 rounded-full shadow-sm">
                          {t.phone.proceed}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-6 bg-slate-900 flex justify-center items-center">
                  <div className="w-24 h-1 bg-slate-700 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#354CE1] font-semibold text-xs uppercase tracking-wider block mb-2">{t.libraryBadge}</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">{t.libraryTitle}</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">{t.libraryDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.dbCards.map((card: any, index: number) => {
            const Icon = dbIcons[index];
            return (
              <div key={card.title} className="bg-white p-8 rounded-3xl border border-slate-150/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#1cb080] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{card.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{card.desc}</p>
                  {card.note && (
                    <p className="text-[9px] text-slate-400 bg-slate-50 p-2 rounded-lg leading-normal mb-6">{card.note}</p>
                  )}
                </div>
                <div className="border-t border-slate-100 pt-4 text-[10px] font-mono text-[#354CE1] font-bold">
                  {card.footer}
                </div>
              </div>
            );
          })}

          <div className="bg-slate-50 p-8 rounded-3xl border border-dashed border-slate-300 flex flex-col justify-between text-center">
            <div className="my-auto py-4">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t.otherDatabasesTitle}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4 max-w-xs mx-auto">{t.otherDatabasesDesc}</p>
              <button onClick={onOpenSandbox} className="text-xs font-bold text-[#354CE1] hover:underline">
                {t.connectTeam}
                <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="sandbox" className="max-w-7xl mx-auto mb-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#354CE1] font-semibold text-xs uppercase tracking-wider block mb-2">{t.sandbox.badge}</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">{t.sandbox.title}</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">{t.sandbox.desc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-150/80 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#354CE1]" />
                  {t.sandbox.formTitle}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => loadPreset('alex')} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md font-bold transition">
                    {t.sandbox.presets.alex}
                  </button>
                  <button onClick={() => loadPreset('jane')} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md font-bold transition">
                    {t.sandbox.presets.jane}
                  </button>
                  <button onClick={() => loadPreset('fraudster')} className="text-[10px] bg-red-50 hover:bg-red-100 text-red-700 px-2.5 py-1 rounded-md font-bold transition">
                    {t.sandbox.presets.partial}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">{t.sandbox.destinationLabel}</label>
                <div className="grid grid-cols-2 gap-2">
                  {SOURCE_OPTIONS.map((source) => (
                    <button
                      key={source}
                      onClick={() => {
                        setSelectedDbSource(source);
                        setSimulationComplete(false);
                      }}
                      className={`py-2 px-3 rounded-xl border text-[11px] font-bold text-center transition ${
                        selectedDbSource === source
                          ? 'border-[#354CE1] bg-[#354CE1]/5 text-[#354CE1]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {t.sandbox.sources[source]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">{t.sandbox.labels.firstName}</label>
                  <input
                    type="text"
                    value={inputFirstName}
                    onChange={(event) => {
                      setInputFirstName(event.target.value);
                      setSimulationComplete(false);
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#354CE1]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">{t.sandbox.labels.lastName}</label>
                  <input
                    type="text"
                    value={inputLastName}
                    onChange={(event) => {
                      setInputLastName(event.target.value);
                      setSimulationComplete(false);
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#354CE1]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">{t.sandbox.labels.dob}</label>
                <input
                  type="date"
                  value={inputDob}
                  onChange={(event) => {
                    setInputDob(event.target.value);
                    setSimulationComplete(false);
                  }}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#354CE1]"
                />
              </div>

              {selectedDbSource === 'eCBSV' && (
                <div className="space-y-1 animate-fade-in">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">{t.sandbox.labels.ssn}</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={inputSsn}
                    onChange={(event) => {
                      setInputSsn(event.target.value);
                      setSimulationComplete(false);
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#354CE1]"
                  />
                </div>
              )}

              {selectedDbSource === 'AAMVA' && (
                <div className="grid grid-cols-2 gap-3 animate-fade-in">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">{t.sandbox.labels.state}</label>
                    <input
                      type="text"
                      maxLength={2}
                      value={inputState}
                      onChange={(event) => {
                        setInputState(event.target.value);
                        setSimulationComplete(false);
                      }}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#354CE1]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">{t.sandbox.labels.zip}</label>
                    <input
                      type="text"
                      maxLength={5}
                      value={inputZip}
                      onChange={(event) => {
                        setInputZip(event.target.value);
                        setSimulationComplete(false);
                      }}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#354CE1]"
                    />
                  </div>
                </div>
              )}

              {selectedDbSource === 'IRS_TIN' && (
                <div className="space-y-1 animate-fade-in">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">{t.sandbox.labels.tin}</label>
                  <input
                    type="text"
                    value={inputTin}
                    onChange={(event) => {
                      setInputTin(event.target.value);
                      setSimulationComplete(false);
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#354CE1]"
                  />
                </div>
              )}

              {selectedDbSource === 'GLOBAL' && (
                <div className="space-y-1 animate-fade-in">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">{t.sandbox.labels.globalZip}</label>
                  <input
                    type="text"
                    value={inputZip}
                    onChange={(event) => {
                      setInputZip(event.target.value);
                      setSimulationComplete(false);
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#354CE1]"
                  />
                </div>
              )}

              <button
                onClick={runDatabaseCheck}
                disabled={isSimulating}
                className="w-full bg-[#354CE1] hover:bg-[#354CE1]/90 disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition flex items-center justify-center gap-2"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {t.sandbox.connecting}
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4" />
                    {t.sandbox.query}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 text-white rounded-[2.5rem] p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#354CE1]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">{t.sandbox.logsTitle}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-full text-[10px] font-mono text-slate-300">
                <Globe className="w-3.5 h-3.5 text-[#1cb080]" />
                <span>{t.sandbox.apiStatus}</span>
              </div>
            </div>

            <div className="space-y-4 min-h-[320px] flex flex-col justify-between relative z-10 font-mono text-xs">
              {!isSimulating && !simulationComplete && (
                <div className="my-auto text-center space-y-3 py-12 text-slate-500">
                  <Database className="w-12 h-12 text-slate-700 mx-auto animate-pulse" />
                  <p>{t.sandbox.awaiting}</p>
                  <p className="text-[10px] font-light max-w-sm mx-auto leading-normal">{t.sandbox.awaitingDesc}</p>
                </div>
              )}

              {isSimulating && (
                <div className="my-auto text-center space-y-4 py-12">
                  <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mx-auto" />
                  <div className="space-y-1.5">
                    <p className="text-emerald-400 font-bold">{t.sandbox.transmitting}</p>
                    <p className="text-[10px] text-slate-500">{t.sandbox.encryptedTunnel}</p>
                  </div>
                  <div className="w-48 bg-slate-800 h-1.5 rounded-full mx-auto overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[45%] animate-[pulse_1s_infinite]" />
                  </div>
                </div>
              )}

              {simulationComplete && simResults && (
                <div className="space-y-5 animate-fade-in">
                  <div className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">{t.sandbox.overallIntegrity}</span>
                      <span className="text-xl font-bold font-mono tracking-tight text-white">
                        {simResults.matchScore}% {t.sandbox.confidence}
                      </span>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                      simResults.overallStatus === 'VERIFIED' ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                    }`}>
                      {t.sandbox.statuses[simResults.overallStatus]}
                    </span>
                  </div>

                  <div className="space-y-2 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">{t.sandbox.attributeMetrics}</p>
                    <div className="divide-y divide-slate-800/60 text-[11px]">
                      {simResults.details.map((detail) => (
                        <div key={`${detail.fieldKey}-${detail.value}`} className="py-2 flex items-center justify-between gap-3">
                          <span className="text-slate-400 font-semibold">{t.sandbox.fields[detail.fieldKey]}:</span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-300 font-mono font-bold">{detail.value}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              detail.status === 'MATCH' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                            }`}>
                              {t.sandbox.statuses[detail.status]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border text-[11px] leading-relaxed ${simResults.color}`}>
                    <div className="flex gap-2">
                      {simResults.overallStatus === 'VERIFIED' ? (
                        <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-bold">{t.sandbox.systemStatement}</p>
                        <p className="mt-1 text-[10px] font-light leading-normal">
                          {formatText(t.sandbox.summaries[simResults.summaryKey], { score: simResults.matchScore })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-slate-800 pt-4 flex items-center justify-between gap-4 text-[10px] text-slate-500 font-mono">
                <span>{t.sandbox.protocol}</span>
                <span>{t.sandbox.certification}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto mb-24 bg-emerald-50/40 py-20 px-6 rounded-[3rem] border border-emerald-100/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[#354CE1] font-semibold text-xs uppercase tracking-wider block">{t.featuresBadge}</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">{t.featuresTitle}</h2>
            <p className="text-slate-500 text-sm leading-relaxed">{t.featuresDesc}</p>
          </div>

          <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-[2rem] border border-slate-150/80 shadow-xs space-y-4">
            {t.features.map((feature: any) => (
              <div key={feature.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === feature.id ? '' : feature.id)}
                  className="w-full text-left py-2 flex items-center justify-between text-slate-900 font-bold text-sm md:text-base hover:text-[#354CE1] transition"
                >
                  <span>{feature.title}</span>
                  <span className="text-xs text-slate-400 font-mono ml-4 shrink-0">{activeAccordion === feature.id ? '-' : '+'}</span>
                </button>
                {activeAccordion === feature.id && (
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed bg-slate-50 p-4 rounded-xl animate-fade-in">{feature.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#354CE1] font-semibold text-xs uppercase tracking-wider block mb-2">{t.useCasesBadge}</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">{t.useCasesTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.useCases.map((useCase: any, index: number) => {
            const Icon = useCaseIcons[index];
            return (
              <div key={useCase.title} className="bg-white p-8 rounded-3xl border border-slate-150/80 shadow-xs">
                <div className="w-10 h-10 bg-[#354CE1]/5 rounded-xl flex items-center justify-center text-[#354CE1] mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{useCase.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{useCase.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto mb-24">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8">{t.keepLearning}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.learning.map((item: any, index: number) => {
            const Icon = learningIcons[index];
            return (
              <div key={item.title} className="bg-white rounded-3xl border border-slate-150/80 shadow-xs overflow-hidden group hover:shadow-md transition">
                <div className="aspect-video bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#354CE1]/10 group-hover:bg-[#354CE1]/5 transition" />
                  <Icon className="w-12 h-12 text-[#354CE1]/40" />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.meta}</span>
                  <h4 className="font-bold text-slate-900 group-hover:text-[#354CE1] transition text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto mb-24">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8">{t.explorePlatform}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button
            onClick={() => {
              if (onViewChange) onViewChange('government-id');
            }}
            className="group text-left relative overflow-hidden bg-[#1cb080] rounded-[2rem] p-8 text-white shadow-md hover:shadow-lg transition duration-200 flex flex-col justify-between min-h-[160px]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl translate-x-1/4 -translate-y-1/4" />
            <h4 className="text-2xl font-bold leading-tight max-w-sm relative z-10">{t.platformLinks[0].title}</h4>
            <div className="flex items-center gap-2 text-xs font-semibold mt-4 group-hover:translate-x-1 transition-transform">
              <span>{t.platformLinks[0].cta}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          <button
            onClick={() => {
              if (onViewChange) onViewChange('workflows');
            }}
            className="group text-left relative overflow-hidden bg-[#354CE1] rounded-[2rem] p-8 text-white shadow-md hover:shadow-lg transition duration-200 flex flex-col justify-between min-h-[160px]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl translate-x-1/4 -translate-y-1/4" />
            <h4 className="text-2xl font-bold leading-tight max-w-sm relative z-10">{t.platformLinks[1].title}</h4>
            <div className="flex items-center gap-2 text-xs font-semibold mt-4 group-hover:translate-x-1 transition-transform">
              <span>{t.platformLinks[1].cta}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </section>

      <section className="max-w-3xl mx-auto mb-24 bg-white rounded-3xl p-8 border border-slate-150/80 shadow-xs">
        <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight text-center">{t.faqTitle}</h3>
        <div className="space-y-4">
          {t.faqs.map((faq: any, index: number) => (
            <div key={faq.q} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full text-left py-2 flex items-center justify-between text-slate-900 font-semibold text-sm hover:text-[#354CE1] transition"
              >
                <span>{faq.q}</span>
                <span className="text-xs text-slate-400 font-mono ml-4 shrink-0">{activeFaq === index ? '-' : '+'}</span>
              </button>
              {activeFaq === index && (
                <p className="text-xs text-slate-500 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl animate-fade-in">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto mb-16">
        <div className="bg-[#5B6DFF] rounded-[2.5rem] p-8 md:p-12 text-white text-center flex flex-col items-center justify-center space-y-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight relative z-10 max-w-xl">{t.readyTitle}</h2>
          <p className="text-sm md:text-base text-indigo-100 relative z-10 max-w-md">{t.readyDesc}</p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <button onClick={onOpenSandbox} className="bg-white hover:bg-indigo-50 text-[#5B6DFF] font-bold px-8 py-3 rounded-full shadow-md transition text-xs">
              {t.tryDemo}
            </button>
            <button onClick={onOpenSandbox} className="border border-white hover:bg-white/10 text-white font-bold px-8 py-3 rounded-full transition text-xs flex items-center gap-2">
              {t.tryItNow}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
