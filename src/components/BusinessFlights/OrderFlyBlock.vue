<template>
    <h2 style="font-family: 'SSP-bold'; color: #dadde0; text-align: center; padding-bottom: 20px">
        Search the Best Business Class Flight Deals Today
    </h2>
    <div
        class="header-form-business order-fly xyz-in"
        xyz="fade small delay-5"
        style="max-width: 600px; margin-left: auto; margin-right: auto"
    >
        <div class="choose-option xyz-nested">
            <button @click="changePage('round_trip')" :class="currentPage === 'round_trip' ? 'active' : ''">
                Round Trip
            </button>
            <button @click="changePage('one_way')" :class="currentPage === 'one_way' ? 'active' : ''">One Way</button>
            <button @click="changePage('multi_city')" :class="currentPage === 'multi_city' ? 'active' : ''">
                Multi City
            </button>
        </div>
        <div class="content xyz-nested">
            <transition name="slide-fade" mode="out-in">
                <div v-if="currentPage === 'round_trip'" class="round-trip">
                    <choose-airport
                        ref="airportInputs"
                        class="xyz-nested"
                        :prop-from="from"
                        :prop-to="to"
                        :error-from="formErrors.airportFrom"
                        :error-to="formErrors.airportTo"
                    />
                    <div
                        ref="departureDateRoundTripBtn"
                        :class="`d-flex calendar-buttons round-trip xyz-nested ${
                            !calendarCollapse ? 'active' : 'disabled'
                        } ${formErrors.departureDate || formErrors.returnDate ? 'has-error' : ''}`"
                    >
                        <button
                            @click="calendarCollapse = false"
                            class="date-button first-button"
                            :class="{ 'has-error': formErrors.departureDate }"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                :class="multiDatePicker === null ? 'fill' : ''"
                            >
                                <path
                                    d="M2 13C2 12.4477 2.44772 12 3 12H21C21.5523 12 22 12.4477 22 13V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V13Z"
                                    fill="#6F767E"
                                />
                                <path
                                    d="M7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4H19C20.6569 4 22 5.34315 22 7V9C22 9.55228 21.5523 10 21 10H3C2.44772 10 2 9.55228 2 9V7C2 5.34315 3.34315 4 5 4H6V3C6 2.44772 6.44772 2 7 2Z"
                                    fill="#6F767E"
                                />
                            </svg>
                            {{ multiDatePicker?.start ?? 'Select departure' }}
                        </button>
                        <button
                            @click="
                                () => {
                                    calendarCollapse = false
                                    selectReturn = true
                                }
                            "
                            class="date-button second-button"
                            :class="{ 'has-error': formErrors.returnDate }"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                :class="multiDatePicker?.start ? 'fill' : ''"
                            >
                                <path
                                    d="M2 13C2 12.4477 2.44772 12 3 12H21C21.5523 12 22 12.4477 22 13V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V13Z"
                                    fill="#6F767E"
                                />
                                <path
                                    d="M7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4H19C20.6569 4 22 5.34315 22 7V9C22 9.55228 21.5523 10 21 10H3C2.44772 10 2 9.55228 2 9V7C2 5.34315 3.34315 4 5 4H6V3C6 2.44772 6.44772 2 7 2Z"
                                    fill="#6F767E"
                                />
                            </svg>
                            {{ multiDatePicker?.end ?? 'Select return' }}
                        </button>
                    </div>
                    <choose-properties
                        @typeSelected="type = $event"
                        @travelersSelected="travelers = $event"
                        :propType="type"
                        :propTravelers="travelers"
                        class="xyz-nested"
                    />
                    <orange-filled-button
                        :class="`xyz-nested ${currentPage !== 'multi_city' ? 'show' : 'hide'} search-submit`"
                        :buttonText="`Search Flight`"
                        :click="searchFlight"
                    />
                </div>
                <div v-else-if="currentPage === 'one_way'" class="one-way">
                    <choose-airport
                        ref="airportInputs"
                        class="xyz-nested"
                        :prop-from="from"
                        :prop-to="to"
                        :error-from="formErrors.airportFrom"
                        :error-to="formErrors.airportTo"
                    />
                    <div
                        ref="departureDateOneWayBtn"
                        :class="`d-flex calendar-buttons one-way xyz-nested ${
                            !calendarCollapse ? 'active' : 'disabled'
                        } ${formErrors.departureDate ? 'has-error' : ''}`"
                    >
                        <button
                            @click="calendarCollapse = false"
                            class="date-button first-button"
                            :class="{ 'has-error': formErrors.departureDate }"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                :class="singleDatePicker === null ? 'fill' : ''"
                            >
                                <path
                                    d="M2 13C2 12.4477 2.44772 12 3 12H21C21.5523 12 22 12.4477 22 13V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V13Z"
                                    fill="#6F767E"
                                />
                                <path
                                    d="M7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4H19C20.6569 4 22 5.34315 22 7V9C22 9.55228 21.5523 10 21 10H3C2.44772 10 2 9.55228 2 9V7C2 5.34315 3.34315 4 5 4H6V3C6 2.44772 6.44772 2 7 2Z"
                                    fill="#6F767E"
                                />
                            </svg>
                            {{ singleDatePicker ?? 'Select departure' }}
                        </button>
                    </div>
                    <choose-properties
                        @typeSelected="type = $event"
                        @travelersSelected="travelers = $event"
                        :propType="type"
                        :propTravelers="travelers"
                        class="xyz-nested"
                    />
                    <orange-filled-button
                        :class="`
              xyz-nested ${currentPage !== 'multi_city' ? 'show' : 'hide'} search-submit
            `"
                        :buttonText="`Search Flight`"
                        :click="searchFlight"
                    />
                </div>
                <div v-else :class="`multi-city ${appWidth < 1270 ? 'overlap' : ''}`">
                    <vue-select-adaptive
                        @setTravelers="travelers = $event"
                        @setType="type = $event"
                        :type="type"
                        :travelers="travelers"
                        class="xyz-nested"
                    />
                    <div
                        class="multi-city-container xyz-nested"
                        v-for="(item, index) in arrMulti"
                        :style="{ zIndex: 100 + (5 - index) }"
                        :key="index"
                    >
                        <choose-airport
                            ref="airportInputs"
                            :error-from="index === multiFormErrors.index ? multiFormErrors.airportFrom : null"
                            :error-to="index === multiFormErrors.index ? multiFormErrors.airportTo : null"
                        />
                        <div
                            ref="departureDateMultiBtn"
                            :class="`calendar-buttons ${!arrMulti[index].collapse ? 'active' : 'disabled'} ${
                                index === multiFormErrors.index && multiFormErrors.departureDate ? 'has-error' : ''
                            }`"
                        >
                            <button
                                @click="showCallendar(index)"
                                :class="{
                                    'has-error': index === multiFormErrors.index && multiFormErrors.departureDate,
                                }"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    :class="arrMulti[index].date ? 'fill' : ''"
                                >
                                    <path
                                        d="M2 13C2 12.4477 2.44772 12 3 12H21C21.5523 12 22 12.4477 22 13V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V13Z"
                                        fill="#6F767E"
                                    />
                                    <path
                                        d="M7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4H19C20.6569 4 22 5.34315 22 7V9C22 9.55228 21.5523 10 21 10H3C2.44772 10 2 9.55228 2 9V7C2 5.34315 3.34315 4 5 4H6V3C6 2.44772 6.44772 2 7 2Z"
                                        fill="#6F767E"
                                    />
                                </svg>
                                {{ arrMulti[index].date ?? 'Departure' }}
                            </button>
                        </div>
                        <vue-calendar
                            @updateValue="updateSingleDatePicker($event, index)"
                            :calendarCollapse="arrMulti[index].collapse"
                            :target="$refs.departureDateMultiBtn && $refs.departureDateMultiBtn[index]"
                            :data-index="index"
                            :minDate="returnDate(index)"
                            :defaultDate="false"
                            @doCalendarCollapse="doCalendarCollapse"
                        />
                        <button v-if="index > 1" @click="removeFlight(index)" class="remove-flight">
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
                                    d="M7.00004 13.6663C10.6819 13.6663 13.6667 10.6816 13.6667 6.99967C13.6667 3.31778 10.6819 0.333008 7.00004 0.333008C3.31814 0.333008 0.333374 3.31778 0.333374 6.99967C0.333374 10.6816 3.31814 13.6663 7.00004 13.6663ZM4.52864 9.47108C4.26829 9.21073 4.26829 8.78862 4.52864 8.52827L6.05725 6.99965L4.5287 5.4711C4.26835 5.21075 4.26835 4.78864 4.5287 4.52829C4.78905 4.26794 5.21116 4.26794 5.47151 4.52829L7.00006 6.05685L8.52864 4.52827C8.78899 4.26792 9.2111 4.26792 9.47145 4.52827C9.7318 4.78862 9.7318 5.21073 9.47145 5.47108L7.94287 6.99966L9.47151 8.5283C9.73186 8.78865 9.73186 9.21076 9.47151 9.47111C9.21116 9.73146 8.78905 9.73146 8.5287 9.47111L7.00006 7.94246L5.47145 9.47108C5.2111 9.73143 4.78899 9.73143 4.52864 9.47108Z"
                                    fill="#6F767E"
                                />
                            </svg>
                        </button>
                    </div>
                    <transparent-button :click="addFlight" :buttonText="`Add Flight`" class="xyz-nested" />
                    <client-info class="xyz-nested" @button-clicked="proceedLead" :errors="multiFormErrors" />
                </div>
            </transition>
        </div>
        <date-picker
            v-if="currentPage === 'round_trip'"
            :target="$refs.departureDateRoundTripBtn"
            :selectReturn="selectReturn"
            :calendarCollapse="calendarCollapse"
            :minDate="Date.now()"
            @updateValue="updateMultiDatePicker"
            @doCalendarCollapse="doCalendarCollapse"
        />
        <vue-calendar
            v-if="currentPage === 'one_way'"
            :target="$refs.departureDateOneWayBtn"
            :calendarCollapse="calendarCollapse"
            :minDate="Date.now()"
            @updateValue="updateSingleDatePicker"
            @doCalendarCollapse="doCalendarCollapse"
        />
    </div>
</template>

<script>
// Components
import DatePicker from '@/common/Calendars/DatePicker.vue'
import VueCalendar from '@/common/Calendars/VueCalendar.vue'
import ChooseAirport from '../HeaderForm/OrderFly/ChooseAirport.vue'
import OrangeFilledButton from '@/common/UI/Buttons/OrangeFilledButton.vue'
import TransparentButton from '@/common/UI/Buttons/TransparentButton.vue'
import ChooseProperties from '../HeaderForm/OrderFly/ChooseProperties.vue'
import ClientInfo from '../HeaderForm/OrderFly/ClientInfo.vue'
import VueSelectAdaptive from '../HeaderForm/VueSelectAdaptive.vue'

// Vuex
import { mapState } from 'vuex'

// Controllers
import { searchFlight, sendLead } from '@/controllers/flyController'

// Helpers
import { fromFullToShort } from '@/helpers/functions'

export default {
    components: {
        DatePicker,
        VueCalendar,
        OrangeFilledButton,
        ChooseAirport,
        TransparentButton,
        ClientInfo,
        ChooseProperties,
        VueSelectAdaptive,
    },
    data() {
        return {
            from: null,
            to: null,
            selectReturn: false,
            type: 'Business Class',
            currentPage: 'round_trip',
            calendarCollapse: true,
            singleDatePicker: null, //new Date().toLocaleDateString('fr-CH'),
            multiDatePicker: {
                start: null, //new Date().toLocaleDateString('fr-CH'),
            },
            arrMulti: [{ collapse: true }, { collapse: true }],
            travelers: {
                adult: 1,
                child: 0,
                infant: 0,
            },
            formErrors: {
                airportFrom: null,
                airportTo: null,
                departureDate: null,
                returnDate: null,
            },
            multiFormErrors: {
                phone: null,
                email: null,
                name: null,
                airportFrom: null,
                airportTo: null,
                departureDate: null,
                index: 0,
            },
        }
    },
    computed: {
        ...mapState({
            checkClicked: (state) => state.app.lastClickedElement,
            appWidth: (state) => state.app.appWidth,
        }),
    },
    methods: {
        returnDate(index) {
            return new Date(
                this.arrMulti[index - 1]?.date?.replace(/(\d+[.])(\d+[.])/, '$2$1')?.replace(/[.]/g, '/') ?? Date.now(),
            ).getTime()
        },
        changePage(page) {
            this.currentPage = page
            this.from = this.$refs.airportInputs.inputFirst
            this.to = this.$refs.airportInputs.inputSecond
        },
        async searchFlight() {
            this.formErrors.airportFrom = null
            this.formErrors.airportTo = null
            this.formErrors.departureDate = null
            this.formErrors.returnDate = null

            if (!this.$refs.airportInputs.inputFirst?.iata_code) {
                this.formErrors.airportFrom = true

                this.$store.commit('showModal', {
                    display: true,
                    status: 'error',
                    title: 'Form error',
                    body: 'Departure airport is mandatory!',
                })

                return
            }

            if (!this.$refs.airportInputs.inputSecond?.iata_code) {
                this.formErrors.airportTo = true

                this.$store.commit('showModal', {
                    display: true,
                    status: 'error',
                    title: 'Form error',
                    body: 'Destination airport is mandatory!',
                })

                return
            }

            if (this.currentPage === 'round_trip' && !this.multiDatePicker.start) {
                this.formErrors.departureDate = true

                this.$store.commit('showModal', {
                    display: true,
                    status: 'error',
                    title: 'Form error',
                    body: 'Departure date is mandatory!',
                })

                return
            }

            if (this.currentPage === 'one_way' && !this.singleDatePicker) {
                this.formErrors.departureDate = true

                this.$store.commit('showModal', {
                    display: true,
                    status: 'error',
                    title: 'Form error',
                    body: 'Departure date is mandatory!',
                })

                return
            }

            if (this.currentPage === 'round_trip' && !this.multiDatePicker.end) {
                this.formErrors.returnDate = true

                this.$store.commit('showModal', {
                    display: true,
                    status: 'error',
                    title: 'Form error',
                    body: 'Return date is mandatory!',
                })

                return
            }

            this.$store.commit('setQuoteLoading', [
                this.$refs.airportInputs.inputFirst.iata_code,
                this.$refs.airportInputs.inputSecond.iata_code,
            ])

            const [response] = await Promise.allSettled([
                searchFlight(
                    this.$refs.airportInputs.inputFirst.iata_code,
                    this.$refs.airportInputs.inputSecond.iata_code,
                    this.currentPage,
                ),
                new Promise((resolve) => {
                    setTimeout(resolve, 1500)
                }),
            ])

            const [result, error] = response.value

            if (result === null && error !== 'Offer not found') {
                this.$store.commit('stopQuoteLoading')
                this.$store.commit('showModal', {
                    display: true,
                    status: 'error',
                    title: 'Request error',
                    body: error,
                })
                return
            }

            if (result) delete result.premium_economy

            this.$store.commit('setFlightPrices', result || true)
            this.$store.commit('setDestinationsFlights', [
                this.$refs.airportInputs.inputFirst,
                this.$refs.airportInputs.inputSecond,
            ])

            this.$router.push({
                name: 'search-results',
                query: {
                    cabin_class: fromFullToShort(this.type),
                    trip_type: this.currentPage,
                    fly_from: this.$refs.airportInputs.inputFirst.iata_code,
                    fly_to: this.$refs.airportInputs.inputSecond.iata_code,
                    adults: this.travelers.adult,
                    childrens: this.travelers.child,
                    infants: this.travelers.infant,
                    depart_at: (this.currentPage === 'round_trip' ? this.multiDatePicker.start : this.singleDatePicker)
                        ?.split('.')
                        ?.reverse()
                        ?.join('-'),
                    ...(this.currentPage === 'round_trip'
                        ? {
                              return_at: this.multiDatePicker.end?.split('.')?.reverse()?.join('-'),
                          }
                        : {}),
                },
            })
        },
        async proceedLead(client) {
            this.multiFormErrors.phone = null
            this.multiFormErrors.email = null
            this.multiFormErrors.name = null
            this.multiFormErrors.airportFrom = null
            this.multiFormErrors.airportTo = null
            this.multiFormErrors.departureDate = null
            this.multiFormErrors.index = 0

            const flights = this.$refs.airportInputs.map((cur, index) => ({
                from: cur.inputFirst?.iata_code,
                to: cur.inputSecond?.iata_code,
                date: this.arrMulti[index].date,
            }))

            const [result, error] = await sendLead({
                ...client,
                trip_type: 'multi_city',
                flights,
            })

            if (error?.type === 'validation') {
                if (error.index !== undefined) {
                    this.multiFormErrors.index = error.index
                }
                this.multiFormErrors[error.input] = true

                this.$store.commit('showModal', {
                    display: true,
                    status: 'error',
                    title: 'Validation error',
                    body: error.message,
                })
                return
            }

            if (error !== null) {
                this.$store.commit('showModal', {
                    display: true,
                    status: 'error',
                    body: 'Something went wrong',
                    title: 'Request failed',
                })
                return
            }

            if (result?.data?.success) {
                localStorage.setItem('success', true)
                this.$router.push('/flight')
            }
        },
        addFlight() {
            if (this.arrMulti.length >= 5) {
                return
            }

            this.arrMulti = [...this.arrMulti, { collapse: true }]
        },
        removeFlight(index) {
            this.arrMulti.splice(index, 1)
        },
        doCalendarCollapse(event, index) {
            if (index) {
                if (
                    this.arrMulti.length > +index &&
                    !this.arrMulti[index].collapse &&
                    !event.target.parentNode?.classList?.contains('calendar-buttons')
                ) {
                    this.arrMulti[index].collapse = true
                }
                return
            }

            if (!this.calendarCollapse && !event.target.parentNode?.classList?.contains('calendar-buttons')) {
                this.calendarCollapse = true
                this.selectReturn = false
            }
        },
        showCallendar(index) {
            const closedCalendars = this.arrMulti.map((cur) => ({
                ...cur,
                collapse: true,
            }))

            closedCalendars.splice(index, 1, {
                ...this.arrMulti[index],
                collapse: false,
            })

            this.arrMulti = closedCalendars
        },
        updateMultiDatePicker(date) {
            if (date.start === 'Invalid Date' || date.end === 'Invalid Date') {
                return
            }

            this.multiDatePicker = date

            if (date.start && date.end) {
                this.calendarCollapse = true
                this.selectReturn = false
            }
        },
        updateSingleDatePicker(date, index) {
            if (index !== undefined) {
                this.arrMulti[index].date = date
                this.arrMulti[index].collapse = true

                const [dd, mm, yyyy] = date.split('.')
                const formatted = new Date(yyyy, mm - 1, dd).getTime()
                const grather = this.arrMulti.slice(index + 1).findIndex((cur) => {
                    if (!cur.date) {
                        return false
                    }

                    const [ddI, mmI, yyyyI] = cur.date.split('.')

                    if (new Date(yyyyI, mmI - 1, ddI).getTime() < formatted) {
                        return true
                    }
                    return false
                })

                if (grather > -1) {
                    for (let i = index + 1; i < this.arrMulti.length; i++) {
                        if (this.arrMulti[i].date) {
                            this.arrMulti[i].date = this.arrMulti[index].date
                        }
                    }
                }

                return
            }

            this.singleDatePicker = date
            this.calendarCollapse = true
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/main-page-header-secondblock.scss';
</style>
