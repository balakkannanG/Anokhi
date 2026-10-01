import type { MetadataRoute } from "next";
import { PAGE_CONTENT } from "@/lib/constants/page-content";
import { getCollections } from "@/lib/shopify/collections";
import { getProducts } from "@/lib/shopify/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = Object.keys(PAGE_CONTENT).filter((path) => path !== "home");
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...pages.map((path) => ({
      url: `${siteUrl}/${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: ["rings", "jewellery", "shop", "collections"].includes(path) ? 0.9 : 0.6,
    })),
  ];

  const [products, collections] = await Promise.all([getProducts({ first: 250 }), getCollections(250)]);
  return [
    ...staticPages,
    ...collections.map((collection) => ({
      url: `${siteUrl}/collections/${collection.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/products/${product.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}