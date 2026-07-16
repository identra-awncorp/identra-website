const fs = require('fs');
let content = fs.readFileSync('src/components/GraphPage.tsx', 'utf8');

const newFn = `const translateNodeLabel = (label: string, lang: string) => {
  if (lang === 'en' || !localizedDict[lang]) return label;
  
  if (localizedDict[lang][label]) return localizedDict[lang][label];
  
  if (label.startsWith('VPN IP:')) return label.replace('VPN IP:', localizedDict[lang]['VPN IP:'] || 'VPN IP:');
  if (label.startsWith('Device Hash:')) return label.replace('Device Hash:', localizedDict[lang]['Device Hash:'] || 'Device Hash:');
  if (label.startsWith('Chime Routing:')) return label.replace('Chime Routing:', localizedDict[lang]['Chime Routing:'] || 'Chime Routing:');
  
  return label;
};`;

const oldRegex = /const translateNodeLabel = \(label: string, lang: string\) => \{[\s\S]*?\n\};/;
content = content.replace(oldRegex, newFn);
fs.writeFileSync('src/components/GraphPage.tsx', content);
