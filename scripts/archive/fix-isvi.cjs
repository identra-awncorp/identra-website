const fs = require('fs');

const fixFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add getLocalizedValue if not present
    if (!content.includes('const getLocalizedValue')) {
        const insertAfter = 'export default function ';
        const insertIndex = content.indexOf(insertAfter);
        if (insertIndex !== -1) {
            content = content.replace(insertAfter, `const getLocalizedValue = (obj: any, keyPrefix: string, lang: string) => {
  if (lang === 'vi') return obj[\`\${keyPrefix}Vi\`];
  if (lang === 'es') return obj[\`\${keyPrefix}Es\`];
  if (lang === 'ja') return obj[\`\${keyPrefix}Ja\`];
  if (lang === 'de') return obj[\`\${keyPrefix}De\`];
  return obj[\`\${keyPrefix}En\`];
};\n\n${insertAfter}`);
        }
    }
    
    // Replace isVi ? obj.keyVi : obj.keyEn -> getLocalizedValue(obj, 'key', language)
    const regexObj = /isVi \? ([a-zA-Z0-9_]+\[[a-zA-Z0-9_]+\]|\w+)\.([a-zA-Z0-9_]+)Vi : \1\.\2En/g;
    content = content.replace(regexObj, (match, objName, keyPrefix) => {
        return `getLocalizedValue(${objName}, '${keyPrefix}', language)`;
    });
    
    // Replace isVi ? 'String Vi' : 'String En'
    // This requires adding translations to TRANSLATIONS object!
    // But since it's hardcoded everywhere, wait, let me check how many are just raw strings.
    fs.writeFileSync(filePath, content);
};

fixFile('src/components/DemoPage.tsx');
fixFile('src/components/DemoScenarioActionPage.tsx');

console.log("Replaced obj values");
