<template>
    <div class="inner-blog-header content" :style="{ backgroundImage: `url(${header.imgUrl})` }">
        <div class="overlay" />
        <div class="blocks">
            <h3>{{ header.name }}</h3>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        header: {
            type: Object,
            require: true,
        },
    },
}
</script>

<style lang="scss">
.content.inner-blog-header {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    min-height: 536px;
    background-repeat: no-repeat;
    background-size: cover;
    > .blocks {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        > h3 {
            color: #fff;
            font: {
                size: 56px;
                family: 'SSP-regular', sans-serif;
            }
        }
    }
    > .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(8, 9, 12, 0.72);
        border-radius: inherit;
    }

    @media screen and (max-width: 768px) {
        min-height: 340px;
        > .blocks {
            width: 100%;
            margin: 0 16px;
            > h3 {
                white-space: unset;
                font: {
                    size: 32px;
                    family: 'SSP-regular', sans-serif;
                    weight: 400;
                }
            }
        }
    }
}
</style>
