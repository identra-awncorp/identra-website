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

const enKeys = [
  'Email', 'Signup Date', 'Country', 'ID Status', 'ISP/Host', 'Fraud Score',
  'Region', 'Connections', 'Hardware', 'OS', 'Language', 'Fingerprint',
  'Provider', 'Status', 'Linked accounts', 'Carrier', 'Type', 'Location',
  'Risk Score', 'Bank', 'Account', 'Holders Mismatch', 'Linked Accounts',
  'Verification'
];

const enVals = [
  'Passed', 'United States', 'United Kingdom', 
  'Today, 10:42 AM', 'Today, 10:45 AM', 'Today, 10:47 AM', 
  'Today, 08:12 AM', 'Today, 08:15 AM', 'Today, 08:19 AM', 
  '3 Users', 'Flagged', 'Mobile', 'Virtual Phone', 'Failed SMS OTP', 'True'
];

const dynamicVals = [
  '(Disposable)', '(Tor Exit Node)', 'VPN IP:', 'Device Hash:', 'Chime Routing:'
];

const viKeys = {
    'Email': 'Email',
    'Signup Date': 'Ngày đăng ký',
    'Country': 'Quốc gia',
    'ID Status': 'Trạng thái ID',
    'ISP/Host': 'ISP/Máy lưu trữ',
    'Fraud Score': 'Điểm gian lận',
    'Region': 'Khu vực',
    'Connections': 'Kết nối',
    'Hardware': 'Phần cứng',
    'OS': 'Hệ điều hành',
    'Language': 'Ngôn ngữ',
    'Fingerprint': 'Vân tay',
    'Provider': 'Nhà cung cấp',
    'Status': 'Trạng thái',
    'Linked accounts': 'Tài khoản liên kết',
    'Carrier': 'Nhà mạng',
    'Type': 'Loại',
    'Location': 'Vị trí',
    'Risk Score': 'Điểm rủi ro',
    'Bank': 'Ngân hàng',
    'Account': 'Tài khoản',
    'Holders Mismatch': 'Không khớp Chủ sở hữu',
    'Linked Accounts': 'Các tài khoản liên kết',
    'Verification': 'Xác minh'
};

const viVals = {
    'Passed': 'Đã đạt',
    'United States': 'Hoa Kỳ',
    'United Kingdom': 'Vương quốc Anh',
    'Today, 10:42 AM': 'Hôm nay, 10:42 SA',
    'Today, 10:45 AM': 'Hôm nay, 10:45 SA',
    'Today, 10:47 AM': 'Hôm nay, 10:47 SA',
    'Today, 08:12 AM': 'Hôm nay, 08:12 SA',
    'Today, 08:15 AM': 'Hôm nay, 08:15 SA',
    'Today, 08:19 AM': 'Hôm nay, 08:19 SA',
    '3 Users': '3 Người dùng',
    'Flagged': 'Bị gắn cờ',
    'Mobile': 'Di động',
    'Virtual Phone': 'Điện thoại ảo',
    'Failed SMS OTP': 'Lỗi OTP SMS',
    'True': 'Đúng'
};

const viDynamic = {
  '(Disposable)': '(Dùng một lần)',
  '(Tor Exit Node)': '(Nút lối ra Tor)',
  'VPN IP:': 'IP VPN:',
  'Device Hash:': 'Mã băm Thiết bị:',
  'Chime Routing:': 'Định tuyến Chime:'
};

(async () => {
  let content = fs.readFileSync('src/components/GraphPage.tsx', 'utf8');

  // We will build a unified dictionary that is language-indexed.
  const dict = { vi: {}, es: {}, ja: {}, de: {} };

  // Assign VI
  for (const k of enKeys) dict.vi[k] = viKeys[k];
  for (const k of enVals) dict.vi[k] = viVals[k];
  for (const k of dynamicVals) dict.vi[k] = viDynamic[k];

  // Translate for es, ja, de
  const allTexts = [...enKeys, ...enVals, ...dynamicVals];
  const targetLangs = ['es', 'ja', 'de'];

  console.log('Translating terms...');
  for (let i = 0; i < allTexts.length; i += 5) {
      const batch = allTexts.slice(i, i + 5);
      await Promise.all(batch.map(async (text) => {
          const [es, ja, de] = await Promise.all([
              translateText(text, 'es'),
              translateText(text, 'ja'),
              translateText(text, 'de')
          ]);
          dict.es[text] = es;
          dict.ja[text] = ja;
          dict.de[text] = de;
      }));
  }
  
  // Format the code
  const dictStr = "const localizedDict: Record<string, Record<string, string>> = " + JSON.stringify(dict, null, 2) + ";";

  const newTranslateNodeKeys = `
const translateNodeKeys = (details: Record<string, string>, lang: string) => {
  if (lang === 'en' || !localizedDict[lang]) return details;
  
  const translated: Record<string, string> = {};
  for (const [key, value] of Object.entries(details)) {
    const newKey = localizedDict[lang][key] || key;
    let newValue = localizedDict[lang][value] || value;
    
    if (value.includes('(Disposable)')) {
      newValue = value.replace('(Disposable)', localizedDict[lang]['(Disposable)'] || '(Disposable)');
    } else if (value.includes('(Tor Exit Node)')) {
      newValue = value.replace('(Tor Exit Node)', localizedDict[lang]['(Tor Exit Node)'] || '(Tor Exit Node)');
    }
    
    translated[newKey] = newValue;
  }
  return translated;
};`;

  const newTranslateNodeLabel = `
const translateNodeLabel = (label: string, lang: string) => {
  if (lang === 'en' || !localizedDict[lang]) return label;
  
  if (label.startsWith('VPN IP:')) return label.replace('VPN IP:', localizedDict[lang]['VPN IP:'] || 'VPN IP:');
  if (label.startsWith('Device Hash:')) return label.replace('Device Hash:', localizedDict[lang]['Device Hash:'] || 'Device Hash:');
  if (label.startsWith('Chime Routing:')) return label.replace('Chime Routing:', localizedDict[lang]['Chime Routing:'] || 'Chime Routing:');
  
  return label;
};`;

  // Replace old block
  const oldRegex = /const translateNodeKeys = \(details: Record<string, string>, lang: string\) => \{[\s\S]*?\n\};\n\nconst translateNodeLabel = \(label: string, lang: string\) => \{[\s\S]*?\n\};/;
  content = content.replace(oldRegex, dictStr + "\n" + newTranslateNodeKeys + "\n" + newTranslateNodeLabel);
  
  content = content.replace(/TRANSLATIONS\[language as 'en' \| 'vi'\]/g, "TRANSLATIONS[language as keyof typeof TRANSLATIONS]");
  
  fs.writeFileSync('src/components/GraphPage.tsx', content);
  console.log("Done");
})();
