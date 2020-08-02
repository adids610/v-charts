import Vue from 'vue'
import App from './App.vue'
import "echarts";

import VEcharts from "../src/index";

Vue.use(VEcharts);


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
