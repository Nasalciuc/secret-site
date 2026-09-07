# Graph Report - secret-site (pass 2 — resolved imports + semantic layer)  (2026-09-06)

## Corpus Check
- Large corpus: 244 files · ~92,074 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 537 nodes · 1004 edges · 16 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `react__services__api.js` - 26 edges
2. `react__store__useAppStore.js` - 26 edges
3. `vue__router.js` - 26 edges
4. `vue__controllers__flyController.js` - 21 edges
5. `react__components__HeaderForm__FlightCard__SecondBlock.js` - 19 edges
6. `react__components__HeaderForm__OrderFly__OrderFly.js` - 19 edges
7. `react__pages__BestDeals.js` - 18 edges
8. `react__pages__MainPage.js` - 16 edges
9. `react__components__Flight__HeaderContainer.js` - 16 edges
10. `vue__components__HeaderForm__FlightCard__SecondBlock.js` - 16 edges
11. `vue__components__ContactVue.js` - 15 edges
12. `react__components__MainPage__ReviewsSection.js` - 15 edges
13. `react__pages__ReviewsPage.js` - 15 edges
14. `react__components__MainPage__ContactSection.js` - 14 edges
15. `react__pages__FlightQuotePage.js` - 14 edges

## Surprising Connections (you probably didn't know these)
- `POST /contacts/subscribe` --hosted_on--> `env VITE_API_URL`  [EXTRACTED]
  semantic → semantic  _Bridges community 0 → community 11_
- `GET /api/settings/getAll` --hosted_on--> `env VITE_BACK`  [EXTRACTED]
  semantic → semantic  _Bridges community 1 → community 11_
- `GET /api/bestDeals/getDestinations` --hosted_on--> `env VITE_BACK`  [EXTRACTED]
  semantic → semantic  _Bridges community 3 → community 11_
- `GET /api/articles/getAll` --hosted_on--> `env VITE_BACK`  [EXTRACTED]
  semantic → semantic  _Bridges community 8 → community 11_

## Communities

### Community 0 - "Homepage + shared sections + mockup"
Cohesion: 0.04
Nodes (17): B0 shared, B10 all deals, B1 homepage, DEFECT 1: GoogleReview never mounted on homepage (orphan), DEFECT 3: mb-home-engage.scss is .mb-home-only: ContactSection/FaqSection/Newsletter new skin missing on 7 other pages, DEFECT 5: FaqSection heading is literal "FAQ Section", GET /trustpilot, POST /contacts/subscribe (+9 more)

### Community 1 - "App shell & global chrome"
Cohesion: 0.05
Nodes (4): B0 chrome, GET /api/aboutUs/getAll, GET /api/settings/getAll, mb-chrome.scss

### Community 2 - "Lead forms & OrderFly funnel (React)"
Cohesion: 0.06
Nodes (10): B4 lead landings, SecondBlock(), toDisplayDate(), BlackFridaySearch(), toDisplayDate(), route /business-class-flights/student-flights, route /facebook-leads, route /promo/senior-business-class-discounts (+2 more)

### Community 3 - "Destination templates: Flight / BestDeals"
Cohesion: 0.07
Nodes (11): GET /api/bestDeals/getDestinations, GET /api/bestDeals/getMain, formatPrice(), HeaderContainer(), FirstBlockBestDeals(), formatPrice(), route /best-deals/:region/:id, route /flight/city/:city/:id (+3 more)

### Community 4 - "Router, layouts & content pages"
Cohesion: 0.07
Nodes (18): B11 content, DEFECT 4: No build/CI for react-app; root builds Vue, VUE_REACT_CONVERSION_GAPS.md, VUE_REACT_LINK_GAPS.md, VUE_REACT_PAGE_CHECKLIST.md, ensureRecaptcha(), loadFacebookPixel(), loadGtm() (+10 more)

### Community 5 - "Vue legacy: lead forms & controllers"
Cohesion: 0.14
Nodes (3): sendCouponLead(), sendLead(), withRecaptchaToken()

### Community 6 - "Reviews + Vue main-page ports"
Cohesion: 0.08
Nodes (2): B9 reviews, route /reviews

### Community 7 - "Quote result funnel"
Cohesion: 0.08
Nodes (10): B3 quote result, AboutSection(), renderBlocks(), cleanDate(), HeaderContainer(), RouteBlock(), toFullClass(), FlightQuotePage() (+2 more)

### Community 8 - "Dynamic SEO + Blog + AirlinesLogos"
Cohesion: 0.08
Nodes (8): B12 blog (D4), B2 destination, DEFECT 2: AirlinesLogos moved from home section to footer, GET /api/articles/getAll, GET /api/articles/getOne, route /blog, route /blog/:id, mb-blog-dynamic.scss

### Community 9 - "Seasonal pages + Vue router"
Cohesion: 0.08
Nodes (4): B5 seasonal, route /black-friday-busines-class-seat-sale, route /xmas-new-year-flight-sale, mb-seasonal.scss

### Community 10 - "About Us (React + Vue)"
Cohesion: 0.1
Nodes (2): B7 about, route /about-us

### Community 11 - "API layer & endpoints"
Cohesion: 0.12
Nodes (17): GET /airports/autocomplete, GET /api/bestDeals/getAllDeals, GET /api/bestDeals/getOne, GET /api/meta/getMeta, GET /api/{privacy|terms}/getAll, GET /flights/search, POST /contacts/submit, POST /requests/create (+9 more)

### Community 12 - "Airlines (React + Vue + data)"
Cohesion: 0.11
Nodes (4): B6 airlines, route /airlines, route /airlines/:slug, mb-about-airlines.scss

### Community 13 - "Business Class Flights page"
Cohesion: 0.12
Nodes (2): B8 business flights, route /business-class-flights

### Community 14 - "Vue legacy: bootstrap & Vuex"
Cohesion: 0.13
Nodes (0): 

### Community 15 - "Vue helper: find"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **8 isolated node(s):** `mb-tokens.scss`, `VUE_REACT_PAGE_CHECKLIST.md`, `VUE_REACT_CONVERSION_GAPS.md`, `VUE_REACT_LINK_GAPS.md`, `B7 about` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Vue helper: find`** (2 nodes): `vue__helpers__methods__find.js`, `findEqualStringInArrayOfObjects()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `B0 shared` connect `Homepage + shared sections + mockup` to `Dynamic SEO + Blog + AirlinesLogos`, `Lead forms & OrderFly funnel (React)`, `Destination templates: Flight / BestDeals`, `Quote result funnel`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `route /about-us` connect `About Us (React + Vue)` to `Destination templates: Flight / BestDeals`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `mb-about-airlines.scss` connect `Airlines (React + Vue + data)` to `About Us (React + Vue)`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `mb-tokens.scss`, `VUE_REACT_PAGE_CHECKLIST.md`, `VUE_REACT_CONVERSION_GAPS.md` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Homepage + shared sections + mockup` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
- **Should `App shell & global chrome` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Lead forms & OrderFly funnel (React)` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Destination templates: Flight / BestDeals` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._