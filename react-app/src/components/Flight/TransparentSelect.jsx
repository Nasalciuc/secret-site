import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Chevron = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.79289 8.54289C5.18342 8.15237 5.81658 8.15237 6.20711 8.54289L12 14.3358L17.7929 8.54289C18.1834 8.15237 18.8166 8.15237 19.2071 8.54289C19.5976 8.93341 19.5976 9.56658 19.2071 9.9571L13.4142 15.75C12.6332 16.531 11.3668 16.531 10.5858 15.75L4.79289 9.95711C4.40237 9.56658 4.40237 8.93342 4.79289 8.54289Z"
            fill="#C2C7CC"
        />
    </svg>
)

export default function TransparentSelect({ options = [], value = '', label = 'label', link = false, className = '' }) {
    const [open, setOpen] = useState(false)
    const rootRef = useRef(null)

    useEffect(() => {
        const close = (event) => {
            if (!rootRef.current?.contains(event.target)) setOpen(false)
        }
        document.addEventListener('pointerdown', close)
        return () => document.removeEventListener('pointerdown', close)
    }, [])

    return (
        <div className={`v-select transparent-vselect ${className} ${open ? 'vs--open' : ''}`} ref={rootRef}>
            <button type="button" className="vs__dropdown-toggle" onClick={() => setOpen((current) => !current)}>
                <span className="vs__selected-options">
                    <span className="vs__selected">{value}</span>
                    <span className="vs__search" />
                </span>
                <span className="vs__actions">
                    <Chevron />
                </span>
            </button>
            {open && (
                <ul className="vs__dropdown-menu">
                    {options.map((option) => {
                        const text = option?.[label] ?? option?.name ?? ''
                        const to = link ? `${link}/${String(option?.name ?? '').toLowerCase()}/${option?.id}` : undefined

                        return (
                            <li key={`${className}-${option?.id ?? text}`}>
                                {to ? <Link to={to}>{text}</Link> : <button type="button">{text}</button>}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
