"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SlidersHorizontal, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const categoryOptions: Record<string, string[]> = {
  rings: ["Engagement", "Solitaire", "Diamond", "Wedding", "Couple", "Eternity", "Bridal", "Statement", "Custom"],
  jewellery: ["Earrings", "Necklaces", "Pendants", "Bracelets", "Bangles", "Jewellery Sets"],
  shop: ["Rings", "Jewellery"],
};

type FilterValues = Record<string, string | string[] | undefined>;

export function CatalogFilters({ routeKey, values }: { routeKey: string; values: FilterValues }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div>
      <div className="hidden lg:block"><FilterFields routeKey={routeKey} values={values} onSubmit={() => setOpen(false)} /></div>
      <div className="lg:hidden">
        <button type="button" aria-expanded={open} onClick={() => setOpen(true)} className="group inline-flex min-h-11 items-center gap-3 border border-[var(--line)] bg-white px-4 text-[10px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 hover:border-[var(--anokhi)] hover:text-[var(--anokhi)]"><SlidersHorizontal size={15} weight="light" className="text-[var(--anokhi)]" /> Filters & sort</button>
        <AnimatePresence>
          {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="fixed inset-0 z-[60] bg-black/30">
            <motion.div role="dialog" aria-modal="true" aria-label="Filter products" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: reduceMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l-2 border-[var(--anokhi)] bg-[var(--paper)] shadow-[-12px_0_32px_rgba(51,31,45,0.12)]">
              <div className="flex min-h-16 items-center justify-between border-b border-[var(--line)] px-5"><h2 className="font-editorial text-[25px]">Filters & sort</h2><button type="button" aria-label="Close filters" onClick={() => setOpen(false)} className="grid size-10 place-items-center"><X size={20} weight="light" /></button></div>
              <div className="overflow-y-auto p-5"><FilterFields routeKey={routeKey} values={values} onSubmit={() => setOpen(false)} /></div>
            </motion.div>
          </motion.div>}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FilterFields({ routeKey, values, onSubmit }: { routeKey: string; values: FilterValues; onSubmit: () => void }) {
  const categories = categoryOptions[routeKey] ?? categoryOptions.shop;
  const action = routeKey === "rings" || routeKey === "jewellery" ? `/${routeKey}` : "/shop";
  return (
    <form action={action} onSubmit={onSubmit} className="grid gap-x-5 gap-y-6 border-y border-[var(--line)] bg-white/50 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
      <label className="grid gap-2 text-[11px] text-[var(--muted)]">Category<select name="category" defaultValue={valueOf(values.category)} className="min-h-11 border border-[var(--line)] bg-white px-3 text-[12px] text-[var(--ink)]"><option value="">All categories</option>{categories.map((category) => <option key={category} value={category.toLowerCase()}>{category}</option>)}</select></label>
      <label className="grid gap-2 text-[11px] text-[var(--muted)]">Search details<input name="q" type="search" defaultValue={valueOf(values.q)} placeholder="Style or detail" className="min-h-11 border border-[var(--line)] bg-white px-3 text-[12px] text-[var(--ink)]" /></label>
      <label className="grid gap-2 text-[11px] text-[var(--muted)]">Minimum price<input name="minPrice" type="number" min="0" step="1" defaultValue={valueOf(values.minPrice)} className="min-h-11 border border-[var(--line)] bg-white px-3 text-[12px] text-[var(--ink)]" /></label>
      <label className="grid gap-2 text-[11px] text-[var(--muted)]">Maximum price<input name="maxPrice" type="number" min="0" step="1" defaultValue={valueOf(values.maxPrice)} className="min-h-11 border border-[var(--line)] bg-white px-3 text-[12px] text-[var(--ink)]" /></label>
      <label className="grid gap-2 text-[11px] text-[var(--muted)]">Metal<input name="metal" defaultValue={valueOf(values.metal)} placeholder="Choose a metal" className="min-h-11 border border-[var(--line)] bg-white px-3 text-[12px] text-[var(--ink)]" /></label>
      <label className="grid gap-2 text-[11px] text-[var(--muted)]">Stone<input name="stone" defaultValue={valueOf(values.stone)} placeholder="Choose a stone" className="min-h-11 border border-[var(--line)] bg-white px-3 text-[12px] text-[var(--ink)]" /></label>
      <label className="grid gap-2 text-[11px] text-[var(--muted)]">Diamond<input name="diamond" defaultValue={valueOf(values.diamond)} placeholder="Shape or detail" className="min-h-11 border border-[var(--line)] bg-white px-3 text-[12px] text-[var(--ink)]" /></label>
      {routeKey === "rings" && <label className="grid gap-2 text-[11px] text-[var(--muted)]">Ring size<input name="ringSize" defaultValue={valueOf(values.ringSize)} placeholder="Size" className="min-h-11 border border-[var(--line)] bg-white px-3 text-[12px] text-[var(--ink)]" /></label>}
      <label className="grid gap-2 text-[11px] text-[var(--muted)]">Availability<select name="availability" defaultValue={valueOf(values.availability)} className="min-h-11 border border-[var(--line)] bg-white px-3 text-[12px] text-[var(--ink)]"><option value="">Any availability</option><option value="in-stock">Available to purchase</option></select></label>
      <label className="grid gap-2 text-[11px] text-[var(--muted)]">Sort by<select name="sort" defaultValue={valueOf(values.sort) || "featured"} className="min-h-11 border border-[var(--line)] bg-white px-3 text-[12px] text-[var(--ink)]"><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
      <button className="self-end min-h-11 bg-[var(--anokhi)] px-4 text-[10px] font-medium uppercase tracking-[0.1em] text-white">Apply filters</button>
    </form>
  );
}

function valueOf(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}