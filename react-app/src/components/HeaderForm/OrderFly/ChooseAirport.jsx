import { useEffect, useRef, useState } from 'react'
import { getAirports } from '@/services/api'

const normalizeAirport = (value) => {
    if (!value) return null
    if (typeof value === 'string') return { iata_code: value }
    return value
}

// Display-only label for a suggestion row: city plus airport name when present.
const airportLabel = (option) => {
    if (option.name && option.name !== option.city) return [option.city, option.name].filter(Boolean).join(' ')
    return option.city || option.name || ''
}

export default function ChooseAirport({ propFrom, propTo, errorFrom, errorTo, onFromChange, onToChange }) {
    const [inputFirst, setInputFirst] = useState(() => normalizeAirport(propFrom))
    const [inputSecond, setInputSecond] = useState(() => normalizeAirport(propTo))
    const [firstSearch, setFirstSearch] = useState(() => normalizeAirport(propFrom)?.iata_code || '')
    const [secondSearch, setSecondSearch] = useState(() => normalizeAirport(propTo)?.iata_code || '')
    const [optionsFirst, setOptionsFirst] = useState([])
    const [optionsSecond, setOptionsSecond] = useState([])
    const [active, setActive] = useState(null)
    const [firstInputLoading, setFirstInputLoading] = useState(false)
    const [secondInputLoading, setSecondInputLoading] = useState(false)
    const timerRef = useRef(null)

    useEffect(() => {
        const next = normalizeAirport(propFrom)
        setInputFirst(next)
        setFirstSearch(next?.iata_code || '')
    }, [propFrom])

    useEffect(() => {
        const next = normalizeAirport(propTo)
        setInputSecond(next)
        setSecondSearch(next?.iata_code || '')
    }, [propTo])

    const searchAirports = (value, isFirst) => {
        if (value.length < 3) {
            if (isFirst) setOptionsFirst([])
            else setOptionsSecond([])
            return
        }

        if (isFirst) setFirstInputLoading(true)
        else setSecondInputLoading(true)

        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(async () => {
            const [data] = await getAirports(value, isFirst ? inputSecond?.iata_code : inputFirst?.iata_code)
            if (isFirst) setFirstInputLoading(false)
            else setSecondInputLoading(false)
            if (data) {
                if (isFirst) setOptionsFirst(data)
                else setOptionsSecond(data)
            }
        }, 200)
    }

    const reverseFlights = () => {
        const temp = inputFirst
        setInputFirst(inputSecond)
        setInputSecond(temp)
        setFirstSearch(inputSecond?.iata_code || '')
        setSecondSearch(temp?.iata_code || '')
        onFromChange?.(inputSecond)
        onToChange?.(inputFirst)
    }

    const selectAirport = (option, isFirst) => {
        if (isFirst) {
            setInputFirst(option)
            setFirstSearch(option.iata_code)
            setOptionsFirst([])
            onFromChange?.(option)
            return
        }

        setInputSecond(option)
        setSecondSearch(option.iata_code)
        setOptionsSecond([])
        onToChange?.(option)
    }

    const renderOption = (option, isFirst) => (
        <li
            key={`${option.iata_code}-${option.city}-${option.country}`}
            onMouseDown={(event) => {
                event.preventDefault()
                selectAirport(option, isFirst)
            }}
        >
            {/* City-first: the primary slot (legacy .country class keeps its 14px
                size everywhere) now carries the city + airport name, the small
                secondary slot (.city class) carries the country. Data, filtering,
                and selection stay untouched; airport-primary / airport-secondary
                are styling hooks for the moodboard skin (mb-hero.scss). */}
            <div className="select-option">
                <div className="country-info">
                    <div className="country airport-primary">{airportLabel(option)}</div>
                    <div className="city airport-secondary">{option.country}</div>
                </div>
                <span className="iata">{option.iata_code}</span>
            </div>
        </li>
    )

    const renderSelect = ({ isFirst, search, setSearch, options, loading, placeholder }) => (
        <div className={`v-select vs--single vs--searchable ${isFirst ? 'first-select' : 'second-select'}`}>
            <div className="vs__dropdown-toggle">
                <div className="vs__selected-options">
                    <input
                        className="vs__search"
                        type="search"
                        placeholder={placeholder}
                        value={search}
                        autoComplete="off"
                        onChange={(e) => {
                            setSearch(e.target.value)
                            if (isFirst) {
                                setInputFirst(null)
                                onFromChange?.(null)
                            } else {
                                setInputSecond(null)
                                onToChange?.(null)
                            }
                            searchAirports(e.target.value, isFirst)
                        }}
                        onFocus={() => setActive(isFirst ? 1 : 2)}
                        onBlur={() => setActive(null)}
                    />
                </div>
                <div className="vs__actions">{loading ? <div className="vs__spinner" aria-label="Loading" /> : null}</div>
            </div>
            {options.length > 0 && <ul>{options.map((option) => renderOption(option, isFirst))}</ul>}
        </div>
    )

    return (
        <div
            className={`d-flex search-flight ${active === 1 ? 'first-active' : active === 2 ? 'second-active' : ''} ${
                errorFrom || errorTo ? 'has-error' : ''
            }`}
        >
            <div className={`airport-block ${errorFrom ? 'has-error' : ''}`}>
                <svg
                    width="20"
                    height="15"
                    viewBox="0 0 20 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon first-svg"
                >
                    <path
                        d="M11.9062 2.40179L15.125 0.745536C15.6875 0.464286 16.3125 0.308036 16.9375 0.308036H18.75C19.5938 0.308036 20.1562 1.15179 19.875 1.96429C19.3125 3.46429 18.1875 4.71429 16.7188 5.46429L8.1875 9.71429C8.0625 9.77679 7.90625 9.80804 7.75 9.80804H3.4375C3.15625 9.80804 2.875 9.68304 2.6875 9.46429L0.40625 6.80804C0.1875 6.55804 0.28125 6.18304 0.5625 6.02679L1.5625 5.52679C1.84375 5.40179 2.15625 5.40179 2.40625 5.52679L4.25 6.30804L7.3125 4.74554L2.71875 1.80804C2.40625 1.58929 2.4375 1.08929 2.78125 0.933036L4.21875 0.214286C4.6875 -0.0357143 5.28125 -0.0669643 5.8125 0.120536L11.9062 2.40179ZM0 13.808C0 13.2768 0.4375 12.808 1 12.808H19C19.5312 12.808 20 13.2768 20 13.808C20 14.3705 19.5312 14.808 19 14.808H1C0.4375 14.808 0 14.3705 0 13.808Z"
                        fill="#6F767E"
                    />
                </svg>
                {renderSelect({
                    isFirst: true,
                    search: firstSearch,
                    setSearch: setFirstSearch,
                    options: optionsFirst,
                    loading: firstInputLoading,
                    placeholder: 'From',
                })}
            </div>

            <button type="button" aria-label="reverse" className="reverse" onClick={reverseFlights}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.13806 13.5289C6.39841 13.7893 6.39841 14.2114 6.13806 14.4717C5.87771 14.7321 5.4556 14.7321 5.19525 14.4717L2.99999 12.2765C2.47929 11.7558 2.47929 10.9115 2.99999 10.3909L5.19525 8.19559C5.4556 7.93524 5.87771 7.93524 6.13806 8.19559C6.39841 8.45594 6.39841 8.87805 6.13806 9.1384L4.60947 10.667H12.6667C13.0348 10.667 13.3333 10.9655 13.3333 11.3337C13.3333 11.7018 13.0348 12.0003 12.6667 12.0003H4.60947L6.13806 13.5289Z"
                        fill="#b4853b"
                    />
                    <path
                        d="M3.33332 4C2.96513 4 2.66666 4.29848 2.66666 4.66667C2.66666 5.03486 2.96513 5.33333 3.33332 5.33333H11.3905L9.86192 6.86193C9.60157 7.12228 9.60157 7.54439 9.86192 7.80474C10.1223 8.06509 10.5444 8.06509 10.8047 7.80474L13 5.60948C13.5207 5.08878 13.5207 4.24456 13 3.72386L10.8047 1.5286C10.5444 1.26825 10.1223 1.26825 9.86192 1.5286C9.60157 1.78894 9.60157 2.21105 9.86192 2.4714L11.3905 4H3.33332Z"
                        fill="#b4853b"
                    />
                </svg>
            </button>

            <div className={`airport-block ${errorTo ? 'has-error' : ''}`}>
                <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon second-svg"
                >
                    <path
                        d="M0 5.21875V2.125C0 1.8125 0.28125 1.59375 0.59375 1.65625L1.71875 1.90625C2.03125 1.96875 2.3125 2.21875 2.4375 2.53125L3 4L6.96875 5.1875L5.65625 0.65625C5.5625 0.34375 5.8125 0 6.15625 0H7.40625C7.75 0 8.09375 0.21875 8.28125 0.53125L11.6875 6.59375L15.0312 7.5625C15.5312 7.71875 16 7.96875 16.4062 8.28125L17.4688 9.15625C18.2188 9.75 18.0312 10.9375 17.125 11.2812C15.8438 11.75 14.4375 11.8438 13.125 11.5L3.78125 9.0625C3.4375 8.96875 3.125 8.8125 2.875 8.53125L0.28125 5.9375C0.09375 5.75 0 5.5 0 5.21875ZM1 14H19C19.5312 14 20 14.4688 20 15C20 15.5625 19.5312 16 19 16H1C0.4375 16 0 15.5625 0 15C0 14.4688 0.4375 14 1 14ZM4 11.5C4 10.9688 4.4375 10.5 5 10.5C5.53125 10.5 6 10.9688 6 11.5C6 12.0625 5.53125 12.5 5 12.5C4.4375 12.5 4 12.0625 4 11.5ZM8 11C8.53125 11 9 11.4688 9 12C9 12.5625 8.53125 13 8 13C7.4375 13 7 12.5625 7 12C7 11.4688 7.4375 11 8 11Z"
                        fill="#6F767E"
                    />
                </svg>
                {renderSelect({
                    isFirst: false,
                    search: secondSearch,
                    setSearch: setSecondSearch,
                    options: optionsSecond,
                    loading: secondInputLoading,
                    placeholder: 'To',
                })}
            </div>
        </div>
    )
}
