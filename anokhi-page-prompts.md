# ANOKHI: Complete Prompt Pack

Give the prompts in order, one per message. Check each page before moving on. If a section is missing, reply: "Add the missing sections: X, Y, Z."

Use **Claude Code** to build the real Next.js project.

---

## 00. Master Prompt (send first)

```text
You are building ANOKHI, a luxury jewellery e-commerce website.
Rings are the hero category. Jewellery is the secondary category.

Install the design skill first: npx skills add Leonxlnx/taste-skill
Use it for typography, layout, spacing, motion and premium UI quality.
Do not copy a template. Create a unique Anokhi identity.

Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion,
Shopify Storefront API (GraphQL), Shopify Checkout, GitHub, Vercel.
Use Server Components wherever possible.

Brand: Luxury, elegant, feminine, editorial, minimal, romantic, high-end.
Primary colour #32033A, used only as an accent (buttons, links, active
states, selected filters, icons). Supporting: white, warm ivory, cream,
soft grey, light lavender, charcoal, muted gold. The site is mostly white,
cream and jewellery photography. Never make whole sections purple.

Category hierarchy (use everywhere):
RINGS: All, Engagement, Solitaire, Diamond, Wedding, Couple, Eternity,
Bridal, Statement, Custom.
JEWELLERY: All, Earrings, Necklaces, Pendants, Bracelets, Bangles, Sets.
Rings get the strongest visual emphasis. Jewellery is fully supported
but secondary.

Rules:
- Never hardcode products, prices, images, inventory, collections or
  variants. Fetch everything from Shopify.
- Use a placeholderImages object (heroRing, engagementRing, solitaireRing,
  weddingRing, earrings, necklace, bracelet, bangle, jewellerySet,
  craftsmanship, diamond) so images can be swapped for Shopify CDN later.
  Never put external image URLs inside product data.
- Placeholder images must be premium, high resolution, clean, editorial,
  with no watermarks and nothing blurry or fake-looking.
- Reuse shared components: Header, Footer, ProductCard, CollectionCard,
  Newsletter, Breadcrumb, FilterBar, SortSelect.
- Responsive at 360, 390, 430, 768, 1024, 1280, 1440, 1920px.
  Design desktop and mobile separately.
- Motion: slow, smooth, elegant, premium. Respect reduced motion.
- Accessible: semantic HTML, keyboard navigation, ARIA, focus states,
  alt text, good contrast.
- SEO on every page: dynamic metadata, canonical, Open Graph, schema.
- Security: never expose private credentials, never store passwords.

Project structure:
app/ (routes), components/ (layout, header, footer, product, collection,
jewellery, rings, cart, account, search, custom-ring, forms, ui),
lib/shopify/ (client, queries, mutations, products, collections, cart,
customers, search, types), lib/analytics, lib/utils, lib/constants,
types/, public/, .env.example

For this first step build ONLY: project setup, TypeScript, Tailwind config,
design tokens, typography, global styles, shared UI components,
Announcement Bar, Header, Shop Mega Menu, Mobile Menu, and Footer.
Do not build any pages yet. When finished, list files created.
```

---

## 01. Shopify Integration (send second)

```text
Connect Shopify before building any more pages.

Create lib/shopify/ with: client.ts, queries.ts, mutations.ts, products.ts,
collections.ts, cart.ts, customers.ts, search.ts, types.ts.

Implement with the GraphQL Storefront API: getProducts, getProductByHandle,
getCollections, getCollectionByHandle, searchProducts, createCart,
addToCart, updateCart, removeFromCart, getCart.

Environment variables: SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN.
Create .env.example. Never expose private credentials.

Support metafields (only where the client uses them):
Rings: ring style, diamond shape, carat, colour, clarity, metal, ring width,
certification, setting type, stone count.
Jewellery: type, metal, stone, material, weight, dimensions, certification,
care.

Add caching and optimised queries. Then verify: products, collections,
images, prices, variants, inventory, cart and checkout redirect all work.
Create a temporary test page that proves this. Report what works.
```

---

## 02. Shared Product Card and Collection Card

```text
Build the shared ProductCard and CollectionCard components.

ProductCard: image (with hover second image), wishlist button, badge,
product name, diamond or material details, price, compare price,
Quick View, Add to Cart. Loading skeleton and out-of-stock state.
CollectionCard: large editorial image, title, short description, Explore.
Luxury hover motion, accessible, fully responsive.
Data comes from Shopify types.
```

---

## 03. Home Page, route /

```text
Build the Home page at /.

Include EVERY section in this exact order:
1. Hero Banner: full-width cinematic ring image. Headline "A RING WORTH
   REMEMBERING", subline "Timeless jewellery designed for unforgettable
   moments.", buttons EXPLORE RINGS and DISCOVER JEWELLERY.
   Mobile uses a dedicated vertical composition.
2. Featured Ring Categories: title "FIND YOUR PERFECT RING". Cards for
   Engagement, Solitaire, Diamond, Wedding, Couple, Eternity (image,
   category, short description, Explore).
3. Featured Rings: "THE ANOKHI SIGNATURE", product cards from Shopify.
4. Jewellery Collection: "BEYOND THE RING", subtitle "Discover jewellery
   designed to complete every unforgettable moment." Visual cards for
   Earrings, Necklaces, Pendants, Bracelets, Bangles, Jewellery Sets.
   CTA EXPLORE JEWELLERY to /jewellery.
5. New Arrivals
6. Best Sellers
7. Promotional Banner
8. Anokhi Brand Story
9. Why Choose Anokhi
10. Diamond Education teaser
11. Customise Your Ring teaser
12. Ring Buying Guide
13. Testimonials
14. Instagram / Social
15. Journal
16. Newsletter
17. Footer

Rings must visually dominate. Use varied, asymmetric editorial layouts.
```

---

## 04. Rings Page, route /rings

```text
Build /rings. Include in order:
1. Hero
2. Ring Categories: All Rings, Engagement, Solitaire, Diamond, Wedding,
   Couple, Eternity, Bridal, Statement, Custom
3. Featured Rings
4. Filters: category, price, metal, stone, diamond, ring size, availability
5. Product Grid with sort and load more
6. Ring Guide
7. Newsletter
8. Footer
Products from Shopify. Mobile filters open in an animated drawer.
```

---

## 05. Jewellery Page, route /jewellery

```text
Build /jewellery. Include in order:
1. Breadcrumb
2. Hero: "THE JEWELLERY COLLECTION", "Pieces designed to be worn, loved and
   remembered.", button SHOP JEWELLERY
3. Jewellery Categories: Earrings, Necklaces, Pendants, Bracelets,
   Bangles, Jewellery Sets
4. Featured Jewellery
5. New Jewellery
6. Best Sellers
7. Jewellery Story
8. Shop by Type
9. Newsletter
10. Footer
```

---

## 06. Shop Page, route /shop

```text
Build /shop. Include in order:
1. Breadcrumb
2. Shop Hero
3. Category Tabs: All, Rings, Jewellery
4. Filter: category, price, material, metal, stone, diamond, ring size,
   availability
5. Sort
6. Product Grid with Load More or pagination
7. Editorial Banner
8. Newsletter
9. Footer
Mix rings and jewellery, with rings prioritised. Data from Shopify.
```

---

## 07. Collections Directory, route /collections

```text
Build /collections. Large editorial cards for: Ring Collections, Jewellery
Collections, New Arrivals, Best Sellers, Bridal, Signature.
Include breadcrumb, hero, newsletter and footer.
Cards link to Shopify collections.
```

---

## 08. Dynamic Collection, route /collections/[handle]

```text
Build /collections/[handle], working automatically with any Shopify
collection. Include in order:
1. Breadcrumb
2. Collection Hero
3. Collection Title
4. Description
5. Collection Story
6. Filter
7. Sort
8. Product Grid
9. Editorial CTA
10. Newsletter
11. Footer
Add generateMetadata, canonical URL and breadcrumb schema. Handle empty
and not-found collections.
```

---

## 09. Product Detail, route /products/[handle]

```text
Build /products/[handle]. Include in order:
1. Breadcrumb
2. Product Gallery: multiple images, zoom, thumbnails, mobile swipe, video.
   All media from Shopify.
3. Product Information: name, rating, price, compare price, badge,
   description, material, diamond details, variants, ring size, quantity
4. Actions: Add to Cart, Buy Now, Wishlist
5. Delivery Information and Trust Information
6. Product Story
7. Specifications, Diamond Details, Material Details, Certification
8. Shipping, Returns, Care (accordions)
9. Reviews
10. Related Products
11. Recently Viewed
12. Newsletter
13. Footer
Show ring-specific fields for rings and jewellery fields for jewellery.
Add Product schema, dynamic metadata and sticky mobile Add to Cart bar.
```

---

## 10. Cart, route /cart

```text
Build /cart and a Cart Drawer using the Shopify Cart API. Include:
Cart Header, Cart Items (image, details, variant, ring size, quantity,
price, remove), Discount code, Shipping, Total, Checkout button (redirects
to Shopify Checkout), Recommended Products, Footer.
Empty cart state. Optimistic updates. Do not rebuild checkout.
```

---

## 11. Checkout Flow

```text
Implement the flow: Product, Add to Cart, Cart, Shopify Checkout, Payment,
Order Confirmation. Use Shopify's hosted checkout. Make sure the checkout
URL redirect works, and style the CTA buttons on cart and product pages.
Test with a real Shopify development store.
```

---

## 12. Search, route /search?q=

```text
Build /search?q=. Include in order: Search Input, Results Count, Category
Filter, Product Grid, Sort. Search both rings and jewellery. Add a search
overlay in the header with suggestions.
Empty state: "Nothing quite matched your search. Try another style or
explore our collections."
```

---

## 13. Customise Your Ring, route /customise-your-ring

```text
Build /customise-your-ring as a premium step-by-step configurator.

Steps: 01 Ring Style, 02 Diamond Shape, 03 Diamond, 04 Carat, 05 Colour,
06 Clarity, 07 Setting, 08 Metal, 09 Ring Size, 10 Engraving, 11 Review.

Desktop: large ring preview on the left, configuration on the right,
sticky summary (Your Ring, selected options, price, Continue).
Mobile: Preview, Current Step, Options, Price, Continue.

Include a progress indicator, back/next, and a final Add to Cart or
Enquire action. Keep state in React, validate each step, and make it
keyboard accessible. Only use options and pricing the client confirms.
```

---

## 14. Login, route /account/login

```text
Build /account/login as a luxury split screen: jewellery image on one side,
form on the other. Fields: Email, Password, Remember Me. Actions: Login,
Forgot Password, Create Account. Use Shopify customer authentication.
Validation, error states, accessible labels.
```

---

## 15. Register, route /account/register

```text
Build /account/register. Fields: First Name, Last Name, Email, Phone,
Password, Confirm Password. Inline validation, password strength hint,
clear errors, Shopify customer creation. Same split-screen style as login.
Never store passwords yourself.
```

---

## 16. Account, route /account

```text
Build /account dashboard: Welcome, Orders, Wishlist, Profile, Addresses,
Account Settings, Logout. Also create /account/orders and
/account/addresses. Protected routes, data from Shopify Customer API,
empty states, mobile-friendly navigation.
```

---

## 17. About, route /about

```text
Build /about. Include in order: Hero, Anokhi Story, Our Philosophy,
Why Rings, Jewellery Design, Craftsmanship, Diamond Standards,
Behind the Craft, Gallery, CTA, Newsletter, Footer.
Editorial layout, craftsmanship imagery, warm brand storytelling.
```

---

## 18. Contact, route /contact

```text
Build /contact. Include in order: Hero, Contact Options, Phone, WhatsApp,
Email, Address, Map, Contact Form, FAQ CTA, Newsletter, Footer.
Use placeholder contact details until the client approves real ones.
Form with validation, spam protection and a success state.
```

---

## 19. FAQ, route /faq

```text
Build /faq with accessible accordions. Categories: Rings, Jewellery,
Diamonds, Ring Size, Customisation, Orders, Payments, Shipping, Returns,
Care, Warranty. Category tabs or sidebar, search within FAQ, FAQ schema,
contact CTA. Use placeholder answers marked for client approval.
```

---

## 20. Shipping & Returns, route /shipping-returns

```text
Build /shipping-returns. Sections: Shipping, Delivery, Returns, Exchange,
Cancellation, Custom Ring Rules, Jewellery Rules, Warranty, Care.
Sticky section navigation. Use placeholder policy text clearly marked for
client approval. Do not invent legal policies.
```

---

## 21. Ring Size Guide, route /ring-size-guide

```text
Build /ring-size-guide. Sections: How to Measure, Size Chart,
International Conversion, Tips, Common Questions. Create a clear visual
guide with illustrations, a printable ring sizer, and an interactive
size converter. Responsive tables.
```

---

## 22. Diamond Education, route /diamond-education

```text
Build /diamond-education. Sections: What Is a Diamond, The 4Cs, Cut,
Colour, Clarity, Carat, Diamond Shapes, Certification, Diamond Care.
Premium close-up diamond imagery, interactive visuals for the 4Cs and
shapes, CTA to Customise Your Ring.
```

---

## 23. Legal and 404

```text
Build /privacy-policy and /terms with clean readable layouts and
placeholder text marked for client approval. Build a branded 404 page
(app/not-found.tsx) with a search box and links to Rings and Jewellery.
```

---

## 24. SEO

```text
Implement across the site: dynamic metadata for Shopify products and
collections, canonical URLs, Open Graph, sitemap.ts, robots.ts, Product
schema, Organization schema, Website schema, Breadcrumb schema.
```

---

## 25. Accessibility and Performance

```text
Audit and fix: semantic HTML, keyboard navigation, ARIA labels, focus
states, alt text, contrast, accessible forms, reduced motion.
Then optimise: Server Components, next/image, lazy loading, caching,
minimal client JS, code splitting, Core Web Vitals. Report Lighthouse
scores before and after.
```

---

## 26. Responsive QA

```text
Test every page at 360, 390, 430, 768, 1024, 1280, 1440 and 1920px.
Pay special attention to: header, mega menu, product grid, gallery,
filters, cart, checkout CTA, custom ring, ring size guide and jewellery
categories. Fix every issue and list what changed.
```

---

## 27. Commerce Testing and Launch

```text
Test the full journeys with real Shopify data:
Ring: Home, Rings, Collection, Product, Size/Variant, Add to Cart, Cart,
Checkout, Order.
Jewellery: Home, Jewellery, Category, Product, Variant, Add to Cart,
Checkout.
Custom Ring: Customise, Style, Diamond, Setting, Metal, Size, Engraving,
Review, Add to Cart or Enquire.
Then prepare GitHub, Vercel deployment, environment variables, custom
domain, and a final QA checklist. Replace placeholder images with Shopify
images.
```

---

## Final Check Prompt (use after every page)

```text
Check this page against the standard: premium luxury look, Anokhi violet
#32033A as accent only, ring-first hierarchy, jewellery as secondary,
high-quality imagery, strong typography, generous whitespace, clean
product cards, clear CTAs, smooth animation, perfect mobile layout,
Shopify dynamic data, accessible, SEO-ready, fast. List anything that
fails and fix it.
```
