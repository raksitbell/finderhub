import { Kanit, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai", "latin"],
  variable: "--font-kanit",
});

const notoSansThai = Noto_Sans_Thai({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai", "latin"],
  variable: "--font-noto-sans-thai",
});

export const metadata = {
  title: "FinderHub - Lost & Found System",
  description: "FinderHub Lost & Found System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${kanit.variable} ${notoSansThai.variable} font-sans antialiased bg-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
