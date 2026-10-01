import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteHeader } from "@/components/header/site-header";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "ANOKHI",
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      description: "Timeless rings and fine jewellery, designed for the moments that become yours.",
    },
    {
      "@type": "WebSite",
      name: "ANOKHI",
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      potentialAction: {
        "@type": "SearchAction",
        target: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "ANOKHI | A ring worth remembering",
    template: "%s | ANOKHI",
  },
  description:
    "Timeless rings and fine jewellery, designed for the moments that become yours.",
  openGraph: {
    title: "ANOKHI | A ring worth remembering",
    description:
      "Timeless rings and fine jewellery, designed for the moments that become yours.",
    siteName: "ANOKHI",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="min-h-screen antialiased">
        <script dangerouslySetInnerHTML={{ __html: `try { const saved = localStorage.getItem("anokhi-theme"); const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; document.documentElement.dataset.theme = saved === "light" || saved === "dark" ? saved : prefersDark ? "dark" : "light"; } catch { document.documentElement.dataset.theme = "light"; }` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema).replaceAll("<", "\\u003c") }} />
        <AnnouncementBar />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
