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

(async () => {
  let content = fs.readFileSync('src/components/DemoPage.tsx', 'utf8');

  // Find the DEMO_SCENARIOS array bounds
  const startIndex = content.indexOf('const DEMO_SCENARIOS: Scenario[] = [');
  const endIndex = content.indexOf('export default function DemoPage');
  
  if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find DEMO_SCENARIOS");
    return;
  }
  
  let block = content.substring(startIndex, endIndex);
  
  const stringRegex = /([a-zA-Z0-9_]+)En:\s*(['"`])([\s\S]*?)\2,/g;
  
  let newBlock = block;
  let m;
  const translations = [];
  while ((m = stringRegex.exec(block)) !== null) {
      translations.push({
          fullMatch: m[0],
          keyPrefix: m[1],
          quote: m[2],
          text: m[3],
          index: m.index
      });
  }
  
  console.log(`Found ${translations.length} strings to translate.`);
  
  translations.reverse();
  
  for (const item of translations) {
      const [es, ja, de] = await Promise.all([
          translateText(item.text, 'es'),
          translateText(item.text, 'ja'),
          translateText(item.text, 'de')
      ]);
      
      const toInsert = `\n    ${item.keyPrefix}Es: ${item.quote}${es.replace(new RegExp(item.quote, 'g'), '\\'+item.quote)}${item.quote},\n    ${item.keyPrefix}Ja: ${item.quote}${ja.replace(new RegExp(item.quote, 'g'), '\\'+item.quote)}${item.quote},\n    ${item.keyPrefix}De: ${item.quote}${de.replace(new RegExp(item.quote, 'g'), '\\'+item.quote)}${item.quote},`;
      
      const insertPos = item.index + item.fullMatch.length;
      newBlock = newBlock.substring(0, insertPos) + toInsert + newBlock.substring(insertPos);
  }
  
  // Interface Scenario
  let interfaceContent = content.match(/interface Scenario \{([\s\S]*?)\}/)[1];
  let newInterfaceContent = interfaceContent;
  const interfaceRegex = /([a-zA-Z0-9_]+)En: string;/g;
  
  while ((m = interfaceRegex.exec(interfaceContent)) !== null) {
      const keyPrefix = m[1];
      newInterfaceContent = newInterfaceContent.replace(m[0], `${m[0]}\n  ${keyPrefix}Es: string;\n  ${keyPrefix}Ja: string;\n  ${keyPrefix}De: string;`);
  }
  
  content = content.replace(interfaceContent, newInterfaceContent);
  content = content.substring(0, startIndex) + newBlock + content.substring(endIndex);
  
  fs.writeFileSync('src/components/DemoPage.tsx', content);
  console.log("Done translating DEMO_SCENARIOS");
})();
