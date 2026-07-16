import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const argValue = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const root = argValue('--path', 'src');
const summaryOnly = args.includes('--summary');
const maxItemsPerFile = Number(argValue('--max-items', '80'));
const routeContractFile = path.normalize('src/types/routes.ts');

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
    kind: 'onviewchange-any',
    pattern: /\bonViewChange\??\s*:\s*\(\s*view\s*:\s*any\s*\)\s*=>/,
  },
  {
    kind: 'onviewchange-inline-union',
    pattern: /\bonViewChange\??\s*:\s*\(\s*view\s*:\s*['"]landing['"]/,
  },
  {
    kind: 'route-handler-any',
    pattern: /\b(?:handleViewChange|navigateTo|setView)\s*=\s*\(\s*view\s*:\s*any\s*\)/,
  },
  {
    kind: 'route-call-any-cast',
    pattern: /\bonViewChange(?:\?\.)?\([^)]*\bas\s+any\b|\bonViewChange\s*&&\s*onViewChange\([^)]*\bas\s+any\b/,
  },
  {
    kind: 'current-view-any-cast',
    pattern: /\bcurrentView=\{[^}]*\bas\s+any\b/,
  },
  {
    kind: 'transition-target-any-cast',
    pattern: /\btransitionTarget\s+as\s+any\b/,
  },
  {
    kind: 'duplicate-appview-type',
    pattern: /^\s*type\s+AppView\s*=/,
    ignoreContract: true,
  },
  {
    kind: 'duplicate-valid-views',
    pattern: /\bVALID_VIEWS\s*=\s*new\s+Set\b/,
    ignoreContract: true,
  },
];

const findings = new Map();
const add = (file, line, kind, text) => {
  const list = findings.get(file) || [];
  list.push({ line, kind, text: text.trim().slice(0, 180) });
  findings.set(file, list);
};

for (const file of files) {
  const normalizedFile = path.normalize(file);
  const isRouteContract = normalizedFile === routeContractFile;
  const source = fs.readFileSync(file, 'utf8');
  source.split(/\r?\n/).forEach((line, index) => {
    for (const check of checks) {
      if (check.ignoreContract && isRouteContract) continue;
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
