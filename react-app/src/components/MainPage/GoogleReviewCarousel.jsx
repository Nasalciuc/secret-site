import { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

const originalReviews = [
    {
        name: 'Sally Gutierrez',
        details: '8 reviews · 1 photo',
        time: 'a week ago',
        text: 'BuyBusiness was very easy to work with and their prices were great. Also, Chris did an outstanding job assisting me with my travel plans.',
        avatar: 'https://i.pravatar.cc/60?img=48',
    },
    {
        name: 'Norm Nelson',
        details: '9 reviews · 1 photos',
        time: '2 weeks ago',
        text: 'Tyke once again did a great job for me. He was fast, responsive, courteous, professional and highly skilled. He found the best possible route for the best possible price.',
        avatar: 'https://i.pravatar.cc/60?img=12',
    },
    {
        name: 'Dee Setchel',
        details: '12 reviews',
        time: '2 months ago',
        text: 'I received 4 different itineraries and prices for flights to Europe within minutes of speaking to Dennis...great service! I was very pleased with the choices, and the one I selected seemed like a great deal (I had researched prices on my own online before getting these quotes.) Very pleased with Buy Business based on this experience.',
        avatar: 'https://i.pravatar.cc/60?img=14',
    },
    {
        name: 'Jersey Kate',
        details: '1 review',
        time: '3 weeks ago',
        text: 'Mahi offered several options for my plans and I purchased an itinerary that is definitely a value compared to other quotes. Also, he was patient with my multiple calls/requests. Good work!',
        avatar: 'https://i.pravatar.cc/60?img=13',
    },
    {
        name: 'Harry Steinke',
        details: '1 review',
        time: '3 month ago',
        text: 'It was a wonderful experience working with Sara. She quickly grasped our travel desires and was able to get us wonderful flights to and from Kenya at a very reasonable price.',
        avatar: 'https://i.pravatar.cc/60?img=23',
    },
    {
        name: 'Clinton Zimmer',
        details: '14 reviews',
        time: '2 month ago',
        text: 'The laborious task of sorting through numerous offers was unbelievable. One trip was approved only to find another replaced it but for less money per ticket. Adding a tip was very unusual. The trip experience will hopefully be pleasant.',
        avatar: 'https://i.pravatar.cc/60?img=28',
    },
]

function shuffle(array) {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}

export default function GoogleReviewCarousel() {
    const [reviews, setReviews] = useState(() => shuffle(originalReviews))
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        breakpoints: {
            '(min-width: 0px)': { slidesToScroll: 1 },
            '(min-width: 1024px)': { slidesToScroll: 1 },
        },
    })

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return undefined
        let currentIndex = 0
        const interval = window.setInterval(() => {
            emblaApi.scrollNext()
            currentIndex += 1

            if (currentIndex >= originalReviews.length) {
                currentIndex = 0
                setReviews(shuffle(originalReviews))
            }
        }, 7000)

        return () => window.clearInterval(interval)
    }, [emblaApi])

    const slides = useMemo(() => reviews, [reviews])

    return (
        <div className="carousel-wrapper">
            <button className="nav-button left" type="button" onClick={scrollPrev} aria-label="Previous">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div className="custom-carousel" ref={emblaRef}>
                <div className="custom-carousel__track">
                    {slides.map((review, index) => (
                        <div className="custom-carousel__slide" key={`${review.name}-${index}`}>
                            <div className="review-card">
                                <div className="review-header">
                                    <img src={review.avatar} alt="Avatar" className="avatar" loading="lazy" decoding="async" />
                                    <div className="user-info">
                                        <strong>{review.name}</strong>
                                        <div className="meta">{review.details}</div>
                                        <div className="rating">
                                            <span className="stars" aria-label="5 stars">*****</span>
                                            <span className="time">{review.time}</span>
                                            <span className="badge">NEW</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="review-text">"{review.text}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="nav-button right" type="button" onClick={scrollNext} aria-label="Next">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    )
}
