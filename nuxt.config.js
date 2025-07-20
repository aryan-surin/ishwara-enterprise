// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    'aos/dist/aos.css'
  ],
  modules: [
    '@vueuse/motion/nuxt'
  ],
  plugins: [
    '~/plugins/aos.client.js',
    '~/plugins/gsap.client.js'
  ],
  nitro: {
    compatibilityDate: '2025-07-06'
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
