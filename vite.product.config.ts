import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';
import {resolveIdentraApiUrl} from './src/identra/config';
import {identraRootCaPlugin} from './src/identra/trust/rootCaPlugin';
import {PRODUCT_PAGE_TRANSLATIONS} from './src/translations/ProductPageTranslations';
import {DEFAULT_SITE_URL} from './src/utils/seo';
import {cborWithoutEval} from './vite.config';

// The product page (ADR-0012) as its own small build: product/index.html -> dist/product/index.html, the
// shell nginx serves for every /01/<GTIN>/21/<serial> path. It runs after the main build (same dist/,
// emptyOutDir off) and shares nothing with the marketing bundle: React and the page, nothing else up
// front, and the verifier chunk preloaded from the HTML so it downloads alongside the page script.

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const productShell = (apiUrl: string): Plugin => ({
  name: 'identra-product-shell-html',
  transformIndexHtml: {
    order: 'post',
    handler(html, context) {
      const copy = PRODUCT_PAGE_TRANSLATIONS.vi;
      const filled = html
        .replaceAll('%PRODUCT_TITLE%', escapeHtml(copy.documentTitle))
        .replaceAll('%PRODUCT_DESCRIPTION%', escapeHtml(copy.documentDescription))
        .replaceAll('%PRODUCT_SITE_URL%', DEFAULT_SITE_URL);
      // The verifier's API connection is opened while the page loads (anonymous, like the SDK's fetches).
      const tags: Array<{tag: string; attrs: Record<string, string | boolean>; injectTo: 'head'}> = [
        {tag: 'link', attrs: {rel: 'preconnect', href: apiUrl, crossorigin: true}, injectTo: 'head'},
      ];
      const bundle = context.bundle;
      if (bundle) {
        const verifier = Object.values(bundle).find((chunk) => chunk.type === 'chunk' && chunk.facadeModuleId?.replaceAll('\\', '/').endsWith('/src/identra/productLoader.ts'));
        if (!verifier || verifier.type !== 'chunk') throw new Error('product build: the verifier chunk (src/identra/productLoader.ts) was not found');
        const entry = Object.values(bundle).find((chunk) => chunk.type === 'chunk' && chunk.isEntry);
        const loaded = new Set(entry && entry.type === 'chunk' ? [entry.fileName, ...entry.imports] : []);
        const files: string[] = [];
        const visit = (fileName: string) => {
          if (loaded.has(fileName) || files.includes(fileName)) return;
          files.push(fileName);
          const chunk = bundle[fileName];
          if (chunk?.type === 'chunk') chunk.imports.forEach(visit);
        };
        visit(verifier.fileName);
        for (const file of files) tags.push({tag: 'link', attrs: {rel: 'modulepreload', crossorigin: true, href: `/${file}`}, injectTo: 'head'});
      }
      return {html: filled, tags};
    },
  },
});

export default defineConfig(({mode}) => ({
  plugins: [
    // Same source as the bundle's import.meta.env (process env first, then .env files).
    productShell(resolveIdentraApiUrl(loadEnv(mode, __dirname, 'VITE_').VITE_IDENTRA_API_URL)),
    cborWithoutEval({required: true}),
    identraRootCaPlugin({defaultDir: path.resolve(__dirname, 'src/identra/trust')}),
    react(),
    tailwindcss(),
  ],
  publicDir: false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'product/index.html'),
      output: {
        entryFileNames: 'assets/product-[hash].js',
        chunkFileNames: 'assets/product-[name]-[hash].js',
        assetFileNames: 'assets/product-[name]-[hash][extname]',
      },
    },
  },
}));

