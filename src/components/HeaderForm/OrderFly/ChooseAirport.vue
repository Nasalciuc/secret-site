<template>
    <div
        :class="`d-flex search-flight ${active === 1 ? 'first-active' : active === 2 ? 'second-active' : ''} ${
            errorFrom || errorTo ? 'has-error' : ''
        }`"
    >
        <div class="airport-block" :class="{ 'has-error': errorFrom }">
            <svg
                width="20"
                height="15"
                viewBox="0 0 20 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="svg-icon first-svg"
            >
                <path
                    d="M11.9062 2.40179L15.125 0.745536C15.6875 0.464286 16.3125 0.308036 16.9375 0.308036H18.75C19.5938 0.308036 20.1562 1.15179 19.875 1.96429C19.3125 3.46429 18.1875 4.71429 16.7188 5.46429L8.1875 9.71429C8.0625 9.77679 7.90625 9.80804 7.75 9.80804H3.4375C3.15625 9.80804 2.875 9.68304 2.6875 9.46429L0.40625 6.80804C0.1875 6.55804 0.28125 6.18304 0.5625 6.02679L1.5625 5.52679C1.84375 5.40179 2.15625 5.40179 2.40625 5.52679L4.25 6.30804L7.3125 4.74554L2.71875 1.80804C2.40625 1.58929 2.4375 1.08929 2.78125 0.933036L4.21875 0.214286C4.6875 -0.0357143 5.28125 -0.0669643 5.8125 0.120536L11.9062 2.40179ZM0 13.808C0 13.2768 0.4375 12.808 1 12.808H19C19.5312 12.808 20 13.2768 20 13.808C20 14.3705 19.5312 14.808 19 14.808H1C0.4375 14.808 0 14.3705 0 13.808Z"
                    fill="#6F767E"
                />
            </svg>
            <v-select
                ref="firstSelect"
                class="first-select"
                placeholder="From"
                label="iata_code"
                :options="optionsFirst"
                :filterBy="() => true"
                :loading="firstInputLoading"
                :dropdown-should-open="
                    ($event) =>
                        dropdownShouldOpen($event) ||
                        ($event.search.length >= 3 && !isUS(inputSecond) && !firstInputLoading)
                "
                @input="searchAirports($event, true)"
                @search:focus="active = 1"
                @search:blur="active = null"
                v-model="inputFirst"
            >
                <template v-slot:option="option">
                    <div class="select-option">
                        <div class="country-info">
                            <div class="country">{{ option.country }}</div>
                            <div class="city">{{ option.city }}</div>
                        </div>
                        <span class="iata">{{ option.iata_code }}</span>
                    </div>
                </template>
                <template v-slot:no-options>
                    <div class="search-flight-dropdown-custom-message">Please Select USA Origins Only</div>
                </template>
            </v-select>
        </div>

        <button aria-label="reverse" class="reverse" @click="reverseFlights">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.13806 13.5289C6.39841 13.7893 6.39841 14.2114 6.13806 14.4717C5.87771 14.7321 5.4556 14.7321 5.19525 14.4717L2.99999 12.2765C2.47929 11.7558 2.47929 10.9115 2.99999 10.3909L5.19525 8.19559C5.4556 7.93524 5.87771 7.93524 6.13806 8.19559C6.39841 8.45594 6.39841 8.87805 6.13806 9.1384L4.60947 10.667H12.6667C13.0348 10.667 13.3333 10.9655 13.3333 11.3337C13.3333 11.7018 13.0348 12.0003 12.6667 12.0003H4.60947L6.13806 13.5289Z"
                    fill="#b4853b"
                />
                <path
                    d="M3.33332 4C2.96513 4 2.66666 4.29848 2.66666 4.66667C2.66666 5.03486 2.96513 5.33333 3.33332 5.33333H11.3905L9.86192 6.86193C9.60157 7.12228 9.60157 7.54439 9.86192 7.80474C10.1223 8.06509 10.5444 8.06509 10.8047 7.80474L13 5.60948C13.5207 5.08878 13.5207 4.24456 13 3.72386L10.8047 1.5286C10.5444 1.26825 10.1223 1.26825 9.86192 1.5286C9.60157 1.78894 9.60157 2.21105 9.86192 2.4714L11.3905 4H3.33332Z"
                    fill="#b4853b"
                />
            </svg>
        </button>

        <div class="airport-block" :class="{ 'has-error': errorTo }">
            <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="svg-icon second-svg"
            >
                <path
                    d="M0 5.21875V2.125C0 1.8125 0.28125 1.59375 0.59375 1.65625L1.71875 1.90625C2.03125 1.96875 2.3125 2.21875 2.4375 2.53125L3 4L6.96875 5.1875L5.65625 0.65625C5.5625 0.34375 5.8125 0 6.15625 0H7.40625C7.75 0 8.09375 0.21875 8.28125 0.53125L11.6875 6.59375L15.0312 7.5625C15.5312 7.71875 16 7.96875 16.4062 8.28125L17.4688 9.15625C18.2188 9.75 18.0312 10.9375 17.125 11.2812C15.8438 11.75 14.4375 11.8438 13.125 11.5L3.78125 9.0625C3.4375 8.96875 3.125 8.8125 2.875 8.53125L0.28125 5.9375C0.09375 5.75 0 5.5 0 5.21875ZM1 14H19C19.5312 14 20 14.4688 20 15C20 15.5625 19.5312 16 19 16H1C0.4375 16 0 15.5625 0 15C0 14.4688 0.4375 14 1 14ZM4 11.5C4 10.9688 4.4375 10.5 5 10.5C5.53125 10.5 6 10.9688 6 11.5C6 12.0625 5.53125 12.5 5 12.5C4.4375 12.5 4 12.0625 4 11.5ZM8 11C8.53125 11 9 11.4688 9 12C9 12.5625 8.53125 13 8 13C7.4375 13 7 12.5625 7 12C7 11.4688 7.4375 11 8 11Z"
                    fill="#6F767E"
                />
            </svg>
            <v-select
                ref="secondSelect"
                class="second-select"
                placeholder="To"
                label="iata_code"
                :options="optionsSecond"
                :filterBy="() => true"
                :loading="secondInputLoading"
                :dropdown-should-open="
                    ($event) =>
                        dropdownShouldOpen($event) ||
                        ($event.search.length >= 3 && !isUS(inputFirst) && !secondInputLoading)
                "
                @input="searchAirports($event, false)"
                @search:focus="active = 2"
                @search:blur="active = null"
                v-model="inputSecond"
            >
                <template v-slot:option="option">
                    <div class="select-option">
                        <div class="country-info">
                            <div class="country">{{ option.country }}</div>
                            <div class="city">{{ option.city }}</div>
                        </div>
                        <span class="iata">{{ option.iata_code }}</span>
                    </div>
                </template>
                <template v-slot:no-options>
                    <div class="search-flight-dropdown-custom-message">Please Select USA Destinations Only</div>
                </template>
            </v-select>
        </div>
    </div>
</template>

<script>
// Controllers
import { getAirports } from '@/controllers/flyController'

// Vuex
import { mapState } from 'vuex'

// Helpers
// import { findEqualStringInArrayOfObjects } from '@/helpers/methods/find'

export default {
    props: {
        propFrom: {
            default: () => null,
        },
        propTo: {
            default: () => null,
        },
        errorFrom: {
            default: () => null,
        },
        errorTo: {
            default: () => null,
        },
    },
    data() {
        return {
            inputFirst: this.propFrom,
            inputSecond: this.propTo,
            timer: null,
            optionsFirst: [],
            optionsSecond: [],
            active: null,
            firstInputLoading: false,
            secondInputLoading: false,
        }
    },
    computed: {
        ...mapState({
            appWidth: (state) => state.app.appWidth,
        }),
    },
    methods: {
        searchAirports({ target }, isFirst) {
            if (target.value.length < 3) {
                this[isFirst ? 'optionsFirst' : 'optionsSecond'] = []
                return
            }

            this[isFirst ? 'firstInputLoading' : 'secondInputLoading'] = true

            clearTimeout(this.timer)

            this.timer = setTimeout(async () => {
                const [data] = await getAirports(
                    target.value,
                    isFirst ? this.inputSecond?.iata_code : this.inputFirst?.iata_code,
                )

                this[isFirst ? 'firstInputLoading' : 'secondInputLoading'] = false

                if (data === null) {
                    return
                }

                if (isFirst) {
                    this.optionsFirst = data
                    // this.inputFirst = findEqualStringInArrayOfObjects(data, target.value) ?? this.inputFirst
                    return
                }

                this.optionsSecond = data
                // this.inputSecond = findEqualStringInArrayOfObjects(data, target.value) ?? this.inputSecond
            }, 200)
        },
        dropdownShouldOpen(select) {
            return Boolean(
                (select.filteredOptions.length && select.search.length !== 0 && select.open) ||
                    (select.options.length && select.open),
            )
        },
        isUS(airport) {
            if (!airport) return false
            return airport.country === 'United States'
        },
        reverseFlights() {
            const temp = this.inputFirst
            this.inputFirst = this.inputSecond
            this.inputSecond = temp
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.search-flight-dropdown-custom-message {
    font-size: 14px;
    color: #b4853b;
}

.search-flight {
    width: 100%;
    position: relative;
    border: 1px solid #33383f !important;
    border-radius: 8px;
    margin-bottom: 8px;
    transition: 0.4s ease-in;
    z-index: 200;
    height: 56px;

    .airport-block {
        display: flex;
        width: 100%;
    }

    &.first-active,
    &.second-active {
        background: #111315;
        .svg-icon > * {
            transition: 0.4s ease-in;
        }
    }
    &.first-active {
        .first-svg {
            > * {
                fill: #b4853b;
            }
        }
    }
    &.second-active {
        .second-svg {
            > * {
                fill: #b4853b;
            }
        }
    }
    > .reverse {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        background: none;
        border: 1px solid #33383f;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        padding-top: 3px;
    }
    .svg-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-top: 1px;
        &.first-svg {
            left: 16px;
        }
        &.second-svg {
            left: calc(50% + 24.5px);
        }
    }
    .first-select {
        .vs__dropdown-toggle {
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
            border-right: none !important;
            .vs__search {
                padding: 0 0 0 50px;
            }
        }
        .vs__dropdown-menu {
            width: calc(100% + 8px);
            top: calc(100% + 16px);
            left: -1.5px;
        }
    }
    .second-select {
        .vs__dropdown-toggle {
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
            border-left: none !important;
        }
        .vs__dropdown-menu {
            width: calc(100% + 8px);
            top: calc(100% + 16px);
            left: unset;
            right: -1.25px;
        }
        .vs__selected-options {
            padding-left: 6.5px;
        }
    }
    .vs__actions {
        position: absolute;
        right: 0;
        margin-top: 3px;
        > *:not(.vs__spinner) {
            display: none;
        }
        > .vs__spinner {
            margin-right: 16px;
        }
    }
    .vs__dropdown-toggle {
        padding: 0;
        height: 100%;
        > .vs__selected-options {
            align-items: center;
            > .vs__search {
                margin-top: 0;
            }
        }
    }
    .vs__selected-options {
        position: unset;
        align-items: end;
        > .vs__selected {
            position: absolute;
            align-items: end;
        }
    }
    .vs--searching .vs__search {
        opacity: unset !important;
    }

    .v-select {
        > ul {
            @include v-select-list;
            width: calc(100% - 8px);

            .select-option {
                display: flex;
                justify-content: space-between;
                align-items: center;
                > .country-info {
                    > .country {
                        font-size: 14px;
                    }
                    > .city {
                        font-size: 11px;
                    }
                }
            }
        }
    }

    &.has-error {
        border-color: #ff6a55 !important;
    }

    .airport-block.has-error {
        .svg-icon > * {
            fill: #ff6a55;
        }
        input {
            color: #ff6a55 !important;
        }
    }

    @media screen and (max-width: 768px) {
        .svg-icon {
            display: none;
        }
        .vs__search {
            text-align: center;
            padding: 0 !important;
            padding-left: 0 !important;
        }
        .vs__selected {
            margin-left: 0 !important;
            margin-right: 0 !important;
            transform: translateX(-50%);
            left: 50%;
        }
        .vs__dropdown-menu {
            .select-option {
                > .country-info {
                    > .country {
                        font-size: 12px !important;
                    }
                    > .city {
                        font-size: 10px !important;
                    }
                }
                > .iata {
                    font-size: 13px !important;
                }
            }
        }
        .first-select > ul {
            width: calc(200% + 2.5px) !important;
        }
        .second-select > ul {
            width: calc(200% + 1.75px) !important;
            right: -1px !important;
        }
    }
}
</style>
