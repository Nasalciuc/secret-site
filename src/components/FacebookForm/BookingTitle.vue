<template>
    <div class="xyz-in" xyz="fade left-50% duration-10 delay-2">
        <div class="business-flight-description">
            <div class="title">
                <h1 class="main-title" style="font-family: 'SSP-bold'">
                    Prepare for the largest - <br />
                    Business Class Flights Sale of the year!
                </h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
// Components
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.business-flight-description {
    margin-bottom: 3%;
    padding-top: 5%;

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
