/**
 * Browser entry for the Postman → Bruno script translator.
 *
 * This file is bundled by Vite (see ./vite.config.ts) into a single
 * self-contained JS file that exposes the translator on `window`.
 *
 * The Mintlify snippet (`/snippets/translator.jsx`) loads the built bundle
 * via a <script> tag and calls `window.__brunoTranslator.postmanTranslation()`.
 *
 * This guarantees that the docs translator uses the EXACT same logic as the
 * Bruno desktop app's Postman import feature — both go through
 * `@usebruno/converters`'s `postmanTranslation`.
 */

import { postmanTranslation } from '@usebruno/converters';

declare global {
  interface Window {
    __brunoTranslator?: {
      postmanTranslation: (script: string) => string;
    };
  }
}

window.__brunoTranslator = {
  postmanTranslation,
};

window.dispatchEvent(new CustomEvent('bruno-translator-ready'));
