# Exotique Cakes Ilupeju

Next.js App Router storefront with TypeScript, Tailwind CSS, Framer Motion and Lucide. Uses the supplied original logo and cake photography.

## Run

`npm install`, then `npm run dev`. Production validation: `npm run build`.

## Included

Editorial desktop home, dedicated mobile navigation, catalogue search/filter/sort, configurable product pages, locally persisted cart and favourites, cart drawer, staged checkout, custom cake wizard with photo previews, local preview order tracking and guest profile.

## Before accepting real customers

This is a functional storefront preview, not a live order processing system. Product names, prices, delivery rates and product-to-photo mappings are illustrative and must be approved by the bakery. Payment endpoint returns `demo` / `unpaid` only. Checkout explicitly creates a local demo order; custom requests and validated photos are stored privately in `.data/custom-requests` during development. No email is sent. In production, the request endpoint returns 503 until CUSTOM_REQUEST_STORAGE_DIR points to a durable private directory. Newsletter is not connected. No order, payment or notification is sent to the business.

Add a database and authenticated server order service, private image storage, custom request delivery, transactional email and Paystack initialization/verification/webhooks before going live. Always reprice products server-side from trusted catalogue records and verify payment reference, amount and currency before confirming payment; use idempotent webhook processing. Store secrets server-side. Current `lib/payments.ts` is a deliberately isolated demo adapter and does not use a real secret even if one is supplied.

Set NEXT_PUBLIC_SITE_URL to the canonical domain for sitemap generation. Confirm business policies before adding legal policy pages. PWA square icons are derived from the supplied logo. Supply approved production metadata images. Manifest provides standalone display; no offline order submission is claimed.

Images: public/images. Original logo: public/logo.png. Central product data and price configuration: data/products.ts. Local browser storage is used for preview data only; no authentication is implied.
