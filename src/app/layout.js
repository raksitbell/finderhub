import { Kanit, Geist } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata = {
  title: "FinderHub - Lost & Found System",
  description: "FinderHub Lost & Found System",
};

import { Analytics } from "@vercel/analytics/react";
import PrelineScript from "@/components/common/PrelineScript";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${kanit.variable} ${geist.variable} font-sans antialiased bg-slate-50`}
      >
        {children}
        <PrelineScript />
        <Toaster position="top-right" richColors closeButton />
        <Analytics />
      </body>
    </html>
  );
}
