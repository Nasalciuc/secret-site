<template>
    <div class="content main-page-header" id="order-fly">
        <div class="video-wrapper">
            <video
                loop
                muted
                defaultMuted
                playsinline
                autoplay
                preload="none"
                :poster="videoPoster"
                ref="video-background"
            ></video>
        </div>
        <div class="blocks">
            <div class="first-block xyz-in" xyz="fade left-50% duration-15 delay-5">
                <h1>
                    <span class="weight-700">Cheap Business Class</span> Airline Tickets <br />
                    & <span class="weight-700">Flight Deals</span> — Save up to 60%
                </h1>
            </div>
            <div class="second-block">
                <order-fly />
            </div>
        </div>
    </div>
</template>

<script>
// Components
import OrderFly from '../HeaderForm/OrderFly/OrderFly.vue'

export default {
    components: {
        OrderFly,
    },
    data() {
        // Default to mobile poster so the LCP image is present in the very first
        // render. The desktop swap happens after mount; the poster path is the
        // same hashed URL the browser would otherwise discover late.
        return {
            videoPoster: require('@/assets/video/background-mobile-poster.jpg'),
        }
    },
    mounted() {
        this.updateVideoBackgroundSource()

        if (window !== undefined) {
            window.addEventListener('resize', this.updateVideoBackgroundSource)
        }
    },
    beforeUnmount() {
        if (window !== undefined) {
            window.removeEventListener('resize', this.updateVideoBackgroundSource)
        }
    },
    methods: {
        updateVideoBackgroundSource() {
            if (typeof window === 'undefined') return

            const isDesktop = window.matchMedia('(min-width: 768px)').matches
            const poster = isDesktop
                ? require('@/assets/video/background-desktop-poster.jpg')
                : require('@/assets/video/background-mobile-poster.jpg')
            const source = isDesktop
                ? require('@/assets/video/background-desktop.mp4')
                : require('@/assets/video/background-mobile.mp4')

            const video = this.$refs['video-background']
            if (!video) return

            if (!video.poster.endsWith(poster)) {
                video.poster = poster
                this.videoPoster = poster
            }

            // Defer the actual video download until the page is idle so it
            // never blocks LCP. The poster carries the hero visual until then.
            const loadVideo = () => {
                if (!video.src.endsWith(source)) {
                    video.src = source
                    video.load()
                }
            }
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(loadVideo, { timeout: 3000 })
            } else {
                setTimeout(loadVideo, 1500)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
.content.main-page-header {
    @include header-block;
    border-radius: 16px;

    > .video-wrapper {
        background: #111315;
        position: absolute;
        overflow: hidden;
        border-radius: 16px;
        width: 100%;
        height: 100%;
        z-index: -1;

        > video {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            min-width: 100%;
            min-height: 100%;
            z-index: 1;
        }
    }
    > .blocks {
        padding: 160px 88px 120px 88px;
        flex-direction: column;
        > * {
            //flex-grow: 1;
            //width: 0;
        }
        > .first-block {
            //flex-grow: 1;
            width: 100%;
            color: #fff;

            &,
            h1,
            h2 {
                font: {
                    size: 3.7vw;
                    weight: 300;
                    family: 'SSP-regular', sans-serif;
                }
            }

            > .without-br {
                display: none;
            }
        }
        > .second-block {
            min-width: 600px;
            //background: #1a1d1f;
            border-radius: 16px;
        }
    }

    @media screen and (max-width: 1560px) {
        > .video-wrapper {
            > video,
            img {
                width: unset;
            }
        }
    }

    @media screen and (max-width: 1200px) {
        padding: 0;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        > .blocks {
            display: block;
            padding: 164px 8px 8px 8px;
            margin: 0 auto;
            position: relative;
            transform: unset;
            > * {
                width: unset;
            }
            > .first-block {
                margin-bottom: 24px;

                &,
                h1,
                h2 {
                    font-size: 40px;
                }

                > .without-br {
                    display: block;
                }
                > p:not(.without-br) {
                    display: none;
                }
            }
            .second-block {
                min-width: unset;
            }
        }
    }

    @media screen and (max-width: 768px) {
        > .video-wrapper {
            width: calc(100% + 16px);
            left: -8px;
            top: -8px;
            border-radius: 0;

            video {
                width: 100%;
            }

            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 100px;
                width: 100%;
                z-index: 2;
                background: rgb(0, 0, 0);
                background: linear-gradient(180deg, #111315 0%, rgba(0, 0, 0, 0) 60%);
            }

            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                height: 100px;
                width: 100%;
                z-index: 2;
                background: rgb(0, 0, 0);
                background: linear-gradient(0deg, #111315 0%, rgba(0, 0, 0, 0) 60%);
            }
        }

        > .blocks {
            padding: 152px 8px 8px 8px;
            > * {
                width: auto;
            }
            > .first-block {
                background: none;
                margin: 0 16px 24px 16px;
                padding: 0;
                > p:not(.without-br) {
                    display: block;
                    font-size: 32px;
                }
                > .without-br {
                    display: none;
                }
            }
            > .second-block {
                padding: 16px;
            }
        }
    }
}
</style>
