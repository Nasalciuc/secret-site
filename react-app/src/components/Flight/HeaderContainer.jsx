import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBestDeal } from '@/services/api'
import { useRegionStore } from '@/store/useRegionStore'
import SecondBlock from '@/components/HeaderForm/FlightCard/SecondBlock'
import FirstBlock from './FirstBlock'
import RegionVue from './RegionVue'
import TransparentSelect from './TransparentSelect'

const BACK = import.meta.env.VITE_BACK || ''

const storageUrl = (path) => {
    if (!path) return ''
    if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
    return `${BACK}/storage/${path.replace(/^\/?storage\//, '')}`
}

const formatPrice = (price) => (price ? `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*` : '')

export default function HeaderContainer({ destination = [], onAbout, onCards }) {
    const params = useParams()
    const { regions, regionsIsLoaded, getRegions } = useRegionStore()
    const [root, setRoot] = useState('')
    const [rootCountry, setRootCountry] = useState('')
    const [rootCity, setRootCity] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(null)
    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])

    const destinationName = params.city || params.country || params.region || ''

    useEffect(() => {
        if (!regionsIsLoaded) getRegions()
    }, [getRegions, regionsIsLoaded])

    useEffect(() => {
        let cancelled = false

        // Clear previous destination so prices don't flash from the prior page.
        setRoot('')
        setRootCountry('')
        setRootCity('')
        setCountries([])
        setCities([])
        setPrice(null)
        setImage('')
        onAbout?.(null)
        onCards?.([])

        const loadDeal = async () => {
            const [result, error] = await getBestDeal(params.id)
            if (cancelled || error !== null || !result) return

            const [region, country, city] = result.selector?.bloodline ?? []

            setRoot(region?.name?.toLowerCase() ?? '')
            setRootCountry(country?.name?.toLowerCase() ?? '')
            setRootCity(city?.name?.toLowerCase() ?? '')
            setCountries(result.selector?.countries ?? [])
            setCities(result.selector?.cities ?? [])
            setPrice(result.minPrice?.price_today ?? null)
            setImage(storageUrl(result.image))

            if (result.meta?.title) document.title = result.meta.title
            Object.entries(result.meta?.meta ?? {}).forEach(([name, content]) => {
                if (content === null || content === undefined) return
                let tag = document.querySelector(`meta[name="${name}"]`)
                if (!tag) {
                    tag = document.createElement('meta')
                    tag.setAttribute('name', name)
                    document.head.appendChild(tag)
                }
                tag.setAttribute('content', content)
            })

            try {
                onAbout?.(result.about ? JSON.parse(result.about)?.blocks ?? null : null)
            } catch {
                onAbout?.(result.about ?? null)
            }
            onCards?.(result.bestDeals ?? [])
        }

        loadDeal()

        return () => {
            cancelled = true
        }
    }, [onAbout, onCards, params.id])

    const backgroundStyle = useMemo(() => (image ? { backgroundImage: `url(${image})` } : undefined), [image])

    return (
        <div className="outer-block">
            <div className="content flight-header-content" style={backgroundStyle}>
                <div className="overlay" />
                <RegionVue root={root} countries={countries} cities={cities} rootCity={rootCity} rootCountry={rootCountry} />
                <div className="blocks">
                    <div className="adaptive-dropdowns">
                        {regions.length > 0 && (
                            <TransparentSelect
                                className="left-ul"
                                value={params.region ?? root}
                                label="name"
                                options={regions}
                                link="/flight/region"
                            />
                        )}
                        {countries.length > 0 && (
                            <TransparentSelect
                                className="center-ul"
                                value={rootCountry || `Countries (${countries.length})`}
                                label="name"
                                options={countries}
                                link="/flight/country"
                            />
                        )}
                        {cities.length > 0 && (
                            <TransparentSelect
                                className="right-ul"
                                value={rootCity || `Cities (${cities.length})`}
                                label="name"
                                options={cities}
                                link="/flight/city"
                            />
                        )}
                    </div>
                    <div className="adaptive-title">
                        <p>Flight to</p>
                        <h1 style={{ color: '#b4853b', textTransform: 'capitalize', fontFamily: "'SSP-bold', sans-serif" }}>
                            {destinationName}
                        </h1>
                        <br />
                        <p>Starting from</p>
                        {price && <span>{formatPrice(price)}</span>}
                    </div>
                    <FirstBlock price={price} departure={destination} destination={destinationName} />
                    <SecondBlock />
                </div>
            </div>
        </div>
    )
}
