import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { useState } from 'react'

const formatDate = (date) => date.toLocaleDateString('fr-CH')

export default function VueCalendar({ calendarCollapse, minDate, onUpdateValue, defaultDate = true }) {
    const [selected, setSelected] = useState(defaultDate ? new Date() : undefined)

    return (
        <div className={`single-calendar ${calendarCollapse ? '' : 'vs-open'}`}>
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
        </div>
    )
}
