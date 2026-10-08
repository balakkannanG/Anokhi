import { CollectionsShowcase } from "@/components/collection/collections-showcase";

export function TimelessCollection({ variant = "full" }: { variant?: "card" | "full" }) {
  return <CollectionsShowcase selectedCollection="timeless" variant={variant} />;
}
