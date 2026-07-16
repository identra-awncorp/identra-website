const fs = require('fs');
const https = require('https');

const translateText = (text, targetLang) => {
  return new Promise((resolve) => {
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

const missingVals = [
  'Canada', 'United Kingdom', 'Ireland', 'Austria',
  'M247 Ltd (Tor Exit Node)', 'Frankfurt, DE',
  'iPhone 13,1 Mini', 'iOS 15.4.1', 'en-US', 'c9d8f36a83210bc',
  'TempMail.co (Disposable)', 'T-Mobile US', 'New York, USA',
  'Chime Financial', '•••• 8291', 'Bandwidth.com (VoIP)',
  'MacBook Pro 16', 'macOS 12.3', 'a2e4d10f882a77e',
  'David Vance', 'Evelyn Miller', 'Frank Chen', 'Grace Kelly', 'Henry Ford', 'Irene Adler'
];

(async () => {
  let content = fs.readFileSync('src/components/GraphPage.tsx', 'utf8');

  // parse localizedDict
  const match = content.match(/const localizedDict: Record<string, Record<string, string>> = ([\s\S]*?);\n\nconst translateNodeKeys/);
  if (!match) {
    console.log("No localizedDict found");
    return;
  }
  
  const dict = new Function('return ' + match[1])();
  
  // Also we want to ensure we don't translate hardware/hashes strangely, but let's translate everything just to be safe.
  
  console.log('Translating missing terms...');
  for (let i = 0; i < missingVals.length; i += 5) {
      const batch = missingVals.slice(i, i + 5);
      await Promise.all(batch.map(async (text) => {
          const [vi, es, ja, de] = await Promise.all([
              translateText(text, 'vi'),
              translateText(text, 'es'),
              translateText(text, 'ja'),
              translateText(text, 'de')
          ]);
          dict.vi[text] = vi;
          dict.es[text] = es;
          dict.ja[text] = ja;
          dict.de[text] = de;
      }));
  }
  
  const dictStr = "const localizedDict: Record<string, Record<string, string>> = " + JSON.stringify(dict, null, 2) + ";";

  content = content.replace(/const localizedDict: Record<string, Record<string, string>> = [\s\S]*?;\n\nconst translateNodeKeys/, dictStr + "\n\nconst translateNodeKeys");
  
  fs.writeFileSync('src/components/GraphPage.tsx', content);
  console.log("Done");
})();
