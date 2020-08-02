// import echarts from "echarts/lib/echarts"
import VEcharts from "../packages/index";

// export const connect = (group) => {
//     if (typeof group !== 'string') {
//         group = group.map(chart => chart.chart)
//     }
//     echarts.connect(group)
// };
//
// export const disconnect = (group) => {
//     echarts.disConnect(group)
// }
// export const getMap = (mapName) => {
//     return echarts.getMap(mapName)
// }
// export const registerMap = (mapName, geoJSON, specialAreas) => {
//     echarts.registerMap(mapName, geoJSON, specialAreas)
// };
// export const registerTheme = (name, theme) => {
//     echarts.registerTheme(name, theme)
// }
//
// export const graphic = echarts.graphic;

export default {
    install(Vue) {
        Vue.use(VEcharts);
    }
}