import Link from "next/link";
import type { ProductFilterGroup } from "@/lib/shopify/types";

export function ShopifyFilters({
  groups,
  action,
  selected = [],
  sort = "collection-default",
  clearHref,
}: {
  groups: ProductFilterGroup[];
  action: string;
  selected?: string[];
  sort?: string;
  clearHref?: string;
}) {
  return (
    <form action={action} className="border-y border-taupe/40 py-4">
      <div className="grid gap-5 lg:grid-cols-[1fr_13rem] lg:items-end">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {groups.map((group) => (
            <fieldset className="min-w-0" key={group.id}>
              <legend className="mb-2 text-[10px] font-semibold tracking-[0.1em] text-charcoal">{group.label}</legend>
              <div className="flex max-h-28 flex-wrap gap-2 overflow-y-auto">
                {group.values.slice(0, 8).map((value) => (
                  <label className="flex items-center gap-2 rounded-full border border-taupe/45 px-2.5 py-1.5 text-[10px] text-coffee" key={value.id}>
                    <input className="accent-anokhi-plum" defaultChecked={selected.includes(value.input)} name="filter" type="checkbox" value={value.input} />
                    <span>{value.label}</span><span className="text-taupe">{value.count}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          {groups.length === 0 ? <p className="text-xs leading-5 text-coffee">Shopify filters appear here when available for this collection.</p> : null}
        </div>
        <div className="flex items-end justify-between gap-3 lg:flex-col lg:items-stretch">
          <label className="grid gap-1.5 text-[10px] font-medium text-coffee" htmlFor="collection-sort">
            Sort by
            <select className="h-10 border-b border-taupe bg-transparent px-2 text-xs text-charcoal outline-none focus:border-anokhi-plum" defaultValue={sort} id="collection-sort" name="sort">
              <option value="collection-default">Featured</option>
              <option value="best-selling">Best selling</option>
              <option value="created">Newest</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="title">Name</option>
            </select>
          </label>
          <div className="flex items-center gap-4">
            {clearHref ? <Link className="text-[10px] text-coffee underline underline-offset-4" href={clearHref}>Clear</Link> : null}
            <button className="min-h-10 bg-anokhi-plum px-5 text-[10px] font-semibold tracking-[0.12em] text-ivory" type="submit">APPLY</button>
          </div>
        </div>
      </div>
    </form>
  );
}
