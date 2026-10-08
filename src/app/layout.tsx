import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteStructuredData } from "@/components/seo/site-structured-data";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const displayFont = localFont({
  src: "../../public/font/primary legitima-.otf",
  variable: "--font-anokhi-display",
  display: "swap",
});

const bodyFont = localFont({
  src: "../../public/font/secondary Liria.otf",
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Anokhi | Fine Jewellery & Signature Collections",
    template: "%s | Anokhi",
  },
  description:
    "Discover fine jewellery, signature collections, and considered designs for every moment.",
  applicationName: "Anokhi",
  openGraph: {
    type: "website",
    siteName: "Anokhi",
    title: "Anokhi | Fine Jewellery & Signature Collections",
    description:
      "Discover fine jewellery, signature collections, and considered designs for every moment.",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Anokhi | Fine Jewellery & Signature Collections",
    description:
      "Discover fine jewellery, signature collections, and considered designs for every moment.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5ede6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased">
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ivory focus:px-4 focus:py-3 focus:text-anokhi-plum"
          href="#main-content"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        {children}
        <SiteFooter />
        <SiteStructuredData />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
