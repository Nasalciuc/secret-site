import { useEffect, useState } from 'react'

export default function StickyContactButton() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768)
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div>
            <button className={`btn-container ${isDesktop ? 'is-desktop' : ''} ${isMobile ? 'is-mobile' : ''}`}>
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
