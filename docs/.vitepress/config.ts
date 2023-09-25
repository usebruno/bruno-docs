import { defineConfig } from 'vitepress';

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'Bruno',
  head: [
    ['link', { rel: 'icon', href: `/bruno.svg` }]
  ],
  themeConfig: {
    logo: '/bruno.svg',
    sidebar: sidebar(),
    nav: [
      { text: 'Website', link: 'https://www.usebruno.com' },
      { text: 'Download', link: 'https://www.usebruno.com/downloads' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/usebruno/bruno' }
    ],
    editLink: {
      pattern: 'https://github.com/usebruno/bruno-docs/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },
  }
});

function sidebar() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [
        { text: 'Index', link: '/table-of-contents' },
        { text: 'Manifesto', link: '/manifesto' },
        { text: 'Support', link: '/support' }
      ]
    },
    {
      text: 'Bru Lang',
      collapsible: true,
      items: [
        { text: 'Overview', link: '/bru-lang-overview' },
        { text: 'Samples', link: '/bru-language-samples' },
        { text: 'Language', link: '/bru-language-design' },
        { text: 'Tag Reference', link: '/bru-language-tag-reference' },
        { text: 'Syntax Highlighting', link: '/bru-lang-extensions.md' }
      ]
    },
    {
      text: 'Bru CLI',
      collapsible: true,
      items: [
        { text: 'Overview', link: '/cli/overview' },
      ]
    },
    {
      text: 'Secrets Management',
      collapsible: true,
      items: [
        { text: 'Overview', link: '/secrets-management/overview' },
        { text: 'DotEnv File', link: '/secrets-management/dotenv-file' },
        { text: 'Secret Variables', link: '/secrets-management/secret-variables' }
      ]
    },
    {
      text: 'Scripting',
      collapsible: true,
      items: [
        { text: 'Getting Started', link: '/scripting/introduction' },
        { text: 'Vars', link: '/scripting/vars' },
        { text: 'Response Query', link: '/scripting/response-query' },
        { text: 'Inbuilt Libraries', link: '/scripting/inbuilt-libraries' },
        { text: 'External Libraries', link: '/scripting/external-libraries' },
        { text: 'Sync Requests', link: '/scripting/sync-requests' },
        { text: 'JavaScript Reference', link: '/scripting/javascript-reference' },
      ]
    },
    {
      text: 'Testing',
      collapsible: true,
      items: [
        { text: 'Getting Started', link: '/testing/introduction' },
        { text: 'Assertions', link: '/testing/assertions' },
        { text: 'JavaScript Reference', link: '/testing/javascript-reference' },
      ]
    }
  ];
}
