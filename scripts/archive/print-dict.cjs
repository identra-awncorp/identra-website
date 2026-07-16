const fs = require('fs');

const content = fs.readFileSync('src/components/PassiveSignalsPage.tsx', 'utf8');

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

console.log(JSON.stringify(Object.keys(dict), null, 2));
