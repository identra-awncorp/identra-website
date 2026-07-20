/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext';
import SkeletonLoader from './components/SkeletonLoader';
import Header from './components/Header';
import Footer from './components/Footer';
import SeoMetadata from './components/SeoMetadata';
import type { AppView, BlogDetailId } from './types/routes';
import { blogDetailPath, localizePath, pathToBlogDetailId, pathToView, viewToPath } from './types/routes';

function InitialLoadMarker({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return null;
}

type RouteNavigationState = {
  fromApp?: boolean;
};

const IN_APP_NAVIGATION_STATE: RouteNavigationState = { fromApp: true };

const Hero = lazy(() => import('./components/Hero'));
const RelaySection = lazy(() => import('./components/RelaySection'));
const RelayTransactions = lazy(() => import('./components/RelayTransactions'));
const BuildingBlocks = lazy(() => import('./components/BuildingBlocks'));
const PrivacyPortal = lazy(() => import('./components/PrivacyPortal'));
const SecurityCertifications = lazy(() => import('./components/SecurityCertifications'));
const DemoSandbox = lazy(() => import('./components/DemoSandbox'));
const GovernmentIdPage = lazy(() => import('./components/GovernmentIdPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const PricingPage = lazy(() => import('./components/PricingPage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const EbooksPage = lazy(() => import('./components/EbooksPage'));
const BlogDetailPage = lazy(() => import('./components/BlogDetailPage'));
const EventsPage = lazy(() => import('./components/EventsPage'));
const CareersPage = lazy(() => import('./components/CareersPage'));
const ResearchPage = lazy(() => import('./components/ResearchPage'));
const KycAmlPage = lazy(() => import('./components/KycAmlPage'));
const ConnectPage = lazy(() => import('./components/ConnectPage'));
const PlatformPage = lazy(() => import('./components/PlatformPage'));
const NfcPage = lazy(() => import('./components/NfcPage'));
const CustomersPage = lazy(() => import('./components/CustomersPage'));
const DynamicFlowPage = lazy(() => import('./components/DynamicFlowPage'));
const RelayPage = lazy(() => import('./components/RelayPage'));
const KybPage = lazy(() => import('./components/KybPage'));
const BusinessFraudPage = lazy(() => import('./components/BusinessFraudPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const PartnersPage = lazy(() => import('./components/PartnersPage'));
const SecurityPage = lazy(() => import('./components/SecurityPage'));
const DocsPage = lazy(() => import('./components/DocsPage'));
const PassiveSignalsPage = lazy(() => import('./components/PassiveSignalsPage'));
const CaseManagementPage = lazy(() => import('./components/CaseManagementPage'));
const GraphPage = lazy(() => import('./components/GraphPage'));
const WorkflowsPage = lazy(() => import('./components/WorkflowsPage'));
const CopilotPage = lazy(() => import('./components/CopilotPage'));
const MarketplacePage = lazy(() => import('./components/MarketplacePage'));
const DocumentAIPage = lazy(() => import('./components/DocumentAIPage'));
const SelfieAgeEstimationPage = lazy(() => import('./components/SelfieAgeEstimationPage'));
const SelfieRecognitionPage = lazy(() => import('./components/SelfieRecognitionPage'));
const DatabaseChecksPage = lazy(() => import('./components/DatabaseChecksPage'));
const PhoneEmailVerificationPage = lazy(() => import('./components/PhoneEmailVerificationPage'));
const MobileDriversLicensePage = lazy(() => import('./components/MobileDriversLicensePage'));
const WatchlistsPage = lazy(() => import('./components/WatchlistsPage'));
const AdverseMediaPage = lazy(() => import('./components/AdverseMediaPage'));
const ProfileReportPage = lazy(() => import('./components/ProfileReportPage'));
const PhoneEmailRiskPage = lazy(() => import('./components/PhoneEmailRiskPage'));
const AddressLookupPage = lazy(() => import('./components/AddressLookupPage'));
const SocialMediaLookupPage = lazy(() => import('./components/SocialMediaLookupPage'));
const AgeAssurancePage = lazy(() => import('./components/AgeAssurancePage'));
const CandidateVerificationPage = lazy(() => import('./components/CandidateVerificationPage'));
const WorkforceIdvPage = lazy(() => import('./components/WorkforceIdvPage'));
const BackgroundChecksPage = lazy(() => import('./components/BackgroundChecksPage'));
const ReverificationPage = lazy(() => import('./components/ReverificationPage'));
const ManualReviewPage = lazy(() => import('./components/ManualReviewPage'));
const FintechPage = lazy(() => import('./components/FintechPage'));
const MarketplacesPage = lazy(() => import('./components/MarketplacesPage'));
const DigitalHealthPage = lazy(() => import('./components/DigitalHealthPage'));
const PaymentsPage = lazy(() => import('./components/PaymentsPage'));
const CryptocurrencyPage = lazy(() => import('./components/CryptocurrencyPage'));
const GovernmentPage = lazy(() => import('./components/GovernmentPage'));
const FinancialInstitutionsPage = lazy(() => import('./components/FinancialInstitutionsPage'));
const ELearningPage = lazy(() => import('./components/ELearningPage'));
const HigherEducationPage = lazy(() => import('./components/HigherEducationPage'));
const CompliancePage = lazy(() => import('./components/CompliancePage'));
const TrustAndSafetyPage = lazy(() => import('./components/TrustAndSafetyPage'));
const FraudPreventionPage = lazy(() => import('./components/FraudPreventionPage'));
const GlobalExpansionPage = lazy(() => import('./components/GlobalExpansionPage'));
const ResourceCenterPage = lazy(() => import('./components/ResourceCenterPage'));
const PrivacyPage = lazy(() => import('./components/PrivacyPage'));
const AcademyPage = lazy(() => import('./components/AcademyPage'));
const DemoPage = lazy(() => import('./components/DemoPage'));
const WhitePaperPage = lazy(() => import('./components/WhitePaperPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  const { language } = useLanguage();

  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [hasCompletedInitialLoad, setHasCompletedInitialLoad] = useState(false);
  const scrollPositionsRef = useRef<Map<string, number>>(new Map());
  const scrollRestoreVersionRef = useRef(0);
  const resolvedView = pathToView(location.pathname);
  const resolvedBlogId = resolvedView === 'blog-detail'
    ? pathToBlogDetailId(location.pathname)
    : null;
  const isNotFound = resolvedView === null
    || (resolvedView === 'blog-detail' && resolvedBlogId === null);
  const currentView: AppView = resolvedView ?? 'landing';

  const saveCurrentScrollPosition = useCallback((key = location.key) => {
    scrollPositionsRef.current.set(key, window.scrollY);
  }, [location.key]);

  const restoreWindowScroll = useCallback((top: number) => {
    const restoreVersion = scrollRestoreVersionRef.current + 1;
    scrollRestoreVersionRef.current = restoreVersion;
    const targetTop = Math.max(0, top);
    const restore = () => {
      if (scrollRestoreVersionRef.current !== restoreVersion) return;
      window.scrollTo({ top: targetTop, left: 0, behavior: 'auto' });
    };

    restore();
    window.requestAnimationFrame(() => {
      restore();
      window.requestAnimationFrame(restore);
    });
    window.setTimeout(restore, 80);
    window.setTimeout(restore, 240);
    window.setTimeout(restore, 600);
  }, []);

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return undefined;

    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  useEffect(() => {
    let frameId: number | null = null;

    const save = () => {
      scrollPositionsRef.current.set(location.key, window.scrollY);
    };

    const handleScroll = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        save();
        frameId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      save();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.key]);

  useEffect(() => {
    const savedTop = scrollPositionsRef.current.get(location.key) ?? 0;
    restoreWindowScroll(navigationType === 'POP' ? savedTop : 0);
  }, [location.key, navigationType, restoreWindowScroll]);

  useEffect(() => {
    const canonicalPath = localizePath(location.pathname, language);

    if (canonicalPath && location.pathname !== canonicalPath) {
      navigate(
        {
          pathname: canonicalPath,
          search: location.search,
          hash: location.hash,
        },
        { replace: true, state: location.state as RouteNavigationState | null },
      );
    }
  }, [language, location.hash, location.pathname, location.search, location.state, navigate]);

  const handleOpenSandbox = () => {
    setIsSandboxOpen(true);
  };

  const handleCloseSandbox = () => {
    setIsSandboxOpen(false);
  };

  const handleViewChange = (view: AppView) => {
    if (!isNotFound && view === currentView) return;

    saveCurrentScrollPosition();
    navigate(viewToPath(view, language), { state: IN_APP_NAVIGATION_STATE });
  };

  const handleBlogDetailChange = (id: BlogDetailId) => {
    if (currentView === 'blog-detail' && location.pathname === blogDetailPath(id, language)) return;

    saveCurrentScrollPosition();
    navigate(blogDetailPath(id, language), { state: IN_APP_NAVIGATION_STATE });
  };

  const handleBackNavigation = (fallbackView: AppView) => {
    const routeState = location.state as RouteNavigationState | null;

    saveCurrentScrollPosition();
    if (routeState?.fromApp && window.history.length > 1) {
      navigate(-1);
      return;
    }

    handleViewChange(fallbackView);
  };

  const activeView = currentView;
  const headerView = activeView === 'blog-detail' ? 'blog' : activeView;
  const isStandaloneView = activeView === 'login' || activeView === 'docs';
  const markInitialLoadComplete = () => setHasCompletedInitialLoad(true);
  const pageSkeleton = <SkeletonLoader view={activeView} />;
  const layoutSkeleton = (
    <div className="min-h-screen bg-[#FAFBFD] font-sans text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1] scroll-smooth">
      <Header onOpenSandbox={handleOpenSandbox} onViewChange={handleViewChange} currentView={headerView} />
      <main>{pageSkeleton}</main>
      <Footer onOpenSandbox={handleOpenSandbox} onViewChange={handleViewChange} />
    </div>
  );
  const suspenseFallback = !hasCompletedInitialLoad || isStandaloneView ? pageSkeleton : layoutSkeleton;

  return (
    <>
      <SeoMetadata
        currentView={currentView}
        blogId={resolvedBlogId ?? undefined}
        isNotFound={isNotFound}
      />
      <Suspense fallback={suspenseFallback}>
      {(() => {
        if (currentView === 'login') {
          return (
            <>
              {!hasCompletedInitialLoad && <InitialLoadMarker onReady={markInitialLoadComplete} />}
              <LoginPage onBackToLanding={() => handleBackNavigation('landing')} />
            </>
          );
        }

        if (currentView === 'docs') {
          return (
            <>
              {!hasCompletedInitialLoad && <InitialLoadMarker onReady={markInitialLoadComplete} />}
              <DocsPage onBackToLanding={() => handleBackNavigation('landing')} />
            </>
          );
        }

        return (
          <div className="min-h-screen bg-[#FAFBFD] font-sans text-slate-800 antialiased selection:bg-[#354CE1]/10 selection:text-[#354CE1] scroll-smooth">
      {!hasCompletedInitialLoad && <InitialLoadMarker onReady={markInitialLoadComplete} />}
      {/* Navigation Header */}
      <Header onOpenSandbox={handleOpenSandbox} onViewChange={handleViewChange} currentView={headerView} />

      {/* Main Content Sections */}
      <main>
        {isNotFound ? (
          <NotFoundPage onBackToLanding={() => handleViewChange('landing')} />
        ) : currentView === 'landing' ? (
          <>
            {/* Hero Section */}
            <Hero onOpenSandbox={handleOpenSandbox} />

            {/* Relay Section (Trust & Privacy) */}
            <RelaySection onOpenSandbox={handleOpenSandbox} />

            {/* Relay Transactions (Ownership Transfer) */}
            <RelayTransactions />

            {/* Building Blocks (Modular Platform Grid) */}
            <BuildingBlocks onOpenSandbox={handleOpenSandbox} />

            {/* Privacy Portal (We protect people, not just data) */}
            <PrivacyPortal onOpenSandbox={handleOpenSandbox} />

            {/* Security & Certifications Section */}
            <SecurityCertifications onOpenSandbox={handleOpenSandbox} />
          </>
        ) : currentView === 'government-id' ? (
          <GovernmentIdPage 
            onOpenSandbox={handleOpenSandbox} 
            onBackToLanding={() => handleBackNavigation('landing')} 
          />
        ) : currentView === 'about' ? (
          <AboutPage 
            onOpenSandbox={handleOpenSandbox} 
            onBackToLanding={() => handleBackNavigation('landing')} 
          />
        ) : currentView === 'pricing' ? (
          <PricingPage 
            onOpenSandbox={handleOpenSandbox} 
            onBackToLanding={() => handleBackNavigation('landing')} 
          />
        ) : currentView === 'blog' ? (
          <BlogPage
            onBackToLanding={() => handleBackNavigation('landing')}
            onOpenBlogDetail={handleBlogDetailChange}
          />
        ) : currentView === 'ebooks' ? (
          <EbooksPage 
            onOpenSandbox={handleOpenSandbox} 
            onBackToLanding={() => handleBackNavigation('landing')} 
          />
        ) : currentView === 'blog-detail' ? (
          <BlogDetailPage
            blogId={resolvedBlogId!}
            onBack={() => handleBackNavigation('blog')}
            onOpenSandbox={handleOpenSandbox}
          />
        ) : currentView === 'careers' ? (
          <CareersPage 
            onOpenSandbox={handleOpenSandbox} 
            onBackToLanding={() => handleBackNavigation('landing')} 
          />
        ) : currentView === 'research' ? (
          <ResearchPage 
            onOpenSandbox={handleOpenSandbox} 
            onBackToLanding={() => handleBackNavigation('landing')} 
          />
        ) : currentView === 'compliance' ? (
          <KycAmlPage 
            onOpenSandbox={handleOpenSandbox} 
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'compliance-goal' ? (
          <CompliancePage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'fraud-prevent' ? (
          <FraudPreventionPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'trust' ? (
          <TrustAndSafetyPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'global-expansion' ? (
          <GlobalExpansionPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'resource-center' ? (
          <ResourceCenterPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
          />
        ) : currentView === 'privacy-overview' ? (
          <PrivacyPage
            onBackToLanding={() => handleBackNavigation('landing')}
            onOpenSandbox={handleOpenSandbox}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'demo' ? (
          <DemoPage
            onBackToLanding={() => handleBackNavigation('landing')}
            onOpenSandbox={handleOpenSandbox}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'academy' ? (
          <AcademyPage
            onBackToLanding={() => handleBackNavigation('landing')}
            onOpenSandbox={handleOpenSandbox}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'connect' ? (
          <ConnectPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'platform' ? (
          <PlatformPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'nfc' ? (
          <NfcPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'customers' ? (
          <CustomersPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'dynamic-flow' ? (
          <DynamicFlowPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'relay' ? (
          <RelayPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'kyb' ? (
          <KybPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'business-fraud' ? (
          <BusinessFraudPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'contact' ? (
          <ContactPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
          />
        ) : currentView === 'partners' ? (
          <PartnersPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
          />
        ) : currentView === 'security' ? (
          <SecurityPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'passive-signals' ? (
          <PassiveSignalsPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'case-management' ? (
          <CaseManagementPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'graph' ? (
          <GraphPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'workflows' ? (
          <WorkflowsPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'copilot' ? (
          <CopilotPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'marketplace' ? (
          <MarketplacePage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'document-ai' ? (
          <DocumentAIPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'selfie-age-estimation' ? (
          <SelfieAgeEstimationPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'selfie-recognition' ? (
          <SelfieRecognitionPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'database-checks' ? (
          <DatabaseChecksPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'phone-email' ? (
          <PhoneEmailVerificationPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'mobile-drivers-license' ? (
          <MobileDriversLicensePage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'watchlists' ? (
          <WatchlistsPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'adverse-media' ? (
          <AdverseMediaPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'profile-report' ? (
          <ProfileReportPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'phone-email-risk' ? (
          <PhoneEmailRiskPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'address-lookup' ? (
          <AddressLookupPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'social-media-lookup' ? (
          <SocialMediaLookupPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'age-assurance' ? (
          <AgeAssurancePage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'candidate-verification' ? (
          <CandidateVerificationPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'workforce-idv' ? (
          <WorkforceIdvPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'background-checks' ? (
          <BackgroundChecksPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'reverification' ? (
          <ReverificationPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'manual-review' ? (
          <ManualReviewPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'fintech' ? (
          <FintechPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'marketplaces' ? (
          <MarketplacesPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'digital-health' ? (
          <DigitalHealthPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'payments' ? (
          <PaymentsPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'cryptocurrency' ? (
          <CryptocurrencyPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'government' ? (
          <GovernmentPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'financial-institutions' ? (
          <FinancialInstitutionsPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'e-learning' ? (
          <ELearningPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'higher-education' ? (
          <HigherEducationPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : currentView === 'white-paper' ? (
          <WhitePaperPage
            onOpenSandbox={handleOpenSandbox}
            onBackToLanding={() => handleBackNavigation('landing')}
            onViewChange={handleViewChange}
          />
        ) : (
          <EventsPage 
            onOpenSandbox={handleOpenSandbox} 
            onBackToLanding={() => handleBackNavigation('landing')} 
          />
        )}
      </main>

      {/* Corporate Detailed Footer */}
      <Footer onOpenSandbox={handleOpenSandbox} onViewChange={handleViewChange} />

      {/* Interactive IDV Workflow Sandbox Dialog Modal */}
      {isSandboxOpen && (
        <Suspense fallback={null}>
          <DemoSandbox isOpen={isSandboxOpen} onClose={handleCloseSandbox} />
        </Suspense>
      )}
          </div>
        );
      })()}
      </Suspense>
    </>
  );
}
