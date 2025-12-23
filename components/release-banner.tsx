"use client";

import { useState, useEffect, useMemo } from "react";

export const ReleaseBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Generate random values once on mount to avoid hydration mismatch
  const snowflakes = useMemo(() => {
    return [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 12}s`,
      opacity: Math.random() * 0.4 + 0.3,
      isGold: Math.random() < 0.15,
      size: Math.random() * 0.5 + 0.6,
    }));
  }, []);

  const fallingSantas = useMemo(() => {
    return [...Array(3)].map(() => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 12}s`,
    }));
  }, []);

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
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-green-600 to-green-800 text-gray-200 py-3 relative overflow-hidden">
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-100px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 100px)) translateX(30px) rotate(360deg);
            opacity: 0;
          }
        }
        .snowflake {
          position: absolute;
          top: 0;
          opacity: 0;
          animation: snowfall 12s linear infinite;
          animation-fill-mode: backwards;
          filter: saturate(0) brightness(1.3);
        }
        .falling-santa {
          position: absolute;
          top: 0;
          opacity: 0;
          animation: snowfall 12s linear infinite;
          animation-fill-mode: backwards;
        }
      `}</style>

      {/* Snowflakes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {snowflakes.map((flake, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: flake.left,
              animationDelay: flake.animationDelay,
              opacity: flake.opacity,
              color: flake.isGold ? "#FFD700" : "white",
              fontSize: `${flake.size}rem`,
            }}
          >
            ❄️
          </div>
        ))}

        {/* Falling Bruno Santa */}
        {fallingSantas.map((santa, i) => (
          <div
            key={`santa-${i}`}
            className="falling-santa flex items-center justify-center"
            style={{
              left: santa.left,
              animationDelay: santa.animationDelay,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brunosantadocs.png"
              alt="Bruno Santa"
              width={40}
              height={40}
            />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brunosantadocs.png"
            alt="Bruno V3 Preview"
            width={32}
            height={32}
            className="hidden sm:block"
          />
          <p className="text-base text-center">
            Bruno <span className="font-bold">V3 Early Preview</span> is live! Be among the first to try Workspaces, YAML Support, Inbuilt Terminal, and more.{" "}
            <a
              href="https://www.usebruno.com/v3-preview"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 font-bold"
              style={{ color: "#E89B2F" }}
            >
              Learn more ↗
            </a>
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brunosantadocs.png"
            alt="Bruno V3 Preview"
            width={32}
            height={32}
            className="hidden sm:block"
          />
          <button
            onClick={hideBanner}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors text-xl leading-none"
            aria-label="Close banner"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

