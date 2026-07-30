<template>
    <div v-if="text !== null" class="flight-description">
        <div class="title">
            <div class="main-title">
                <span>{{ title }}</span>
            </div>
        </div>
        <p class="content">
            {{ text }}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: () => '',
        },
        title: {
            type: String,
            default: () => '',
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.flight-description {
    margin-bottom: 80px;
    > .title {
        @include block-title;
        margin: 0 25% 32px;

        > .main-title {
            text-align: left;
        }
    }
    > .content {
        white-space: break-spaces;
        color: #8e969e;
        margin: 0 25%;
        line-height: 24px;
        font: {
            weight: 400;
            family: 'Inter', sans-serif;
            size: 14px;
        }
    }

    @media screen and (max-width: 768px) {
        > .content {
            margin: 0 16px;
        }
    }
}
</style>
