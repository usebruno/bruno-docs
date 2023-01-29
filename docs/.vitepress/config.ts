import { defineConfig } from 'vitepress';

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  themeConfig: {
    siteTitle: 'Bruno',
    logo: '/bruno.svg',
    sidebar: sidebar(),
    nav: [
      { text: 'Website', link: 'https://www.usebruno.com' },
      { text: 'Download', link: 'https://www.usebruno.com/downloads' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/usebruno/bruno' }
    ],
  }
});

function sidebar() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [
        { text: 'Mainfesto', link: '/manifesto' },
        { text: 'Support', link: '/support' }
      ]
    },
    {
      text: 'Bru Lang',
      collapsible: true,
      items: [
        { text: 'Overview', link: '/bru-lang-overview' },
        { text: 'Language', link: '/bru-language-design' },
        { text: 'Tag Reference', link: '/bru-language-tag-reference' },
        { text: 'Syntax Highlighting', link: '/bru-lang-extensions.md' }
      ]
    },
    {
      text: 'Scripting',
      collapsible: true,
      items: [
        { text: 'Getting Started', link: '/scripting/introduction' },
        { text: 'Inbuilt Libraries', link: '/scripting/inbuilt-libraries' },
        { text: 'Javascript Reference', link: '/scripting/javascript-reference' },
      ]
    }
  ];
}