import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google"; // You have all three ready
import "./globals.css";

// 1. Initialize the fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My SaaS Product",
  description: "Built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 2. Apply the font class here */}
      <body className={`${inter.className} ${geistSans.variable} antialiased  `}>
        {children}
      </body>
    </html>
  );
}