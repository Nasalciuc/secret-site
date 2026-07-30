<template>
    <div class="blog-card-container">
        <img :src="imgUrl" loading="lazy" decoding="async" />
        <div class="main-title">{{ title }}</div>
        <div class="subtitle" v-html="body" />
        <black-with-orange-text-button :buttonText="`Read More`" :link="{ name: 'inner-blog', params: { id } }" />
    </div>
</template>

<script>
// Components
import BlackWithOrangeTextButton from './UI/Buttons/BlackWithOrangeTextButton.vue'

export default {
    components: {
        BlackWithOrangeTextButton,
    },
    props: {
        imgUrl: {
            type: String,
            default: () => 'default.png',
        },
        title: {
            type: String,
            default: () => '',
        },
        body: {
            type: String,
            require: true,
        },
        id: {
            type: String,
            require: true,
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.blog-card-container {
    @include block-title;
    > img {
        position: relative;
        width: -webkit-fill-available;
        margin-bottom: 32px;
        border-radius: 16px;
    }
    > * {
        text-align: left !important;
    }
    > .subtitle {
        margin-bottom: 32px;
        color: #c2c7cc;
        line-height: 24px;
        font: {
            family: 'Inter', sans-serif;
            weight: 400;
            size: 0.9vw;
        }
        a {
            text-decoration: underline;
        }
    }
    > .black-orange-button {
        width: fit-content;
        > button {
            font-size: 15px;
        }
    }
}
</style>
