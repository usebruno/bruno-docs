import { DocsThemeConfig } from 'nextra-theme-docs'
import { Navbar } from "./src/components/navbar";
import { SidebarTitle } from "./src/components/sidebar-title";

const config: DocsThemeConfig = {
  logo: <span>Bruno Docs</span>,
  project: {
    link: "https://github.com/usebruno/bruno",
  },
  chat: {
    link: "https://discord.com/invite/KgcZUncpjq",
  },
  docsRepositoryBase: "https://github.com/usebruno/bruno-docs/tree/main",
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Bruno Docs" />
      <meta property="og:description" content="The open-source API Client" />
      <link href="/bruno.png" rel="icon" type="image/png" sizes="32x32" />
      <link href="/bruno.png" rel="apple-touch-icon" type="image/png" sizes="32x32" />
    </>
  ),
  navbar: {
    component: Navbar
  },
  sidebar: {
    toggleButton: true,
    autoCollapse: true,
    defaultMenuCollapseLevel: 1
  },
  footer: {
    component: false
  },
  toc: {
    float: true,
    title: "On This Page"
  }
};

export default config; 