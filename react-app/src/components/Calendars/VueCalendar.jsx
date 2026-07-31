import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import useCalendarPopper from './useCalendarPopper'

const formatDate = (date) => date.toLocaleDateString('fr-CH')

export default function VueCalendar({
    calendarCollapse,
    minDate,
    onUpdateValue,
    onDoCalendarCollapse,
    defaultDate = true,
    target = null,
    dataIndex = null,
}) {
    const popRef = useRef(null)
    const [selected, setSelected] = useState(defaultDate ? new Date() : undefined)

    useCalendarPopper({
        target,
        calendarCollapse,
        popRef,
        onDoCalendarCollapse,
        dataIndex,
    })

    if (typeof document === 'undefined') return null

    return createPortal(
        <div ref={popRef} className={`single-calendar ${calendarCollapse ? '' : 'vs-open'}`}>
            <div>
                <DayPicker
                    mode="single"
                    selected={selected}
                    disabled={{ before: new Date(minDate) }}
                    onSelect={(date) => {
                        if (!date) return
                        setSelected(date)
                        onUpdateValue?.(formatDate(date))
                    }}
                />
            </div>
        </div>,
        document.body,
    )
}
