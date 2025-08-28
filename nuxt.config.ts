// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/test-utils", "@pinia/nuxt"],
    typescript: {
        strict: true,
    },
    ssr: false,
});
