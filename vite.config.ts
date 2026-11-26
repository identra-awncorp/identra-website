import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {existsSync, readFileSync} from 'node:fs';
import path from 'path';
import {defineConfig, loadEnv, type Connect, type Plugin} from 'vite';
import {resolveCertNetConfig} from './src/identra/config';
import {identraRootCaPlugin} from './src/identra/trust/rootCaPlugin';
import {
  DEFAULT_LOCALE,
  localizePath,
  pathToLocale,
} from './src/types/routes';

// These shortcuts belong to the server, not the locale-aware React page registry.
const externalShortcuts = (): Plugin => {
  const config = JSON.parse(readFileSync(path.resolve(__dirname, 'vercel.json'), 'utf8')) as {
    redirects: Array<{source: string; destination: string; permanent: boolean}>;
    headers: Array<{source: string; headers: Array<{key: string; value: string}>}>;
  };
  const redirects = config.redirects.filter(({destination}) => destination.startsWith('https://'));
  const redirectRequest: Connect.NextHandleFunction = (request, response, next) => {
    const pathname = request.url?.split('?')[0].replace(/\/$/, '');
    const redirect = redirects.find(({source}) => source === pathname);
    if (!redirect) {
      next();
      return;
    }

    response.statusCode = redirect.permanent ? 308 : 307;
    response.setHeader('Location', redirect.destination);
    for (const header of config.headers.find(({source}) => source === pathname)?.headers ?? []) {
      response.setHeader(header.key, header.value);
    }
    response.end();
  };

  return {
    name: 'identra-external-shortcuts',
    configureServer(server) { server.middlewares.use(redirectRequest); },
    configurePreviewServer(server) { server.middlewares.use(redirectRequest); },
  };
};

// The product page answers every GS1 Digital Link path (/01/<GTIN>/21/<serial>) with its own shell
// (product/index.html, built by vite.product.config.ts), like the `location ^~ /01/` block of
// deploy/nginx/identra-web.conf.example; the page decides what is valid.
const productShellEntries = (): Plugin => {
  const rewrite: Connect.NextHandleFunction = (request, _response, next) => {
    if (request.url?.startsWith('/01/')) request.url = '/product/index.html';
    next();
  };
  return {
    name: 'identra-product-shell',
    configureServer(server) { server.middlewares.use(rewrite); },
    configurePreviewServer(server) { server.middlewares.use(rewrite); },
  };
};

// cbor-x (used by the SDK's status-list code on the product page) probes `new Function('')` when it
// loads. Under the site's `script-src 'self'` that probe is blocked and reported as a CSP violation, and
// cbor-x then falls back to its no-eval decoder anyway. Build that no-eval behaviour in directly, as
// cbor-x's own "no-eval" builds do, so the page raises no violation. With `required` (the product build)
// the build fails when the transform did not run at all, and the emitted chunks are scanned: every
// reference to `Function` or `eval` must be one of the known, unreachable ones listed below.
const CBOR_PROBE = /try \{\s*new Function\(''\)\s*\} catch\(error\) \{[^}]*inlineObjectReadThreshold = Infinity\s*\}/;
/**
 * The only `Function` / `eval` references allowed in the product chunks, as the minifier writes them:
 * cbor-x's compiled object reader (two branches) runs only once `slowReads` reaches
 * `inlineObjectReadThreshold`, which the transform pins to Infinity; zod's eval probe and its
 * compiled-parser `compile()` run only without `jitless`, which ProductPage sets before the chunk loads.
 */
export const KNOWN_EVAL_SITES: ReadonlyArray<{ name: string; pattern: RegExp }> = [
  { name: 'cbor-x compiled reader (keyMap branch), dead: inlineObjectReadThreshold = Infinity', pattern: /\?new Function\("r","return \{"\+\w+\.map\(\w+=>\w+\.decodeKey\(\w+\)\)/g },
  { name: 'cbor-x compiled reader, dead: inlineObjectReadThreshold = Infinity', pattern: /:new Function\("r","return \{"\+\w+\.map\(\w+=>\w+\.test\(\w+\)\?/g },
  { name: 'zod allowsEval probe, off: jitless', pattern: /const \w+=Function;return new \w+\(""\),!0/g },
  { name: 'zod Doc.compile, off: jitless', pattern: /compile\(\)\{const \w+=Function,/g },
  // A type test (React Flow, in the shared vendor chunk): reads the global, constructs no code.
  { name: '`x instanceof Function`, a type test that constructs nothing', pattern: /instanceof Function(?![\w$])/g },
];
const EVAL_REFERENCE = /(?<![\w$.'"`])(?:Function|eval)(?![\w$'"`])/g;

/** Every `Function` / `eval` reference in `code` that is not a known site (exported for tests). */
export const unknownEvalSites = (code: string): string[] => {
  let rest = code;
  for (const { pattern } of KNOWN_EVAL_SITES) rest = rest.replace(pattern, (match) => match.replace(/Function/g, 'KNOWN_SITE'));
  return [...rest.matchAll(EVAL_REFERENCE)].map((match) => rest.slice(Math.max(0, match.index - 60), match.index + 60));
};

export const cborWithoutEval = ({ required = false, scanChunk }: {
  required?: boolean;
  /** Without `required`: which emitted chunks to scan (with everything they import) for unknown Function/eval references. */
  scanChunk?: (chunk: { moduleIds: readonly string[] }) => boolean;
} = {}): Plugin => {
  let transformed = false;
  return {
    name: 'identra-cbor-x-no-eval',
    enforce: 'pre',
    buildStart() { transformed = false; },
    transform(code, id) {
      if (!/[\\/]cbor-x[\\/]decode\.js$/.test(id)) return null;
      if (!CBOR_PROBE.test(code)) this.error('cbor-x/decode.js changed: update the no-eval transform in vite.config.ts');
      transformed = true;
      return { code: code.replace(CBOR_PROBE, 'inlineObjectReadThreshold = Infinity'), map: null };
    },
    generateBundle(_options, bundle) {
      if (!required && !scanChunk) return;
      if (required && !transformed) this.error('the cbor-x no-eval transform did not run on any module (cbor-x moved or was renamed?): update vite.config.ts');
      // Without `required`: the chunks `scanChunk` picks AND every chunk they import, transitively (the code
      // that runs with them, shared chunks included).
      const picked = new Set<string>();
      if (!required) {
        const visit = (fileName: string) => {
          const chunk = bundle[fileName];
          if (picked.has(fileName) || chunk?.type !== 'chunk') return;
          picked.add(fileName);
          chunk.imports.forEach(visit);
        };
        for (const chunk of Object.values(bundle)) if (chunk.type === 'chunk' && scanChunk?.(chunk)) visit(chunk.fileName);
      }
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk' || (!required && !picked.has(chunk.fileName))) continue;
        const unknown = unknownEvalSites(chunk.code);
        if (unknown.length > 0) {
          this.error(`${chunk.fileName}: ${unknown.length} reference(s) to Function/eval that are not known to be unreachable under script-src 'self':\n${unknown.join('\n')}`);
        }
      }
    },
  };
};

const localizedPreviewEntries = (): Plugin => ({
  name: 'identra-localized-preview-entries',
  configurePreviewServer(server) {
    const distRoot = path.resolve(__dirname, 'dist');

    server.middlewares.use((request, response, next) => {
      const sendNotFound = (locale: string) => {
        const notFoundEntry = path.resolve(distRoot, locale, '404', 'index.html');
        response.statusCode = 404;

        if (!existsSync(notFoundEntry)) {
          next();
          return;
        }

        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.setHeader('Cache-Control', 'no-store');
        response.end(readFileSync(notFoundEntry));
      };

      if (!request.url) {
        next();
        return;
      }

      if (!request.headers.accept?.includes('text/html')) {
        next();
        return;
      }

      const requestUrl = new URL(request.url, 'http://preview.local');
      let relativePath: string;

      try {
        relativePath = decodeURIComponent(requestUrl.pathname)
          .replace(/^\/+/, '')
          .replace(/\/+$/, '');
      } catch {
        sendNotFound(DEFAULT_LOCALE);
        return;
      }

      if (!relativePath) {
        next();
        return;
      }

      const directLocale = pathToLocale(requestUrl.pathname);
      if (directLocale && relativePath === `${directLocale}/404`) {
        sendNotFound(directLocale);
        return;
      }

      let localizedEntry = path.resolve(distRoot, relativePath, 'index.html');
      const relativeEntry = path.relative(distRoot, localizedEntry);
      if (!relativeEntry.startsWith('..') && !path.isAbsolute(relativeEntry) && existsSync(localizedEntry)) {
        request.url = `/${relativePath.replaceAll('\\', '/')}/index.html${requestUrl.search}`;
        next();
        return;
      }

      const requestedLocale = pathToLocale(requestUrl.pathname);
      const canonicalPath = localizePath(
        requestUrl.pathname,
        requestedLocale ?? DEFAULT_LOCALE,
      );

      if (canonicalPath && requestedLocale) {
        const canonicalRelativePath = canonicalPath.replace(/^\/+/, '');
        localizedEntry = path.resolve(distRoot, canonicalRelativePath, 'index.html');
        if (existsSync(localizedEntry)) {
          request.url = `/${canonicalRelativePath}/index.html${requestUrl.search}`;
          next();
          return;
        }
      }

      if (canonicalPath && !requestedLocale) {
        next();
        return;
      }

      const notFoundLocale = requestedLocale ?? DEFAULT_LOCALE;
      sendNotFound(notFoundLocale);
    });
  },
});

export default defineConfig(({ command, mode, isSsrBuild }) => {
  // A build is a production bundle: an unsafe CertNet configuration (the `local` network, a plain-http gateway)
  // fails it here, with the same rule the page applies (config.ts), unless the test-only switch is set.
  if (command === 'build') {
    const env = loadEnv(mode, __dirname, 'VITE_');
    resolveCertNetConfig(env.VITE_CERTNET_GATEWAY_URL, env.VITE_CERTNET_NETWORK, { production: true, testSwitch: env.VITE_CERTNET_ALLOW_LOCAL_FOR_TESTS });
  }
  return {
    plugins: [
      externalShortcuts(),
      productShellEntries(),
      // The web trial wallet's chunks (@identra/sdk-app and its protocol libraries) run under the same CSP as
      // the product page: scan them the same way (the minified browser build; the SEO renderer never runs them).
      cborWithoutEval(isSsrBuild ? {} : { scanChunk: (chunk) => chunk.moduleIds.some((id) => id.replaceAll('\\', '/').includes('/identra-sdk/packages/app/')) }),
      localizedPreviewEntries(),
      identraRootCaPlugin({defaultDir: path.resolve(__dirname, 'src/identra/trust')}),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // The Identra SDK is linked from the sibling repository as a file: dependency.
      fs: {allow: [path.resolve(__dirname), path.resolve(__dirname, '../identra-sdk/packages')]},
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId = id.replaceAll('\\', '/');

            if (!normalizedId.includes('node_modules')) return;

            if (
              normalizedId.includes('/react/') ||
              normalizedId.includes('/react-dom/') ||
              normalizedId.includes('/react-router-dom/')
            ) {
              return 'vendor-react';
            }

            if (normalizedId.includes('/motion/')) {
              return 'vendor-motion';
            }

            if (normalizedId.includes('/lucide-react/')) {
              return 'vendor-icons';
            }

            if (normalizedId.includes('/prismjs/')) {
              return 'vendor-prism';
            }

            return undefined;
          },
        },
      },
    },
  };
});
