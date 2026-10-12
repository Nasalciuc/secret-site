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
        <div>
            <button
                className={`btn-container ${isDesktop ? 'is-desktop' : ''} ${isMobile ? 'is-mobile' : ''}${isHidden ? ' is-hidden' : ''}`}
                type="button"
                aria-hidden={isHidden}
                tabIndex={isHidden ? -1 : 0}
            >
                <a href="tel:+18883227999">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="phone-icon" aria-hidden="true">
                        <path
                            fill="currentColor"
                            d="M6.62,10.79A15.561,15.561,0,0,0,13.21,17.38l1.74-1.74a1,1,0,0,1,.85-.27,11.759,11.759,0,0,0,3.71.61,1,1,0,0,1,1,1v3.52a1,1,0,0,1-1,1C11.28,22,2,12.72,2,4A1,1,0,0,1,3,3H6.52a1,1,0,0,1,1,1,11.762,11.762,0,0,0,.61,3.71,1,1,0,0,1-.27.85Z"
                        />
                    </svg>
                    Call Us: +1 (888) 322-7999
                </a>
            </button>
        </div>
    )
}
