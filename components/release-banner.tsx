"use client";

import { useState, useEffect } from "react";

export const ReleaseBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hidden = localStorage.getItem("banner-v3-preview");
    if (hidden) setIsVisible(false);
  }, []);

  const hideBanner = () => {
    localStorage.setItem("banner-v3-preview", "true");
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div 
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#ff8c00] to-[#ff6f00] px-3 py-3 animate-slide-down"
      style={{
        animation: "slideDown 0.5s ease-out"
      }}
    >
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <div className="text-center relative max-w-6xl mx-auto">
        <a
          href="https://www.usebruno.com/v3-preview"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white/90 transition-colors inline-flex items-center justify-center gap-2 text-sm font-medium"
        >
          <span>
            🎉 Bruno V3 Early Preview is live! Be among the first to try Workspaces, YAML Support, Inbuilt Terminal, and more.{" "}
            <span className="underline underline-offset-2 decoration-1 hover:decoration-2 transition-all">
              Learn more →
            </span>
          </span>
        </a>
        <button
          onClick={hideBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors text-xl leading-none"
          aria-label="Close banner"
        >
          ×
        </button>
      </div>
    </div>
  );
};

