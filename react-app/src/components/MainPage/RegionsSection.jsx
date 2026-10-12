import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { useRegionStore } from '@/store/useRegionStore'

// Moodboard "Destinations" section (styles: mb-home-content.scss, scoped .mb-home).
// Same data + links as the live-site regions grid: three groups (Region /
// Countries / City) of internal links to /flight/... pages, collapsible
// accordion below 1200px. Every link and its anchor text is preserved.
export default function RegionsSection() {
    const { appWidth } = useAppStore()
    const { regions, countries, cities, getRegions } = useRegionStore()
    const [regionOpen, setRegionOpen] = useState(false)
    const [countryOpen, setCountryOpen] = useState(false)
    const [cityOpen, setCityOpen] = useState(false)

    useEffect(() => {
        getRegions()
    }, [getRegions])

    const showMenu = (value) => {
        if (appWidth > 1200) return
        if (value === 'region') {
            setCityOpen(false)
            setCountryOpen(false)
            setRegionOpen(!regionOpen)
        } else if (value === 'countries') {
            setCityOpen(false)
            setRegionOpen(false)
            setCountryOpen(!countryOpen)
        } else {
            setRegionOpen(false)
            setCountryOpen(false)
            setCityOpen(!cityOpen)
        }
    }

    const renderRegionLinks = (items, type, label, routeType, open) => (
        <div className={`mb-region-group ${type} ${open ? 'show' : 'hide'}`}>
            <div className="mb-region-head" onClick={() => showMenu(routeType === 'country' ? 'countries' : routeType)}>
                <span className="mb-region-label">{label}</span>
                <svg
                    className="mb-region-chevron"
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path d="M13 7L7 1L1 7" stroke="#b4853b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div className="mb-region-links">
                {(Array.isArray(items) ? items : []).slice(0, 7).map((item) => (
                    <Link
                        key={`${type}-${item.id}`}
                        to={`/flight/${routeType}/${String(item.name).toLowerCase()}/${item.id}`}
                        className={`mb-region-link ${routeType}-card`}
                    >
                        <span>Business class flights to {item.name}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="#b4853b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                ))}
                <Link to="/all-deals" className="mb-region-more">
                    View More
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        </div>
    )

    return (
        <section className="mb-regions">
            <span className="mb-eyebrow">Destinations</span>
            <h2 className="mb-section-title">Fly business class worldwide</h2>
            <div className="mb-regions-grid">
                {renderRegionLinks(regions, 'regions', 'Region', 'region', regionOpen)}
                {renderRegionLinks(countries, 'countries', 'Countries', 'country', countryOpen)}
                {renderRegionLinks(cities, 'cities', 'City', 'city', cityOpen)}
            </div>
        </section>
    )
}
