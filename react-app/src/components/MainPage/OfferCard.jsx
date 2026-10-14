import { Link } from 'react-router-dom'

const money = (value) => {
    const n = Number(value)
    return Number.isFinite(n) ? n.toLocaleString('en-US') : value
}

export default function OfferCard({ title, price, oldPrice, imgUrl, extraInfo = '', to, variant }) {
    // Moodboard variant: the destination's photo on top with the saving on a white pill (only when the
    // deal carries the previous fare), then the name, the fare and a full-width button. Only rendered when explicitly
    // requested (BestSelling, FlightCards and AllDeals on .mb-home / .mb-page); every other usage
    // keeps the legacy markup.
    if (variant === 'mb') {
        const now = Number(price)
        const before = Number(oldPrice)
        const saving = Number.isFinite(now) && Number.isFinite(before) && before > now ? Math.round((1 - now / before) * 100) : 0
        const percentMatch = /\d+\s*%/.exec(extraInfo)
        const badgeText = saving >= 5 ? `Save ${saving}%` : percentMatch ? `${percentMatch[0].replace(/\s+/g, '')} OFF` : null
        const meta = extraInfo && !percentMatch ? extraInfo : ''

        return (
            <div className="mb-deal-card">
                <div className="mb-deal-card__media">
                    {imgUrl ? <img src={imgUrl} alt={title} loading="lazy" /> : null}
                    {badgeText ? <span className="mb-deal-card__badge">{badgeText}</span> : null}
                </div>
                <div className="mb-deal-card__body">
                    <p className="mb-deal-card__title">{title}</p>
                    <p className="mb-deal-card__price">
                        <span className="mb-deal-card__from">from</span> ${money(price)}
                        {saving >= 5 ? (
                            <s className="mb-deal-card__old">
                                <span className="sr-only">was </span>${money(before)}
                            </s>
                        ) : null}
                    </p>
                    {meta ? <p className="mb-deal-card__meta">{meta}</p> : null}
                    {to ? (
                        <Link className="mb-deal-card__cta" aria-label={`View ${title} page`} to={to}>
                            View deal
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                                <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
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
