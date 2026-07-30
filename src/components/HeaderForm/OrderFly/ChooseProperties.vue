<template>
    <div class="d-flex choose-properties">
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
                <span>{{ propType }}</span>
            </button>
        </div>
        <choose-class
            :type="propType"
            @setType="(type) => $emit('typeSelected', type)"
            v-click-outside="classClick"
            :class="showClass ? 'show' : 'hide'"
        />
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
                    {{ `Passengers ${propTravelers.adult + propTravelers.child + propTravelers.infant}` }}
                </span>
            </button>
        </div>
        <choose-passengers
            :travelers="propTravelers"
            @setTravelers="(travelers) => $emit('travelersSelected', travelers)"
            v-click-outside="passengersClick"
            :class="showPassengers ? 'show' : 'hide'"
        />
    </div>
</template>

<script>
// Components
import ChooseClass from '../ChooseClass.vue'
import ChoosePassengers from '../ChoosePassengers.vue'

export default {
    props: {
        propType: {
            type: String,
        },
        propTravelers: {
            type: Object,
        },
    },
    components: {
        ChooseClass,
        ChoosePassengers,
    },
    data() {
        return {
            showPassengers: false,
            showClass: false,
        }
    },
    methods: {
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
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.choose-properties {
    position: relative;
    width: 100%;
    border: none;
    padding: 0 !important;
    margin-bottom: 10px;
    align-items: center;
    z-index: 100;
    gap: 8px;
    > div:not(.adaptive-select-options-buttons) {
        position: absolute;
        padding: 24px;
        top: 100%;
        width: calc(50% - 4px);
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
            }
        }
    }
    > .choose-ammount-travelers {
        right: 0;
    }

    @media screen and (max-width: 768px) {
        > .adaptive-select-options-buttons {
            > button {
                > svg {
                    display: none;
                }
                > span {
                    margin: 0;
                    padding: 16px;
                    width: 100%;
                    display: block;
                    text-align: center;
                }
            }
        }
    }
}
</style>
