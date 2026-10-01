import type { Metadata } from "next";
import { StorefrontRoute, routeMetadata } from "@/components/storefront/storefront-route";

type RouteProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  return routeMetadata(slug);
}

export default async function DynamicPage({ params, searchParams }: RouteProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  return <StorefrontRoute segments={slug} searchParams={query} />;
}