import { MagnifyingGlass } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";

export function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  return (
    <form action="/search" className="mt-6 flex max-w-[42rem] items-center gap-3 border-b border-coffee py-2">
      <label className="sr-only" htmlFor="site-search">Search Anokhi jewellery</label>
      <MagnifyingGlass aria-hidden="true" className="size-5 shrink-0 text-coffee" weight="light" />
      <Input autoComplete="off" className="h-12 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0" defaultValue={initialQuery} id="site-search" name="q" placeholder="Search rings, styles or jewellery" type="search" />
      <button className="shrink-0 text-[10px] font-semibold tracking-[0.14em] text-anokhi-plum" type="submit">SEARCH</button>
    </form>
  );
}
