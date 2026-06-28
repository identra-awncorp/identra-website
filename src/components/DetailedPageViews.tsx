import { motion } from 'motion/react';
import ZkpVisualizer from './ZkpVisualizer';
import DocumentSubpage from './DocumentSubpage';
import BlogSubpage from './BlogSubpage';
import FeaturesSubpage from './FeaturesSubpage';
import TechGlossarySubpage from './TechGlossarySubpage';
import UseCasesSubpage from './UseCasesSubpage';
import AboutSubpage from './AboutSubpage';
import SpecsSubpage from './SpecsSubpage';
import FaqSubpage from './FaqSubpage';
import CareersSubpage from './CareersSubpage';
import PrivacyPolicySubpage from './PrivacyPolicySubpage';
import TermsOfUseSubpage from './TermsOfUseSubpage';
import CookiePolicySubpage from './CookiePolicySubpage';
import GuideSubpage from './GuideSubpage';

interface DetailedPageViewsProps {
  page: string;
  path: string;
  lang: 'vi' | 'en';
  onBack: () => void;
  onOpenDemo: () => void;
  onNavigate?: (page: string) => void;
  onNavigateToBlogPost?: (postId: string | null) => void;
}

export default function DetailedPageViews({ page, path, lang, onBack, onOpenDemo, onNavigate, onNavigateToBlogPost }: DetailedPageViewsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`bg-[#F7F8FC] dark:bg-[#080B13] min-h-[70vh] transition-colors duration-300 border-t border-gray-100 dark:border-slate-800 ${(page === "features" || page === "docs" || page === "guides" || page === "blog" || page === "about" || page === "use-cases" || page === "careers" || page === "privacy" || page === "terms" || page === "cookies" || page === "tech-glossary" || page === "faq" || page === "specs") ? "p-0" : "py-16 px-6 lg:px-12"}`}
    >
      {page === "features" && (
        <FeaturesSubpage lang={lang} onBack={onBack} onOpenDemo={onOpenDemo} />
      )}
      {page === "tech-glossary" && (
        <TechGlossarySubpage lang={lang} onBack={onBack} onNavigate={onNavigate} />
      )}
      {page === "use-cases" && (
        <UseCasesSubpage lang={lang} onBack={onBack} onOpenDemo={onOpenDemo} />
      )}
      {page === "docs" && (
        <DocumentSubpage lang={lang} onBack={onBack} onOpenDemo={onOpenDemo} />
      )}
      {page === "guides" && (
        <GuideSubpage lang={lang} onBack={onBack} onNavigate={onNavigate} onOpenDemo={onOpenDemo} />
      )}
      {page === "blog" && (
        <BlogSubpage lang={lang} path={path} onBack={onBack} onOpenDemo={onOpenDemo} onNavigateToPost={onNavigateToBlogPost} />
      )}
      {page === "about" && (
        <AboutSubpage lang={lang} onBack={onBack} onOpenDemo={onOpenDemo} onNavigate={onNavigate} />
      )}
      {page === "careers" && (
        <CareersSubpage lang={lang} onBack={onBack} onOpenDemo={onOpenDemo} onNavigate={onNavigate} />
      )}
      {page === "privacy" && (
        <PrivacyPolicySubpage lang={lang} onBack={onBack} onNavigate={onNavigate} onOpenDemo={onOpenDemo} />
      )}
      {page === "terms" && (
        <TermsOfUseSubpage lang={lang} onBack={onBack} onNavigate={onNavigate} onOpenDemo={onOpenDemo} />
      )}
      {page === "cookies" && (
        <CookiePolicySubpage lang={lang} onBack={onBack} onNavigate={onNavigate} onOpenDemo={onOpenDemo} />
      )}
      {page === "specs" && (
        <SpecsSubpage lang={lang} onBack={onBack} />
      )}
      {page === "faq" && (
        <FaqSubpage lang={lang} onBack={onBack} onOpenDemo={onOpenDemo} />
      )}
      {page === "zkp-demo" && (
        <ZkpVisualizer lang={lang} onBack={onBack} onOpenDemo={onOpenDemo} />
      )}
    </motion.div>
  );
}
