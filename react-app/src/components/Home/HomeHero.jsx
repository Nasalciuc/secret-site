import { useEffect, useRef, useState } from 'react'
import OrderFly from '@/components/HeaderForm/OrderFly/OrderFly'
import Barcode from '@/components/common/Barcode'
import useReducedMotion from '@/components/common/useReducedMotion'
import SvgContainer from '@/components/Header/SvgContainer'
import { PLANE_D } from '@/components/MainPage/planeShape'
import mobileVideo from '@/assets/video/background-mobile.mp4'
import desktopVideo from '@/assets/video/background-desktop.mp4'
import { useTrustpilot } from './homeShared'

// Betty's hero with the live site's soul: the promise on the left (the Trustpilot pill, the headline
// with the 60% in gold, one line, the accreditations) and the quote form on the right, as a boarding
// pass with its stub. Behind it the cabin: the poster shows at once (preloaded in index.html); the
// film fades in over it once the page is idle, never for visitors who ask for less motion.
const HERO_ROUTE = 'M4 128C70 126 132 76 214 44'
const DESKTOP = '(min-width: 768px)'

export default function HomeHero() {
    const { score } = useTrustpilot()
    const reduced = useReducedMotion()
    const videoRef = useRef(null)
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        const video = videoRef.current
        if (!video || reduced) return undefined
        let idle = 0
        let timer = 0
        const load = () => {
            const source = window.matchMedia(DESKTOP).matches ? desktopVideo : mobileVideo
            if (video.getAttribute('src') !== source) {
                video.src = source
                video.load()
            }
            video.play()?.catch(() => {})
        }
        const onPlaying = () => setPlaying(true)
        video.addEventListener('playing', onPlaying)
        if ('requestIdleCallback' in window) idle = window.requestIdleCallback(load, { timeout: 3000 })
        else timer = window.setTimeout(load, 1500)
        const mq = window.matchMedia(DESKTOP)
        const onChange = () => {
            setPlaying(false)
            load()
        }
        mq.addEventListener?.('change', onChange)
        return () => {
            if (idle) window.cancelIdleCallback?.(idle)
            window.clearTimeout(timer)
            video.removeEventListener('playing', onPlaying)
            mq.removeEventListener?.('change', onChange)
            video.pause()
        }
    }, [reduced])

    return (
        <section className="hp-hero" aria-labelledby="hp-hero-title">
            <div className="hp-hero__media" aria-hidden="true">
                <picture>
                    <source media="(max-width: 767px)" srcSet="/hero-poster-mobile.jpg" />
                    <img src="/hero-poster-desktop.jpg" alt="" width="1600" height="900" decoding="async" fetchpriority="high" />
                </picture>
                {!reduced && <video className={playing ? 'is-playing' : ''} ref={videoRef} muted loop playsInline preload="none" />}
            </div>
            <div className="hp-wrap hp-hero__grid">
                <div className="hp-hero__copy">
                    <p className="hp-hero__pill">
                        <span className="hp-hero__dot" aria-hidden="true" />
                        {score > 0 ? (
                            <span>
                                <span className="hp-hero__pill-long">Trusted by travelers worldwide • </span>
                                {score.toFixed(1)}/5 on Trustpilot
                            </span>
                        ) : (
                            <span>Trusted by travelers worldwide</span>
                        )}
                    </p>
                    <h1 className="hp-hero__title" id="hp-hero-title">
                        Save up to <span className="hp-gold">60%</span>
                        <br /> on Business Class flights
                    </h1>
                    <p className="hp-hero__lead">Cheap business class airline tickets and flight deals. Access exclusive unpublished fares.</p>
                    <SvgContainer className="hp-hero__trust" />
                </div>
                <div className="hp-hero__card mb-orderfly-card hp-pass" id="order-fly">
                    <div className="hp-pass__route" aria-hidden="true">
                        <svg className="hp-pass__route-line" viewBox="0 0 220 140" focusable="false">
                            <path d={HERO_ROUTE} />
                        </svg>
                        <svg className="hp-pass__route-plane" viewBox="-11 -10 22 20" style={{ offsetPath: `path('${HERO_ROUTE}')` }} focusable="false">
                            <path d={PLANE_D} />
                        </svg>
                    </div>
                    <div className="hp-pass__head" aria-hidden="true">
                        <span className="hp-pass__brand">
                            <svg viewBox="-11 -10 22 20" focusable="false">
                                <path d={PLANE_D} />
                            </svg>
                            Boarding pass
                        </span>
                        <span className="hp-pass__class">Business · First</span>
                    </div>
                    <h2 className="hp-hero__card-title">Find your perfect deal</h2>
                    <p className="hp-hero__card-sub">Get a personalized quote from a real consultant.</p>
                    <OrderFly />
                    <div className="hp-pass__stub">
                        <dl>
                            <div>
                                <dt>Fares</dt>
                                <dd>Unpublished</dd>
                            </div>
                            <div>
                                <dt>Quote</dt>
                                <dd>Free</dd>
                            </div>
                            <div>
                                <dt>Agent</dt>
                                <dd>Real person</dd>
                            </div>
                        </dl>
                        <Barcode className="hp-pass__barcode" seed="BBC business class quote" />
                    </div>
                </div>
            </div>
        </section>
    )
}
