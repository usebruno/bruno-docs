import { defineConfig } from 'vitepress';

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  themeConfig: {
    siteTitle: 'Bruno',
    logo: '/bruno.svg',
    sidebar: sidebar(),
    nav: [
      { text: 'Website', link: 'https://www.usebruno.com' },
      { text: 'Downloads', link: '/downloads' }
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
        { text: 'What is Bruno?', link: '/introduction/what-is-bruno' },
        { text: 'Our Mainfesto', link: '/introduction/manifesto' },
        { text: 'Support', link: '/downloads' },
        { text: 'Downloads', link: '/downloads' }
      ]
    },
    {
      text: 'Bru Language',
      collapsible: true,
      items: [
        { text: 'Bru', link: '/guide/markdown' },
        { text: 'Extensions', link: '/guide/asset-handling' }
      ]
    },
    {
      text: 'Scripting',
      collapsible: true,
      items: [
        { text: 'Getting Started', link: '/guide/theme-introduction' },
        { text: 'Javascript reference', link: '/guide/theme-introduction' },
      ]
    }
  ];
}