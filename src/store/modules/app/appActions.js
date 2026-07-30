/* eslint-disable no-empty */
import axios from 'axios'

export default {
    async getAboutUs({ state }) {
        try {
            const result = await axios.get(`${process.env.VUE_APP_BACK}/api/aboutUs/getAll`)

            if (result.data.responseCode.responseCode !== '1') {
                throw new Error('')
            }

            const copy = result.data.data

            copy.title = JSON.parse(copy.title).blocks
            copy.body = JSON.parse(copy.body).blocks
            copy.image = `${process.env.VUE_APP_BACK}/storage/${copy.image}`

            state.aboutUs = copy
            state.aboutUsIsLoaded = true
        } catch (error) {
            state.aboutUsIsLoaded = true
        }
    },
    async getSettings({ state }) {
        try {
            const result = await axios.get(`${process.env.VUE_APP_BACK}/api/settings/getAll`)

            if (result.data.responseCode.responseCode !== '1') {
                throw new Error('')
            }

            state.settings = result.data.data
        } catch {}
    },
}
