import axios from 'axios'
import { initHelpers } from '@/helpers/helpers'
import Cookies from 'js-cookie'

export const getAirports = async (value, selected) => {
    try {
        const result = await axios.get(`${process.env.VUE_APP_API_URL}/airports/autocomplete`, {
            params: {
                q: value,
                selected,
            },
        })
        return [result.data, null]
    } catch (error) {
        return [null, error.message]
    }
}

export const getBestDeal = async (id) => {
    try {
        const result = await axios.get(`${process.env.VUE_APP_BACK}/api/bestDeals/getOne`, {
            params: {
                id,
            },
        })

        if (result.data.responseCode.responseCode !== '1') {
            throw new Error('')
        }

        return [result.data.data, null]
    } catch (error) {
        return [null, error.message]
    }
}

export const searchFlight = async (from, to, trip_type) => {
    try {
        const result = await axios.get(`${process.env.VUE_APP_API_URL}/flights/search`, {
            params: {
                from,
                to,
                trip_type,
            },
        })

        return [result.data, null]
    } catch (error) {
        return [null, error.response?.data?.error ?? error.message]
    }
}

export const sendCouponLead = async ({ client, coupon }) => {
    try {
        if (!client.phone) {
            throw {
                input: 'phone',
                type: 'validation',
                message: 'Phone number is required.',
            }
        }

        if (client.phone.length < 5) {
            throw {
                input: 'phone',
                type: 'validation',
                message: 'The phone must be at least 5 characters.',
            }
        }

        if (!/^\+\d+$/.test(client.phone)) {
            throw {
                input: 'phone',
                type: 'validation',
                message: 'Invalid phone format. Must start with + and include only digits.',
            }
        }

        if (client.name?.length < 2) {
            throw {
                input: 'name',
                type: 'validation',
                message: 'The name must be at least 2 characters.',
            }
        }

        if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                client.email,
            )
        ) {
            throw {
                input: 'email',
                type: 'validation',
                message: 'Invalid email format.',
            }
        }

        const helpers = initHelpers({
            $cookies: Cookies,
        })

        const getResult = async (recaptchaToken) => {
            const result = await axios.post(`${process.env.VUE_APP_API_URL}/requests/create-coupon`, {
                client,
                coupon: coupon || '',
                recaptchaToken,
                ...helpers.marketing.getData(),
            })

            if (result?.data?.success) {
                helpers.marketing.cleanData()
            }

            return [result, null]
        }

        if (process.env.VUE_APP_RECAPTCHA_SITE_KEY) {
            return await withRecaptchaToken(process.env.VUE_APP_RECAPTCHA_SITE_KEY, getResult)
        }

        return await getResult()
    } catch (error) {
        return [null, error]
    }
}

export const sendLead = async ({ flights, client, trip_type, cabin_class, passengers, phone_valid, sms }) => {
    try {
        if (!phone_valid) {
            throw {
                input: 'phone',
                type: 'validation',
                message: 'Invalid phone',
            }
        }

        if (client.phone.length < 5) {
            throw {
                input: 'phone',
                type: 'validation',
                message: 'The phone must be at least 5 characters.',
            }
        }

        if (client.name?.length < 2) {
            throw {
                input: 'name',
                type: 'validation',
                message: 'The name must be at least 2 characters.',
            }
        }

        if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                client.email,
            )
        ) {
            throw {
                input: 'email',
                type: 'validation',
                message: 'Invalid email',
            }
        }

        const validatedFlights = flights.map(({ from, to, date }, index) => {
            if (!from) {
                throw {
                    input: 'airportFrom',
                    index,
                    type: 'validation',
                    message: 'Departure airport is mandatory!',
                }
            }

            if (!to) {
                throw {
                    input: 'airportTo',
                    index,
                    type: 'validation',
                    message: 'Destination airport is mandatory!',
                }
            }

            if (!date) {
                throw {
                    input: 'departureDate',
                    index,
                    type: 'validation',
                    message: 'Departure date is mandatory!',
                }
            }

            return { from, to, date: date?.split('.')?.reverse()?.join('-') }
        })

        const helpers = initHelpers({
            $cookies: Cookies,
        })
        const getClickIds = () => {
            const qs = new URLSearchParams(window.location.search)

            const gclid = qs.get('gclid') || Cookies.get('_gclid') || null
            const gbraid = qs.get('gbraid') || Cookies.get('_gbraid') || null
            const wbraid = qs.get('wbraid') || Cookies.get('_wbraid') || null

            // dacă sunt în URL, persistă-le în cookie
            if (qs.get('gclid')) Cookies.set('_gclid', qs.get('gclid'), { expires: 90 })
            if (qs.get('gbraid')) Cookies.set('_gbraid', qs.get('gbraid'), { expires: 90 })
            if (qs.get('wbraid')) Cookies.set('_wbraid', qs.get('wbraid'), { expires: 90 })

            // IMPORTANT: trimite doar chei cu "_" ca să le prindă backend-ul în marketingFields
            const out = {}
            if (gclid) out._gclid = gclid
            if (gbraid) out._gbraid = gbraid
            if (wbraid) out._wbraid = wbraid
            return out
        }

        const getResult = async (recaptchaToken) => {
            const result = await axios.post(`${process.env.VUE_APP_API_URL}/requests/create`, {
                client,
                flights: validatedFlights,
                trip_type,
                cabin_class,
                passengers,
                coupon: '',
                sms,
                recaptchaToken,
                ...helpers.marketing.getData(),
                ...getClickIds(),
            })

            if (result?.data?.success) {
                helpers.marketing.cleanData()
            }

            return [result, null]
        }

        if (process.env.VUE_APP_RECAPTCHA_SITE_KEY) {
            return await withRecaptchaToken(process.env.VUE_APP_RECAPTCHA_SITE_KEY, getResult)
        }

        return await getResult()
    } catch (error) {
        return [null, error]
    }
}
export const sendFBLead = async ({
    flights,
    client,
    trip_type,
    cabin_class,
    passengers,
    phone_valid,
    sms,
    recaptchaToken = '',
}) => {
    try {
        if (!phone_valid) {
            throw {
                input: 'phone',
                type: 'validation',
                message: 'Invalid phone',
            }
        }

        if (client.phone.length < 5) {
            throw {
                input: 'phone',
                type: 'validation',
                message: 'The phone must be at least 5 characters.',
            }
        }

        if (client.name?.length < 2) {
            throw {
                input: 'name',
                type: 'validation',
                message: 'The name must be at least 2 characters.',
            }
        }

        if (
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                client.email,
            )
        ) {
            throw {
                input: 'email',
                type: 'validation',
                message: 'Invalid email',
            }
        }

        const validatedFlights = flights.map(({ from, to, date }, index) => {
            if (!from) {
                throw {
                    input: 'airportFrom',
                    index,
                    type: 'validation',
                    message: 'Departure airport is mandatory!',
                }
            }

            if (!to) {
                throw {
                    input: 'airportTo',
                    index,
                    type: 'validation',
                    message: 'Destination airport is mandatory!',
                }
            }

            if (!date) {
                throw {
                    input: 'departureDate',
                    index,
                    type: 'validation',
                    message: 'Departure date is mandatory!',
                }
            }

            return { from, to, date: date?.split('.')?.reverse()?.join('-') }
        })

        const helpers = initHelpers({
            $cookies: Cookies,
        })

        const getResult = async () => {
            const result = await axios.post(`${process.env.VUE_APP_API_URL}/requests/facebook`, {
                client,
                flights: validatedFlights,
                trip_type,
                cabin_class,
                passengers,
                coupon: '',
                sms,
                recaptchaToken: Array.isArray(recaptchaToken) ? recaptchaToken : [''],

                ...helpers.marketing.getData(),
            })

            if (result?.data?.success) {
                helpers.marketing.cleanData()
            }

            return [result, null]
        }

        return await getResult()
    } catch (error) {
        return [null, error]
    }
}

const withRecaptchaToken = (siteKey, func) => {
    return new Promise((resolve, reject) => {
        if (!window.grecaptcha) {
            return reject('missing grecaptcha')
        }
        window.grecaptcha.ready(async () => {
            try {
                const token = await window.grecaptcha.execute(siteKey, { action: 'submit' })
                return resolve(await func(token))
            } catch (error) {
                reject(error)
            }
        })
    })
}

export const getAllBestDeals = async () => {
    try {
        const result = await axios.get(`${process.env.VUE_APP_BACK}/api/bestDeals/getAllDeals`)

        if (result.data.responseCode.responseCode !== '1') {
            throw new Error('error')
        }

        return [result.data?.data, null]
    } catch (error) {
        return [null, error.message]
    }
}
