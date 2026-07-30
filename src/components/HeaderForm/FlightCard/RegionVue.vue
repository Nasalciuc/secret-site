<template>
    <div class="region">
        <router-link class="direction" to="/all-deals">Show All</router-link>
        <router-link
            v-for="item in regions.regions"
            :key="`region-header-${item}`"
            :class="`direction ${item.name.toLowerCase() === root ? 'router-link-active' : ''}`"
            :to="
                bestDeals
                    ? `/best-deals/${item.name.toLowerCase()}/${item.id}`
                    : `/flight/region/${item.name.toLowerCase()}/${item.id}`
            "
            :title="item.name"
        >
            {{ item.name }}
        </router-link>
        <div class="direction-links">
            <transparent-select
                class="countries"
                v-if="countries?.length"
                :key="'transparent-select-root'"
                :options="countries"
                :label="'name'"
                :value="rootCountry || `Countries (${countries?.length ?? 0})`"
                :link="'/flight/country'"
            />
            <transparent-select
                class="cities"
                v-if="cities?.length"
                :key="'transparent-select-cities'"
                :options="cities"
                :label="'name'"
                :value="rootCity || `Cities (${cities?.length ?? 0})`"
                :link="'/flight/city'"
            />
        </div>
    </div>
</template>

<script>
// Components
import TransparentSelect from '@/common/Forms/TransparentSelect.vue'

// Vuex
import { mapState } from 'vuex'

export default {
    components: {
        TransparentSelect,
    },
    props: {
        bestDeals: {
            type: Boolean,
            default: () => false,
        },
        root: {
            type: String,
            default: () => '',
        },
        rootCountry: {
            type: String,
            default: () => '',
        },
        rootCity: {
            type: String,
            default: () => '',
        },
        countries: {
            type: Array,
            required: true,
        },
        cities: {
            type: Array,
            required: true,
        },
    },
    computed: {
        ...mapState({
            regions: (state) => state.region.regions,
        }),
    },
    mounted() {
        if (!this.$store.state.region.regionsIsLoaded) {
            this.$store.dispatch('getRegions')
        }
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.region {
    flex-basis: 100% !important;
    justify-content: unset !important;
    gap: 24px !important;
    padding: 16px !important;
    background: #00000029;
    border-radius: 8px !important;
    border: 1px solid rgba(0, 0, 0, 0.16);
    display: flex;
    > .direction {
        color: #c2c7cc;
        text-transform: capitalize;
        position: relative;
        font: {
            family: 'Inter', sans-serif;
            size: 15px;
            weight: 500;
        }
        &.router-link-active {
            @include after-active;

            &::after {
                bottom: -18px;
            }

            color: #fff;
            font-weight: 700;
        }
    }
    > .direction-links {
        margin-left: auto;
        display: flex;
    }
    @media (max-width: 768px) {
        gap: 12px;
        padding: 12px;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 15%;

        > .direction {
            font-size: 14px;
            padding: 8px 0;
        }

        > .direction-links {
            width: 100%;
            margin-top: 12px;
            justify-content: space-between;
        }

        .countries,
        .cities {
            width: 48%; // Adjust width for each dropdown to fit side-by-side
        }
    }

    @media (max-width: 480px) {
        gap: 8px;
        padding: 8px;

        .countries,
        .cities {
            width: 100%; // Full width for smaller screens
        }

        > .direction-links {
            flex-direction: column;
            gap: 8px;
        }
    }
}
</style>
