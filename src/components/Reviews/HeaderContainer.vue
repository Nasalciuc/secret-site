<template>
    <div class="content reviews-header-container">
        <div class="blocks reviews-header-content">
            <reviews-tittle />
            <orange-filled-button :buttonText="`Book a Flight`" :link="'/'" />
        </div>
    </div>
</template>

<script>
// Components
import ReviewsTittle from '@/common/ReviewsTittle.vue'
import OrangeFilledButton from '@/common/UI/Buttons/OrangeFilledButton.vue'

export default {
    components: {
        ReviewsTittle,
        OrangeFilledButton,
    },
}
</script>

<style lang="scss">
.content.reviews-header-container {
    background-image: url('@/assets/images/static/reviews-header.webp');
    background-repeat: no-repeat;
    background-size: 100% auto;
    border-radius: 16px;
    min-height: 536px;
    > .reviews-header-content {
        flex-direction: column;
        row-gap: unset;
        position: absolute;
        top: 148px;
        left: 50%;
        transform: translateX(-50%);
        > * {
            width: 100%;
        }
        > .orange-filled-button {
            width: fit-content;
            margin: 0 auto;
        }
    }

    @media screen and (max-width: 1440px) {
        background-size: auto 100%;
    }

    @media screen and (max-width: 768px) {
        > .reviews-image {
            width: unset;
        }
        > .reviews-header-content {
            width: calc(100% - 32px);
            margin: 0 16px;
            > .reviews-tittle {
                > .title {
                    margin-bottom: 48px;
                }
                > .subtitle-block {
                    svg {
                        height: 32px;
                        width: 32px;
                    }
                }
            }
            > .orange-filled-button {
                > button {
                    font-size: 15px;
                    font-weight: 700;
                }
            }
        }
    }
}
</style>
