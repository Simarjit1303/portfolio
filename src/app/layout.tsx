import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "optional",
});

export const metadata: Metadata = {
  title: "Simarjit Singh | Data Scientist & AI Engineer — Berlin",
  description: "Portfolio of Simarjit Singh — MSc Data Science & AI, Berlin. Building end-to-end ML pipelines, GenAI apps, and data products. Open to internship & working student roles.",
  openGraph: {
    title: "Simarjit Singh | Data Scientist & AI Engineer",
    description: "ML pipelines, GenAI applications, and data products. Open to internship and working student roles in Berlin.",
    siteName: "Simarjit Singh Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://simarjit.de/og-image.png",
        width: 1200,
        height: 630,
        alt: "Simarjit Singh — Data Scientist & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simarjit Singh | Data Scientist & AI Engineer",
    description: "ML pipelines, GenAI apps, data products. Open to Berlin roles.",
    images: ["https://simarjit.de/og-image.png"],
  },
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
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
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
