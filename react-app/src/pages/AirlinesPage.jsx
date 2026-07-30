import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { airlines, resolveAirlineImage } from '@/data/airlines'

function AirlineCard({ airline }) {
    const navigate = useNavigate()

    const goToAirline = () => {
        if (airline.slug) navigate(`/airlines/${airline.slug}`)
    }

    return (
        <button type="button" className="airline-card" onClick={goToAirline}>
            <img
                src={resolveAirlineImage(airline.image)}
                alt={airline.name}
                className="airline-image"
                loading="lazy"
                decoding="async"
            />
            <span className="airline-name">{airline.name}</span>
        </button>
    )
}

export default function AirlinesPage() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: true,
        slidesToScroll: 1,
    })

    const prevSlide = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const nextSlide = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return undefined

        const autoplay = window.setInterval(() => {
            emblaApi.scrollNext()
        }, 3000)

        return () => window.clearInterval(autoplay)
    }, [emblaApi])

    return (
        <>
            <div className="title-section">
                <h1 className="title">Premium Airlines Selected by BuyBusinessClass</h1>
                <p className="second-title">Scroll to Explore Our Top Airlines</p>
            </div>
            <div className="airlines-carousel">
                <div className="carousel" ref={emblaRef}>
                    <div className="carousel-track">
                        {airlines.map((airline) => (
                            <div className="carousel-slide" key={airline.slug}>
                                <AirlineCard airline={airline} />
                            </div>
                        ))}
                    </div>
                </div>
                <button type="button" className="carousel-prev" aria-label="Previous airline" onClick={prevSlide}>
                    ‹
                </button>
                <button type="button" className="carousel-next" aria-label="Next airline" onClick={nextSlide}>
                    ›
                </button>
            </div>
        </>
    )
}
