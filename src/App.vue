<template>
    <metainfo>
        <template v-slot:title="{ content }">
            {{
                content
                    ? `${content} | BuyBusinessClass`
                    : 'Business Class Flight Deals - Save Up To 60% on Air Tickets'
            }}
        </template>
    </metainfo>
    <sticky-contact-button />
    <burgher-menu />
    <modal-status />
    <quote-loader :loading="loading" :appWidth="appWidth" />
    <router-view />
    <footer-component />
    <coupon-form v-if="showCoupon" :auto-open="true" />
</template>

<script>
// Components
import { defineAsyncComponent } from 'vue'
import FooterComponent from './components/Footer/FooterComponent.vue'
import BurgherMenu from './components/BurgherMenu.vue'
import ModalStatus from './common/ModalStatus.vue'
import QuoteLoader from '@/common/QuoteLoader.vue'
import StickyContactButton from './common/UI/Buttons/StickyContactButton.vue'

// CouponForm pulls in maz-ui + libphonenumber-js (~hundreds of KB).
// Lazy-load it so the popup that appears after 5s doesn't block initial paint.
const CouponForm = defineAsyncComponent(() => import('./components/PopUp/CouponForm.vue'))

// Vuex
import { mapState } from 'vuex'

export default {
    name: 'App',
    components: {
        FooterComponent,
        BurgherMenu,
        ModalStatus,
        QuoteLoader,
        StickyContactButton,
        CouponForm,
    },
    data() {
        return {
            showCoupon: false,
        }
    },
    computed: {
        ...mapState({
            appWidth: (state) => state.app.appWidth,
            loading: (state) => state.app.quoteLoading,
        }),
    },

    methods: {
        onResize() {
            this.$store.commit('changeAppWidth', window.innerWidth)
        },
        showCouponForm() {
            this.showCoupon = true
        },
    },
    beforeCreate() {
        this.$store.dispatch('getSettings')
    },
    created() {
        this.onResize()
        window.addEventListener('resize', this.onResize)
        setTimeout(() => {
            this.showCouponForm()
        }, 5000)
    },
    unmounted() {
        window.removeEventListener('resize', this.onResize)
    },
    watch: {
        appWidth(value) {
            if (value > 1200) {
                this.$store.commit('displayBurgherMenu', false)
            }
        },
    },
}
</script>

<style lang="scss" src="@/styles/general.scss"></style>
