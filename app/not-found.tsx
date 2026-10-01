import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <main className="site-frame grid min-h-[65vh] content-center py-16">
      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.17em] text-[var(--anokhi)]">A little detour</p>
      <h1 className="font-editorial max-w-[11ch] text-[64px] leading-[0.98] sm:text-[84px]">This page is not here.</h1>
      <p className="mt-5 max-w-[45ch] text-[13px] leading-6 text-[var(--muted)]">The page may have moved. Find your way back to the pieces and stories of Anokhi.</p>
      <form action="/search" className="mt-8 flex max-w-lg gap-4 border-b border-[var(--line)] pb-3">
        <label className="sr-only" htmlFor="not-found-search">Search Anokhi</label>
        <input id="not-found-search" name="q" type="search" placeholder="Search rings and jewellery" className="min-h-11 min-w-0 flex-1 bg-transparent text-[13px] outline-none" />
        <button className="text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--anokhi)]">Search</button>
      </form>
      <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
        <Link href="/rings" className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.11em] text-[var(--anokhi)]">Explore rings <ArrowRight size={14} weight="light" /></Link>
        <Link href="/jewellery" className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.11em] text-[var(--anokhi)]">Discover jewellery <ArrowRight size={14} weight="light" /></Link>
      </div>
    </main>
  );
}