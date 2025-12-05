import Vue from 'vue'
import App from './App'


// import axios from './static/js/axios.js'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/'
// Vue.prototype.axios = axios


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
