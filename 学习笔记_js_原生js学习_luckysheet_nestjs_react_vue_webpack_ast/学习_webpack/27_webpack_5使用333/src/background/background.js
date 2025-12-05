console.log('111>getURL:', chrome.runtime.getURL("background.js"))

const copyToClipboard = (tab, text) => {
    function injectedFunction(text) {
        try {
            navigator.clipboard.writeText(text);
            console.log('successfully');
            window.open("https://www.baidu.com")

        } catch (e) {
            console.log('failed');
        }
    }


    // injectedFunction=injectedFunction+""  
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: injectedFunction,
        args: [text]
    });
};





const updateContextMenus = async () => {
    await chrome.contextMenus.removeAll();

    chrome.contextMenus.create({
        id: "context-copytab-title-url",
        title: "111",
        contexts: ["all"]
    });
    chrome.contextMenus.create({
        id: "context-copytab-title",
        title: "222",
        contexts: ["all"]
    });
    chrome.contextMenus.create({
        id: "context-copytab-url",
        title: "333",
        contexts: ["all"]
    });
};

chrome.runtime.onInstalled.addListener(updateContextMenus);
chrome.runtime.onStartup.addListener(updateContextMenus);
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case 'context-copytab-title-url':
            copyToClipboard(tab, tab.title + '\n' + tab.url);
            break;
        case 'context-copytab-title':
            copyToClipboard(tab, tab.title);
            break;
        case 'context-copytab-url':
            copyToClipboard(tab, tab.url);
            break;
    }
});



//^^--------------开发阶段---------编译后-------自动刷新       开发阶段------------------------------------
chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
         if(tab.title == "app_index" && tab.status == "complete") {
        // if (tab.status == "complete") {
            console.log('111>tabId:', tabId)
            console.log('222>changeInfo:', changeInfo)
            console.log('333>tab:',  JSON.stringify(tab)  )
            chrome.tabs.query({ active: true }, ([tab]) => {
                // console.log('222>tab:', tab)
                if(tab.title != "app_index" && tab.url != "chrome://newtab/"){
                // if (tab.url != "chrome://newtab/") {
                    chrome.runtime.reload()
                    chrome.tabs.reload()
                }
            })
        }
    })