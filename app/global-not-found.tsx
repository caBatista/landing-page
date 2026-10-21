import type { Metadata } from "next";
import "./globals.css";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404 — Caio Batista",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <NotFoundView locale="en" />
      </body>
    </html>
  );
}
