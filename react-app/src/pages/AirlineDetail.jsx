import { Link, useParams } from 'react-router-dom'
import SecondBlock from '@/components/HeaderForm/FlightCard/SecondBlock'
import WorksContainer from '@/components/MainPage/WorksContainer'
import { departureList, getAirlineBySlug } from '@/data/airlines'

const formatPrice = (price) => (price ? `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*` : 'No price is set')

function FirstBlockAirline({ airlineName, departure }) {
    return (
        <div className="first-block flight-card-header">
            <div className="title">
                <div className="first-row">
                    <p>Flight business class with</p>
                </div>
                <div className="second-row">
                    <p className="destination">{airlineName}</p>
                </div>
                <p className="discount-note">Up to 60-70% discount on business class</p>
            </div>
            <div className="departure-list">
                <div className="header">
                    <div className="flex-grow-2">Destination</div>
                    <div className="flex-grow-1">Old Price</div>
                    <div className="flex-grow-1">Price Today</div>
                </div>
                <div className="content">
                    {departure.slice(0, 10).map((item) => (
                        <div key={item.id} className="list">
                            <Link to={`/flight/city/${item.name.toLowerCase()}/${item.id}`} className="container">
                                <div className="flex-grow-2">{item.name}</div>
                                <div className="flex-grow-1 old-price">{formatPrice(item.old_price)}</div>
                                <div className="flex-grow-1 new-price">{item.old_price ? 'Get a Quote' : 'No price is set'}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function AirlineDescription({ airline }) {
    return (
        <>
            <div className="flight-description">
                <div className="title">
                    <h1 className="main-title">
                        <span className="accent">{airline.title}</span>
                        <span className="capitalize">{airline.subtitle}</span>
                    </h1>
                </div>
                <p className="content">{airline.details}</p>
                <div className="title">
                    <h2 className="main-title">
                        <span className="capitalize">{airline.second}</span>
                    </h2>
                </div>
                <p className="content" dangerouslySetInnerHTML={{ __html: airline.paragraph }} />
                <div className="title">
                    <h2 className="main-title">
                        <span className="capitalize">{airline.facts_title}</span>
                    </h2>
                </div>
                <p className="content" dangerouslySetInnerHTML={{ __html: airline.facts }} />
            </div>
            <WorksContainer />
        </>
    )
}

export default function AirlineDetail() {
    const { slug } = useParams()
    const airline = getAirlineBySlug(slug)

    if (!airline) {
        return (
            <div className="airline-detail airline-not-found">
                <h1>Airline not found</h1>
                <p>Explore the full list of premium airlines available through BuyBusinessClass.</p>
                <Link to="/airlines">Back to airlines</Link>
            </div>
        )
    }

    return (
        <>
            <div className="container-airline">
                <div className="content-wrapper">
                    <div className="airline-details">
                        <FirstBlockAirline airlineName={airline.name} departure={departureList} />
                    </div>
                    <SecondBlock />
                </div>
            </div>
            <AirlineDescription airline={airline} />
        </>
    )
}
