const fs = require('fs');

const files = [
  'src/components/PassiveSignalsPage.tsx',
  'src/components/SelfieAgeEstimationPage.tsx',
  'src/components/DocumentAIPage.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  // Find TRANSLATIONS block
  let startIndex = newContent.indexOf('const TRANSLATIONS = {');
  if (startIndex === -1) {
    startIndex = newContent.indexOf('const flowTranslations = {');
  }
  
  if (startIndex !== -1) {
      let viIndex = newContent.indexOf('\n  vi: {', startIndex);
      if (viIndex !== -1) {
          let enBlockStart = newContent.indexOf('  en: {', startIndex) + 7;
          let enBlockEnd = newContent.lastIndexOf('  },', viIndex);
          
          if (enBlockEnd === -1) {
             enBlockEnd = viIndex; 
          }
          
          let enBody = newContent.substring(enBlockStart, enBlockEnd);
          
          let newEs = `\n  es: {\n${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (ES)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (ES)"`)}\n  },`;
          let newJa = `\n  ja: {\n${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (JA)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (JA)"`)}\n  },`;
          let newDe = `\n  de: {\n${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (DE)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (DE)"`)}\n  },`;
          
          // Insert right before vi: {
          newContent = newContent.slice(0, viIndex) + newEs + newJa + newDe + newContent.slice(viIndex);
          
          fs.writeFileSync(file, newContent);
          console.log(`Updated ${file}`);
      }
  }
}
