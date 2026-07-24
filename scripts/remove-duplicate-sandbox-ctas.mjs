import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';

const projectRoot = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(projectRoot, 'src', 'components');

const sourceFiles = ts.sys.readDirectory(sourceRoot, ['.tsx'], undefined, undefined);
const richContentTags = new Set([
  'article',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'section',
]);
let totalRemovals = 0;

const hasRichContent = (node) => {
  let found = false;
  const visit = (descendant) => {
    if (found || descendant === node) {
      ts.forEachChild(descendant, visit);
      return;
    }

    const openingElement = ts.isJsxElement(descendant)
      ? descendant.openingElement
      : ts.isJsxSelfClosingElement(descendant)
        ? descendant
        : null;
    if (openingElement && richContentTags.has(openingElement.tagName.getText())) {
      found = true;
      return;
    }
    ts.forEachChild(descendant, visit);
  };
  visit(node);
  return found;
};

const isSandboxButton = (node) => {
  const openingElement = ts.isJsxElement(node)
    ? node.openingElement
    : ts.isJsxSelfClosingElement(node)
      ? node
      : null;

  if (
    !openingElement
    || openingElement.tagName.getText() !== 'button'
    || hasRichContent(node)
  ) {
    return false;
  }

  return openingElement.attributes.properties.some((attribute) => {
    if (!ts.isJsxAttribute(attribute) || attribute.name.getText() !== 'onClick') {
      return false;
    }

    const expression = attribute.initializer && ts.isJsxExpression(attribute.initializer)
      ? attribute.initializer.expression
      : null;

    return expression && ts.isIdentifier(expression) && expression.text === 'onOpenSandbox';
  });
};

const getButtonLabel = (node, sourceFile) => {
  const children = ts.isJsxElement(node) ? node.children : [];
  return children
    .map((child) => child.getText(sourceFile).replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join(' ');
};

for (const filePath of sourceFiles) {
  const sourceText = readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const duplicates = [];

  const visit = (node) => {
    if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
      const sandboxButtons = node.children.filter(isSandboxButton);

      for (const duplicateButton of sandboxButtons.slice(1)) {
        const position = sourceFile.getLineAndCharacterOfPosition(duplicateButton.getStart(sourceFile));
        duplicates.push({
          line: position.line + 1,
          labels: sandboxButtons.map((button) => getButtonLabel(button, sourceFile)),
        });
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  if (duplicates.length === 0) {
    continue;
  }

  totalRemovals += duplicates.length;
  for (const { labels, line } of duplicates) {
    console.log(`${filePath}:${line} ${labels.join(' | ')}`);
  }
}

console.log(`Duplicate sandbox CTA buttons: ${totalRemovals}`);
process.exitCode = totalRemovals > 0 ? 1 : 0;
