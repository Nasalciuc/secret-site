import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import aboutFallback from '@/assets/images/static/about-image.webp'

const renderBlocks = (body) => {
    if (!body) return null
    if (typeof body === 'string') {
        return body.split('\n').filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)
    }

    if (Array.isArray(body)) {
        return body.map((block, index) => {
            if (typeof block === 'string') return <p key={index}>{block}</p>
            if (block?.type === 'paragraph') {
                const text = Array.isArray(block.data?.text)
                    ? block.data.text.join(' ')
                    : block.data?.text || block.text || ''
                return text ? <p key={index}>{text}</p> : null
            }
            const text = block?.data?.text || block?.text
            return text ? <p key={index}>{text}</p> : null
        })
    }

    return null
}

export default function AboutSection() {
    const location = useLocation()
    const { aboutUs, aboutUsIsLoaded, getAboutUs } = useAppStore()

    useEffect(() => {
        if (!aboutUsIsLoaded) getAboutUs()
    }, [aboutUsIsLoaded, getAboutUs])

    const image = aboutUs?.image || aboutFallback
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
    const isHome = location.pathname === '/'

    return (
        <div className="about-container">
            <div className="title">
                <h3 className="main-title">
                    About<span className="accent"> BuyBusinessClass</span>
                </h3>
            </div>
            <div className="content">
                {aboutUsIsLoaded && (
                    <img src={image} alt="About BuyBusinessClass" loading="lazy" decoding="async" />
                )}
                <div className="about-text">{renderBlocks(aboutUs?.body)}</div>
                <div className="black-orange-button">
                    {isHome ? (
                        <button type="button" onClick={scrollToTop}>
                            Book your Flight Now
                        </button>
                    ) : (
                        <Link to="/">Book your Flight Now</Link>
                    )}
                </div>
            </div>
        </div>
    )
}
