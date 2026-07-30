<template>
    <div class="regions-container">
        <div :class="`regions ${region ? 'show' : 'hide'}`">
            <div class="title" @click="showMenu('region')">
                <span>Region</span>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13 7L7 1L1 7"
                        stroke="#b4853b"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div class="container">
                <router-link
                    class="region-card"
                    v-for="item in regions.slice(0, 7)"
                    :key="`regions-${item.id}`"
                    :to="{
                        name: 'flight-region',
                        params: {
                            id: item.id,
                            region: item.name.toLowerCase(),
                        },
                    }"
                >
                    {{ `Business class flights to ${item.name}` }}
                </router-link>
                <black-with-orange-text-button :buttonText="`View More`" :link="'/all-deals'" />
            </div>
        </div>
        <div :class="`countries ${country ? 'show' : 'hide'}`">
            <div class="title" @click="showMenu('countries')">
                <span>Countries</span>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13 7L7 1L1 7"
                        stroke="#b4853b"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div class="container">
                <router-link
                    class="country-card"
                    v-for="item in countries.slice(0, 7)"
                    :key="`countries-${item.id}`"
                    :to="{
                        name: 'flight-country',
                        params: {
                            id: item.id,
                            country: item.name.toLowerCase(),
                        },
                    }"
                >
                    {{ `Business class flights to ${item.name}` }}
                </router-link>
                <black-with-orange-text-button :buttonText="`View More`" :link="'/all-deals'" />
            </div>
        </div>
        <div :class="`cities ${city ? 'show' : 'hide'}`">
            <div class="title" @click="showMenu('city')">
                <span>City</span>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13 7L7 1L1 7"
                        stroke="#b4853b"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div class="container">
                <router-link
                    class="city-card"
                    v-for="item in cities.slice(0, 7)"
                    :key="`cities-${item.id}`"
                    :to="{
                        name: 'flight-city',
                        params: {
                            id: item.id,
                            city: item.name.toLowerCase(),
                        },
                    }"
                >
                    {{ `Business class flights to ${item.name}` }}
                </router-link>
                <black-with-orange-text-button :buttonText="`View More`" :link="'/all-deals'" />
            </div>
        </div>
    </div>
</template>

<script>
// Components
import BlackWithOrangeTextButton from '@/common/UI/Buttons/BlackWithOrangeTextButton.vue'

// Vuex
import { mapState } from 'vuex'

export default {
    components: {
        BlackWithOrangeTextButton,
    },
    computed: {
        ...mapState({
            countries: (state) => state.region.regions.countries,
            cities: (state) => state.region.regions.cities,
            regions: (state) => state.region.regions.regions,
            appWidth: (state) => state.app.appWidth,
        }),
    },
    data() {
        return {
            region: false,
            country: false,
            city: false,
        }
    },
    methods: {
        showMenu(value) {
            if (this.appWidth > 1200) {
                return
            }

            switch (value) {
                case 'region':
                    this.city = false
                    this.country = false
                    this.region = !this.region
                    return
                case 'countries':
                    this.city = false
                    this.region = false
                    this.country = !this.country
                    return
                default:
                    this.region = false
                    this.country = false
                    this.city = !this.city
            }
        },
    },
    mounted() {
        if (!this.$store.state.region.regionsIsLoaded) {
            this.$store.dispatch('getRegions')
        }
    },
}
</script>

<style lang="scss">
.regions-container {
    display: flex;
    justify-content: center;
    margin-bottom: 80px;
    gap: 32px;
    > * {
        padding: 24px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        border: 1px solid #1a1d1f;
        > .title {
            margin-bottom: 16px;
            border-radius: 16px;
            height: 20px;
            position: relative;
            > span {
                position: absolute;
                width: calc(100% - 48px);
                text-align: left;
                color: #dadde0;
                background: none;
                font: {
                    family: 'SSP-Regular', sans-serif;
                    size: 20px;
                }
            }
            > svg {
                transition: 0.2s ease-in;
                display: none;
                margin-left: auto;
            }
        }
        > .container {
            height: -webkit-fill-available;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            min-width: 120px;
            > .region-card,
            > .country-card,
            > .city-card {
                color: #b4853b;
                margin-bottom: 4px;
                line-height: 24px;
                font: {
                    family: 'Inter', sans-serif;
                    size: 13px;
                    weight: 600;
                }
            }
            > .black-orange-button {
                margin-top: 16px;
                > button {
                    padding: 100px 20px 8px 20px;
                    font-size: 15px;
                }
            }
        }
    }
    @media screen and (max-width: 1200px) {
        flex-direction: column;
        gap: 16px;
        > * {
            position: relative;
            overflow: hidden;
            cursor: pointer;
            padding: 0;
            > .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0;
                background: #1e1e1e;
                z-index: 100;
                > svg {
                    display: block;
                }
            }
            > .container {
                transition: 0.4s;
                height: fit-content;
                &.padding {
                    padding-bottom: 24px;
                }
            }
            > * {
                padding: 24px;
            }
            &.hide {
                > .container {
                    position: absolute;
                    transform: translateY(-100%);
                    width: calc(100% - 48px);
                }
            }
            &.show {
                > .container {
                    transform: translateY(0%);
                }
                > .title > svg {
                    transform: rotate(180deg);
                }
            }
        }
    }
}
</style>
