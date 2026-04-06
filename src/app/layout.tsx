import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simarjit Singh | MSc Data Science & AI Portfolio",
  description: "Portfolio of Simarjit Singh, MSc Data Science & AI Student in Berlin.",
  other: {
    "darkreader-lock": "",
    "color-scheme": "dark",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
    >
      <head>
        {/* Pre-fetch the 3D robot model as early as possible to cut LCP */}
        <link rel="preload" href="/robot.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
