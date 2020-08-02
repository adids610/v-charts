let options = {
    pages: {
        index: {
            entry: "demo/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "v-echarts DEMO",
            chunks: ["chunk-vendors", "chunk-common", "index"]
        }
    }
};

module.exports = options;