# Vue → React link / CTA / navigation gaps

**Generated:** 2026-07-31  
**Scope:** Conversion-critical links, CTAs, and navigation bindings (Vue `src/` vs React `react-app/`).  
**Method:** Grep of Vue `router-link` / `:link=` / button CTAs / `tel:` / Trustpilot / Best Deals patterns; React equivalent review; Playwright spot-checks on localhost:8080.

---

## Summary

| Status | Count |
|---|---:|
| Fixed this pass | 8 |
| Already OK (verified) | many shared surfaces |
| Remaining / needs decision | 4 |

Highest-impact bug found and fixed: **Burger “Best Deals” always went to `/best-deals/unset/0`** because React read `regions.regions[0]` while the Zustand store stores a **flat** `regions` array.

---

## Fixed this pass

### [x] HIGH — Burger Best Deals → `/best-deals/unset/0`
- **Vue:** `src/components/BurgherMenu.vue` → `/best-deals/${regions.regions[0].name}/${id}`
- **React (was):** `BurgerMenu.jsx` used `regions?.regions?.[0]` → always undefined → `/best-deals/unset/0`
- **Fix:** Use `regions[0]`, prefetch `getRegions()`, build destination correctly
- **Verified:** Burger Best Deals → `/best-deals/europe/1`

### [x] MED — `OrangeFilledButton` missing `link` prop
- **Vue:** `OrangeFilledButton.vue` supports `:link` → `router-link`
- **React (was):** button + `click` only; call sites used raw `Link` wrappers
- **Fix:** Restored Vue-parity `link` API in `OrangeFilledButton.jsx`

### [x] MED — BestSelling “See All Deals” uses shared button
- Now `OrangeFilledButton link="/all-deals"` (was raw `Link` with class)
- **Verified:** href `/all-deals`

### [x] MED — Regions “View More” uses shared button
- Now `BlackWithOrangeTextButton link="/all-deals"` (was raw `Link` with class)
- SCSS updated so wrapper + inner `<a>` match button styles
- **Verified:** three View More → `/all-deals`

### [x] MED — Reviews header “Book a Flight”
- Now `OrangeFilledButton link="/"`

### [x] MED — BestDeals “View Offer Details”
- Now `OrangeFilledButton` with `/flight/region/{name}/{id}`
- **Verified:** `/flight/region/europe/1`  
- Note: Vue named-route omits `id`; React including `id` is correct for the route shape

### [x] LOW — Homepage Reviews “Read more” Trustpilot CTA
- Now `TransparentButton` with `regularLink` + `target="_blank"` (matches Vue `ReviewsVue`)

### [x] MED — Blog list “Read More” CTA
- Vue `BlogCard` has explicit **Read More** button; React had whole-card `Link` only (no visible CTA button)
- **Fix:** Card content + `BlackWithOrangeTextButton`; header cards use `OrangeFilledButton` “Read more”

### [x] Already fixed earlier (confirmed still OK)
- About / Works **Book your Flight Now** conditional home link (`''` on `/` + scroll; `'/'` elsewhere)
- **Verified on Best Deals page:** Book your Flight Now → `/`

---

## Already OK (no React gap)

| Area | Vue | React | Notes |
|---|---|---|---|
| Header desktop nav | Home, About, Airlines, BCF, external Blog | Same | Blog → `https://blog.buybusinessclass.com/` |
| Header tel | `tel:${settings.number}` | Same | |
| Header Trustpilot / CCRA badges | external `target=_blank` | Same | |
| Burger other links | Home…Reviews + tel | Same (Best Deals fixed above) | |
| Footer socials / privacy / terms / sitemap | match | match | |
| StickyContactButton | `tel:+18883227999` | Same | **No WhatsApp in either codebase** |
| Contact CTAs | tel / mailto / Show on map | Same + `regularLink` | |
| OfferCard overlays (BestSelling / FlightCards / AllDeals) | overlay `router-link` | `OfferCard to=` | |
| Flight FirstBlock destination rows | linked when not city | Same | |
| AirlineDetail “Get a Quote” rows | link to `/flight/city/...` | Same | |
| Airlines cards | navigate by slug | Same | |
| TransparentSelect options | `/best-deals` or `/flight/...` | Same | |
| Faq “Find More Questions” | `/faq` | Same | |
| AboutUs “Find Your Perfect…” | push `/` | `Link to="/"` | Verified |
| GoogleReview | g.page review URL | Same | |
| PersonaAssistant phone | `tel:` | Same | |
| Coupon / forms privacy+terms | present | present | |
| Dynamic SEO pages CTAs | hero form + shared sections | Same stack | |
| Student / Promo / BF / Xmas | quote form CTAs | Same | |

---

## Remaining gaps (ranked)

### 1. MED — Desktop header has no “Best Deals” / “Reviews” (both Vue & React)
- Only the **burger** exposes Best Deals + Reviews.
- Desktop nav matches Vue today.
- **Needs user decision:** Add Best Deals + Reviews to desktop header for conversion, or keep Vue parity?

### 2. LOW — DialogForm phone number source
- **Vue:** hardcoded `tel:+18559552040`
- **React:** `settings?.number` with that as fallback (may dial the 888 number instead)
- **Needs user decision:** Hardcode 855 like Vue, or prefer settings-driven?

### 3. LOW — Internal `/blog` vs external Blog nav
- Nav Blog → external subdomain (both apps).
- Internal `/blog` + `/blog/:id` still exist; React now has Read More CTAs.
- **Needs user decision:** Keep dual blog surfaces, or redirect `/blog` → external?

### 4. LOW — Unused Vue `ReviewsVueWithSlider` (“Read more reviews” → `/reviews`)
- Not mounted on any live Vue page (homepage uses Trustpilot `ReviewsVue`).
- React homepage matches the mounted Vue component.
- No action unless product wants the slider + `/reviews` CTA restored.

---

## Playwright spot-checks (React `localhost:8080`)

| Check | Result |
|---|---|
| Homepage See All Deals | `/all-deals` |
| Homepage Regions View More ×3 | `/all-deals` |
| Burger Best Deals | `/best-deals/europe/1` (not unset) |
| Best Deals View Offer Details | `/flight/region/europe/1` |
| Best Deals Works CTA | Book your Flight Now → `/` |
| About Us Find Your Perfect… | `/` |

---

## Files changed

| File | Change |
|---|---|
| `react-app/src/components/BurgerMenu/BurgerMenu.jsx` | Fix Best Deals destination + load regions |
| `react-app/src/components/common/Buttons/OrangeFilledButton.jsx` | Add `link` → `Link` support |
| `react-app/src/components/MainPage/BestSelling.jsx` | See All Deals via OrangeFilledButton |
| `react-app/src/components/MainPage/RegionsSection.jsx` | View More via BlackWithOrangeTextButton |
| `react-app/src/components/MainPage/ReviewsSection.jsx` | Trustpilot Read more via TransparentButton |
| `react-app/src/pages/ReviewsPage.jsx` | Book a Flight via OrangeFilledButton |
| `react-app/src/pages/BestDeals.jsx` | View Offer Details via OrangeFilledButton |
| `react-app/src/pages/BlogPage.jsx` | Explicit Read More / Read more CTAs |
| `react-app/src/styles/main-page.scss` | Regions / See All button wrapper styles |
| `react-app/src/styles/content-pages.scss` | Blog card Read More layout |

Vue app code was **not** modified.

---

## Suggested next checks (manual)

- [ ] Mobile burger Best Deals on cold load (before regions cache)
- [ ] `/blog` Read More buttons desktop + mobile
- [ ] Contact “Show on map” opens Google Maps in new tab
- [ ] AllDeals card overlays → correct `/best-deals/{region}/{id}`
- [ ] Confirm DialogForm should dial 855 vs settings number
