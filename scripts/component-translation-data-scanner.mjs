import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const args = process.argv.slice(2);
const argValue = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const root = argValue('--path', 'src/components');
const summaryOnly = args.includes('--summary');
const maxItemsPerFile = Number(argValue('--max-items', '80'));

const files = [];
const ignoredDirs = new Set(['node_modules', 'dist', 'build', 'coverage']);

const walk = (target) => {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile() && /\.(tsx|jsx)$/.test(target)) {
    files.push(target);
    return;
  }
  if (!stat.isDirectory()) return;
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    walk(path.join(target, entry.name));
  }
};

walk(root);

const copyKeys = new Set([
  'alt',
  'answer',
  'author',
  'badge',
  'body',
  'caption',
  'category',
  'copy',
  'cta',
  'decisionLogic',
  'desc',
  'description',
  'detail',
  'details',
  'error',
  'excerpt',
  'fallback',
  'headline',
  'hint',
  'label',
  'message',
  'name',
  'note',
  'placeholder',
  'quote',
  'reason',
  'role',
  'short',
  'status',
  'subtitle',
  'summary',
  'tag',
  'text',
  'title',
  'type',
  'value',
  'verdict',
]);

const ignoredPropertyKeys = new Set([
  'accent',
  'activeClass',
  'avatar',
  'bg',
  'bgClass',
  'border',
  'className',
  'color',
  'colorClass',
  'cursor',
  'd',
  'department',
  'fill',
  'from',
  'gradient',
  'iconBg',
  'image',
  'imageBg',
  'height',
  'href',
  'icon',
  'id',
  'key',
  'level',
  'layoutId',
  'location',
  'mode',
  'path',
  'rel',
  'route',
  'size',
  'src',
  'stroke',
  'target',
  'theme',
  'to',
  'type',
  'view',
  'viewBox',
  'width',
]);

const dataVariablePattern = /(?:DATA|ITEMS|CARDS|FAQS|FEATURES|OPTIONS|SCENARIOS|PROFILES|ARTICLES|LOGS|USERS|ROLES|STEPS|FIELDS|LABELS|MESSAGES|FILTERS|PILLARS|PERKS|CASES|CONTENT|NODES|EVENTS|SERVICES|QUESTIONS|CONFIGS)$/i;

const normalize = (raw) => String(raw).replace(/\s+/g, ' ').trim();

const likelyCopy = (raw) => {
  const value = normalize(raw);
  if (!value || value.length < 3) return false;
  if (!/\p{L}/u.test(value)) return false;
  if (/^(https?:|mailto:|tel:|data:|\/)/i.test(value)) return false;
  if (/^[a-z0-9_.-]+$/i.test(value) && value.length <= 32) return false;
  if (/^[A-Z0-9_./:%#\-+()[\]\s]+$/.test(value)) return false;
  if (/^\{[\w.]+\}$/.test(value)) return false;
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(value)) return false;
  return true;
};

const technicalLiteral = (raw) => {
  const value = normalize(raw);
  if (!value) return true;
  if (/^(GET|POST|PUT|PATCH|DELETE)\s+\/[\w./:-]+$/i.test(value)) return true;
  if (/^(?:[a-z]+:)?[#./\w:[\]-]+(?:\s+[#./\w:[\]-]+)*$/i.test(value) && /(?:^|\s)(?:bg|text|from|to|via|border|hover|group-hover|focus|ring|shadow|rounded|font|grid|flex|w|h|p|m|gap|opacity|scale|translate|rotate|animate|duration|ease|z|col|row|items|justify|object|overflow|aspect|leading|tracking|uppercase|lowercase|capitalize)-/.test(value)) return true;
  if (/^(true|false|null|undefined)$/i.test(value)) return true;
  if (/^[A-Z][\p{L}.'-]+(?:\s+[A-Z][\p{L}.'-]+){0,3}(?:\s+\([A-Z][\p{L}\s.'-]+\))?$/u.test(value)) return true;
  if (/^[A-Z][\p{L}.'-]+(?:\s+[A-Z][\p{L}.'-]+){0,3}$/u.test(value)) return true;
  if (/^[A-Z][\p{L}.'-]+,\s+[A-Z]{2}(?:\s+\([^)]+\))?(?:\s+or\s+Remote\s+\([^)]+\))?$/u.test(value)) return true;
  if (/^(?:Remote|Hybrid|Onsite)(?:\s+\([^)]+\))?(?:\/[A-Z][\p{L}]+)?$/u.test(value)) return true;
  if (/^(?:\d+\+?\s+years?|May|Apr|June?|July?|Aug|Sep|Oct|Nov|Dec|Jan|Feb|Mar)\b/i.test(value)) return true;
  if (/^\d{1,6}\s+[\p{L}0-9.'-]+(?:\s+[\p{L}0-9.'-]+)*,\s*[\p{L}.'-]+(?:\s+[\p{L}.'-]+)*,\s*[A-Z]{2}\s+\d{5}(?:-\d{4})?$/u.test(value)) return true;
  if (/^\d{1,5}\s+[A-Z][\p{L}.'-]+(?:\s+[A-Z][\p{L}.'-]+)*(?:,\s*[A-Z][\p{L}.'-]+)*(?:\s+\d{5})?$/u.test(value)) return true;
  if (/^(Identra|OpenAI|Square|Linked|GreenHealth|Linktree)$/u.test(value)) return true;
  if (/^(SOC ?2|CCPA|GDPR|HIPAA|FERPA|ISO 27001|PCI DSS|KYC\/AML|KYB|AML|PEP|OFAC|HMT|UN|EU|AAMVA|eCBSV|IRS_TIN|GLOBAL)$/i.test(value)) return true;
  if (/^(Zoom|Teams|Google Meet|Slack|Workday|Greenhouse|Okta|Active Directory|BambooHR)$/i.test(value)) return true;
  return false;
};

const lineOf = (sourceFile, pos) => sourceFile.getLineAndCharacterOfPosition(pos).line + 1;
const snippet = (text) => normalize(text).slice(0, 180);

const propertyName = (name, sourceFile) => {
  if (!name) return null;
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name)) return name.expression.getText(sourceFile);
  return null;
};

const nearestVariableName = (node, sourceFile) => {
  let current = node.parent;
  while (current) {
    if (ts.isVariableDeclaration(current) && ts.isIdentifier(current.name)) return current.name.text;
    if (ts.isPropertyAssignment(current)) {
      const key = propertyName(current.name, sourceFile);
      if (key) return key;
    }
    current = current.parent;
  }
  return '';
};

const isInsideImportOrType = (node) => {
  let current = node.parent;
  while (current) {
    if (
      ts.isImportDeclaration(current) ||
      ts.isExportDeclaration(current) ||
      ts.isTypeAliasDeclaration(current) ||
      ts.isInterfaceDeclaration(current) ||
      ts.isLiteralTypeNode(current)
    ) {
      return true;
    }
    current = current.parent;
  }
  return false;
};

const isInsideJsx = (node) => {
  let current = node.parent;
  while (current) {
    if (
      ts.isJsxElement(current) ||
      ts.isJsxSelfClosingElement(current) ||
      ts.isJsxFragment(current) ||
      ts.isJsxAttribute(current)
    ) {
      return true;
    }
    current = current.parent;
  }
  return false;
};

const findingContext = (node, sourceFile) => {
  const parent = node.parent;

  if (ts.isPropertyAssignment(parent)) {
    const key = propertyName(parent.name, sourceFile);
    if (!key || ignoredPropertyKeys.has(key)) return null;
    if (copyKeys.has(key)) return `data-property:${key}`;
    const variableName = nearestVariableName(parent, sourceFile);
    if (dataVariablePattern.test(variableName)) return `data-object:${variableName}`;
  }

  if (ts.isArrayLiteralExpression(parent)) {
    const variableName = nearestVariableName(parent, sourceFile);
    if (dataVariablePattern.test(variableName)) return `data-array:${variableName}`;
  }

  if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name) && dataVariablePattern.test(parent.name.text)) {
    return `data-variable:${parent.name.text}`;
  }

  return null;
};

const findings = new Map();
const add = (file, line, kind, text) => {
  const list = findings.get(file) || [];
  list.push({ line, kind, text: snippet(text) });
  findings.set(file, list);
};

for (const file of files.sort((a, b) => a.localeCompare(b))) {
  const source = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const visit = (node) => {
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && !isInsideImportOrType(node) && !isInsideJsx(node)) {
      const context = findingContext(node, sourceFile);
      if (context && likelyCopy(node.text) && !technicalLiteral(node.text)) {
        add(file, lineOf(sourceFile, node.getStart(sourceFile)), context, node.text);
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
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
