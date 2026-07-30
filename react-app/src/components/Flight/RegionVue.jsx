import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRegionStore } from '@/store/useRegionStore'
import TransparentSelect from './TransparentSelect'

export default function RegionVue({ bestDeals = false, root = '', rootCountry = '', rootCity = '', countries = [], cities = [] }) {
    const { regions, regionsIsLoaded, getRegions } = useRegionStore()

    useEffect(() => {
        if (!regionsIsLoaded) getRegions()
    }, [getRegions, regionsIsLoaded])

    return (
        <div className="region">
            <Link className="direction" to="/all-deals">Show All</Link>
            {regions.map((item) => {
                const name = item.name?.toLowerCase() ?? ''
                const to = bestDeals ? `/best-deals/${name}/${item.id}` : `/flight/region/${name}/${item.id}`

                return (
                    <Link
                        key={`region-header-${item.id}`}
                        className={`direction ${name === root ? 'router-link-active' : ''}`}
                        to={to}
                        title={item.name}
                    >
                        {item.name}
                    </Link>
                )
            })}
            <div className="direction-links">
                {countries.length > 0 && (
                    <TransparentSelect
                        className="countries"
                        options={countries}
                        label="name"
                        value={rootCountry || `Countries (${countries.length})`}
                        link="/flight/country"
                    />
                )}
                {cities.length > 0 && (
                    <TransparentSelect
                        className="cities"
                        options={cities}
                        label="name"
                        value={rootCity || `Cities (${cities.length})`}
                        link="/flight/city"
                    />
                )}
            </div>
        </div>
    )
}
