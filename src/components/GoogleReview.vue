<template>
    <div class="google-review-wrapper">
        <a :href="reviewLink" target="_blank" rel="noopener noreferrer">
            <img
                :src="require('@/assets/images/static/google-reviews.webp')"
                alt="Google Map"
                class="google-review-img"
                loading="lazy"
                decoding="async"
            />
        </a>
    </div>
    <GoogleReviewCarousel />
</template>

<script>
import GoogleReviewCarousel from './MainPage/GoogleReviewCarousel.vue'

export default {
    components: { GoogleReviewCarousel },
    name: 'GoogleReview',
    data() {
        return {
            reviewLink: 'https://g.page/r/CesDQbfDx7lREAE/review',
        }
    },
}
</script>

<style scoped>
.google-review-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    width: 100%;
    margin-bottom: 30px;
}

.google-review-img {
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 250px;
    width: 100%;
    height: auto;
}

.google-review-img:hover {
    transform: scale(1.03);
}
</style>
