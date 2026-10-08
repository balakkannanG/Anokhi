import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { CollectionsShowcase } from "@/components/collection/collections-showcase";
import { TimelessCollection } from "@/components/collection/timeless-collection";
import { AnokhiSignatureCollection } from "@/components/collection/anokhi-signature-collection";
import { PersonalizingCollection } from "@/components/collection/personalizing-collection";

const collectionNames = {
  timeless: "Timeless",
  "anokhi-collection": "Anokhi Collection",
  personalizing: "Personalizing",
} as const;

type CollectionId = keyof typeof collectionNames;

function isCollectionId(value: string | undefined): value is CollectionId {
  return value === "timeless" || value === "anokhi-collection" || value === "personalizing";
}

export const metadata: Metadata = {
  title: "Anokhi Collections",
  description: "Explore Timeless, Anokhi Collection, and Personalizing: three edits of fine jewellery by Anokhi.",
};

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const { collection } = await searchParams;
  const selectedCollection = isCollectionId(collection) ? collection : undefined;

  return (
    <main id="main-content">
      <div className="page-shell pt-6 sm:pt-8">
        <Breadcrumbs items={[{ label: "Collections" }]} />
      </div>
      <header className="page-shell py-9 sm:py-12">
        <p className="eyebrow">The Anokhi world</p>
        <h1 className="display-face mt-3 text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-charcoal">
          {selectedCollection ? collectionNames[selectedCollection] : "A rare collection. A forever feeling."}
        </h1>
        <p className="body-copy mt-4 max-w-3xl">
          {selectedCollection
            ? `Explore the ${collectionNames[selectedCollection]} edit: considered jewellery designed to become part of your story.`
            : "Explore enduring ring designs, signature jewellery, and pieces you can make personal."}
        </p>
      </header>
      {selectedCollection === "timeless" ? <TimelessCollection /> : null}
      {selectedCollection === "anokhi-collection" ? <AnokhiSignatureCollection /> : null}
      {selectedCollection === "personalizing" ? <PersonalizingCollection /> : null}
      {!selectedCollection ? <CollectionsShowcase /> : null}
    </main>
  );
}
