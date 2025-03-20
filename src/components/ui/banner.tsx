import React, { useState, useEffect } from "react";

interface BannerProps {
  children: React.ReactNode;
  storageKey?: string;
}

const Banner = ({ children, storageKey }: BannerProps) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
      if (storageKey) {
        const hidden = window.localStorage.getItem(`banner-${storageKey}`);
        setIsVisible(!hidden);
      }
    }
  }, [storageKey]);

  const hideBanner = () => {
    if (storageKey && typeof window !== "undefined") {
      window.localStorage.setItem(`banner-${storageKey}`, "true");
      setIsVisible(false);
    }
  };

  // During SSR or before hydration, render a hidden placeholder to prevent layout shift
  if (!mounted) {
    return <div style={{ display: "none" }} />;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 flex items-center justify-center w-full bg-gradient-to-r from-[#0D1117] to-[#161B22] px-3 py-3">
      <div className="flex-1 text-center text-sm text-white">{children}</div>
      {storageKey && (
        <button
          onClick={hideBanner}
          className="text-neutral-400 hover:text-neutral-200 ml-2 text-xl font-medium"
          aria-label="Close banner"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Banner;
