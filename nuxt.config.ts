// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3001, // change to 4000 if NestJS is already using 3000
  },
  serverDir: "app/server",
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      baseUrl: process.env.BASE_URL,
      appUrl: process.env.APP_URL,
      googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
      tokenKey: process.env.COOKIE_KEY,
      tokenUserIdKey: process.env.COOKIE_USERID_KEY,
      baseUrlTwo: process.env.BASE_URL_TWO,
      },
  },
  routeRules: {
    "/**": { ssr: true },
  },

  modules: [
    // "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/hints",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@maz-ui/nuxt",
    "nuxt-anchorscroll",
  ],
  i18n: {
    // defaultLocale: "km",
    locales: [
      { code: "EN", name: "English", file: "en.json" },
      { code: "KH", name: "Khmer", file: "km.json" },
      { code: "CH", name: "Chinese", file: "zh.json" },
    ],
    langDir: "locales/",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: false,
      fallbackLocale: "KH",
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["import", "global-builtin", "color-functions"],
        },
      },
    },
  },

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],
  // colorMode: {
  //   preference: "light",
  //   fallback: "light",
  //   classSuffix: "",
  // },
  compatibilityDate: "2025-01-15",

  // eslint: {
  //   config: {
  //     stylistic: {
  //       commaDangle: "never",
  //       braceStyle: "1tbs",
  //     },
  //   },
  // },
  app: {
    head: {
      script: [
        {
          src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCRyfyQU1EI7IA_faYYh6cLucxivxr6vQc&libraries=places",
          async: true,
          defer: true
        }
      ],
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-96x96.png",
          sizes: "96x96",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      htmlAttrs: {
        class: "light", // force light class at render
      },
    },
  },
});
