# BuyBusinessClass — Dezbatere: Vue vechi → React nou cu brandul nou

**Data:** 2026-09-06 · **Format:** 5 experți × 5 runde · **Bază factuală:** graphify pass 2 (537 noduri / 1004 muchii), spec-ul celor 22 de template-uri, mockup-ul homepage, cele două audituri din 31 iulie, `Next-Level A/B Testing` (project knowledge).

**Întrebarea:** cum adaptăm site-ul Vue cu stilul vechi la React cu noul brand design — și în ce ordine — fără să stricăm funnelul de lead-uri care e businessul.

**Experții:**
- 🔴 **Mara** — Frontend. Vrea stack curat, sistem de design ca sursă unică, componente cu API clar.
- 🟢 **Andrei** — Product. Conversia e metrica. Orice nu mișcă lead-urile e cost.
- 🔵 **Radu** — Solo dev. Livrează. Cea mai simplă cale care funcționează.
- 🟣 **Diana** — Systems. Integritatea datelor, pipeline, ce e live de fapt, ce se rupe.
- 🟠 **Vlad** — UX. Consistență pe 239 de pagini, mobile Android, fluxuri reale.

---

## RUNDA 1 — Viziunea fiecăruia

### 🔴 Mara — „Nu adaptăm Vue. Terminăm React-ul ca sistem de design."

Vue-ul e istorie. Paritatea funcțională e confirmată — 0 High, 0 Med, 97 muchii `ported_to`, 14 componente fără port din care 2 sunt moarte și în Vue. Nu mai există nimic de „adaptat" din Vue în afară de un lucru: **structura de conținut** a paginilor, care e deja în React.

Ce propun e să tratăm `mb-tokens.scss` ca *design system v1* și să-l ducem la capăt:
1. **Un singur strat de tokens** — cele 13 variabile devin sursa pentru tot; `general.scss`, `mixins.scss`, `remaining-pages.scss` și restul de ~30 de fișiere legacy se șterg pe măsură ce `mb-*` le acoperă. Azi avem două sisteme suprapuse: legacy + override `mb-`. Asta e datorie tehnică care crește la fiecare board.
2. **Componente cu variante, nu 5 fișiere cu același nume.** `HeaderContainer` există în 5 locuri. Un `PageHero` cu prop `variant="home | destination | quote | dynamic | reviews"`. La fel `SecondBlock` ×3, `FirstBlock` ×3.
3. **Claude Design pornește din codebase**, nu din mockup. Onboarding-ul citește `react-app/`, extrage tokens și componentele, și generează board-urile pe *sistemul existent*. Așa nu obținem a doua interpretare a brandului.
4. **Scope-urile se promovează**: tot ce e `.mb-home` și e componentă partajată trece la `:is(.mb-home, .mb-page)`. Găsirea lui `ContactSection` cu 35 de selectoare pe home și 8 în rest e exact simptomul de „două sisteme".

Și da, o spun: TypeScript la `services/api.js` și la cele 4 store-uri. 26 de muchii fiecare, 15 pagini dependente. Fără tipuri, orice restyling care atinge un prop e risc orb.

### 🟢 Andrei — „Rebrandul e OK. Funnelul e sacru. Măsurăm."

Site-ul ăsta vinde bilete business class prin lead-uri. Fiecare pagină are un singur scop: să bage utilizatorul în `OrderFly` sau `SecondBlock`, să-l facă să dea telefonul, și să declanșeze `requests/create`. Tot restul — Why Us, Stats, Reviews — e decor care susține încrederea cât să dea telefonul.

Deci regula mea: **rebrandul nu are voie să schimbe comportamentul funnelului**. Nici câmpuri, nici ordine, nici validare, nici timing-ul popup-urilor fără test.

Trei lucruri concrete:
1. **Canary + A/B pe homepage** înainte de tot. Cartea de A/B testing din project knowledge descrie exact asta: un canary de câteva ore pe 1% din trafic pe fiecare variantă, cu verificări automate pe metrici de sistem (timp de încărcare, erori, logging), apoi ramp-up. Pentru noi: homepage vechi vs homepage `mb-home`, metrica de succes = `lead_created`, guardrail = rata de eroare pe `requests/create` și timpul până la primul input în formular.
2. **„Test to derisk", nu „test to measure"** — la început. Cartea le separă: derisk = confirmi că nu ai stricat nimic, cu eșantion mic și durată scurtă; measure = calculezi impactul real, cu semnificație statistică. Noi vrem întâi derisk. Measure vine după cutover.
3. **Nav-ul (D2)**: Best Deals și Reviews trebuie în nav-ul desktop, nu doar în burger. Sunt cele două pagini cu cea mai mare intenție comercială după homepage. Mockup-ul cu 4 ancore e un one-pager de agenție, nu nav-ul unui site cu 239 de pagini.

Și blogul (D4): extern. Nav-ul live trimite deja la subdomeniu. Cele două template-uri interne se șterg, nu se desenează.

### 🔵 Radu — „Aplicația React e 90% gata. Nu o rescriem. O livrăm."

Am numărat. 6378 de linii de SCSS nou, toate cele 22 de pagini cu `.mb-page`, 11 din 14 stylesheet-uri site-wide. Cineva a muncit luni de zile. Ideea de a șterge `react-app` și a genera din Claude Design mi se pare cea mai scumpă decizie posibilă: arunci 42 de componente cu logică validată ca să refaci 52 prezentaționale care sunt deja pe jumătate refăcute.

Planul meu are 4 pași și primul nu e de design:
1. **CI + build.** `react-app` nu se construiește de nicăieri. Rădăcina rulează `vue-cli-service build`. Până nu există un `vite build` care rulează undeva automat, orice board e desen pe hârtie. O zi de muncă, blochează tot.
2. **Reparăm cele 8 defecte cunoscute.** `GoogleReview` orfan — un import. Scope-ul `.mb-home` pe Contact — o linie de SCSS. „FAQ Section" — copy. Nu trebuie design pentru astea.
3. **Board-urile în 3 felii, nu 13.** Felia 1: chrome + shared + homepage (ce se vede peste tot + prima impresie). Felia 2: destinație + quote (190 de path-uri + funnelul). Felia 3: tot restul. Fiecare felie e livrabilă și testabilă singură.
4. **Ștergem Vue** după două săptămâni de producție curată. `src/`, `vue.config.js`, `babel.config.js`, `HTML new version of site/`. Repo-ul devine un singur app.

Ce NU fac: nu unific cele 5 `HeaderContainer` acum (Mara), nu bag TypeScript (Mara), nu construiesc platformă de experimentare (Andrei). Fiecare din astea e un proiect separat care nu livrează brandul.

### 🟣 Diana — „Nu știm ce e live. Începem de acolo."

Am o problemă cu premisa. CV-ul zice că migrarea Vue → React a fost livrată pe `buybusinessclass.com`. Repo-ul zice că rădăcina construiește Vue și React n-are pipeline. Una din două e adevărată, și diferența e enormă:
- Dacă **live e Vue**, atunci „adaptăm Vue la React" e de fapt *cutover*: schimbăm aplicația de producție. Rebrandul e secundar față de riscul de a schimba stack-ul sub un site care primește lead-uri.
- Dacă **live e React** (deploy manual de undeva), atunci repo-ul minte și avem un deploy nereproductibil, ceea ce e mai grav.

Până nu răspunde cineva la asta cu un `curl -I buybusinessclass.com` și un view-source, nu semnez nimic.

Apoi, ce se rupe la cutover, în ordinea probabilității:
1. **Evenimentele de marketing.** `lead_created`, Bing UET, FB PageView pe navigare SPA, `marketing_source` din cookie atașat la fiecare lead. Auditurile au fixat trei bug-uri exact aici. Ăsta e stratul invizibil care, dacă se rupe, nu-l vede nimeni două săptămâni.
2. **reCAPTCHA v3** pe fiecare submit — cheia e per-domeniu.
3. **Cele 4 aliasuri legale** (`/terms`, `/terms-and-conditions`, `/privacy`, `/privacy-policy`) și canonical-urile pe 176 de pagini de destinație. SPA fără SSR — Google vede ce scrie `MetaUpdater` după load.
4. **Sitemap**: Vue servește 129, React 191. La cutover se schimbă ce indexează Google.

Propun un **gate mecanic**: Playwright pe toate cele 239 de URL-uri (le avem în `all_paths.txt`), pe staging, verificând status, erori de consolă, `<title>` cu `| BuyBusinessClass`, canonical prezent, și — separat — un test de submit pe fiecare formular cu verificarea că apare requestul corect cu `marketing_source`. Rulează în CI. Verde = poți continua.

Și graful: după fiecare felie, re-rulăm graphify și facem diff. Dacă un nod din `api.js`, store-uri sau `thirdParty.js` a câștigat sau pierdut muchii, cineva a atins logică, nu prezentare.

### 🟠 Vlad — „Brandul nou e pe 22 de pagini doar dacă utilizatorul îl vede pe 22 de pagini."

Am trei observații pe care nu le-a făcut nimeni pentru că nimeni nu s-a uitat ca utilizator:

1. **Furtuna de popup-uri.** `CouponForm` apare la 5 secunde după prima încărcare. `CallUsForm` apare la 5 secunde pe pagina de quote. `DialogForm` se deschide din header. `StickyContactButton` stă fix jos. Pe mobil, la 390px, un utilizator care ajunge pe `/flight` din homepage poate avea în viewport: sticky pill + coupon + call-us + calendar popper. Nu e o problemă de brand, e o problemă de respect. Redesign-ul e momentul să decidem o **politică de un singur overlay**.
2. **Inconsistența e mai rea decât vechiul.** `ContactSection` arată nou pe homepage și „aproape nou" pe 7 pagini. Un utilizator care merge de pe `/` pe `/flight/country/austria/109` vede aceeași secțiune în două stiluri. Asta se citește ca „site în lucru", ceea ce pentru un site care cere telefonul e otravă pentru încredere. Ori promovezi scope-ul, ori nu lansezi.
3. **Formularul din hero.** Mockup-ul are 4 câmpuri și e *frumos*. `OrderFly` real are tab-uri de trip type, aeroporturi cu autocomplete, calendar, cabin, pasageri, apoi nume/email/telefon. E *corect*, dar pe mobil e un zid. Nu propun să tăiem câmpuri (Andrei are dreptate că funnelul e sacru). Propun **progressive disclosure**: primul ecran arată From / To / Date (ca mockup-ul), iar cabin/pasageri/client info se deschid la interacțiune. Același `sendLead`, aceleași câmpuri, altă ordine de expunere.

Plus: logo light nativ (D8), set de iconițe (nu FA prin CDN), contrast pe textul legal pe slate (`#e2e8f0` pe `#334155` e OK pentru body, dar `--mb-text-muted #94a3b8` pe `#1e293b` e la limită pentru text mic), și starea de eroare roșie `#ff6a55` — pe slate arată ca un warning de sistem, nu ca o validare. Merită un roșu calibrat pe paletă.

---

## RUNDA 2 — Atacuri încrucișate

### 🔵 Radu → 🔴 Mara: „Refactorul de `HeaderContainer` și TypeScript nu livrează brand."
Cinci `HeaderContainer` sunt urâte, dar funcționează și fiecare e într-o comunitate separată în graf — nu se ating între ele. Unificarea într-un `PageHero` cu 5 variante e o rescriere a 5 componente cu logică (Quote face price cards + congrats, Flight citește deal-ul din API, Main are video). Riscul e real, câștigul e estetic. **După** cutover, dacă rămâne timp. TypeScript pe `api.js`: 250 de linii pe care le-am citit în 10 minute. Tipurile nu prind bug-uri de CSS.

### 🔴 Mara → 🔵 Radu: „Două sisteme de stil suprapuse e datorie care crește cu fiecare board."
Fiecare board nou adaugă selectoare `mb-*` care *override* legacy. La 13 board-uri, vom avea 10k linii de override peste 8k de legacy. Nimeni nu va mai ști ce câștigă. Nu cer rescriere — cer ca la fiecare felie livrată să se **șteargă** legacy-ul pe care îl acoperă. Altfel „ștergem Vue după două săptămâni" e o glumă: vom avea Vue-ul mort *în SCSS-ul React*.

### 🟢 Andrei → 🟠 Vlad: „Progressive disclosure schimbă funnelul. Se testează sau nu se face."
Ordinea câmpurilor *este* comportament. Dacă utilizatorul vede 3 câmpuri și apoi îi apar încă 6, rata de abandon se mută — poate în bine, poate în rău. Nu am date. Deci: hero-ul din board-ul 1 se implementează în **două variante** (OrderFly complet re-skinuit vs. disclosure), și trec prin același A/B. Nu se decide în Figma.

### 🟠 Vlad → 🟢 Andrei: „Nu poți A/B-testa un site care arată ca două site-uri."
A/B-ul tău compară homepage vechi cu homepage nou. Dar utilizatorul din varianta nouă dă click pe un deal și ajunge pe `/flight/...` cu `ContactSection` pe jumătate stilizat și `WorksContainer` care nu știe pe ce pagină e. Rezultatul A/B-ului măsoară *inconsistența*, nu brandul. Consistența pe traseul complet homepage → destinație → quote trebuie să existe **înainte** de A/B, altfel testul e otrăvit.

### 🟣 Diana → 🔵 Radu: „«CI într-o zi» presupune că știi unde e producția."
Nu există niciun fișier de deploy în repo. Nici Vercel, nici Netlify, nici Docker, nici GitHub Actions. Ca să faci CI ai nevoie de: unde se hostează, cine are acces, ce env vars sunt setate acolo (`VITE_RECAPTCHA_SITE_KEY`, `VITE_GTM_ID`, pixel). Asta nu e o zi de cod, e o zi de *întrebări puse oamenilor*. Pune-o în plan ca dependență externă, nu ca task.

### 🔵 Radu → 🟣 Diana: „Testul de submit pe fiecare formular pe staging creează lead-uri false în CRM."
Diana vrea Playwright care submite `requests/create`. Aia lovește API-ul real și creează cereri în sistemul de vânzări, cu agenți care sună un număr de test. Ori avem un `webapi` de staging (nu știm), ori testul de submit se oprește la validarea client-side și la *interceptarea* requestului, fără să-l lase să plece. Ce verificăm e payload-ul, nu răspunsul.

### 🟣 Diana → 🟢 Andrei: „A/B fără platformă e un `if (Math.random())`."
Nu avem experimentation platform. Avem GTM. Cartea zice clar că un A/B are nevoie de: alocare stabilă per utilizator, logging al expunerii, metrici de succes și guardrail definite înainte, și un canary automat. Cu GTM poți face alocarea (cookie) și expunerea (event). Metricile le ai în GA4 + `lead_created`. Dar A/A test-ul — să confirmi că infrastructura nu produce diferențe din senin — e obligatoriu înainte, și pe traficul ăsta (câteva mii de vizite/lună?) durata ca să vezi ceva la `lead_created` e de săptămâni. Fii onest cu ce poți măsura: **derisk** (nu s-a rupt nimic), nu **lift**.

### 🔴 Mara → 🟠 Vlad: „Politica de un singur overlay e decizie de produs, nu de design."
Coupon-ul la 5 secunde există pentru că cineva a măsurat că aduce lead-uri (sau crede). Nu-l scoatem din considerente estetice. Dar te susțin pe mecanism: un **overlay manager** în `useAppStore` (există deja `modal`, `allowModal`, `modalTimeout`) care garantează un singur overlay activ și o coadă. E o schimbare de logică mică, cu blast radius mare (15 pagini) — deci intră în felia 1, cu Diana la review.

### 🟢 Andrei → 🔴 Mara: „«Ștergem legacy pe măsură ce livrăm» dublează fiecare felie."
Fiecare fișier legacy șters trebuie verificat pe toate paginile pe care le atingea. `remaining-pages.scss`, `mixins.scss` — sunt importate peste tot. Ștergerea lor e regresie potențială pe 22 de pagini per fișier. Sunt de acord cu principiul, dar cu **un buget**: max 20% din timpul feliei pe curățenie, restul pe livrare. Altfel felia 1 nu iese niciodată.

---

## RUNDA 3 — Deciziile deschise, luate una câte una

| # | Decizie | Poziții | Rezoluție |
|---|---|---|---|
| **D1** | `mb-tokens.scss` = baseline sau se aruncă | Toți: baseline. Mara adaugă: și e *contractul* pentru Claude Design | **Baseline.** Claude Design face onboarding din `react-app/`, nu din mockup. Mockup-ul e referință secundară pentru homepage |
| **D2** | Nav | Andrei: 5 item + Best Deals + Reviews pe desktop. Vlad: 7 item nu încap la 1024px. Radu: nu schimbăm nav-ul acum | **7 item pe desktop ≥1280, 5 + „More" între 1024–1280, burger sub.** Best Deals pe desktop necesită regiunile încărcate — link static la `/all-deals` în loc de `/best-deals/{region}/{id}` |
| **D3** | Hero funnel | Andrei: OrderFly complet. Vlad: disclosure. Diana: orice variantă trece prin `sendLead` identic | **Ambele variante se construiesc, aceleași câmpuri, același payload.** Disclosure-ul e prima variantă de A/B derisk după cutover. Până atunci, live = OrderFly complet re-skinuit |
| **D4** | Blog | Andrei: extern. Diana: `useBlogStore` + 2 endpoint-uri `articles/*` rămân în cod dacă nu ștergem | **Extern.** `BlogPage`, `InnerBlogPage`, `useBlogStore`, `articles/*` se șterg în felia 3. Nav + footer „Blog" → subdomeniu. Board 12 nu există |
| **D5** | `AirlinesLogos` pe homepage | Vlad: strip-ul de logo-uri sub hero e semnal de încredere clasic. Andrei: mockup-ul l-a scos și n-are cine să-l măsoare | **Footer only.** Se reconsideră ca variantă de A/B dacă apar date |
| **D6** | `GoogleReview` | Toți: era live, dispariția e regresie | **Se remontează** în `MainPage` între Reviews și Regions. Board 1 îl desenează |
| **D7** | Build target | Diana: întâi aflăm ce e live. Radu: `react-app` devine rădăcina | **`react-app` → rădăcină repo; Vue → `legacy/` până la ștergere.** Precondiție: răspunsul la „ce e live" (Runda 4) |
| **D8** | Logo light | Toți | **Da.** Livrabil de brand, nu de cod |
| **D9** | Cifre în `StatsStrip` | Toți: cele reale | **Cele reale** (Trustpilot rating/reviews, 60%, live support). Cifrele din mockup nu intră nicăieri |
| **D10** | `GoogleMap` în Contact | Vlad: harta era conținut. Radu: încă un script third-party. Andrei: nimeni nu a dat click pe hartă ca să sune | **Nu se readuce.** „Show on map" rămâne link |
| **D11** | Overlay policy | Vlad + Mara: un overlay activ. Andrei: coupon-ul rămâne | **Un singur overlay activ, cu coadă**, în `useAppStore`. Coupon-ul rămâne, dar nu se suprapune cu CallUs/Dialog. Felia 1 |
| **D12** | Scope `.mb-home` → `:is()` pentru Contact/FAQ/Newsletter | Toți | **Se promovează** în felia 1, după board-ul shared. Până atunci homepage-ul are un „Contact" și restul altul |
| **D13** | Unificare `HeaderContainer` ×5, TS | Mara: da. Radu: nu acum | **Nu acum.** Backlog post-cutover |
| **D14** | Ștergere legacy SCSS | Mara: pe măsură. Andrei: buget 20% | **Buget 20% per felie**, cu regula: un fișier legacy se șterge doar când toate paginile care îl importau au trecut prin QA pe felia curentă |

---

## RUNDA 4 — Riscuri, secvențiere, rollout

### Precondiția zero (Diana)
**Ce e live?** Verificare de 5 minute: `view-source` pe `buybusinessclass.com` → dacă vezi `/src/main.jsx` sau bundle Vite → React; dacă vezi `app.[hash].js` cu `chunk-vendors` → Vue CLI. Plus întrebarea către cine deține hosting-ul. Fără răspuns, nu se începe felia 1.

Cele două scenarii:
- **Live = Vue.** Atunci ordinea e: React la paritate pe staging → QA 239 URL → cutover *fără brand nou* (sau cu `mb-home` doar pe homepage, ca variantă) → apoi brandul felie cu felie. Nu schimbi stack-ul și brandul în aceeași zi. Dacă lead-urile scad, nu știi de ce.
- **Live = React (deploy manual).** Atunci primul task e să *reproducem* deploy-ul în CI, apoi tot restul. Brandul nou e deja parțial live (homepage `mb-home`), ceea ce înseamnă că inconsistența semnalată de Vlad e deja în producție.

### Riscul de conversie (Andrei + Diana)
Metrici definite **înainte** de orice felie:
- Succes: `lead_created` / sesiune; `requests/create` 2xx / submit-uri.
- Guardrail: erori JS per sesiune; timp până la primul input în formular; rata de abandon a `ChooseAirport` (11 pagini — e cel mai folosit control interactiv de pe site).
- A/A test o săptămână pe alocarea GTM înainte de primul A/B, ca să știm că infrastructura nu inventează diferențe.
- Canary: fiecare felie intră pe 5–10% din trafic 48h cu alerte pe guardrail-uri, apoi 100%.

### Riscul SEO (Diana)
SPA fără SSR pe 239 de pagini indexabile. Nu se rezolvă în proiectul ăsta, dar nu se agravează: canonical pe fiecare rută, `sitemap.xml` cu 191, redirect 301 pentru aliasurile legale către una canonică, `robots.txt` identic. Și un lucru pe care nu-l face nimeni: verificat în Search Console după cutover că paginile de oraș încă se indexează cu titlul corect.

### Riscul de UX pe mobil (Vlad)
Android Chrome la 390px, pe traseul homepage → deal → `/flight` → submit. Punctele de rupere cunoscute: calendar popper (portalat în `body`, iese din `.mb-page`), intl-tel-input (dropdown de țări peste modal), sticky pill peste butonul de submit al `ContactSection`. Toate trei sunt *în* `mb-chrome.scss` și `mb-quote-funnel.scss` — deci felia 1.

### Riscul de proces (Radu)
13 board-uri în Claude Design înseamnă 13 handoff-uri către Claude Code. Fiecare handoff e o sesiune. Dacă fiecare durează 2 zile, e o lună doar pe implementare, fără QA. De aia 3 felii: fiecare felie e un singur handoff mare, cu boards multiple în el.

### Secvențierea finală

| Felie | Conținut | Gate de ieșire |
|---|---|---|
| **0 — Fundație** (fără design) | Răspuns „ce e live". `react-app` la rădăcină. CI: `vite build` + Playwright 239 URL (status, consolă, title, canonical). Cele 8 defecte cunoscute. Overlay manager (D11). Scope promotion (D12). A/A test pornit. | build verde; 239/239 fără 404 și fără erori de consolă; overlay-urile nu se suprapun |
| **1 — Chrome + Shared + Homepage** | Board 0-chrome, 0-shared (14 componente incl. `ChooseAirport`, `SecondBlock`, `OrderFly` ambele variante), Board 1 (6 secțiuni + GoogleReview). Implementare. Ștergere legacy ≤20%. | traseul `/` → `/flight/...` → `/flight?…` → submit consistent vizual la 1440 și 390; payload de lead identic cu înainte (interceptat, nu trimis) |
| **2 — Destinație + Quote + Landings** | Boards 2, 3, 4, 5 (190 + 1 + 5 path-uri). | 25 URL-uri reprezentative live vs staging; canary 48h pe 10% |
| **3 — Restul** | Boards 6–11 (airlines, about, business flights, reviews, all deals, content). Ștergere blog (D4), Vue (`legacy/`), fonturi Open Sans/SSP, `HTML new version of site/`. | 239/239 verde; Search Console fără scădere de pagini indexate la 14 zile |
| **4 — Măsurare** | A/B derisk: hero OrderFly vs disclosure (D3). Apoi, dacă traficul permite, test to measure. | decizie pe date, nu pe gust |

---

## RUNDA 5 — Consens

### Ce s-a decis (unanim sau prin majoritate)

1. **Nu se rescrie nimic.** `react-app` e ținta, `mb-tokens.scss` e sistemul de design, Claude Design pornește din cod. Vue-ul nu se „adaptează" — s-a adaptat deja; se șterge după cutover.
2. **Fundația înaintea designului.** Felia 0 nu conține niciun board. Conține răspunsul la „ce e live", CI-ul, cele 8 defecte și cele două schimbări de logică mici cu blast radius mare (overlay manager, scope promotion). Vlad și Diana au câștigat argumentul că nu poți nici testa, nici lansa un site inconsistent.
3. **Funnelul e invariant.** Aceleași câmpuri, același payload, aceeași validare, același reCAPTCHA. Orice variantă de UX (disclosure) se construiește în paralel și se testează, nu se lansează. Andrei a câștigat pe fond, Vlad pe metodă.
4. **Trei felii, nu treisprezece handoff-uri.** Radu a câștigat pe proces. Board-urile rămân 12 (blogul a căzut), dar se grupează.
5. **Curățenia are buget, nu e opțională.** 20% din fiecare felie, cu regula de ștergere condiționată de QA. Mara a câștigat principiul, Andrei limita.
6. **Măsurarea e derisk, nu lift.** Canary pe fiecare felie, A/A înainte de A/B, metrici definite dinainte. Diana a corectat ambiția lui Andrei la ce poate măsura traficul real.
7. **Post-cutover backlog**, explicit și neprioritizat acum: unificare `HeaderContainer`, TypeScript pe `api.js` + store-uri, SSR/SSG pentru cele 176 de pagini de destinație, hartă în Contact dacă apar date.

### Ce rămâne dezacord (înregistrat)
- **Mara** consideră că fără unificarea celor 5 `HeaderContainer` board-ul shared va produce 5 implementări ușor diferite ale aceluiași hero și că vom plăti asta la felia 2. Radu acceptă riscul.
- **Vlad** consideră că scoaterea strip-ului de logo-uri de sub hero (D5) slăbește încrederea exact în momentul în care schimbăm și culorile. Andrei acceptă riscul până la date.
- **Diana** nu consideră planul executabil până nu există răspuns la „ce e live". Toți sunt de acord că e precondiție, nu doar opinia ei.

### Ownership

| Cine | Ce |
|---|---|
| **Scaler** | Deciziile D1–D14 (scrise în `react-app/README.md`), răspunsul „ce e live", accesul la hosting și env vars, board-urile în Claude Design, review-ul fiecărui handoff |
| **Claude Code** | Felia 0 integral; implementarea fiecărei felii din handoff bundle; ștergerea legacy în buget; re-rularea graphify + diff după fiecare felie |
| **Claude in Chrome** | QA vizual pe cele 25 de URL-uri reprezentative, live vs staging, desktop + 390px; verificarea Search Console post-cutover |
| **Playwright în CI** | 239 URL-uri: status, consolă, title, canonical; interceptarea payload-urilor de lead pe fiecare formular |
| **Graful (graphify)** | Poarta „presentation only": diff pe muchiile nodurilor `api.js`, `useAppStore`, `thirdParty.js` după fiecare felie; blast radius înainte de orice schimbare pe componentă partajată |

### Primul pas concret, mâine
`view-source` pe `buybusinessclass.com`. Un rând de răspuns: Vue sau React. Tot planul de mai sus se ramifică pe rândul ăla.
