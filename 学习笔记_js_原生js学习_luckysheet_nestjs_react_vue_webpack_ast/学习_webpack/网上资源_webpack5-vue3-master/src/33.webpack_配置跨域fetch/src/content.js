import { createApp } from 'vue'


//^^popup页面------------------------------------------------
document.querySelector('#popup') ? createApp(require("./popup/app.vue").default).mount('#popup') : "不处理"


//^^第三方 库引入---------------------------------------------
window.jq = require("jquery")
window.axios = require("axios")
window.dayjs = require("dayjs")
window._ = require('lodash')


//^^自定义 方法---------------------------------------------
require("./content/chrome_fetch_get")


// ^^ views注入网页
location.href.indexOf('junchenlun') > 1 ? createEntry(require("./views/junchenlun/app.vue").default, `app-junchenlun`) : false
function createEntry(views_file_app) {
    console.error('views注入网页>:', views_file_app.__file)
    const ele = document.querySelector('body');
    const id = views_file_app.__scopeId
    if (ele) {
        ele.insertAdjacentHTML('afterend', `<div id="${id}"></div>`)
        createApp(views_file_app).mount(`#${id}`)
        // createApp(myapp).use(pinia).use(VXETable).mount(`#${id}`)
    }
}

















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