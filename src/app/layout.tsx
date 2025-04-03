import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Cursor } from "motion-plus/react";
import SmoothScrolling from "@/components/SmoothScrolling";
import Nav from "@/components/NavBar";
import { GoogleAnalytics } from "@next/third-parties/google";
export const dynamic = "error";

// use inter with a bit of tsume/negative tracking to get close to SF Display Pro
const inter = Inter({
  weight: "variable",
  style: "normal",
  subsets: ["latin"],
  variable: "--font",
});

export const metadata: Metadata = {
  title: "World x Change",
  description: "[WORLD X CHANGE DESCRIPTION TEXT]",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <SmoothScrolling>
          <Cursor style={{ backgroundColor: "var(--cursor)" }} />
          <Nav />
          <main>{children}</main>
        </SmoothScrolling>
      </body>
      <GoogleAnalytics gaId="G-R3W7N6X2MC" />
    </html>
  );
}
