require("./chrome_reload_tab") //插件刷新
require("./chrome_require")   //第三方 库
require("./chrome_fetch_get")     //跨域 fetch get 请求







// chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
// 	if (request.run == "浏览器_操作切换page_url") {
// 		sendResponse("结果chrome_fetch_get")
// 	}
// })//

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	new Promise(async (resolve, reject) => {
		if (message.run = "chrome_fetch_get") {
			// var url = 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气';
			// let config = { url: url, method: 'GET' }
			let config = message.config
			chrome_fetch_get(config).then(res => {
				console.log('111>res:', res)
				sendResponse(res);
			})
		}





	})
	return true;
});




// async function name() {
// 	var url = 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气';
// 	var res = await http.get({ url: url, method: 'GET' });
// 	console.log('999>res:', res);
// }

// async function name() {
// 	var url = 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气';
// 	let config = { url: url, method: 'GET' }
// 	console.log('111>chrome_fetch:', await chrome_fetch_get(config))
// }


async function name() {
	var url = 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气';
	let config = { url: url, method: 'GET' }
	// console.log('111>chrome_fetch:', await chrome_fetch_get(config))
	chrome_fetch_get(config).then(res => {
		console.log('111>res:', res)
	})

}






name()







