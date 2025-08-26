// @ts-check
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  { 
    rules: {
        "no-self-compare": "error",
        "no-useless-assignment": "error",
        "dot-notation": "error",
        "max-classes-per-file": ["error", 1],
        "no-empty-function": "error",
        "no-eq-null": "error",
        "no-lonely-if": "error",
        "no-magic-numbers": ["error", { "ignoreArrayIndexes": true, "ignore": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }],
        "no-multi-assign": "error",
        "no-negated-condition": "error",
        "no-nested-ternary": "error",
        "no-sequences": "error",
        "no-undefined": "error",
        "no-unneeded-ternary": "error",
        "no-useless-return": "error",
        "no-useless-constructor": "error",
        "no-var": "error",
        "prefer-const": "error",
        "require-await": "error",
        "yoda": "error",
        "@typescript-eslint/consistent-type-imports": "error"
    }
  },
  eslintPluginPrettierRecommended
)