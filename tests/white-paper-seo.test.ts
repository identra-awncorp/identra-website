import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getWhitePaperSearchTerms,
  WHITE_PAPER_PDF_FILENAME,
  WHITE_PAPER_PDF_PATH,
  WHITE_PAPER_SEO_PROFILE,
} from '../src/content/whitePaperSeoProfile.ts';
import { STRUCTURED_BLOG_SEO_PROFILES } from '../src/content/blog/structuredBlogSeoProfiles.ts';
import { WHITE_PAPER_TRANSLATIONS } from '../src/translations/WhitePaperPageTranslations.ts';

test('White Paper owns a concise and distinct Vietnamese search intent', () => {
  const searchTerms = getWhitePaperSearchTerms();
  const blogPrimaryIntents = Object.values(STRUCTURED_BLOG_SEO_PROFILES).map(
    ({ searchIntent }) => searchIntent.primary.toLocaleLowerCase('vi'),
  );

  assert.ok(WHITE_PAPER_SEO_PROFILE.title.length >= 45);
  assert.ok(WHITE_PAPER_SEO_PROFILE.title.length <= 60);
  assert.ok(WHITE_PAPER_SEO_PROFILE.description.length >= 120);
  assert.ok(WHITE_PAPER_SEO_PROFILE.description.length <= 160);
  assert.equal(searchTerms.length, 5);
  assert.equal(new Set(searchTerms.map((term) => term.toLocaleLowerCase('vi'))).size, 5);
  assert.equal(
    blogPrimaryIntents.includes(
      WHITE_PAPER_SEO_PROFILE.searchIntent.primary.toLocaleLowerCase('vi'),
    ),
    false,
  );
  assert.equal(WHITE_PAPER_SEO_PROFILE.title.includes('| Identra'), false);
});

test('White Paper SEO profile describes the published Vietnamese document', () => {
  const copy = WHITE_PAPER_TRANSLATIONS.vi;
  const sectionIds = copy.sections.map(({ id }) => id);
  const visibleDocumentText = [
    copy.heroTitle,
    copy.heroSubtitle,
    ...copy.callouts.flatMap(({ title, body }) => [title, body]),
    ...copy.sections.flatMap((section) => [
      section.eyebrow,
      section.title,
      ...section.paragraphs,
      ...(section.blocks?.flatMap((block) => {
        if (block.type === 'heading' || block.type === 'paragraph') return [block.text];
        if (block.type === 'quote') return [block.title ?? '', block.body];
        if (block.type === 'table') return [...block.headers, ...block.rows.flat()];
        return [...block.items];
      }) ?? []),
    ]),
  ].join(' ').toLocaleLowerCase('vi');

  assert.equal(sectionIds.length, new Set(sectionIds).size);
  assert.ok(sectionIds.length >= 15);
  assert.match(visibleDocumentText, /dữ liệu có thể kiểm chứng/u);
  assert.match(visibleDocumentText, /hợp đồng thông minh/u);
  assert.match(visibleDocumentText, /hạ tầng (?:tin cậy|định danh)|nền tảng xác minh/u);
  assert.equal(WHITE_PAPER_PDF_PATH, `/white-paper/${WHITE_PAPER_PDF_FILENAME}`);
});
