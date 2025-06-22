import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const backendHost = 'http://192.168.0.119:3100'

const proxyRoutes = [
  '/rails',
  '/blog',  
  '/events',
]

const proxy = proxyRoutes.reduce((acc, route) => {
  acc[route] = backendHost
  return acc
}, {})

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy
  }
})
