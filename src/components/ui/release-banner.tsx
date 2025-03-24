import { useState, useEffect } from "react";

export const ReleaseBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hidden = localStorage.getItem("banner-v1.40.0");
    if (hidden) setIsVisible(false);
  }, []);

  const hideBanner = () => {
    localStorage.setItem("banner-v1.40.0", "true");
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#1a365d] to-[#2c5282] px-3 py-3">
      <div className="text-center relative max-w-6xl mx-auto">
        <a
          href="https://www.usebruno.com/downloads"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-400 transition-colors inline-flex items-center justify-center gap-2 text-sm"
        >
          🎉 Bruno v2.0.0 is released with an updated OAuth 2 Workflow! Download
          now →
        </a>
        <button
          onClick={hideBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
          aria-label="Close banner"
        >
          ×
        </button>
      </div>
    </div>
  );
};
