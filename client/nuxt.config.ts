export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/styles/global.css"],
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
  ],
  colorMode: {
    classSuffix: "",
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_PUBLIC_BASE_API_URL,
    },
  },
});
