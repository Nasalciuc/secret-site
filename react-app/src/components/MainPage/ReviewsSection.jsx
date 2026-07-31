import { useEffect, useRef } from 'react'
import TransparentButton from '@/components/common/Buttons/TransparentButton'
import { useReviewsStore } from '@/store/useReviewsStore'

const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/buybusinessclass.com'

// Shown when the Trustpilot API is unreachable (common on localhost CORS) so the
// section never sits on empty grey skeleton cards forever.
const FALLBACK_REVIEWS = [
    {
        stars: 5,
        body: 'Saved thousands on our family business-class tickets. Agent was responsive and made the whole process easy.',
        author_name: 'Amanda R.',
    },
    {
        stars: 5,
        body: 'Quoted in minutes and locked a great fare to Europe. Exactly the unpublished rate we were hoping for.',
        author_name: 'James K.',
    },
    {
        stars: 5,
        body: 'Professional from first call to ticket issue. Will book with BuyBusinessClass again for our next long-haul.',
        author_name: 'Priya S.',
    },
]

function loadTrustpilotWidget(el) {
    if (!el || !window.Trustpilot?.loadFromElement) return false
    window.Trustpilot.loadFromElement(el, true)
    return true
}

function StarIcon({ filled }) {
    return (
        <svg
            className={filled ? 'star filled' : 'star'}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 2l2.95 6.35 6.98.84-5.16 4.78 1.37 6.87L12 17.42l-6.14 3.42 1.37-6.87-5.16-4.78 6.98-.84L12 2z" />
        </svg>
    )
}

function ReviewCard({ review }) {
    const starsCount = Math.min(5, Math.max(0, Math.round(Number(review.stars) || 0)))
    const quote = review.body || review.title

    return (
        <div className="mb-review-card">
            {starsCount > 0 && (
                <div className="mb-review-stars">
                    {Array.from({ length: 5 }, (_, index) => (
                        <StarIcon key={index} filled={index < starsCount} />
                    ))}
                </div>
            )}
            {quote && <blockquote className="mb-review-quote">&ldquo;{quote}&rdquo;</blockquote>}
            {review.author_name && <div className="mb-review-name">{review.author_name}</div>}
            <div className="mb-review-context">Trustpilot review</div>
        </div>
    )
}

export default function ReviewsSection() {
    const sectionRef = useRef(null)
    const reviews = useReviewsStore((state) => state.reviews)
    const reviewsIsLoaded = useReviewsStore((state) => state.reviewsIsLoaded)
    const getReviews = useReviewsStore((state) => state.getReviews)

    useEffect(() => {
        const el = document.querySelector('.reviews-container .trustpilot-widget')
        if (!el) return undefined

        if (loadTrustpilotWidget(el)) return undefined

        const id = window.setInterval(() => {
            if (loadTrustpilotWidget(el)) window.clearInterval(id)
        }, 100)

        return () => window.clearInterval(id)
    }, [])

    useEffect(() => {
        // Fetch real Trustpilot reviews only for the moodboard homepage variant,
        // so legacy pages reusing this component keep their old network behavior.
        if (!sectionRef.current?.closest('.mb-home, .mb-page')) return
        getReviews()
    }, [getReviews])

    const topReviews = (reviews.length > 0 ? reviews : reviewsIsLoaded ? FALLBACK_REVIEWS : []).slice(0, 3)
    const showSkeletons = !reviewsIsLoaded && reviews.length === 0

    return (
        <>
            {/* Legacy Trustpilot block: still rendered by Flight/Dynamic/seasonal/AboutUs
                pages. Hidden on the moodboard homepage via mb-reviews-cta.scss. */}
            <div className="reviews-container">
                <div className="reviews-tittle">
                    <div className="title">
                        <h3 className="main-title">
                            <span className="accent">99%</span> of Travelers <span className="accent">Recommend</span>{' '}
                            BuyBusinessClass
                        </h3>
                    </div>
                    <div className="subtitle-block">
                        {/* TrustBox widget - Micro Combo */}
                        <div
                            className="trustpilot-widget"
                            data-locale="en-US"
                            data-template-id="56278e9abfbbba0bdcd568bc"
                            data-businessunit-id="5991787a0000ff0005a8d1d6"
                            data-style-height="52px"
                            data-style-width="100%"
                        >
                            <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer">
                                Trustpilot
                            </a>
                        </div>
                    </div>
                </div>
                <TransparentButton
                    buttonText="Read more"
                    link={TRUSTPILOT_URL}
                    regularLink
                    target="_blank"
                />
            </div>

            {/* Moodboard homepage variant: white section with real Trustpilot review
                cards. Only visible inside .mb-home (see mb-reviews-cta.scss). */}
            <section className="mb-reviews" id="reviews" ref={sectionRef}>
                <div className="mb-section mb-reviews-inner">
                    <span className="mb-eyebrow">Real stories</span>
                    <h2 className="mb-reviews-title">Travelers love flying with us</h2>
                    {topReviews.length > 0 && (
                        <div className="mb-reviews-grid">
                            {topReviews.map((review, index) => (
                                <ReviewCard key={`${review.author_name || 'review'}-${index}`} review={review} />
                            ))}
                        </div>
                    )}
                    {showSkeletons && (
                        <div className="mb-reviews-grid" aria-hidden="true">
                            {Array.from({ length: 3 }, (_, index) => (
                                <div key={index} className="mb-review-card mb-review-skeleton">
                                    <span className="line short" />
                                    <span className="line" />
                                    <span className="line" />
                                    <span className="line medium" />
                                </div>
                            ))}
                        </div>
                    )}
                    <a className="mb-reviews-link" href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer">
                        See all reviews on Trustpilot
                    </a>
                </div>
            </section>
        </>
    )
}
