<template>
    <div v-for="(blog, idx) in blogs" :key="`blog-${blog.imgUrl}-${idx}`" class="blog-cards-content">
        <blog-card
            :imgUrl="returnImgUrl(blog.image)"
            :title="blog.name"
            :body="blog.description"
            :id="blog.id.toString()"
        />
    </div>
</template>

<script>
// Components
import BlogCard from '@/common/BlogCard.vue'

export default {
    components: {
        BlogCard,
    },
    props: {
        blogs: {
            type: Array,
            require: true,
        },
    },
    methods: {
        returnImgUrl(url) {
            return `${process.env.VUE_APP_BACK}/storage/${url}`
        },
    },
}
</script>
