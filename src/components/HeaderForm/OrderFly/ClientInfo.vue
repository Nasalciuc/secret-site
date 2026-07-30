<template>
    <div class="client-info">
        <div class="first-row">
            <input
                name="name"
                placeholder="Name"
                class="input-name"
                :class="{ 'has-error': errors?.name }"
                v-model="name"
            />
            <div class="iti-group" :class="{ valid, 'not-valid': !valid, 'has-error': errors?.phone }">
                <input
                    ref="phoneInput"
                    type="tel"
                    v-model="phone"
                    placeholder="Phone"
                    autocomplete="tel"
                    @input="refreshPhoneState"
                />
            </div>
            <input
                name="email"
                placeholder="email@example.com"
                class="input-email"
                :class="{ 'has-error': errors?.email }"
                v-model="email"
            />
        </div>
        <div class="second-row">
            <choose-properties
                @typeSelected="type = $event"
                @travelersSelected="travelers = $event"
                :propType="type"
                :propTravelers="travelers"
            />
            <orange-filled-button
                class="search-submit"
                :buttonText="`Get Free Quote`"
                :click="
                    () =>
                        $emit('button-clicked', {
                            phone_valid: valid,
                            cabin_class: type
                                .toLowerCase()
                                .replace(/ /g, '_')
                                .replace(/_class/, ''),
                            passengers: travelers,
                            client: {
                                name,
                                phone: (this.phoneE164 || phone || '')?.replace(/ /g, ''),
                                email,
                            },
                        })
                "
            />
        </div>
        <div class="privacy-text">
            By submitting, you agree to our <router-link to="/privacy">Privacy Policy</router-link> and consent to
            receive SMS.
        </div>
    </div>
</template>

<script>
// Components
import { markRaw } from 'vue'
import intlTelInput from 'intl-tel-input/intlTelInputWithUtils'
import 'intl-tel-input/styles'
import OrangeFilledButton from '@/common/UI/Buttons/OrangeFilledButton.vue'
import ChooseProperties from './ChooseProperties.vue'

export default {
    components: {
        ChooseProperties,
        OrangeFilledButton,
    },
    props: {
        errors: {
            type: Object,
            default: () => ({
                phone: null,
                email: null,
                name: null,
            }),
        },
    },
    data() {
        return {
            name: '',
            email: '',
            phone: '',
            phoneE164: null,
            valid: null,
            iti: null,
            type: 'Business Class',
            travelers: {
                adult: 1,
                child: 0,
                infant: 0,
            },
        }
    },
    mounted() {
        this.iti = markRaw(
            intlTelInput(this.$refs.phoneInput, {
                initialCountry: 'us',
                countryOrder: ['us', 'gb', 'ca', 'au'],
                separateDialCode: true,
                autoPlaceholder: 'aggressive',
                formatOnDisplay: true,
            }),
        )
        this.$refs.phoneInput.addEventListener('countrychange', this.refreshPhoneState)
        this.$refs.phoneInput.addEventListener('change', this.refreshPhoneState)
    },
    beforeUnmount() {
        if (this.iti) {
            this.iti.destroy()
            this.iti = null
        }
    },
    methods: {
        refreshPhoneState() {
            if (!this.iti) {
                this.valid = null
                this.phoneE164 = null
                return
            }
            const isValid = this.iti.isValidNumber()
            this.valid = isValid === true
            this.phoneE164 = isValid ? this.iti.getNumber() : null
        },
    },
}
</script>
<style lang="scss">
.search-submit {
    box-shadow: 0 0 8px #101214;

    button {
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 1.2px;
    }
}

.privacy-text {
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    padding-inline: 8px;
    padding-block: 4px;
    border-radius: 6px;
    margin-top: 8px;
    color: #dadde0;
    background-color: #1a1d1f;

    a {
        color: #b4853b;
    }
}

/* intl-tel-input — dark theme matching #1a1d1f / #b4853b palette */
.iti-group {
    flex-grow: 1;
    min-width: 0;
}
.iti-group .iti {
    width: 100%;
    display: block;
}
.iti-group .iti__tel-input {
    width: 100% !important;
    background: #1a1d1f !important;
    border: 1px solid #33383f !important;
    color: #dadde0 !important;
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    padding-right: 14px !important;
    border-radius: 8px !important;
    font-size: 14px !important;
    font-family: 'Inter', sans-serif !important;
    font-weight: 600;
    transition:
        border-color 0.2s ease,
        background 0.2s ease;
    caret-color: #b4853b;
    height: 48px;
    box-sizing: border-box;
}
.iti-group .iti__tel-input::placeholder {
    color: rgba(218, 221, 224, 0.4) !important;
}
.iti-group .iti__tel-input:focus {
    outline: none !important;
    border-color: #b4853b !important;
}
.iti-group.has-error .iti__tel-input {
    border-color: #ff6a55 !important;
}

/* Selected flag button (left side) */
.iti-group .iti__selected-flag,
.iti-group .iti__country-container > button {
    background: transparent !important;
    border-radius: 8px 0 0 8px !important;
    padding: 0 8px 0 12px !important;
}
.iti-group .iti__selected-flag:hover,
.iti-group .iti__selected-flag:focus {
    background: rgba(255, 255, 255, 0.04) !important;
}
.iti-group .iti--separate-dial-code .iti__selected-dial-code,
.iti-group .iti__selected-dial-code {
    color: #dadde0 !important;
    font-weight: 600;
    margin-left: 6px;
}
.iti-group .iti__arrow {
    border-top-color: rgba(218, 221, 224, 0.6) !important;
}
.iti-group .iti__arrow--up {
    border-bottom-color: rgba(218, 221, 224, 0.6) !important;
}

/* Dropdown list — dark theme */
.iti-group .iti__country-list,
.iti-group .iti__dropdown-content,
.iti__country-list,
.iti__dropdown-content {
    background: #1a1d1f !important;
    background-color: #1a1d1f !important;
    color: #dadde0 !important;
    border: 1px solid #33383f !important;
    border-radius: 8px !important;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45) !important;
    max-height: 260px !important;
    overflow-y: auto !important;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
}
.iti__country-list::-webkit-scrollbar {
    width: 6px;
}
.iti__country-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.18);
    border-radius: 3px;
}
.iti__country {
    background: transparent !important;
    background-color: transparent !important;
    padding: 8px 12px !important;
    font-size: 13px !important;
    color: #dadde0 !important;
}
.iti__country .iti__country-name,
.iti__country .iti__flag-box {
    color: #dadde0 !important;
}
.iti__country.iti__highlight,
.iti__country:hover {
    background: rgba(255, 255, 255, 0.06) !important;
    color: #dadde0 !important;
}
.iti__country.iti__active {
    background: transparent !important;
    color: #b4853b !important;
    font-weight: 700;
}
.iti__divider {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    background: transparent !important;
}
.iti__dial-code {
    color: rgba(218, 221, 224, 0.5) !important;
}
.iti__country.iti__active .iti__dial-code {
    color: #b4853b !important;
}

/* Search inside dropdown */
.iti__search-input-wrapper {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 6px 10px !important;
    background: #1a1d1f !important;
}
.iti__search-icon {
    flex-shrink: 0 !important;
    color: rgba(218, 221, 224, 0.5) !important;
    margin-right: 4px !important;
}
.iti__search-icon svg,
.iti__search-icon-svg {
    width: 14px !important;
    height: 14px !important;
    fill: currentColor !important;
}
.iti__search-input,
input.iti__search-input {
    background: #1a1d1f !important;
    border: 1px solid #33383f !important;
    border-radius: 6px !important;
    color: #dadde0 !important;
    padding: 6px 10px !important;
    margin: 0 !important;
    flex: 1 1 auto !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
    box-shadow: none !important;
    -webkit-box-shadow: 0 0 0 1000px #1a1d1f inset !important;
    -webkit-text-fill-color: #dadde0 !important;
}
.iti__search-input::placeholder {
    color: rgba(218, 221, 224, 0.4) !important;
}
.iti__search-input:focus {
    outline: none !important;
    border-color: rgba(180, 133, 59, 0.5) !important;
    background: #1a1d1f !important;
}
</style>
