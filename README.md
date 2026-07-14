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

## Photos
Real job photos (from the client's Google Drive) are installed and self-hosted in
`assets/img/` (optimised WebP), plus `assets/og-image.jpg` for social sharing:
`hero`, `why-windows`, `exterior-home`, `window-cleaning`, `gutter-cleaning`,
`pressure-washing`, `soft-washing`, `solar-panel-cleaning`, `about-team`.
To swap any photo, drop a replacement over the same filename (keep it landscape/4:3,
except `hero.webp` which is portrait 4:5). The contact page still uses a placeholder
box for the **Google Map** embed (that's a map slot, not a photo).

## ✅ Before launch — swap these placeholders
1. **Reviews.** The testimonials on the homepage are representative placeholders.
   Swap in real Google/Facebook reviews (and consider a live review widget +
   `AggregateRating` schema once reviews are connected).
2. **Confirm domain/NAP.** Everything targets `stanthemancleaning.com.au`. If the
   final email differs (e.g. `info@stanthemanclean.com.au` from onboarding),
   find-and-replace before launch.
3. **Search setup.** Verify Google Business Profile, connect Google Search
   Console + GA4, and submit `sitemap.xml`.

*(Done: the Google Map embed for the business location is live on `contact.html`.)*

## GoHighLevel (GHL) CRM integration
The **GHL external tracking script** is installed site-wide (before `</body>` on
every page) — it tracks page views and captures form submissions:
```html
<script src="https://link.msgsndr.com/js/external-tracking.js" data-tracking-id="tk_b39dadcc3417438a8921cebf538d145d"></script>
```
The quote form on `contact.html` submits, then redirects to `thank-you.html`. Its
fields are named to map straight into GHL:

| Form field | `name` attribute | GHL field |
|---|---|---|
| Name | `full_name` | Contact name (`{{contact.name}}`) |
| Phone | `phone` | `{{contact.phone}}` |
| Email | `email` | `{{contact.email}}` |
| Property address | `property_address` | `{{contact.property_address}}` (custom) |
| Service needed | `service_needed` | `{{contact.service_needed}}` (custom) |
| Tell us about the job | `job_notes` | `{{contact.job_notes}}` (custom) |

**In GHL, before/at launch:**
1. Create the three **custom fields** if they don't already exist:
   `property_address`, `service_needed`, `job_notes`.
2. Deploy to the live domain (GHL doesn't reliably capture from `localhost`/preview).
3. Submit **one test lead** through the live form, open the new contact in GHL, and
   confirm all six fields are populated. If any value lands as `unmapped_field`, map
   it once in the tracking settings — it maps automatically from then on.
4. (Optional, most robust) To guarantee exact mapping without relying on auto-detect,
   we can switch to a GHL **Inbound Webhook** instead — just ask.

## SEO / AEO / GEO built in
- Unique titles, meta descriptions, canonicals, OG/Twitter tags per page
- `CleaningService` (LocalBusiness) + `Service` + `FAQPage` + `BreadcrumbList`
  JSON-LD structured data
- Direct-answer FAQ blocks for featured snippets & voice search (AEO)
- Location-authoritative copy + `areaServed` suburb entities (GEO)
- `sitemap.xml`, `robots.txt`, mobile-first responsive, accessible, reduced-motion

See `STRATEGY.md` for the full strategy.
