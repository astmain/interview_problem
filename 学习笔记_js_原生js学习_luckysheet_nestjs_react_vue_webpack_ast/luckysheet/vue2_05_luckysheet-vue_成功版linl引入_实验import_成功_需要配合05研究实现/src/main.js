import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

let jq = require('jquery')
// let $ = require('jquery')
function 函数_时间延迟(time) {
  let 时间;
  if (!time) {
    时间 = 1 * 1000;
  } else {
    时间 = time;

  };
  // console.log('111:---时间', 时间)
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove('111');
      // reslove("延迟秒");
    }, 时间);
  });
}

//npm install file-loader url-loader --save-dev
//    npm install url-loader  
// npm install file-loader


window.jq = require('jquery')
// await 函数_时间延迟(1000* 1 )
// import "../public/dist/plugins/css/pluginsCss.css"
// import "../public/dist/plugins/plugins.css"
// import "../public/dist/css/luckysheet.css"
// import "../public/dist/assets/iconfont/iconfont.css"

window. jQuery  = require('jquery')
window.$  = require('jquery') //    "jquery": "^2.2.4",
// require('jquery.mousewheel.min.js')
import "../public/dist/jquery.mousewheel.min.js"





import "../public/dist/plugins/js/plugin.js"
import "../public/dist/luckysheet.umd.js"




// console.log('111>222:', $.mousewheel)





// let sss= require("../public/dist/sss.js")

// console.log('111>222:', sss)
// // require("../public/dist/sss.js")
// // import "../public/dist/sss.js"
// (()=>{
//  let aaa=require("../public/dist/sss.js")
// })()



// <link rel='stylesheet' href='./dist/plugins/css/pluginsCss.css' />
// <link rel='stylesheet' href='./dist/plugins/plugins.css' />
// <link rel='stylesheet' href='./dist/css/luckysheet.css' />
// <link rel='stylesheet' href='./dist/assets/iconfont/iconfont.css' />
// <script src="./dist/plugins/js/plugin.js"></script>
// <script src="./dist/luckysheet.umd.js"></script> 






new Vue({
  render: h => h(App),
}).$mount('#app')
