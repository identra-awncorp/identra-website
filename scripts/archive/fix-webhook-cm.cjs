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
  let content = fs.readFileSync('src/components/CaseManagementPage.tsx', 'utf8');
  
  const match = content.match(/const webhookSimTranslations = \{\n  en: \[([\s\S]*?)\n  \],\n  vi: \[([\s\S]*?)\n  \]\n\};/);
  if (match) {
    const enBlock = match[1];
    const viBlock = match[2];
    
    // Parse en lines
    const enLines = [...enBlock.matchAll(/'([^']+)'/g)].map(m => m[1]);
    
    let esBlock = [];
    let jaBlock = [];
    let deBlock = [];
    
    for (const line of enLines) {
      esBlock.push("    '" + (await translateText(line, 'es')).replace(/'/g, "\\'") + "'");
      jaBlock.push("    '" + (await translateText(line, 'ja')).replace(/'/g, "\\'") + "'");
      deBlock.push("    '" + (await translateText(line, 'de')).replace(/'/g, "\\'") + "'");
    }
    
    const newBlockStr = `const webhookSimTranslations = {\n  en: [\n${enBlock}\n  ],\n  es: [\n${esBlock.join(',\n')}\n  ],\n  ja: [\n${jaBlock.join(',\n')}\n  ],\n  de: [\n${deBlock.join(',\n')}\n  ],\n  vi: [\n${viBlock}\n  ]\n};`;
    
    content = content.replace(match[0], newBlockStr);
    fs.writeFileSync('src/components/CaseManagementPage.tsx', content);
    console.log("Updated webhookSimTranslations");
  } else {
    console.log("Not found.");
  }
})();
