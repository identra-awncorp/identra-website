const fs = require('fs');
let content = fs.readFileSync('src/components/CaseManagementPage.tsx', 'utf8');
const blockRegex = /const ([a-zA-Z0-9_]+) = \{\n  en: \{([\s\S]*?)\n  \},\n  vi: \{([\s\S]*?)\n  \}/g;
let match;
while ((match = blockRegex.exec(content)) !== null) {
   console.log("Matched: " + match[1]);
}
