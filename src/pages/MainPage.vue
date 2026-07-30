<template>
    <div class="main-page">
        <div class="header-content">
            <header-container v-mounted="() => (animate = true)" />
        </div>
        <airlines-logos />
        <works-container :animate="animate" />
        <best-selling-vue />
        <reviews-vue />
        <GoogleReview />
        <regions-vue />
        <SeoContent />
        <FaqMain />
        <SubscribePage />
        <contact-vue />
    </div>
</template>

<script>
// Components
import AirlinesLogos from '@/common/UI/AirlinesLogos.vue'
import HeaderContainer from '@/components/MainPage/HeaderContainer.vue'
import WorksContainer from '@/components/WorksContainer.vue'
import BestSellingVue from '@/components/MainPage/BestSelling.vue'
import ReviewsVue from '@/components/ReviewsVue.vue'
import GoogleReview from '@/components/GoogleReview.vue'
import ContactVue from '@/components/ContactVue.vue'
import RegionsVue from '@/components/RegionsVue.vue'
import FaqMain from '@/components/MainPage/FaqMain.vue'
import SeoContent from '@/components/MainPage/SeoContent.vue'
import SubscribePage from './SubscribePage.vue'

export default {
    components: {
        AirlinesLogos,
        HeaderContainer,
        WorksContainer,
        BestSellingVue,
        ReviewsVue,
        GoogleReview,
        ContactVue,
        RegionsVue,
        FaqMain,
        SeoContent,
        SubscribePage,
    },
    data() {
        return {
            animate: false,
        }
    },
    metaInfo: {
        title: '',
    },
    mounted() {
        const canonicalUrl = `https://buybusinessclass.com/`

        const canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        canonicalLink.href = canonicalUrl
        document.head.appendChild(canonicalLink)
    },
}
</script>

<style lang="scss">
@import 'v-calendar/style.css';

.main-page {
    position: relative;
    .reviews-container {
        margin-bottom: 80px;
    }
}
</style>
