import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai", "latin"],
  variable: "--font-noto-sans-thai",
});

export const metadata = {
  title: "FinderHub - Lost & Found System",
  description: "FinderHub Lost & Found System",
};

import { Analytics } from "@vercel/analytics/react";
import PrelineScript from "@/components/common/PrelineScript";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${notoSansThai.variable} font-sans antialiased bg-slate-50`}
      >
        {children}
        <PrelineScript />
        <Analytics />
      </body>
    </html>
  );
}
