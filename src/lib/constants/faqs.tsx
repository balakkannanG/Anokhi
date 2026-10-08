import Link from "next/link";

export const faqGroups = [
  { category: "Jewellery", questions: [
    { question: "What jewellery can I browse?", answer: <>The jewellery directory includes earrings, necklaces, pendants, bracelets, bangles and jewellery sets, subject to products published in Shopify.</> },
  ] },
  { category: "Rings", questions: [
    { question: "Where can I explore Anokhi rings?", answer: <>Start with the <Link className="underline underline-offset-4" href="/rings">Rings collection</Link>, then browse categories such as engagement, solitaire and wedding rings.</> },
    { question: "Can I customise a ring?", answer: <>The custom ring page introduces the choices to consider. Contact details and final customisation capabilities will be confirmed by Anokhi.</> },
  ] },
  { category: "Diamonds", questions: [
    { question: "What are the 4Cs?", answer: <>Cut, colour, clarity and carat are four common terms used to describe aspects of a diamond. Learn more in <Link className="underline underline-offset-4" href="/diamond-education">Diamond Education</Link>.</> },
  ] },
  { category: "Ring size", questions: [
    { question: "How can I find my ring size?", answer: <>See the <Link className="underline underline-offset-4" href="/ring-size-guide">Ring Size Guide</Link> for general measuring guidance. Confirm sizing options with Anokhi before purchase.</> },
  ] },
  { category: "Orders & payments", questions: [
    { question: "Where do I complete my order?", answer: <>Orders are completed through Shopify checkout. Current payment methods depend on the Shopify store configuration and your region.</> },
  ] },
  { category: "Shipping, returns & care", questions: [
    { question: "Where can I find delivery, return and care information?", answer: <>Approved Anokhi delivery, return, warranty and care details will be published once supplied. See <Link className="underline underline-offset-4" href="/shipping-returns">Shipping & Returns</Link>.</> },
  ] },
  { category: "Contact", questions: [
    { question: "How can I contact Anokhi?", answer: <>Visit the <Link className="underline underline-offset-4" href="/contact">Contact page</Link> to find the available ways to get in touch.</> },
  ] },
];
