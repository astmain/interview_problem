let baseUrl = "http://114.215.141.225:9036";	//通用版端口 
//let baseUrl = "http://localhost:10968";  
//let baseUrl = "http://192.168.0.110:10968";  

//正式地址，注意h5,小程序等要分开
//let baseUrl = "http://hloa.huiliantech.com:9036";  //H5,APP使用
//let baseUrl ="https://hloa.huiliantech.com:9037";//小程序使用

let imgUrl = "http://hloa.huiliantech.com:9036";  //单独启用一个链接展示图片，因为高版本的windows设置了ssl的图片，不能直接是使用https的url被访问到
let syscode = "9005";  
let weixinAppId = "wx7cf1b02474739aec";  //这里是要授权的公众号微信appid，不是小程序的appid!!!
let versionName="1.3.0";                 //提供给h5、小程序等展示版本号


module.exports = {
	versionName:versionName,
	weixinAppId:weixinAppId,
	syscode:syscode,
	baseUrl: baseUrl, 
	apiUrl: baseUrl + "/api",
	imgUrl: imgUrl,
	modifyAuthUrl:function(){
		this.baseUrl = baseUrl+'/'+getAuthorization();
		this.apiUrl = baseUrl+'/'+getAuthorization()+"/api";
	},
	doRequest: function(url, data, newOption) {
		var promise = new Promise((resolve, reject) => {
			//init 
			var that = this; 

			var option = { 
				method: 'POST' 
			};
 
			option = Object.assign(option, newOption);

			//网络请求
			uni.request({
				url: url,
				data: data,
				method: option.method,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				}, 
				success: (data) => {
					if (data.statusCode == 200) { 
						resolve(data.data);
					} else {
						reject(data);
					}
				},  
				fail: (data, code) => {
					console.log('fail:code is' + code + ",data:" + JSON.stringify(data));
					reject(data);
				}
			})
		});
		return promise;
	}
}

function getAuthorization(){
	try {
		const authorization = uni.getStorageSync('authorization');
		return authorization;
	} catch (e) {
		console.log('获取认证码失败');
	}
}
