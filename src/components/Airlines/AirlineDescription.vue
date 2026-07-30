<template>
    <div class="flight-description">
        <div class="title">
            <h1 class="main-title">
                <span class="accent">{{ title }}</span>
                <span class="capitalize">{{ subtitle }} </span>
            </h1>
        </div>
        <p class="content">
            {{ details }}
        </p>
        <div class="title">
            <h2 class="main-title">
                <span class="capitalize">{{ second }} </span>
            </h2>
        </div>
        <p class="content" v-html="paragraph"></p>
        <div class="title">
            <h2 class="main-title">
                <span class="capitalize">{{ facts_title }} </span>
            </h2>
        </div>
        <p class="content" v-html="facts"></p>
    </div>
    <WorksContainer />
</template>

<script>
import WorksContainer from '../WorksContainer.vue'

// Components

export default {
    components: {
        WorksContainer,
    },
    props: {
        details: {
            type: String,
        },
        title: {
            type: String,
        },
        subtitle: {
            type: String,
        },
        second: {
            type: String,
        },
        paragraph: {
            type: String,
        },
        facts_title: {
            type: String,
        },
        facts: {
            type: String,
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
