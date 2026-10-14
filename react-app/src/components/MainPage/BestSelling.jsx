import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { useAppStore } from '@/store/useAppStore'
import { useRegionStore } from '@/store/useRegionStore'
import OrangeFilledButton from '@/components/common/Buttons/OrangeFilledButton'
import OfferCard from './OfferCard'

export default function BestSelling() {
    const { appWidth } = useAppStore()
    const { bestSelling, getBestSelling } = useRegionStore()
    const [columns, setColumns] = useState(3)
    const [rows, setRows] = useState(2)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState([])
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })

    // Moodboard presentation is only used on pages carrying the .mb-home scope
    // (the homepage); DynamicPage reuses this component with the legacy look.
    const rootRef = useRef(null)
    const [mbHome, setMbHome] = useState(false)

    useLayoutEffect(() => {
        setMbHome(Boolean(rootRef.current?.closest('.mb-home, .mb-page')))
    }, [])

    useEffect(() => {
        getBestSelling()
    }, [getBestSelling])

    useEffect(() => {
        if (appWidth <= 768) {
            setColumns(1)
            setRows(1)
        } else if (appWidth <= 1200) {
            setColumns(2)
            setRows(2)
        } else {
            setColumns(3)
            setRows(2)
        }
    }, [appWidth])

    // the homepage shows one row per slide (the moodboard's single row of deals); other pages keep two
    const chunkSize = columns * (mbHome ? 1 : rows)
    const slides = useMemo(() => {
        const totalItems = Math.ceil(bestSelling.length / chunkSize)
        return Array.from({ length: totalItems }, (_, index) =>
            bestSelling.slice(index * chunkSize, (index + 1) * chunkSize),
        )
    }, [bestSelling, chunkSize])

    const returnImgUrl = (url) => {
        if (!url) return ''
        if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) return url
        const path = url.startsWith('/') ? url : `/${url}`
        const storagePath = path.startsWith('/storage/') ? path : `/storage${path}`
        return `${import.meta.env.VITE_BACK || ''}${storagePath}`
    }

    const onSelect = useCallback((api) => {
        if (!api) return
        setSelectedIndex(api.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        const updateSnaps = () => {
            setScrollSnaps(emblaApi.scrollSnapList())
            onSelect(emblaApi)
        }

        emblaApi.reInit()
        updateSnaps()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', updateSnaps)

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', updateSnaps)
        }
    }, [emblaApi, onSelect, slides.length, columns, rows])

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
    const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi])

    const cardTo = (item) => {
        if (!item?.type || item?.name == null) return undefined
        // Spaces stay literal; React Router encodes the pathname (matches Vue / live).
        return `/flight/${item.type}/${String(item.name).toLowerCase()}/${item.id}`
    }

    return (
        <div className="best-selling-container" ref={rootRef}>
            {mbHome ? (
                <div className="mb-deals-head">
                    <h2 className="mb-section-title">Explore more destinations</h2>
                    <p className="mb-deals-sub">Hand-picked business class fares to destinations worldwide.</p>
                </div>
            ) : (
                <div className="title">
                    <h2 className="main-title">
                        Discounted Business Class Flights
                    </h2>
                    <p className="subtitle">Save up to 60%</p>
                </div>
            )}
            <div className="cards-container">
                <div className="carousel">
                    <button className="carousel__prev" type="button" aria-label="Previous" onClick={scrollPrev}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M15 19L8 12L15 5" />
                        </svg>
                    </button>
                    <div className="carousel__viewport" ref={emblaRef}>
                        <div className="carousel__track">
                            {slides.map((slide, index) => (
                                <div className="carousel__slide card-container" key={`best-selling-${index}`}>
                                    <div className="xyz-in" xyz="fade small out-down out-rotate-right appear-stagger">
                                        {slide.map((item) => (
                                            <OfferCard
                                                key={item.id}
                                                title={item.name}
                                                price={item.minPrice?.price_today ?? item.price_today}
                                                oldPrice={item.minPrice?.old_price ?? item.old_price}
                                                imgUrl={returnImgUrl(item.image)}
                                                extraInfo={item.extra_info ?? (mbHome ? '' : '60% off on business class flights')}
                                                to={cardTo(item)}
                                                variant={mbHome ? 'mb' : undefined}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="carousel__next" type="button" aria-label="Next" onClick={scrollNext}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M9 5L16 12L9 19" />
                        </svg>
                    </button>
                    <div className="carousel__pagination">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={`best-selling-dot-${index}`}
                                className={`carousel__pagination-button ${selectedIndex === index ? 'carousel__pagination-button--active' : ''}`}
                                type="button"
                                aria-label={`Go to slide ${index + 1}`}
                                onClick={() => scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="all-deals-button">
                {mbHome ? (
                    <Link className="mb-btn-gold" to="/all-deals">
                        See All Deals
                    </Link>
                ) : (
                    <OrangeFilledButton className="all-deals-button" buttonText="See All Deals" link="/all-deals" />
                )}
            </div>
        </div>
    )
}
