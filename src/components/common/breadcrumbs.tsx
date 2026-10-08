import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[11px] text-coffee">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li><Link className="hover:text-anokhi-plum" href="/">Home</Link></li>
        {items.map((item, index) => (
          <li className="inline-flex items-center gap-2" key={`${item.label}-${index}`}>
            <span aria-hidden="true" className="text-taupe">/</span>
            {item.href ? (
              <Link className="hover:text-anokhi-plum" href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page" className="text-charcoal">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
