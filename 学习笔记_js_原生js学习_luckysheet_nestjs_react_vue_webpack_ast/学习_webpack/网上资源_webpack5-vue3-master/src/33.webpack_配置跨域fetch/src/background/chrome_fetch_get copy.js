
//博客 https://blog.csdn.net/NXY666/article/details/124492900
const http = {
    request: function (options) {
        // Post请求选项并入默认选项
        let requestOptions = { method: null, url: null, param: {}, data: {}, headers: {} };
        this.mergeOptions(requestOptions, options);

        // 格式化参数
        requestOptions.param = this.formatParams(requestOptions.param);
        let _url = requestOptions.url + (requestOptions.param ? ('?' + requestOptions.param) : '');

        let _data = requestOptions.data;
        // console.log('111>_data:', _data)
        if (typeof _data == "string") {
            requestOptions.headers["Content-type"] = "text/plain;charset=utf-8";
            _data = requestOptions.data;
        } else if (requestOptions.data instanceof FormData) {
            _data = requestOptions.data;
        } else if (typeof requestOptions.data == "object") {
            let formData = new FormData();
            if (Object.keys(requestOptions.data).some(key => {
                formData.append(key, requestOptions.data[key]);
                return requestOptions.data.hasOwnProperty(key) && requestOptions.data[key] instanceof File;
            })) {
                _data = formData;
            } else {
                requestOptions.headers["Content-type"] = "application/json;charset=utf-8";
                _data = JSON.stringify(requestOptions.data);
            }
        }

        // console.log('222>_data:', _data)

        // 监听状态
        let fetchOptions = {
            method: requestOptions.method, // *GET, POST, PUT, DELETE, etc.
            // mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'include', // include, *same-origin, omit
            headers: requestOptions.headers,
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer-when-downgrade' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        };
        if (requestOptions.method.toUpperCase() !== "GET" && requestOptions.method.toUpperCase() !== "HEAD") {
            fetchOptions.body = _data;
            // console.log('333>_data:', _data)
            debugger
        }
        function fetch_我的promise() {
            let my_ReadableStream = {}
            return new Promise((resolve, reject) => {
                fetch(_url, fetchOptions)
                    .then(res => {
                        // console.log('333>then.res:', res)
                        my_ReadableStream = res
                        return res.json()
                    })
                    .then(data => {
                        // console.log('444>then.data:', data)
                        let my_result = {}
                        my_result.data = data
                        my_result.bodyUsed = my_ReadableStream.bodyUsed
                        my_result.headers = my_ReadableStream.headers
                        my_result.ok = my_ReadableStream.ok
                        my_result.redirected = my_ReadableStream.redirected
                        my_result.status = my_ReadableStream.status
                        my_result.statusText = my_ReadableStream.statusText
                        my_result.type = my_ReadableStream.type
                        my_result.url = my_ReadableStream.url
                        // console.log('555>my_result:', my_result)
                        resolve(my_result)
                    })
            })
        }




        return fetch_我的promise()
    },

    get: function (options) {
        options.method = "GET";
        let res = this.request(options);
        return res
    },

    post: function (options) {
        options.method = "POST";
        return this.request(options);
    },

    formatParams: function (data) {
        const arr = [];
        for (let name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        return arr.join("&");
    },

    // 原则：如果有默认值，则使用默认值，否则使用传入的值。
    mergeOptions: function (targetOption, newOption) {
        if (!newOption) {
            return targetOption;
        }
        Object.keys(targetOption).forEach(function (key) {
            if (newOption[key] === undefined) {
                return;
            }
            targetOption[key] = newOption[key];
        });
        return targetOption;
    }
};





// async function chrome_fetch_get( ) {
//     var url = 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气';
//     var res = await http.get({ url: url, method: 'GET' });
//     // console.log('999>res:', res);
//     return res
// }

async function chrome_fetch_get(config) {
    // var url = 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气';
    var res = await http.get(config);
    // console.log('999>res:', res);
    return res
}

async function chrome_fetch_post() {
    var url = 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气';
    var res = await http.post({ url: url, method: 'POST' });
    // console.log('999>res:', res);
    return res
}

global.chrome_fetch_get = chrome_fetch_get
global.chrome_fetch_post = chrome_fetch_post







