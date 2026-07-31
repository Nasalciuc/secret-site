import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBestDeal } from '@/services/api'
import { useRegionStore } from '@/store/useRegionStore'
import AirlinesLogos from '@/components/Footer/AirlinesLogos'
import FlightCards from '@/components/Flight/FlightCards'
import RegionVue from '@/components/Flight/RegionVue'
import TransparentSelect from '@/components/Flight/TransparentSelect'
import SecondBlock from '@/components/HeaderForm/FlightCard/SecondBlock'
import WorksContainer from '@/components/MainPage/WorksContainer'
import ContactSection from '@/components/MainPage/ContactSection'

const BACK = import.meta.env.VITE_BACK || ''

const storageUrl = (path) => {
    if (!path) return ''
    if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
    return `${BACK}/storage/${path.replace(/^\/?storage\//, '')}`
}

const formatPrice = (price) => (price !== null && price !== undefined ? `$${price}*` : '')

function FirstBlockBestDeals({ name = '', price, selector = {} }) {
    const params = useParams()
    const { regions, regionsIsLoaded, getRegions } = useRegionStore()
    const regionName = name || params.region || ''
    const flightRegionId = selector?.bloodline?.[0]?.id ?? params.id

    useEffect(() => {
        if (!regionsIsLoaded) getRegions()
    }, [getRegions, regionsIsLoaded])

    return (
        <div className="first-block-best-deals">
            <RegionVue
                bestDeals
                root={params.region}
                countries={selector?.countries ?? []}
                cities={selector?.cities ?? []}
            />
            {regions.length > 0 && (
                <TransparentSelect options={regions} label="name" value={params.region} link="/best-deals" />
            )}
            <div className="description">
                <p>
                    Best <span>deals</span> starting <br />
                    <span>{regionName}</span> at {formatPrice(price) && <span>{formatPrice(price)}</span>}
                </p>
                <div className="orange-filled-button button-container">
                    <Link to={`/flight/region/${regionName.toLowerCase()}/${flightRegionId}`}>
                        View Offer Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

function HeaderContainer({ onCards }) {
    const params = useParams()
    const [flights, setFlights] = useState({})
    const image = useMemo(() => storageUrl(flights.image), [flights.image])

    useEffect(() => {
        let cancelled = false

        const loadDeal = async () => {
            const [result, error] = await getBestDeal(params.id)
            if (cancelled || error !== null || !result) return

            setFlights(result)
            onCards?.(result.bestDeals ?? [])

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
        }

        loadDeal()

        return () => {
            cancelled = true
        }
    }, [onCards, params.id])

    return (
        <div className="content best-deals-content" style={image ? { backgroundImage: `url(${image})` } : undefined}>
            <div className="overlay" />
            <div className="blocks">
                <FirstBlockBestDeals
                    name={params.region}
                    price={flights?.minPrice?.price_today}
                    selector={flights.selector ?? {}}
                />
                <div className="imported-second-block">
                    <SecondBlock />
                </div>
            </div>
        </div>
    )
}

export default function BestDeals() {
    const params = useParams()
    const [cards, setCards] = useState([])

    useEffect(() => {
        let canonicalLink = document.querySelector('link[rel="canonical"]')
        if (!canonicalLink) {
            canonicalLink = document.createElement('link')
            canonicalLink.rel = 'canonical'
            document.head.appendChild(canonicalLink)
        }
        canonicalLink.href = `https://buybusinessclass.com/best-deals/${params.region}/${params.id}`
    }, [params.id, params.region])

    return (
        <div className="best-deals-page">
            <div className="header-content">
                <HeaderContainer onCards={setCards} />
            </div>
            <AirlinesLogos />
            <FlightCards arr={cards} />
            <WorksContainer />
            <ContactSection />
        </div>
    )
}
