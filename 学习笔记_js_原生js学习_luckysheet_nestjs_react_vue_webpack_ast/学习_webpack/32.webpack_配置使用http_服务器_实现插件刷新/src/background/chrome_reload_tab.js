setInterval(() => {
    插件刷新()
}, 1000)


function 插件刷新() {
    fetch('http://127.0.0.1:8000/', {
        method: "GET",
    }).then((response) => {
        // console.log('1111>222:', response.text())
        // let aaa = response.text()
        // return aaa // res.text()是一个Promise对象
        return response.text() // res.text()是一个Promise对象
    }
    ).then((data) => {
        console.log('刷新插件>chrome_reload_tab:', data)
        if (data == "刷新") {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                tabs[0] ? chrome.tabs.reload(tabs[0].id) : "不处理"
                chrome.runtime.reload();      // 强制刷新页面
            }
            );
        }
    });
}
