<template>
    <div v-if="isPageFound" class="main-page">
        <div class="header-content">
            <header-container v-mounted="() => (animate = true)" />
        </div>
        <airlines-logos />
        <works-container :animate="animate" />
        <best-selling-vue />
        <reviews-vue />
        <description-vue :title="pageAbout.title" :text="pageAbout.body" />
        <contact-vue />
    </div>
    <Error404 v-else />
</template>

<script>
// Components
import Error404 from './404Error.vue'
import AirlinesLogos from '@/common/UI/AirlinesLogos.vue'
import HeaderContainer from '@/components/DynamicPage/HeaderContainer.vue'
import WorksContainer from '@/components/WorksContainer.vue'
import BestSellingVue from '@/components/MainPage/BestSelling.vue'
import ReviewsVue from '@/components/ReviewsVue.vue'
import DescriptionVue from '@/components/DynamicPage/DescriptionVue.vue'
import ContactVue from '@/components/ContactVue.vue'
import { mapState } from 'vuex'
import dynamicPagesData from '@/dynamicPages.json'

export default {
    components: {
        Error404,
        AirlinesLogos,
        HeaderContainer,
        WorksContainer,
        BestSellingVue,
        ReviewsVue,
        DescriptionVue,
        ContactVue,
    },
    data() {
        return {
            animate: false,
        }
    },
    metaInfo() {
        return {
            title: this.pageMeta.title,
            meta: [
                {
                    name: 'description',
                    content: this.pageMeta.description,
                },
                {
                    name: 'keywords',
                    content: this.pageMeta.keywords.join(', '),
                },
            ],
        }
    },
    computed: {
        pageSlug() {
            return this.$route.path.slice(1)
        },
        page() {
            return dynamicPagesData[this.pageSlug]
        },
        isPageFound() {
            return !!this.page
        },
        ...mapState({
            pageMeta: (state) => state.dynamic.meta,
            pageAbout: (state) => state.dynamic.about,
        }),
    },
    created() {
        if (this.isPageFound) {
            this.$store.commit('setDynamicPageMeta', this.page.meta)
            this.$store.commit('setDynamicPageAbout', this.page.about)
            this.$store.commit('setDynamicPageMainTitle', this.page.mainTitle)
        }
    },
    mounted() {
        this.$store.commit('stopQuoteLoading')
    },
}
</script>

<style lang="scss">
@import 'v-calendar/style.css';

.main-page {
    position: relative;
    overflow: hidden;
    .reviews-container {
        margin-bottom: 80px;
    }
}
</style>
