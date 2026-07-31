# Vue / Live → React page test checklist

Inventory of BuyBusinessClass pages discovered from:
- Live site crawl via Playwright (`https://buybusinessclass.com/`)
- Live `sitemap.xml` (191 URLs; richer than repo `public/sitemap.xml`)
- Live `/sitemap` HTML + homepage / all-deals / seasonal hubs
- Vue router (`src/router.js`) + React router (`react-app/src/router.jsx`)
- Airline slugs (`react-app/src/data/airlines.js`) + `dynamicPages.json`

**Generated:** 2026-07-31  
**React test base:** `http://localhost:8080`  
**Live base:** `https://buybusinessclass.com`  
**Unique paths in this checklist:** 238

## How to use

1. Run React locally on port 8080.
2. Open each path below on React; compare with the live URL.
3. Check: page renders (not 404), hero/content loads, key CTAs work, no console-breaking errors.
4. Paths with spaces must be URL-encoded (e.g. `/flight/country/south%20korea/369`).

## React router coverage notes

| Vue pattern | React | Notes |
|---|---|---|
| `/` … static pages | yes | Same static set |
| `/flight/{region\|country\|city}/:slug/:id` | yes | Pattern match |
| `/best-deals/:region/:id` | yes | Pattern match |
| `/airlines/:slug` | yes | Pattern match; 30 known slugs |
| `/blog`, `/blog/:id` | yes | Live **nav** links to external `https://blog.buybusinessclass.com/` |
| `/business-class-:suffix` | partial → enumerated | React lists keys from `dynamicPages.json` (6 pages) |
| `/sitemap` | yes (React page) | Also static `sitemap.html` |
| `/facebook-leads` | yes | Internal lead tool |

### Likely missed / priority smoke tests

These are easy to skip if you only tested homepage cards:

- [ ] `/faq`
- [ ] `/business-class-flights/student-flights`
- [ ] `/promo/senior-business-class-discounts`
- [ ] `/black-friday-busines-class-seat-sale`
- [ ] `/xmas-new-year-flight-sale`
- [ ] `/airlines/korean` (and other airline details)
- [ ] `/business-class-affordable-flight` (dynamic SEO)
- [ ] `/flight/country/austria/109` (in live sitemap / homepage; often missing from older local sitemaps)
- [ ] `/flight/country/south korea/369` (space encoding)
- [ ] `/best-deals/asia/281` (and other region best-deals)
- [ ] `/sitemap`
- [ ] `/blog` vs external blog subdomain

### Category counts

| Category | Count |
|---|---:|
| Static / core | 11 |
| Promo / seasonal | 3 |
| Legal | 4 |
| Best deals | 8 |
| Flight regions | 7 |
| Flight countries | 78 |
| Flight cities | 89 |
| Airlines | 31 |
| Dynamic SEO (business-class-*) | 6 |
| Blog | 1 |
| **Total unique** | **238** |

## Static / core (11)

| Test | Path | Live example | React route |
|---|---|---|---|
| - [ ] | `/` | [/](https://buybusinessclass.com/) | yes |
| - [ ] | `/about-us` | [/about-us](https://buybusinessclass.com/about-us) | yes |
| - [ ] | `/all-deals` | [/all-deals](https://buybusinessclass.com/all-deals) | yes |
| - [ ] | `/business-class-flights` | [/business-class-flights](https://buybusinessclass.com/business-class-flights) | yes |
| - [ ] | `/business-class-flights/student-flights` | [/business-class-flights/student-flights](https://buybusinessclass.com/business-class-flights/student-flights) | yes |
| - [ ] | `/facebook-leads` | [/facebook-leads](https://buybusinessclass.com/facebook-leads) | yes |
| - [ ] | `/faq` | [/faq](https://buybusinessclass.com/faq) | yes |
| - [ ] | `/flight` | [/flight](https://buybusinessclass.com/flight) | yes |
| - [ ] | `/reviews` | [/reviews](https://buybusinessclass.com/reviews) | yes |
| - [ ] | `/sitemap` | [/sitemap](https://buybusinessclass.com/sitemap) | yes |
| - [ ] | `/sitemap.html` | [/sitemap.html](https://buybusinessclass.com/sitemap.html) | partial (static file in `react-app/public/sitemap.html`; SPA route is `/sitemap`) |

Checklist (copy-friendly):

- [ ] `/` → React: `http://localhost:8080/` | Live: `https://buybusinessclass.com/`
- [ ] `/about-us` → React: `http://localhost:8080/about-us` | Live: `https://buybusinessclass.com/about-us`
- [ ] `/all-deals` → React: `http://localhost:8080/all-deals` | Live: `https://buybusinessclass.com/all-deals`
- [ ] `/business-class-flights` → React: `http://localhost:8080/business-class-flights` | Live: `https://buybusinessclass.com/business-class-flights`
- [ ] `/business-class-flights/student-flights` → React: `http://localhost:8080/business-class-flights/student-flights` | Live: `https://buybusinessclass.com/business-class-flights/student-flights`
- [ ] `/facebook-leads` → React: `http://localhost:8080/facebook-leads` | Live: `https://buybusinessclass.com/facebook-leads`
- [ ] `/faq` → React: `http://localhost:8080/faq` | Live: `https://buybusinessclass.com/faq`
- [ ] `/flight` → React: `http://localhost:8080/flight` | Live: `https://buybusinessclass.com/flight`
- [ ] `/reviews` → React: `http://localhost:8080/reviews` | Live: `https://buybusinessclass.com/reviews`
- [ ] `/sitemap` → React: `http://localhost:8080/sitemap` | Live: `https://buybusinessclass.com/sitemap`
- [ ] `/sitemap.html` → React: `http://localhost:8080/sitemap.html` | Live: `https://buybusinessclass.com/sitemap.html`

## Promo / seasonal (3)

| Test | Path | Live example | React route |
|---|---|---|---|
| - [ ] | `/black-friday-busines-class-seat-sale` | [/black-friday-busines-class-seat-sale](https://buybusinessclass.com/black-friday-busines-class-seat-sale) | yes |
| - [ ] | `/promo/senior-business-class-discounts` | [/promo/senior-business-class-discounts](https://buybusinessclass.com/promo/senior-business-class-discounts) | yes |
| - [ ] | `/xmas-new-year-flight-sale` | [/xmas-new-year-flight-sale](https://buybusinessclass.com/xmas-new-year-flight-sale) | yes |

Checklist (copy-friendly):

- [ ] `/black-friday-busines-class-seat-sale` → React: `http://localhost:8080/black-friday-busines-class-seat-sale` | Live: `https://buybusinessclass.com/black-friday-busines-class-seat-sale`
- [ ] `/promo/senior-business-class-discounts` → React: `http://localhost:8080/promo/senior-business-class-discounts` | Live: `https://buybusinessclass.com/promo/senior-business-class-discounts`
- [ ] `/xmas-new-year-flight-sale` → React: `http://localhost:8080/xmas-new-year-flight-sale` | Live: `https://buybusinessclass.com/xmas-new-year-flight-sale`

## Legal (4)

| Test | Path | Live example | React route |
|---|---|---|---|
| - [ ] | `/privacy` | [/privacy](https://buybusinessclass.com/privacy) | yes |
| - [ ] | `/privacy-policy` | [/privacy-policy](https://buybusinessclass.com/privacy-policy) | yes |
| - [ ] | `/terms` | [/terms](https://buybusinessclass.com/terms) | yes |
| - [ ] | `/terms-and-conditions` | [/terms-and-conditions](https://buybusinessclass.com/terms-and-conditions) | yes |

Checklist (copy-friendly):

- [ ] `/privacy` → React: `http://localhost:8080/privacy` | Live: `https://buybusinessclass.com/privacy`
- [ ] `/privacy-policy` → React: `http://localhost:8080/privacy-policy` | Live: `https://buybusinessclass.com/privacy-policy`
- [ ] `/terms` → React: `http://localhost:8080/terms` | Live: `https://buybusinessclass.com/terms`
- [ ] `/terms-and-conditions` → React: `http://localhost:8080/terms-and-conditions` | Live: `https://buybusinessclass.com/terms-and-conditions`

## Best deals (8)

| Test | Path | Live example | React route |
|---|---|---|---|
| - [ ] | `/best-deals/africa/603` | [/best-deals/africa/603](https://buybusinessclass.com/best-deals/africa/603) | yes (pattern `/best-deals/:region/:id`) |
| - [ ] | `/best-deals/asia/281` | [/best-deals/asia/281](https://buybusinessclass.com/best-deals/asia/281) | yes (pattern `/best-deals/:region/:id`) |
| - [ ] | `/best-deals/europe/1` | [/best-deals/europe/1](https://buybusinessclass.com/best-deals/europe/1) | yes (pattern `/best-deals/:region/:id`) |
| - [ ] | `/best-deals/indian subcontinent/398` | [/best-deals/indian%20subcontinent/398](https://buybusinessclass.com/best-deals/indian%20subcontinent/398) | yes (pattern `/best-deals/:region/:id`) |
| - [ ] | `/best-deals/latin america/810` | [/best-deals/latin%20america/810](https://buybusinessclass.com/best-deals/latin%20america/810) | yes (pattern `/best-deals/:region/:id`) |
| - [ ] | `/best-deals/middle east/449` | [/best-deals/middle%20east/449](https://buybusinessclass.com/best-deals/middle%20east/449) | yes (pattern `/best-deals/:region/:id`) |
| - [ ] | `/best-deals/oceania/693` | [/best-deals/oceania/693](https://buybusinessclass.com/best-deals/oceania/693) | yes (pattern `/best-deals/:region/:id`) |
| - [ ] | `/best-deals/unset/0` | [/best-deals/unset/0](https://buybusinessclass.com/best-deals/unset/0) | yes (pattern `/best-deals/:region/:id`) |

Checklist (copy-friendly):

- [ ] `/best-deals/africa/603` → React: `http://localhost:8080/best-deals/africa/603` | Live: `https://buybusinessclass.com/best-deals/africa/603`
- [ ] `/best-deals/asia/281` → React: `http://localhost:8080/best-deals/asia/281` | Live: `https://buybusinessclass.com/best-deals/asia/281`
- [ ] `/best-deals/europe/1` → React: `http://localhost:8080/best-deals/europe/1` | Live: `https://buybusinessclass.com/best-deals/europe/1`
- [ ] `/best-deals/indian subcontinent/398` → React: `http://localhost:8080/best-deals/indian%20subcontinent/398` | Live: `https://buybusinessclass.com/best-deals/indian%20subcontinent/398`
- [ ] `/best-deals/latin america/810` → React: `http://localhost:8080/best-deals/latin%20america/810` | Live: `https://buybusinessclass.com/best-deals/latin%20america/810`
- [ ] `/best-deals/middle east/449` → React: `http://localhost:8080/best-deals/middle%20east/449` | Live: `https://buybusinessclass.com/best-deals/middle%20east/449`
- [ ] `/best-deals/oceania/693` → React: `http://localhost:8080/best-deals/oceania/693` | Live: `https://buybusinessclass.com/best-deals/oceania/693`
- [ ] `/best-deals/unset/0` → React: `http://localhost:8080/best-deals/unset/0` | Live: `https://buybusinessclass.com/best-deals/unset/0`

## Flight regions (7)

| Test | Path | Live example | React route |
|---|---|---|---|
| - [ ] | `/flight/region/africa/603` | [/flight/region/africa/603](https://buybusinessclass.com/flight/region/africa/603) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/region/asia/281` | [/flight/region/asia/281](https://buybusinessclass.com/flight/region/asia/281) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/region/europe/1` | [/flight/region/europe/1](https://buybusinessclass.com/flight/region/europe/1) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/region/indian subcontinent/398` | [/flight/region/indian%20subcontinent/398](https://buybusinessclass.com/flight/region/indian%20subcontinent/398) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/region/latin america/810` | [/flight/region/latin%20america/810](https://buybusinessclass.com/flight/region/latin%20america/810) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/region/middle east/449` | [/flight/region/middle%20east/449](https://buybusinessclass.com/flight/region/middle%20east/449) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/region/oceania/693` | [/flight/region/oceania/693](https://buybusinessclass.com/flight/region/oceania/693) | yes (pattern `/flight/{type}/:slug/:id`) |

Checklist (copy-friendly):

- [ ] `/flight/region/africa/603` → React: `http://localhost:8080/flight/region/africa/603` | Live: `https://buybusinessclass.com/flight/region/africa/603`
- [ ] `/flight/region/asia/281` → React: `http://localhost:8080/flight/region/asia/281` | Live: `https://buybusinessclass.com/flight/region/asia/281`
- [ ] `/flight/region/europe/1` → React: `http://localhost:8080/flight/region/europe/1` | Live: `https://buybusinessclass.com/flight/region/europe/1`
- [ ] `/flight/region/indian subcontinent/398` → React: `http://localhost:8080/flight/region/indian%20subcontinent/398` | Live: `https://buybusinessclass.com/flight/region/indian%20subcontinent/398`
- [ ] `/flight/region/latin america/810` → React: `http://localhost:8080/flight/region/latin%20america/810` | Live: `https://buybusinessclass.com/flight/region/latin%20america/810`
- [ ] `/flight/region/middle east/449` → React: `http://localhost:8080/flight/region/middle%20east/449` | Live: `https://buybusinessclass.com/flight/region/middle%20east/449`
- [ ] `/flight/region/oceania/693` → React: `http://localhost:8080/flight/region/oceania/693` | Live: `https://buybusinessclass.com/flight/region/oceania/693`

## Flight countries (78)

| Test | Path | Live example | React route |
|---|---|---|---|
| - [ ] | `/flight/country/algeria/1445` | [/flight/country/algeria/1445](https://buybusinessclass.com/flight/country/algeria/1445) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/argentina/811` | [/flight/country/argentina/811](https://buybusinessclass.com/flight/country/argentina/811) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/australia/694` | [/flight/country/australia/694](https://buybusinessclass.com/flight/country/australia/694) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/austria/109` | [/flight/country/austria/109](https://buybusinessclass.com/flight/country/austria/109) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/bahrain/595` | [/flight/country/bahrain/595](https://buybusinessclass.com/flight/country/bahrain/595) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/bangladesh/1297` | [/flight/country/bangladesh/1297](https://buybusinessclass.com/flight/country/bangladesh/1297) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/belarus/1330` | [/flight/country/belarus/1330](https://buybusinessclass.com/flight/country/belarus/1330) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/belgium/131` | [/flight/country/belgium/131](https://buybusinessclass.com/flight/country/belgium/131) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/brazil/819` | [/flight/country/brazil/819](https://buybusinessclass.com/flight/country/brazil/819) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/bulgaria/1192` | [/flight/country/bulgaria/1192](https://buybusinessclass.com/flight/country/bulgaria/1192) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/cambodia/379` | [/flight/country/cambodia/379](https://buybusinessclass.com/flight/country/cambodia/379) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/chile/834` | [/flight/country/chile/834](https://buybusinessclass.com/flight/country/chile/834) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/china/297` | [/flight/country/china/297](https://buybusinessclass.com/flight/country/china/297) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/croatia/145` | [/flight/country/croatia/145](https://buybusinessclass.com/flight/country/croatia/145) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/cyprus/559` | [/flight/country/cyprus/559](https://buybusinessclass.com/flight/country/cyprus/559) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/czech republic/126` | [/flight/country/czech%20republic/126](https://buybusinessclass.com/flight/country/czech%20republic/126) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/denmark/70` | [/flight/country/denmark/70](https://buybusinessclass.com/flight/country/denmark/70) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/egypt/576` | [/flight/country/egypt/576](https://buybusinessclass.com/flight/country/egypt/576) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/fiji/749` | [/flight/country/fiji/749](https://buybusinessclass.com/flight/country/fiji/749) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/finland/243` | [/flight/country/finland/243](https://buybusinessclass.com/flight/country/finland/243) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/france/5` | [/flight/country/france/5](https://buybusinessclass.com/flight/country/france/5) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/french polynesia/741` | [/flight/country/french%20polynesia/741](https://buybusinessclass.com/flight/country/french%20polynesia/741) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/germany/2` | [/flight/country/germany/2](https://buybusinessclass.com/flight/country/germany/2) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/ghana/1273` | [/flight/country/ghana/1273](https://buybusinessclass.com/flight/country/ghana/1273) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/greece/197` | [/flight/country/greece/197](https://buybusinessclass.com/flight/country/greece/197) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/hong kong/1250` | [/flight/country/hong%20kong/1250](https://buybusinessclass.com/flight/country/hong%20kong/1250) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/hungary/118` | [/flight/country/hungary/118](https://buybusinessclass.com/flight/country/hungary/118) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/iceland/1408` | [/flight/country/iceland/1408](https://buybusinessclass.com/flight/country/iceland/1408) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/india/410` | [/flight/country/india/410](https://buybusinessclass.com/flight/country/india/410) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/indonesia/309` | [/flight/country/indonesia/309](https://buybusinessclass.com/flight/country/indonesia/309) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/ireland/1453` | [/flight/country/ireland/1453](https://buybusinessclass.com/flight/country/ireland/1453) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/israel/450` | [/flight/country/israel/450](https://buybusinessclass.com/flight/country/israel/450) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/italy/90` | [/flight/country/italy/90](https://buybusinessclass.com/flight/country/italy/90) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/japan/282` | [/flight/country/japan/282](https://buybusinessclass.com/flight/country/japan/282) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/jordan/526` | [/flight/country/jordan/526](https://buybusinessclass.com/flight/country/jordan/526) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/kazakhstan/1338` | [/flight/country/kazakhstan/1338](https://buybusinessclass.com/flight/country/kazakhstan/1338) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/kenya/616` | [/flight/country/kenya/616](https://buybusinessclass.com/flight/country/kenya/616) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/lebanon/473` | [/flight/country/lebanon/473](https://buybusinessclass.com/flight/country/lebanon/473) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/lithuania/1289` | [/flight/country/lithuania/1289](https://buybusinessclass.com/flight/country/lithuania/1289) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/luxembourg /1224` | [/flight/country/luxembourg%20/1224](https://buybusinessclass.com/flight/country/luxembourg%20/1224) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/madagascar/630` | [/flight/country/madagascar/630](https://buybusinessclass.com/flight/country/madagascar/630) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/malaysia/374` | [/flight/country/malaysia/374](https://buybusinessclass.com/flight/country/malaysia/374) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/maldives/399` | [/flight/country/maldives/399](https://buybusinessclass.com/flight/country/maldives/399) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/mauritius/1400` | [/flight/country/mauritius/1400](https://buybusinessclass.com/flight/country/mauritius/1400) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/morocco/645` | [/flight/country/morocco/645](https://buybusinessclass.com/flight/country/morocco/645) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/namibia/673` | [/flight/country/namibia/673](https://buybusinessclass.com/flight/country/namibia/673) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/netherlands/254` | [/flight/country/netherlands/254](https://buybusinessclass.com/flight/country/netherlands/254) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/new zealand/726` | [/flight/country/new%20zealand/726](https://buybusinessclass.com/flight/country/new%20zealand/726) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/nigeria/1427` | [/flight/country/nigeria/1427](https://buybusinessclass.com/flight/country/nigeria/1427) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/norway/1242` | [/flight/country/norway/1242](https://buybusinessclass.com/flight/country/norway/1242) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/oman/537` | [/flight/country/oman/537](https://buybusinessclass.com/flight/country/oman/537) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/pakistan/1346` | [/flight/country/pakistan/1346](https://buybusinessclass.com/flight/country/pakistan/1346) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/papua new guinea/760` | [/flight/country/papua%20new%20guinea/760](https://buybusinessclass.com/flight/country/papua%20new%20guinea/760) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/peru/842` | [/flight/country/peru/842](https://buybusinessclass.com/flight/country/peru/842) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/philippines/862` | [/flight/country/philippines/862](https://buybusinessclass.com/flight/country/philippines/862) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/poland/1468` | [/flight/country/poland/1468](https://buybusinessclass.com/flight/country/poland/1468) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/portugal/262` | [/flight/country/portugal/262](https://buybusinessclass.com/flight/country/portugal/262) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/qatar/551` | [/flight/country/qatar/551](https://buybusinessclass.com/flight/country/qatar/551) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/romania/1281` | [/flight/country/romania/1281](https://buybusinessclass.com/flight/country/romania/1281) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/samoa/772` | [/flight/country/samoa/772](https://buybusinessclass.com/flight/country/samoa/772) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/saudi arabia/478` | [/flight/country/saudi%20arabia/478](https://buybusinessclass.com/flight/country/saudi%20arabia/478) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/seychelles/644` | [/flight/country/seychelles/644](https://buybusinessclass.com/flight/country/seychelles/644) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/singapore/361` | [/flight/country/singapore/361](https://buybusinessclass.com/flight/country/singapore/361) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/south africa/604` | [/flight/country/south%20africa/604](https://buybusinessclass.com/flight/country/south%20africa/604) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/south korea/369` | [/flight/country/south%20korea/369](https://buybusinessclass.com/flight/country/south%20korea/369) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/spain/3` | [/flight/country/spain/3](https://buybusinessclass.com/flight/country/spain/3) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/sri lanka/435` | [/flight/country/sri%20lanka/435](https://buybusinessclass.com/flight/country/sri%20lanka/435) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/sweden/270` | [/flight/country/sweden/270](https://buybusinessclass.com/flight/country/sweden/270) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/switzerland/1200` | [/flight/country/switzerland/1200](https://buybusinessclass.com/flight/country/switzerland/1200) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/taiwan/1311` | [/flight/country/taiwan/1311](https://buybusinessclass.com/flight/country/taiwan/1311) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/tanzania/621` | [/flight/country/tanzania/621](https://buybusinessclass.com/flight/country/tanzania/621) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/thailand/321` | [/flight/country/thailand/321](https://buybusinessclass.com/flight/country/thailand/321) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/turkiye/458` | [/flight/country/turkiye/458](https://buybusinessclass.com/flight/country/turkiye/458) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/turks and caicos/847` | [/flight/country/turks%20and%20caicos/847](https://buybusinessclass.com/flight/country/turks%20and%20caicos/847) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/united arab emirates/511` | [/flight/country/united%20arab%20emirates/511](https://buybusinessclass.com/flight/country/united%20arab%20emirates/511) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/united kingdom/21` | [/flight/country/united%20kingdom/21](https://buybusinessclass.com/flight/country/united%20kingdom/21) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/vietnam/387` | [/flight/country/vietnam/387](https://buybusinessclass.com/flight/country/vietnam/387) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/country/zimbabwe/1419` | [/flight/country/zimbabwe/1419](https://buybusinessclass.com/flight/country/zimbabwe/1419) | yes (pattern `/flight/{type}/:slug/:id`) |

Checklist (copy-friendly):

- [ ] `/flight/country/algeria/1445` → React: `http://localhost:8080/flight/country/algeria/1445` | Live: `https://buybusinessclass.com/flight/country/algeria/1445`
- [ ] `/flight/country/argentina/811` → React: `http://localhost:8080/flight/country/argentina/811` | Live: `https://buybusinessclass.com/flight/country/argentina/811`
- [ ] `/flight/country/australia/694` → React: `http://localhost:8080/flight/country/australia/694` | Live: `https://buybusinessclass.com/flight/country/australia/694`
- [ ] `/flight/country/austria/109` → React: `http://localhost:8080/flight/country/austria/109` | Live: `https://buybusinessclass.com/flight/country/austria/109`
- [ ] `/flight/country/bahrain/595` → React: `http://localhost:8080/flight/country/bahrain/595` | Live: `https://buybusinessclass.com/flight/country/bahrain/595`
- [ ] `/flight/country/bangladesh/1297` → React: `http://localhost:8080/flight/country/bangladesh/1297` | Live: `https://buybusinessclass.com/flight/country/bangladesh/1297`
- [ ] `/flight/country/belarus/1330` → React: `http://localhost:8080/flight/country/belarus/1330` | Live: `https://buybusinessclass.com/flight/country/belarus/1330`
- [ ] `/flight/country/belgium/131` → React: `http://localhost:8080/flight/country/belgium/131` | Live: `https://buybusinessclass.com/flight/country/belgium/131`
- [ ] `/flight/country/brazil/819` → React: `http://localhost:8080/flight/country/brazil/819` | Live: `https://buybusinessclass.com/flight/country/brazil/819`
- [ ] `/flight/country/bulgaria/1192` → React: `http://localhost:8080/flight/country/bulgaria/1192` | Live: `https://buybusinessclass.com/flight/country/bulgaria/1192`
- [ ] `/flight/country/cambodia/379` → React: `http://localhost:8080/flight/country/cambodia/379` | Live: `https://buybusinessclass.com/flight/country/cambodia/379`
- [ ] `/flight/country/chile/834` → React: `http://localhost:8080/flight/country/chile/834` | Live: `https://buybusinessclass.com/flight/country/chile/834`
- [ ] `/flight/country/china/297` → React: `http://localhost:8080/flight/country/china/297` | Live: `https://buybusinessclass.com/flight/country/china/297`
- [ ] `/flight/country/croatia/145` → React: `http://localhost:8080/flight/country/croatia/145` | Live: `https://buybusinessclass.com/flight/country/croatia/145`
- [ ] `/flight/country/cyprus/559` → React: `http://localhost:8080/flight/country/cyprus/559` | Live: `https://buybusinessclass.com/flight/country/cyprus/559`
- [ ] `/flight/country/czech republic/126` → React: `http://localhost:8080/flight/country/czech%20republic/126` | Live: `https://buybusinessclass.com/flight/country/czech%20republic/126`
- [ ] `/flight/country/denmark/70` → React: `http://localhost:8080/flight/country/denmark/70` | Live: `https://buybusinessclass.com/flight/country/denmark/70`
- [ ] `/flight/country/egypt/576` → React: `http://localhost:8080/flight/country/egypt/576` | Live: `https://buybusinessclass.com/flight/country/egypt/576`
- [ ] `/flight/country/fiji/749` → React: `http://localhost:8080/flight/country/fiji/749` | Live: `https://buybusinessclass.com/flight/country/fiji/749`
- [ ] `/flight/country/finland/243` → React: `http://localhost:8080/flight/country/finland/243` | Live: `https://buybusinessclass.com/flight/country/finland/243`
- [ ] `/flight/country/france/5` → React: `http://localhost:8080/flight/country/france/5` | Live: `https://buybusinessclass.com/flight/country/france/5`
- [ ] `/flight/country/french polynesia/741` → React: `http://localhost:8080/flight/country/french%20polynesia/741` | Live: `https://buybusinessclass.com/flight/country/french%20polynesia/741`
- [ ] `/flight/country/germany/2` → React: `http://localhost:8080/flight/country/germany/2` | Live: `https://buybusinessclass.com/flight/country/germany/2`
- [ ] `/flight/country/ghana/1273` → React: `http://localhost:8080/flight/country/ghana/1273` | Live: `https://buybusinessclass.com/flight/country/ghana/1273`
- [ ] `/flight/country/greece/197` → React: `http://localhost:8080/flight/country/greece/197` | Live: `https://buybusinessclass.com/flight/country/greece/197`
- [ ] `/flight/country/hong kong/1250` → React: `http://localhost:8080/flight/country/hong%20kong/1250` | Live: `https://buybusinessclass.com/flight/country/hong%20kong/1250`
- [ ] `/flight/country/hungary/118` → React: `http://localhost:8080/flight/country/hungary/118` | Live: `https://buybusinessclass.com/flight/country/hungary/118`
- [ ] `/flight/country/iceland/1408` → React: `http://localhost:8080/flight/country/iceland/1408` | Live: `https://buybusinessclass.com/flight/country/iceland/1408`
- [ ] `/flight/country/india/410` → React: `http://localhost:8080/flight/country/india/410` | Live: `https://buybusinessclass.com/flight/country/india/410`
- [ ] `/flight/country/indonesia/309` → React: `http://localhost:8080/flight/country/indonesia/309` | Live: `https://buybusinessclass.com/flight/country/indonesia/309`
- [ ] `/flight/country/ireland/1453` → React: `http://localhost:8080/flight/country/ireland/1453` | Live: `https://buybusinessclass.com/flight/country/ireland/1453`
- [ ] `/flight/country/israel/450` → React: `http://localhost:8080/flight/country/israel/450` | Live: `https://buybusinessclass.com/flight/country/israel/450`
- [ ] `/flight/country/italy/90` → React: `http://localhost:8080/flight/country/italy/90` | Live: `https://buybusinessclass.com/flight/country/italy/90`
- [ ] `/flight/country/japan/282` → React: `http://localhost:8080/flight/country/japan/282` | Live: `https://buybusinessclass.com/flight/country/japan/282`
- [ ] `/flight/country/jordan/526` → React: `http://localhost:8080/flight/country/jordan/526` | Live: `https://buybusinessclass.com/flight/country/jordan/526`
- [ ] `/flight/country/kazakhstan/1338` → React: `http://localhost:8080/flight/country/kazakhstan/1338` | Live: `https://buybusinessclass.com/flight/country/kazakhstan/1338`
- [ ] `/flight/country/kenya/616` → React: `http://localhost:8080/flight/country/kenya/616` | Live: `https://buybusinessclass.com/flight/country/kenya/616`
- [ ] `/flight/country/lebanon/473` → React: `http://localhost:8080/flight/country/lebanon/473` | Live: `https://buybusinessclass.com/flight/country/lebanon/473`
- [ ] `/flight/country/lithuania/1289` → React: `http://localhost:8080/flight/country/lithuania/1289` | Live: `https://buybusinessclass.com/flight/country/lithuania/1289`
- [ ] `/flight/country/luxembourg /1224` → React: `http://localhost:8080/flight/country/luxembourg%20/1224` | Live: `https://buybusinessclass.com/flight/country/luxembourg%20/1224`
- [ ] `/flight/country/madagascar/630` → React: `http://localhost:8080/flight/country/madagascar/630` | Live: `https://buybusinessclass.com/flight/country/madagascar/630`
- [ ] `/flight/country/malaysia/374` → React: `http://localhost:8080/flight/country/malaysia/374` | Live: `https://buybusinessclass.com/flight/country/malaysia/374`
- [ ] `/flight/country/maldives/399` → React: `http://localhost:8080/flight/country/maldives/399` | Live: `https://buybusinessclass.com/flight/country/maldives/399`
- [ ] `/flight/country/mauritius/1400` → React: `http://localhost:8080/flight/country/mauritius/1400` | Live: `https://buybusinessclass.com/flight/country/mauritius/1400`
- [ ] `/flight/country/morocco/645` → React: `http://localhost:8080/flight/country/morocco/645` | Live: `https://buybusinessclass.com/flight/country/morocco/645`
- [ ] `/flight/country/namibia/673` → React: `http://localhost:8080/flight/country/namibia/673` | Live: `https://buybusinessclass.com/flight/country/namibia/673`
- [ ] `/flight/country/netherlands/254` → React: `http://localhost:8080/flight/country/netherlands/254` | Live: `https://buybusinessclass.com/flight/country/netherlands/254`
- [ ] `/flight/country/new zealand/726` → React: `http://localhost:8080/flight/country/new%20zealand/726` | Live: `https://buybusinessclass.com/flight/country/new%20zealand/726`
- [ ] `/flight/country/nigeria/1427` → React: `http://localhost:8080/flight/country/nigeria/1427` | Live: `https://buybusinessclass.com/flight/country/nigeria/1427`
- [ ] `/flight/country/norway/1242` → React: `http://localhost:8080/flight/country/norway/1242` | Live: `https://buybusinessclass.com/flight/country/norway/1242`
- [ ] `/flight/country/oman/537` → React: `http://localhost:8080/flight/country/oman/537` | Live: `https://buybusinessclass.com/flight/country/oman/537`
- [ ] `/flight/country/pakistan/1346` → React: `http://localhost:8080/flight/country/pakistan/1346` | Live: `https://buybusinessclass.com/flight/country/pakistan/1346`
- [ ] `/flight/country/papua new guinea/760` → React: `http://localhost:8080/flight/country/papua%20new%20guinea/760` | Live: `https://buybusinessclass.com/flight/country/papua%20new%20guinea/760`
- [ ] `/flight/country/peru/842` → React: `http://localhost:8080/flight/country/peru/842` | Live: `https://buybusinessclass.com/flight/country/peru/842`
- [ ] `/flight/country/philippines/862` → React: `http://localhost:8080/flight/country/philippines/862` | Live: `https://buybusinessclass.com/flight/country/philippines/862`
- [ ] `/flight/country/poland/1468` → React: `http://localhost:8080/flight/country/poland/1468` | Live: `https://buybusinessclass.com/flight/country/poland/1468`
- [ ] `/flight/country/portugal/262` → React: `http://localhost:8080/flight/country/portugal/262` | Live: `https://buybusinessclass.com/flight/country/portugal/262`
- [ ] `/flight/country/qatar/551` → React: `http://localhost:8080/flight/country/qatar/551` | Live: `https://buybusinessclass.com/flight/country/qatar/551`
- [ ] `/flight/country/romania/1281` → React: `http://localhost:8080/flight/country/romania/1281` | Live: `https://buybusinessclass.com/flight/country/romania/1281`
- [ ] `/flight/country/samoa/772` → React: `http://localhost:8080/flight/country/samoa/772` | Live: `https://buybusinessclass.com/flight/country/samoa/772`
- [ ] `/flight/country/saudi arabia/478` → React: `http://localhost:8080/flight/country/saudi%20arabia/478` | Live: `https://buybusinessclass.com/flight/country/saudi%20arabia/478`
- [ ] `/flight/country/seychelles/644` → React: `http://localhost:8080/flight/country/seychelles/644` | Live: `https://buybusinessclass.com/flight/country/seychelles/644`
- [ ] `/flight/country/singapore/361` → React: `http://localhost:8080/flight/country/singapore/361` | Live: `https://buybusinessclass.com/flight/country/singapore/361`
- [ ] `/flight/country/south africa/604` → React: `http://localhost:8080/flight/country/south%20africa/604` | Live: `https://buybusinessclass.com/flight/country/south%20africa/604`
- [ ] `/flight/country/south korea/369` → React: `http://localhost:8080/flight/country/south%20korea/369` | Live: `https://buybusinessclass.com/flight/country/south%20korea/369`
- [ ] `/flight/country/spain/3` → React: `http://localhost:8080/flight/country/spain/3` | Live: `https://buybusinessclass.com/flight/country/spain/3`
- [ ] `/flight/country/sri lanka/435` → React: `http://localhost:8080/flight/country/sri%20lanka/435` | Live: `https://buybusinessclass.com/flight/country/sri%20lanka/435`
- [ ] `/flight/country/sweden/270` → React: `http://localhost:8080/flight/country/sweden/270` | Live: `https://buybusinessclass.com/flight/country/sweden/270`
- [ ] `/flight/country/switzerland/1200` → React: `http://localhost:8080/flight/country/switzerland/1200` | Live: `https://buybusinessclass.com/flight/country/switzerland/1200`
- [ ] `/flight/country/taiwan/1311` → React: `http://localhost:8080/flight/country/taiwan/1311` | Live: `https://buybusinessclass.com/flight/country/taiwan/1311`
- [ ] `/flight/country/tanzania/621` → React: `http://localhost:8080/flight/country/tanzania/621` | Live: `https://buybusinessclass.com/flight/country/tanzania/621`
- [ ] `/flight/country/thailand/321` → React: `http://localhost:8080/flight/country/thailand/321` | Live: `https://buybusinessclass.com/flight/country/thailand/321`
- [ ] `/flight/country/turkiye/458` → React: `http://localhost:8080/flight/country/turkiye/458` | Live: `https://buybusinessclass.com/flight/country/turkiye/458`
- [ ] `/flight/country/turks and caicos/847` → React: `http://localhost:8080/flight/country/turks%20and%20caicos/847` | Live: `https://buybusinessclass.com/flight/country/turks%20and%20caicos/847`
- [ ] `/flight/country/united arab emirates/511` → React: `http://localhost:8080/flight/country/united%20arab%20emirates/511` | Live: `https://buybusinessclass.com/flight/country/united%20arab%20emirates/511`
- [ ] `/flight/country/united kingdom/21` → React: `http://localhost:8080/flight/country/united%20kingdom/21` | Live: `https://buybusinessclass.com/flight/country/united%20kingdom/21`
- [ ] `/flight/country/vietnam/387` → React: `http://localhost:8080/flight/country/vietnam/387` | Live: `https://buybusinessclass.com/flight/country/vietnam/387`
- [ ] `/flight/country/zimbabwe/1419` → React: `http://localhost:8080/flight/country/zimbabwe/1419` | Live: `https://buybusinessclass.com/flight/country/zimbabwe/1419`

## Flight cities (89)

| Test | Path | Live example | React route |
|---|---|---|---|
| - [ ] | `/flight/city/abu dhabi/519` | [/flight/city/abu%20dhabi/519](https://buybusinessclass.com/flight/city/abu%20dhabi/519) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/ahmedabad/1124` | [/flight/city/ahmedabad/1124](https://buybusinessclass.com/flight/city/ahmedabad/1124) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/amman/527` | [/flight/city/amman/527](https://buybusinessclass.com/flight/city/amman/527) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/amsterdam/255` | [/flight/city/amsterdam/255](https://buybusinessclass.com/flight/city/amsterdam/255) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/ankara/466` | [/flight/city/ankara/466](https://buybusinessclass.com/flight/city/ankara/466) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/antananarivo/631` | [/flight/city/antananarivo/631](https://buybusinessclass.com/flight/city/antananarivo/631) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/apia/773` | [/flight/city/apia/773](https://buybusinessclass.com/flight/city/apia/773) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/auckland/727` | [/flight/city/auckland/727](https://buybusinessclass.com/flight/city/auckland/727) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/bangkok/322` | [/flight/city/bangkok/322](https://buybusinessclass.com/flight/city/bangkok/322) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/barcelona/11` | [/flight/city/barcelona/11](https://buybusinessclass.com/flight/city/barcelona/11) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/beijing/298` | [/flight/city/beijing/298](https://buybusinessclass.com/flight/city/beijing/298) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/beirut/474` | [/flight/city/beirut/474](https://buybusinessclass.com/flight/city/beirut/474) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/berlin/4` | [/flight/city/berlin/4](https://buybusinessclass.com/flight/city/berlin/4) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/birmingham/57` | [/flight/city/birmingham/57](https://buybusinessclass.com/flight/city/birmingham/57) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/bordeaux/9` | [/flight/city/bordeaux/9](https://buybusinessclass.com/flight/city/bordeaux/9) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/brisbane/712` | [/flight/city/brisbane/712](https://buybusinessclass.com/flight/city/brisbane/712) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/bristol/992` | [/flight/city/bristol/992](https://buybusinessclass.com/flight/city/bristol/992) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/buenos aires/812` | [/flight/city/buenos%20aires/812](https://buybusinessclass.com/flight/city/buenos%20aires/812) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/cape town/605` | [/flight/city/cape%20town/605](https://buybusinessclass.com/flight/city/cape%20town/605) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/casablanca/656` | [/flight/city/casablanca/656](https://buybusinessclass.com/flight/city/casablanca/656) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/chennai/425` | [/flight/city/chennai/425](https://buybusinessclass.com/flight/city/chennai/425) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/chiang mai/348` | [/flight/city/chiang%20mai/348](https://buybusinessclass.com/flight/city/chiang%20mai/348) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/christchurch/734` | [/flight/city/christchurch/734](https://buybusinessclass.com/flight/city/christchurch/734) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/colombo/436` | [/flight/city/colombo/436](https://buybusinessclass.com/flight/city/colombo/436) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/copenhagen/71` | [/flight/city/copenhagen/71](https://buybusinessclass.com/flight/city/copenhagen/71) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/dar es salaam/622` | [/flight/city/dar%20es%20salaam/622](https://buybusinessclass.com/flight/city/dar%20es%20salaam/622) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/denpasar/314` | [/flight/city/denpasar/314](https://buybusinessclass.com/flight/city/denpasar/314) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/dubai/512` | [/flight/city/dubai/512](https://buybusinessclass.com/flight/city/dubai/512) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/düsseldorf/1531` | [/flight/city/d%C3%BCsseldorf/1531](https://buybusinessclass.com/flight/city/d%C3%BCsseldorf/1531) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/edinburgh/969` | [/flight/city/edinburgh/969](https://buybusinessclass.com/flight/city/edinburgh/969) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/florence/1003` | [/flight/city/florence/1003](https://buybusinessclass.com/flight/city/florence/1003) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/frankfurt/6` | [/flight/city/frankfurt/6](https://buybusinessclass.com/flight/city/frankfurt/6) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/genoa/1369` | [/flight/city/genoa/1369](https://buybusinessclass.com/flight/city/genoa/1369) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/glasgow/996` | [/flight/city/glasgow/996](https://buybusinessclass.com/flight/city/glasgow/996) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/guangzhou/1096` | [/flight/city/guangzhou/1096](https://buybusinessclass.com/flight/city/guangzhou/1096) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/hamburg/1530` | [/flight/city/hamburg/1530](https://buybusinessclass.com/flight/city/hamburg/1530) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/istanbul/459` | [/flight/city/istanbul/459](https://buybusinessclass.com/flight/city/istanbul/459) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/jakarta/310` | [/flight/city/jakarta/310](https://buybusinessclass.com/flight/city/jakarta/310) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/jeddah/498` | [/flight/city/jeddah/498](https://buybusinessclass.com/flight/city/jeddah/498) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/johannesburg/612` | [/flight/city/johannesburg/612](https://buybusinessclass.com/flight/city/johannesburg/612) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/kolkata/1114` | [/flight/city/kolkata/1114](https://buybusinessclass.com/flight/city/kolkata/1114) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/lima/843` | [/flight/city/lima/843](https://buybusinessclass.com/flight/city/lima/843) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/london/23` | [/flight/city/london/23](https://buybusinessclass.com/flight/city/london/23) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/lyon/920` | [/flight/city/lyon/920](https://buybusinessclass.com/flight/city/lyon/920) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/madrid/10` | [/flight/city/madrid/10](https://buybusinessclass.com/flight/city/madrid/10) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/malaga/940` | [/flight/city/malaga/940](https://buybusinessclass.com/flight/city/malaga/940) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/male/400` | [/flight/city/male/400](https://buybusinessclass.com/flight/city/male/400) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/manchester/976` | [/flight/city/manchester/976](https://buybusinessclass.com/flight/city/manchester/976) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/marrakesh/646` | [/flight/city/marrakesh/646](https://buybusinessclass.com/flight/city/marrakesh/646) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/marseille/903` | [/flight/city/marseille/903](https://buybusinessclass.com/flight/city/marseille/903) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/melbourne/702` | [/flight/city/melbourne/702](https://buybusinessclass.com/flight/city/melbourne/702) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/milan/1368` | [/flight/city/milan/1368](https://buybusinessclass.com/flight/city/milan/1368) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/mumbai/411` | [/flight/city/mumbai/411](https://buybusinessclass.com/flight/city/mumbai/411) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/munich/879` | [/flight/city/munich/879](https://buybusinessclass.com/flight/city/munich/879) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/nadi/750` | [/flight/city/nadi/750](https://buybusinessclass.com/flight/city/nadi/750) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/nagoya/1083` | [/flight/city/nagoya/1083](https://buybusinessclass.com/flight/city/nagoya/1083) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/nairobi/617` | [/flight/city/nairobi/617](https://buybusinessclass.com/flight/city/nairobi/617) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/naples/1010` | [/flight/city/naples/1010](https://buybusinessclass.com/flight/city/naples/1010) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/new delhi/418` | [/flight/city/new%20delhi/418](https://buybusinessclass.com/flight/city/new%20delhi/418) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/nice/910` | [/flight/city/nice/910](https://buybusinessclass.com/flight/city/nice/910) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/osaka/290` | [/flight/city/osaka/290](https://buybusinessclass.com/flight/city/osaka/290) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/papeete/742` | [/flight/city/papeete/742](https://buybusinessclass.com/flight/city/papeete/742) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/paris/8` | [/flight/city/paris/8](https://buybusinessclass.com/flight/city/paris/8) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/perth/719` | [/flight/city/perth/719](https://buybusinessclass.com/flight/city/perth/719) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/phuket/338` | [/flight/city/phuket/338](https://buybusinessclass.com/flight/city/phuket/338) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/port moresby/762` | [/flight/city/port%20moresby/762](https://buybusinessclass.com/flight/city/port%20moresby/762) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/providenciales/848` | [/flight/city/providenciales/848](https://buybusinessclass.com/flight/city/providenciales/848) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/rabat/666` | [/flight/city/rabat/666](https://buybusinessclass.com/flight/city/rabat/666) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/rio de janeiro/820` | [/flight/city/rio%20de%20janeiro/820](https://buybusinessclass.com/flight/city/rio%20de%20janeiro/820) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/riyadh/479` | [/flight/city/riyadh/479](https://buybusinessclass.com/flight/city/riyadh/479) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/rome/92` | [/flight/city/rome/92](https://buybusinessclass.com/flight/city/rome/92) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/salzburg/1235` | [/flight/city/salzburg/1235](https://buybusinessclass.com/flight/city/salzburg/1235) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/santiago/835` | [/flight/city/santiago/835](https://buybusinessclass.com/flight/city/santiago/835) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/sao paulo/827` | [/flight/city/sao%20paulo/827](https://buybusinessclass.com/flight/city/sao%20paulo/827) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/seoul/370` | [/flight/city/seoul/370](https://buybusinessclass.com/flight/city/seoul/370) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/shanghai/302` | [/flight/city/shanghai/302](https://buybusinessclass.com/flight/city/shanghai/302) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/singapore/362` | [/flight/city/singapore/362](https://buybusinessclass.com/flight/city/singapore/362) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/strasbourg/896` | [/flight/city/strasbourg/896](https://buybusinessclass.com/flight/city/strasbourg/896) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/stuttgart/889` | [/flight/city/stuttgart/889](https://buybusinessclass.com/flight/city/stuttgart/889) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/surabaya/1100` | [/flight/city/surabaya/1100](https://buybusinessclass.com/flight/city/surabaya/1100) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/sydney/695` | [/flight/city/sydney/695](https://buybusinessclass.com/flight/city/sydney/695) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/tel aviv/451` | [/flight/city/tel%20aviv/451](https://buybusinessclass.com/flight/city/tel%20aviv/451) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/tokyo/283` | [/flight/city/tokyo/283](https://buybusinessclass.com/flight/city/tokyo/283) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/toulouse/924` | [/flight/city/toulouse/924](https://buybusinessclass.com/flight/city/toulouse/924) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/valencia/947` | [/flight/city/valencia/947](https://buybusinessclass.com/flight/city/valencia/947) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/venice/96` | [/flight/city/venice/96](https://buybusinessclass.com/flight/city/venice/96) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/victoria/858` | [/flight/city/victoria/858](https://buybusinessclass.com/flight/city/victoria/858) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/vienna/111` | [/flight/city/vienna/111](https://buybusinessclass.com/flight/city/vienna/111) | yes (pattern `/flight/{type}/:slug/:id`) |
| - [ ] | `/flight/city/zanzibar/626` | [/flight/city/zanzibar/626](https://buybusinessclass.com/flight/city/zanzibar/626) | yes (pattern `/flight/{type}/:slug/:id`) |

Checklist (copy-friendly):

- [ ] `/flight/city/abu dhabi/519` → React: `http://localhost:8080/flight/city/abu%20dhabi/519` | Live: `https://buybusinessclass.com/flight/city/abu%20dhabi/519`
- [ ] `/flight/city/ahmedabad/1124` → React: `http://localhost:8080/flight/city/ahmedabad/1124` | Live: `https://buybusinessclass.com/flight/city/ahmedabad/1124`
- [ ] `/flight/city/amman/527` → React: `http://localhost:8080/flight/city/amman/527` | Live: `https://buybusinessclass.com/flight/city/amman/527`
- [ ] `/flight/city/amsterdam/255` → React: `http://localhost:8080/flight/city/amsterdam/255` | Live: `https://buybusinessclass.com/flight/city/amsterdam/255`
- [ ] `/flight/city/ankara/466` → React: `http://localhost:8080/flight/city/ankara/466` | Live: `https://buybusinessclass.com/flight/city/ankara/466`
- [ ] `/flight/city/antananarivo/631` → React: `http://localhost:8080/flight/city/antananarivo/631` | Live: `https://buybusinessclass.com/flight/city/antananarivo/631`
- [ ] `/flight/city/apia/773` → React: `http://localhost:8080/flight/city/apia/773` | Live: `https://buybusinessclass.com/flight/city/apia/773`
- [ ] `/flight/city/auckland/727` → React: `http://localhost:8080/flight/city/auckland/727` | Live: `https://buybusinessclass.com/flight/city/auckland/727`
- [ ] `/flight/city/bangkok/322` → React: `http://localhost:8080/flight/city/bangkok/322` | Live: `https://buybusinessclass.com/flight/city/bangkok/322`
- [ ] `/flight/city/barcelona/11` → React: `http://localhost:8080/flight/city/barcelona/11` | Live: `https://buybusinessclass.com/flight/city/barcelona/11`
- [ ] `/flight/city/beijing/298` → React: `http://localhost:8080/flight/city/beijing/298` | Live: `https://buybusinessclass.com/flight/city/beijing/298`
- [ ] `/flight/city/beirut/474` → React: `http://localhost:8080/flight/city/beirut/474` | Live: `https://buybusinessclass.com/flight/city/beirut/474`
- [ ] `/flight/city/berlin/4` → React: `http://localhost:8080/flight/city/berlin/4` | Live: `https://buybusinessclass.com/flight/city/berlin/4`
- [ ] `/flight/city/birmingham/57` → React: `http://localhost:8080/flight/city/birmingham/57` | Live: `https://buybusinessclass.com/flight/city/birmingham/57`
- [ ] `/flight/city/bordeaux/9` → React: `http://localhost:8080/flight/city/bordeaux/9` | Live: `https://buybusinessclass.com/flight/city/bordeaux/9`
- [ ] `/flight/city/brisbane/712` → React: `http://localhost:8080/flight/city/brisbane/712` | Live: `https://buybusinessclass.com/flight/city/brisbane/712`
- [ ] `/flight/city/bristol/992` → React: `http://localhost:8080/flight/city/bristol/992` | Live: `https://buybusinessclass.com/flight/city/bristol/992`
- [ ] `/flight/city/buenos aires/812` → React: `http://localhost:8080/flight/city/buenos%20aires/812` | Live: `https://buybusinessclass.com/flight/city/buenos%20aires/812`
- [ ] `/flight/city/cape town/605` → React: `http://localhost:8080/flight/city/cape%20town/605` | Live: `https://buybusinessclass.com/flight/city/cape%20town/605`
- [ ] `/flight/city/casablanca/656` → React: `http://localhost:8080/flight/city/casablanca/656` | Live: `https://buybusinessclass.com/flight/city/casablanca/656`
- [ ] `/flight/city/chennai/425` → React: `http://localhost:8080/flight/city/chennai/425` | Live: `https://buybusinessclass.com/flight/city/chennai/425`
- [ ] `/flight/city/chiang mai/348` → React: `http://localhost:8080/flight/city/chiang%20mai/348` | Live: `https://buybusinessclass.com/flight/city/chiang%20mai/348`
- [ ] `/flight/city/christchurch/734` → React: `http://localhost:8080/flight/city/christchurch/734` | Live: `https://buybusinessclass.com/flight/city/christchurch/734`
- [ ] `/flight/city/colombo/436` → React: `http://localhost:8080/flight/city/colombo/436` | Live: `https://buybusinessclass.com/flight/city/colombo/436`
- [ ] `/flight/city/copenhagen/71` → React: `http://localhost:8080/flight/city/copenhagen/71` | Live: `https://buybusinessclass.com/flight/city/copenhagen/71`
- [ ] `/flight/city/dar es salaam/622` → React: `http://localhost:8080/flight/city/dar%20es%20salaam/622` | Live: `https://buybusinessclass.com/flight/city/dar%20es%20salaam/622`
- [ ] `/flight/city/denpasar/314` → React: `http://localhost:8080/flight/city/denpasar/314` | Live: `https://buybusinessclass.com/flight/city/denpasar/314`
- [ ] `/flight/city/dubai/512` → React: `http://localhost:8080/flight/city/dubai/512` | Live: `https://buybusinessclass.com/flight/city/dubai/512`
- [ ] `/flight/city/düsseldorf/1531` → React: `http://localhost:8080/flight/city/d%C3%BCsseldorf/1531` | Live: `https://buybusinessclass.com/flight/city/d%C3%BCsseldorf/1531`
- [ ] `/flight/city/edinburgh/969` → React: `http://localhost:8080/flight/city/edinburgh/969` | Live: `https://buybusinessclass.com/flight/city/edinburgh/969`
- [ ] `/flight/city/florence/1003` → React: `http://localhost:8080/flight/city/florence/1003` | Live: `https://buybusinessclass.com/flight/city/florence/1003`
- [ ] `/flight/city/frankfurt/6` → React: `http://localhost:8080/flight/city/frankfurt/6` | Live: `https://buybusinessclass.com/flight/city/frankfurt/6`
- [ ] `/flight/city/genoa/1369` → React: `http://localhost:8080/flight/city/genoa/1369` | Live: `https://buybusinessclass.com/flight/city/genoa/1369`
- [ ] `/flight/city/glasgow/996` → React: `http://localhost:8080/flight/city/glasgow/996` | Live: `https://buybusinessclass.com/flight/city/glasgow/996`
- [ ] `/flight/city/guangzhou/1096` → React: `http://localhost:8080/flight/city/guangzhou/1096` | Live: `https://buybusinessclass.com/flight/city/guangzhou/1096`
- [ ] `/flight/city/hamburg/1530` → React: `http://localhost:8080/flight/city/hamburg/1530` | Live: `https://buybusinessclass.com/flight/city/hamburg/1530`
- [ ] `/flight/city/istanbul/459` → React: `http://localhost:8080/flight/city/istanbul/459` | Live: `https://buybusinessclass.com/flight/city/istanbul/459`
- [ ] `/flight/city/jakarta/310` → React: `http://localhost:8080/flight/city/jakarta/310` | Live: `https://buybusinessclass.com/flight/city/jakarta/310`
- [ ] `/flight/city/jeddah/498` → React: `http://localhost:8080/flight/city/jeddah/498` | Live: `https://buybusinessclass.com/flight/city/jeddah/498`
- [ ] `/flight/city/johannesburg/612` → React: `http://localhost:8080/flight/city/johannesburg/612` | Live: `https://buybusinessclass.com/flight/city/johannesburg/612`
- [ ] `/flight/city/kolkata/1114` → React: `http://localhost:8080/flight/city/kolkata/1114` | Live: `https://buybusinessclass.com/flight/city/kolkata/1114`
- [ ] `/flight/city/lima/843` → React: `http://localhost:8080/flight/city/lima/843` | Live: `https://buybusinessclass.com/flight/city/lima/843`
- [ ] `/flight/city/london/23` → React: `http://localhost:8080/flight/city/london/23` | Live: `https://buybusinessclass.com/flight/city/london/23`
- [ ] `/flight/city/lyon/920` → React: `http://localhost:8080/flight/city/lyon/920` | Live: `https://buybusinessclass.com/flight/city/lyon/920`
- [ ] `/flight/city/madrid/10` → React: `http://localhost:8080/flight/city/madrid/10` | Live: `https://buybusinessclass.com/flight/city/madrid/10`
- [ ] `/flight/city/malaga/940` → React: `http://localhost:8080/flight/city/malaga/940` | Live: `https://buybusinessclass.com/flight/city/malaga/940`
- [ ] `/flight/city/male/400` → React: `http://localhost:8080/flight/city/male/400` | Live: `https://buybusinessclass.com/flight/city/male/400`
- [ ] `/flight/city/manchester/976` → React: `http://localhost:8080/flight/city/manchester/976` | Live: `https://buybusinessclass.com/flight/city/manchester/976`
- [ ] `/flight/city/marrakesh/646` → React: `http://localhost:8080/flight/city/marrakesh/646` | Live: `https://buybusinessclass.com/flight/city/marrakesh/646`
- [ ] `/flight/city/marseille/903` → React: `http://localhost:8080/flight/city/marseille/903` | Live: `https://buybusinessclass.com/flight/city/marseille/903`
- [ ] `/flight/city/melbourne/702` → React: `http://localhost:8080/flight/city/melbourne/702` | Live: `https://buybusinessclass.com/flight/city/melbourne/702`
- [ ] `/flight/city/milan/1368` → React: `http://localhost:8080/flight/city/milan/1368` | Live: `https://buybusinessclass.com/flight/city/milan/1368`
- [ ] `/flight/city/mumbai/411` → React: `http://localhost:8080/flight/city/mumbai/411` | Live: `https://buybusinessclass.com/flight/city/mumbai/411`
- [ ] `/flight/city/munich/879` → React: `http://localhost:8080/flight/city/munich/879` | Live: `https://buybusinessclass.com/flight/city/munich/879`
- [ ] `/flight/city/nadi/750` → React: `http://localhost:8080/flight/city/nadi/750` | Live: `https://buybusinessclass.com/flight/city/nadi/750`
- [ ] `/flight/city/nagoya/1083` → React: `http://localhost:8080/flight/city/nagoya/1083` | Live: `https://buybusinessclass.com/flight/city/nagoya/1083`
- [ ] `/flight/city/nairobi/617` → React: `http://localhost:8080/flight/city/nairobi/617` | Live: `https://buybusinessclass.com/flight/city/nairobi/617`
- [ ] `/flight/city/naples/1010` → React: `http://localhost:8080/flight/city/naples/1010` | Live: `https://buybusinessclass.com/flight/city/naples/1010`
- [ ] `/flight/city/new delhi/418` → React: `http://localhost:8080/flight/city/new%20delhi/418` | Live: `https://buybusinessclass.com/flight/city/new%20delhi/418`
- [ ] `/flight/city/nice/910` → React: `http://localhost:8080/flight/city/nice/910` | Live: `https://buybusinessclass.com/flight/city/nice/910`
- [ ] `/flight/city/osaka/290` → React: `http://localhost:8080/flight/city/osaka/290` | Live: `https://buybusinessclass.com/flight/city/osaka/290`
- [ ] `/flight/city/papeete/742` → React: `http://localhost:8080/flight/city/papeete/742` | Live: `https://buybusinessclass.com/flight/city/papeete/742`
- [ ] `/flight/city/paris/8` → React: `http://localhost:8080/flight/city/paris/8` | Live: `https://buybusinessclass.com/flight/city/paris/8`
- [ ] `/flight/city/perth/719` → React: `http://localhost:8080/flight/city/perth/719` | Live: `https://buybusinessclass.com/flight/city/perth/719`
- [ ] `/flight/city/phuket/338` → React: `http://localhost:8080/flight/city/phuket/338` | Live: `https://buybusinessclass.com/flight/city/phuket/338`
- [ ] `/flight/city/port moresby/762` → React: `http://localhost:8080/flight/city/port%20moresby/762` | Live: `https://buybusinessclass.com/flight/city/port%20moresby/762`
- [ ] `/flight/city/providenciales/848` → React: `http://localhost:8080/flight/city/providenciales/848` | Live: `https://buybusinessclass.com/flight/city/providenciales/848`
- [ ] `/flight/city/rabat/666` → React: `http://localhost:8080/flight/city/rabat/666` | Live: `https://buybusinessclass.com/flight/city/rabat/666`
- [ ] `/flight/city/rio de janeiro/820` → React: `http://localhost:8080/flight/city/rio%20de%20janeiro/820` | Live: `https://buybusinessclass.com/flight/city/rio%20de%20janeiro/820`
- [ ] `/flight/city/riyadh/479` → React: `http://localhost:8080/flight/city/riyadh/479` | Live: `https://buybusinessclass.com/flight/city/riyadh/479`
- [ ] `/flight/city/rome/92` → React: `http://localhost:8080/flight/city/rome/92` | Live: `https://buybusinessclass.com/flight/city/rome/92`
- [ ] `/flight/city/salzburg/1235` → React: `http://localhost:8080/flight/city/salzburg/1235` | Live: `https://buybusinessclass.com/flight/city/salzburg/1235`
- [ ] `/flight/city/santiago/835` → React: `http://localhost:8080/flight/city/santiago/835` | Live: `https://buybusinessclass.com/flight/city/santiago/835`
- [ ] `/flight/city/sao paulo/827` → React: `http://localhost:8080/flight/city/sao%20paulo/827` | Live: `https://buybusinessclass.com/flight/city/sao%20paulo/827`
- [ ] `/flight/city/seoul/370` → React: `http://localhost:8080/flight/city/seoul/370` | Live: `https://buybusinessclass.com/flight/city/seoul/370`
- [ ] `/flight/city/shanghai/302` → React: `http://localhost:8080/flight/city/shanghai/302` | Live: `https://buybusinessclass.com/flight/city/shanghai/302`
- [ ] `/flight/city/singapore/362` → React: `http://localhost:8080/flight/city/singapore/362` | Live: `https://buybusinessclass.com/flight/city/singapore/362`
- [ ] `/flight/city/strasbourg/896` → React: `http://localhost:8080/flight/city/strasbourg/896` | Live: `https://buybusinessclass.com/flight/city/strasbourg/896`
- [ ] `/flight/city/stuttgart/889` → React: `http://localhost:8080/flight/city/stuttgart/889` | Live: `https://buybusinessclass.com/flight/city/stuttgart/889`
- [ ] `/flight/city/surabaya/1100` → React: `http://localhost:8080/flight/city/surabaya/1100` | Live: `https://buybusinessclass.com/flight/city/surabaya/1100`
- [ ] `/flight/city/sydney/695` → React: `http://localhost:8080/flight/city/sydney/695` | Live: `https://buybusinessclass.com/flight/city/sydney/695`
- [ ] `/flight/city/tel aviv/451` → React: `http://localhost:8080/flight/city/tel%20aviv/451` | Live: `https://buybusinessclass.com/flight/city/tel%20aviv/451`
- [ ] `/flight/city/tokyo/283` → React: `http://localhost:8080/flight/city/tokyo/283` | Live: `https://buybusinessclass.com/flight/city/tokyo/283`
- [ ] `/flight/city/toulouse/924` → React: `http://localhost:8080/flight/city/toulouse/924` | Live: `https://buybusinessclass.com/flight/city/toulouse/924`
- [ ] `/flight/city/valencia/947` → React: `http://localhost:8080/flight/city/valencia/947` | Live: `https://buybusinessclass.com/flight/city/valencia/947`
- [ ] `/flight/city/venice/96` → React: `http://localhost:8080/flight/city/venice/96` | Live: `https://buybusinessclass.com/flight/city/venice/96`
- [ ] `/flight/city/victoria/858` → React: `http://localhost:8080/flight/city/victoria/858` | Live: `https://buybusinessclass.com/flight/city/victoria/858`
- [ ] `/flight/city/vienna/111` → React: `http://localhost:8080/flight/city/vienna/111` | Live: `https://buybusinessclass.com/flight/city/vienna/111`
- [ ] `/flight/city/zanzibar/626` → React: `http://localhost:8080/flight/city/zanzibar/626` | Live: `https://buybusinessclass.com/flight/city/zanzibar/626`

## Airlines (31)

| Test | Path | Live example | React route |
|---|---|---|---|
| - [ ] | `/airlines` | [/airlines](https://buybusinessclass.com/airlines) | yes |
| - [ ] | `/airlines/aircanada` | [/airlines/aircanada](https://buybusinessclass.com/airlines/aircanada) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/aireu` | [/airlines/aireu](https://buybusinessclass.com/airlines/aireu) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/airfrance` | [/airlines/airfrance](https://buybusinessclass.com/airlines/airfrance) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/airserbia` | [/airlines/airserbia](https://buybusinessclass.com/airlines/airserbia) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/american` | [/airlines/american](https://buybusinessclass.com/airlines/american) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/austrianair` | [/airlines/austrianair](https://buybusinessclass.com/airlines/austrianair) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/britishair` | [/airlines/britishair](https://buybusinessclass.com/airlines/britishair) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/cathay` | [/airlines/cathay](https://buybusinessclass.com/airlines/cathay) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/delta` | [/airlines/delta](https://buybusinessclass.com/airlines/delta) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/emirates` | [/airlines/emirates](https://buybusinessclass.com/airlines/emirates) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/ethiopianair` | [/airlines/ethiopianair](https://buybusinessclass.com/airlines/ethiopianair) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/etihad` | [/airlines/etihad](https://buybusinessclass.com/airlines/etihad) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/finnair` | [/airlines/finnair](https://buybusinessclass.com/airlines/finnair) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/hawaiian` | [/airlines/hawaiian](https://buybusinessclass.com/airlines/hawaiian) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/iberia` | [/airlines/iberia](https://buybusinessclass.com/airlines/iberia) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/jetblue` | [/airlines/jetblue](https://buybusinessclass.com/airlines/jetblue) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/jordanianair` | [/airlines/jordanianair](https://buybusinessclass.com/airlines/jordanianair) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/klm` | [/airlines/klm](https://buybusinessclass.com/airlines/klm) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/korean` | [/airlines/korean](https://buybusinessclass.com/airlines/korean) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/latam` | [/airlines/latam](https://buybusinessclass.com/airlines/latam) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/lufthansa` | [/airlines/lufthansa](https://buybusinessclass.com/airlines/lufthansa) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/philippine` | [/airlines/philippine](https://buybusinessclass.com/airlines/philippine) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/qantas` | [/airlines/qantas](https://buybusinessclass.com/airlines/qantas) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/qatar` | [/airlines/qatar](https://buybusinessclass.com/airlines/qatar) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/saudi` | [/airlines/saudi](https://buybusinessclass.com/airlines/saudi) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/singapore` | [/airlines/singapore](https://buybusinessclass.com/airlines/singapore) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/swiss` | [/airlines/swiss](https://buybusinessclass.com/airlines/swiss) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/taportugal` | [/airlines/taportugal](https://buybusinessclass.com/airlines/taportugal) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/turkish` | [/airlines/turkish](https://buybusinessclass.com/airlines/turkish) | yes (pattern `/airlines/:slug`) |
| - [ ] | `/airlines/united` | [/airlines/united](https://buybusinessclass.com/airlines/united) | yes (pattern `/airlines/:slug`) |

Checklist (copy-friendly):

- [ ] `/airlines` → React: `http://localhost:8080/airlines` | Live: `https://buybusinessclass.com/airlines`
- [ ] `/airlines/aircanada` → React: `http://localhost:8080/airlines/aircanada` | Live: `https://buybusinessclass.com/airlines/aircanada`
- [ ] `/airlines/aireu` → React: `http://localhost:8080/airlines/aireu` | Live: `https://buybusinessclass.com/airlines/aireu`
- [ ] `/airlines/airfrance` → React: `http://localhost:8080/airlines/airfrance` | Live: `https://buybusinessclass.com/airlines/airfrance`
- [ ] `/airlines/airserbia` → React: `http://localhost:8080/airlines/airserbia` | Live: `https://buybusinessclass.com/airlines/airserbia`
- [ ] `/airlines/american` → React: `http://localhost:8080/airlines/american` | Live: `https://buybusinessclass.com/airlines/american`
- [ ] `/airlines/austrianair` → React: `http://localhost:8080/airlines/austrianair` | Live: `https://buybusinessclass.com/airlines/austrianair`
- [ ] `/airlines/britishair` → React: `http://localhost:8080/airlines/britishair` | Live: `https://buybusinessclass.com/airlines/britishair`
- [ ] `/airlines/cathay` → React: `http://localhost:8080/airlines/cathay` | Live: `https://buybusinessclass.com/airlines/cathay`
- [ ] `/airlines/delta` → React: `http://localhost:8080/airlines/delta` | Live: `https://buybusinessclass.com/airlines/delta`
- [ ] `/airlines/emirates` → React: `http://localhost:8080/airlines/emirates` | Live: `https://buybusinessclass.com/airlines/emirates`
- [ ] `/airlines/ethiopianair` → React: `http://localhost:8080/airlines/ethiopianair` | Live: `https://buybusinessclass.com/airlines/ethiopianair`
- [ ] `/airlines/etihad` → React: `http://localhost:8080/airlines/etihad` | Live: `https://buybusinessclass.com/airlines/etihad`
- [ ] `/airlines/finnair` → React: `http://localhost:8080/airlines/finnair` | Live: `https://buybusinessclass.com/airlines/finnair`
- [ ] `/airlines/hawaiian` → React: `http://localhost:8080/airlines/hawaiian` | Live: `https://buybusinessclass.com/airlines/hawaiian`
- [ ] `/airlines/iberia` → React: `http://localhost:8080/airlines/iberia` | Live: `https://buybusinessclass.com/airlines/iberia`
- [ ] `/airlines/jetblue` → React: `http://localhost:8080/airlines/jetblue` | Live: `https://buybusinessclass.com/airlines/jetblue`
- [ ] `/airlines/jordanianair` → React: `http://localhost:8080/airlines/jordanianair` | Live: `https://buybusinessclass.com/airlines/jordanianair`
- [ ] `/airlines/klm` → React: `http://localhost:8080/airlines/klm` | Live: `https://buybusinessclass.com/airlines/klm`
- [ ] `/airlines/korean` → React: `http://localhost:8080/airlines/korean` | Live: `https://buybusinessclass.com/airlines/korean`
- [ ] `/airlines/latam` → React: `http://localhost:8080/airlines/latam` | Live: `https://buybusinessclass.com/airlines/latam`
- [ ] `/airlines/lufthansa` → React: `http://localhost:8080/airlines/lufthansa` | Live: `https://buybusinessclass.com/airlines/lufthansa`
- [ ] `/airlines/philippine` → React: `http://localhost:8080/airlines/philippine` | Live: `https://buybusinessclass.com/airlines/philippine`
- [ ] `/airlines/qantas` → React: `http://localhost:8080/airlines/qantas` | Live: `https://buybusinessclass.com/airlines/qantas`
- [ ] `/airlines/qatar` → React: `http://localhost:8080/airlines/qatar` | Live: `https://buybusinessclass.com/airlines/qatar`
- [ ] `/airlines/saudi` → React: `http://localhost:8080/airlines/saudi` | Live: `https://buybusinessclass.com/airlines/saudi`
- [ ] `/airlines/singapore` → React: `http://localhost:8080/airlines/singapore` | Live: `https://buybusinessclass.com/airlines/singapore`
- [ ] `/airlines/swiss` → React: `http://localhost:8080/airlines/swiss` | Live: `https://buybusinessclass.com/airlines/swiss`
- [ ] `/airlines/taportugal` → React: `http://localhost:8080/airlines/taportugal` | Live: `https://buybusinessclass.com/airlines/taportugal`
- [ ] `/airlines/turkish` → React: `http://localhost:8080/airlines/turkish` | Live: `https://buybusinessclass.com/airlines/turkish`
- [ ] `/airlines/united` → React: `http://localhost:8080/airlines/united` | Live: `https://buybusinessclass.com/airlines/united`

## Dynamic SEO (business-class-*) (6)

| Test | Path | Live example | React route |
|---|---|---|---|
| - [ ] | `/business-class-affordable-flight` | [/business-class-affordable-flight](https://buybusinessclass.com/business-class-affordable-flight) | yes (enumerated from dynamicPages.json) |
| - [ ] | `/business-class-air-ticket-deal` | [/business-class-air-ticket-deal](https://buybusinessclass.com/business-class-air-ticket-deal) | yes (enumerated from dynamicPages.json) |
| - [ ] | `/business-class-discount-flight` | [/business-class-discount-flight](https://buybusinessclass.com/business-class-discount-flight) | yes (enumerated from dynamicPages.json) |
| - [ ] | `/business-class-discount-ticket` | [/business-class-discount-ticket](https://buybusinessclass.com/business-class-discount-ticket) | yes (enumerated from dynamicPages.json) |
| - [ ] | `/business-class-international-flight` | [/business-class-international-flight](https://buybusinessclass.com/business-class-international-flight) | yes (enumerated from dynamicPages.json) |
| - [ ] | `/business-class-lowest-fare-ticket` | [/business-class-lowest-fare-ticket](https://buybusinessclass.com/business-class-lowest-fare-ticket) | yes (enumerated from dynamicPages.json) |

Checklist (copy-friendly):

- [ ] `/business-class-affordable-flight` → React: `http://localhost:8080/business-class-affordable-flight` | Live: `https://buybusinessclass.com/business-class-affordable-flight`
- [ ] `/business-class-air-ticket-deal` → React: `http://localhost:8080/business-class-air-ticket-deal` | Live: `https://buybusinessclass.com/business-class-air-ticket-deal`
- [ ] `/business-class-discount-flight` → React: `http://localhost:8080/business-class-discount-flight` | Live: `https://buybusinessclass.com/business-class-discount-flight`
- [ ] `/business-class-discount-ticket` → React: `http://localhost:8080/business-class-discount-ticket` | Live: `https://buybusinessclass.com/business-class-discount-ticket`
- [ ] `/business-class-international-flight` → React: `http://localhost:8080/business-class-international-flight` | Live: `https://buybusinessclass.com/business-class-international-flight`
- [ ] `/business-class-lowest-fare-ticket` → React: `http://localhost:8080/business-class-lowest-fare-ticket` | Live: `https://buybusinessclass.com/business-class-lowest-fare-ticket`

## Blog (1)

| Test | Path | Live example | React route |
|---|---|---|---|
| - [ ] | `/blog` | [/blog](https://buybusinessclass.com/blog) | yes |

Checklist (copy-friendly):

- [ ] `/blog` → React: `http://localhost:8080/blog` | Live: `https://buybusinessclass.com/blog`

## External (not same-origin SPA routes)

Discovered from live nav/footer — not React routes:

- [ ] https://blog.buybusinessclass.com/ (header/burger “Blog” on live)
- Trustpilot / BBB / IATA / Google review / social links (footer)

## Vue vs React route gaps

From code inspection of both routers:

- **No major missing React route patterns** vs Vue for production pages.
- React adds an explicit `/sitemap` page component; Vue primarily exposes `/sitemap` via static HTML / sitemap links.
- Vue uses `/business-class-:suffix` catch-all; React **enumerates** known dynamic SEO slugs from `dynamicPages.json` (currently 6). Any new CMS slug would need adding to that JSON + rebuild.
- Live `/blog` SPA route exists in both routers, but **live navigation** prefers the external blog host.
- `/best-deals/unset/0` appears on live when region store has not hydrated — treat as a defect to watch, not a real destination.
- Local repo `public/sitemap.xml` (~129 URLs) is **stale** vs live sitemap.xml (**191** URLs): many countries (Austria, Belgium, Greece, Netherlands, etc.) and cities (Vienna, Milan, Düsseldorf, …) exist live but not in the checked-in sitemap.

