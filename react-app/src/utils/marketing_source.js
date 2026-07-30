import Cookies from 'js-cookie'

export default function marketingSource({ query }) {
    const hostname = window.location.host
    const utm_fields = {}

    if (query.utm_source) utm_fields.source = query.utm_source
    if (query.utm_medium) utm_fields.medium = query.utm_medium
    if (query.utm_campaign) utm_fields.campaign = query.utm_campaign
    if (query.utm_term) utm_fields.term = query.utm_term
    if (query.utm_content) utm_fields.content = query.utm_content

    if (Object.keys(utm_fields).length) {
        Cookies.set('utm', JSON.stringify(utm_fields), { path: '/', expires: 365 * 2 })
    }

    if (query.kayakclickid) {
        Cookies.set('kayakclickid', JSON.stringify(query.kayakclickid), { path: '/', expires: 365 * 2 })
    }

    const http_referrer = window.document.referrer
    let currentHostReferrer = false
    try {
        const referrer_url = new URL(http_referrer)
        currentHostReferrer = referrer_url.host === hostname
    } catch (e) {
        // ignore
    }

    if (!currentHostReferrer && http_referrer.trim()) {
        Cookies.set('http_referrer', JSON.stringify(http_referrer), { path: '/', expires: 365 * 2 })
    }
}
