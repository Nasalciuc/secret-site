import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HeaderContainer from '@/components/Flight/HeaderContainer'
import AirlinesLogos from '@/components/Footer/AirlinesLogos'
import WorksContainer from '@/components/MainPage/WorksContainer'
import FlightCards from '@/components/Flight/FlightCards'
import ReviewsSection from '@/components/MainPage/ReviewsSection'
import DescriptionVue from '@/components/Flight/DescriptionVue'
import ContactSection from '@/components/MainPage/ContactSection'

export default function FlightPage() {
    const params = useParams()
    const [text, setText] = useState(null)
    const [destination, setDestination] = useState([])

    const handleAbout = useCallback((value) => setText(value), [])
    const handleCards = useCallback((value) => setDestination(value), [])

    useEffect(() => {
        setText(null)
        setDestination([])
    }, [params.id])

    useEffect(() => {
        let canonicalUrl = null

        if (params.region) {
            canonicalUrl = `https://buybusinessclass.com/flight/region/${params.region}/${params.id}`
        } else if (params.country) {
            canonicalUrl = `https://buybusinessclass.com/flight/country/${params.country}/${params.id}`
        } else if (params.city) {
            canonicalUrl = `https://buybusinessclass.com/flight/city/${params.city}/${params.id}`
        }

        if (!canonicalUrl) return

        let canonicalLink = document.querySelector('link[rel="canonical"]')
        if (!canonicalLink) {
            canonicalLink = document.createElement('link')
            canonicalLink.rel = 'canonical'
            document.head.appendChild(canonicalLink)
        }
        canonicalLink.href = canonicalUrl
    }, [params.city, params.country, params.id, params.region])

    return (
        <div className="flight-page mb-page">
            <div className="header-content">
                <HeaderContainer destination={destination} onAbout={handleAbout} onCards={handleCards} />
            </div>
            <AirlinesLogos />
            <WorksContainer />
            {!params.city && <FlightCards arr={destination} />}
            <ReviewsSection />
            <DescriptionVue text={text} />
            <ContactSection />
        </div>
    )
}
