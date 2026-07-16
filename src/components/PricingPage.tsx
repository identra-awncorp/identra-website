import React, { useState, useMemo } from 'react';
import { 
  Check, 
  Plus, 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Clock, 
  Database, 
  Terminal, 
  Users,
  MessageSquare,
  HelpCircle as InfoIcon
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedRecord } from '../utils/i18nRuntime';
import { PRICING_TRANSLATIONS, CATEGORY_TRANSLATIONS, FEATURE_TRANSLATIONS, PRICING_CATEGORY_LABEL_KEYS, PRICING_FEATURE_LABEL_KEYS } from '../translations/PricingPageTranslations';

interface PricingPageProps {
  onOpenSandbox: () => void;
  onBackToLanding: () => void;
}

// Full Comparison Data Structuring
type PricingCategoryKey = keyof typeof PRICING_CATEGORY_LABEL_KEYS;
type PricingFeatureKey = keyof typeof PRICING_FEATURE_LABEL_KEYS;

interface FeatureItem {
  id: PricingFeatureKey;
  essential: React.ReactNode;
  growth: React.ReactNode;
  enterprise: React.ReactNode;
  tooltip?: string;
}

interface FeatureCategory {
  id: PricingCategoryKey;
  features: FeatureItem[];
}

export default function PricingPage({ onOpenSandbox, onBackToLanding }: PricingPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const { language } = useLanguage();
  const t = getLocalizedRecord(PRICING_TRANSLATIONS, language as keyof typeof PRICING_TRANSLATIONS, 'PRICING_TRANSLATIONS');

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    verificationTypes: true,
    reportTypes: true,
    dynamicFlowTemplateCustomizations: false,
    verificationTemplateCustomizations: false,
    workflowFeatures: false,
    caseFeatures: false,
    dataAndSecurity: false,
    customerSupport: false,
  });

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const featureTableData: FeatureCategory[] = useMemo(() => [
    {
      id: 'verificationTypes',
      features: [
        { id: 'governmentId', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, tooltip: t.tooltipGovId },
        { id: 'selfie', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, tooltip: t.tooltipSelfie },
        { id: 'phoneCarrierVerification', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'phoneNumberVerification', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'emailVerification', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'authoritativeDatabaseUs', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'documentAi', essential: <span className="text-xs text-slate-500 font-medium">{t.limited}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'businessRegistryUs', essential: <Plus className="w-4 h-4 text-slate-400 mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'dmvAamva', essential: <Plus className="w-4 h-4 text-slate-400 mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'taxIdentificationNumberTin', essential: <Plus className="w-4 h-4 text-slate-400 mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'authoritativeDatabaseNonUs', essential: <Plus className="w-4 h-4 text-slate-400 mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'businessWebsite', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'businessRegistryNonUs', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'socialSecurityAdministrationEcbsv', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'mobileDriversLicenseMdl', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'otherIssuingDatabase', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <span className="text-slate-300">{t.notAvailableSymbol}</span>, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'advancedVerificationServices', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <span className="text-slate-300">{t.notAvailableSymbol}</span>, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
      ]
    },
    {
      id: 'reportTypes',
      features: [
        { id: 'watchlistsAndSanctions', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'adverseMedia', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'emailRisk', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'phoneRisk', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'socialMedia', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'addressLookup', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'cryptoWalletWatchlistAndSanctions', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'businessWatchlistAndSanctions', essential: <Plus className="w-4 h-4 text-slate-400 mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'businessAdverseMedia', essential: <Plus className="w-4 h-4 text-slate-400 mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'businessClassificationIndustry', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'businessAssociatedPersons', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'businessOnlineCredibility', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <span className="text-slate-300">{t.notAvailableSymbol}</span>, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'advancedEnrichments', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <span className="text-slate-300">{t.notAvailableSymbol}</span>, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
      ]
    },
    {
      id: 'dynamicFlowTemplateCustomizations',
      features: [
        { id: 'endUserFlowsTemplates', essential: <span className="text-xs text-slate-600 font-semibold">5</span>, growth: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span>, enterprise: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span> },
        { id: 'configurableThemes', essential: <span className="text-xs text-slate-600 font-semibold">1</span>, growth: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span>, enterprise: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span> },
        { id: 'configurableFlowAndLogic', essential: <span className="text-xs text-slate-500 font-medium">{t.limited}</span>, growth: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span>, enterprise: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span> },
        { id: 'customFieldCollection', essential: <span className="text-xs text-slate-500 font-medium">{t.limitedAccess}</span>, growth: <span className="text-xs text-slate-600 font-semibold">{t.fullAccess}</span>, enterprise: <span className="text-xs text-slate-600 font-semibold">{t.fullAccess}</span> },
        { id: 'behaviorSignalsRiskFraud', essential: <span className="text-xs text-slate-500 font-medium">{t.viewOnly}</span>, growth: <span className="text-xs text-slate-600 font-semibold">{t.fullAccess}</span>, enterprise: <span className="text-xs text-slate-600 font-semibold">{t.fullAccess}</span> },
        { id: 'autoTranslationOfCustomCopy', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'customBrandAssets', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'conversionRateAnalytics', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
      ]
    },
    {
      id: 'verificationTemplateCustomizations',
      features: [
        { id: 'configurableVerificationChecks', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'customNumberOfVerificationAttempts', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'fileUploadAndLiveCaptureSettings', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'countryAndIdTypeConfigurations', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'configurableDocumentChecks', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'configurableDatabaseChecks', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'customDocumentExtractionFields', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'customPassAndFailRateDashboards', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <span className="text-slate-300">{t.notAvailableSymbol}</span>, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
      ]
    },
    {
      id: 'workflowFeatures',
      features: [
        { id: 'eventBasedTriggers', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'configurableFlowAndLogic', essential: <span className="text-xs text-slate-500 font-medium">{t.limited}</span>, growth: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span>, enterprise: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span> },
        { id: 'waitAndTimeoutConfigurations', essential: <span className="text-xs text-slate-500 font-medium">{t.limited}</span>, growth: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span>, enterprise: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span> },
        { id: 'apiBasedAndScheduledTriggers', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'emailSmsAndThirdPartyCommunication', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'loopIterativeAndRecursiveLogic', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'customCode', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'bespokeBusinessProcessAutomations', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <span className="text-slate-300">{t.notAvailableSymbol}</span>, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
      ]
    },
    {
      id: 'caseFeatures',
      features: [
        { id: 'caseTemplates', essential: <span className="text-xs text-slate-600 font-semibold">3</span>, growth: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span>, enterprise: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span> },
        { id: 'assignmentPoliciesAndSlas', essential: <span className="text-xs text-slate-600 font-semibold">1</span>, growth: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span>, enterprise: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span> },
        { id: 'caseStatuses', essential: <span className="text-xs text-slate-500 font-medium">{t.limited}</span>, growth: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span>, enterprise: <span className="text-xs text-slate-600 font-semibold">{t.unlimited}</span> },
        { id: 'caseLayoutModules', essential: <span className="text-xs text-slate-500 font-medium">{t.fixedView}</span>, growth: <span className="text-xs text-[#354CE1] font-semibold">{t.dynamicInsights}</span>, enterprise: <span className="text-xs text-[#354CE1] font-semibold">{t.dynamicInsights}</span> },
        { id: 'commentsWithTagging', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'emailAndCustomerCommunication', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'customResolutionDashboards', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <span className="text-slate-300">{t.notAvailableSymbol}</span>, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'sarFilingFeatures', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <span className="text-slate-300">{t.notAvailableSymbol}</span>, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
      ]
    },
    {
      id: 'dataAndSecurity',
      features: [
        { id: 'importsFromCsvs', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'importsFromDataWarehouses', essential: <span className="text-xs text-slate-500 font-medium">{t.limited}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'secureDataStorage', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'soc2PrivacyShieldGdpr', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'samlAndSsoSupport', essential: <Plus className="w-4 h-4 text-slate-400 mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'scimSupport', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'customRedactionsAndRetention', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'dataResidencyEuHosting', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Plus className="w-4 h-4 text-slate-400 mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
      ]
    },
    {
      id: 'customerSupport',
      features: [
        { id: 'askAi', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'identraAcademy', essential: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'accountSupport', essential: <span className="text-xs text-slate-600 font-medium">{t.selfGuided}</span>, growth: <Check className="w-5 h-5 text-[#354CE1] mx-auto" />, enterprise: <Check className="w-5 h-5 text-[#354CE1] mx-auto" /> },
        { id: 'integrationSupport', essential: <span className="text-xs text-slate-600 font-medium">{t.selfGuided}</span>, growth: <Plus className="w-4 h-4 text-slate-400 mx-auto" />, enterprise: <Plus className="w-4 h-4 text-slate-400 mx-auto" /> },
        { id: 'dedicatedSuccessManager', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <Plus className="w-4 h-4 text-slate-400 mx-auto" />, enterprise: <Plus className="w-4 h-4 text-slate-400 mx-auto" /> },
        { id: 'customDevelopment', essential: <span className="text-slate-300">{t.notAvailableSymbol}</span>, growth: <span className="text-slate-300">{t.notAvailableSymbol}</span>, enterprise: <Plus className="w-4 h-4 text-slate-400 mx-auto" /> },
      ]
    }
  ], [t]);

  const filteredTableData = useMemo(() => {
    if (!searchTerm.trim()) return featureTableData;
    const term = searchTerm.toLowerCase();
    return featureTableData.map(cat => {
      const filteredFeatures = cat.features.filter(f => {
        const featureLabelKey = PRICING_FEATURE_LABEL_KEYS[f.id];
        const defaultName = featureLabelKey.toLowerCase();
        const translatedName = (FEATURE_TRANSLATIONS[language as keyof typeof FEATURE_TRANSLATIONS]?.[featureLabelKey] || featureLabelKey).toLowerCase();
        return defaultName.includes(term) || translatedName.includes(term);
      });
      return {
        ...cat,
        features: filteredFeatures
      };
    }).filter(cat => cat.features.length > 0);
  }, [searchTerm, language, featureTableData]);

  const faqs = [
    {
      question: t.faqQ1,
      answer: t.faqA1
    },
    {
      question: t.faqQ2,
      answer: t.faqA2
    },
    {
      question: t.faqQ3,
      answer: t.faqA3
    },
    {
      question: t.faqQ4,
      answer: t.faqA4
    },
    {
      question: t.faqQ5,
      answer: t.faqA5
    }
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen text-slate-800">
      
      {/* 1. Hero Section */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#354CE1]/10 rounded-full text-xs font-semibold text-[#354CE1]">
          <Sparkles className="w-3.5 h-3.5 text-[#354CE1]" />
          <span>{t.badge}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-extrabold text-[#0F1E36] tracking-tight max-w-4xl mx-auto leading-tight">
          {t.heroTitle}
        </h1>
        <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          {t.heroDesc}
        </p>
      </section>

      {/* 2. Three Plans Cards */}
      <section className="px-6 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Essential */}
          <div className="bg-gradient-to-b from-[#EFF2FF] to-white rounded-[2rem] border border-indigo-100/60 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300 relative group min-h-[560px]">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#354CE1] uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md inline-block">
                  {t.essentialLabel}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 font-display">{t.essentialTitle}</h3>
              </div>
              
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.essentialDesc}
              </p>

              <div className="h-px bg-indigo-100/60" />

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.featuresInclude}</p>
                <ul className="space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#354CE1] mt-0.5 shrink-0" />
                    <span>{t.essentialBullet1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#354CE1] mt-0.5 shrink-0" />
                    <span>{t.essentialBullet2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#354CE1] mt-0.5 shrink-0" />
                    <span>{t.essentialBullet3}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#354CE1] mt-0.5 shrink-0" />
                    <span>{t.essentialBullet4}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <div className="bg-white/80 border border-slate-100/50 p-4 rounded-xl text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{t.startingAt}</p>
                <p className="text-2xl font-extrabold text-slate-900">$250<span className="text-xs font-semibold text-slate-400">{t.perMonth}</span></p>
                <p className="text-[9px] text-slate-400 mt-0.5">{t.contractTerm}</p>
              </div>
              <button 
                onClick={onOpenSandbox}
                className="w-full bg-[#354CE1] hover:bg-[#2539BE] text-white font-semibold text-xs py-3.5 rounded-full shadow-sm hover:shadow transition flex items-center justify-center gap-1"
              >
                <span>{t.tryNow}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Growth */}
          <div className="bg-white rounded-[2rem] border-2 border-[#354CE1] p-8 shadow-lg flex flex-col justify-between hover:shadow-xl transition duration-300 relative min-h-[560px]">
            {/* Recommended badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-[#354CE1] via-[#5F3CF3] to-[#00D4B2] text-white text-[10px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
              {t.recommendedBadge}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                    {t.growthLabel}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">{t.growthTitle}</h3>
              </div>
              
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.growthDesc}
              </p>

              <div className="h-px bg-slate-100" />

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.growthIncludes}</p>
                <ul className="space-y-3.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{t.growthBullet1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{t.growthBullet2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{t.growthBullet3}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{t.growthBullet4}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <div className="bg-[#FAFBFD] border border-slate-100 p-4 rounded-xl text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{t.pricingModel}</p>
                <p className="text-lg font-bold text-slate-800">{t.volumePricing}</p>
                <p className="text-[9px] text-slate-400 mt-0.5">{t.payVerify}</p>
              </div>
              <button 
                onClick={onOpenSandbox}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3.5 rounded-full shadow-sm hover:shadow transition flex items-center justify-center gap-1"
              >
                <span>{t.contactUs}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Enterprise */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-[2rem] border border-slate-800 p-8 shadow-sm flex flex-col justify-between hover:shadow-lg transition duration-300 relative min-h-[560px]">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#E5E9FF] uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-md inline-block">
                  {t.enterpriseLabel}
                </span>
                <h3 className="text-2xl font-bold text-white font-display">{t.enterpriseTitle}</h3>
              </div>
              
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.enterpriseDesc}
              </p>

              <div className="h-px bg-slate-800" />

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-indigo-200">{t.enterpriseIncludes}</p>
                <ul className="space-y-3.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#354CE1] mt-0.5 shrink-0" />
                    <span>{t.enterpriseBullet1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#354CE1] mt-0.5 shrink-0" />
                    <span>{t.enterpriseBullet2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#354CE1] mt-0.5 shrink-0" />
                    <span>{t.enterpriseBullet3}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#354CE1] mt-0.5 shrink-0" />
                    <span>{t.enterpriseBullet4}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                <p className="text-[10px] font-bold text-slate-500 uppercase">{t.enterpriseAgreements}</p>
                <p className="text-lg font-bold text-indigo-200">{t.bespokeSla}</p>
                <p className="text-[9px] text-slate-400 mt-0.5">{t.flexibleCommitments}</p>
              </div>
              <button 
                onClick={onOpenSandbox}
                className="w-full bg-[#354CE1] hover:bg-[#4E64FA] text-white font-semibold text-xs py-3.5 rounded-full shadow-sm hover:shadow transition flex items-center justify-center gap-1"
              >
                <span>{t.contactUs}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Logo Slider Social Proof */}
      <section className="bg-white border-y border-slate-100 py-10 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6">
          <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {t.trustedBy}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
            {/* Reddit */}
            <div className="flex items-center gap-1.5 font-display text-slate-800 font-extrabold text-sm tracking-tighter">
              <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold">{t.logoRedditMark}</span>
              {t.logoReddit}
            </div>
            {/* Coursera */}
            <span className="font-display font-semibold text-slate-700 text-sm tracking-wide">{t.logoCoursera}</span>
            {/* Dapper Labs */}
            <span className="font-mono font-bold text-slate-800 text-xs tracking-tight">{t.logoDapper}</span>
            {/* Petal */}
            <span className="font-serif font-semibold italic text-slate-600 text-sm">{t.logoPetal}</span>
            {/* Square */}
            <div className="flex items-center gap-1 text-slate-900 font-bold text-sm">
              <span className="w-3.5 h-3.5 border-2 border-slate-900 rounded-sm inline-block" />
              {t.logoSquare}
            </div>
            {/* Travelex */}
            <span className="font-sans font-black text-slate-600 tracking-wider text-xs">{t.logoTravelex}</span>
          </div>
        </div>
      </section>

      {/* 4. Startup Program Eligibility Banner */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-indigo-50/50 rounded-3xl border border-indigo-100 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
                {t.startupBadge}
              </span>
              <span className="text-lg">{t.startupEmoji}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              {t.startupTitle}
            </h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal">
              {t.startupDesc}
            </p>
          </div>
          <div className="shrink-0 w-full lg:w-auto text-center">
            <button 
              onClick={onOpenSandbox}
              className="w-full lg:w-auto bg-slate-950 hover:bg-slate-850 text-white font-semibold text-xs px-6 py-4 rounded-full transition shadow-sm hover:shadow"
            >
              {t.applyStartup}
            </button>
          </div>
        </div>
      </section>

      {/* 5. Detailed Interactive Comparison Table / Feature Matrix */}
      <section className="bg-white border-t border-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-100">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">
                {t.planComparison}
              </h2>
              <p className="text-slate-400 text-xs">
                {t.exploreServices}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#354CE1]/20 focus:border-[#354CE1] transition"
              />
            </div>
          </div>

          {/* Quick Info Legend */}
          <div className="flex flex-wrap items-center gap-6 text-[11px] text-slate-500 bg-[#FAFBFD] p-3 px-4 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-700">{t.legend}</span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#354CE1]" /> {t.included}
            </span>
            <span className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5 text-slate-400" /> {t.addon}
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              {t.notAvailableSymbol} {t.notAvailable}
            </span>
          </div>

          {/* Table Container */}
          <div className="border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              {/* Header */}
              <thead>
                <tr className="bg-slate-50 border-b border-slate-150">
                  <th className="py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/2">
                    {t.servicesAvailable}
                  </th>
                  <th className="py-5 px-4 text-center w-1/6">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-900">{t.essentialTitle}</p>
                      <button 
                        onClick={onOpenSandbox}
                        className="text-[10px] font-bold text-[#354CE1] hover:underline"
                      >
                        {t.tryNow} &rarr;
                      </button>
                    </div>
                  </th>
                  <th className="py-5 px-4 text-center w-1/6 bg-indigo-50/20">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-900">{t.growthTitle}</p>
                      <button 
                        onClick={onOpenSandbox}
                        className="text-[10px] font-bold text-[#354CE1] hover:underline"
                      >
                        {t.contactUs} &rarr;
                      </button>
                    </div>
                  </th>
                  <th className="py-5 px-4 text-center w-1/6">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-900">{t.enterpriseTitle}</p>
                      <button 
                        onClick={onOpenSandbox}
                        className="text-[10px] font-bold text-[#354CE1] hover:underline"
                      >
                        {t.contactUs} &rarr;
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-slate-100">
                {filteredTableData.map((category) => {
                  const categoryLabelKey = PRICING_CATEGORY_LABEL_KEYS[category.id];
                  const isExpanded = expandedCategories[category.id] ?? true;
                  const translatedCategoryTitle = CATEGORY_TRANSLATIONS[language as keyof typeof CATEGORY_TRANSLATIONS]?.[categoryLabelKey] || categoryLabelKey;

                  return (
                    <React.Fragment key={category.id}>
                      {/* Category row header */}
                      <tr className="bg-slate-100/50">
                        <td colSpan={4} className="py-3 px-6">
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 focus:outline-hidden"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronUp className="w-4 h-4 text-slate-400" />
                            )}
                            <span className="uppercase tracking-wider">{translatedCategoryTitle}</span>
                          </button>
                        </td>
                      </tr>

                      {/* Feature Rows */}
                      {isExpanded && category.features.map((feature, fIdx) => {
                        const featureLabelKey = PRICING_FEATURE_LABEL_KEYS[feature.id];
                        const translatedFeatureName = FEATURE_TRANSLATIONS[language as keyof typeof FEATURE_TRANSLATIONS]?.[featureLabelKey] || featureLabelKey;
                        return (
                          <tr key={fIdx} className="hover:bg-slate-50/50 transition">
                            <td className="py-3.5 px-6 text-xs text-slate-800 font-medium">
                              <div className="flex items-center gap-1.5 group/tooltip relative">
                                <span>{translatedFeatureName}</span>
                                {feature.tooltip && (
                                  <div className="relative inline-block cursor-help text-slate-300 hover:text-slate-500">
                                    <InfoIcon className="w-3.5 h-3.5" />
                                    <div className="hidden group-hover/tooltip:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-900 text-white text-[10px] rounded-lg p-2.5 shadow-md z-30 font-normal leading-normal">
                                      {feature.tooltip}
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              {feature.essential}
                            </td>
                            <td className="py-3.5 px-4 text-center bg-indigo-50/10">
                              {feature.growth}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              {feature.enterprise}
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}

                {filteredTableData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-xs text-slate-400 font-medium">
                      {t.noMatching.replace('{searchTerm}', searchTerm)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 6. Polished FAQ Accordion */}
      <section className="bg-[#FAFBFD] border-t border-slate-100 py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0F1E36]">
              {t.faqTitle}
            </h2>
            <p className="text-slate-400 text-xs">
              {t.faqDesc}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFAQ === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-xs hover:border-slate-200 transition duration-200"
                >
                  <button
                    onClick={() => setActiveFAQ(isOpen ? null : idx)}
                    className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 focus:outline-hidden"
                  >
                    <span className="text-xs md:text-sm font-bold text-slate-800 leading-snug">
                      {faq.question}
                    </span>
                    <div className="shrink-0 w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 transition-colors">
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#354CE1]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {/* Transition/Animate Answer */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs text-slate-500 border-t border-slate-50 leading-relaxed font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Ready to Get Started Bottom Banner */}
      <section className="bg-[#354CE1] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
            <ShieldCheck className="w-12 h-12 text-white relative z-10" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
              {t.readyToGet}
            </h2>
            <p className="text-indigo-100 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-normal">
              {t.bottomDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenSandbox}
              className="w-full sm:w-auto bg-white hover:bg-indigo-50 text-[#354CE1] font-bold text-xs px-8 py-4 rounded-full shadow-md transition flex items-center justify-center gap-1.5"
            >
              <span>{t.getDemo}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#354CE1]" />
            </button>
            <button
              onClick={onOpenSandbox}
              className="w-full sm:w-auto border border-white/25 hover:bg-white/10 text-white font-bold text-xs px-8 py-4 rounded-full transition"
            >
              {t.tryNow} &rarr;
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

