import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { CustomRingBuilder } from "@/components/custom-ring/custom-ring-builder";

export const metadata: Metadata = { title: "Customise Your Ring" };

export default function CustomiseYourRingPage() {
  return (
    <main className="page-shell pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content">
      <Breadcrumbs items={[{ label: "Customise Your Ring" }]} />
      <header className="py-10 sm:py-14">
        <h1 className="display-face text-[clamp(2.6rem,5vw,4.6rem)] text-charcoal">Begin with a ring.</h1>
        <p className="mt-3 max-w-[42rem] text-sm leading-6 text-coffee">Explore a selection of choices. This preview does not calculate a price or create a Shopify product.</p>
      </header>
      <CustomRingBuilder />
    </main>
  );
}
