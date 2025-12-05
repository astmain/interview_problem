import Vue from 'vue'
import Vuex from 'vuex'
//import tim from '../common/tim/tim'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loginProvider: "",	//没有用
		openid: null,		//暂时没有使用
		hasLogin: false,	//是否登录
		zsmc00:'',			//真实名称
		id0000:'123',		//用户id
		todoCount_1:10,		//任务1的数量,
		chooseUserNames:'',
		chooseUserIds:'',
		
		/*********聊天相关 start*********/
		isSDKReady: false ,// TIM SDK 是否 ready
		
		conversationActive:{},	//聊天进行中的会话
		toUserId:'',			//聊天对象id
		conversationList:[],		//会话列表
		currentMessageList:[],			//消息列表
		/********聊天相关 end*********/
		
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setZsmc(state,zsmc)
		{
			state.zsmc00 = zsmc;
		},
		setId0000(state,id)
		{
			state.id0000 = id;
		},
		completeTodo_1(state)
		{
			state.todoCount_1 = state.todoCount_1-1;
		},
		setChooseUserNames(state,userNames)
		{
			state.chooseUserNames = userNames
		},
		setChooseUserIds(state,userIds)
		{
			state.chooseUserIds = userIds
		},
		/********聊天相关 start*********/
		//更新TIMSDK状态
		toggleIsSDKReady(state, isSDKReady) {
		  state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
		},
		//选择好友聊天--创建会话/拼接会话id
		createConversationActive(state,toUserId){
			state.conversationActive.conversationID = 'C2C'+toUserId
			state.toUserId = toUserId
			state.currentMessageList = []
		},
		//选择已有会话聊天--更新选中会话详情
		updateConversationActive(state,conversationItem){
			state.conversationActive = Object.assign({}, conversationItem.conversation);
			state.toUserId = conversationItem.user.userId
			state.currentMessageList = []
		},
		//更新会话列表
		updateConversationList(state,newConversationList){
			state.conversationList = newConversationList
		},
		/**
		 * 将消息插入当前会话列表
		 * 调用时机：收/发消息事件触发时
		 * @param {Object} state
		 * @param {Message[]|Message} data
		 * @returns
		 */
		pushCurrentMessageList(state, data) {
		  // 还没当前会话，则跳过
		  if (Array.isArray(data)) {
		    // 筛选出当前会话的消息
		    const result = data.filter(item => item.conversationID === state.conversationActive.conversationID)
		    state.currentMessageList = [...state.currentMessageList, ...result]
		  } else if (data.conversationID === state.conversationActive.conversationID) {
		    state.currentMessageList = [...state.currentMessageList, data]
		  }
		  console.log('最新消息:')
		  console.log( state.currentMessageList[state.currentMessageList.length-1]);
		},
		/**
		 * 滑到顶部请求更多的历史消息
		 * */
		unshiftCurrentMessageList(state,data){
			console.log(data)
			if(data){
				state.currentMessageList = [...data,...state.currentMessageList]
			}
		}
		/********聊天相关 end*********/
	}
})

export default store