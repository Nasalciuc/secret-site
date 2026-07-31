import { useEffect, useRef, useState } from 'react'
import OrderFly from './OrderFly'

const mobilePoster = '/hero-poster-mobile.jpg'
const desktopPoster = '/hero-poster-desktop.jpg'
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
            <div className="blocks">
                <div className="first-block xyz-in" xyz="fade left-50% duration-15 delay-5">
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
