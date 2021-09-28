export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    title: 'Alanica',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  server:{
    port: 3001
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/index.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/modules.js',
    '@/plugins/ws.js',
    '@/plugins/glob.js',
    '@/plugins/directives.js',
    '@/plugins/api.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-svg-loader',
    [
      'nuxt-i18n',
      { /* module options */ }
    ],

  ],
  i18n: {
    locales: [
      { name: 'Rus', code: 'ru', iso: 'ru-RU', file: 'ru.js' },
      { name: 'English', code: 'en', iso: 'en-US', file: 'en.js' }
    ],
    defaultLocale: 'ru',
    fallbackLocale: 'ru',
    lazy: true,
    langDir: 'lang',
    detectBrowserLanguage: false
  },
  googleAnalytics: {
    id: 'UA-XXX-X'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      file: { esModule: false }
    }
  },
  env: {
    NODE_ENV: process.env.API_HOST
  },
}
