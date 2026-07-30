<template>
    <div v-if="text !== null" class="flight-description">
        <div class="title">
            <h2 class="main-title">
                <span class="accent">Business Class Flights to</span>
                <span class="capitalize">
                    {{ $route.params.city || $route.params.country || $route.params.region }}
                </span>
            </h2>
        </div>
        <p class="content">
            <from-editor-to-text :blocks="text" :is="'description'" />
        </p>
    </div>
</template>

<script>
// Components
import FromEditorToText from '../../common/Forms/FromEditorToText.vue'

export default {
    components: {
        FromEditorToText,
    },
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
        margin-bottom: 32px;
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
