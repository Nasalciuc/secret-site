<template>
    <div class="about-container">
        <div class="title">
            <!--<from-editor-to-text
        :title="true"
        :blocks="aboutUs.title"
        :id="'about-us-title'"
      />-->
            <h3 class="main-title">About<span class="accent"> BuyBusinessClass</span></h3>
        </div>
        <div class="content">
            <img
                v-if="aboutUsIsLoaded"
                :src="aboutUs.image ?? require('@/assets/images/static/about-image.webp')"
                alt="About BuyBusinessClass"
                loading="lazy"
                decoding="async"
            />
            <xyz-transition :appear-visible="true" xyz="fade down duration-10">
                <div class="about-text">
                    <from-editor-to-text :blocks="aboutUs.body" :id="'about-us-body'" />
                </div>
            </xyz-transition>
            <xyz-transition :appear-visible="true" xyz="fade down duration-10">
                <black-with-orange-text-button
                    :buttonText="`Book your Flight Now`"
                    :link="$route.fullPath === '/' ? '' : '/'"
                    :click="scrollToTop"
                />
            </xyz-transition>
        </div>
    </div>
</template>

<script>
// Components
import BlackWithOrangeTextButton from '@/common/UI/Buttons/BlackWithOrangeTextButton.vue'
import FromEditorToText from '@/common/Forms/FromEditorToText.vue'

// Vuex
import { mapState } from 'vuex'

export default {
    components: {
        BlackWithOrangeTextButton,
        FromEditorToText,
    },
    computed: {
        ...mapState({
            aboutUs: (state) => state.app.aboutUs,
            aboutUsIsLoaded: (state) => state.app.aboutUsIsLoaded,
        }),
    },
    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        },
    },
    mounted() {
        if (!this.$store.state.app.aboutUsIsLoaded) {
            this.$store.dispatch('getAboutUs')
        }
    },
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.about-container {
    margin-bottom: 80px;
    position: relative;
    > .title {
        @include block-title;
        margin-bottom: 32px;
    }
    > .content {
        display: flex;
        margin: 0 auto;
        width: fit-content;
        position: relative;
        border-radius: 16px;
        gap: 32px;
        > .about-text {
            background: #1a1d1f;
            border-radius: 16px;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 584px;
            padding: 48px;
            color: #efefef;
            line-height: 24px;
            font: {
                family: 'Inter', sans-serif;
                weight: 400;
                size: 15px;
            }

            p {
                margin-bottom: 16px;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
        > img {
            max-width: 408px;
        }
        > .black-orange-button {
            width: 408px;
            margin-top: auto;
        }
    }

    @media screen and (max-width: 1000px) {
        > .content {
            position: relative;
            padding: 0 16px 16px 16px;
            margin-bottom: -208px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            width: 100%;
            > img {
                max-width: unset;
                width: 100%;
            }
            > .about-text,
            > .black-orange-button {
                transform: translateY(-208px);
            }
            > .about-text {
                position: unset;
                width: unset;
                font-size: 15px;
            }
            > .black-orange-button {
                width: 100%;
                > button {
                    font-size: 15px;
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        > .content > .about-text {
            padding: 16px 24px;
        }
    }
}
</style>
