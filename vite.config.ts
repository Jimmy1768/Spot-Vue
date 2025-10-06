import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const backendHost = 'http://192.168.0.119:3100'

const proxyRoutes = [
  '/api',
  '/rails',
]

const proxy = proxyRoutes.reduce((acc, route) => {
  // @ts-ignore: cleanUrls not in types but valid
  acc[route] = backendHost
  return acc
}, {})

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    base: isProd ? '/frontend/' : '/',

    build: {
      outDir: 'dist/frontend',
      emptyOutDir: true,
    },

    plugins: [
      vue(),
      vueDevTools(),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },

    server: {
      proxy
    }
  }
})
