# Stan The Man Cleaning — SEO / AEO / GEO Website Strategy

**Business:** Stan The Man Cleaning · Owner: Stan Krejnus
**Base:** 5 Allinga Place, Donvale VIC 3111 · **Phone:** 0411 188 458
**New domain:** https://www.stanthemancleaning.com.au
**Service area:** Melbourne's Eastern Suburbs
**Services:** Window cleaning (in/out), gutter cleaning, pressure washing, soft washing, solar panel cleaning

---

## 1. Objective
Move Stan The Man Cleaning from a thin, unstructured Wix site into a fast,
schema-rich, conversion-focused website that ranks for high-intent local searches
and turns visits into quote requests. Each of the five services becomes its own
ranking asset — five independent opportunities to appear in Google, the Map Pack,
and AI answer engines.

## 2. Current-state issues (typical of the old Wix build)
- Generic/thin homepage copy; no keyword-mapped service pages
- No structured data (LocalBusiness / Service / FAQ) → no rich-result eligibility
- Weak location signals for the Eastern Suburbs
- Little answer-engine (AEO) or generative-engine (GEO) readiness

> Note: A live audit of the current site and the automated audit service were both
> unavailable at build time (Wix returns 403 to crawlers). This strategy is built
> from verified business details + local-SEO best practice, consistent with the
> agency's standard rebuild framework.

## 3. Keyword map (one keyword-rich H1 per page)
| Page | Primary keyword | Intent |
|---|---|---|
| Home | Window & exterior cleaning Melbourne Eastern Suburbs | Brand + multi-service |
| Window Cleaning | Window cleaning Melbourne | High intent |
| Gutter Cleaning | Gutter cleaning Melbourne | High intent |
| Pressure Washing | Pressure washing Melbourne | High intent |
| Soft Washing | Soft washing / house washing Melbourne | High intent |
| Solar Panel Cleaning | Solar panel cleaning Melbourne | High intent, low competition |

**Secondary/long-tail woven through copy:** "window cleaning Doncaster",
"gutter cleaning Templestowe", "pressure washing driveway Melbourne east",
"roof soft wash Ringwood", "solar panel cleaning Donvale".

**GEO suburb set:** Donvale, Doncaster, Doncaster East, Templestowe, Warrandyte,
Park Orchards, Ringwood, Mitcham, Nunawading, Blackburn, Box Hill, Balwyn,
Bulleen, Eltham.

## 4. On-page SEO (implemented on every page)
- Unique keyword-optimised `<title>` + meta description; canonical URL
- Open Graph + Twitter Card tags; `lang="en-AU"`; theme-color
- Single semantic `<h1>` + logical H2/H3 hierarchy
- Descriptive `alt` text placeholders; explicit media sizing to protect CLS
- Internal linking: home ↔ service pages ↔ related services ↔ contact
- `sitemap.xml` + `robots.txt` (all 8 URLs)

## 5. GEO — Generative Engine Optimisation (AI search)
- `CleaningService` (LocalBusiness) JSON-LD on all pages with full NAP, geo,
  opening hours, `areaServed` suburb list, `sameAs` socials, offer catalogue
- Consistent brand entity + NAP across site, GBP, Facebook, Instagram
- Location-authoritative copy naming suburbs and the Eastern Suburbs region
- `Service` schema on each service page; `BreadcrumbList` on service pages

## 6. AEO — Answer Engine Optimisation (featured snippets + voice)
- `FAQPage` schema on the homepage and every service page
- Each answer written as a direct, self-contained Q→A (snippet/voice friendly),
  e.g. *"Do you clean windows inside and out in Melbourne? Yes — …"*
- Targets voice queries like *"Who does gutter cleaning near Doncaster?"*

## 7. Technical & performance
- Static HTML, no heavy framework; single shared `styles.css` + small `main.js`
- System-font fallback; only fonts use `preconnect`
- Mobile-first responsive; accessible nav + FAQ accordion (keyboard operable)
- Reduced-motion support; AA-minded contrast on the dark theme

## 8. Off-site / launch actions (owner to complete)
- Verify Google Business Profile; match NAP exactly; add services + photos
- Connect Google Search Console + GA4; submit `sitemap.xml`
- Build citations: HiPages, Oneflare, True Local, Yellow Pages, ServiceSeeking
- Encourage Google/Facebook reviews; embed live review count on site

## 9. How results compound
- **Weeks 1–2:** launch, GBP optimised, sitemap submitted
- **Month 1:** pages indexed; movement on long-tail (e.g. "solar panel cleaning Donvale")
- **Months 2–3:** primary keywords climbing; Map Pack consistency improves
- **Months 3–6:** page-one for multiple service + suburb queries
- **Month 6+:** optional blog + suburb landing pages compound authority

## 10. Recommended next phases (add-ons)
- Suburb landing pages (Doncaster, Templestowe, Ringwood, Box Hill…)
- Blog: "How often should you clean your gutters in Melbourne?",
  "Does cleaning solar panels really boost output?"
- Before/after gallery from real jobs (Google Drive photo library)
- Live Google review widget + star-rating schema once reviews are connected
