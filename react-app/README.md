# BuyBusinessClass React Migration

This is the React 18 + Vite rewrite of the original Vue 3 application.

## Getting Started

```bash
cd react-app
npm install
npm run dev
```

The dev server runs on `http://localhost:8080`.

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |
| `VITE_BACK` | Legacy backend URL |
| `VITE_GTM_ID` | Google Tag Manager ID |
| `VITE_RECAPTCHA_SITE_KEY` | reCAPTCHA site key |
| `VITE_BASE_URL` | Base URL for canonical/OG tags |

## Project Structure

```
src/
├── components/     # Reusable UI components (to be ported)
├── layouts/        # MarginLayout, HeaderLayout
├── pages/          # All page components
├── services/       # API layer (axios)
├── store/          # Zustand stores
├── styles/         # Global SCSS
├── utils/          # Helpers, marketing source
├── App.jsx         # Root component
├── main.jsx        # Entry point
└── router.jsx      # Route definitions
```

## Migration Status

- [x] Faza 0: Foundation (scaffold, routing, stores, API, utils)
- [x] Faza 1: Global components (Header, Footer, BurgerMenu, ModalStatus, QuoteLoader, StickyContactButton)
- [x] Faza 2: Homepage (HeaderContainer, WorksContainer, BestSelling, Reviews, Regions, FAQ, SEO, Newsletter, Contact)
- [x] Faza 3: Content pages (Blog, InnerBlog, Reviews, Dynamic, FAQ, AboutUs)
- [x] Faza 4: Core business (OrderFly search form, ChooseAirport, ChooseProperties, ClientInfo, CouponForm)
- [x] Faza 5: Polish (SEO canonical/JSON-LD, production build, QA all routes)

## Production Build

```bash
npm run build
```

Output: `dist/` folder ready for deployment.

## Notes

- The app uses **Zustand** instead of Vuex.
- **React Router v6** replaces Vue Router.
- All SCSS is preserved; component styles are migrated alongside components.
- Assets (images, fonts, videos) are copied in `src/assets/`.
- All 24 routes from the Vue app are implemented.
- CouponForm is lazy-loaded after 5 seconds (same as Vue).
