import { ModeToggle } from '@/components/theme-switch';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { CommandMenuTrigger } from '@/components/command-menu/command-menu';
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';

export const Navbar = () => {
  return (
    <div className="flex w-full py-2 sm:py-4 justify-center border-b pl-0 pr-2 sm:px-8 top-0 z-30 sticky bg-transparent backdrop-blur">
      <nav className="flex items-center max-w-[1400px] w-full justify-between">
        <div className="flex items-center grow">
          <Button className="flex items-center group !no-underline" asChild variant="link">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/bruno.png"
                  alt="Bruno Logo"
                  height={40}
                  width={40}
                  className="h-8 w-8 sm:h-10 sm:w-10 group-hover:animate-infinite group-hover:animate-wiggle"
                />
                <Typography variant="h3" className="ml-1">
                  Bruno
                </Typography>
              </div>
            </Link>
          </Button>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-1">
          <Link href="https://blog.usebruno.com/" target="_blank">
            <Button variant="link" className="text-sm sm:text-base md:block hidden">
              Blog
            </Button>
          </Link>
          <Link href="https://www.usebruno.com/support" target="_blank">
            <Button variant="link" className="text-sm sm:text-base md:block hidden">
              Support
            </Button>
          </Link>
          <Link href="https://www.usebruno.com/changelog" target="_blank">
            <Button variant="link" className="text-sm sm:text-base md:block hidden">
              Changelog
            </Button>
          </Link>

          <Link href="https://www.usebruno.com/roadmap" target="_blank">
            <Button variant="link" className="text-sm sm:text-base md:block hidden">
              Roadmap
            </Button>
          </Link>
        </div>

        <div className="flex items-center">
          <CommandMenuTrigger className="mr-1 sm:mr-3" />
          <Button variant="ghost" className="px-1 sm:px-2" asChild>
            <Link href="https://github.com/usebruno/bruno" target="_blank">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <ModeToggle className="ml-1" />
        </div>
      </nav>
    </div>
  );
};
