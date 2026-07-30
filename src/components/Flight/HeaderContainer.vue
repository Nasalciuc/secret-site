<template>
    <div class="outer-block">
        <div class="content flight-header-content" :style="{ backgroundImage: `url(${image})` }">
            <div class="overlay" />
            <region-vue
                :root="root"
                :countries="countries"
                :cities="cities"
                :rootCity="rootCity"
                :rootCountry="rootCountry"
            />
            <div class="blocks">
                <div class="adaptive-dropdowns">
                    <transparent-select
                        class="left-ul"
                        v-if="regions.regions.length"
                        :value="$route.params.region ?? root"
                        :label="'name'"
                        :options="regions.regions"
                        :link="`/flight/region`"
                    />
                    <transparent-select
                        class="center-ul"
                        v-if="countries.length"
                        :value="rootCountry || `Countries (${countries.length})`"
                        :label="'name'"
                        :options="countries"
                        :link="`/flight/country`"
                    />
                    <transparent-select
                        class="right-ul"
                        v-if="cities.length"
                        :value="rootCity || `Cities (${cities.length})`"
                        :label="'name'"
                        :options="cities"
                        :link="`/flight/city`"
                    />
                </div>
                <div class="adaptive-title">
                    <p>Flight to</p>
                    <h1 style="color: #b4853b; text-transform: capitalize; font-family: 'SSP-bold', sans-serif">
                        {{ $route.params.city || $route.params.country || $route.params.region }}
                    </h1>
                    <br />
                    <p>Starting from</p>
                    <span v-if="price">
                        {{ `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*` }}
                    </span>
                </div>
                <first-block
                    :price="price"
                    :departure="destination"
                    :destination="`${$route.params.city || $route.params.country || $route.params.region}`"
                />
                <second-block />
            </div>
        </div>
    </div>
</template>

<script>
// Components
import FirstBlock from '../HeaderForm/FlightCard/FirstBlock.vue'
import SecondBlock from '../HeaderForm/FlightCard/SecondBlock.vue'
import RegionVue from '../HeaderForm/FlightCard/RegionVue.vue'
import TransparentSelect from '@/common/Forms/TransparentSelect.vue'

// Vuex
import { mapState } from 'vuex'

// Controllers
import { getBestDeal } from '@/controllers/flyController'

export default {
    components: {
        FirstBlock,
        SecondBlock,
        RegionVue,
        TransparentSelect,
    },
    props: {
        destination: {
            type: Array,
        },
    },
    metaInfo() {
        if (this.meta === null) {
            return {}
        }

        const meta = { ...this.meta }

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
    computed: {
        ...mapState({
            regions: (state) => state.region.regions,
        }),
    },
    data() {
        return {
            root: '',
            rootCountry: '',
            rootCity: '',
            image: null,
            price: null,
            meta: null,
            countries: [],
            cities: [],
        }
    },
    async beforeCreate() {
        const [result, error] = await getBestDeal(this.$route.params.id)

        if (error === null) {
            this.meta = result.meta
            this.price = result.minPrice.price_today
            this.image = `${process.env.VUE_APP_BACK}/storage/${result.image}`

            if (result.selector.bloodline) {
                const [region, country, city] = result.selector.bloodline

                if (region) {
                    this.root = region.name.toLowerCase()
                }

                if (country) {
                    this.rootCountry = country.name.toLowerCase()
                }

                if (city) {
                    this.rootCity = city.name.toLowerCase()
                }
            }

            if (result.selector.countries) {
                this.countries = result.selector.countries
            }

            if (result.selector.cities) {
                this.cities = result.selector.cities
            }

            this.$emit('about', result.about)
            this.$emit('cards', result.bestDeals)
        }
    },
    beforeUnmount() {
        this.meta = null
    },
}
</script>

<style lang="scss" src="@/styles/flight-card-header.scss"></style>
