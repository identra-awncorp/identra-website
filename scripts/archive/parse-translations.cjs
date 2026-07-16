const fs = require('fs');

const files = [
  'src/components/PassiveSignalsPage.tsx',
  'src/components/SelfieAgeEstimationPage.tsx',
  'src/components/DocumentAIPage.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const varMatch = content.match(/const (TRANSLATIONS|flowTranslations) = {([\s\S]*?)};\n/);
  
  if (varMatch) {
      let block = varMatch[2];
      
      // We know en: { starts at the beginning, vi: { starts later.
      // Let's just do a dirty replace.
      
      let viSplit = block.split(/\n  vi: {/);
      if (viSplit.length === 2) {
          let enBlock = viSplit[0].replace(/^\s*en: {/, '');
          
          let newEs = `  es: {${enBlock.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (ES)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (ES)"`)}\n  },`;
          let newJa = `  ja: {${enBlock.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (JA)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (JA)"`)}\n  },`;
          let newDe = `  de: {${enBlock.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (DE)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (DE)"`)}\n  },`;
          
          let newContent = content.replace(varMatch[0], `const ${varMatch[1]} = {\n  en: {${enBlock}\n${newEs}\n${newJa}\n${newDe}\n  vi: {${viSplit[1]}};\n`);
          fs.writeFileSync(file, newContent);
          console.log(`Updated ${file}`);
      }
  }
}
