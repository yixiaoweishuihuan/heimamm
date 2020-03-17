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

//创建一个vue实例
new Vue({
  router,
  render: h => h(App), //将App组件渲染到vue实例中
}).$mount('#app')