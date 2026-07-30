import axios from 'axios'

export default {
    async getBlogs({ state }) {
        try {
            const result = await axios.get(`${process.env.VUE_APP_BACK}/api/articles/getAll`)

            if (result.data.responseCode.responseCode !== '1') {
                throw new Error('')
            }

            state.blogs = result.data.data
            state.blogsIsLoaded = true
        } catch (error) {
            state.blogsIsLoaded = true
        }
    },
}
