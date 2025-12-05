import React from "react";
import { Navbar as NextraNavbar } from 'nextra-theme-docs'
import Image from "next/image";

export const Navbar = () => {
  return (
    <NextraNavbar
      logo={
        <>
          <Image
            src="/logo.svg"
            alt="Bruno"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <span className="hidden font-bold sm:inline-block ml-2">Bruno</span>
        </>
      }
      projectLink="https://github.com/usebruno/bruno"
      chatLink="https://discord.com/invite/KgcZUncpjq"
    />
  );
};
