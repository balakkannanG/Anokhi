import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";

export interface CategoryCardData {
  label: string;
  description: string;
  href: string;
  image: { src: string; alt: string };
}

export function CategoryCard({ category }: { category: CategoryCardData }) {
  return (
    <Link className="group block min-w-0" href={category.href}>
      <div className="photo-well relative aspect-[0.83] rounded-[13px] bg-ivory">
        <Image
          alt={category.image.alt}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
          fill
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 18vw"
          src={category.image.src}
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="display-face text-[18px] text-anokhi-plum sm:text-xl">{category.label}</h3>
          <p className="mt-1 max-w-[20rem] text-[11px] leading-5 text-anokhi-plum sm:text-xs">{category.description}</p>
        </div>
        <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-anokhi-plumtransition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" weight="light" />
      </div>
    </Link>
  );
}
