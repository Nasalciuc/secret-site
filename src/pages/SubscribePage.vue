<!-- NewsletterBanner.vue -->
<template>
    <section class="newsletter-banner">
        <div class="nb-container">
            <h2 class="nb-title">Get Exclusive Business Class Flight Deals First</h2>
            <h2 class="nb-subtitle">
                Join our newsletter to get first access to our latest sales and exclusive business class offers you
                won’t find online.
            </h2>

            <form class="nb-form" @submit.prevent="onSubmit">
                <label class="sr-only" for="nb-email">E-mail</label>
                <input
                    id="nb-email"
                    v-model.trim="email"
                    type="email"
                    placeholder="E-mail"
                    class="nb-input"
                    :class="{ invalid: showError }"
                    required
                />
                <button class="nb-btn" type="submit" :disabled="loading">
                    {{ loading ? 'Submitting…' : 'Subscribe Free' }}
                </button>
                <p v-if="error" class="error-msg">{{ error }}</p>
                <p v-if="success" class="success-msg">{{ success }}</p>
            </form>

            <div class="nb-consent">
                <label class="nb-checkbox">
                    <input type="checkbox" v-model="consent" />
                    <span></span>
                </label>
                <small class="nb-legal">
                    I agree to receive promotional emails with exclusive offers and updates. Consent isn’t required for
                    purchase. I accept the <router-link to="/terms">T&C</router-link> and
                    <router-link to="/privacy">Privacy Policy</router-link>.

                    <br />
                    Your <strong>privacy</strong> is 100% protected. Unsubscribe anytime.
                </small>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name: 'NewsletterBanner',
    emits: ['subscribed'],
    data() {
        return {
            email: '',
            consent: false,
            loading: false,

            error: '',
            success: '',
        }
    },
    methods: {
        getUtm() {
            const p = new URLSearchParams(window.location.search)
            const out = {}
            ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => {
                if (p.get(k)) out[`_${k}`] = p.get(k)
            })
            return out
        },
        marketingPayload() {
            return {
                _consent: this.consent ? 'yes' : 'no',
                _source: 'newsletter_banner',
                _referrer: document.referrer || '',
                _path: window.location.pathname,
                _timestamp: new Date().toISOString(),
                ...this.getUtm(),
            }
        },
        async onSubmit() {
            this.error = ''
            this.success = '' // mesaj de succes

            if (!/.+@.+\..+/.test(this.email)) {
                this.error = 'Please enter a valid email.'
                return
            }
            if (!this.consent) {
                this.error = 'Please agree to receive emails.'
                return
            }

            this.loading = true
            try {
                const payload = {
                    email: this.email.trim().toLowerCase(),
                    ...this.marketingPayload(),
                }

                const { data } = await axios.post(`${process.env.VUE_APP_API_URL}/contacts/subscribe`, payload)

                if (data?.success) {
                    this.$emit('subscribed', payload.email)

                    // reset form
                    this.email = ''
                    this.consent = false

                    // afișează mesaj de succes
                    this.success = 'Thank you! You have successfully subscribed to our newsletter.'
                } else {
                    this.error = 'Subscription failed. Please try again.'
                }
            } catch (e) {
                this.error = 'Network error. Please try again.'
            } finally {
                this.loading = false
            }
        },
    },
}
</script>

<style scoped lang="scss">
/* Paletă apropiată de screenshot */
$gold: #b1813a; /* fond bară */
$gold-dark: #a06f2a;
$black: #111;
$white: #fff;
$muted: #cfc7bc;

.newsletter-banner {
    width: 100%;
    background: linear-gradient(0deg, $gold-dark, $gold);
    padding: 36px 16px;
    color: $white;
    display: block;
    border-radius: 12px; /* sau cât vrei */
}
.nb-container {
    width: 100%;
    text-align: center;
}

.nb-title {
    font-size: 28px;
    font-weight: 800;
    margin: 0 0 8px;
}

.nb-subtitle {
    margin: 0 auto 18px;
    max-width: 860px;
    line-height: 1.4;
    color: $black;
    font-size: 16px;
}

.nb-form {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: center;
    justify-content: center;
    max-width: 560px;
    margin: 0 auto 12px;
}

.nb-input {
    height: 42px;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 0 16px;
    background: $white;
    color: $black;
    font-size: 14px;
    outline: none;

    &::placeholder {
        color: #888;
    }
    &.invalid {
        border-color: #d33;
        box-shadow: 0 0 0 2px rgba(211, 51, 51, 0.15);
    }
}

.nb-btn {
    height: 42px;
    border-radius: 999px;
    padding: 0 18px;
    border: 0;
    background: $black;
    color: $white;
    font-weight: 700;
    cursor: pointer;
    transition:
        transform 0.06s ease,
        opacity 0.2s ease;

    &:hover {
        opacity: 0.92;
    }
    &:active {
        transform: translateY(1px);
    }
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}

.nb-consent {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    align-items: start;
    justify-content: center;
    max-width: 820px;
    margin: 6px auto 0;
}

.nb-checkbox {
    position: relative;
    width: 16px;
    height: 16px;
    display: inline-block;
    cursor: pointer;
    margin-left: 36px;
    input {
        display: none;
    }

    span {
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, 0.35);
        background: $white;
        box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.04);
    }

    input:checked + span {
        background: $black;
        border-color: $black;
        box-shadow: inset 0 0 0 3px $white;
    }
}

.nb-legal {
    color: $black;
    line-height: 1.3;
    margin-left: -12px;

    a {
        color: $white;
        text-decoration: underline;
        text-underline-offset: 2px;

        &:hover {
            opacity: 0.9;
        }
    }
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 1px, 1px);
    white-space: nowrap;
    border: 0;
}
.error-msg {
    margin-top: 8px;
    color: #d4181b;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
    text-align: center;
}

.success-msg {
    margin-top: 8px;
    color: #51b61e;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
    text-align: center;
}

/* Mobile */
@media (max-width: 640px) {
    .nb-title {
        font-size: 20px;
    }
    .nb-subtitle {
        font-size: 13px;
    }
    .nb-form {
        grid-template-columns: 1fr;
    }
    .nb-btn {
        width: 100%;
    }
}
</style>
