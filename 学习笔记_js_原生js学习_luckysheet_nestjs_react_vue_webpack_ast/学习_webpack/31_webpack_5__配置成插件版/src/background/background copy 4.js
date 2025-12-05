

//^^--------------开发阶段---------编译后-------自动刷新       开发阶段---------------11--------221--231----111111111111---1----111
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.title == "app" && tab.status == "complete") {
        // if (tab.status == "complete") {
        console.log('111>tabId:', tabId)
        console.log('222>changeInfo:', changeInfo)
        console.log('333>tab:', JSON.stringify(tab))
        chrome.tabs.query({ active: true }, ([tab]) => {
            // console.log('222>tab:', tab)
            if (tab.title != "app" && tab.url != "chrome://newtab/") {
                // if (tab.url != "chrome://newtab/") {
                chrome.runtime.reload();

                debugger;
                console.log('666>2222:', tab);
                debugger;
                chrome.tabs.reload();
                debugger;

                console.log('111>appappappappappappappappa111ppap1122122222221pappapp22app:', )
            }
        })
    }
})
null