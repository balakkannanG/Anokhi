import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ShopFilters({
  categories,
  sort = "featured",
}: {
  categories: Array<{ label: string; value: string }>;
  sort?: string;
}) {
  return (
    <form action="/shop" className="grid gap-4 border-y border-taupe/35 py-4 md:grid-cols-[1fr_auto_auto] md:items-end">
      <fieldset className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <legend className="sr-only">Filter products</legend>
        {categories.map((category) => (
          <label className="flex cursor-pointer items-center gap-2 text-xs text-charcoal" key={category.value}>
            <Checkbox name="category" value={category.value} />
            <span>{category.label}</span>
          </label>
        ))}
        <Label className="sr-only" htmlFor="available-only">Availability</Label>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-charcoal">
          <Checkbox id="available-only" name="available" value="true" />
          <span>Available now</span>
        </label>
      </fieldset>
      <div className="grid grid-cols-2 gap-3 md:col-span-2 md:flex md:justify-end">
        <label className="grid gap-1.5 text-[10px] font-medium tracking-wide text-coffee" htmlFor="price-from">
          FROM (INR)
          <input className="h-10 w-full border-b border-taupe bg-transparent px-2 text-sm text-charcoal outline-none focus:border-anokhi-plum" id="price-from" min="0" name="minPrice" placeholder="0" type="number" />
        </label>
        <label className="grid gap-1.5 text-[10px] font-medium tracking-wide text-coffee" htmlFor="price-to">
          TO (INR)
          <input className="h-10 w-full border-b border-taupe bg-transparent px-2 text-sm text-charcoal outline-none focus:border-anokhi-plum" id="price-to" min="0" name="maxPrice" placeholder="Any" type="number" />
        </label>
      </div>
      <div className="flex items-end justify-between gap-4 md:justify-end">
        <Label className="text-xs text-coffee" htmlFor="sort-products">Sort by</Label>
        <Select defaultValue={sort} name="sort">
          <SelectTrigger className="h-10 w-[180px] border-0 border-b border-taupe bg-transparent px-2 text-xs shadow-none focus-visible:ring-0" id="sort-products">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="best-selling">Best selling</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: low to high</SelectItem>
            <SelectItem value="price-high">Price: high to low</SelectItem>
            <SelectItem value="title">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <button className="h-10 bg-anokhi-plum px-5 text-[10px] font-semibold tracking-[0.12em] text-ivory md:col-start-3 md:row-start-2" type="submit">
        APPLY FILTERS
      </button>
    </form>
  );
}
