# Anokhi storefront

Fine jewellery storefront built with Next.js 15 App Router, React, TypeScript, Tailwind CSS v4, Motion, GSAP and the Shopify Storefront API.

## Local development

```bash
cd anokhi
npm install
copy .env.example .env.local
npm run dev
```

The app starts at `http://localhost:3000`.

## Shopify connection

This project intentionally contains no static catalogue products or made-up prices. Product cards, variants, availability, imagery, collection membership and prices are queried from Shopify.

Set these server-side values in `anokhi/.env.local` and in the production deployment environment:

- `SHOPIFY_STORE_DOMAIN`: the store's `*.myshopify.com` hostname, without protocol
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`: Storefront API token (never prefix it with `NEXT_PUBLIC_`)
- `SHOPIFY_STOREFRONT_API_VERSION`: defaults to `2026-07`, a stable version at the time this app was scaffolded
- `NEXT_PUBLIC_SITE_URL`: client-approved production origin, used for canonical metadata and absolute sitemap/schema URLs

Publish products/collections to the relevant Online Store channel and market. Create the Anokhi categories in Shopify as collections with handles matching the taxonomy in `src/lib/constants/navigation.ts`. Add actual home merchandising collection handles (`SHOPIFY_FEATURED_JEWELLERY_HANDLE`, `SHOPIFY_NEW_ARRIVALS_HANDLE`, `SHOPIFY_BEST_SELLERS_HANDLE`) before expecting home product grids to populate. The home jewellery, new-arrival and bestseller slots remain explicit connection states while those values are unset. Rings remain one category within the wider jewellery storefront.

The app uses the public Storefront access token in its server-only GraphQL client. The token is not sent to browser components. Shopping-cart IDs are held in an `HttpOnly`, `SameSite=Lax` cookie, and checkout is redirected to the Shopify-provided `checkoutUrl`.

### Newsletter

Set `NEWSLETTER_API_URL` and `NEWSLETTER_API_KEY` only for a client-approved HTTPS email provider endpoint, then set `NEXT_PUBLIC_NEWSLETTER_ENABLED=true`. The UI remains disabled until the provider is configured. Do not expose provider keys to client code.

### Accounts and editorial/legal content

Login, registration, orders and saved addresses remain unavailable until the store's Customer Account API OAuth / PKCE configuration and required scopes are confirmed. Customer passwords are never stored by this storefront. Contact details, privacy policy, terms, shipping, returns, warranty, diamond certification and product-specific care claims require client-approved text before publication. These pages deliberately show pending-content notices in place of invented promises.

Temporary credited editorial photographs are defined in `src/lib/constants/placeholder-images.ts`; replace them with approved brand assets when available. Merchandise visuals and URLs are always sourced from Shopify.

## Commands

```bash
npm run lint
npx tsc --noEmit
npm run build
```
