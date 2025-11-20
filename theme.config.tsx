import { Navbar } from "./src/components/navbar";
import { Head } from "./src/components/head";

const config = {
  logo: <span>Bruno Docs</span>,
  project: {
    link: "https://github.com/usebruno/bruno",
  },
  chat: {
    link: "https://discord.com/invite/KgcZUncpjq",
  },
  docsRepositoryBase: "https://github.com/usebruno/bruno-docs/tree/main",
  head: Head,
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
  search: {
    placeholder: 'Search documentation...',
    component: null
  }
};

export default config; 