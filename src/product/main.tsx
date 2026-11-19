/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Entry of the product page shell (product/index.html): only the product page, no site router,
// no marketing bundle, no motion library, and only the CSS this page uses.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProductPage from '../components/ProductPage';
import './product.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductPage pathname={window.location.pathname} />
  </StrictMode>,
);

// The site's typefaces, requested after the first render so a third-party stylesheet never delays the
// page or its verdict (the system font shows until they arrive; `display=swap`).
const fonts = document.createElement('link');
fonts.rel = 'stylesheet';
fonts.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Space+Grotesk:wght@600;700&family=JetBrains+Mono:wght@400&display=swap';
document.head.append(fonts);
