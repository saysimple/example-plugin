module.exports = {
    //parser: "vue-eslint-parser",
    /*plugins: [
        "eslint-plugin-vue",
    ],*/
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
        parser: "@typescript-eslint/parser",
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
        "vue/require-v-for-key": "warn",
        "vue/require-valid-default-prop": "warn",
        "@typescript-eslint/no-var-requires": "warn",
    },
};
