"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { jewelleryCategories, ringCategories, discoverLinks } from "@/lib/constants/navigation";
import { Handbag, CaretDown, List, MagnifyingGlass, X } from "@/components/ui/icons";
import { placeholderImages } from "@/lib/constants/placeholder-images";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const menuLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Jewellery", href: "/jewellery" },
  { label: "Rings", href: "/rings" },
  { label: "Custom Design", href: "/customise-your-ring" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const anokhiCollections = [
  { label: "Timeless", href: "/collections?collection=timeless" },
  { label: "Anokhi Collection", href: "/collections?collection=anokhi-collection" },
  { label: "Personalizing", href: "/collections?collection=personalizing" },
];

function Logo() {
  return (
    <Link
      href="/"
      aria-label="Anokhi home"
      className="inline-flex items-center justify-center"
    >
      <Image
        alt="Anokhi logo"
        className="h-auto w-[148px] object-contain sm:w-[170px]"
        height={56}
        priority
        src="/anokhilogo/Logo.png"
        width={200}
      />
    </Link>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 32 };

  const mobileLinks = [
    ...menuLinks.filter((item) => item.label === "Collections"),
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className="inline-flex min-h-11 items-center gap-2 text-xs text-parchment lg:hidden"
          type="button"
        >
          <List aria-hidden="true" className="size-[19px]" weight="light" />
          <span>Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        aria-describedby="mobile-navigation-description"
        className="w-[min(88vw,420px)] border-r border-taupe/40 bg-parchment px-5 pb-8 pt-5 sm:px-8"
        side="left"
        showCloseButton={false}
      >
        <SheetHeader className="border-b border-taupe/40 px-0 pb-5 pt-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center">
              <Image
                alt="Anokhi logo"
                className="h-auto w-[120px] object-contain"
                height={40}
                src="/anokhilogo/Logo.png"
                width={140}
              />
            </SheetTitle>
            <SheetClose asChild>
              <button
                aria-label="Close menu"
                className="grid size-10 place-items-center text-charcoal hover:text-muted-gold"
                type="button"
              >
                <X aria-hidden="true" className="size-5" weight="light" />
              </button>
            </SheetClose>
          </div>
          <SheetDescription id="mobile-navigation-description" className="text-left text-coffee">
            Explore fine jewellery, signature collections and Anokhi stories.
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="mt-5 flex flex-col">
          <AnimatePresence initial={false}>
            {mobileLinks.map((item, index) => (
              <motion.div
                key={item.href}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ ...transition, delay: shouldReduceMotion ? 0 : index * 0.025 }}
              >
                {item.label === "Collections" ? (
                  <details className="border-b border-taupe/25 py-2">
                    <summary className="display-face flex min-h-12 cursor-pointer list-none items-center justify-between text-[19px] text-charcoal hover:text-muted-gold">
                      Collections
                      <CaretDown aria-hidden="true" className="size-4 text-taupe" weight="light" />
                    </summary>
                    <div className="flex flex-col gap-1 pb-3 pl-4">
                      <Link className="py-2 text-sm text-coffee hover:text-anokhi-plum" href="/collections" onClick={() => setOpen(false)}>
                        Explore all collections
                      </Link>
                      {anokhiCollections.map((collection) => (
                        <Link className="py-2 text-sm text-coffee hover:text-anokhi-plum" href={collection.href} key={collection.href} onClick={() => setOpen(false)}>
                          {collection.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    className="display-face flex min-h-12 items-center justify-between border-b border-taupe/25 py-3 text-[19px] text-charcoal hover:text-muted-gold"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-[13px] text-taupe">↗</span>
                  </Link>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </nav>
        {/* Temporarily keep category shortcuts out of navigation; their routes remain available. */}
        {false && <div className="mt-7 grid grid-cols-2 gap-6 text-[11px] text-coffee">
          <div>
            <p className="eyebrow mb-3">Jewellery</p>
            <ul className="space-y-3">
              {jewelleryCategories.slice(1, 6).map((item) => (
                <li key={item.handle}>
                  <Link href={`/collections/${item.handle}`} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Rings</p>
            <ul className="space-y-3">
              {ringCategories.slice(1, 6).map((item) => (
                <li key={item.handle}>
                  <Link href={`/collections/${item.handle}`} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>}
      </SheetContent>
    </Sheet>
  );
}

function CollectionsMegaMenu() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function dismissOnEscape(event: React.KeyboardEvent<HTMLDetailsElement>) {
    if (event.key === "Escape") {
      detailsRef.current?.removeAttribute("open");
      detailsRef.current?.querySelector("summary")?.focus();
    }
  }

  function dismissAfterNavigation(event: React.MouseEvent<HTMLDetailsElement>) {
    if ((event.target as HTMLElement).closest("a")) detailsRef.current?.removeAttribute("open");
  }

  return (
    <details
      className="mega-menu relative hidden lg:block"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          event.currentTarget.removeAttribute("open");
        }
      }}
      onClick={dismissAfterNavigation}
      onKeyDown={dismissOnEscape}
      ref={detailsRef}
    >
      <summary className="flex cursor-pointer list-none items-center gap-1.5 py-4 text-[14px] text-parchment hover:text-muted-gold">
        Collections <CaretDown aria-hidden="true" className="size-3" weight="light" />
      </summary>
      <div className="mega-panel absolute left-1/2 top-full z-30 hidden w-[min(92vw,560px)] -translate-x-1/2 grid-cols-2 gap-8 border border-taupe/35 bg-ivory p-7 shadow-[0_22px_60px_-32px_rgba(45,38,35,0.3)]">
        <div>
          <p className="eyebrow">The Anokhi world</p>
          <h2 className="display-face mt-2 text-2xl text-charcoal">Discover our collections</h2>
          <Link className="quiet-link mt-5 inline-flex pb-1 text-xs tracking-[0.1em]" href="/collections">
            VIEW ALL COLLECTIONS <span aria-hidden="true" className="ml-2">↗</span>
          </Link>
        </div>
        <ul className="flex flex-col justify-center gap-4 text-sm text-coffee">
          {anokhiCollections.map((collection) => (
            <li key={collection.href}>
              <Link className="quiet-link hover:text-muted-gold" href={collection.href}>
                {collection.label} <span aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

function ShopMegaMenu() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  function dismissOnEscape(event: React.KeyboardEvent<HTMLDetailsElement>) {
    if (event.key === "Escape") {
      detailsRef.current?.removeAttribute("open");
      detailsRef.current?.querySelector("summary")?.focus();
    }
  }
  function dismissAfterNavigation(event: React.MouseEvent<HTMLDetailsElement>) {
    if ((event.target as HTMLElement).closest("a")) detailsRef.current?.removeAttribute("open");
  }
  return (
    <details className="mega-menu relative hidden lg:block" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) event.currentTarget.removeAttribute("open"); }} onClick={dismissAfterNavigation} onKeyDown={dismissOnEscape} ref={detailsRef}>
      <summary className="flex cursor-pointer list-none items-center gap-1.5 py-4 text-[14px] text-parchment hover:text-muted-gold">
        Shop <CaretDown aria-hidden="true" className="size-3" weight="light" />
      </summary>
      <div className="mega-panel absolute left-1/2 top-full z-30 hidden w-[min(94vw,1000px)] -translate-x-1/2 grid-cols-[1fr_1fr_0.8fr] gap-8 border border-taupe/35 bg-ivory p-8 shadow-[0_22px_60px_-32px_rgba(45,38,35,0.3)] hover:text-muted-gold">
        <MegaColumn title="Jewellery"  items={jewelleryCategories} />
        <MegaColumn title="Rings"  items={ringCategories} />
        <div>
          <h2 className="eyebrow mb-4">Discover</h2>
          <ul className="space-y-3 text-sm text-coffee">
            {discoverLinks.map((item) => (
              <li key={item.href}>
                <Link className="quiet-link hover:text-muted-gold" href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-taupe/35 pt-5">
            <Link className="display-face text-lg text-charcoal hover:text-muted-gold" href="/customise-your-ring">
              Customise your ring <span aria-hidden="true">↗</span>
            </Link>
            <p className="mt-2 text-xs leading-5 text-coffee">
              Begin with the ring style you have in mind.
            </p>
            <Link aria-label="See Anokhi ring photography" className="photo-well relative mt-5 block aspect-[1.6] overflow-hidden rounded-[9px]" href="/rings">
              <Image alt={placeholderImages.solitaireRing.alt} className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]" fill sizes="260px" src={placeholderImages.solitaireRing.src} />
            </Link>
          </div>
        </div>
      </div>
    </details>
  );
}

function MegaColumn({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ label: string; handle: string }>;
}) {
  return (
    <div>
      <h2 className="eyebrow mb-4">{title}</h2>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-coffee">
        {items.map((item) => (
          <li key={item.handle}>
            <Link className="quiet-link hover:text-muted-gold" href={`/collections/${item.handle}`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <header className="relative z-20 border-b border-taupe/30 bg-anokhi-plum font-display">
      <div className="page-shell flex h-[62px] items-center justify-between gap-4 lg:h-[78px]">
        <div className="flex flex-1 items-center gap-3 lg:hidden">
          <MobileMenu />
        </div>
        <div className="flex flex-1 justify-center lg:flex-none lg:justify-start">
          <Logo />
        </div>
        <nav aria-label="Main navigation" className="hidden flex-1 items-center justify-center gap-5 xl:flex 2xl:gap-7">
          {/* Temporarily hide non-collection navigation for launch. */}
          {false && <ShopMegaMenu />}
          {menuLinks.filter((item) => item.label === "Collections").map((item) => (
            item.label === "Collections"
              ? <CollectionsMegaMenu key={item.href} />
              : (
                <Link
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`whitespace-nowrap text-[11px] transition-colors duration-200 hover:text-muted-gold 2xl:text-[14px] ${isActive(item.href) ? "text-white" : "text-parchment"}`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              )
          ))}
        </nav>
        {/* Search, account and cart remain available by URL but are hidden from launch navigation. */}
        {false && <nav aria-label="Store links" className="flex flex-1 items-center justify-end gap-3 sm:gap-4 lg:flex-none">
          <Link aria-label="Search products" className="grid size-10 place-items-center text-parchment hover:text-muted-gold" href="/search">
            <MagnifyingGlass aria-hidden="true" className="size-[19px]" weight="light" />
          </Link>
          <Link aria-label="My account" className="hidden size-10 place-items-center text-[11px] text-parchment hover:text-muted-gold sm:grid" href="/account">
            Account
          </Link>
          <Link aria-label="Shopping bag" className="grid size-10 place-items-center text-parchment hover:text-muted-gold" href="/cart">
            <Handbag aria-hidden="true" className="size-[20px]" weight="light" />
          </Link>
        </nav>}
      </div>
      <nav aria-label="Quick shop navigation" className="hidden border-t border-taupe/20 px-8 py-2 lg:block xl:hidden">
        <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-8 text-[11px] text-parchment">
          <CollectionsMegaMenu />
        </div>
      </nav>
    </header>
  );
}
