import App from './App'
import store_pinia from './store_pinia'
import Vue from 'vue'


// api_web-------------------------------------------------------
Vue.prototype.api = {
	db_server_baidu: "http://127.0.0.1:9001/" + "db_server_baidu?" //开发环境
}



//引入css------------------------------------------------------------
require('./static/css/index')

// 全局组件-------------------------------------------------------
import com_header_log from './pages/components/com_header_log'
Vue.component("com_header_log", com_header_log)




// -----------------------------------------
// #ifndef VUE3
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
})
Vue.use(store_pinia)
app.$mount()



// debugger
// #endif








// -----------------------------------------
// #ifdef VUE3
import {createSSRApp} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store_pinia)
	return {
		app
	}
}
// debugger
// #endif


// store_pinia  BUS-------------------------------------------------------
// window.BUS = (require('./store_pinia/store.js').default)()
Vue.prototype.BUS = (require('./store_pinia/BUS.js').default)()