const fs = require('fs');

const filePath = 'src/components/PassiveSignalsPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /const (TRANSLATIONS|flowTranslations) = {([\s\S]*?)\n};/;
const match = content.match(regex);

if (match) {
    console.log("Matched TRANSLATIONS!");
    // console.log(match[2].substring(0, 500));
    
    // Use a very robust way to split the languages based on known indentation
    const parts = match[2].split(/\n  ([a-z]{2}): {\n/);
    console.log("Parts length: ", parts.length);
    // for (let i = 0; i < parts.length; i++) {
    //    console.log(`Part ${i}: ${parts[i].substring(0, 50)}...`);
    // }
    
    // Workaround: We know the first part might have '  en: {'
    const lines = match[2].split('\n');
    let currentLang = null;
    let extractedLangs = {};
    
    for (const line of lines) {
        const langMatch = line.match(/^  ([a-z]{2}): {/);
        if (langMatch) {
            currentLang = langMatch[1];
            extractedLangs[currentLang] = '';
            continue;
        }
        
        if (line === '  },' || line === '  }') {
             // could be end of lang block, but we have nested blocks in some files like tabs: { ... }
             // Only end if the next line is another lang or end of object
             // Actually, this is too hard to parse manually.
        }
    }
}
