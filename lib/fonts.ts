import { Big_Shoulders, Geist, Geist_Mono } from "next/font/google";

const display = Big_Shoulders({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "Impact", "sans-serif"],
  variable: "--font-big-shoulders",
  display: "swap",
});

const sans = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

/** Class names that expose the brand fonts as CSS variables. Apply to <html>. */
export const fontVariables = [display.variable, sans.variable, mono.variable].join(" ");
