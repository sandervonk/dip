import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import SmoothScrolling from "@/components/SmoothScrolling";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
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
  title: "DIP: Let's Dip",
  description:
    "Make connecting and staying engaged in team bonding events convenient and rewarding for coworkers",
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
          <NavBar />
          <main>{children}</main>
          <Footer />
        </SmoothScrolling>
      </body>
      <GoogleAnalytics gaId="G-R3W7N6X2MC" />
    </html>
  );
}
