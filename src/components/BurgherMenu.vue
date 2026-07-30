<template>
    <div :class="`burgher-menu ${showBurgher ? 'show' : 'hide'} ${setTransition ? 'transition' : ''}`">
        <div class="burgher-header">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.9289 31.9211C20.5139 31.9211 24.6707 30.0014 27.5899 26.8759L1.87216 23.4807C4.58519 28.4784 9.83652 31.9211 15.9289 31.9211ZM15.9289 0C13.0413 0 10.3284 0.777347 7.98036 2.12594C12.2956 2.83992 15.2149 6.02883 18.1183 9.53505C14.739 7.02844 11.0899 6.25109 7.29806 5.77505C6.88555 5.72752 6.3143 5.45774 6.15588 5.15628C5.94947 4.72792 5.77505 4.26772 5.61632 3.80768C2.17362 6.72697 0 11.0741 0 15.9289C0 17.5948 0.253782 19.213 0.729822 20.7678H31.1438C31.6196 19.2605 31.8736 17.6423 31.8736 15.9289C31.9211 7.13949 24.7341 0 15.9289 0ZM14.1202 18.753C12.8669 18.753 11.677 18.1817 11.1057 17.0394C9.63026 14.1202 8.32935 11.0899 6.8697 7.91683C11.5024 7.91683 15.6749 8.32935 19.0543 11.1533C21.815 13.4379 26.9711 18.8163 26.9711 18.8163L14.1202 18.753Z"
                    fill="white"
                />
            </svg>
            <button aria-label="toggle menu" @click="$store.commit('displayBurgherMenu')">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.70708 5.29289C6.31655 4.90237 5.68339 4.90237 5.29286 5.29289C4.90234 5.68342 4.90234 6.31658 5.29286 6.70711L10.5857 12L5.29277 17.2929C4.90225 17.6834 4.90225 18.3166 5.29277 18.7071C5.6833 19.0976 6.31646 19.0976 6.70698 18.7071L11.9999 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4141 12L18.707 6.70711C19.0975 6.31658 19.0975 5.68342 18.707 5.29289C18.3165 4.90237 17.6833 4.90237 17.2928 5.29289L11.9999 10.5857L6.70708 5.29289Z"
                        fill="#6F767E"
                    />
                </svg>
            </button>
        </div>
        <div class="content">
            <div class="links">
                <router-link @click="hideBurgher" to="/" class="fade-in" style="--index: 0">Home</router-link>
                <router-link @click="hideBurgher" to="/about-us" class="fade-in" style="--index: 1"
                    >About Us</router-link
                >
                <router-link @click="hideBurgher" to="/airlines" class="fade-in" style="--index: 2"
                    >Airlines</router-link
                >
                <router-link @click="hideBurgher" to="/business-class-flights" class="fade-in" style="--index: 3"
                    >Business Class Flights</router-link
                >
                <a href="https://blog.buybusinessclass.com/" class="fade-in" style="--index: 4">Blog</a>

                <!--        <router-link @click="hideBurgher" to="/blog">Blog</router-link>-->
                <router-link
                    @click="hideBurgher"
                    :is="$store.state.region.regionsIsLoaded ? 'router-link' : 'span'"
                    :to="`/best-deals/${$store.state.region.regions.regions[0]?.name?.toLowerCase() ?? 'unset'}/${
                        $store.state.region.regions.regions[0]?.id ?? 0
                    }`"
                    class="fade-in"
                    style="--index: 3"
                >
                    Best Deals
                </router-link>
                <router-link @click="hideBurgher" to="/reviews" class="fade-in" style="--index: 4">Reviews</router-link>
            </div>
            <div class="footer fade-in" style="--index: 5">
                <p>24/7 SERVICE</p>
                <a class="tel" :href="`tel:${$store.state.app.settings?.number}`">
                    {{ $store.state.app.settings?.number }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
// Vuex
import { mapState } from 'vuex'

export default {
    data() {
        return {
            setTransition: false,
        }
    },
    methods: {
        hideBurgher() {
            this.$store.commit('displayBurgherMenu', false)
        },
        goToAboutUs() {
            this.hideBurgher()

            setTimeout(() => {
                if (window.location.pathname === '/' || window.location.pathname === '/flight') {
                    window.scrollTo({
                        top: document.querySelector('.about-container').offsetTop,
                        behavior: 'smooth',
                    })
                    return
                }

                this.$store.commit('setAboutUs', true)
                this.$router.push('/')
            }, 400)
        },
    },
    computed: {
        ...mapState({
            showBurgher: (state) => state.app.burgherMenu,
        }),
    },
    watch: {
        showBurgher(value) {
            this.setTransition = true

            setTimeout(() => {
                this.setTransition = false
            }, +process.env.VUE_APP_TRANSITION)

            if (value) {
                document.body.style.overflow = 'hidden'
                return
            }

            document.body.style.overflow = 'unset'
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.fade-in {
    --index: 0;
    transition-property: opacity;

    .show & {
        opacity: 1;
        transition-duration: 300ms;
        transition-timing-function: linear;
        transition-delay: calc(75ms * var(--index) + 350ms);
    }

    .hide & {
        opacity: 0;
        transition-duration: 150ms;
        transition-timing-function: linear;
    }
}

.burgher-menu {
    background: #1a1d1f;
    height: 100vh;
    height: 100dvh;
    width: 100vw;
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: 1000;
    &.transition {
        transition: 0.4s ease-in-out;
    }
    &.hide {
        height: 0px;
    }
    &.show {
        // transform: translateY(0%);
        height: 100vh;
        height: 100dvh;
    }
    > .burgher-header {
        display: flex;
        padding: 16px 32px;
        border-bottom: 1px solid #000;
        justify-content: space-between;
        > button {
            background: none;
        }
    }
    > .content {
        padding: 24px 16px 48px 16px;
        position: relative;
        display: flex;
        flex-direction: column;
        height: calc(100% - 72px);
        > .links {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            flex-grow: 1;
            > a {
                position: relative;
                text-decoration: none;
                text-align: center;
                padding: 12px;
                color: #6f767e;
                display: block;
                background: #272b30;
                margin-inline: -16px;
                font: {
                    family: 'Inter', sans-serif;
                    weight: 600;
                    size: 24px;
                }

                @include after-active;
                &::after {
                    bottom: -2px;
                    height: 1px;
                    width: calc(100% + 4px);
                    left: 50%;
                    transform: translateX(-50%);
                }

                &.router-link-exact-active {
                    color: #fcfcfc;
                }
            }
        }
        > .footer {
            text-align: center;
            > p {
                color: #fff;
                margin-bottom: 10px;
                font: {
                    family: 'Inter', sans-serif;
                    weight: 600;
                    size: 13px;
                }
            }
            > .tel {
                display: block;
                width: 100%;
                padding: 16px 0;
                background: #f4f4f4;
                color: #111315;
                border-radius: 48px;
                font: {
                    family: 'Inter', sans-serif;
                    weight: 600;
                    size: 12px;
                }
            }
        }
    }
}
</style>
