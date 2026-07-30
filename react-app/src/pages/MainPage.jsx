import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

// Components
import HeaderContainer from '@/components/MainPage/HeaderContainer'
import WorksContainer from '@/components/MainPage/WorksContainer'
import BestSelling from '@/components/MainPage/BestSelling'
import ReviewsSection from '@/components/MainPage/ReviewsSection'
import GoogleReview from '@/components/MainPage/GoogleReview'
import RegionsSection from '@/components/MainPage/RegionsSection'
import SeoContent from '@/components/MainPage/SeoContent'
import FaqSection from '@/components/MainPage/FaqSection'
import NewsletterBanner from '@/components/MainPage/NewsletterBanner'
import ContactSection from '@/components/MainPage/ContactSection'
import AirlinesLogos from '@/components/Footer/AirlinesLogos'

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
        <div className="main-page">
            <div className="header-content">
                <HeaderContainer />
            </div>
            <AirlinesLogos />
            <WorksContainer />
            <BestSelling />
            <ReviewsSection />
            <GoogleReview />
            <RegionsSection />
            <SeoContent />
            <FaqSection />
            <NewsletterBanner />
            <ContactSection />
        </div>
    )
}
