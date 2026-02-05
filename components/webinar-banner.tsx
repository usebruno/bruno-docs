"use client";
import { useState, useEffect } from "react";

const BANNER_DISMISSED_KEY = "webinar-banner-dismissed-2026-02-18";

export const WebinarBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has dismissed the banner
    const isDismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem(BANNER_DISMISSED_KEY, "true");
    setIsVisible(false);
  };

  if (!mounted || !isVisible) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-slate-800 via-amber-900 to-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-x-3 text-base">
          <span className="hidden sm:inline-flex items-center gap-x-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="font-semibold text-amber-400">Live Webinar:</span>
          </span>
          <span className="sm:hidden font-semibold inline-flex items-center gap-x-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-amber-400">Live:</span>
          </span>
          <span className="hidden md:inline">
            Join us on Feb 18 for API Testing Best Practices with Bruno
          </span>
          <span className="md:hidden">
            Feb 18 - API Testing Best Practices
          </span>
          <a
            href="https://www.usebruno.com/webinar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 rounded-full bg-amber-500 px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:bg-amber-400 transition-colors"
          >
            Register Now
            <span className="ml-1" aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Dismiss banner"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebinarBanner;

