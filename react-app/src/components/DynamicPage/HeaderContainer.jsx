import { useEffect, useRef, useState } from 'react'
import SecondBlock from '@/components/HeaderForm/FlightCard/SecondBlock'
const mobilePoster = '/hero-poster-mobile.jpg'
const desktopPoster = '/hero-poster-desktop.jpg'
import mobileVideo from '@/assets/video/background-mobile.mp4'
import desktopVideo from '@/assets/video/background-desktop.mp4'

export default function HeaderContainer({ title = 'Business Class Flight Deals' }) {
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

            if (video.getAttribute('src') !== source) {
                video.src = source
                video.load()
            }
        }

        updateVideoBackgroundSource()
        window.addEventListener('resize', updateVideoBackgroundSource)
        return () => window.removeEventListener('resize', updateVideoBackgroundSource)
    }, [])

    return (
        <div className="content main-page-header" id="order-fly">
            <div className="video-wrapper">
                <video loop muted playsInline autoPlay preload="metadata" poster={videoPoster} ref={videoRef} />
            </div>
            <div className="blocks">
                <div className="first-block xyz-in" xyz="fade left-50% duration-15 delay-5">
                    <p>{title}</p>
                </div>
                <div className="second-block">
                    <SecondBlock />
                </div>
            </div>
        </div>
    )
}
