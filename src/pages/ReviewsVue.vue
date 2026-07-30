<template>
    <div class="header-content">
        <header-container />
    </div>
    <airlines-logos />
    <reviews-container />
    <works-container />
    <contact-vue />
</template>

<!-- eslint-disable no-empty -->

<script>
// Components
import HeaderContainer from '@/components/Reviews/HeaderContainer.vue'
import AirlinesLogos from '@/common/UI/AirlinesLogos.vue'
import ReviewsContainer from '@/components/Reviews/ReviewsContainer.vue'
import WorksContainer from '@/components/WorksContainer.vue'
import ContactVue from '@/components/ContactVue.vue'

export default {
    components: {
        HeaderContainer,
        AirlinesLogos,
        ReviewsContainer,
        WorksContainer,
        ContactVue,
    },
    metaInfo: {
        title: 'Reviews',
    },
}
</script>

<style></style>
