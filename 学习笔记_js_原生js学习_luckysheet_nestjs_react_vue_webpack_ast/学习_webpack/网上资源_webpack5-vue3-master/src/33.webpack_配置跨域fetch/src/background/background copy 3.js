
let 状态 = false
let window = {}
console.log('111>window:', window)
function 建立链接() {
    //  博客  https://www.cnblogs.com/sener/p/14001382.html  1112222224224
    var ws = new WebSocket("ws://localhost:9999");

    ws.onopen = (e) => {
        console.log('111>开启链接:')
        console.log('ws状态>999:', ws)
        window.状态 = true
        // ws.send("我刚开始")
    }

    ws.onclose = (e) => {
        console.log('222>关闭链接:')
        console.log('ws状态>999:', ws)
        window.状态 = false
    }

    ws.onmessage = (e) => {
        console.error('333333333>我收到消息了:', e)
        console.log('ws状态>999:', ws)
        window.状态 = true
        chrome.runtime.reload()
        chrome.tabs.query({ active: true }, ([tab]) => {
            chrome.tabs.reload()
            console.log('我刷新了>222:', [tab])
        })



    }

    // setInterval( ()=> {
    //     ws.send("插件插件send message...");
    // }, 3000);
}




setInterval(() => {

    if (window.状态) {
        console.log('111>222:', window.状态)
    } else {
        console.log('222>222:', window.状态)
        console.error('不断重新链接>222:11',)
        建立链接()

    }
}, 1000);




