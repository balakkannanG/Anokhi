"use client";

import { useMemo, useState } from "react";
import type { PageSection } from "@/lib/constants/page-content";

const faqCategories = ["All", "Rings", "Jewellery", "Diamonds", "Ring Size", "Customisation", "Orders", "Payments", "Shipping", "Returns", "Care", "Warranty"];

export function FAQBrowser({ questions }: { questions: NonNullable<PageSection["questions"]> }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const visibleQuestions = useMemo(() => questions.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesQuery = `${item.question} ${item.answer}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query, questions]);

  return (
    <div>
      <label className="mb-5 flex max-w-xl items-center border-b border-[var(--line)]">
        <span className="sr-only">Search frequently asked questions</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search a question" className="min-h-12 w-full bg-transparent text-[13px] outline-none placeholder:text-[var(--muted)]" />
      </label>
      <div role="tablist" aria-label="FAQ categories" className="mb-7 flex gap-2 overflow-x-auto pb-2">
        {faqCategories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={`shrink-0 border px-4 py-2 text-[10px] transition-colors ${category === item ? "border-[var(--anokhi)] bg-[var(--anokhi)] text-white" : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--anokhi)] hover:text-[var(--anokhi)]"}`}>{item}</button>)}
      </div>
      <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {visibleQuestions.map((item) => <details key={item.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[13px] text-[var(--ink)]"><span>{item.question}</span><span aria-hidden="true" className="text-[var(--anokhi)] transition-transform group-open:rotate-45">+</span></summary><p className="max-w-[70ch] pt-4 text-[12px] leading-6 text-[var(--muted)]">{item.answer}</p></details>)}
        {visibleQuestions.length === 0 && <p className="py-8 text-[12px] text-[var(--muted)]">No answers matched. Try another search or category.</p>}
      </div>
    </div>
  );
}