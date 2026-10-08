"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { Price } from "@/components/product/price";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "@/components/ui/icons";
import type { Product, ProductVariant } from "@/lib/shopify/types";

function isRing(product: Product): boolean {
  const text = `${product.productType} ${product.title} ${product.tags.join(" ")}`.toLowerCase();
  return /ring|solitaire|engagement/.test(text);
}

export function ProductPurchasePanel({ product }: { product: Product }) {
  const firstVariant = product.variants[0];
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries((firstVariant?.selectedOptions ?? []).map((option) => [option.name, option.value])),
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedRingSize, setSelectedRingSize] = useState(() =>
    firstVariant?.selectedOptions.find((option) => /ring\s*size|size/i.test(option.name))?.value ?? "",
  );
  const ringSizeOption = product.options.find((option) => /ring\s*size|size/i.test(option.name));
  const sizeRequired = isRing(product) && Boolean(ringSizeOption);

  const variant: ProductVariant | undefined = useMemo(() => {
    return product.variants.find((item) => item.selectedOptions.every((option) => selected[option.name] === option.value));
  }, [product.variants, selected]);
  const optionGroups = product.options.filter((option) => !/ring\s*size|size/i.test(option.name));

  function chooseOption(name: string, value: string) {
    setSelected((previous) => ({ ...previous, [name]: value }));
    if (/ring\s*size|size/i.test(name)) setSelectedRingSize(value);
  }

  const canAdd = Boolean(variant?.availableForSale && (!sizeRequired || selectedRingSize));

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Price className="text-lg font-medium text-charcoal" money={variant?.price ?? product.priceRange.minVariantPrice} />
        {variant?.compareAtPrice && Number(variant.compareAtPrice.amount) > Number(variant.price.amount) ? (
          <Price className="text-sm text-coffee line-through" money={variant.compareAtPrice} />
        ) : null}
      </div>
      <p className="mt-2 text-xs text-coffee">Taxes and delivery information are shown during Shopify checkout.</p>
      <div className="mt-6 space-y-5">
        {optionGroups.map((option) => (
          <fieldset key={option.id}>
            <legend className="text-xs font-medium text-charcoal">{option.name}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isSelected = selected[option.name] === value;
                const available = product.variants.some((item) => item.availableForSale && item.selectedOptions.every((choice) => choice.name === option.name ? choice.value === value : selected[choice.name] === choice.value));
                return (
                  <button
                    aria-pressed={isSelected}
                    className={`min-h-10 border px-3 text-xs ${isSelected ? "border-anokhi-plum bg-anokhi-plum text-ivory" : "border-taupe/60 text-charcoal hover:border-anokhi-plum"} disabled:cursor-not-allowed disabled:opacity-40`}
                    disabled={!available}
                    key={value}
                    onClick={() => chooseOption(option.name, value)}
                    type="button"
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
        {ringSizeOption ? (
          <fieldset>
            <legend className="flex w-full items-center justify-between text-xs font-medium text-charcoal">
              <span>{ringSizeOption.name}</span>
              <Link className="text-[10px] text-coffee underline underline-offset-4" href="/ring-size-guide">View size guide</Link>
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {ringSizeOption.values.map((size) => (
                <button
                  aria-pressed={selectedRingSize === size}
                  className={`grid size-10 place-items-center border text-xs ${selectedRingSize === size ? "border-anokhi-plum bg-anokhi-plum text-ivory" : "border-taupe/60 text-charcoal hover:border-anokhi-plum"}`}
                  key={size}
                  onClick={() => { setSelectedRingSize(size); chooseOption(ringSizeOption.name, size); }}
                  type="button"
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeRequired && !selectedRingSize ? <p className="mt-2 text-[11px] text-coffee">Choose your size to continue.</p> : null}
          </fieldset>
        ) : null}
        <div>
          <Label className="text-xs font-medium text-charcoal" htmlFor="product-quantity">Quantity</Label>
          <div className="mt-2 inline-flex h-11 items-center border border-taupe/55">
            <Button aria-label="Decrease quantity" className="size-10 rounded-none" onClick={() => setQuantity((value) => Math.max(1, value - 1))} size="icon" type="button" variant="ghost"><Minus aria-hidden="true" className="size-4" weight="light" /></Button>
            <output className="w-8 text-center text-sm" id="product-quantity">{quantity}</output>
            <Button aria-label="Increase quantity" className="size-10 rounded-none" disabled={quantity >= 10} onClick={() => setQuantity((value) => Math.min(10, value + 1))} size="icon" type="button" variant="ghost"><Plus aria-hidden="true" className="size-4" weight="light" /></Button>
          </div>
        </div>
        {variant ? (
          <AddToCartButton
            attributes={selectedRingSize ? [{ key: "Ring size", value: selectedRingSize }] : []}
            available={canAdd}
            merchandiseId={variant.id}
            quantity={quantity}
          />
        ) : <p className="text-xs text-coffee" role="status">Select an available option to continue.</p>}
        <p className="text-[11px] leading-5 text-coffee">Checkout, payments and order confirmation are handled by Shopify.</p>
      </div>
    </div>
  );
}
