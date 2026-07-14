# Stan The Man Cleaning — Website

A modern, fast, SEO/AEO/GEO-optimised static website for **Stan The Man Cleaning**,
an exterior cleaning business servicing Melbourne's Eastern Suburbs.

Built as plain HTML + CSS + a little vanilla JS — no build step, no framework.
Just open the files or drop them on any static host (Netlify, Cloudflare Pages,
Vercel, S3, or Wix's own hosting).

## Pages
| File | Purpose |
|---|---|
| `index.html` | Homepage (primary keyword, ~1,500 words) |
| `services/window-cleaning.html` | Window Cleaning Melbourne |
| `services/gutter-cleaning.html` | Gutter Cleaning Melbourne |
| `services/pressure-washing.html` | Pressure Washing Melbourne |
| `services/soft-washing.html` | Soft Washing Melbourne |
| `services/solar-panel-cleaning.html` | Solar Panel Cleaning Melbourne |
| `about.html` | About / why choose us |
| `contact.html` | Contact + quote form |

Shared: `css/styles.css`, `js/main.js`, `assets/`, `sitemap.xml`, `robots.txt`,
`site.webmanifest`. Strategy: `STRATEGY.md`.

## Brand
- Accent (signature): `#E87722` burnt orange
- Backgrounds: `#0F0F0F` / `#161616` / `#1F1F1F`
- Body text: `#F0EDE8`
- Display font: Sora (Google Fonts) with system fallback

## Business details baked in
- **Domain:** https://www.stanthemancleaning.com.au
- **Phone:** 0411 188 458 (`tel:+61411188458`)
- **Email:** info@stanthemancleaning.com.au
- **Address:** 5 Allinga Place, Donvale VIC 3111
- **Socials:** Facebook + Instagram (`stanthemancleaningservices`)

## Run locally
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## ✅ Before launch — swap these placeholders
1. **Photos.** Replace the SVG placeholder tiles with real job photos. Source
   images live in the client's Google Drive folder
   (`Stan The Man (Exterior) Cleaning`). Add an `assets/og-image.jpg`
   (1200×630) for social sharing — it's already referenced in the homepage `<head>`.
2. **Contact form endpoint.** In `contact.html` the `<form>` has
   `data-demo="true"` and `action="#"`. Point `action` at your form handler
   (e.g. a [Formspree](https://formspree.io) endpoint or your LocalServicePro /
   booking URL) and remove `data-demo="true"` so it submits for real.
3. **Reviews.** The testimonials on the homepage are representative placeholders.
   Swap in real Google/Facebook reviews (and consider a live review widget +
   `AggregateRating` schema once reviews are connected).
4. **Map.** Embed a Google Map of the Donvale service area on `contact.html`
   (placeholder is marked).
5. **Confirm domain/NAP.** Everything targets `stanthemancleaning.com.au`. If the
   final email differs (e.g. `info@stanthemanclean.com.au` from onboarding),
   find-and-replace before launch.
6. **Search setup.** Verify Google Business Profile, connect Google Search
   Console + GA4, and submit `sitemap.xml`.

## SEO / AEO / GEO built in
- Unique titles, meta descriptions, canonicals, OG/Twitter tags per page
- `CleaningService` (LocalBusiness) + `Service` + `FAQPage` + `BreadcrumbList`
  JSON-LD structured data
- Direct-answer FAQ blocks for featured snippets & voice search (AEO)
- Location-authoritative copy + `areaServed` suburb entities (GEO)
- `sitemap.xml`, `robots.txt`, mobile-first responsive, accessible, reduced-motion

See `STRATEGY.md` for the full strategy.
