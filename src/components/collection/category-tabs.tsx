import Link from "next/link";

const tabs = [
  { label: "All", href: "/shop" },
  { label: "Rings", href: "/rings" },
  { label: "Jewellery", href: "/jewellery" },
];

export function CategoryTabs({ active }: { active: "all" | "rings" | "jewellery" }) {
  return (
    <nav aria-label="Product category" className="flex gap-6 border-b border-taupe/40">
      {tabs.map((tab, index) => {
        const value = index === 0 ? "all" : index === 1 ? "rings" : "jewellery";
        return (
          <Link
            aria-current={active === value ? "page" : undefined}
            className={`relative -mb-px border-b-2 px-1 py-3 text-xs transition-colors ${active === value ? "border-anokhi-plum text-anokhi-plum" : "border-transparent text-coffee hover:text-charcoal"}`}
            href={tab.href}
            key={tab.href}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
