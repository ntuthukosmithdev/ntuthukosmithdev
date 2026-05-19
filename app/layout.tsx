import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MagneticCursor from "@/components/MagneticCursor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import StructuredData from "./StructuredData";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const baseUrl = "https://ntuthukosmith.com";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ntuthuko Smith — Software Engineer | South Africa",
    template: "%s | Ntuthuko Smith"
  },
  description:
    "Ntuthuko Smith is a software engineer from South Africa building technically sound and meaningfully crafted digital products. Full-stack development with React, Node.js, Django.",
  keywords: [
    "Ntuthuko Smith",
    "Ntuthuko Hugh Smith",
    "Software Engineer",
    "Full-Stack Developer",
    "React Developer",
    "Django Developer",
    "South Africa Developer",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python"
  ],
  authors: [{ name: "Ntuthuko Smith" }],
  creator: "Ntuthuko Smith",
  publisher: "Ntuthuko Smith",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: baseUrl,
    siteName: "Ntuthuko Smith",
    title: "Ntuthuko Smith — Software Engineer",
    description:
      "Software engineer from South Africa building technically sound and meaningfully crafted digital products.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ntuthuko Smith — Software Engineer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ntuthuko Smith — Software Engineer",
    description:
      "Software engineer from South Africa building technically sound and meaningfully crafted digital products.",
    images: ["/og-image.png"]
  },
  alternates: {
    canonical: baseUrl
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="bg-ink text-paper font-sans antialiased grain selection:bg-accent selection:text-ink">
        <StructuredData />
        <SmoothScroll>
          <MagneticCursor />
          {children}
        </SmoothScroll>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
