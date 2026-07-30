<template>
    <transition name="coupon-fade">
        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="coupon-title">
                <button class="close-button" @click="closeModal" aria-label="Close">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </button>

                <div class="modal-columns">
                    <div class="modal-image">
                        <img
                            src="https://i.imgur.com/VcWTka1.jpeg"
                            alt="Business Class Discount"
                            loading="lazy"
                            decoding="async"
                        />
                        <div class="image-overlay">
                            <span class="badge">Limited offer</span>
                            <h3 class="image-title">Fly business.<br />Pay less.</h3>
                            <p class="image-subtitle">Exclusive saving on your next premium ticket.</p>
                        </div>
                    </div>

                    <div class="modal-form">
                        <span class="eyebrow">Exclusive offer</span>
                        <h2 id="coupon-title">Save Extra <span class="amount">$100</span> Now</h2>
                        <p class="lead">
                            Share your phone number and the promo code with your agent to receive an additional discount
                            on your booking.
                        </p>

                        <div class="promo-card" :class="{ copied: codeCopied }">
                            <div class="promo-card-label">Your promo code</div>
                            <div class="promo-card-row">
                                <span class="promo-card-value">{{ coupon }}</span>
                                <button type="button" class="copy-btn" @click="copyCode" aria-label="Copy code">
                                    <svg v-if="!codeCopied" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <rect
                                            x="4"
                                            y="4"
                                            width="9"
                                            height="9"
                                            rx="1.5"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        />
                                        <path
                                            d="M11 4V3a1.5 1.5 0 0 0-1.5-1.5h-6A1.5 1.5 0 0 0 2 3v6A1.5 1.5 0 0 0 3.5 10.5H4"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        />
                                    </svg>
                                    <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M3 8.5L6.5 12L13 4.5"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <span>{{ codeCopied ? 'Copied' : 'Copy' }}</span>
                                </button>
                            </div>
                        </div>

                        <form @submit.prevent="handleSubmit" novalidate>
                            <div class="form-group" :class="{ 'has-error': formErrors.name }">
                                <input
                                    type="text"
                                    id="name"
                                    v-model="name"
                                    placeholder="Full name"
                                    autocomplete="name"
                                />
                            </div>

                            <div class="form-group" :class="{ 'has-error': formErrors.email }">
                                <input
                                    type="email"
                                    id="email"
                                    v-model="email"
                                    placeholder="Email address"
                                    autocomplete="email"
                                />
                            </div>

                            <div class="form-group iti-group" :class="{ 'has-error': formErrors.phone }">
                                <input
                                    ref="phoneInput"
                                    type="tel"
                                    v-model="phone"
                                    placeholder="Phone number"
                                    autocomplete="tel"
                                    @input="onPhoneInput"
                                />
                            </div>

                            <label class="terms">
                                <input type="checkbox" v-model="agreeToTerms" required />
                                <span class="terms-text">
                                    I consent to receive text messages from BuyBusinessClass for customer care and
                                    marketing. Reply "STOP" to opt-out. Msg & data rates may apply. See our
                                    <router-link to="/privacy">Privacy Policy</router-link> &
                                    <router-link to="/terms">SMS Terms</router-link>.
                                </span>
                            </label>

                            <button type="submit" class="submit-button" :disabled="!canSubmit">
                                <span>Claim my $100 discount</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path
                                        d="M3 8h10M9 4l4 4-4 4"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { markRaw } from 'vue'
import intlTelInput from 'intl-tel-input/intlTelInputWithUtils'
import 'intl-tel-input/styles'
import { sendCouponLead } from '@/controllers/flyController'

export default {
    props: {
        autoOpen: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        if (this.autoOpen) this.openModal()
    },
    beforeUnmount() {
        if (this.iti) {
            this.iti.destroy()
            this.iti = null
        }
    },
    watch: {
        showModal(open) {
            if (open) {
                this.$nextTick(() => this.initIti())
            } else if (this.iti) {
                this.iti.destroy()
                this.iti = null
            }
        },
    },
    data() {
        return {
            showModal: false,
            name: '',
            email: '',
            phone: '',
            phoneE164: null,
            valid: null,
            agreeToTerms: false,
            codeCopied: false,
            iti: null,
            formErrors: {
                name: null,
                phone: null,
                email: null,
            },
            coupon: 'SAVE100',
        }
    },
    computed: {
        canSubmit() {
            return this.name.trim() !== '' && this.email.trim() !== '' && this.valid === true && this.agreeToTerms
        },
    },
    methods: {
        openModal() {
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
        },
        copyCode() {
            const done = () => {
                this.codeCopied = true
                setTimeout(() => (this.codeCopied = false), 2000)
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(this.coupon).then(done).catch(done)
            } else {
                const ta = document.createElement('textarea')
                ta.value = this.coupon
                document.body.appendChild(ta)
                ta.select()
                try {
                    document.execCommand('copy')
                } catch (e) {
                    /* noop */
                }
                document.body.removeChild(ta)
                done()
            }
        },
        async handleSubmit() {
            this.formErrors.name = null
            this.formErrors.phone = null
            this.formErrors.email = null

            await this.sendCouponLead()
        },

        async sendCouponLead() {
            const client = {
                name: this.name,
                email: this.email,
                phone: (this.phoneE164 || this.phone || '').replace(/\s/g, ''),
            }

            if (!this.agreeToTerms) {
                this.$store.commit('showModal', {
                    display: true,
                    status: 'error',
                    title: 'Validation error',
                    body: 'You must agree to the terms and conditions.',
                })
                return
            }

            const [result, error] = await sendCouponLead({
                client,
                coupon: this.coupon,
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
                this.$store.commit('showModal', {
                    display: true,
                    status: 'success',
                    title: 'Request Successful',
                    body: 'Your request was submitted successfully.',
                    id: 'request-success-popup',
                })

                this.closeModal()
            }
        },

        initIti() {
            if (this.iti || !this.$refs.phoneInput) return
            this.iti = markRaw(
                intlTelInput(this.$refs.phoneInput, {
                    initialCountry: 'us',
                    countryOrder: ['us', 'gb', 'ca', 'au'],
                    separateDialCode: true,
                    autoPlaceholder: 'aggressive',
                    formatOnDisplay: true,
                }),
            )
            const refresh = () => this.refreshPhoneState()
            this.$refs.phoneInput.addEventListener('countrychange', refresh)
            this.$refs.phoneInput.addEventListener('change', refresh)
        },
        onPhoneInput() {
            this.refreshPhoneState()
        },
        refreshPhoneState() {
            if (!this.iti) {
                this.valid = null
                this.phoneE164 = null
                return
            }
            const isValid = this.iti.isValidNumber()
            this.valid = isValid === true
            this.phoneE164 = isValid ? this.iti.getNumber() : null
            if (isValid) this.formErrors.phone = null
        },
    },
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(8, 10, 12, 0.72);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
}

.modal-content {
    background: linear-gradient(160deg, #15181b 0%, #0e1012 100%);
    border-radius: 20px;
    box-shadow:
        0 30px 80px rgba(0, 0, 0, 0.55),
        0 0 0 1px rgba(212, 163, 115, 0.18);
    max-width: 880px;
    width: 100%;
    position: relative;
    overflow: hidden;
    color: #f5f1ea;
}

.coupon-fade-enter-active,
.coupon-fade-leave-active {
    transition: opacity 0.25s ease;
}
.coupon-fade-enter-active .modal-content,
.coupon-fade-leave-active .modal-content {
    transition:
        transform 0.3s cubic-bezier(0.2, 0.8, 0.25, 1),
        opacity 0.25s ease;
}
.coupon-fade-enter-from,
.coupon-fade-leave-to {
    opacity: 0;
}
.coupon-fade-enter-from .modal-content,
.coupon-fade-leave-to .modal-content {
    transform: translateY(16px) scale(0.97);
    opacity: 0;
}

.close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #f5f1ea;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition:
        background 0.2s ease,
        transform 0.2s ease;
    z-index: 5;
}
.close-button:hover {
    background: rgba(255, 255, 255, 0.16);
    transform: rotate(90deg);
}

.modal-columns {
    display: grid;
    grid-template-columns: 1fr 1.05fr;
}

/* IMAGE COLUMN */
.modal-image {
    position: relative;
    overflow: hidden;
    min-height: 100%;
}
.modal-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(1.05) contrast(1.02);
}
.image-overlay {
    position: absolute;
    inset: 0;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: linear-gradient(180deg, rgba(15, 17, 19, 0.05) 0%, rgba(15, 17, 19, 0.85) 100%);
    color: #fff;
}
.badge {
    align-self: flex-start;
    padding: 6px 12px;
    background: rgba(212, 163, 115, 0.95);
    color: #15181b;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: auto;
}
.image-title {
    font-size: 28px;
    line-height: 1.15;
    font-weight: 700;
    margin: 0 0 8px;
    letter-spacing: -0.01em;
}
.image-subtitle {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.78);
    margin: 0;
    text-align: left;
}

/* FORM COLUMN */
.modal-form {
    padding: 40px 36px 32px;
    display: flex;
    flex-direction: column;
    text-align: left;
}
.eyebrow {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #d4a373;
    font-weight: 700;
    margin-bottom: 8px;
}
.modal-form h2 {
    font-size: 26px;
    line-height: 1.2;
    margin: 0 0 10px;
    color: #fff;
    font-weight: 700;
    text-align: left;
}
.modal-form h2 .amount {
    background: linear-gradient(135deg, #f0c98a 0%, #d4a373 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
.lead {
    font-size: 13px;
    line-height: 1.55;
    color: rgba(245, 241, 234, 0.7);
    margin: 0 0 18px;
    text-align: left;
}

/* PROMO CARD */
.promo-card {
    background: rgba(212, 163, 115, 0.08);
    border: 1px dashed rgba(212, 163, 115, 0.55);
    border-radius: 12px;
    padding: 12px 14px;
    margin-bottom: 20px;
    transition:
        background 0.25s ease,
        border-color 0.25s ease;
}
.promo-card.copied {
    background: rgba(122, 195, 142, 0.1);
    border-color: rgba(122, 195, 142, 0.55);
    border-style: solid;
}
.promo-card-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(245, 241, 234, 0.55);
    margin-bottom: 4px;
}
.promo-card-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}
.promo-card-value {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: #f0c98a;
    font-family: 'Courier New', monospace;
}
.copy-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 255, 255, 0.06);
    color: #f5f1ea;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition:
        background 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease;
}
.copy-btn:hover {
    background: rgba(255, 255, 255, 0.12);
}
.promo-card.copied .copy-btn {
    background: rgba(122, 195, 142, 0.18);
    border-color: rgba(122, 195, 142, 0.5);
    color: #b6e2c1;
}

/* FORM FIELDS */
.form-group {
    margin-bottom: 12px;
}
input[type='text'],
input[type='email'],
input[type='tel'] {
    width: 100%;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #f5f1ea;
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 14px;
    transition:
        border-color 0.2s ease,
        background 0.2s ease;
}
input[type='text']::placeholder,
input[type='email']::placeholder,
input[type='tel']::placeholder {
    color: rgba(245, 241, 234, 0.4);
}
input[type='text']:focus,
input[type='email']:focus,
input[type='tel']:focus {
    outline: none;
    border-color: #d4a373;
    background: rgba(255, 255, 255, 0.07);
}
.form-group.has-error input {
    border-color: #e57373 !important;
}

/* intl-tel-input — dark theme */
/* Wrapper — intl-tel-input takes 100% width and we re-use the standard form input styling */
.iti-group :deep(.iti) {
    width: 100%;
    display: block;
}
.iti-group :deep(.iti__tel-input) {
    width: 100% !important;
    background: rgba(255, 255, 255, 0.04) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    color: #f5f1ea !important;
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    padding-right: 14px !important;
    /* padding-left is set by intl-tel-input inline based on dial code width — don't override */
    border-radius: 10px !important;
    font-size: 14px !important;
    font-family: inherit !important;
    transition:
        border-color 0.2s ease,
        background 0.2s ease;
    caret-color: #d4a373;
}
.iti-group :deep(.iti__tel-input::placeholder) {
    color: rgba(245, 241, 234, 0.4) !important;
}
.iti-group :deep(.iti__tel-input:focus) {
    outline: none !important;
    border-color: #d4a373 !important;
    background: rgba(255, 255, 255, 0.07) !important;
}
.iti-group.has-error :deep(.iti__tel-input) {
    border-color: #e57373 !important;
}

/* Selected flag button (left side) — dark background to blend with the input */
.iti-group :deep(.iti__selected-flag),
.iti-group :deep(.iti__country-container > button) {
    background: transparent !important;
    border-radius: 10px 0 0 10px !important;
    padding: 0 8px 0 12px !important;
}
.iti-group :deep(.iti__selected-flag:hover),
.iti-group :deep(.iti__selected-flag:focus) {
    background: rgba(255, 255, 255, 0.06) !important;
}
.iti-group :deep(.iti--separate-dial-code .iti__selected-dial-code),
.iti-group :deep(.iti__selected-dial-code) {
    color: #f5f1ea !important;
    font-weight: 600;
    margin-left: 6px;
}
.iti-group :deep(.iti__arrow) {
    border-top-color: rgba(245, 241, 234, 0.6) !important;
}
.iti-group :deep(.iti__arrow--up) {
    border-bottom-color: rgba(245, 241, 234, 0.6) !important;
}

/* Dropdown list — dark theme. Selectors duplicated with :deep + raw to handle
   dropdowns rendered both inside the component scope and teleported to body. */
.iti-group :deep(.iti__country-list),
.iti-group :deep(.iti__dropdown-content),
:deep(.iti__country-list),
:deep(.iti__dropdown-content),
.iti__country-list,
.iti__dropdown-content {
    background: #1a1d20 !important;
    background-color: #1a1d20 !important;
    color: #f5f1ea !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 10px !important;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45) !important;
    max-height: 260px !important;
    overflow-y: auto !important;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
}
:deep(.iti__country-list)::-webkit-scrollbar,
.iti__country-list::-webkit-scrollbar {
    width: 6px;
}
:deep(.iti__country-list)::-webkit-scrollbar-thumb,
.iti__country-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.18);
    border-radius: 3px;
}
:deep(.iti__country),
.iti__country {
    background: transparent !important;
    background-color: transparent !important;
    padding: 8px 12px !important;
    font-size: 13px !important;
    color: #f5f1ea !important;
}
:deep(.iti__country .iti__country-name),
:deep(.iti__country .iti__flag-box),
.iti__country .iti__country-name,
.iti__country .iti__flag-box {
    color: #f5f1ea !important;
}
:deep(.iti__country.iti__highlight),
:deep(.iti__country:hover),
.iti__country.iti__highlight,
.iti__country:hover {
    background: rgba(255, 255, 255, 0.06) !important;
    background-color: rgba(255, 255, 255, 0.06) !important;
    color: #f5f1ea !important;
}
:deep(.iti__country.iti__active),
.iti__country.iti__active {
    background: transparent !important;
    background-color: transparent !important;
    color: #f0c98a !important;
    font-weight: 700;
}
:deep(.iti__divider),
.iti__divider {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    background: transparent !important;
}
:deep(.iti__dial-code),
.iti__dial-code {
    color: rgba(245, 241, 234, 0.5) !important;
}
:deep(.iti__country.iti__active .iti__dial-code),
.iti__country.iti__active .iti__dial-code {
    color: #d4a373 !important;
}
:deep(.iti__search-input-wrapper),
.iti__search-input-wrapper {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 6px 10px !important;
    background: #1a1d20 !important;
}
:deep(.iti__search-icon),
.iti__search-icon {
    flex-shrink: 0 !important;
    color: rgba(245, 241, 234, 0.5) !important;
    margin-right: 4px !important;
}
:deep(.iti__search-icon svg),
.iti__search-icon svg,
:deep(.iti__search-icon-svg),
.iti__search-icon-svg {
    width: 14px !important;
    height: 14px !important;
    fill: currentColor !important;
}
:deep(.iti__search-input),
:deep(input.iti__search-input),
.iti__search-input,
input.iti__search-input {
    background: #1a1d20 !important;
    background-color: #1a1d20 !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 6px !important;
    color: #f5f1ea !important;
    padding: 6px 10px !important;
    margin: 0 !important;
    flex: 1 1 auto !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
    box-shadow: none !important;
    -webkit-box-shadow: 0 0 0 1000px #1a1d20 inset !important;
    -webkit-text-fill-color: #f5f1ea !important;
}
:deep(.iti__search-input::placeholder),
.iti__search-input::placeholder {
    color: rgba(245, 241, 234, 0.4) !important;
}
:deep(.iti__search-input:focus),
.iti__search-input:focus {
    outline: none !important;
    border-color: rgba(212, 163, 115, 0.5) !important;
    background: #1a1d20 !important;
}
:deep(.iti__search-input:-webkit-autofill),
.iti__search-input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #1a1d20 inset !important;
    -webkit-text-fill-color: #f5f1ea !important;
}

/* TERMS */
.terms {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 11px;
    line-height: 1.5;
    color: rgba(245, 241, 234, 0.6);
    margin: 4px 0 18px;
    cursor: pointer;
}
.terms input[type='checkbox'] {
    appearance: none;
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    min-width: 16px;
    margin-top: 2px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.04);
    cursor: pointer;
    position: relative;
    transition:
        background 0.2s ease,
        border-color 0.2s ease;
}
.terms input[type='checkbox']:checked {
    background: #d4a373;
    border-color: #d4a373;
}
.terms input[type='checkbox']:checked::after {
    content: '';
    position: absolute;
    left: 4px;
    top: 1px;
    width: 4px;
    height: 8px;
    border: solid #15181b;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}
.terms-text :deep(a),
.terms :deep(a) {
    color: #d4a373;
    text-decoration: underline;
    text-underline-offset: 2px;
}

/* SUBMIT */
.submit-button {
    margin-top: auto;
    background: linear-gradient(135deg, #f0c98a 0%, #d4a373 100%);
    color: #15181b;
    border: none;
    padding: 14px 18px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.02em;
    border-radius: 12px;
    cursor: pointer;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 8px 24px rgba(212, 163, 115, 0.25);
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        opacity 0.2s ease;
}
.submit-button:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(212, 163, 115, 0.35);
}
.submit-button:not(:disabled):active {
    transform: translateY(0);
}
.submit-button:disabled {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(245, 241, 234, 0.4);
    box-shadow: none;
    cursor: not-allowed;
}

/* MOBILE */
@media (max-width: 768px) {
    .modal-overlay {
        padding: 0;
        align-items: stretch;
    }
    .modal-content {
        max-width: 100%;
        border-radius: 18px 18px 0 0;
        margin-top: auto;
        max-height: 95vh;
        overflow-y: auto;
    }
    .modal-columns {
        grid-template-columns: 1fr;
    }
    .modal-image {
        min-height: 180px;
        max-height: 200px;
    }
    .image-overlay {
        padding: 20px;
    }
    .image-title {
        font-size: 22px;
    }
    .modal-form {
        padding: 24px 20px 24px;
    }
    .modal-form h2 {
        font-size: 22px;
    }
    .close-button {
        top: 12px;
        right: 12px;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.55);
        border-color: rgba(255, 255, 255, 0.2);
    }
}
</style>
