import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * The @usebruno/converters ESM bundle contains bare require() calls for
 * jscodeshift, lodash/cloneDeep, and xml2js. These are left over from the
 * CJS source and break in a browser environment where require() is not
 * defined. This plugin replaces each call with a proper ESM import so Vite
 * can bundle everything into the browser-safe output.
 *
 * Lifted verbatim from the youdontneedpostman.com project, which already
 * proved this approach runs the FULL @usebruno/converters in the browser.
 */
function fixCjsRequiresInEsmPlugin(): Plugin {
  const CJS_TO_ESM: Array<{ pkg: string; importStatement: string }> = [
    { pkg: 'jscodeshift', importStatement: 'import __jscodeshift__ from "jscodeshift";' },
    { pkg: 'lodash/cloneDeep', importStatement: 'import __cloneDeep__ from "lodash/cloneDeep";' },
    { pkg: 'xml2js', importStatement: 'import * as __xml2js__ from "xml2js";' },
  ];

  const REPLACEMENTS: Record<string, string> = {
    jscodeshift: '__jscodeshift__',
    'lodash/cloneDeep': '__cloneDeep__',
    xml2js: '__xml2js__',
  };

  return {
    name: 'fix-cjs-requires-in-esm',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('@usebruno/converters')) return null;

      let transformed = code;
      const injectedImports = new Set<string>();

      for (const { pkg, importStatement } of CJS_TO_ESM) {
        const replacement = REPLACEMENTS[pkg];
        const pattern = new RegExp(`require\\(["']${pkg.replace('/', '\\/')}["']\\)`, 'g');
        if (pattern.test(transformed)) {
          injectedImports.add(importStatement);
          transformed = transformed.replace(pattern, replacement);
        }
      }

      if (injectedImports.size === 0) return null;

      return [...injectedImports].join('\n') + '\n' + transformed;
    },
  };
}

export default defineConfig({
  plugins: [
    nodePolyfills({
      include: ['assert', 'buffer', 'constants', 'events', 'os', 'process', 'stream', 'timers', 'util'],
      globals: { Buffer: true, process: true, global: true },
    }),
    fixCjsRequiresInEsmPlugin(),
  ],
  optimizeDeps: {
    include: ['@usebruno/converters', 'jscodeshift', 'lodash/cloneDeep', 'xml2js'],
  },
  resolve: {
    alias: {
      'graceful-fs': 'node:fs',
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'entry.ts'),
      name: 'BrunoTranslator',
      formats: ['iife'],
      fileName: () => 'bruno-translator.js',
    },
    outDir: path.resolve(__dirname, '../js/bruno-translator'),
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
