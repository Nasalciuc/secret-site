<template>
    <div class="header-content">
        <header-container :header="headerBlog" />
    </div>
    <div v-if="isLoaded" class="inner-blog-page" xyz="fade small stagger">
        <airlines-logos />
        <div class="cards-container">
            <blog-card class="xyz-in" v-for="item in currentBlog" :key="`blog-key-${item.id}`" :item="item" />
        </div>
    </div>
</template>

<!-- eslint-disable no-empty -->

<script>
// Components
import HeaderContainer from '@/components/Blog/InnerBlog/HeaderContainer.vue'
import AirlinesLogos from '../common/UI/AirlinesLogos.vue'
import BlogCard from '@/components/Blog/InnerBlog/BlogCard.vue'

// Axios
import axios from 'axios'

// Controllers
import { getMeta } from '@/controllers/appController'

import { useMeta } from 'vue-meta'

export default {
    components: {
        HeaderContainer,
        AirlinesLogos,
        BlogCard,
    },
    data() {
        return {
            currentBlog: [],
            headerBlog: [],
            isLoaded: false,
        }
    },
    metaInfo() {
        return { ...(this.headerBlog.name ? { title: this.headerBlog.name } : {}) }
    },
    async mounted() {
        try {
            const result = await axios.get(`${process.env.VUE_APP_BACK}/api/articles/getOne`, {
                params: {
                    id: this.$route.params.id,
                },
            })

            if (result.data.responseCode.responseCode !== '1') {
                throw new Error('')
            }

            this.currentBlog = JSON.parse(result.data.data.body).blocks
            this.headerBlog = {
                name: result.data.data.name,
                imgUrl: `${process.env.VUE_APP_BACK}/storage/${result.data.data.image}`,
            }
            this.isLoaded = true
        } catch (error) {
            this.$router.push('/')
        }
    },
    async beforeCreate() {
        try {
            const metaManager = useMeta({})

            const [meta, error] = await getMeta('/reviews')

            if (error === null) {
                return
            }

            metaManager.meta.title = meta.title.title
            metaManager.meta.meta = meta.meta
        } catch {}
    },
}
</script>

<style lang="scss">
.inner-blog-page {
    > .cards-container {
        display: flex;
        flex-direction: column;
        width: 50%;
        padding: 40px 88px;
        margin: 8px auto 0 auto;
        border-radius: 16px;
        background: linear-gradient(102.21deg, #1a1d1f 0%, rgba(26, 29, 31, 0) 100%);
        @media screen and (max-width: 768px) {
            padding: 24px 16px;
            margin: 48px 0 0 0;
            width: 100%;
        }
    }
}
</style>
