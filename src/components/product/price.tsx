import type { Money } from "@/lib/shopify/types";

export function Price({ money, className = "" }: { money: Money; className?: string }) {
  const numericAmount = Number(money.amount);
  if (!Number.isFinite(numericAmount)) return null;
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: 0,
  }).format(numericAmount);

  return <span className={className}>{formatted}</span>;
}
