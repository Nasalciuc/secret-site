<template>
    <div class="first-block flight-card-header">
        <div class="title">
            <div class="first-row">
                <p>Flight to</p>
                <p>Starting from</p>
            </div>
            <div class="second-row">
                <h2 class="destination">
                    {{ destination }}
                </h2>
                <p v-if="price !== null" xyz="fade" class="xyz-in">
                    {{ `$${price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` }}
                </p>
            </div>
            <p style="color: #c2c7cc; font-size: 12px; font-family: 'Inter', sans-serif">
                Up to 60-70% discount on business class
            </p>
        </div>
        <div class="departure-list">
            <div class="header">
                <div class="flex-grow-2">
                    {{ $route.params.city ? 'From' : 'Destination' }}
                </div>
                <div class="flex-grow-1">Old Price</div>
                <div class="flex-grow-1">Price Today</div>
            </div>
            <xyz-transition-group
                class="content"
                xyz="fade small appear-stagger"
                :appear="false"
                :appear-visible="true"
                v-if="departure.length"
            >
                <div v-for="item in departure.slice(0, 10)" :key="item.id" class="list">
                    <router-link
                        v-if="!$route.params.city"
                        :to="`/flight/${$route.params.region ? 'country' : 'city'}/${item.name.toLowerCase()}/${
                            item.id
                        }`"
                        class="container"
                    >
                        <div class="flex-grow-2">{{ item.name }}</div>
                        <div class="flex-grow-1 old-price">
                            {{
                                item.old_price
                                    ? `$${item.old_price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*`
                                    : 'No price is set'
                            }}
                        </div>
                        <div class="flex-grow-1 new-price">
                            {{
                                item.price_today
                                    ? `$${item.price_today?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*`
                                    : 'No price is set'
                            }}
                        </div>
                    </router-link>
                    <div v-else class="container">
                        <div class="flex-grow-2">{{ item.name }}</div>
                        <div class="flex-grow-1 old-price">
                            {{
                                item.old_price
                                    ? `$${item.old_price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*`
                                    : 'No price is set'
                            }}
                        </div>
                        <div class="flex-grow-1 new-price">
                            {{
                                item.price_today
                                    ? `$${item.price_today?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*`
                                    : 'No price is set'
                            }}
                        </div>
                    </div>
                </div>
            </xyz-transition-group>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        destination: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        departure: {
            type: Array,
            default: () => [],
        },
    },
}
</script>

<style lang="scss">
.first-block.flight-card-header {
    padding: 24px;
    background: #1a1d1f8f;
    > .title {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 16px;
        > * {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        > .first-row {
            color: #c2c7cc;
            font: {
                size: 12px;
                family: 'Inter', sans-serif;
            }
        }
        > .second-row {
            color: #b4853b;
            font: {
                family: 'SSP-bold', sans-serif;
                size: 32px;
            }
            > .destination {
                text-transform: capitalize;
                font-size: 30px;
            }
        }
    }
    > .departure-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
        background: none;
        > .header {
            color: #b4853b;
            font: {
                family: 'SSP-bold', sans-serif;
                size: 12px;
            }
        }
        > .content > .list > .container {
            color: #efefef;
            text-decoration: none;
            margin: 0;
            font: {
                family: 'Inter', sans-serif;
                weight: 700;
                size: 15px;
            }
        }
        > .header,
        > .content > .list > .container {
            display: flex;
            padding: 8px 12px;
            border: 1px solid #33383f;
            border-radius: 8px;
            > .flex-grow-1 {
                flex-grow: 1;
                text-align: right;
                width: 0;
                &.old-price {
                    text-decoration: line-through;
                }
            }
            > .flex-grow-2 {
                flex-grow: 2;
                width: 0;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .departure-list {
            > .header > *:nth-child(2),
            > .content > .list > *:nth-child(2) {
                display: none;
            }
        }
    }
}
</style>
