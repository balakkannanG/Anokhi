import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  {
    title: "Discover",
    links: [
      ["Rings", "/rings"],
      ["Jewellery", "/jewellery"],
      ["Collections", "/collections"],
      ["New arrivals", "/shop"],
    ],
  },
  {
    title: "The Anokhi world",
    links: [
      ["Our story", "/about"],
      ["Diamond education", "/diamond-education"],
      ["Ring size guide", "/ring-size-guide"],
      ["Journal", "/journal"],
    ],
  },
  {
    title: "We are here",
    links: [
      ["Contact", "/contact"],
      ["Shipping & returns", "/shipping-returns"],
      ["Frequently asked questions", "/faq"],
      ["Care guide", "/care-guide"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#292629] text-white">
      <div className="site-frame py-16 sm:py-20 lg:py-24">
        <div className="grid gap-14 border-b border-white/15 pb-14 md:grid-cols-[1fr_2fr] lg:gap-24">
          <div className="max-w-sm">
            <Link href="/" aria-label="Anokhi Diamond Atelier home" className="relative block h-20 w-[300px] max-w-full overflow-hidden">
              <Image src="/companyLogo.png" alt="Anokhi Diamond Atelier" fill sizes="300px" className="object-cover" />
            </Link>
            <p className="mt-6 max-w-[32ch] text-[13px] leading-7 text-white/65">
              A considered collection of rings and fine jewellery, made for the moments that become yours.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.13em] text-white"
            >
              The Anokhi story <ArrowUpRight size={14} weight="light" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-x-8">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="mb-6 text-[10px] font-medium uppercase tracking-[0.15em] text-white/48">
                  {group.title}
                </h2>
                  <ul className="space-y-4">
                  {group.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[12px] text-white/75 transition-colors duration-300 hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[10px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Anokhi. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}