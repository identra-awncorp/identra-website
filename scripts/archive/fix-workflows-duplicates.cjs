const fs = require('fs');
let content = fs.readFileSync('src/components/WorkflowsPage.tsx', 'utf8');

const startIndex = content.indexOf('const TRANSLATIONS = {');
const endIndex = content.indexOf('interface WorkflowsPageProps');

if (startIndex !== -1 && endIndex !== -1) {
  const translationsStr = content.substring(startIndex, endIndex);
  
  const langBlocks = { en: '', vi: '', es: '', ja: '', de: '' };
  const extractBlock = (lang) => {
     const regex = new RegExp(`  ${lang}: \\{([\\s\\S]*?)\n  \\}(?=[,;])`, 'g');
     let m;
     let lastContent = '';
     while ((m = regex.exec(translationsStr)) !== null) {
        lastContent = m[1];
     }
     if (lastContent) {
        langBlocks[lang] = `  ${lang}: {${lastContent}\n  }`;
     }
  };
  ['en', 'vi', 'es', 'ja', 'de'].forEach(extractBlock);
  
  const newTranslations = `const TRANSLATIONS = {\n${langBlocks.en},\n${langBlocks.es},\n${langBlocks.ja},\n${langBlocks.de},\n${langBlocks.vi}\n};\n`;
  
  content = content.substring(0, startIndex) + newTranslations + content.substring(endIndex);
  fs.writeFileSync('src/components/WorkflowsPage.tsx', content);
  console.log("Fixed duplicates");
} else {
  console.log("Not found.");
}
