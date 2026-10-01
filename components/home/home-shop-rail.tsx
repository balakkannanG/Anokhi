import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const shopLinks = [
  { number: "01", title: "Rings", detail: "Engagement · wedding · signature", href: "/rings", featured: true },
  { number: "02", title: "New arrivals", detail: "The latest from Anokhi", href: "/shop?sort=newest" },
  { number: "03", title: "Jewellery", detail: "Earrings · necklaces · bracelets", href: "/jewellery" },
  { number: "04", title: "Collections", detail: "Browse the complete edit", href: "/collections" },
];

export function HomeShopRail() {
  return (
    <nav aria-label="Shop Anokhi" className="border-b border-[var(--line)] bg-white">
      <div className="site-frame grid grid-cols-2 md:grid-cols-4">
        {shopLinks.map((item) => (
          <Link key={item.number} href={item.href} className={`group relative flex min-h-[112px] flex-col justify-between border-b border-[var(--line)] px-4 py-4 transition-colors duration-300 hover:bg-[var(--paper)] sm:min-h-[128px] sm:px-6 sm:py-5 md:border-b-0 md:px-5 lg:px-7 ${item.featured ? "md:border-r md:border-[var(--line)] md:pl-0" : "md:border-r md:border-[var(--line)]"}`}>
            <span className="tabular-figures flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--anokhi)]">
              {item.number}
              <ArrowUpRight size={13} weight="light" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span>
              <span className="font-editorial block text-[24px] leading-none text-[var(--ink)] sm:text-[28px]">{item.title}</span>
              <span className="mt-2 block text-[9px] leading-4 text-[var(--muted)] sm:text-[10px]">{item.detail}</span>
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}