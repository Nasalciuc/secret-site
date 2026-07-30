<template>
    <div class="flight-page">
        <div class="header-content">
            <header-container
                @about="text = JSON.parse($event)?.blocks ?? null"
                @cards="destination = $event"
                :destination="destination"
            />
        </div>
        <airlines-logos />
        <works-container />
        <flight-cards :arr="destination" v-if="!$route.params.city" />
        <reviews-vue />
        <description-vue :text="text" />
        <contact-vue />
    </div>
</template>

<!-- eslint-disable no-empty -->

<script>
// Components
import HeaderContainer from '@/components/Flight/HeaderContainer.vue'
import AirlinesLogos from '@/common/UI/AirlinesLogos.vue'
import FlightCards from '../components/BestDeals/FlightCards.vue'
import WorksContainer from '@/components/WorksContainer.vue'
import ReviewsVue from '@/components/ReviewsVue.vue'
import DescriptionVue from '@/components/Flight/DescriptionVue.vue'
import ContactVue from '@/components/ContactVue.vue'

export default {
    components: {
        HeaderContainer,
        AirlinesLogos,
        FlightCards,
        WorksContainer,
        DescriptionVue,
        ReviewsVue,
        ContactVue,
    },
    data() {
        return {
            text: null,
            destination: [],
        }
    },
    mounted() {
        let canonicalUrl

        // Verificăm tipul rutei și construim URL-ul canonical
        if (this.$route.name === 'flight-region') {
            const { region, id } = this.$route.params
            canonicalUrl = `https://buybusinessclass.com/flight/region/${region}/${id}`
        } else if (this.$route.name === 'flight-country') {
            const { country, id } = this.$route.params
            canonicalUrl = `https://buybusinessclass.com/flight/country/${country}/${id}`
        } else if (this.$route.name === 'flight-city') {
            const { city, id } = this.$route.params
            canonicalUrl = `https://buybusinessclass.com/flight/city/${city}/${id}`
        }

        if (canonicalUrl) {
            const canonicalLink = document.createElement('link')
            canonicalLink.rel = 'canonical'
            canonicalLink.href = canonicalUrl
            document.head.appendChild(canonicalLink)
        }
    },
}
</script>

<style lang="scss">
.flight-page {
    > .reviews-container {
        margin-bottom: 80px;
    }
}
</style>
