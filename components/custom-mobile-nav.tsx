"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Menu, PanelLeft } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { ModeToggle } from "@/components/theme-switch";

// Discord icon component
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export const CustomMobileNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleNextraSidebar = () => {
    // Find and click Nextra's hamburger button to toggle MobileNav
    const nextraHamburger = document.querySelector('.nextra-hamburger') as HTMLButtonElement;
    if (nextraHamburger) {
      nextraHamburger.click();
    }
  };

  const navigationLinks = [
    { href: "/testing/script/javascript-reference", label: "API Reference", internal: true },
    { href: "https://blog.usebruno.com/", label: "Blog", internal: false },
    { href: "https://www.usebruno.com/support", label: "Support", internal: false },
    { href: "https://www.usebruno.com/changelog", label: "Changelog", internal: false },
    { href: "https://www.usebruno.com/roadmap", label: "Roadmap", internal: false },
  ];

  if (!isMounted) return null;

  return (
    <div className="custom-mobile-nav md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
      {/* Left: Sidebar toggle */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleNextraSidebar}
        className="p-2"
      >
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      {/* Center: Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/bruno.png"
          alt="Bruno Logo"
          height={32}
          width={32}
          className="h-7 w-7"
        />
        <span className="font-bold text-lg">Bruno</span>
      </Link>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <ModeToggle />
        
        {/* Hamburger menu for nav links */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="!w-full !max-w-full">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col space-y-4 mt-8">
              <div className="flex items-center space-x-2 mb-6">
                <Image
                  src="/bruno.png"
                  alt="Bruno Logo"
                  height={32}
                  width={32}
                  className="h-8 w-8"
                />
                <span className="text-xl font-bold">Bruno</span>
              </div>
              
              <div className="flex flex-col space-y-1">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.internal ? "_self" : "_blank"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex items-center gap-4 px-3">
                  <Link
                    href="https://github.com/usebruno/bruno"
                    target="_blank"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <Github className="h-5 w-5" />
                    <span>GitHub</span>
                  </Link>
                  <Link
                    href="https://discord.com/invite/KgcZUncpjq"
                    target="_blank"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <DiscordIcon className="h-5 w-5" />
                    <span>Discord</span>
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

