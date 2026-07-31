import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

// Components (moodboard redesign: hero, stats, deals, how-it-works, why-us, reviews,
// then the live-site content sections restyled: regions, SEO copy, FAQ, newsletter,
// contact — they carry SEO weight, internal links, and extra lead capture)
import HeaderContainer from '@/components/MainPage/HeaderContainer'
import StatsStrip from '@/components/MainPage/StatsStrip'
import BestSelling from '@/components/MainPage/BestSelling'
import WorksContainer from '@/components/MainPage/WorksContainer'
import WhyUs from '@/components/MainPage/WhyUs'
import ReviewsSection from '@/components/MainPage/ReviewsSection'
import RegionsSection from '@/components/MainPage/RegionsSection'
import SeoContent from '@/components/MainPage/SeoContent'
import FaqSection from '@/components/MainPage/FaqSection'
import NewsletterBanner from '@/components/MainPage/NewsletterBanner'
import CtaBanner from '@/components/MainPage/CtaBanner'
import ContactSection from '@/components/MainPage/ContactSection'

export default function MainPage() {
    const { getAboutUs } = useAppStore()

    useEffect(() => {
        getAboutUs()
    }, [getAboutUs])

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
        <div className="main-page mb-home">
            <div className="header-content">
                <HeaderContainer />
            </div>
            <StatsStrip />
            <BestSelling />
            <WorksContainer />
            <WhyUs />
            <ReviewsSection />
            <RegionsSection />
            <SeoContent />
            <FaqSection />
            <NewsletterBanner />
            <CtaBanner />
            <ContactSection />
        </div>
    )
}
