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
  }
})
