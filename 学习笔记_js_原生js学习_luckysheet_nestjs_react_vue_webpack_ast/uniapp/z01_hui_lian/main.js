import Vue from 'vue'
import App from './App'
import store from './store'
import http from './common/http'
import event from './common/event-bus'
// import TIM from 'tim-wx-sdk'
// import tim from './common/tim/tim.js'
// import commen from './common/tim/commen.js'

Vue.config.productionTip = false

Vue.prototype.$store = store;
Vue.prototype.$http = http;
Vue.prototype.EventBus = new event.EventBus();

// Vue.prototype.$commen = commen;//表情包
// Vue.prototype.tim = tim.tim;  			//tim sdk 引入后生成的tim服务
// Vue.prototype.$TIM = TIM;
//Vue.prototype.genTestUserSig = tim.genTestUserSig;

App.mpType = 'app' 


import uView from 'uview-ui'
Vue.use(uView);

// #ifdef APP-PLUS
let platform = uni.getSystemInfoSync().platform || "";
if('android' === platform.toLocaleLowerCase()) {
	let main = plus.android.runtimeMainActivity();  
	//为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
	plus.runtime.quit = function(){  
		main.moveTaskToBack(false);  
	};  
	plus.nativeUI.toast = function(str){
		if(str == '再按一次退出应用') {  
			main.moveTaskToBack(false);  
			return false;  
		}
		else{    
			uni.showToast({  
				title:str,  
				icon:'none',  
			});
		}  
	};  
}
// #endif

const app = new Vue({
	store,
    ...App
});

app.$mount()
