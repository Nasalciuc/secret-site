<template>
    <div>
        <div class="bottom-description">
            <TeamHeader />
            <TeamBlock />
            <div class="title">
                <div class="main-title">
                    <h2 class="accent" style="font-size: 43px">Our Promise</h2>
                </div>
            </div>

            <p class="content" style="text-align: center">
                We promise to deliver <b>fast, reliable customer service,</b> the <b>most competitive pricing,</b> and a
                <b>hassle-free booking experience.</b> We go the extra mile to make sure your journey begins the moment
                you book with us and extends all the way until you reach your final destination.
            </p>
            <div class="title" style="padding-top: 50px">
                <div class="main-title">
                    <h2 class="accent" style="font-size: 43px">Join Thousands of Happy Clients</h2>
                </div>
            </div>

            <p class="content" style="text-align: center">
                Ready to experience the best in Business Class travel? Contact us today to get a personalized quote and
                start your next journey with the comfort and luxury you deserve.
            </p>
            <p
                class="content"
                style="text-align: center; text-decoration: underline; cursor: pointer"
                @click="redirectToHome"
            >
                <b>Find Your Perfect Business Class Flight</b>
            </p>
            <div class="title" style="padding-top: 50px">
                <div class="main-title">
                    <h2 class="accent" style="font-size: 43px; color: #fff !important">Trust and Recognition</h2>
                </div>
            </div>

            <p class="content" style="text-align: center">
                We take pride in the trust our clients place in us. Over the years, Buy Business Class has garnered
                recognition for its commitment to premium air travel services. Our client satisfaction rates and
                positive testimonials speak for themselves, showcasing our dedication to ensuring you receive the best
                experience possible.
            </p>
        </div>
    </div>
</template>

<script>
import TeamBlock from './TeamBlock.vue'
import TeamHeader from './TeamHeader.vue'

// Components

export default {
    components: { TeamBlock, TeamHeader },
    methods: {
        redirectToHome() {
            this.$router.push({ path: '/' }) // Redirect to the home page
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.bottom-description {
    // background: url('@/assets/images/static/bg5.png') no-repeat;
    // background-size: 50%;
    // background-position: left 30%;
    background: url('@/assets/images/static/bg5.png') no-repeat center center; // Adaugă imaginea ca background

    background-position: left 10%;
    > .title {
        @include block-title;
        color: white;

        text-align: center;
        > .main-title {
            > .capitalize {
                display: inline-block;
                white-space: nowrap;
                text-transform: capitalize;

                &::before {
                    content: '\00a0';
                }
            }
        }
    }

    > .content {
        color: #8e969e;

        padding-top: 50px;
        margin: 0 25%;
        line-height: 24px;
        font: {
            weight: 400;
            family: 'Inter', sans-serif;
        }
    }

    @media screen and (max-width: 768px) {
        > .title > .main-title {
            font: {
                weight: 400;
                family: 'Inter', sans-serif;
                size: 16px !important;
            }
        }

        > .content {
            margin: 0 16px;
            font-size: 14px; // Smaller content text size for tablets
        }
    }

    @media screen and (max-width: 480px) {
        > .title > .main-title {
            font: {
                weight: 400;
                family: 'Inter', sans-serif;
                size: 14px !important;
            }
        }

        > .content {
            font-size: 12px; // Smaller content text for mobile
        }
    }
}
</style>
