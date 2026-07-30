import axios from 'axios'

export default {
    getReviews: async ({ state }) => {
        try {
            const result = await axios.get(`${process.env.VUE_APP_API_URL}/trustpilot`)
            state.reviewsIsLoaded = true
            state.reviews = result.data.data.last_reviews.slice(0, 10)
            state.reviewsAddition = {
                reviewsCount: result.data.data.reviews_count,
                score: result.data.data.score,
            }
        } catch (error) {
            state.reviewsIsLoaded = true
        }
    },
}
