<template>
    <div>
        <FirstBlock />
        <OrderFlyBlock />

        <SecondBlock />
        <SeoContent />
    </div>
</template>

<!-- eslint-disable no-empty -->

<script>
import FirstBlock from '@/components/BusinessFlights/FirstBlock.vue'
import OrderFlyBlock from '@/components/BusinessFlights/OrderFlyBlock.vue'
import SecondBlock from '@/components/BusinessFlights/SecondBlock.vue'
import SeoContent from '@/components/BusinessFlights/SeoContent.vue'

// Components

export default {
    components: { FirstBlock, OrderFlyBlock, SecondBlock, SeoContent },
    mounted() {
        const canonicalUrl = `https://buybusinessclass.com/business-class-flights`

        const canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        canonicalLink.href = canonicalUrl
        document.head.appendChild(canonicalLink)
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';
</style>
