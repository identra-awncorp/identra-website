import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
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
const summaryOnly = args.includes('--summary');
const fix = args.includes('--fix');
const maxItemsPerFile = Number(argValue('--max-items', '80'));

const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']);
const ignoredDirs = new Set(['node_modules', 'dist', 'build', 'coverage']);

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
    if (ignoredDirs.has(entry.name)) continue;
    addFile(path.join(target, entry.name));
  }
};

for (const root of roots) addFile(root);

const uniqueFiles = [...new Set(files.map((file) => path.normalize(file)))].sort((a, b) => a.localeCompare(b));

const englishReferencePattern = /\.en(?:\b|[.[\]])|\[['"]en['"]\]/;
const isEnglishSpread = (expressionText) => expressionText === 'en' || englishReferencePattern.test(expressionText);
const lineOf = (sourceFile, pos) => sourceFile.getLineAndCharacterOfPosition(pos).line + 1;
const snippet = (value) => value.trim().replace(/\s+/g, ' ').slice(0, 220);
const nonEnglishLocales = new Set(['es', 'ja', 'de', 'vi']);
const englishCopyWords = new Set([
  'a',
  'about',
  'access',
  'and',
  'are',
  'as',
  'data',
  'does',
  'for',
  'from',
  'how',
  'identity',
  'information',
  'is',
  'it',
  'my',
  'of',
  'or',
  'our',
  'privacy',
  'request',
  'security',
  'the',
  'this',
  'to',
  'use',
  'verification',
  'we',
  'what',
  'when',
  'where',
  'with',
  'you',
  'your'
]);

const containsEnglishRuntimeReference = (node) => {
  let found = false;

  const visit = (current) => {
    if (found) return;

    if (ts.isPropertyAccessExpression(current) && current.name.text === 'en') {
      found = true;
      return;
    }

    if (
      ts.isElementAccessExpression(current) &&
      ts.isStringLiteralLike(current.argumentExpression) &&
      current.argumentExpression.text === 'en'
    ) {
      found = true;
      return;
    }

    ts.forEachChild(current, visit);
  };

  visit(node);
  return found;
};

const isObjectLiteralAssignment = (node) => ts.isObjectLiteralExpression(node);
const isFunctionLikeExpression = (node) => ts.isArrowFunction(node) || ts.isFunctionExpression(node);

const unwrapExpression = (node) => {
  let current = node;
  while (
    ts.isAsExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isSatisfiesExpression(current) ||
    ts.isParenthesizedExpression(current)
  ) {
    current = current.expression;
  }
  return current;
};

const getStringLiteralText = (node) => {
  if (ts.isStringLiteralLike(node)) return node.text;
  return null;
};

const getLocaleLoopContext = (node) => {
  const expression = unwrapExpression(node.expression);
  if (!ts.isArrayLiteralExpression(expression)) return null;
  if (!ts.isVariableDeclarationList(node.initializer)) return null;

  const [declaration] = node.initializer.declarations;
  if (!declaration || !ts.isIdentifier(declaration.name)) return null;

  const locales = [];
  for (const element of expression.elements) {
    const unwrapped = unwrapExpression(element);
    const text = getStringLiteralText(unwrapped);
    if (!text) return null;
    locales.push(text);
  }

  if (locales.length === 0) return null;
  if (locales.includes('en')) return null;
  if (!locales.every((locale) => nonEnglishLocales.has(locale))) return null;

  return {
    variableName: declaration.name.text,
    locales,
  };
};

const isLocaleLoopAssignmentTarget = (node, localeLoop) => {
  if (!localeLoop) return false;
  if (!ts.isElementAccessExpression(node)) return false;

  const argument = unwrapExpression(node.argumentExpression);
  return ts.isIdentifier(argument) && argument.text === localeLoop.variableName;
};

const isLikelyEnglishCopy = (value) => {
  const text = value.trim();
  if (text.length < 24) return false;
  if (!/\s/.test(text)) return false;
  if (/[^\x00-\x7F]/.test(text)) return false;
  if (/^https?:\/\//i.test(text) || /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(text)) return false;
  if (/^[A-Z0-9_:/ .-]+$/.test(text) && text.length < 80) return false;

  const words = text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];
  let matches = 0;
  for (const word of words) {
    if (englishCopyWords.has(word)) matches += 1;
  }

  return matches >= 3;
};

const englishObjectLiteralRisk = (node) => {
  const candidates = [];
  let totalStrings = 0;

  const collectFromValue = (valueNode) => {
    if (ts.isStringLiteralLike(valueNode)) {
      totalStrings += 1;
      if (isLikelyEnglishCopy(valueNode.text)) candidates.push(valueNode.text);
      return;
    }

    if (ts.isNoSubstitutionTemplateLiteral(valueNode)) {
      totalStrings += 1;
      if (isLikelyEnglishCopy(valueNode.text)) candidates.push(valueNode.text);
      return;
    }

    if (ts.isTemplateExpression(valueNode)) {
      const templateText = [
        valueNode.head.text,
        ...valueNode.templateSpans.map((span) => span.literal.text),
      ].join(' ');
      totalStrings += 1;
      if (isLikelyEnglishCopy(templateText)) candidates.push(templateText);
      return;
    }

    if (ts.isObjectLiteralExpression(valueNode)) {
      for (const property of valueNode.properties) {
        if (ts.isPropertyAssignment(property)) collectFromValue(property.initializer);
        if (ts.isShorthandPropertyAssignment(property)) totalStrings += 1;
        if (ts.isSpreadAssignment(property)) collectFromValue(property.expression);
      }
      return;
    }

    if (ts.isArrayLiteralExpression(valueNode)) {
      for (const element of valueNode.elements) collectFromValue(element);
      return;
    }

    ts.forEachChild(valueNode, collectFromValue);
  };

  collectFromValue(node);

  return {
    candidates,
    totalStrings,
    isRisky: candidates.length >= 5 || (candidates.length >= 3 && candidates.length / Math.max(totalStrings, 1) >= 0.35),
  };
};

const exportedNames = (sourceFile) => {
  const names = new Set();

  const visit = (node) => {
    if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const declaration of node.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) names.add(declaration.name.text);
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return [...names].sort((a, b) => b.length - a.length);
};

const getPropertyName = (propertyName, sourceFile) => {
  if (!propertyName) return null;
  if (ts.isIdentifier(propertyName) || ts.isStringLiteral(propertyName) || ts.isNumericLiteral(propertyName)) {
    return propertyName.text;
  }
  if (ts.isComputedPropertyName(propertyName)) {
    const expression = propertyName.expression;
    if (ts.isStringLiteral(expression) || ts.isNumericLiteral(expression)) return expression.text;
  }
  return null;
};

const findEnglishInheritanceFallbacks = (file, source) => {
  const scriptKind = file.endsWith('.tsx') || file.endsWith('.jsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, scriptKind);
  const findings = [];

  const visit = (node, localeLoop = null) => {
    if (ts.isForOfStatement(node)) {
      const nextLocaleLoop = getLocaleLoopContext(node) || localeLoop;
      visit(node.statement, nextLocaleLoop);
      return;
    }

    if (ts.isSpreadAssignment(node)) {
      const expressionText = node.expression.getText(sourceFile);
      if (isEnglishSpread(expressionText)) {
        findings.push({
          line: lineOf(sourceFile, node.getStart(sourceFile)),
          kind: 'english-spread-fallback',
          text: `...${expressionText}`,
        });
      }
    }

    if (ts.isPropertyAssignment(node) && containsEnglishRuntimeReference(node.initializer)) {
      findings.push({
        line: lineOf(sourceFile, node.initializer.getStart(sourceFile)),
        kind: 'english-property-fallback',
        text: node.getText(sourceFile),
      });
    }

    if (
      ts.isVariableDeclaration(node) &&
      node.initializer &&
      !isFunctionLikeExpression(node.initializer) &&
      containsEnglishRuntimeReference(node.initializer)
    ) {
      findings.push({
        line: lineOf(sourceFile, node.initializer.getStart(sourceFile)),
        kind: 'english-variable-fallback',
        text: node.getText(sourceFile),
      });
    }

    if (ts.isReturnStatement(node) && node.expression && containsEnglishRuntimeReference(node.expression)) {
      findings.push({
        line: lineOf(sourceFile, node.expression.getStart(sourceFile)),
        kind: 'english-return-fallback',
        text: node.getText(sourceFile),
      });
    }

    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      isObjectLiteralAssignment(node.right) &&
      isLocaleLoopAssignmentTarget(node.left, localeLoop)
    ) {
      const risk = englishObjectLiteralRisk(node.right);
      if (risk.isRisky) {
        findings.push({
          line: lineOf(sourceFile, node.right.getStart(sourceFile)),
          kind: 'english-object-literal-locale-loop',
          text: `${node.left.getText(sourceFile)} = { ... } examples: ${risk.candidates.slice(0, 3).join(' | ')}`,
        });
      }
    }

    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      !isObjectLiteralAssignment(node.right) &&
      containsEnglishRuntimeReference(node.right)
    ) {
      findings.push({
        line: lineOf(sourceFile, node.right.getStart(sourceFile)),
        kind: 'english-assignment-fallback',
        text: node.getText(sourceFile),
      });
    }

    ts.forEachChild(node, (child) => visit(child, localeLoop));
  };

  visit(sourceFile);
  return { sourceFile, findings };
};

const evaluateFile = (file, source) => {
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: file,
  }).outputText;

  const module = { exports: {} };
  const context = {
    exports: module.exports,
    module,
    console,
    Object,
    Array,
    Set,
    Map,
    Math,
    Date,
    RegExp,
    JSON,
    require: (id) => {
      throw new Error(`Cannot evaluate imported module "${id}" while materializing translation spreads.`);
    },
  };

  const sandbox = vm.createContext(context);
  vm.runInContext(transpiled, sandbox, { filename: file });
  return sandbox;
};

const evaluateExpression = (expressionText, context, names) => {
  let rewritten = expressionText;
  for (const name of names) {
    rewritten = rewritten.replace(new RegExp(`\\b${name}\\b`, 'g'), `exports.${name}`);
  }

  return vm.runInContext(`(${rewritten})`, context);
};

const formatKey = (key) => (/^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key));
const formatValue = (value, indent) => {
  const json = JSON.stringify(value, null, 2);
  return json.replace(/\n/g, `\n${indent}  `);
};

const spreadIndent = (source, start) => {
  const lineStart = source.lastIndexOf('\n', start - 1) + 1;
  const prefix = source.slice(lineStart, start);
  if (/^\s*$/.test(prefix)) return prefix;
  return `${prefix.match(/^\s*/)?.[0] || ''}  `;
};

const trailingCommaEnd = (source, end) => {
  const match = /^[ \t\r\n]*,/.exec(source.slice(end));
  return match ? end + match[0].length : end;
};

const fixSource = (file, source) => {
  const scriptKind = file.endsWith('.tsx') || file.endsWith('.jsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, scriptKind);
  const names = exportedNames(sourceFile);
  if (names.length === 0) return { source, changed: false, errors: [] };

  let evaluationContext;
  try {
    evaluationContext = evaluateFile(file, source);
  } catch (error) {
    return {
      source,
      changed: false,
      errors: [`evaluation-failed: ${error.message}`],
    };
  }

  const replacements = [];
  const errors = [];

  const visit = (node) => {
    if (ts.isSpreadAssignment(node)) {
      const expressionText = node.expression.getText(sourceFile);
      if (isEnglishSpread(expressionText)) {
        let inheritedValue;
        try {
          inheritedValue = evaluateExpression(expressionText, evaluationContext, names);
        } catch (error) {
          errors.push(`${lineOf(sourceFile, node.getStart(sourceFile))}: expression-evaluation-failed: ${error.message}`);
          ts.forEachChild(node, visit);
          return;
        }

        if (!inheritedValue || typeof inheritedValue !== 'object' || Array.isArray(inheritedValue)) {
          errors.push(`${lineOf(sourceFile, node.getStart(sourceFile))}: non-object-spread-source`);
          ts.forEachChild(node, visit);
          return;
        }

        const parent = node.parent;
        const explicitKeys = new Set();
        for (const property of parent.properties) {
          if (property === node || ts.isSpreadAssignment(property)) continue;
          const key = getPropertyName(property.name, sourceFile);
          if (key) explicitKeys.add(key);
        }

        const inheritedEntries = Object.entries(inheritedValue).filter(([key]) => !explicitKeys.has(key));
        if (inheritedEntries.length === 0) {
          replacements.push({
            start: node.getStart(sourceFile),
            end: trailingCommaEnd(source, node.end),
            value: '',
          });
        } else {
          const indent = spreadIndent(source, node.getStart(sourceFile));
          const valueIndent = indent;
          const value = inheritedEntries
            .map(([key, item]) => `${formatKey(key)}: ${formatValue(item, valueIndent)}`)
            .join(`,\n${indent}`);
          replacements.push({
            start: node.getStart(sourceFile),
            end: node.end,
            value,
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  if (errors.length > 0 || replacements.length === 0) return { source, changed: false, errors };

  let next = source;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    next = next.slice(0, replacement.start) + replacement.value + next.slice(replacement.end);
  }

  return { source: next, changed: next !== source, errors };
};

const findingsByFile = new Map();
const fixedFiles = [];
const fixErrors = new Map();

for (const file of uniqueFiles) {
  const source = fs.readFileSync(file, 'utf8');
  let inspectedSource = source;

  const initial = findEnglishInheritanceFallbacks(file, source);
  if (fix && initial.findings.length > 0) {
    const fixed = fixSource(file, source);
    if (fixed.errors.length > 0) fixErrors.set(file, fixed.errors);
    if (fixed.changed) {
      fs.writeFileSync(file, fixed.source, 'utf8');
      fixedFiles.push(file);
      inspectedSource = fixed.source;
    }
  }

  const { findings } = findEnglishInheritanceFallbacks(file, inspectedSource);
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

  if (fixErrors.size > 0) {
    console.log('FIX_ERRORS');
    for (const [file, errors] of fixErrors) {
      console.log(`${file}:`);
      for (const error of errors) console.log(`  ${error}`);
    }
    console.log('');
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
      console.log(`${item.line}: ${item.kind}: ${snippet(item.text)}`);
    }
    if (items.length > maxItemsPerFile) console.log(`... ${items.length - maxItemsPerFile} more`);
  }
}

console.log(`\nTOTAL_FILES_WITH_FINDINGS=${sorted.length}`);
console.log(`TOTAL_FINDINGS=${total}`);

process.exitCode = total > 0 || fixErrors.size > 0 ? 1 : 0;
