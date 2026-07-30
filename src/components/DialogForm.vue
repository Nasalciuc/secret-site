<template>
    <dialog-root v-model:open="open" :modal="false">
        <dialog-trigger class="trigger">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.12183 6.00694C1.38628 4.5308 2.12844 2.9017 3.54266 2.05317C4.22354 1.64464 5.10353 1.82193 5.5731 2.46225L6.61487 3.88286C7.05828 4.4875 7.12624 5.28937 6.79091 5.96001L6.51776 6.50631C6.43869 6.66446 6.42619 6.84739 6.50707 7.00462C6.65444 7.29106 6.96825 7.79869 7.57278 8.40322C8.17731 9.00775 8.68493 9.32156 8.97138 9.46892C9.1286 9.54981 9.31154 9.53731 9.46969 9.45823L10.016 9.18508C10.6866 8.84976 11.4885 8.91772 12.0931 9.36113L13.5137 10.4029C14.1541 10.8725 14.3314 11.7525 13.9228 12.4333C13.0743 13.8476 11.4452 14.5897 9.96906 13.8542C8.72498 13.2343 7.1352 12.2083 5.45146 10.5245C3.76772 8.8408 2.74175 7.25102 2.12183 6.00694Z"
                    fill="#f4f4f4"
                ></path>
            </svg>
        </dialog-trigger>
        <dialog-overlay />
        <dialog-portal>
            <dialog-content v-show="!loading" class="dialog-content" @interact-outside.prevent>
                <visually-hidden asChild>
                    <DialogTitle>Order Form</DialogTitle>
                </visually-hidden>
                <dialog-close class="close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                            d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                        />
                    </svg>
                </dialog-close>
                <div class="call-block">
                    <div class="call-block__head">
                        <div class="content">
                            <div class="title">CALL TO SPEAK</div>
                            <div>Live concierge available 24/7</div>
                        </div>
                        <img
                            :src="require('@/assets/images/static/call-center-agent.webp')"
                            alt="call center agent"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <a href="tel:+18559552040">+1 (855) 955-2040</a>
                </div>
                <div class="separator">Or</div>
                <h3 class="form-header">REQUEST A FREE QUOTE</h3>
                <order-fly />
            </dialog-content>
        </dialog-portal>
    </dialog-root>
</template>
<script>
import {
    DialogRoot,
    DialogTrigger,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogClose,
    VisuallyHidden,
} from 'radix-vue'
import OrderFly from '@/components/HeaderForm/OrderFly/OrderFly.vue'
import { mapState } from 'vuex'
export default {
    components: {
        DialogRoot,
        DialogTrigger,
        DialogPortal,
        DialogOverlay,
        DialogContent,
        DialogTitle,
        DialogClose,
        VisuallyHidden,
        OrderFly,
    },
    data() {
        return {
            open: false,
        }
    },
    computed: {
        ...mapState({
            loading: (state) => state.app.quoteLoading.loading,
        }),
    },
    watch: {
        open(newValue) {
            const jdiv = document.querySelector('jdiv')
            if (jdiv) jdiv.style.display = newValue ? 'none' : 'block'
            document.body.style.overflow = newValue ? 'hidden' : ''
        },
        $route() {
            this.open = false
        },
    },
}
</script>
<style scoped lang="scss">
.form-header {
    color: #dadde0;
    text-align: center;
    font-family: 'Inter', sans-serif;
}
.call-block {
    display: flex;
    flex-direction: column;
    font-family: 'Inter', sans-serif;
    align-items: center;
    gap: 32px;
    a {
        width: 80%;
        text-align: center;
        font-size: 24px;
        border-radius: 8px;
        font-weight: 700;
        padding-block: 10px;
        color: #b4853b;
        background-color: #1a1d1f;
        box-shadow: 0 0 10px #dbdde0;
    }
}

.call-block__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    color: #dadde0;
    font-weight: 700;
    font-size: 14px;

    .content {
        display: grid;
        gap: 16px;
    }

    .title {
        font-size: 16px;
    }

    img {
        display: block;
        height: 80%;
        object-fit: contain;
    }
}

.separator {
    position: relative;
    color: #dadde0;
    text-align: center;
    margin-inline: -2rem;

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 40%;
        height: 2px;
        background-color: #dadde0;
        transform: translateY(-50%);
    }

    &::before {
        left: 0;
    }

    &::after {
        right: 0;
    }
}
.trigger {
    align-self: flex-start;
    padding: 6px 16px;
    white-space: nowrap;
    background-color: #b4853b;
    border-radius: 0.5rem;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 700;

    svg {
        height: 20px;
        width: auto;
    }

    @media screen and (min-width: 768px) {
        display: none;
    }
}

.dialog-content {
    position: fixed;
    z-index: 600;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background-color: #111315;
    overflow-y: auto;
}

.close {
    align-self: flex-end;
    background-color: transparent;
    svg {
        fill: #dadde0;
    }
}
</style>
