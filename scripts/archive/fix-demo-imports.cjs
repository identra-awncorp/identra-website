const fs = require('fs');

let demoPageContent = fs.readFileSync('src/components/DemoPage.tsx', 'utf8');
if (!demoPageContent.includes('import DemoScenarioActionPage')) {
    demoPageContent = demoPageContent.replace(
        "import DemoGlobalTrendsDashboard from './DemoGlobalTrendsDashboard';",
        "import DemoGlobalTrendsDashboard from './DemoGlobalTrendsDashboard';\nimport DemoScenarioActionPage from './DemoScenarioActionPage';\nimport { Sparkles, Layers, Check, CheckCircle2, User, FileText, Fingerprint, ShieldAlert } from 'lucide-react';"
    );
    fs.writeFileSync('src/components/DemoPage.tsx', demoPageContent);
}

let actionPageContent = fs.readFileSync('src/components/DemoScenarioActionPage.tsx', 'utf8');
if (actionPageContent.includes('const { language }') === false) {
    // wait, does it have useLanguage?
    actionPageContent = actionPageContent.replace(
        "const isVi = language === 'vi';",
        "const isVi = language === 'vi';" // Wait, language might not be defined if useLanguage wasn't used or extracted. Let's do it via regex.
    );
}

// let's do a more robust fix for DemoScenarioActionPage
if (!actionPageContent.includes('const { language } = useLanguage();')) {
    actionPageContent = actionPageContent.replace(
        "export default function DemoScenarioActionPage({ scenario, onBack, onComplete }: DemoScenarioActionPageProps) {",
        "export default function DemoScenarioActionPage({ scenario, onBack, onComplete }: DemoScenarioActionPageProps) {\n  const { language } = useLanguage();"
    );
    // ensure useLanguage is imported
    if (!actionPageContent.includes("import { useLanguage } from '../context/LanguageContext';")) {
        actionPageContent = actionPageContent.replace(
            "import { ArrowLeft,",
            "import { useLanguage } from '../context/LanguageContext';\nimport { ArrowLeft,"
        );
    }
    fs.writeFileSync('src/components/DemoScenarioActionPage.tsx', actionPageContent);
} else {
    // If language is already there but not accessible, maybe it's missing in the component?
    console.log("Action Page already has useLanguage");
}
