import { createElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import BlackWithOrangeTextButton from '@/components/common/Buttons/BlackWithOrangeTextButton'
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
    // Match Vue: `$route.fullPath === '/' ? '' : '/'`
    const isHome = `${location.pathname}${location.search}${location.hash}` === '/'

    return (
        <div className="about-container">
            <div className="title">
                <h3 className="main-title">
                    About BuyBusinessClass
                </h3>
            </div>
            <div className="content">
                {aboutUsIsLoaded && (
                    <img src={image} alt="About BuyBusinessClass" loading="lazy" decoding="async" />
                )}
                <div className="about-text xyz-in" xyz="fade down duration-10">
                    <div className="text-from-editor">{renderBlocks(aboutUs?.body)}</div>
                </div>
                <BlackWithOrangeTextButton
                    className="xyz-in"
                    xyz="fade down duration-10"
                    buttonText="Book your Flight Now"
                    link={isHome ? '' : '/'}
                    click={scrollToTop}
                />
            </div>
        </div>
    )
}
