/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Briefcase, MapPin, Search, ArrowRight, CheckCircle, Clock, ShieldCheck, 
  Sparkles, FileText, UploadCloud, X, Send, Award, Users, Heart, GraduationCap, 
  Map, ChevronDown, Check, Info, FileUp, Sparkle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import {
  CAREERS_BOARD_TRANSLATIONS,
  CAREERS_DEPARTMENT_KEYS,
  CAREERS_JOB_TRANSLATIONS,
  CAREERS_TRANSLATIONS
} from '../translations/CareersPageTranslations';

interface CareersPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
}

type CareersDepartment = (typeof CAREERS_DEPARTMENT_KEYS)[keyof typeof CAREERS_DEPARTMENT_KEYS];
type JobDepartment = Exclude<CareersDepartment, typeof CAREERS_DEPARTMENT_KEYS.all>;

interface JobRole {
  id: string;
  title: string;
  department: JobDepartment;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}


export default function CareersPage({ onOpenSandbox, onBackToLanding }: CareersPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(CAREERS_TRANSLATIONS, language as keyof typeof CAREERS_TRANSLATIONS, 'CAREERS_TRANSLATIONS');
  const board = getLocalizedRecord(CAREERS_BOARD_TRANSLATIONS, language as keyof typeof CAREERS_BOARD_TRANSLATIONS, 'CAREERS_BOARD_TRANSLATIONS');
  const localizedJobData = getLocalizedRecord(CAREERS_JOB_TRANSLATIONS, language as keyof typeof CAREERS_JOB_TRANSLATIONS, 'CAREERS_JOB_TRANSLATIONS');
  const [selectedDepartment, setSelectedDepartment] = useState<JobRole['department'] | typeof CAREERS_DEPARTMENT_KEYS.all>(CAREERS_DEPARTMENT_KEYS.all);
  const [searchQuery, setSearchQuery] = useState('');

  const departmentLabels = React.useMemo(() => ({
    [CAREERS_DEPARTMENT_KEYS.all]: t.departmentAll,
    [CAREERS_DEPARTMENT_KEYS.engineering]: t.departmentEngineering,
    [CAREERS_DEPARTMENT_KEYS.product]: t.departmentProduct,
    [CAREERS_DEPARTMENT_KEYS.sales]: t.departmentSales,
    [CAREERS_DEPARTMENT_KEYS.operations]: t.departmentOperations,
    [CAREERS_DEPARTMENT_KEYS.security]: t.departmentSecurity,
    [CAREERS_DEPARTMENT_KEYS.ssi]: t.departmentSsi,
  }), [t]);

  const translatedValues = React.useMemo(() => [
    { title: t.value1Title, description: t.value1Desc, icon: ShieldCheck, color: "bg-indigo-50 text-[#354CE1] border-indigo-100/60" },
    { title: t.value2Title, description: t.value2Desc, icon: Sparkles, color: "bg-purple-50 text-purple-600 border-purple-100" },
    { title: t.value3Title, description: t.value3Desc, icon: Users, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { title: t.value4Title, description: t.value4Desc, icon: Heart, color: "bg-rose-50 text-rose-600 border-rose-100" },
  ], [t]);

  const translatedPerks = React.useMemo(() => [
    { title: t.perk1Title, desc: t.perk1Desc, icon: Heart },
    { title: t.perk2Title, desc: t.perk2Desc, icon: Award },
    { title: t.perk3Title, desc: t.perk3Desc, icon: Map },
    { title: t.perk4Title, desc: t.perk4Desc, icon: GraduationCap },
    { title: t.perk5Title, desc: t.perk5Desc, icon: Clock },
    { title: t.perk6Title, desc: t.perk6Desc, icon: Users },
  ], [t]);

  const translatedJobs = React.useMemo<JobRole[]>(() => [
    {
      id: "eng-1",
      title: t.job1Title,
      department: CAREERS_DEPARTMENT_KEYS.engineering,
      location: t.job1Location,
      type: t.fullTime as JobRole['type'],
      experience: t.job1Experience,
      description: t.job1Desc,
      responsibilities: [t.job1Resp1, t.job1Resp2, t.job1Resp3, t.job1Resp4],
      requirements: [t.job1Req1, t.job1Req2, t.job1Req3, t.job1Req4],
    },
    {
      id: "eng-2",
      title: t.job2Title,
      department: CAREERS_DEPARTMENT_KEYS.engineering,
      location: t.job2Location,
      type: t.fullTime as JobRole['type'],
      experience: t.job2Experience,
      description: t.job2Desc,
      responsibilities: [t.job2Resp1, t.job2Resp2, t.job2Resp3, t.job2Resp4],
      requirements: [t.job2Req1, t.job2Req2, t.job2Req3, t.job2Req4],
    },
    {
      id: "prod-1",
      title: t.job3Title,
      department: CAREERS_DEPARTMENT_KEYS.product,
      location: t.job3Location,
      type: t.fullTime as JobRole['type'],
      experience: t.job3Experience,
      description: t.job3Desc,
      responsibilities: [t.job3Resp1, t.job3Resp2, t.job3Resp3, t.job3Resp4],
      requirements: [t.job3Req1, t.job3Req2, t.job3Req3, t.job3Req4],
    },
    {
      id: "prod-2",
      title: t.job4Title,
      department: CAREERS_DEPARTMENT_KEYS.product,
      location: t.job4Location,
      type: t.fullTime as JobRole['type'],
      experience: t.job4Experience,
      description: t.job4Desc,
      responsibilities: [t.job4Resp1, t.job4Resp2, t.job4Resp3, t.job4Resp4],
      requirements: [t.job4Req1, t.job4Req2, t.job4Req3, t.job4Req4],
    },
    {
      id: "sales-1",
      title: t.job5Title,
      department: CAREERS_DEPARTMENT_KEYS.sales,
      location: t.job5Location,
      type: t.fullTime as JobRole['type'],
      experience: t.job5Experience,
      description: t.job5Desc,
      responsibilities: [t.job5Resp1, t.job5Resp2, t.job5Resp3, t.job5Resp4],
      requirements: [t.job5Req1, t.job5Req2, t.job5Req3, t.job5Req4],
    },
    {
      id: "sales-2",
      title: t.job6Title,
      department: CAREERS_DEPARTMENT_KEYS.sales,
      location: t.job6Location,
      type: t.fullTime as JobRole['type'],
      experience: t.job6Experience,
      description: t.job6Desc,
      responsibilities: [t.job6Resp1, t.job6Resp2, t.job6Resp3, t.job6Resp4],
      requirements: [t.job6Req1, t.job6Req2, t.job6Req3, t.job6Req4],
    },
    ...localizedJobData.map((job) => ({
      ...job,
      responsibilities: [...job.responsibilities],
      requirements: [...job.requirements],
    })),
  ], [t, localizedJobData]);

  const hiringStats = React.useMemo(() => [
    { value: String(translatedJobs.length), label: board.statOpenRoles },
    { value: String(new Set(translatedJobs.map((job) => job.department)).size), label: board.statDepartments },
    { value: board.statResponseValue, label: board.statResponse },
  ], [board, translatedJobs]);
  
  // Job detail state
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [viewingJobDetails, setViewingJobDetails] = useState<JobRole | null>(null);
  
  // Application Modal state
  const [applyingJob, setApplyingJob] = useState<JobRole | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [whyIdentra, setWhyIdentra] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Submission flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Filter logic
  const filteredJobs = translatedJobs.filter(job => {
    const matchesDept = selectedDepartment === CAREERS_DEPARTMENT_KEYS.all || job.department === selectedDepartment;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Handle Drag & Drop Resume
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf" || file.name.endsWith(".pdf") || file.name.endsWith(".docx")) {
        setResumeFile(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !resumeFile) return;

    setIsSubmitting(true);
    // Mimic real network delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form on success after a short while or on modal close
    }, 1500);
  };

  const closeApplyModal = () => {
    setApplyingJob(null);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setLinkedinUrl('');
    setWhyIdentra('');
    setResumeFile(null);
    setSubmitSuccess(false);
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 font-sans antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* 1. HERO */}
      <section className="w-full bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white pt-20 pb-16 relative overflow-hidden border-b border-indigo-100/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,rgba(15,30,54,0.25),transparent_45%,rgba(0,212,178,0.12))]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between gap-8 text-left">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 border border-white/25 text-yellow-300 shadow-xs">
                  <Sparkle className="w-3.5 h-3.5" />
                  <span>{t.hiringBadge}</span>
                </span>
                
                <h1 className="text-4xl md:text-6xl font-display font-medium leading-[1.08] tracking-tight text-white max-w-3xl">
                  {t.heroTitle}
                </h1>
                
                <p className="text-white/95 text-sm md:text-lg leading-relaxed max-w-2xl font-normal">
                  {t.heroDesc}
                </p>

                <div className="pt-1 flex flex-wrap gap-3">
                  <button
                    id="btn-scroll-roles"
                    onClick={() => {
                      const element = document.getElementById('open-roles-section');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-white hover:bg-teal-50 text-[#354CE1] text-xs font-bold px-6 py-4 rounded-full shadow-md transition-all duration-200 flex items-center gap-2 group cursor-pointer"
                  >
                    <span>{t.exploreOpenRoles}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform text-[#354CE1]" />
                  </button>
                  <button
                    onClick={onOpenSandbox}
                    className="bg-white/10 hover:bg-white/25 text-white text-xs font-bold px-6 py-4 rounded-full border border-white/20 shadow-xs transition cursor-pointer"
                  >
                    {t.learnPlatform}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-white/20 border-y border-white/20 bg-white/10 backdrop-blur-xs rounded-2xl overflow-hidden">
                {hiringStats.map((stat) => (
                  <div key={stat.label} className="py-5 px-4">
                    <p className="text-2xl md:text-3xl font-display font-semibold text-white">{stat.value}</p>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/75 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full border-4 border-white rounded-3xl overflow-hidden bg-white shadow-2xl">
                <img 
                  src="/src/assets/images/identra_careers_team_1783338578864.jpg" 
                  alt={t.teamImageAlt} 
                  className="w-full h-56 md:h-72 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-white p-5 md:p-6 space-y-4">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{board.snapshotTitle}</p>
                      <p className="text-sm font-bold text-[#0F1E36] mt-1">{board.snapshotStatus}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 border border-emerald-100 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {board.snapshotStatusLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{board.snapshotLocationLabel}</p>
                      <p className="text-xs font-semibold text-slate-700 mt-1 leading-relaxed">{board.snapshotLocation}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{board.snapshotModeLabel}</p>
                      <p className="text-xs font-semibold text-slate-700 mt-1 leading-relaxed">{board.snapshotMode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VALUES SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] font-extrabold text-[#354CE1] uppercase tracking-widest">{t.cultureBadge}</span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-[#0F1E36] tracking-tight">
            {t.cultureTitle}
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            {t.cultureDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {translatedValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs hover:shadow-md transition duration-200 text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-2xl pointer-events-none translate-x-12 -translate-y-12" />
                
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 ${val.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <h3 className="text-lg font-bold text-[#0F1E36] mb-3">{val.title}</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{val.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. PERKS SECTION (Bento or clean cards) */}
      <div className="w-full bg-slate-50 border-y border-slate-200/50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[10px] font-extrabold text-[#354CE1] uppercase tracking-widest">{t.perksBadge}</span>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-[#0F1E36] tracking-tight">
              {t.perksTitle}
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {t.perksDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {translatedPerks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-150 shadow-2xs hover:border-slate-250 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#354CE1] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">{perk.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. HIRING PROCESS */}
      <section className="w-full bg-white border-y border-indigo-100/70 py-20 px-6">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 text-left">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] font-extrabold text-[#354CE1] uppercase tracking-widest">{board.processBadge}</span>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-[#0F1E36] tracking-tight">
              {board.processTitle}
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {board.processDesc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {board.processSteps.map((step, idx) => (
            <div key={step.title} className="bg-[#FAFBFD] border border-indigo-100 rounded-2xl p-5 text-left shadow-xs hover:shadow-md transition">
              <div className="w-8 h-8 rounded-xl bg-[#354CE1] text-white flex items-center justify-center text-xs font-extrabold mb-4 shadow-sm">
                {idx + 1}
              </div>
              <h3 className="text-sm font-bold text-[#0F1E36] mb-2">{step.title}</h3>
              <p className="text-xs leading-relaxed text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 5. OPEN ROLES DYNAMIC INTERACTIVE SECTION */}
      <div id="open-roles-section" className="max-w-7xl mx-auto px-6 py-24">
        
        {/* Header and filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 text-left">
            <span className="text-[10px] font-extrabold text-[#354CE1] uppercase tracking-widest">{t.applyBadge}</span>
            <h2 className="text-3xl font-display font-medium text-[#0F1E36] tracking-tight">
              {t.openPositionsTitle}
            </h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-md">
              {t.openPositionsDesc}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-200 text-xs font-semibold placeholder-slate-400 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1] transition bg-white"
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200 pb-6">
          {([
            CAREERS_DEPARTMENT_KEYS.all,
            CAREERS_DEPARTMENT_KEYS.engineering,
            CAREERS_DEPARTMENT_KEYS.product,
            CAREERS_DEPARTMENT_KEYS.security,
            CAREERS_DEPARTMENT_KEYS.ssi,
            CAREERS_DEPARTMENT_KEYS.sales,
            CAREERS_DEPARTMENT_KEYS.operations
          ] as const).map((dept) => (
            <button
              key={dept}
              onClick={() => {
                setSelectedDepartment(dept);
                setExpandedJobId(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition duration-200 ${
                selectedDepartment === dept 
                  ? 'bg-[#354CE1] text-white shadow-xs' 
                  : 'bg-indigo-50/70 text-[#354CE1] hover:bg-indigo-100/60'
              }`}
            >
              {dept === CAREERS_DEPARTMENT_KEYS.all ? t.allRoles : departmentLabels[dept]}
              <span className={`text-[10px] ml-1.5 px-1.5 py-0.5 rounded-full font-extrabold ${selectedDepartment === dept ? 'bg-white/20 text-white' : 'bg-indigo-100/80 text-[#354CE1]'}`}>
                {dept === CAREERS_DEPARTMENT_KEYS.all 
                  ? translatedJobs.length 
                  : translatedJobs.filter(j => j.department === dept).length
                }
              </span>
            </button>
          ))}
        </div>

        {/* Roles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {
                return (
                  <motion.div
                    key={job.id}
                    layout="position"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    onClick={() => setViewingJobDetails(job)}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden cursor-pointer flex flex-col justify-between p-6 md:p-8 h-full border border-indigo-50 group relative"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#354CE1] tracking-wider uppercase bg-indigo-50 px-2.5 py-1 rounded">
                          {departmentLabels[job.department]}
                        </span>
                        <span className="text-slate-400 text-xs font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {job.type}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#0F1E36] group-hover:text-[#354CE1] transition-colors pt-1 line-clamp-2">
                        {job.title}
                      </h3>

                      <div className="space-y-2 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{job.experience} {t.experienceLabel}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-6 flex items-center justify-between text-xs font-bold text-[#354CE1] border-t border-slate-100/60 group-hover:underline">
                      <span>{t.viewDetails}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16 bg-white border border-slate-150 rounded-2xl p-8 shadow-xs">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="font-bold text-slate-900 text-sm">{t.noJobsTitle}</p>
                <p className="text-xs text-slate-500 mt-1">{t.noJobsDesc}</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* JOB DETAILS MODAL */}
      <AnimatePresence>
        {viewingJobDetails && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingJobDetails(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" 
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 w-full max-w-3xl relative overflow-hidden z-10"
            >
              {/* Header block */}
              <div className="bg-gradient-to-r from-[#354CE1] to-[#5F3CF3] text-white p-6 md:p-8 relative">
                <button
                  onClick={() => setViewingJobDetails(null)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition border border-white/15"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-2 text-left pr-8">
                  <span className="text-[10px] font-bold text-yellow-300 uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                    {departmentLabels[viewingJobDetails.department]}
                  </span>
                  <h3 className="text-xl md:text-3xl font-display font-bold tracking-tight text-white pt-1">
                    {viewingJobDetails.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-indigo-100 text-xs font-semibold pt-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-200" />
                      {viewingJobDetails.location}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-200" />
                      {viewingJobDetails.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-200" />
                      {viewingJobDetails.experience} {t.experienceShort}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Body */}
              <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto text-left space-y-6">
                
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-[#0F1E36] uppercase tracking-wider">{t.roleOverview}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{viewingJobDetails.description}</p>
                </div>

                {/* Responsibilities */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-[#0F1E36] uppercase tracking-wider">{t.whatYouDo}</h4>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {viewingJobDetails.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-600 text-xs leading-relaxed">
                        <Check className="w-4 h-4 text-[#354CE1] mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-[#0F1E36] uppercase tracking-wider">{t.whatWeLookFor}</h4>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {viewingJobDetails.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-600 text-xs leading-relaxed">
                        <Check className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action Row */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Info className="w-4 h-4 text-[#354CE1]" />
                    <span>{t.applyTime}</span>
                  </div>
                  <button
                    onClick={() => {
                      setApplyingJob(viewingJobDetails);
                      setViewingJobDetails(null);
                    }}
                    className="w-full sm:w-auto bg-black hover:bg-slate-800 text-white font-bold text-xs px-6 py-3.5 rounded-full shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <span>{t.applyForRole}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. INTERACTIVE APPLICATIONS SUBMIT MODAL */}
      <AnimatePresence>
        {applyingJob && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeApplyModal}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" 
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 w-full max-w-2xl relative overflow-hidden z-10"
            >
              {/* Header block */}
              <div className="bg-[#5B6DFF] text-white p-6 md:p-8 relative overflow-hidden">
                <button
                  onClick={closeApplyModal}
                  className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition border border-white/25"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-1.5 text-left pr-8 relative z-10">
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full border border-white/25">
                    {t.applyingFor.replace('{department}', departmentLabels[applyingJob.department])}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white pt-1.5 leading-snug">
                    {applyingJob.title}
                  </h3>
                  <p className="text-white/85 text-xs font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-white/75" />
                    <span>{applyingJob.location}</span>
                  </p>
                </div>
              </div>

              {/* Form body */}
              <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                {!submitSuccess ? (
                  <form onSubmit={handleApplySubmit} className="space-y-5 text-left">
                    
                    {/* Basic info row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {t.fullName}
                        </label>
                        <input 
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder={t.fullNamePlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1] transition bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {t.email}
                        </label>
                        <input 
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder={t.emailPlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1] transition bg-white"
                        />
                      </div>
                    </div>

                    {/* Phone and LinkedIn */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {t.phone}
                        </label>
                        <input 
                          type="tel"
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder={t.phonePlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1] transition bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {t.linkedin}
                        </label>
                        <input 
                          type="url"
                          value={linkedinUrl}
                          onChange={(e) => setLinkedinUrl(e.target.value)}
                          placeholder={t.linkedinPlaceholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1] transition bg-white"
                        />
                      </div>
                    </div>

                    {/* Resume Upload Drop Zone */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {t.resume}
                      </label>
                      
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center transition flex flex-col items-center justify-center gap-2 cursor-pointer ${
                          isDragging 
                            ? 'border-[#354CE1] bg-[#354CE1]/5' 
                            : resumeFile 
                              ? 'border-emerald-300 bg-emerald-50/20' 
                              : 'border-slate-200 hover:border-[#354CE1] bg-slate-50/50'
                        }`}
                      >
                        <input 
                          type="file" 
                          id="resume-file-input"
                          accept=".pdf,.docx"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        
                        <label htmlFor="resume-file-input" className="cursor-pointer w-full flex flex-col items-center">
                          {resumeFile ? (
                            <>
                              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1 shadow-sm">
                                <CheckCircle className="w-5 h-5" />
                              </div>
                              <p className="text-xs font-bold text-slate-800">{resumeFile.name}</p>
                              <p className="text-[10px] text-slate-400 font-medium">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB - {t.fileMeta}</p>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setResumeFile(null);
                                }}
                                className="text-[10px] text-red-500 font-extrabold hover:underline mt-2 flex items-center gap-0.5"
                              >
                                <X className="w-3 h-3" />
                                <span>{t.removeFile}</span>
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="w-10 h-10 rounded-full bg-indigo-50 text-[#354CE1] flex items-center justify-center mb-1">
                                <UploadCloud className="w-5 h-5" />
                              </div>
                              <p className="text-xs font-bold text-slate-700">{t.dragResume}</p>
                              <p className="text-[10px] text-slate-400 font-medium">{t.browsePrefix} <span className="text-[#354CE1] underline font-bold">{t.browseFolders}</span> {t.browseSuffix}</p>
                              <p className="text-[9px] text-slate-400 pt-1">{t.acceptsFormats}</p>
                            </>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Why Identra */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {t.whyIdentra}
                      </label>
                      <textarea 
                        rows={3}
                        value={whyIdentra}
                        onChange={(e) => setWhyIdentra(e.target.value)}
                        placeholder={t.whyIdentraPlaceholder}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1] transition bg-white resize-none"
                      />
                    </div>

                    {/* Submit footer row */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={closeApplyModal}
                        className="text-slate-500 hover:text-slate-800 text-xs font-bold px-4 py-3 rounded-full hover:bg-slate-50 transition"
                      >
                        {t.cancel}
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !resumeFile}
                        className="bg-[#354CE1] hover:bg-[#2539BE] disabled:opacity-50 disabled:hover:bg-[#354CE1] text-white font-bold text-xs px-6 py-3.5 rounded-full shadow-md transition flex items-center gap-1.5"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{t.sendingApplication}</span>
                          </>
                        ) : (
                          <>
                            <span>{t.submitApplication}</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-sm">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{t.applicationSubmitted}</h3>
                    <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                      {t.successThanksBefore}{applicantName}{t.successThanksMiddle}<span className="font-semibold text-slate-800">{applyingJob.title}</span>{t.successThanksAfter}
                    </p>
                    <p className="text-xs text-slate-400">
                      {t.successReviewBefore}<span className="font-semibold text-slate-700">{applicantEmail}</span>{t.successReviewAfter}
                    </p>
                    <button
                      onClick={closeApplyModal}
                      className="bg-black hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-full shadow transition mt-6"
                    >
                      {t.done}
                    </button>
                  </motion.div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. BOTTOM READY TO GET STARTED CALLOUT */}
      <div className="max-w-7xl mx-auto px-6 py-16 pb-24">
        <div className="bg-[#5B6DFF] text-white rounded-[2rem] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl border border-white/40">
          <div className="space-y-3 text-left max-w-lg relative z-10">
            <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-white">{t.bottomTitle}</h2>
            <p className="text-white/85 text-sm font-normal leading-relaxed">
              {t.bottomDesc}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <button 
              onClick={() => {
                const openInquiry: JobRole = {
                  id: "general-inquiry",
                  title: t.generalTitle,
                  department: CAREERS_DEPARTMENT_KEYS.operations,
                  location: t.generalLocation,
                  type: t.fullTime,
                  experience: t.generalExperience,
                  description: t.generalDesc,
                  requirements: [t.generalReq1, t.generalReq2, t.generalReq3],
                  responsibilities: [t.generalResp1]
                };
                setApplyingJob(openInquiry);
              }}
              className="bg-white hover:bg-teal-50 text-[#354CE1] font-bold text-xs px-6 py-4 rounded-full shadow-md transition flex items-center gap-1.5"
            >
              <span>{t.generalApplication}</span>
              <ArrowRight className="w-4 h-4 text-[#354CE1]" />
            </button>
            <button 
              onClick={onBackToLanding}
              className="text-white hover:text-white font-bold text-xs px-5 py-4 rounded-full bg-white/10 hover:bg-white/25 transition border border-white/20"
            >
              {t.backToLanding} &larr;
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
