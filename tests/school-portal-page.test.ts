/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The sample university's sign-in page as it is prerendered: only the three public student accounts, and
// nothing of the registrar's account but one line saying it is for presenters (its password is private).
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { SignInView } from '../src/components/SchoolPortalPage';
import { SIGNED_OUT, type AuthState } from '../src/identra/schoolPortalState';
import {
  SCHOOL_PORTAL_PAGE_TRANSLATIONS,
  SCHOOL_PORTAL_SAMPLE_ACCOUNTS,
  SCHOOL_PORTAL_SAMPLE_PASSWORD,
} from '../src/translations/SchoolPortalPageTranslations';

/** The dev stand-in's default registrar password (scripts/dev-identra-api.mjs); never part of the site. */
const DEV_REGISTRAR_PASSWORD = 'dev-registrar-only';

const render = (locale: 'vi' | 'en') => renderToStaticMarkup(createElement(
  MemoryRouter,
  null,
  createElement(SignInView, {
    state: SIGNED_OUT as Extract<AuthState, { status: 'signedOut' }>,
    onSubmit: () => undefined,
    copy: SCHOOL_PORTAL_PAGE_TRANSLATIONS[locale],
    employerDemoPath: `/${locale}/demo/apply-job`,
  }),
));

for (const locale of ['vi', 'en'] as const) {
  test(`sign-in (${locale}): the three student accounts with the public password, no registrar shortcut or password`, () => {
    const html = render(locale);
    const copy = SCHOOL_PORTAL_PAGE_TRANSLATIONS[locale];

    const shortcuts = [...html.matchAll(/data-testid="portal-sample-account-([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(shortcuts, ['sv001', 'sv002', 'sv003']);
    assert.ok(!html.includes('phongdaotao'), 'the registrar account is not listed');
    assert.ok(!html.includes(DEV_REGISTRAR_PASSWORD), 'no registrar password');
    assert.ok(html.includes(SCHOOL_PORTAL_SAMPLE_PASSWORD), 'the public student password is shown');
    const escaped = (text: string) => text.replace(/'/g, '&#x27;');
    assert.ok(html.includes(escaped(copy.presenterNote)));
    assert.ok(html.includes(escaped(copy.sharedAccountsNote)), 'says the accounts are shared and each sign-in sees its own');

    // Nothing is prefilled: the form starts empty, whatever account a presenter means to use.
    const password = /<input[^>]*data-testid="portal-signin-password"[^>]*>/.exec(html)?.[0] ?? '';
    assert.match(password, /value=""/);
    assert.match(/<input[^>]*data-testid="portal-signin-username"[^>]*>/.exec(html)?.[0] ?? '', /value=""/);
  });
}

test('the website carries no registrar password and lists only student accounts', () => {
  assert.deepEqual([...SCHOOL_PORTAL_SAMPLE_ACCOUNTS], ['sv001', 'sv002', 'sv003']);
  const files = (dir: string): string[] => readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => (entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]));
  for (const file of files('src')) {
    const text = readFileSync(file, 'utf8');
    assert.ok(!text.includes(DEV_REGISTRAR_PASSWORD), `${file} must not contain the registrar's password`);
  }
});
