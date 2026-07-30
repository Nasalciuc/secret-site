<template>
    <div class="deals-container">
        <div class="title">
            <h2 class="main-title">
                <span class="accent">Discounted</span> Business Class<span class="accent">Flights</span>
            </h2>
            <p class="subtitle">Save up to 60%</p>
        </div>
        <div class="cards-container">
            <offer-card
                v-for="item in arr || bestSelling"
                :key="`${item.id}`"
                :title="item.name"
                :price="item.price_today"
                :imgUrl="returnImgUrl(item.image)"
                :extraInfo="item.extra_info ?? '60% off on business class flights'"
            >
                <template #button>
                    <router-link :to="getCardRoute(item)" />
                </template>
            </offer-card>
        </div>
    </div>
</template>

<script>
// Components
import OfferCard from '@/common/OfferCard.vue'

// Vuex
import { mapState } from 'vuex'

// Helpers
import { returnImgUrl } from '@/helpers/functions'

export default {
    components: {
        OfferCard,
    },
    props: {
        arr: {
            type: [Array, Boolean],
            default: () => false,
        },
    },
    computed: {
        ...mapState({
            bestSelling: (state) => state.region.bestSelling,
        }),
    },
    methods: {
        returnImgUrl(url) {
            return returnImgUrl(url)
        },
        getCardRoute(item) {
            return {
                name: `flight-${item.type}`,
                params: {
                    id: item.id,
                    [item.type]: item.name.toLowerCase(),
                },
            }
        },
    },
    mounted() {
        if (!this.$store.state.region.bestSellingIsLoaded) {
            this.$store.dispatch('getBestSelling')
        }
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';
@include deals;
</style>
