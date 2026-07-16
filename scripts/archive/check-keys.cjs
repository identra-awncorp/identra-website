const fs = require('fs');

const filePath = 'src/components/PassiveSignalsPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const match = content.match(/const passiveSignalsTranslations = \{([\s\S]*?)\n\};\n/);
if (match) {
  const translations = match[1];
  const enBlock = translations.match(/  en: \{([\s\S]*?)\n  \},/)[1];
  const enKeys = [...enBlock.matchAll(/([a-zA-Z0-9_]+):/g)].map(m => m[1]);
  
  const langs = ['es', 'ja', 'de', 'vi'];
  for (const lang of langs) {
     const langMatch = translations.match(new RegExp(`  ${lang}: \\{([\\s\\S]*?)\n  \\}`));
     if (langMatch) {
       const langKeys = [...langMatch[1].matchAll(/([a-zA-Z0-9_]+):/g)].map(m => m[1]);
       const missing = enKeys.filter(k => !langKeys.includes(k));
       if (missing.length > 0) {
         console.log(`Missing in ${lang}: ${missing.join(', ')}`);
       } else {
         console.log(`${lang} has all keys!`);
       }
     } else {
         console.log(`Missing ${lang} block entirely`);
     }
  }
}
