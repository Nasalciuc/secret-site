import { useEffect, useRef, useState } from 'react'
import ChooseClass from './ChooseClass'
import ChoosePassengers from './ChoosePassengers'

export default function VueSelectAdaptive({ type, travelers, onSetType, onSetTravelers, className = '' }) {
    const [collapse, setCollapse] = useState(true)
    const rootRef = useRef(null)

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (!rootRef.current?.contains(event.target)) setCollapse(true)
        }

        document.addEventListener('pointerdown', handlePointerDown)
        return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [])

    return (
        <div className={`select-options-adaptive ${className}`} ref={rootRef}>
            <div className="adaptive-select-options-buttons" onClick={() => setCollapse(false)}>
                <button type="button">{type}</button>
                <button type="button">Passengers {travelers.adult + travelers.child + travelers.infant}</button>
            </div>
            <div className={`form ${collapse ? 'collapse' : 'show'}`}>
                <ChooseClass type={type} onSetType={onSetType} />
                <ChoosePassengers travelers={travelers} onSetTravelers={onSetTravelers} />
            </div>
        </div>
    )
}
