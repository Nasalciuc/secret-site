import { Link, useParams } from 'react-router-dom'

const formatPrice = (price) => (price ? `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*` : 'No price is set')

export default function FirstBlock({ destination, price, departure = [] }) {
    const params = useParams()
    const isCity = Boolean(params.city)

    const renderContent = (item) => (
        <>
            <div className="flex-grow-2">{item.name}</div>
            <div className="flex-grow-1 old-price">{formatPrice(item.old_price)}</div>
            <div className="flex-grow-1 new-price">{formatPrice(item.price_today)}</div>
        </>
    )

    return (
        <div className="first-block flight-card-header">
            <div className="title">
                <div className="first-row">
                    <p>Flight to</p>
                    <p>Starting from</p>
                </div>
                <div className="second-row">
                    <h2 className="destination">{destination}</h2>
                    {price !== null && price !== undefined && <p className="xyz-in">${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>}
                </div>
                <p style={{ color: '#c2c7cc', fontSize: 12, fontFamily: "'Inter', sans-serif" }}>
                    Up to 60-70% discount on business class
                </p>
            </div>
            <div className="departure-list">
                <div className="header">
                    <div className="flex-grow-2">{isCity ? 'From' : 'Destination'}</div>
                    <div className="flex-grow-1">Old Price</div>
                    <div className="flex-grow-1">Price Today</div>
                </div>
                {departure.length > 0 && (
                    <div className="content">
                        {departure.slice(0, 10).map((item) => {
                            const type = params.region ? 'country' : 'city'
                            const to = `/flight/${type}/${item.name.toLowerCase()}/${item.id}`

                            return (
                                <div key={item.id} className="list">
                                    {isCity ? (
                                        <div className="container">{renderContent(item)}</div>
                                    ) : (
                                        <Link to={to} className="container">{renderContent(item)}</Link>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
