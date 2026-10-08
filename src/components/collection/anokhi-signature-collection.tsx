import { CollectionsShowcase } from "@/components/collection/collections-showcase";

export function AnokhiSignatureCollection({ variant = "full" }: { variant?: "card" | "full" }) {
  return <CollectionsShowcase selectedCollection="anokhi-collection" variant={variant} />;
}
