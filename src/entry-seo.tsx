/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';

// Build-only entry. Use the real route tree without running browser effects or
// maintaining a second, abbreviated version of the page's editorial content.
export const renderPage = async (path: string): Promise<string> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  const errors: unknown[] = [];
  try {
    const { prelude } = await prerenderToNodeStream(
      <StaticRouter location={path}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </StaticRouter>,
      {
        signal: controller.signal,
        // This is a no-JavaScript document, not a streaming response. Inline
        // complete large Suspense boundaries instead of script-inserted chunks.
        progressiveChunkSize: Number.MAX_SAFE_INTEGER,
        onError(error) {
          errors.push(error);
        },
      },
    );
    const chunks: Buffer[] = [];
    for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
    if (errors.length || controller.signal.aborted) {
      throw new AggregateError(errors, `Incomplete SEO rendering: ${path}`);
    }
    const html = Buffer.concat(chunks).toString('utf8');
    if (/<!--\$(?:!|\?)-->/.test(html)) {
      throw new Error(`Unresolved SEO content: ${path} (${html.match(/.{0,80}<!--\$(?:!|\?)-->.{0,120}/)?.[0]})`);
    }
    return html;
  } catch (cause) {
    throw new Error(`Cannot prerender ${path}`, { cause });
  } finally {
    clearTimeout(timeout);
  }
};
