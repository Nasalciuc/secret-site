<template>
    <div class="offer-content">
        <div
            class="img-block"
            :style="{
                backgroundImage: `linear-gradient(
          180deg,
          rgba(7, 8, 17, 0) 0%,
          rgba(7, 8, 17, 0.88) 100%
        ), url(${imgUrl})`,
            }"
        >
            <div class="content-info">
                <p class="title">{{ title }}</p>
                <p class="price">{{ `$${price}` }}</p>
                <p class="extra-info">{{ extraInfo }}</p>
            </div>
        </div>
        <slot name="button" />
    </div>
</template>

<script>
export default {
    props: {
        imgUrl: {
            type: String,
            default: () => 'default.png',
        },
        title: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        extraInfo: {
            type: String,
            default: () => '',
        },
    },
}
</script>

<style lang="scss">
.offer-content {
    position: relative;
    > .img-block {
        display: flex;
        align-items: flex-end;
        margin: 0 auto;
        position: relative;
        width: 320px;
        border-radius: 16px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 16px;
        > .content-info {
            padding: 24px;
            > .title {
                color: #fff;
                text-align: left;
                font: {
                    weight: 400;
                    size: 24px;
                    family: 'SSP-regular', sans-serif;
                }
            }
            > .price {
                color: #fff;
                text-align: left;
                margin-bottom: 12px;
                font: {
                    family: 'OpenSans', sans-serif;
                    weight: 700;
                    size: 24px;
                }
            }
            > .extra-info {
                color: #fff;
                font: {
                    family: 'Inter', sans-serif;
                    size: 13px;
                }
            }
        }
    }
    > button,
    > a {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
    }
}
</style>
