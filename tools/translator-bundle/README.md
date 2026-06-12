# Bruno Translator Bundle

This folder builds a self-contained browser JS bundle that exposes
`@usebruno/converters`' `postmanTranslation` function on `window`.

The Vite config lives at the repo root (`/vite.translator.config.ts`); the
browser entry point is [`./entry.ts`](./entry.ts) in this folder.

The Mintlify snippet at [`/snippets/translator.jsx`](../../snippets/translator.jsx)
loads the built bundle via a `<script>` tag and uses it to translate Postman
scripts into Bruno scripts on the
[`/get-started/import-export-data/script-translator`](../../get-started/import-export-data/script-translator.mdx)
docs page.

## Why this exists

Mintlify is a managed static-site host — we cannot add Vite plugins, polyfills,
or aliases to its build pipeline. But `@usebruno/converters` depends on Node
modules (`jscodeshift`, `graceful-fs`, etc.) that need browser polyfills.

So we build the converter into one self-contained JS file **outside** Mintlify
and commit the output to `public/js/bruno-translator/`. Mintlify just serves
it as a static asset.

This guarantees the docs translator uses the **exact same logic** as the
Bruno desktop app's Postman import feature, with no drift between them.

## How to (re)build

From the repo root:

```bash
npm install
npm run build:translator
```

The Vite config (`/vite.translator.config.ts`) runs against the repo-root
`package.json` and produces `public/js/bruno-translator/bruno-translator.js`.

Commit the generated file alongside any version bump of `@usebruno/converters`.

## How it works

The Vite config does four things:

1. **`vite-plugin-node-polyfills`** — polyfills Node built-ins
   (`assert`, `buffer`, `os`, `process`, `stream`, `util`, etc.)
2. **`fixCjsRequiresInEsmPlugin`** — rewrites bare `require()` calls left over
   in `@usebruno/converters`' ESM bundle into proper ESM imports
3. **`graceful-fs` → `node:fs` alias** — so jscodeshift's I/O lib resolves to
   a polyfill
4. **IIFE library build** — produces a single `bruno-translator.js` file that
   sets `window.__brunoTranslator` when loaded

This recipe is lifted from the
[youdontneedpostman.com](https://github.com/usebruno/youdontneedpostman.com)
project, which proved the full converter (including the jscodeshift AST
translator) runs in the browser.

## Why not pass `useWorkers: false`?

`postmanTranslation` operates on a single script string and never touches
`worker_threads`. The `useWorkers` flag is only used by `postmanToBruno` for
parallel batch translation of large collections, which we don't use here.
