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

const ignoredJsxAttributes = new Set([
  'className',
  'id',
  'key',
  'mode',
  'href',
  'src',
  'type',
  'name',
  'value',
  'htmlFor',
  'target',
  'rel',
  'role',
  'd',
  'viewBox',
  'fill',
  'stroke',
  'strokeWidth',
  'transform',
  'markerEnd',
  'activeClass',
  'accept',
  'width',
  'height',
  'cx',
  'cy',
  'r',
  'x',
  'y',
  'x1',
  'x2',
  'y1',
  'y2',
  'offset',
  'stopColor',
  'stopOpacity',
  'defaultValue',
  'layoutId',
  'dataKey',
]);

const files = [];
const walk = (target) => {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile() && /\.(tsx|jsx)$/.test(target)) {
    files.push(target);
    return;
  }
  if (!stat.isDirectory()) return;
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    walk(path.join(target, entry.name));
  }
};
walk(root);

const normalize = (raw) => String(raw).replace(/\s+/g, ' ').trim();

const likelyCopy = (raw) => {
  const value = normalize(raw);
  if (!value || value.length < 3) return false;
  if (!/\p{L}/u.test(value)) return false;
  if (/^[A-Z0-9_./:%#\-+()[\]{}\s|&;<>="'`]+$/.test(value)) return false;
  if (/^(https?:|mailto:|tel:|data:)/i.test(value)) return false;
  if (/^(true|false|null|undefined|button|submit|reset|text|email|password|checkbox|radio|number|range|search|date|time|file|image)$/i.test(value)) return false;
  return true;
};

const technicalLiteral = (raw) => {
  const value = normalize(raw);
  if (!value) return true;
  if (/^(&[a-z]+;|[{}[\]().,:;'"`|<>+\-=*/\\]+)$/.test(value)) return true;
  if (/^\(?\s*&quot;\s*\)?$/.test(value)) return true;
  if (/^:\s*(?:&lt;|&quot;[A-Za-z0-9_-]+&quot;\s*\|?)$/.test(value)) return true;
  if (/^:\s*[A-Z0-9_]+(?:_v?\d+(?:\.\d+)*)?$/i.test(value)) return true;
  if (/^(GET|POST|PUT|PATCH|DELETE)\s+\/[\w./:-]+$/i.test(value)) return true;
  if (/^"[A-Za-z0-9_]+":$/.test(value)) return true;
  if (/^"[A-Za-z0-9_.-]+"$/.test(value)) return true;
  if (/^\{\s*"[\w-]+":.+\}$/.test(value)) return true;
  if (/^\{value\}(?:\s+\{value\})+\.?$/.test(value)) return true;
  if (/^[A-Z0-9_./:%#\-+()[\]\s]+$/.test(value)) return true;
  if (/^(LAT|LON):\s*[-\d.° NSEW,\s]+(?:,\s*(LAT|LON):\s*[-\d.° NSEW,\s]+)?$/i.test(value)) return true;
  if (/^\d+\s+[A-Z][\p{L}.'-]+(?:\s+[A-Z][\p{L}.'-]+){0,5}(?:,\s*[A-Z][\p{L}.'-]+(?:\s+[A-Z][\p{L}.'-]+){0,3})?$/u.test(value)) return true;
  if (/^[A-Z][\p{L}.'-]+(?:\s+[A-Z][\p{L}.'-]+){1,2}$/u.test(value)) return true;
  if (/^[A-Z][\p{L}.'-]+(?:\s+[A-Z][\p{L}.'-]+){1,2},$/u.test(value)) return true;
  if (/^(Identra|OpenAI|Square|Linked|GreenHealth|Linktree|vehô)$/u.test(value.replace(/^\p{Extended_Pictographic}\s*/u, ''))) return true;
  if (/^(Customer|User)\s*#?[-\w]+(?:\s+\(.+\))?$/i.test(value)) return true;
  if (/^[A-Z][A-Za-z0-9]*(?:\s+[A-Z][A-Za-z0-9]*)*\s+ID$/.test(value)) return true;
  if (/^[A-Z0-9-]+\s+v\d+(?:\.\d+)*$/i.test(value)) return true;
  if (/^(?:•\s*)?User-[\w-]+(?:\s+\(.+\))?$/i.test(value)) return true;
  if (/^dev_[A-Za-z0-9]+$/.test(value)) return true;
  if (/^[A-Z0-9_]+_CLIENT_v?\d+(?:\.\d+)*$/i.test(value)) return true;
  if (/^&lt;\s*\d+(?:\.\d+)?\s*[a-z]*$/i.test(value)) return true;
  if (/^Document Hash:\s*0x[A-Fa-f0-9.]+\s*(?:&bull;|•)\s*.+$/.test(value)) return true;
  if (/^[+-]?\d+(?:\.\d+)?%\s+(?:YoY|Lift|of bypasses)$/i.test(value)) return true;
  if (/^Registry:\s+.+\s+(?:&bull;|•)\s+ID:\s+[\w-]+$/u.test(value)) return true;
  if (/^[A-Z][\w&.'-]+(?:\s+[A-Z][\w&.'-]+)*(?:,\s*Inc\.| Inc\.| LLC| Ltd)?(?:\s+\([^)]+\))?$/u.test(value)) return true;
  if (/^(C-Corporation|Active \/ Good Standing|60% Equity Owner|UBO via .+|Direct Shareholder .+|Corp \/ LLC .+|Cayman \/ Shell \/ PEP)$/u.test(value)) return true;
  if (/^[a-z][a-z0-9_.-]*$/.test(value) && value.length <= 32) return true;
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(value)) return true;
  if (/^(GET|POST|PUT|PATCH|DELETE|PASSED|FAILED|APPROVED|REJECT|REFER|ON|OFF|USA|GBR|AUS|FRA)$/i.test(value)) return true;
  return false;
};

const lineOf = (sourceFile, pos) => sourceFile.getLineAndCharacterOfPosition(pos).line + 1;
const snippet = (text) => normalize(text).slice(0, 200);
const calleeName = (expr, sourceFile) => expr.getText(sourceFile).replace(/\s+/g, '');
const literalText = (node) => {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) {
    return [
      node.head.text,
      ...node.templateSpans.map((span) => span.literal.text),
    ].join('{value}');
  }
  return '';
};

const unwrapExpression = (node) => {
  let current = node;
  while (
    ts.isParenthesizedExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isNonNullExpression(current)
  ) {
    current = current.expression;
  }
  return current;
};

const isEnglishLocaleLiteral = (node) => {
  const current = unwrapExpression(node);
  return ts.isStringLiteralLike(current) && current.text === 'en';
};

const englishRuntimeReferencePattern = /(?:\.\s*en\b|\[\s*['"]en['"]\s*\])/;
const containsEnglishRuntimeReference = (node, sourceFile) => {
  const text = node.getText(sourceFile);
  return englishRuntimeReferencePattern.test(text);
};

const isEnglishRuntimeAccessExpression = (node) => {
  const current = unwrapExpression(node);
  if (ts.isPropertyAccessExpression(current)) {
    return current.name.text === 'en';
  }
  if (ts.isElementAccessExpression(current)) {
    const argument = unwrapExpression(current.argumentExpression);
    return ts.isStringLiteralLike(argument) && argument.text === 'en';
  }
  return false;
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const containsEnglishRuntimeAlias = (node, sourceFile, aliases) => {
  if (aliases.size === 0) return false;
  const text = node.getText(sourceFile);
  return [...aliases].some((alias) => new RegExp(`(^|[^\\w$])${escapeRegExp(alias)}(?=$|[^\\w$])`).test(text));
};

const collectEnglishRuntimeAliases = (node, sourceFile, aliases) => {
  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.initializer &&
    isEnglishRuntimeAccessExpression(node.initializer)
  ) {
    aliases.add(node.name.text);
  }

  ts.forEachChild(node, (child) => collectEnglishRuntimeAliases(child, sourceFile, aliases));
};

const isInsideImport = (node) => {
  let current = node;
  while (current) {
    if (ts.isImportDeclaration(current) || ts.isImportSpecifier(current) || ts.isExportDeclaration(current)) return true;
    current = current.parent;
  }
  return false;
};

const parentJsxAttributeName = (node) => {
  let current = node.parent;
  while (current) {
    if (ts.isJsxAttribute(current)) return current.name.getText();
    if (ts.isJsxElement(current) || ts.isJsxSelfClosingElement(current)) return null;
    current = current.parent;
  }
  return null;
};

const findings = new Map();
const add = (file, line, kind, text) => {
  const list = findings.get(file) || [];
  list.push({ line, kind, text: snippet(text) });
  findings.set(file, list);
};

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const englishRuntimeAliases = new Set();
  collectEnglishRuntimeAliases(sourceFile, sourceFile, englishRuntimeAliases);

  const visit = (node) => {
    if (
      ts.isBinaryExpression(node) &&
      (node.operatorToken.kind === ts.SyntaxKind.BarBarToken || node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) &&
      (containsEnglishRuntimeReference(node.right, sourceFile) ||
        containsEnglishRuntimeAlias(node.right, sourceFile, englishRuntimeAliases) ||
        isEnglishLocaleLiteral(node.right))
    ) {
      add(file, lineOf(sourceFile, node.getStart(sourceFile)), 'runtime-english-fallback', node.getText(sourceFile));
    }

    if (
      ts.isConditionalExpression(node) &&
      (containsEnglishRuntimeReference(node.whenTrue, sourceFile) ||
        containsEnglishRuntimeReference(node.whenFalse, sourceFile) ||
        containsEnglishRuntimeAlias(node.whenTrue, sourceFile, englishRuntimeAliases) ||
        containsEnglishRuntimeAlias(node.whenFalse, sourceFile, englishRuntimeAliases) ||
        isEnglishLocaleLiteral(node.whenTrue) ||
        isEnglishLocaleLiteral(node.whenFalse))
    ) {
      add(file, lineOf(sourceFile, node.getStart(sourceFile)), 'runtime-english-conditional-fallback', node.getText(sourceFile));
    }

    if (ts.isJsxText(node)) {
      const text = node.getFullText(sourceFile);
      if (likelyCopy(text) && !technicalLiteral(text)) {
        add(file, lineOf(sourceFile, node.getStart(sourceFile)), 'jsx-text', text);
      }
    }

    if (ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const attr = node.name.getText(sourceFile);
      const value = node.initializer.text;
      if (!ignoredJsxAttributes.has(attr) && likelyCopy(value) && !technicalLiteral(value)) {
        add(file, lineOf(sourceFile, node.initializer.getStart(sourceFile)), `jsx-attr:${attr}`, value);
      }
    }

    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateExpression(node)) && !isInsideImport(node)) {
      const attr = parentJsxAttributeName(node);
      if (attr && ignoredJsxAttributes.has(attr)) {
        ts.forEachChild(node, visit);
        return;
      }

      const value = literalText(node);
      const parent = node.parent;

      if (ts.isCallExpression(parent) && parent.arguments[0] === node) {
        const callee = calleeName(parent.expression, sourceFile);
        if (callee === 'staticText' && likelyCopy(value) && !technicalLiteral(value)) {
          add(file, lineOf(sourceFile, node.getStart(sourceFile)), 'staticText-copy-key', value);
        }
      }

      if (ts.isConditionalExpression(parent) && parent.condition.getText(sourceFile).includes('isVi') && likelyCopy(value) && !technicalLiteral(value)) {
        add(file, lineOf(sourceFile, node.getStart(sourceFile)), 'isVi-ternary-copy', value);
      }

      if (ts.isJsxExpression(parent) && likelyCopy(value) && !technicalLiteral(value)) {
        add(file, lineOf(sourceFile, node.getStart(sourceFile)), 'jsx-expression-string', value);
      }

      if (ts.isJsxAttribute(parent.parent) && likelyCopy(value) && !technicalLiteral(value)) {
        const parentAttr = parent.parent.name.getText(sourceFile);
        if (!ignoredJsxAttributes.has(parentAttr)) {
          add(file, lineOf(sourceFile, node.getStart(sourceFile)), `jsx-attr-expression:${parentAttr}`, value);
        }
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
