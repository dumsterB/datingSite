export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    title: 'Alanica',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'mobile-web-app-capable', content: 'yes' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icons/icon.svg' }
    ],
    script : [
      { hid: 'analytics', src: `https://www.googletagmanager.com/gtag/js?id=G-DL55M9PQZG`, defer: true },
      { hid: 'analytics-script', innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-DL55M9PQZG');`, type: 'text/javascript' },
      { src: `https://www.googletagmanager.com/gtag/js?id=G-DFLMCL4GMC`, defer: true },
      { innerHTML: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-DFLMCL4GMC');`, type: 'text/javascript' },
      { innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NRV8D59');`, type: 'text/javascript' },
      { innerHTML: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NRV8D59" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`, type: 'text/javascript' },
    ],
    __dangerouslyDisableSanitizers: ['script']
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
    '@/plugins/fb-sdk.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
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
