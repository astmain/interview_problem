import Vue from 'vue'
import App from './App.vue'


// https://blog.csdn.net/Lyy1991Wdl/article/details/124175868           讲解父子 绑定数据compents


// https://blog.csdn.net/weixin_41897680/article/details/123986004   讲解很好
// npm i -S exceljs file-saver luckyexcel
// npm i  file-saver
// npm i  exceljs

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
