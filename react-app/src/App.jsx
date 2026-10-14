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

// Coupon popup frequency cap: at most one show per browser per 24h
const COUPON_SHOWN_KEY = 'bbc_coupon_shown_at'
const COUPON_COOLDOWN_MS = 24 * 60 * 60 * 1000

function couponShownRecently() {
    try {
        const raw = window.localStorage.getItem(COUPON_SHOWN_KEY)
        if (!raw) return false
        const shownAt = Number(raw)
        return Number.isFinite(shownAt) && Date.now() - shownAt < COUPON_COOLDOWN_MS
    } catch {
        return false
    }
}

function markCouponShown() {
    try {
        window.localStorage.setItem(COUPON_SHOWN_KEY, String(Date.now()))
    } catch {
        // Storage unavailable (private mode, quota): popup may repeat next visit, nothing breaks
    }
}

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

    // Auto-close burger menu on desktop (the bar shows its links above 1024 px)
    useEffect(() => {
        if (appWidth > 1024) {
            useAppStore.getState().setBurgherMenu(false)
        }
    }, [appWidth])

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    // Coupon popup governance: capped to once per 24h and opened on visitor intent
    // (scroll depth >= 50% or desktop exit intent) instead of a fixed timer.
    // It also yields while the chat dialog or the quote loader is on screen.
    useEffect(() => {
        if (couponShownRecently()) return undefined

        let armed = false
        let retryTimer = null

        const removeIntentListeners = () => {
            window.removeEventListener('scroll', onScroll)
            document.documentElement.removeEventListener('mouseleave', onMouseLeave)
        }

        const overlayInUse = () =>
            Boolean(document.querySelector('.dialog-overlay')) ||
            Boolean(useAppStore.getState().quoteLoading?.loading)

        const openCoupon = () => {
            if (overlayInUse()) {
                // Chat dialog or quote loader is up: wait for it to close instead of stacking overlays
                retryTimer = setTimeout(openCoupon, 500)
                return
            }
            markCouponShown()
            setShowCoupon(true)
        }

        const onIntent = () => {
            if (armed) return
            armed = true
            removeIntentListeners()
            openCoupon()
        }

        const onScroll = () => {
            const doc = document.documentElement
            if (doc.scrollHeight <= 0) return
            const seen = (window.scrollY || doc.scrollTop || 0) + window.innerHeight
            if (seen / doc.scrollHeight >= 0.5) onIntent()
        }

        const onMouseLeave = (event) => {
            // Exit intent: pointer leaves through the top of the viewport
            if (event.clientY <= 0) onIntent()
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        // Exit intent is desktop only: requires a fine pointer that can hover
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            document.documentElement.addEventListener('mouseleave', onMouseLeave)
        }

        return () => {
            removeIntentListeners()
            if (retryTimer) clearTimeout(retryTimer)
        }
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
