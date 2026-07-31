import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { useAppStore } from '@/store/useAppStore'
import useCalendarPopper from './useCalendarPopper'

const formatDate = (date) => date.toLocaleDateString('fr-CH')

export default function DatePicker({
    calendarCollapse,
    minDate,
    selectReturn = false,
    onUpdateValue,
    onDoCalendarCollapse,
    target = null,
}) {
    const popRef = useRef(null)
    const appWidth = useAppStore((state) => state.appWidth)
    const [range, setRange] = useState()

    useCalendarPopper({
        target,
        calendarCollapse,
        popRef,
        onDoCalendarCollapse,
    })

    useEffect(() => {
        if (selectReturn && range?.from && !range?.to) {
            setRange({ from: range.from, to: range.from })
        }
    }, [range, selectReturn])

    const handleSelect = (nextRange) => {
        setRange(nextRange)

        if (!nextRange?.from) return

        onUpdateValue?.({
            start: formatDate(nextRange.from),
            ...(nextRange.to ? { end: formatDate(nextRange.to) } : {}),
        })
    }

    if (typeof document === 'undefined') return null

    return createPortal(
        <div ref={popRef} className={`calendar ${calendarCollapse ? '' : 'vs-open'}`}>
            <div>
                <DayPicker
                    mode="range"
                    numberOfMonths={appWidth <= 768 ? 1 : 2}
                    selected={range}
                    disabled={{ before: new Date(minDate) }}
                    onSelect={handleSelect}
                />
            </div>
        </div>,
        document.body,
    )
}
