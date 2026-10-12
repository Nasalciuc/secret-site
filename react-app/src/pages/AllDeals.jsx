import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllBestDeals } from '@/services/api'
import { useAppStore } from '@/store/useAppStore'
import OfferCard from '@/components/MainPage/OfferCard'
import WorksContainer from '@/components/MainPage/WorksContainer'
import ContactSection from '@/components/MainPage/ContactSection'

// Match Vue helpers/functions.js returnImgUrl + BestSelling
const returnImgUrl = (url) => {
    if (!url) return ''
    if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) return url
    const path = url.startsWith('/') ? url : `/${url}`
    const storagePath = path.startsWith('/storage/') ? path : `/storage${path}`
    return `${import.meta.env.VITE_BACK || ''}${storagePath}`
}

export default function AllDeals() {
    const navigate = useNavigate()
    const { setModal } = useAppStore()
    const [regionsArr, setRegionsArr] = useState(null)

    useEffect(() => {
        let canonicalLink = document.querySelector('link[rel="canonical"]')
        if (!canonicalLink) {
            canonicalLink = document.createElement('link')
            canonicalLink.rel = 'canonical'
            document.head.appendChild(canonicalLink)
        }
        canonicalLink.href = 'https://buybusinessclass.com/all-deals'
    }, [])

    useEffect(() => {
        let cancelled = false

        const loadDeals = async () => {
            const [result, error] = await getAllBestDeals()

            if (cancelled) return

            if (error) {
                setModal({
                    display: true,
                    status: 'error',
                    body: error,
                    title: 'Request failed',
                })
                navigate('/')
                return
            }

            setRegionsArr(
                (Array.isArray(result) ? result : []).map((item) => ({
                    ...item,
                    image: returnImgUrl(item.image),
                })),
            )
        }

        loadDeals()

        return () => {
            cancelled = true
        }
    }, [navigate, setModal])

    return (
        <div className="all-deals-page mb-page">
            <div className="mb-cl-hero">
                <span className="mb-eyebrow">Featured deals</span>
                <h1 className="mb-serif">All business class <span className="gold">deals</span></h1>
                <p className="mb-cl-hero__sub">
                    Hand-picked business class fares to destinations worldwide — save up to 60% OFF retail prices.
                </p>
            </div>
            {regionsArr !== null && (
                <div className="all-deals-content">
                    <div className="deals-container">
                        <div className="cards-container">
                            {regionsArr.map((item) => (
                                <OfferCard
                                    key={item.id}
                                    variant="mb"
                                    imgUrl={item.image}
                                    title={item.name}
                                    price={item.price_today}
                                    to={`/best-deals/${item.name.toLowerCase()}/${item.id}`}
                                />
                            ))}
                        </div>
                    </div>
                    <WorksContainer />
                    <ContactSection />
                </div>
            )}
        </div>
    )
}
