<template>
    <div class="all-deals-page">
        <div class="all-deals-content" v-if="regionsArr !== null">
            <div class="deals-container">
                <div class="cards-container">
                    <offer-card
                        v-for="item in regionsArr"
                        :key="item.id"
                        :imgUrl="item.image"
                        :title="item.name"
                        :price="item.price_today"
                    >
                        <template #button>
                            <router-link :to="`/best-deals/${item.name.toLowerCase()}/${item.id}`" />
                        </template>
                    </offer-card>
                </div>
            </div>
            <works-container />
            <contact-vue />
        </div>
    </div>
</template>

<!-- eslint-disable no-empty -->

<script>
// Components
import OfferCard from '@/common/OfferCard.vue'
import WorksContainer from '@/components/WorksContainer.vue'
import ContactVue from '@/components/ContactVue.vue'

// Controllers
import { getAllBestDeals } from '@/controllers/flyController'

// Helpers
import { returnImgUrl } from '@/helpers/functions'

export default {
    components: {
        OfferCard,
        WorksContainer,
        ContactVue,
    },
    data() {
        return {
            regionsArr: null,
        }
    },
    metaInfo: {
        title: 'All-Deals',
    },
    mounted() {
        const canonicalUrl = `https://buybusinessclass.com/all-deals`

        const canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        canonicalLink.href = canonicalUrl
        document.head.appendChild(canonicalLink)
    },

    async created() {
        const [result, error] = await getAllBestDeals()

        if (error) {
            this.$store.commit('showModal', {
                display: true,
                status: 'error',
                body: error,
                title: 'Request failed',
            })
            this.$router.push('/')
            return
        }

        this.regionsArr = result.map((cur) => ({
            ...cur,
            image: returnImgUrl(cur.image),
        }))
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.all-deals-page {
    padding-top: 32px;
    min-height: 100vh;
    @include deals;
    .img-block {
        aspect-ratio: 3/2;
    }
    .cards-container {
        margin-bottom: 0 !important;
    }
}
</style>
