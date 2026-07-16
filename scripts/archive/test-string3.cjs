const fs = require('fs');

const files = [
  'src/components/SelfieAgeEstimationPage.tsx',
  'src/components/DocumentAIPage.tsx'
];

for (const filePath of files) {
    let content = fs.readFileSync(filePath, 'utf8');

    const regex = /const (?:[a-zA-Z0-9]+Translations|TRANSLATIONS)[^=]*= \{\n  en: \{([\s\S]*?)\n  \},\n  vi: \{/s;
    const match = content.match(regex);

    if (match) {
        const enBody = match[1];
        let newEs = `\n  es: {\n${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (ES)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (ES)"`)}\n  },`;
        let newJa = `\n  ja: {\n${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (JA)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (JA)"`)}\n  },`;
        let newDe = `\n  de: {\n${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (DE)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (DE)"`)}\n  },`;
        
        // Find exactly the string before en: {
        const varMatch = content.match(/(const (?:[a-zA-Z0-9]+Translations|TRANSLATIONS)[^=]*= \{\n)  en: \{/s);
        
        let newContent = content.replace(regex, `${varMatch[1]}  en: {\n${enBody}\n  },${newEs}${newJa}${newDe}\n  vi: {`);
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated ${filePath}`);
    } else {
        console.log(`Regex didn't match in ${filePath}`);
    }
}
