"use client";

import { ModeToggle } from "@/components/theme-switch";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Menu, PanelLeft, X } from "lucide-react";
import { CommandMenuTrigger } from "@/components/command-menu/command-menu";
import Image from "next/image";
import { Typography } from "@/components/ui/typography";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Handle window resize to clean up mobile sidebar when switching to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        // Clean up mobile sidebar elements when switching to desktop
        const sidebar = document.querySelector('.nx-sidebar, [data-sidebar], nav[role="navigation"], .nextra-sidebar, aside') as HTMLElement;
        if (sidebar) {
          // Reset sidebar styles to default
          sidebar.style.position = '';
          sidebar.style.top = '';
          sidebar.style.left = '';
          sidebar.style.height = '';
          sidebar.style.width = '';
          sidebar.style.zIndex = '';
          sidebar.style.background = '';
          sidebar.style.borderRight = '';
          sidebar.style.boxShadow = '';
          sidebar.style.overflowY = '';
          sidebar.style.transition = '';
          sidebar.style.transform = '';
          sidebar.classList.remove('open');
          sidebar.setAttribute('data-open', 'false');
        }
        
        // Remove mobile-specific elements
        const closeBtn = document.querySelector('.nx-sidebar-close');
        if (closeBtn) closeBtn.remove();
        const overlay = document.querySelector('.nx-sidebar-overlay');
        if (overlay) overlay.remove();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Image src="/bruno.svg" alt="Bruno" width={24} height={24} />
              <span className="hidden font-bold sm:inline-block">Bruno</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              {/* <CommandMenuTrigger /> */}
            </div>
            <nav className="flex items-center space-x-2">
              <ModeToggle />
            </nav>
          </div>
        </div>
      </nav>
    );
  }

  const toggleSidebar = () => {
    if (!isMounted) return;
    
    // First, let's try to find the sidebar with more specific selectors
    const sidebarSelectors = [
      '.nx-sidebar',
      '[data-sidebar]',
      '.sidebar',
      'nav[role="navigation"]',
      '.nextra-sidebar',
      'aside',
      '[data-testid="sidebar"]'
    ];
    
    let sidebar: HTMLElement | null = null;
    
    for (const selector of sidebarSelectors) {
      sidebar = document.querySelector(selector) as HTMLElement;
      if (sidebar) {
        break;
      }
    }
    
    if (sidebar) {
      // Force the sidebar to be visible and positioned correctly for mobile
      sidebar.style.position = 'fixed';
      sidebar.style.top = '0';
      sidebar.style.left = '0';
      sidebar.style.height = '100vh';
      sidebar.style.width = '280px';
      sidebar.style.zIndex = '50';
      sidebar.style.background = 'hsl(var(--background))';
      sidebar.style.borderRight = '1px solid hsl(var(--border))';
      sidebar.style.boxShadow = '2px 0 8px rgba(0, 0, 0, 0.1)';
      sidebar.style.overflowY = 'auto';
      sidebar.style.transition = 'transform 0.3s ease-in-out';
      sidebar.style.color = 'hsl(var(--foreground))';
      
      const isOpen = sidebar.classList.contains('open') || sidebar.getAttribute('data-open') === 'true';
      
      if (isOpen) {
        // Close sidebar
        sidebar.classList.remove('open');
        sidebar.setAttribute('data-open', 'false');
        sidebar.style.transform = 'translateX(-100%)';
        
        // Remove close button and overlay
        const closeBtn = document.querySelector('.nx-sidebar-close');
        if (closeBtn) closeBtn.remove();
        const overlay = document.querySelector('.nx-sidebar-overlay');
        if (overlay) overlay.remove();
      } else {
        // Open sidebar
        sidebar.classList.add('open');
        sidebar.setAttribute('data-open', 'true');
        sidebar.style.transform = 'translateX(0)';
        
        // Create close button
        let closeButton = document.querySelector('.nx-sidebar-close') as HTMLElement;
        if (!closeButton) {
          closeButton = document.createElement('button');
          closeButton.className = 'nx-sidebar-close';
          closeButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          `;
          closeButton.style.position = 'absolute';
          closeButton.style.top = '16px';
          closeButton.style.right = '16px';
          closeButton.style.background = 'transparent';
          closeButton.style.border = 'none';
          closeButton.style.cursor = 'pointer';
          closeButton.style.padding = '8px';
          closeButton.style.borderRadius = '4px';
          closeButton.style.color = 'hsl(var(--foreground))';
          closeButton.style.zIndex = '51';
          closeButton.style.display = 'flex';
          closeButton.style.alignItems = 'center';
          closeButton.style.justifyContent = 'center';
          closeButton.onclick = () => {
            sidebar!.classList.remove('open');
            sidebar!.setAttribute('data-open', 'false');
            sidebar!.style.transform = 'translateX(-100%)';
            closeButton.remove();
            const overlay = document.querySelector('.nx-sidebar-overlay');
            if (overlay) overlay.remove();
          };
          sidebar.appendChild(closeButton);
        }

        // Create overlay
        let overlay = document.querySelector('.nx-sidebar-overlay') as HTMLElement;
        if (!overlay) {
          overlay = document.createElement('div');
          overlay.className = 'nx-sidebar-overlay';
          overlay.style.position = 'fixed';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.right = '0';
          overlay.style.bottom = '0';
          overlay.style.background = 'rgba(0, 0, 0, 0.5)';
          overlay.style.zIndex = '49';
          overlay.onclick = () => {
            sidebar!.classList.remove('open');
            sidebar!.setAttribute('data-open', 'false');
            sidebar!.style.transform = 'translateX(-100%)';
            const closeBtn = document.querySelector('.nx-sidebar-close');
            if (closeBtn) closeBtn.remove();
            overlay.remove();
          };
          document.body.appendChild(overlay);
        }
      }
    } else {
      // Try to find and click the original Nextra sidebar toggle
      const toggleSelectors = [
        '[data-toggle-sidebar]',
        'button[aria-label*="sidebar"]',
        'button[aria-label*="menu"]',
        '.nx-sidebar-toggle button',
        'button[title*="sidebar"]'
      ];
      
      for (const selector of toggleSelectors) {
        const toggleButton = document.querySelector(selector) as HTMLButtonElement;
        if (toggleButton) {
          toggleButton.click();
          
          // Wait a bit and then try to find the sidebar again
          setTimeout(() => {
            const newSidebar = document.querySelector('.nx-sidebar, [data-sidebar], nav[role="navigation"]') as HTMLElement;
            if (newSidebar) {
              // Apply mobile styles
              newSidebar.style.position = 'fixed';
              newSidebar.style.top = '0';
              newSidebar.style.left = '0';
              newSidebar.style.height = '100vh';
              newSidebar.style.width = '280px';
              newSidebar.style.zIndex = '50';
              newSidebar.style.background = 'hsl(var(--background))';
              newSidebar.style.borderRight = '1px solid hsl(var(--border))';
              newSidebar.style.boxShadow = '2px 0 8px rgba(0, 0, 0, 0.1)';
              newSidebar.style.overflowY = 'auto';
              newSidebar.style.transition = 'transform 0.3s ease-in-out';
              newSidebar.style.transform = 'translateX(0)';
              newSidebar.style.color = 'hsl(var(--foreground))';
              
              // Add close button to the sidebar
              const closeButton = document.createElement('button');
              closeButton.className = 'nx-sidebar-close';
              closeButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              `;
              closeButton.style.position = 'absolute';
              closeButton.style.top = '16px';
              closeButton.style.right = '16px';
              closeButton.style.background = 'transparent';
              closeButton.style.border = 'none';
              closeButton.style.cursor = 'pointer';
              closeButton.style.padding = '8px';
              closeButton.style.borderRadius = '4px';
              closeButton.style.color = 'hsl(var(--foreground))';
              closeButton.style.zIndex = '51';
              closeButton.style.display = 'flex';
              closeButton.style.alignItems = 'center';
              closeButton.style.justifyContent = 'center';
              closeButton.onclick = () => {
                newSidebar.classList.remove('open');
                newSidebar.setAttribute('data-open', 'false');
                newSidebar.style.transform = 'translateX(-100%)';
                closeButton.remove();
                const overlay = document.querySelector('.nx-sidebar-overlay');
                if (overlay) overlay.remove();
              };
              newSidebar.appendChild(closeButton);
            }
          }, 100);
          return;
        }
      }
    }
  };

  const navigationLinks = [
    { href: "/testing/script/javascript-reference", label: "API Reference", internal: true },
    { href: "https://blog.usebruno.com/", label: "Blog", internal: false },
    { href: "https://www.usebruno.com/support", label: "Support", internal: false },
    { href: "https://www.usebruno.com/changelog", label: "Changelog", internal: false },
    { href: "https://www.usebruno.com/roadmap", label: "Roadmap", internal: false },
  ];

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      padding: '8px 16px',
      justifyContent: 'center',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)'
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: '1400px',
        width: '100%',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src="/bruno.png"
                alt="Bruno Logo"
                height={40}
                width={40}
                style={{ height: '32px', width: '32px', marginRight: '8px' }}
              />
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
                Bruno
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.internal ? "_self" : "_blank"}
              style={{
                textDecoration: 'none',
                color: '#6366f1',
                fontSize: '14px',
                fontWeight: '500',
                padding: '8px 12px',
                borderRadius: '6px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = '#f3f4f6'}
              onMouseOut={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Search placeholder */}
          <div style={{
            padding: '6px 12px',
            backgroundColor: '#f9fafb',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#6b7280'
          }}>
            Search
          </div>

          {/* GitHub Link */}
          <Link
            href="https://github.com/usebruno/bruno"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
              borderRadius: '6px',
              textDecoration: 'none',
              color: '#374151'
            }}
            onMouseOver={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
          >
            <Github style={{ height: '20px', width: '20px' }} />
          </Link>

          {/* Theme toggle placeholder */}
          <div style={{
            padding: '8px',
            backgroundColor: '#f9fafb',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#6b7280'
          }}>
            🌙
          </div>
        </div>
      </nav>
    </div>
  );
};
