import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  Chrome,
  ShieldAlert,
  Fingerprint,
  Sparkles,
  Lock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { LOGIN_PAGE_TRANSLATIONS } from '../translations/LoginPageTranslations';
import identraLogo from '../assets/images/identra-logo.svg';

interface LoginPageProps {
  onBackToLanding: () => void;
}

type AuthMode = 'signin' | 'signup' | 'forgot' | 'sso';

export default function LoginPage({ onBackToLanding }: LoginPageProps) {
  const { language } = useLanguage();
  const t = getLocalizedRecord(LOGIN_PAGE_TRANSLATIONS, language as keyof typeof LOGIN_PAGE_TRANSLATIONS, 'LOGIN_PAGE_TRANSLATIONS');

  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.includes('@')) {
      setError(t.errors.validEmail);
      return;
    }
    if (password.length < 6) {
      setError(t.errors.passwordLength);
      return;
    }

    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(t.success.signedIn);
      setTimeout(() => {
        onBackToLanding();
      }, 1500);
    }, 1500);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!name.trim()) {
      setError(t.errors.nameRequired);
      return;
    }
    if (!email.includes('@')) {
      setError(t.errors.validEmail);
      return;
    }
    if (password.length < 6) {
      setError(t.errors.passwordLength);
      return;
    }

    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(t.success.accountCreated);
      setMode('signin');
      setPassword('');
    }, 1500);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.includes('@')) {
      setError(t.errors.validEmail);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(t.success.resetSent);
    }, 1200);
  };

  const handleSSOLogin = (provider: string) => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`${t.success.ssoPrefix} ${provider}! ${t.success.ssoSuffix}`);
      setTimeout(() => {
        onBackToLanding();
      }, 1200);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row relative overflow-hidden select-none">
      
      {/* Left Column: Authentic Login Form Form Container */}
      <div className="w-full lg:w-[50%] min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-16 xl:px-28 py-12 relative z-10 bg-white">
        
        {/* Top Navigation Row (Floating) */}
        <div className="absolute top-8 left-6 sm:left-12 md:left-20 lg:left-16 xl:left-28 flex items-center justify-between right-6 sm:right-12 md:right-20 lg:right-16">
          <div 
            onClick={onBackToLanding}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img src={identraLogo} alt={t.brand} className="h-8 w-8 object-contain" />
            <span className="font-sans font-bold text-lg tracking-tight text-slate-900">
              {t.brand}
            </span>
          </div>

          {/* Optional Back to Site Link */}
          <button 
            onClick={onBackToLanding}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.backToSite}</span>
          </button>
        </div>

        {/* Form Body with Smooth Transition AnimatePresence */}
        <div className="max-w-md w-full mx-auto mt-8">
          
          <AnimatePresence mode="wait">
            
            {/* SIGN IN VIEW */}
            {mode === 'signin' && (
              <motion.div
                key="signin"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">
                    {t.signin.title}
                  </h1>
                  <p className="text-xs text-slate-400">
                    {t.signin.desc}
                  </p>
                </div>

                {/* Validation Statuses */}
                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3.5 text-xs font-semibold flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                {successMessage && (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl p-3.5 text-xs font-semibold flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{successMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSignIn} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t.emailLabel}
                    </label>
                    <input 
                      type="email" 
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3.5 py-2.5 border border-slate-200 focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15 rounded-lg text-xs md:text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden font-medium bg-slate-50/30"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        {t.passwordLabel}
                      </label>
                      <button 
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] font-semibold text-[#354CE1] hover:underline"
                      >
                        {t.signin.forgotPassword}
                      </button>
                    </div>
                    <div className="relative">
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder={t.passwordPlaceholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="w-full pl-3.5 pr-10 py-2.5 border border-slate-200 focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15 rounded-lg text-xs md:text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden font-medium bg-slate-50/30"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs md:text-sm py-3 rounded-xl transition shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.signin.loading}</span>
                      </>
                    ) : (
                      <span>{t.signin.submit}</span>
                    )}
                  </button>
                </form>

                {/* Additional link block precisely mirroring styling */}
                <div className="space-y-3.5 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => setMode('sso')}
                    className="block w-full text-left text-xs font-semibold text-[#354CE1] hover:underline"
                  >
                    {t.signin.ssoPrompt}
                  </button>
                  <p className="text-xs text-slate-500 font-medium">
                    {t.signin.needAccount}{' '}
                    <button 
                      onClick={() => { setMode('signup'); setError(null); setSuccessMessage(null); }}
                      className="text-[#354CE1] font-semibold hover:underline"
                    >
                      {t.signin.signup}
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {/* CREATE ACCOUNT / SIGN UP VIEW */}
            {mode === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">
                    {t.signup.title}
                  </h1>
                  <p className="text-xs text-slate-400">
                    {t.signup.desc}
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3.5 text-xs font-semibold flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t.signup.fullName}
                    </label>
                    <input 
                      type="text" 
                      placeholder={t.signup.fullNamePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3.5 py-2.5 border border-slate-200 focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15 rounded-lg text-xs md:text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden font-medium bg-slate-50/30"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t.signup.companyName}
                    </label>
                    <input 
                      type="text" 
                      placeholder={t.signup.companyPlaceholder}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3.5 py-2.5 border border-slate-200 focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15 rounded-lg text-xs md:text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden font-medium bg-slate-50/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t.emailLabel}
                    </label>
                    <input 
                      type="email" 
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3.5 py-2.5 border border-slate-200 focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15 rounded-lg text-xs md:text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden font-medium bg-slate-50/30"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t.passwordLabel}
                    </label>
                    <input 
                      type="password" 
                      placeholder={t.signup.passwordPlaceholder}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3.5 py-2.5 border border-slate-200 focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15 rounded-lg text-xs md:text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden font-medium bg-slate-50/30"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs md:text-sm py-3 rounded-xl transition shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.signup.loading}</span>
                      </>
                    ) : (
                      <span>{t.signup.submit}</span>
                    )}
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <p className="text-slate-500 font-medium">
                    {t.signup.alreadyHaveAccount}{' '}
                    <button 
                      onClick={() => { setMode('signin'); setError(null); setSuccessMessage(null); }}
                      className="text-[#354CE1] font-semibold hover:underline"
                    >
                      {t.signup.login}
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {/* FORGOT PASSWORD VIEW */}
            {mode === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">
                    {t.forgot.title}
                  </h1>
                  <p className="text-xs text-slate-400">
                    {t.forgot.desc}
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3.5 text-xs font-semibold flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                {successMessage && (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl p-3.5 text-xs font-semibold flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{successMessage}</span>
                  </div>
                )}

                <form onSubmit={handleForgotPassword} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t.emailLabel}
                    </label>
                    <input 
                      type="email" 
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="w-full px-3.5 py-2.5 border border-slate-200 focus:border-[#354CE1] focus:ring-2 focus:ring-[#354CE1]/15 rounded-lg text-xs md:text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-hidden font-medium bg-slate-50/30"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs md:text-sm py-3 rounded-xl transition shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t.forgot.loading}</span>
                      </>
                    ) : (
                      <span>{t.forgot.submit}</span>
                    )}
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button 
                    onClick={() => { setMode('signin'); setError(null); setSuccessMessage(null); }}
                    className="text-[#354CE1] font-semibold hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t.forgot.back}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* SINGLE SIGN-ON / SSO VIEW */}
            {mode === 'sso' && (
              <motion.div
                key="sso"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-display font-bold tracking-tight text-slate-900">
                    {t.sso.title}
                  </h1>
                  <p className="text-xs text-slate-400">
                    {t.sso.desc}
                  </p>
                </div>

                {successMessage && (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl p-3.5 text-xs font-semibold flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{successMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3.5">
                  <button
                    onClick={() => handleSSOLogin('Google')}
                    disabled={isLoading}
                    className="w-full border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs md:text-sm py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <Chrome className="w-4.5 h-4.5 text-rose-500" />
                    <span>{t.sso.google}</span>
                  </button>

                  <button
                    onClick={() => handleSSOLogin('Okta')}
                    disabled={isLoading}
                    className="w-full border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs md:text-sm py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <Fingerprint className="w-4.5 h-4.5 text-sky-500" />
                    <span>{t.sso.okta}</span>
                  </button>

                  <button
                    onClick={() => handleSSOLogin('OneLogin')}
                    disabled={isLoading}
                    className="w-full border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs md:text-sm py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <ShieldAlert className="w-4.5 h-4.5 text-blue-500" />
                    <span>{t.sso.oneLogin}</span>
                  </button>

                  <button
                    onClick={() => handleSSOLogin('SAML')}
                    disabled={isLoading}
                    className="w-full border border-slate-200 hover:border-slate-350 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs md:text-sm py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <Lock className="w-4.5 h-4.5 text-slate-500" />
                    <span>{t.sso.saml}</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button 
                    onClick={() => { setMode('signin'); setError(null); setSuccessMessage(null); }}
                    className="text-[#354CE1] font-semibold hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t.sso.back}</span>
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Bottom subtle compliance disclaimer */}
        <div className="absolute bottom-6 left-6 sm:left-12 md:left-20 lg:left-16 xl:left-28 text-[10.5px] text-slate-400 font-medium">
          {t.compliance}
        </div>

      </div>

      {/* Right Column: Beautiful Authentic Premium Brand Gradient Split Pane */}
      <div className="hidden lg:block lg:w-[50%] bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] min-h-screen relative overflow-hidden select-none">
        
        {/* Subtle radial light pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute top-1/4 left-1/10 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        
        {/* Large stylized asterisk graphic pattern echoing Identra's visual identity */}
        <div className="absolute -top-16 -right-16 w-96 h-96 opacity-15 text-white select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="6.34" y1="6.34" x2="17.66" y2="17.66" />
            <line x1="6.34" y1="17.66" x2="17.66" y2="6.34" />
          </svg>
        </div>

        {/* Centerpiece Info Feature Card mirroring identra's brand design language */}
        <div className="absolute inset-0 flex flex-col justify-center px-16 xl:px-24 text-white z-10 space-y-8 select-none">
          
          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              <span className="text-yellow-300">{t.sidePanel.badge}</span>
            </div>
            
            <h2 className="text-3xl xl:text-4xl font-display font-bold leading-tight">
              {t.sidePanel.titleLine1} <br />{t.sidePanel.titleLine2}
            </h2>
            
            <p className="text-sm text-indigo-50 leading-relaxed font-normal">
              {t.sidePanel.desc}
            </p>
          </div>

          {/* Bullet metrics representing true high-quality outcomes */}
          <div className="grid grid-cols-2 gap-6 max-w-md pt-4">
            {t.sidePanel.metrics.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="text-2xl font-black font-display text-white">{metric.value}</p>
                <p className="text-[10px] uppercase tracking-wider font-bold text-indigo-100">{metric.label}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Absolute bottom visual subtle note */}
        <div className="absolute bottom-6 right-12 text-[10px] font-bold text-indigo-100/75 select-none uppercase tracking-widest">
          {t.sidePanel.copyright}
        </div>

      </div>

    </div>
  );
}
