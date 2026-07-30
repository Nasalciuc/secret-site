<template>
    <div class="xyz-in" xyz="fade left-50% duration-15 delay-5">
        <div class="flight-description-new">
            <div class="title">
                <h1 class="main-title" style="font-family: 'SSP-bold'">About Buy Business Class</h1>
            </div>
            <div class="title">
                <h2 class="main-title">
                    <span class="capitalize" style="font-size: 24px">Elevate Your Travel Experience </span>
                </h2>
            </div>

            <p class="content" style="text-align: center">
                At Buy Business Class, we don't just book flights, we create tailored, premium travel experiences.
                Whether you're a business professional seeking efficiency or a luxury traveler looking for comfort, we
                specialize in providing Business and First Class tickets with exclusive savings. Our mission is simple:
                to make luxury air travel accessible, seamless, and cost-effective, offering cheap business class
                tickets without compromising on quality.
            </p>
        </div>

        <IconsBlock />
    </div>
</template>

<script>
import IconsBlock from './IconsBlock.vue'

// Components

export default {
    components: {
        IconsBlock,
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.flight-description-new {
    margin-bottom: 80px;
    padding-top: 10%;
    background: url('@/assets/images/static/bg.png') no-repeat center center; // Adaugă imaginea ca background
    background-size: cover;
    background-position: center 20%;

    > .title {
        @include block-title;

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
        padding-top: 30%;
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
                size: 38px !important;
            }
        }

        > .content {
            font-size: 12px; // Smaller content text for mobile
        }
    }
}
</style>
