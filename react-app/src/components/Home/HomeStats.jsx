import { useEffect, useRef, useState } from 'react'
import useInView from '@/components/common/useInView'
import useReducedMotion from '@/components/common/useReducedMotion'

// Betty's four figure cards with her fixed figures (as she wants them): 52k+ happy travelers, $1,240
// average savings, 87 countries, 99% recommend us (the 99% in green, as in her design). Each figure
// is set in split-flap tiles, like a departures board: the digits spin and settle one after another
// when the cards come into view (at once for reduced motion).
const FLAP_MS = 60
const SETTLE_MS = 650
const STAGGER_MS = 120

function Flaps({ value, run, delay }) {
    const reduced = useReducedMotion()
    const blank = (chars) => chars.map((ch) => (/\d/.test(ch) ? '' : ch))
    const [tiles, setTiles] = useState(() => blank([...value]))

    useEffect(() => {
        const chars = [...value]
        if (reduced) {
            setTiles(chars)
            return undefined
        }
        if (!run) {
            setTiles(blank(chars))
            return undefined
        }
        let frame = 0
        let flipped = 0
        const start = performance.now() + delay
        const tick = (now) => {
            if (now - flipped >= FLAP_MS) {
                flipped = now
                const t = now - start
                let spinning = false
                setTiles(
                    chars.map((ch, i) => {
                        if (!/\d/.test(ch) || t >= SETTLE_MS + i * STAGGER_MS) return ch
                        spinning = true
                        return t < 0 ? '' : String(Math.floor(Math.random() * 10))
                    }),
                )
                if (!spinning) return
            }
            frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [value, run, delay, reduced])

    return (
        <span className="hp-flaps" aria-hidden="true">
            {tiles.map((ch, i) => (
                <span className={`hp-flap${/\d/.test(value[i] || '') ? '' : ' hp-flap--mark'}`} key={i}>
                    {ch}
                </span>
            ))}
        </span>
    )
}

// Betty's figures, fixed.
const STATS = [
    { key: 'travelers', value: '52k+', label: 'Happy travelers' },
    { key: 'savings', value: '$1,240', label: 'Avg savings' },
    { key: 'countries', value: '87', label: 'Countries' },
    { key: 'recommend', value: '99%', label: 'Recommend us', green: true },
]

export default function HomeStats() {
    const ref = useRef(null)
    const inView = useInView(ref, { threshold: 0.4, once: true })

    return (
        <section className="hp-stats" aria-label="BuyBusinessClass in figures" ref={ref}>
            <ul className="hp-wrap hp-stats__grid">
                {STATS.map((stat, index) => (
                    <li className={`hp-stat${stat.green ? ' hp-stat--green' : ''}`} key={stat.key}>
                        <span className="hp-stat__value">
                            <span className="sr-only">{stat.value}</span>
                            <Flaps value={stat.value} run={inView} delay={index * 140} />
                        </span>
                        <span className="hp-stat__label">{stat.label}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
