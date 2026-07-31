import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/styles'
import { sendLead } from '@/services/api'
import { useAppStore } from '@/store/useAppStore'
import OrangeFilledButton from '@/components/common/Buttons/OrangeFilledButton'
import ChooseAirport from '@/components/HeaderForm/OrderFly/ChooseAirport'
import VueSelectAdaptive from '@/components/HeaderForm/VueSelectAdaptive'
import ChooseClass from '@/components/HeaderForm/ChooseClass'
import ChoosePassengers from '@/components/HeaderForm/ChoosePassengers'

const DatePicker = lazy(() => import('@/components/Calendars/DatePicker'))
const VueCalendar = lazy(() => import('@/components/Calendars/VueCalendar'))

const emptyErrors = {
    airportFrom: null,
    airportTo: null,
    departureDate: null,
    returnDate: null,
    phone: null,
    email: null,
    name: null,
}

const toDisplayDate = (value) => {
    if (!value || value === 'null') return null
    if (value.includes('.')) return value
    const [y, m, d] = value.split('-')
    if (!y || !m || !d) return value
    return `${d}.${m}.${y}`
}

const toIsoDate = (value) => {
    if (!value || value === 'null') return ''
    if (value.includes('-') && !value.includes('.')) return value
    return value.split('.').reverse().join('-')
}

const CalendarIcon = ({ fill = false }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={fill ? 'fill' : ''}>
        <path
            d="M2 13C2 12.4477 2.44772 12 3 12H21C21.5523 12 22 12.4477 22 13V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V13Z"
            fill={fill ? '#b4853b' : '#6F767E'}
        />
        <path
            d="M7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4H19C20.6569 4 22 5.34315 22 7V9C22 9.55228 21.5523 10 21 10H3C2.44772 10 2 9.55228 2 9V7C2 5.34315 3.34315 4 5 4H6V3C6 2.44772 6.44772 2 7 2Z"
            fill={fill ? '#b4853b' : '#6F767E'}
        />
    </svg>
)

export default function BlackFridaySearch({
    propClass = 'Business Class',
    propCalendar = null,
    propDatepicker = { start: null, end: null },
    propFrom = '',
    propTo = '',
    propTravelers = { adult: 1, child: 0, infant: 0 },
    propType = 'round_trip',
    onSuccess,
}) {
    const location = useLocation()
    const navigate = useNavigate()
    const { setModal } = useAppStore()
    const phoneRef = useRef(null)
    const itiRef = useRef(null)
    const rootRef = useRef(null)
    const [calendarTarget, setCalendarTarget] = useState(null)

    const [flight, setFlight] = useState(propType === 'one_way' ? 'One Way' : 'Round Trip')
    const [type, setType] = useState(propClass)
    const [travelers, setTravelers] = useState(propTravelers)
    const [fromAirport, setFromAirport] = useState(typeof propFrom === 'object' ? propFrom : propFrom ? { iata_code: propFrom } : null)
    const [toAirport, setToAirport] = useState(typeof propTo === 'object' ? propTo : propTo ? { iata_code: propTo } : null)
    const [calendarCollapse, setCalendarCollapse] = useState(true)
    const [selectReturn, setSelectReturn] = useState(false)
    const [singleDatePicker, setSingleDatePicker] = useState(toDisplayDate(propCalendar))
    const [multiDatePicker, setMultiDatePicker] = useState({
        start: toDisplayDate(propDatepicker?.start),
        end: toDisplayDate(propDatepicker?.end),
    })
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [valid, setValid] = useState(null)
    const [showPassengers, setShowPassengers] = useState(false)
    const [showClass, setShowClass] = useState(false)
    const [sms, setSms] = useState(false)
    const [formErrors, setFormErrors] = useState(emptyErrors)
    const [tripOpen, setTripOpen] = useState(false)

    useEffect(() => {
        setFlight(propType === 'one_way' ? 'One Way' : 'Round Trip')
    }, [propType])

    useEffect(() => {
        setType(propClass)
    }, [propClass])

    useEffect(() => {
        setFromAirport(typeof propFrom === 'object' ? propFrom : propFrom ? { iata_code: propFrom } : null)
    }, [propFrom])

    useEffect(() => {
        setToAirport(typeof propTo === 'object' ? propTo : propTo ? { iata_code: propTo } : null)
    }, [propTo])

    useEffect(() => {
        if (!phoneRef.current || itiRef.current) return

        itiRef.current = intlTelInput(phoneRef.current, {
            loadUtils: () => import('intl-tel-input/utils'),
            initialCountry: 'us',
            countryOrder: ['us', 'gb', 'ca', 'au'],
            separateDialCode: true,
            autoPlaceholder: 'aggressive',
            formatOnDisplay: true,
        })

        const refresh = () => {
            const iti = itiRef.current
            if (!iti) {
                setValid(null)
                return
            }
            const isValid = iti.isValidNumber() === true
            setValid(isValid)
            if (isValid) setFormErrors((current) => ({ ...current, phone: null }))
        }

        phoneRef.current.addEventListener('countrychange', refresh)
        phoneRef.current.addEventListener('input', refresh)
        phoneRef.current.addEventListener('change', refresh)

        return () => {
            phoneRef.current?.removeEventListener('countrychange', refresh)
            phoneRef.current?.removeEventListener('input', refresh)
            phoneRef.current?.removeEventListener('change', refresh)
            itiRef.current?.destroy()
            itiRef.current = null
        }
    }, [])

    useEffect(() => {
        const onPointerDown = (event) => {
            const inCalendar = event.target.closest?.('.calendar, .single-calendar, .rdp')
            if (!rootRef.current?.contains(event.target) && !inCalendar) {
                setShowClass(false)
                setShowPassengers(false)
                setTripOpen(false)
            }
        }
        document.addEventListener('pointerdown', onPointerDown)
        return () => document.removeEventListener('pointerdown', onPointerDown)
    }, [])

    const openCalendar = (asReturn = false) => {
        setShowClass(false)
        setShowPassengers(false)
        setTripOpen(false)
        setCalendarCollapse(false)
        setSelectReturn(asReturn)
    }

    const doCalendarCollapse = (event) => {
        if (!calendarCollapse && !event.target.closest?.('.calendar-buttons')) {
            setCalendarCollapse(true)
            setSelectReturn(false)
        }
    }

    const updateMultiDatePicker = (date) => {
        if (date.start === 'Invalid Date' || date.end === 'Invalid Date') return
        setMultiDatePicker((current) => ({ ...current, ...date }))
        if (date.start && date.end) {
            setCalendarCollapse(true)
            setSelectReturn(false)
        }
    }

    const showError = (body, title = 'Validation error') => {
        setModal({ display: true, status: 'error', title, body })
    }

    const proceedLead = async () => {
        setFormErrors(emptyErrors)

        const flights = [
            {
                from: fromAirport?.iata_code || propFrom,
                to: toAirport?.iata_code || propTo,
                date: toIsoDate(flight === 'Round Trip' ? multiDatePicker?.start : singleDatePicker),
            },
        ]

        if (flight === 'Round Trip') {
            flights.push({
                from: toAirport?.iata_code || propTo,
                to: fromAirport?.iata_code || propFrom,
                date: toIsoDate(multiDatePicker?.end),
            })
        }

        const phoneE164 = (itiRef.current?.getNumber?.() || phoneRef.current?.value || '').replace(/ /g, '')
        const client = {
            phone: phoneE164,
            name,
            email,
        }

        const [result, error] = await sendLead({
            client,
            flights,
            phone_valid: valid,
            passengers: travelers,
            sms,
            trip_type: flight.toLowerCase().replace(/ /g, '_'),
            cabin_class: type.toLowerCase().replace(/ /g, '_').replace(/_class/, ''),
        })

        if (error?.type === 'validation') {
            setFormErrors((current) => ({ ...current, [error.input]: true }))
            showError(error.message)
            return
        }

        if (error !== null) {
            showError('Something went wrong', 'Request failed')
            return
        }

        if (result?.data?.success) {
            if (location.pathname === '/flight' && location.search) {
                onSuccess?.(true)
                return
            }

            localStorage.setItem('success', 'true')
            navigate('/flight')
        }
    }

    return (
        <div className="second-block flight-card-header seasonal-search" ref={rootRef}>
            <div className="content">
                <div className="d-flex flight-options">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="first-svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.5 13L0.5 11.2361C0.5 10.2891 1.03501 9.42348 1.88197 9L7.22361 6.32918C7.393 6.24448 7.5 6.07135 7.5 5.88197L7.5 2.5C7.5 1.11929 8.61929 9.68215e-08 10 1.13286e-07C11.3807 1.29751e-07 12.5 1.11929 12.5 2.5L12.5 5.88197C12.5 6.07135 12.607 6.24448 12.7764 6.32918L18.118 9C18.965 9.42348 19.5 10.2891 19.5 11.2361L19.5 13C19.5 13.1584 19.4249 13.3075 19.2976 13.4018C19.1703 13.4961 19.0059 13.5245 18.8543 13.4783L12.8228 11.6416C12.6622 11.5927 12.5 11.7129 12.5 11.8808L12.5 14.5C12.5 14.6574 12.5741 14.8056 12.7 14.9L13.9 15.8C14.2777 16.0833 14.5 16.5279 14.5 17L14.5 19.5C14.5 19.6733 14.4103 19.8342 14.2629 19.9253C14.1155 20.0164 13.9314 20.0247 13.7764 19.9472L10 18.059L6.22361 19.9472C6.06861 20.0247 5.88454 20.0164 5.73713 19.9253C5.58973 19.8342 5.5 19.6733 5.5 19.5L5.5 17C5.5 16.5279 5.72229 16.0833 6.1 15.8L7.3 14.9C7.4259 14.8056 7.5 14.6574 7.5 14.5L7.5 11.8808C7.5 11.7129 7.33779 11.5927 7.17717 11.6416L1.14565 13.4783C0.994106 13.5245 0.829657 13.4961 0.702365 13.4018C0.575073 13.3075 0.5 13.1584 0.5 13Z"
                            fill="#6F767E"
                        />
                    </svg>
                    <div className={`v-select first-select trip-type-select ${tripOpen ? 'open' : ''}`}>
                        <button
                            type="button"
                            className="vs__dropdown-toggle"
                            onClick={() => {
                                setCalendarCollapse(true)
                                setTripOpen((open) => !open)
                            }}
                        >
                            <span className="vs__selected">{flight}</span>
                        </button>
                        {tripOpen && (
                            <ul>
                                {['Round Trip', 'One Way'].map((option) => (
                                    <li
                                        key={option}
                                        onMouseDown={(event) => {
                                            event.preventDefault()
                                            setFlight(option)
                                            setTripOpen(false)
                                            setCalendarCollapse(true)
                                        }}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="adaptive-select-options-buttons">
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation()
                                setShowClass(true)
                                setShowPassengers(false)
                                setCalendarCollapse(true)
                                setSelectReturn(false)
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="first-svg">
                                <path
                                    d="M7.002 5V8.5C7.002 8.71875 7.03328 8.90625 7.09584 9.09375L7.5025 10H15.01C15.5418 10 16.011 10.4688 16.011 11C16.011 11.5625 15.5418 12 15.01 12H8.37837L8.78503 13H18.013C18.3884 13 18.7325 13.2188 18.8889 13.5625C19.0766 13.9062 19.014 14.3125 18.795 14.625L17.4499 16.4062C17.1684 16.7812 16.7305 17 16.2612 17H13.2582V18.5H16.2612C16.6679 18.5 17.012 18.8438 17.012 19.25C17.012 19.6875 16.6679 20 16.2612 20H8.75375C8.31581 20 8.003 19.6875 8.003 19.25C8.003 18.8438 8.31581 18.5 8.75375 18.5H11.7567V17H10.3178C9.09784 17 8.03428 16.3125 7.56506 15.1875L5.28153 9.875C5.09384 9.4375 5 8.96875 5 8.5V5C5 4.46875 5.43794 4 6.001 4C6.53278 4 7.002 4.46875 7.002 5Z"
                                    fill="#6F767E"
                                />
                            </svg>
                            <span className="class">{type}</span>
                        </button>
                    </div>
                    <ChooseClass
                        type={type}
                        className={showClass ? 'show' : 'hide'}
                        onSetType={(next) => {
                            setType(next)
                            setShowClass(false)
                        }}
                    />
                </div>

                <ChooseAirport
                    propFrom={fromAirport}
                    propTo={toAirport}
                    errorFrom={formErrors.airportFrom}
                    errorTo={formErrors.airportTo}
                    onFromChange={setFromAirport}
                    onToChange={setToAirport}
                />

                <div
                    ref={setCalendarTarget}
                    className={`d-flex calendar-buttons ${flight === 'Round Trip' ? 'round-trip' : ''} ${
                        !calendarCollapse ? 'active' : 'disabled'
                    } ${
                        flight === 'Round Trip' && (formErrors.departureDate || formErrors.returnDate) ? 'has-error' : ''
                    } ${flight !== 'Round Trip' && formErrors.departureDate ? 'has-error' : ''}`}
                >
                    <button type="button" onClick={() => openCalendar(false)} className={formErrors.departureDate ? 'has-error' : ''}>
                        <CalendarIcon fill={Boolean(flight === 'One Way' ? singleDatePicker : multiDatePicker?.start)} />
                        {flight === 'One Way' ? singleDatePicker || 'Departure' : multiDatePicker?.start || 'Departure'}
                    </button>
                    {flight === 'Round Trip' && (
                        <button
                            type="button"
                            className={formErrors.returnDate ? 'has-error' : ''}
                            onClick={() => openCalendar(true)}
                        >
                            <CalendarIcon fill={Boolean(multiDatePicker?.end)} />
                            {multiDatePicker?.end || 'Select return'}
                        </button>
                    )}
                    <VueSelectAdaptive type={type} travelers={travelers} onSetType={setType} onSetTravelers={setTravelers} />
                </div>

                <div className="d-flex travellers">
                    <div className="adaptive-select-options-buttons">
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation()
                                setShowPassengers(true)
                                setShowClass(false)
                                setCalendarCollapse(true)
                                setSelectReturn(false)
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="second-svg">
                                <path
                                    d="M1 17V20C1 20.5523 1.44772 21 2 21H16C16.5523 21 17 20.5523 17 20V17C17 14.7909 15.2091 13 13 13H5C2.79086 13 1 14.7909 1 17Z"
                                    fill="#6F767E"
                                />
                                <path
                                    d="M18.984 20.3118C18.9486 20.655 19.1913 21 19.5363 21H22C22.5523 21 23 20.5523 23 20V17C23 14.7909 21.2092 13 19 13H18.0315C17.8154 13 17.6968 13.2597 17.8254 13.4334C18.5635 14.4304 19 15.6642 19 17V20C19 20.1053 18.9946 20.2093 18.984 20.3118Z"
                                    fill="#6F767E"
                                />
                                <path d="M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" fill="#6F767E" />
                                <path
                                    d="M14.3508 10.9476C14.01 10.892 13.8938 10.4893 14.0781 10.1973C14.6621 9.2717 15 8.17531 15 7C15 5.82469 14.6621 4.7283 14.0781 3.80271C13.8938 3.51073 14.01 3.10804 14.3508 3.05242C14.5621 3.01793 14.7789 3 15 3C17.2091 3 19 4.79086 19 7C19 9.20914 17.2091 11 15 11C14.7789 11 14.5621 10.9821 14.3508 10.9476Z"
                                    fill="#6F767E"
                                />
                            </svg>
                            <span>{`Passengers ${travelers.adult + travelers.child + travelers.infant}`}</span>
                        </button>
                    </div>
                    <ChoosePassengers
                        travelers={travelers}
                        className={showPassengers ? 'show' : 'hide'}
                        onSetTravelers={setTravelers}
                    />
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`name ${formErrors.name ? 'invalid-svg' : ''}`}
                    >
                        <path
                            d="M3 18V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V18C21 15.2386 18.7614 13 16 13H8C5.23858 13 3 15.2386 3 18Z"
                            fill="#6F767E"
                        />
                        <circle cx="12" cy="6.5" r="4.5" fill="#6F767E" />
                    </svg>
                    <div className={`input-container ${formErrors.name ? 'has-error' : ''}`}>
                        <input name="name" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                </div>

                <div className="d-flex client-info">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={formErrors.email ? 'invalid-svg' : ''}>
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C13.279 20 14.4852 19.7006 15.555 19.169C16.0495 18.9232 16.6497 19.1249 16.8955 19.6194C17.1413 20.114 16.9396 20.7142 16.445 20.96C15.1049 21.626 13.5947 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V13C22 14.409 21.6473 15.5353 20.987 16.3277C20.3167 17.132 19.4033 17.5 18.5 17.5C17.2731 17.5 16.0324 16.8089 15.4101 15.6567C14.5168 16.4901 13.318 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C13.1256 7 14.1643 7.37194 15 7.99963C15.0002 7.44752 15.4478 7 16 7C16.5523 7 17 7.44772 17 8V12V14C17 14.8839 17.7362 15.5 18.5 15.5C18.8467 15.5 19.1833 15.368 19.4505 15.0473C19.7277 14.7147 20 14.091 20 13V12C20 7.58172 16.4183 4 12 4ZM15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                            fill="#6F767E"
                        />
                    </svg>
                    <div className={`iti-group ${valid === true ? 'valid' : ''} ${valid === false ? 'not-valid' : ''} ${formErrors.phone ? 'has-error' : ''}`}>
                        <input ref={phoneRef} type="tel" autoComplete="tel" />
                    </div>
                    <div className={`input-container ${formErrors.email ? 'has-error' : ''}`}>
                        <input name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                </div>

                <OrangeFilledButton buttonText="Get a Free Quote" click={proceedLead} />

                <div className="sms-toggle">
                    <label className="switch">
                        <input type="checkbox" checked={sms} onChange={(event) => setSms(event.target.checked)} />
                        <span className="slider round" />
                    </label>
                    <span className="label-text">Send my price quotes by SMS</span>
                </div>
                <div className="privacy-text">
                    By clicking this button, you agree to receive SMS notifications from BuyBusinessClass
                </div>
                <div className="privacy-text">
                    By submitting, you agree to our <Link to="/privacy">Privacy Policy</Link> and consent to receive SMS.
                </div>
            </div>

            <Suspense fallback={null}>
                {flight === 'One Way' ? (
                    <VueCalendar
                        target={calendarTarget}
                        calendarCollapse={calendarCollapse}
                        minDate={Date.now()}
                        defaultDate={false}
                        onUpdateValue={(date) => {
                            setSingleDatePicker(date)
                            setCalendarCollapse(true)
                        }}
                        onDoCalendarCollapse={doCalendarCollapse}
                    />
                ) : (
                    <DatePicker
                        target={calendarTarget}
                        calendarCollapse={calendarCollapse}
                        selectReturn={selectReturn}
                        minDate={Date.now()}
                        onUpdateValue={updateMultiDatePicker}
                        onDoCalendarCollapse={doCalendarCollapse}
                    />
                )}
            </Suspense>
        </div>
    )
}
