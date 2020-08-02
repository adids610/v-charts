<template>
    <div class="v-echarts"></div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import {addResizeListener, removeResizeListener} from "../src/utils/resize-event";

    const METHODS = {};

    [
        "setOption", "getWidth", "getHeight", "getOption", "dispatchAction", "convertToPixel", "convertFromPixel",
        "containPixel", "showLoading", "hideLoading", "getDataURL", "getConnectedDataURL", "appendData", "clear",
        "isDisposed"
    ].forEach((m) => {
        METHODS[m] = function (...args) {
            if (this.chart) {
                return this.chart[m](...args);
            } else {
                throw new Error("缺少图表实例");
            }
        };
    });

    const EVENTS = [
        "legendselectchanged", "legendselected", "legendunselected", "datazoom", "datarangeselected", "timelinechanged",
        "timelineplaychanged", "restore", "dataviewchanged", "magictypechanged", "geoselectchanged", "geoselected",
        "geounselected", "pieselectchanged", "pieselected", "pieunselected", "mapselectchanged", "mapselected",
        "mapunselected", "axisareaselected", "focusnodeadjacency", "unfocusnodeadjacency", "brush", "brushselected",

        "click", "dblclick", "mouseover", "mouseout", "mousedown", "mouseup", "globalout"
    ];

    export default {
        name: "v-echarts",
        props: {
            theme: {type: [String, Object]},
            init: {type: Object, default: null},
            group: {type: String, default: null},
            resizeable: {type: Boolean, default: true},
            options: {type: Object, default: null},
        },
        data() {
            return {
                chart: null, binds: []
            };
        },
        watch: {
            group(group) {
                if (this.chart) {
                    this.chart.group = group
                }
            },
            resizeable: {
                immediate: true, handler(v) {
                    this.$nextTick(() => {
                        v ? addResizeListener(this.$el, this.resize) : removeResizeListener(this.$el, this.resize);
                    });
                }
            },
            theme() {
                this.dispose();
                this.renderChart();
            },
            init() {
                this.dispose();
                this.renderChart();
            },
            options: {
                deep: true, handler(v) {
                    if (!this.chart) {
                        this.renderChart();
                        return;
                    }
                    if (Object.keys(v).length > 0) {
                        this.setOption(v, true);
                    } else {
                        this.clear();
                    }
                }
            },
            $listeners() {
                this.bindEvent();
            }
        },
        mounted() {
            this.renderChart();
        },
        beforeDestroy() {
            if (this.resizeable) {
                removeResizeListener(this.$el, this.resize);
            }
            if (this.chart) {
                this.dispose();
            }
        },
        methods: {
            ...METHODS,
            dispose() {
                if (this.chart) {
                    this.chart.dispose();
                    this.chart = null;
                    this.binds = [];
                }
            },
            resize() {
                if (this.chart) {
                    this.chart.resize()
                }
            },

            renderChart() {
                if (this.chart) {
                    return
                }
                this.chart = echarts.init(this.$el, this.theme, this.init)
                if (this.group) {
                    this.chart.group = this.group
                }
                this.setOption(this.options || {}, true);
                this.bindEvent();
            },

            bindEvent() {
                if (!this.chart) {
                    return
                }
                this.binds.forEach((en) => {
                    this.chart.off(en);
                });

                this.binds = [];

                Object.keys(this.$listeners).forEach((en) => {
                    if (EVENTS.indexOf(en) === -1) {
                        return;
                    }
                    this.chart.on(en, (params) => {
                        this.$emit(en, params);
                    });
                    this.binds.push(en);
                });
            }
        }
    }
</script>