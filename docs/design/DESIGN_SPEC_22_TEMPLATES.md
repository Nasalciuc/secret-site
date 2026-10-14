# BuyBusinessClass — Design Spec for the 22 Templates

**Date:** 2026-09-06 · **Source:** `react-app/src` at `Nasalciuc/secret-site@main` (2026-08-22) · **Extracted mechanically** from the component tree of every page (imports, JSX copy, inputs, API/store calls, states), then annotated.

This is the brief for Claude Design. Every board must reproduce exactly the sections listed for its template, in that order, with the real copy below. Nothing added, nothing dropped, unless it goes through a decision (§6).

---

## 1. Design system (already in code — reuse, do not reinvent)

From `react-app/src/styles/mb-tokens.scss`, copied verbatim from the homepage mockup:

| Token | Value | Use |
|---|---|---|
| `--mb-bg` | `#334155` | page background, nav, footer |
| `--mb-surface` | `#1e293b` | cards, panels, form card |
| `--mb-deep` | `#0f172a` | inputs, overlays, dark buttons, hover |
| `--mb-border` | `#475569` | all borders on dark |
| `--mb-text` | `#e2e8f0` | body on dark |
| `--mb-text-muted` | `#94a3b8` | secondary on dark |
| `--mb-gold` | `#b4853b` | accent, primary CTA, eyebrows, stars |
| `--mb-gold-dark` | `#8f6a2e` | CTA hover |
| `--mb-green` | `#34d399` | trust dot, discount badge, "99%" |
| `--mb-ink` | `#0f172a` | headings on **white** sections |
| `--mb-ink-muted` | `#64748b` | secondary on white sections |
| `--mb-radius-card` | `24px` | cards, form card, modal |
| `--mb-radius-input` | `16px` | inputs, small buttons |

**Type:** Playfair Display 700 for display headings (`.mb-serif`, used 22× in `mb-*.scss`), Inter 300–600 for everything else. Eyebrow style: 12px, uppercase, 2–3px tracking, gold. Section header: 36px/40px 700.

**Rhythm from the mockup:** sections alternate dark (`--mb-bg`) and white (`bg-white`). Dark: hero, deals, why-us, CTA, footer. White: how-it-works, reviews. Keep that alternation on inner pages.

**Buttons (3 existing components):** `OrangeFilledButton` → gold filled, pill (`rounded-3xl`), white text. `TransparentButton` → outline `--mb-border`, white text. `BlackWithOrangeTextButton` → `--mb-deep` filled. All three accept `link` (router) or `regularLink` (external, `target=_blank`).

**Logo:** only a dark-on-light logo exists; mockup inverts it with `filter: brightness(0) invert(1)`. A native light logo variant is needed.

**Legacy fonts present but unused by the new skin:** Open Sans, Source Sans Pro (`assets/fonts`). Drop after cutover.

---

## 2. Global chrome (one board; appears on all 239 paths)

### 2.1 Header — `components/Header/Header.jsx`
- Logo (link `/`, aria "Go to main page")
- Desktop nav: **Home** `/` · **About Us** `/about-us` · **Airlines** `/airlines` · **Business Class Flights** `/business-class-flights` · **Blog** `https://blog.buybusinessclass.com/` (external)
- Trust strip (`SvgContainer`): IATA badge (`CODE: 99910753`, link store.iata.org), BBB link, CCRA "check true code" link, Trustpilot link — four external badges
- Phone pill: `24/7 LIVE SERVICE` + `settings.number` (fallback `+1 (888) 322-7999`), `tel:`
- CTA: **Get Free Quote** → opens `DialogForm`
- Sticky on scroll. Mobile: hamburger (`aria "Toggle menu"`) → `BurgerMenu`
- **Decision D2 applies:** mockup nav is 4 anchors (Deals / How it Works / Why Us / Reviews); the site needs the five real items above.

### 2.2 Burger menu — `components/BurgerMenu/BurgerMenu.jsx` (mobile)
Items: Home · About Us · Airlines · Business Class Flights · **Best Deals** (`/best-deals/{regions[0].name}/{id}` — needs regions loaded) · **Reviews** `/reviews` · Blog (external) · `24/7 SERVICE` phone. Note: Best Deals and Reviews exist only here, not in desktop nav (open product decision in LINK_GAPS).

### 2.3 Footer — `components/Footer/Footer.jsx`
- Logo · two SEO `<h2>` keyword lines (keep, they are ranking text)
- **Company:** About Us · Airlines · Business Class Flights · Reviews · Blog
- **Contact:** phone (`tel:`), email (`mailto:settings.email`)
- **Legal:** Privacy Policy `/privacy` · Terms of Use `/terms` · Sitemap `/sitemap`
- Trust: `SvgContainer` badges again + `3d-secure.jpeg`
- `AirlinesLogos` strip (see §3.5)
- © line
- Mockup footer has only About/Reviews/Contact — under-designed; use this list.

### 2.4 Sticky contact pill — `components/StickyContactButton/StickyContactButton.jsx`
Fixed bottom pill `Call Us: +1 (888) 322-7999`, `tel:`. Hides near top/bottom of document and on scroll-up (logic exists). Mobile-first element.

### 2.5 Modals & overlays (all portaled to body, skinned by `mb-chrome.scss`)
| Component | Trigger | Content |
|---|---|---|
| `DialogForm` | header CTA / mobile | `CALL TO SPEAK` (phone, "Live concierge available 24/7", agent photo `call-center-agent.webp`) — `Or` — `REQUEST A FREE QUOTE` → full `OrderFly` inside the modal |
| `CallUsForm` | 5 s after landing on `/flight` (quote page) | h3 "Call us to book your trip now!" + phone + close |
| `DisclaimerForm` | Disclaimer link | h3 "Disclaimer" + body + Close |
| `CouponForm` | 5 s after first load (once) | Eyebrow "Limited offer" · h3 "Fly business. Pay less." · "Exclusive saving on your next premium ticket." · h2 "Save Extra $100 Now" · image `about-image.webp` · fields: Full name, Email address, phone (intl) · promo code display + Copy · consent line (Privacy Policy & SMS Terms) · CTA "Claim my $100 discount" · states: loading, error, success/submitted |
| `ModalStatus` | after any lead submit | success / error toast, auto-closes, close button |
| `QuoteLoader` | while `searchFlight` runs | full-screen loader overlay |
| Calendar popper | date fields | portaled month picker (`VueCalendar` + `useCalendarPopper`) |

---

## 3. Shared components (one board; design once, propagate)

### 3.1 OrderFly — the lead funnel (`components/HeaderForm/OrderFly/OrderFly.jsx`)
Used in: homepage hero card, `DialogForm` modal, `BusinessFlights` page card. **This replaces the mockup's 4-field form (decision D3).**
- Trip type tabs: **Round Trip** · **One Way** · **Multi City** (Multi City adds legs, button "Add Flight")
- Per leg: **From** / **To** airport (`ChooseAirport`: text input with autocomplete via `getAirports`, "reverse" swap button, loading + error states) · **Depart** / **Return** dates (`DatePicker` → calendar popper)
- `ChooseProperties` dropdown: **Cabin Type** (`ChooseClass`: Business Class / First Class) · **Travelers** (`ChoosePassengers`: Adults 1–9, Childrens 0–9, Infants 0–9)
- Search button "Search Flight" → `searchFlight` → `QuoteLoader` → `/flight` result page
- `ClientInfo` step (shown after search on homepage / before submit in modal): **Name**, **email@example.com**, **phone** (intl-tel-input with country flag) · consent "By submitting, you agree to our Privacy Policy and consent to receive SMS." · CTA "Get Free Quote" → `sendLead` (reCAPTCHA v3 invisible)
- States to design: default, focus, loading (airports), validation error per field (phone required / min 5 / `+digits`; name min 2; email regex — messages in `services/api.js validateClient`), submitting, success (→ `ModalStatus`)

### 3.2 SecondBlock — the compact lead form (`components/HeaderForm/FlightCard/SecondBlock.jsx`)
Used in: Promo, StudentFlights, SendFacebook, AirlineDetail, Flight header variants.
- Trip type selector (aria "Trip type", chevron icon) · From / To (`ChooseAirport`) · dates · Cabin Type · Travelers · **Name** · **Email** · phone (intl) · consent (Privacy Policy and SMS Terms and Conditions) · CTA **Get a Free Quote**
- States: disabled, invalid, error, success. Validation reds `#ff6a55` are preserved through `:not(.has-error)` guards — keep the red.

### 3.3 ContactSection (`components/MainPage/ContactSection.jsx`) — on 8 pages
- Eyebrow "Contact Us" · title "Still have questions … leave us a message?" · "Submit your request in the box below and one of our Travel Consultants will contact you back directly."
- Form: Name, E-Mail, Phone, Message (textarea) · consent (Privacy Policy, SMS Terms and Conditions) · CTA **Send** → `contactUs` · states loading/error/success
- Side cards: **Call to Book** (`tel:settings.number`, CTA "Let's have a chat") · **Email Us** (`mailto`, "Write an email to us") · **Address** ("Show on map" → maps link, `loc.png`) · "Open customer service" `cs@buybusinessclass.com` · image `support.png`

### 3.4 WorksContainer (`components/MainPage/WorksContainer.jsx`) — on 8 pages
Eyebrow "Simple process" · h2 "How does this work?" · "We do the hard work so you can enjoy the journey." · 4 steps: **Request a quote** (Request a FREE quote by completing the form above.) · **Fill in your information** (Fill in your personal and contact information.) · **Find the best deal** (A friendly travel concierge will quickly find the best deals for you.) · **Book your flight** (Book your flight and save up to 60% OFF retail prices.) · CTA "Book your Flight Now" (scrolls to form on `/`, links `/` elsewhere). **Already in mockup** (white section, numbered circles, step 4 gold).

### 3.5 AirlinesLogos (`components/Footer/AirlinesLogos.jsx`) — footer + 7 pages
Horizontal strip of partner airline logos (assets in `assets/images/static/*`: emirates, turkish, singapore, qatar, etihad, klm, iberia, hawai, american, lufthansa, swiss, serbia, jordania, philippine, cathay, jetblue, qantas, portugal, canada, saudi, korea, united, france, british, eth, latam…). Mockup has no logos strip — design it once.

### 3.6 ReviewsSection (`components/MainPage/ReviewsSection.jsx`) — on 6 pages
Eyebrow "Real stories" · h3 "99% of Travelers Recommend BuyBusinessClass" (score/count from `useReviewsStore`) · h2 "Travelers love flying with us" · 3 cards: stars, title, body, author_name · CTA "Read more" / "See all reviews on Trustpilot" (external). Fallback reviews when store empty; skeleton while loading. **In mockup** (white section, 3 cards, gold stars).

### 3.7 OfferCard / FlightCards (`components/MainPage/OfferCard.jsx`, `components/Flight/FlightCards.jsx`)
Deal card: image, title (route / destination), label (region/type), price ("from $…"), discount badge, "View deal" → `/flight/{type}/{name}/{id}`. `FlightCards` fields: `name, image, minPrice, price_today, type, extra_info`. Loading skeleton. **In mockup** (4-up grid, image top, badge top-right, price, "View deal" outline button).

### 3.8 BestSelling (`components/MainPage/BestSelling.jsx`) — homepage, DynamicPage
Eyebrow "Limited time" · h2 "Featured Business Class Deals" / "Discounted Business Class Flights · Save up to 60%" · carousel of `OfferCard` (Prev/Next) · CTA "See All Deals" → `/all-deals`. Data: `useRegionStore.bestSelling`.

### 3.9 FaqSection (`components/MainPage/FaqSection.jsx`) — homepage (subset) + `/faq` (all)
h2 "FAQ Section" (rename in design) · accordion · "Find More Questions" → `/faq`. Emits FAQ JSON-LD (`getFaqSchema`).

### 3.10 DescriptionVue (`Flight/`, `DynamicPage/`) — CMS HTML body
Long-form rich text from API (`getBestDeal().description` / `dynamicPages.json about`). Needs a typography spec for h2/h3/p/ul/a on dark.

### 3.11 RegionVue + TransparentSelect (`components/Flight/`) — BestDeals, seasonal pages
Region switcher: dropdown of regions → navigates `/best-deals/{region}/{id}` or `/flight/…`. Dark select on `--mb-surface`.

### 3.12 BlackFridaySearch (`components/Seasonal/BlackFridaySearch.jsx`) — Black Friday, Xmas
Seasonal variant of the lead form with badge + headline; theme image `bgFriday` / `bgXmas`.

### 3.13 AboutSection (`components/MainPage/AboutSection.jsx`) — quote page
Short "about" block (image `about-image.webp`, copy, CTA).

### 3.14 HeaderContainer — one design, five implementations
`MainPage/` (hero + video bg `background-desktop.mp4` / `background-mobile.mp4` + OrderFly card) · `Flight/` (destination hero: name, price-from, bg image from API, `SecondBlock`) · `Quote/` (result header: route, per-cabin price cards, "Thank you for submitting your request!" congrats state) · `DynamicPage/` (SEO landing hero: `mainTitle` + form) · `Reviews/` (score header + CTA). Design the hero pattern once with these five content variants.

---

## 4. Boards → templates

| Board | Templates | Paths |
|---|---|---|
| 0 Chrome | Header, BurgerMenu, Footer, StickyContactButton, 6 modals | all |
| 0 Shared | §3.1–3.14 | all |
| 1 Homepage | MainPage sections 7–12 (Regions, SeoContent, FAQ, Newsletter, CTA, Contact) + GoogleReview | 1 |
| 2 Destination | FlightPage · BestDeals (+region switcher) · DynamicPage (3 content variants of one layout) | 190 |
| 3 Quote result | FlightQuotePage + CallUsForm timing | 1 |
| 4 Lead landings | Promo · StudentFlights · SendFacebook (one layout) | 3 |
| 5 Seasonal | BlackFriday · Xmas (one layout, two themes) | 2 |
| 6 Airlines | AirlinesPage · AirlineDetail | 31 |
| 7 About | AboutUsPage | 1 |
| 8 Business Class Flights | BusinessFlights | 1 |
| 9 Reviews | ReviewsPage | 1 |
| 10 All Deals | AllDeals | 1 |
| 11 Content | FAQ · Legal (4 aliases) · Sitemap · 404 | 7 |
| 12 Blog (only if D4 = internal) | BlogPage · InnerBlogPage | 2 |

Every board: desktop 1440 + mobile 390. Android Chrome is the reference mobile browser.

---

## 5. Templates — sections, copy, fields, data, states

### MainPage  —  A · Homepage

**Routes:** / · **paths:** 1 · **type:** logic-bearing · **in mockup:** 6 of 12 sections in mockup  
- `/` · MarginLayout · title: “Business Class Flight Deals - Save Up To 60% on Air Tickets”

_Sections 7–12 have no design. GoogleReview must be re-mounted (orphan)._

**Sections, in render order:**

0. **Page shell** `pages/MainPage.jsx`
   - data: api=[] store=['App']
1. **HeaderContainer** `components/MainPage/HeaderContainer.jsx`
   - headings: “Save up to 60% on Business Class flights” / “Find your perfect deal”
   - copy: “Save up to” · “on Business Class flights” · “Cheap business class airline tickets & flight deals — access exclusive unpublished fares.” · “Find your perfect deal” · “Get a personalized quote in under 60 seconds”
   - data: api=[] store=['Reviews']
   - assets: ['background-mobile.mp4', 'background-desktop.mp4']
2. **OrderFly (full funnel)** — shared, see §3
3. **StatsStrip** `components/MainPage/StatsStrip.jsx`
   - copy: “Trustpilot rating” · “Trustpilot reviews” · “Up to 60%” · “Off published fares” · “Live support”
   - data: api=[] store=['Reviews']
   - states to design: ['empty', 'loading']
4. **BestSelling** — shared, see §3
5. **OfferCard** — shared, see §3
6. **WorksContainer** — shared, see §3
7. **WhyUs** `components/MainPage/WhyUs.jsx`
   - headings: “Premium travel, without the premium price.”
   - copy: “The BuyBusinessClass difference” · “Premium travel,” · “without the premium price.” · “We specialize exclusively in business and first class. Dedicated experts. The best unpublished fares.” · “Get your quote” · “Call 24/7”
   - data: api=[] store=['App']
8. **ReviewsSection** — shared, see §3
9. **RegionsSection** `components/MainPage/RegionsSection.jsx`
   - headings: “Fly business class worldwide”
   - copy: “View More” · “Destinations” · “Fly business class worldwide”
   - data: api=[] store=['App', 'Region']
   - links: ['/all-deals', '/flight/${routeType}/${String(item.name).toLowerCase()}/${item.id}']
10. **SeoContent** `components/MainPage/SeoContent.jsx`
   - headings: “Book Business Class Airline Tickets at Exclusive Discounts” / “Why Travelers Choose Our Business Class Tickets” / “How We Find Discounted Business Class Fares” / “Popular Routes for Cheap Business Class Flights” / “Ready for Your Next Business Class Flight?”
   - copy: “Book Business Class Airline Tickets at” · “Exclusive Discounts” · “At BuyBusinessClass, we make premium travel effortless and affordable. Whether you're flying for work or leisure, our team sources” · “Business Class Airline Tickets” · “to destinations across Europe, Asia, the Middle East, Africa and the Americas at prices the general public rarely sees. Our direct relationships with major carriers allow us to offer” · “Cheap Business Class Air Tickets” · “Looking for last-minute” · “Business Class Flight Tickets” · “to New York, London, Dubai, Tokyo or Sydney? We've got you covered. Every” · “Discount Business Class Ticket” · “Cheap Business Class Fare” · “without cutting corners on service or seat selection.”
11. **FaqSection** — shared, see §3
12. **NewsletterBanner** `components/MainPage/NewsletterBanner.jsx`
   - headings: “Get Exclusive Business Class Flight Deals First” / “Join our newsletter to get first access to our latest sales and exclusive business class offers you won't find online.”
   - copy: “Get Exclusive Business Class Flight Deals First” · “Join our newsletter to get first access to our latest sales and exclusive business class offers you won't find online.” · “E-mail” · “I agree to receive promotional emails with exclusive offers and updates. Consent isn't required for purchase. I accept the” · “T&C” · “and” · “Privacy Policy” · “Your” · “privacy” · “is 100% protected. Unsubscribe anytime.”
   - props: {'placeholder': ['E-mail']}
   - inputs: 2 field(s)
   - data: api=['axios.post'] store=[]
   - links: ['/privacy', '/terms']
   - states to design: ['disabled', 'error', 'invalid', 'loading', 'success']
13. **CtaBanner** `components/MainPage/CtaBanner.jsx`
   - headings: “Ready to experience business class for less?”
   - copy: “Ready to experience business class for less?” · “Join thousands of smart travelers.” · “Get my free quote”
   - data: api=[] store=['App']
14. **ContactSection** — shared, see §3

### FlightPage  —  B · Destination

**Routes:** /flight/{region|country|city}/:slug/:id · **paths:** 176 · **type:** presentational · **in mockup:** none  
- `/flight/region/:region/:id` · MarginLayout · canonical
- `/flight/country/:country/:id` · MarginLayout · canonical
- `/flight/city/:city/:id` · MarginLayout · canonical

_Same spine as BestDeals/DynamicPage. 176 paths → design once. Hero (Flight/HeaderContainer) shows destination name, price-from, background image from API._

**Sections, in render order:**

1. **HeaderContainer** `components/Flight/HeaderContainer.jsx`
   - copy: “Flight to” · “Starting from”
   - data: api=['getBestDeal'] store=['Region']
   - states to design: ['error']
2. **SecondBlock (lead form)** — shared, see §3
3. **RegionVue** — shared, see §3
4. **TransparentSelect** — shared, see §3
5. **AirlinesLogos** — shared, see §3
6. **WorksContainer** — shared, see §3
7. **FlightCards** — shared, see §3
8. **OfferCard** — shared, see §3
9. **ReviewsSection** — shared, see §3
10. **DescriptionVue (CMS body)** — shared, see §3
11. **ContactSection** — shared, see §3

### BestDeals  —  B · Destination

**Routes:** /best-deals/:region/:id · **paths:** 8 · **type:** logic-bearing · **in mockup:** none  
- `/best-deals/:region/:id` · MarginLayout · canonical

_Adds region switcher (RegionVue + TransparentSelect) above the destination spine. CMS meta via getMeta._

**Sections, in render order:**

0. **Page shell** `pages/BestDeals.jsx`
   - copy: “Best” · “deals” · “starting”
   - data: api=['getBestDeal', 'getMeta'] store=['Region']
1. **AirlinesLogos** — shared, see §3
2. **FlightCards** — shared, see §3
3. **OfferCard** — shared, see §3
4. **FirstBlock** `components/Flight/FirstBlock.jsx`
   - copy: “Flight to” · “Starting from” · “Up to 60-70% discount on business class” · “Old Price” · “Price Today”
5. **RegionVue** — shared, see §3
6. **TransparentSelect** — shared, see §3
7. **WorksContainer** — shared, see §3
8. **ContactSection** — shared, see §3

### DynamicPage  —  B · Destination

**Routes:** /business-class-* (6 slugs) · **paths:** 6 · **type:** logic-bearing · **in mockup:** none  

_SEO landing; content from dynamicPages.json (meta, mainTitle, about.title/text). Same spine._

**Sections, in render order:**

0. **Page shell** `pages/DynamicPage.jsx`
   - data: api=[] store=['App']
1. **HeaderContainer** `components/DynamicPage/HeaderContainer.jsx`
   - assets: ['background-mobile.mp4', 'background-desktop.mp4']
2. **SecondBlock (lead form)** — shared, see §3
3. **DescriptionVue (CMS body)** — shared, see §3
4. **WorksContainer** — shared, see §3
5. **BestSelling** — shared, see §3
6. **OfferCard** — shared, see §3
7. **ReviewsSection** — shared, see §3
8. **ContactSection** — shared, see §3
9. **AirlinesLogos** — shared, see §3

### FlightQuotePage  —  B · Quote result

**Routes:** /flight?fly_from=&fly_to=&trip_type= · **paths:** 1 · **type:** logic-bearing · **in mockup:** none  
- `/flight` · MarginLayout

_Result of OrderFly search: per-cabin price cards + "Thank you" congrats state. CallUsForm popup after 5 s. Quote loader overlay while searching._

**Sections, in render order:**

0. **Page shell** `pages/FlightQuotePage.jsx`
   - data: api=['getAirports', 'searchFlight'] store=['App']
1. **HeaderContainer** `components/Quote/HeaderContainer.jsx`
   - copy: “USD” · “Please fill out the request form.” · “Our travel expert will reach out with the best deals” · “Thank you for submitting your request!” · “One of our travel advisors will be in touch shortly. To unlock more savings, we may contact you to gather relevant information about your flight request.” · “You also agree to our” · “Terms of Service” · “Privacy Policy.”
   - data: api=[] store=['App']
   - links: ['/privacy', '/terms']
   - states to design: ['congratulations', 'success']
2. **SecondBlock (lead form)** — shared, see §3
3. **AirlinesLogos** — shared, see §3
4. **WorksContainer** — shared, see §3
5. **ReviewsSection** — shared, see §3
6. **ContactSection** — shared, see §3
7. **CallUsForm** — shared, see §3
8. **AboutSection** — shared, see §3

### PromoPage  —  C · Lead landing

**Routes:** /promo/senior-business-class-discounts · **paths:** 1 · **type:** presentational · **in mockup:** none  
- `/promo/senior-business-class-discounts` · MarginLayout · canonical

_Page = title + SecondBlock lead form._

**Sections, in render order:**

0. **Page shell** `pages/PromoPage.jsx`
   - headings: “EXCLUSIVE SENIOR DISCOUNTS on Business Class Flights”
   - copy: “EXCLUSIVE SENIOR DISCOUNTS on” · “Business Class Flights” · “Book today and save up to” · “OFF - tailored senior business class flight deals for travelers looking for comfort and style.” · “FROM” · “Round-Trip, All-Inclusive”
1. **SecondBlock (lead form)** — shared, see §3

### StudentFlightsPage  —  C · Lead landing

**Routes:** /business-class-flights/student-flights · **paths:** 1 · **type:** presentational · **in mockup:** none  
- `/business-class-flights/student-flights` · MarginLayout · title: “Book Business Class Flights | Deals For Business Class Flights” · canonical

_Page = title + SecondBlock lead form. Same layout as Promo._

**Sections, in render order:**

0. **Page shell** `pages/StudentFlightsPage.jsx`
   - headings: “Business Class Flights for Students”
   - copy: “Business Class Flights” · “for Students” · “Book today and save up to” · “OFF - specially curated business class offers for students looking to travel in style and comfort without breaking the bank.” · “FROM”
1. **SecondBlock (lead form)** — shared, see §3

### SendFacebookPage  —  C · Lead landing

**Routes:** /facebook-leads · **paths:** 1 · **type:** logic-bearing · **in mockup:** none  
- `/facebook-leads` · MarginLayout

_Internal FB-ads lead tool. SecondBlock only, submits via sendFBLead. No nav emphasis needed._

**Sections, in render order:**

1. **SecondBlock (lead form)** — shared, see §3

### BlackFridayPage  —  C · Seasonal landing

**Routes:** /black-friday-busines-class-seat-sale · **paths:** 1 · **type:** presentational · **in mockup:** none  
- `/black-friday-busines-class-seat-sale` · MarginLayout

_Seasonal hero (badge + title) + BlackFridaySearch form + ReviewsSection. Has bgFriday image._

**Sections, in render order:**

0. **Page shell** `pages/BlackFridayPage.jsx`
   - headings: “Black Friday Business Class Seat Sale”
   - copy: “Limited-time offer” · “Black Friday” · “Business Class” · “Seat Sale” · “Premium cabin fares from $999 — tell us your route and get a free quote before the sale ends.”
1. **RegionVue** — shared, see §3
2. **TransparentSelect** — shared, see §3
3. **BlackFridaySearch** — shared, see §3
4. **ReviewsSection** — shared, see §3

### XmasPage  —  C · Seasonal landing

**Routes:** /xmas-new-year-flight-sale · **paths:** 1 · **type:** presentational · **in mockup:** none  
- `/xmas-new-year-flight-sale` · MarginLayout

_Identical structure to Black Friday; bgXmas image. One design, two themes._

**Sections, in render order:**

0. **Page shell** `pages/XmasPage.jsx`
   - headings: “Christmas &amp; New Year Flight Sale”
   - copy: “Holiday season sale” · “Flight Sale” · “Fly business class for the holidays with fares from $2,499 — get your free quote today.”
1. **RegionVue** — shared, see §3
2. **TransparentSelect** — shared, see §3
3. **BlackFridaySearch** — shared, see §3
4. **ReviewsSection** — shared, see §3

### AboutUsPage  —  D · Content

**Routes:** /about-us · **paths:** 1 · **type:** presentational · **in mockup:** none  
- `/about-us` · MarginLayout · canonical

_Four content blocks; team block; icons block. Copy is static in JSX._

**Sections, in render order:**

1. **BottomBlock** `components/AboutUs/BottomBlock.jsx`
   - headings: “Our Promise” / “Join Thousands of Happy Clients” / “Trust and Recognition”
   - copy: “Our” · “Promise” · “We promise to deliver” · “fast, reliable customer service,” · “most competitive pricing,” · “and a” · “hassle-free booking experience.” · “We go the extra mile to make sure your journey begins the moment you book with us and extends all the way until you reach your final destination.” · “Join Thousands of” · “Happy Clients” · “Ready to experience the best in Business Class travel? Contact us today to get a personalized quote and start your next journey with the comfort and luxury you deserve.” · “Find Your Perfect Business Class Flight”
   - links: ['/']
2. **FirstBlock** `components/AboutUs/FirstBlock.jsx`
   - headings: “About Buy Business Class” / “Elevate Your Travel Experience”
   - copy: “Premium travel experts” · “About” · “Buy Business Class” · “Elevate Your Travel Experience”
3. **SecondBlock** `components/AboutUs/SecondBlock.jsx`
   - headings: “Why Choose Buy Business Class?” / “Our Services Include”
   - copy: “Why choose us” · “Why Choose” · “Buy Business Class?” · “What we do” · “Our Services Include”
   - props: {'alt': ['Descrierea imaginii']}
   - assets: ['second.jpg']
   - states to design: ['loading']
4. **ReviewsSection** — shared, see §3
5. **ThirdBlock** `components/AboutUs/ThirdBlock.jsx`
   - headings: “What Sets Us Apart?”
   - copy: “The difference” · “What Sets Us” · “Apart?”
   - props: {'alt': ['Left Image']}
   - assets: ['second.webp']
   - states to design: ['loading']

### FaqPage  —  D · Content

**Routes:** /faq · **paths:** 1 · **type:** presentational · **in mockup:** none  
- `/faq` · MarginLayout · canonical

_Hero (mb-cl-hero) + FaqSection accordion (same component as homepage, shows all)._

**Sections, in render order:**

0. **Page shell** `pages/FaqPage.jsx`
   - headings: “Frequently asked questions”
   - copy: “Support” · “Frequently asked” · “questions”
1. **FaqSection** — shared, see §3

### TermsPrivacyPage  —  D · Content

**Routes:** /terms · /terms-and-conditions · /privacy · /privacy-policy · **paths:** 4 · **type:** logic-bearing · **in mockup:** none  
- `/terms` · HeaderLayout
- `/terms-and-conditions` · HeaderLayout
- `/privacy` · HeaderLayout
- `/privacy-policy` · HeaderLayout

_Legal body from getPrivacyTerms API (HTML). Hero + long-form text + ContactSection._

**Sections, in render order:**

0. **Page shell** `pages/TermsPrivacyPage.jsx`
   - copy: “Legal”
   - data: api=['getPrivacyTerms'] store=[]
1. **ContactSection** — shared, see §3

### SitemapPage  —  D · Content

**Routes:** /sitemap · **paths:** 1 · **type:** presentational · **in mockup:** none  
- `/sitemap` · HeaderLayout

_Static list of links. HeaderLayout (no MarginLayout)._

**Sections, in render order:**


### 404Error  —  D · Content

**Routes:** * · **paths:** 1 · **type:** presentational · **in mockup:** none  
- `*` · HeaderLayout

_Title + gold button home._

**Sections, in render order:**

0. **Page shell** `pages/404Error.jsx`
   - headings: “404”
   - copy: “Error” · “Page not found” · “Back to homepage”

### AirlinesPage  —  E · Airlines

**Routes:** /airlines · **paths:** 1 · **type:** presentational · **in mockup:** none  
- `/airlines` · MarginLayout · canonical

_Hero + 30-card grid (name, image, "View airline"). Vue had a carousel — React deliberately uses a grid._

**Sections, in render order:**

0. **Page shell** `pages/AirlinesPage.jsx`
   - headings: “Premium Airlines Selected by BuyBusinessClass”
   - copy: “View airline” · “Our airline partners” · “Premium Airlines Selected by” · “BuyBusinessClass” · “Scroll to Explore Our Top Airlines”

### AirlineDetail  —  E · Airlines

**Routes:** /airlines/:slug (30) · **paths:** 30 · **type:** presentational · **in mockup:** none  
- `/airlines/:slug` · MarginLayout · canonical

_Data from airlines.js: name, title, subtitle, image, paragraph, second, facts_title, facts[], details. Includes SecondBlock lead form + WorksContainer._

**Sections, in render order:**

0. **Page shell** `pages/AirlineDetail.jsx`
   - headings: “Airline not found”
   - copy: “Flight business class with” · “Up to 60-70% discount on business class” · “Destination” · “Old Price” · “Price Today” · “Airline not found” · “Explore the full list of premium airlines available through BuyBusinessClass.” · “Back to airlines”
1. **SecondBlock (lead form)** — shared, see §3
2. **WorksContainer** — shared, see §3

### BusinessFlights  —  F · Standalone

**Routes:** /business-class-flights · **paths:** 1 · **type:** presentational · **in mockup:** none  
- `/business-class-flights` · MarginLayout · title: “Book Business Class Flights | Deals For Business Class Flights” · canonical

_Hero copy + OrderFly card + TestimonialsCarousel + SeoContent (own copy). 8 dedicated mb-bf-* selectors already._

**Sections, in render order:**

0. **Page shell** `pages/BusinessFlights.jsx`
   - headings: “Cheap Business Class Flights - Exclusive Discounted Airline Tickets for 2025” / “Search the Best Business Class Flight Deals Today” / “Our Travelers Saved Big on Business Class Tickets - Now It&apos;s Your Turn to Enjoy Exclusive Business Class Deals You Deserve”
   - copy: “Cheap Business Class Flights -” · “Exclusive Discounted Airline Tickets for 2025” · “Search the Best Business Class Flight Deals Today” · “Our Travelers Saved Big on Business Class Tickets -”
1. **OrderFly (full funnel)** — shared, see §3
2. **TestimonialsCarousel** `components/BusinessFlights/TestimonialsCarousel.jsx`
   - props: {'alt': ['Trustpilot reviews']}
   - assets: ['trust-bg.png']
   - states to design: ['loading']
3. **SeoContent** `components/BusinessFlights/SeoContent.jsx`
   - headings: “Book Cheap Business Class Flights With Confidence” / “What Makes Our Business Class Flights Different” / “How to Book Business Class Flights for Less” / “Popular Destinations for Business Class Flights” / “Why Travelers Keep Coming Back”
   - copy: “Book Cheap Business Class Flights With Confidence” · “Book Cheap Business Class Flights” · “with us, you tap into private contract fares, unpublished consolidator rates and loyalty-partner inventory that together produce some of the deepest” · “Deals For Business Class Flights” · “Discounted Business Class Flights” · “without compromising on the experience.” · “What Makes Our Business Class Flights Different” · “Book Business Class Flights” · “Booking Cheap Business Class Flights” · “becomes a repeatable experience rather than a lucky find.” · “Real savings on” · “Business Class Flights”

### ReviewsPage  —  F · Standalone

**Routes:** /reviews · **paths:** 1 · **type:** logic-bearing · **in mockup:** none  
- `/reviews` · MarginLayout · title: “Reviews | BuyBusinessClass”

_Trustpilot data via useReviewsStore: score, count, reviews[]. Header with score + CTA, review cards list, WorksContainer, ContactSection._

**Sections, in render order:**

0. **Page shell** `pages/ReviewsPage.jsx`
   - headings: “99% of Travelers Recommend BuyBusinessClass”
   - copy: “of Travelers” · “Recommend” · “BuyBusinessClass” · “Trustpilot”
   - data: api=[] store=['Reviews']
1. **AirlinesLogos** — shared, see §3
2. **WorksContainer** — shared, see §3
3. **ContactSection** — shared, see §3

### AllDeals  —  F · Standalone

**Routes:** /all-deals · **paths:** 1 · **type:** logic-bearing · **in mockup:** none  
- `/all-deals` · HeaderLayout · title: “All-Deals | BuyBusinessClass” · canonical

_Hero (mb-cl-hero) + OfferCard grid of all deals (getAllBestDeals) + WorksContainer + ContactSection._

**Sections, in render order:**

0. **Page shell** `pages/AllDeals.jsx`
   - headings: “All business class deals”
   - copy: “Featured deals” · “All business class” · “deals” · “Hand-picked business class fares to destinations worldwide — save up to 60% OFF retail prices.”
   - data: api=['getAllBestDeals'] store=['App']
1. **OfferCard** — shared, see §3
2. **WorksContainer** — shared, see §3
3. **ContactSection** — shared, see §3

### BlogPage  —  G · Blog (D4)

**Routes:** /blog · **paths:** 1 · **type:** logic-bearing · **in mockup:** none  
- `/blog` · MarginLayout

_Only if D4 = internal blog. Header + AirlinesLogos + card grid with Read More._

**Sections, in render order:**

0. **Page shell** `pages/BlogPage.jsx`
   - headings: “Business Class Travel Blog”
   - copy: “Travel journal” · “Business Class” · “Travel Blog” · “Guides, tips and inspiration for flying business class for less.”
   - data: api=[] store=['Blog']
1. **AirlinesLogos** — shared, see §3

### InnerBlogPage  —  G · Blog (D4)

**Routes:** /blog/:id · **paths:** 1 · **type:** logic-bearing · **in mockup:** none  
- `/blog/:id` · MarginLayout

_Only if D4 = internal. Article header + AirlinesLogos + article body from API; Vue also listed related BlogCards — React does not._

**Sections, in render order:**

0. **Page shell** `pages/InnerBlogPage.jsx`
   - data: api=['axios.get'] store=[]
1. **AirlinesLogos** — shared, see §3

---

## 6. Decisions that change the boards

| # | Decision | Affects | Recommended |
|---|---|---|---|
| D2 | Nav model: real 5-item nav vs mockup's 4 anchors | Board 0 | Real nav; Best Deals + Reviews to be added or explicitly left mobile-only |
| D3 | Hero funnel: full `OrderFly` vs mockup 4-field form | Boards 0, 1, 2, 8 | Full `OrderFly`, re-skinned |
| D4 | Blog internal or external | Board 12 exists or not; nav/footer "Blog" target | Confirm with product |
| D5 | `AirlinesLogos` on homepage: section under hero (Vue) or footer only (React/mockup) | Board 1 | Footer only |
| D6 | `GoogleReview` on homepage | Board 1 | Restore (was live in Vue) |
| D8 | Logo: produce a native light variant instead of CSS invert | Board 0 | Yes |
| D9 | `StatsStrip` numbers: keep React's real metrics (Trustpilot rating/reviews, 60%, live support) — not the mockup's invented 52k+/$1,240/87/99% | Board 1 | Keep real |

---

## 7. Asset inventory (what exists, what is missing)

**Exists in `react-app/src/assets`:** hero videos `background-desktop.mp4` / `background-mobile.mp4`; hero posters `hero-poster-desktop.jpg` / `-mobile.jpg` (public); `about-image.webp`; `support.png`; `loc.png`; `trust-bg.png`; `3d-secure.jpeg`; `iata.webp`; `call-center-agent.webp`; team photos `theodor.webp`, `roberta.webp`, `marcel.webp`; ~30 airline images (mixed `.jpg`/`.webp`, mixed quality); `chevron.webp`; seasonal `bgFriday` / `bgXmas`.

**Missing for the new brand:** light logo; consistent airline logo set for the dark strip (current images are photos/jpgs, not logos); destination imagery comes from the API per deal (`item.image`) — the design must tolerate arbitrary photos; icons: mockup uses Font Awesome (user-tie, lock, headset, handshake, star, phone, arrow-right) — pick an icon set for production (no FA CDN).

---

## 8. Acceptance rule per board

A board is accepted when:
1. Its section list equals §5 for that template, in order.
2. All copy is the copy in §5 (or a deliberate rewrite logged against the section).
3. Every form shows: default, focus, error (red `#ff6a55`), loading, success.
4. Every data-driven block shows: loading skeleton, empty/fallback, populated.
5. Desktop 1440 and mobile 390 both exist.
6. Nothing in the board requires a new API field. If it does, it is a product change, not a design.

Handoff: Claude Design bundle → Claude Code, per board, in the order of §4. Implementation touches markup and `mb-*.scss` only; the 42 logic-bearing components keep every hook, effect, API call and meta writer.
