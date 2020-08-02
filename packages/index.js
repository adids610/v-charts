import VEcharts from "./echarts.vue";

VEcharts.install = function (Vue) {
    Vue.component(VEcharts.name, VEcharts);
};

export default VEcharts;