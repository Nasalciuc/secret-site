<template>
    <div class="reviews-container">
        <reviews-tittle />
        <xyz-transition :appear-visible="{ rootMargin: '-125px' }" :mode="'out-in'" xyz="fade down duration-10">
            <div class="comments">
                <carousel
                    :items-to-show="itemsToShow"
                    :autoplay="3000"
                    :wrap-around="true"
                    :snap-align="itemsToShow === 2 ? `center-even` : `center`"
                >
                    <slide v-for="(item, index) in reviews" :key="`${item.author_name}-${index}`">
                        <review-card
                            :name="item.author_name"
                            :topic="item.title"
                            :comment="item.body"
                            :stars="item.stars"
                        />
                    </slide>
                    <template #addons>
                        <navigation />
                        <pagination />
                    </template>
                </carousel>
            </div>
        </xyz-transition>
        <transparent-button buttonText="Read more reviews" :link="'/reviews'" />
    </div>
</template>

<script>
// Components
import ReviewCard from '@/common/ReviewCard.vue'
import ReviewsTittle from '@/common/ReviewsTittle.vue'
import TransparentButton from '@/common/UI/Buttons/TransparentButton.vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

// Vuex
import { mapState } from 'vuex'

export default {
    components: {
        ReviewsTittle,
        ReviewCard,
        Carousel,
        Slide,
        Pagination,
        Navigation,
        TransparentButton,
    },
    data() {
        return {
            itemsToShow: 3,
        }
    },
    computed: {
        ...mapState({
            reviews: (state) => state.reviews.reviews,
            appWidth: (state) => state.app.appWidth,
        }),
    },
    methods: {
        setItemsToShow(width) {
            switch (true) {
                case width <= 768:
                    this.itemsToShow = 1
                    return
                case width <= 1200:
                    this.itemsToShow = 2
                    return
            }

            this.itemsToShow = 3
        },
    },
    beforeCreate() {
        if (!this.$store.state.reviews.reviewsIsLoaded) {
            this.$store.dispatch('getReviews')
        }
    },
    watch: {
        appWidth(width) {
            this.setItemsToShow(width)
        },
    },
    mounted() {
        this.setItemsToShow(this.appWidth)
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';
.reviews-container {
    background: linear-gradient(0deg, rgba(8, 9, 12, 0.48), rgba(8, 9, 12, 0.48)),
        url('@/assets/images/static/plane.webp');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    border-radius: 16px;
    padding: 40px 88px;
    > .comments {
        margin-bottom: 48px;
        .carousel {
            @include carousel-controllers;
        }
    }

    @media screen and (max-width: 1440px) {
        padding: 40px 56px;
        .carousel {
            .carousel__track {
                .review-card-container {
                    > .review-card-header {
                        > .avatar {
                            font-size: 15px;
                        }
                        > .info-container {
                            > p {
                                font-size: 15px;
                            }
                        }
                    }
                    > .review-card-body {
                        > .topic {
                            font-size: 15px;
                        }
                        > .comment {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
        .transparent-button {
            font-size: 15px !important;
        }
    }

    @media screen and (max-width: 1200px) {
        background-size: auto 100%;
        padding: 48px 56px;
        .transparent-button {
            margin: auto;
        }
    }

    @media screen and (max-width: 768px) {
        padding: 24px 8px;
        .carousel {
            > button {
                display: none;
            }
        }
    }
}
</style>
