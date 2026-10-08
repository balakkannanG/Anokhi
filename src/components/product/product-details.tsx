import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Product } from "@/lib/shopify/types";

export function ProductDetails({ product }: { product: Product }) {
  const groups = [
    { value: "details", title: "Product details", content: product.description || "Further product details are not yet available in the Shopify listing." },
    { value: "materials", title: "Materials & details", content: product.productType || "Materials and product details will be shown here when provided in Shopify." },
    { value: "shipping", title: "Delivery & returns", content: "Current delivery and return information will be provided by Anokhi. Shopify checkout displays available delivery options for your order." },
    { value: "care", title: "Care", content: "Product care guidance will appear here when supplied by Anokhi." },
  ];
  return (
    <section aria-label="Product information" className="mt-10 border-t border-taupe/45 pt-5">
      <Accordion className="w-full" collapsible type="single">
        {groups.map((item) => (
          <AccordionItem className="border-b border-taupe/35" key={item.value} value={item.value}>
            <AccordionTrigger className="py-4 text-left text-sm font-medium text-charcoal hover:no-underline">{item.title}</AccordionTrigger>
            <AccordionContent className="text-sm leading-6 text-coffee">{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
