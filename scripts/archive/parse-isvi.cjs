const fs = require('fs');
const filePath = 'src/components/PassiveSignalsPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const matches = [...content.matchAll(/isVi \? ('[^']*'|`[^`]*`) : ('[^']*'|`[^`]*`)/g)];
for (const match of matches) {
  console.log(match[0]);
}

const arrMatches = [...content.matchAll(/isVi \? (\[[\s\S]*?\]) : (\[[\s\S]*?\])/g)];
for (const match of arrMatches) {
  console.log("ARRAY MATCH:");
  console.log(match[0]);
}
