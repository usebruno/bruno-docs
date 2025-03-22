import "@/app/globals.css";
import { useConfig } from "nextra-theme-docs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAnalytics from "@/components/google-analytics";
import type { AppProps } from 'next/app';
import { ReleaseBanner } from "@/components/ui/release-banner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ReleaseBanner />
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </>
  );
} 