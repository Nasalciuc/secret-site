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
        <div className="xmas-page seasonal-sale-page seasonal-sale-page--xmas">
            <div className="regions-friday">
                <RegionVue />
            </div>
            <div className="container-friday d-flex">
                <div className="left-image-friday">
                    <img
                        src={bgXmas}
                        alt="Christmas and New Year flight sale ΓÇö from $2,499"
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
