const fs = require('fs');
let content = fs.readFileSync('src/components/GraphPage.tsx', 'utf8');
const match = content.match(/const localizedDict: Record<string, Record<string, string>> = ([\s\S]*?);\n\nconst translateNodeKeys/);
if (match) {
  const dict = JSON.parse(match[1]);
  const viKeys = Object.keys(dict.vi);
  for (const lang of Object.keys(dict)) {
    if (lang === 'vi') continue;
    const langKeys = Object.keys(dict[lang]);
    for (const key of viKeys) {
      if (!langKeys.includes(key)) {
        console.log(`Missing key ${key} in ${lang}`);
      }
    }
  }
}
