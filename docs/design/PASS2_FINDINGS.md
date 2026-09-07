# secret-site — graphify pass 2 (definitive)

**Date:** 2026-09-06 · supersedes pass 1 (`graph.html` / `GRAPH_REPORT.md` from earlier today)

## What was wrong with pass 1, and what changed

| Problem in pass 1 | Cause | Fix in pass 2 |
|---|---|---|
| Cross-file edges weak (481 edges for 327 nodes), "surprising connections" were false positives | graphify resolves imports by file **stem**; Vue imports carry `.vue` (`GoogleMap.vue` → `googlemap_vue` ≠ `googlemap`) so every Vue import missed; React has 6 colliding stems (4× `HeaderContainer`, 3× `SecondBlock`, 3× `FirstBlock`, 2× `SeoContent`/`OrderFly`/`DescriptionVue`) so unrelated files merged into one node | Every file given a unique path-derived stem (`react__components__Flight__HeaderContainer`), and every `@/` and relative import rewritten to that stem before extraction. Result: **456 import edges, 0 isolated files** |
| No semantic layer — graph knew symbols, not the system | AST only | Added 84 semantic nodes / 314 edges: 27 routes → pages, 19 HTTP endpoints ← callers, 14 `mb-*.scss` → what they skin (from headers + compiled selector scopes), 97 Vue→React `ported_to` edges, mockup → sections it specifies, 13 design boards → templates, 5 defects → files |
| God nodes were design hubs | — | God nodes computed on code nodes only |

**Pass 2 graph:** 537 nodes · 1,004 edges · 16 communities · 553 Obsidian notes · 16 wiki articles · benchmark ~11.6× fewer tokens per query vs reading the corpus.

Communities now correspond to real subsystems, and each groups the React template with its Vue origin, its stylesheet and its design board — e.g. *Airlines* = `AirlinesPage`, `AirlineDetail`, `data/airlines.js`, Vue `AirlineDetail`, `mb-about-airlines.scss`, board B6, route `/airlines`.

---

## Real god nodes (code only)

| Node | Degree | Betweenness | Meaning |
|---|---:|---:|---|
| `react/store/useAppStore.js` | 26 | **0.207** | the hub of the React app: settings, modal, quote loading, width — reached by 15/22 pages |
| `react/services/api.js` | 26 | 0.139 | all HTTP + validation + reCAPTCHA; 15/22 pages |
| `vue/router.js` | 26 | 0.093 | legacy |
| `vue/controllers/flyController.js` | 21 | 0.071 | Vue's equivalent of `api.js` |
| `HeaderForm/FlightCard/SecondBlock.jsx` | 19 | 0.095 | compact lead form, 7 pages |
| `HeaderForm/OrderFly/OrderFly.jsx` | 19 | 0.119 | full funnel |
| `pages/BestDeals.jsx` | 18 | 0.063 | heaviest page template |
| `pages/MainPage.jsx` | 16 | 0.120 | |
| `Flight/HeaderContainer.jsx` | 16 | 0.051 | destination hero |

Anything that touches `useAppStore`, `api.js` or `thirdParty.js` touches 15 pages. These three are the "do not restyle by accident" set.

---

## Blast radius — pages that transitively depend on each shared node

| Shared node | Pages | Which |
|---|---:|---|
| `store/useAppStore` | 15 | everything except About, Airlines list, FAQ, Sitemap, 404, Terms, Blog |
| `services/api` | 15 | same set |
| `utils/thirdParty` | 15 | same set |
| **`OrderFly/ChooseAirport`** | **11** | AirlineDetail, BlackFriday, BusinessFlights, Dynamic, Flight, FlightQuote, Main, Promo, SendFacebook, StudentFlights, Xmas — the airport autocomplete is the most widely used interactive control on the site |
| `MainPage/ContactSection` | 8 | AllDeals, BestDeals, Dynamic, Flight, FlightQuote, Main, Reviews, TermsPrivacy |
| `MainPage/WorksContainer` | 8 | AirlineDetail, AllDeals, BestDeals, Dynamic, Flight, FlightQuote, Main, Reviews |
| `store/useReviewsStore` | 8 | AboutUs, BlackFriday, Dynamic, Flight, FlightQuote, Main, Reviews, Xmas |
| `Footer/AirlinesLogos` | 7 (+ footer everywhere) | BestDeals, Blog, Dynamic, Flight, FlightQuote, InnerBlog, Reviews |
| `MainPage/ReviewsSection` | 7 | AboutUs, BlackFriday, Dynamic, Flight, FlightQuote, Main, Xmas |
| `FlightCard/SecondBlock` | 7 | AirlineDetail, Dynamic, Flight, FlightQuote, Promo, SendFacebook, StudentFlights |
| `utils/brandTitle` | 7 | BestDeals, Dynamic, Flight, FlightQuote, InnerBlog, Reviews, TermsPrivacy |
| `store/useRegionStore` | 6 | BestDeals, BlackFriday, Dynamic, Flight, Main, Xmas |
| `MainPage/OfferCard` | 5 | AllDeals, BestDeals, Dynamic, Flight, Main |
| `OrderFly/OrderFly` | 2 | BusinessFlights, Main (+ `DialogForm` modal, global) |
| `FlightCards`, `BestSelling`, `FaqSection` | 2 each | |

Use this table as the review gate: a change to a row-8 component needs those 8 pages re-checked, nothing else.

---

## New findings (not in pass 1, not in the two audit docs)

### F1 — The new skin of three shared sections is homepage-only
Compiled every `mb-*.scss` and counted selector scopes:

| Stylesheet | Selectors | Scope |
|---|---:|---|
| `mb-home-engage.scss` (FaqSection, NewsletterBanner, **ContactSection**) | 69 | **`.mb-home` only** |
| `mb-home-content.scss` (RegionsSection, SeoContent) | 40 | `.mb-home` only (fine — home-only sections) |
| `mb-hero.scss` | 67 | 23 home-only (hero layout), 44 site-wide (OrderFly skin) |
| all 11 others | 1,020 | site-wide via `:is(.mb-home, .mb-page)` |

`ContactSection` on the homepage gets **35** selectors from `mb-home-engage.scss`. On the other **7 pages** it gets the **8 low-specificity fallback selectors** in `mb-tokens.scss` ("global skins for shared sections no workstream owns"). Same for `FaqSection` on `/faq` (13 on home vs. whatever `mb-content-legal.scss` gives `.faq-page`). The components themselves render the moodboard markup everywhere (`closest('.mb-home, .mb-page')` in `WorksContainer`, `BestSelling`, `FlightCards`, `ReviewsSection`, `SeoContent`), so this is purely a CSS-scope gap.

**Correction to what I said earlier:** "the redesign is applied on all 22 templates" is true for page-specific chrome and for 11 of 14 stylesheets. It is not true for ContactSection on 7 pages. Board 0-shared must design ContactSection once and the implementation must promote `mb-home-engage.scss` from `.mb-home` to `:is(.mb-home, .mb-page)` (or move the ContactSection rules out into a shared file).

### F2 — Migration parity, mechanically
97 `ported_to` edges. **14 Vue components have no React counterpart:**

| Vue component | Verdict |
|---|---|
| `FacebookForm/BookingForm`, `ReviewsVueWithSlider` | dead code in Vue too — nobody imports them |
| `Airlines/AirlinesCarousel` | deliberate: React uses a grid |
| `common/Forms/InputVue`, `TextArea`, `FromEditorToText`, `common/Icons/StarVue`, `common/ReviewsTittle`, `common/LinkContainer` | primitives inlined into React JSX — no gap |
| `common/GoogleMap` | **real gap?** Vue `ContactVue` embedded a map; React `ContactSection` has "Show on map" link only |
| `Blog/BlogsContainer`, `InnerBlog/BlogCard` ×2 | blog list/related cards — matters only if D4 = internal blog |
| `BusinessFlights/FAQBlock` | Vue `/faq` used its own block; React reuses `FaqSection` — fine |

**6 React files with no Vue origin (net new):** `StatsStrip`, `WhyUs`, `CtaBanner` (from the mockup), `MainPage/OrderFly` (wrapper), `useCalendarPopper` (hook), `SitemapPage` (React ahead of Vue).

### F3 — Endpoint map (19 calls, 2 hosts)
`VITE_BACK` (CMS): `meta/getMeta`, `settings/getAll`, `aboutUs/getAll`, `bestDeals/{getOne,getAllDeals,getDestinations,getMain}`, `articles/{getAll,getOne}`, `{privacy|terms}/getAll`.
`VITE_API_URL` (lead/quote API): `contacts/{submit,subscribe}`, `airports/autocomplete`, `flights/search`, `requests/{create,create-coupon,facebook}`, `trustpilot`.
`InnerBlogPage.jsx` calls `articles/getOne` directly with axios, bypassing `useBlogStore.getBlogById` — duplicate path, harmless, worth folding during the blog decision.

### F4 — `mb-chrome.scss` does not compile under libsass
`Incompatible units: 'px' and 'vh'` — Dart Sass (Vite) tolerates it inside `calc()`, so production is fine; it just means this file cannot be linted with older toolchains. Low.

---

## Updated defect list (feeds WORK_PLAN §2)

| # | Defect | Severity | Fix |
|---|---|---|---|
| 1 | `GoogleReview` never mounted on homepage | Med | mount in `MainPage.jsx` |
| 2 | `AirlinesLogos` home section → footer only | Low / decision D5 | — |
| **3** | **`mb-home-engage.scss` is `.mb-home`-scoped: ContactSection on 7 pages, FaqSection on `/faq` fall back to 8 generic selectors** | **Med** | promote scope to `:is(.mb-home, .mb-page)` after board 0-shared |
| 4 | No build/CI for `react-app`; root builds Vue | **P0** | decision D7 |
| 5 | `FaqSection` h2 is the literal string "FAQ Section" | Low | copy |
| 6 | Vue `public/sitemap.xml` stale (129 vs 191) | Low (moot after cutover) | ship React sitemap |
| 7 | `GoogleMap` dropped from contact block — Vue had an embedded map | Low / decision | confirm with product |
| 8 | `InnerBlogPage` bypasses `useBlogStore` for `articles/getOne` | Low | fold when D4 decided |

---

## How to use the pass-2 outputs

- `graph.html` — open, filter by community. Each community = one subsystem incl. its Vue origin, stylesheet and board.
- `graph.json` — feed to Claude Code; query dependents before touching a shared component (the blast-radius table above is a query on this file).
- `obsidian-vault/` — 553 notes; `_COMMUNITY_*.md` pages summarize each subsystem.
- `wiki/` — 16 articles, one per subsystem, written for agent navigation.
- `GRAPH_REPORT.md` — auto report; god nodes are now real code nodes.

Re-run after each board lands with the same prep script; the parity and blast-radius queries are the regression check for "presentation only".
