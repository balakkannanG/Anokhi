import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = { title: "Shipping & Returns", robots: { index: false, follow: true } };

const topics = ["Shipping", "Delivery", "Returns", "Exchange", "Cancellation", "Custom ring rules", "Jewellery rules", "Warranty", "Care"];

export default function ShippingReturnsPage() {
  return (
    <main className="page-shell min-h-[70vh] pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content">
      <Breadcrumbs items={[{ label: "Shipping & Returns" }]} />
      <header className="py-10 sm:py-14"><h1 className="display-face text-[clamp(2.6rem,5vw,4.6rem)] text-charcoal">Shipping & Returns.</h1><p className="mt-3 max-w-[44rem] text-sm leading-6 text-coffee">Information about delivery and care will appear here after approved Anokhi policies are supplied.</p></header>
      <div className="mx-auto max-w-[900px] border-t border-taupe/40">
        {topics.map((topic, index) => (
          <section className="border-b border-taupe/35" key={topic}>
            <h2 className="sr-only">{topic}</h2>
            <Accordion collapsible type="single">
              <AccordionItem className="border-0" value={`topic-${index}`}>
                <AccordionTrigger className="display-face py-4 text-left text-xl font-normal text-charcoal hover:no-underline">{topic}</AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-coffee">Client-approved {topic.toLowerCase()} details are pending. Please do not rely on this page for order terms until Anokhi publishes its policy.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        ))}
      </div>
    </main>
  );
}
