const fs = require('fs');

const filesToFix = ['src/components/MarketplacePage.tsx', 'src/components/GraphPage.tsx'];

for (const file of filesToFix) {
    let content = fs.readFileSync(file, 'utf8');
    
    // We want to delete duplicate ES, JA, DE blocks.
    // The easiest way is to use regex and map through blocks
    const varMatches = content.match(/const [a-zA-Z0-9_]+ = \{[\s\S]*?\n  vi: \{/g);
    if (!varMatches) continue;
    
    let newContent = content;
    
    for (const matchStr of varMatches) {
        // extract en: {} and vi: {}
        const enMatch = matchStr.match(/  en: \{([\s\S]*?)\n  \},/);
        const viMatch = matchStr.match(/\n  vi: \{/);
        
        if (enMatch && viMatch) {
            // Rebuild the block with only the FIRST es, ja, de blocks
            let rebuilt = `const ${matchStr.split(' = {')[0].split('const ')[1]} = {\n  en: {${enMatch[1]}\n  },`;
            
            const langs = ['es', 'ja', 'de'];
            for (const lang of langs) {
                const langMatch = matchStr.match(new RegExp(`  ${lang}: \\{([\\s\\S]*?)\n  \\},`));
                if (langMatch) {
                    rebuilt += `\n  ${lang}: {${langMatch[1]}\n  },`;
                }
            }
            rebuilt += `\n  vi: {`;
            
            newContent = newContent.replace(matchStr, rebuilt);
        }
    }
    
    fs.writeFileSync(file, newContent);
    console.log("Fixed " + file);
}
