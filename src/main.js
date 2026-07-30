import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directives from './helpers/directives'
import VueAnimXyz from '@animxyz/vue3'
import { createMetaManager, plugin as vueMetaPlugin } from 'vue-meta'

// Components
import VueSelect from 'vue-select'

// Styles
import 'vue-select/dist/vue-select.css'

// Animations
import '@animxyz/core'

VueSelect.props.components.default = () => ({
    OpenIndicator: {
        render: () => h('img', { src: require('./assets/images/static/chevron.webp') }),
    },
})

import Cookies from 'js-cookie'
import marketingSource from '@/helpers/marketing_source'
import helpersPlugin from '@/helpers/helpers'

router.beforeEach(async (to) => {
    marketingSource({
        query: to.query,
        $cookies: Cookies,
    })
})

const app = createApp(App)
    .use(router)
    .use(store)
    .use(vueMetaPlugin)
    .use(
        createMetaManager(false, {
            meta: { tag: 'meta', nameless: true },
        }),
    )
    .use(helpersPlugin, {
        $cookies: Cookies,
    })
    .use(VueAnimXyz)
    .component('v-select', VueSelect)

directives.forEach(({ name, methods }) => {
    app.directive(name, methods)
})

router.isReady().then(() => app.mount('#app'))
