
let 状态 = false
let window = {}
console.log('111>window:', window)
console.log('111>window:', 建立链接())
function 建立链接() {
    //  博客  https://www.cnblogs.com/sener/p/14001382.html  1112222224224122111
    var ws = new WebSocket("ws://localhost:9999");

    ws.onopen = (e) => {
        console.log('111>开启链接:')
        console.log('ws状态>999:', ws)
        window.状态 = true
    }

    ws.onclose = (e) => {
        console.log('222>关闭链接:')
        console.log('ws状态>999:', ws)
        window.状态 = false
    }

    ws.onmessage = (e) => {
        console.error('000>我收到消息了:', e)
        if (e.data == "刷新") {
            chrome.runtime.reload()
            console.log('111>我刷新了:',)
        } else {
            console.log('222>我没有刷新了:',)
        }

        //11111111111111
        // chrome.tabs.query({ active: true }, ([tab]) => {
        //     chrome.tabs.reload()
        //     console.log('我刷新了>222:', [tab])
        // })



    }

    // setInterval( ()=> {
    //     ws.send("插件插件send message...");
    // }, 3000);
}








