import Vue from 'vue'
import App from './App.vue'


// https://blog.csdn.net/Lyy1991Wdl/article/details/124175868

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
