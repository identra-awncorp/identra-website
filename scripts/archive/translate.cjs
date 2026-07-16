const fs = require('fs');

const generateFileTranslations = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find TRANSLATIONS object
  const regex = /const (TRANSLATIONS|flowTranslations) = {([\s\S]*?)\n};/;
  const match = content.match(regex);
  if (!match) return;
  
  // Extract English object
  const enRegex = /en: {([\s\S]*?)},\n  vi: {/s;
  const enMatch = match[0].match(enRegex);
  if (!enMatch) return;
  
  const enBody = enMatch[1];
  
  let newEs = `  es: {${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (ES)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (ES)"`)}\n  },`;
  let newJa = `  ja: {${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (JA)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (JA)"`)}\n  },`;
  let newDe = `  de: {${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (DE)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (DE)"`)}\n  },`;
  
  const newTranslationsStr = `const ${match[1]} = {\n  en: {${enBody}},\n${newEs}\n${newJa}\n${newDe}\n  vi: {`;
  
  content = content.replace(/const (TRANSLATIONS|flowTranslations) = {([\s\S]*?)  vi: {/, newTranslationsStr);
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
};

const files = [
  'src/components/PassiveSignalsPage.tsx',
  'src/components/SelfieAgeEstimationPage.tsx',
  'src/components/DocumentAIPage.tsx'
];

for (const file of files) {
  generateFileTranslations(file);
}
