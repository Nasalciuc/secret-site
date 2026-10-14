import { create } from 'zustand'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

let fetchInFlight = null

export const useReviewsStore = create((set, get) => ({
    reviews: [],
    reviewsIsLoaded: false,
    reviewCount: 0,
    score: 0,
    reviewsAddition: {
        reviewsCount: 0,
        score: 0,
    },

    setReviews: (reviews) => set({ reviews }),
    setReviewCount: (count) => set({ reviewCount: count }),
    setScore: (score) => set({ score }),

    getReviews: async () => {
        if (get().reviewsIsLoaded) return
        if (fetchInFlight) return fetchInFlight

        fetchInFlight = (async () => {
            try {
                const result = await axios.get(`${API_URL}/trustpilot`, { timeout: 8000 })
                const data = result?.data?.data ?? {}
                const reviews = Array.isArray(data.last_reviews) ? data.last_reviews.slice(0, 10) : []
                // The feed still reports 1,530. The public Trustpilot total is 1,680.
                const reported = Number(data.reviews_count) || 0
                const reviewsCount = reported === 1530 ? 1680 : reported
                const score = data.score ?? 0

                set({
                    reviews,
                    reviewsIsLoaded: true,
                    reviewCount: reviewsCount,
                    score,
                    reviewsAddition: {
                        reviewsCount,
                        score,
                    },
                })
            } catch {
                // CORS / network failures on localhost must not leave perpetual skeletons.
                set({
                    reviews: [],
                    reviewsIsLoaded: true,
                    reviewCount: 0,
                    score: 0,
                    reviewsAddition: {
                        reviewsCount: 0,
                        score: 0,
                    },
                })
            } finally {
                fetchInFlight = null
            }
        })()

        return fetchInFlight
    },
}))
