import { useEffect, useRef, useState } from 'react'
import OrderFly from './OrderFly'
import { useReviewsStore } from '@/store/useReviewsStore'

const mobilePoster = '/hero-poster-mobile.jpg'
const desktopPoster = '/hero-poster-desktop.jpg'
import mobileVideo from '@/assets/video/background-mobile.mp4'
import desktopVideo from '@/assets/video/background-desktop.mp4'

export default function HeaderContainer() {
    const [videoPoster, setVideoPoster] = useState(mobilePoster)
    const videoRef = useRef(null)
    const score = useReviewsStore((state) => state.score)
    const reviewsIsLoaded = useReviewsStore((state) => state.reviewsIsLoaded)
    const getReviews = useReviewsStore((state) => state.getReviews)

    useEffect(() => {
        if (!reviewsIsLoaded) getReviews()
    }, [reviewsIsLoaded, getReviews])

    useEffect(() => {
        const updateVideoBackgroundSource = () => {
            const isDesktop = window.matchMedia('(min-width: 768px)').matches
            const poster = isDesktop ? desktopPoster : mobilePoster
            const source = isDesktop ? desktopVideo : mobileVideo

            const video = videoRef.current
            if (!video) return

            if (video.poster !== poster) {
                video.poster = poster
                setVideoPoster(poster)
            }

            const playVideo = () => {
                const playPromise = video.play()
                if (playPromise?.catch) {
                    playPromise.catch(() => {})
                }
            }

            const loadVideo = () => {
                if (video.getAttribute('src') !== source) {
                    video.src = source
                    video.load()
                }
                if (video.readyState >= 2) {
                    playVideo()
                } else {
                    video.addEventListener('loadeddata', playVideo, { once: true })
                }
            }
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(loadVideo, { timeout: 3000 })
            } else {
                setTimeout(loadVideo, 1500)
            }
        }

        updateVideoBackgroundSource()
        window.addEventListener('resize', updateVideoBackgroundSource)
        return () => window.removeEventListener('resize', updateVideoBackgroundSource)
    }, [])

    return (
        <div className="content main-page-header" id="order-fly">
            <div className="video-wrapper">
                <video
                    loop
                    muted
                    playsInline
                    autoPlay
                    preload="none"
                    poster={videoPoster}
                    ref={videoRef}
                />
            </div>
            <div className="mb-hero-overlay" />
            <div className="blocks">
                <div className="first-block xyz-in" xyz="fade left-50% duration-15 delay-5">
                    {score > 0 && (
                        <div className="mb-hero-badge">
                            <span className="dot" />
                            <span>Trusted by travelers worldwide • {score}/5 on Trustpilot</span>
                        </div>
                    )}
                    <h1 className="mb-serif">
                        Save up to <span className="accent">60%</span> on Business Class flights
                    </h1>
                    <p className="mb-hero-subtitle">Cheap business class airline tickets and flight deals. Access exclusive unpublished fares.</p>
                </div>
                <div className="second-block">
                    <h3 className="mb-hero-card-title">Find your perfect deal</h3>
                    <p className="mb-hero-card-sub">Get a personalized quote from a real consultant.</p>
                    <OrderFly />
                </div>
            </div>
        </div>
    )
}
