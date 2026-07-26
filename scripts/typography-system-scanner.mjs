import { readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import ts from 'typescript';

const projectRoot = resolve(import.meta.dirname, '..');
const migratedComponents = [
  'src/components/Hero.tsx',
  'src/components/RelaySection.tsx',
  'src/components/RelayTransactions.tsx',
  'src/components/BuildingBlocks.tsx',
  'src/components/PrivacyPortal.tsx',
  'src/components/SecurityCertifications.tsx',
  'src/components/WhitePaperPage.tsx',
  'src/components/PricingPage.tsx',
  'src/components/ResearchPage.tsx',
  'src/components/CustomersPage.tsx',
  'src/components/PlatformPage.tsx',
  'src/components/BlogPage.tsx',
  'src/components/BlogDetailPage.tsx',
  'src/components/blog/StructuredBlogDetailPage.tsx',
  'src/components/EbooksPage.tsx',
  'src/components/ListDemoPage.tsx',
  'src/components/AboutPage.tsx',
  'src/components/CareersPage.tsx',
  'src/components/ContactPage.tsx',
  'src/components/AcademyPage.tsx',
  'src/components/DocsPage.tsx',
  'src/components/docs/DocsArticleLayout.tsx',
  'src/components/docs/DocsApiReferenceCodeExplorer.tsx',
  'src/components/docs/DocsSdkFlowCodeExplorer.tsx',
];

const forbiddenPatterns = [
  {
    kind: 'arbitrary-font-size',
    pattern: /\btext-\[(?:\d+(?:\.\d+)?(?:px|rem))\]/g,
  },
  {
    kind: 'unsupported-font-size',
    pattern: /\btext-(?:3\.5xl|5\.5xl)\b/g,
  },
  {
    kind: 'nonzero-letter-spacing',
    pattern: /\btracking-[a-z0-9.[\]/-]+\b/g,
  },
  {
    kind: 'unsupported-font-weight',
    pattern: /\bfont-(?:extrabold|black)\b/g,
  },
];

const findings = [];

const addFinding = (filePath, sourceFile, position, kind, value) => {
  const location = sourceFile.getLineAndCharacterOfPosition(position);
  findings.push({
    file: relative(projectRoot, filePath),
    line: location.line + 1,
    kind,
    value,
  });
};

for (const componentPath of migratedComponents) {
  const filePath = resolve(projectRoot, componentPath);
  const sourceText = readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  for (const { kind, pattern } of forbiddenPatterns) {
    for (const match of sourceText.matchAll(pattern)) {
      addFinding(filePath, sourceFile, match.index ?? 0, kind, match[0]);
    }
  }

  const visit = (node) => {
    const openingElement = ts.isJsxElement(node)
      ? node.openingElement
      : ts.isJsxSelfClosingElement(node)
        ? node
        : null;

    if (openingElement && /^h[1-3]$/.test(openingElement.tagName.getText())) {
      const className = openingElement.attributes.properties.find(
        (attribute) => ts.isJsxAttribute(attribute) && attribute.name.getText() === 'className',
      );
      const classSource = className?.initializer?.getText() ?? '';

      if (!/\btype-[a-z-]+\b/.test(classSource)) {
        addFinding(
          filePath,
          sourceFile,
          openingElement.getStart(sourceFile),
          'heading-without-semantic-role',
          openingElement.tagName.getText(),
        );
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
}

for (const finding of findings) {
  console.error(
    `${finding.file}:${finding.line} ${finding.kind} ${finding.value}`,
  );
}

console.log(`Typography system findings: ${findings.length}`);
process.exitCode = findings.length > 0 ? 1 : 0;
