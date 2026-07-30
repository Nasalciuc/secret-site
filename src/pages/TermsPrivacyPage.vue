<template>
    <div class="required-page">
        <div class="blocks">
            <div class="title">
                {{ $route.path === '/terms' ? 'Terms and Conditions' : 'Privacy Policy' }}
            </div>
            <div
                v-for="item in body"
                :key="item.id"
                :class="['block', { text: item.type === 'paragraph' }, { header: item.type === 'header' }]"
            >
                <component v-if="item.type === 'header'" :is="`h${item.data.level}`">
                    {{ item.data?.text }}
                </component>
                <p v-else v-html="item.data?.text" />
            </div>
        </div>
        <contact-vue />
    </div>
</template>

<script>
// Components
import ContactVue from '../components/ContactVue.vue'

// Controllers
import { getPrivacyTerms } from '@/controllers/appController.js'

export default {
    components: {
        ContactVue,
    },
    metaInfo() {
        return {
            title: this.$route.path === '/terms' ? 'Terms and Conditions' : 'Privacy Policy',
        }
    },
    data() {
        return {
            body: [],
        }
    },
    async beforeCreate() {
        const [result, error] = await getPrivacyTerms(this.$route.path === '/terms' ? 'terms' : 'privacy')

        if (error !== null) {
            this.$router.push('/')
        }

        this.body = JSON.parse(result?.body ?? '[]').blocks
    },
}
</script>

<style lang="scss">
.required-page {
    > .blocks {
        margin: 0 296px 80px 296px;
        padding: 40px 88px 80px 88px;
        border-radius: 16px;
        background: linear-gradient(135deg, #1a1d1f 0%, rgba(26, 29, 31, 0) 100%);
        > .title {
            font-family: 'SSF-Pro', sans-serif;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 48px;
            color: #8e969e;
        }
        > .block {
            margin-bottom: 24px;
            &.header {
                margin-top: 48px;
                color: #b4853b;
                font-family: 'SSF-Pro', sans-serif;
            }
            &.text {
                color: #c2c7cc;
                letter-spacing: -0.15px;
                font: {
                    size: 14px;
                    family: 'Inter', sans-serif;
                    weight: 300;
                }
                a {
                    text-decoration: underline;
                }
                b {
                    font-weight: 800;
                }
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    @media screen and (max-width: 1440px) {
        > .blocks {
            margin: 0 74px 80px 74px;
        }
    }

    @media screen and (max-width: 768px) {
        > .blocks {
            margin: 0 8px 80px 8px;
            padding: 40px 16px 80px 16px;
        }
    }
}
</style>
