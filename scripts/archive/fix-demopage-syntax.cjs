const fs = require('fs');
let content = fs.readFileSync('src/components/DemoPage.tsx', 'utf8');

const s1 = 'successResultVi:';
const i1 = content.lastIndexOf(s1);
if (i1 !== -1) {
    const s2 = 'export default function DemoPage';
    const i2 = content.indexOf(s2);
    if (i2 !== -1) {
        // We know what it should end with...
        const endOfFirst = content.indexOf('}];', i1) + 3;
        content = content.substring(0, endOfFirst) + '\n\n' + content.substring(i2);
        fs.writeFileSync('src/components/DemoPage.tsx', content);
        console.log("Fixed");
    }
}
