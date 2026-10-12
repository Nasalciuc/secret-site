import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegionStore } from '@/store/useRegionStore'
import { searchFlight } from '@/services/api'
import { PLANE_D } from '@/components/MainPage/planeShape'
import { ArrowIcon, scrollToQuote } from './homeShared'

// Betty's "Featured Business Class Deals": her four routes as four cards, each one a ticket: the
// destination's photo with her discount on a white pill (58% / 51% / 63% / 47% OFF, as in her design),
// the two airport codes with the flight between them, the live fare and a full-width "View deal". The fares are live: the round-trip business fare from the same
// /flights/search the quote funnel uses, cached for the session; a route the search does not price
// shows "Fare on request". "View deal" fills the quote form with the route and brings it into view.
// On phones the four tickets become a sideways row (the next one peeks in).
const ROUTES = [
    { from: 'JFK', to: 'LHR', fromLabel: 'New York', toLabel: 'London', off: 58, imageMatch: ['london', 'europe'] },
    { from: 'LAX', to: 'NRT', fromLabel: 'Los Angeles', toLabel: 'Tokyo', off: 51, imageMatch: ['tokyo', 'asia'] },
    { from: 'MIA', to: 'DXB', fromLabel: 'Miami', toLabel: 'Dubai', off: 63, imageMatch: ['dubai', 'middle east'] },
    { from: 'ORD', to: 'SYD', fromLabel: 'Chicago', toLabel: 'Sydney', off: 47, imageMatch: ['sydney', 'oceania'] },
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

// The flight between the two codes: a dotted arc with the plane at its top.
function FlightArc() {
    return (
        <span className="hp-route__flight" aria-hidden="true">
            <svg className="hp-route__arc" viewBox="0 0 120 30" preserveAspectRatio="none" focusable="false">
                <path d="M3 27C30 3 90 3 117 27" vectorEffect="non-scaling-stroke" />
            </svg>
            <svg className="hp-route__plane" viewBox="-11 -10 22 20" focusable="false">
                <path d={PLANE_D} />
            </svg>
        </span>
    )
}

export default function HomeDeals() {
    const bestSelling = useRegionStore((state) => state.bestSelling)
    const getBestSelling = useRegionStore((state) => state.getBestSelling)
    const [prices, setPrices] = useState(() => readCache())

    useEffect(() => {
        if (bestSelling.length === 0) getBestSelling()
    }, [bestSelling.length, getBestSelling])

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
            for (const match of route.imageMatch) {
                const hit = items.find((item) => item.name === match && item.image)
                if (hit) return hit.image
            }
            return ''
        }
    }, [bestSelling])

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
                        <p className="hp-eyebrow">Live fares</p>
                        <h2 className="hp-h2" id="hp-deals-title">
                            Featured Business Class Deals
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
                                    <div className="hp-route is-loading" aria-hidden="true">
                                        <span className="hp-route__media" />
                                        <span className="hp-route__body">
                                            <span className="hp-skel" />
                                            <span className="hp-skel hp-skel--short" />
                                            <span className="hp-skel hp-skel--button" />
                                        </span>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        className="hp-route"
                                        onClick={() => viewDeal(route)}
                                        aria-label={`${route.fromLabel} (${route.from}) to ${route.toLabel} (${route.to}), business class round trip, ${route.off}% off, ${
                                            fare ? `from ${fare}` : 'fare on request'
                                        }. View deal`}
                                    >
                                        <span className="hp-route__media">
                                            {image ? (
                                                <img src={image} alt="" loading="lazy" decoding="async" />
                                            ) : (
                                                <span className="hp-route__placeholder" aria-hidden="true">
                                                    <svg viewBox="-11 -10 22 20" focusable="false">
                                                        <path d={PLANE_D} />
                                                    </svg>
                                                </span>
                                            )}
                                            <span className="hp-route__tag" aria-hidden="true">
                                                {route.off}% OFF
                                            </span>
                                        </span>
                                        <span className="hp-route__body">
                                            <span className="hp-route__route">
                                                <span className="hp-route__end">
                                                    <span className="hp-route__code">{route.from}</span>
                                                    <span className="hp-route__city">{route.fromLabel}</span>
                                                </span>
                                                <FlightArc />
                                                <span className="hp-route__end hp-route__end--to">
                                                    <span className="hp-route__code">{route.to}</span>
                                                    <span className="hp-route__city">{route.toLabel}</span>
                                                </span>
                                            </span>
                                            {fare ? (
                                                <span className="hp-route__fare">
                                                    <span className="hp-route__live">
                                                        <span className="dot" />
                                                        Live fare from
                                                    </span>
                                                    <span className="hp-route__price">{fare}</span>
                                                </span>
                                            ) : (
                                                <span className="hp-route__fare">
                                                    <span className="hp-route__live">Today&rsquo;s fare</span>
                                                    <span className="hp-route__price is-request">On request</span>
                                                </span>
                                            )}
                                            <span className="hp-route__cta">
                                                View deal
                                                <ArrowIcon size={14} />
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
