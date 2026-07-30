<template>
    <div>
        <FirstBlock />
        <SecondBlock />
        <ThirdBlock />
        <BottomBlock />
    </div>
</template>

<script>
import BottomBlock from '../components/AboutUs/BottomBlock.vue'
import FirstBlock from '../components/AboutUs/FirstBlock.vue'
import SecondBlock from '../components/AboutUs/SecondBlock.vue'
import ThirdBlock from '../components/AboutUs/ThirdBlock.vue'

export default {
    components: { FirstBlock, SecondBlock, ThirdBlock, BottomBlock },
    mounted() {
        const canonicalUrl = `https://buybusinessclass.com/about-us`

        const canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        canonicalLink.href = canonicalUrl
        document.head.appendChild(canonicalLink)
    },
}
</script>
