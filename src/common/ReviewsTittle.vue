<template>
    <div class="reviews-tittle">
        <div class="title">
            <h3 class="main-title">
                <span class="accent">99%</span> of Travelers <span class="accent">Recommend</span> BuyBusinessClass
            </h3>
        </div>
        <div class="subtitle-block">
            <!--<div class="five-stars">
                <star-vue v-for="index in 5" :key="`5-stars-container-${index}`" />
            </div>
            <p>
                <span class="bold">{{ `Excellent ${reviewsAddition.score}` }}</span>
                {{ `Based on ${reviewsAddition.reviewsCount} reviews on` }}
                <span class="align">Trustpilot.</span>
            </p>-->

            <!-- TrustBox widget - Micro Combo -->
            <div
                class="trustpilot-widget"
                data-locale="en-US"
                data-template-id="56278e9abfbbba0bdcd568bc"
                data-businessunit-id="5991787a0000ff0005a8d1d6"
                data-style-height="52px"
                data-style-width="100%"
            >
                <a href="https://www.trustpilot.com/review/buybusinessclass.com" target="_blank" rel="noopener"
                    >Trustpilot</a
                >
            </div>
            <!-- End TrustBox widget -->
        </div>
    </div>
</template>

<script>
// Components
// import StarVue from '@/common/Icons/StarVue.vue'

// Vuex
import { mapState } from 'vuex'

export default {
    components: {
        // StarVue,
    },
    computed: {
        ...mapState({
            reviewsAddition: (state) => state.reviews.reviewsAddition,
        }),
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.reviews-tittle {
    .title {
        @include block-title;
        margin-bottom: 48px;
    }
    .subtitle-block {
        margin-bottom: 48px;
        > .five-stars {
            display: flex;
            justify-content: center;
            margin-bottom: 16px;
            gap: 2px;
        }
        > p {
            font-size: 14px;
            color: #dadde0;
            font-family: 'Inter';
            text-align: center;
            > span.bold {
                font-weight: 600;
            }
            > span.align {
                font-weight: 400;
                color: #83bf6e;
            }
        }
    }

    @media screen and (max-width: 1440px) {
        .subtitle-block > p {
            font-size: 14px;
        }
    }

    @media screen and (max-width: 768px) {
        .title {
            margin-bottom: 8px;
        }
        .subtitle-block {
            > .five-stars {
                > .star-container {
                    width: fit-content;
                    > svg {
                        width: 24px;
                        height: 24px;
                    }
                }
            }
        }
    }
}
</style>
