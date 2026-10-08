import { NewsletterForm } from "@/components/forms/newsletter-form";

export function NewsletterSection() {
  return (
    <section className="px-4 py-12 sm:px-7 md:py-20 lg:px-10">
      <div className="mx-auto grid max-w-[1200px] gap-6 bg-cream px-5 py-8 sm:px-9 md:grid-cols-[1fr_0.85fr] md:items-center md:px-14 md:py-12">
        <div>
          <h2 className="display-face max-w-[13ch] text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.13] text-charcoal">The Anokhi Journal Letter.</h2>
          <p className="mt-3 max-w-[26rem] text-sm leading-6 text-coffee">A considered note on rings, jewellery and the stories we wear.</p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}
