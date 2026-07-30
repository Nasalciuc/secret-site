<template>
    <div class="content best-deals-content" :style="{ backgroundImage: `url(${image})` }">
        <div class="overlay" />
        <div class="blocks">
            <first-block
                :name="$route?.params?.region"
                :price="flights?.minPrice?.price_today"
                :selector="flights.selector"
            />
            <second-block
                :price="flights?.minPrice?.price_today ?? null"
                :destination="$route?.params?.region"
                :departure="flights?.bestDeals ?? []"
                class="imported-second-block"
            />
        </div>
    </div>
</template>

<script>
// Components
import FirstBlock from '../HeaderForm/BestDeals/FirstBlock.vue'
import SecondBlock from '../HeaderForm/FlightCard/FirstBlock.vue'

// Controllers
import { getBestDeal } from '@/controllers/flyController'

export default {
    components: {
        FirstBlock,
        SecondBlock,
    },
    data() {
        return {
            flights: {},
            image: null,
        }
    },
    metaInfo() {
        if (!this.flights.meta) {
            return {}
        }

        const meta = { ...this.flights.meta }

        return {
            ...(meta.title !== null ? { title: meta.title } : {}),
            meta: Object.keys(meta.meta)
                .filter((cur) => meta.meta[cur] !== null)
                .map((cur) => ({
                    content: meta.meta[cur],
                    name: cur,
                })),
        }
    },
    async mounted() {
        const [result] = await getBestDeal(this.$route.params.id)

        this.flights = result
        this.image = `${process.env.VUE_APP_BACK}/storage/${result.image}`
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.content.best-deals-content {
    @include header-block;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% auto;
    min-height: 640px;
    > .blocks {
        width: 100%;
        display: flex;
        padding: 134px 88px 78px 88px;
        position: relative;
        z-index: 100;
        > .imported-second-block {
            background: #1a1d1f;
            border-radius: 16px;
            padding: 24px !important;
            margin-top: unset;
        }
        > * {
            flex-grow: 1;
            height: fit-content;
            justify-content: space-between;
        }
        > .first-block-best-deals > .v-select {
            display: none;
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

    @media screen and (max-width: 1440px) {
        > .blocks {
            padding: 134px 44px 78px 44px;
        }
    }

    @media screen and (max-width: 1200px) {
        background-size: auto 100%;
        > .blocks {
            flex-direction: column;
            transform: unset;
            > .first-block-best-deals {
                width: 100%;
                > .description {
                    display: flex;
                    align-items: flex-end;
                    margin-bottom: 24px;
                    gap: 8px;
                    > .orange-filled-button {
                        height: fit-content;
                        > a {
                            white-space: nowrap;
                        }
                    }
                    > p {
                        margin-bottom: 0;
                        > br {
                            display: none;
                        }
                    }
                }
            }
            > .imported-second-block {
                width: 100%;
            }
        }
    }

    @media screen and (max-width: 768px) {
        > .blocks {
            padding-left: 8px !important;
            padding-right: 8px !important;
            padding-bottom: 8px !important;
            > .first-block-best-deals {
                > .region {
                    display: none;
                }
                > .v-select {
                    display: block;
                    width: fit-content;
                }
                > .description {
                    display: block;
                    > p {
                        font-size: 32px;
                        line-height: 40px;
                        margin-bottom: 8px;
                    }
                }
            }
        }
        > img {
            width: unset !important;
        }
    }
}
</style>
