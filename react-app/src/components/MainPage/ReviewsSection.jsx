import { useEffect } from 'react'
import TransparentButton from '@/components/common/Buttons/TransparentButton'

const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/buybusinessclass.com'

function loadTrustpilotWidget(el) {
    if (!el || !window.Trustpilot?.loadFromElement) return false
    window.Trustpilot.loadFromElement(el, true)
    return true
}

export default function ReviewsSection() {
    useEffect(() => {
        const el = document.querySelector('.reviews-container .trustpilot-widget')
        if (!el) return undefined

        if (loadTrustpilotWidget(el)) return undefined

        const id = window.setInterval(() => {
            if (loadTrustpilotWidget(el)) window.clearInterval(id)
        }, 100)

        return () => window.clearInterval(id)
    }, [])

    return (
        <div className="reviews-container">
            <div className="reviews-tittle">
                <div className="title">
                    <h3 className="main-title">
                        <span className="accent">99%</span> of Travelers <span className="accent">Recommend</span>{' '}
                        BuyBusinessClass
                    </h3>
                </div>
                <div className="subtitle-block">
                    {/* TrustBox widget - Micro Combo */}
                    <div
                        className="trustpilot-widget"
                        data-locale="en-US"
                        data-template-id="56278e9abfbbba0bdcd568bc"
                        data-businessunit-id="5991787a0000ff0005a8d1d6"
                        data-style-height="52px"
                        data-style-width="100%"
                    >
                        <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer">
                            Trustpilot
                        </a>
                    </div>
                </div>
            </div>
            <TransparentButton
                buttonText="Read more"
                link={TRUSTPILOT_URL}
                regularLink
                target="_blank"
            />
        </div>
    )
}
