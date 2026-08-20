# Tiny Inks — Headless Shopify Storefront

Custom Next.js storefront for **Tiny Inks** (تايني انكس للقرطاسية) — bilingual (English + Arabic RTL),
built on the brand palette extracted from the logo, with Shopify as the backend for
products, cart, checkout, and order management.

**Pages:** Home · Shop (with filters) · Tiny Drops · About · Contact · Product pages · Cart drawer

---

## 1 · Run it right now (demo mode — no Shopify needed)

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/en`. Use the language button in the header for Arabic (`/ar`).

Demo mode ships with 12 sample products and brand-styled covers so the whole design
works before Shopify exists. The cart works locally; only real checkout is disabled.

> If `npm run dev` shows any error, copy the message and send it back — small fixes take seconds.

---

## 2 · Connect the real Shopify store

### A. Create the store
1. Go to shopify.com → start a store (trial is fine to begin).
2. In **Settings → General**, set currency to **AED** and address to Dubai.
3. In **Settings → Markets**, make sure **United Arab Emirates** is your main market.

### B. Add products — follow these conventions (important!)
For every product in Shopify admin:
- **Product type** — use exactly one of: `Notebooks`, `Journals`, `Planners`, `Pens & Tools`, `Desk & Notes`
  (these power the Shop filter and the home-page category tiles).
- **Tags**:
  - `color:blue` / `color:terracotta` / `color:cream` / `color:blush` / `color:mustard` / `color:sage` / `color:slate` / `color:ink` → powers the color filter.
  - `bestseller` → shows the badge + appears in the home Bestsellers shelf.
  - `drop-01` → the product appears on the **Tiny Drops** page with the Drop badge.
- **Images**: upload at least 2 per product (the second one shows on hover).
- Set price, inventory, and shipping as normal.

### C. Get the Storefront API token
1. Shopify admin → **Sales channels → add the "Headless" channel** (free, by Shopify).
2. Create a storefront inside it → copy the **public access token**.
   (Alternative: Settings → Apps → Develop apps → create app → enable Storefront API scopes → install → copy token.)

### D. Arabic content
1. Install Shopify's free **Translate & Adapt** app.
2. Add **Arabic** as a language and publish it (Settings → Languages).
3. Translate product titles/descriptions in Translate & Adapt.
   The site requests Arabic automatically on `/ar` pages via `@inContext(language: AR)` — untranslated products fall back to English.

### E. Point the site at the store
Copy `.env.example` → `.env.local` and fill in:

```
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=xxxxxxxxxxxx
```

Restart `npm run dev`. Products, cart, and the **Checkout** button (real Shopify checkout,
payments, and orders in the admin) are now live.

### F. Payments & shipping (in Shopify admin)
- **Settings → Payments**: activate Shopify Payments (available in the UAE) or your preferred gateway; consider adding Tabby/Tamara later.
- **Settings → Shipping**: create a Dubai zone (1–2 days) and a UAE zone, with free shipping over AED 150 to match the site's marquee (or edit the marquee text in `lib/dictionaries.js`).

---

## 3 · Deploy (Vercel, ~10 minutes)
1. Push this folder to a GitHub repo.
2. vercel.com → **New Project** → import the repo (Next.js is auto-detected).
3. Add the same environment variables from `.env.local` in the Vercel project settings.
4. Deploy → connect her custom domain in Vercel when ready.

---

## 4 · Things you'll want to customize
| What | Where |
|---|---|
| WhatsApp number, Instagram, email | `.env.local` (`NEXT_PUBLIC_WHATSAPP_NUMBER` etc.) |
| Drop 01 countdown date | `NEXT_PUBLIC_DROP_DATE` in `.env.local` |
| All wording (EN + AR) | `lib/dictionaries.js` |
| Brand colors / spacing / animations | `app/globals.css` (top `:root` block) |
| Demo products | `lib/mock-data.js` |
| Hero shapes | `components/HeroAssembly.jsx` |

**Honest notes**
- The 3 customer reviews on the home page are **sample placeholders** — replace them with real ones in `app/[locale]/page.jsx`.
- The newsletter + contact forms show a success message but don't send anywhere yet.
  Fastest real options: Shopify Email/Forms, Klaviyo (newsletter), or Formspree (contact). Ask me and I'll wire one in.
- Product images from Shopify load via plain `<img>` for reliability; we can switch to `next/image` optimization later.
- If Shopify ever retires API version `2026-01`, bump `NEXT_PUBLIC_SHOPIFY_API_VERSION` to a current one.

Made with ✦ for Tiny Inks.
