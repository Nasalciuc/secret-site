// Router
import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import MarginLayout from '@/layouts/MarginLayout.vue'
import HeaderLayout from '@/layouts/HeaderLayout.vue'

// Components
import MainPage from './pages/MainPage.vue'
import BlackFridayPage from './pages/BlackFridayPage.vue'

import XmasPage from './pages/XmasPage.vue'
const BlogPage = () => import('@/pages/BlogPage.vue')
const AirlinesPage = () => import('@/pages/AirlinesPage.vue')
const AirlineDetail = () => import('@/pages/AirlineDetail.vue')
const FlightPage = () => import('@/pages/FlightPage.vue')
const BestDeals = () => import('@/pages/BestDeals.vue')
const ReviewsVue = () => import('@/pages/ReviewsVue.vue')
const DynamicPage = () => import('@/pages/DynamicPage.vue')
const InnerBlogPage = () => import('@/pages/InnerBlogPage.vue')
const FlightQuotePage = () => import('@/pages/FlightQuotePage.vue')
const AllDeals = () => import('@/pages/AllDeals.vue')
const TermsPrivacyPage = () => import('@/pages/TermsPrivacyPage.vue')
const AboutUsPage = () => import('@/pages/AboutUs.vue')
const BusinessFlights = () => import('@/pages/BusinessFlights.vue')
const SendFacebookPage = () => import('@/pages/SendFacebookPage.vue')
const FaqPage = () => import('@/pages/FaqPage.vue')
const PromoPage = () => import('@/pages/PromoPage.vue')
const StudentFlightsPage = () => import('@/pages/StudentFlightsPage.vue')

const Error404 = () => import('@/pages/404Error.vue')

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
    {
        path: '/',
        component: MarginLayout,
        children: [
            {
                path: '/',
                name: 'index',
                component: MainPage,
                meta: {
                    title: 'Business Class Flight Deals - Save Up To 60% on Air Tickets',
                    description:
                        'Find the best deals on business class flights and save up to 60% on air tickets. Compare cheap business class airfare and book premium tickets today!',
                },
            },
            {
                path: '/airlines',
                component: AirlinesPage,
                meta: {
                    canonical: true,
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },
            {
                path: '/faq',
                component: FaqPage,
                meta: {
                    canonical: true,
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },
            {
                path: '/promo/senior-business-class-discounts',
                component: PromoPage,
                meta: {
                    canonical: true,
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },
            {
                path: '/about-us',
                component: AboutUsPage,
                meta: {
                    canonical: true,
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },
            {
                path: '/airlines/:slug',
                name: 'AirlineDetail',
                component: AirlineDetail,
                props: true,
                meta: {
                    canonical: true,
                },
            },
            {
                path: '/business-class-flights',
                name: 'BusinessFlights',
                component: BusinessFlights,
                meta: {
                    canonical: true,
                    title: 'Book Business Class Flights | Deals For Business Class Flights',
                    description:
                        'Book business class flights and unlock exclusive deals. Enjoy booking cheap business class flights with comfort, savings, and premium in-flight experiences.',
                },
            },
            {
                path: '/business-class-flights/student-flights',

                component: StudentFlightsPage,
                meta: {
                    canonical: true,
                    title: 'Book Business Class Flights | Deals For Business Class Flights',
                    description:
                        'Book business class flights and unlock exclusive deals. Enjoy booking cheap business class flights with comfort, savings, and premium in-flight experiences.',
                },
            },
            {
                path: '/blog',
                component: BlogPage,
                meta: {
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },
            {
                name: 'inner-blog',
                path: '/blog/:id',
                component: InnerBlogPage,
                meta: {
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },
            {
                path: '/flight/region/:region/:id',
                name: 'flight-region',
                component: FlightPage,
                meta: {
                    canonical: true,
                },
            },
            {
                path: '/flight/country/:country/:id',
                name: 'flight-country',
                component: FlightPage,
                meta: {
                    canonical: true,
                },
            },
            {
                path: '/flight/city/:city/:id',
                name: 'flight-city',
                component: FlightPage,
                meta: {
                    canonical: true,
                },
            },
            {
                path: '/best-deals/:region/:id',
                name: 'best-deals-region',
                component: BestDeals,
                meta: {
                    canonical: true,
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },
            {
                path: '/reviews',
                component: ReviewsVue,
                meta: {
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },
            {
                path: '/black-friday-busines-class-seat-sale',
                component: BlackFridayPage,
                meta: {
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },
            {
                path: '/xmas-new-year-flight-sale',
                component: XmasPage,
                meta: {
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },

            {
                path: '/flight',
                name: 'search-results',
                component: FlightQuotePage,
            },
            {
                path: '/business-class-:suffix',
                name: 'dynamic-page',
                component: DynamicPage,
                meta: {
                    canonical: true,
                },
            },
            {
                path: '/facebook-leads',
                component: SendFacebookPage,
            },
        ],
    },
    {
        path: '/',
        component: HeaderLayout,
        children: [
            {
                path: '/all-deals',
                component: AllDeals,
                meta: {
                    canonical: true,
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },
            {
                path: '/terms',
                alias: '/terms-and-conditions',
                component: TermsPrivacyPage,
                meta: {
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },
            {
                path: '/privacy',
                alias: '/privacy-policy',
                component: TermsPrivacyPage,
                meta: {
                    description:
                        'Discover luxury business class travel at BuyBusinessClass. Personalized service, spacious seating, and unbeatable fares to all destinations worldwide. Book now!',
                },
            },
            {
                path: '/:pathMatch(.*)',
                name: 'error-404',
                component: Error404,
            },
        ],
    },
]

// Add here in production history: createWebHistory(), ?? createWebHashHistory()

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior() {
        return { top: 0 }
    },
    routes,
})

router.beforeEach((to, from, next) => {
    const defaultTitle = 'Business Class Flights | Discounted Business Class Tickets'
    const defaultDescription =
        'Find cheap business class airline tickets, exclusive flight deals, and discounted business class fares. Save big on airfares for business class travel worldwide. Book now!'

    let title = defaultTitle
    let description = defaultDescription

    // 🔎 Verificare pentru rute dinamice de oraș
    if (to.name === 'flight-city') {
        const key = `${to.params.city}-${to.params.id}`
        if (staticCityMeta[key]) {
            title = staticCityMeta[key].title
            description = staticCityMeta[key].description
        }
    } else if (to.name === 'flight-country') {
        const key = `${to.params.country}-${to.params.id}`
        if (staticCountryMeta[key]) {
            title = staticCountryMeta[key].title
            description = staticCountryMeta[key].description
        }
    } else if (to.name === 'flight-region') {
        const key = `${to.params.region}-${to.params.id}`
        if (staticRegionMeta[key]) {
            title = staticRegionMeta[key].title
            description = staticRegionMeta[key].description
        }
    } else {
        if (to.meta.title) title = to.meta.title
        if (to.meta.description) description = to.meta.description
    }

    // ⬇️ SETEAZĂ <title>
    document.title = title

    // ⬇️ SETEAZĂ <meta name="description">
    const metaDescriptionTag = document.querySelector('meta[name="description"]')
    if (metaDescriptionTag) {
        metaDescriptionTag.setAttribute('content', description)
    } else {
        const tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        tag.setAttribute('content', description)
        document.head.appendChild(tag)
    }

    // ⬇️ SETEAZĂ <link rel="canonical">
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    const canonicalUrl = window.location.origin + to.fullPath
    if (to.meta.canonical) {
        if (canonicalLink) {
            canonicalLink.setAttribute('href', canonicalUrl)
        } else {
            const link = document.createElement('link')
            link.setAttribute('rel', 'canonical')
            link.setAttribute('href', canonicalUrl)
            document.head.appendChild(link)
        }
    } else if (canonicalLink) {
        canonicalLink.remove()
    }

    next()
})

export default router
