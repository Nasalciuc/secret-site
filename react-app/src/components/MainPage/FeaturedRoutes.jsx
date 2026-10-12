import { useEffect, useMemo, useState } from 'react'
import { useRegionStore } from '@/store/useRegionStore'
import { searchFlight } from '@/services/api'

// The four flagship routes from the approved homepage mockup, done honestly:
// prices come live from the same /flights/search endpoint the funnel uses
// (round-trip business class), cached per session; a card renders only when
// the API returned a real price. Clicking a card prefills the search form.
const ROUTES = [
    { from: 'JFK', to: 'LHR', fromLabel: 'New York', toLabel: 'London', imageMatch: ['london', 'europe'] },
    { from: 'LAX', to: 'NRT', fromLabel: 'Los Angeles', toLabel: 'Tokyo', imageMatch: ['tokyo', 'asia'] },
    { from: 'MIA', to: 'DXB', fromLabel: 'Miami', toLabel: 'Dubai', imageMatch: ['dubai', 'middle east'] },
    { from: 'ORD', to: 'SYD', fromLabel: 'Chicago', toLabel: 'Sydney', imageMatch: ['sydney', 'oceania'] },
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

export default function FeaturedRoutes() {
    const bestSelling = useRegionStore((state) => state.bestSelling)
    const getBestSelling = useRegionStore((state) => state.getBestSelling)
    const [prices, setPrices] = useState(() => readCache())
    const [loaded, setLoaded] = useState(() => Boolean(readCache()))

    useEffect(() => {
        if (bestSelling.length === 0) getBestSelling()
    }, [bestSelling.length, getBestSelling])

    useEffect(() => {
        if (prices) return
        let cancelled = false

        Promise.allSettled(
            ROUTES.map((route) => searchFlight(route.from, route.to, 'round_trip')),
        ).then((results) => {
            if (cancelled) return
            const next = {}
            results.forEach((result, index) => {
                const [data] = result.status === 'fulfilled' ? result.value : [null]
                const price = Number(data?.business)
                if (Number.isFinite(price) && price > 0) {
                    next[`${ROUTES[index].from}-${ROUTES[index].to}`] = price
                }
            })
            setPrices(next)
            setLoaded(true)
            if (Object.keys(next).length > 0) writeCache(next)
        })

        return () => {
            cancelled = true
        }
    }, [prices])

    const imageFor = useMemo(() => {
        const items = bestSelling.map((item) => ({
            name: String(item.name || '').toLowerCase(),
            image: returnImgUrl(item.image),
        }))
        return (route) => {
            for (const match of route.imageMatch) {
                const hit = items.find((item) => item.name === match && item.image)
                if (hit) return hit.image
            }
            return ''
        }
    }, [bestSelling])

    const prefillSearch = (route) => {
        window.dispatchEvent(
            new CustomEvent('bbc:prefill-route', {
                detail: {
                    from: { iata_code: route.from, city: route.fromLabel },
                    to: { iata_code: route.to, city: route.toLabel },
                },
            }),
        )
        document.getElementById('order-fly')?.scrollIntoView({ behavior: 'smooth' })
    }

    const cards = ROUTES.filter((route) => prices?.[`${route.from}-${route.to}`])

    if (loaded && cards.length === 0) return null

    return (
        <section className="mb-routes">
            <div className="mb-section mb-routes__inner">
                <span className="mb-eyebrow">Most requested</span>
                <h2 className="mb-section-title">Featured Business Class Deals</h2>
                <div className="mb-routes__grid">
                    {!loaded
                        ? ROUTES.map((route) => (
                              <div key={`${route.from}-${route.to}`} className="mb-route-card mb-route-card--skeleton" aria-hidden="true">
                                  <span className="media" />
                                  <span className="line" />
                                  <span className="line short" />
                              </div>
                          ))
                        : cards.map((route) => {
                              const image = imageFor(route)
                              return (
                                  <button
                                      key={`${route.from}-${route.to}`}
                                      type="button"
                                      className="mb-route-card"
                                      onClick={() => prefillSearch(route)}
                                  >
                                      <span className="mb-route-card__media">
                                          {image && <img src={image} alt={`${route.toLabel} business class`} loading="lazy" decoding="async" />}
                                      </span>
                                      <span className="mb-route-card__body">
                                          <span className="mb-route-card__route">
                                              {route.fromLabel}
                                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                  <path d="M4 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                              </svg>
                                              {route.toLabel}
                                          </span>
                                          <span className="mb-route-card__meta">Business Class, round trip</span>
                                          <span className="mb-route-card__price">from ${prices[`${route.from}-${route.to}`].toLocaleString('en-US')}</span>
                                          <span className="mb-route-card__cta">View deal</span>
                                      </span>
                                  </button>
                              )
                          })}
                </div>
                <p className="mb-routes__note">
                    Live fares from our flight search. Final quotes are confirmed by your consultant.
                </p>
            </div>
        </section>
    )
}
