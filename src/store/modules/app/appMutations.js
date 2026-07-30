export default {
    changeAppWidth(state, width) {
        state.appWidth = width
    },
    displayBurgherMenu(state, value) {
        state.burgherMenu = value ?? !state.burgherMenu
    },
    showModal(state, value) {
        if ((value.display && state.modal.display) || !state.allowModal) {
            this.commit('hideModal')
        }

        state.allowModal = false
        state.modal = value ?? {}

        state.modalTimeout = setTimeout(() => {
            this.commit('hideModal')
        }, +process.env.VUE_APP_MODAL_TIMEOUT)
    },
    hideModal(state) {
        clearTimeout(state.modalTimeout)
        state.modal = { ...state.modal, display: false }
        state.allowModal = false

        setTimeout(() => {
            state.allowModal = true
        }, 600)
    },
    setQuoteLoading(state, [from, to]) {
        state.quoteLoading = {
            loading: true,
            from,
            to,
        }
    },
    stopQuoteLoading(state) {
        state.quoteLoading = {
            loading: false,
        }
    },
    setFlightPrices(state, prices) {
        state.flightPrices = prices
    },
    setAboutUs(state, value) {
        state.scrollToAboutUs = value
    },
    setDestinationsFlights(state, [from, to]) {
        state.destinationsFlights = { from, to }
    },
}
