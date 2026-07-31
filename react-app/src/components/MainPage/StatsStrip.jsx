import { useEffect } from 'react'
import { useReviewsStore } from '@/store/useReviewsStore'

// Moodboard stats strip: 4 rounded tiles. Only real claims are shown:
// - Trustpilot score + review count come live from the Trustpilot API (useReviewsStore)
// - 'Up to 60% off published fares' (existing site-wide claim, see Footer / SeoContent)
// - '24/7 live support' (existing header claim, see Header.jsx '24/7 LIVE SERVICE')
export default function StatsStrip() {
    const { score, reviewCount, reviewsIsLoaded, getReviews } = useReviewsStore()

    useEffect(() => {
        if (!reviewsIsLoaded) getReviews()
    }, [reviewsIsLoaded, getReviews])

    // While loading show a dash; if the Trustpilot fetch failed (loaded but empty),
    // hide those tiles instead of showing fake zeros.
    const showTrustpilot = !reviewsIsLoaded || score > 0 || reviewCount > 0
    const scoreValue = score > 0 ? `${score}/5` : '—'
    const countValue = reviewCount > 0 ? `${Number(reviewCount).toLocaleString('en-US')}+` : '—'

    return (
        <div className="mb-stats-strip">
            {showTrustpilot ? (
                <>
                    <div className="mb-stat-tile">
                        <div className="mb-stat-tile__value">{scoreValue}</div>
                        <div className="mb-stat-tile__label">Trustpilot rating</div>
                    </div>
                    <div className="mb-stat-tile">
                        <div className="mb-stat-tile__value">{countValue}</div>
                        <div className="mb-stat-tile__label">Trustpilot reviews</div>
                    </div>
                </>
            ) : null}
            <div className="mb-stat-tile">
                <div className="mb-stat-tile__value">Up to 60%</div>
                <div className="mb-stat-tile__label">Off published fares</div>
            </div>
            <div className="mb-stat-tile">
                <div className="mb-stat-tile__value">24/7</div>
                <div className="mb-stat-tile__label">Live support</div>
            </div>
        </div>
    )
}
