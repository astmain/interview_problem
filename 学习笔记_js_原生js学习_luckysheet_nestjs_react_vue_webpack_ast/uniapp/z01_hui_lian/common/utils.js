//显示消息，并且进行回调函数
//import http from './http.js';
var http = require('./http.js');


/*设置数字角标*/
function setBadge(num) {
	//#ifdef APP-PLUS
	//if(num === 0) { num = -1; }
	try {
		plus.runtime.setBadgeNumber(num);
	} catch(e) {
		if(num < 0) {
			plus.runtime.setBadgeNumber(0);
		}
	}
	//#endif
}



/**
 * 获取字典，返回Promise
 */
function getCode(name) {
	return http.doRequest(http.apiUrl + '/System/GetCode', {
			data: name
		})
		.then((data) => { 
			if (data.Result) {
				return Promise.resolve(data.Data ? data.Data : []);
			} else {
				throw new Error(data.Msg);
			}
		})
		.catch((data) => {
			console.log('获取code时异常' + JSON.stringify(data));
			return Promise.resolve([]);
		});
}

/**
 * 获取车辆信息，返回Promise
 */
function getCarCode() {
	return http.doRequest(http.apiUrl + '/Car/GetAll', {
		})
		.then((data) => {
			if (data.Result) {
				return Promise.resolve(data.Data ? data.Data : []);
			} else {
				throw new Error(data.Msg);
			}
		})
		.catch((data) => {
			console.log('获取car code时异常' + JSON.stringify(data));
			return Promise.resolve([]);
		});
}

/**
 * 获取会议室，返回Promise
 */
function getMeetingCode() {
	return http.doRequest(http.apiUrl + '/Car/GetAll', {
		})
		.then((data) => {
			if (data.Result) {
				return Promise.resolve(data.Data ? data.Data : []);
			} else {
				throw new Error(data.Msg);
			}
		})
		.catch((data) => {
			console.log('获取car code时异常' + JSON.stringify(data));
			return Promise.resolve([]);
		});
}

/**
 * 获取会议室列表，返回Promise
 */
function getMeetingRoomCode() {
	return http.doRequest(http.apiUrl + '/Meeting/GetAllRoom', {
		})
		.then((data) => {
			if (data.Result) {
				return Promise.resolve(data.Data ? data.Data : []);
			} else {
				throw new Error(data.Msg);
			}
		})
		.catch((data) => {
			console.log('获取MeetingRoom code时异常' + JSON.stringify(data));
			return Promise.resolve([]);
		});
}

//显示消息
function showToastMsg(msg, fun) {
	uni.showToast({
		mask: true,
		title: msg,
		complete: () => {
			if (typeof(fun) == "function") {
				setTimeout(fun, 1500);
			}
		}
	})
}

//显示消息并返回上一个页面
function showToastBack(msg) {
	uni.showToast({
		mask: true,
		title: msg,
		complete: () => {
			setTimeout(() => {
				uni.navigateBack({
					delta: 1
				})
			}, 1500);
		}
	})
}

//显示顶部消息，注意！！！需要配合页面变量使用
function showTopMsg(obj, title) {
	let that = obj;
	that.topMsg.msg = title;
	that.topMsg.show = true;
	setTimeout(() => {
		that.topMsg.msg = '';
		that.topMsg.show = false;
	}, 1200);
}


//获取登录用户id
function getUserId() {
	try {
		const userInfo = uni.getStorageSync('userinfo');
		if (userInfo) {
			return userInfo.Id0000
		}
	} catch (e) {
		console.log('获取当前登录用户id失败');
	}
}

//获取登录用户真实名称
function getTrueName() {
	try {
		const userInfo = uni.getStorageSync('userinfo');
		if (userInfo) {
			return userInfo.Zsmc00
		}
	} catch (e) {
		console.log('获取当前登录用户真实名称失败');
	}
}

//获取登录的用户名
function getUserName() {
	try {
		const userInfo = uni.getStorageSync('userinfo');
		if (userInfo) {
			return userInfo.Yhm000
		}
	} catch (e) {
		console.log('获取当前登录用户登录名称失败');
	}
}

//产生guid
function newGuid() {
	var guid = "";
	for (var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 16.0).toString(16);
		guid += n;
		if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
			guid += "-";
	}
	return guid;
}

// 是否 默认选中 短信通知 
function Ssms() {
	//return true;
	var value =	uni.getStorageSync('is_default_send');
	if(value==undefined){
		value = true
	}
	return value
}



/**
 * 将对象内部的null或undefined转为空字符串
 * 支持数组和对象
 */
function clearSelfNull(obj) {
	if(obj == null || typeof(obj) !== "object") { return obj; }
	if(obj instanceof Array) {
		obj.forEach((item) => {
			internalObjectNull2Blank(item);
		});
	}
	else if(obj instanceof Object) {
		internalObjectNull2Blank(obj);
	}
	else {
		//其他的不处理
	}
	
	console.log(obj);
	return obj;
} 

/**
 * 将object的null改为空字符串
 * 没做异常处理，需调用前做处理，只能类内部使用
 */
function internalObjectNull2Blank(obj) {
	let propertyNames = Object.getOwnPropertyNames(obj);
	propertyNames.forEach((p) => {
		let value = obj[p];
		if(value == null) {
			obj[p] = "";
		}
	});
	return obj;
}

function getDate() {
	let now = new Date();
	let year = now.getFullYear();
	let month = twoCharNumber(now.getMonth() + 1);
	let day = twoCharNumber(now.getDate());
	let hour = twoCharNumber(now.getHours());
	let minute = twoCharNumber(now.getMinutes());
	let defaultDate = year + "-" + month + "-" + day;
	let defaultTime = '00:00';
	
	let date = year + '-' + month + '-' + day;
	let time = hour + ":" + minute;
	return date;
}

function twoCharNumber(num) {
	return ("00" + num).slice(-2);
}


/**
 * 处理data属性，去除空值
 * @specialValue 当属性为null时会使用指定的值
 */
function processModelProperty(data, specialValue) {
	if(!data) { return; }
	specialValue = specialValue || {};
	if(data instanceof Array) {
		data.forEach(item => { intelnalProcessModelProperty(item); });
	}
	else {
		intelnalProcessModelProperty(data, specialValue);
	}
}

function intelnalProcessModelProperty(model, specialValue) {
	if(!model) { return; }
	specialValue = specialValue || {};
	for(let key in model) {
		if(!model.hasOwnProperty(key) || model[key] != null) {  continue; }
		//处理自身的null属性
		if(specialValue.hasOwnProperty(key)) {
			model[key] = specialValue[key];
		}
		else {
			model[key] = "";
		}
	}
}

/**
 * str是否包含inArray中的任意一项
 * @param {Object} str
 * @param {Object} inArray
 */
function indexOfOne(str, inArray) {
	str = str || "";
	inArray = inArray instanceof Array ? inArray : [];
	if(!inArray.length) { return 0; }
	for(let i = 0; i < inArray.length; i++) {
		if(str.indexOf(inArray[i]) > -1) {
			return 1;
		}
	}
	return 0;
}

//下载并打开文件
function openDocument({
  filePath = '',
  title = '',
  success = () => {},
  fail = () => {}, 
  complete = () => {},
  cacheKeyResolve = null
} = {}) {
	//控制是否使用插件打开
	
	let openDocumentInApp = false;
	if(!openDocumentInApp) {
		// #ifdef H5
		window.open(filePath)
		// #endif
		
		
		
		// #ifndef H5
		downloadAndCache(filePath, title, (fileLocalPath) => {
			uni.openDocument({
				filePath: fileLocalPath,
				success: (res) => {
					success(res);
				},
				fail: (res) => {
					fail(res);
				},
				complete: (res) => {
					fail(res);
				}
			});
		}, cacheKeyResolve);
		// #endif
		return;
	}

	//使用插件打开文档
	const office = uni.requireNativePlugin('Jiang-OfficeView');
	console.log(filePath);
	console.log(title);
	office.open({
		url: filePath, 
		topBarColor: '#3394EC',
		title: title,
		fileType: internalResolveExtension(title)
	}, (result) => {
		console.log(JSON.stringify(result));
	});
	
}

/**
 * @param {Object} url 文件url
 * @param {Object} filename 文件名
 * @param {Object} downloadedCallback 文件存到本地后的回调，如果本地缓存中有则判断本地缓存中的文件路径是否有效，
 *     有则直接回调downloadedCallback(path), 参数path是一个安全路径(保证回调时文件路径肯定存在)
 * @param {Object} cacheKeyResolve 暴露出来计算缓存key方法的拓展点，不传入则使用defaultUrlCacheKeyResolve进行计算 
 */
function downloadAndCache(url, filename, downloadedCallback, cacheKeyResolve) {
	
	//计算缓存key
	let fileCacheKey = (cacheKeyResolve != null && cacheKeyResolve instanceof Function) ?  
			cacheKeyResolve(url, filename) : defaultUrlCacheKeyResolve(url, filename);
			
	let existFilePath = uni.getStorageSync(fileCacheKey);
	if(existFilePath) {
		uni.getSavedFileInfo({
			filePath: existFilePath,
			success: function(res) {
				//文件存在则不需要下载
				downloadedCallback instanceof Function && downloadedCallback(existFilePath);
			},
			fail: function() {
				//如果有缓存但是真实文件不存在，则再次下载
				uni.removeStorageSync(fileCacheKey);
				downloadAndCache(url, fileCacheKey, title);
			}
		});
		return;
	}
	
	uni.showLoading({
		title: '下载中,请稍后....'
	});
	console.log(">>>>>>>>>>文件下载中:" + url);
	uni.downloadFile({
		url: url,
		success: function(res) {
			// let oldFilePath = res.tempFilePath;
			// let oldRelativePath = oldFilePath.substr(0, oldFilePath.lastIndexOf("\/"));
			// let relativeFileName = "/" + fileCacheKey + "/" + filename;
			// let newRelativePath = oldRelativePath + relativeFileName;
			
			let ext = filename.substring(filename.lastIndexOf('.')+1,filename.length);
			
			let oldFilePath = res.tempFilePath;
			let oldRelativePath = oldFilePath.substr(0, oldFilePath.lastIndexOf("\/"));
			let relativeFileName = "/" + fileCacheKey + "/" + filename;
			if(uni.getSystemInfoSync().platform=='ios')
			 relativeFileName = "/" + fileCacheKey + "/" + newGuid()+"."+ext;
			console.log('relativeFileName:'+relativeFileName)//苹果不保留真实名称
			let newRelativePath = oldRelativePath + relativeFileName;
			
			//处理app
			// #ifdef APP-PLUS
			new Promise((resolve, reject) => {
				plus.io.resolveLocalFileSystemURL(oldFilePath, (fileEntry) => {
					resolve(fileEntry);
				});
			}).then((fileEntry) => {
				return new Promise((resolve) => {
					fileEntry.getParent((fileDirEntry) => { resolve({
						fileEntry: fileEntry, 
						fileDirEntry: fileDirEntry
					}); });
				});
			}).then((param) => {
				//以临时文件名作为目录
				return new Promise((resolve) => {
					param.fileDirEntry.getDirectory(fileCacheKey, {create: true},(tmpDirEntry) => {
						resolve({
							fileEntry: param.fileEntry,
							fileDirEntry: param.fileDirEntry,
							tmpDirEntry: tmpDirEntry
						});
					},(error) => { 
						uni.showModal({
							title: '新建目录出错: ' + fileCacheKey,
							content: "错误信息:" + JSON.stringify(error),
							showCancel: false
						});
					});
				});
			}).then((param) => {
				//删除以前的文件
				return new Promise((resolve, reject) => {
					plus.io.resolveLocalFileSystemURL(newRelativePath, (newEntry) => {
						newEntry.remove(() => {
							resolve({
								fileEntry: param.fileEntry,
								fileDirEntry: param.fileDirEntry,
								tmpDirEntry: param.tmpDirEntry
							});
						})
					}, (err) => {
						resolve({
							fileEntry: param.fileEntry,
							fileDirEntry: param.fileDirEntry,
							tmpDirEntry: param.tmpDirEntry
						});
					});
				});
			}).then((param) => {
				param.fileEntry.moveTo(param.fileDirEntry, relativeFileName, (newEntry) => {
					uni.setStorageSync(fileCacheKey, newRelativePath);
					downloadedCallback instanceof Function && downloadedCallback(newRelativePath);
				}, (err) => {
					uni.showModal({
						title: '重命名文件出错了',
						content: JSON.stringify(err),
						showCancel: false
					});
				});
			}).catch((err) => {
				uni.showModal({
					title: '出错了',
					content: JSON.stringify(err),
					showCancel: false
				});
			});
			return;
			// #endif
			
			//app外的处理
			uni.saveFile({	//saveFile会移动目标文件到新的缓存区
				tempFilePath: res.tempFilePath,
				success: function(res) {
					var savedFilePath = res.savedFilePath;	//最终保存到路径
					uni.setStorageSync(fileCacheKey, savedFilePath);
					downloadedCallback instanceof Function && downloadedCallback(savedFilePath);
				}
			})
		},
		complete: function() {
			uni.hideLoading();
		}
	});
}

/**
 * downloadAndCache方法不传入cacheKeyResolve默认使用的解析方法, 使用通用文件下载服务下载文件直接可以使用该方法
 * @param {Object} url 文件url
 * @param {Object} filename 文件名
 */
function defaultUrlCacheKeyResolve(url, filename) {
	var tmpurl = url;
	var preIndex = tmpurl.lastIndexOf("\/");
	var lastIndex = tmpurl.lastIndexOf("\.");
	var fileKey = tmpurl.substring(preIndex + 1, lastIndex);
	return fileKey;
}

function uploadUserFile(obj,zbid00,fjlx00,callBack)
{
	let ysmc = obj.substring(obj.lastIndexOf('/') + 1, obj.length);
	uni.uploadFile({
		url: http.apiUrl + '/SFile/SaveFile',
		filePath: obj,
		name: 'file',
		formData: {
			Zpysmc: ysmc,
			Glid00: zbid00,
			Scrid0: getUserId(),
			UserName: getTrueName(),
			Fjlx00: fjlx00,
			Gxlx00: ''
		},
		success: (uploadFileRes) => {
			let rdata = JSON.parse(uploadFileRes.data);
			callBack(rdata);
		},
		complete: () => {
		}
	});
}

function internalResolveExtension(filename) {
	if(!filename) { return ""; }
	let arr = /\.([^\.]+)?$/.exec(filename);
	if(arr == null) { return ""; }
	let extension = arr[1];
	return extension;
}

function isWeiXin(){
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			return true;
		}else{
			return false;
		}
}

module.exports = {
	isWeiXin:isWeiXin,
	showToastMsg: showToastMsg,
	showTopMsg: showTopMsg,
	showToastBack: showToastBack,
	getUserId: getUserId,
	getUserName: getUserName,
	getTrueName: getTrueName,
	newGuid: newGuid,
	Ssms:Ssms,
	getCode: getCode,
	getCarCode:getCarCode,
	getMeetingRoomCode:getMeetingRoomCode,
	clearSelfNull:clearSelfNull,
	getDate: getDate,
	processModelProperty: processModelProperty,
	setBadge: setBadge,
	indexOfOne: indexOfOne,
	downloadAndCache: downloadAndCache,
	openDocument: openDocument,
	uploadUserFile:uploadUserFile,
}
