<template>
    <div class="best-selling-container">
        <div class="title">
            <h2 class="main-title">
                <span class="accent">Discounted</span> Business Class <span class="accent">Flights</span>
            </h2>
            <p class="subtitle">Save up to 60%</p>
        </div>
        <div class="cards-container">
            <carousel>
                <slide class="card-container" v-for="index in totalItems" :key="`best-selling-${index}-${key}`">
                    <xyz-transition-group
                        :appear="false"
                        :appear-visible="true"
                        xyz="fade small out-down out-rotate-right appear-stagger"
                    >
                        <offer-card
                            v-for="item in bestSelling.slice((index - 1) * (columns * rows), index * (columns * rows))"
                            :key="`${item.id}`"
                            :title="item.name"
                            :price="item.minPrice?.price_today ?? item.price_today"
                            :imgUrl="returnImgUrl(item.image)"
                            :extraInfo="item.extra_info ?? '60% off on business class flights'"
                        >
                            <template #button v-if="item.type">
                                <router-link
                                    :aria-label="`View ${item.name} page`"
                                    :to="`/flight/${item.type}/${item.name.toLowerCase()}/${item.id}`"
                                />
                            </template>
                        </offer-card>
                    </xyz-transition-group>
                </slide>
                <template #addons>
                    <navigation />
                    <pagination />
                </template>
            </carousel>
        </div>
        <div class="all-deals-button">
            <orange-filled-button class="all-deals-button" :buttonText="`See All Deals`" :link="'/all-deals'" />
        </div>
    </div>
</template>

<script>
// Components
import OfferCard from '@/common/OfferCard.vue'
import OrangeFilledButton from '@/common/UI/Buttons/OrangeFilledButton.vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

// Styles
import 'vue3-carousel/dist/carousel.css'

// Vuex
import { mapState } from 'vuex'

// Helpers
import { returnImgUrl } from '@/helpers/functions'

export default {
    components: {
        OfferCard,
        Carousel,
        Slide,
        Pagination,
        Navigation,
        OrangeFilledButton,
    },
    data() {
        return {
            columns: 3,
            rows: 2,
            key: Date.now(),
        }
    },
    computed: {
        ...mapState({
            appWidth: (state) => state.app.appWidth,
            bestSelling: (state) => state.region.bestSelling,
        }),
        totalItems() {
            this.changeKey()
            return Math.ceil(this.bestSelling.length / (this.columns * this.rows))
        },
    },
    methods: {
        resizeCarousel(width) {
            switch (true) {
                case width <= 768:
                    this.columns = 1
                    this.rows = 1
                    return
                case width <= 1200:
                    this.columns = 2
                    this.rows = 2
                    return
            }

            this.columns = 3
            this.rows = 2
        },
        changeKey() {
            this.key = Date.now()
        },
        returnImgUrl(url) {
            return returnImgUrl(url)
        },
    },
    watch: {
        appWidth(width) {
            this.resizeCarousel(width)
        },
    },
    mounted() {
        this.resizeCarousel(this.appWidth)

        if (!this.$store.state.region.bestSellingIsLoaded) {
            this.$store.dispatch('getBestSelling')
        }
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.best-selling-container {
    padding: 40px 88px 64px 88px;
    background: linear-gradient(102.21deg, #1a1d1f 0%, rgba(26, 29, 31, 0) 100%);
    border-radius: 16px;
    margin-bottom: 80px;
    > .title {
        @include block-title;
        margin-bottom: 32px;
        > .subtitle {
            text-align: center;
            color: #6f767e;
            font: {
                weight: 600;
                family: 'Inter';
                size: 13px;
            }
        }
    }

    .carousel {
        @include carousel-controllers;

        .carousel__viewport {
            padding: 20px 0;
        }

        .carousel__slide {
            > div {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(auto-fit, mimax(225px, 450px));
                width: 100%;
                row-gap: 32px;
                column-gap: 5%;
                padding: 0 48px;
                > .offer-content {
                    transition: transform ease-in-out 0.3s;

                    &:hover {
                        transform: scale(1.08);
                    }

                    > .img-block {
                        width: 100%;
                        aspect-ratio: 3/2;
                    }
                }
            }
        }
        .carousel__next,
        .carousel__prev {
            margin-top: -16px;
        }
    }

    > .all-deals-button {
        width: fit-content;
        margin-inline: auto;
        margin-top: 24px;
        text-align: center;

        a {
            display: block;
        }
    }

    @media screen and (max-width: 1440px) {
        padding: 40px 73px;
        .carousel__slide {
            > div > .offer-content {
                width: fit-content;
                margin: auto;
                > .img-block {
                    width: 280px;
                    > .content-info {
                        > .title {
                            margin-top: 94px;
                        }
                        > .price {
                            font-size: 24px;
                            margin-bottom: 8px;
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1200px) {
        padding: 40px 22px 64px 22px;
        .carousel {
            > button.carousel__prev {
                left: 0;
            }
            > button.carousel__next {
                right: 0;
            }
            .carousel__slide > div {
                grid-template-columns: repeat(2, 1fr) !important;
                > .offer-content {
                    > .img-block {
                        width: 260px !important;
                        > .content-info {
                            > .title {
                                margin-top: 94px;
                            }
                            > .price {
                                font-size: 24px;
                                margin-bottom: 8px;
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        padding: 24px 8px;
        .carousel {
            > button {
                display: none;
            }
            .carousel__slide > div {
                padding: 0;
                display: block !important;
                > .offer-content {
                    width: 100%;
                    > .img-block {
                        width: unset !important;
                    }
                    &.margin-left,
                    &.margin-right {
                        margin: auto;
                    }
                }
            }
        }
    }
}
</style>
