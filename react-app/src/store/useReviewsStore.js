import { create } from 'zustand'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const useReviewsStore = create((set) => ({
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
        try {
            const result = await axios.get(`${API_URL}/trustpilot`)
            const data = result?.data?.data ?? {}
            const reviews = Array.isArray(data.last_reviews) ? data.last_reviews.slice(0, 10) : []
            const reviewsCount = data.reviews_count ?? 0
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
        } catch (error) {
            set({ reviewsIsLoaded: true })
        }
    },
}))
