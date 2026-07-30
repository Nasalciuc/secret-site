<template>
    <div class="header-content">
        <header-container :blogs="blogs.slice(0, 5)" />
    </div>
    <airlines-logos />
    <blogs-container :blogs="blogs" />
</template>

<!-- eslint-disable no-empty -->

<script>
// Components
import HeaderContainer from '@/components/Blog/HeaderContainer.vue'
import BlogsContainer from '@/components/Blog/BlogsContainer.vue'
import AirlinesLogos from '@/common/UI/AirlinesLogos.vue'

// Vuex
import { mapState } from 'vuex'

export default {
    components: {
        HeaderContainer,
        BlogsContainer,
        AirlinesLogos,
    },
    metaInfo: {
        title: 'Blogs',
    },
    computed: {
        ...mapState({
            blogs: (state) => state.blog.blogs,
        }),
    },
    mounted() {
        if (!this.$store.state.blog.blogsIsLoaded) {
            this.$store.dispatch('getBlogs')
        }
    },
}
</script>

<style lang="scss">
.header-content {
    margin-bottom: 32px;
    border-radius: 16px;
}
.blog-cards-content {
    max-width: 1024px;
    margin: 0 auto 80px auto;
}
</style>
