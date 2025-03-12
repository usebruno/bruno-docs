'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const GoogleAnalytics = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: any[]) => {
        window.dataLayer.push(args);
      };
      gtag('js', new Date());
      gtag('config', 'G-ZZBSKJSFZ8');
    }
  }, []);

  return <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZZBSKJSFZ8" />;
};

export default GoogleAnalytics;
