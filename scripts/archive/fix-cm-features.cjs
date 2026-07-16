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

  // Find FEATURES_DATA, USE_CASES_TRANS, BLOG_TRANS
  const objectNames = ['FEATURES_DATA', 'USE_CASES_TRANS', 'BLOG_TRANS'];
  
  for (const name of objectNames) {
    const regex = new RegExp(`const ${name} = \\{\\n  en: \\[(\\s|\\S)*?\\n  \\],\\n  vi: \\[(\\s|\\S)*?\\n  \\]\\n\\};`);
    const match = content.match(regex);
    if (!match) {
      console.log(`Could not find ${name}`);
      continue;
    }
    
    // We will extract all English strings in '...' or "..." format.
    // However, it's safer to just extract `title`, `desc`, `subText` for FEATURES_DATA etc.
    
    // Let's use a dynamic approach. We'll extract `en` array using eval (safe here) and then translate it.
    let codeStr = match[0].replace(`const ${name} = `, 'return ');
    // We can evaluate this
    const data = new Function(codeStr)();
    
    const enArr = data.en;
    const viArr = data.vi;
    
    console.log(`Translating ${name}...`);
    
    const esArr = [];
    const jaArr = [];
    const deArr = [];
    
    for (const item of enArr) {
       const esItem = {};
       const jaItem = {};
       const deItem = {};
       for (const [key, val] of Object.entries(item)) {
          if (typeof val === 'string') {
             esItem[key] = await translateText(val, 'es');
             jaItem[key] = await translateText(val, 'ja');
             deItem[key] = await translateText(val, 'de');
          } else {
             esItem[key] = val;
             jaItem[key] = val;
             deItem[key] = val;
          }
       }
       esArr.push(esItem);
       jaArr.push(jaItem);
       deArr.push(deItem);
    }
    
    // Stringify array of objects
    const stringifyArr = (arr) => {
       let str = '[\n';
       for (const item of arr) {
          str += '    {\n';
          for (const [key, val] of Object.entries(item)) {
             if (typeof val === 'string') {
                str += `      ${key}: '${val.replace(/'/g, "\\'")}',\n`;
             } else {
                str += `      ${key}: ${JSON.stringify(val)},\n`;
             }
          }
          str += '    },\n';
       }
       str += '  ]';
       return str;
    };
    
    const newBlockStr = `const ${name} = {\n  en: ${stringifyArr(enArr)},\n  es: ${stringifyArr(esArr)},\n  ja: ${stringifyArr(jaArr)},\n  de: ${stringifyArr(deArr)},\n  vi: ${stringifyArr(viArr)}\n};`;
    content = content.replace(match[0], newBlockStr);
    console.log(`Updated ${name}`);
  }
  
  fs.writeFileSync('src/components/CaseManagementPage.tsx', content);
  console.log("Done");
})();
