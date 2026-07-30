const GTM_ID = import.meta.env.VITE_GTM_ID || ''
const FB_PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID || ''
const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''
const HOTJAR_ID = Number(import.meta.env.VITE_HOTJAR_ID) || 5087460

const INTERACTION_EVENTS = ['scroll', 'mousemove', 'touchstart', 'keydown', 'click']

const loadScript = (src, attrs = {}) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value))
    document.head.appendChild(script)
    return script
}

const onIdle = (callback, timeout = 2000) => {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout })
    } else {
        window.setTimeout(callback, timeout)
    }
}

const loadGtm = () => {
    if (!GTM_ID) return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`)
}

const loadHotjar = () => {
    if (!HOTJAR_ID) return
    window.hj =
        window.hj ||
        function hj(...args) {
            ;(window.hj.q = window.hj.q || []).push(args)
        }
    window._hjSettings = { hjid: HOTJAR_ID, hjsv: 6 }
    loadScript(`https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=6`)
}

const loadFacebookPixel = () => {
    if (!FB_PIXEL_ID || window.fbq) return

    const fbq = function fbq(...args) {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, args)
        else fbq.queue.push(args)
    }
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []

    window.fbq = fbq
    window._fbq = window._fbq || fbq

    loadScript('https://connect.facebook.net/en_US/fbevents.js')
    fbq('init', FB_PIXEL_ID)
    fbq('track', 'PageView')
}

/**
 * Resolves once window.grecaptcha is usable, loading the script on demand.
 * Lead submission can fire before the idle/interaction loader has run, so
 * callers await this instead of assuming the global already exists.
 */
export const ensureRecaptcha = (timeout = 5000) => {
    if (!RECAPTCHA_KEY) return Promise.resolve(false)
    if (window.grecaptcha) return Promise.resolve(true)

    if (!window.__recaptchaLoading) {
        window.__recaptchaLoading = true
        loadScript(`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_KEY}`)
    }

    return new Promise((resolve) => {
        const startedAt = Date.now()
        const poll = window.setInterval(() => {
            if (window.grecaptcha) {
                window.clearInterval(poll)
                resolve(true)
                return
            }
            if (Date.now() - startedAt >= timeout) {
                window.clearInterval(poll)
                resolve(false)
            }
        }, 100)
    })
}

export const initThirdParty = () => {
    if (window.__thirdPartyInit) return
    window.__thirdPartyInit = true

    const start = () => {
        onIdle(() => {
            loadGtm()
            loadHotjar()
            loadFacebookPixel()
        }, 2000)

        let triggered = false
        const onInteract = () => {
            if (triggered) return
            triggered = true
            INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, onInteract))
            ensureRecaptcha()
        }

        INTERACTION_EVENTS.forEach((event) => window.addEventListener(event, onInteract, { passive: true }))
        window.setTimeout(onInteract, 6000)
    }

    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start)
}
