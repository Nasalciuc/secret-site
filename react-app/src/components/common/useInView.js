import { useEffect, useState } from 'react'

// True while the element is on screen (or, with `once`, from the first time it shows up).
// Without IntersectionObserver the element simply counts as visible.
export default function useInView(ref, { threshold = 0.25, once = false } = {}) {
    const [inView, setInView] = useState(false)
    const key = Array.isArray(threshold) ? threshold.join(',') : String(threshold)

    useEffect(() => {
        const el = ref.current
        if (!el) return undefined
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true)
            return undefined
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting)
                if (entry.isIntersecting && once) io.disconnect()
            },
            { threshold: key.split(',').map(Number) },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [ref, key, once])

    return inView
}
