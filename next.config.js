import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
  latex: true,
  search: {
    codeblocks: false,
  },
});

export default withNextra({
  reactStrictMode: true,

  // Define the redirects in next.config.js
  async redirects() {
    return [
      { source: '/introduction', destination: '/introduction/what-is-bruno', permanent: true },
      { source: '/introduction/getting-started', destination: '/introduction/what-is-bruno', permanent: true },
      { source: '/introduction/support', destination: '/introduction/feedback-community', permanent: true },
      { source: '/manifesto.html', destination: '/introduction/manifesto', permanent: true },
      { source: '/manifesto', destination: '/introduction/manifesto', permanent: true },
      { source: '/get-started/bruno-basics', destination: '/get-started/bruno-basics/download', permanent: true },

      // OAuth2 Experimental to OAuth2 2.0 redirects
      { source: '/auth/oauth2-experimental', destination: '/auth/oauth2-2.0/overview', permanent: true },
      { source: '/auth/oauth2-experimental/overview', destination: '/auth/oauth2-2.0/overview', permanent: true },
      { source: '/auth/oauth2-experimental/collection-level-configuration', destination: '/auth/oauth2-2.0/collection-level-configuration', permanent: true },
      { source: '/auth/oauth2-experimental/request-level-configuration', destination: '/auth/oauth2-2.0/request-level-configuration', permanent: true },
      { source: '/auth/oauth2-experimental/authorization-code', destination: '/auth/oauth2-2.0/authorization-code', permanent: true },
      { source: '/auth/oauth2-experimental/client-credentials', destination: '/auth/oauth2-2.0/client-credentials', permanent: true },
      { source: '/auth/oauth2-experimental/password-credentials', destination: '/auth/oauth2-2.0/password-credentials', permanent: true },

      // - /get-started links:
      { source: '/tools/translator', destination: '/get-started/import-export-data/script-translator', permanent: true },
      { source: '/migration-imports/postman', destination: '/get-started/import-export-data/postman-migration', permanent: true },
      { source: '/migration-imports/introduction', destination: '/get-started/import-export-data/import-collections', permanent: true },
      { source: '/get-started/import-export-data/safe-mode', destination: '/get-started/javascript-sandbox', permanent: true },

      // - /git-integration links:
      { source: '/git-integration/using-gui', destination: '/git-integration/using-gui/intro', permanent: true },

      // - /Scripting and Testing links - Tests and Script:
      { source: '/scripting/request/request-object', destination: '/testing/script/request/request-object', permanent: true },
      { source: '/scripting/response/response-object', destination: '/testing/script/response/response-object', permanent: true },
      { source: '/scripting/whitelisting-modules', destination: '/testing/script/whitelisting-modules', permanent: true },
      { source: '/scripting/request/sync-requests', destination: '/testing/script/request/sync-requests', permanent: true },
      { source: '/scripting/vars.html', destination: '/testing/script/vars', permanent: true },
      { source: '/scripting/vars', destination: '/testing/script/vars', permanent: true },
      { source: '/scripting/getting-started', destination: '/testing/script/getting-started', permanent: true },
      { source: '/scripting/javascript-reference', destination: '/testing/script/javascript-reference', permanent: true },
      { source: '/scripting/inbuilt-libraries', destination: '/testing/script/inbuilt-libraries', permanent: true },
      { source: '/scripting/external-libraries', destination: '/testing/script/external-libraries', permanent: true },
      { source: '/scripting/introduction', destination: '/testing/script/getting-started', permanent: true },
      { source: '/scripting/sync-requests', destination: '/testing/script/request/sync-requests', permanent: true },
      { source: '/scripting/response-query', destination: '/testing/script/response/response-query', permanent: true },

      // - / Testing links - Tests and Script:
      { source: '/testing/introduction.html', destination: '/testing/tests/introduction', permanent: true },
      { source: '/testing/assertions', destination: '/testing/tests/assertions', permanent: true },
      { source: '/testing/introduction', destination: '/testing/tests/introduction', permanent: true },
      { source: '/testing/javascript-reference', destination: '/testing/script/javascript-reference', permanent: true },
      { source: '/testing/assertions.html', destination: '/testing/tests/assertions', permanent: true },
      { source: '/testing/javascript-reference.html', destination: '/testing/script/javascript-reference', permanent: true },

      // - /license
      { source: '/license-management/license-management', destination: '/license-management/overview', permanent: true },
      { source: '/license-management/golden-edition/individual/activate-license', destination: '/license-management/overview', permanent: true },
      { source: '/license-management/organization/manage-licenses', destination: '/license-management/overview', permanent: true },
      { source: '/license-management/organization/activate-license', destination: '/license-management/overview', permanent: true },

      // - /bru-cli
      { source: '/cli/overview', destination: '/bru-cli/overview', permanent: true },
      { source: '/cli/overview.html', destination: '/bru-cli/overview', permanent: true },

      // - /bru-language
      { source: '/bru-language-tag-reference', destination: '/bru-lang/tag-reference', permanent: true },
      { source: '/bru-language-design', destination: '/bru-lang/language', permanent: true },
      { source: '/bru-lang-overview', destination: '/bru-lang/overview', permanent: true },
      { source: '/bru-lang-extensions', destination: '/bru-lang/syntax-highlighting', permanent: true },
      { source: '/bru-language-samples.html', destination: '/bru-lang/samples', permanent: true },
      { source: '/bru-language-samples', destination: '/bru-lang/samples', permanent: true },
      { source: '/bru-language-tag-reference.html', destination: '/bru-lang/tag-reference', permanent: true },
      { source: '/bru-language-design.html', destination: '/bru-lang/design', permanent: true },
      { source: '/bru-lang-overview.html', destination: '/bru-lang-overview', permanent: true },
      { source: '/bru-lang-extensions.html', destination: '/bru-lang/syntax-highlighting', permanent: true },

      // Share Collection
      { source: '/to/embed-bruno-collection', destination: '/git-integration/embed-bruno-collection', permanent: true },

      // Variables section redirects
      { source: '/get-started/variables/overview', destination: '/variables/overview', permanent: true },
      { source: '/get-started/variables/environment-variables', destination: '/variables/environment-variables', permanent: true },
      { source: '/get-started/variables/global-environment-variables', destination: '/variables/global-environment-variables', permanent: true },
      { source: '/get-started/variables/collection-variables', destination: '/variables/collection-variables', permanent: true },
      { source: '/get-started/variables/folder-variables', destination: '/variables/folder-variables', permanent: true },
      { source: '/get-started/variables/request-variables', destination: '/variables/request-variables', permanent: true },
      { source: '/get-started/variables/runtime-variables', destination: '/variables/runtime-variables', permanent: true },
      { source: '/get-started/variables/process-env', destination: '/variables/process-env', permanent: true },
    ];
  },
});
