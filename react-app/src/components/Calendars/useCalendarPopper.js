import { useEffect, useRef } from 'react'
import { createPopper } from '@popperjs/core'
import flip from '@popperjs/core/lib/modifiers/flip.js'

/**
 * Ports Vue Teleport + @popperjs/core anchoring used by VueCalendar / DatePicker.
 */
export default function useCalendarPopper({ target, calendarCollapse, popRef, onDoCalendarCollapse, dataIndex }) {
    const popperRef = useRef(null)

    useEffect(() => {
        if (!target || !popRef.current) return undefined

        popperRef.current?.destroy()
        popperRef.current = createPopper(target, popRef.current, {
            modifiers: [flip],
            placement: 'bottom',
        })

        return () => {
            popperRef.current?.destroy()
            popperRef.current = null
        }
    }, [target, popRef])

    useEffect(() => {
        if (calendarCollapse) return undefined
        // Wait for .vs-open display:block before measuring (matches Vue watch + popper.update)
        const id = requestAnimationFrame(() => {
            popperRef.current?.update()
        })
        return () => cancelAnimationFrame(id)
    }, [calendarCollapse])

    useEffect(() => {
        if (calendarCollapse || !onDoCalendarCollapse) return undefined

        const handler = (event) => {
            if (popRef.current?.contains(event.target)) return
            onDoCalendarCollapse(event, dataIndex)
        }

        document.addEventListener('mousedown', handler)
        document.addEventListener('touchstart', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
            document.removeEventListener('touchstart', handler)
        }
    }, [calendarCollapse, onDoCalendarCollapse, dataIndex, popRef])
}
