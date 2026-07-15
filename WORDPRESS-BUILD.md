# Stan The Man Cleaning — WordPress / Elementor Build Guide

This document lets a fresh Claude session rebuild the site inside WordPress (Elementor)
without re-deriving anything. All page **content** is already in this repo — treat the
static HTML as the source of truth and reproduce it as **native Elementor** widgets so the
client (Stan) can edit visually.

---

## 0. Target site & connector

- **Site:** `llgi56icbm.wpdns.site` (the "Novamira" WordPress site), via the
  **novamira** MCP connector's `execute-php` ability (`novamira/execute-php`).
- **Connector caveat:** the `@automattic/mcp-wordpress-remote` **npx** route is blocked by
  this environment's egress allowlist (`403 Host not in allowlist: llgi56icbm.wpdns.site`).
  Use the **claude.ai OAuth connector** instead (Settings → Connectors), which routes around
  the sandbox egress. Newly-added connectors only load their tools in a **fresh session**.
- A **different** site, `gh88t6l8vv.wpdns.site`, already has an earlier copy of the
  foundation (kit, menu, 52 images, 10 page shells). If you end up on that site instead,
  skip the steps already done there. This guide assumes a **fresh/empty** site.

## Environment facts (verified)

- WordPress 7.0.1, PHP 8.3.31. Theme: **Hello Elementor**.
- **Elementor 4.1.5** — the classic **section → column → widget** model works. The **Pro
  widget set is registered and usable** (form, nav-menu, mega-menu, theme-*, etc.) even
  though `ELEMENTOR_PRO_VERSION` is undefined. New v4 atomic widgets (`e-heading`, etc.)
  also exist — prefer the **classic widgets** (heading, text-editor, button, image,
  icon-box, icon-list, accordion, counter, google_maps) for predictable output.
- Active plugins that matter: **LeadConnector** (GoHighLevel — handles CRM/tracking),
  **Yoast SEO** (titles/meta/schema).

---

## 1. Verified Elementor page-build recipe

Creating an Elementor page programmatically (this exact sequence was tested and renders):

```php
$plugin = 'Elementor\\Plugin';
$pid = wp_insert_post(['post_title'=>'Window Cleaning','post_name'=>'window-cleaning',
  'post_type'=>'page','post_status'=>'publish','post_content'=>'']);
$elements = [ /* section → column → widget tree, see below */ ];
$plugin::instance()->documents->get($pid)->save([
  'elements' => $elements,
  'settings' => ['template' => 'elementor_canvas'],
]);
update_post_meta($pid,'_elementor_edit_mode','builder');      // REQUIRED — without this it renders nothing
update_post_meta($pid,'_elementor_template_type','wp-page');
update_post_meta($pid,'_wp_page_template','elementor_canvas');
$plugin::instance()->files_manager->clear_cache();            // regenerate CSS
// verify: $plugin::instance()->frontend->get_builder_content($pid, true) should be non-empty
```

Element node shapes:
- Section: `['id'=>'7char','elType'=>'section','settings'=>[...],'elements'=>[columns]]`
- Column: `['id'=>'7char','elType'=>'column','settings'=>['_column_size'=>100,'_inline_size'=>null],'elements'=>[widgets]]`
- Widget: `['id'=>'7char','elType'=>'widget','widgetType'=>'heading','settings'=>[...]]`
- IDs must be unique 7-char strings. Escape apostrophes; prefer double-quoted PHP strings for
  copy that contains `'` (e.g. "Melbourne's").

Common widget settings:
- `heading`: `title`, `header_size` (h1–h6), `align`, `title_color`
- `text-editor`: `editor` (HTML string)
- `button`: `text`, `link`=>['url'=>...,'is_external'=>'on','nofollow'=>''], `align`,
  `background_color`, `button_text_color`
- `image`: `image`=>['id'=>ATT_ID,'url'=>ATT_URL], `image_size`=>'full'
- `icon-list`: `icon_list`=>[['text'=>...], ...], plus a selected icon
- `accordion`: `tabs`=>[['tab_title'=>Q,'tab_content'=>A], ...] (use for FAQ)
- `counter`: `starting_number`, `ending_number`, `suffix`, `title` (for stats)
- `google_maps`: `address` or an embed — used on Contact.

---

## 2. Global Kit (brand tokens)

Set on the site's active kit (`get_option('elementor_active_kit')`), then flush CSS.
Values (from `css/styles.css` `:root`):

| Token | Hex |
|---|---|
| Orange (primary) | `#E87722` |
| Orange 300 | `#F39A55` |
| Ink (bg) | `#0F0F0F` |
| Surface 1 | `#161616` |
| Surface 2 | `#1F1F1F` |
| Line | `#2E2C2A` |
| Text | `#F0EDE8` |
| Muted | `#A9A29B` |

- `system_colors`: primary `#E87722`, secondary `#F0EDE8`, text `#A9A29B`, accent `#1F1F1F`.
- `custom_colors`: orange300, ink, surface1, surface2, line, white (values above).
- Headings + buttons use **Sora** (weights 600/700/800); body uses **Inter** 400, 17px, line-height 1.65.
- `body_background_color` `#0F0F0F`; `body_color` `#F0EDE8`; links `#F39A55` → hover `#E87722`.
- `button_background_color` `#E87722`, `button_text_color` `#1A1103`.
- `container_width` 1160px (matches `--wrap`).
- Elementor auto-loads **Sora**/**Inter** from Google Fonts when the kit references them — no `<link>` needed.

Save via `update_post_meta($kit_id,'_elementor_page_settings',$settings)` then
`Plugin::instance()->files_manager->clear_cache()`.

## 3. Import images (52) to the media library

Sideload from the public CDN (repo is public), store a filename→attachment map in an option
(`stm_media_map`) so page builds can look up `['id'=>..,'url'=>..]` by key:

```php
require_once ABSPATH.'wp-admin/includes/media.php';
require_once ABSPATH.'wp-admin/includes/file.php';
require_once ABSPATH.'wp-admin/includes/image.php';
$base='https://cdn.jsdelivr.net/gh/mcjay2196/stan-theman@bd8587d/assets/';
// $id = media_sideload_image($base.'img/hero-bg.webp', 0, 'hero-bg', 'id');
```

Keys (all `assets/img/*.webp` unless noted): `hero-bg`, `why-windows`, `exterior-home`,
`about-team`, `og-image` (`assets/og-image.jpg`), `brand-icon` (`assets/brand-icon.png`),
service `window-cleaning|gutter-cleaning|pressure-washing|soft-washing|solar-panel-cleaning`,
per-service job photos `<service>-1|2|3`, before/after pairs
`ba-window-before/after`, `ba-gutter-before/after`, `ba-pressure-before/after`,
`ba-softwash-before/after`, `ba-solar-before/after`, homepage showcase `ba-show-before/after`,
homepage tiles `ba-gutter`, `ba-driveway`, `ba-steps`, `ba-patio`, `ba-roof`, `ba-solar`,
nav thumbs `nav-window|nav-gutter|nav-pressure|nav-softwash|nav-solar`,
team `team-stan|team-sarah|team-deanna`. (~1.5s each; batch ~24 per call to avoid timeouts.)

## 4. Pages, menu, front page

- Create 10 pages as Elementor canvas shells (slugs): `home`, `window-cleaning`,
  `gutter-cleaning`, `pressure-washing`, `soft-washing`, `solar-panel-cleaning`, `about`,
  `contact`, `privacy-policy`, `thank-you`.
- `show_on_front=page`, `page_on_front`=home id. Pretty permalinks `/%postname%/`.
- **Primary** nav menu: Home · **Services** (parent, url `#`) → Window/Gutter/Pressure/Soft
  Washing/Solar · About · Contact.
- Thank-you: Yoast noindex (`_yoast_wpseo_meta-robots-noindex`='1').

## 5. Header + footer (single source)

No Pro Theme Builder, so build header & footer as **elementor_library** templates
(`_elementor_template_type='section'`, term `elementor_library_type`='section') and include
them on every page via the **Template widget** (`widgetType='template'`, settings
`template_id`=TPL_ID). Editing the template updates all pages.

- **Header:** dark bar; brand = `brand-icon` image (links `/`) + "Stan The **Man**";
  **nav-menu** widget (Primary menu, dropdown); **Book Online** button (Timely URL, new tab)
  + "Get a Free Quote" button (→ `/contact`).
- **Footer:** brand blurb + socials (FB/IG), Services list, Company list (About, Contact,
  Get a Quote, Privacy Policy), Get-in-touch (phone/email/address/hours), copyright with year.

## 6. Page specs

Reproduce each repo page as native Elementor. **Window Cleaning** (`services/window-cleaning.html`)
is the flagship — build it first:

- **Page hero** (`page-hero--img`): bg = `window-cleaning` image + dark gradient overlay;
  breadcrumb Home / Window Cleaning; eyebrow "Window Cleaning Melbourne";
  H1 "Professional Window Cleaning in Melbourne's Eastern Suburbs"; lead; two buttons
  (Get a Free Quote → /contact; Book Online → Timely).
- **Intro split**: left prose (2 intro paras; "What's included" 6-item check-list;
  "Why choose Stan The Man"; "Servicing your local area" suburb list). Right aside:
  quote card (call/text `0411 188 458`, email, "Request a quote" button) + `window-cleaning` photo.
- **See the difference**: before/after slider (`ba-window-before` / `ba-window-after`).
  Elementor has no native before/after widget — use an **HTML widget** with the slider markup
  from `css/styles.css` (`.ba-slider`) or Elementor's image-comparison if available.
- **How we clean your windows**: 3 process steps (Assess & protect / Pure-water clean /
  Detail & inspect) — use icon-box or a 3-column steps layout.
- **Recent window cleaning jobs**: 3-image gallery `window-cleaning-1|2|3` with captions.
- **FAQ**: 6 Q&As (verbatim from the file — includes rain-insurance, payment, cancellation
  policy) via `accordion` widget.
- **Related services**: 3 cards → gutter, pressure, solar.
- **CTA band**: "Ready for spotless windows?" + Get a Free Quote / Book Online.
- **SEO (Yoast):** title `Window Cleaning Melbourne | Streak-Free Inside & Out | Stan The Man`;
  meta description from the file; add **Service**, **FAQPage**, **BreadcrumbList** JSON-LD.

Other pages follow their repo equivalents: `index.html` (Home), `about.html`,
`contact.html` (+ LeadConnector/GHL form → `/thank-you`), `privacy-policy.html`,
`thank-you.html`, and the 4 remaining service pages.

## Reference constants

- **Booking (Timely):** `https://bookings.gettimely.com/stanthemancleaningservices/book?uri=https%3A%2F%2Fbook.gettimely.com%2FBooking%2FLocation%2F232772%3Fmobile%3DTrue%26params%3D%25253fclient-login%25253dtrue`
- **GHL tracking script:** `https://link.msgsndr.com/js/external-tracking.js` — `data-tracking-id="tk_b39dadcc3417438a8921cebf538d145d"` (or rely on the active LeadConnector plugin).
- **NAP:** Stan The Man Cleaning · 0411 188 458 · info@stanthemancleaning.com.au ·
  5 Allinga Place, Donvale VIC 3111 · Mon–Fri 7am–6pm, Sat 8am–4pm.
- **Socials:** facebook.com/stanthemancleaningservices · instagram.com/stanthemancleaningservices
- **Service area:** Donvale, Doncaster, Doncaster East, Templestowe, Warrandyte, Park Orchards,
  Ringwood, Mitcham, Nunawading, Blackburn, Box Hill, Balwyn, Bulleen, Eltham.
