const fs = require('fs');
let content = fs.readFileSync('src/components/CaseManagementPage.tsx', 'utf8');

const blockRegex = /const ([a-zA-Z0-9_]+) = \{\n  en: /g;
let match;
while ((match = blockRegex.exec(content)) !== null) {
  const name = match[1];
  // extract the block content properly
  const blockStart = match.index;
  let braces = 0;
  let inString = false;
  let stringChar = '';
  let blockEnd = -1;
  for (let i = blockStart; i < content.length; i++) {
    const c = content[i];
    if (inString) {
      if (c === stringChar && content[i-1] !== '\\') {
        inString = false;
      }
    } else {
      if (c === "'" || c === '"' || c === '`') {
        inString = true;
        stringChar = c;
      } else if (c === '{') {
        braces++;
      } else if (c === '}') {
        braces--;
        if (braces === 0) {
          blockEnd = i;
          break;
        }
      }
    }
  }
  const blockStr = content.substring(blockStart, blockEnd + 1);
  const langs = ['en', 'vi', 'es', 'ja', 'de'];
  const missing = langs.filter(lang => !blockStr.includes(`\n  ${lang}: `));
  if (missing.length > 0) {
     console.log(`${name} is missing: ${missing.join(', ')}`);
  } else {
     console.log(`${name} has all langs!`);
  }
}
