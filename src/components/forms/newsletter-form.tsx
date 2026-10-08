"use client";

import { useState } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";

const signupAvailable = process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED === "true";

export function NewsletterForm() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!signupAvailable) return;
    setBusy(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string };
      setMessage(data.message ?? (response.ok ? "Thank you for subscribing." : "We could not complete the signup."));
      if (response.ok) setEmail("");
    } catch {
      setMessage("We could not complete the signup. Please try again later.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="w-full" onSubmit={submit}>
      <label className="mb-2 block text-xs font-medium text-charcoal" htmlFor="journal-email">Email address</label>
      <div className="flex min-h-12 border-b border-coffee">
        <Input
          autoComplete="email"
          className="h-auto min-w-0 flex-1 border-0 bg-transparent px-0 text-sm text-charcoal shadow-none placeholder:text-coffee/75 focus-visible:ring-0"
          disabled={!signupAvailable || busy}
          id="journal-email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
        <button
          className="inline-flex shrink-0 items-center gap-2 pl-4 text-[9px] font-semibold tracking-[0.12em] text-anokhi-plum disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!signupAvailable || busy || !email}
          type="submit"
        >
          {busy ? "SENDING" : "JOIN THE LETTER"}
          <ArrowUpRight aria-hidden="true" className="size-4" weight="light" />
        </button>
      </div>
      <p aria-live="polite" className="mt-3 min-h-5 text-[10px] leading-5 text-coffee">
        {message || (signupAvailable ? "Sign up to receive Anokhi notes." : "Newsletter signup is unavailable until an approved provider is connected.")}
      </p>
    </form>
  );
}
