<template>
    <div class="first-block-best-deals">
        <region-vue
            :bestDeals="true"
            :root="$route.params.region"
            :countries="selector?.countries ?? []"
            :cities="selector?.cities ?? []"
        />
        <transparent-select
            v-if="regions.length"
            :options="regions"
            :label="'name'"
            :value="$route.params.region"
            :link="`/best-deals`"
        />
        <div class="description">
            <p>
                Best <span>deals</span> starting <br />
                <span>{{ name }}</span> at
                <span v-show="price !== undefined">${{ price }}*</span>
            </p>
            <orange-filled-button
                :buttonText="`View Offer Details`"
                :link="{
                    name: 'flight-region',
                    params: {
                        region: name.toLowerCase(),
                    },
                }"
            />
        </div>
    </div>
</template>

<script>
// Components
import RegionVue from '../FlightCard/RegionVue.vue'
import OrangeFilledButton from '@/common/UI/Buttons/OrangeFilledButton.vue'
import TransparentSelect from '@/common/Forms/TransparentSelect.vue'

// Vuex
import { mapState } from 'vuex'

export default {
    components: {
        RegionVue,
        OrangeFilledButton,
        TransparentSelect,
    },
    props: {
        price: {
            type: Number,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        selector: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState({
            regions: (state) => state.region.regions.regions,
        }),
    },
}
</script>

<style lang="scss">
.first-block-best-deals {
    background: none;
    > .region {
        width: fit-content;
        margin-bottom: 16px;
        > .v-select {
            display: none;
        }
    }
    > .description {
        > p {
            line-height: 64px;
            color: #c2c7cc;
            text-align: left;
            margin-bottom: 32px;
            font: {
                size: 56px;
                family: 'SSP-regular', sans-serif;
            }
            > span {
                color: #fff;
                font: {
                    family: 'SSP-bold', sans-serif;
                }
            }
        }
        > .orange-filled-button {
            width: fit-content;
        }
    }
}
</style>
