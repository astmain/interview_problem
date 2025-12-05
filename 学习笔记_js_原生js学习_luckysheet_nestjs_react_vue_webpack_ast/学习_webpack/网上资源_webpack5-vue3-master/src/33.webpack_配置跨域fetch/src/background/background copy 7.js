
// const http = {
// 	request: function (options) {
// 		// Post请求选项并入默认选项
// 		let requestOptions = {
// 			method: null,
// 			url: null,
// 			param: {},
// 			data: {},
// 			headers: {}
// 		};
// 		this.mergeOptions(requestOptions, options);

// 		// 格式化参数
// 		requestOptions.param = this.formatParams(requestOptions.param);
// 		let _url = requestOptions.url + (requestOptions.param ? ('?' + requestOptions.param) : '');

// 		let _data = requestOptions.data;
// 		if (typeof _data == "string") {
// 			requestOptions.headers["Content-type"] = "text/plain;charset=utf-8";
// 			_data = requestOptions.data;
// 		} else if (requestOptions.data instanceof FormData) {
// 			_data = requestOptions.data;
// 		} else if (typeof requestOptions.data == "object") {
// 			let formData = new FormData();

// 			if (Object.keys(requestOptions.data).some(key => {
// 				formData.append(key, requestOptions.data[key]);
// 				return requestOptions.data.hasOwnProperty(key) && requestOptions.data[key] instanceof File;
// 			})) {
// 				_data = formData;
// 			} else {
// 				requestOptions.headers["Content-type"] = "application/json;charset=utf-8";
// 				_data = JSON.stringify(requestOptions.data);
// 			}
// 		}

// 		// 监听状态
// 		let fetchOptions = {
// 			method: requestOptions.method, // *GET, POST, PUT, DELETE, etc.
// 			// mode: 'no-cors', // no-cors, *cors, same-origin
// 			cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
// 			credentials: 'include', // include, *same-origin, omit
// 			headers: requestOptions.headers,
// 			redirect: 'follow', // manual, *follow, error
// 			referrerPolicy: 'no-referrer-when-downgrade' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// 		};
// 		if (requestOptions.method.toUpperCase() !== "GET" && requestOptions.method.toUpperCase() !== "HEAD") {
// 			fetchOptions.body = _data;
// 		}

// 		return fetch(_url, fetchOptions);
// 	},

// 	get: function (options) {
// 		options.method = "GET";
// 		return this.request(options);
// 	},

// 	post: function (options) {
// 		options.method = "POST";
// 		return this.request(options);
// 	},

// 	formatParams: function (data) {
// 		const arr = [];
// 		for (let name in data) {
// 			arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
// 		}
// 		return arr.join("&");
// 	},

// 	// 原则：如果有默认值，则使用默认值，否则使用传入的值。
// 	mergeOptions: function (targetOption, newOption) {
// 		if (!newOption) {
// 			return targetOption;
// 		}
// 		Object.keys(targetOption).forEach(function (key) {
// 			if (newOption[key] === undefined) {
// 				return;
// 			}
// 			targetOption[key] = newOption[key];
// 		});
// 		return targetOption;
// 	}
// };




// function packMsgRep(state, data, message) {
// 	return {
// 		state,
// 		uuid: message.uuid,
// 		data,
// 		timestamp: Date.now()
// 	};
// }

// async function parseHttpResponse(response) {
// 	if (response == null) {
// 		return {
// 			status: -2,
// 			statusText: null,
// 			body: null
// 		};
// 	} else if (response instanceof Error) {
// 		return {
// 			status: -1,
// 			statusText: `${response.name}: ${response.message}`,
// 			body: response.stack
// 		};
// 	} else {


// 		let aaaa = 1111
// 		let bbb = {
// 			status: response.status,
// 			statusText: response.statusText,
// 			body: await response.text()
// 		}


// 		debugger
// 		return {
// 			status: response.status,
// 			statusText: response.statusText,
// 			body: await response.text()
// 		};
// 	}
// }

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// 	new Promise(async (resolve, reject) => {
// 		if (typeof message != 'object' || !message.type) {
// 			console.error("消息格式不符合规范：", message);
// 			reject(`消息 ${JSON.stringify(message)} 格式不符合规范。`);
// 			return;
// 		}
// 		switch (message.type) {
// 			case 'FetchRequest': {
// 				http.request(message.data).then(response => {
// 					resolve(parseHttpResponse(response));
// 				}).catch(error => {
// 					reject(parseHttpResponse(error));
// 				});
// 				break;
// 			}
// 			case 'FetchGet': {
// 				http.get(message.data).then(response => {
// 					resolve(parseHttpResponse(response));
// 				}).catch(error => {
// 					reject(parseHttpResponse(error));
// 				});
// 				break;
// 			}
// 			case 'FetchPost': {
// 				http.post(message.data).then(response => {
// 					resolve(parseHttpResponse(response));
// 				}).catch(error => {
// 					reject(parseHttpResponse(error));
// 				});
// 				break;
// 			}
// 			default: {
// 				console.error("消息类型非法：", message);
// 				reject(`消息 ${message} 类型非法。`);
// 				break;
// 			}
// 		}
// 	}).then((response) => {
// 		sendResponse(packMsgRep(true, response, message));
// 		console.log(`消息 ${JSON.stringify(message)} 处理完成。`);
// 	}).catch(e => {
// 		sendResponse(packMsgRep(false, e, message));
// 		console.error(`消息 ${JSON.stringify(message)} 处理失败：`, e);
// 	});
// 	return true;
// });


require("./chrome_reload_tab")


// 第三方 库------------------------------------
global.jq = require("jquery")
global.axios = require("axios")
global.dayjs = require("dayjs")
global._ = require('lodash')
global.dayjs = require("dayjs")


// let fetchJSONP = require('fetch-jsonp');
// console.log('111>222:', fetchJSONP);
// fetchJSONP('http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气')
// 	.then((response) => response.json())
// 	.then((data) => {
// 		console.log(data);
// 	});

