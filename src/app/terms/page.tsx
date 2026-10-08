import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/breadcrumbs";

export const metadata: Metadata = { title: "Terms & Conditions", robots: { index: false, follow: false } };

export default function TermsPage() {
  return <main className="page-shell min-h-[70vh] pb-16 pt-6 sm:pb-24 sm:pt-8" id="main-content"><Breadcrumbs items={[{ label: "Terms" }]} /><article className="mx-auto max-w-[800px] py-10 sm:py-14"><h1 className="display-face text-[clamp(2.5rem,5vw,4rem)] text-charcoal">Terms & Conditions.</h1><div className="mt-6 border border-taupe/45 bg-cream p-5 text-sm leading-6 text-coffee sm:p-7" role="status">Approved Anokhi terms have not been provided. This page is intentionally unpublished from search indexing and must be reviewed by the client or legal counsel before launch.</div></article></main>;
}
