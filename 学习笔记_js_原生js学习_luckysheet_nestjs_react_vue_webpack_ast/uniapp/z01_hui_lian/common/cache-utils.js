//import http from './http';
var http = require('./http.js');

/* 用户缓存中部门用户的key */
var user_cache_key = 'storage_key_user_cache';

/* 最近查看的文件记录，需要配合用户id才能获取 */
var recent_file_key = "storage_recent_file_cache:";

var fileFun = require('../components/file-list-getDriFile.js');


/**
 * 保存最近使用的文件
 */
function storeRecentFile(uid, files) {
	if (!uid) {
		return;
	}
	uni.setStorage({
		key: recent_file_key + uid,
		data: files,
		success: () => {},
		fail: (res) => {}
	});
}

/**
 * 获取最近使用的文件
 */
function fetchRecentFile(uid) {
	if (!uid) {
		return;
	}
	let files = uni.getStorageSync(recent_file_key + uid);
	if (!files) {
		files = [];
	}
	return files;
}

/**
 * 清除其他人的使用记录
 */
function clearOtherRecentFile(uid) {
	if (!uid) {
		return;
	}
	let res = uni.getStorageInfoSync();
	let keys = res.keys;
	if (!keys) {
		return;
	}
	keys.forEach(key => {
		if (key.indexOf(recent_file_key) > -1 && key.indexOf(recent_file_key + uid) < 0) {
			uni.removeStorageSync(key);
		}
	});
}



/**
 * 将部门用户存储到本地存储中
 * 返回Promise，不会失败
 */
function storeDepartmentUsers(departmentUsers) {
	return new Promise((resolve, reject) => {
		uni.setStorage({
			key: user_cache_key,
			data: departmentUsers,
			success: () => {
				resolve(true);
			},
			fail: (res) => {
				uni.showToast({
					icon: 'none',
					title: '用户缓存设置失败，可能不支持本地缓存'
				});
				resolve(false);
			}
		});
	});
}

/**
 * 从本地存储获取部门用户
 * 返回Promise
 */
function getDepartmentUsers() {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: user_cache_key,
			success: (res) => {
				//深度拷贝
				resolve(JSON.parse(JSON.stringify(res.data)));
			},
			fail: (res) => {
				reject(res);
			}
		});
	});
}


/**
 * 根据用户ID从本地存储获取用户（不获取部门）
 * 返回Promise
 */
function getCachedUserInfoById(userId) {
	return getDepartmentUserByUserIds(userId)
		.then((data) => {
			let user = null;
			if (data.length) {
				let users = data[0].Users;
				user = users.length ? users[0] : null;
			}
			return Promise.resolve(user);
		})
		.catch((err) => {
			return Promise.resolve(null);
		});
}


/**
 * 先从缓存获取用户，如果本地缓存中没有再从数据库中读取
 */
function getUserInfoById(userId) {
	return getCachedUserInfoById(userId)
		.then((user) => {
			if (user == null) {
				return fetchUserById(userId);
			}
			return Promise.resolve(user);
		})
}

/**
 * 从远程获取用户信息（内部方法）
 * retry : 重试次数
 */
function fetchUserById(userId) {
	return http.doRequest(http.apiUrl + "/System/FetchUser", {
			id: userId
		})
		.then((ret) => {
			return Promise.resolve(ret.Data);
		})
		.catch(() => {
			return Promise.resolve(null);
		});
}



/**
 * 根据部门ID列表（或者逗号分开的字符串）获取部门用户
 */
function getDepartmentUserByDepartmentIds(departmentIds) {
	return internalGetDepartmentUserByCondition(departmentIds, null, null, 0b011);
}


/**
 * 根据角色ID列表（或者逗号分开的字符串）获取部门用户
 */
function getDepartmentUserByRoleIds(roleIds) {
	return internalGetDepartmentUserByCondition(null, roleIds, null, 0b101);
}


/**
 * 根据用户ID列表（或者逗号分开的字符串）获取部门用户
 */
function getDepartmentUserByUserIds(userIds) {
	return internalGetDepartmentUserByCondition(null, null, userIds, 0b110);
}





/**
 * 根据部门ID，角色ID，用户ID列表获取部门用户信息
 * @param departmentIds 部门ID列表（可逗号分割的字符串）
 * @param roleIds 角色ID列表（可逗号分割的字符串）
 * @param userIds 用户ID列表（可逗号分割的字符串）
 */
function getDepartmentUserByCondition(departmentIds, roleIds, userIds) {
	let nullSearchAll = 0b111;
	return internalGetDepartmentUserByCondition(departmentIds, roleIds, userIds, nullSearchAll);
}


/**
 * 根据部门ID，角色ID，用户ID列表获取部门用户信息
 * @param departmentIds 部门ID列表（可逗号分割的字符串）
 * @param roleIds 角色ID列表（可逗号分割的字符串）
 * @param userIds 用户ID列表（可逗号分割的字符串）
 * @param nullSearchAll 上述3个参数不传是否忽略该参数
 */
function internalGetDepartmentUserByCondition(departmentIds, roleIds, userIds, nullSearchAll) {

	departmentIds = arrayStringToArray(departmentIds);
	roleIds = arrayStringToArray(roleIds);
	userIds = arrayStringToArray(userIds);

	return getDepartmentUsers()
		.then((res) => {
			try {
				var data = res;

				if (!data || !data.length) {
					return Promise.resolve([]);
				}
				var result = [];
				for (var i = 0; i < data.length; i++) {
					var department = data[i];

					//部门不匹配 
					if ((!(nullSearchAll & 0b100) || departmentIds.length) &&
						!isStringMatchArr(department.DepartmentPath, departmentIds)) {
						continue;
					}

					//获取部门下的所有用户
					var users = department.Users;
					if (!users || !users.length) {
						continue;
					}

					for (var j = users.length - 1; j >= 0; j--) {
						var user = users[j];

						//用户不匹配角色或者指定的用户id
						if (
							((!(nullSearchAll & 0b010) || roleIds.length) && !isStringMatchArr(user.Jsid00, roleIds)) ||
							((!(nullSearchAll & 0b001) || userIds.length) && userIds.indexOf(user.Id0000) === -1)
						) {
							users.splice(j, 1);
						}
					}
					if (users.length) {
						result.push(department);
					}
				}
				return Promise.resolve(result);
			} catch (err) {
				return Promise.reject(err);
			}
		})
		.catch((res) => {
			return Promise.reject(res);
		});

}




/**
 * 从远程获取用户信息，默认重试3次
 */
function cachedDepartmentUser() {
	internalFetchAndCacheDepartmentUsers(3);
}

/**
 * 从远程获取用户信息（内部方法）
 * retry : 重试次数
 */
function internalFetchAndCacheDepartmentUsers(retry) {
	if (retry === 0) {
		return;
	}
	http.doRequest(http.apiUrl + "/System/AddressList", {})
		.then((ret) => {
			if (ret.Result) {
				storeDepartmentUsers(ret.Data);
			} else {
				internalFetchAndCacheDepartmentUsers(retry - 1);
			}
		})
		.catch(() => {
			internalFetchAndCacheDepartmentUsers(retry - 1);
		});
}

/**
 * 指定的逗号分隔字符串是否匹配数组
 */
function isStringMatchArr(str, arr) {
	if (!str) {
		return 0;
	}
	if (!(arr instanceof Array) || !arr.length) {
		return 0;
	}
	for (var i = 0; i < arr.length; i++) {
		if ((',' + str).indexOf(',' + arr[i] + ',') > -1) {
			return 1;
		}
	}
	return 0;
}


/**
 * 逗号分隔的字符串转换成数组
 * 必定返回数组
 */
function arrayStringToArray(sa) {
	let arr = [];
	if (sa instanceof Array) {
		arr = sa;
	} else if (typeof(sa) === "string" && sa) {
		let trimSa = sa.replace(/(^,+|,+$)/, '');
		if (trimSa === "") {
			return [];
		}
		arr = trimSa.split(',');
	}
	return arr;
}

//获取微信下载文件
function initWxFileList() {
	console.log('开始缓存微信文件');
	let getSDCardPath = fileFun.getSDCardPath(); //获取根目录
	let list = fileFun.readSonFilenum(getSDCardPath + '/tencent/MicroMsg/Download'); //微信下载
	uni.setStorage({
		key: 'storage_key_wxfile',
		data: list,
		success: () => {
			console.log('缓存微信文件成功');
		},
		fail: (res) => {
			console.log('缓存微信文件失败');
		}
	});
}

function getWxFileList() {
	return uni.getStorageSync('storage_key_wxfile');
}


function getUserByUsername(username){
	return getDepartmentUsers()
		.then((res) => {
			try {
				var data = res;
	
				if (!data || !data.length) {
					return Promise.resolve([]);
				}
				var result = {};
				
				for (var i = 0; i < data.length; i++) {
					var department = data[i];
	
					//获取部门下的所有用户
					var users = department.Users;
					if (!users || !users.length) {
						continue;
					}
	
					for (var j = users.length - 1; j >= 0; j--) {
						var user = users[j];
	
						if(user.Yhm000==username){
							result = user;
							break;
						}
					}
				}
				return Promise.resolve(result);
			} catch (err) {
				return Promise.reject(err);
			}
		})
		.catch((res) => {
			return Promise.reject(res);
		});
	
}

function getIsDefaultSend() {
	
	http.doRequest(http.apiUrl + "/System/Isdefaultsend", {})
		.then((ret) => {
			uni.setStorage({
				key: 'is_default_send',
				data: JSON.parse(ret.Value),
				success: () => {
					console.log('短信配置成功');
				},
				fail: (res) => {
					uni.showToast({
						icon: 'none',
						title: '获取短信配置错误'
					});
					
				}
			});
		})
		.catch(() => {
		});
	
}


module.exports = {
	getUserInfoById: getUserInfoById, //先从缓存获取用户，如果本地缓存中没有再从数据库中读取
	storeDepartmentUsers: storeDepartmentUsers,
	getDepartmentUsers: getDepartmentUsers,
	getCachedUserInfoById: getCachedUserInfoById,
	cachedDepartmentUser: cachedDepartmentUser,
	getDepartmentUserByDepartmentIds: getDepartmentUserByDepartmentIds, //根据部门ID列表获取部门及其下面的所有用户
	getDepartmentUserByUserIds: getDepartmentUserByUserIds, //根据用户ID列表获取部门及其下面的所有用户
	getDepartmentUserByRoleIds: getDepartmentUserByRoleIds, //根据角色ID列表获取部门及其下面的所有用户
	getDepartmentUserByCondition: getDepartmentUserByCondition, //根据部门ID，角色ID，用户ID列表获取部门用户信息
	storeRecentFile: storeRecentFile,
	fetchRecentFile: fetchRecentFile,
	clearOtherRecentFile: clearOtherRecentFile,
	initWxFileList: initWxFileList,
	getWxFileList: getWxFileList,
	getUserByUsername:getUserByUsername,
	getIsDefaultSend:getIsDefaultSend
}
