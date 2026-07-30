<template>
    <div class="header-content">
        <header-container />
    </div>
    <airlines-logos />
    <flight-cards />
    <works-container />
    <contact-vue />
</template>

<!-- eslint-disable no-empty -->

<script>
// Components
import HeaderContainer from '@/components/BestDeals/HeaderContainer.vue'
import AirlinesLogos from '@/common/UI/AirlinesLogos.vue'
import FlightCards from '@/components/BestDeals/FlightCards.vue'
import WorksContainer from '@/components/WorksContainer.vue'
import ContactVue from '@/components/ContactVue.vue'

// Controllers
import { getMeta } from '@/controllers/appController'

import { useMeta } from 'vue-meta'

export default {
    components: {
        HeaderContainer,
        AirlinesLogos,
        FlightCards,
        WorksContainer,
        ContactVue,
    },
    async beforeCreate() {
        try {
            const metaManager = useMeta({})

            const [meta, error] = await getMeta('/best-deals')

            if (error === null) {
                return
            }

            metaManager.meta.title = ''
            metaManager.meta.title = meta.title.title
            metaManager.meta.meta = meta.meta
        } catch {}
    },
    mounted() {
        const { region, id } = this.$route.params
        const canonicalUrl = `https://buybusinessclass.com/best-deals/${region}/${id}`

        const canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        canonicalLink.href = canonicalUrl
        document.head.appendChild(canonicalLink)
    },
}
</script>

<style lang="scss">
.header-container-content {
    position: relative;
}
</style>
