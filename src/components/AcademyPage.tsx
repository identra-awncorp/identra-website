/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { AppView } from '../types/routes';
import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, GraduationCap, Award, BookOpen, ShieldCheck, 
  CheckCircle2, ChevronRight, User, FileText, Check, Star, Users,
  RefreshCw, Lock, Sparkles, AlertCircle, FileBadge2, Clock, Globe,
  Download, Share2, HelpCircle, CheckSquare, Square, Calendar
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord, getLocalizedValue } from '../utils/i18nRuntime';
import { ACADEMY_UI_TRANSLATIONS, ACADEMY_COURSES_TRANSLATIONS, ACADEMY_QUIZ_TRANSLATIONS } from '../translations/AcademyPageTranslations';
import { copyTextToClipboard } from '../utils/clipboard';

interface AcademyPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
  onViewChange?: (view: AppView) => void;
}

type CourseCategoryKey = 'fundamentals' | 'biometrics' | 'fraud' | 'compliance';
type CourseLevelKey = 'beginner' | 'intermediate' | 'advanced' | 'allLevels';
type CourseTranslationKey = Exclude<keyof typeof ACADEMY_COURSES_TRANSLATIONS.en, 'levels' | 'categories'>;

interface Course {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  duration: string;
  category: string;
  icon: any;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  level: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  whatYouWillLearn: string[];
  chapters: {
    title: string;
    description: string;
    duration: string;
  }[];
}

interface CourseMetadata {
  id: CourseTranslationKey;
  durationMinutes: number;
  categoryKey: CourseCategoryKey;
  icon: any;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  levelKey: CourseLevelKey;
  instructor: {
    name: string;
    avatar: string;
  };
  chapterDurations: number[];
}

interface CourseTextTranslation {
  title: string;
  shortDesc: string;
  longDesc: string;
  instructorRole: string;
  whatYouWillLearn: string[];
  chapters: { title: string; description: string }[];
}

const ACADEMY_COURSE_METADATA: CourseMetadata[] = [
  {
    id: 'course-kyc-aml',
    durationMinutes: 135,
    categoryKey: 'fundamentals',
    icon: ShieldCheck,
    rating: 4.9,
    reviewsCount: 384,
    studentsCount: 1540,
    levelKey: 'beginner',
    instructor: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    },
    chapterDurations: [45, 50, 40]
  },
  {
    id: 'course-biometrics',
    durationMinutes: 190,
    categoryKey: 'biometrics',
    icon: Sparkles,
    rating: 4.8,
    reviewsCount: 412,
    studentsCount: 2045,
    levelKey: 'advanced',
    instructor: {
      name: 'Dr. Aaron Vance',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
    },
    chapterDurations: [60, 70, 60]
  },
  {
    id: 'course-document',
    durationMinutes: 160,
    categoryKey: 'fraud',
    icon: FileText,
    rating: 4.9,
    reviewsCount: 295,
    studentsCount: 1180,
    levelKey: 'intermediate',
    instructor: {
      name: 'Helena Rostov',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
    },
    chapterDurations: [50, 55, 55]
  },
  {
    id: 'course-kyb',
    durationMinutes: 185,
    categoryKey: 'compliance',
    icon: GraduationCap,
    rating: 4.7,
    reviewsCount: 182,
    studentsCount: 890,
    levelKey: 'intermediate',
    instructor: {
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    },
    chapterDurations: [60, 65, 60]
  },
  {
    id: 'course-age-verification',
    durationMinutes: 105,
    categoryKey: 'compliance',
    icon: ShieldCheck,
    rating: 4.8,
    reviewsCount: 142,
    studentsCount: 650,
    levelKey: 'intermediate',
    instructor: {
      name: 'Elena Rostov',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
    },
    chapterDurations: [35, 40, 30]
  },
  {
    id: 'course-risk-signals',
    durationMinutes: 175,
    categoryKey: 'fraud',
    icon: Globe,
    rating: 4.9,
    reviewsCount: 228,
    studentsCount: 980,
    levelKey: 'advanced',
    instructor: {
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    },
    chapterDurations: [65, 60, 50]
  },
  {
    id: 'course-deepfake-defense',
    durationMinutes: 205,
    categoryKey: 'biometrics',
    icon: Sparkles,
    rating: 4.9,
    reviewsCount: 310,
    studentsCount: 1250,
    levelKey: 'advanced',
    instructor: {
      name: 'Dr. Aaron Vance',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
    },
    chapterDurations: [70, 75, 60]
  },
  {
    id: 'course-global-id-architecture',
    durationMinutes: 130,
    categoryKey: 'fundamentals',
    icon: FileText,
    rating: 4.7,
    reviewsCount: 195,
    studentsCount: 820,
    levelKey: 'beginner',
    instructor: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    },
    chapterDurations: [45, 45, 50]
  }
];


interface QuizQuestion {
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const QUIZ_QUESTION_ANSWERS = [
  { correctIdx: 1 },
  { correctIdx: 1 },
  { correctIdx: 1 }
] as const;

export default function AcademyPage({ onOpenSandbox, onBackToLanding, onViewChange }: AcademyPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(ACADEMY_UI_TRANSLATIONS, language as keyof typeof ACADEMY_UI_TRANSLATIONS, 'ACADEMY_UI_TRANSLATIONS');
  const coursesT = getLocalizedRecord(ACADEMY_COURSES_TRANSLATIONS, language as keyof typeof ACADEMY_COURSES_TRANSLATIONS, 'ACADEMY_COURSES_TRANSLATIONS');
  const quizT = getLocalizedRecord(ACADEMY_QUIZ_TRANSLATIONS, language as keyof typeof ACADEMY_QUIZ_TRANSLATIONS, 'ACADEMY_QUIZ_TRANSLATIONS');
  const reviewLabel = t.reviewLabel;
  const dateLocale = t.dateLocale;

  const formatDuration = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) {
      return t.durationHoursMinutes.replace('{hours}', String(hours)).replace('{minutes}', String(minutes));
    }

    if (hours > 0) {
      return t.durationHours.replace('{hours}', String(hours));
    }

    return t.durationMinutes.replace('{minutes}', String(minutes));
  };

  const translatedCourses = ACADEMY_COURSE_METADATA.map((course): Course => {
    const ct = getLocalizedValue(coursesT, course.id, language, `ACADEMY_COURSES_TRANSLATIONS.${course.id}`) as CourseTextTranslation;

    return {
      id: course.id,
      title: ct.title,
      shortDesc: ct.shortDesc,
      longDesc: ct.longDesc,
      duration: formatDuration(course.durationMinutes),
      category: getLocalizedValue(coursesT.categories, course.categoryKey, language, 'ACADEMY_COURSES_TRANSLATIONS.categories'),
      icon: course.icon,
      rating: course.rating,
      reviewsCount: course.reviewsCount,
      studentsCount: course.studentsCount,
      level: getLocalizedValue(coursesT.levels, course.levelKey, language, 'ACADEMY_COURSES_TRANSLATIONS.levels'),
      instructor: {
        ...course.instructor,
        role: ct.instructorRole
      },
      whatYouWillLearn: ct.whatYouWillLearn,
      chapters: course.chapterDurations.map((durationMinutes, idx) => {
        const chapter = getLocalizedValue(ct.chapters, idx, language, `ACADEMY_COURSES_TRANSLATIONS.${course.id}.chapters`);

        return {
          title: getLocalizedValue(chapter, 'title', language, `ACADEMY_COURSES_TRANSLATIONS.${course.id}.chapters.${idx}`),
          description: getLocalizedValue(chapter, 'description', language, `ACADEMY_COURSES_TRANSLATIONS.${course.id}.chapters.${idx}`),
          duration: formatDuration(durationMinutes)
        };
      })
    };
  });

  const translatedQuizQuestions = QUIZ_QUESTION_ANSWERS.map((question, idx): QuizQuestion => {
    const qt = getLocalizedValue(quizT.questions, idx, language, 'ACADEMY_QUIZ_TRANSLATIONS.questions');

    return {
      question: qt.question,
      options: qt.options,
      correctIdx: question.correctIdx,
      explanation: qt.explanation
    };
  });

  // View states: 'catalog' (Udemy grid) or 'details' (Selected Udemy-style course page)
  const [currentAcademyView, setCurrentAcademyView] = useState<'catalog' | 'details'>('catalog');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const selectedCourse = translatedCourses.find(c => c.id === selectedCourseId) || null;

  // Completion/Tracking states
  const [completedCourseIds, setCompletedCourseIds] = useState<string[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  // Exam workflow state
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [examCompleted, setExamCompleted] = useState<boolean>(false);

  // Certificate generation state
  const [studentName, setStudentName] = useState<string>('');
  const [isCertVerified, setIsCertVerified] = useState<boolean>(false);
  const [certId, setCertId] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<'success' | 'error'>('success');

  // Navigation: Go to Selected Course details page
  const handleViewCourseDetails = (course: Course) => {
    setSelectedCourseId(course.id);
    setCurrentAcademyView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Enrollment status
  const handleEnrollInCourse = (courseId: string) => {
    setEnrolledCourseIds(prev => 
      prev.includes(courseId) ? prev : [...prev, courseId]
    );
  };

  // Toggle course completion
  const handleToggleCourseCompletion = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    // Automatically enroll when completed
    setEnrolledCourseIds(prev => prev.includes(id) ? prev : [...prev, id]);
    setCompletedCourseIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  // Fast-track autocomplete all
  const handleQuickCompleteAll = () => {
    const allIds = translatedCourses.map(c => c.id);
    setEnrolledCourseIds(allIds);
    setCompletedCourseIds(allIds);
  };

  // Quiz checks
  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerChecked(true);
    if (selectedOption === translatedQuizQuestions[currentQuestionIdx].correctIdx) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    if (currentQuestionIdx < translatedQuizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setExamCompleted(true);
    }
  };

  const handleRestartExam = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setExamCompleted(false);
    setExamStarted(true);
  };

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const uniqueId = `PER-ACAD-${Math.floor(100000 + Math.random() * 900000)}`;
    setCertId(uniqueId);
    setIsCertVerified(true);
  };

  const handleDownloadCert = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setToastStatus('success');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      window.print();
    }, 1200);
  };

  const handleShareCredential = async () => {
    const copied = await copyTextToClipboard(t.shareCredentialText.replace('{certId}', certId));
    setToastStatus(copied ? 'success' : 'error');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const percentageProgress = Math.round((completedCourseIds.length / translatedCourses.length) * 100);

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* ==================== 1. CATALOGUE CATALOG VIEW ==================== */}
      {currentAcademyView === 'catalog' && (
        <>
          {/* Main Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-[#FAFBFD] text-slate-800 pt-24 pb-20 md:pt-32 md:pb-24 border-b border-slate-200/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(53,76,225,0.06),transparent_60%)] pointer-events-none" />
            <div className="absolute top-1/4 left-5 w-48 h-48 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-5 w-72 h-72 bg-indigo-200/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <button 
                onClick={onBackToLanding}
                className="group inline-flex items-center gap-2 text-indigo-600 hover:text-[#354CE1] text-xs font-semibold mb-8 transition cursor-pointer"
                id="academy_back_btn"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                {t.backToPlatform}
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#354CE1]/5 border border-[#354CE1]/15 rounded-full text-[11px] font-bold tracking-wider text-[#354CE1] uppercase shadow-xs">
                    <GraduationCap className="w-4 h-4 text-indigo-600 animate-pulse" />
                    {t.academyTitle}
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight text-slate-900 leading-[1.05]">
                    {t.heroHeading}
                  </h1>
                  <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                    {t.heroSubheading}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <a 
                      href="#catalog-grid" 
                      className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-sm px-6 py-3 rounded-full transition shadow-lg shadow-indigo-100/30 text-center"
                    >
                      {t.browseCatalog}
                    </a>
                    <button
                      onClick={onOpenSandbox}
                      className="bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 font-semibold text-sm px-6 py-3 rounded-full transition cursor-pointer"
                    >
                      {t.interactiveSandbox}
                    </button>
                  </div>
                </div>

                {/* Coursera/Udemy style Quick Status Counter */}
                <div className="lg:col-span-5">
                  <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-100/40 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">{t.enrollmentProgram}</span>
                        <h3 className="text-sm font-bold text-slate-900">{t.practitionerPath}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#354CE1]">
                        <Award className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500">{t.accreditationCompletion}</span>
                        <span className="text-[#354CE1] font-bold">{percentageProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                           className="bg-[#354CE1] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentageProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-150 text-left">
                        <span className="text-[9px] font-mono text-slate-400 block uppercase">{t.completedPrograms}</span>
                        <span className="text-base font-bold text-slate-800">{completedCourseIds.length} <span className="text-xs text-slate-500">/ {translatedCourses.length}</span></span>
                      </div>
                      <div className="bg-slate-50/60 p-3 rounded-xl border border-slate-150 text-left">
                        <span className="text-[9px] font-mono text-slate-400 block uppercase">{t.examQualification}</span>
                        <span className="text-base font-bold text-slate-800">
                          {completedCourseIds.length === translatedCourses.length ? (
                            <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {t.qualified}
                            </span>
                          ) : (
                            <span className="text-slate-500 text-xs font-medium">{t.readMore.replace('{count}', String(translatedCourses.length - completedCourseIds.length))}</span>
                          )}
                        </span>
                      </div>
                    </div>

                    {completedCourseIds.length < translatedCourses.length && (
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-100">
                        <span>{t.needBypass}</span>
                        <button 
                          onClick={handleQuickCompleteAll}
                          className="text-[#354CE1] hover:underline font-semibold cursor-pointer"
                        >
                          {t.fastTrack}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Courses Grid / Listing (Udemy Catalog Style) */}
          <section id="catalog-grid" className="max-w-7xl mx-auto px-6 py-20 space-y-12">
            <div className="space-y-3 text-left">
              <span className="text-xs font-bold text-[#354CE1] uppercase tracking-wider block">{t.courseCatalog}</span>
              <h2 className="text-3xl font-display font-bold text-[#0F1E36] tracking-tight">{t.explorePrograms}</h2>
              <p className="text-slate-500 text-sm font-light max-w-2xl leading-relaxed">
                {t.catalogDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {translatedCourses.map((course) => {
                const Icon = course.icon;
                const isCompleted = completedCourseIds.includes(course.id);
                const isEnrolled = enrolledCourseIds.includes(course.id);

                return (
                  <div 
                    key={course.id}
                    className="bg-white rounded-[2rem] border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Header info */}
                    <div className="p-6 sm:p-8 space-y-4 text-left">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-[#354CE1]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-full text-amber-700 text-xs font-bold font-mono">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{course.rating}</span>
                          <span className="text-[10px] text-amber-600/70">({course.reviewsCount})</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-indigo-50 border border-indigo-100 text-[#354CE1] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">
                            {course.category}
                          </span>
                          <span className="text-slate-400 text-[10px] font-mono">
                            {course.level}
                          </span>
                        </div>
                        
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug line-clamp-1">
                          {course.title}
                        </h3>
                        
                        <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
                          {course.shortDesc}
                        </p>
                      </div>

                      {/* Instructor quick stats */}
                      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                        <img 
                          src={course.instructor.avatar} 
                          alt={course.instructor.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                        />
                        <div className="text-left">
                          <p className="text-xs font-semibold text-slate-800 leading-none">{course.instructor.name}</p>
                          <p className="text-[10px] text-slate-400 font-light mt-0.5">{course.instructor.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom strip */}
                    <div className="bg-slate-50/50 border-t border-slate-150 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {t.specializedModules.replace('{count}', String(course.chapters.length))}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <span className="text-emerald-700 bg-emerald-50 border border-emerald-150 rounded-xl px-3 py-1.5 text-xs font-bold flex items-center gap-1 shrink-0">
                            <Check className="w-3.5 h-3.5" /> {t.courseComplete}
                          </span>
                        ) : isEnrolled ? (
                          <span className="text-[#354CE1] bg-indigo-50/50 border border-indigo-100 rounded-xl px-3 py-1.5 text-xs font-bold shrink-0">
                            {t.inProgress}
                          </span>
                        ) : null}

                        <button 
                          onClick={() => handleViewCourseDetails(course)}
                          className="bg-indigo-950 hover:bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-1 shadow-xs cursor-pointer whitespace-nowrap"
                        >
                          <span>{t.exploreDetails}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* ==================== 2. UDEMY / COURSERA COURSE DETAILS PAGE ==================== */}
      {currentAcademyView === 'details' && selectedCourse && (
        <div>
          {/* Header Bar Navigation back to Catalog */}
          <div className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-40 shadow-xs">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <button 
                onClick={() => setCurrentAcademyView('catalog')}
                className="group flex items-center gap-2 text-slate-600 hover:text-slate-900 text-xs font-bold transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                {t.backToCatalog}
              </button>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-light hidden sm:inline">{t.professionalPath}</span>
                <span className="bg-indigo-50 text-[#354CE1] px-3 py-1 rounded-full text-[10px] font-bold uppercase font-mono">
                  {selectedCourse.category}
                </span>
              </div>
            </div>
          </div>

          {/* Immersive Coursera Banner Section */}
          <section className="bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 text-slate-800 py-16 px-6 relative overflow-hidden border-b border-slate-200">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(53,76,225,0.06),transparent_60%)] pointer-events-none" />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 text-left">
              
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-[#354CE1] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                    {t.certificateEligibility}
                  </span>
                  <span className="text-slate-500 text-xs">• {t.selfPaced} • {t.online100}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight leading-tight max-w-4xl text-slate-900">
                  {selectedCourse.title}
                </h1>

                <p className="text-slate-600 text-sm sm:text-base font-light max-w-3xl leading-relaxed">
                  {selectedCourse.shortDesc}
                </p>

                {/* Rating & reviews metrics */}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1 text-amber-600 font-bold">
                    <span>{selectedCourse.rating}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                  <span className="text-slate-500 underline">({selectedCourse.reviewsCount} {reviewLabel})</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-600 font-semibold flex items-center gap-1">
                    <Users className="w-4 h-4 text-slate-500" />
                    {t.enrolledCount.replace('{count}', selectedCourse.studentsCount.toLocaleString())}
                  </span>
                </div>

                {/* Instructor Block */}
                <div className="flex items-center gap-3.5 pt-4">
                  <img 
                    src={selectedCourse.instructor.avatar} 
                    alt={selectedCourse.instructor.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-md" 
                  />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t.instructorLabel}</span>
                    <p className="text-sm font-bold text-slate-900">{selectedCourse.instructor.name}</p>
                    <p className="text-xs text-indigo-600 font-light">{selectedCourse.instructor.role}</p>
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex flex-wrap gap-6 text-xs text-slate-500 pt-3 border-t border-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {t.lastUpdated}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-slate-400" />
                    {t.languagesLabel}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-400" />
                    {t.levelLabel.replace('{level}', selectedCourse.level)}
                  </span>
                </div>
              </div>

              {/* Sticky/Enrolling Visual Box (Udemy right card equivalent) */}
              <div className="lg:col-span-4 bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
                <div className="space-y-6 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-widest">{t.enrollmentStatus}</span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {completedCourseIds.includes(selectedCourse.id) ? (
                        <span className="text-emerald-600 flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-5 h-5" /> {t.courseComplete}
                        </span>
                      ) : enrolledCourseIds.includes(selectedCourse.id) ? (
                        <span className="text-indigo-600 font-bold">{t.inProgress}</span>
                      ) : (
                        <span className="text-slate-700">{t.notEnrolled}</span>
                      )}
                    </h3>
                  </div>

                  {/* Pricing / Access representation */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-display text-slate-900">{t.freeAccess}</span>
                    <span className="text-xs text-slate-400 line-through">{t.freePricePlaceholder}</span>
                  </div>

                  <div className="space-y-3.5">
                    {/* Primary actions */}
                    {!enrolledCourseIds.includes(selectedCourse.id) ? (
                      <button
                        onClick={() => handleEnrollInCourse(selectedCourse.id)}
                        className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-sm py-3 rounded-xl transition shadow-lg shadow-indigo-100/50 cursor-pointer text-center"
                      >
                        {t.enrollNow}
                      </button>
                    ) : !completedCourseIds.includes(selectedCourse.id) ? (
                      <button
                        onClick={() => handleToggleCourseCompletion(selectedCourse.id)}
                        className="w-full bg-indigo-950 hover:bg-slate-900 text-white font-bold text-sm py-3 rounded-xl transition shadow-lg cursor-pointer text-center"
                      >
                        {t.completeCourse}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleCourseCompletion(selectedCourse.id)}
                        className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-sm py-3 rounded-xl transition cursor-pointer text-center flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>{t.completedReview}</span>
                      </button>
                    )}

                    <button
                      onClick={onOpenSandbox}
                      className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm py-3 rounded-xl transition cursor-pointer text-center"
                    >
                      {t.sandboxSimulation}
                    </button>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
                    <span className="font-bold text-slate-800 block">{t.courseIncludes}</span>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{t.intensiveSelfPaced.replace('{duration}', selectedCourse.duration)}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{t.specializedModules.replace('{count}', String(selectedCourse.chapters.length))}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{t.verifiedCertificateDesc}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Udemy-style detailed body tabs (What You Will Learn & Detailed Curriculum Chapters) */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              <div className="lg:col-span-8 space-y-10 text-left">
                
                {/* What You'll Learn Module (Standard Udemy grid box) */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{t.whatYouWillLearn}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedCourse.whatYouWillLearn.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                        <span className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deeply Described Long Description */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{t.aboutThisCourse}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed whitespace-pre-line">
                    {selectedCourse.longDesc}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {t.additionalSyllabusText}
                  </p>
                </div>

                {/* Detailed Curriculum Syllabus Timeline */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{t.courseCurriculum}</h3>
                    <span className="text-xs text-slate-400 font-mono">{t.sectionsCount.replace('{count}', String(selectedCourse.chapters.length))}</span>
                  </div>

                  <div className="space-y-4">
                    {selectedCourse.chapters.map((chap, idx) => (
                      <div 
                        key={idx}
                        className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 hover:shadow-md transition duration-200 space-y-3"
                      >
                        <div className="flex items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-md bg-[#354CE1]/5 text-[#354CE1] font-bold text-xs flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                              {chap.title}
                            </h4>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono shrink-0">{chap.duration}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed pl-9">
                          {chap.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Left Empty as side spacing on desktop relative to enrollment card */}
              <div className="lg:col-span-4" />

            </div>
          </section>
        </div>
      )}

      {/* ==================== 3. GENERAL QUALIFICATION EXAM & CERTIFICATION SECTION ==================== */}
      {currentAcademyView === 'catalog' && (
        <section className="bg-slate-100 border-y border-slate-200 py-20 px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
            
            {/* Exam Header Banner */}
            <div className="bg-gradient-to-r from-indigo-950 to-indigo-900 text-white p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(53,76,225,0.15),transparent_60%)] pointer-events-none" />
              <div className="relative z-10 space-y-3 text-center">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-mono block">{t.examTitle}</span>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold">{t.examHeading}</h2>
                <p className="text-indigo-200 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
                  {t.examDesc.replace('{count}', String(translatedCourses.length))}
                </p>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col items-center justify-center">
              
              {/* Locked state */}
              {completedCourseIds.length < translatedCourses.length && !examStarted && (
                <div className="text-center space-y-6 py-4 max-w-md">
                  <Lock className="w-12 h-12 text-slate-300 mx-auto animate-pulse" />
                  <div className="space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">{t.examLocked}</h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      {t.examLockedDesc.replace('{count}', String(translatedCourses.length))}
                    </p>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#354CE1] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentageProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{t.progressText.replace('{completed}', String(completedCourseIds.length)).replace('{total}', String(translatedCourses.length))}</span>
                    <button 
                      onClick={handleQuickCompleteAll}
                      className="text-[#354CE1] hover:underline font-semibold cursor-pointer"
                    >
                      {t.instantDeveloperSkip}
                    </button>
                  </div>
                </div>
              )}

              {/* Ready state */}
              {completedCourseIds.length === translatedCourses.length && !examStarted && !examCompleted && (
                <div className="text-center space-y-6 py-4 max-w-md">
                  <Award className="w-12 h-12 text-[#354CE1] mx-auto animate-bounce" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">{t.examAvailable}</h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      {t.examAvailableDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => setExamStarted(true)}
                    className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-xs px-8 py-3.5 rounded-full transition shadow-lg shadow-indigo-950/10 cursor-pointer"
                  >
                    {t.startExam}
                  </button>
                </div>
              )}

              {/* Active Exam */}
              {examStarted && !examCompleted && (
                <div className="w-full space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest font-bold">{t.certificationExam}</span>
                      <h3 className="text-sm font-bold text-slate-900">{t.questionCount.replace('{current}', String(currentQuestionIdx + 1)).replace('{total}', String(translatedQuizQuestions.length))}</h3>
                    </div>
                    <span className="text-xs bg-indigo-50 text-[#354CE1] font-mono font-bold px-2.5 py-1 rounded-full">
                      {t.correctScore.replace('{score}', String(score)).replace('{total}', String(currentQuestionIdx + (isAnswerChecked ? 1 : 0)))}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-semibold text-slate-800 leading-snug">
                    {translatedQuizQuestions[currentQuestionIdx].question}
                  </h4>

                  <div className="space-y-3">
                    {translatedQuizQuestions[currentQuestionIdx].options.map((option, idx) => {
                      let optionStyle = 'border-slate-200 hover:border-slate-350 hover:bg-slate-50/50';
                      if (selectedOption === idx) {
                        optionStyle = 'border-[#354CE1] bg-[#354CE1]/5';
                      }
                      if (isAnswerChecked) {
                        if (idx === translatedQuizQuestions[currentQuestionIdx].correctIdx) {
                          optionStyle = 'border-emerald-500 bg-emerald-50/40 text-emerald-950 font-medium';
                        } else if (selectedOption === idx) {
                          optionStyle = 'border-rose-500 bg-rose-50/40 text-rose-950';
                        } else {
                          optionStyle = 'border-slate-150 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswerChecked}
                          onClick={() => setSelectedOption(idx)}
                          className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition duration-150 flex items-start gap-3 cursor-pointer ${optionStyle}`}
                        >
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-xs font-bold ${
                            selectedOption === idx 
                              ? 'border-[#354CE1] bg-[#354CE1] text-white' 
                              : 'border-slate-300'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {isAnswerChecked && (
                    <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                      selectedOption === translatedQuizQuestions[currentQuestionIdx].correctIdx
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-800'
                        : 'bg-rose-500/5 border-rose-500/20 text-rose-800'
                    }`}>
                      <p className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                        {selectedOption === translatedQuizQuestions[currentQuestionIdx].correctIdx ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-600" />
                        )}
                        <span>{selectedOption === translatedQuizQuestions[currentQuestionIdx].correctIdx ? t.correctAnswer : t.incorrectAnswer}</span>
                      </p>
                      <span>{translatedQuizQuestions[currentQuestionIdx].explanation}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-6">
                    <button
                      onClick={() => setExamStarted(false)}
                      className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                    >
                      {t.cancelExam}
                    </button>

                    {!isAnswerChecked ? (
                      <button
                        onClick={handleCheckAnswer}
                        disabled={selectedOption === null}
                        className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-xs px-6 py-3 rounded-full transition shadow-md disabled:opacity-50 cursor-pointer"
                      >
                        {t.verifyChoice}
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="bg-indigo-950 hover:bg-slate-900 text-white font-bold text-xs px-6 py-3 rounded-full transition shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{currentQuestionIdx === translatedQuizQuestions.length - 1 ? t.finishExam : t.nextQuestion}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Exam Completed */}
              {examCompleted && (
                <div className="w-full text-center space-y-6 py-4 max-w-lg">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto border ${
                    score >= 2 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-500' 
                      : 'bg-rose-50 border-rose-200 text-rose-500'
                  }`}>
                    <Award className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {score >= 2 ? t.congratsPassed : t.examNotCompleted}
                    </h3>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      {score >= 2 
                        ? t.passDesc
                        : t.failDesc.replace('{score}', String(score)).replace('{total}', String(translatedQuizQuestions.length))
                      }
                    </p>
                  </div>

                  {score >= 2 ? (
                    <div className="w-full pt-2 text-left">
                      {!isCertVerified ? (
                        <form onSubmit={handleGenerateCertificate} className="space-y-3 text-left max-w-md mx-auto">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{t.studentFullName}</label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              required
                              placeholder={t.namePlaceholder}
                              value={studentName}
                              onChange={(e) => setStudentName(e.target.value)}
                              className="flex-1 px-4 py-3 bg-[#FAFBFD] border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1]"
                            />
                            <button
                              type="submit"
                              className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer shrink-0"
                            >
                              {t.verifySign}
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="space-y-4">
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 max-w-md mx-auto">
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span>{t.successSuccess}</span>
                          </div>
                          <a 
                            href="#certificate-view"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#354CE1] hover:underline"
                          >
                            <span>{t.jumpToCertificate}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={handleRestartExam}
                      className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-xs px-6 py-3.5 rounded-full transition shadow-md cursor-pointer flex items-center gap-1.5 mx-auto"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{t.retakeEvaluation}</span>
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* ==================== 4. ACCREDITED DIGITAL CERTIFICATE VIEW ==================== */}
      {isCertVerified && (
        <section id="certificate-view" className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(53,76,225,0.15),transparent_60%)] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono block">{t.academicAccreditation}</span>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight">{t.digitalChampionTitle}</h2>
              <p className="text-slate-400 text-sm font-light max-w-xl mx-auto">
                {t.digitalChampionDesc}
              </p>
            </div>

            {/* Official Certificate Card */}
            <div className="bg-white text-slate-800 p-8 md:p-12 rounded-[2rem] border-[12px] border-indigo-950 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px] border-double select-none">
              <div className="absolute inset-1.5 border border-indigo-100 pointer-events-none rounded-[1.7rem]" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/45 rounded-bl-full pointer-events-none border-b border-l border-indigo-100" />
              
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-100 pb-6">
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-[#354CE1]" />
                    <span className="font-display font-bold text-base text-indigo-950 tracking-wider">{t.identraAcademy}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 block tracking-widest uppercase">{t.globalTrustCredentials}</span>
                </div>

                <div className="bg-[#FAFBFD] border border-slate-150 px-4 py-2 rounded-xl flex items-center gap-3 self-start">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="text-left">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block leading-none">{t.statusLabel}</span>
                    <span className="text-[10px] font-mono font-bold text-slate-700">{t.verifiedLedger}</span>
                  </div>
                </div>
              </div>

              <div className="text-center my-8 space-y-4">
                <span className="text-xs font-mono font-semibold text-indigo-500 uppercase tracking-widest">{t.certifiesThat}</span>
                <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight border-b border-indigo-100/60 pb-3 max-w-lg mx-auto italic">
                  {studentName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
                  {t.certSyllabusBody}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <div className="space-y-1 text-left">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">{t.idSignatureLabel}</span>
                  <span className="text-xs font-mono font-bold text-indigo-950 block">{certId}</span>
                  <span className="text-[10px] text-slate-500 font-light block">{t.dateOfIssue} {new Date().toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>

                {/* Accredit Badge */}
                <div className="flex items-center gap-4">
                  <div className="text-right border-r border-slate-150 pr-4">
                    <span className="text-[9px] font-mono text-slate-400 uppercase block tracking-wider">{t.authorizedSignature}</span>
                    <span className="text-sm font-serif italic font-bold text-[#354CE1] block leading-relaxed animate-pulse">Rick Song</span>
                    <span className="text-[8px] text-slate-400 block leading-none">{t.rickSongTitle}</span>
                  </div>

                  <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-100 relative shrink-0">
                    <FileBadge2 className="w-7 h-7 text-[#354CE1]" />
                    <div className="absolute inset-0.5 border border-dashed border-[#354CE1]/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate controls */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleDownloadCert}
                disabled={isDownloading}
                className="bg-[#354CE1] hover:bg-[#2539BE] text-white font-bold text-xs px-6 py-3.5 rounded-full transition shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t.compilingPdf}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{t.downloadPdf}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShareCredential}
                className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-xs px-6 py-3.5 rounded-full transition flex items-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{t.shareCredentialId}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Toast alert */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white py-3.5 px-5 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 text-xs text-left">
          {toastStatus === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-bounce" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          )}
          <div>
            <p className="font-bold">{toastStatus === 'success' ? t.savedToastTitle : t.copyFailedToastTitle}</p>
            <p className="text-slate-400 font-light mt-0.5">{toastStatus === 'success' ? t.savedToastDesc : t.copyFailedToastDesc}</p>
          </div>
        </div>
      )}

      {/* Bottom Conversion Section */}
      <section className="bg-white border-t border-slate-150 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <GraduationCap className="w-12 h-12 text-[#354CE1] mx-auto animate-bounce" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#0F1E36]">
            {t.applyKnowledgeHeading}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto">
            {t.applyKnowledgeDesc}
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenSandbox}
              className="bg-black hover:bg-slate-900 text-white font-bold text-xs px-6 py-3.5 rounded-full transition shadow-md cursor-pointer"
            >
              {t.launchSandbox}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
