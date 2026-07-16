const fs = require('fs');
let content = fs.readFileSync('src/components/GraphPage.tsx', 'utf8');
content = content.replace(/>\n\s*\{node\.label\}\n\s*<\/text>/, ">\n                          {translateNodeLabel(node.label, language)}\n                        </text>");
fs.writeFileSync('src/components/GraphPage.tsx', content);
