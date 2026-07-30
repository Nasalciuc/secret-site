<template>
    <div class="xyz-in" xyz="fade left-50% duration-15 delay-5">
        <div class="business-flight-description">
            <div class="title">
                <h1 class="main-title" style="font-family: 'SSP-bold'">
                    Cheap Business Class Flights – <br />
                    Exclusive Discounted Airline Tickets for 2025
                </h1>
            </div>

            <p class="content" style="text-align: center">
                Book your cheap business class tickets today and enjoy a luxurious business class flight with unbeatable
                deals and offers! Experience premium comfort on the cheapest business class flights from the USA to top
                destinations like Europe, Asia, Africa, India and many more! Thanks to BuyBusinessClass's exclusive
                partnerships with major airlines, we bring you discounts on business class tickets you won’t find
                anywhere else!
            </p>
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
    margin-bottom: 5%;
    padding-top: 10%;
    background: url('@/assets/images/static/bg-business.png') no-repeat center center; // Adaugă imaginea ca background
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
