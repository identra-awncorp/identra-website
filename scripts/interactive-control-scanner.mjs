import { readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import ts from 'typescript';

const projectRoot = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(projectRoot, 'src', 'components');
const sourceFiles = ts.sys.readDirectory(sourceRoot, ['.tsx']);
const nonInteractiveTags = new Set(['div', 'p', 'span']);
const interactiveTags = new Set(['a', 'button', 'input', 'select', 'textarea']);
const findings = [];

const getOpeningElement = (node) => (
  ts.isJsxElement(node)
    ? node.openingElement
    : ts.isJsxSelfClosingElement(node)
      ? node
      : null
);

const hasAttribute = (openingElement, name) => (
  openingElement.attributes.properties.some(
    (attribute) => ts.isJsxAttribute(attribute) && attribute.name.getText() === name,
  )
);

const getStaticClassName = (openingElement) => {
  const attribute = openingElement.attributes.properties.find(
    (candidate) => ts.isJsxAttribute(candidate) && candidate.name.getText() === 'className',
  );
  return attribute?.initializer?.getText() ?? '';
};

const hasInteractiveDescendant = (node) => {
  let found = false;
  const visit = (descendant) => {
    if (found) return;
    if (descendant !== node) {
      const openingElement = getOpeningElement(descendant);
      if (openingElement && interactiveTags.has(openingElement.tagName.getText())) {
        found = true;
        return;
      }
    }
    ts.forEachChild(descendant, visit);
  };
  visit(node);
  return found;
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

  const addFinding = (node, kind, tagName) => {
    const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
    findings.push({
      file: relative(projectRoot, filePath),
      kind,
      line: position.line + 1,
      tagName,
    });
  };

  const visit = (node) => {
    const openingElement = getOpeningElement(node);
    if (openingElement) {
      const tagName = openingElement.tagName.getText();
      const className = getStaticClassName(openingElement);
      const isBackdrop = className.includes('fixed') && className.includes('inset-0');

      if (
        nonInteractiveTags.has(tagName)
        && hasAttribute(openingElement, 'onClick')
        && !isBackdrop
      ) {
        addFinding(openingElement, 'click-only-element', tagName);
      }

      if (interactiveTags.has(tagName) && hasInteractiveDescendant(node)) {
        addFinding(openingElement, 'nested-interactive-control', tagName);
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
}

for (const finding of findings) {
  console.error(
    `${finding.file}:${finding.line} ${finding.kind} <${finding.tagName}>`,
  );
}

console.log(`Interactive control findings: ${findings.length}`);
process.exitCode = findings.length > 0 ? 1 : 0;
