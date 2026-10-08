import { CollectionsShowcase } from "@/components/collection/collections-showcase";

export function PersonalizingCollection({ variant = "full" }: { variant?: "card" | "full" }) {
  return <CollectionsShowcase selectedCollection="personalizing" variant={variant} />;
}
