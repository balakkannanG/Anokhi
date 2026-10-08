import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqGroups } from "@/lib/constants/faqs";

export const metadata: Metadata = { title: "Frequently asked questions" };

export default function FAQPage() {
  return (
    <main className="page-shell min-h-[70vh] pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content">
      <Breadcrumbs items={[{ label: "FAQ" }]} />
      <header className="py-10 sm:py-14"><h1 className="display-face text-[clamp(2.7rem,5vw,4.8rem)] text-charcoal">Frequently asked questions.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-coffee">A few starting points for rings, jewellery and the details around them.</p></header>
      <div className="mx-auto max-w-[920px]">
        {faqGroups.map((group) => (
          <section className="mb-8" key={group.category}>
            <h2 className="display-face mb-3 text-xl text-charcoal">{group.category}</h2>
            <Accordion className="border-t border-taupe/40" collapsible type="single">
              {group.questions.map((item, index) => (
                <AccordionItem className="border-b border-taupe/30" key={item.question} value={`${group.category}-${index}`}>
                  <AccordionTrigger className="py-4 text-left text-sm font-medium text-charcoal hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="max-w-[68ch] text-sm leading-6 text-coffee">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>
    </main>
  );
}
