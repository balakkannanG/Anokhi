import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const production = process.env.NODE_ENV === "production";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account/", "/cart", "/checkout", "/search", "/privacy-policy", "/terms"],
    },
    ...(baseUrl && production ? { sitemap: new URL("/sitemap.xml", baseUrl).toString() } : {}),
  };
}
