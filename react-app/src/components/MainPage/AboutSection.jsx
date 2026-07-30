import { createElement, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import aboutFallback from '@/assets/images/static/about-image.webp'

const renderBlocks = (blocks) => {
    if (!Array.isArray(blocks)) return null

    return blocks.map((item, index) => {
        if (!item?.type) return null

        if (item.type === 'header') {
            const level = Math.min(Math.max(Number(item.data?.level) || 2, 1), 6)
            return (
                <div className="content" key={`editor-${index}-about-us-body`}>
                    {createElement(`h${level}`, { className: 'header' }, item.data?.text ?? '')}
                </div>
            )
        }

        if (item.type === 'image') {
            return (
                <div className="content" key={`editor-${index}-about-us-body`}>
                    <img
                        src={item.data?.file?.url}
                        alt="image"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            )
        }

        if (item.type === 'paragraph') {
            return (
                <div className="content" key={`editor-${index}-about-us-body`}>
                    <p dangerouslySetInnerHTML={{ __html: item.data?.text ?? '' }} />
                </div>
            )
        }

        if (item.type === 'list') {
            return (
                <div className="content" key={`editor-${index}-about-us-body`}>
                    <ul>
                        {(item.data?.items ?? []).map((list, listIndex) => (
                            <li
                                key={`list-${listIndex}`}
                                dangerouslySetInnerHTML={{ __html: list }}
                            />
                        ))}
                    </ul>
                </div>
            )
        }

        return null
    })
}

export default function AboutSection() {
    const location = useLocation()
    const { aboutUs, aboutUsIsLoaded, getAboutUs } = useAppStore()

    useEffect(() => {
        if (!aboutUsIsLoaded) getAboutUs()
    }, [aboutUsIsLoaded, getAboutUs])

    const image = aboutUs?.image ?? aboutFallback
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
                <div className="about-text">
                    <div className="text-from-editor">{renderBlocks(aboutUs?.body)}</div>
                </div>
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
