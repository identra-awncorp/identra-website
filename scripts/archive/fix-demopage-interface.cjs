const fs = require('fs');
let content = fs.readFileSync('src/components/DemoPage.tsx', 'utf8');

const replacement = `interface Scenario {
  id: string;
  icon: React.ComponentType<any>;
  titleEn: string;
  titleEs: string;
  titleJa: string;
  titleDe: string;
  titleVi: string;
  tagEn: string;
  tagEs: string;
  tagJa: string;
  tagDe: string;
  tagVi: string;
  descEn: string;
  descEs: string;
  descJa: string;
  descDe: string;
  descVi: string;
  securityEn: string;
  securityEs: string;
  securityJa: string;
  securityDe: string;
  securityVi: string;
  steps: {
    labelEn: string;
    labelEs: string;
    labelJa: string;
    labelDe: string;
    labelVi: string;
    actionEn: string;
    actionEs: string;
    actionJa: string;
    actionDe: string;
    actionVi: string;
  }[];
  successResultEn: string;
  successResultEs: string;
  successResultJa: string;
  successResultDe: string;
  successResultVi: string;
}`;

const startIndex = content.indexOf('interface Scenario {');
const endIndex = content.indexOf('const DEMO_SCENARIOS: Scenario[] = [');

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + replacement + "\n\n" + content.substring(endIndex);
  fs.writeFileSync('src/components/DemoPage.tsx', content);
  console.log("Fixed interface");
}
