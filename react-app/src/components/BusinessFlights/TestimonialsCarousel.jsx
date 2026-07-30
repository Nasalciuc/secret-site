import { useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import trustBg from '@/assets/images/static/trust-bg.png'
import TestimonialCard from './TestimonialCard'

const testimonials = [
    {
        name: 'Jacob M',
        location: 'US',
        date: 'October 18, 2024',
        text: 'Agent speaks fluent English. Understands customer needs. She is patient and empathetic with the customer. Over the years I have used other Airline Wholesalers and discounters...',
    },
    {
        name: 'Terri B',
        location: 'US',
        date: 'July 31, 2024',
        text: 'Gio was great! Very responsive. Gave us multiple flight and cabin preferences...made the process seamless!! And of course, can\'t beat the discounted fares!',
    },
    {
        name: 'Ling Bundgaard',
        location: 'DK',
        date: 'August 13, 2024',
        text: 'Buy business class Andrew Vale gave excellent service by providing me options and doing his homework. His follow up and attention to detail helped me finalize the flight quickly !',
    },
    {
        name: 'Naveen Kapoor',
        location: 'US',
        date: 'October 28, 2024',
        text: 'Emma the sales person was very diligent and patient. We had a multi city booking with strict guidelines. She understood and delivered.',
    },
    {
        name: 'Laila',
        location: 'US',
        date: 'October 27, 2024',
        text: 'Mason Hunter was very helpful and attentive to all my requests. Took a personal interest in getting me the best possible flight.',
    },
    {
        name: 'David Wayner',
        location: 'US',
        date: 'October 15, 2024',
        text: 'I just booked a trip, at a time that was quickly getting booked up for the holidays. Alice Dante, of "Buy Business Class", patiently pursued various schedules and airlines to get the optimal combination, as availability was disappearing.',
    },
    {
        name: 'Vinay Chandrra',
        location: 'US',
        date: 'October 4, 2024',
        text: 'I leveraged BuyBusinessClass for flights to India in December (Peak season). Worked with Veer and he is great to work with. He was able to get me great options at an unbelievable price. I will recommend this to anyone that would like to fly business class at an extremely affordable price point',
    },
]

export default function TestimonialsCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true })

    const prevSlide = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const nextSlide = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    useEffect(() => {
        if (!emblaApi) return undefined
        const autoplay = window.setInterval(() => emblaApi.scrollNext(), 3000)
        return () => window.clearInterval(autoplay)
    }, [emblaApi])

    return (
        <>
            <div className="airlines-carousel">
                <div className="carousel" ref={emblaRef}>
                    <div className="carousel-track">
                        {testimonials.map((testimonial) => (
                            <div className="carousel-slide" key={`${testimonial.name}-${testimonial.date}`}>
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        ))}
                    </div>
                </div>
                <button className="carousel-prev" type="button" onClick={prevSlide} aria-label="Previous testimonial">
                    ‹
                </button>
                <button className="carousel-next" type="button" onClick={nextSlide} aria-label="Next testimonial">
                    ›
                </button>
            </div>
            <div className="trust-bg">
                <img src={trustBg} alt="Trustpilot reviews" className="trust-image" loading="lazy" decoding="async" />
            </div>
        </>
    )
}
