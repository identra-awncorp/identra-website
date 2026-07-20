/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SUPPORTED_LOCALES, type AppView } from '../types/routes';
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { 
  Menu, X, ChevronDown, ArrowRight, Shield, ShieldCheck,
  Split, Sliders, Radio, FolderHeart, Network, Shuffle, Sparkles, Puzzle, 
  FileBadge, ScanLine, ScanEye, Smile, Database, PhoneCall, Smartphone, 
  EyeOff, Newspaper, UserCheck, PhoneOff, MapPin, Globe,
  ClipboardCheck, Share2, Briefcase, ShieldAlert, Calendar, ListChecks, 
  RefreshCw, Landmark, ShoppingBag, HeartPulse, CreditCard, Coins, 
  Building, Building2, BookOpen, GraduationCap, CheckCircle, HeartHandshake, Users,
  Search, Video, HelpCircle, Lock, FileCode, Code, Gauge, Asterisk, Shapes, MessageSquare, FileText
} from 'lucide-react';
import { NavItem } from '../types';
import { HEADER_COPY_KEYS, MENU_TRANSLATIONS } from '../translations/HeaderTranslations';
import identraLogo from '../assets/images/identra-logo.svg';

const PLATFORM_ITEMS = [
  { label: HEADER_COPY_KEYS.dynamicFlow, subtitle: HEADER_COPY_KEYS.identityDataCollection, icon: 'Split', href: '#flow' },
  { label: HEADER_COPY_KEYS.relay, subtitle: HEADER_COPY_KEYS.eligibilityAssurance, icon: 'ShieldCheck', href: '#relay' },
  { label: HEADER_COPY_KEYS.flowEditor, subtitle: HEADER_COPY_KEYS.noCodeUiBuilder, icon: 'Sliders', href: '#flow' },
  { label: HEADER_COPY_KEYS.passiveSignals, subtitle: HEADER_COPY_KEYS.behavioralDeviceData, icon: 'Radio', href: '#passive-signals' },
  { label: HEADER_COPY_KEYS.caseManagement, subtitle: HEADER_COPY_KEYS.manualReviewHub, icon: 'FolderHeart', href: '#cases' },
  { label: HEADER_COPY_KEYS.graph, subtitle: HEADER_COPY_KEYS.linkAnalysisForFraud, icon: 'Network', href: '#graph' },
  { label: HEADER_COPY_KEYS.workflows, subtitle: HEADER_COPY_KEYS.processAutomation, icon: 'Shuffle', href: '#workflows' },
  { label: HEADER_COPY_KEYS.copilot, subtitle: HEADER_COPY_KEYS.aiDrivenAgents, icon: 'Sparkles', href: '#copilot' },
  { label: HEADER_COPY_KEYS.identraMarketplace, subtitle: HEADER_COPY_KEYS.partnerIntegrations, icon: 'Puzzle', href: '#marketplace' },
];

const VERIFICATION_ITEMS = [
  { label: HEADER_COPY_KEYS.governmentId, icon: 'FileBadge', href: '#verifications' },
  { label: HEADER_COPY_KEYS.documentAi, icon: 'ScanLine', href: '#document-ai' },
  { label: HEADER_COPY_KEYS.selfieLiveness, icon: 'ScanEye', href: '#selfie-age-estimation' },
  { label: HEADER_COPY_KEYS.selfieRecognition, icon: 'Smile', href: '#selfie-recognition' },
  { label: HEADER_COPY_KEYS.databaseChecks, icon: 'Database', href: '#database-checks' },
  { label: HEADER_COPY_KEYS.phoneEmail, icon: 'PhoneCall', href: '#phone-email' },
  { label: HEADER_COPY_KEYS.mobileDriversLicense, icon: 'Smartphone', href: '#mobile-drivers-license' },
  { label: HEADER_COPY_KEYS.nfc, icon: 'Radio', href: '#nfc' },
];

const RISK_ITEMS = [
  { label: HEADER_COPY_KEYS.watchlists, icon: 'EyeOff', href: '#watchlists' },
  { label: HEADER_COPY_KEYS.adverseMedia, icon: 'Newspaper', href: '#adverse-media' },
  { label: HEADER_COPY_KEYS.profileReport, icon: 'UserCheck', href: '#profile-report' },
  { label: HEADER_COPY_KEYS.phoneEmailRisk, icon: 'PhoneOff', href: '#phone-email-risk' },
  { label: HEADER_COPY_KEYS.addressLookup, icon: 'MapPin', href: '#address-lookup' },
  { label: HEADER_COPY_KEYS.socialMediaLookup, icon: 'Globe', href: '#social-media-lookup' },
];

const SOLUTIONS_USE_CASES = [
  { label: HEADER_COPY_KEYS.amlKycCompliance, icon: 'ClipboardCheck', href: '#verifications' },
  { label: HEADER_COPY_KEYS.shareableKyc, icon: 'Share2', href: '#relay' },
  { label: HEADER_COPY_KEYS.knowYourBusinessKyb, icon: 'Briefcase', href: '#kyb' },
  { label: HEADER_COPY_KEYS.businessFraudPrevention, icon: 'ShieldAlert', href: '#business-fraud' },
  { label: HEADER_COPY_KEYS.ageAssurance, icon: 'Calendar', href: '#age-assurance' },
  { label: HEADER_COPY_KEYS.candidateVerification, icon: 'UserCheck', href: '#candidate-verification' },
  { label: HEADER_COPY_KEYS.workforceIdv, icon: 'Users', href: '#workforce-idv' },
  { label: HEADER_COPY_KEYS.backgroundChecks, icon: 'Shield', href: '#background-checks' },
  { label: HEADER_COPY_KEYS.manualReview, icon: 'ListChecks', href: '#manual-review' },
  { label: HEADER_COPY_KEYS.reverification, icon: 'RefreshCw', href: '#reverification' },
];

const SOLUTIONS_INDUSTRIES = [
  { label: HEADER_COPY_KEYS.fintech, icon: 'Landmark', href: '#fintech' },
  { label: HEADER_COPY_KEYS.marketplaces, icon: 'ShoppingBag', href: '#marketplaces' },
  { label: HEADER_COPY_KEYS.digitalHealth, icon: 'HeartPulse', href: '#digital-health' },
  { label: HEADER_COPY_KEYS.payments, icon: 'CreditCard', href: '#payments' },
  { label: HEADER_COPY_KEYS.cryptocurrency, icon: 'Coins', href: '#cryptocurrency' },
  { label: HEADER_COPY_KEYS.government, icon: 'Building', href: '#government' },
  { label: HEADER_COPY_KEYS.financialInstitutions, icon: 'Building2', href: '#financial-institutions' },
  { label: HEADER_COPY_KEYS.eLearning, icon: 'BookOpen', href: '#e-learning' },
  { label: HEADER_COPY_KEYS.higherEducation, icon: 'GraduationCap', href: '#higher-education' },
];

const SOLUTIONS_GOALS = [
  { label: HEADER_COPY_KEYS.compliance, icon: 'CheckCircle', href: '#' },
  { label: HEADER_COPY_KEYS.trustSafety, icon: 'HeartHandshake', href: '#' },
  { label: HEADER_COPY_KEYS.fraudPrevention, icon: 'ShieldAlert', href: '#' },
  { label: HEADER_COPY_KEYS.globalExpansion, icon: 'Globe', href: '#' },
];

const COMPANY_LEARNING_ITEMS = [
  { label: HEADER_COPY_KEYS.resourceCenter, icon: 'Search', href: '#resource-center', isNew: true },
  { label: HEADER_COPY_KEYS.demo, icon: 'Sparkles', href: '#demo', isNew: true },
  { label: HEADER_COPY_KEYS.blog, icon: 'Newspaper', href: '#blog' },
  { label: HEADER_COPY_KEYS.ebooksReports, icon: 'BookOpen', href: '#ebooks' },
  { label: HEADER_COPY_KEYS.webinarsVideos, icon: 'Video', href: '#' },
  { label: HEADER_COPY_KEYS.identityGlossary, icon: 'BookOpen', href: '#' },
  { label: HEADER_COPY_KEYS.helpCenter, icon: 'HelpCircle', href: '#' },
  { label: HEADER_COPY_KEYS.identraAcademy, icon: 'GraduationCap', href: '#academy' },
];

const COMPANY_MENU_ITEMS = [
  { label: HEADER_COPY_KEYS.about, icon: 'Asterisk', href: '#about' },
  { label: HEADER_COPY_KEYS.industryRecognitions, icon: 'Shapes', href: '#' },
  { label: HEADER_COPY_KEYS.events, icon: 'Calendar', href: '#events' },
  { label: HEADER_COPY_KEYS.careers, icon: 'Briefcase', href: '#careers' },
  { label: HEADER_COPY_KEYS.contact, icon: 'MessageSquare', href: '#contact' },
  { label: HEADER_COPY_KEYS.partners, icon: 'HeartHandshake', href: '#partners' },
  { label: HEADER_COPY_KEYS.privacyOverview, icon: 'Lock', href: '#' },
  { label: HEADER_COPY_KEYS.security, icon: 'Shield', href: '#security' },
];

const COMPANY_DEVELOPERS_ITEMS = [
  { label: HEADER_COPY_KEYS.whitePaper, icon: 'FileText', href: '#white-paper' },
  { label: HEADER_COPY_KEYS.documentation, icon: 'FileCode', href: '#' },
  { label: HEADER_COPY_KEYS.apiReference, icon: 'Code', href: '#' },
  { label: HEADER_COPY_KEYS.serviceStatus, icon: 'Gauge', href: '#' },
];

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Split,
  ShieldCheck,
  Sliders,
  Radio,
  FolderHeart,
  Network,
  Shuffle,
  Sparkles,
  Puzzle,
  FileBadge,
  ScanLine,
  ScanEye,
  Smile,
  Database,
  PhoneCall,
  Smartphone,
  EyeOff,
  Newspaper,
  UserCheck,
  PhoneOff,
  MapPin,
  Globe,
  ClipboardCheck,
  Share2,
  Briefcase,
  ShieldAlert,
  Calendar,
  ListChecks,
  RefreshCw,
  Landmark,
  ShoppingBag,
  HeartPulse,
  CreditCard,
  Coins,
  Building,
  Building2,
  BookOpen,
  GraduationCap,
  CheckCircle,
  HeartHandshake,
  Shield,
  Users,
  Search,
  Video,
  HelpCircle,
  Lock,
  FileCode,
  Code,
  Gauge,
  FileText,
  Asterisk,
  Shapes,
  MessageSquare
};

interface HeaderProps {
  onOpenSandbox: () => void;
  onViewChange?: (view: AppView) => void;
  currentView?: AppView;
}

const NAVIGATION_ITEMS: NavItem[] = [
  { label: HEADER_COPY_KEYS.platform, href: '#platform' },
  {
    label: HEADER_COPY_KEYS.products,
    children: [
      { label: HEADER_COPY_KEYS.verifications, description: HEADER_COPY_KEYS.descVerifications, href: '#verifications' },
      { label: HEADER_COPY_KEYS.flowEditor, description: HEADER_COPY_KEYS.descFlowEditor, href: '#flow' },
      { label: HEADER_COPY_KEYS.workflows, description: HEADER_COPY_KEYS.descWorkflows, href: '#workflows' },
      { label: HEADER_COPY_KEYS.relay, description: HEADER_COPY_KEYS.descRelay, href: '#relay' },
      { label: HEADER_COPY_KEYS.cases, description: HEADER_COPY_KEYS.descCases, href: '#cases' },
      { label: HEADER_COPY_KEYS.passiveSignalsTitle, description: HEADER_COPY_KEYS.descPassiveSignals, href: '#passive-signals' },
      { label: HEADER_COPY_KEYS.graph, description: HEADER_COPY_KEYS.descGraph, href: '#graph' },
      { label: HEADER_COPY_KEYS.copilot, description: HEADER_COPY_KEYS.descCopilot, href: '#copilot' },
      { label: HEADER_COPY_KEYS.identraMarketplace, description: HEADER_COPY_KEYS.descMarketplace, href: '#marketplace' },
    ]
  },
  {
    label: HEADER_COPY_KEYS.solutions,
    children: [
      { label: HEADER_COPY_KEYS.byIndustry, description: HEADER_COPY_KEYS.descByIndustry, href: '#' },
      { label: HEADER_COPY_KEYS.byUseCase, description: HEADER_COPY_KEYS.descByUseCase, href: '#' },
    ]
  },
  { label: HEADER_COPY_KEYS.customers, href: '#' },
  { label: HEADER_COPY_KEYS.pricing, href: '#' },
  { label: HEADER_COPY_KEYS.research, href: '#research' },
  {
    label: HEADER_COPY_KEYS.company,
    children: [
      { label: HEADER_COPY_KEYS.about, description: HEADER_COPY_KEYS.descAbout, href: '#about' },
      { label: HEADER_COPY_KEYS.careers, description: HEADER_COPY_KEYS.descCareers, href: '#careers' },
      { label: HEADER_COPY_KEYS.contact, description: HEADER_COPY_KEYS.descContact, href: '#contact' },
      { label: HEADER_COPY_KEYS.partners, description: HEADER_COPY_KEYS.descPartners, href: '#partners' },
      { label: HEADER_COPY_KEYS.security, description: HEADER_COPY_KEYS.descSecurity, href: '#security' },
      { label: HEADER_COPY_KEYS.privacyOverview, description: HEADER_COPY_KEYS.descPrivacyOverview, href: '#privacy-overview' },
      { label: HEADER_COPY_KEYS.demo, description: HEADER_COPY_KEYS.descDemo, href: '#demo' },
      { label: HEADER_COPY_KEYS.resourceCenter, description: HEADER_COPY_KEYS.descResourceCenter, href: '#resource-center' },
      { label: HEADER_COPY_KEYS.ebooksReports, description: HEADER_COPY_KEYS.descEbooksReports, href: '#ebooks' },
      { label: HEADER_COPY_KEYS.identraAcademy, description: HEADER_COPY_KEYS.descIdentraAcademy, href: '#academy' },
      { label: HEADER_COPY_KEYS.blog, description: HEADER_COPY_KEYS.descBlog, href: '#blog' },
    ]
  }
];

export default function Header({ onOpenSandbox, onViewChange, currentView }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<Record<number, boolean>>({});
  const [expandedSolutionsSubMenus, setExpandedSolutionsSubMenus] = useState<Record<string, boolean>>({});
  const [expandedProductsSubMenus, setExpandedProductsSubMenus] = useState<Record<string, boolean>>({});
  const [expandedCompanySubMenus, setExpandedCompanySubMenus] = useState<Record<string, boolean>>({});
  const [unavailableNoticeVisible, setUnavailableNoticeVisible] = useState(false);
  const unavailableNoticeTimerRef = useRef<number | null>(null);

  const tm = (key: string): string => {
    const langObj = getLocalizedRecord(MENU_TRANSLATIONS, language as keyof typeof MENU_TRANSLATIONS, 'MENU_TRANSLATIONS');
    return langObj[key] || key;
  };

  useEffect(() => {
    return () => {
      if (unavailableNoticeTimerRef.current !== null) {
        window.clearTimeout(unavailableNoticeTimerRef.current);
      }
    };
  }, []);

  const showUnavailableNotice = () => {
    if (unavailableNoticeTimerRef.current !== null) {
      window.clearTimeout(unavailableNoticeTimerRef.current);
    }

    setUnavailableNoticeVisible(true);
    unavailableNoticeTimerRef.current = window.setTimeout(() => {
      setUnavailableNoticeVisible(false);
      unavailableNoticeTimerRef.current = null;
    }, 3200);
  };

  const handleUnavailableNavigation = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    showUnavailableNotice();
  };

  const handleSolutionsItemClick = (e: React.MouseEvent, type: 'useCase' | 'industry' | 'goal', label: string, href: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    
    if (!onViewChange) {
      handleUnavailableNavigation();
      return;
    }

    if (type === 'useCase') {
      if (label === HEADER_COPY_KEYS.amlKycCompliance) {
        onViewChange('compliance');
      } else if (label === HEADER_COPY_KEYS.shareableKyc) {
        onViewChange('connect');
      } else if (label === HEADER_COPY_KEYS.knowYourBusinessKyb) {
        onViewChange('kyb');
      } else if (label === HEADER_COPY_KEYS.businessFraudPrevention || href === '#business-fraud') {
        onViewChange('business-fraud');
      } else if (label === HEADER_COPY_KEYS.ageAssurance || href === '#age-assurance') {
        onViewChange('age-assurance');
      } else if (label === HEADER_COPY_KEYS.candidateVerification || href === '#candidate-verification') {
        onViewChange('candidate-verification');
      } else if (label === HEADER_COPY_KEYS.workforceIdv || href === '#workforce-idv') {
        onViewChange('workforce-idv');
      } else if (label === HEADER_COPY_KEYS.backgroundChecks || href === '#background-checks') {
        onViewChange('background-checks');
      } else if (label === HEADER_COPY_KEYS.reverification || href === '#reverification') {
        onViewChange('reverification');
      } else if (label === HEADER_COPY_KEYS.manualReview || href === '#cases') {
        onViewChange('case-management');
      } else if (label.includes('compliance') || label.includes('KYC') || label.includes('fraud') || label.includes('review')) {
        onViewChange('government-id');
      } else {
        handleUnavailableNavigation();
      }
    } else if (type === 'industry') {
      if (label === HEADER_COPY_KEYS.fintech) {
        onViewChange('fintech');
      } else if (label === HEADER_COPY_KEYS.marketplaces) {
        onViewChange('marketplaces');
      } else if (label === HEADER_COPY_KEYS.digitalHealth) {
        onViewChange('digital-health');
      } else if (label === HEADER_COPY_KEYS.payments) {
        onViewChange('payments');
      } else if (label === HEADER_COPY_KEYS.cryptocurrency) {
        onViewChange('cryptocurrency');
      } else if (label === HEADER_COPY_KEYS.government) {
        onViewChange('government');
      } else if (label === HEADER_COPY_KEYS.financialInstitutions) {
        onViewChange('financial-institutions');
      } else if (label === HEADER_COPY_KEYS.eLearning) {
        onViewChange('e-learning');
      } else if (label === HEADER_COPY_KEYS.higherEducation) {
        onViewChange('higher-education');
      } else {
        handleUnavailableNavigation();
      }
    } else if (type === 'goal') {
      if (label === HEADER_COPY_KEYS.compliance) {
        onViewChange('compliance-goal');
      } else if (label === HEADER_COPY_KEYS.trustSafety) {
        onViewChange('trust');
      } else if (label === HEADER_COPY_KEYS.fraudPrevention) {
        onViewChange('fraud-prevent');
      } else if (label === HEADER_COPY_KEYS.globalExpansion) {
        onViewChange('global-expansion');
      } else {
        handleUnavailableNavigation();
      }
    }
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(prev => (prev === label ? null : label));
  };

  const handleItemClick = (e: React.MouseEvent, label: string, href: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    
    if (!onViewChange) {
      handleUnavailableNavigation();
      return;
    }

    const lowercaseLabel = label.toLowerCase();
    if (lowercaseLabel.includes('white paper') || lowercaseLabel.includes('whitepaper') || lowercaseLabel.includes('sách trắng') || href === '#white-paper') {
      onViewChange('white-paper');
    } else if (lowercaseLabel.includes('about') || href === '#about') {
      onViewChange('about');
    } else if (lowercaseLabel.includes('career') || href === '#careers') {
      onViewChange('careers');
    } else if (lowercaseLabel.includes('contact') || href === '#contact') {
      onViewChange('contact');
    } else if (lowercaseLabel.includes('partner') || href === '#partners') {
      onViewChange('partners');
    } else if (lowercaseLabel.includes('security') || href === '#security') {
      onViewChange('security');
    } else if (lowercaseLabel.includes('event') || href === '#events') {
      onViewChange('events');
    } else if (lowercaseLabel.includes('blog') || href === '#blog') {
      onViewChange('blog');
    } else if (lowercaseLabel.includes('e-books') || lowercaseLabel.includes('ebook') || href === '#ebooks') {
      onViewChange('ebooks');
    } else if (lowercaseLabel.includes('doc') || lowercaseLabel.includes('api reference') || href === '#docs') {
      onViewChange('docs');
    } else if (lowercaseLabel.includes('workflow') || href === '#workflows') {
      onViewChange('workflows');
    } else if (lowercaseLabel.includes('copilot') || href === '#copilot') {
      onViewChange('copilot');
    } else if (lowercaseLabel === 'marketplaces' || href === '#marketplaces') {
      onViewChange('marketplaces');
    } else if (lowercaseLabel.includes('marketplace') || href === '#marketplace') {
      onViewChange('marketplace');
    } else if (lowercaseLabel.includes('document-ai') || lowercaseLabel.includes('document ai') || href === '#document-ai') {
      onViewChange('document-ai');
    } else if (lowercaseLabel.includes('selfie recognition') || lowercaseLabel.includes('selfie-recognition') || href === '#selfie-recognition') {
      onViewChange('selfie-recognition');
    } else if (lowercaseLabel.includes('selfie liveness') || lowercaseLabel.includes('selfie-age-estimation') || lowercaseLabel.includes('selfie age estimation') || href === '#selfie-age-estimation') {
      onViewChange('selfie-age-estimation');
    } else if (lowercaseLabel.includes('database checks') || lowercaseLabel.includes('database-checks') || href === '#database-checks') {
      onViewChange('database-checks');
    } else if (lowercaseLabel.includes('phone & email risk') || lowercaseLabel.includes('phone-email-risk') || href === '#phone-email-risk') {
      onViewChange('phone-email-risk');
    } else if (lowercaseLabel.includes('address lookup') || lowercaseLabel.includes('social-media-lookup') || lowercaseLabel.includes('social media lookup') || href === '#social-media-lookup') {
      onViewChange('social-media-lookup');
    } else if (lowercaseLabel.includes('address-lookup') || href === '#address-lookup') {
      onViewChange('address-lookup');
    } else if (lowercaseLabel.includes('age assurance') || lowercaseLabel.includes('age-assurance') || href === '#age-assurance') {
      onViewChange('age-assurance');
    } else if (lowercaseLabel.includes('candidate verification') || lowercaseLabel.includes('candidate-verification') || href === '#candidate-verification') {
      onViewChange('candidate-verification');
    } else if (lowercaseLabel.includes('workforce idv') || lowercaseLabel.includes('workforce-idv') || href === '#workforce-idv') {
      onViewChange('workforce-idv');
    } else if (lowercaseLabel.includes('background checks') || lowercaseLabel.includes('background-checks') || href === '#background-checks') {
      onViewChange('background-checks');
    } else if (lowercaseLabel.includes('reverification') || href === '#reverification') {
      onViewChange('reverification');
    } else if (lowercaseLabel.includes('manual review') || lowercaseLabel.includes('manual-review') || href === '#manual-review') {
      onViewChange('manual-review');
    } else if (lowercaseLabel.includes('fintech') || href === '#fintech') {
      onViewChange('fintech');
    } else if (lowercaseLabel.includes('cryptocurrency') || lowercaseLabel.includes('crypto') || href === '#cryptocurrency') {
      onViewChange('cryptocurrency');
    } else if (lowercaseLabel.includes('government') || href === '#government') {
      onViewChange('government');
    } else if (lowercaseLabel.includes('financial institutions') || lowercaseLabel.includes('financial-institutions') || href === '#financial-institutions') {
      onViewChange('financial-institutions');
    } else if (lowercaseLabel.includes('e-learning') || lowercaseLabel.includes('elearning') || href === '#e-learning') {
      onViewChange('e-learning');
    } else if (lowercaseLabel.includes('higher education') || lowercaseLabel.includes('higher-education') || href === '#higher-education') {
      onViewChange('higher-education');
    } else if (lowercaseLabel.includes('trust') || lowercaseLabel.includes('trust & safety') || href === '#trust') {
      onViewChange('trust');
    } else if (lowercaseLabel.includes('digital health') || lowercaseLabel.includes('digital-health') || href === '#digital-health') {
      onViewChange('digital-health');
    } else if (lowercaseLabel.includes('phone & email') || lowercaseLabel.includes('phone and email') || lowercaseLabel.includes('phone-email') || href === '#phone-email') {
      onViewChange('phone-email');
    } else if (lowercaseLabel.includes('mobile driver') || lowercaseLabel.includes('license') || href === '#mobile-drivers-license') {
      onViewChange('mobile-drivers-license');
    } else if (lowercaseLabel.includes('watchlist') || href === '#watchlists') {
      onViewChange('watchlists');
    } else if (lowercaseLabel.includes('adverse media') || lowercaseLabel.includes('adverse-media') || href === '#adverse-media') {
      onViewChange('adverse-media');
    } else if (lowercaseLabel.includes('profile report') || lowercaseLabel.includes('profile-report') || href === '#profile-report') {
      onViewChange('profile-report');
    } else if (lowercaseLabel.includes('resource center') || lowercaseLabel.includes('resource-center') || href === '#resource-center') {
      onViewChange('resource-center');
    } else if (lowercaseLabel.includes('privacy overview') || lowercaseLabel.includes('privacy-overview') || href === '#privacy-overview') {
      onViewChange('privacy-overview');
    } else if (lowercaseLabel === 'demo' || href === '#demo') {
      onViewChange('demo');
    } else if (lowercaseLabel.includes('academy') || href === '#academy') {
      onViewChange('academy');
    } else {
      handleUnavailableNavigation();
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string, href: string) => {
    if (onViewChange && (label === HEADER_COPY_KEYS.whitePaper || label.toLowerCase().includes('white paper') || label.toLowerCase().includes('sách trắng') || href === '#white-paper')) {
      e.preventDefault();
      onViewChange('white-paper');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === 'About us' || label === HEADER_COPY_KEYS.about || href === '#about')) {
      e.preventDefault();
      onViewChange('about');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.verifications || label === 'Verify' || href === '#verifications' || label === HEADER_COPY_KEYS.governmentId)) {
      e.preventDefault();
      onViewChange('government-id');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.documentAi || label === 'document-ai' || href === '#document-ai')) {
      e.preventDefault();
      onViewChange('document-ai');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.selfieLiveness || label === 'Selfie age estimation' || href === '#selfie-age-estimation')) {
      e.preventDefault();
      onViewChange('selfie-age-estimation');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.selfieRecognition || label === 'Selfie Recognition' || href === '#selfie-recognition')) {
      e.preventDefault();
      onViewChange('selfie-recognition');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.databaseChecks || label === 'Database Checks' || href === '#database-checks')) {
      e.preventDefault();
      onViewChange('database-checks');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label.toLowerCase().includes('phone & email risk') || label.toLowerCase().includes('phone-email-risk') || href === '#phone-email-risk')) {
      e.preventDefault();
      onViewChange('phone-email-risk');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label.toLowerCase().includes('address lookup') || label.toLowerCase().includes('address-lookup') || href === '#address-lookup')) {
      e.preventDefault();
      onViewChange('address-lookup');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label.toLowerCase().includes('social media') || label.toLowerCase().includes('social-media') || href === '#social-media-lookup')) {
      e.preventDefault();
      onViewChange('social-media-lookup');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label.toLowerCase().includes('age assurance') || label.toLowerCase().includes('age-assurance') || href === '#age-assurance')) {
      e.preventDefault();
      onViewChange('age-assurance');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label.toLowerCase().includes('candidate verification') || label.toLowerCase().includes('candidate-verification') || href === '#candidate-verification')) {
      e.preventDefault();
      onViewChange('candidate-verification');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label.toLowerCase().includes('workforce idv') || label.toLowerCase().includes('workforce-idv') || href === '#workforce-idv')) {
      e.preventDefault();
      onViewChange('workforce-idv');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label.toLowerCase().includes('background checks') || label.toLowerCase().includes('background-checks') || href === '#background-checks')) {
      e.preventDefault();
      onViewChange('background-checks');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label.toLowerCase().includes('reverification') || href === '#reverification')) {
      e.preventDefault();
      onViewChange('reverification');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.phoneEmail || label === 'Phone and email' || label === 'Phone & Email' || href === '#phone-email')) {
      e.preventDefault();
      onViewChange('phone-email');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label.toLowerCase().includes('mobile driver') || label.toLowerCase().includes('license') || href === '#mobile-drivers-license')) {
      e.preventDefault();
      onViewChange('mobile-drivers-license');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label.toLowerCase().includes('watchlist') || href === '#watchlists')) {
      e.preventDefault();
      onViewChange('watchlists');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label.toLowerCase().includes('adverse media') || label.toLowerCase().includes('adverse-media') || href === '#adverse-media')) {
      e.preventDefault();
      onViewChange('adverse-media');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label.toLowerCase().includes('profile report') || label.toLowerCase().includes('profile-report') || href === '#profile-report')) {
      e.preventDefault();
      onViewChange('profile-report');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.relay || href === '#relay')) {
      e.preventDefault();
      onViewChange('relay');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.pricing || href === '#pricing')) {
      e.preventDefault();
      onViewChange('pricing');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.blog || label === 'Blog' || href === '#blog')) {
      e.preventDefault();
      onViewChange('blog');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === 'Ebooks & Reports' || label === 'Ebooks' || href === '#ebooks')) {
      e.preventDefault();
      onViewChange('ebooks');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.events || href === '#events')) {
      e.preventDefault();
      onViewChange('events');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.careers || href === '#careers')) {
      e.preventDefault();
      onViewChange('careers');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === 'Contact us' || label === HEADER_COPY_KEYS.contact || href === '#contact')) {
      e.preventDefault();
      onViewChange('contact');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.partners || href === '#partners')) {
      e.preventDefault();
      onViewChange('partners');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.security || href === '#security')) {
      e.preventDefault();
      onViewChange('security');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.research || href === '#research')) {
      e.preventDefault();
      onViewChange('research');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.shareableKyc || label === 'Connect' || href === '#connect' || label === 'Reusable KYC')) {
      e.preventDefault();
      onViewChange('connect');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.nfc || href === '#nfc')) {
      e.preventDefault();
      onViewChange('nfc');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.dynamicFlow || label === 'Flow' || label === HEADER_COPY_KEYS.flowEditor || href === '#flow')) {
      e.preventDefault();
      onViewChange('dynamic-flow');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.platform || label === 'Platform Overview' || href === '#platform')) {
      e.preventDefault();
      onViewChange('platform');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.customers || href === '#customers')) {
      e.preventDefault();
      onViewChange('customers');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.knowYourBusinessKyb || label === 'KYB' || href === '#kyb')) {
      e.preventDefault();
      onViewChange('kyb');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.businessFraudPrevention || href === '#business-fraud')) {
      e.preventDefault();
      onViewChange('business-fraud');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.passiveSignals || label === HEADER_COPY_KEYS.passiveSignalsTitle || href === '#passive-signals')) {
      e.preventDefault();
      onViewChange('passive-signals');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.caseManagement || label === HEADER_COPY_KEYS.cases || href === '#cases')) {
      e.preventDefault();
      onViewChange('case-management');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.manualReview || label === 'manual-review' || href === '#manual-review')) {
      e.preventDefault();
      onViewChange('manual-review');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.fintech || label === 'fintech' || href === '#fintech')) {
      e.preventDefault();
      onViewChange('fintech');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.cryptocurrency || label === 'cryptocurrency' || label === 'Crypto' || href === '#cryptocurrency')) {
      e.preventDefault();
      onViewChange('cryptocurrency');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.digitalHealth || label === 'Digital Health' || label === 'digital-health' || href === '#digital-health')) {
      e.preventDefault();
      onViewChange('digital-health');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.marketplaces || label === 'marketplaces' || href === '#marketplaces')) {
      e.preventDefault();
      onViewChange('marketplaces');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.payments || label === 'payments' || href === '#payments')) {
      e.preventDefault();
      onViewChange('payments');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.graph || href === '#graph')) {
      e.preventDefault();
      onViewChange('graph');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.workflows || href === '#workflows')) {
      e.preventDefault();
      onViewChange('workflows');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.copilot || label === 'copilot' || href === '#copilot')) {
      e.preventDefault();
      onViewChange('copilot');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.identraMarketplace || label === 'marketplace' || href === '#marketplace')) {
      e.preventDefault();
      onViewChange('marketplace');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.government || label === 'government' || href === '#government')) {
      e.preventDefault();
      onViewChange('government');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.financialInstitutions || label === 'financial-institutions' || href === '#financial-institutions')) {
      e.preventDefault();
      onViewChange('financial-institutions');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.eLearning || label === 'e-learning' || href === '#e-learning')) {
      e.preventDefault();
      onViewChange('e-learning');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.higherEducation || label === 'higher-education' || href === '#higher-education')) {
      e.preventDefault();
      onViewChange('higher-education');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.trustSafety || label === 'Trust' || label === 'trust' || href === '#trust')) {
      e.preventDefault();
      onViewChange('trust');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.fraudPrevention || label === 'fraud-prevent' || label === 'Fraud prevent' || href === '#fraud-prevent')) {
      e.preventDefault();
      onViewChange('fraud-prevent');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.globalExpansion || label === 'global-expansion' || label === 'Global Expansion' || href === '#global-expansion')) {
      e.preventDefault();
      onViewChange('global-expansion');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.resourceCenter || label === 'resource-center' || label === 'Resource Center' || href === '#resource-center')) {
      e.preventDefault();
      onViewChange('resource-center');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.privacyOverview || label === 'Privacy Overview' || label === 'privacy-overview' || href === '#privacy-overview')) {
      e.preventDefault();
      onViewChange('privacy-overview');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.demo || label === 'demo' || href === '#demo')) {
      e.preventDefault();
      onViewChange('demo');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else if (onViewChange && (label === HEADER_COPY_KEYS.identraAcademy || label === 'Academy' || label === 'academy' || href === '#academy')) {
      e.preventDefault();
      onViewChange('academy');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else {
      e.preventDefault();
      handleUnavailableNavigation();
    }
  };

  return (
    <>
    {unavailableNoticeVisible && (
      <div
        role="status"
        aria-live="polite"
        className="fixed right-4 bottom-4 z-[100] max-w-xs rounded-2xl border border-white/15 bg-[#06184C] px-4 py-3 text-xs font-semibold text-white shadow-[0_20px_60px_rgba(6,24,76,0.35)] ring-1 ring-[#5B6DFF]/25"
      >
        {tm(HEADER_COPY_KEYS.pageUnavailableNotice)}
      </div>
    )}
    <header className="w-full z-40 bg-white">
      {/* Top Banner Bar */}
      <a 
        href="#shipped" 
        onClick={(e) => { e.preventDefault(); showUnavailableNotice(); }}
        className="w-full bg-[#E5E9FF] hover:bg-[#D9E0FF] py-2 px-4 flex items-center justify-center gap-2 text-xs text-[#06184C] font-semibold tracking-wide transition text-center"
      >
        <span>{t('shippedBanner')}</span>
        <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
      </a>

      {/* Main Header */}
      <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between border-b border-slate-100 relative">
        {/* Logo */}
        <div 
          onClick={() => onViewChange?.('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <img src={identraLogo} alt={tm(HEADER_COPY_KEYS.identra)} className="h-8 w-8 object-contain" />
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">
            {tm(HEADER_COPY_KEYS.identra)}
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1.5">
          {NAVIGATION_ITEMS.map((item, index) => {
            const translatedLabel = tm(item.label);
            return (
              <div key={index} className="relative">
                {item.children ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition flex items-center gap-1 hover:bg-slate-50 ${
                        activeDropdown === item.label ? 'text-[#354CE1]' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {translatedLabel}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180 text-[#354CE1]' : 'text-slate-400'
                      }`} />
                    </button>

                    {/* Dropdown Box */}
                    {activeDropdown === item.label && item.label !== HEADER_COPY_KEYS.products && item.label !== HEADER_COPY_KEYS.solutions && item.label !== HEADER_COPY_KEYS.company && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setActiveDropdown(null)} 
                        />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 grid grid-cols-1 gap-1 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                          {item.children.map((child, cIdx) => (
                            <a
                              key={cIdx}
                              href={child.href}
                              onClick={(e) => handleLinkClick(e, child.label, child.href)}
                              className="p-3 hover:bg-slate-50 rounded-xl transition flex flex-col gap-0.5"
                            >
                              <span className="text-xs font-semibold text-slate-900 flex items-center justify-between">
                                {tm(child.label)}
                                <ArrowRight className="w-3 h-3 text-slate-300 hover:text-[#354CE1] transition" />
                              </span>
                              <span className="text-[11px] text-slate-500 font-normal leading-normal">
                                {tm(child.description)}
                              </span>
                            </a>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.label, item.href || '')}
                    className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-slate-600 hover:text-[#354CE1] hover:bg-slate-50 transition"
                  >
                    {translatedLabel}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Call to Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Globe/Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="inline-flex items-center gap-2 px-3 py-1 border border-slate-200/80 bg-white hover:bg-slate-50/80 rounded-full transition duration-150 shadow-xs cursor-pointer h-8 select-none"
              title={tm(HEADER_COPY_KEYS.selectLanguage)}
              aria-label={tm(HEADER_COPY_KEYS.selectLanguage)}
              id="lang_switcher_desktop"
            >
              <Globe className="w-3.5 h-3.5 text-[#354CE1] shrink-0" />
              <span className="text-[11px] font-semibold text-slate-700 font-sans tracking-wide">{t(`${language}Name` as any)}</span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400 shrink-0 ml-0.5" />
            </button>

            {langDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangDropdownOpen(false)} />
                <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl shadow-xl border border-slate-100 p-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {SUPPORTED_LOCALES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        language === lang
                          ? 'bg-[#354CE1]/10 text-[#354CE1]'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{t(`${lang}Name` as any)}</span>
                      {language === lang && (
                        <CheckCircle className="w-3 h-3 text-[#354CE1]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button 
            onClick={onOpenSandbox}
            className="text-xs font-semibold text-white bg-black hover:bg-slate-850 px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow transition cursor-pointer"
          >
            {t('getDemo')}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? tm(HEADER_COPY_KEYS.closeMenu) : tm(HEADER_COPY_KEYS.openMenu)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 shadow-xl z-30 lg:hidden flex flex-col gap-4 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              {NAVIGATION_ITEMS.map((item, index) => {
                const translatedLabel = tm(item.label);
                return (
                  <div key={index} className="space-y-1 border-b border-slate-100/60 pb-3 last:border-0 last:pb-0">
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => setExpandedMobileMenus(prev => ({ ...prev, [index]: !prev[index] }))}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#354CE1] text-left cursor-pointer group"
                        >
                          <span>{translatedLabel}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 group-hover:text-slate-600 ${expandedMobileMenus[index] ? 'rotate-180 text-[#354CE1]' : ''}`} />
                        </button>
                        {expandedMobileMenus[index] && (
                          item.label === HEADER_COPY_KEYS.solutions ? (
                            <div className="pl-4 mt-2 border-l border-slate-100 space-y-3 animate-in fade-in slide-in-from-top-1 duration-150">
                              {/* Sub-category: Use cases */}
                              <div>
                                <button
                                  onClick={() => setExpandedSolutionsSubMenus(prev => ({ ...prev, useCases: !prev.useCases }))}
                                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-400 hover:text-[#354CE1] uppercase tracking-wider text-left cursor-pointer group"
                                >
                                  <span>{tm(HEADER_COPY_KEYS.useCases)}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 group-hover:text-slate-600 ${expandedSolutionsSubMenus.useCases ? 'rotate-180 text-[#354CE1]' : ''}`} />
                                </button>
                                {expandedSolutionsSubMenus.useCases && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                    {SOLUTIONS_USE_CASES.map((u, cIdx) => (
                                      <a
                                        key={cIdx}
                                        href={u.href}
                                        onClick={(e) => handleSolutionsItemClick(e, 'useCase', u.label, u.href)}
                                        className="p-1.5 hover:bg-slate-50 rounded-lg transition"
                                      >
                                        <p className="text-xs font-semibold text-slate-800 hover:text-[#354CE1]">{tm(u.label)}</p>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Sub-category: Industries */}
                              <div>
                                <button
                                  onClick={() => setExpandedSolutionsSubMenus(prev => ({ ...prev, industries: !prev.industries }))}
                                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-400 hover:text-[#354CE1] uppercase tracking-wider text-left cursor-pointer group"
                                >
                                  <span>{tm(HEADER_COPY_KEYS.industries)}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 group-hover:text-slate-600 ${expandedSolutionsSubMenus.industries ? 'rotate-180 text-[#354CE1]' : ''}`} />
                                </button>
                                {expandedSolutionsSubMenus.industries && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                    {SOLUTIONS_INDUSTRIES.map((i, cIdx) => (
                                      <a
                                        key={cIdx}
                                        href={i.href}
                                        onClick={(e) => handleSolutionsItemClick(e, 'industry', i.label, i.href)}
                                        className="p-1.5 hover:bg-slate-50 rounded-lg transition"
                                      >
                                        <p className="text-xs font-semibold text-slate-800 hover:text-[#354CE1]">{tm(i.label)}</p>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Sub-category: Business goals */}
                              <div>
                                <button
                                  onClick={() => setExpandedSolutionsSubMenus(prev => ({ ...prev, businessGoals: !prev.businessGoals }))}
                                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-400 hover:text-[#354CE1] uppercase tracking-wider text-left cursor-pointer group"
                                >
                                  <span>{tm(HEADER_COPY_KEYS.businessGoals)}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 group-hover:text-slate-600 ${expandedSolutionsSubMenus.businessGoals ? 'rotate-180 text-[#354CE1]' : ''}`} />
                                </button>
                                {expandedSolutionsSubMenus.businessGoals && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                    {SOLUTIONS_GOALS.map((g, cIdx) => (
                                      <a
                                        key={cIdx}
                                        href={g.href}
                                        onClick={(e) => handleSolutionsItemClick(e, 'goal', g.label, g.href)}
                                        className="p-1.5 hover:bg-slate-50 rounded-lg transition"
                                      >
                                        <p className="text-xs font-semibold text-slate-800 hover:text-[#354CE1]">{tm(g.label)}</p>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : item.label === HEADER_COPY_KEYS.products ? (
                            <div className="pl-4 mt-2 border-l border-slate-100 space-y-3 animate-in fade-in slide-in-from-top-1 duration-150">
                              {/* Sub-category: Platform */}
                              <div>
                                <button
                                  onClick={() => setExpandedProductsSubMenus(prev => ({ ...prev, platform: !prev.platform }))}
                                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-400 hover:text-[#354CE1] uppercase tracking-wider text-left cursor-pointer group"
                                >
                                  <span>{tm(HEADER_COPY_KEYS.platform)}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 group-hover:text-slate-600 ${expandedProductsSubMenus.platform ? 'rotate-180 text-[#354CE1]' : ''}`} />
                                </button>
                                {expandedProductsSubMenus.platform && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                    {PLATFORM_ITEMS.map((p, cIdx) => (
                                      <a
                                        key={cIdx}
                                        href={p.href}
                                        onClick={(e) => handleLinkClick(e, p.label, p.href)}
                                        className="p-1.5 hover:bg-slate-50 rounded-lg transition text-left block"
                                      >
                                        <p className="text-xs font-semibold text-slate-800 hover:text-[#354CE1]">{tm(p.label)}</p>
                                        {p.subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{tm(p.subtitle)}</p>}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Sub-category: Verifications */}
                              <div>
                                <button
                                  onClick={() => setExpandedProductsSubMenus(prev => ({ ...prev, verifications: !prev.verifications }))}
                                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-400 hover:text-[#354CE1] uppercase tracking-wider text-left cursor-pointer group"
                                >
                                  <span>{tm(HEADER_COPY_KEYS.verifications)}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 group-hover:text-slate-600 ${expandedProductsSubMenus.verifications ? 'rotate-180 text-[#354CE1]' : ''}`} />
                                </button>
                                {expandedProductsSubMenus.verifications && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                    {VERIFICATION_ITEMS.map((v, cIdx) => (
                                      <a
                                        key={cIdx}
                                        href={v.href}
                                        onClick={(e) => handleLinkClick(e, v.label, v.href)}
                                        className="p-1.5 hover:bg-slate-50 rounded-lg transition text-left block"
                                      >
                                        <p className="text-xs font-semibold text-slate-800 hover:text-[#354CE1]">{tm(v.label)}</p>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Sub-category: Risk & screening reports */}
                              <div>
                                <button
                                  onClick={() => setExpandedProductsSubMenus(prev => ({ ...prev, risk: !prev.risk }))}
                                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-400 hover:text-[#354CE1] uppercase tracking-wider text-left cursor-pointer group"
                                >
                                  <span>{tm(HEADER_COPY_KEYS.riskScreeningReports)}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 group-hover:text-slate-600 ${expandedProductsSubMenus.risk ? 'rotate-180 text-[#354CE1]' : ''}`} />
                                </button>
                                {expandedProductsSubMenus.risk && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                    {RISK_ITEMS.map((r, cIdx) => (
                                      <a
                                        key={cIdx}
                                        href={r.href}
                                        onClick={(e) => handleLinkClick(e, r.label, r.href)}
                                        className="p-1.5 hover:bg-slate-50 rounded-lg transition text-left block"
                                      >
                                        <p className="text-xs font-semibold text-slate-800 hover:text-[#354CE1]">{tm(r.label)}</p>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : item.label === HEADER_COPY_KEYS.company ? (
                            <div className="pl-4 mt-2 border-l border-slate-100 space-y-3 animate-in fade-in slide-in-from-top-1 duration-150">
                              {/* Sub-category: Learning */}
                              <div>
                                <button
                                  onClick={() => setExpandedCompanySubMenus(prev => ({ ...prev, learning: !prev.learning }))}
                                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-400 hover:text-[#354CE1] uppercase tracking-wider text-left cursor-pointer group"
                                >
                                  <span>{tm(HEADER_COPY_KEYS.learning)}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 group-hover:text-slate-600 ${expandedCompanySubMenus.learning ? 'rotate-180 text-[#354CE1]' : ''}`} />
                                </button>
                                {expandedCompanySubMenus.learning && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                    {COMPANY_LEARNING_ITEMS.map((l, cIdx) => (
                                      <a
                                        key={cIdx}
                                        href={l.href}
                                        onClick={(e) => handleLinkClick(e, l.label, l.href)}
                                        className="p-1.5 hover:bg-slate-50 rounded-lg transition text-left block"
                                      >
                                        <p className="text-xs font-semibold text-slate-800 hover:text-[#354CE1] flex items-center">
                                          {tm(l.label)}
                                          {l.isNew && (
                                            <span className="ml-2 font-sans font-bold text-[8px] text-[#354CE1] tracking-wider px-1 bg-[#354CE1]/10 rounded">{tm(HEADER_COPY_KEYS.new)}</span>
                                          )}
                                        </p>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Sub-category: Company */}
                              <div>
                                <button
                                  onClick={() => setExpandedCompanySubMenus(prev => ({ ...prev, company: !prev.company }))}
                                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-400 hover:text-[#354CE1] uppercase tracking-wider text-left cursor-pointer group"
                                >
                                  <span>{tm(HEADER_COPY_KEYS.company)}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 group-hover:text-slate-600 ${expandedCompanySubMenus.company ? 'rotate-180 text-[#354CE1]' : ''}`} />
                                </button>
                                {expandedCompanySubMenus.company && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                    {COMPANY_MENU_ITEMS.map((c, cIdx) => (
                                      <a
                                        key={cIdx}
                                        href={c.href}
                                        onClick={(e) => handleLinkClick(e, c.label, c.href)}
                                        className="p-1.5 hover:bg-slate-50 rounded-lg transition text-left block"
                                      >
                                        <p className="text-xs font-semibold text-slate-800 hover:text-[#354CE1]">{tm(c.label)}</p>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Sub-category: Developers */}
                              <div>
                                <button
                                  onClick={() => setExpandedCompanySubMenus(prev => ({ ...prev, developers: !prev.developers }))}
                                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-400 hover:text-[#354CE1] uppercase tracking-wider text-left cursor-pointer group"
                                >
                                  <span>{tm(HEADER_COPY_KEYS.developers)}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 group-hover:text-slate-600 ${expandedCompanySubMenus.developers ? 'rotate-180 text-[#354CE1]' : ''}`} />
                                </button>
                                {expandedCompanySubMenus.developers && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                    {COMPANY_DEVELOPERS_ITEMS.map((d, cIdx) => (
                                      <a
                                        key={cIdx}
                                        href={d.href}
                                        onClick={(e) => handleLinkClick(e, d.label, d.href)}
                                        className="p-1.5 hover:bg-slate-50 rounded-lg transition text-left block"
                                      >
                                        <p className="text-xs font-semibold text-slate-800 hover:text-[#354CE1]">{tm(d.label)}</p>
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-4 mt-1 border-l-2 border-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
                              {item.children.map((child, cIdx) => (
                                <a
                                  key={cIdx}
                                  href={child.href}
                                  onClick={(e) => handleLinkClick(e, child.label, child.href)}
                                  className="p-2 hover:bg-slate-50 rounded-lg transition"
                                >
                                  <p className="text-xs font-semibold text-slate-900">{tm(child.label)}</p>
                                  <p className="text-[10px] text-slate-400 mt-0.5">{tm(child.description)}</p>
                                </a>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.label, item.href || '')}
                        className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#354CE1]"
                      >
                        {translatedLabel}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenSandbox(); }}
                className="w-full bg-slate-900 hover:bg-slate-850 text-white font-semibold py-2.5 rounded-full text-sm transition text-center cursor-pointer"
              >
                {t('getDemo')}
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onViewChange?.('login'); }}
                className="w-full border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-full text-sm transition hover:bg-slate-50 cursor-pointer"
              >
                {t('login')}
              </button>

              {/* Mobile Language Selector */}
              <div className="flex items-center justify-between px-3 py-2 border-t border-slate-100 mt-3 pt-4">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-slate-400" />
                  {tm(HEADER_COPY_KEYS.language)}
                </span>
                <div className="flex gap-1 flex-wrap">
                  {SUPPORTED_LOCALES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase transition cursor-pointer ${
                        language === lang
                          ? 'bg-[#354CE1] text-white'
                          : 'text-slate-600 hover:bg-slate-50 bg-slate-100'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Mega Dropdown */}
        {activeDropdown === HEADER_COPY_KEYS.products && (
          <>
            <div 
              className="fixed inset-0 z-20" 
              onClick={() => setActiveDropdown(null)} 
            />
            <div className="absolute top-full left-0 right-0 mt-0 bg-white rounded-b-3xl shadow-2xl p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 z-30 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Left Column: visual block (span 3 of 12) */}
              <div className="col-span-1 lg:col-span-3 bg-[#FAFBFD] p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-full min-h-[380px]">
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {tm(HEADER_COPY_KEYS.buildingBlocksDesc)}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {tm(HEADER_COPY_KEYS.builtByIdentraVol1)}
                  </p>
                </div>
                
                {/* Middle graphic block */}
                <div className="my-4 relative rounded-xl overflow-hidden aspect-[4/3] bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center p-2 border border-slate-200/50">
                  <img 
                    src="/src/assets/images/identra_identity_illustration_1783335932193.jpg" 
                    alt={tm(HEADER_COPY_KEYS.builtByIdentra)} 
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs py-1 px-2.5 rounded-md text-[9px] font-bold text-slate-800 shadow-sm text-center">
                    {tm(HEADER_COPY_KEYS.builtByIdentraVolume01)}
                  </div>
                </div>
                
                <p className="text-[11px] text-[#354CE1] font-semibold flex items-center gap-1 cursor-pointer" onClick={() => { setActiveDropdown(null); if (onViewChange) onViewChange('docs'); }}>
                  <span>{tm(HEADER_COPY_KEYS.exploreBuiltAdapt)}</span>
                  <ArrowRight className="w-3 h-3" />
                </p>
              </div>

              {/* Platform Column (span 3 of 12) */}
              <div className="col-span-1 lg:col-span-3 flex flex-col h-full lg:border-r border-slate-100 lg:pr-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                  {tm(HEADER_COPY_KEYS.platform)}
                </span>
                <div className="grid grid-cols-1 gap-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-none">
                  {PLATFORM_ITEMS.map((p, idx) => {
                    const IconComponent = ICON_MAP[p.icon] || ShieldCheck;
                    return (
                      <a
                        key={idx}
                        href={p.href}
                        onClick={(e) => handleLinkClick(e, p.label, p.href)}
                        className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#354CE1]/10 group-hover:text-[#354CE1] transition shrink-0 mt-0.5">
                           <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-[#354CE1] transition leading-none">
                            {tm(p.label)}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                            {tm(p.subtitle)}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Verifications Column (span 3 of 12) */}
              <div className="col-span-1 lg:col-span-3 flex flex-col h-full lg:border-r border-slate-100 lg:pr-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                  {tm(HEADER_COPY_KEYS.verifications)}
                </span>
                <div className="grid grid-cols-1 gap-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-none">
                  {VERIFICATION_ITEMS.map((v, idx) => {
                    const IconComponent = ICON_MAP[v.icon] || ShieldCheck;
                    return (
                      <a
                        key={idx}
                        href={v.href}
                        onClick={(e) => handleLinkClick(e, v.label, v.href)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#354CE1]/10 group-hover:text-[#354CE1] transition shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#354CE1] transition">
                          {tm(v.label)}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Risk & screening reports Column (span 3 of 12) */}
              <div className="col-span-1 lg:col-span-3 flex flex-col h-full">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                  {tm(HEADER_COPY_KEYS.riskScreeningReports)}
                </span>
                <div className="grid grid-cols-1 gap-1 overflow-y-auto max-h-[400px] scrollbar-none">
                  {RISK_ITEMS.map((r, idx) => {
                    const IconComponent = ICON_MAP[r.icon] || ShieldCheck;
                    return (
                      <a
                        key={idx}
                        href={r.href}
                        onClick={(e) => handleLinkClick(e, r.label, r.href)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#354CE1]/10 group-hover:text-[#354CE1] transition shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#354CE1] transition">
                          {tm(r.label)}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Solutions Mega Dropdown */}
        {activeDropdown === HEADER_COPY_KEYS.solutions && (
          <>
            <div 
              className="fixed inset-0 z-20" 
              onClick={() => setActiveDropdown(null)} 
            />
            <div className="absolute top-full left-0 right-0 mt-0 bg-white rounded-b-3xl shadow-2xl p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 z-30 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Left Column: visual block (span 3 of 12) */}
              <div className="col-span-1 lg:col-span-3 bg-[#FAFBFD] p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-full min-h-[380px]">
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {tm(HEADER_COPY_KEYS.scalableIdentitySolutions)}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {tm(HEADER_COPY_KEYS.identraFramework)}
                  </p>
                </div>
                
                {/* Middle graphic block */}
                <div className="my-4 relative rounded-xl overflow-hidden aspect-[4/3] bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center p-2 border border-slate-200/50">
                  <img 
                    src="/src/assets/images/identra_event_networking_1783338372214.jpg" 
                    alt={tm(HEADER_COPY_KEYS.identraSolutions)} 
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs py-1 px-2.5 rounded-md text-[9px] font-bold text-slate-800 shadow-sm text-center">
                    {tm(HEADER_COPY_KEYS.integratedVerification)}
                  </div>
                </div>
                
                <p className="text-[11px] text-[#354CE1] font-semibold flex items-center gap-1 cursor-pointer" onClick={handleUnavailableNavigation}>
                  <span>{tm(HEADER_COPY_KEYS.helpOrganizationsAdapt)}</span>
                  <ArrowRight className="w-3 h-3" />
                </p>
              </div>

              {/* Use cases Column (span 3 of 12) */}
              <div className="col-span-1 lg:col-span-3 flex flex-col h-full lg:border-r border-slate-100 lg:pr-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                  {tm(HEADER_COPY_KEYS.useCases)}
                </span>
                <div className="grid grid-cols-1 gap-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-none">
                  {SOLUTIONS_USE_CASES.map((u, idx) => {
                    const IconComponent = ICON_MAP[u.icon] || ShieldCheck;
                    return (
                      <a
                        key={idx}
                        href={u.href}
                        onClick={(e) => handleSolutionsItemClick(e, 'useCase', u.label, u.href)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#354CE1]/10 group-hover:text-[#354CE1] transition shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#354CE1] transition">
                          {tm(u.label)}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Industries Column (span 3 of 12) */}
              <div className="col-span-1 lg:col-span-3 flex flex-col h-full lg:border-r border-slate-100 lg:pr-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                  {tm(HEADER_COPY_KEYS.industries)}
                </span>
                <div className="grid grid-cols-1 gap-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-none">
                  {SOLUTIONS_INDUSTRIES.map((i, idx) => {
                    const IconComponent = ICON_MAP[i.icon] || ShieldCheck;
                    return (
                      <a
                        key={idx}
                        href={i.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveDropdown(null);
                          if (onViewChange) {
                            if (i.label === HEADER_COPY_KEYS.fintech) {
                              onViewChange('fintech');
                            } else if (i.label === HEADER_COPY_KEYS.marketplaces) {
                              onViewChange('marketplaces');
                            } else if (i.label === HEADER_COPY_KEYS.digitalHealth) {
                              onViewChange('digital-health');
                            } else if (i.label === HEADER_COPY_KEYS.payments) {
                              onViewChange('payments');
                            } else if (i.label === HEADER_COPY_KEYS.cryptocurrency) {
                              onViewChange('cryptocurrency');
                            } else if (i.label === HEADER_COPY_KEYS.government) {
                              onViewChange('government');
                            } else if (i.label === HEADER_COPY_KEYS.financialInstitutions) {
                              onViewChange('financial-institutions');
                            } else if (i.label === HEADER_COPY_KEYS.eLearning) {
                              onViewChange('e-learning');
                            } else if (i.label === HEADER_COPY_KEYS.higherEducation) {
                              onViewChange('higher-education');
                            } else {
                              handleUnavailableNavigation();
                            }
                          } else {
                            handleUnavailableNavigation();
                          }
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#354CE1]/10 group-hover:text-[#354CE1] transition shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#354CE1] transition">
                          {tm(i.label)}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Business goals Column (span 3 of 12) */}
              <div className="col-span-1 lg:col-span-3 flex flex-col h-full">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                  {tm(HEADER_COPY_KEYS.businessGoals)}
                </span>
                <div className="grid grid-cols-1 gap-1 overflow-y-auto max-h-[400px]">
                  {SOLUTIONS_GOALS.map((g, idx) => {
                    const IconComponent = ICON_MAP[g.icon] || ShieldCheck;
                    return (
                      <a
                        key={idx}
                        href={g.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveDropdown(null);
                          if (onViewChange && g.label === HEADER_COPY_KEYS.compliance) {
                            onViewChange('compliance-goal');
                          } else if (onViewChange && g.label === HEADER_COPY_KEYS.trustSafety) {
                            onViewChange('trust');
                          } else if (onViewChange && g.label === HEADER_COPY_KEYS.fraudPrevention) {
                            onViewChange('fraud-prevent');
                          } else if (onViewChange && g.label === HEADER_COPY_KEYS.globalExpansion) {
                            onViewChange('global-expansion');
                          } else {
                            handleUnavailableNavigation();
                          }
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#354CE1]/10 group-hover:text-[#354CE1] transition shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#354CE1] transition">
                          {tm(g.label)}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Company Mega Dropdown */}
        {activeDropdown === HEADER_COPY_KEYS.company && (
          <>
            <div 
              className="fixed inset-0 z-20" 
              onClick={() => setActiveDropdown(null)} 
            />
            <div className="absolute top-full left-0 right-0 mt-0 bg-white rounded-b-3xl shadow-2xl p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 z-30 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin animate-in fade-in slide-in-from-top-2 duration-200">
              
              {/* Left Column: visual block (span 3 of 12) */}
              <div className="col-span-1 lg:col-span-3 bg-[#FAFBFD] p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-full min-h-[380px]">
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {tm(HEADER_COPY_KEYS.missionTeamTrust)}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {tm(HEADER_COPY_KEYS.aboutIdentra)}
                  </p>
                </div>
                
                {/* Middle graphic block */}
                <div className="my-4 relative rounded-xl overflow-hidden aspect-[4/3] bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center p-2 border border-slate-200/50">
                  <img 
                    src="/src/assets/images/identra_careers_team_1783338578864.jpg" 
                    alt={tm(HEADER_COPY_KEYS.identraCareersTeam)} 
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs py-1 px-2.5 rounded-md text-[9px] font-bold text-slate-800 shadow-sm text-center">
                    {tm(HEADER_COPY_KEYS.meetTheTeam)}
                  </div>
                </div>
                
                <p className="text-[11px] text-[#354CE1] font-semibold flex items-center gap-1 cursor-pointer" onClick={() => { setActiveDropdown(null); if (onViewChange) onViewChange('careers'); }}>
                  <span>{tm(HEADER_COPY_KEYS.careersCulture)}</span>
                  <ArrowRight className="w-3 h-3" />
                </p>
              </div>

              {/* Learning Column (span 3 of 12) */}
              <div className="col-span-1 lg:col-span-3 flex flex-col h-full lg:border-r border-slate-100 lg:pr-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                  {tm(HEADER_COPY_KEYS.learning)}
                </span>
                <div className="grid grid-cols-1 gap-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-none">
                  {COMPANY_LEARNING_ITEMS.map((item, idx) => {
                    const IconComponent = ICON_MAP[item.icon] || BookOpen;
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={(e) => handleItemClick(e, item.label, item.href)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#354CE1]/10 group-hover:text-[#354CE1] transition shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#354CE1] transition flex items-center">
                          {tm(item.label)}
                          {item.isNew && (
                            <span className="ml-2 font-sans font-bold text-[9px] text-[#354CE1] tracking-wider px-1.5 py-0.5 bg-[#354CE1]/10 rounded">{tm(HEADER_COPY_KEYS.new)}</span>
                          )}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Company Column (span 3 of 12) */}
              <div className="col-span-1 lg:col-span-3 flex flex-col h-full lg:border-r border-slate-100 lg:pr-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                  {tm(HEADER_COPY_KEYS.company)}
                </span>
                <div className="grid grid-cols-1 gap-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-none">
                  {COMPANY_MENU_ITEMS.map((item, idx) => {
                    const IconComponent = ICON_MAP[item.icon] || Users;
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={(e) => handleItemClick(e, item.label, item.href)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#354CE1]/10 group-hover:text-[#354CE1] transition shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#354CE1] transition">
                          {tm(item.label)}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Developers Column (span 3 of 12) */}
              <div className="col-span-1 lg:col-span-3 flex flex-col h-full">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                  {tm(HEADER_COPY_KEYS.developers)}
                </span>
                <div className="grid grid-cols-1 gap-1 overflow-y-auto max-h-[400px]">
                  {COMPANY_DEVELOPERS_ITEMS.map((item, idx) => {
                    const IconComponent = ICON_MAP[item.icon] || FileCode;
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={(e) => handleItemClick(e, item.label, item.href)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#354CE1]/10 group-hover:text-[#354CE1] transition shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#354CE1] transition">
                          {tm(item.label)}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>
          </>
        )}
      </nav>
    </header>
    </>
  );
}
