import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useInView from '@/components/common/useInView'
import useReducedMotion from '@/components/common/useReducedMotion'
import { PLANE_D } from './planeShape'

// "How does this work?" as a flight. The four steps are the waypoints of a dashed route; when the
// section comes into view a plane flies it and every step lights up as the plane reaches it, then the
// plane climbs away. The route is drawn through the step markers as they are laid out, so it runs
// across the four columns on wide screens and down the list on narrow ones. Decorative only: the
// ordered list carries the content.
const FLIGHT_MS = 4600
const SAMPLES = 24
const WAVE = 26 // how far the route swings between two waypoints (px)

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

// A smooth curve through every point (Catmull-Rom, as cubic Bézier segments).
function spline(points) {
    return points.slice(0, -1).map((p1, i) => {
        const p0 = points[i - 1] || p1
        const p2 = points[i + 1]
        const p3 = points[i + 2] || p2
        return [
            p1,
            [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6],
            [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6],
            p2,
        ]
    })
}

function bezier([a, b, c, d], t) {
    const u = 1 - t
    return [
        u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
        u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
    ]
}

// The route through the markers' centres: its path, a length table to fly it, and how far along it
// each waypoint sits.
function planRoute(centres, width) {
    const vertical = Math.abs(centres[centres.length - 1][0] - centres[0][0]) < 40
    const points = []
    const marks = []
    centres.forEach((c, i) => {
        if (i === 0) {
            points.push(vertical ? [c[0], c[1] - 72] : [Math.min(0, c[0] - 96), c[1]])
        } else {
            const p = centres[i - 1]
            const swing = (i % 2 ? -1 : 1) * WAVE
            points.push(vertical ? [(p[0] + c[0]) / 2 + swing * 0.7, (p[1] + c[1]) / 2] : [(p[0] + c[0]) / 2, (p[1] + c[1]) / 2 + swing])
        }
        marks.push(points.length)
        points.push(c)
    })
    const last = centres[centres.length - 1]
    points.push(vertical ? [last[0] + 34, last[1] + 84] : [Math.max(width, last[0] + 96), last[1] - 64])

    const segments = spline(points)
    const f = (n) => n.toFixed(1)
    const d =
        `M${f(points[0][0])} ${f(points[0][1])}` +
        segments.map(([, b, c, e]) => `C${f(b[0])} ${f(b[1])} ${f(c[0])} ${f(c[1])} ${f(e[0])} ${f(e[1])}`).join('')

    const table = [[0, points[0][0], points[0][1]]]
    const ends = []
    let length = 0
    let prev = points[0]
    segments.forEach((segment) => {
        for (let k = 1; k <= SAMPLES; k++) {
            const p = bezier(segment, k / SAMPLES)
            length += Math.hypot(p[0] - prev[0], p[1] - prev[1])
            table.push([length, p[0], p[1]])
            prev = p
        }
        ends.push(length)
    })
    return { d, table, length, stops: marks.map((i) => ends[i - 1]) }
}

// [x, y, heading in degrees] at a distance along the route.
function locate(table, s) {
    let lo = 0
    let hi = table.length - 1
    while (hi - lo > 1) {
        const mid = (lo + hi) >> 1
        if (table[mid][0] < s) lo = mid
        else hi = mid
    }
    const a = table[lo]
    const b = table[hi]
    const t = b[0] > a[0] ? Math.min(1, Math.max(0, (s - a[0]) / (b[0] - a[0]))) : 0
    return [a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, (Math.atan2(b[2] - a[2], b[1] - a[1]) * 180) / Math.PI]
}

export default function WorksRoute({ steps }) {
    const wrapRef = useRef(null)
    const markerRefs = useRef([])
    const planeRef = useRef(null)
    const trailRef = useRef(null)
    const progressRef = useRef(0)
    const [route, setRoute] = useState(null)
    const [lit, setLit] = useState(0)
    const [landed, setLanded] = useState(false)
    const inView = useInView(wrapRef, { threshold: [0, 0.35] })
    const reduced = useReducedMotion()

    // Measure the markers and draw the route through them; again whenever the layout changes.
    useLayoutEffect(() => {
        const wrap = wrapRef.current
        if (!wrap) return undefined
        const measure = () => {
            const box = wrap.getBoundingClientRect()
            const markers = markerRefs.current.filter(Boolean)
            if (!box.width || markers.length < 2) return
            const centres = markers.map((el) => {
                const r = el.getBoundingClientRect()
                return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top]
            })
            setRoute({ w: box.width, h: box.height, ...planRoute(centres, box.width) })
        }
        measure()
        if (typeof ResizeObserver === 'undefined') return undefined
        const ro = new ResizeObserver(measure)
        ro.observe(wrap)
        return () => ro.disconnect()
    }, [steps.length])

    // Put the plane and its gold trail where the flight has got to (before paint, so nothing jumps).
    const place = (progress) => {
        progressRef.current = progress
        if (!route) return
        const s = route.length * ease(progress)
        const [x, y, heading] = locate(route.table, s)
        planeRef.current?.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${heading.toFixed(1)}) scale(1.5)`)
        trailRef.current?.setAttribute('stroke-dasharray', `${(s / route.length).toFixed(4)} 1`)
        const reached = route.stops.filter((stop) => stop <= s + 1).length
        setLit((n) => (n === reached ? n : reached))
        if (progress >= 1) setLanded(true)
    }
    const placeRef = useRef(place)
    placeRef.current = place

    useLayoutEffect(() => {
        placeRef.current(reduced ? 1 : progressRef.current)
    }, [route, reduced])

    // Fly while the route is on screen; scrolling away pauses the flight and coming back resumes it.
    useEffect(() => {
        if (!route || reduced || !inView || progressRef.current >= 1) return undefined
        let frame = 0
        let last = performance.now()
        const tick = (now) => {
            const next = Math.min(1, progressRef.current + (now - last) / FLIGHT_MS)
            last = now
            placeRef.current(next)
            if (next < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [route, reduced, inView])

    return (
        <div className={`mb-works__route${landed ? ' is-landed' : ''}`} ref={wrapRef}>
            {route && (
                <svg className="mb-works__map" width={route.w} height={route.h} viewBox={`0 0 ${route.w} ${route.h}`} aria-hidden="true" focusable="false">
                    <path className="mb-works__dash" d={route.d} />
                    <path className="mb-works__trail" d={route.d} pathLength="1" strokeDasharray="0 1" ref={trailRef} />
                    <g className="mb-works__plane" ref={planeRef}>
                        <path d={PLANE_D} />
                    </g>
                </svg>
            )}
            <ol className="mb-works__grid">
                {steps.map((step, index) => (
                    <li className={`mb-works__step${index < lit ? ' is-lit' : ''}`} key={step.number}>
                        <span
                            className="mb-works__icon"
                            aria-hidden="true"
                            ref={(el) => {
                                markerRefs.current[index] = el
                            }}
                        >
                            {step.number}
                        </span>
                        <p className="mb-works__step-title">{step.title}</p>
                        <p className="mb-works__step-body">{step.body}</p>
                    </li>
                ))}
            </ol>
        </div>
    )
}
