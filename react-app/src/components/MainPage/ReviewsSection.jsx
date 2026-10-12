import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import TransparentButton from '@/components/common/Buttons/TransparentButton'
import { useReviewsStore } from '@/store/useReviewsStore'
import TrustpilotLogo from '@/components/common/TrustpilotLogo'
import { PLANE_D } from './planeShape'
import { TRUSTPILOT_URL, FALLBACK_REVIEWS, pickReviews, formatAuthorName, reviewHref, scoreWord } from './reviewHelpers'
import Barcode from '@/components/common/Barcode'
import useReducedMotion from '@/components/common/useReducedMotion'

// Tablets and phones swipe the passes. The dots under them are the places the row can stop at (a
// pass at the start, or the end of the row): one shows where the row is, any brings the row there.
function usePassRow(count) {
    const rowRef = useRef(null)
    const [row, setRow] = useState({ stops: [], at: 0 })
    const reduced = useReducedMotion()

    useEffect(() => {
        const el = rowRef.current
        if (!el) return undefined
        let frame = 0
        const measure = () => {
            frame = 0
            const swipes = getComputedStyle(el).overflowX !== 'visible'
            const max = swipes ? el.scrollWidth - el.clientWidth : 0
            const start = el.getBoundingClientRect().left + (parseFloat(getComputedStyle(el).paddingLeft) || 0)
            const stops = []
            for (const pass of el.children) {
                const stop = Math.min(max, Math.max(0, Math.round(el.scrollLeft + pass.getBoundingClientRect().left - start)))
                if (!stops.length || stop - stops[stops.length - 1] > 4) stops.push(stop)
            }
            const at = stops.reduce((best, stop, index) => (Math.abs(stop - el.scrollLeft) < Math.abs(stops[best] - el.scrollLeft) ? index : best), 0)
            setRow((prev) => (prev.at === at && prev.stops.join() === stops.join() ? prev : { stops, at }))
        }
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(measure)
        }
        measure()
        el.addEventListener('scroll', schedule, { passive: true })
        const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : null
        observer?.observe(el)
        return () => {
            el.removeEventListener('scroll', schedule)
            observer?.disconnect()
            cancelAnimationFrame(frame)
        }
    }, [count])

    const show = (index) => {
        const stop = row.stops[index]
        if (stop !== undefined) rowRef.current?.scrollTo({ left: stop, behavior: reduced ? 'auto' : 'smooth' })
    }

    return { rowRef, stops: row.stops, at: row.at, show }
}

function initialsOf(name) {
    const letters = name
        .split(/\s+/)
        .map((word) => word.replace(/[^\p{L}]/gu, '').charAt(0))
        .filter(Boolean)
    return (letters.length > 1 ? letters[0] + letters[letters.length - 1] : letters[0] || 'G').toUpperCase()
}

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

// Five stars filled to the score (4.8 fills four and most of the fifth).
function ScoreStars({ value }) {
    const row = (
        <span className="mb-stars__row">
            {Array.from({ length: 5 }, (_, index) => (
                <StarIcon key={index} filled />
            ))}
        </span>
    )
    return (
        <span className="mb-stars" aria-hidden="true">
            {row}
            <span className="mb-stars__fill" style={{ width: `${Math.max(0, Math.min(5, value)) * 20}%` }}>
                {row}
            </span>
        </span>
    )
}

// Each review is a boarding pass: stars and a plane on top, the quote, a perforated tear line,
// and the stub with the passenger.
function ReviewTicket({ review }) {
    const starsCount = Math.min(5, Math.max(0, Math.round(Number(review.stars) || 0)))
    const quote = review.body || review.title
    const name = formatAuthorName(review.author_name)

    return (
        <article className="mb-ticket">
            <div className="mb-ticket__main">
                <div className="mb-ticket__top">
                    {starsCount > 0 ? (
                        <div className="mb-review-stars" role="img" aria-label={`${starsCount} out of 5 stars`}>
                            {Array.from({ length: 5 }, (_, index) => (
                                <StarIcon key={index} filled={index < starsCount} />
                            ))}
                        </div>
                    ) : (
                        <span />
                    )}
                    <svg className="mb-ticket__plane" viewBox="-12 -12 24 24" aria-hidden="true" focusable="false">
                        <path d={PLANE_D} transform="rotate(-30) scale(0.95)" />
                    </svg>
                </div>
                <span className="mb-ticket__mark" aria-hidden="true">
                    &ldquo;
                </span>
                {quote && <blockquote className="mb-ticket__quote">{quote}</blockquote>}
            </div>
            <div className="mb-ticket__stub">
                <span className="mb-ticket__avatar" aria-hidden="true">
                    {initialsOf(name)}
                </span>
                <span className="mb-ticket__field">
                    <span className="mb-ticket__label">Passenger</span>
                    <span className="mb-ticket__value">{name}</span>
                </span>
                <span className="mb-ticket__field mb-ticket__field--source">
                    <span className="mb-ticket__label">Review on</span>
                    {/* the link covers the whole pass (::after), so a click anywhere opens the review */}
                    <a
                        className="mb-ticket__value mb-ticket__link"
                        href={reviewHref(review)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read ${name}'s review on Trustpilot (opens in a new tab)`}
                    >
                        Trustpilot
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </span>
                <Barcode className="mb-ticket__barcode" seed={name + (quote || '')} />
            </div>
        </article>
    )
}

export default function ReviewsSection() {
    const sectionRef = useRef(null)
    const reviews = useReviewsStore((state) => state.reviews)
    const reviewsIsLoaded = useReviewsStore((state) => state.reviewsIsLoaded)
    const getReviews = useReviewsStore((state) => state.getReviews)
    const rawScore = useReviewsStore((state) => state.score)
    const reviewCount = useReviewsStore((state) => state.reviewCount)

    // Moodboard scope detection, mirroring BestSelling: initialize to false so
    // legacy pages render the legacy Trustpilot block on first paint.
    const [mbScope, setMbScope] = useState(false)

    useLayoutEffect(() => {
        setMbScope(Boolean(sectionRef.current?.closest('.mb-home, .mb-page')))
    }, [])

    useEffect(() => {
        // The Trustpilot widget script is only needed by the legacy block, so
        // poll for it only when that block is rendered (outside mb scope).
        if (mbScope) return undefined

        const el = document.querySelector('.reviews-container .trustpilot-widget')
        if (!el) return undefined

        if (loadTrustpilotWidget(el)) return undefined

        const id = window.setInterval(() => {
            if (loadTrustpilotWidget(el)) window.clearInterval(id)
        }, 100)

        return () => window.clearInterval(id)
    }, [mbScope])

    useEffect(() => {
        // Fetch real Trustpilot reviews only for the moodboard homepage variant,
        // so legacy pages reusing this component keep their old network behavior.
        if (!mbScope) return
        getReviews()
    }, [mbScope, getReviews])

    const topReviews = pickReviews(reviews.length > 0 ? reviews : reviewsIsLoaded ? FALLBACK_REVIEWS : [])
    const { rowRef, stops, at, show } = usePassRow(topReviews.length)
    // before the row is measured, one dot a pass (the dots show from the first paint where the row
    // swipes, so nothing jumps); after, one dot a stop, none when the row turns out to fit
    const dots = stops.length || topReviews.length
    const showSkeletons = !reviewsIsLoaded && reviews.length === 0
    // One decimal, never rounded up: 4.79 reads 4.7, as Trustpilot shows it.
    const score = Math.floor((Number(rawScore) || 0) * 10) / 10
    const count = Number(reviewCount) || 0

    return (
        <>
            {/* Legacy Trustpilot block: still rendered by Flight/Dynamic/seasonal/AboutUs
                pages. Not mounted at all inside the moodboard scope. */}
            {!mbScope && (
                <div className="reviews-container">
                    <div className="reviews-tittle">
                        <div className="title">
                            <h3 className="main-title">
                                99% of Travelers Recommend{' '}
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
            )}

            {/* Moodboard variant: white band, the live Trustpilot score and the latest reviews
                as boarding passes. Only visible inside .mb-home / .mb-page (mb-home-soul.scss). */}
            <section className="mb-reviews" id="reviews" ref={sectionRef}>
                <div className="mb-section mb-reviews-inner">
                    <div className="mb-reviews-head">
                        <div className="mb-reviews-heading">
                            <h2 className="mb-reviews-title">Travelers love flying with us</h2>
                            <p className="mb-reviews-sub">What travelers say about us on Trustpilot.</p>
                        </div>
                        {score > 0 && (
                            <a
                                className="mb-reviews-score"
                                href={TRUSTPILOT_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Rated ${score} out of 5 on Trustpilot${count > 0 ? `, ${count.toLocaleString('en-US')} reviews` : ''}`}
                            >
                                <span className="mb-reviews-score__value">{score.toFixed(1)}</span>
                                <span className="mb-reviews-score__meta">
                                    <ScoreStars value={score} />
                                    <span className="mb-reviews-score__text">
                                        {scoreWord(score) && <strong>{scoreWord(score)}</strong>}
                                        {scoreWord(score) && count > 0 && ' · '}
                                        {count > 0 && `${count.toLocaleString('en-US')} reviews`}
                                    </span>
                                    <span className="mb-reviews-score__brand">
                                        <TrustpilotLogo className="mb-reviews-score__logo" aria-hidden="true" focusable="false" />
                                        <svg className="mb-reviews-score__go" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                                            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </span>
                            </a>
                        )}
                    </div>
                    {topReviews.length > 0 && (
                        <div className="mb-reviews-grid" ref={rowRef}>
                            {topReviews.map((review, index) => (
                                <ReviewTicket key={`${review.author_name || 'review'}-${index}`} review={review} />
                            ))}
                        </div>
                    )}
                    {topReviews.length > 1 && (
                        <div className="mb-reviews-dots" hidden={dots < 2}>
                            {Array.from({ length: dots }, (_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className="mb-reviews-dot"
                                    aria-label={`Show reviews, slide ${index + 1} of ${dots}`}
                                    aria-current={index === at ? 'true' : undefined}
                                    onClick={() => show(index)}
                                />
                            ))}
                        </div>
                    )}
                    {showSkeletons && (
                        <div className="mb-reviews-grid" aria-hidden="true">
                            {Array.from({ length: 3 }, (_, index) => (
                                <div key={index} className="mb-ticket mb-review-skeleton">
                                    <span className="line short" />
                                    <span className="line" />
                                    <span className="line" />
                                    <span className="line medium" />
                                </div>
                            ))}
                        </div>
                    )}
                    <a className="mb-reviews-link" href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer">
                        {count > 0 ? `Read all ${count.toLocaleString('en-US')} reviews on Trustpilot` : 'See all reviews on Trustpilot'}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </section>
        </>
    )
}
