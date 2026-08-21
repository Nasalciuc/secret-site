import { Fragment, lazy, Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import { searchFlight, sendLead } from '@/services/api'
import { formatUsDate } from '@/utils/dateDisplay'

const DatePicker = lazy(() => import('@/components/Calendars/DatePicker'))
const VueCalendar = lazy(() => import('@/components/Calendars/VueCalendar'))
import OrangeFilledButton from '@/components/common/Buttons/OrangeFilledButton'
import TransparentButton from '@/components/common/Buttons/TransparentButton'
import VueSelectAdaptive from '../VueSelectAdaptive'
import ChooseAirport from './ChooseAirport'
import ChooseProperties from './ChooseProperties'
import ClientInfo from './ClientInfo'

const initialTravelers = { adult: 1, child: 0, infant: 0 }
const emptyFormErrors = { airportFrom: null, airportTo: null, departureDate: null, returnDate: null }
const emptyMultiErrors = { phone: null, email: null, name: null, airportFrom: null, airportTo: null, departureDate: null, index: 0 }

const CalendarIcon = ({ fill }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={fill ? 'fill' : ''}>
        <path d="M2 13C2 12.4477 2.44772 12 3 12H21C21.5523 12 22 12.4477 22 13V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V13Z" fill="#6F767E" />
        <path d="M7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4H19C20.6569 4 22 5.34315 22 7V9C22 9.55228 21.5523 10 21 10H3C2.44772 10 2 9.55228 2 9V7C2 5.34315 3.34315 4 5 4H6V3C6 2.44772 6.44772 2 7 2Z" fill="#6F767E" />
    </svg>
)

const cabinClassToQuery = (type) => type.toLowerCase().replace(/ /g, '_').replace(/_class/, '')
const toIsoDate = (date) => date?.split('.')?.reverse()?.join('-')
const parseFrDate = (date) => {
    if (!date) return Date.now()
    const [dd, mm, yyyy] = date.split('.')
    return new Date(yyyy, Number(mm) - 1, dd).getTime()
}

const isCalendarButtonsClick = (event) => Boolean(event.target.closest?.('.calendar-buttons'))

export default function OrderFly() {
    const navigate = useNavigate()
    const { appWidth, setModal, setQuoteLoading, setFlightPrices, setDestinationsFlights } = useAppStore()

    const [roundTripDateTarget, setRoundTripDateTarget] = useState(null)
    const [oneWayDateTarget, setOneWayDateTarget] = useState(null)
    const [multiDateTargets, setMultiDateTargets] = useState([])

    const [currentPage, setCurrentPage] = useState('round_trip')
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [type, setType] = useState('Business Class')
    const [travelers, setTravelers] = useState(initialTravelers)
    const [calendarCollapse, setCalendarCollapse] = useState(true)
    const [selectReturn, setSelectReturn] = useState(false)
    const [singleDatePicker, setSingleDatePicker] = useState(null)
    const [multiDatePicker, setMultiDatePicker] = useState({ start: null, end: null })
    const [multiFlights, setMultiFlights] = useState([{ collapse: true }, { collapse: true }])
    const [formErrors, setFormErrors] = useState(emptyFormErrors)
    const [multiFormErrors, setMultiFormErrors] = useState(emptyMultiErrors)

    const showModal = (body, title = 'Form error') => {
        setModal({ display: true, status: 'error', title, body })
    }

    // Display-only: drop a field's error flag as soon as the user fixes it.
    // Validation rules and submit blocking in searchFlightHandler are untouched.
    const clearFormError = (field) => {
        setFormErrors((current) => (current[field] ? { ...current, [field]: null } : current))
    }

    const clearMultiFormError = (index, field) => {
        setMultiFormErrors((current) => (current.index === index && current[field] ? { ...current, [field]: null } : current))
    }

    const updateFrom = (airport) => {
        setFrom(airport)
        if (airport?.iata_code) clearFormError('airportFrom')
    }

    const updateTo = (airport) => {
        setTo(airport)
        if (airport?.iata_code) clearFormError('airportTo')
    }

    const changePage = (page) => {
        setCurrentPage(page)
        setFormErrors(emptyFormErrors)
        setMultiFormErrors(emptyMultiErrors)
        setCalendarCollapse(true)
        setSelectReturn(false)
        setMultiFlights((current) => current.map((flight) => ({ ...flight, collapse: true })))
    }

    const openCalendar = () => {
        setCalendarCollapse(false)
        setMultiFlights((current) => current.map((flight) => ({ ...flight, collapse: true })))
    }

    const doCalendarCollapse = (event, index) => {
        if (index !== undefined && index !== null) {
            setMultiFlights((current) => {
                if (current.length <= +index || current[index].collapse || isCalendarButtonsClick(event)) {
                    return current
                }
                return current.map((flight, flightIndex) => (flightIndex === index ? { ...flight, collapse: true } : flight))
            })
            return
        }

        if (!calendarCollapse && !isCalendarButtonsClick(event)) {
            setCalendarCollapse(true)
            setSelectReturn(false)
        }
    }

    const updateMultiDatePicker = (date) => {
        if (date.start === 'Invalid Date' || date.end === 'Invalid Date') return

        setMultiDatePicker((current) => ({ ...current, ...date }))
        if (date.start) clearFormError('departureDate')
        if (date.end) clearFormError('returnDate')
        if (date.start && date.end) {
            setCalendarCollapse(true)
            setSelectReturn(false)
        }
    }

    const updateMultiFlight = (index, values) => {
        setMultiFlights((current) => current.map((flight, flightIndex) => (flightIndex === index ? { ...flight, ...values } : flight)))
    }

    const updateMultiFlightDate = (date, index) => {
        if (date) clearMultiFormError(index, 'departureDate')
        setMultiFlights((current) => {
            const selectedTime = parseFrDate(date)
            const next = current.map((flight, flightIndex) => (flightIndex === index ? { ...flight, date, collapse: true } : flight))

            return next.map((flight, flightIndex) => {
                if (flightIndex <= index || !flight.date) return flight
                return parseFrDate(flight.date) < selectedTime ? { ...flight, date } : flight
            })
        })
    }

    const showCalendar = (index) => {
        setCalendarCollapse(true)
        setSelectReturn(false)
        setMultiFlights((current) => current.map((flight, flightIndex) => ({ ...flight, collapse: flightIndex !== index })))
    }

    const searchFlightHandler = async () => {
        setFormErrors(emptyFormErrors)

        if (!from?.iata_code) {
            setFormErrors((current) => ({ ...current, airportFrom: true }))
            showModal('Departure airport is mandatory!')
            return
        }
        if (!to?.iata_code) {
            setFormErrors((current) => ({ ...current, airportTo: true }))
            showModal('Destination airport is mandatory!')
            return
        }
        if (currentPage === 'round_trip' && !multiDatePicker.start) {
            setFormErrors((current) => ({ ...current, departureDate: true }))
            showModal('Departure date is mandatory!')
            return
        }
        if (currentPage === 'one_way' && !singleDatePicker) {
            setFormErrors((current) => ({ ...current, departureDate: true }))
            showModal('Departure date is mandatory!')
            return
        }
        if (currentPage === 'round_trip' && !multiDatePicker.end) {
            setFormErrors((current) => ({ ...current, returnDate: true }))
            showModal('Return date is mandatory!')
            return
        }

        setQuoteLoading({ loading: true, from: from.iata_code, to: to.iata_code })

        const [result, error] = await searchFlight(from.iata_code, to.iata_code, currentPage)

        if (result === null && error !== 'Offer not found') {
            setQuoteLoading({ loading: false })
            showModal(error, 'Request error')
            return
        }

        if (result) delete result.premium_economy
        setFlightPrices(result || true)
        setDestinationsFlights({ from, to })

        const params = new URLSearchParams({
            cabin_class: cabinClassToQuery(type),
            trip_type: currentPage,
            fly_from: from.iata_code,
            fly_to: to.iata_code,
            adults: travelers.adult,
            childrens: travelers.child,
            infants: travelers.infant,
            depart_at: toIsoDate(currentPage === 'round_trip' ? multiDatePicker.start : singleDatePicker),
        })

        if (currentPage === 'round_trip') params.set('return_at', toIsoDate(multiDatePicker.end))

        navigate({ pathname: '/flight', search: `?${params.toString()}` })
    }

    const proceedLead = async (clientData) => {
        setMultiFormErrors(emptyMultiErrors)

        const [result, error] = await sendLead({
            ...clientData,
            trip_type: 'multi_city',
            flights: multiFlights.map((flight) => ({
                from: flight.from?.iata_code,
                to: flight.to?.iata_code,
                date: flight.date,
            })),
        })

        if (error?.type === 'validation') {
            setMultiFormErrors((current) => ({
                ...current,
                index: error.index ?? 0,
                [error.input]: true,
            }))
            showModal(error.message, 'Validation error')
            return
        }

        if (error !== null) {
            showModal('Something went wrong', 'Request failed')
            return
        }

        if (result?.data?.success) {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
                event: 'ec_form_submit',
                user_data: {
                    email: clientData?.client?.email,
                    phone_number: clientData?.client?.phone?.replace(/\s+/g, ''),
                },
            })
            localStorage.setItem('success', true)
            navigate('/flight')
        }
    }

    const addFlight = () => {
        setMultiFlights((current) => (current.length >= 5 ? current : [...current, { collapse: true }]))
    }

    const removeFlight = (index) => {
        setMultiFlights((current) => current.filter((_, flightIndex) => flightIndex !== index))
    }

    return (
        <div className="header-form order-fly xyz-in" xyz="fade small delay-5">
            <div className="choose-option xyz-nested">
                <button type="button" onClick={() => changePage('round_trip')} className={currentPage === 'round_trip' ? 'active' : ''}>
                    Round Trip
                </button>
                <button type="button" onClick={() => changePage('one_way')} className={currentPage === 'one_way' ? 'active' : ''}>
                    One Way
                </button>
                <button type="button" onClick={() => changePage('multi_city')} className={currentPage === 'multi_city' ? 'active' : ''}>
                    Multi City
                </button>
            </div>
            <div className="content xyz-nested">
                {currentPage === 'round_trip' && (
                    <div className="round-trip">
                        <ChooseAirport propFrom={from} propTo={to} errorFrom={formErrors.airportFrom} errorTo={formErrors.airportTo} onFromChange={updateFrom} onToChange={updateTo} />
                        {(formErrors.airportFrom || formErrors.airportTo) && (
                            <p className="mb-form-error" role="alert">
                                Please add your departure and destination cities.
                            </p>
                        )}
                        <div
                            ref={setRoundTripDateTarget}
                            className={`d-flex calendar-buttons round-trip xyz-nested ${!calendarCollapse ? 'active' : 'disabled'} ${formErrors.departureDate || formErrors.returnDate ? 'has-error' : ''}`}
                        >
                            <button type="button" onClick={openCalendar} className={`date-button first-button ${formErrors.departureDate ? 'has-error' : ''}`}>
                                <CalendarIcon fill={Boolean(multiDatePicker.start)} />
                                {multiDatePicker.start ? formatUsDate(multiDatePicker.start) : 'Select departure'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    openCalendar()
                                    setSelectReturn(true)
                                }}
                                className={`date-button second-button ${formErrors.returnDate ? 'has-error' : ''}`}
                            >
                                <CalendarIcon fill={Boolean(multiDatePicker.end)} />
                                {multiDatePicker.end ? formatUsDate(multiDatePicker.end) : 'Select return'}
                            </button>
                        </div>
                        {(formErrors.departureDate || formErrors.returnDate) && (
                            <p className="mb-form-error" role="alert">
                                Please pick your travel dates.
                            </p>
                        )}
                        <ChooseProperties
                            propType={type}
                            propTravelers={travelers}
                            onTypeChange={setType}
                            onTravelersChange={setTravelers}
                            onOpenOverlay={() => {
                                setCalendarCollapse(true)
                                setSelectReturn(false)
                            }}
                        />
                        <OrangeFilledButton className="xyz-nested show search-submit" buttonText="Search Flight" click={searchFlightHandler} />
                    </div>
                )}
                {currentPage === 'one_way' && (
                    <div className="one-way">
                        <ChooseAirport propFrom={from} propTo={to} errorFrom={formErrors.airportFrom} errorTo={formErrors.airportTo} onFromChange={updateFrom} onToChange={updateTo} />
                        {(formErrors.airportFrom || formErrors.airportTo) && (
                            <p className="mb-form-error" role="alert">
                                Please add your departure and destination cities.
                            </p>
                        )}
                        <div
                            ref={setOneWayDateTarget}
                            className={`d-flex calendar-buttons one-way xyz-nested ${!calendarCollapse ? 'active' : 'disabled'} ${formErrors.departureDate ? 'has-error' : ''}`}
                        >
                            <button type="button" onClick={openCalendar} className={`date-button first-button ${formErrors.departureDate ? 'has-error' : ''}`}>
                                <CalendarIcon fill={Boolean(singleDatePicker)} />
                                {singleDatePicker ? formatUsDate(singleDatePicker) : 'Select departure'}
                            </button>
                        </div>
                        {formErrors.departureDate && (
                            <p className="mb-form-error" role="alert">
                                Please pick your departure date.
                            </p>
                        )}
                        <ChooseProperties
                            propType={type}
                            propTravelers={travelers}
                            onTypeChange={setType}
                            onTravelersChange={setTravelers}
                            onOpenOverlay={() => {
                                setCalendarCollapse(true)
                                setSelectReturn(false)
                            }}
                        />
                        <OrangeFilledButton className="xyz-nested show search-submit" buttonText="Search Flight" click={searchFlightHandler} />
                    </div>
                )}
                {currentPage === 'multi_city' && (
                    <div className={`multi-city ${appWidth < 1270 ? 'overlap' : ''}`}>
                        <VueSelectAdaptive type={type} travelers={travelers} onSetType={setType} onSetTravelers={setTravelers} className="xyz-nested" />
                        {multiFlights.map((flight, index) => (
                            <Fragment key={index}>
                                <div className="multi-city-container xyz-nested" style={{ zIndex: 100 + (5 - index) }}>
                                    <ChooseAirport
                                        propFrom={flight.from}
                                        propTo={flight.to}
                                        errorFrom={index === multiFormErrors.index ? multiFormErrors.airportFrom : null}
                                        errorTo={index === multiFormErrors.index ? multiFormErrors.airportTo : null}
                                        onFromChange={(airport) => {
                                            updateMultiFlight(index, { from: airport })
                                            if (airport?.iata_code) clearMultiFormError(index, 'airportFrom')
                                        }}
                                        onToChange={(airport) => {
                                            updateMultiFlight(index, { to: airport })
                                            if (airport?.iata_code) clearMultiFormError(index, 'airportTo')
                                        }}
                                    />
                                    <div
                                        ref={(node) => {
                                            // Only store attach; ignore detach nulls to avoid max-update-depth loops
                                            if (!node) return
                                            setMultiDateTargets((current) => {
                                                if (current[index] === node) return current
                                                const next = current.slice()
                                                next[index] = node
                                                return next
                                            })
                                        }}
                                        className={`calendar-buttons ${!flight.collapse ? 'active' : 'disabled'} ${index === multiFormErrors.index && multiFormErrors.departureDate ? 'has-error' : ''}`}
                                    >
                                        <button type="button" onClick={() => showCalendar(index)} className={index === multiFormErrors.index && multiFormErrors.departureDate ? 'has-error' : ''}>
                                            <CalendarIcon fill={Boolean(flight.date)} />
                                            {flight.date ? formatUsDate(flight.date) : 'Departure'}
                                        </button>
                                    </div>
                                    <Suspense fallback={null}>
                                        <VueCalendar
                                            calendarCollapse={flight.collapse}
                                            target={multiDateTargets[index] || null}
                                            dataIndex={index}
                                            minDate={index > 0 ? parseFrDate(multiFlights[index - 1]?.date) : Date.now()}
                                            defaultDate={false}
                                            onUpdateValue={(date) => updateMultiFlightDate(date, index)}
                                            onDoCalendarCollapse={doCalendarCollapse}
                                        />
                                    </Suspense>
                                    {index > 1 && (
                                        <button type="button" onClick={() => removeFlight(index)} className="remove-flight">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.00004 13.6663C10.6819 13.6663 13.6667 10.6816 13.6667 6.99967C13.6667 3.31778 10.6819 0.333008 7.00004 0.333008C3.31814 0.333374 0.333374 3.31778 0.333374 6.99967C0.333374 10.6816 3.31814 13.6663 7.00004 13.6663ZM4.52864 9.47108C4.26829 9.21073 4.26829 8.78862 4.52864 8.52827L6.05725 6.99965L4.5287 5.4711C4.26835 5.21075 4.26835 4.78864 4.5287 4.52829C4.78905 4.26794 5.21116 4.26794 5.47151 4.52829L7.00006 6.05685L8.52864 4.52827C8.78899 4.26792 9.2111 4.26792 9.47145 4.52827C9.7318 4.78862 9.7318 5.21073 9.47145 5.47108L7.94287 6.99966L9.47151 8.5283C9.73186 8.78865 9.73186 9.21076 9.47151 9.47111C9.21116 9.73146 8.78905 9.73146 8.5287 9.47111L7.00006 7.94246L5.47145 9.47108C5.2111 9.73143 4.78899 9.73143 4.52864 9.47108Z" fill="#6F767E" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                {index === multiFormErrors.index && (multiFormErrors.airportFrom || multiFormErrors.airportTo) && (
                                    <p className="mb-form-error" role="alert">
                                        Please add your departure and destination cities.
                                    </p>
                                )}
                                {index === multiFormErrors.index && multiFormErrors.departureDate && (
                                    <p className="mb-form-error" role="alert">
                                        Please pick your departure date.
                                    </p>
                                )}
                            </Fragment>
                        ))}
                        <TransparentButton className="xyz-nested" buttonText="Add Flight" click={addFlight} />
                        <ClientInfo errors={multiFormErrors} onButtonClick={proceedLead} />
                    </div>
                )}
            </div>
            {currentPage === 'round_trip' && (
                <Suspense fallback={null}>
                    <DatePicker
                        target={roundTripDateTarget}
                        calendarCollapse={calendarCollapse}
                        selectReturn={selectReturn}
                        minDate={Date.now()}
                        onUpdateValue={updateMultiDatePicker}
                        onDoCalendarCollapse={doCalendarCollapse}
                    />
                </Suspense>
            )}
            {currentPage === 'one_way' && (
                <Suspense fallback={null}>
                    <VueCalendar
                        target={oneWayDateTarget}
                        calendarCollapse={calendarCollapse}
                        minDate={Date.now()}
                        onUpdateValue={(date) => {
                            setSingleDatePicker(date)
                            if (date) clearFormError('departureDate')
                            setCalendarCollapse(true)
                        }}
                        onDoCalendarCollapse={doCalendarCollapse}
                    />
                </Suspense>
            )}
        </div>
    )
}
