import { Handbag, MagnifyingGlass, UserCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navigation = [
  ["Rings", "/rings"],
  ["Jewellery", "/jewellery"],
  ["Collections", "/collections"],
  ["Our story", "/about"],
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="site-frame flex min-h-[76px] items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center">
          <Link href="/" aria-label="Anokhi Diamond Atelier home" className="relative block h-12 w-[180px] max-w-full overflow-hidden sm:h-14 sm:w-[210px]">
            <Image src="/companyLogo.png" alt="Anokhi Diamond Atelier" fill sizes="210px" className="object-cover" priority />
          </Link>
        </div>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {navigation.map(([label, href]) => (
            <Link key={href} href={href} className="py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--ink)] transition-colors hover:text-[var(--anokhi)]">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-1 text-[var(--ink)]">
          <Link href="/search" aria-label="Search" title="Search" className="grid size-10 place-items-center transition-colors hover:text-[var(--anokhi)]">
            <MagnifyingGlass size={19} weight="light" />
          </Link>
          <Link href="/account" aria-label="Your account" title="Your account" className="hidden size-10 place-items-center transition-colors hover:text-[var(--anokhi)] sm:grid">
            <UserCircle size={19} weight="light" />
          </Link>
          <Link href="/cart" aria-label="Shopping bag" title="Shopping bag" className="grid size-10 place-items-center transition-colors hover:text-[var(--anokhi)]">
            <Handbag size={19} weight="light" />
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <nav aria-label="Mobile navigation" className="site-frame flex gap-7 overflow-x-auto border-t border-[var(--line)] py-3 lg:hidden">
        {navigation.map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--ink)] transition-colors hover:text-[var(--anokhi)]">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}