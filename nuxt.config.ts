// https://nuxt.com/docs/api/configuration/nuxt-config
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/test-utils", "@pinia/nuxt"],
    typescript: {
        strict: true,
    },
    ssr: false,
    app: {
        baseURL: process.env.GITHUB_ACTIONS
            ? `/${process.env.GITHUB_REPOSITORY!.split("/")[1]}/`
            : "/",
    },
});
