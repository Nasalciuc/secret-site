import { useEffect, useRef, useState } from 'react'
import OrderFly from './OrderFly'

import mobilePoster from '@/assets/video/background-mobile-poster.jpg'
import desktopPoster from '@/assets/video/background-desktop-poster.jpg'
import mobileVideo from '@/assets/video/background-mobile.mp4'
import desktopVideo from '@/assets/video/background-desktop.mp4'

export default function HeaderContainer() {
    const [videoPoster, setVideoPoster] = useState(mobilePoster)
    const videoRef = useRef(null)

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

            const loadVideo = () => {
                if (video.getAttribute('src') !== source) {
                    video.src = source
                    video.load()
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
            <div className="blocks">
                <div className="first-block">
                    <h1>
                        <span className="weight-700">Cheap Business Class</span> Airline Tickets <br />
                        & <span className="weight-700">Flight Deals</span> — Save up to 60%
                    </h1>
                </div>
                <div className="second-block">
                    <OrderFly />
                </div>
            </div>
        </div>
    )
}
