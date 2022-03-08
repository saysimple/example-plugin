import minimist from "minimist";
import buble from "rollup-plugin-buble";
import commonjs from "rollup-plugin-commonjs";
import css from "rollup-plugin-css-only";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import vue from "rollup-plugin-vue";
import pkg from "./package.json";

const { default: i18n } = require('@intlify/rollup-plugin-vue-i18n');

const argv = minimist(process.argv.slice(2));

const baseConfig = {
    input: 'src/index.js',
    plugins: {
        preVue: [
            replace({
                        'process.env.NODE_ENV': JSON.stringify('production'),
                    }),
            commonjs(),
            i18n(),
        ],
        vue: {
            css: true,
            template: {
                isProduction: true,
            },
        },
        postVue: [
            buble({
                      transforms: {
                          dangerousForOf: true,
                      },
                  }),
        ],
    },

    external: [
        // Externalize so that the output code is readable.
        "vue",
        "vue-runtime-helpers",
        'vue-i18n',
    ],
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
    const esConfig = {
        ...baseConfig,
        output: {
            file: pkg.module,
            format: 'esm',
            exports: 'named',
            sourcemap: true,
        },
        plugins: [
            ...baseConfig.plugins.preVue,
            css({
                    output: pkg.style,
                }),
            vue({
                    ...baseConfig.plugins.vue,
                    css: false,
                }),
            ...baseConfig.plugins.postVue,
            terser({
                       output: {
                           ecma: 6,
                       },
                   }),
            resolve(),
        ],
    };
    buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
    const umdConfig = {
        ...baseConfig,
        output: {
            compact: true,
            file: pkg.main,
            format: 'cjs',
            name: `plugin-${pkg.saysimple.name}-settings`,
            exports: 'named',
            sourcemap: true,
            // extend: true,
        },
        plugins: [
            ...baseConfig.plugins.preVue,
            css({
                    output: pkg.style,
                }),
            vue({
                    ...baseConfig.plugins.vue,
                    template: {
                        ...baseConfig.plugins.vue.template,
                        optimizeSSR: true,
                    },
                    css: false,
                }),
            ...baseConfig.plugins.postVue,
            resolve(),
        ],
    };
    buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
    const unpkgConfig = {
        ...baseConfig,
        output: {
            compact: true,
            file: pkg.unpkg,
            format: 'iife',
            name: `plugin-${pkg.saysimple.name}-settings`,
            exports: 'named',
            sourcemap: true,
            extend: true,
        },
        plugins: [
            ...baseConfig.plugins.preVue,
            vue(baseConfig.plugins.vue),
            ...baseConfig.plugins.postVue,
            terser({
                       output: {
                           ecma: 5,
                       },
                   }),
            resolve(),
        ],
    };
    buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;