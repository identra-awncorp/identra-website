const fs = require('fs');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Split the file on "const TRANSLATIONS = {"
    const parts = content.split(/const (?:TRANSLATIONS|flowTranslations) = \{\n/);
    if (parts.length < 2) return;
    
    const beforeObj = parts[0];
    const afterStart = parts[1];
    
    // Find the end of the TRANSLATIONS object
    // This assumes the object ends with "\n};\n" or "\n};" at the root level
    const endParts = afterStart.split(/\n\};\n/);
    let afterObj = '';
    let objContent = '';
    
    if (endParts.length > 1) {
        objContent = endParts[0];
        afterObj = '\n' + endParts.slice(1).join('\n};\n');
    } else {
        const endParts2 = afterStart.split(/\n\};/);
        objContent = endParts2[0];
        afterObj = endParts2.slice(1).join('\n};');
    }
    
    // Use regex to carefully extract the 'en' and 'vi' keys, assuming they are top-level
    // We look for "  en: {" and extract everything up to "\n  vi: {" or the end
    
    const enRegex = /  en: \{([\s\S]*?)\n  \}(?:,\n  vi: \{|,?\n$)/;
    const enMatch = objContent.match(enRegex);
    
    if (!enMatch) {
         console.log(`Could not find en block in ${filePath}`);
         return;
    }
    
    const enBody = enMatch[1];
    
    const viRegex = /  vi: \{([\s\S]*?)\n  \}/;
    const viMatch = objContent.match(viRegex);
    
    let viBodyStr = '';
    if (viMatch) {
        viBodyStr = `\n  vi: {\n${viMatch[1]}\n  }`;
    }
    
    let newEs = `\n  es: {${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (ES)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (ES)"`)}\n  },`;
    let newJa = `\n  ja: {${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (JA)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (JA)"`)}\n  },`;
    let newDe = `\n  de: {${enBody.replace(/:\s*'(.*?)'/g, (m, p1) => `: '${p1} (DE)'`).replace(/:\s*"(.*?)"/g, (m, p1) => `: "${p1} (DE)"`)}\n  },`;
    
    let newObjContent = `  en: {${enBody}\n  },${newEs}${newJa}${newDe}${viBodyStr}`;
    
    let varMatch = content.match(/const (TRANSLATIONS|flowTranslations) = {/)[1];
    let newFileContent = beforeObj + `const ${varMatch} = {\n` + newObjContent + '\n};\n' + afterObj;
    
    fs.writeFileSync(filePath, newFileContent);
    console.log(`Updated ${filePath}`);
}

const files = [
  'src/components/PassiveSignalsPage.tsx',
  'src/components/SelfieAgeEstimationPage.tsx',
  'src/components/DocumentAIPage.tsx'
];

for (const file of files) {
  processFile(file);
}
