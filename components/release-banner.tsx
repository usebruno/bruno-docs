"use client";

import { useState, useEffect } from "react";

export const ReleaseBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hidden = localStorage.getItem("banner-v3-release");
    if (hidden) setIsVisible(false);
  }, []);

  const hideBanner = () => {
    localStorage.setItem("banner-v3-release", "true");
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div className="sticky top-0 z-50 w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 text-black">
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-center items-center">
          <p className="text-sm text-center">
            Bruno <span className="font-bold">v3 is released!</span> Try Workspaces, YAML support, Inbuilt Terminal, Refreshed UI, and more!{" "}
            <a
              href="https://www.usebruno.com/downloads"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 ml-2 px-3 py-1 bg-black text-white rounded-md font-medium hover:bg-black/80 transition-colors"
            >
              Download ↗
            </a>
          </p>
          <button
            onClick={hideBanner}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-black/70 hover:text-black transition-colors text-xl leading-none"
            aria-label="Close banner"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

