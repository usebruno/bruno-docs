import { ModeToggle } from "@/components/theme-switch";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github } from "lucide-react";
import { CommandMenuTrigger } from "@/components/command-menu/command-menu";
import Image from "next/image";
import { Typography } from "@/components/ui/typography";

export const Navbar = () => {
  return (
    <div className="flex w-full py-4 justify-center border-b px-8">
      <nav className="flex items-center max-w-[1400px] w-full justify-between">
        <div className="flex items-center grow">
          <Button className="flex items-center" asChild variant="link">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/bruno.png"
                  alt="Bruno Logo"
                  height={40}
                  width={40}
                />
                <Typography variant="h3" className="ml-1">
                  Bruno
                </Typography>
              </div>
            </Link>
          </Button>
        </div>
        <div className="flex items-center">
          <CommandMenuTrigger className="mr-3" />
          <Button variant="ghost" className="px-2" asChild>
            <Link href="https://github.com/usebruno/bruno" target="_blank">
              <Github size={24} />
            </Link>
          </Button>
          <ModeToggle className="ml-1" />
        </div>
      </nav>
    </div>
  );
};
