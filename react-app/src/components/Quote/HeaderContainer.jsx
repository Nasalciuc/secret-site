import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import SecondBlock from '@/components/HeaderForm/FlightCard/SecondBlock'
import PersonalAssistant from '@/components/Quote/PersonaAssistant'
import DiscountVue from '@/components/DiscountVue'

const planePath =
    'M5.00065 0.666992L6.17661 0.666993C6.80789 0.666993 7.385 1.02366 7.66732 1.5883L9.4018 5.05727C9.48649 5.22666 9.65963 5.33366 9.84901 5.33366L12.0007 5.33366C12.9211 5.33366 13.6673 6.07985 13.6673 7.00033C13.6673 7.9208 12.9211 8.66699 12.0007 8.66699L9.84901 8.66699C9.65963 8.66699 9.4865 8.77399 9.4018 8.94339L7.66732 12.4123C7.385 12.977 6.80789 13.3337 6.17661 13.3337L5.00065 13.3337C4.89504 13.3337 4.79568 13.2836 4.73281 13.1987C4.66994 13.1139 4.65101 13.0043 4.68177 12.9032L5.87345 8.98982C5.92236 8.8292 5.80219 8.66699 5.63429 8.66699L4.08398 8.66699C3.92661 8.66699 3.77841 8.74109 3.68398 8.86699L3.13398 9.60033C2.94513 9.85213 2.64874 10.0003 2.33398 10.0003L0.667317 10.0003C0.551792 10.0003 0.444503 9.94051 0.383767 9.84224C0.323032 9.74396 0.31751 9.62125 0.369175 9.51792L1.62797 7.00033L0.369175 4.48273C0.317511 4.3794 0.323032 4.25669 0.383768 4.15842C0.444503 4.06014 0.551792 4.00033 0.667318 4.00033L2.33398 4.00033C2.64874 4.00033 2.94513 4.14852 3.13398 4.40033L3.68398 5.13366C3.77841 5.25956 3.92661 5.33366 4.08398 5.33366L5.63429 5.33366C5.80219 5.33366 5.92236 5.17145 5.87345 5.01083L4.68177 1.09743C4.65101 0.996397 4.66994 0.886763 4.73281 0.801902C4.79568 0.717041 4.89504 0.666992 5.00065 0.666992Z'

const classLabels = {
    business: 'Business Class',
    first: 'First Class',
    premium_economy: 'Premium Economy Class',
    economy: 'Economy Class',
}

const toFullClass = (value = 'business') => classLabels[value] || `${value.replace(/_/g, ' ')} class`

const cleanDate = (value) => (value && value !== 'null' ? value : '')

const getTravelers = (params) => ({
    adult: Number(params.get('adults')) || 1,
    child: Number(params.get('childrens')) || 0,
    infant: Number(params.get('infants')) || 0,
})

function PlaneIcon({ width = 14, height = 14 }) {
    return (
        <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d={planePath} fill="#33383F" />
        </svg>
    )
}

function RouteBlock({ departAt, returnAt, tripType, fromCode, toCode, fromCity, toCity }) {
    return (
        <>
            <div className={`from-to-block on-desktop ${tripType}`}>
                <div className="round-trip">
                    <div className="block">
                        <div className="date">{cleanDate(departAt)}</div>
                        <div className="info">
                            <div className="from">
                                <p className="airport">{fromCode}</p>
                                <p className="city">{fromCity}</p>
                            </div>
                            <PlaneIcon />
                            <div className="to">
                                <p className="airport">{toCode}</p>
                                <p className="city">{toCity}</p>
                            </div>
                        </div>
                    </div>
                    <div className="block">
                        <div className="date">{cleanDate(returnAt)}</div>
                        <div className="info">
                            <div className="from">
                                <p className="airport">{toCode}</p>
                                <p className="city">{toCity}</p>
                            </div>
                            <PlaneIcon />
                            <div className="to">
                                <p className="airport">{fromCode}</p>
                                <p className="city">{fromCity}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="one-way">
                    <div className="block">
                        <div className="date">{cleanDate(departAt)}</div>
                        <div className="info">
                            <div className="from">
                                <p className="airport">{fromCode}</p>
                                <p className="city">{fromCity}</p>
                            </div>
                        </div>
                    </div>
                    <div className="block">
                        <PlaneIcon width={16} height={16} />
                    </div>
                    <div className="block">
                        <div className="info">
                            <div className="from">
                                <p className="airport">{toCode}</p>
                                <p className="city">{toCity}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="from-to-block on-mobile">
                <div className="block">
                    <div className="dates">
                        <div className="date">{cleanDate(departAt)}</div>
                        <div className="date">{cleanDate(returnAt)}</div>
                    </div>
                    <div className="info">
                        <div className="from">
                            <p className="airport">{fromCode}</p>
                            <p className="city">{fromCity}</p>
                        </div>
                        <PlaneIcon />
                        <div className="to">
                            <p className="airport">{toCode}</p>
                            <p className="city">{toCity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function HeaderContainer({ from, to, success = false }) {
    const location = useLocation()
    const { flightPrices } = useAppStore()
    const [showCongrats, setShowCongrats] = useState(success)
    const params = useMemo(() => new URLSearchParams(location.search), [location.search])

    const additionalInfo = useMemo(() => {
        const tripType = params.get('trip_type') || 'round_trip'
        const departAt = params.get('depart_at')
        const returnAt = params.get('return_at')
        return {
            cabin_class: params.get('cabin_class') || 'business',
            trip_type: tripType,
            from: params.get('from') || params.get('fly_from') || from?.iata_code || '',
            to: params.get('to') || params.get('fly_to') || to?.iata_code || '',
            depart_at: departAt,
            return_at: returnAt,
            travelers: getTravelers(params),
            calendar: tripType === 'one_way' ? cleanDate(departAt) : null,
            datepicker:
                tripType === 'round_trip'
                    ? {
                          start: cleanDate(departAt),
                          end: cleanDate(returnAt),
                      }
                    : { start: null, end: null },
        }
    }, [from?.iata_code, params, to?.iata_code])

    const [chosenClass, setChosenClass] = useState(additionalInfo.cabin_class)
    const priceKeys = flightPrices && flightPrices !== true ? Object.keys(flightPrices) : []

    useEffect(() => {
        if (!chosenClass && priceKeys.length > 0) setChosenClass(priceKeys[0])
    }, [chosenClass, priceKeys])

    useEffect(() => {
        if (!showCongrats) return
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ event: 'ec_form_submit' })
    }, [showCongrats])

    const onFormSuccess = () => setShowCongrats(true)

    return (
        <>
            <div className="content qoute-header">
                {!showCongrats ? (
                    <div className="blocks">
                        <div className="first-block">
                            <div style={{ paddingBottom: '10px', marginRight: 0 }}>
                                <DiscountVue />
                            </div>
                            <div className={`destination-qoute d-flex ${flightPrices !== true ? '' : 'column'}`}>
                                <RouteBlock
                                    departAt={additionalInfo.depart_at}
                                    returnAt={additionalInfo.return_at}
                                    tripType={additionalInfo.trip_type}
                                    fromCode={additionalInfo.from}
                                    toCode={additionalInfo.to}
                                    fromCity={from?.city}
                                    toCity={to?.city}
                                />

                                {flightPrices !== true && flightPrices !== null ? (
                                    <div className="deals-block">
                                        {priceKeys.map((item, index) => (
                                            <div
                                                key={item}
                                                className={`${item} ${chosenClass === item ? 'active' : ''} ${index === 0 ? 'best-deal' : ''}`}
                                            >
                                                <div className="d-flex">
                                                    <p className="price">
                                                        {flightPrices[item]}
                                                        <span>*</span> USD
                                                    </p>
                                                    <div className="checkbox">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M13.8041 4.19526C14.0644 4.45561 14.0644 4.87772 13.8041 5.13807L8.08023 10.8619C7.29918 11.643 6.03285 11.643 5.2518 10.8619L2.86128 8.4714C2.60093 8.21106 2.60093 7.78894 2.86128 7.5286C3.12163 7.26825 3.54374 7.26825 3.80409 7.5286L6.19461 9.91912C6.45496 10.1795 6.87707 10.1795 7.13742 9.91912L12.8613 4.19526C13.1216 3.93491 13.5437 3.93491 13.8041 4.19526Z"
                                                                fill="#2A85FF"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p>
                                                    <span className="capitalize">{item.replace(/_/g, ' ')} class</span> /{' '}
                                                    <span className="capitalize">{additionalInfo.trip_type.replace(/_/g, ' ')}</span>
                                                </p>
                                                <button type="button" onClick={() => setChosenClass(item)} aria-label={`Choose ${item}`} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flight-null">
                                        <div className="icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                                    fill="#b4853b"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M12 10C12.5523 10 13 10.4477 13 11V16.0009C13 16.5532 12.5523 17.0009 12 17.0009C11.4477 17.0009 11 16.5532 11 16.0009V11C11 10.4477 11.4477 10 12 10Z"
                                                    fill="#b4853b"
                                                />
                                                <circle cx="12" cy="8" r="1" fill="#b4853b" />
                                            </svg>
                                        </div>
                                        <div className="info">
                                            Please fill out the request form. <br />
                                            Our travel expert will reach out with the best deals
                                        </div>
                                    </div>
                                )}
                            </div>
                            <PersonalAssistant />
                        </div>
                        <PersonalAssistant />
                        <SecondBlock
                            propClass={toFullClass(chosenClass || additionalInfo.cabin_class)}
                            propCalendar={additionalInfo.calendar}
                            propDatepicker={additionalInfo.datepicker}
                            propFrom={from || additionalInfo.from}
                            propTo={to || additionalInfo.to}
                            propTravelers={additionalInfo.travelers}
                            propType={additionalInfo.trip_type}
                            onSuccess={onFormSuccess}
                        />
                    </div>
                ) : (
                    <div className="congratulations" id="congratulations-tag">
                        <div className="content">
                            <div className="title-thank">Thank you for submitting your request!</div>
                            <div className="subtitle">
                                One of our travel advisors will be in touch shortly. To unlock more savings, we may contact you
                                to gather relevant information about your flight request. <br />
                                <br />
                                You also agree to our <Link to="/terms">Terms of Service</Link> and{' '}
                                <Link to="/privacy">Privacy Policy.</Link>
                            </div>
                            <div className="line" />
                            <PersonalAssistant />
                        </div>
                    </div>
                )}
            </div>
            <PersonalAssistant className="quote-outer-assistance" />
        </>
    )
}
