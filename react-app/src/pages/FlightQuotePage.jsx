import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAirports, searchFlight } from '@/services/api'
import { useAppStore } from '@/store/useAppStore'
import { withBrandTitle } from '@/utils/brandTitle'
import HeaderContainer from '@/components/Quote/HeaderContainer'
import AirlinesLogos from '@/components/Footer/AirlinesLogos'
import WorksContainer from '@/components/MainPage/WorksContainer'
import ReviewsSection from '@/components/MainPage/ReviewsSection'
import ContactSection from '@/components/MainPage/ContactSection'
import CallUsForm from '@/components/PopUp/CallUsForm'
import AboutSection from '@/components/MainPage/AboutSection'

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))

const getAirportPair = (destinationsFlights) => {
    if (Array.isArray(destinationsFlights)) {
        return {
            from: destinationsFlights[0],
            to: destinationsFlights[1],
        }
    }

    return {
        from: destinationsFlights?.from,
        to: destinationsFlights?.to,
    }
}

export default function FlightQuotePage() {
    const navigate = useNavigate()
    const location = useLocation()
    const hydratedRef = useRef(false)
    const {
        flightPrices,
        destinationsFlights,
        setFlightPrices,
        setDestinationsFlights,
        setQuoteLoading,
        stopQuoteLoading,
        setModal,
    } = useAppStore()
    const storedAirports = getAirportPair(destinationsFlights)
    const [fromAirport, setFromAirport] = useState(storedAirports.from)
    const [toAirport, setToAirport] = useState(storedAirports.to)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        document.title = withBrandTitle('Search result')
    }, [])

    useEffect(() => {
        const searchKey = location.search
        if (hydratedRef.current === searchKey) return
        hydratedRef.current = searchKey

        const hydrateQuote = async () => {
            if (localStorage.getItem('success') === 'true') {
                setSuccess(true)
                localStorage.removeItem('success')
                stopQuoteLoading()
                return
            }

            if (flightPrices !== null) {
                stopQuoteLoading()
                return
            }

            const queryParams = new URLSearchParams(location.search)
            const type = queryParams.get('trip_type')
            const from = queryParams.get('from') || queryParams.get('fly_from')
            const to = queryParams.get('to') || queryParams.get('fly_to')

            if (!from || !to || !type) {
                stopQuoteLoading()
                navigate('/')
                return
            }

            setQuoteLoading([from, to])

            const [response, fullFrom, fullTo] = await Promise.allSettled([
                searchFlight(from, to, type),
                getAirports(from),
                getAirports(to),
                wait(1500),
            ])

            const [result, error] = response.status === 'fulfilled' ? response.value : [null, response.reason?.message]
            const [fromResult, fromError] = fullFrom.status === 'fulfilled' ? fullFrom.value : [null, fullFrom.reason?.message]
            const [toResult, toError] = fullTo.status === 'fulfilled' ? fullTo.value : [null, fullTo.reason?.message]

            if ((result === null && error !== 'Offer not found') || fromResult === null || toResult === null) {
                stopQuoteLoading()
                navigate('/')
                setModal({
                    display: true,
                    status: 'error',
                    title: 'Request error',
                    body: error || fromError || toError || 'Unable to load flight quote.',
                })
                return
            }

            const nextPrices = result ? { ...result } : true
            if (nextPrices !== true) delete nextPrices.premium_economy

            const nextFromAirport = fromResult?.[0]
            const nextToAirport = toResult?.[0]
            setFromAirport(nextFromAirport)
            setToAirport(nextToAirport)
            setDestinationsFlights({ from: nextFromAirport, to: nextToAirport })
            setFlightPrices(nextPrices)
            stopQuoteLoading()
        }

        hydrateQuote()
    }, [
        flightPrices,
        location.search,
        navigate,
        setDestinationsFlights,
        setFlightPrices,
        setModal,
        setQuoteLoading,
        stopQuoteLoading,
    ])

    if (flightPrices === null && !success) {
        return null
    }

    return (
        <div className="quote-page mb-page">
            <CallUsForm />
            <div className="header-content">
                <HeaderContainer from={fromAirport || storedAirports.from} to={toAirport || storedAirports.to} success={success} />
            </div>
            <AirlinesLogos />
            <WorksContainer />
            <ReviewsSection />
            <AboutSection />
            <ContactSection />
        </div>
    )
}
