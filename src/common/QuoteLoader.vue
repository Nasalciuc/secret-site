<template>
    <div class="loader-quote" v-show="loading.loading">
        <div
            class="content"
            ref="quote-loader"
            :style="{
                transform: `scale(${scale})`,
            }"
        >
            <div class="from">
                {{ loading.from }}
            </div>
            <div class="globe">
                <div class="map" />
                <svg width="320" height="321" viewBox="0 0 320 321" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22.8398 171.717C28.2661 243.052 87.8669 299.245 160.592 299.245C206.898 299.245 247.884 276.463 272.951 241.497C247.662 273.777 208.32 294.521 164.134 294.521C93.0218 294.521 34.4585 240.793 26.8221 171.717H22.8398Z"
                        fill="url(#paint0_linear_938_21987)"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M26.8517 123.978C26.9476 124.199 26.9992 124.438 27.0077 124.679L27.5656 140.45C27.5896 141.128 27.955 141.747 28.5365 142.095L48.3213 153.948C48.9028 154.296 49.2682 154.916 49.2922 155.593L49.3459 157.108C49.3942 158.473 48.0912 159.483 46.7815 159.097L40.734 157.314C39.4651 156.94 38.2027 157.919 38.2495 159.241C38.2813 160.139 37.5368 160.933 36.64 160.964C35.7405 160.995 34.9441 160.251 34.9124 159.356L34.8296 157.017C34.7992 156.159 34.2247 155.416 33.4019 155.171L30.699 154.365C29.3881 153.975 28.0808 154.986 28.1292 156.353L28.5381 167.903C28.5584 168.476 28.824 169.013 29.2674 169.377L33.1187 172.541C33.4642 172.825 33.6712 173.243 33.687 173.69C33.7248 174.758 32.7013 175.547 31.6784 175.238L25.8434 173.474C25.424 173.348 24.9746 173.362 24.5643 173.516L18.9328 175.622C17.9312 175.996 16.857 175.279 16.8192 174.21C16.8033 173.761 16.9814 173.326 17.3083 173.017L20.9212 169.601C21.3387 169.206 21.5663 168.651 21.5459 168.077L21.1394 156.597C21.091 155.229 19.7136 154.313 18.4333 154.797L16.0464 155.7C15.2442 156.003 14.7247 156.784 14.755 157.641L14.8403 160.048C14.872 160.945 14.1275 161.739 13.2307 161.77C12.3312 161.801 11.5349 161.058 11.5032 160.162C11.4553 158.81 10.0943 157.904 8.82846 158.382L2.7965 160.658C1.51641 161.141 0.14019 160.225 0.0917749 158.857L0.038305 157.347C0.0144063 156.672 0.332745 156.031 0.884741 155.642L19.665 142.403C20.217 142.014 20.5354 141.373 20.5115 140.698L19.9529 124.922C19.9443 124.681 19.979 124.439 20.0591 124.211C21.0889 121.284 22.1698 119.801 23.3019 119.763C24.4341 119.724 25.6173 121.129 26.8517 123.978Z"
                        fill="#b4853b"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_938_21987"
                            x1="22.8398"
                            y1="171.717"
                            x2="22.8398"
                            y2="299.245"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stop-color="#b4853b" />
                            <stop offset="1" stop-color="#b4853b" stop-opacity="0.16" />
                        </linearGradient>
                    </defs>
                </svg>
                <div class="percent" :style="{ transform: `scale(${1 / scale + scale})` }">{{ percent }}%</div>
            </div>
            <div class="to">
                {{ loading.to }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Object,
            required: true,
        },
        appWidth: {
            type: Number,
            required: true,
        },
    },
    computed: {
        scale() {
            return this.appWidth / 1496
        },
    },
    data() {
        return {
            percent: 0,
        }
    },
    methods: {
        increasePercent() {
            if (!this.loading.loading) {
                this.percent = 0
                return
            }

            if (this.percent < 60) {
                this.percent += Math.round(Math.random() * 5)
                setTimeout(this.increasePercent, 75)
                return
            }

            if (this.percent > 89) {
                this.percent = 99
                return
            }

            this.percent += 10

            setTimeout(this.increasePercent, 1000)
        },
    },
    watch: {
        loading: {
            deep: true,
            handler(value) {
                if (value.loading) {
                    this.$refs['quote-loader'].animate(
                        [
                            {
                                transform: 'scale(0)',
                            },
                            {
                                transform: `scale(${this.scale})`,
                            },
                        ],
                        {
                            duration: 250,
                        },
                    )

                    this.increasePercent()
                    return
                }
            },
        },
    },
}
</script>

<style lang="scss">
.loader-quote {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    background: #111315;
    z-index: 100;
    > .content {
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        gap: 60px;
        > .globe {
            position: relative;
            min-width: 208px;
            height: 208px;
            border-radius: 50%;
            background: radial-gradient(43.41% 41.52% at 52.72% 44.98%, #545c68 0%, #33383f 100%);
            > .map {
                padding: 50%;
                background-image: url('@/assets/images/static/map.webp');
                background-position: left;
                border-radius: 50%;
                animation-name: rotate-globus;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
                animation-duration: 4s;
            }
            > svg {
                position: absolute;
                top: -28%;
                left: -28%;
                animation-name: rotate-airplane;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
                animation-duration: 4s;
            }
            > .percent {
                color: #6f767e;
                text-align: center;
                margin-top: 88px;
                font: {
                    family: 'Inter', sans-serif;
                    size: 10px;
                    weight: 700;
                }
            }
        }
        > .from,
        > .to {
            text-transform: uppercase;
            color: #1a1d1f;
            width: fit-content;
            flex-grow: 1;
            font: {
                family: 'Inter', sans-serif;
                weight: 900;
                size: 232px;
            }
            &.from {
                text-align: right;
                animation:
                    appear-text 0.25s linear,
                    transform-right 0.6s linear;
            }
            &.to {
                text-align: left;
                animation:
                    appear-text 0.25s linear,
                    transform-left 0.6s linear;
            }
        }
    }

    @keyframes rotate-globus {
        0% {
            background-position-x: 0%;
        }
        100% {
            background-position-x: 225%;
        }
    }

    @keyframes appear-text {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes transform-right {
        0% {
            transform: translateX(-50%);
        }
        100% {
            transform: translateX(0%);
        }
    }

    @keyframes transform-left {
        0% {
            transform: translateX(50%);
        }
        100% {
            transform: translateX(0%);
        }
    }

    @keyframes rotate-airplane {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
