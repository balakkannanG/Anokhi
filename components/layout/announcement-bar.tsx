import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="flex min-h-9 items-center justify-center border-b border-[var(--line)] bg-[var(--paper)] px-4 text-center">
      <Link href="/rings" className="group inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--ink)] sm:text-[10px]">
        The Anokhi ring edit <span className="text-[var(--muted)]">·</span> Begin with a story
        <ArrowUpRight size={12} weight="light" className="text-[var(--anokhi)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}