


async function chrome_fetch_get(config) {
    return new Promise((reslove, reject) => {
        chrome.runtime.sendMessage({ run: 'chrome_fetch_get', config: config }, function (response) {
            // console.log('111>chrome_fetch_get:', response);
            reslove(response);
        });
    })

};




window.chrome_fetch_get = chrome_fetch_get 