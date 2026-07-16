import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const argValue = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const root = argValue('--path', 'src/components');
const summaryOnly = args.includes('--summary');
const maxItemsPerFile = Number(argValue('--max-items', '80'));

const files = [];
const walk = (target) => {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile() && /\.(tsx|jsx|ts|js)$/.test(target)) {
    files.push(target);
    return;
  }
  if (!stat.isDirectory()) return;
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    walk(path.join(target, entry.name));
  }
};
walk(root);

const checks = [
  {
    kind: 'legacy-statictext-runtime',
    pattern: /(?:\buseStaticUiText\b|\bstaticText\s*\(|\bStaticUiTranslations\b|\bSTATIC_UI(?:_TRANSLATIONS)?\b)/,
  },
  {
    kind: 'vi-only-language-flag',
    pattern: /\bisVi\b/,
  },
  {
    kind: 'en-vi-suffixed-field',
    pattern: /\b(?:label|title|desc|description|value|details|verdict|tag|decisionLogic|riskDeflection|name)(?:En|Vi)\b/,
  },
  {
    kind: 'vi-language-branch',
    pattern: /\blanguage\s*={2,3}\s*['"]vi['"]/,
  },
  {
    kind: 'en-vi-ternary',
    pattern: /\?\s*[^:\n]*(?:En|Vi)\b\s*:\s*[^;\n]*(?:En|Vi)\b/,
  },
];

const findings = new Map();
const add = (file, line, kind, text) => {
  const list = findings.get(file) || [];
  list.push({ line, kind, text: text.trim().slice(0, 180) });
  findings.set(file, list);
};

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  source.split(/\r?\n/).forEach((line, index) => {
    for (const check of checks) {
      if (check.pattern.test(line)) {
        add(file, index + 1, check.kind, line);
      }
    }
  });
}

const sorted = [...findings.entries()].sort(([a], [b]) => a.localeCompare(b));
const kindCounts = new Map();
let total = 0;

for (const [, items] of sorted) {
  total += items.length;
  for (const item of items) {
    kindCounts.set(item.kind, (kindCounts.get(item.kind) || 0) + 1);
  }
}

if (summaryOnly) {
  console.log('SUMMARY_BY_KIND');
  for (const [kind, count] of [...kindCounts.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`${kind}: ${count}`);
  }
  console.log('\nTOP_FILES');
  for (const [file, items] of [...sorted].sort((a, b) => b[1].length - a[1].length).slice(0, 30)) {
    console.log(`${items.length}: ${file}`);
  }
} else {
  for (const [file, items] of sorted) {
    console.log(`\n## ${file} (${items.length})`);
    for (const item of items.slice(0, maxItemsPerFile)) {
      console.log(`${item.line}: ${item.kind}: ${item.text}`);
    }
    if (items.length > maxItemsPerFile) console.log(`... ${items.length - maxItemsPerFile} more`);
  }
}

console.log(`\nTOTAL_FILES_WITH_FINDINGS=${sorted.length}`);
console.log(`TOTAL_FINDINGS=${total}`);

process.exitCode = total > 0 ? 1 : 0;
