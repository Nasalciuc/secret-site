import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const BACK = import.meta.env.VITE_BACK

export const useAppStore = create((set, get) => ({
    appWidth: typeof window !== 'undefined' ? window.innerWidth : 1024,
    flightPrices: null,
    burgherMenu: false,
    aboutUs: {},
    aboutUsIsLoaded: false,
    scrollToAboutUs: false,
    allowModal: true,
    destinationsFlights: {},
    settings: {},
    quoteLoading: { loading: false },
    modal: { display: false },
    modalTimeout: null,

    setAppWidth: (width) => set({ appWidth: width }),
    setBurgherMenu: (value) => set({ burgherMenu: value }),
    setQuoteLoading: (value) => {
        if (Array.isArray(value)) {
            set({ quoteLoading: { loading: true, from: value[0], to: value[1] } })
            return
        }
        if (typeof value === 'object' && value !== null) {
            set({
                quoteLoading: {
                    loading: value.loading ?? true,
                    from: value.from,
                    to: value.to,
                },
            })
            return
        }
        set({ quoteLoading: { loading: Boolean(value) } })
    },
    stopQuoteLoading: () => set({ quoteLoading: { loading: false } }),
    setModal: (modal) => set({ modal }),
    setAllowModal: (allow) => set({ allowModal: allow }),
    setScrollToAboutUs: (value) => set({ scrollToAboutUs: value }),
    setAboutUs: (data) => set({ aboutUs: data, aboutUsIsLoaded: true }),
    setDestinationsFlights: (data) => set({ destinationsFlights: data }),
    setSettings: (settings) => set({ settings }),
    setFlightPrices: (prices) => set({ flightPrices: prices }),

    getSettings: async () => {
        try {
            const result = await axios.get(`${BACK}/api/settings/getAll`)
            if (result?.data?.responseCode?.responseCode === '1') {
                set({ settings: result.data.data })
            }
        } catch (error) {
            console.error('Failed to load settings:', error)
        }
    },

    getAboutUs: async () => {
        try {
            const result = await axios.get(`${BACK}/api/aboutUs/getAll`)

            if (result?.data?.responseCode?.responseCode !== '1') {
                throw new Error('')
            }

            const copy = { ...result.data.data }
            copy.title = JSON.parse(copy.title).blocks
            copy.body = JSON.parse(copy.body).blocks
            copy.image = `${BACK}/storage/${copy.image}`

            set({ aboutUs: copy, aboutUsIsLoaded: true })
        } catch (error) {
            set({ aboutUsIsLoaded: true })
        }
    },
}))
