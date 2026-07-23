/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar, MapPin, Monitor, ArrowRight, Check, Users, Sparkles, 
  MessageSquare, HelpCircle, ShieldCheck, Linkedin, FileText, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EVENTS_PAGE_TRANSLATIONS } from '../translations/EventsPageTranslations';
import { useLanguage } from '../context/LanguageContext';

interface EventsPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
}

type EventId = keyof typeof EVENTS_PAGE_TRANSLATIONS.en.events;

interface EventItem {
  id: EventId;
  type: 'in-person' | 'webinar';
  url?: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: 'event-1',
    type: 'in-person'
  },
  {
    id: 'event-2',
    type: 'webinar'
  }
];

export default function EventsPage({ onOpenSandbox, onBackToLanding }: EventsPageProps) {

  const { language } = useLanguage();

  const t = EVENTS_PAGE_TRANSLATIONS[language];

  const [activeTab, setActiveTab] = useState<'all' | 'in-person' | 'webinar'>('all');
  
  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredEvents = EVENTS_DATA.filter(event => {
    if (activeTab === 'all') return true;
    return event.type === activeTab;
  });

  const counts = {
    all: EVENTS_DATA.length,
    'in-person': EVENTS_DATA.filter(e => e.type === 'in-person').length,
    webinar: EVENTS_DATA.filter(e => e.type === 'webinar').length
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !company) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      // Reset form fields
      setEmail('');
      setFirstName('');
      setLastName('');
      setCompany('');
      setNotes('');
    }, 1200);
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800 font-sans antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1]">
      
      {/* Hero Header Section */}
      <div className="w-full bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white pt-20 pb-16 relative overflow-hidden">
        {/* Subtle decorative background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-72 h-72 bg-[#00E5FF]/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-display font-medium leading-[1.1] tracking-tight max-w-5xl text-white mb-8">{t.copy.joinUsAtAnEventMeetOurTeam}</h1>
          
          <button
            id="btn-hero-request-meeting"
            onClick={() => {
              const element = document.getElementById('meeting-form-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-white hover:bg-slate-50 text-[#354CE1] text-sm font-bold px-6 py-3.5 rounded-full shadow-lg transition flex items-center gap-2 group mb-14 cursor-pointer"
          >
            <span>{t.copy.requestAMeeting}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform text-slate-600" />
          </button>

          {/* Hero Banner Image */}
          <div className="w-full rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] border-4 border-white bg-slate-100 max-w-5xl">
            <img 
              src="/src/assets/images/identra_event_networking_1783338372214.jpg" 
              alt={t.copy.identraNetworkingConferenceEvent} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-display font-medium text-[#0F1E36] mb-8">{t.copy.upcomingEvents}</h2>

        {/* Filters Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            id="tab-events-all"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'all' 
                ? 'bg-[#354CE1] text-white shadow-xs' 
                : 'bg-indigo-50/70 text-[#354CE1] hover:bg-indigo-100/60 border border-indigo-100/30'
            }`}
          >
            <span>{t.copy.allEvents}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-[#354CE1]'}`}>
              {counts.all}
            </span>
          </button>

          <button
            id="tab-events-inperson"
            onClick={() => setActiveTab('in-person')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'in-person' 
                ? 'bg-[#354CE1] text-white shadow-xs' 
                : 'bg-indigo-50/70 text-[#354CE1] hover:bg-indigo-100/60 border border-indigo-100/30'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.copy.inPerson}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${activeTab === 'in-person' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-[#354CE1]'}`}>
              {counts['in-person']}
            </span>
          </button>

          <button
            id="tab-events-webinar"
            onClick={() => setActiveTab('webinar')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'webinar' 
                ? 'bg-[#354CE1] text-white shadow-xs' 
                : 'bg-indigo-50/70 text-[#354CE1] hover:bg-indigo-100/60 border border-indigo-100/30'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{t.copy.webinars}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${activeTab === 'webinar' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-[#354CE1]'}`}>
              {counts.webinar}
            </span>
          </button>
        </div>

        {/* Events list */}
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, idx) => {
                const eventCopy = t.events[event.id];
                return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  {/* Event horizontal card divider */}
                  {idx > 0 && <div className="border-t border-slate-200/80 mb-12" />}

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Column (Metadata) */}
                    <div className="md:col-span-5 space-y-4">
                      {/* Pill Tag */}
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        event.type === 'in-person' 
                          ? 'bg-purple-50 text-purple-700 border border-purple-100/80' 
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-100/80'
                      }`}>
                        {event.type === 'in-person' ? (
                          <>
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{t.copy.inPerson2}</span>
                          </>
                        ) : (
                          <>
                            <Monitor className="w-3.5 h-3.5" />
                            <span>{t.copy.webinar}</span>
                          </>
                        )}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-display font-semibold text-[#0F1E36] leading-snug group-hover:text-[#354CE1] transition-colors">
                        {eventCopy.title}
                      </h3>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>{eventCopy.date}</span>
                      </div>
                    </div>

                    {/* Right Column (Description / Action) */}
                    <div className="md:col-span-7 flex flex-col justify-between h-full min-h-[120px]">
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal whitespace-pre-line">
                        {eventCopy.description}
                      </p>

                      {/* Action Button for Webinars */}
                      {eventCopy.saveSpotText && (
                        <div className="mt-6">
                          <button
                            id={`btn-save-spot-${event.id}`}
                            onClick={onOpenSandbox}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#354CE1] hover:text-[#2539BE] transition group/btn"
                          >
                            <span>{eventCopy.saveSpotText}</span>
                            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white border border-slate-150 rounded-2xl p-8"
              >
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="font-bold text-slate-900 text-sm">{t.copy.noEventsFound}</p>
                <p className="text-xs text-slate-500 mt-1">{t.copy.checkBackLaterForMoreUpdatesOrWebinars}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Meeting Form Section */}
      <div id="meeting-form-section" className="w-full bg-slate-50 border-y border-slate-200/50 py-20 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-[2rem] border border-slate-200/60 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left side: Information (5 cols) */}
            <div className="lg:col-span-5 bg-[#C0C9FF] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#354CE1]/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-display font-medium text-[#0F1E36] tracking-tight leading-tight">{t.copy.interestedInMeetingWithUs}</h2>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed">{t.copy.fillOutThisFormWeLookForwardTo}</p>
              </div>

              {/* Trusted by Logos */}
              <div className="mt-12 space-y-4">
                <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">{t.copy.trustedByStartupsAndTheWorldsLargestCompanies}</p>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 opacity-80">
                  {/* LinkedIn Logo Representation */}
                  <div className="flex items-center gap-1 text-[#0077B5] font-extrabold font-sans text-sm tracking-tight select-none">
                    <Linkedin className="w-4 h-4 fill-current" />
                    <span>Linked<span className="bg-[#0077B5] text-white px-0.5 rounded-xs">in</span></span>
                  </div>

                  {/* OpenAI Logo Representation */}
                  <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-xs tracking-wide select-none">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>OpenAI</span>
                  </div>

                  {/* Square Logo Representation */}
                  <div className="flex items-center gap-1 text-slate-900 font-bold text-sm tracking-tight select-none">
                    <div className="w-3 h-3 border-2 border-current rounded-xs" />
                    <span>Square</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Form (7 cols) */}
            <div className="lg:col-span-7 p-8 md:p-12">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{t.copy.email}</label>
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.copy.youCompanyCom}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1] transition"
                      />
                    </div>

                    {/* Name fields row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{t.copy.firstName}</label>
                        <input 
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={t.copy.firstName2}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1] transition"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{t.copy.lastName}</label>
                        <input 
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder={t.copy.lastName2}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1] transition"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{t.copy.company}</label>
                      <input 
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={t.copy.yourCompanyName}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1] transition"
                      />
                    </div>

                    {/* Anything else? */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{t.copy.anythingElse}</label>
                      <textarea 
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={t.copy.tellUsWhatYoudLikeToTalkAbout}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#354CE1] focus:ring-1 focus:ring-[#354CE1] transition resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-black hover:bg-slate-850 text-white text-xs font-bold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md transition disabled:opacity-55"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>{t.copy.submit}</span>
                            <ArrowRight className="w-4 h-4 text-white" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Fineprint disclaimer */}
                    <p className="text-[10.5px] text-slate-400 leading-normal font-normal pt-2">{t.copy.bySubmittingThisFormYouAgreeToReceive}<a href="#" className="underline">{t.copy.privacyPolicy}</a>{t.copy.forMoreInformationAboutOurPrivacyPractices}</p>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-16 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-xs">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{t.copy.requestSentSuccessfully}</h3>
                    <p className="text-sm text-slate-500 max-w-sm leading-relaxed">{t.copy.thankYou}{firstName}{t.copy.weHaveReceivedYourRequestAndOurEvents} <span className="font-semibold text-slate-800">{email}</span>.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-bold text-[#354CE1] hover:underline pt-4"
                    >{t.copy.submitAnotherRequest}</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* Ready to get started custom section for Events Page */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-[#B4C2FF] text-slate-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl border border-white/40">
          <div className="space-y-2 max-w-lg">
            <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-[#0F1E36]">{t.copy.readyToGetStarted}</h2>
            <p className="text-slate-700 text-sm font-normal leading-relaxed">{t.copy.getInTouchOrStartExploringIdentraToday}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <button 
              onClick={onOpenSandbox}
              className="bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs px-6 py-3.5 rounded-full shadow-md transition flex items-center gap-1.5"
            >
              <span>{t.copy.tryTheDemo}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
            <button 
              onClick={onOpenSandbox}
              className="text-indigo-900 hover:text-[#2539BE] font-bold text-xs px-5 py-3.5 rounded-full bg-white/20 hover:bg-white/30 transition border border-indigo-200/50"
            >{t.copy.tryItNow}</button>
          </div>
        </div>
      </div>

    </div>
  );
}
