<template>
    <div class="content qoute-header">
        <transition name="slide-fade" mode="out-in">
            <div class="blocks" v-if="!showCongrats">
                <div class="first-block">
                    <div style="padding-bottom: 10px; margin-right: 0">
                        <discount-vue />
                    </div>
                    <div :class="`destination-qoute d-flex ${$store.state.app.flightPrices !== true ? '' : 'column'}`">
                        <div :class="`from-to-block on-desktop ${additionalInfo.trip_type}`">
                            <div class="round-trip">
                                <div class="block">
                                    <div class="date">
                                        {{ additionalInfo.depart_at === 'null' ? null : additionalInfo.depart_at }}
                                    </div>
                                    <div class="info">
                                        <div class="from">
                                            <p class="airport">
                                                {{ additionalInfo.from ?? null }}
                                            </p>
                                            <p class="city">{{ from?.city }}</p>
                                        </div>
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M5.00065 0.666992L6.17661 0.666993C6.80789 0.666993 7.385 1.02366 7.66732 1.5883L9.4018 5.05727C9.48649 5.22666 9.65963 5.33366 9.84901 5.33366L12.0007 5.33366C12.9211 5.33366 13.6673 6.07985 13.6673 7.00033C13.6673 7.9208 12.9211 8.66699 12.0007 8.66699L9.84901 8.66699C9.65963 8.66699 9.4865 8.77399 9.4018 8.94339L7.66732 12.4123C7.385 12.977 6.80789 13.3337 6.17661 13.3337L5.00065 13.3337C4.89504 13.3337 4.79568 13.2836 4.73281 13.1987C4.66994 13.1139 4.65101 13.0043 4.68177 12.9032L5.87345 8.98982C5.92236 8.8292 5.80219 8.66699 5.63429 8.66699L4.08398 8.66699C3.92661 8.66699 3.77841 8.74109 3.68398 8.86699L3.13398 9.60033C2.94513 9.85213 2.64874 10.0003 2.33398 10.0003L0.667317 10.0003C0.551792 10.0003 0.444503 9.94051 0.383767 9.84224C0.323032 9.74396 0.31751 9.62125 0.369175 9.51792L1.62797 7.00033L0.369175 4.48273C0.317511 4.3794 0.323032 4.25669 0.383768 4.15842C0.444503 4.06014 0.551792 4.00033 0.667318 4.00033L2.33398 4.00033C2.64874 4.00033 2.94513 4.14852 3.13398 4.40033L3.68398 5.13366C3.77841 5.25956 3.92661 5.33366 4.08398 5.33366L5.63429 5.33366C5.80219 5.33366 5.92236 5.17145 5.87345 5.01083L4.68177 1.09743C4.65101 0.996397 4.66994 0.886763 4.73281 0.801902C4.79568 0.717041 4.89504 0.666992 5.00065 0.666992Z"
                                                fill="#33383F"
                                            />
                                        </svg>
                                        <div class="to">
                                            <p class="airport">
                                                {{ additionalInfo.to ?? null }}
                                            </p>
                                            <p class="city">{{ to?.city }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="block">
                                    <div class="date">
                                        {{ additionalInfo.return_at === 'null' ? null : additionalInfo.return_at }}
                                    </div>
                                    <div class="info">
                                        <div class="from">
                                            <p class="airport">
                                                {{ additionalInfo.to ?? null }}
                                            </p>
                                            <p class="city">{{ to?.city }}</p>
                                        </div>
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M5.00065 0.666992L6.17661 0.666993C6.80789 0.666993 7.385 1.02366 7.66732 1.5883L9.4018 5.05727C9.48649 5.22666 9.65963 5.33366 9.84901 5.33366L12.0007 5.33366C12.9211 5.33366 13.6673 6.07985 13.6673 7.00033C13.6673 7.9208 12.9211 8.66699 12.0007 8.66699L9.84901 8.66699C9.65963 8.66699 9.4865 8.77399 9.4018 8.94339L7.66732 12.4123C7.385 12.977 6.80789 13.3337 6.17661 13.3337L5.00065 13.3337C4.89504 13.3337 4.79568 13.2836 4.73281 13.1987C4.66994 13.1139 4.65101 13.0043 4.68177 12.9032L5.87345 8.98982C5.92236 8.8292 5.80219 8.66699 5.63429 8.66699L4.08398 8.66699C3.92661 8.66699 3.77841 8.74109 3.68398 8.86699L3.13398 9.60033C2.94513 9.85213 2.64874 10.0003 2.33398 10.0003L0.667317 10.0003C0.551792 10.0003 0.444503 9.94051 0.383767 9.84224C0.323032 9.74396 0.31751 9.62125 0.369175 9.51792L1.62797 7.00033L0.369175 4.48273C0.317511 4.3794 0.323032 4.25669 0.383768 4.15842C0.444503 4.06014 0.551792 4.00033 0.667318 4.00033L2.33398 4.00033C2.64874 4.00033 2.94513 4.14852 3.13398 4.40033L3.68398 5.13366C3.77841 5.25956 3.92661 5.33366 4.08398 5.33366L5.63429 5.33366C5.80219 5.33366 5.92236 5.17145 5.87345 5.01083L4.68177 1.09743C4.65101 0.996397 4.66994 0.886763 4.73281 0.801902C4.79568 0.717041 4.89504 0.666992 5.00065 0.666992Z"
                                                fill="#33383F"
                                            />
                                        </svg>
                                        <div class="to">
                                            <p class="airport">
                                                {{ additionalInfo.from ?? null }}
                                            </p>
                                            <p class="city">{{ from?.city }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="one-way">
                                <div class="block">
                                    <div class="date">
                                        {{ additionalInfo.depart_at === 'null' ? null : additionalInfo.depart_at }}
                                    </div>
                                    <div class="info">
                                        <div class="from">
                                            <p class="airport">
                                                {{ additionalInfo.from ?? null }}
                                            </p>
                                            <p class="city">{{ from?.city }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="block">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M14.334 5.99967L14.334 7.17563C14.334 7.80692 13.9773 8.38402 13.4127 8.66634L9.94371 10.4008C9.77432 10.4855 9.66732 10.6586 9.66732 10.848L9.66732 12.9997C9.66732 13.9201 8.92112 14.6663 8.00065 14.6663C7.08018 14.6663 6.33398 13.9201 6.33398 12.9997L6.33398 10.848C6.33398 10.6586 6.22698 10.4855 6.05759 10.4008L2.58863 8.66634C2.02399 8.38402 1.66732 7.80691 1.66732 7.17563L1.66732 5.99967C1.66732 5.89406 1.71737 5.7947 1.80223 5.73183C1.88709 5.66897 1.99672 5.65003 2.09775 5.6808L6.01116 6.87247C6.17177 6.92138 6.33398 6.80121 6.33398 6.63332L6.33398 5.08301C6.33398 4.92563 6.25989 4.77743 6.13398 4.68301L5.40065 4.13301C5.14884 3.94415 5.00065 3.64776 5.00065 3.33301L5.00065 1.66634C5.00065 1.55081 5.06047 1.44353 5.15874 1.38279C5.25701 1.32205 5.37973 1.31653 5.48306 1.3682L8.00065 2.627L10.5182 1.3682C10.6216 1.31653 10.7443 1.32206 10.8426 1.38279C10.9408 1.44353 11.0007 1.55082 11.0007 1.66634L11.0007 3.33301C11.0007 3.64777 10.8525 3.94415 10.6007 4.13301L9.86732 4.68301C9.74141 4.77744 9.66732 4.92563 9.66732 5.08301L9.66732 6.63332C9.66732 6.80121 9.82953 6.92138 9.99014 6.87247L13.9035 5.6808C14.0046 5.65003 14.1142 5.66897 14.1991 5.73183C14.2839 5.7947 14.334 5.89406 14.334 5.99967Z"
                                            fill="#33383F"
                                        />
                                    </svg>
                                </div>
                                <div class="block">
                                    <div class="info">
                                        <div class="from">
                                            <p class="airport">
                                                {{ additionalInfo.to ?? null }}
                                            </p>
                                            <p class="city">{{ to?.city }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div :class="`from-to-block on-mobile`">
                            <div class="block">
                                <div class="dates">
                                    <div class="date">
                                        {{ additionalInfo.depart_at === 'null' ? null : additionalInfo.depart_at }}
                                    </div>
                                    <div class="date">
                                        {{ additionalInfo.return_at === 'null' ? null : additionalInfo.return_at }}
                                    </div>
                                </div>
                                <div class="info">
                                    <div class="from">
                                        <p class="airport">
                                            {{ additionalInfo.from ?? null }}
                                        </p>
                                        <p class="city">{{ from?.city }}</p>
                                    </div>
                                    <svg
                                        v-if="additionalInfo.trip_type === 'one_way'"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5.00065 0.666992L6.17661 0.666993C6.80789 0.666993 7.385 1.02366 7.66732 1.5883L9.4018 5.05727C9.48649 5.22666 9.65963 5.33366 9.84901 5.33366L12.0007 5.33366C12.9211 5.33366 13.6673 6.07985 13.6673 7.00033C13.6673 7.9208 12.9211 8.66699 12.0007 8.66699L9.84901 8.66699C9.65963 8.66699 9.4865 8.77399 9.4018 8.94339L7.66732 12.4123C7.385 12.977 6.80789 13.3337 6.17661 13.3337L5.00065 13.3337C4.89504 13.3337 4.79568 13.2836 4.73281 13.1987C4.66994 13.1139 4.65101 13.0043 4.68177 12.9032L5.87345 8.98982C5.92236 8.8292 5.80219 8.66699 5.63429 8.66699L4.08398 8.66699C3.92661 8.66699 3.77841 8.74109 3.68398 8.86699L3.13398 9.60033C2.94513 9.85213 2.64874 10.0003 2.33398 10.0003L0.667317 10.0003C0.551792 10.0003 0.444503 9.94051 0.383767 9.84224C0.323032 9.74396 0.31751 9.62125 0.369175 9.51792L1.62797 7.00033L0.369175 4.48273C0.317511 4.3794 0.323032 4.25669 0.383768 4.15842C0.444503 4.06014 0.551792 4.00033 0.667318 4.00033L2.33398 4.00033C2.64874 4.00033 2.94513 4.14852 3.13398 4.40033L3.68398 5.13366C3.77841 5.25956 3.92661 5.33366 4.08398 5.33366L5.63429 5.33366C5.80219 5.33366 5.92236 5.17145 5.87345 5.01083L4.68177 1.09743C4.65101 0.996397 4.66994 0.886763 4.73281 0.801902C4.79568 0.717041 4.89504 0.666992 5.00065 0.666992Z"
                                            fill="#33383F"
                                        />
                                    </svg>

                                    <svg
                                        v-if="additionalInfo.trip_type === 'round_trip'"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.13806 13.5289C6.39841 13.7893 6.39841 14.2114 6.13806 14.4717C5.87771 14.7321 5.4556 14.7321 5.19525 14.4717L2.99999 12.2765C2.47929 11.7558 2.47929 10.9115 2.99999 10.3909L5.19525 8.19559C5.4556 7.93524 5.87771 7.93524 6.13806 8.19559C6.39841 8.45594 6.39841 8.87805 6.13806 9.1384L4.60947 10.667H12.6667C13.0348 10.667 13.3333 10.9655 13.3333 11.3337C13.3333 11.7018 13.0348 12.0003 12.6667 12.0003H4.60947L6.13806 13.5289Z"
                                            fill="#b4853b"
                                        ></path>
                                        <path
                                            d="M3.33332 4C2.96513 4 2.66666 4.29848 2.66666 4.66667C2.66666 5.03486 2.96513 5.33333 3.33332 5.33333H11.3905L9.86192 6.86193C9.60157 7.12228 9.60157 7.54439 9.86192 7.80474C10.1223 8.06509 10.5444 8.06509 10.8047 7.80474L13 5.60948C13.5207 5.08878 13.5207 4.24456 13 3.72386L10.8047 1.5286C10.5444 1.26825 10.1223 1.26825 9.86192 1.5286C9.60157 1.78894 9.60157 2.21105 9.86192 2.4714L11.3905 4H3.33332Z"
                                            fill="#b4853b"
                                        ></path>
                                    </svg>

                                    <div class="to">
                                        <p class="airport">
                                            {{ additionalInfo.to ?? null }}
                                        </p>
                                        <p class="city">{{ to?.city }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="deals-block"
                            v-if="$store.state.app.flightPrices !== true && $store.state.app.flightPrices !== null"
                        >
                            <div
                                v-for="(item, index) in Object.keys(flightPrices)"
                                :key="`quote-header-${index}`"
                                :class="`${item} ${choosedClass === item ? 'active' : ''} ${
                                    index === 0 ? 'best-deal' : ''
                                }`"
                            >
                                <div class="d-flex">
                                    <p class="price">{{ flightPrices[item] }}<span>*</span> USD</p>
                                    <div class="checkbox">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M13.8041 4.19526C14.0644 4.45561 14.0644 4.87772 13.8041 5.13807L8.08023 10.8619C7.29918 11.643 6.03285 11.643 5.2518 10.8619L2.86128 8.4714C2.60093 8.21106 2.60093 7.78894 2.86128 7.5286C3.12163 7.26825 3.54374 7.26825 3.80409 7.5286L6.19461 9.91912C6.45496 10.1795 6.87707 10.1795 7.13742 9.91912L12.8613 4.19526C13.1216 3.93491 13.5437 3.93491 13.8041 4.19526Z"
                                                fill="#2A85FF"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <p>
                                    <span class="capitalize">{{ item.replace(/_/g, ' ') }} class</span>
                                    /
                                    <span class="capitalize">{{ additionalInfo?.trip_type?.replace(/_/g, ' ') }}</span>
                                </p>
                                <button @click="choosedClass = item" />
                            </div>
                        </div>
                        <div class="flight-null" v-else>
                            <div class="icon">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                        fill="#b4853b"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12 10C12.5523 10 13 10.4477 13 11V16.0009C13 16.5532 12.5523 17.0009 12 17.0009C11.4477 17.0009 11 16.5532 11 16.0009V11C11 10.4477 11.4477 10 12 10Z"
                                        fill="#b4853b"
                                    />
                                    <circle cx="12" cy="8" r="1" fill="#b4853b" />
                                </svg>
                            </div>
                            <div class="info">
                                Please fill out the request form. <br />
                                Our travel expert will reach out with the best deals
                            </div>
                        </div>
                    </div>
                    <personal-assistant />
                </div>
                <personal-assistant />
                <second-block
                    :propClass="convert(choosedClass)"
                    :propCalendar="additionalInfo.calendar"
                    :propDatepicker="additionalInfo.datepicker"
                    :propFrom="additionalInfo.from"
                    :propTo="additionalInfo.to"
                    :propTravelers="additionalInfo.travelers"
                    :propType="additionalInfo.trip_type"
                    @success="onFormSuccess"
                />
            </div>
            <div class="congratulations" v-else id="congratulations-tag">
                <div class="content">
                    <div class="title-thank">Thank you for submitting your request!</div>
                    <div class="subtitle">
                        One of our travel advisors will be in touch shortly. To unlock more savings, we may contact you
                        to gather relevant information about your flight request. <br /><br />
                        You also agree to our
                        <router-link to="/terms">Terms of Service</router-link> and
                        <router-link to="/privacy">Privacy Policy.</router-link>
                    </div>
                    <div class="line" />
                    <personal-assistant />
                </div>
            </div>
        </transition>
    </div>
    <personal-assistant class="quote-outer-assistance" />
</template>

<script>
// Components
import SecondBlock from '@/components/HeaderForm/FlightCard/SecondBlock.vue'
import PersonalAssistant from './PersonaAssistant.vue'
import DiscountVue from '../DiscountVue.vue'

// Vuex
import { mapState } from 'vuex'
import Cookies from 'js-cookie'

// Helpers
import { fromShortToFull } from '@/helpers/functions'
import { initHelpers } from '@/helpers/helpers'

export default {
    components: {
        SecondBlock,
        PersonalAssistant,
        DiscountVue,
    },
    props: {
        from: {
            type: Object,
        },
        to: {
            type: Object,
        },
        success: {
            type: Boolean,
            default: () => false,
        },
    },
    data() {
        return {
            showCongrats: false,
            choosedClass: '',
            additionalInfo: {},
            helpers: null,
        }
    },
    watch: {
        showCongrats: {
            immediate: true,
            handler(n) {
                if (n) {
                    window.dataLayer = window.dataLayer || []
                    window.dataLayer.push({
                        event: 'ec_form_submit',
                    })

                    this.helpers.marketing.fireLeadCreatedEvent()
                }
            },
        },
    },
    computed: {
        ...mapState({
            flightPrices: (state) => state.app.flightPrices,
        }),
    },
    methods: {
        convert(item) {
            return fromShortToFull(item)
        },
        onFormSuccess() {
            this.showCongrats = true
        },
    },
    created() {
        this.helpers = initHelpers({
            $cookies: Cookies,
        })

        if (this.success) {
            this.showCongrats = this.success
            return
        }

        if (this.flightPrices === null) {
            this.$router.push({
                name: 'index',
            })
        }

        const additionalInfo = this.$route.query

        this.choosedClass = additionalInfo.cabin_class ?? 'business'
        this.additionalInfo = {
            ...additionalInfo,
            from: additionalInfo.from || additionalInfo.fly_from,
            to: additionalInfo.to || additionalInfo.fly_to,
            travelers: {
                adult: Number(additionalInfo.adults) || 1,
                child: Number(additionalInfo.childrens) || 0,
                infant: Number(additionalInfo.infants) || 0,
            },
            [additionalInfo.trip_type === 'round_trip' ? 'datepicker' : 'calendar']:
                additionalInfo.trip_type === 'round_trip'
                    ? {
                          start: additionalInfo.depart_at === 'null' ? null : additionalInfo.depart_at,
                          end: additionalInfo.return_at === 'null' ? null : additionalInfo.return_at,
                      }
                    : additionalInfo.depart_at === 'null'
                    ? null
                    : additionalInfo.depart_at,
        }
    },
}
</script>

<style lang="scss" src="@/styles/quote-header.scss"></style>
