import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegionStore } from '@/store/useRegionStore'
import { getBestDeal, searchFlight } from '@/services/api'
import { ArrowIcon, scrollToQuote } from './homeShared'

// Four routes as photo cards: the city picture, then a paper sheet over its lower edge with her
// discount (58 / 51 / 63 / 47), the cities and the live round-trip fare. "View deal" fills the
// quote form with the route and brings it into view. Fares come from the same /flights/search
// the quote funnel uses, cached for the session; a route the search does not price shows
// "On request". Photos are the city records in the CMS (getOne), not the region tiles.
const ROUTES = [
    { from: 'JFK', to: 'LHR', fromLabel: 'New York', toLabel: 'London', off: 58, dealId: 23 },
    { from: 'LAX', to: 'NRT', fromLabel: 'Los Angeles', toLabel: 'Tokyo', off: 51, dealId: 283 },
    { from: 'MIA', to: 'DXB', fromLabel: 'Miami', toLabel: 'Dubai', off: 63, dealId: 512 },
    { from: 'ORD', to: 'SYD', fromLabel: 'Chicago', toLabel: 'Sydney', off: 47, dealId: 695 },
]

const CACHE_KEY = 'bbc_featured_routes_v1'
const CACHE_TTL_MS = 6 * 60 * 60 * 1000

function readCache() {
    try {
        const raw = window.sessionStorage.getItem(CACHE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        if (!parsed || Date.now() - parsed.ts > CACHE_TTL_MS) return null
        return parsed.prices
    } catch {
        return null
    }
}

function writeCache(prices) {
    try {
        window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), prices }))
    } catch {
        // Storage unavailable: prices simply refetch next visit
    }
}

function returnImgUrl(url) {
    if (!url) return ''
    if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) return url
    const path = url.startsWith('/') ? url : `/${url}`
    const storagePath = path.startsWith('/storage/') ? path : `/storage${path}`
    return `${import.meta.env.VITE_BACK || ''}${storagePath}`
}

const keyOf = (route) => `${route.from}-${route.to}`

export default function HomeDeals() {
    const bestSelling = useRegionStore((state) => state.bestSelling)
    const getBestSelling = useRegionStore((state) => state.getBestSelling)
    const [prices, setPrices] = useState(() => readCache())
    const [cityImages, setCityImages] = useState({})

    useEffect(() => {
        if (bestSelling.length === 0) getBestSelling()
    }, [bestSelling.length, getBestSelling])

    useEffect(() => {
        let cancelled = false

        Promise.all(ROUTES.map((route) => getBestDeal(route.dealId))).then((results) => {
            if (cancelled) return
            const next = {}
            results.forEach(([data], index) => {
                const url = returnImgUrl(data?.image)
                if (url) next[keyOf(ROUTES[index])] = url
            })
            setCityImages(next)
        })

        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        if (prices) return undefined
        let cancelled = false

        Promise.allSettled(ROUTES.map((route) => searchFlight(route.from, route.to, 'round_trip'))).then((results) => {
            if (cancelled) return
            const next = {}
            results.forEach((result, index) => {
                const [data] = result.status === 'fulfilled' ? result.value : [null]
                const price = Number(data?.business)
                if (Number.isFinite(price) && price > 0) next[keyOf(ROUTES[index])] = price
            })
            setPrices(next)
            if (Object.keys(next).length > 0) writeCache(next)
        })

        return () => {
            cancelled = true
        }
    }, [prices])

    const imageFor = useMemo(() => {
        const items = bestSelling.map((item) => ({ name: String(item.name || '').toLowerCase(), image: returnImgUrl(item.image) }))
        return (route) => {
            if (cityImages[keyOf(route)]) return cityImages[keyOf(route)]
            const hit = items.find((item) => item.name === route.toLabel.toLowerCase() && item.image)
            return hit ? hit.image : ''
        }
    }, [bestSelling, cityImages])

    const viewDeal = (route) => {
        window.dispatchEvent(
            new CustomEvent('bbc:prefill-route', {
                detail: {
                    from: { iata_code: route.from, city: route.fromLabel },
                    to: { iata_code: route.to, city: route.toLabel },
                },
            }),
        )
        scrollToQuote()
    }

    return (
        <section className="hp-section hp-deals" id="deals" aria-labelledby="hp-deals-title">
            <div className="hp-wrap">
                <div className="hp-head hp-head--split">
                    <div>
                        <h2 className="hp-h2" id="hp-deals-title">
                            Four business class routes
                        </h2>
                    </div>
                    <Link to="/all-deals" className="hp-link">
                        See all deals
                        <ArrowIcon />
                    </Link>
                </div>
                <ul className="hp-deals__grid">
                    {ROUTES.map((route) => {
                        const image = imageFor(route)
                        const price = prices?.[keyOf(route)]
                        const fare = price ? `$${price.toLocaleString('en-US')}` : null
                        return (
                            <li key={keyOf(route)}>
                                {!prices ? (
                                    <div className="hp-fare is-loading" aria-hidden="true">
                                        <span className="hp-fare__photo" />
                                        <span className="hp-fare__sheet">
                                            <span className="hp-skel" />
                                            <span className="hp-skel hp-skel--short" />
                                        </span>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        className="hp-fare"
                                        onClick={() => viewDeal(route)}
                                        aria-label={`${route.fromLabel} (${route.from}) to ${route.toLabel} (${route.to}), business class round trip, save ${route.off}%, ${
                                            fare ? `from ${fare}` : 'fare on request'
                                        }. View deal`}
                                    >
                                        <span className="hp-fare__photo">
                                            {image ? (
                                                <img src={image} alt="" loading="lazy" decoding="async" />
                                            ) : (
                                                <span className="hp-fare__empty" aria-hidden="true" />
                                            )}
                                        </span>
                                        <span className="hp-fare__sheet">
                                            <span className="hp-fare__off">Save {route.off}%</span>
                                            <span className="hp-fare__cities">
                                                {route.fromLabel} to {route.toLabel}
                                            </span>
                                            <span className={`hp-fare__price${fare ? '' : ' is-request'}`}>
                                                {fare || 'On request'}
                                                <span className="hp-fare__codes">
                                                    {route.from}
                                                    <span aria-hidden="true"> – </span>
                                                    {route.to}
                                                </span>
                                            </span>
                                            <span className="hp-fare__go" aria-hidden="true">
                                                <ArrowIcon size={18} />
                                            </span>
                                        </span>
                                    </button>
                                )}
                            </li>
                        )
                    })}
                </ul>
                <p className="hp-note">Live round-trip business class fares from our search. Your consultant confirms the final quote.</p>
            </div>
        </section>
    )
}
