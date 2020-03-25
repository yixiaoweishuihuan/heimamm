//导入 vue
import Vue from 'vue'
//导入 moment 组件
import moment from 'moment'
//创建一个全局过滤器
Vue.filter("myTime", function (value) {
    return moment(value).format("YYYY-MM-DD");
})