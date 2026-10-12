import { useEffect } from 'react'
import RegionVue from '@/components/Flight/RegionVue'
import BlackFridaySearch from '@/components/Seasonal/BlackFridaySearch'
import ReviewsSection from '@/components/MainPage/ReviewsSection'
import bgXmas from '@/assets/images/static/bg-xmas.webp'

export default function XmasPage() {
    useEffect(() => {
        let canonicalLink = document.querySelector('link[rel="canonical"]')
        if (!canonicalLink) {
            canonicalLink = document.createElement('link')
            canonicalLink.rel = 'canonical'
            document.head.appendChild(canonicalLink)
        }
        canonicalLink.href = 'https://buybusinessclass.com/xmas-new-year-flight-sale'
    }, [])

    return (
        <div className="xmas-page seasonal-sale-page seasonal-sale-page--xmas mb-page">
            <div className="regions-friday">
                <RegionVue />
            </div>
            <div className="mb-seasonal-hero">
                <span className="mb-seasonal-badge">
                    <span className="dot" />
                    Holiday season sale
                </span>
                <h1 className="mb-serif">
                    Christmas &amp; New Year Flight Sale
                </h1>
                <p>Fly business class for the holidays with fares from $2,499 — get your free quote today.</p>
            </div>
            <div className="container-friday d-flex">
                <div className="left-image-friday">
                    <img
                        src={bgXmas}
                        alt="Christmas and New Year flight sale — from $2,499"
                        className="img-fluid h-100 w-100"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="right-component">
                    <BlackFridaySearch />
                </div>
            </div>
            <div className="review-friday">
                <ReviewsSection />
            </div>
        </div>
    )
}
