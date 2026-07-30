<template>
    <div class="quote-page" v-if="$store.state.app.flightPrices !== null || success">
        <call-us-form />
        <div class="header-content">
            <header-container
                :from="from ?? $store.state.app.destinationsFlights.from"
                :to="to ?? $store.state.app.destinationsFlights.to"
                :success="success"
            />
        </div>
        <airlines-logos />
        <works-container />
        <reviews-container />
        <about-vue />
        <contact-vue />
    </div>
</template>

<!-- eslint-disable no-empty -->

<script>
// Components
import HeaderContainer from '@/components/Quote/HeaderContainer.vue'
import AirlinesLogos from '@/common/UI/AirlinesLogos.vue'
import WorksContainer from '@/components/WorksContainer.vue'
import ReviewsContainer from '@/components/ReviewsVue.vue'
import AboutVue from '@/components/MainPage/AboutVue.vue'
import ContactVue from '@/components/ContactVue.vue'
import CallUsForm from '../components/PopUp/CallUsForm.vue'

// Controllers
import { searchFlight, getAirports } from '@/controllers/flyController'
// import { getMeta } from "@/controllers/appController";

import { useMeta } from 'vue-meta'

export default {
    components: {
        HeaderContainer,
        AirlinesLogos,
        WorksContainer,
        ReviewsContainer,
        AboutVue,
        ContactVue,
        CallUsForm,
    },
    data() {
        return {
            from: null,
            to: null,
            success: false,
        }
    },
    async created() {
        if (localStorage.getItem('success') === 'true') {
            this.success = true
            localStorage.removeItem('success')
            return
        }

        if (this.$store.state.app.flightPrices === null) {
            const queryParams = this.$route.query

            const type = queryParams.trip_type
            const from = queryParams.from || queryParams.fly_from
            const to = queryParams.to || queryParams.fly_to

            if (!from || !to || !type) {
                this.$router.push({ name: 'index' })
                this.$store.commit('stopQuoteLoading')
                return
            }

            this.$store.commit('setQuoteLoading', [from, to])

            const [response, full_from, full_to] = await Promise.allSettled([
                searchFlight(from, to, type),
                getAirports(from),
                getAirports(to),
                new Promise((resolve) => {
                    setTimeout(resolve, 1500)
                }),
            ])

            const [result, error] = response.value
            const [from_result, from_error] = full_from.value
            const [to_result, to_error] = full_to.value

            if ((result === null && error !== 'Offer not found') || from_result === null || to_result === null) {
                this.$router.push('/')
                this.$store.commit('showModal', {
                    display: true,
                    status: 'error',
                    title: 'Request error',
                    body: error ?? from_error ?? to_error,
                })
                return
            }

            if (result) delete result.premium_economy
            ;[this.from] = from_result
            ;[this.to] = to_result
            this.$store.commit('setFlightPrices', result || true)
            this.$store.commit('stopQuoteLoading')
        }
    },
    mounted() {
        if (this.$store.state.app.flightPrices !== null) {
            this.$store.commit('stopQuoteLoading')
        }
    },
    async beforeCreate() {
        try {
            const metaManager = useMeta({})

            /*const [meta, error] = await getMeta("/quote");

      if (error === null) {
        return;
      }

      metaManager.meta.title = meta.title.title;
      metaManager.meta.meta = meta.meta;*/

            metaManager.meta.title = 'Search result'
        } catch {}
    },
}
</script>
<style lang="scss">
.quote-page {
    overflow: hidden;
}
</style>
