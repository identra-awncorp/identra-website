/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Fails when the site states things that are not true of Identra: certifications it does not hold,
// third-party brands shown as customers, ratings, a price list, blockchain / smart-contract wording,
// and invented company facts. Scans sources by default; `--path dist` scans the built output.
// A mention that is legitimate goes in ALLOWED with the file, the rule and the reason.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export type ClaimRule = { readonly id: string; readonly pattern: RegExp; readonly kind: string };

export const CLAIM_RULES: readonly ClaimRule[] = [
  { id: 'soc2', kind: 'certification', pattern: /\bSOC[\s-]?2\b|\bSOC\s?(?:1|3)\s?Type/i },
  { id: 'iso27001', kind: 'certification', pattern: /\bISO(?:\/IEC)?[\s-]?27(?:001|701|017|018)\b/i },
  { id: 'pci', kind: 'certification', pattern: /\bPCI[\s-]?DSS\b/i },
  { id: 'hipaa', kind: 'certification', pattern: /\bHIPAA\b/ },
  { id: 'ferpa', kind: 'certification', pattern: /\bFERPA\b/ },
  { id: 'fedramp', kind: 'certification', pattern: /FedRAMP/i },
  { id: 'kantara', kind: 'certification', pattern: /\bKantara\b/i },
  { id: 'ibeta', kind: 'certification', pattern: /\biBeta\b/i },
  { id: 'nist', kind: 'certification', pattern: /\bNIST\b/ },
  { id: 'compliant-claim', kind: 'certification', pattern: /\b(?:GDPR|CCPA)[\s-](?:compliant|certified|ready)\b/i },
  { id: 'pentest', kind: 'certification', pattern: /penetration[\s-]test|\bpen[\s-]?test|kiểm thử xâm nhập|Penetrationstest|ペネトレーションテスト/i },
  { id: 'bug-bounty', kind: 'company-fact', pattern: /bug[\s-]bounty/i },
  { id: 'soc-24-7', kind: 'company-fact', pattern: /\b24\/7\b|24 ?h\/7/i },
  { id: 'uptime', kind: 'company-fact', pattern: /(?:uptime|SLA|availability|disponibilidad|Verfügbarkeit|稼働率|thời gian hoạt động)\D{0,30}\d{2}[.,]\d+\s?%|\d{2}[.,]\d+\s?%\s?(?:uptime|SLA|availability)/i },
  { id: 'countries', kind: 'company-fact', pattern: /\b(?:[4-9]\d|1\d{2}|2\d{2})\+?\s?(?:countries|países|Ländern?|か国|カ国|quốc gia)|\d{2,3}\s?(?:以上の国|か国以上|カ国以上)/i },
  {
    id: 'brand',
    kind: 'customer',
    pattern: /\b(?:Vingroup|Vietjet|Vietcombank|Viettel|VPBank|MB ?Bank|Vinamilk|OpenAI|Coursera|Brex|Twilio|Techcombank|Momo|ZaloPay|Grab|Shopee|Tiki|Lazada)\b|\bFPT\b|\bSquare(?=['"]|\s+(?:Inc|Capital|POS|Cash)\b|'s\b)|\bLime(?=['"]|\s+(?:case|Bike|scooter)|'s\b)/,
  },
  // G2 only in a review context: minified bundles are full of identifiers named g2.
  { id: 'rating', kind: 'rating', pattern: /Gartner|Peer Insights|Forrester|Capterra|Trustpilot|Industry (?:Standard )?Leader|\b(?:on|via|from) G2\b|\bG2 (?:Crowd|reviews?|rating|Grid|Leader)/i },
  { id: 'price', kind: 'price', pattern: /(?:US)?\$\s?\d{2,}|\$\d+(?:[.,]\d+)?\s?(?:\/|per\b|USD|k\b|K\b|M\b)|\b\d[\d.,]*\s?USD\b|\bUSD\s?\d/ },
  { id: 'smart-contract', kind: 'blockchain', pattern: /smart[\s-]contracts?|hợp đồng thông minh|スマートコントラクト|contratos? inteligentes?|intelligente[rn]? Verträge?/i },
  // A slug or file name such as ssi-blockchain-... or ebsi-blockchain-... is not a sentence about Identra.
  { id: 'blockchain', kind: 'blockchain', pattern: /(?<![\w-])blockchain|ブロックチェーン|on-chain|onchain|chuỗi khối/i },
  { id: 'fake-domain', kind: 'company-fact', pattern: /withidentra\.com/i },
  { id: 'fake-entity', kind: 'company-fact', pattern: /Identities,?\s?Inc/i },
];

export type AllowEntry = { readonly file: string; readonly rule: string; readonly reason: string };

// Blog articles that explain blockchain or smart contracts in general, or report what third parties
// (MIT Blockcerts, EBSI, Vietnam's draft decree) do with them. None says Identra uses one.
const BLOG_ARTICLES_ON_BLOCKCHAIN = [
  'tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc',
  'ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu',
  'vuot-xa-super-app-ky-nguyen-ultra-app',
  'did-la-gi',
  'ssi-trong-giao-duc-giai-phap-so-hoa-bang-cap-va-xac-minh-nang-luc',
  'du-thao-moi-ve-dinh-danh-va-xac-thuc-co-hoi-nao-dang-mo-ra-cho-ssi-tai-viet-nam',
  'tuong-lai-cua-xac-thuc-va-truy-xuat-nguon-goc-san-pham',
  'dinh-danh-tu-chu-ssi-la-gi',
  'chau-au-dang-dan-dau-cuoc-chuyen-dich-sang-dinh-danh-tu-chu',
] as const;
const BLOG_TOPIC = 'general explainer about blockchain / smart contracts, not a claim about Identra';

// Paths are relative to the project root and use '/'; a trailing '*' matches any rest of the path.
// Keep this list short and explained.
export const ALLOWED: readonly AllowEntry[] = [
  { file: 'scripts/claims-scanner.ts', rule: '*', reason: 'the rule list itself' },
  { file: 'tests/claims-scanner.test.ts', rule: '*', reason: 'planted violations for the test' },
  { file: 'scripts/localization-scanner.mjs', rule: 'brand', reason: 'list of proper nouns the localisation scanner ignores' },
  { file: 'scripts/component-translation-data-scanner.mjs', rule: '*', reason: 'list of proper nouns and acronyms the scanner ignores' },
  ...BLOG_ARTICLES_ON_BLOCKCHAIN.flatMap((slug) => [
    { file: `src/content/blog/${slug}.ts`, rule: 'blockchain', reason: BLOG_TOPIC },
    { file: `src/content/blog/${slug}.ts`, rule: 'smart-contract', reason: BLOG_TOPIC },
    { file: `dist/vi/blog-detail/${slug}/index.html`, rule: 'blockchain', reason: BLOG_TOPIC },
    { file: `dist/vi/blog-detail/${slug}/index.html`, rule: 'smart-contract', reason: BLOG_TOPIC },
  ]),
  { file: 'src/content/blog/structuredBlogSeoProfiles.ts', rule: 'blockchain', reason: 'search terms of the articles above' },
  { file: 'src/content/blog/structuredBlogSeoProfiles.ts', rule: 'smart-contract', reason: 'search terms of the articles above' },
  { file: 'public/blog-feed.xml', rule: 'blockchain', reason: 'titles and summaries of the articles above (generated)' },
  { file: 'public/blog-feed.xml', rule: 'smart-contract', reason: 'titles and summaries of the articles above (generated)' },
  { file: 'dist/blog-feed.xml', rule: 'blockchain', reason: 'copy of public/blog-feed.xml' },
  { file: 'dist/blog-feed.xml', rule: 'smart-contract', reason: 'copy of public/blog-feed.xml' },
  { file: 'dist/*/blog/index.html', rule: 'blockchain', reason: 'titles and summaries of the articles above' },
  { file: 'dist/*/blog/index.html', rule: 'smart-contract', reason: 'titles and summaries of the articles above' },
  // The main bundle carries the blog articles; the sources are checked file by file above.
  { file: 'dist/assets/index-*.js', rule: 'blockchain', reason: 'bundled blog articles above' },
  { file: 'dist/assets/index-*.js', rule: 'smart-contract', reason: 'bundled blog articles above' },
  { file: 'tests/*-blog-article.test.ts', rule: 'blockchain', reason: 'tests of the articles above' },
  { file: 'tests/*-blog-article.test.ts', rule: 'smart-contract', reason: 'tests of the articles above' },
  { file: 'tests/structured-blog-*.test.ts', rule: 'blockchain', reason: 'tests of the articles above' },
  // The cryptocurrency industry page describes screening a customer's crypto wallet, not how Identra works.
  { file: 'src/translations/CryptocurrencyPageTranslations.ts', rule: 'blockchain', reason: 'crypto customers\' wallets, not Identra' },
  { file: 'src/translations/CryptocurrencyPageTranslations.ts', rule: 'smart-contract', reason: 'a sanctioned contract in the wallet-screening simulation' },
  { file: 'src/components/CryptocurrencyPage.tsx', rule: 'blockchain', reason: 'crypto customers\' wallets, not Identra' },
  { file: 'dist/*/cryptocurrency/index.html', rule: 'blockchain', reason: 'prerender of the page above' },
  { file: 'dist/assets/CryptocurrencyPage-*.js', rule: 'blockchain', reason: 'bundle of the page above' },
  { file: 'dist/assets/CryptocurrencyPage-*.js', rule: 'smart-contract', reason: 'bundle of the page above' },
  // Amounts inside simulations (an invoice being read, a loan, a wire transfer), not Identra prices.
  { file: 'src/components/DocumentAIPage.tsx', rule: 'price', reason: 'amounts on sample documents read by the simulation' },
  { file: 'src/translations/FintechPageTranslations.ts', rule: 'price', reason: 'loan amount in the simulation' },
  { file: 'src/translations/ReverificationPageTranslations.ts', rule: 'price', reason: 'wire-transfer threshold in the simulation' },
  { file: 'dist/*/document-ai/index.html', rule: 'price', reason: 'prerender of the sample documents above' },
  { file: 'dist/*/reverification/index.html', rule: 'price', reason: 'prerender of the simulation above' },
  { file: 'dist/*/demo/*/index.html', rule: 'price', reason: 'ticket prices and salaries inside the simulated demo stories' },
];

// Simulated demo scenarios show ticket and room prices as part of the story, not Identra prices.
const PRICE_EXEMPT_PREFIXES = ['src/components/demo/', 'src/translations/demo/', 'src/components/dashboard/', 'src/translations/dashboard/'];

const TEXT_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.md', '.html', '.xml', '.txt', '.json', '.svg', '.css']);
const SKIPPED_DIRS = new Set(['node_modules', '.git', 'dist-ssr', 'archive', 'fixtures']);

export type ClaimFinding = { readonly file: string; readonly line: number; readonly rule: string; readonly text: string };

const matchesPath = (pattern: string, file: string) =>
  pattern.includes('*')
    ? new RegExp(`^${pattern.split('*').map((part) => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('[^/]*')}$`).test(file)
    : pattern === file;

export const isAllowed = (file: string, rule: string) =>
  ALLOWED.some((entry) => matchesPath(entry.file, file) && (entry.rule === '*' || entry.rule === rule));

export const scanText = (file: string, text: string): ClaimFinding[] => {
  const findings: ClaimFinding[] = [];
  const priceExempt = PRICE_EXEMPT_PREFIXES.some((prefix) => file.startsWith(prefix));
  // Built bundles are minified: one "line" can be the whole app, so report a window around the match.
  text.split(/\r?\n/).forEach((line, index) => {
    for (const rule of CLAIM_RULES) {
      if (rule.id === 'price' && (priceExempt || /\.(?:js|mjs|cjs)$/.test(file))) continue;
      if (isAllowed(file, rule.id)) continue;
      const global = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : `${rule.pattern.flags}g`);
      for (const match of line.matchAll(global)) {
        const start = Math.max(0, (match.index ?? 0) - 50);
        findings.push({ file, line: index + 1, rule: rule.id, text: line.slice(start, (match.index ?? 0) + match[0].length + 50).trim() });
      }
    }
  });
  return findings;
};

const walk = (dir: string, out: string[]) => {
  if (!statSync(dir).isDirectory()) return [dir];
  for (const name of readdirSync(dir)) {
    if (SKIPPED_DIRS.has(name)) continue;
    const full = resolve(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (TEXT_EXTENSIONS.has(extname(name))) out.push(full);
  }
  return out;
};

export const scanPaths = (projectRoot: string, paths: readonly string[]): ClaimFinding[] =>
  paths.flatMap((path) => walk(resolve(projectRoot, path), []))
    .flatMap((full) => scanText(relative(projectRoot, full).split(sep).join('/'), readFileSync(full, 'utf8')));

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const projectRoot = resolve(fileURLToPath(import.meta.url), '..', '..');
  const pathFlag = process.argv.indexOf('--path');
  const paths = pathFlag >= 0 ? process.argv.slice(pathFlag + 1) : ['src', 'public', 'scripts', 'tests', 'index.html'];
  const findings = scanPaths(projectRoot, paths);
  for (const finding of findings) console.error(`${finding.file}:${finding.line} [${finding.rule}] ${finding.text}`);
  const byRule = findings.reduce<Record<string, number>>((acc, f) => ({ ...acc, [f.rule]: (acc[f.rule] ?? 0) + 1 }), {});
  console.log(`Claim findings in ${paths.join(', ')}: ${findings.length}${findings.length ? ` ${JSON.stringify(byRule)}` : ''}`);
  process.exitCode = findings.length > 0 ? 1 : 0;
}
