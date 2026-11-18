// Sends a returning visitor on the neutral root "/" to their saved locale before the app hydrates.
// External file (not inline) so the Content-Security-Policy can stay at script-src 'self'.
/* global window */
(function () {
  if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return;
  try {
    var saved = window.localStorage.getItem('identra_lang');
    if (/^(en|es|ja|de|vi)$/.test(saved || '')) {
      window.location.replace('/' + saved + window.location.search + window.location.hash);
    }
  } catch (_) {
    // Storage unavailable: stay on the neutral root.
  }
})();
