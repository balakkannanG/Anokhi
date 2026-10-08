import Link from "next/link";
import type { ShopifyResult } from "@/lib/shopify/types";

export function ShopifyState<T>({
  result,
  label = "Shopify",
  emptyAction,
}: {
  result: ShopifyResult<T>;
  label?: string;
  emptyAction?: { label: string; href: string };
}) {
  if (result.state === "ready") return null;
  const isEmpty = result.state === "empty";
  const title = result.state === "not-configured"
    ? "The live collection will appear here"
    : isEmpty
      ? "Nothing to show just yet"
      : "This collection is taking a moment";

  return (
    <div className="border-y border-taupe/45 bg-ivory px-5 py-10 text-center sm:px-8 sm:py-14" role={isEmpty ? "status" : "alert"}>
      <p className="eyebrow">{label}</p>
      <h3 className="display-face mt-3 text-2xl text-charcoal sm:text-3xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-coffee">{result.message}</p>
      {emptyAction ? (
        <Link className="mt-6 inline-flex min-h-11 items-center justify-center bg-anokhi-plum px-5 text-[10px] font-medium tracking-[0.14em] text-ivory" href={emptyAction.href}>
          {emptyAction.label} <span aria-hidden="true" className="ml-3">↗</span>
        </Link>
      ) : null}
    </div>
  );
}
