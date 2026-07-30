import { Link } from 'react-router-dom'

export default function OfferCard({ title, price, imgUrl, extraInfo = '', to }) {
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
