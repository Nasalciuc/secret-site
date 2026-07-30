<template>
    <div style="padding-top: 7%; margin-left: 0 !important; margin-right: 0" class="regions-friday">
        <RegionVue />
    </div>
    <div class="container-friday d-flex" style="height: 100vh">
        <!-- Partea stângă: Imaginea -->
        <div class="left-image-friday" style="flex: 1">
            <img
                :src="require('@/assets/images/static/bg-friday.png')"
                alt="Imagine Full"
                class="img-fluid h-100 w-100"
                style="object-fit: cover"
                loading="lazy"
                decoding="async"
            />
        </div>

        <!-- Partea dreaptă: Componentul -->
        <div class="right-component" style="flex: 1; padding: 20px">
            <BlackFridaySearch />
        </div>
    </div>
    <div class="review-friday">
        <ReviewsVue />
    </div>
</template>

<!-- eslint-disable no-empty -->

<script>
import BlackFridaySearch from '../common/BlackFridaySearch.vue'
import RegionVue from '../components/HeaderForm/FlightCard/RegionVue.vue'
import ReviewsVue from '../components/ReviewsVue.vue'

// Components

export default {
    components: { BlackFridaySearch, ReviewsVue, RegionVue },
    mounted() {
        const canonicalUrl = `https://buybusinessclass.com/black-friday-busines-class-seat-sale`

        const canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        canonicalLink.href = canonicalUrl
        document.head.appendChild(canonicalLink)
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.container-friday {
    display: flex;
    flex-direction: row;
    padding-top: 5%;

    // Media query pentru ecrane mici
    @media (max-width: 768px) {
        flex-direction: column;
        padding-top: 5%;
        height: auto;
    }
}

.left-image-friday {
    flex: 1;

    // Ajustare dimensiuni imagine pentru ecrane mici
    @media (max-width: 768px) {
        height: 50vh;
    }
}
.review-friday {
    margin-top: -10%;
}

.right-component {
    flex: 1;
    padding: 20px;

    // Spațiere ajustată pentru ecrane mici
    @media (max-width: 768px) {
        padding: 10px;
    }
}
@media (max-width: 768px) {
    .review-friday {
        padding-top: 30%;
    }
    .left-image-friday {
        margin-left: 5%;
    }
}
</style>
