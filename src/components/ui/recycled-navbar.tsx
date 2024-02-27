import { Navbar } from "nextra-theme-docs";
import React from "react";

export const RecycledNavbar = ({}) => {
  return (
    <Navbar
      items={[]}
      flatDirectories={[
        {
          title: "Index",
          kind: "MdxPage",
          name: "index",
          route: "/introduction",
          type: "doc",
        },
        {
          title: "Manifesto",
          kind: "MdxPage",
          name: "manifesto",
          route: "/introduction/manifesto",
          type: "doc",
        },
        {
          title: "Test",
          kind: "MdxPage",
          name: "test",
          route: "/subFolder/test",
          type: "doc",
        },
        {
          title: "Tost",
          kind: "MdxPage",
          name: "tost",
          route: "/subFolder/tost",
          type: "doc",
        },
      ]}
    />
  );
};
