import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Translate from "@/lib/Translate";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "My Next App",
  description: "Powered by Inter font",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div id="google_translate_element"></div>
        <Translate />
        {children}
      </body>
    </html>
  );
}
