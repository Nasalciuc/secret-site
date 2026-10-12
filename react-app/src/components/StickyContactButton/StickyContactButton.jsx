import { useEffect, useState } from 'react'

export default function StickyContactButton() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [isHidden, setIsHidden] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768)
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Hide while scrolling down through mid-page content so the pill does not
    // cover deal cards / CTAs; reappear near the bottom or when scrolling up.
    // On mobile, also hide while the hero Search Flight CTA is on screen.
    useEffect(() => {
        let lastY = window.scrollY
        let ticking = false

        const heroBlocksSearch = () => {
            if (window.innerWidth >= 768) return false
            const search = Array.from(document.querySelectorAll('button')).find((b) =>
                /search flight/i.test(b.textContent || ''),
            )
            if (!search) return false
            const r = search.getBoundingClientRect()
            const viewH = window.innerHeight
            // Any overlap with the lower half of the viewport (FAB zone).
            return r.bottom > viewH - 140 && r.top < viewH
        }

        const update = () => {
            const y = window.scrollY
            const docH = document.documentElement.scrollHeight
            const viewH = window.innerHeight
            const nearBottom = y + viewH > docH - 240
            const nearTop = y < 80
            const scrollingDown = y > lastY + 8
            const scrollingUp = y < lastY - 8

            if (heroBlocksSearch()) {
                setIsHidden(true)
            } else if (nearTop || nearBottom || scrollingUp) {
                setIsHidden(false)
            } else if (scrollingDown && y > 280) {
                setIsHidden(true)
            }

            lastY = y
            ticking = false
        }

        const onScroll = () => {
            if (ticking) return
            ticking = true
            window.requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [])

    return (
        <a
            href="tel:+18883227999"
            className={`btn-container ${isDesktop ? 'is-desktop' : ''} ${isMobile ? 'is-mobile' : ''}${isHidden ? ' is-hidden' : ''}`}
            aria-hidden={isHidden}
            tabIndex={isHidden ? -1 : 0}
            aria-label="Call us at +1 (888) 322-7999"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="phone-icon" aria-hidden="true">
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
                />
            </svg>
            <span className="btn-label">Call us +1 (888) 322-7999</span>
        </a>
    )
}
