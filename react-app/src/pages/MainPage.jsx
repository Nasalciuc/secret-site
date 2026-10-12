import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'

// The homepage is Betty's design (HTML new version of site/buybusinessclass-new-homepage (4).html),
// in navy and gold, with the site's soul: hero with the quote form as a boarding pass, figures on a
// departures board, featured deals as route tickets, how it works as a flight, why us, reviews as
// boarding passes and the closing call to action on an evening sky, in her order and her layout.
// After it, in the same language, the live site's content that carries SEO weight and leads: the
// route map of destinations, FAQ and guide, the golden newsletter ticket, the contact desk.
import HomeHero from '@/components/Home/HomeHero'
import HomeStats from '@/components/Home/HomeStats'
import HomeDeals from '@/components/Home/HomeDeals'
import HomeSteps from '@/components/Home/HomeSteps'
import HomeWhy from '@/components/Home/HomeWhy'
import ReviewsSection from '@/components/MainPage/ReviewsSection'
import HomeCta from '@/components/Home/HomeCta'
import RegionsSection from '@/components/MainPage/RegionsSection'
import HomeGuide from '@/components/Home/HomeGuide'
import HomeNewsletter from '@/components/Home/HomeNewsletter'
import ContactSection from '@/components/MainPage/ContactSection'

export default function MainPage() {
    const { getAboutUs } = useAppStore()
    const { hash, key } = useLocation()

    useEffect(() => {
        getAboutUs()
    }, [getAboutUs])

    // The bar's links (Deals, How it Works, Why Us, Reviews) are /#section links: bring the section
    // into view, also when arriving from another page (after the app's scroll to the top).
    useEffect(() => {
        const id = decodeURIComponent(hash.slice(1))
        if (!id) return undefined
        const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120)
        return () => window.clearTimeout(timer)
    }, [hash, key])

    useEffect(() => {
        // Reuse existing canonical if MetaUpdater (or another page) already created one.
        // Never hard-removeChild a node that may already have been detached — that crashes React.
        let canonicalLink = document.querySelector('link[rel="canonical"]')
        let createdCanonical = false
        if (!canonicalLink) {
            canonicalLink = document.createElement('link')
            canonicalLink.rel = 'canonical'
            document.head.appendChild(canonicalLink)
            createdCanonical = true
        }
        canonicalLink.href = 'https://buybusinessclass.com/'

        // Set JSON-LD schema
        const schema = {
            '@context': 'https://schema.org/',
            '@type': 'WebSite',
            name: 'BuyBusinessClass',
            url: 'https://buybusinessclass.com/',
            potentialAction: {
                '@type': 'SearchAction',
                target: 'https://buybusinessclass.com/flight?fly_from={fly_from}&fly_to={fly_to}',
                'query-input': ['required name=fly_from', 'required name=fly_to'],
            },
        }
        let script = document.getElementById('homepage-schema')
        if (!script) {
            script = document.createElement('script')
            script.type = 'application/ld+json'
            script.id = 'homepage-schema'
            document.head.appendChild(script)
        }
        script.text = JSON.stringify(schema)

        return () => {
            if (createdCanonical) canonicalLink?.remove()
            document.getElementById('homepage-schema')?.remove()
        }
    }, [])

    return (
        <div className="main-page mb-page hp">
            <HomeHero />
            <HomeStats />
            <HomeDeals />
            <HomeSteps />
            <HomeWhy />
            <ReviewsSection />
            <HomeCta />
            <RegionsSection />
            <HomeGuide />
            <HomeNewsletter />
            <ContactSection variant="home" />
        </div>
    )
}
