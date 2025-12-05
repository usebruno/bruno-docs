"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-ZZBSKJSFZ8";

const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const win = window as any;
    if (typeof window !== "undefined" && win.gtag) {
      win.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
        send_page_view: true
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname + window.location.search,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
