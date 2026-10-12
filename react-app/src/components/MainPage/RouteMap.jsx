import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { VIEW, LAND_DOTS, HUB, project, placeFor } from './routeMapData'
import { PLANE_D } from './planeShape'
import useReducedMotion from '@/components/common/useReducedMotion'

// The route map: a dotted world, the USA hub and a dashed gold route to every destination of the
// open list. The live route is flown by a small plane, then the next one, like a departures board;
// pointing at a link in the list flies that route instead. Decorative: the links carry the content.
// Loaded on its own (React.lazy) when the section comes near, so the map data stays out of the
// first download.
const FLIGHT_MS = 2400
const HOLD_MS = 1500

// A curved route that always bows towards the north, like a great circle on a flat map.
function arc(from, to) {
    const [x1, y1] = from
    const [x2, y2] = to
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.hypot(dx, dy) || 1
    let nx = dy / len
    let ny = -dx / len
    if (ny > 0) {
        nx = -nx
        ny = -ny
    }
    const lift = Math.min(len * 0.3, 130)
    const c = [(x1 + x2) / 2 + nx * lift, Math.max(8, (y1 + y2) / 2 + ny * lift)]
    const f = (v) => v.toFixed(1)
    return { p0: from, c, p1: to, d: `M${f(x1)} ${f(y1)}Q${f(c[0])} ${f(c[1])} ${f(x2)} ${f(y2)}` }
}

function pointAt({ p0, c, p1 }, t) {
    const u = 1 - t
    const x = u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0]
    const y = u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]
    const dx = 2 * u * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0])
    const dy = 2 * u * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1])
    return [x, y, (Math.atan2(dy, dx) * 180) / Math.PI]
}

const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

// items: [{ id, name }] of the open list; activeId: the one to fly; onAdvance(nextId) when it landed.
export default function RouteMap({ items, activeId, paused, onAdvance }) {
    const wrapRef = useRef(null)
    const planeRef = useRef(null)
    const trailRef = useRef(null)
    const unitsRef = useRef(1)
    const progressRef = useRef(0)
    const [units, setUnits] = useState(1) // viewBox units per CSS pixel
    const [visible, setVisible] = useState(false)
    const [landed, setLanded] = useState(false)
    const reduced = useReducedMotion()

    const hub = useMemo(() => project(HUB.at), [])
    const routes = useMemo(
        () =>
            items
                .map((item) => ({ id: item.id, name: item.name, at: placeFor(item.name) }))
                .filter((item) => item.at)
                .map((item) => {
                    const to = project(item.at)
                    return { ...item, to, ...arc(hub, to) }
                }),
        [items, hub],
    )
    const activeIndex = Math.max(0, routes.findIndex((item) => item.id === activeId))
    const route = routes[activeIndex] || null

    const placePlane = useCallback(
        (t) => {
            progressRef.current = t
            if (!route) return
            const [x, y, angle] = pointAt(route, t)
            planeRef.current?.setAttribute(
                'transform',
                `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(${unitsRef.current.toFixed(3)})`,
            )
            trailRef.current?.setAttribute('stroke-dasharray', `${t.toFixed(4)} 1`)
        },
        [route],
    )

    // Keep dots, plane and labels the same size on screen at every width.
    useLayoutEffect(() => {
        const el = wrapRef.current
        if (!el) return undefined
        const measure = (width) => {
            if (!width) return
            unitsRef.current = VIEW.w / width
            setUnits(unitsRef.current)
        }
        measure(el.getBoundingClientRect().width)
        if (typeof ResizeObserver === 'undefined') return undefined
        const ro = new ResizeObserver(([entry]) => measure(entry.contentRect.width))
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    const placeRef = useRef(placePlane)
    placeRef.current = placePlane
    useEffect(() => {
        placeRef.current(progressRef.current)
    }, [units])

    // Fly only while the map is on screen.
    useEffect(() => {
        const el = wrapRef.current
        if (!el || typeof IntersectionObserver === 'undefined') {
            setVisible(true)
            return undefined
        }
        const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: [0, 0.2, 0.5] })
        io.observe(el)
        return () => io.disconnect()
    }, [])

    // A layout effect places the plane before the browser paints, so it never flashes elsewhere.
    useLayoutEffect(() => {
        setLanded(false)
        if (!route) return undefined
        if (reduced) {
            placePlane(0.62)
            return undefined
        }
        placePlane(0)
        if (!visible) return undefined
        let frame = 0
        const start = performance.now()
        const tick = (now) => {
            const t = Math.min(1, (now - start) / FLIGHT_MS)
            placePlane(ease(t))
            if (t < 1) frame = requestAnimationFrame(tick)
            else setLanded(true)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [route, visible, reduced, placePlane])

    useEffect(() => {
        if (!landed || paused || reduced || routes.length < 2) return undefined
        const next = routes[(activeIndex + 1) % routes.length].id
        const id = window.setTimeout(() => onAdvance(next), HOLD_MS)
        return () => window.clearTimeout(id)
    }, [landed, paused, reduced, routes, activeIndex, onAdvance])

    const px = (n) => n * units
    const at = ([x, y]) => ({ left: `${((x - VIEW.x) / VIEW.w) * 100}%`, top: `${((y - VIEW.y) / VIEW.h) * 100}%` })
    const edge = route ? (route.to[0] < VIEW.w * 0.12 ? ' is-start' : route.to[0] > VIEW.w * 0.86 ? ' is-end' : '') : ''

    return (
        <div className={`mb-routemap${visible ? ' is-visible' : ''}`} ref={wrapRef} aria-hidden="true">
            {/* the world is painted once on its own layer; only the routes above it repaint */}
            <svg className="mb-routemap__land" viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} focusable="false">
                <path transform="scale(0.1)" d={LAND_DOTS} />
            </svg>
            <svg className="mb-routemap__svg" viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} focusable="false">
                <g className="mb-routemap__arcs">
                    {routes.map((item, index) => (
                        <path
                            key={item.id}
                            d={item.d}
                            className={index === activeIndex ? 'is-active' : undefined}
                            vectorEffect="non-scaling-stroke"
                        />
                    ))}
                </g>
                {route && (
                    <path
                        ref={trailRef}
                        key={`trail-${route.id}`}
                        className="mb-routemap__trail"
                        d={route.d}
                        pathLength="1"
                        strokeDasharray="0 1"
                        strokeWidth={px(2)}
                    />
                )}
                <g className="mb-routemap__stops">
                    {routes.map((item, index) => (
                        <circle
                            key={item.id}
                            cx={item.to[0]}
                            cy={item.to[1]}
                            r={px(index === activeIndex ? 4.5 : 3)}
                            className={index === activeIndex ? 'is-active' : undefined}
                        />
                    ))}
                </g>
                {route && landed && (
                    <circle key={`ping-${route.id}`} className="mb-routemap__ping" cx={route.to[0]} cy={route.to[1]} r={px(4.5)} />
                )}
                <circle className="mb-routemap__hub-ring" cx={hub[0]} cy={hub[1]} r={px(5)} />
                <circle className="mb-routemap__hub" cx={hub[0]} cy={hub[1]} r={px(5)} />
                {route && (
                    <g ref={planeRef} className="mb-routemap__plane">
                        <path d={PLANE_D} />
                    </g>
                )}
            </svg>
            <span className="mb-routemap__label mb-routemap__label--hub" style={at(hub)}>
                {HUB.name}
            </span>
            {route && (
                <span key={`label-${route.id}`} className={`mb-routemap__label${edge}`} style={at(route.to)}>
                    {route.name}
                </span>
            )}
        </div>
    )
}
