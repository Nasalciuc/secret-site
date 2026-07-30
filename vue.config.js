const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    // Skip babel-transpiling node_modules. Modern packages ship browser-ready
    // ESM; transpiling them with babel breaks private class fields/methods
    // (e.g. intl-tel-input → "attempted to get private field on non-instance").
    transpileDependencies: false,

    // Drop runtime-only Vue feature flags we don't use to shrink bundle.
    chainWebpack: (config) => {
        config.plugin('define').tap((args) => {
            args[0] = args[0] || {}
            args[0].__VUE_OPTIONS_API__ = JSON.stringify(true)
            args[0].__VUE_PROD_DEVTOOLS__ = JSON.stringify(false)
            args[0].__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = JSON.stringify(false)
            return args
        })

        // Vue CLI's default preload plugin preloads every async chunk, which
        // hurts LCP on slow networks. Keep prefetch removed; preload only the
        // initial chunks (Vue CLI default already preloads initial only).
        config.plugins.delete('prefetch')
    },

    configureWebpack: (config) => {
        if (process.env.NODE_ENV !== 'production') return

        config.optimization = config.optimization || {}
        config.optimization.splitChunks = {
            chunks: 'all',
            maxInitialRequests: 25,
            minSize: 20000,
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/](vue|vue-router|vuex|vue-meta)[\\/]/,
                    name: 'vendor-vue',
                    priority: 40,
                },
                calendar: {
                    test: /[\\/]node_modules[\\/]v-calendar[\\/]/,
                    name: 'vendor-calendar',
                    priority: 30,
                },
                tel: {
                    test: /[\\/]node_modules[\\/](vue-tel-input|libphonenumber-js)[\\/]/,
                    name: 'vendor-tel',
                    priority: 30,
                },
                radix: {
                    test: /[\\/]node_modules[\\/](radix-vue|@floating-ui|@popperjs)[\\/]/,
                    name: 'vendor-radix',
                    priority: 30,
                },
                carousel: {
                    test: /[\\/]node_modules[\\/]vue3-carousel[\\/]/,
                    name: 'vendor-carousel',
                    priority: 30,
                },
                animxyz: {
                    test: /[\\/]node_modules[\\/]@animxyz[\\/]/,
                    name: 'vendor-animxyz',
                    priority: 30,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor-common',
                    priority: 10,
                    reuseExistingChunk: true,
                },
            },
        }
    },
})
