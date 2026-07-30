import { useEffect, useRef, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'

export default function QuoteLoader() {
    const { quoteLoading, appWidth } = useAppStore()
    const [percent, setPercent] = useState(0)
    const loaderRef = useRef(null)

    const scale = appWidth / 1496

    useEffect(() => {
        if (!quoteLoading.loading) {
            setPercent(0)
            return
        }

        const interval = setInterval(() => {
            setPercent((prev) => {
                if (prev < 60) return prev + Math.round(Math.random() * 5)
                if (prev > 89) return 99
                return prev + 10
            })
        }, quoteLoading.loading && percent < 60 ? 75 : 1000)

        return () => clearInterval(interval)
    }, [quoteLoading.loading, percent])

    useEffect(() => {
        if (quoteLoading.loading && loaderRef.current) {
            loaderRef.current.animate(
                [
                    { transform: 'scale(0)' },
                    { transform: `scale(${scale})` },
                ],
                { duration: 250 }
            )
        }
    }, [quoteLoading.loading, scale])

    if (!quoteLoading.loading) return null

    return (
        <div className="loader-quote">
            <div
                className="content"
                ref={loaderRef}
                style={{ transform: `scale(${scale})` }}
            >
                <div className="from">{quoteLoading.from}</div>
                <div className="globe">
                    <div className="map" />
                    <svg width="320" height="321" viewBox="0 0 320 321" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22.8398 171.717C28.2661 243.052 87.8669 299.245 160.592 299.245C206.898 299.245 247.884 276.463 272.951 241.497C247.662 273.777 208.32 294.521 164.134 294.521C93.0218 294.521 34.4585 240.793 26.8221 171.717H22.8398Z"
                            fill="url(#paint0_linear_938_21987)"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M26.8517 123.978C26.9476 124.199 26.9992 124.438 27.0077 124.679L27.5656 140.45C27.5896 141.128 27.955 141.747 28.5365 142.095L48.3213 153.948C48.9028 154.296 49.2682 154.916 49.2922 155.593L49.3459 157.108C49.3942 158.473 48.0912 159.483 46.7815 159.097L40.734 157.314C39.4651 156.94 38.2027 157.919 38.2495 159.241C38.2813 160.139 37.5368 160.933 36.64 160.964C35.7405 160.995 34.9441 160.251 34.9124 159.356L34.8296 157.017C34.7992 156.159 34.2247 155.416 33.4019 155.171L30.699 154.365C29.3881 153.975 28.0808 154.986 28.1292 156.353L28.5381 167.903C28.5584 168.476 28.824 169.013 29.2674 169.377L33.1187 172.541C33.4642 172.825 33.6712 173.243 33.687 173.69C33.7248 174.758 32.7013 175.547 31.6784 175.238L25.8434 173.474C25.424 173.348 24.9746 173.362 24.5643 173.516L18.9328 175.622C17.9312 175.996 16.857 175.279 16.8192 174.21C16.8033 173.761 16.9814 173.326 17.3083 173.017L20.9212 169.601C21.3387 169.206 21.5663 168.651 21.5459 168.077L21.1394 156.597C21.091 155.229 19.7136 154.313 18.4333 154.797L16.0464 155.7C15.2442 156.003 14.7247 156.784 14.755 157.641L14.8403 160.048C14.872 160.945 14.1275 161.739 13.2307 161.77C12.3312 161.801 11.5349 161.058 11.5032 160.162C11.4553 158.81 10.0943 157.904 8.82846 158.382L2.7965 160.658C1.51641 161.141 0.14019 160.225 0.0917749 158.857L0.038305 157.347C0.0144063 156.672 0.332745 156.031 0.884741 155.642L19.665 142.403C20.217 142.014 20.5354 141.373 20.5115 140.698L19.9529 124.922C19.9443 124.681 19.979 124.439 20.0591 124.211C21.0889 121.284 22.1698 119.801 23.3019 119.763C24.4341 119.724 25.6173 121.129 26.8517 123.978Z"
                            fill="#b4853b"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_938_21987"
                                x1="22.8398"
                                y1="171.717"
                                x2="22.8398"
                                y2="299.245"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#b4853b" />
                                <stop offset="1" stopColor="#b4853b" stopOpacity="0.16" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="percent" style={{ transform: `scale(${1 / scale + scale})` }}>{percent}%</div>
                </div>
                <div className="to">{quoteLoading.to}</div>
            </div>
        </div>
    )
}
