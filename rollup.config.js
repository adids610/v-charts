import vue from "rollup-plugin-vue";
import buble from "@rollup/plugin-buble";
import {terser} from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import {getBabelOutputPlugin} from "@rollup/plugin-babel";

export default {
    input: "src/index.js",
    output: {
        file: "lib/v-echarts.js",
        name: "VEcharts",
        format: "umd",
        globals: {
            vue: "Vue",
            "echarts/lib/echarts": "echarts"
        }
    },
    external: [
        "vue",
        "echarts/lib/echarts"
    ],
    plugins: [
        getBabelOutputPlugin({presets:  [['@babel/env', { modules: 'umd' }]], allowAllFormats: true}),
        resolve(),
        commonjs(),
        vue({
            compileTemplate: true,
            css: true
        }),
        buble({include: ["/packages/"]}),
        terser({
            compress: {
                global_defs: {
                    __DEV__: process.env.NODE_ENV !== "production"
                }
            }
        })
    ]
}