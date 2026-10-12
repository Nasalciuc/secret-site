import { XyzTransitionGroup } from '@animxyz/react'
import { Link, useParams } from 'react-router-dom'

const formatPrice = (price) => (price ? `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*` : 'No price is set')

const flightPath = (type, name, id) => {
    if (!type || name == null || id == null) return undefined
    // Keep spaces raw — React Router encodes the pathname (avoid %2520 double-encoding).
    return `/flight/${type}/${String(name).toLowerCase()}/${id}`
}

export default function FirstBlock({ destination, price, departure = [], className = '' }) {
    const params = useParams()
    const isCity = Boolean(params.city)
    const nestedType = params.region ? 'country' : 'city'
    const rootClass = ['first-block', 'flight-card-header', className].filter(Boolean).join(' ')

    const renderContent = (item) => (
        <>
            <div className="flex-grow-2">{item.name}</div>
            <div className="flex-grow-1 old-price">{formatPrice(item.old_price)}</div>
            <div className="flex-grow-1 new-price">{formatPrice(item.price_today)}</div>
        </>
    )

    return (
        <div className={rootClass}>
            <div className="title">
                <div className="first-row">
                    <p>Flight to</p>
                    <p>Starting from</p>
                </div>
                <div className="second-row">
                    <h2 className="destination">{destination}</h2>
                    {price !== null && price !== undefined && (
                        <p className="xyz-in" xyz="fade">
                            ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </p>
                    )}
                </div>
                <p className="discount-note">
                    Up to 60-70% discount on business class
                </p>
            </div>
            <div className="departure-list">
                <div className="header">
                    <div className="flex-grow-2">{isCity ? 'From' : 'Destination'}</div>
                    <div className="flex-grow-1">Old Price</div>
                    <div className="flex-grow-1">Price Today</div>
                </div>
                {/* Match Vue xyz-transition-group: appear-visible + appear-stagger (default 0.5s) */}
                {departure.length > 0 && (
                    <XyzTransitionGroup
                        key={params.id ?? 'departure-list'}
                        className="content"
                        xyz="fade small appear-stagger"
                        appear={false}
                        appearVisible
                    >
                        {departure.slice(0, 10).map((item) => {
                            const to = flightPath(nestedType, item.name, item.id)

                            return (
                                <div key={item.id ?? item.name} className="list">
                                    {isCity || !to ? (
                                        <div className="container">{renderContent(item)}</div>
                                    ) : (
                                        <Link to={to} className="container">
                                            {renderContent(item)}
                                        </Link>
                                    )}
                                </div>
                            )
                        })}
                    </XyzTransitionGroup>
                )}
            </div>
        </div>
    )
}
