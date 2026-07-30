<template>
    <div class="contact-container">
        <div class="content">
            <div class="contactus-label">Contact Us</div>
            <div class="title">
                <p class="main-title">
                    Still <span class="accent">have questions</span> or want to
                    <span class="accent">leave us a message?</span>
                </p>
            </div>
            <div class="subtitle">
                Submit your request in the box below and one of our Travel Consultants will contact you back directly.
            </div>
            <div class="form-container">
                <input-vue name="name" placeholder="Name" v-model="name" />
                <input-vue name="email" placeholder="E-Mail" v-model="email" />
                <input-vue name="phone" placeholder="Phone" v-model="phone" />
                <div class="leave-message">
                    <text-area placeholder="Message" v-model="message" />
                </div>
                <div class="sms-toggle">
                    <label>
                        <input type="checkbox" />

                        By checking this box, I consent to receive text messages related to customer care and marketing
                        from BuyBusinessClass. You can reply "STOP" at any time to opt-out. Message and data rates may
                        apply. Message frequency may vary, text HELP for assistance. For more information, please visit
                        our
                        <router-link to="/privacy"> Privacy Policy </router-link> and
                        <router-link to="/terms">SMS Terms and Conditions</router-link>
                    </label>
                </div>
                <orange-filled-button :buttonText="`Send`" :click="sendMessage" />
            </div>
            <div class="adaptive">
                <div class="position-relative">
                    <div class="d-flex">
                        <div class="instructions">
                            <div class="svg">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.12183 6.00694C1.38628 4.5308 2.12844 2.9017 3.54266 2.05317C4.22354 1.64464 5.10353 1.82193 5.5731 2.46225L6.61487 3.88286C7.05828 4.4875 7.12624 5.28937 6.79091 5.96001L6.51776 6.50631C6.43869 6.66446 6.42619 6.84739 6.50707 7.00462C6.65444 7.29106 6.96825 7.79869 7.57278 8.40322C8.17731 9.00775 8.68493 9.32156 8.97138 9.46892C9.1286 9.54981 9.31154 9.53731 9.46969 9.45823L10.016 9.18508C10.6866 8.84976 11.4885 8.91772 12.0931 9.36113L13.5137 10.4029C14.1541 10.8725 14.3314 11.7525 13.9228 12.4333C13.0743 13.8476 11.4452 14.5897 9.96906 13.8542C8.72498 13.2343 7.1352 12.2083 5.45146 10.5245C3.76772 8.8408 2.74175 7.25102 2.12183 6.00694Z"
                                        fill="#b4853b"
                                    />
                                </svg>
                            </div>
                            <div class="title">Call to Book</div>
                            <div class="body">
                                <a class="tel" :href="`tel:${$store.state.app.settings?.number}`">
                                    {{ $store.state.app.settings?.number }}
                                </a>
                            </div>
                        </div>
                        <transparent-button
                            buttonText="Let’s have a chat"
                            :link="'tel:+18883227999'"
                            :regularLink="true"
                        />
                    </div>
                    <div class="d-flex">
                        <div class="instructions">
                            <div class="svg">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.71988 3.48395C1.57233 3.685 1.6603 3.9574 1.87234 4.08866L7.64904 7.66471C7.86404 7.79781 8.13584 7.79781 8.35084 7.66471L14.1276 4.0886C14.3397 3.95733 14.4276 3.68493 14.2801 3.48387C13.9161 2.98795 13.329 2.66602 12.6667 2.66602H3.33334C2.671 2.66602 2.08386 2.98798 1.71988 3.48395Z"
                                        fill="#b4853b"
                                    />
                                    <path
                                        d="M14.6667 6.22062C14.6667 5.82887 14.2366 5.58929 13.9035 5.79549L9.05265 8.7984C8.40764 9.19769 7.59224 9.19769 6.94723 8.7984L2.09652 5.79558C1.76343 5.58938 1.33334 5.82895 1.33334 6.22071V11.3327C1.33334 12.4373 2.22877 13.3327 3.33334 13.3327H12.6667C13.7712 13.3327 14.6667 12.4373 14.6667 11.3327V6.22062Z"
                                        fill="#b4853b"
                                    />
                                </svg>
                            </div>
                            <div class="title">Email Us</div>
                            <div class="body">
                                <a class="tel" :href="`mailto:${$store.state.app.settings?.email}`">
                                    {{ $store.state.app.settings?.email }}
                                </a>
                            </div>
                        </div>
                        <transparent-button
                            buttonText="Write an email to us"
                            :link="`mailto:${$store.state.app.settings?.email}`"
                            :regularLink="true"
                        />
                    </div>
                    <div class="d-flex">
                        <div class="instructions">
                            <div class="svg">
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
                                        d="M13.3564 6.69051C13.3564 7.95725 12.9167 9.1213 12.1816 10.0383H12.1847C12.1847 10.0383 10.3231 12.5295 8.88091 14.2935C8.42081 14.8563 7.5792 14.8561 7.11938 14.2931C5.68181 12.533 3.82258 10.0437 3.82258 10.0437L3.81824 10.0383C3.08312 9.1213 2.6434 7.95725 2.6434 6.69051C2.6434 3.73218 5.0416 1.33398 7.99992 1.33398C10.9582 1.33398 13.3564 3.73218 13.3564 6.69051ZM10 6.66732C10 7.77189 9.10458 8.66732 8.00001 8.66732C6.89544 8.66732 6.00001 7.77189 6.00001 6.66732C6.00001 5.56275 6.89544 4.66732 8.00001 4.66732C9.10458 4.66732 10 5.56275 10 6.66732Z"
                                        fill="#b4853b"
                                    />
                                </svg>
                            </div>
                            <div class="title">Address</div>
                            <div class="body">180 North Stetson Avenue Chicago, IL, 60601</div>
                        </div>
                        <transparent-button
                            buttonText="Show on map"
                            target="_blank"
                            link="https://maps.app.goo.gl/uumk5sNfudCszvfa7"
                            :regularLink="true"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="contacts">
            <div class="customer-service">
                <div class="customer-service__contacts">
                    <div class="title">24/7 <span class="accent">Open customer service</span></div>
                    <a href="mailto:cs@buybusinessclass.com">
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.71988 3.48395C1.57233 3.685 1.6603 3.9574 1.87234 4.08866L7.64904 7.66471C7.86404 7.79781 8.13584 7.79781 8.35084 7.66471L14.1276 4.0886C14.3397 3.95733 14.4276 3.68493 14.2801 3.48387C13.9161 2.98795 13.329 2.66602 12.6667 2.66602H3.33334C2.671 2.66602 2.08386 2.98798 1.71988 3.48395Z"
                                fill="#111315"
                            ></path>
                            <path
                                d="M14.6667 6.22062C14.6667 5.82887 14.2366 5.58929 13.9035 5.79549L9.05265 8.7984C8.40764 9.19769 7.59224 9.19769 6.94723 8.7984L2.09652 5.79558C1.76343 5.58938 1.33334 5.82895 1.33334 6.22071V11.3327C1.33334 12.4373 2.22877 13.3327 3.33334 13.3327H12.6667C13.7712 13.3327 14.6667 12.4373 14.6667 11.3327V6.22062Z"
                                fill="#111315"
                            ></path>
                        </svg>
                        <span class="content">
                            <span class="accent">Email Us</span>
                            cs@buybusinessclass
                        </span>
                    </a>
                    <a href="tel:+18559552040">
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.12183 6.00694C1.38628 4.5308 2.12844 2.9017 3.54266 2.05317C4.22354 1.64464 5.10353 1.82193 5.5731 2.46225L6.61487 3.88286C7.05828 4.4875 7.12624 5.28937 6.79091 5.96001L6.51776 6.50631C6.43869 6.66446 6.42619 6.84739 6.50707 7.00462C6.65444 7.29106 6.96825 7.79869 7.57278 8.40322C8.17731 9.00775 8.68493 9.32156 8.97138 9.46892C9.1286 9.54981 9.31154 9.53731 9.46969 9.45823L10.016 9.18508C10.6866 8.84976 11.4885 8.91772 12.0931 9.36113L13.5137 10.4029C14.1541 10.8725 14.3314 11.7525 13.9228 12.4333C13.0743 13.8476 11.4452 14.5897 9.96906 13.8542C8.72498 13.2343 7.1352 12.2083 5.45146 10.5245C3.76772 8.8408 2.74175 7.25102 2.12183 6.00694Z"
                                fill="#111315"
                            ></path>
                        </svg>
                        <span class="content">
                            <span class="accent">Call Us</span>
                            +1 (855)-955-2040
                        </span>
                    </a>
                </div>
                <img
                    :src="require('@/assets/images/static/support.png')"
                    alt="customer service"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <google-map />
        </div>
    </div>
</template>

<!-- eslint-disable no-unused-vars -->

<script>
// Components
import GoogleMap from '@/common/GoogleMap.vue'
import InputVue from '@/common/Forms/InputVue.vue'
import TextArea from '@/common/Forms/TextArea.vue'
import OrangeFilledButton from '@/common/UI/Buttons/OrangeFilledButton.vue'
import TransparentButton from '@/common/UI/Buttons/TransparentButton.vue'

// Controllers
import { contactUs } from '@/controllers/appController'

export default {
    components: {
        GoogleMap,
        InputVue,
        TextArea,
        OrangeFilledButton,
        TransparentButton,
    },
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            message: '',
        }
    },
    methods: {
        resetForm() {
            this.name = ''
            this.phone = ''
            this.email = ''
            this.message = ''
        },
        async sendMessage() {
            const [data, error] = await contactUs({
                name: this.name,
                email: this.email,
                phone: this.phone,
                message: this.message,
            })

            if (error) {
                this.$store.commit('showModal', {
                    display: true,
                    status: 'error',
                    body: error,
                    title: 'An error occurred while sending',
                })

                return
            }

            this.resetForm()

            this.$store.commit('showModal', {
                display: true,
                status: 'success',
                title: 'Message successfully delivered',
            })
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.contacts {
    display: grid;
}

.customer-service {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    height: 160px;
    padding: 16px;
    border-radius: 8px;
    background-color: #b4853b;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    margin-top: 32px;

    .title {
        font-size: 18px;
        font-weight: 700;
    }

    .accent {
        color: #dadde0;
    }

    a {
        display: flex;
        align-items: center;
        gap: 8px;

        .content {
            display: grid;
        }

        svg {
            width: 32px;
            padding: 8px;
            border-radius: 50%;
            background-color: #dadde0;
        }
    }

    &__contacts {
        display: grid;
        gap: 16px;
    }

    img {
        display: block;
        height: 80%;
        object-fit: contain;
    }

    @media screen and (max-width: 768px) {
        font-size: 14px;

        .title {
            font-size: 16px;
        }
    }
}

.contact-container {
    padding: 40px 176px 80px 176px;
    justify-content: center;
    display: flex;
    gap: 120px;
    background: linear-gradient(102.21deg, rgba(26, 29, 31, 0) 0%, #1a1d1f 100%);
    border-radius: 16px;

    > .content {
        width: 408px;
        position: relative;

        > .contactus-label,
        > .subtitle {
            color: #6f767e;
            margin-bottom: 8px;
            line-height: 24px;
            font: {
                size: 0.9vw;
                weight: 600;
                family: 'Inter', sans-serif;
            }
        }

        > .title {
            @include block-title;

            > .main-title {
                text-align: left;
            }
        }

        > .subtitle {
            margin-bottom: 32px;
        }

        > .form-container {
            display: flex;
            flex-direction: column;
            gap: 8px;

            > input {
                height: 56px;
            }

            > .leave-message {
                textarea {
                    height: 200px;
                }
            }
        }

        > .adaptive {
            position: absolute;
            width: 490px;
            left: calc(100% + 125.5px);
            bottom: 8px;
            border-radius: 16px;
            padding: 24px;
            margin-top: 32px;
            background: #111315;

            > .position-relative {
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 16px;

                > div {
                    justify-content: space-between;

                    > .instructions {
                        position: relative;

                        > .title,
                        .body {
                            flex-grow: 1;
                            position: absolute;
                            left: 50px;
                            top: 0;
                            width: max-content;
                            font: {
                                family: 'Inter', sans-serif;
                                weight: 600;
                            }

                            &.title {
                                color: #8e969e;
                                font-size: 14px;
                            }

                            &.body {
                                color: #dadde0;
                                font-size: 13px;
                                top: 20px;

                                > .tel {
                                    color: #dadde0;
                                }
                            }
                        }

                        > .svg {
                            background: #272b30;
                            width: 40px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                            margin-bottom: 8px;
                        }
                    }

                    > .button-container {
                        display: none;
                        position: absolute;
                        right: 0;

                        > button,
                        > a {
                            font-size: 13px;
                            padding: 6px 20px 8px 20px;
                        }
                    }
                }
            }
        }
    }

    .google-map {
        margin-top: auto;
    }

    @media screen and (max-width: 1440px) {
        width: 100%;
        padding: 40px 146px;
        margin-bottom: 160px;
        > .content {
            > .contactus-label,
            > .subtitle {
                font-size: 14px;
            }

            > .adaptive {
                width: 398px;
                left: calc(100% + 124px);
            }
        }
        .google-map {
            > iframe {
                width: 406px;
                height: 448px;
            }
        }
    }

    @media screen and (max-width: 1200px) {
        display: block;
        padding: 40px 94px;
        margin-bottom: 120px;
        > .content {
            margin: 0;
            width: 100%;

            > .form-container {
                flex-direction: row;
                flex-wrap: wrap;

                > .input-container {
                    flex-basis: calc(33.333% - 5.35px);
                }

                > .leave-message {
                    flex-basis: 100%;
                }
            }

            > .adaptive {
                position: unset;
                width: unset;
            }
        }
        .google-map {
            display: none;
        }
    }

    @media screen and (max-width: 768px) {
        padding: 0 8px;
        background: none;
        > .content {
            width: unset;

            > .contactus-label {
                font-size: 14px;
            }

            > .subtitle {
                display: none;
            }

            > .adaptive {
                margin: 0;
                background: #1a1d1f;
                padding: 24px 16px;

                > .position-relative {
                    gap: 32px;

                    > div {
                        > .instructions {
                            display: block;

                            > .body,
                            > .title {
                                position: relative;
                                top: unset !important;
                                left: unset !important;
                            }

                            > .body {
                                font-size: 13px;
                            }
                        }

                        > .button-container {
                            display: inline-block;
                        }
                    }
                }
            }

            > .form-container {
                display: none;
            }
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
    cursor: pointer;
}
</style>
