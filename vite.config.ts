import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
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

            if (normalizedId.includes('/recharts/')) {
              return 'vendor-charts';
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
