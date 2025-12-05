import { createApp } from 'vue'
// console.log('111>createApp:', createApp)
// import App from './app.vue'
// const app = createApp(App)
// app.mount('#app')


//^^popup页面--------------------------------
import popup from './popup/app.vue'
console.log('111>popup11:', popup)
createApp(popup).mount('#popup')






window.jq = require("jquery")
window.axios = require("axios")
window.dayjs = require("dayjs")
window._ = require('lodash')



import ali_inland from './views/ali_inland/app.vue'
import junchenlun from './views/junchenlun/app.vue'





function createEntry(views_app_vue, id) {
    const el = document.querySelector('body');
    if (el) {
        el.insertAdjacentHTML('afterend', `<div id="${id}"></div>`)
        createApp(views_app_vue).mount(`#${id}`)
        // createApp(myapp).use(pinia).use(VXETable).mount(`#${id}`)
    }
}



// let url = window.location.href
// url.indexOf('1688') > 1 ? createEntry(ali_inland, `app-ali_inland`) : false

// url.indexOf('junchenlun') > 1 ? createEntry(junchenlun, `app-junchenlun`) : false
















/*
视频
https://www.bilibili.com/video/BV1234y1D7Bv?

 webpack、webpack-cli、vue-loader、vue-template-compiler、sass-loader、sass、css-loader、style-loader、babel-loader、@babel/core、@babel/preset-env

npm i -d     webpack
npm i -d     webpack-cli
npm i -d     vue-loader


npm i -d     sass
npm i -d     sass-loader
npm i -d     css-loader
npm i -d     style-loader
npm i -d     @babel/preset-env



npm i -d  axios   webpack  webpack-cli  vue-loader  sass    sass-loader    css-loader   style-loader   @babel/preset-env
npm i -d  clean-webpack-plugin 
npm i -d  copy-webpack-plugin


^^饿了么      https://blog.csdn.net/LYXlyxll/article/details/126589211
npm install element-plus --save
npm install -D unplugin-vue-components
npm install -D unplugin-auto-import




npm i -d     mini-css-extract-plugin

*/