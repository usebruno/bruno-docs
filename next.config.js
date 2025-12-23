import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false
  }
})

export default withNextra({
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Exclude node-specific modules from the client-side bundle
    if (!isServer) {
      config.externals.push({
        'node:os': 'os',
        'node:path': 'path',
        'node:worker_threads': 'worker_threads',
        'fs': 'fs',
        'child_process': 'child_process',
        'net': 'net',
        'tls': 'tls'
      });
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      os: false,
      path: false,
      worker_threads: false,
      child_process: false,
      net: false,
      tls: false,
      crypto: false,
      constants: false,
      stream: false,
      util: false,
      assert: false,
      buffer: false
    };

    return config;
  },
  experimental: {
    optimizePackageImports: ['@monaco-editor/react']
  },
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
      { source: '/auth/oauth2-2.0/request-level-configuration', destination: '/auth/oauth2-2.0/collection-level-configuration', permanent: true },
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

      // Breadcrumb fix redirects - Issue #474
      { source: '/testing', destination: '/testing/tests/introduction', permanent: true },
      { source: '/testing/script', destination: '/testing/script/getting-started', permanent: true },
      { source: '/testing/automate-test', destination: '/testing/automate-test/overview', permanent: true },
      { source: '/testing/tests', destination: '/testing/tests/introduction', permanent: true },

      // - /license-management redirects (old structure to new structure)
      { source: '/license-management/license-management', destination: '/license-overview', permanent: true },
      { source: '/license-management/overview', destination: '/license-overview', permanent: true },
      { source: '/license-management/golden-edition/individual/activate-license', destination: '/license-end-users/activate-license', permanent: true },
      { source: '/license-management/organization/manage-licenses', destination: '/license-administrators/license-portal', permanent: true },
      { source: '/license-management/organization/activate-license', destination: '/license-end-users/activate-license', permanent: true },

      // License Administrators redirects
      { source: '/license-management/license-administrators/license-portal', destination: '/license-administrators/license-portal', permanent: true },
      { source: '/license-management/license-administrators/scim-provisioning/overview', destination: '/license-administrators/scim-provisioning/overview', permanent: true },
      { source: '/license-management/license-administrators/scim-provisioning/configure-scim-with-okta', destination: '/license-administrators/scim-provisioning/configure-scim-with-okta', permanent: true },
      { source: '/license-management/license-administrators/scim-provisioning/bruno-scim-api', destination: '/license-administrators/scim-provisioning/bruno-scim-api', permanent: true },

      // License End Users redirects
      { source: '/license-management/license-end-users/activate-license', destination: '/license-end-users/activate-license', permanent: true },

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

      // Secret Managers redirects
      { source: '/secrets-management/overview.html', destination: '/secrets-management/overview', permanent: true },
      { source: '/secrets-management/secret-managers/secret-managers/:path*', destination: '/secrets-management/secret-managers/:path*', permanent: true },
      { source: '/secrets-management/secret-managers', destination: '/secrets-management/secret-managers/overview', permanent: true },
      { source: '/secrets-management/secret-managers/hashicorp-vault', destination: '/secrets-management/secret-managers/hashicorp-vault/overview', permanent: true },
      { source: '/secrets-management/secret-managers/aws-secrets-manager', destination: '/secrets-management/secret-managers/aws-secrets-manager/overview', permanent: true },
      { source: '/secrets-management/secret-managers/azure-key-vault', destination: '/secrets-management/secret-managers/azure-key-vault/overview', permanent: true },
      { source: '/introduction/secrets-management/hashicorp-vault', destination: '/secrets-management/secret-managers/hashicorp-vault/overview', permanent: true },
      { source: '/introduction/secrets-management/hashicorp-vault/overview', destination: '/secrets-management/secret-managers/hashicorp-vault/overview', permanent: true },
      { source: '/introduction/secrets-management/hashicorp-vault/adding-a-secret-provider', destination: '/secrets-management/secret-managers/hashicorp-vault/adding-a-secret-provider', permanent: true },
      { source: '/introduction/secrets-management/hashicorp-vault/configuring-and-fetching-secrets', destination: '/secrets-management/secret-managers/hashicorp-vault/configuring-and-fetching-secrets', permanent: true },
      { source: '/introduction/secrets-management/hashicorp-vault/using-secrets', destination: '/secrets-management/secret-managers/hashicorp-vault/using-secrets', permanent: true },
      { source: '/introduction/secrets-management/hashicorp-vault/using-with-cli', destination: '/secrets-management/secret-managers/hashicorp-vault/using-with-cli', permanent: true },

      { source: '/introduction/secrets-management/aws-secrets-manager', destination: '/secrets-management/secret-managers/aws-secrets-manager/overview', permanent: true },
      { source: '/introduction/secrets-management/aws-secrets-manager/overview', destination: '/secrets-management/secret-managers/aws-secrets-manager/overview', permanent: true },
      { source: '/introduction/secrets-management/aws-secrets-manager/adding-a-secret-provider', destination: '/secrets-management/secret-managers/aws-secrets-manager/adding-a-secret-provider', permanent: true },
      { source: '/introduction/secrets-management/aws-secrets-manager/configuring-and-fetching-secrets', destination: '/secrets-management/secret-managers/aws-secrets-manager/configuring-and-fetching-secrets', permanent: true },
      { source: '/introduction/secrets-management/aws-secrets-manager/using-secrets', destination: '/secrets-management/secret-managers/aws-secrets-manager/using-secrets', permanent: true },

      { source: '/introduction/secrets-management/azure-key-vault', destination: '/secrets-management/secret-managers/azure-key-vault/overview', permanent: true },
      { source: '/introduction/secrets-management/azure-key-vault/overview', destination: '/secrets-management/secret-managers/azure-key-vault/overview', permanent: true },
      { source: '/introduction/secrets-management/azure-key-vault/adding-a-secret-provider', destination: '/secrets-management/secret-managers/azure-key-vault/adding-a-secret-provider', permanent: true },
      { source: '/introduction/secrets-management/azure-key-vault/configuring-and-fetching-secrets', destination: '/secrets-management/secret-managers/azure-key-vault/configuring-and-fetching-secrets', permanent: true },
      { source: '/introduction/secrets-management/azure-key-vault/using-secrets', destination: '/secrets-management/secret-managers/azure-key-vault/using-secrets', permanent: true },

      // Additional Azure Key Vault redirects
      { source: '/secrets-management/azure-key-vault/adding-a-secret-provider', destination: '/secrets-management/secret-managers/azure-key-vault/adding-a-secret-provider', permanent: true },
      { source: '/secrets-management/azure-key-vault/configuring-and-fetching-secrets', destination: '/secrets-management/secret-managers/azure-key-vault/configuring-and-fetching-secrets', permanent: true },

      // Additional AWS Secrets Manager redirects
      { source: '/secrets-management/aws-secrets-manager/adding-a-secret-provider', destination: '/secrets-management/secret-managers/aws-secrets-manager/adding-a-secret-provider', permanent: true },
      { source: '/secrets-management/aws-secrets-manager/configuring-and-fetching-secrets', destination: '/secrets-management/secret-managers/aws-secrets-manager/configuring-and-fetching-secrets', permanent: true },

      // Additional HashiCorp Vault redirects
      { source: '/secrets-management/hashicorp-vault/adding-a-secret-provider', destination: '/secrets-management/secret-managers/hashicorp-vault/adding-a-secret-provider', permanent: true },
      { source: '/secrets-management/hashicorp-vault/configuring-and-fetching-secrets', destination: '/secrets-management/secret-managers/hashicorp-vault/configuring-and-fetching-secrets', permanent: true },

      // Dev Tools redirects (from docs/dev-tool PR)
      { source: '/send-requests/res-data-cookies/debugging/devtools', destination: '/debugging/dev-utils', permanent: true },
      { source: '/send-requests/res-data-cookies/debugging/bru-console', destination: '/debugging/dev-tools', permanent: true },

      // Debugging section moved to Core Features
      { source: '/send-requests/res-data-cookies/debugging/dev-utils', destination: '/debugging/dev-utils', permanent: true },
      { source: '/send-requests/res-data-cookies/debugging/dev-tools', destination: '/debugging/dev-tools', permanent: true },
      { source: '/send-requests/res-data-cookies/debugging/timeline', destination: '/debugging/timeline', permanent: true },
      { source: '/send-requests/res-data-cookies/debugging', destination: '/debugging/dev-utils', permanent: true },
    ];
  },
})
