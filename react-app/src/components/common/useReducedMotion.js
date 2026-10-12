import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

// True while the visitor asks for less motion (follows the setting live).
export default function useReducedMotion() {
    const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && Boolean(window.matchMedia?.(QUERY).matches))
    useEffect(() => {
        const mq = window.matchMedia?.(QUERY)
        if (!mq?.addEventListener) return undefined
        const onChange = () => setReduced(mq.matches)
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [])
    return reduced
}
