import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[65vh] place-items-center px-4 py-16 text-center" id="main-content">
      <div className="max-w-lg">
        <p className="eyebrow">ANOKHI</p>
        <h1 className="display-face mt-4 text-5xl text-charcoal">This page is not here.</h1>
        <p className="mt-4 text-sm leading-6 text-coffee">The collection or page may have moved. Explore Anokhi jewellery or return to the beginning.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link className="flex min-h-11 items-center bg-anokhi-plum px-5 text-[10px] tracking-[0.14em] text-ivory" href="/jewellery">EXPLORE JEWELLERY</Link>
          <Link className="flex min-h-11 items-center border border-taupe/60 px-5 text-[10px] tracking-[0.14em] text-charcoal" href="/">ANOKHI HOME</Link>
        </div>
      </div>
    </main>
  );
}
