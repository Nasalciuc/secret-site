import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { useReviewsStore } from '@/store/useReviewsStore'

// Shared by the homepage sections (the layout of Betty's homepage, see pages/MainPage.jsx).

const FALLBACK_PHONE = '+1 (888) 322-7999'

// Every "get a quote" on the page brings the quote form (the card in the hero) into view.
export function scrollToQuote() {
    const form = document.getElementById('order-fly')
    if (form) form.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
}

// The phone number from the site settings, as a label and as a tel: link.
export function usePhone() {
    const number = useAppStore((state) => state.settings?.number)
    const label = number || FALLBACK_PHONE
    return { label, href: `tel:${label.replace(/[^\d+]/g, '')}` }
}

// The live Trustpilot figures. The score keeps one decimal and is never rounded up (4.79 reads
// 4.7, as Trustpilot shows it).
export function useTrustpilot() {
    const rawScore = useReviewsStore((state) => state.score)
    const rawCount = useReviewsStore((state) => state.reviewCount)
    const loaded = useReviewsStore((state) => state.reviewsIsLoaded)
    const getReviews = useReviewsStore((state) => state.getReviews)

    useEffect(() => {
        if (!loaded) getReviews()
    }, [loaded, getReviews])

    return {
        score: Math.floor((Number(rawScore) || 0) * 10) / 10,
        count: Number(rawCount) || 0,
        loaded,
    }
}

export function ArrowIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
