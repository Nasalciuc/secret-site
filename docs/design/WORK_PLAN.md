# BuyBusinessClass — New Brand Rollout: Work Plan

**Date:** 2026-09-06
**Repo:** `Nasalciuc/secret-site` (main, last push 2026-08-22)
**Source of truth for this plan:** graphify run over 246 code files (327 nodes / 481 edges / 20 communities), per-page section diff Vue ↔ React, `mb-*.scss` ownership headers, the two gap audits dated 2026-07-31, and the `buybusinessclass-new-homepage (4).html` mockup.

---

## 1. Where we actually are

| Fact | Evidence |
|---|---|
| Two parallel apps in one repo | `src/` = Vue (97 SFC, Vuex), `react-app/` = React (84 JSX, Zustand, Vite) |
| React is at functional parity with Vue | Gap audits: 0 High, 0 Med, 4 Low open, 15 fixed. Router matches all 239 paths, 0 → 404 |
| The new brand is **already applied** in React | 13 `mb-*.scss` files, 6,378 lines, tokens copied verbatim from the mockup (`--mb-bg #334155`, `--mb-surface #1e293b`, `--mb-gold #b4853b`, radius 24/16). All 22 pages carry `.mb-page` / `.mb-home` |
| The homepage mockup is implemented section-for-section | React `MainPage` order = mockup order for the first 6 sections; `StatsStrip`, `WhyUs`, `CtaBanner` were created from the mockup |
| Only **one** design exists | Homepage. 6 of its 12 sections and all 21 other pages were re-skinned by CSS without a visual reference |
| React is not what builds | Root `package.json` = `vue-cli-service build`; no CI; `react-app` is a nested Vite project with its own lockfile (npm vs yarn at root) |

**Consequence:** this is not a rebuild. It is (a) produce the missing visual references, (b) reconcile the existing `mb-` re-skin against them, (c) wire React into the build and cut over.

---

## 2. Known defects to fix regardless of design (P0)

| # | Defect | Where | Fix |
|---|---|---|---|
| 1 | `GoogleReview` section never mounted on homepage — component exists, nothing imports it. Audit marked it "Checked OK" (wrong) | `react-app/src/pages/MainPage.jsx` | Import and mount between `ReviewsSection` and `RegionsSection` (Vue order), or decide to drop it explicitly |
| 2 | `AirlinesLogos` moved from a homepage section (Vue: directly under hero) into the footer only | `MainPage.jsx` vs `Footer.jsx` | Product decision: keep in footer (mockup has no logos strip) or restore as section |
| 3 | Vue `public/sitemap.xml` has 129 URLs, React one has 191 — Vue is a strict subset | `public/sitemap.xml` | Irrelevant once React ships; until then 62 URLs are un-indexed |
| 4 | No build/deploy path for React | root `package.json`, no `.github/workflows` | Make `react-app` the root build (or promote it) and add CI |
| 5 | Router meta `description` is the same generic string on ~12 routes | `react-app/src/router.jsx` | Per-page descriptions (SEO); cheap, do during implementation |

---

## 3. Page inventory — 22 templates → 239 paths

`L` = carries logic (API / store / third-party). `P` = presentation only.

### Family B — Destination templates (191 paths, one layout)
Shared spine: `HeaderContainer → AirlinesLogos → WorksContainer → [cards] → ReviewsSection → DescriptionVue → ContactSection`

| Template | Routes | Paths | Type | mb state |
|---|---|---|---|---|
| `FlightPage` | `/flight/{region\|country\|city}/:slug/:id` | 176 | P | generic `.mb-page`, styled via `mb-flight-deals.scss` |
| `BestDeals` | `/best-deals/:region/:id` | 8 | L | generic `.mb-page`, styled via `mb-flight-deals.scss` |
| `DynamicPage` | `/business-class-*` | 6 | L | `.mb-dynamic-page` |
| `FlightQuotePage` | `/flight?fly_from&fly_to…` | 1 | L | generic, styled via `mb-quote-funnel.scss` |

### Family C — Lead-form landings (5 pages, two layouts)
| Template | Routes | Type | mb state | Layout |
|---|---|---|---|---|
| `PromoPage` | `/promo/senior-business-class-discounts` | P | `.mb-promo` | `SecondBlock` only |
| `StudentFlightsPage` | `/business-class-flights/student-flights` | P | `.mb-promo` | `SecondBlock` only |
| `SendFacebookPage` | `/facebook-leads` | L | generic | `SecondBlock` only (internal lead tool) |
| `BlackFridayPage` | `/black-friday-busines-class-seat-sale` | P | `.mb-seasonal-hero` | `RegionVue → BlackFridaySearch → ReviewsSection` |
| `XmasPage` | `/xmas-new-year-flight-sale` | P | `.mb-seasonal-hero` | same as Black Friday |

### Family D — Content pages (5)
| Template | Routes | Type | mb state | Layout |
|---|---|---|---|---|
| `AboutUsPage` | `/about-us` | P | `.mb-about` | `FirstBlock → SecondBlock → ThirdBlock → BottomBlock` |
| `FaqPage` | `/faq` | P | `.mb-cl-hero` | `FaqSection` (shared with homepage) |
| `TermsPrivacyPage` | `/terms`, `/terms-and-conditions`, `/privacy`, `/privacy-policy` | L | `.mb-cl-hero .mb-legal-body` | legal body + `ContactSection` |
| `SitemapPage` | `/sitemap` | P | generic | inline list |
| `404Error` | `*` | P | `.mb-btn-gold` | inline |

### Family E — Airlines (31 paths)
| Template | Routes | Paths | Type | mb state | Layout |
|---|---|---|---|---|---|
| `AirlinesPage` | `/airlines` | 1 | P | `.mb-airlines` grid + hero | inline `AirlineCard` grid (Vue had a carousel — deliberate change) |
| `AirlineDetail` | `/airlines/:slug` | 30 | P | `.mb-airline-detail` | `WorksContainer → FirstBlockAirline → SecondBlock → AirlineDescription` |

### Family F — Blog (decision pending)
| Template | Routes | Type | mb state |
|---|---|---|---|
| `BlogPage` | `/blog` | L | `.mb-blog-page` |
| `InnerBlogPage` | `/blog/:id` | L | `.mb-inner-blog-page` |
Live nav links to `https://blog.buybusinessclass.com/`. If the external blog is the product, these two templates are dead weight.

### Standalone templates
| Template | Routes | Type | mb state | Layout |
|---|---|---|---|---|
| `MainPage` | `/` | L | `.mb-home` (29 selectors) | 12 sections; 6 without design |
| `ReviewsPage` | `/reviews` | L | `.mb-reviews-page` | header → `AirlinesLogos` → `ReviewsContainer` → `WorksContainer` → `ContactSection` |
| `BusinessFlights` | `/business-class-flights` | P | `.mb-bf-*` (8 selectors) | `OrderFly → TestimonialsCarousel → SeoContent` |
| `AllDeals` | `/all-deals` | L | `.mb-cl-hero` | `OfferCard` grid → `WorksContainer` → `ContactSection` |

### Shared sections — design once, propagate everywhere
| Component | Used by (pages) | Note |
|---|---|---|
| `ContactSection` | 8 | |
| `WorksContainer` | 8 | "How it works" — already in mockup |
| `AirlinesLogos` | 7 + footer | |
| `ReviewsSection` | 6 | already in mockup |
| `HeaderContainer` | 5 pages, **5 different components** (`MainPage/`, `Flight/`, `Quote/`, `DynamicPage/`, `Reviews/`) | one design, five implementations — treat as one family |
| `SecondBlock` (lead form) | 4 | canonical lead form, `intl-tel-input` + reCAPTCHA |
| `OfferCard` / `FlightCards` | 4 | deal card — mockup has a version |
| `DescriptionVue` | 2 | CMS HTML body |
| `BestSelling` | 2 | |
| `OrderFly` | hero + BusinessFlights | full funnel: airport autocomplete, cabin, passengers, portaled calendar, phone, reCAPTCHA |
| Global chrome | all | `Header` (desktop nav + `BurgerMenu`), `Footer`, `DialogForm`, `CallUsForm`, `DisclaimerForm`, `CouponForm`, `ModalStatus`, `QuoteLoader`, `StickyContactButton`, calendar popper — owned by `mb-chrome.scss` |

---

## 4. Decisions required before design starts (Phase 0)

These block everything downstream. Each is a one-line answer.

| # | Decision | Recommendation | Why |
|---|---|---|---|
| D1 | Is `mb-tokens.scss` the design system baseline, or is it discarded? | **Baseline.** Feed it to Claude Design at onboarding | Otherwise you get a second interpretation of the same brand and two diverging truths |
| D2 | Navigation model | **Real site nav** (Home / About / Airlines / Business Class Flights / Blog / phone), not the mockup's 4 anchor links | Mockup is a one-pager; site has 239 pages |
| D3 | Hero funnel | **Full `OrderFly`** re-skinned, not the mockup's 4-field form + name/email/phone modal | The mockup funnel drops airport autocomplete, cabin, passengers, reCAPTCHA — that is the lead pipeline |
| D4 | Blog: internal templates or external subdomain | Confirm with product | Determines whether 2 templates get designed or deleted |
| D5 | `AirlinesLogos` on homepage: section or footer only | Footer only (matches mockup), section on inner pages | Cheapest; preserves the mockup |
| D6 | `GoogleReview` on homepage: restore or drop | Restore | It was on the live site; dropping it silently is a regression |
| D7 | Build target | `react-app` becomes the deployable; `src/` frozen | Nothing ships otherwise |

D2 and D4 are the only contested ones. If they need the five-expert debate, run it on those two only.

---

## 5. Phases

### Phase 0 — Decisions + P0 fixes
Owner: you (decisions), Claude Code (fixes).
- Answer D1–D7.
- Fix defects §2 #1, #2, #4 (mount `GoogleReview`; settle `AirlinesLogos`; make React buildable from root with CI).
- Freeze `src/` (Vue): no more changes there. Do not delete yet.

Exit: React builds green from root, homepage has all 12 sections, decisions written into `react-app/README.md`.

### Phase 1 — Design system + chrome in Claude Design
Owner: you, in Claude Design.
- Onboard: point Claude Design at `react-app/` so it derives the design system from `mb-tokens.scss`, the `mb-*.scss` files, Inter + Playfair, and existing components. Verify the extracted tokens match the mockup values before generating anything.
- Web-capture the **live** site (Vue, old brand) for structure and real content; do not let it invent copy or placeholder images.
- Design board 1 — **global chrome**: desktop nav, burger menu (mobile), footer (full: socials, privacy, terms, sitemap, logos strip), sticky contact pill, all modals (quote dialog, call-us, disclaimer, coupon, status toast), quote loader.
- Design board 2 — **shared sections**: `ContactSection`, `WorksContainer`, `ReviewsSection`, `AirlinesLogos`, `OfferCard`, `SecondBlock` lead form (with validation states), full `OrderFly` funnel (with calendar + phone input states), the three buttons.

Exit: two boards approved. Everything after inherits from them.

### Phase 2 — Page references in Claude Design (leverage order)
Owner: you. One board per family; each board = desktop + mobile.

| Step | Board | Covers | Paths |
|---|---|---|---|
| 2.1 | Homepage — remaining 6 sections (`Regions`, `SeoContent`, `FAQ`, `Newsletter`, `Contact`, `GoogleReview`) | `MainPage` | 1 |
| 2.2 | Destination page | `FlightPage`, `BestDeals`, `DynamicPage` (one layout, three data variants) | 190 |
| 2.3 | Quote result page | `FlightQuotePage` (price cards, congrats state, `CallUsForm` after 5 s) | 1 |
| 2.4 | Lead landing (form-only) + seasonal landing | `Promo`, `StudentFlights`, `SendFacebook` / `BlackFriday`, `Xmas` | 5 |
| 2.5 | Airlines list + airline detail | `AirlinesPage`, `AirlineDetail` | 31 |
| 2.6 | About Us | `AboutUsPage` | 1 |
| 2.7 | Business Class Flights | `BusinessFlights` | 1 |
| 2.8 | Reviews | `ReviewsPage` | 1 |
| 2.9 | All Deals | `AllDeals` | 1 |
| 2.10 | Content: FAQ, Legal, Sitemap, 404 | 4 templates, one "content page" pattern | 7 |
| 2.11 | Blog list + article — **only if D4 = internal** | `BlogPage`, `InnerBlogPage` | 2 |

Ten to eleven boards. After 2.2 you have references for 80% of all URLs.

Rule for every board: it must contain exactly the sections the React template renders (see §3), in that order. Nothing added, nothing removed, unless it goes back through §4 as a decision.

### Phase 3 — Implementation via Claude Code (same order as Phase 2)
Owner: Claude Code session, from Claude Design handoff bundles.
- Constraint: **presentation only**. The 42 logic-bearing components keep their hooks, effects, API calls, store access and meta writers untouched; only markup and classes change. Diff any `useEffect` / store call in review.
- Work per family: update the shared component first, then the page template, then run the family's URLs.
- Reconcile, don't replace: the existing `mb-*.scss` is the starting point; adjust it toward the approved board rather than writing a parallel stylesheet.
- Keep the guards documented in `mb-quote-funnel.scss` / `mb-hero.scss` (validation reds via `:not(.has-error)`); they are what keep the lead forms working.

Exit per family: all its paths render from the reference with no console errors on desktop + Android Chrome.

### Phase 4 — QA
Owner: Claude in Chrome (visual), Playwright (regression).
- Visual: the 25 representative URLs (17 unique pages + 8 template instances, list in `ALL_PATHS.md`), live vs `localhost:8080`, desktop + mobile viewport.
- Regression: `all_paths.txt` (239 URLs) through Playwright — status, console errors, `<title>` contains `| BuyBusinessClass`, canonical present. The existing checklist doc already prescribes exactly this.
- Funnel: submit `OrderFly`, `SecondBlock`, coupon form on staging; confirm `lead_created` + Bing UET fire; confirm FB PageView on SPA navigation.
- Mobile: Android-first pass on hero form, calendar popper, burger, sticky pill, modals.

### Phase 5 — Cutover
- Ship `react-app/public/sitemap.xml` (191) and `robots.txt`.
- Redirect map for the 4 legal aliases and any renamed slugs.
- Delete `src/`, `vue.config.js`, `babel.config.js`, root Vue deps, `HTML new version of site/` after two weeks of clean production metrics.
- Update the two `VUE_REACT_*` audits with the `GoogleReview` correction, then archive them.

---

## 6. Sizing (relative, not hours)

| Phase | Size | Gate |
|---|---|---|
| 0 | S | decisions written; React builds from root |
| 1 | M | 2 boards approved |
| 2 | L | 10–11 boards approved; 2.2 alone unlocks 190 paths |
| 3 | L | per-family exit; runs behind Phase 2 by one family |
| 4 | M | 25-URL visual pass + 239-URL regression green |
| 5 | S | Vue removed |

Phases 2 and 3 pipeline: implement family N while designing family N+1.

---

## 7. What graphify is for from here
- Before touching a shared component, query its dependents (`graph.json`) to get the blast radius — e.g. `ContactSection` → 8 pages, `HeaderContainer` → 5 components under one name.
- Re-run after each family lands (`--update`) to confirm no logic node gained or lost edges — that is the "presentation only" guard, mechanically.
- Do not rely on `GRAPH_REPORT.md` surprises; cross-file edges were weakened by the `.vue`/`.jsx` normalization. Communities and per-node dependents are reliable.

---

## Appendix — files delivered in this session
- `ALL_PATHS.md` / `all_paths.txt` — 239 paths with live + local links, by category
- `graph.html` / `graph.json` — interactive dependency graph, 20 labelled communities
- `obsidian-vault.zip` — 347 notes, one per symbol
