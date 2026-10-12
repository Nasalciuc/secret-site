import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useRegionStore } from '@/store/useRegionStore'
import OfferCard from '@/components/MainPage/OfferCard'

const returnImgUrl = (url) => {
    if (!url) return ''
    if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) return url
    const path = url.startsWith('/') ? url : `/${url}`
    const storagePath = path.startsWith('/storage/') ? path : `/storage${path}`
    return `${import.meta.env.VITE_BACK || ''}${storagePath}`
}

const cardRoute = (item) => {
    if (!item?.type || item?.name == null) return undefined
    return `/flight/${item.type}/${String(item.name).toLowerCase()}/${item.id}`
}

export default function FlightCards({ arr = false }) {
    const { bestSelling, bestSellingIsLoaded, getBestSelling } = useRegionStore()
    const items = Array.isArray(arr) && arr.length > 0 ? arr : bestSelling

    // Moodboard presentation is only used inside a .mb-home/.mb-page scope
    // (FlightPage, BestDeals, redesigned seasonal pages); legacy pages keep
    // the untouched OfferCard look. Same detection as BestSelling.
    const rootRef = useRef(null)
    const [mbPage, setMbPage] = useState(false)

    useLayoutEffect(() => {
        setMbPage(Boolean(rootRef.current?.closest('.mb-home, .mb-page')))
    }, [])

    useEffect(() => {
        if ((!arr || (Array.isArray(arr) && arr.length === 0)) && !bestSellingIsLoaded) getBestSelling()
    }, [arr, bestSellingIsLoaded, getBestSelling])

    return (
        <div className="deals-container" ref={rootRef}>
            <div className="title">
                <h2 className="main-title">
                    <span className="accent">Discounted</span> Business Class <span className="accent">Flights</span>
                </h2>
                <p className="subtitle">Save up to 60%</p>
            </div>
            <div className="cards-container">
                {(Array.isArray(items) ? items : []).map((item) => (
                    <OfferCard
                        key={item.id}
                        title={item.name}
                        price={item.minPrice?.price_today ?? item.price_today}
                        imgUrl={returnImgUrl(item.image)}
                        extraInfo={item.extra_info ?? '60% off on business class flights'}
                        to={cardRoute(item)}
                        variant={mbPage ? 'mb' : undefined}
                    />
                ))}
            </div>
        </div>
    )
}
