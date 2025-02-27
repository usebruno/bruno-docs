// imports have to start with "./src" instead of "src"
import { Navbar } from "@/components/navbar";
import { SidebarTitle } from "@/components/sidebar-title";

const themeConfig = {
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Bruno Docs",
      additionalLinkTags: [
        {
          href: "/bruno.png",
          rel: "icon",
          sizes: "32x32",
          type: "image/png",
        },
        {
          href: "/bruno.png",
          rel: "apple-touch-icon",
          sizes: "32x32",
          type: "image/png",
        },
      ],
    };
  },
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
      
      <title>Bruno Docs</title>
      <meta name="description" content="The open-source API Client" />
  
      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://docs.usebruno.com/introduction/what-is-bruno" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Bruno Docs" />
      <meta property="og:description" content="The open-source API Client" />
      <meta property="og:image" content="https://opengraph.b-cdn.net/production/images/2ee7fcf8-3a30-4587-a730-fe8368d6ef55.png?token=SkHa5Ab6z7ozIhS_HM0JbPUFa2wrmvdqSrXl3qp2OSM&height=630&width=1200&expires=33276653321" />
  
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="docs.usebruno.com" />
      <meta property="twitter:url" content="https://docs.usebruno.com/introduction/what-is-bruno" />
      <meta name="twitter:title" content="Bruno Docs" />
      <meta name="twitter:description" content="The open-source API Client" />
      <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/images/2ee7fcf8-3a30-4587-a730-fe8368d6ef55.png?token=SkHa5Ab6z7ozIhS_HM0JbPUFa2wrmvdqSrXl3qp2OSM&height=630&width=1200&expires=33276653321" />

    </>
  ),
  navbar: {
    component: <Navbar />,
  },
  sidebar: {
    toggleButton: true,
    autoCollapse: true,
    defaultMenuCollapseLevel: 1,
  },
  footer: false,
};

export default themeConfig;
