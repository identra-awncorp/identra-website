const fs = require('fs');

const generateFileTranslations = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find TRANSLATIONS object
  const regex = /const (TRANSLATIONS|flowTranslations) = {([\s\S]*?)\n};/;
  const match = content.match(regex);
  if (!match) return;
  
  // Extract English object - Try finding en: { ... } followed by ANY language
  const enRegex = /en: {([\s\S]*?)},\n  [a-z]{2}: {/s;
  const enMatch = match[0].match(enRegex);
  
  if (!enMatch) {
    console.log(`Could not find english match in ${filePath}`);
    return;
  }
  
  const enBody = enMatch[1];
  
  let newEs = `  es: {${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (ES)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (ES)"`)}\n  },`;
  let newJa = `  ja: {${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (JA)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (JA)"`)}\n  },`;
  let newDe = `  de: {${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (DE)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (DE)"`)}\n  },`;
  
  // Replace EVERYTHING between en: { ... } and vi: { ... } with the new languages
  // First, isolate the vi body
  const viRegex = /  vi: {([\s\S]*?)\n  }/s;
  const viMatch = match[0].match(viRegex);
  
  if (!viMatch) {
      console.log(`Could not find vi match in ${filePath}`);
      return;
  }
  
  const viBody = viMatch[1];
  const newTranslationsStr = `const ${match[1]} = {\n  en: {${enBody}},\n${newEs}\n${newJa}\n${newDe}\n  vi: {${viBody}\n  }`;
  
  content = content.replace(regex, newTranslationsStr + '\n};');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
};

const files = [
  'src/components/PassiveSignalsPage.tsx',
  'src/components/SelfieAgeEstimationPage.tsx',
  'src/components/DocumentAIPage.tsx',
  'src/components/CopilotPage.tsx'
];

for (const file of files) {
  generateFileTranslations(file);
}
