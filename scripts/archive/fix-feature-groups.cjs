const fs = require('fs');

const filePath = 'src/components/PassiveSignalsPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The FEATURE_GROUPS block is inside the component. We can just replace the whole array initialization.
// But it uses `isVi` currently. We can change it to use `language` and a helper function.
// Let's write a script that does it dynamically.

console.log("Found FEATURE_GROUPS:", content.includes('const FEATURE_GROUPS = ['));
