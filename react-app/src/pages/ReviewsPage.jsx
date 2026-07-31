import { useEffect, useState } from 'react'
import AirlinesLogos from '@/components/Footer/AirlinesLogos'
import WorksContainer from '@/components/MainPage/WorksContainer'
import ContactSection from '@/components/MainPage/ContactSection'
import OrangeFilledButton from '@/components/common/Buttons/OrangeFilledButton'
import TransparentButton from '@/components/common/Buttons/TransparentButton'
import { useReviewsStore } from '@/store/useReviewsStore'
import { withBrandTitle } from '@/utils/brandTitle'

function StarIcon() {
    return (
        <div className="star-container">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 2l2.95 6.35 6.98.84-5.16 4.78 1.37 6.87L12 17.42l-6.14 3.42 1.37-6.87-5.16-4.78 6.98-.84L12 2z" />
            </svg>
        </div>
    )
}

function ReviewsTitle() {
    useEffect(() => {
        window.Trustpilot?.loadFromElement?.(document.querySelector('.reviews-tittle .trustpilot-widget'), true)
    }, [])

    return (
        <div className="reviews-tittle">
            <div className="title">
                <h3 className="main-title">
                    <span className="accent">99%</span> of Travelers <span className="accent">Recommend</span> BuyBusinessClass
                </h3>
            </div>
            <div className="subtitle-block">
                <div
                    className="trustpilot-widget"
                    data-locale="en-US"
                    data-template-id="56278e9abfbbba0bdcd568bc"
                    data-businessunit-id="5991787a0000ff0005a8d1d6"
                    data-style-height="52px"
                    data-style-width="100%"
                >
                    <a href="https://www.trustpilot.com/review/buybusinessclass.com" target="_blank" rel="noopener noreferrer">
                        Trustpilot
                    </a>
                </div>
            </div>
        </div>
    )
}

function ReviewsHeaderContainer() {
    return (
        <div className="content reviews-header-container">
            <div className="blocks reviews-header-content">
                <ReviewsTitle />
                <OrangeFilledButton buttonText="Book a Flight" link="/" />
            </div>
        </div>
    )
}

function ReviewCard({ name = '', topic = '', comment = '', stars = 0 }) {
    const initials = name
        .split(' ')
        .slice(0, 2)
        .reduce((prev, cur) => prev + (cur[0] || ''), '')
    const starsCount = Math.max(0, Number(stars) || 0)

    return (
        <div className="review-card-container">
            <div className="review-card-header">
                <div className="avatar">{initials}</div>
                <div className="info-container">
                    <p>{name}</p>
                    <div className="stars">
                        {Array.from({ length: starsCount }, (_, index) => (
                            <StarIcon key={`review-${name}-${index}`} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="review-card-body">
                <p className="topic">{topic}</p>
                <p className="comment">{comment}</p>
            </div>
        </div>
    )
}

function ReviewsContainer() {
    const [limit, setLimit] = useState(5)
    const reviews = useReviewsStore((state) => state.reviews)
    const getReviews = useReviewsStore((state) => state.getReviews)

    useEffect(() => {
        if (!reviews.length) getReviews()
    }, [getReviews, reviews.length])

    return (
        <div className="reviews-cards-container">
            <div className="reviews-content">
                {reviews.slice(0, limit).map((item, index) => (
                    <ReviewCard
                        key={`${item.author_name || 'review'}-${index}`}
                        name={item.author_name}
                        topic={item.title}
                        comment={item.body}
                        stars={item.stars}
                    />
                ))}
            </div>
            {limit < reviews.length && <TransparentButton buttonText="Load More" click={() => setLimit((current) => current + 5)} />}
        </div>
    )
}

export default function ReviewsPage() {
    useEffect(() => {
        document.title = withBrandTitle('Reviews')
    }, [])

    return (
        <div className="mb-page mb-reviews-page">
            <div className="header-content">
                <ReviewsHeaderContainer />
            </div>
            <AirlinesLogos />
            <ReviewsContainer />
            <WorksContainer />
            <ContactSection />
        </div>
    )
}
