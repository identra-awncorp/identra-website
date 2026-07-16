const fs = require('fs');

let content = fs.readFileSync('src/components/DemoPage.tsx', 'utf8');

if (!content.includes('import DemoScenarioActionPage')) {
    content = content.replace("import DemoGlobalTrendsDashboard from './DemoGlobalTrendsDashboard';", "import DemoGlobalTrendsDashboard from './DemoGlobalTrendsDashboard';\nimport DemoScenarioActionPage from './DemoScenarioActionPage';");
}
if (!content.includes('Sparkles')) {
    content = content.replace("import { ArrowLeft, Play,", "import { ArrowLeft, Play, Sparkles, Layers, Check, CheckCircle2, User, FileText, Fingerprint, ShieldAlert,");
}
fs.writeFileSync('src/components/DemoPage.tsx', content);
