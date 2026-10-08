import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/ui/reveal";
import { placeholderImages } from "@/lib/constants/placeholder-images";

export const metadata: Metadata = {
  title: "Contact Anokhi",
  robots: { index: false, follow: true },
};

const contactDetails = [
  { title: "Phone", detail: "Our phone number will be shared soon." },
  { title: "WhatsApp", detail: "WhatsApp support details are coming soon." },
  { title: "Email", detail: "Our email address will be shared soon." },
  { title: "Visit", detail: "Our confirmed store address will be shared soon." },
];

export default function ContactPage() {
  return (
    <main className="pb-16 sm:pb-24" id="main-content">
      <div className="page-shell pt-6 sm:pt-8">
        <Breadcrumbs items={[{ label: "Contact" }]} />
      </div>

      <section aria-labelledby="contact-heading" className="relative isolate mt-5 overflow-hidden bg-charcoal text-parchment sm:mt-7">
        <Image
          alt=""
          className="object-cover object-center opacity-35"
          fill
          priority
          sizes="100vw"
          src={placeholderImages.model.src}
        />
        <div aria-hidden="true" className="absolute inset-0 z-0 bg-gradient-to-r from-charcoal via-charcoal/75 to-charcoal/30" />
        <div className="page-shell relative z-10 flex min-h-[300px] items-center py-14 sm:min-h-[370px] sm:py-20 md:min-h-[430px]">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-parchment/75">We’re here for you</p>
            <h1
              className="display-face mt-4 text-[clamp(2.8rem,6vw,5.6rem)] leading-[1.04]"
              id="contact-heading"
            >
              Let&apos;s start a conversation.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-parchment/80 sm:text-base">
              Questions about a piece, a collection, or a personal design? We would love to hear what matters to you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="page-shell grid gap-10 pt-12 sm:pt-16 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:pt-20">
        <Reveal>
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="display-face mt-3 text-3xl text-charcoal sm:text-4xl">
              We&apos;d love to hear from you.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-coffee">
              Our contact channels are being finalized. We&apos;re preparing the enquiry form and will share contact options as soon as they are confirmed.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-7">
            {contactDetails.map((item, index) => (
              <Reveal delay={index * 0.08} key={item.title}>
                <div className="h-full border-t border-taupe/50 pt-3">
                  <h3 className="display-face text-xl text-charcoal">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-coffee">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            aria-label="Contact Anokhi form"
            className="grid gap-5 bg-cream p-5 sm:p-8"
          >
            <div>
              <p className="eyebrow">A note to Anokhi</p>
              <h2 className="display-face mt-2 text-3xl text-charcoal">Send us a message.</h2>
              <p className="mt-2 text-sm leading-6 text-coffee">
                The form will be enabled when an approved Anokhi recipient is configured.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-name">Your name</Label>
              <Input autoComplete="name" disabled id="contact-name" name="name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-email">Email address</Label>
              <Input autoComplete="email" disabled id="contact-email" name="email" type="email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-subject">What can we help you with?</Label>
              <Input disabled id="contact-subject" name="subject" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-message">Your message</Label>
              <textarea
                className="min-h-32 resize-y border border-taupe/55 bg-ivory p-3 text-sm text-charcoal outline-none focus:border-anokhi-plum disabled:cursor-not-allowed disabled:opacity-50"
                disabled
                id="contact-message"
                name="message"
              />
            </div>
            <button
              className="min-h-12 bg-anokhi-plum px-5 text-xs font-semibold tracking-[0.14em] text-ivory opacity-50"
              disabled
              type="submit"
            >
              CONTACT FORM COMING SOON
            </button>
          </form>
        </Reveal>
      </section>
    </main>
  );
}
