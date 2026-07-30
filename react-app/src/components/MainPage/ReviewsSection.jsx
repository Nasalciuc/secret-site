import { useEffect } from 'react'

export default function ReviewsSection() {
    useEffect(() => {
        window.Trustpilot?.loadFromElement?.(document.querySelector('.trustpilot-widget'), true)
    }, [])

    return (
        <div className="reviews-container">
            <div className="reviews-tittle">
                <div className="title">
                    <h3 className="main-title">
                        <span className="accent">99%</span> of Travelers <span className="accent">Recommend</span> BuyBusinessClass
                    </h3>
                </div>
                <div className="subtitle-block">
                    <div
                        className="trustpilot-widget"
                        data-locale="en-US"
                        data-template-id="56278e9abfbbba0bdcd568bc"
                        data-businessunit-id="5991787a0000ff0005a8d1d6"
                        data-style-height="52px"
                        data-style-width="100%"
                    >
                        <a href="https://www.trustpilot.com/review/buybusinessclass.com" target="_blank" rel="noopener noreferrer">
                            Trustpilot
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <a
                    href="https://www.trustpilot.com/review/buybusinessclass.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transparent-button"
                >
                    Read more
                </a>
            </div>
        </div>
    )
}
