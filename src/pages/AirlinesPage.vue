<template>
    <div>
        <AirlinesCarousel />
    </div>
</template>

<script>
import AirlinesCarousel from '@/components/Airlines/AirlinesCarousel.vue'

export default {
    components: {
        AirlinesCarousel,
    },
    mounted() {
        const canonicalUrl = `https://buybusinessclass.com/airlines`

        const canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        canonicalLink.href = canonicalUrl
        document.head.appendChild(canonicalLink)
    },
}
</script>
