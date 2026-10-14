import { useEffect } from 'react'
import RegionVue from '@/components/Flight/RegionVue'
import BlackFridaySearch from '@/components/Seasonal/BlackFridaySearch'
import ReviewsSection from '@/components/MainPage/ReviewsSection'
import bgFriday from '@/assets/images/static/bg-friday.png'

export default function BlackFridayPage() {
    useEffect(() => {
        let canonicalLink = document.querySelector('link[rel="canonical"]')
        if (!canonicalLink) {
            canonicalLink = document.createElement('link')
            canonicalLink.rel = 'canonical'
            document.head.appendChild(canonicalLink)
        }
        canonicalLink.href = 'https://buybusinessclass.com/black-friday-busines-class-seat-sale'
    }, [])

    return (
        <div className="black-friday-page seasonal-sale-page mb-page">
            <div className="regions-friday">
                <RegionVue />
            </div>
            <div className="mb-seasonal-hero">
                <span className="mb-seasonal-badge">
                    <span className="dot" />
                    Limited-time offer
                </span>
                <h1 className="mb-serif">
                    Black Friday Business Class Seat Sale
                </h1>
                <p>Premium cabin fares from $999 — tell us your route and get a free quote before the sale ends.</p>
            </div>
            <div className="container-friday d-flex">
                <div className="left-image-friday">
                    <img
                        src={bgFriday}
                        alt="Black Friday business class seat sale — from $999"
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
