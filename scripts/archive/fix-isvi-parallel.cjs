const fs = require('fs');
const https = require('https');

const translateText = (text, targetLang) => {
  return new Promise((resolve, reject) => {
    if (!text || typeof text !== 'string') return resolve(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json && json[0]) {
             resolve(json[0].map(item => item[0]).join(''));
          } else {
             resolve(text);
          }
        } catch (e) {
          resolve(text);
        }
      });
    }).on('error', (e) => resolve(text));
  });
};

(async () => {
  let content = fs.readFileSync('src/components/PassiveSignalsPage.tsx', 'utf8');
  
  const matches = [...content.matchAll(/isVi \? ('[^']*'|`[^`]*`) : ('[^']*'|`[^`]*`)/g)];
  const dict = {};
  for (const match of matches) {
      let enStr = match[2].slice(1, -1);
      let viStr = match[1].slice(1, -1);
      if (!dict[enStr]) dict[enStr] = { vi: viStr, es: '', ja: '', de: '' };
  }
  
  const arrMatches = [...content.matchAll(/isVi \? (\[[\s\S]*?\]) : (\[[\s\S]*?\])/g)];
  for (const match of arrMatches) {
      const enArr = match[2].match(/'([^']*)'/g).map(s => s.slice(1, -1));
      const viArr = match[1].match(/'([^']*)'/g).map(s => s.slice(1, -1));
      
      for (let i = 0; i < enArr.length; i++) {
          if (!dict[enArr[i]]) dict[enArr[i]] = { vi: viArr[i], es: '', ja: '', de: '' };
      }
  }
  
  const descMatches = [...content.matchAll(/isVi[\s\n]*\?[\s\n]*'([^']*)'[\s\n]*:[\s\n]*'([^']*)'/g)];
  for (const match of descMatches) {
      if (!dict[match[2]]) dict[match[2]] = { vi: match[1], es: '', ja: '', de: '' };
  }
  
  console.log(`Translating ${Object.keys(dict).length} keys...`);
  
  // Parallel translation with limited concurrency (e.g. 5 at a time)
  const keys = Object.keys(dict);
  for (let i = 0; i < keys.length; i += 5) {
      const batch = keys.slice(i, i + 5);
      await Promise.all(batch.map(async (enStr) => {
          const [es, ja, de] = await Promise.all([
              translateText(enStr, 'es'),
              translateText(enStr, 'ja'),
              translateText(enStr, 'de')
          ]);
          dict[enStr].es = es;
          dict[enStr].ja = ja;
          dict[enStr].de = de;
      }));
  }
  
  console.log("Dictionary translated.");
  
  let dictStr = "const inlineTranslations: Record<string, Record<string, string>> = {\n";
  for (const [enStr, trans] of Object.entries(dict)) {
      dictStr += `  "${enStr.replace(/"/g, '\\"')}": {\n`;
      dictStr += `    vi: "${trans.vi.replace(/"/g, '\\"')}",\n`;
      dictStr += `    es: "${trans.es.replace(/"/g, '\\"')}",\n`;
      dictStr += `    ja: "${trans.ja.replace(/"/g, '\\"')}",\n`;
      dictStr += `    de: "${trans.de.replace(/"/g, '\\"')}"\n`;
      dictStr += `  },\n`;
  }
  dictStr += "};\n";
  
  content = content.replace(/const passiveSignalsTranslations = \{[\s\S]*?\n};\n/, match => match + "\n" + dictStr);
  
  const helperFn = `  const tInline = (enStr: string) => {\n    if (language === 'en') return enStr;\n    return inlineTranslations[enStr]?.[language] || enStr;\n  };\n`;
  content = content.replace(/const translateLogLabel = /, helperFn + "\n  const translateLogLabel = ");
  
  for (const match of arrMatches) {
      const enArr = match[2].match(/'([^']*)'/g).map(s => s.slice(1, -1));
      let replacement = `[\n`;
      for (const enStr of enArr) {
          replacement += `        tInline("${enStr.replace(/"/g, '\\"')}"),\n`;
      }
      replacement += `      ]`;
      content = content.replace(match[0], replacement);
  }
  
  for (const match of descMatches) {
      if (match[0].includes('[')) continue;
      content = content.replace(match[0], `tInline("${match[2].replace(/"/g, '\\"')}")`);
  }
  
  for (const match of matches) {
      const enStr = match[2].slice(1, -1);
      content = content.replace(match[0], `tInline("${enStr.replace(/"/g, '\\"')}")`);
  }
  
  fs.writeFileSync('src/components/PassiveSignalsPage.tsx', content);
  console.log("File updated successfully.");
})();
