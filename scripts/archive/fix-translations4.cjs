const fs = require('fs');

const generateFileTranslations = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find TRANSLATIONS object
  const regex = /const (TRANSLATIONS|flowTranslations) = {([\s\S]*?)\n};/;
  const match = content.match(regex);
  if (!match) return;
  
  // Manually split and find EN and VI objects since regex matching on large blocks can be flaky
  let insideEn = false;
  let insideVi = false;
  let enBody = '';
  let viBody = '';
  
  const lines = match[2].split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.match(/^  en: {/)) {
      insideEn = true;
      continue;
    }
    
    if (line.match(/^  },?/) && insideEn && !line.match(/      },?/)) {
      // Could be end of en: {
      // Check if next line is vi: { or another language, or end of object
      insideEn = false;
      continue;
    }
    
    if (line.match(/^  vi: {/)) {
      insideVi = true;
      continue;
    }
    
    if (line.match(/^  },?/) && insideVi && !line.match(/      },?/)) {
      insideVi = false;
      continue;
    }
    
    if (insideEn) {
      enBody += line + '\n';
    } else if (insideVi) {
      viBody += line + '\n';
    }
  }
  
  let newEs = `  es: {\n${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (ES)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (ES)"`)}  },`;
  let newJa = `  ja: {\n${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (JA)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (JA)"`)}  },`;
  let newDe = `  de: {\n${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (DE)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (DE)"`)}  },`;
  
  const newTranslationsStr = `const ${match[1]} = {\n  en: {\n${enBody}  },\n${newEs}\n${newJa}\n${newDe}\n  vi: {\n${viBody}  }`;
  
  content = content.replace(regex, newTranslationsStr + '\n};');
  
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
