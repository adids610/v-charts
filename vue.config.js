let options = {
    pages: process.env.NODE_ENV === "development" ? {
        index: {
            entry: "demo/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "v-echarts DEMO",
            chunks: ["chunk-vendors", "chunk-common", "index"]
        }
    } : undefined,
    productionSourceMap: false,
    configureWebpack: () => {
        return process.env.NODE_ENV === "development" ? {} : {
            externals: {
                "echarts/lib/echarts": "echarts/lib/echarts",
                "resize-observer-polyfill": "resize-observer-polyfill"
            }
        }
    }
};

module.exports = options;