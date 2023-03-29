module.exports = {
    parser: "vue-eslint-parser",
    plugins: ["eslint-plugin-vue"],
    extends: [
        //"eslint:recommended",
        //"plugin:vue/vue3-recommended",
        //"prettier",
        //"plugin:prettier/recommended",

        // COPIED FROM https://github.com/danielwaltz/vue-typescript-prettier/blob/vue-2/.eslintrc.js
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/recommended",
        "@vue/typescript",
        "@vue/prettier",
        "prettier",
    ],
    env: {
        es6: true,
        node: true,
        browser: true,
    },
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parserOptions: {
        parser: {
            js: "espree",
            ts: "@typescript-eslint/parser",
            "<template>": "espree",
        },
        //ecmaVersion: 2019,
        //ecmaVersion: 2020,
        //sourceType: "module",
        //allowImportExportEverywhere: true,
    },
    rules: {
        // https://eslint.org/docs/rules/strict
        strict: 1,
        // https://eslint.org/docs/rules/quotes
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true,
            },
        ],
        // https://eslint.org/docs/rules/indent
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: "first",
            },
        ],
        // https://eslint.org/docs/rules/object-curly-spacing
        "object-curly-spacing": ["error", "always"],
        // https://eslint.org/docs/rules/brace-style
        "brace-style": ["error", "1tbs"],
        // https://eslint.org/docs/rules/curly
        curly: ["error", "all"],
        semi: ["error", "always"],
        // VueJS specific rules: https://eslint.vuejs.org/rules/
        "vue/no-unused-vars": ["error"],

        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "vue/no-side-effects-in-computed-properties": "off",
        "no-undef": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "vue/no-unused-components": "off",
        "vue/require-v-for-key": "off",
        "@typescript-eslint/no-empty-function": "off",
        "no-async-promise-executor": "off",
        "vue/require-default-prop": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "no-unreachable": "off",
        "vue/no-parsing-error": "off",
        "no-useless-escape": "off",
        "vue/no-v-html": "off",
        "vue/valid-v-else": "off",
        "vue/require-prop-type-constructor": "off",
        "vue/no-template-shadow": "off",
        "vue/this-in-template": "off",
        "vue/require-prop-types": "off",
        "vue/require-component-is": "off",
        "no-unsafe-negation": "off",
        "no-prototype-builtins": "off",
        "no-empty": "off",
        "no-misleading-character-class": "off",
        "vue/valid-v-for": "off",
    },
};
