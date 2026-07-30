import { create } from 'zustand'
import axios from 'axios'

const BACK = import.meta.env.VITE_BACK

export const useRegionStore = create((set) => ({
    regions: [],
    countries: [],
    cities: [],
    bestSelling: [],
    regionsIsLoaded: false,
    bestSellingIsLoaded: false,

    setRegions: (regions) => set({ regions }),
    setCountries: (countries) => set({ countries }),
    setCities: (cities) => set({ cities }),
    setBestSelling: (bestSelling) => set({ bestSelling }),

    getRegions: async () => {
        try {
            const result = await axios.get(`${BACK}/api/bestDeals/getDestinations`)
            if (result?.data?.responseCode?.responseCode === '1') {
                const data = result.data.data || {}
                set({
                    regions: Array.isArray(data.regions) ? data.regions : Array.isArray(data) ? data : [],
                    countries: Array.isArray(data.countries) ? data.countries : [],
                    cities: Array.isArray(data.cities) ? data.cities : [],
                    regionsIsLoaded: true,
                })
            } else {
                set({ regionsIsLoaded: true })
            }
        } catch (error) {
            console.error('Failed to load regions:', error)
            set({ regionsIsLoaded: true })
        }
    },

    getCountries: async () => {
        // Destinations payload already includes countries via getRegions
    },

    getCities: async () => {
        // Destinations payload already includes cities via getRegions
    },

    getBestSelling: async () => {
        try {
            const result = await axios.get(`${BACK}/api/bestDeals/getMain`)
            if (result?.data?.responseCode?.responseCode === '1') {
                set({ bestSelling: result.data.data || [], bestSellingIsLoaded: true })
            } else {
                set({ bestSellingIsLoaded: true })
            }
        } catch (error) {
            console.error('Failed to load best selling:', error)
            set({ bestSellingIsLoaded: true })
        }
    },
}))
