import axios from 'axios'
import { initHelpers } from '@/helpers/helpers'
import Cookies from 'js-cookie'

export const getMeta = async (page) => {
    try {
        const result = await axios.get(`${process.env.VUE_APP_BACK}/api/meta/getMeta?page=${page}`)

        if (result.data.responseCode.responseCode !== '1') {
            throw new Error('')
        }

        return [result.data.data, null]
    } catch (error) {
        return [null, error.message]
    }
}

export const contactUs = async (data) => {
    try {
        const helpers = initHelpers({
            $cookies: Cookies,
        })

        const result = await axios.post(`${process.env.VUE_APP_API_URL}/contacts/submit`, {
            ...data,
            ...helpers.marketing.getData(),
        })

        if (result?.data?.success) {
            helpers.marketing.cleanData()
        }

        return [result, null]
    } catch (error) {
        const [key] = Object.keys(error.response?.data?.errors ?? {})
        const [message] = error.response?.data?.errors[key]

        return [null, message ?? error.message]
    }
}

export const getPrivacyTerms = async (req) => {
    try {
        const result = await axios.get(`${process.env.VUE_APP_BACK}/api/${req}/getAll`)

        return [result.data.data, null]
    } catch (error) {
        return [null, error.message]
    }
}
