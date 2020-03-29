//导入 vue
import Vue from 'vue'
//导入 app.vue组件
import App from './App.vue'
//导入全局css
import './style/index.css'

//导入 element-ui
import ElementUI from 'element-ui';
//导入 element-ui 的css
import 'element-ui/lib/theme-chalk/index.css';
//注册 element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

//导入 router
import router from './router/index'

// 导入 store
import store from './store/index'

//导入过滤器
import './filters/timeFilter.js'

//导入全局组件
import subject from './components/subjectSelect.vue'
import enterprise from './components/enterpriseSelect.vue'

//注册全局组件
Vue.component('subjectCom',subject);
Vue.component('enterpriseCom',enterprise);

//创建一个vue实例
new Vue({
  store,
  router,
  render: h => h(App), //将App组件渲染到vue实例中
}).$mount('#app')