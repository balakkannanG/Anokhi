import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ContactForm, CustomerForm, NewsletterForm, RingSizeConverter } from "@/components/forms/page-forms";
import { CartView, AddToBagButton, QuickViewButton, WishlistButton } from "@/components/storefront/cart-controls";
import { FAQBrowser } from "@/components/storefront/faq-browser";
import { CatalogFilters } from "@/components/storefront/catalog-filters";
import { placeholderImages } from "@/lib/constants/images";
import type { PageDefinition, PageLink, PageSection } from "@/lib/constants/page-content";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { getCollections } from "@/lib/shopify/collections";
import { getProducts } from "@/lib/shopify/products";
import type { ShopifyCollection, ShopifyProduct } from "@/lib/shopify/types";

type ImageKey = keyof typeof placeholderImages;

function getPlaceholder(key?: string) {
  return key && key in placeholderImages
    ? placeholderImages[key as ImageKey]
    : placeholderImages.craftsmanship;
}

function formatMoney(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en", { style: "currency", currency: currencyCode }).format(Number(amount));
}

export function Breadcrumbs({ segments }: { segments: string[] }) {
  return (
    <nav aria-label="Breadcrumb" className="site-frame flex flex-wrap items-center gap-2 py-5 text-[10px] text-[var(--muted)]">
      <Link href="/" className="transition-colors hover:text-[var(--anokhi)]">Home</Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        return (
          <span key={href} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {isLast ? <span aria-current="page" className="capitalize text-[var(--ink)]">{segment.replaceAll("-", " ")}</span> : <Link href={href} className="capitalize transition-colors hover:text-[var(--anokhi)]">{segment.replaceAll("-", " ")}</Link>}
          </span>
        );
      })}
    </nav>
  );
}

export function PageHero({ page }: { page: PageDefinition }) {
  return (
    <section className="page-hero relative isolate overflow-hidden bg-[#282326]">
      <Image src={getPlaceholder(page.heroImage)} alt={`${page.title} at Anokhi`} fill priority unoptimized sizes="100vw" className="object-cover object-[60%_48%]" />
      <div aria-hidden="true" className="page-hero-shade absolute inset-0" />
      <div className="site-frame relative z-10 flex min-h-[inherit] items-end py-12 sm:items-center sm:py-16 lg:py-20">
        <div className="max-w-[700px] text-white">
          {page.eyebrow && <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/70"><span className="h-px w-8 bg-white/60" />{page.eyebrow}</p>}
          <h1 className="font-editorial max-w-[11ch] text-[clamp(48px,7vw,88px)] leading-[0.9] [text-wrap:balance]">{page.title}</h1>
          <p className="mt-5 max-w-[45ch] text-[13px] leading-6 text-white/75 sm:text-[14px] sm:leading-7">{page.description}</p>
          {page.cta && (
            <Link href={page.cta.href} className="group mt-7 inline-flex min-h-12 items-center gap-5 bg-[var(--anokhi)] px-5 text-[10px] font-medium uppercase tracking-[0.1em] text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:scale-[0.98]">
              {page.cta.label}
              <span className="grid size-7 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-1"><ArrowRight size={14} weight="light" /></span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export async function PageSections({ sections, routeKey, searchParams = {} }: {
  sections: PageSection[];
  routeKey: string;
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const resolved = await Promise.all(sections.map(async (section) => {
    if (section.kind === "products") {
      const query = buildProductQuery(section.query, searchParams, routeKey);
      const sort = valueOf(searchParams.sort);
      const isNewArrivals = section.title.toLowerCase().includes("new arrivals");
      const sortKey = sort === "price-low" || sort === "price-high" ? "PRICE" : sort === "newest" || (!sort && isNewArrivals) ? "CREATED_AT" : "BEST_SELLING";
      const reverse = sort === "price-high" || sort === "newest" || (!sort && isNewArrivals);
      return { section, products: await getProducts({ query, first: 8, sortKey, reverse }) };
    }
    if (section.kind === "collections") return { section, collections: await getCollections(18) };
    return { section };
  }));

  return <>{resolved.map(({ section, products, collections }, index) => <Section key={`${section.kind}-${section.title}-${index}`} section={section} index={index} routeKey={routeKey} searchParams={searchParams} products={products} collections={collections} />)}</>;
}

function Section({
  section,
  index,
  routeKey,
  searchParams,
  products,
  collections,
}: {
  section: PageSection;
  index: number;
  routeKey: string;
  searchParams: Record<string, string | string[] | undefined>;
  products?: ShopifyProduct[];
  collections?: ShopifyCollection[];
}) {
  if (section.kind === "newsletter") {
    return (
      <section className="bg-[var(--lavender)] py-14 text-[var(--ink)] sm:py-18 lg:py-20">
        <div className="site-frame grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <h2 className="font-editorial max-w-[13ch] text-[40px] leading-[1.03] sm:text-[48px]">{section.title}</h2>
            {section.body && <p className="mt-4 max-w-[45ch] text-[12px] leading-6 text-[var(--muted)]">{section.body}</p>}
          </div>
          <NewsletterForm />
        </div>
      </section>
    );
  }

  const immersiveEditorial = section.kind === "editorial" && (section.title === "Your ring, your way" || (section.image === "craftsmanship" && index % 3 === 0));
  const headingRenderedBelow = section.kind === "promo" || immersiveEditorial;

  return (
    <section className={`py-14 sm:py-18 lg:py-22 ${index % 2 === 1 ? "bg-white" : "bg-[var(--paper)]"}`}>
      <div className="site-frame">
        {!headingRenderedBelow && <div className="mb-8 max-w-2xl sm:mb-10">
          <span aria-hidden="true" className="mb-5 block h-px w-12 bg-[var(--anokhi)]" />
          <h2 className="font-editorial max-w-[16ch] text-[40px] leading-[0.98] text-[var(--ink)] sm:text-[52px]">{section.title}</h2>
          {section.body && <p className="mt-4 max-w-[58ch] text-[13px] leading-7 text-[var(--muted)] sm:text-[14px]">{section.body}</p>}
        </div>}
        {section.kind === "categories" && <LinkGrid links={section.links ?? []} featured={routeKey === "home" && section.title === "Find your perfect ring"} />}
        {section.kind === "collections" && <CollectionGrid links={section.links ?? []} collections={collections ?? []} />}
        {section.kind === "products" && <ProductGrid products={products ?? []} title={section.title} />}
        {section.kind === "editorial" && (immersiveEditorial ? <ImmersiveEditorial section={section} /> : <Editorial section={section} reverse={index % 2 === 1} />)}
        {section.kind === "promo" && <PromoBanner section={section} />}
        {section.kind === "gallery" && <LinkGrid links={section.links ?? []} wide />}
        {section.kind === "journal" && <Editorial section={section} />}
        {section.kind === "faq" && <QuestionList questions={section.questions ?? []} />}
        {section.kind === "steps" && <StepList items={section.bullets ?? []} />}
        {section.kind === "guide" && <Guide section={section} />}
        {section.kind === "trust" && <Trust section={section} />}
        {section.kind === "contact" && <ContactDetails section={section} />}
        {section.kind === "form" && <FormSection section={section} routeKey={routeKey} />}
        {section.kind === "account" && <LinkGrid links={section.links ?? []} />}
        {section.kind === "cart" && <EmptyCart />}
        {section.kind === "search" && <SearchPanel />}
        {section.kind === "customiser" && <CustomiserSummary section={section} />}
        {section.kind === "legal" && <LegalText section={section} />}
        {section.kind === "filters" && <CatalogFilters routeKey={routeKey} values={searchParams} />}
        {section.kind === "testimonials" && <EmptyEditorial body={section.body} />}
        {section.kind === "social" && <SocialStrip />}
      </div>
    </section>
  );
}

function LinkGrid({ links, wide = false, featured = false }: { links: PageLink[]; wide?: boolean; featured?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-9 ${featured ? "md:grid-cols-12" : wide ? "lg:grid-cols-2" : "md:grid-cols-3"}`}>
      {links.map((link, index) => (
        <Link key={`${link.href}-${link.label}`} href={link.href} className={`group ${featured ? ["md:col-span-6", "md:col-span-3", "md:col-span-3", "md:col-span-3", "md:col-span-3", "md:col-span-6"][index] ?? "md:col-span-4" : wide && index === 0 ? "col-span-2 lg:col-span-1" : ""}`}>
          <div className={`relative overflow-hidden rounded-[var(--media-radius)] bg-[#eee9e7] ${featured && (index === 0 || index === links.length - 1) ? "aspect-[1.3]" : wide && index === 0 ? "aspect-[1.28] lg:aspect-[1.25]" : "aspect-[0.92]"}`}>
            <Image src={getPlaceholder(link.image ?? imageKeys[index % imageKeys.length])} alt={link.label} fill unoptimized sizes="(max-width: 767px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-white sm:bottom-5 sm:left-5 sm:right-5">
              <span className="font-editorial text-[23px] leading-none sm:text-[31px]">{link.label}</span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/50 transition-colors duration-300 group-hover:bg-white group-hover:text-[var(--anokhi)]"><ArrowUpRight size={15} weight="light" /></span>
            </span>
          </div>
          {link.description && <p className="mt-3 text-[11px] leading-5 text-[var(--muted)]">{link.description}</p>}
        </Link>
      ))}
    </div>
  );
}

const imageKeys: ImageKey[] = ["heroRing", "engagementRing", "solitaireRing", "earrings", "necklace", "bracelet"];

function CollectionGrid({ links, collections }: { links: PageLink[]; collections: ShopifyCollection[] }) {
  if (collections.length === 0) return <LinkGrid links={links} />;
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-9 md:grid-cols-3">
      {collections.map((collection) => (
        <Link key={collection.id} href={`/collections/${collection.handle}`} className="group">
          <div className="relative aspect-[0.92] overflow-hidden rounded-[var(--media-radius)] bg-[#eee9e7]">
            {collection.image && <Image src={collection.image.url} alt={collection.image.altText || collection.title} fill unoptimized sizes="(max-width: 767px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />}
            <span className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white"><span className="font-editorial text-[25px] sm:text-[32px]">{collection.title}</span><ArrowUpRight size={16} weight="light" /></span>
          </div>
          <p className="mt-3 text-[11px] leading-5 text-[var(--muted)]">{collection.description}</p>
        </Link>
      ))}
    </div>
  );
}

export function ProductGrid({ products, title = "" }: { products: ShopifyProduct[]; title?: string }) {
  if (products.length === 0) {
    const imageKey: ImageKey = title.toLowerCase().includes("jewellery") ? "earrings" : title.toLowerCase().includes("new") ? "necklace" : "heroRing";
    return (
      <div className="grid overflow-hidden bg-[var(--paper)] md:grid-cols-[0.78fr_1.22fr]">
        <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-14">
          <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--anokhi)]">The Anokhi edit</p>
          <h3 className="font-editorial max-w-[12ch] text-[34px] leading-[0.98] text-[var(--ink)] sm:text-[42px]">A considered collection is taking shape.</h3>
          <p className="mt-4 max-w-[40ch] text-[12px] leading-6 text-[var(--muted)]">Pieces and pricing will appear here as soon as the live Anokhi catalogue is connected. We do not display sample products.</p>
          <Link href={title.toLowerCase().includes("jewellery") ? "/jewellery" : "/rings"} className="mt-6 inline-flex w-fit items-center gap-3 border-b border-[var(--anokhi)] pb-2 text-[10px] font-medium uppercase tracking-[0.11em] text-[var(--anokhi)]">{title.toLowerCase().includes("jewellery") ? "Explore jewellery" : "Explore rings"}<ArrowRight size={14} weight="light" /></Link>
        </div>
        <div className="relative min-h-[230px] overflow-hidden rounded-[var(--media-radius)] bg-[#e9e5e2] sm:min-h-[310px]">
          <Image src={getPlaceholder(imageKey)} alt="Anokhi fine jewellery" fill unoptimized sizes="(max-width: 767px) 100vw, 62vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.025]" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-7 sm:gap-y-14 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.featuredImage ?? product.images.nodes[0];
  const price = product.priceRange.minVariantPrice;
  return (
    <article className="group min-w-0">
      <div className="relative">
        <Link href={`/products/${product.handle}`} className="relative block aspect-[0.84] overflow-hidden rounded-[var(--media-radius)] bg-[#eee9e7]">
          {image && <Image src={image.url} alt={image.altText || product.title} fill unoptimized sizes="(max-width: 767px) 50vw, 25vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]" />}
          {product.images.nodes[1] && <Image src={product.images.nodes[1].url} alt={product.images.nodes[1].altText || `${product.title}, alternate view`} fill unoptimized sizes="(max-width: 767px) 50vw, 25vw" className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />}
          {!product.availableForSale ? <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]">Unavailable</span> : Number(product.compareAtPriceRange.minVariantPrice.amount) > Number(price.amount) && <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[9px] uppercase tracking-[0.1em] text-[var(--anokhi)]">Sale</span>}
        </Link>
        <WishlistButton productHandle={product.handle} productTitle={product.title} />
        <QuickViewButton product={{ title: product.title, handle: product.handle, description: product.description, image: image?.url ?? null, imageAlt: image?.altText ?? null, price: price.amount, currencyCode: price.currencyCode, variantId: product.variants.nodes[0]?.id, available: product.availableForSale && Boolean(product.variants.nodes[0]?.availableForSale) }} configured={isShopifyConfigured} />
      </div>
      <div className="pt-3">
        <Link href={`/products/${product.handle}`} className="block truncate text-[12px] text-[var(--ink)]">{product.title}</Link>
        <p className="mt-1 text-[11px] text-[var(--muted)]">{formatMoney(price.amount, price.currencyCode)}</p>
        <div className="mt-3"><AddToBagButton variantId={product.variants.nodes[0]?.id} configured={isShopifyConfigured} available={product.variants.nodes[0]?.availableForSale && product.availableForSale} compact /></div>
      </div>
    </article>
  );
}

function Editorial({ section, reverse = false }: { section: PageSection; reverse?: boolean }) {
  return (
    <div className={`grid gap-7 md:grid-cols-2 md:items-center md:gap-12 ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
      <div className="relative min-h-[290px] overflow-hidden rounded-[var(--media-radius)] bg-[#eee9e7] sm:min-h-[430px]">
        <Image src={getPlaceholder(section.image)} alt={section.imageAlt || section.title} fill unoptimized sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="max-w-xl">
        {section.body && <p className="text-[14px] leading-8 text-[var(--muted)]">{section.body}</p>}
        {section.links && <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">{section.links.map((link) => <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 border-b border-[var(--anokhi)] pb-2 text-[10px] font-medium uppercase tracking-[0.11em] text-[var(--anokhi)]">{link.label}<ArrowUpRight size={14} weight="light" /></Link>)}</div>}
      </div>
    </div>
  );
}

function QuestionList({ questions }: { questions: NonNullable<PageSection["questions"]> }) {
  return <FAQBrowser questions={questions} />;
}

function StepList({ items }: { items: string[] }) {
  return <ol className="grid gap-x-10 gap-y-5 border-y border-[var(--line)] py-6 sm:grid-cols-2 lg:grid-cols-4">{items.map((item, index) => <li key={item} className="flex gap-4"><span className="font-editorial text-[24px] leading-none text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span><span className="text-[12px] leading-6 text-[var(--muted)]">{item}</span></li>)}</ol>;
}

function Guide({ section }: { section: PageSection }) {
  return <div>{section.bullets && <ul className="mb-6 grid gap-4 sm:grid-cols-2">{section.bullets.map((item) => <li key={item} className="border-t border-[var(--line)] py-4 text-[12px] leading-6 text-[var(--muted)]">{item}</li>)}</ul>}{section.body && <p className="mb-6 max-w-[65ch] text-[13px] leading-7 text-[var(--muted)]">{section.body}</p>}{section.links && <div className="flex flex-wrap gap-x-7 gap-y-3">{section.links.map((link) => <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.11em] text-[var(--anokhi)]">{link.label}<ArrowUpRight size={14} weight="light" /></Link>)}</div>}{section.title.toLowerCase().includes("measure") && <div className="mt-8"><RingSizeConverter /></div>}</div>;
}

function Trust({ section }: { section: PageSection }) {
  const items = section.bullets ?? [];
  return <div className="grid gap-0 border-y border-[var(--line)] sm:grid-cols-3">{items.map((item, index) => <div key={item} className="flex gap-4 border-b border-[var(--line)] py-5 sm:border-b-0 sm:py-7 sm:pr-6 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-6"><span className="font-editorial text-[25px] text-[var(--gold)]">0{index + 1}</span><p className="pt-1 text-[12px] leading-6 text-[var(--muted)]">{item}</p></div>)}</div>;
}

function ContactDetails({ section }: { section: PageSection }) {
  return <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center"><ul className="grid gap-5 sm:grid-cols-2">{(section.bullets ?? []).map((item) => <li key={item} className="border-t border-[var(--line)] pt-4 text-[12px] leading-6 text-[var(--muted)]">{item}</li>)}</ul><div className="flex min-h-[240px] items-end bg-[#eee9e7] p-6 sm:min-h-[300px]"><p className="max-w-[32ch] text-[12px] leading-6 text-[var(--muted)]">Map location will be added after Anokhi confirms the approved studio or store address.</p></div></div>;
}

function FormSection({ section, routeKey }: { section: PageSection; routeKey: string }) {
  return <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start"><p className="max-w-[35ch] text-[12px] leading-6 text-[var(--muted)]">{section.body}</p><div className="max-w-2xl">{routeKey === "account/login" ? <CustomerForm mode="login" /> : routeKey === "account/register" ? <CustomerForm mode="register" /> : <ContactForm />}</div></div>;
}

function EmptyCart() {
  return <CartView configured={isShopifyConfigured} />;
}

function SearchPanel() {
  return <form action="/search" className="flex max-w-2xl gap-3 border-b border-[var(--line)] pb-3"><label className="sr-only" htmlFor="store-search">Search rings and jewellery</label><input id="store-search" name="q" type="search" placeholder="Try a ring style, stone or material" className="min-h-12 min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-[var(--muted)]" /><button className="px-3 text-[10px] font-medium uppercase tracking-[0.1em] text-[var(--anokhi)]">Search</button></form>;
}

function CustomiserSummary({ section }: { section: PageSection }) {
  return <div className="grid gap-8 border-y border-[var(--line)] py-8 md:grid-cols-[1fr_0.8fr] md:items-center"><ol className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">{(section.bullets ?? []).map((item, index) => <li key={item} className="flex gap-3 text-[12px] text-[var(--muted)]"><span className="text-[10px] text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>{item.replace(/^\d+\s/, "")}</li>)}</ol><div className="border-l border-[var(--line)] pl-6"><p className="text-[12px] leading-6 text-[var(--muted)]">{section.body}</p><Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.11em] text-[var(--anokhi)]">Enquire about a custom ring <ArrowUpRight size={14} weight="light" /></Link></div></div>;
}

function LegalText({ section }: { section: PageSection }) {
  return <div className="max-w-3xl border-l-2 border-[var(--anokhi)] pl-5 sm:pl-7"><p className="text-[13px] leading-7 text-[var(--muted)]">{section.body}</p>{section.bullets && <ul className="mt-5 grid gap-3">{section.bullets.map((item) => <li key={item} className="text-[12px] leading-6 text-[var(--muted)]">{item}</li>)}</ul>}</div>;
}

function valueOf(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function buildProductQuery(base: string | undefined, searchParams: Record<string, string | string[] | undefined>, routeKey: string) {
  const filters = base ? [base] : [];
  const category = valueOf(searchParams.category).trim();
  if (category) filters.push(`tag:${quoteShopifyValue(category)}`);
  const query = valueOf(searchParams.q).trim();
  if (query) filters.push(`title:${quoteShopifyValue(query)}`);
  for (const key of ["metal", "stone", "diamond"]) {
    const value = valueOf(searchParams[key]).trim();
    if (value) filters.push(`tag:${quoteShopifyValue(value)}`);
  }
  const minPrice = Number(valueOf(searchParams.minPrice));
  const maxPrice = Number(valueOf(searchParams.maxPrice));
  if (Number.isFinite(minPrice) && minPrice > 0) filters.push(`price:>=${minPrice}`);
  if (Number.isFinite(maxPrice) && maxPrice > 0) filters.push(`price:<=${maxPrice}`);
  const ringSize = valueOf(searchParams.ringSize).trim();
  if (routeKey === "rings" && ringSize) filters.push(`variants.title:${quoteShopifyValue(ringSize)}`);
  if (valueOf(searchParams.availability) === "in-stock") filters.push("available_for_sale:true");
  return filters.join(" ") || undefined;
}

function quoteShopifyValue(value: string) {
  return `"${value.replace(/["\\]/g, "\\$&")}"`;
}

function EmptyEditorial({ body }: { body?: string }) {
  return <div className="border-y border-[var(--line)] py-8"><p className="max-w-[60ch] text-[12px] leading-6 text-[var(--muted)]">{body}</p></div>;
}

function SocialStrip() {
  const socialCards: PageLink[] = [
    { label: "Rings", href: "/rings", image: "heroRing" },
    { label: "Jewellery", href: "/jewellery", image: "earrings" },
    { label: "The craft", href: "/about", image: "craftsmanship" },
    { label: "Diamonds", href: "/diamond-education", image: "diamond" },
  ];
  return <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{socialCards.map((card) => <Link key={card.label} href={card.href} className="group relative aspect-square overflow-hidden rounded-[var(--media-radius)] bg-[#eee9e7]"><Image src={getPlaceholder(card.image)} alt={card.label} fill unoptimized sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" /><span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" /></Link>)}</div>;
}

function PromoBanner({ section }: { section: PageSection }) {
  return (
    <div className="relative grid min-h-[300px] items-end overflow-hidden rounded-[var(--media-radius)] bg-[#3a3438] sm:min-h-[380px]">
      <Image src={getPlaceholder(section.image)} alt={section.imageAlt || section.title} fill unoptimized sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />
      <div className="relative z-10 max-w-xl px-6 py-8 text-white sm:px-10 sm:py-12">
        <h2 className="font-editorial text-[38px] leading-[1.05] sm:text-[52px]">{section.title}</h2>
        {section.body && <p className="mt-3 max-w-[44ch] text-[12px] leading-6 text-white/80">{section.body}</p>}
        {section.links?.map((link) => <Link key={link.href} href={link.href} className="mt-6 inline-flex items-center gap-3 border-b border-white/70 pb-2 text-[10px] font-medium uppercase tracking-[0.12em]">{link.label}<ArrowUpRight size={14} weight="light" /></Link>)}
      </div>
    </div>
  );
}

function ImmersiveEditorial({ section }: { section: PageSection }) {
  return (
    <div className="editorial-visual group relative isolate overflow-hidden rounded-[var(--media-radius)] bg-[#292326]">
      <Image src={getPlaceholder(section.image)} alt={section.imageAlt || section.title} fill unoptimized sizes="(max-width: 767px) 100vw, 1400px" className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]" />
      <div className="page-hero-shade absolute inset-0" />
      <div className="relative z-10 flex min-h-[inherit] max-w-[620px] flex-col justify-end p-6 text-white sm:p-10 lg:p-14">
        <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.18em] text-white/70">Anokhi, by design</p>
        <h2 className="font-editorial max-w-[11ch] text-[clamp(38px,5.3vw,68px)] leading-[0.92] [text-wrap:balance]">{section.title}</h2>
        {section.body && <p className="mt-4 max-w-[43ch] text-[12px] leading-6 text-white/75 sm:text-[13px]">{section.body}</p>}
        {section.links && <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">{section.links.map((link) => <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 border-b border-white/55 pb-2 text-[10px] font-medium uppercase tracking-[0.11em] text-white transition-colors hover:border-white">{link.label}<ArrowUpRight size={14} weight="light" /></Link>)}</div>}
      </div>
    </div>
  );
}