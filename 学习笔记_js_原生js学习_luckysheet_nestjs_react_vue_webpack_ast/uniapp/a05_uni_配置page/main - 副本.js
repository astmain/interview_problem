
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'


// api_web-------------------------------------------------------
Vue.prototype.api = {
	db_server_baidu: "http://127.0.0.1:9001/" + "db_server_baidu?" //开发环境
}

//引入css------------------------------------------------------------
require('./static/css/index')



// 全局组件-------------------------------------------------------
import com_header_log from './pages/components/com_header_log'
Vue.component("com_header_log", com_header_log)

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
//引入pinia
import pinia_store from './pinia_store'



import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
	app.use(pinia_store)
  return {
    app
  }
}
// #endif