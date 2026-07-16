import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const args = process.argv.slice(2);
const argValues = (name) => {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === name && args[index + 1]) values.push(args[index + 1]);
  }
  return values;
};
const argValue = (name, fallback) => argValues(name)[0] || fallback;

const roots = argValues('--path');
if (roots.length === 0) roots.push('src/translations');
const extras = argValues('--extra');
const summaryOnly = args.includes('--summary');
const fix = args.includes('--fix');
const maxItemsPerFile = Number(argValue('--max-items', '80'));

const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);

const cp1252Reverse = new Map([
  ['€', 0x80],
  ['‚', 0x82],
  ['ƒ', 0x83],
  ['„', 0x84],
  ['…', 0x85],
  ['†', 0x86],
  ['‡', 0x87],
  ['ˆ', 0x88],
  ['‰', 0x89],
  ['Š', 0x8a],
  ['‹', 0x8b],
  ['Œ', 0x8c],
  ['Ž', 0x8e],
  ['‘', 0x91],
  ['’', 0x92],
  ['“', 0x93],
  ['”', 0x94],
  ['•', 0x95],
  ['–', 0x96],
  ['—', 0x97],
  ['˜', 0x98],
  ['™', 0x99],
  ['š', 0x9a],
  ['›', 0x9b],
  ['œ', 0x9c],
  ['ž', 0x9e],
  ['Ÿ', 0x9f],
]);

const mojibakeTrail = '[\\u0080-\\u00BF\\u0192\\u02C6\\u02DC\\u2018-\\u201E\\u2020-\\u2026\\u2030\\u2039-\\u203A\\u20AC\\u2122]';
const mojibakePattern = new RegExp(`[\\u00C0-\\u00FF]${mojibakeTrail}`, 'g');
const hasMojibake = (value) => {
  mojibakePattern.lastIndex = 0;
  return mojibakePattern.test(value);
};
const mojibakeScore = (value) => {
  mojibakePattern.lastIndex = 0;
  return [...value.matchAll(mojibakePattern)].length;
};

const decodeCp1252AsUtf8 = (value) => {
  const bytes = [];
  for (const char of value) {
    const code = char.codePointAt(0);
    if (code <= 0xff) {
      bytes.push(code);
      continue;
    }
    const mapped = cp1252Reverse.get(char);
    if (mapped === undefined) return null;
    bytes.push(mapped);
  }
  return Buffer.from(bytes).toString('utf8');
};

const repairMojibake = (value) => {
  let current = value;
  for (let attempt = 0; attempt < 4 && hasMojibake(current); attempt += 1) {
    const decoded = decodeCp1252AsUtf8(current);
    if (!decoded || decoded.includes('\uFFFD')) break;
    if (mojibakeScore(decoded) >= mojibakeScore(current)) break;
    current = decoded;
  }
  return current;
};

const files = [];
const addFile = (target) => {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    if (sourceExtensions.has(path.extname(target))) files.push(target);
    return;
  }
  if (!stat.isDirectory()) return;
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'build' || entry.name === 'coverage') continue;
    addFile(path.join(target, entry.name));
  }
};

for (const root of roots) addFile(root);
for (const extra of extras) addFile(extra);

const uniqueFiles = [...new Set(files.map((file) => path.normalize(file)))].sort((a, b) => a.localeCompare(b));

const lineOf = (sourceFile, pos) => sourceFile.getLineAndCharacterOfPosition(pos).line + 1;
const snippet = (text) => text.trim().replace(/\s+/g, ' ').slice(0, 180);

const findFindings = (file, source) => {
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const findings = [];

  const visit = (node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const raw = source.slice(node.getStart(sourceFile), node.end);
      if (hasMojibake(raw)) {
        findings.push({
          line: lineOf(sourceFile, node.getStart(sourceFile)),
          kind: 'mojibake-string-literal',
          text: raw,
        });
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  source.split(/\r?\n/).forEach((line, index) => {
    if (hasMojibake(line)) {
      findings.push({
        line: index + 1,
        kind: 'mojibake-line',
        text: line,
      });
    }
  });

  return findings;
};

const fixSource = (file, source) => {
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const replacements = [];

  const visit = (node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const start = node.getStart(sourceFile) + 1;
      const end = node.end - 1;
      const rawContent = source.slice(start, end);
      if (hasMojibake(rawContent)) {
        const repaired = repairMojibake(rawContent);
        if (repaired !== rawContent) replacements.push({ start, end, value: repaired });
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  let next = source;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    next = next.slice(0, replacement.start) + replacement.value + next.slice(replacement.end);
  }

  const newline = next.includes('\r\n') ? '\r\n' : '\n';
  next = next
    .split(/\r?\n/)
    .map((line) => {
      if (!hasMojibake(line)) return line;
      const repaired = repairMojibake(line);
      return repaired === line ? line : repaired;
    })
    .join(newline);

  return next;
};

const findingsByFile = new Map();
const fixedFiles = [];

for (const file of uniqueFiles) {
  const source = fs.readFileSync(file, 'utf8');
  let inspectedSource = source;

  if (fix && hasMojibake(source)) {
    const repaired = fixSource(file, source);
    if (repaired !== source) {
      fs.writeFileSync(file, repaired, 'utf8');
      fixedFiles.push(file);
      inspectedSource = repaired;
    }
  }

  const findings = findFindings(file, inspectedSource);
  if (findings.length > 0) findingsByFile.set(file, findings);
}

const sorted = [...findingsByFile.entries()].sort(([a], [b]) => a.localeCompare(b));
const kindCounts = new Map();
let total = 0;

for (const [, items] of sorted) {
  total += items.length;
  for (const item of items) {
    kindCounts.set(item.kind, (kindCounts.get(item.kind) || 0) + 1);
  }
}

if (fix) {
  console.log('FIXED_FILES');
  for (const file of fixedFiles) console.log(file);
  if (fixedFiles.length === 0) console.log('(none)');
  console.log('');
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
      console.log(`${item.line}: ${item.kind}: ${snippet(item.text)}`);
    }
    if (items.length > maxItemsPerFile) console.log(`... ${items.length - maxItemsPerFile} more`);
  }
}

console.log(`\nTOTAL_FILES_WITH_FINDINGS=${sorted.length}`);
console.log(`TOTAL_FINDINGS=${total}`);

process.exitCode = total > 0 ? 1 : 0;
