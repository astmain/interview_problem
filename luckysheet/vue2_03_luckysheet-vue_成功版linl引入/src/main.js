import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

let jq = require('jquery')
// let $ = require('jquery')

window. jq = require('jquery')
// window.  $ = require('jquery')



new Vue({
  render: h => h(App),
}).$mount('#app')
