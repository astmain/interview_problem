var http = require('./http.js');
var graceChecker = require('../graceUI/graceChecker.js');
var utils = require('../common/utils.js');

var that;
var ConditionFun = '';
var CureentButtonObj;
var flowData = {
	Sybinfo: {}, //上一步信息
	XybClrids: '', //下一步处理人
	FlowBh: '', //流程编号
	Lcbzbh: '' //流程步骤编号
}

function comm_Init(vueObj) {
	
	that = vueObj;
	flowData.FlowBh = vueObj.FlowBh;
	flowData.Lcbzbh = vueObj.Lcbzbh;
}


function comm_GetFlowStep() { //获取下一步流程步骤

	return http.doRequest(http.apiUrl + '/Base/comm_GetFlowStep', {
		FlowBh: flowData.FlowBh,
		Lcbzbh: flowData.Lcbzbh
	}).then((data) => {
		if (data.Data.Userbutton) {
			let btns = JSON.parse(data.Data.Userbutton) || [];
			let tmp = [];
			for(let i = 0; i < btns.length; i++) {
				if(forCurrentUser(btns[i].For)) {
					tmp.push(btns[i]);
				}
			}
			
			that.btnList = tmp;
			//调用预处理函数，显示或者关闭一些数据
			let PreConditionFun = data.Data.Prefun;
			ConditionFun = data.Data.Fun;
			if (PreConditionFun != '' && PreConditionFun != null && PreConditionFun != undefined) {
				let methods = that.$options.methods;
				methods[PreConditionFun]();
			}
		}
	}).catch((data) => {
		console.log('获取步骤发生异常' + data);
	});
}

function comm_GetFlowData() { //获取上一步流程步骤，主要是为了上步一处理人

	return http.doRequest(http.apiUrl + '/Base/comm_GetFlowData', {
		Flowid: that.Flowid,
		FlowBh: flowData.FlowBh
	}).then((data) => {
		
		flowData.Sybinfo.Sybclrid0 = data.Data.Sybclrid0;
		
		flowData.Lcbzbh = data.Data.Sshjid; //所属环节编号
		
		
	}).catch((data) => {
		console.log('获取上一步发生异常');
	});
	
	
}

//通用流程处理
function comm_Dispose(buttonObj) { //通用按钮处理判断
	CureentButtonObj = buttonObj;
	var checkRes = graceChecker.check(that.modelObj, that.rule);
	if (checkRes) {
		switch (buttonObj.Utype) {
			case "default":
				flowData.XybClrids = buttonObj.OpUser.UserIDs; //特定默认用户
				comm_Dispose_Commit(buttonObj);
				break;
			case "previous":
			case "back":
				comm_Dispose_Commit(buttonObj);
				break;
			case "noUser":
			case "toFqr":
			case "defaultRoleUser":
				comm_Dispose_Commit(buttonObj); //没有用户
				break;
			case "users":
			case "roles":
			case "all":
				chooseUserAutoSb(buttonObj); //选择用户并且自动提交
				break;
			default:
				chooseUserAutoSb(buttonObj); //选择用户并且自动提交。
				break;
		}
	} else {
		//utils.showTopMsg(that, graceChecker.error);
		uni.showToast({
			title: graceChecker.error,
			icon: 'none'
		})
	}
}

function comm_Dispose_Commit(buttonObj) { //提交判断
	uni.showModal({
		title: '提示',
		content: '确定要提交吗',
		success: (res) => {
			if (res.confirm) {
				comm_Dispose_SubmitData(buttonObj);
			} else if (res.cancel) {}
		}
	});
}

function comm_Dispose_SubmitData(buttonObj) { //通用提交
	if (ConditionFun != '' && ConditionFun != null && ConditionFun != undefined) {
		let methods = that.$options.methods;
		let result = methods[ConditionFun](buttonObj);
		if (!result) {
			return false;
		}
	}

	try {
		if (that.postProcessBeforeCommit) {
			that.postProcessBeforeCommit(buttonObj,this);
		}
	} catch (e) {
		console.log(e.message);
		uni.showModal({
			title: '提示',
			content: e.message,
			showCancel: false
		});
		return;
	}


	//开始拼接参数
	let formData = Object.assign(that.modelObj, CureentButtonObj, that.otherData);

	formData.userName = utils.getTrueName(); //当前用户名称
	formData.userId = utils.getUserId(); //当前用户id

	//调用主表信息，必须又下面的命名参数
	formData.Flowid = that.Flowid; //流程id
	formData.Zbid00 = that.Zbid00; //主表id
	//formData.Xybclqx00 = that.Xybclqx00;//处理期限

	formData.FlowBh = flowData.FlowBh; //流程编号
	formData.Lcbzbh = flowData.Lcbzbh; //流程步骤id
	formData.jsryid = flowData.XybClrids; //下一步处理人
	formData.Sybclrid0 = flowData.Sybinfo.Sybclrid0; //上一步处理人信息
	formData.Roles = CureentButtonObj.OpUser.Roles;
	//拼接参数完成

	uni.showLoading({
		title: '处理中...'
	});
	http.doRequest(http.apiUrl + '/Base/comm_FlowDispose', formData).then((data) => {
			if(data.Result) {
				that.fireList();
				that.EventBus.fire("refreshBadge"); //刷新待办数量
				console.log(JSON.stringify(formData));
				utils.showToastBack('提交成功');
			}
			else {
				uni.showModal({
					title: '提示',
					content: data.Msg,
					showCancel: false,
				});
			}
		}).catch((data) => {
			console.log('提交流程发生异常');
		})
		.finally(() => {
			uni.hideLoading();
		});
}

function chooseUserAutoSb(buttonObj) { //选择处理用户，并自动提交
	let search = '';
	if (buttonObj.OpUser) {
		search += ("&departmentIds=" + (buttonObj.OpUser.DepartmentIDs ? buttonObj.OpUser.DepartmentIDs : ''));
		search += ("&roleIds=" + (buttonObj.OpUser.Roles ? buttonObj.OpUser.Roles : ''));
		search += ("&userIds=" + (buttonObj.OpUser.UserIDs ? buttonObj.OpUser.UserIDs : ''));
	}
	
	uni.navigateTo({
		
		url: '../sys/userSelect?eventName=chooseNextUserAutoSb&FlowBh='+flowData.FlowBh + search
	});
}

function setNextuser(nextUserId) { //设置下一步处理人
	flowData.XybClrids = nextUserId;
}

function forCurrentUser(forConfig) {
	
	 //未配置的当成通用处理
	if (!forConfig) { return true; }
	var roleArr = forConfig.Role || [];
	var userArr = forConfig.User || [];
	var deptArr = forConfig.Dept || [];
	if (roleArr.length === 0 && userArr.length === 0 && deptArr.length === 0) { return true; }
	
	let userInfo = uni.getStorageSync("userinfo") || {};
	let loginRoleid = "," + userInfo.Jsid00 + ",";
	return support(loginRoleid, roleArr);       //目前仅支持角色，其他如人员id同理传入即可
}

function support(auth, arr) {
	if (!auth) { throw new Error("获取不到用户角色"); }
	if (!arr || arr.length === 0) { return true; }
	var mode = arr[0].indexOf("!") === 0 ? 2 : 1;
	for (var i = 0; i < arr.length; i++) {
		var item = arr[i];
		if (mode === 1 && item.indexOf("!") === 0) { throw new Error("配置异常"); }
		if (mode === 2 && item.indexOf("!") !== 0) { throw new Error("配置异常"); }
		var flag = mode === 1 ? item : item.substr(1);
		var contains = auth.indexOf("," + flag + ",") > -1;
		if (mode === 1 && contains) { return true; }
		if (mode === 2 && contains) { return false; }
	}
	if (mode === 1) { return false; }
	if (mode === 2) { return true; }
}

module.exports = {
	comm_Init: comm_Init, //初始化
	comm_GetFlowStep: comm_GetFlowStep, //获取下一步流程按钮
	comm_Dispose: comm_Dispose, //通用判断处理
	comm_GetFlowData: comm_GetFlowData, //获取当前流程数据
	comm_Dispose_SubmitData: comm_Dispose_SubmitData, //提交数据
	setNextuser: setNextuser //设置下一步处理人
}
