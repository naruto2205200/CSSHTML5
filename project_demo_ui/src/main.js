import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/myfont/css/all.min.css'
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = "http://localhost:8081"
// 请求添加token
// axios.interceptors.request.use(config=>{
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
// 把axios挂载到Vue请求原型上，这样每一个vue就可以使用 this.$http 发起请求了
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
