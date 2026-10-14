import { useNavigate } from 'react-router-dom'
import { airlines, resolveAirlineImage } from '@/data/airlines'

function AirlineCard({ airline }) {
    const navigate = useNavigate()

    const goToAirline = () => {
        if (airline.slug) navigate(`/airlines/${airline.slug}`)
    }

    return (
        <button type="button" className="airline-card" onClick={goToAirline}>
            <img
                src={resolveAirlineImage(airline.image)}
                alt={airline.name}
                className="airline-image"
                loading="lazy"
                decoding="async"
            />
            <span className="airline-name">{airline.name}</span>
            <span className="airline-more">
                View airline
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4 12H20M20 12L13 5M20 12L13 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        </button>
    )
}

export default function AirlinesPage() {
    return (
        <div className="mb-page mb-airlines">
            <div className="title-section mb-airlines-hero">
                <h1 className="title mb-serif">
                    Premium Airlines Selected by BuyBusinessClass
                </h1>
                <p className="second-title">Scroll to Explore Our Top Airlines</p>
            </div>
            <div className="mb-airlines-grid">
                {airlines.map((airline) => (
                    <AirlineCard airline={airline} key={airline.slug} />
                ))}
            </div>
        </div>
    )
}
