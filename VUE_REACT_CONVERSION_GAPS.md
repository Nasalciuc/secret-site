# Vue → React conversion gaps (beyond links)

**Generated:** 2026-07-31  
**Updated:** 2026-07-31 (getMeta wired)  
**Scope:** Features, behavior, SEO meta, widgets, forms, stores, lifecycle — not link/CTA inventory (see `VUE_REACT_LINK_GAPS.md`).  
**Method:** Router/App shell diff, page section inventory, pattern greps (`localStorage`, meta, third-party, modals, forms), store parity, seasonal/legal/footer sample.

---

## Summary

| Severity | Open | Fixed (all passes) |
|---|---:|---:|
| High | 0 | 3 |
| Med | 0 | 10 |
| Low | 4 | 2 |
| **Total** | **4 open** | **15 fixed** |

Do **not** re-list items already closed in `VUE_REACT_LINK_GAPS.md` unless still broken (none found re-broken).

---

## Fixed this pass

### [x] MED — Brand-suffix helper for dynamic/API titles
- **Vue:** `App.vue` metainfo: `content ? \`${content} | BuyBusinessClass\` : default`
- **Fix:** Added `react-app/src/utils/brandTitle.js` (`withBrandTitle`, no double-suffix). Wired in `MetaUpdater`, Flight `HeaderContainer`, `BestDeals`, `DynamicPage`, Reviews/Terms/Quote/InnerBlog. Homepage keeps unsuffixed default (Vue MainPage empty title override).

### [x] MED — Canonical URL uses `pathname` only (drops query)
- **Vue:** `router.js` `canonicalUrl = origin + to.fullPath`
- **Fix:** `MetaUpdater` now uses `pathname + search`

### [x] MED — Homepage WebSite JSON-LD SearchAction mismatch in `index.html`
- **Was:** static `{search_term_string}` placeholder
- **Fix:** `react-app/index.html` aligned with `MainPage.jsx` runtime schema (`fly_from` / `fly_to` → `/flight?...`)

### [x] MED — Business Class Flights `OrderFly` vs Vue OrderFlyBlock layout
- **QA:** Live vs local `/business-class-flights` — same heading, trip tabs, 600px centered form, fields/CTA
- **Fix:** Removed React-only card chrome (`rgba` background + 16px radius) on `.business-order-fly .header-form.order-fly` so wrapper matches live/Vue

### [x] MED — `scrollToAboutUs` / `scrollToAbout` dead code
- **Vue/React nav:** About → `/about-us` (scroll helpers unused)
- **Fix:** Deleted unused `scrollToAbout` from `Header.jsx` and `scrollToAboutUs` / `setScrollToAboutUs` from `useAppStore`

### [x] LOW — FB PageView on SPA route changes
- **Fix:** `trackFacebookPageView()` in `thirdParty.js`; `MetaUpdater` fires after first pass (skips double-count with pixel init)

### [x] MED — CMS `getMeta` API unused in React
- **Vue:** `getMeta('/best-deals')` in `BestDeals.vue` (CMS defaults); deal meta via `HeaderContainer` `metaInfo` when present. InnerBlog `getMeta('/reviews')` is a Vue bug — not copied. Quote `getMeta` is commented out in Vue.
- **Fix:** `BestDeals.jsx` calls `getMeta('/best-deals')` for CMS title/meta defaults; `getBestDeal().meta` still preferred when present (race-safe via ref). Applied success check correctly (`error !== null` skip) — Vue’s `if (error === null) return` never applied CMS meta.

---

## Fixed prior pass

### [x] HIGH — Seasonal pages used generic `SecondBlock` instead of Vue `BlackFridaySearch`
### [x] HIGH — Quote success missing `lead_created` / Bing UET event
### [x] HIGH — Status modal never auto-closes
### [x] MED — Coupon popup delayed ~10s (double 5s)
### [x] MED — Reviews / quote / terms / inner-blog document titles missing `| BuyBusinessClass`

---

## Remaining gaps (ranked)

### 1. LOW — Student flights Vue sets wrong canonical (React already better)
| | |
|---|---|
| **Severity** | Low (Vue bug; React OK) |
| **Vue evidence** | `StudentFlightsPage.vue` canonical → `/promo/senior-business-class-discounts` |
| **React status** | Router `canonical: true` → actual student path via MetaUpdater |
| **Suggested fix** | Fix Vue if still shipping; no React change needed |

### 2. LOW — `goToAboutUs` in Vue burger unused (template links `/about-us`)
| | |
|---|---|
| **Severity** | Low |
| **React status** | Matches mounted Vue (link to `/about-us`); dead scroll helpers removed |
| **Suggested fix** | None for parity |

### 3. LOW — Tawk.to preconnect present in Vue HTML, load commented out
| | |
|---|---|
| **Severity** | Low |
| **React status** | No tawk preconnect; WhatsApp + `bbc-widget` present like Vue body |
| **Suggested fix** | Ignore unless product re-enables Tawk |

### 4. LOW — LINK_GAPS remaining product decisions (not re-audited as new)
| | |
|---|---|
| **Severity** | Low |
| **Notes** | Desktop nav Best Deals/Reviews; DialogForm 855 vs settings; internal `/blog` vs external — see `VUE_REACT_LINK_GAPS.md` |

---

## Checked OK (parity / no new gap)

| Area | Notes |
|---|---|
| Router routes | Same static set; React enumerates `dynamicPages.json`; `/sitemap` React-only (Vue had no route — React ahead) |
| App shell | Sticky phone, burger, ModalStatus, QuoteLoader, Footer, Coupon 5s, resize, marketing_source |
| Scroll to top | Vue `scrollBehavior` ↔ React `App.jsx` pathname effect |
| Brand title suffix | Central `withBrandTitle` + MetaUpdater / API page writers |
| CMS `getMeta` | Best Deals only; deal meta preferred; InnerBlog `/reviews` not copied |
| Canonical | `origin + pathname + search` (Vue `fullPath`) |
| WebSite SearchAction | Static `index.html` + MainPage runtime both use `fly_from`/`fly_to` |
| Business Flights form | Shared OrderFly; layout QA vs live OK after CSS tweak |
| About nav | `/about-us`; dead scroll helpers removed |
| FB SPA PageView | After pixel ready, on client navigations |
| Main page sections | Logos, Works, BestSelling, Reviews, GoogleReview, Regions, Seo, FAQ, Newsletter, Contact |
| Newsletter | `SubscribePage.vue` ↔ `NewsletterBanner.jsx` + `/contacts/subscribe` |
| intl-tel-input | OrderFly ClientInfo, SecondBlock, CouponForm |
| GTM / Hotjar / FB pixel / reCAPTCHA | `thirdParty.js` ↔ Vue deferred `index.html` loaders |
| WhatsApp schedule widget + bbc-widget | Both `index.html` bodies |
| Responseiq / jivo helpers | Present in both `helpers` |
| `fireLeadCreatedEvent` helper | Includes `uetq` (called from quote) |
| Flight page sections | Header + logos + works + cards (non-city) + reviews + description + contact |
| About Us / FAQ / Terms / Facebook leads | Present; FB uses `SecondBlock` + `sendFBLead` |
| Trustpilot widget script | React `index.html` defer bootstrap |
| CallUsForm on quote page | Both mount after 5s |

---

## Top remaining to fix next

1. LINK_GAPS product decisions — Low  
2. Vue-only cleanups (student canonical, tawk) — Low / out of React scope  

No Med gaps remain.

---

## Files changed this pass

| File | Change |
|---|---|
| `react-app/src/utils/brandTitle.js` | **New** — `withBrandTitle` / default title |
| `react-app/src/router.jsx` | Brand titles, canonical `pathname+search`, FB SPA PageView |
| `react-app/src/utils/thirdParty.js` | `trackFacebookPageView` after pixel ready |
| `react-app/index.html` | WebSite SearchAction → fly_from/fly_to |
| `react-app/src/components/Flight/HeaderContainer.jsx` | API title via `withBrandTitle` |
| `react-app/src/pages/BestDeals.jsx` | API title via `withBrandTitle`; **`getMeta('/best-deals')` CMS defaults**, deal meta preferred |
| `react-app/src/pages/DynamicPage.jsx` | API title via `withBrandTitle` |
| `react-app/src/pages/ReviewsPage.jsx` | `withBrandTitle('Reviews')` |
| `react-app/src/pages/TermsPrivacyPage.jsx` | `withBrandTitle(title)` |
| `react-app/src/pages/FlightQuotePage.jsx` | `withBrandTitle('Search result')` |
| `react-app/src/pages/InnerBlogPage.jsx` | `withBrandTitle(name)` (no `getMeta('/reviews')`) |
| `react-app/src/components/Header/Header.jsx` | Remove dead `scrollToAbout` |
| `react-app/src/store/useAppStore.js` | Remove `scrollToAboutUs` |
| `react-app/src/styles/business-flights.scss` | Drop OrderFly card chrome to match live |

Vue app code was **not** modified. No commit created.
