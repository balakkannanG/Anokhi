"use client";

import { useEffect } from "react";

export default function StorefrontError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Anokhi storefront error", error.digest);
  }, [error.digest]);

  return (
    <main className="grid min-h-[65vh] place-items-center px-4 py-16 text-center" id="main-content">
      <div className="max-w-lg">
        <h1 className="display-face text-4xl text-charcoal">Something went wrong.</h1>
        <p className="mt-3 text-sm leading-6 text-coffee">The page could not be loaded just now. Please try again.</p>
        <button className="mt-6 min-h-11 bg-anokhi-plum px-5 text-[10px] tracking-[0.14em] text-ivory" onClick={reset} type="button">TRY AGAIN</button>
      </div>
    </main>
  );
}
