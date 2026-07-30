import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { useRegionStore } from '@/store/useRegionStore'

export default function RegionsSection() {
    const { appWidth } = useAppStore()
    const { regions, countries, cities, getRegions, getCountries, getCities } = useRegionStore()
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
        <div className={`${type} ${open ? 'show' : 'hide'}`}>
            <div className="title" onClick={() => showMenu(routeType === 'country' ? 'countries' : routeType)}>
                <span>{label}</span>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7L7 1L1 7" stroke="#b4853b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div className="container">
                {(Array.isArray(items) ? items : []).slice(0, 7).map((item) => (
                    <Link
                        key={`${type}-${item.id}`}
                        to={`/flight/${routeType}/${item.name.toLowerCase()}/${item.id}`}
                        className={`${routeType}-card`}
                    >
                        Business class flights to {item.name}
                    </Link>
                ))}
                <Link to="/all-deals" className="black-orange-button">View More</Link>
            </div>
        </div>
    )

    return (
        <div className="regions-container">
            {renderRegionLinks(regions, 'regions', 'Region', 'region', regionOpen)}
            {renderRegionLinks(countries, 'countries', 'Countries', 'country', countryOpen)}
            {renderRegionLinks(cities, 'cities', 'City', 'city', cityOpen)}
        </div>
    )
}
