<template>
    <div class="reviews-container">
        <reviews-tittle />
        <transparent-button
            button-text="Read more"
            regular-link
            link="https://www.trustpilot.com/review/buybusinessclass.com"
            target="_blank"
        />
    </div>
</template>

<script>
// Components
import ReviewsTittle from '@/common/ReviewsTittle.vue'
import TransparentButton from '@/common/UI/Buttons/TransparentButton.vue'

// Vuex
import { mapState } from 'vuex'

export default {
    components: {
        ReviewsTittle,
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
