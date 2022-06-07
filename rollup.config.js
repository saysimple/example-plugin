import replace from "rollup-plugin-replace";
import vue from "rollup-plugin-vue";
import pkg from "./package.json";
import css from "rollup-plugin-css-only";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";


const buildFormats = [{
    input: "src/index.js",
    output: {
        file: pkg.module,
        format: "esm",
        exports: "named",
        sourcemap: true
    },
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        css({
            output: pkg.style
        }),
        vue({
            template: {
                isProduction: true
            },
            config: {
                async: true,
            }
        }),
        terser({
            output: {
                ecma: 2020
            }
        }),
        resolve(),
    ],

    external: [
        // Externalize so that the output code is readable.
        "vue",
        "vue-runtime-helpers",
        "vue-i18n"
    ]
}];

// Export config
export default buildFormats;