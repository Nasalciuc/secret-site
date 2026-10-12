import { Link } from 'react-router-dom'

export default function OfferCard({ title, price, imgUrl, extraInfo = '', to, variant }) {
    // Moodboard homepage variant: image on top, white % badge, outline CTA.
    // Only rendered when explicitly requested (BestSelling on .mb-home); every
    // other usage (AllDeals, FlightCards, DynamicPage) keeps the legacy markup.
    if (variant === 'mb') {
        const percentMatch = /\d+\s*%/.exec(extraInfo)
        const badgeText = percentMatch ? `${percentMatch[0].replace(/\s+/g, '')} OFF` : null

        return (
            <div className="mb-deal-card">
                <div className="mb-deal-card__media">
                    {imgUrl ? <img src={imgUrl} alt={title} loading="lazy" /> : null}
                    {badgeText ? <span className="mb-deal-card__badge">{badgeText}</span> : null}
                </div>
                <div className="mb-deal-card__body">
                    <p className="mb-deal-card__title">{title}</p>
                    <p className="mb-deal-card__price">from ${price}</p>
                    {to ? (
                        <Link className="mb-deal-card__cta" aria-label={`View ${title} page`} to={to}>
                            View deal
                        </Link>
                    ) : null}
                </div>
            </div>
        )
    }

    const backgroundImage = `linear-gradient(
        180deg,
        rgba(7, 8, 17, 0) 0%,
        rgba(7, 8, 17, 0.88) 100%
    ), url(${imgUrl})`

    return (
        <div className="offer-content">
            <div className="img-block" style={{ backgroundImage }}>
                <div className="content-info">
                    <p className="title">{title}</p>
                    <p className="price">${price}</p>
                    <p className="extra-info">{extraInfo}</p>
                </div>
            </div>
            {to ? <Link aria-label={`View ${title} page`} to={to} /> : null}
        </div>
    )
}
