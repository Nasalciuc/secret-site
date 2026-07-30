import { useEffect } from 'react'
import RegionVue from '@/components/Flight/RegionVue'
import SecondBlock from '@/components/HeaderForm/FlightCard/SecondBlock'
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
        <div className="black-friday-page seasonal-sale-page">
            <div className="regions-friday">
                <RegionVue />
            </div>
            <div className="container-friday d-flex">
                <div className="left-image-friday">
                    <img
                        src={bgFriday}
                        alt="Black Friday business class seat sale"
                        className="img-fluid h-100 w-100"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="right-component">
                    <SecondBlock />
                </div>
            </div>
            <div className="review-friday">
                <ReviewsSection />
            </div>
        </div>
    )
}
