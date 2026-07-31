import { lazy, Suspense, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// Layouts
import MarginLayout from '@/layouts/MarginLayout'
import HeaderLayout from '@/layouts/HeaderLayout'
import dynamicSlugs from '@/dynamicSlugs'
import { DEFAULT_DOCUMENT_TITLE, withBrandTitle } from '@/utils/brandTitle'
import { trackFacebookPageView } from '@/utils/thirdParty'

// Critical pages (eager load)
import MainPage from '@/pages/MainPage'
import Error404 from '@/pages/404Error'

// Lazy pages
const BlogPage = lazy(() => import('@/pages/BlogPage'))
const InnerBlogPage = lazy(() => import('@/pages/InnerBlogPage'))
const AirlinesPage = lazy(() => import('@/pages/AirlinesPage'))
const AirlineDetail = lazy(() => import('@/pages/AirlineDetail'))
const FlightPage = lazy(() => import('@/pages/FlightPage'))
const BestDeals = lazy(() => import('@/pages/BestDeals'))
const ReviewsVue = lazy(() => import('@/pages/ReviewsPage'))
const DynamicPage = lazy(() => import('@/pages/DynamicPage'))
const FlightQuotePage = lazy(() => import('@/pages/FlightQuotePage'))
const AllDeals = lazy(() => import('@/pages/AllDeals'))
const TermsPrivacyPage = lazy(() => import('@/pages/TermsPrivacyPage'))
const AboutUsPage = lazy(() => import('@/pages/AboutUsPage'))
const BusinessFlights = lazy(() => import('@/pages/BusinessFlights'))
const SendFacebookPage = lazy(() => import('@/pages/SendFacebookPage'))
const FaqPage = lazy(() => import('@/pages/FaqPage'))
const PromoPage = lazy(() => import('@/pages/PromoPage'))
const StudentFlightsPage = lazy(() => import('@/pages/StudentFlightsPage'))
const BlackFridayPage = lazy(() => import('@/pages/BlackFridayPage'))
const XmasPage = lazy(() => import('@/pages/XmasPage'))
const SitemapPage = lazy(() => import('@/pages/SitemapPage'))

// Meta tags for static routes
const staticCityMeta = {
    'dubai-512': {
        title: 'Fly to Dubai in Business Class | Business Class to Dubai',
        description:
            'Fly to Dubai in business class and experience luxury at great rates. Book business class flights to Dubai and enjoy comfort, savings, and premium air travel.',
    },
    'paris-8': {
        title: 'Business Class Flights To Paris France | BuyBusinessClass',
        description:
            'Book business class flights to Paris, France and travel in style. Fly to Paris in business class with exclusive fares, premium service, and added comfort.',
    },
}
const staticCountryMeta = {
    'germany-2': {
        title: 'Business Class Flights To Germany | BuyBusinessClass',
        description:
            'Fly to Germany in business class and enjoy premium comfort, top service, and great fares. Book business class flights to Germany with exclusive travel deals now.',
    },
    'india-410': {
        title: 'Business Class Flights To India | BuyBusinessClass',
        description:
            'Book business class flights to India and enjoy premium comfort and savings. Get exclusive deals on business class tickets to India and fly in luxury and style.',
    },
    'italy-90': {
        title: 'Business Class Flights To Italy | BuyBusinessClass',
        description:
            'Discover luxury with business class flights to Italy. Enjoy premium comfort, top service, and exclusive deals when you fly to Italy in business class with us.',
    },
}
const staticRegionMeta = {
    'europe-1': {
        title: 'Business Class Flights To Europe | BuyBusinessClass',
        description:
            'Discover luxury Business Class Flights To Europe at BuyBusinessClass. Experience personalized service, spacious seating, and unbeatable fares. Book your flight now!',
    },
}

const routes = [
    { path: '/', element: MainPage, layout: MarginLayout, meta: { title: 'Business Class Flight Deals - Save Up To 60% on Air Tickets', description: 'Find the best deals on business class flights and save up to 60% on air tickets. Compare cheap business class airfare and book premium tickets today!' } },
    { path: '/airlines', element: AirlinesPage, layout: MarginLayout, meta: { canonical: true, description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/faq', element: FaqPage, layout: MarginLayout, meta: { canonical: true, description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/promo/senior-business-class-discounts', element: PromoPage, layout: MarginLayout, meta: { canonical: true, description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/about-us', element: AboutUsPage, layout: MarginLayout, meta: { canonical: true, description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/airlines/:slug', element: AirlineDetail, layout: MarginLayout, meta: { canonical: true } },
    { path: '/business-class-flights', element: BusinessFlights, layout: MarginLayout, meta: { canonical: true, title: 'Book Business Class Flights | Deals For Business Class Flights', description: 'Book business class flights and unlock exclusive deals. Enjoy booking cheap business class flights with comfort, savings, and premium in-flight experiences.' } },
    { path: '/business-class-flights/student-flights', element: StudentFlightsPage, layout: MarginLayout, meta: { canonical: true, title: 'Book Business Class Flights | Deals For Business Class Flights', description: 'Book business class flights and unlock exclusive deals. Enjoy booking cheap business class flights with comfort, savings, and premium in-flight experiences.' } },
    { path: '/blog', element: BlogPage, layout: MarginLayout, meta: { description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/blog/:id', element: InnerBlogPage, layout: MarginLayout, meta: { description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/flight/region/:region/:id', element: FlightPage, layout: MarginLayout, meta: { canonical: true } },
    { path: '/flight/country/:country/:id', element: FlightPage, layout: MarginLayout, meta: { canonical: true } },
    { path: '/flight/city/:city/:id', element: FlightPage, layout: MarginLayout, meta: { canonical: true } },
    { path: '/best-deals/:region/:id', element: BestDeals, layout: MarginLayout, meta: { canonical: true, description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/reviews', element: ReviewsVue, layout: MarginLayout, meta: { title: 'Reviews | BuyBusinessClass', description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/black-friday-busines-class-seat-sale', element: BlackFridayPage, layout: MarginLayout, meta: { description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/xmas-new-year-flight-sale', element: XmasPage, layout: MarginLayout, meta: { description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/flight', element: FlightQuotePage, layout: MarginLayout },
    // React Router v6 does not support partial dynamic segments ("/business-class-:suffix"
    // never matches). Enumerate the known dynamic pages explicitly instead.
    ...dynamicSlugs.map((slug) => ({
        path: `/${slug}`,
        element: DynamicPage,
        layout: MarginLayout,
        meta: { canonical: true },
    })),
    { path: '/facebook-leads', element: SendFacebookPage, layout: MarginLayout },
    { path: '/sitemap', element: SitemapPage, layout: HeaderLayout },
    { path: '/all-deals', element: AllDeals, layout: HeaderLayout, meta: { canonical: true, title: 'All-Deals | BuyBusinessClass', description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/terms', element: TermsPrivacyPage, layout: HeaderLayout, meta: { description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/terms-and-conditions', element: TermsPrivacyPage, layout: HeaderLayout, meta: { description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/privacy', element: TermsPrivacyPage, layout: HeaderLayout, meta: { description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '/privacy-policy', element: TermsPrivacyPage, layout: HeaderLayout, meta: { description: 'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!' } },
    { path: '*', element: Error404, layout: HeaderLayout },
]

function MetaUpdater() {
    const location = useLocation()
    const isFirstMetaPass = useRef(true)

    useEffect(() => {
        const defaultDescription = 'Find cheap business class airline tickets, exclusive flight deals, and discounted business class fares. Save big on airfares for business class travel worldwide. Book now!'

        // Falsy titleContent → Vue App.vue empty-title fallback (unsuffixed).
        // Homepage MainPage clears meta title in Vue; keep the same effective title here.
        let titleContent = null
        let description = defaultDescription
        let canonical = false

        // Handle dynamic flight meta (region / country / city)
        const pathParts = location.pathname.split('/').filter(Boolean)
        if (pathParts[0] === 'flight' && pathParts.length === 4 && ['region', 'country', 'city'].includes(pathParts[1])) {
            const type = pathParts[1]
            const slug = pathParts[2]
            const id = pathParts[3]
            const key = `${slug}-${id}`
            // All flight detail routes use a canonical URL (matches router meta.canonical).
            canonical = true
            if (type === 'city' && staticCityMeta[key]) {
                titleContent = staticCityMeta[key].title
                description = staticCityMeta[key].description
            } else if (type === 'country' && staticCountryMeta[key]) {
                titleContent = staticCountryMeta[key].title
                description = staticCountryMeta[key].description
            } else if (type === 'region' && staticRegionMeta[key]) {
                titleContent = staticRegionMeta[key].title
                description = staticRegionMeta[key].description
            }
        } else if (location.pathname !== '/') {
            const route = routes.find((r) => {
                const routePath = r.path.replace(/:[^/]+/g, '[^/]+').replace(/\*/g, '.*')
                return new RegExp(`^${routePath}$`).test(location.pathname)
            })
            if (route?.meta?.title) titleContent = route.meta.title
            if (route?.meta?.description) description = route.meta.description
            if (route?.meta?.canonical) canonical = true
        } else {
            const route = routes.find((r) => r.path === '/')
            if (route?.meta?.description) description = route.meta.description
        }

        // Vue App.vue: content ? `${content} | BuyBusinessClass` : default
        document.title = withBrandTitle(titleContent, DEFAULT_DOCUMENT_TITLE)

        // Set description
        let metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc) metaDesc.setAttribute('content', description)
        else {
            metaDesc = document.createElement('meta')
            metaDesc.setAttribute('name', 'description')
            metaDesc.setAttribute('content', description)
            document.head.appendChild(metaDesc)
        }

        // Match Vue router: origin + to.fullPath (pathname + search)
        const canonicalUrl = window.location.origin + location.pathname + location.search
        let link = document.querySelector('link[rel="canonical"]')
        if (canonical) {
            if (link) link.setAttribute('href', canonicalUrl)
            else {
                link = document.createElement('link')
                link.setAttribute('rel', 'canonical')
                link.setAttribute('href', canonicalUrl)
                document.head.appendChild(link)
            }
        } else if (link) {
            link.remove()
        }

        // Initial PageView is fired by pixel init; only track SPA navigations after that.
        if (isFirstMetaPass.current) {
            isFirstMetaPass.current = false
        } else {
            trackFacebookPageView()
        }
    }, [location])

    return null
}

export default function Router() {
    return (
        <>
            <MetaUpdater />
            <Suspense fallback={<div className="page-loader">Loading...</div>}>
                <Routes>
                    {routes.map((route) => {
                        const Layout = route.layout
                        const Page = route.element
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}
                </Routes>
            </Suspense>
        </>
    )
}
