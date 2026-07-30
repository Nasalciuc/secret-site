import { create } from 'zustand'
import axios from 'axios'

const BACK = import.meta.env.VITE_BACK

export const useReviewsStore = create((set) => ({
    reviews: [],
    reviewCount: 0,
    score: 0,

    setReviews: (reviews) => set({ reviews }),
    setReviewCount: (count) => set({ reviewCount: count }),
    setScore: (score) => set({ score }),

    getReviews: async () => {
        try {
            const result = await axios.get(`${BACK}/api/reviews/getAll`)
            if (result?.data?.responseCode?.responseCode === '1') {
                const { reviews, reviewCount, score } = result.data.data
                set({ reviews, reviewCount, score })
            }
        } catch (error) {
            console.error('Failed to load reviews:', error)
        }
    },
}))
