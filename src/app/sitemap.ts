import type { MetadataRoute } from "next";
import { getCollections } from "@/lib/shopify/collections";
import { getProducts } from "@/lib/shopify/products";

const staticRoutes = [
  "/", "/shop", "/rings", "/jewellery", "/collections", "/customise-your-ring", "/about", "/faq",
  "/shipping-returns", "/ring-size-guide", "/diamond-education", "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const configuredBase = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  const base = configuredBase ?? (vercelHost ? `https://${vercelHost}` : null);
  if (!base) return [];

  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/rings" || path === "/jewellery" ? 0.8 : 0.55,
  }));

  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts({ first: 48 }),
  ]);

  const collectionEntries: MetadataRoute.Sitemap = collections.state === "ready"
    ? collections.data.map((collection) => ({
        url: new URL(`/collections/${collection.handle}`, base).toString(),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      }))
    : [];
  const productEntries: MetadataRoute.Sitemap = products.state === "ready"
    ? products.data.products.map((product) => ({
        url: new URL(`/products/${product.handle}`, base).toString(),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.65,
      }))
    : [];

  return [...staticEntries, ...collectionEntries, ...productEntries];
}
