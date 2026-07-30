import appMutations from './appMutations'
import appActions from './appActions'

export default {
    state: {
        appWidth: null,
        flightPrices: null,
        burgherMenu: false,
        aboutUs: {},
        aboutUsIsLoaded: false,
        scrollToAboutUs: false,
        allowModal: true,
        destinationsFlights: {},
        settings: {},
        quoteLoading: {
            loading: false,
        },
        modal: {
            display: false,
        },
        modalTimeout: null,
    },
    actions: {
        ...appActions,
    },
    mutations: {
        ...appMutations,
    },
}
