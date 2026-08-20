# CLAUDE.md — Tiny Inks Storefront

## Business facts (do not get these wrong)
- **The studio is in ABU DHABI, United Arab Emirates — NOT Dubai.** Arabic: **أبوظبي**.
  Every mention of the studio's city, delivery promises, timezone labels, studio hours,
  the hero eyebrow, the marquee, and the footer © line says **Abu Dhabi**.
- Delivery promise: **Abu Dhabi 1–2 business days · all other Emirates 2–4 · free over AED 150.**
- Currency AED, no decimals. Bilingual EN + Arabic with true RTL.
- WhatsApp is the primary contact channel (UAE market).

## What this is
A production Next.js (App Router, plain JS/JSX) headless Shopify storefront.
Hand-written CSS design system in `app/globals.css` — **no Tailwind, no UI kits**.
Demo mode (`NEXT_PUBLIC_DEMO_MODE=true`) runs on mock products in `lib/mock-data.js`;
live mode uses the Shopify Storefront API (`lib/shopify.js`, `@inContext` for Arabic).
Never break demo mode.

## Ground rules for future work
- **Mobile first**: the phone (390×844, 360×800) is the primary canvas. Zero horizontal
  scroll at 360px. Tap targets ≥44px. Test every change in **both `/en` and `/ar`**.
- All UI strings live in `lib/dictionaries.js` in BOTH languages — never hardcode copy.
- All photos live in `lib/images.js` (single manifest the owner swaps before launch).
- Policy/FAQ content lives in `content/policies/*.js` (bilingual, `[PLACEHOLDER]`s for
  legal details).
- Arabic rule for animations: NEVER split Arabic text into letters (connected script) —
  animate whole words or fade the full line. All JS-driven animation must be disabled
  under `prefers-reduced-motion` (see `components/reactbits/useReducedMotion.js`).
- React Bits components live in `components/reactbits/` (JS + plain-CSS variants,
  re-themed to brand tokens). Hard cap: 5 sitewide.
- Brand tokens are the `:root` block in `app/globals.css` (ink #26272B, paper #FBF0E4,
  terracotta #E39276 primary, mustard #F7CD7B, blush, sand, dusty-blue, sage, slate).
  Motion: 0.5–0.9s, `cubic-bezier(0.22,1,0.36,1)`, transform/opacity only.
- Checkout stays on Shopify (cart mutations → `checkoutUrl`). Never build custom payments.
- Before claiming done: `npm run build` passes clean and key flows verified in the browser.
