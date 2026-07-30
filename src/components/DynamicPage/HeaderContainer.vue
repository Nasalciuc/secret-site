<template>
    <div class="content main-page-header" id="order-fly">
        <div class="video-wrapper">
            <video loop muted defaultMuted playsinline autoplay preload="metadata" ref="video-background"></video>
        </div>
        <div class="blocks">
            <div class="first-block xyz-in" xyz="fade left-50% duration-15 delay-5">
                <p>{{ header }}</p>
            </div>
            <div class="second-block">
                <second-block />
            </div>
        </div>
    </div>
</template>

<script>
// Components
import SecondBlock from '../HeaderForm/FlightCard/SecondBlock.vue'
import { mapState } from 'vuex'

export default {
    components: {
        SecondBlock,
    },
    computed: {
        ...mapState({
            header: (state) => state.dynamic.mainTitle,
        }),
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
            if (window !== undefined) {
                let videoPoster = require('@/assets/video/background-mobile-poster.jpg')
                let videoSource = require('@/assets/video/background-mobile.mp4')

                // is desktop
                if (window.screen.width >= 768) {
                    videoPoster = require('@/assets/video/background-desktop-poster.jpg')
                    videoSource = require('@/assets/video/background-desktop.mp4')
                }

                if (!this.$refs['video-background'].poster.endsWith(videoPoster))
                    this.$refs['video-background'].poster = videoPoster

                if (!this.$refs['video-background'].src.endsWith(videoSource))
                    this.$refs['video-background'].src = videoSource
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
        padding: 208px 88px 108px 88px;
        > * {
            flex-grow: 1;
            width: 0;
        }
        > .first-block {
            color: #fff;
            font: {
                size: 3.7vw;
                weight: 300;
                family: 'SSP-regular', sans-serif;
            }
            > .without-br {
                display: none;
            }
        }
        > .second-block {
            background: #1a1d1f;
            border-radius: 16px;
        }
    }

    @media screen and (max-width: 1560px) {
        > .video-wrapper {
            > video {
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
            > .first-block {
                font-size: 40px;
                margin-bottom: 24px;
                > .without-br {
                    display: block;
                }
                > p:not(.without-br) {
                    display: none;
                }
            }
            > * {
                width: unset;
            }
        }
    }

    @media screen and (max-width: 768px) {
        > .video-wrapper {
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
