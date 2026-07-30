import axios from 'axios'

export default {
    async getRegions({ state }) {
        try {
            const result = await axios.get(`${process.env.VUE_APP_BACK}/api/bestDeals/getDestinations`)

            if (result.data.responseCode.responseCode !== '1') {
                throw new Error('')
            }

            state.regions = result.data.data
            state.regionsIsLoaded = true
        } catch (error) {
            state.regionsIsLoaded = true
        }
    },
    async getBestSelling({ state }) {
        try {
            const result = await axios.get(`${process.env.VUE_APP_BACK}/api/bestDeals/getMain`)

            if (result.data.responseCode.responseCode !== '1') {
                throw new Error('')
            }

            state.bestSelling = result.data.data
            state.bestSellingIsLoaded = true
        } catch (error) {
            state.bestSellingIsLoaded = true
        }
    },
}
