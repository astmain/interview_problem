/**
 * 事件总线，需要注册到Vue的属性中
 */
function EventBus() {
	
	/* 单一事件 */
	this.events = {};
	
	/* 组事件 */
	this.groupEvents = {};
	
	
	//================================= 单一监听事件 ===================================
	//=================================================================================
	
	/**
	 * 注册事件监听
     * @param {String} eventName 事件名称
	 * @param {Function} callback 回调函数
	 */
	this.register = function(eventName,callback) {
		if(!eventName) { throw new Error('eventName 不能为空'); }
		if(!(callback instanceof Function)) { throw new Error('callback必须是一个函数'); }
		this.events[eventName] = callback;
	}
	
	
	/**
	 * 发送事件
     * @param {String} eventName 事件名称
	 * @param {any} params 参数
	 */
	this.fire = function(eventName,params) {
		if(!eventName) { throw new Error('eventName 不能为空'); }
		var callback = this.events[eventName];
		callback instanceof Function && callback(params ? params : {});		//保证回调参数为对象
	}
	
	
	/**
	 * 移除事件
     * @param {String} eventName 事件名称
	 */
	this.unregister = function(eventName) {
		if(!eventName) { throw new Error('eventName 不能为空'); }
		delete this.events[eventName];
	}
	
	
	
	//==================================== 组监听 =====================================
	//=================================================================================
	
	/**
	* 注册组事件监听
	* @param {String} eventName 事件名称
	* @param {String} subId 组内成员的id：
	*     1. 不同的监听者注册的subId不能重复
	*     2. 因为无法保证一个页面只会注册一次，用于防止重复注册
	*     3. 控制回调函数的执行顺序，越小越优先执行
	* @param {Function} callback 回调函数
	*/
	this.registerGroupEventListener = function(groupName,subId,callback) {
		if(!groupName) { throw new Error('groupName 不能为空'); }
		if(!subId) { throw new Error('subId 不能为空'); }
		if(!(callback instanceof Function)) { throw new Error('callback 必须是一个函数'); }
		
		//获取组中的所有监听者，没有的话初始化一个
		if(this.groupEvents[groupName] == null) { this.groupEvents[groupName] = {}; }
		var listeners = this.groupEvents[groupName];
		
		subId = "" + subId;
		listeners[subId] = callback;
	}
	
	/**
	* 发送事件给整组的监听者
    * @param {String} eventName 事件名称
	* @param {any} params 参数
	*/
	this.fireGroupEvent = function(groupName,params) {
		if(!groupName) { throw new Error('groupName 不能为空'); }
		var listeners = this.groupListeners(groupName);
		
		//广播事件给所有Listener
		listeners.forEach(callback => {
			try {
				callback instanceof Function && callback(params ? params : {});
			}
			catch(err) {
				
			}
		});
	}
	
	
	
	//==================================== 公共方法 ====================================
	//=================================================================================
	
	/**
	 * 获取组内的所有监听者，按subId升序
	 * 返回一个不为null的数组
	 */
	this.groupListeners = function(groupName) {
		var group = this.groupEvents[groupName];
		return ownValues(group);
	}
	
	
	/**
	 * 获取对象本身(不包含原型)的key，不为null
	 */
	function ownKeys(obj) {
		var keys = [];
		if(!obj) { return keys; }		//null返回空数组
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				keys.push(key);
			}
		}
		return keys;
	}
	
	/**
	* 获取对象本身(不包含原型)的value，不为null，按key的顺序升序
	*/
	function ownValues(obj) {
		var values = [];
		if(!obj) { return values; }		//null返回空数组
		
		//本对象的所有key并按升序排列
		var keys = ownKeys(obj).sort();
		
		for (var i in keys) {
			values.push(obj[keys[i]]);
		}
		return values;
	}
	
	
}


module.exports = {
	EventBus : EventBus
}
