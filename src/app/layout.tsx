import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "../components/nav";
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
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
