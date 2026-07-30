<template>
    <div class="second-block flight-card-header">
        <div class="content" style="margin-top: 10%">
            <div class="d-flex flight-options">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="first-svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.5 13L0.5 11.2361C0.5 10.2891 1.03501 9.42348 1.88197 9L7.22361 6.32918C7.393 6.24448 7.5 6.07135 7.5 5.88197L7.5 2.5C7.5 1.11929 8.61929 9.68215e-08 10 1.13286e-07C11.3807 1.29751e-07 12.5 1.11929 12.5 2.5L12.5 5.88197C12.5 6.07135 12.607 6.24448 12.7764 6.32918L18.118 9C18.965 9.42348 19.5 10.2891 19.5 11.2361L19.5 13C19.5 13.1584 19.4249 13.3075 19.2976 13.4018C19.1703 13.4961 19.0059 13.5245 18.8543 13.4783L12.8228 11.6416C12.6622 11.5927 12.5 11.7129 12.5 11.8808L12.5 14.5C12.5 14.6574 12.5741 14.8056 12.7 14.9L13.9 15.8C14.2777 16.0833 14.5 16.5279 14.5 17L14.5 19.5C14.5 19.6733 14.4103 19.8342 14.2629 19.9253C14.1155 20.0164 13.9314 20.0247 13.7764 19.9472L10 18.059L6.22361 19.9472C6.06861 20.0247 5.88454 20.0164 5.73713 19.9253C5.58973 19.8342 5.5 19.6733 5.5 19.5L5.5 17C5.5 16.5279 5.72229 16.0833 6.1 15.8L7.3 14.9C7.4259 14.8056 7.5 14.6574 7.5 14.5L7.5 11.8808C7.5 11.7129 7.33779 11.5927 7.17717 11.6416L1.14565 13.4783C0.994106 13.5245 0.829657 13.4961 0.702365 13.4018C0.575073 13.3075 0.5 13.1584 0.5 13Z"
                        fill="#6F767E"
                    />
                </svg>
                <v-select
                    @select="calendarCollapse = true"
                    :placeholder="`Round Trip`"
                    :options="['Round Trip', 'One Way']"
                    :searchable="false"
                    taggable
                    class="first-select"
                    v-model="flight"
                />
                <div class="adaptive-select-options-buttons">
                    <button
                        @click.stop="
                            () => {
                                showClass = true
                                showPassengers = false
                            }
                        "
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="first-svg"
                        >
                            <path
                                d="M7.002 5V8.5C7.002 8.71875 7.03328 8.90625 7.09584 9.09375L7.5025 10H15.01C15.5418 10 16.011 10.4688 16.011 11C16.011 11.5625 15.5418 12 15.01 12H8.37837L8.78503 13H18.013C18.3884 13 18.7325 13.2188 18.8889 13.5625C19.0766 13.9062 19.014 14.3125 18.795 14.625L17.4499 16.4062C17.1684 16.7812 16.7305 17 16.2612 17H13.2582V18.5H16.2612C16.6679 18.5 17.012 18.8438 17.012 19.25C17.012 19.6875 16.6679 20 16.2612 20H8.75375C8.31581 20 8.003 19.6875 8.003 19.25C8.003 18.8438 8.31581 18.5 8.75375 18.5H11.7567V17H10.3178C9.09784 17 8.03428 16.3125 7.56506 15.1875L5.28153 9.875C5.09384 9.4375 5 8.96875 5 8.5V5C5 4.46875 5.43794 4 6.001 4C6.53278 4 7.002 4.46875 7.002 5Z"
                                fill="#6F767E"
                            />
                        </svg>
                        <span class="class">{{ type }}</span>
                    </button>
                </div>
                <choose-class
                    :type="type"
                    @setType="
                        (e) => {
                            type = e
                            showClass = false
                        }
                    "
                    :class="showClass ? 'show' : 'hide'"
                    v-click-outside="classClick"
                />
            </div>
            <choose-airport
                :propFrom="propFrom"
                :propTo="propTo"
                ref="airportInputs"
                :error-from="formErrors.airportFrom"
                :error-to="formErrors.airportTo"
            />
            <div
                :ref="flight === 'Round Trip' ? 'departureDateRoundTripBtn' : 'departureDateOneWayBtn'"
                :class="`d-flex calendar-buttons ${flight === 'Round Trip' ? 'round-trip' : ''} ${
                    !calendarCollapse ? 'active' : 'disabled'
                } ${flight === 'Round Trip' && (formErrors.departureDate || formErrors.returnDate) ? 'has-error' : ''}
                ${flight !== 'Round Trip' && formErrors.departureDate ? 'has-error' : ''}`"
            >
                <button @click="calendarCollapse = false" :class="{ 'has-error': formErrors.departureDate }">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        :class="multiDatePicker?.start || singleDatePicker ? 'fill' : ''"
                    >
                        <path
                            d="M2 13C2 12.4477 2.44772 12 3 12H21C21.5523 12 22 12.4477 22 13V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V13Z"
                            fill="#b4853b"
                        />
                        <path
                            d="M7 2C7.55228 2 8 2.44772 8 3V4H16V3C16 2.44772 16.4477 2 17 2C17.5523 2 18 2.44772 18 3V4H19C20.6569 4 22 5.34315 22 7V9C22 9.55228 21.5523 10 21 10H3C2.44772 10 2 9.55228 2 9V7C2 5.34315 3.34315 4 5 4H6V3C6 2.44772 6.44772 2 7 2Z"
                            fill="#b4853b"
                        />
                    </svg>
                    {{ flight === 'One Way' ? singleDatePicker ?? 'Departure' : multiDatePicker?.start ?? 'Departure' }}
                </button>
                <transition name="slide-fade" mode="out-in">
                    <button
                        v-if="flight === 'Round Trip'"
                        :class="{ 'has-error': formErrors.returnDate }"
                        @click="
                            () => {
                                calendarCollapse = false
                                selectReturn = true
                            }
                        "
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            :class="multiDatePicker?.end ? 'fill' : ''"
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
                </transition>
                <vue-select-adaptive
                    @setTravelers="travelers = $event"
                    @setType="type = $event"
                    :type="type"
                    :travelers="travelers"
                />
            </div>
            <div class="d-flex travellers">
                <div class="adaptive-select-options-buttons">
                    <button
                        @click.stop="
                            () => {
                                showPassengers = true
                                showClass = false
                            }
                        "
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="second-svg"
                        >
                            <path
                                d="M1 17V20C1 20.5523 1.44772 21 2 21H16C16.5523 21 17 20.5523 17 20V17C17 14.7909 15.2091 13 13 13H5C2.79086 13 1 14.7909 1 17Z"
                                fill="#6F767E"
                            />
                            <path
                                d="M18.984 20.3118C18.9486 20.655 19.1913 21 19.5363 21H22C22.5523 21 23 20.5523 23 20V17C23 14.7909 21.2092 13 19 13H18.0315C17.8154 13 17.6968 13.2597 17.8254 13.4334C18.5635 14.4304 19 15.6642 19 17V20C19 20.1053 18.9946 20.2093 18.984 20.3118Z"
                                fill="#6F767E"
                            />
                            <path
                                d="M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                                fill="#6F767E"
                            />
                            <path
                                d="M14.3508 10.9476C14.01 10.892 13.8938 10.4893 14.0781 10.1973C14.6621 9.2717 15 8.17531 15 7C15 5.82469 14.6621 4.7283 14.0781 3.80271C13.8938 3.51073 14.01 3.10804 14.3508 3.05242C14.5621 3.01793 14.7789 3 15 3C17.2091 3 19 4.79086 19 7C19 9.20914 17.2091 11 15 11C14.7789 11 14.5621 10.9821 14.3508 10.9476Z"
                                fill="#6F767E"
                            />
                        </svg>
                        <span>
                            {{ `Passengers ${travelers.adult + travelers.child + travelers.infant}` }}
                        </span>
                    </button>
                </div>
                <choose-passengers
                    :travelers="travelers"
                    @setTravelers="travelers = $event"
                    :class="showPassengers ? 'show' : 'hide'"
                    v-click-outside="passengersClick"
                />
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="name"
                    :class="{ 'invalid-svg': formErrors.name }"
                >
                    <path
                        d="M3 18V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V18C21 15.2386 18.7614 13 16 13H8C5.23858 13 3 15.2386 3 18Z"
                        fill="#6F767E"
                    />
                    <circle cx="12" cy="6.5" r="4.5" fill="#6F767E" />
                </svg>
                <input-vue name="name" placeholder="Name" v-model="name" :error="formErrors.name" />
            </div>
            <div class="d-flex client-info">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="{ 'invalid-svg': formErrors.email }"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C13.279 20 14.4852 19.7006 15.555 19.169C16.0495 18.9232 16.6497 19.1249 16.8955 19.6194C17.1413 20.114 16.9396 20.7142 16.445 20.96C15.1049 21.626 13.5947 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V13C22 14.409 21.6473 15.5353 20.987 16.3277C20.3167 17.132 19.4033 17.5 18.5 17.5C17.2731 17.5 16.0324 16.8089 15.4101 15.6567C14.5168 16.4901 13.318 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C13.1256 7 14.1643 7.37194 15 7.99963C15.0002 7.44752 15.4478 7 16 7C16.5523 7 17 7.44772 17 8V12V14C17 14.8839 17.7362 15.5 18.5 15.5C18.8467 15.5 19.1833 15.368 19.4505 15.0473C19.7277 14.7147 20 14.091 20 13V12C20 7.58172 16.4183 4 12 4ZM15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"
                        fill="#6F767E"
                    />
                </svg>
                <vue-tel-input
                    v-model="phone"
                    mode="international"
                    :dynamicPlaceholder="true"
                    :validCharactersOnly="true"
                    :inputOptions="{ showDialCode: true, maxlength, name: 'phone' }"
                    :class="{ valid, 'not-valid': !valid, 'has-error': formErrors.phone }"
                    @validate="telControl"
                />
                <input-vue name="email" placeholder="Email" v-model="email" :error="formErrors.email" />
            </div>

            <orange-filled-button :buttonText="`Get a Free Quote`" :click="sendFBLead" />
        </div>
        <div class="calendar">
            <vue-calendar
                v-if="flight === 'One Way'"
                :target="$refs.departureDateOneWayBtn"
                @updateValue="updateSingleDatePicker"
                :calendarCollapse="calendarCollapse"
                :minDate="Date.now()"
                @doCalendarCollapse="doCalendarCollapse"
            />
            <date-picker
                v-else
                :target="$refs.departureDateRoundTripBtn"
                @updateValue="updateMultiDatePicker"
                :selectReturn="selectReturn"
                :calendarCollapse="calendarCollapse"
                :minDate="Date.now()"
                @doCalendarCollapse="doCalendarCollapse"
            />
        </div>
    </div>
</template>

<script>
// Components
import { VueTelInput } from 'vue-tel-input'
import ChooseAirport from '@/components/HeaderForm/OrderFly/ChooseAirport.vue'
import VueCalendar from '@/common/Calendars/VueCalendar.vue'
import DatePicker from '@/common/Calendars/DatePicker.vue'
import OrangeFilledButton from '@/common/UI/Buttons/OrangeFilledButton.vue'
import InputVue from '@/common/Forms/InputVue.vue'
import VueSelectAdaptive from '@/components/HeaderForm/VueSelectAdaptive.vue'
import ChooseClass from '@/components/HeaderForm/ChooseClass.vue'
import ChoosePassengers from '@/components/HeaderForm/ChoosePassengers.vue'

// Vuex
import { mapState } from 'vuex'

// Controllers
import { sendFBLead } from '@/controllers/flyController'

// Helpers
import { telInputControl } from '@/helpers/functions'

export default {
    components: {
        VueTelInput,
        ChooseAirport,
        VueCalendar,
        DatePicker,
        OrangeFilledButton,
        InputVue,
        VueSelectAdaptive,
        ChooseClass,
        ChoosePassengers,
    },
    props: {
        propCalendar: {
            default: () => null, //new Date().toLocaleDateString('fr-CH'),
        },
        propDatepicker: {
            default: () => ({
                start: null, //new Date().toLocaleDateString('fr-CH'),
            }),
        },
        propClass: {
            default: () => 'Business Class',
        },
        propFrom: {
            default: () => null,
        },
        propTo: {
            default: () => null,
        },
        propTravelers: {
            default: () => ({
                adult: 1,
                child: 0,
                infant: 0,
            }),
        },
        propType: {
            default: () => 'round_trip',
        },
    },
    data() {
        return {
            type: this.propClass,
            flight: 'Round Trip',
            calendarCollapse: true,
            selectReturn: false,
            singleDatePicker: this.propCalendar,
            multiDatePicker: this.propDatepicker,
            travelers: this.propTravelers,
            phone: null,
            maxlength: 25,
            valid: null,
            name: '',
            email: '',
            showPassengers: false,
            showClass: false,
            sms: false,
            formErrors: {
                airportFrom: null,
                airportTo: null,
                departureDate: null,
                returnDate: null,
                phone: null,
                email: null,
                name: null,
            },
        }
    },
    computed: {
        ...mapState({
            appWidth: (state) => state.app.appWidth,
        }),
    },
    watch: {
        propType: {
            immediate: true,
            handler(n) {
                this.flight = n === 'one_way' ? 'One Way' : 'Round Trip'
            },
        },
        propClass(value) {
            this.type = value
        },
    },
    methods: {
        async sendFBLead() {
            this.formErrors.airportFrom = null
            this.formErrors.airportTo = null
            this.formErrors.departureDate = null
            this.formErrors.returnDate = null
            this.formErrors.phone = null
            this.formErrors.email = null
            this.formErrors.name = null

            const flights = [
                {
                    from: this.$refs.airportInputs.inputFirst?.iata_code ?? this.propFrom,
                    to: this.$refs.airportInputs.inputSecond?.iata_code ?? this.propTo,
                    date: (this.flight === 'Round Trip' ? this.multiDatePicker?.start : this.singleDatePicker)
                        ?.split('.')
                        ?.reverse()
                        ?.join('-'),
                },
            ]

            if (this.flight === 'Round Trip') {
                flights.push({
                    from: this.$refs.airportInputs.inputSecond?.iata_code ?? this.propFrom,
                    to: this.$refs.airportInputs.inputFirst?.iata_code ?? this.propTo,
                    date: this.multiDatePicker?.end?.split('.')?.reverse()?.join('-'),
                })
            }

            const client = {
                phone: this.phone?.replace(/ /g, ''),
                name: this.name,
                email: this.email,
            }

            const [result, error] = await sendFBLead({
                client,
                flights,
                phone_valid: this.valid,
                passengers: this.travelers,
                sms: this.sms,
                trip_type: this.flight.toLowerCase().replace(/ /g, '_'),
                cabin_class: this.type
                    .toLowerCase()
                    .replace(/ /g, '_')
                    .replace(/_class/, ''),
            })

            if (error?.type === 'validation') {
                this.formErrors[error.input] = true

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
                if (this.$route.name === 'search-results') {
                    this.$emit('success', true)
                    return
                }

                localStorage.setItem('success', true)
                this.$router.push('/flight')
            }
        },
        doCalendarCollapse(event) {
            if (!this.calendarCollapse && !event.target.parentNode?.classList?.contains('calendar-buttons')) {
                this.calendarCollapse = true
                this.selectReturn = false
            }
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
        updateSingleDatePicker(date) {
            this.singleDatePicker = date
            this.calendarCollapse = true
        },
        passengersClick(event) {
            if (this.showPassengers && !event.target.parentNode?.classList?.contains('choose-ammount-travelers')) {
                this.showPassengers = false
            }
        },
        classClick(event) {
            if (this.showClass && !event.target.parentNode?.classList?.contains('choose-cabin-type')) {
                this.showClass = false
            }
        },
        telControl(validation) {
            telInputControl(validation, this)
            this.formErrors.phone = validation.valid === false
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.privacy-text {
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 10px;
    padding-inline: 8px;
    padding-block: 4px;
    margin-top: 8px;
    color: #dadde0;

    a {
        color: #b4853b;
    }
}

.second-block.flight-card-header {
    position: relative;
    background: #1a1d1f;
    padding: 24px;

    > .content {
        @include calendar-buttons;
        @include select-header;

        > .d-flex {
            padding: 12px 0;

            &.travellers,
            &.flight-options {
                position: relative;
                padding: 0;
                margin-bottom: 8px;
                gap: 8px;

                &.travellers .v-select {
                    z-index: 150;

                    > ul {
                        z-index: 150;
                    }
                }

                &.flight-options .v-select {
                    z-index: 300;

                    > ul {
                        z-index: 300;
                        margin-top: 2px;
                    }
                }

                > svg {
                    position: absolute;
                }

                > *:not(svg) {
                    width: 0;
                    flex-grow: 1;
                }

                .v-select {
                    border: 1px solid #33383f;
                    border-radius: 8px;

                    .vs__dropdown-toggle {
                        height: 100%;
                        padding: 0;
                    }

                    .vs__search {
                        padding: {
                            left: 36px;
                            top: 10.5px;
                            bottom: 10.5px;
                        }
                    }

                    .vs__actions {
                        margin-bottom: -3px;
                    }

                    .vs__selected {
                        position: absolute;
                        margin-left: 44px;
                        margin-top: 2px;
                    }

                    .vs__selected-options {
                        align-items: center;
                    }

                    > ul {
                        @include v-select-list;
                    }
                }

                > .choose-cabin-type,
                > .choose-ammount-travelers {
                    position: absolute;
                    padding: 24px;
                    top: 100%;
                    width: calc(50% - 4px);
                    z-index: 300;

                    &.choose-cabin-type {
                        right: 0;
                    }
                }

                > .hide {
                    opacity: 0;
                    visibility: hidden;
                }

                > .show {
                    opacity: 1;
                    visibility: visible;
                }

                > .adaptive-select-options-buttons {
                    width: 0;
                    flex-grow: 1;
                    height: 56px;
                    border: 1px solid #33383f;
                    border-radius: 8px;

                    > button {
                        height: 100%;
                        text-align: left;

                        > svg {
                            margin-left: 18px;
                            margin-bottom: -7px;
                        }

                        > span {
                            margin-left: 12px;

                            &.class {
                                margin-left: 11px;
                            }
                        }
                    }
                }
            }

            &.flight-options {
                > .second-svg {
                    margin-left: 50%;
                    margin-top: 20px;
                }

                > .first-svg {
                    margin-top: 18px;
                    margin-left: 16px;
                }

                .adaptive-select-options-buttons {
                    svg {
                        margin-bottom: -8px !important;
                    }

                    span {
                        position: relative;
                        top: 1.5px;
                    }
                }
            }

            &.travellers {
                > svg {
                    margin: 17px 0 0 20.5px;
                }

                > .name {
                    margin-left: calc(50% + 22px);
                    margin-top: 16px;
                }

                .vs__search {
                    padding-left: 38px !important;
                }

                .vs__selected {
                    margin-left: 45px !important;
                }

                > .input-container > input {
                    padding-left: 56px;
                }
            }

            &.client-info {
                @include vue-tel;

                gap: 8px;
                padding: 0;
                margin-bottom: 8px;

                > *:not(svg) {
                    width: 0;
                    flex-grow: 1;
                }

                > svg {
                    position: absolute;
                    margin-left: calc(50% - 2px);
                    margin-top: 14px;
                }

                > .vue-tel-input {
                    flex-grow: 1;

                    .vti__input {
                        background: none;
                    }
                }

                > .input-container > input {
                    padding-left: 56px;
                }
            }

            &.search-flight {
                .vs__search {
                    margin-top: 2px;
                }

                > svg {
                    margin-top: 2px;
                }
            }
        }

        .input-container > input {
            height: 100%;
        }
    }

    //> .calendar {
    //    > .single-calendar,
    //    > .calendar {
    //        @include calendar;
    //        transform: translate(-50%, -47%);
    //    }
    //}

    .invalid-svg > * {
        fill: #ff6a55;
    }

    @media screen and (max-width: 768px) {
        > .content {
            > .travellers {
                .v-select {
                    display: none;
                }

                > .input-container > input {
                    padding: 8px 32px !important;
                    font-size: 14px;
                    line-height: 24px;
                }

                > svg {
                    width: 16px;
                    height: 16px;
                    margin: 13px 0 0 8px !important;
                }

                > svg:not(.name) {
                    display: none;
                }

                > .adaptive-select-options-buttons {
                    display: none;
                }
            }

            > .client-info {
                flex-wrap: wrap;
                flex-direction: column-reverse;
                position: relative;

                > div {
                    width: 100% !important;
                }

                > svg {
                    top: 1px;
                    margin: 12px 0 0 8px !important;
                    width: 16px;
                    height: 16px;
                }

                > .input-container > input {
                    padding: 8px 32px !important;
                    font-size: 14px;
                    line-height: 24px;
                }
            }

            > * {
                height: unset;
            }
        }
        > .calendar > * {
            transform: translate(-50%, -53%) !important;
        }
    }
}
.sms-toggle {
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 11px;
    padding-inline: 8px;
    padding-block: 4px;
    margin-top: 8px;
    color: #ccc;
}
.sms-toggle a {
    color: #b4853b; /* Culoarea dorită pentru link-uri */
    text-decoration: none; /* Elimină sublinierea implicită */
    font-weight: bold;
}
.sms-toggle input[type='checkbox'] {
    width: 14px; /* Dimensiune personalizată */
    height: 14px;
    transform: scale(0.8); /* Opțional, reduce mărimea proporțional */
    position: relative;
    top: 3px; /* Ajustează valoarea */
    cursor: pointer;
}

.switch {
    position: relative;
    display: inline-block;
    width: 34px;
    height: 20px;
    margin-right: 10px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: '';
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #b4853b;
}

input:checked + .slider:before {
    transform: translateX(14px);
}

.label-text {
    font-size: 14px;
    color: white;
}
@media screen and (max-width: 768px) {
    .sms-toggle {
        margin-bottom: 60px;
    }
    .sms-toggle input[type='checkbox'] {
        width: 12px; /* Dimensiune personalizată */
        height: 12px;
        position: relative;
        top: 2px; /* Ajustează valoarea */
    }
}
</style>
