import { useEffect, useState, lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppStore } from '@/store/useAppStore'
import marketingSource from '@/utils/marketing_source'
import Router from '@/router'

// Global components
import BurgerMenu from '@/components/BurgerMenu/BurgerMenu'
import ModalStatus from '@/components/ModalStatus/ModalStatus'
import QuoteLoader from '@/components/QuoteLoader/QuoteLoader'
import StickyContactButton from '@/components/StickyContactButton/StickyContactButton'
import Footer from '@/components/Footer/Footer'

// Lazy load CouponForm
const CouponForm = lazy(() => import('@/components/PopUp/CouponForm'))

export default function App() {
    const location = useLocation()
    const { setAppWidth, getSettings, appWidth, quoteLoading } = useAppStore()
    const [showCoupon, setShowCoupon] = useState(false)

    // Marketing attribution on route change
    useEffect(() => {
        marketingSource({ query: Object.fromEntries(new URLSearchParams(location.search)) })
    }, [location])

    // App width tracking
    useEffect(() => {
        const handleResize = () => setAppWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [setAppWidth])

    // Initial data fetch
    useEffect(() => {
        getSettings()
    }, [getSettings])

    // Auto-close burger menu on desktop
    useEffect(() => {
        if (appWidth > 1200) {
            useAppStore.getState().setBurgherMenu(false)
        }
    }, [appWidth])

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    // Show coupon after 5s
    useEffect(() => {
        const timer = setTimeout(() => setShowCoupon(true), 5000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="app">
            <StickyContactButton />
            <BurgerMenu />
            <ModalStatus />
            <QuoteLoader />
            <Router />
            <Footer />
            {showCoupon && (
                <Suspense fallback={null}>
                    <CouponForm autoOpen />
                </Suspense>
            )}
        </div>
    )
}
