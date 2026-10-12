import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 8080,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/styles/mixins.scss";`,
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return undefined

                    const path = id.replace(/\\/g, '/')

                    if (path.includes('intl-tel-input')) return 'vendor-tel'
                    if (path.includes('react-day-picker') || path.includes('date-fns')) return 'vendor-calendar'
                    if (path.includes('embla-carousel')) return 'vendor-carousel'
                    if (path.includes('react-router') || path.includes('@remix-run')) return 'vendor-router'
                    if (path.includes('/axios/')) return 'vendor-http'
                    if (
                        path.includes('/react-dom/') ||
                        path.includes('/react/') ||
                        path.includes('/scheduler/') ||
                        path.includes('loose-envify') ||
                        path.includes('react-transition-group') ||
                        path.includes('/zustand/') ||
                        path.includes('use-sync-external-store')
                    ) {
                        return 'vendor-react'
                    }

                    return 'vendor'
                },
            },
        },
    },
})
