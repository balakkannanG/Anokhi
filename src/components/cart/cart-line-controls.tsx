"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "@/components/ui/icons";
import { removeCartLineAction, updateCartLineAction } from "@/lib/shopify/actions";

export function CartLineControls({ lineId, quantity }: { lineId: string; quantity: number }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  function update(nextQuantity: number) {
    startTransition(async () => {
      const result = nextQuantity === 0
        ? await removeCartLineAction(lineId)
        : await updateCartLineAction({ lineId, quantity: nextQuantity });
      if (result.state !== "ready" && result.state !== "empty") toast.error(result.message);
      else router.refresh();
    });
  }
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <div aria-label="Quantity" className="inline-flex h-9 items-center border border-taupe/50" role="group">
        <Button aria-label="Decrease quantity" className="size-8 rounded-none" disabled={pending} onClick={() => update(quantity - 1)} size="icon" type="button" variant="ghost"><Minus aria-hidden="true" className="size-3.5" weight="light" /></Button>
        <span className="w-7 text-center text-xs">{quantity}</span>
        <Button aria-label="Increase quantity" className="size-8 rounded-none" disabled={pending || quantity >= 10} onClick={() => update(quantity + 1)} size="icon" type="button" variant="ghost"><Plus aria-hidden="true" className="size-3.5" weight="light" /></Button>
      </div>
      <button className="text-[10px] text-coffee underline underline-offset-4 hover:text-anokhi-plum" disabled={pending} onClick={() => update(0)} type="button">Remove</button>
      <span aria-live="polite" className="sr-only">{pending ? "Updating bag" : ""}</span>
    </div>
  );
}
