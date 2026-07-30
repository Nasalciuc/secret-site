const generateUniqueID = function () {
    return Date.now().toString(36) + '-' + Math.random().toString(36).substring(2)
}

export function initHelpers(ctx) {
    const GTM = {
        client_id: null,
    }

    const helpers = {
        generateUniqueID,
        responseiq: {
            toggle() {
                try {
                    const exist = window.Responseiq && window.Responseiq.CallbackWidget

                    if (exist) {
                        window.Responseiq.CallbackWidget.toggleWidgetOpenState()

                        if (window.jivo_api) {
                            window.jivo_api.close()
                        }
                    }
                } catch (e) {
                    console.error('responseiq error:', e)
                }
            },
        },
        yaMetrika: {
            track(...args) {
                try {
                    const ym = window.ym

                    if (ym) {
                        const initEvent = (ym.a || []).find((i) => i[1] === 'init')
                        if (initEvent) ym(initEvent[0], ...args)
                    }
                } catch (e) {
                    console.error('ym error:', e)
                }
            },
            setAppVersion(version, forced = false) {
                const interval = setInterval(() => {
                    const ym = window.ym

                    if (ym) {
                        const appVersionParamsEvent = (ym.a || []).find(
                            (event) => event[1] === 'params' && event[2].app_version,
                        )

                        if (!appVersionParamsEvent || forced) {
                            this.track('params', {
                                app_version: version,
                            })
                        }

                        clearInterval(interval)
                    }
                }, 100)
            },
        },
        marketing: {
            cleanData() {
                ctx.$cookies.remove('http_referrer')
                ctx.$cookies.remove('utm')
                ctx.$cookies.remove('kayakclickid')
                ctx.$cookies.remove('ptr')
            },
            cleanKayakData() {
                ctx.$cookies.remove('kayakclickid')
            },
            getData() {
                const utm_fields = JSON.parse(ctx.$cookies.get('utm') || '{}')

                return {
                    _gacid: this.getGTMClientId(),
                    _httpreferrer: ctx.$cookies.get('http_referrer') ? ctx.$cookies.get('http_referrer') : undefined,
                    _utmsource: utm_fields.source,
                    _utmmedium: utm_fields.medium,
                    _utmcampaign: utm_fields.campaign,
                    _utmterm: utm_fields.term,
                    _utmcontent: utm_fields.content,
                    _kcid: ctx.$cookies.get('kayakclickid') ? JSON.parse(ctx.$cookies.get('kayakclickid')) : undefined,
                    _cp: window.location.href,
                }
            },
            getGTMClientId() {
                if (GTM.client_id) return GTM.client_id

                const value = ctx.$cookies.get('_ga') ? ctx.$cookies.get('_ga') : undefined
                if (!value) return undefined

                const valueParts = value.split('.')
                valueParts.shift()
                valueParts.shift()
                GTM.client_id = valueParts.join('.')

                return GTM.client_id
            },
            fireLeadCreatedEvent() {
                if (typeof window !== 'undefined') {
                    window.dataLayer = window.dataLayer || []
                    window.dataLayer.push({
                        event: 'lead_created',
                    })

                    window.uetq = window.uetq || []
                    window.uetq.push('event', 'lead_created')
                }
            },
        },
    }

    // Set yandex app version param
    helpers.yaMetrika.setAppVersion()

    return helpers
}

export default {
    install(app, ctx) {
        app.config.globalProperties.$helpers = initHelpers(ctx)
    },
}
