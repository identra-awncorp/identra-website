import { readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import ts from 'typescript';

const projectRoot = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(projectRoot, 'src');
const sourceFiles = ts.sys.readDirectory(sourceRoot, ['.ts', '.tsx', '.js', '.jsx']);
const findings = [];

for (const filePath of sourceFiles) {
  const source = readFileSync(filePath, 'utf8');
  source.split(/\r?\n/).forEach((line, index) => {
    if (line.includes('/src/assets/')) {
      findings.push({
        file: relative(projectRoot, filePath),
        line: index + 1,
        text: line.trim(),
      });
    }
  });
}

for (const finding of findings) {
  console.error(`${finding.file}:${finding.line} ${finding.text}`);
}

console.log(`Asset path findings: ${findings.length}`);
process.exitCode = findings.length > 0 ? 1 : 0;
