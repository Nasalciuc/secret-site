import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegionStore } from '@/store/useRegionStore'

// "Fly business class worldwide": the live-site destination links (Region / Countries / City, the
// same internal /flight/... links and anchor text) as a route explorer. The open list is flown on
// the map from the USA one route after another; pointing at a link flies its route. All three
// lists stay in the page for search engines; the tabs only choose which one is shown.
const RouteMap = lazy(() => import('./RouteMap'))

const TABS = [
    { key: 'regions', label: 'Regions', route: 'region' },
    { key: 'countries', label: 'Countries', route: 'country' },
    { key: 'cities', label: 'Cities', route: 'city' },
]

const ArrowIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default function RegionsSection() {
    const { regions, countries, cities, getRegions } = useRegionStore()
    const [tab, setTab] = useState('regions')
    const [activeId, setActiveId] = useState(null)
    const [pointing, setPointing] = useState(false)
    const [near, setNear] = useState(false)
    const sectionRef = useRef(null)
    const resumeRef = useRef(0)

    useEffect(() => {
        getRegions()
    }, [getRegions])

    // The map (and its data) loads when the section is about a screen away.
    useEffect(() => {
        const el = sectionRef.current
        if (!el || typeof IntersectionObserver === 'undefined') {
            setNear(true)
            return undefined
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setNear(true)
                    io.disconnect()
                }
            },
            { rootMargin: '900px 0px' },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    useEffect(() => () => window.clearTimeout(resumeRef.current), [])

    const lists = useMemo(() => {
        const take = (items) => (Array.isArray(items) ? items : []).slice(0, 7)
        return { regions: take(regions), countries: take(countries), cities: take(cities) }
    }, [regions, countries, cities])

    const items = lists[tab]
    const flyingId = items.some((item) => item.id === activeId) ? activeId : items[0]?.id

    const chooseTab = (key) => {
        if (key === tab) return
        setTab(key)
        setActiveId(null)
    }

    // Arrow keys move between the tabs (WAI-ARIA tabs pattern, roving tabindex).
    const onTabKey = (event) => {
        const step = { ArrowRight: 1, ArrowLeft: -1, Home: -TABS.length, End: TABS.length }[event.key]
        if (!step) return
        event.preventDefault()
        const index = TABS.findIndex((item) => item.key === tab)
        const next = TABS[Math.max(0, Math.min(TABS.length - 1, index + step))]
        chooseTab(next.key)
        document.getElementById(`mb-regions-tab-${next.key}`)?.focus()
    }

    const point = (id) => {
        window.clearTimeout(resumeRef.current)
        setPointing(true)
        setActiveId(id)
    }

    const release = () => {
        window.clearTimeout(resumeRef.current)
        resumeRef.current = window.setTimeout(() => setPointing(false), 1200)
    }

    const advance = useCallback((id) => setActiveId(id), [])

    return (
        <section className="mb-regions" aria-labelledby="mb-regions-title" ref={sectionRef}>
            <div className="mb-regions__head">
                <p className="mb-eyebrow">Destinations</p>
                <h2 className="mb-section-title" id="mb-regions-title">
                    Fly business class worldwide
                </h2>
                <p className="mb-regions__sub">From the USA to every corner of the world, at fares you won&rsquo;t find online.</p>
            </div>
            <div className="mb-regions__layout">
                <div className="mb-regions__explorer">
                    <div className="mb-regions__tabs" role="tablist" aria-label="Destinations" onKeyDown={onTabKey}>
                        {TABS.map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                role="tab"
                                id={`mb-regions-tab-${item.key}`}
                                aria-selected={tab === item.key}
                                aria-controls={`mb-regions-panel-${item.key}`}
                                tabIndex={tab === item.key ? 0 : -1}
                                className="mb-regions__tab"
                                onClick={() => chooseTab(item.key)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    {TABS.map((item) => (
                        <div
                            key={item.key}
                            role="tabpanel"
                            id={`mb-regions-panel-${item.key}`}
                            aria-labelledby={`mb-regions-tab-${item.key}`}
                            className="mb-regions__panel"
                            hidden={tab !== item.key}
                        >
                            <ul className="mb-regions__links">
                                {lists[item.key].map((entry) => (
                                    <li key={`${item.key}-${entry.id}`}>
                                        <Link
                                            to={`/flight/${item.route}/${String(entry.name).toLowerCase()}/${entry.id}`}
                                            className={`mb-region-link ${item.route}-card${
                                                tab === item.key && flyingId === entry.id ? ' is-active' : ''
                                            }`}
                                            onMouseEnter={() => point(entry.id)}
                                            onFocus={() => point(entry.id)}
                                            onMouseLeave={release}
                                            onBlur={release}
                                        >
                                            <span className="mb-region-link__dot" aria-hidden="true" />
                                            <span className="mb-region-link__text">Business class flights to {entry.name}</span>
                                            <ArrowIcon />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/all-deals" className="mb-region-more">
                                View More
                                <ArrowIcon />
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="mb-regions__map">
                    {near ? (
                        <Suspense fallback={<div className="mb-routemap" aria-hidden="true" />}>
                            <RouteMap items={items} activeId={flyingId} paused={pointing} onAdvance={advance} />
                        </Suspense>
                    ) : (
                        <div className="mb-routemap" aria-hidden="true" />
                    )}
                </div>
            </div>
        </section>
    )
}
