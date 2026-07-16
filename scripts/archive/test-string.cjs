const fs = require('fs');

const filePath = 'src/components/PassiveSignalsPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /const TRANSLATIONS = \{\n  en: \{([\s\S]*?)\n  \},\n  vi: \{/s;
const match = content.match(regex);

if (match) {
    const enBody = match[1];
    let newEs = `\n  es: {\n${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (ES)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (ES)"`)}\n  },`;
    let newJa = `\n  ja: {\n${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (JA)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (JA)"`)}\n  },`;
    let newDe = `\n  de: {\n${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (DE)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (DE)"`)}\n  },`;
    
    let newContent = content.replace(regex, `const TRANSLATIONS = {\n  en: {\n${enBody}\n  },${newEs}${newJa}${newDe}\n  vi: {`);
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${filePath}`);
} else {
    console.log("Regex didn't match.");
}
