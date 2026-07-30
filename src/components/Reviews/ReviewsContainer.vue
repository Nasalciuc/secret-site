<template>
    <div class="reviews-cards-container">
        <div class="reviews-content">
            <review-card
                v-for="item in reviews.slice(0, limit)"
                :key="`${item.author_name}-${index}`"
                :name="item.author_name"
                :topic="item.title"
                :comment="item.body"
                :stars="item.stars"
            />
        </div>
        <transparent-button v-if="limit < reviews.length" :buttonText="`Load More`" :click="() => (limit += 5)" />
    </div>
</template>

<script>
// Components
import ReviewCard from '@/common/ReviewCard.vue'
import TransparentButton from '@/common/UI/Buttons/TransparentButton.vue'

// Vuex
import { mapState } from 'vuex'

export default {
    components: {
        ReviewCard,
        TransparentButton,
    },
    data() {
        return {
            limit: 5,
        }
    },
    computed: {
        ...mapState({
            reviews: (state) => state.reviews.reviews,
        }),
    },
}
</script>

<style lang="scss">
.reviews-cards-container {
    padding: 40px 176px 40px 176px;
    background: #08090c7a;
    background-image: url('@/assets/images/static/plane.webp');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-bottom: 80px;
    > .reviews-content > .review-card-container {
        margin: 0;
        width: 100%;
        margin-bottom: 32px;
    }

    @media screen and (max-width: 768px) {
        padding: 0;
        background: none;
        > .reviews-content {
            > .review-card-container {
                background: #1a1d1f;
                padding: 16px;
            }
        }
        > .button-container > button {
            width: 100%;
        }
    }
}
</style>
