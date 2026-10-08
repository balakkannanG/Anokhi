import Link from "next/link";

const footerGroups = [
  {
    title: "Jewellery",
    links: [
      { label: "All Jewellery", href: "/jewellery" },
      { label: "Earrings", href: "/collections/earrings" },
      { label: "Necklaces", href: "/collections/necklaces" },
      { label: "Jewellery Sets", href: "/collections/jewellery-sets" },
    ],
  },
  {
    title: "Rings",
    links: [
      { label: "All Rings", href: "/rings" },
      { label: "Engagement Rings", href: "/collections/engagement-rings" },
      { label: "Diamond Rings", href: "/collections/diamond-rings" },
      { label: "Custom Rings", href: "/collections/custom-rings" },
    ],
  },
  {
    title: "A closer look",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Diamond education", href: "/diamond-education" },
      { label: "Ring size guide", href: "/ring-size-guide" },
      { label: "Customise your ring", href: "/customise-your-ring" },
    ],
  },
  {
    title: "Help & account",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Frequently asked questions", href: "/faq" },
      { label: "Shipping & returns", href: "/shipping-returns" },
      { label: "My account", href: "/account" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-anokhi-plum px-4 pb-6 pt-12 text-white sm:px-7 sm:pt-16 lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-[1.2fr_1fr] md:gap-9">
          <div className="col-span-2 md:col-span-1">
            <Link className="display-face text-[25px] tracking-[0.22em]" href="/">
              ANOKHI
            </Link>
            <p className="mt-4 max-w-[260px] text-xs leading-6 text-white">
              Considered fine jewellery for the moments, milestones and stories you want to keep.
            </p>
            <Link className="mt-6 inline-flex min-h-10 items-center gap-3 border-b border-muted-gold pb-1 text-[10px] tracking-[0.14em]" href="/collections">
              EXPLORE COLLECTIONS <span aria-hidden="true">↗</span>
            </Link>
          </div>
          {/* Temporarily hide links to non-launch pages; keep their routes intact. */}
          {false && footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[10px] font-medium tracking-[0.14em] text-muted-gold">
                {group.title.toUpperCase()}
              </h2>
              <ul className="mt-4 space-y-3 text-[11px] text-white">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <Link className="hover:text-white hover:underline hover:underline-offset-4" href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-ivory/20 pt-5 text-[9px] text-ivory/70 sm:flex-row sm:items-center sm:justify-between">
          <p>ANOKHI · FINE JEWELLERY</p>
          {/* Legal pages remain available directly but are omitted from launch navigation. */}
          {false && <nav aria-label="Legal links" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms">Terms</Link>
          </nav>}
          <Link className="w-fit tracking-[0.12em]" href="#top">BACK TO TOP ↑</Link>
        </div>
      </div>
    </footer>
  );
}
