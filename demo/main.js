import Vue from 'vue'
import App from './App.vue'
import VEcharts from "../src/index";
import "echarts";

Vue.use(VEcharts);
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
