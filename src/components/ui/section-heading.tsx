import Link from "next/link";

export function SectionHeading({
  title,
  description,
  href,
  linkLabel,
  dark = false,
}: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  dark?: boolean;
}) {
  return (
    <div className={`flex items-end justify-between gap-5 border-b pb-4 sm:pb-5 ${dark ? "border-ivory/25" : "border-taupe/45"}`}>
      <div>
        <h2 className={`display-face text-[clamp(1.9rem,4vw,3.25rem)] leading-tight ${dark ? "text-ivory" : "text-anokhi-plum"}`}>
          {title}
        </h2>
        {description ? (
          <p className={`mt-3 max-w-[42rem] text-sm leading-6 ${dark ? "text-ivory/75" : "text-anokhi-plum"}`}>
            {description}
          </p>
        ) : null}
      </div>
      {href && linkLabel ? (
        <Link className={`quiet-link mb-1 hidden shrink-0 text-[10px] tracking-[0.14em] sm:inline-block ${dark ? "text-ivory" : "text-anokhi-plum"}`} href={href}>
          {linkLabel} <span aria-hidden="true">↗</span>
        </Link>
      ) : null}
    </div>
  );
}
