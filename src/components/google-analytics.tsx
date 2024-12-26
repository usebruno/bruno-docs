"use client";

import Script from "next/script";
import { useEffect } from "react";

const GoogleAnalytics = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: any[]) => {
        window.dataLayer.push(args);
      };
      gtag("js", new Date());
      gtag("config", "G-CH4MNV2D3Z");
    }
  }, []);

  return (
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-CH4MNV2D3Z"
    />
  );
};

export default GoogleAnalytics;
