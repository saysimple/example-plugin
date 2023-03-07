import replace from "rollup-plugin-replace";
import vue from "rollup-plugin-vue";
import pkg from "./package.json";
import css from "rollup-plugin-css-only";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import url from "@rollup/plugin-url";

const buildFormats = [
    {
        input: "src/index.js",
        output: {
            file: pkg.module,
            format: "esm",
            exports: "named",
            sourcemap: true,
        },
        plugins: [
            replace({
                "process.env.NODE_ENV": JSON.stringify("production"),
            }),
            css({
                output: pkg.style,
            }),
            url({
                include: "assets/**/*",
                limit: Infinity,
                publicPath: `plugins/${pkg.name.replace(
                    "@saysimple-plugins/",
                    ""
                )}`,
                fileName: "[name][hash][extname]",
            }),
            vue({
                needMap: false,
                template: {
                    isProduction: true,
                },
                config: {
                    async: true,
                },
            }),
            commonjs(),
            // buble({
            //     transforms: { asyncAwait: false }
            // }),
            // terser({
            //     output: {
            //         ecma: 2020
            //     },
            //     sourcemap: true,
            //     compress: false,
            // }),
            resolve(),
        ],

        external: [
            // Externalize so that the output code is readable.
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/pro-duotone-svg-icons",
            "@fortawesome/pro-light-svg-icons",
            "@fortawesome/pro-regular-svg-icons",
            "@fortawesome/pro-solid-svg-icons",
            "@fortawesome/pro-thin-svg-icons",
            "@fortawesome/sharp-solid-svg-icons",
            "vue",
            "vue-runtime-helpers",
            "vue-i18n",
            "@vue/composition-api",
            "bootstrap-vue",
        ],
    },
];

// Export config
export default buildFormats;
