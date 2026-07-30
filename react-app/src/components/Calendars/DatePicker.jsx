import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

const formatDate = (date) => date.toLocaleDateString('fr-CH')

export default function DatePicker({ calendarCollapse, minDate, selectReturn = false, onUpdateValue }) {
    const [range, setRange] = useState()

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

    return (
        <div className={`calendar ${calendarCollapse ? '' : 'vs-open'}`}>
            <div>
                <DayPicker
                    mode="range"
                    numberOfMonths={window.innerWidth <= 768 ? 1 : 2}
                    selected={range}
                    disabled={{ before: new Date(minDate) }}
                    onSelect={handleSelect}
                />
            </div>
        </div>
    )
}
