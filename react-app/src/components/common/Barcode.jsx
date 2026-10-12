// A boarding-pass barcode, drawn from a seed (a name, a route) so every pass gets its own. Decorative.
export default function Barcode({ seed, className = '' }) {
    let h = 2166136261
    for (const ch of String(seed)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0
    const bars = []
    let x = 0
    while (x < 88) {
        h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0
        const width = 1 + ((h >>> 3) & 3) * 0.7
        bars.push(<rect key={bars.length} x={x.toFixed(2)} width={width.toFixed(2)} height="30" />)
        x += width + 1.2 + ((h >>> 7) & 3) * 0.7
    }
    return (
        <svg className={className} viewBox="0 0 88 30" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            {bars}
        </svg>
    )
}
