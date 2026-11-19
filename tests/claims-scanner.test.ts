/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The claims scanner: a planted untrue claim fails, an allow-listed mention passes.
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { scanPaths, scanText } from '../scripts/claims-scanner';

const rules = (file: string, text: string) => scanText(file, text).map((finding) => finding.rule);

test('planted claims of every kind are found on a marketing page', () => {
  const file = 'src/translations/SomePageTranslations.ts';
  assert.deepEqual(rules(file, "badge: 'SOC 2 Type II certified'"), ['soc2']);
  assert.deepEqual(rules(file, "certs: ['ISO 27001', 'HIPAA compliant', 'FedRAMP Moderate']"), ['iso27001', 'hipaa', 'fedramp']);
  assert.deepEqual(rules(file, "trustedBy: ['Vietcombank', 'VPBank', 'OpenAI']"), ['brand', 'brand', 'brand']);
  assert.deepEqual(rules(file, "rating: '4.7 via Gartner Peer Insights'"), ['rating', 'rating']);
  assert.deepEqual(rules(file, "plan: 'Startup — $250 / month'"), ['price']);
  assert.deepEqual(rules(file, "hero: 'tự động hóa giao dịch bằng hợp đồng thông minh trên blockchain'"), ['smart-contract', 'blockchain']);
  assert.deepEqual(rules(file, "email: 'support@withidentra.com', copyright: '© Identra Identities, Inc.'"), ['fake-domain', 'fake-entity']);
  assert.deepEqual(rules(file, "stat: 'Available in 200+ countries with 99.99% uptime'"), ['uptime', 'countries']);
});

test('an allow-listed mention passes, the same words elsewhere fail', () => {
  const sentence = 'MIT dùng blockchain để công bố bằng số.';
  assert.deepEqual(rules('src/content/blog/tu-thi-diem-cua-mit-den-lan-song-so-hoa-bang-cap-khong-the-dao-nguoc.ts', sentence), []);
  assert.deepEqual(rules('src/translations/HeroTranslations.ts', sentence), ['blockchain']);
  // The allow entry is per rule: a certification claim in the same article is still caught.
  assert.deepEqual(rules('src/content/blog/did-la-gi.ts', 'Identra is SOC 2 certified.'), ['soc2']);
});

test('slugs, story amounts and true wording do not trip the scanner', () => {
  assert.deepEqual(rules('src/types/routes.ts', "'ssi-blockchain-va-tuong-lai-xuat-khau-hang-hoa-viet-nam-sang-eu',"), []);
  assert.deepEqual(rules('src/translations/demo/TicketBookingDemoPageTranslations.ts', "price: '$120'"), []);
  assert.deepEqual(rules('src/translations/SecurityPageTranslations.ts', 'Identra holds no security certification, and no outside firm has audited it yet.'), []);
  assert.deepEqual(rules('src/components/AcademyPage.tsx', "import { Square, Circle } from 'lucide-react';"), []);
});

test('scanning a folder reports the planted file with its line', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'identra-claims-'));
  try {
    mkdirSync(path.join(root, 'src'), { recursive: true });
    writeFileSync(path.join(root, 'src', 'clean.ts'), "export const copy = 'Signed credentials, checked in your browser.';\n");
    writeFileSync(path.join(root, 'src', 'planted.ts'), "export const a = 1;\nexport const badge = 'Trusted by Vingroup';\n");
    const findings = scanPaths(root, ['src']);
    assert.deepEqual(findings.map(({ file, line, rule }) => ({ file, line, rule })), [{ file: 'src/planted.ts', line: 2, rule: 'brand' }]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
