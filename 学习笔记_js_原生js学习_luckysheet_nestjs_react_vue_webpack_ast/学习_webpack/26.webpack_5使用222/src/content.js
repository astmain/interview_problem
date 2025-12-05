import { createApp } from 'vue'




// //^^popup页面--------------------------------
import popup from './popup/app.vue'
console.log('111>popup:', popup)
createApp(popup).mount('#me_app')




//^^ inject----------------------------------
windjs文件注入("js/inject.js")
import "./inject.js"
function windjs文件注入(scriptFile) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.setAttribute("src", chrome.runtime.getURL(scriptFile));
    document.documentElement.appendChild(script); // run the script
}


// console.log('111>222:', chrome.runtime.getURL)
// debugger


//^^views 注入 vue实例-----------------------------
import ali_inland from './views/ali_inland/app.vue'
import baidu from './views/baidu/app.vue'


function createEntry(myapp, id) {
    const el = document.querySelector('body');
    if (el) {
        //  afterbegin 插入body内部最前面------afterend插入body外部后面
        el.insertAdjacentHTML('afterend', `<div id="${id}"></div>`)
        createApp(myapp).mount(`#${id}`)
        // createApp(myapp).use(pinia).use(VXETable).mount(`#${id}`)
    }
}


let url = window.location.href
url.indexOf('1688') > 1 ? createEntry(ali_inland, `app-ali_inland`) : false
url.indexOf('baidu') > 1 ? createEntry(baidu, `app-baidu`) : false








