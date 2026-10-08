"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addToCartAction } from "@/lib/shopify/actions";

export function AddToCartButton({
  merchandiseId,
  quantity,
  available,
  attributes,
}: {
  merchandiseId: string;
  quantity: number;
  available: boolean;
  attributes?: Array<{ key: string; value: string }>;
}) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const router = useRouter();

  function addItem() {
    setMessage("");
    startTransition(async () => {
      const result = await addToCartAction({ merchandiseId, quantity, attributes });
      if (result.state === "ready") {
        setMessage("Added to your bag.");
        toast.success("Added to your bag");
        router.refresh();
      } else {
        setMessage(result.message);
        toast.error(result.message);
      }
    });
  }

  return (
    <div>
      <Button className="h-12 w-full rounded-none bg-anokhi-plum text-[10px] font-semibold tracking-[0.15em] text-ivory hover:bg-anokhi-plum/90" disabled={!available || pending} onClick={addItem} type="button">
        {pending ? "ADDING TO BAG" : available ? "ADD TO BAG" : "CURRENTLY UNAVAILABLE"}
      </Button>
      <p aria-live="polite" className="mt-2 min-h-4 text-[11px] text-coffee">{message}</p>
    </div>
  );
}
