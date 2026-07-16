const fs = require('fs');

const filePath = 'src/components/CaseManagementPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const blockRegex = /const ([a-zA-Z0-9_]+) = \{\n  en: \{([\s\S]*?)\n  \},\n  vi: \{([\s\S]*?)\n  \}/g;
let newContent = content;
let match;
const blocks = [];

while ((match = blockRegex.exec(content)) !== null) {
  blocks.push({
      full: match[0],
      name: match[1],
      enBody: match[2],
      viBody: match[3]
  });
}

for (const block of blocks) {
  const langs = ['es', 'ja', 'de'];
  let extraLangsStr = '';
  
  for (const lang of langs) {
      let langBody = [];
      const lines = block.enBody.split('\n');
      
      for (const line of lines) {
         if (line.trim() === '') {
             langBody.push(line);
             continue;
         }
         
         const strMatch = line.match(/^(\s*)([a-zA-Z0-9_]+)(\s*:\s*)'(.*?)'(,?)$/);
         const strMatchDouble = line.match(/^(\s*)([a-zA-Z0-9_]+)(\s*:\s*)"(.*?)"(,?)$/);
         
         let matched = strMatch || strMatchDouble;
         if (matched) {
            const indent = matched[1];
            const key = matched[2];
            const colon = matched[3];
            const val = matched[4];
            const comma = matched[5];
            const quote = strMatch ? "'" : '"';
            
            let suffixed = val + ` (${lang.toUpperCase()})`;
            langBody.push(`${indent}${key}${colon}${quote}${suffixed}${quote}${comma}`);
         } else {
            langBody.push(line);
         }
      }
      
      extraLangsStr += `\n  ${lang}: {\n${langBody.join('\n')}\n  },`;
  }
  
  const newBlockStr = `const ${block.name} = {\n  en: {${block.enBody}\n  },${extraLangsStr}\n  vi: {${block.viBody}\n  }`;
  newContent = newContent.replace(block.full, newBlockStr);
}

fs.writeFileSync(filePath, newContent);
console.log(`Updated ${filePath}`);
