import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {existsSync, readFileSync} from 'node:fs';
import path from 'path';
import {defineConfig, type Connect, type Plugin} from 'vite';
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

export default defineConfig(() => {
  return {
    plugins: [externalShortcuts(), localizedPreviewEntries(), react(), tailwindcss()],
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
