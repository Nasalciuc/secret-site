<template>
    <div class="content blog-page-header">
        <carousel class="header-blog-carousel">
            <slide v-for="item in blogs.slice(0, 5)" :key="`header-${item.imgUrl}`">
                <img :src="returnImgUrl(item.image)" alt="preview" loading="eager" />
                <div class="overlay" />
                <div class="blocks">
                    <div class="main-title">{{ item.name }}</div>
                    <div class="subtitle" v-html="returnText(item.description)"></div>
                    <orange-filled-button :buttonText="`Read more`" :link="`/blog/${item.id}`" />
                </div>
            </slide>
            <template #addons>
                <navigation />
                <pagination />
            </template>
        </carousel>
    </div>
</template>

<script>
// Components
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import OrangeFilledButton from '@/common/UI/Buttons/OrangeFilledButton.vue'

// Vuex
import { mapState } from 'vuex'

export default {
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        OrangeFilledButton,
    },
    props: {
        blogs: {
            type: Array,
            require: true,
        },
    },
    computed: {
        ...mapState({
            appWidth: (state) => state.app.appWidth,
        }),
    },
    methods: {
        returnText(text) {
            const splittedText = text.split(' ')

            switch (true) {
                case this.appWidth <= 768:
                    if (splittedText.length >= 15) {
                        return `${splittedText.slice(0, 15).join(' ')}...`
                    }
                    return text
                case this.appWidth <= 1200:
                    if (splittedText.length >= 30) {
                        return `${splittedText.slice(0, 30).join(' ')}...`
                    }
                    return text
                default:
                    return text
            }
        },
        returnImgUrl(url) {
            return `${process.env.VUE_APP_BACK}/storage/${url}`
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.content.blog-page-header {
    min-height: 75px;
    border-radius: 16px;

    @include header-block;
    .carousel {
        @include carousel-controllers;

        min-height: 536px;
        > button {
            display: none;
        }
        .carousel__viewport {
            border-radius: 16px;
            .carousel__slide {
                border-radius: 16px;
                > img {
                    display: block;
                    height: 100%;
                    min-width: 100%;
                }
                > .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(8, 9, 12, 0.72);
                    border-radius: inherit;
                }
                > .blocks {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 112px;
                    display: flex;
                    flex-direction: column;
                    @include block-title;
                    > .main-title {
                        font-size: 3.7vw;
                        margin-bottom: 24px;
                    }
                    > .subtitle,
                    > .subtitle > a {
                        color: #c2c7cc !important;
                        line-height: 24px;
                        margin-bottom: 24px;
                        font: {
                            weight: 400;
                            family: 'Inter', sans-serif;
                            size: 14px;
                        }
                    }
                    > .subtitle > a {
                        text-decoration: underline;
                    }
                    > .orange-filled-button {
                        margin: 0 auto;
                        width: fit-content;
                    }
                }
            }
        }
        .carousel__pagination {
            position: absolute !important;
            left: 50%;
            transform: translateX(-50%) !important;
            bottom: 20px !important;
        }
    }

    @media screen and (max-width: 1200px) {
        .carousel__slide {
            border-radius: 16px;
            overflow: hidden;
            > img {
                border-radius: 16px;
                min-width: 1200px !important;
                min-height: 500px;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .header-blog-carousel {
            position: relative;
            .carousel__slide {
                > .blocks {
                    width: 312px;
                    left: 16px;
                    transform: unset;
                    > * {
                        text-align: left !important;
                    }
                    > .orange-filled-button {
                        margin: 0 !important;
                    }
                }
            }
            > .carousel__pagination {
                left: 28px !important;
            }
        }
    }
}
</style>
