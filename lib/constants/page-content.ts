import type { ShopifyProduct } from "@/lib/shopify/types";

export type PageSectionKind =
  | "categories"
  | "products"
  | "collections"
  | "editorial"
  | "promo"
  | "newsletter"
  | "faq"
  | "contact"
  | "form"
  | "steps"
  | "guide"
  | "trust"
  | "gallery"
  | "testimonials"
  | "social"
  | "journal"
  | "account"
  | "cart"
  | "search"
  | "customiser"
  | "legal"
  | "filters";

export interface PageLink {
  label: string;
  href: string;
  description?: string;
  image?: string;
}

export interface PageSection {
  kind: PageSectionKind;
  title: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  links?: PageLink[];
  bullets?: string[];
  questions?: Array<{ question: string; answer: string; category?: string }>;
  query?: string;
  note?: string;
}

export interface PageDefinition {
  title: string;
  description: string;
  eyebrow?: string;
  heroImage?: string;
  cta?: PageLink;
  sections: PageSection[];
}

const rings: PageLink[] = [
  { label: "Engagement", href: "/rings?category=engagement", description: "A promise, made personal.", image: "engagementRing" },
  { label: "Solitaire", href: "/rings?category=solitaire", description: "One stone. A thousand meanings.", image: "solitaireRing" },
  { label: "Diamond", href: "/rings?category=diamond", description: "A little light, made lasting.", image: "diamond" },
  { label: "Wedding", href: "/rings?category=wedding", description: "The beginning of always.", image: "weddingRing" },
  { label: "Couple", href: "/rings?category=couple", description: "Two stories, one keepsake.", image: "heroRing" },
  { label: "Eternity", href: "/rings?category=eternity", description: "A circle without an ending.", image: "solitaireRing" },
];

const jewellery: PageLink[] = [
  { label: "Earrings", href: "/jewellery?type=earrings", description: "A detail that changes everything.", image: "earrings" },
  { label: "Necklaces", href: "/jewellery?type=necklaces", description: "Close to the heart.", image: "necklace" },
  { label: "Pendants", href: "/jewellery?type=pendants", description: "A quiet signature.", image: "jewellerySet" },
  { label: "Bracelets", href: "/jewellery?type=bracelets", description: "Made to move with you.", image: "bracelet" },
  { label: "Bangles", href: "/jewellery?type=bangles", description: "A little music at your wrist.", image: "bangle" },
  { label: "Jewellery Sets", href: "/jewellery?type=sets", description: "The whole occasion, considered.", image: "jewellerySet" },
];

const ringCategoryLinks: PageLink[] = [
  { label: "All rings", href: "/rings" },
  ...["Engagement", "Solitaire", "Diamond", "Wedding", "Couple", "Eternity", "Bridal", "Statement", "Custom"].map((label) => ({
    label,
    href: `/rings?category=${label.toLowerCase()}`,
  })),
];

const jewelleryCategoryLinks: PageLink[] = [
  { label: "All jewellery", href: "/jewellery" },
  ...["Earrings", "Necklaces", "Pendants", "Bracelets", "Bangles", "Jewellery Sets"].map((label) => ({
    label,
    href: `/jewellery?type=${label.toLowerCase().replaceAll(" ", "-")}`,
  })),
];

const productShelf = (title: string, query?: string): PageSection => ({
  kind: "products",
  title,
  query,
  body: "Discover considered pieces, made to stay with you.",
});

const newsletter: PageSection = {
  kind: "newsletter",
  title: "A note from Anokhi",
  body: "New pieces, thoughtful stories and a little inspiration, sent occasionally.",
};

export const PAGE_CONTENT: Record<string, PageDefinition> = {
  home: {
    title: "A ring worth remembering",
    description: "Timeless jewellery designed for unforgettable moments.",
    sections: [
      { kind: "categories", title: "Find your perfect ring", body: "Begin with the shape of the moment. Explore the Anokhi ring collection.", links: rings },
      productShelf("The Anokhi signature", "product_type:ring"),
      { kind: "categories", title: "Beyond the ring", body: "Discover jewellery designed to complete every unforgettable moment.", links: jewellery },
      productShelf("New arrivals", "available_for_sale:true"),
      productShelf("Best sellers", "product_type:ring"),
      { kind: "promo", title: "Hold on to the moment", body: "Find the piece that will bring you back to it.", image: "solitaireRing", links: [{ label: "Explore rings", href: "/rings" }] },
      { kind: "editorial", title: "A moment, made yours", body: "Jewellery is more than what we wear. It is the small, shining marker of a life being lived. Anokhi creates pieces to hold those moments close.", image: "craftsmanship", imageAlt: "A jeweller's hands at work", links: [{ label: "Our story", href: "/about" }] },
      { kind: "trust", title: "Considered in every detail", bullets: ["Thoughtful design", "Carefully selected materials", "Guidance from first question to forever"] },
      { kind: "editorial", title: "A little more about diamonds", body: "Learn how cut, colour, clarity and carat come together, and find the details that matter to you.", image: "diamond", imageAlt: "A close study of a diamond", links: [{ label: "Diamond education", href: "/diamond-education" }] },
      { kind: "editorial", title: "Your ring, your way", body: "Start a conversation about a ring made around the details that feel like you.", image: "heroRing", imageAlt: "An Anokhi ring", links: [{ label: "Customise your ring", href: "/customise-your-ring" }] },
      { kind: "guide", title: "A guide to finding your ring", body: "From choosing a setting to finding the right fit, take each step at your own pace.", links: [{ label: "Ring size guide", href: "/ring-size-guide" }, { label: "Shop rings", href: "/rings" }] },
      { kind: "testimonials", title: "Words kept close", body: "Customer stories and reviews will appear here once connected to the store." },
      { kind: "social", title: "The Anokhi moments", body: "A view into the pieces, people and occasions that make this collection yours." },
      { kind: "journal", title: "The journal", body: "Notes on design, meaningful milestones and the details that make a piece personal.", links: [{ label: "Visit the journal", href: "/journal" }] },
      newsletter,
    ],
  },
  rings: {
    title: "Rings, made to remember",
    description: "Discover engagement, wedding, diamond and signature rings from Anokhi.",
    eyebrow: "The ring collection",
    heroImage: "heroRing",
    cta: { label: "Explore rings", href: "/rings" },
    sections: [
      { kind: "categories", title: "Find your kind of ring", links: ringCategoryLinks },
      productShelf("Featured rings", "product_type:ring"),
      { kind: "filters", title: "Find the details that matter", body: "Filter rings by category, metal, stone, size and availability." },
      productShelf("All rings", "product_type:ring"),
      { kind: "guide", title: "The ring buying guide", body: "Explore the details that help you choose with confidence.", links: [{ label: "Find your size", href: "/ring-size-guide" }, { label: "Understand diamonds", href: "/diamond-education" }, { label: "Create your ring", href: "/customise-your-ring" }] },
      newsletter,
    ],
  },
  jewellery: {
    title: "The jewellery collection",
    description: "Pieces designed to be worn, loved and remembered.",
    eyebrow: "Beyond the ring",
    heroImage: "earrings",
    cta: { label: "Shop jewellery", href: "/jewellery" },
    sections: [
      { kind: "categories", title: "Shop by type", links: jewelleryCategoryLinks },
      productShelf("Featured jewellery", "product_type:jewellery"),
      productShelf("New jewellery", "product_type:jewellery"),
      productShelf("Best sellers", "product_type:jewellery"),
      { kind: "editorial", title: "Made to be part of your story", body: "The pieces we return to are the ones that feel like our own. Explore jewellery chosen for its quiet character and lasting place in everyday life.", image: "craftsmanship", imageAlt: "Fine jewellery being carefully made" },
      { kind: "categories", title: "A closer look", body: "Choose a shape, a detail or a feeling. There is more than one way into the collection.", links: jewellery },
      newsletter,
    ],
  },
  shop: {
    title: "The Anokhi collection",
    description: "Explore rings and fine jewellery, thoughtfully brought together.",
    eyebrow: "Shop all",
    heroImage: "heroRing",
    cta: { label: "Shop rings", href: "/rings" },
    sections: [
      { kind: "categories", title: "Choose your collection", links: [{ label: "All pieces", href: "/shop" }, { label: "Rings", href: "/rings", image: "heroRing" }, { label: "Jewellery", href: "/jewellery", image: "earrings" }] },
      { kind: "filters", title: "Refine your search", body: "Filter by category, material, metal, stone, diamond, ring size and availability." },
      productShelf("All pieces"),
      { kind: "editorial", title: "Designed for the moments that stay", body: "Find a piece with a story, or begin creating one of your own.", image: "craftsmanship", imageAlt: "Anokhi craftsmanship", links: [{ label: "Our story", href: "/about" }] },
      newsletter,
    ],
  },
  collections: {
    title: "Collections, gathered with care",
    description: "Explore the signatures, moments and forms that shape the Anokhi collection.",
    eyebrow: "Discover Anokhi",
    heroImage: "craftsmanship",
    cta: { label: "Shop all", href: "/shop" },
    sections: [
      { kind: "collections", title: "Find your collection", links: [
        { label: "Ring collections", href: "/rings", image: "heroRing" },
        { label: "Jewellery collections", href: "/jewellery", image: "earrings" },
        { label: "New arrivals", href: "/shop?sort=created_at", image: "necklace" },
        { label: "Best sellers", href: "/shop?sort=best_selling", image: "bracelet" },
        { label: "Bridal", href: "/rings?category=bridal", image: "weddingRing" },
        { label: "The signature", href: "/rings", image: "solitaireRing" },
      ] },
      newsletter,
    ],
  },
  about: {
    title: "The Anokhi story",
    description: "A considered approach to jewellery, meaningful moments and lasting design.",
    eyebrow: "About Anokhi",
    heroImage: "craftsmanship",
    cta: { label: "Explore the rings", href: "/rings" },
    sections: [
      { kind: "editorial", title: "A story told in small details", body: "Anokhi is built around a simple belief: the pieces we keep closest are the ones that carry something of us. We design jewellery with a sense of occasion and a place in everyday life.", image: "craftsmanship", imageAlt: "Jewellery craft in progress" },
      { kind: "editorial", title: "Our philosophy", body: "Thoughtful design begins with listening. We value clarity, considered materials and pieces that feel personal rather than passing.", image: "jewellerySet", imageAlt: "A fine jewellery detail" },
      { kind: "editorial", title: "Why rings", body: "A ring can mark a promise, a change or simply a moment when something felt right. That closeness is where our work begins.", image: "heroRing", imageAlt: "An engagement ring" },
      { kind: "editorial", title: "Jewellery with intention", body: "Everyday pieces and occasion jewellery are designed with the same attention to proportion, comfort and character.", image: "earrings", imageAlt: "An Anokhi jewellery piece" },
      { kind: "editorial", title: "Craftsmanship", body: "The finish, setting and feel of a piece matter as much as the first impression. We keep the making process at the heart of every design.", image: "craftsmanship", imageAlt: "A jeweller at work" },
      { kind: "trust", title: "Our diamond standards", body: "Material and certification details will be published alongside verified product information from the Anokhi team.", bullets: ["Verified product details", "Clear material information", "Care guidance for every piece"] },
      { kind: "gallery", title: "Behind the craft", body: "A closer look at the design process and the hands behind the collection.", links: [{ label: "Diamond education", href: "/diamond-education", image: "diamond" }, { label: "Shop jewellery", href: "/jewellery", image: "necklace" }] },
      { kind: "editorial", title: "Made for your story", body: "The right piece is the one that becomes part of your own story.", image: "solitaireRing", imageAlt: "A ring from the Anokhi collection", links: [{ label: "Find your ring", href: "/rings" }] },
      newsletter,
    ],
  },
  contact: {
    title: "We would love to hear from you",
    description: "Questions about a piece, finding your size or a special order? Start a conversation with Anokhi.",
    eyebrow: "Contact Anokhi",
    heroImage: "craftsmanship",
    cta: { label: "Send a message", href: "#contact-form" },
    sections: [
      { kind: "contact", title: "A few ways to reach us", body: "Contact details are placeholders until approved by the Anokhi team.", bullets: ["Phone: details to be confirmed", "WhatsApp: details to be confirmed", "Email: details to be confirmed", "Address: details to be confirmed"] },
      { kind: "editorial", title: "Visit us", body: "Store address and map will be added when the approved location is available.", image: "craftsmanship", imageAlt: "Anokhi studio" },
      { kind: "form", title: "Send us a note", body: "Tell us how we can help and the team will be in touch once contact routing is connected." },
      { kind: "guide", title: "A quick answer, perhaps?", links: [{ label: "Frequently asked questions", href: "/faq" }, { label: "Shipping and returns", href: "/shipping-returns" }] },
      newsletter,
    ],
  },
  faq: {
    title: "Frequently asked questions",
    description: "Helpful answers about rings, jewellery, diamonds, orders and care.",
    eyebrow: "Here to help",
    sections: [
      { kind: "faq", title: "A few helpful answers", questions: [
        { question: "How do I find my ring size?", answer: "Use the Anokhi ring size guide for measuring advice and a size conversion reference. For a close fit, contact the team before ordering.", category: "Ring Size" },
        { question: "Can I customise a ring?", answer: "Customisation options and pricing need confirmation from the Anokhi team. Start an enquiry and they can discuss what is available.", category: "Customisation" },
        { question: "How can I learn about a diamond?", answer: "The diamond education guide explains the 4Cs and common diamond shapes. Product-specific certification details will be shown only when verified.", category: "Diamonds" },
        { question: "When will my order arrive?", answer: "Delivery timelines are awaiting approval. Please contact Anokhi for current estimates before placing an order.", category: "Shipping" },
        { question: "What is the return policy?", answer: "Return and exchange terms are placeholders pending client approval. Review the shipping and returns page and confirm details with Anokhi.", category: "Returns" },
        { question: "How should I care for my jewellery?", answer: "Care varies by material and setting. Follow the product care information supplied with your piece and contact the team if you are unsure.", category: "Care" },
      ] },
      { kind: "guide", title: "Still have a question?", links: [{ label: "Contact Anokhi", href: "/contact" }, { label: "Shipping and returns", href: "/shipping-returns" }] },
    ],
  },
  "shipping-returns": {
    title: "Shipping and returns",
    description: "Delivery, exchanges, returns and care information for Anokhi pieces.",
    eyebrow: "The practical details",
    sections: [
      { kind: "legal", title: "Policy information", body: "The sections below are placeholders and require client approval before publication.", bullets: ["Shipping and delivery: awaiting approved terms", "Returns and exchanges: awaiting approved terms", "Cancellations: awaiting approved terms", "Custom ring conditions: awaiting approved terms", "Jewellery conditions: awaiting approved terms", "Warranty and care: awaiting approved terms"] },
      { kind: "guide", title: "Need help with an order?", links: [{ label: "Contact Anokhi", href: "/contact" }, { label: "Frequently asked questions", href: "/faq" }] },
    ],
  },
  "ring-size-guide": {
    title: "Find your ring size",
    description: "A practical guide to measuring, comparing and choosing your Anokhi ring size.",
    eyebrow: "A comfortable fit",
    heroImage: "heroRing",
    sections: [
      { kind: "steps", title: "How to measure", bullets: ["Wrap a narrow strip of paper around the finger where your ring will sit.", "Mark where the paper meets, then measure the length in millimetres.", "Measure more than once, later in the day, when your hands are warm.", "Use the circumference as a guide and confirm with Anokhi before ordering."] },
      { kind: "guide", title: "A few useful tips", bullets: ["Measure the finger you plan to wear the ring on.", "A wider band may feel snugger than a narrow band.", "If you are between sizes, contact Anokhi for guidance.", "Finger size can change with temperature and time of day."] },
      { kind: "legal", title: "Size conversion", body: "International size conversion varies between standards. The confirmed Anokhi size chart will be added after client review." },
      { kind: "faq", title: "Common questions", questions: [
        { question: "Can I print a ring sizer?", answer: "A printable sizer will be provided once its scale has been verified for print accuracy.", category: "Ring Size" },
        { question: "What if I am between sizes?", answer: "Contact Anokhi before ordering. The best choice depends on the band width and the fit you prefer.", category: "Ring Size" },
      ] },
    ],
  },
  "diamond-education": {
    title: "A closer look at diamonds",
    description: "Learn about cut, colour, clarity, carat, diamond shapes and certification.",
    eyebrow: "Diamond education",
    heroImage: "diamond",
    cta: { label: "Customise a ring", href: "/customise-your-ring" },
    sections: [
      { kind: "editorial", title: "What gives a diamond its character?", body: "A diamond's appearance is shaped by the way it is cut, its colour and clarity, its carat weight and the light around it. Product details and certification should always be checked against the individual stone.", image: "diamond", imageAlt: "A close-up diamond study" },
      { kind: "categories", title: "The 4Cs", links: ["Cut", "Colour", "Clarity", "Carat"].map((label) => ({ label, href: `#${label.toLowerCase()}`, description: `Learn what ${label.toLowerCase()} means when comparing diamonds.` })) },
      { kind: "guide", title: "Cut", body: "Cut describes how a diamond's proportions and finish return light. It is distinct from shape." },
      { kind: "guide", title: "Colour", body: "Colour grading compares how close a white diamond is to colourless. Compare stones under consistent lighting." },
      { kind: "guide", title: "Clarity", body: "Clarity describes internal and surface characteristics. Their visibility depends on the stone and viewing conditions." },
      { kind: "guide", title: "Carat", body: "Carat is a unit of weight, not a direct measure of visible size. Shape and cut also influence how large a diamond appears." },
      { kind: "categories", title: "Diamond shapes", links: ["Round", "Oval", "Pear", "Emerald", "Cushion", "Marquise"].map((label) => ({ label, href: "/rings?category=diamond", description: `Explore ${label.toLowerCase()}-shaped diamond rings.` })) },
      { kind: "legal", title: "Certification and care", body: "Certification details must match the individual stone and will be displayed with verified Shopify product data. Ask for care guidance specific to your setting." },
      { kind: "editorial", title: "Choose what matters to you", body: "There is no single right combination. Begin with the details that feel most important, then explore the rings that bring them together.", image: "heroRing", imageAlt: "A diamond ring", links: [{ label: "Explore rings", href: "/rings" }] },
    ],
  },
  "customise-your-ring": {
    title: "Create a ring that feels like yours",
    description: "A guided starting point for exploring a custom Anokhi ring.",
    eyebrow: "Custom ring enquiry",
    heroImage: "heroRing",
    cta: { label: "Start an enquiry", href: "/contact" },
    sections: [
      { kind: "customiser", title: "Your ring, your way", body: "Ring styles, diamond options, metals and pricing are being confirmed by the Anokhi team. Start an enquiry to discuss your preferences; no unapproved options or prices are shown here.", bullets: ["01 Ring style", "02 Diamond shape", "03 Diamond", "04 Carat", "05 Colour", "06 Clarity", "07 Setting", "08 Metal", "09 Ring size", "10 Engraving", "11 Review"] },
      { kind: "guide", title: "Prefer to talk it through?", links: [{ label: "Contact Anokhi", href: "/contact" }, { label: "Ring size guide", href: "/ring-size-guide" }] },
    ],
  },
  "account/login": {
    title: "Welcome back",
    description: "Sign in to your Anokhi account.",
    eyebrow: "My Anokhi",
    heroImage: "earrings",
    sections: [{ kind: "form", title: "Sign in", body: "Customer authentication is ready to connect to Shopify. Passwords are sent only to Shopify and are never stored by Anokhi." }, { kind: "guide", title: "New to Anokhi?", links: [{ label: "Create an account", href: "/account/register" }, { label: "Forgot password", href: "/account/login?forgot=1" }] }],
  },
  "account/register": {
    title: "Create your Anokhi account",
    description: "Keep your order details and account information together.",
    eyebrow: "Join Anokhi",
    heroImage: "craftsmanship",
    sections: [{ kind: "form", title: "Your details", body: "Account creation will use Shopify customer authentication. Passwords are never stored by Anokhi." }, { kind: "guide", title: "Already have an account?", links: [{ label: "Sign in", href: "/account/login" }] }],
  },
  account: {
    title: "Your account",
    description: "Orders, addresses, profile details and saved pieces.",
    eyebrow: "My Anokhi",
    sections: [{ kind: "account", title: "Your Anokhi account", links: [{ label: "Orders", href: "/account/orders" }, { label: "Addresses", href: "/account/addresses" }, { label: "Wishlist", href: "/account#wishlist" }, { label: "Profile and settings", href: "/account#profile" }] }],
  },
  "account/orders": {
    title: "Your orders",
    description: "A history of your Anokhi orders.",
    eyebrow: "My Anokhi",
    sections: [{ kind: "account", title: "Order history", body: "Sign in to Shopify customer accounts to view your orders.", links: [{ label: "Sign in", href: "/account/login" }, { label: "Continue shopping", href: "/shop" }] }],
  },
  "account/addresses": {
    title: "Your addresses",
    description: "Manage the addresses associated with your Anokhi account.",
    eyebrow: "My Anokhi",
    sections: [{ kind: "account", title: "Saved addresses", body: "Sign in to Shopify customer accounts to manage your addresses.", links: [{ label: "Sign in", href: "/account/login" }, { label: "Contact Anokhi", href: "/contact" }] }],
  },
  cart: {
    title: "Your shopping bag",
    description: "Review your selected Anokhi pieces and continue to secure checkout.",
    eyebrow: "Shopping bag",
    sections: [{ kind: "cart", title: "Your bag" }, productShelf("You may also like", "product_type:ring")],
  },
  search: {
    title: "Search Anokhi",
    description: "Search rings and fine jewellery from Anokhi.",
    eyebrow: "Find your piece",
    sections: [{ kind: "search", title: "Search the collection" }, productShelf("Search results")],
  },
  journal: {
    title: "The Anokhi journal",
    description: "Notes on jewellery, design and the moments that become part of your story.",
    eyebrow: "Stories and notes",
    heroImage: "craftsmanship",
    sections: [{ kind: "journal", title: "A journal in progress", body: "Stories will appear here as the Anokhi journal is prepared." }, newsletter],
  },
  "care-guide": {
    title: "Jewellery care guide",
    description: "Thoughtful care helps preserve the finish and character of your jewellery.",
    eyebrow: "Care for your piece",
    sections: [
      { kind: "guide", title: "Everyday care", bullets: ["Follow care advice supplied with your specific piece.", "Keep jewellery away from harsh chemicals and abrasive surfaces.", "Store pieces separately to reduce scratching and tangling.", "Ask Anokhi for material-specific cleaning advice."] },
      { kind: "legal", title: "Care by material", body: "Material-specific care instructions will be added only after the Anokhi team confirms the materials used in each product." },
      { kind: "guide", title: "Need help?", links: [{ label: "Contact Anokhi", href: "/contact" }] },
    ],
  },
  "privacy-policy": {
    title: "Privacy policy",
    description: "How Anokhi handles information shared through this website.",
    eyebrow: "Legal information",
    sections: [{ kind: "legal", title: "Draft for client approval", body: "This page is a placeholder and is not legal advice. Anokhi's approved privacy policy, data controller details, retention periods and contact information must be supplied before publication.", bullets: ["Information collected: to be confirmed", "Use and retention: to be confirmed", "Third-party services: to be confirmed", "Your privacy rights: to be confirmed", "Contact details: to be confirmed"] }],
  },
  terms: {
    title: "Terms and conditions",
    description: "Terms for using the Anokhi website and services.",
    eyebrow: "Legal information",
    sections: [{ kind: "legal", title: "Draft for client approval", body: "This page is a placeholder and is not legal advice. Approved terms, governing law, business details, product terms and customer service contacts must be supplied by Anokhi before publication.", bullets: ["Business details: to be confirmed", "Orders and payments: to be confirmed", "Shipping and returns: to be confirmed", "Warranty: to be confirmed", "Governing law: to be confirmed"] }],
  },
};

export const RING_CATEGORIES = ringCategoryLinks;
export const JEWELLERY_CATEGORIES = jewelleryCategoryLinks;
export const COLLECTION_CARDS: PageLink[] = [
  { label: "Ring collections", href: "/rings", image: "heroRing" },
  { label: "Jewellery collections", href: "/jewellery", image: "earrings" },
  { label: "New arrivals", href: "/shop?sort=created_at", image: "necklace" },
  { label: "Best sellers", href: "/shop?sort=best_selling", image: "bracelet" },
  { label: "Bridal", href: "/rings?category=bridal", image: "weddingRing" },
  { label: "The signature", href: "/rings", image: "solitaireRing" },
];

export function productMatchesCollection(product: ShopifyProduct, category: string) {
  return `${product.productType} ${product.title}`.toLowerCase().includes(category.toLowerCase());
}