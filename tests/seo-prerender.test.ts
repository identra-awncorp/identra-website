import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { SUPPORTED_LOCALES, demoScenarioPath, DEMO_SCENARIO_IDS } from '../src/types/routes';
import { DYNAMIC_FLOW_TRANSLATIONS } from '../src/translations/DynamicFlowPageTranslations';
import { INTERFACE_STUDIO_TRANSLATIONS } from '../src/translations/InterfaceStudioPageTranslations';

// Run after build:seo-renderer, before generating the production HTML files.
const { renderPage } = await import(pathToFileURL(resolve('dist-ssr/entry-seo.js')).href) as {
  renderPage: (path: string) => Promise<string>;
};
const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

test('neutral root keeps crawlable English content and honors a saved locale in the browser', () => {
  const html = readFileSync(resolve('dist/index.html'), 'utf8');
  assert.match(html, /<script id="identra-root-locale">[\s\S]*identra_lang[\s\S]*window\.location\.replace/);
  assert.ok(!html.includes('<meta http-equiv="refresh"'));
  assert.ok(html.includes('<meta name="robots" content="index, follow, max-image-preview:large" />'));
  assert.ok(html.includes('<link rel="canonical" href="https://www.identra.id.vn/en" />'));
});

test('Blog source links can wrap without changing their text or destination', async () => {
  const html = await renderPage('/vi/blog-detail/tu-gdpr-den-ssi-vi-sao-chau-au-lai-muon-trao-quyen-kiem-soat-du-lieu-cho-nguoi-dung');
  assert.match(html, /<a[^>]*class="[^"]*\[overflow-wrap:anywhere\][^"]*"/);
  assert.ok(html.includes('https://commission.europa.eu/publications/obstacles-digital-single-market_en'));
});

for (const locale of SUPPORTED_LOCALES) {
  test(`${locale}: all Docs tabs and large lazy sections are inline without streaming scripts`, async () => {
    const html = await renderPage(`/${locale}/docs?tab=credential-issuance`);
    assert.equal((html.match(/data-docs-tab="/g) ?? []).length, 6);
    assert.equal((html.match(/data-docs-section=/g) ?? []).length, 31);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, 'Mounted Docs tabs must not duplicate IDs or break labels');
    assert.ok(html.includes('id="credential-issuance-lifecycle"'));
    assert.ok(html.includes('id="data-boundaries"'));
    assert.ok(!/<!--\$(?:!|\?)-->|<script\b|<template\b/.test(html));
    assert.match(html, /data-docs-tab="credential-issuance" class="contents"/);
  });
  test(`${locale}: collapsed product FAQs retain their complete answers`, async () => {
    for (const [view, copy] of [
      ['dynamic-flow', DYNAMIC_FLOW_TRANSLATIONS[locale]],
      ['interface-studio', INTERFACE_STUDIO_TRANSLATIONS[locale]],
    ] as const) {
      const html = await renderPage(`/${locale}/${view}`);
      for (const faq of Object.values(copy.faq.items)) {
        assert.ok(html.includes(escape(faq.answer)), `${view}: ${faq.question}`);
      }
      assert.match(html, /hidden=""[^>]*role="region"/);
    }
  });
  test(`${locale}: every demo scenario has a real link in initial HTML`, async () => {
    const html = await renderPage(`/${locale}/demo`);
    for (const scenario of DEMO_SCENARIO_IDS) {
      assert.ok(html.includes(`href="${demoScenarioPath(scenario, locale)}"`));
    }
  });
}
