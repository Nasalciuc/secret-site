import { useEffect } from 'react'
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

    useEffect(() => {
        if ((!arr || (Array.isArray(arr) && arr.length === 0)) && !bestSellingIsLoaded) getBestSelling()
    }, [arr, bestSellingIsLoaded, getBestSelling])

    return (
        <div className="deals-container">
            <div className="title">
                <h2 className="main-title">
                    <span className="accent">Discounted</span> Business Class<span className="accent">Flights</span>
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
                    />
                ))}
            </div>
        </div>
    )
}
