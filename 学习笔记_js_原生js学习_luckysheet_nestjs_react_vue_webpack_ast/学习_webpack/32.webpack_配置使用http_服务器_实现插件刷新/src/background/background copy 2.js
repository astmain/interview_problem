
let 状态 = false
console.log('111>window:', window)
function 建立链接() {
    //  博客  https://www.cnblogs.com/sener/p/14001382.html  1122222122444222233223322221111111111111111111111111
    var ws = new WebSocket("ws://localhost:9999");
    ws.onopen = (e) => {
        console.log('111>开启链接:')
        console.log('ws状态>999:', ws)
        状态 = true
    }

    ws.onclose = (e) => {
        console.log('222>关闭链接:')
        console.log('ws状态>999:', ws)
        状态 = false
    }

    ws.onmessage = (e) => {
        console.log('333>我收到消息了:', e)
        console.log('ws状态>999:', ws)
        状态 = true
    }

    // setInterval( ()=> {
    //     ws.send("插件插件send message...");
    // }, 3000);
}




setInterval(() => {

    if (状态) {

    } else {
        console.error('不断重新链接>222:11',)
        建立链接()
     
    }
}, 3000);




