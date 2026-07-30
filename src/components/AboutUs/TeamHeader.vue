<template>
    <div class="xyz-in" xyz="fade left-50% duration-15 delay-5">
        <div class="team-header">
            <div class="title">
                <h2 class="main-title" style="font-family: 'SSP-bold'">Meet Our Dedicated Team</h2>
            </div>

            <p class="content" style="text-align: center">
                At <b>Buy Business Class,</b> our team is made up of passionate travel experts who are dedicated to
                providing the highest level of service. Each member brings a wealth of knowledge and is personally
                invested in creating the best travel experiences for our clients.
            </p>
        </div>
    </div>
</template>

<script>
// Components

export default {
    components: {},
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.team-header {
    margin-bottom: 80px;
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
        padding-top: 20px;
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
                size: 38px !important;
            }
        }

        > .content {
            font-size: 12px; // Smaller content text for mobile
        }
    }
}
</style>
