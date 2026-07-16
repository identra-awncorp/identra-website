const fs = require('fs');
let content = fs.readFileSync('src/components/GraphPage.tsx', 'utf8');

const m = content.match(/const TRANSLATIONS = \{\n([\s\S]*?)\n\};\n\nconst localizedDict/);
if (m) {
  const f = new Function('return {' + m[1] + '}');
  const t = f();
  const enKeys = Object.keys(t.en);
  for (const lang of Object.keys(t)) {
    if (lang === 'en') continue;
    const langKeys = Object.keys(t[lang]);
    for (const key of enKeys) {
      if (!langKeys.includes(key)) {
        console.log(`Missing key ${key} in ${lang}`);
      }
    }
  }
}
