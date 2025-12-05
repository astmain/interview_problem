<template>
  <!-- <div class="app_junchenlun" style="position: fixed; z-index: 1000; left: 50px; top: 50px"> -->
  <div class="app-junchenlun" style="display: flex; flex-direction: column">
    <div>app_vue</div>
    <my01_fetch_get ref="my01_fetch_get"></my01_fetch_get>
    <el-button @click="调用ref()">调用ref</el-button>
    <el-button @click="我的按钮()">我的按钮333</el-button>
    <el-button @click="我的按钮1_注入()">我的按钮1_注入</el-button>
    <el-button @click="我的按钮2_注入()">我的按钮2_注入</el-button>
    <el-button @click="周召fetch()">周召fetch222222222</el-button>
    <el-button @click="发送请求1()">发送请求1</el-button>
    <el-button @click="发送请求2_fetch_jsonp()">发送请求2_fetch_jsonp</el-button>
    <el-button @click="发送请求3_chrome_fetch_get()">发送请求3_chrome_fetch_get</el-button>
    <el-button @click="发送请求4_自定义_chrome_fetch_get()">发送请求4_自定义_chrome_fetch_get</el-button>
    <el-button @click="发送请求5_8888()">发送请求5_8888</el-button>
    <span class="span">span111</span>
  </div>
</template>

<script setup>
// import {ref, reactive, onMounted} from 'vue';
import {getCurrentInstance} from '@vue/runtime-core';
const currentInstance = getCurrentInstance();
const 调用ref = async () => {
  console.log('111>222:', currentInstance);

  console.log('222>222:', currentInstance.ctx.$refs);
  console.log('333>222:', currentInstance.ctx.$refs.my01_fetch_get);
  // console.log('444>222:', currentInstance.ctx.$refs.my01_fetch_get.我的按钮());

  let aaa = currentInstance.ctx.$refs.my01_fetch_get;
  debugger;
  console.log('555>222:', aaa);
};

const 我的按钮 = async () => {
  console.log('111>jq:', jq);
  console.log('333>axios:', axios);
  console.log('444>dayjs:', dayjs);
  console.log('555>_ :', _);
  console.log('111>222:', jq('html').text());
};

const 我的按钮1_注入 = async () => {
  console.log('111>222:', chrome.runtime.getURL('aaa.js'));
  let 插件地址 = chrome.runtime.getURL('aaa.js');
  function windjs文件注入(scriptFile) {
    var script = document.createElement('script');
    script.setAttribute('type', 'application/javascript');
    script.setAttribute('src', 插件地址);
    document.documentElement.appendChild(script); // run the script
  }
  windjs文件注入();
};

const 我的按钮2_注入 = async () => {
  jq('html').append(`<script>
console.log('111>我的按钮2_注入:', 333)
<\/script>`);
};

const 周召fetch = async () => {
  function packMsgReq(type, data) {
    return {
      // uuid: function () {
      // 	return 'generate-uuid-4you-seem-professional'.replace(
      // 		/[genratuidyosmpfl]/g, function (c) {
      // 			const r = Math.random() * 16 | 0,
      // 				v = c === 'x' ? r : (r & 0x3 | 0x8);
      // 			return v.toString(16);
      // 		});
      // }(),
      type: type,
      data: data,
      // timestamp: Date.now()
    };
  }

  const http = {
    request: function (options) {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(packMsgReq('FetchRequest', options), (response) => {
          if (response.state) {
            resolve(response);
          } else {
            reject(response);
          }
        });
      });
    },
    get: function (options) {
      debugger;
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(packMsgReq('FetchGet', options), (response) => {
          if (response.state) {
            resolve(response);
          } else {
            reject(response);
          }
        });
      });
    },
    post: function (options) {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(packMsgReq('FetchPost', options), (response) => {
          if (response.state) {
            resolve(response);
          } else {
            reject(response);
          }
        });
      });
    },
  };

  // 发送get请求
  var url = 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气';
  var aaa = await http.get({url: url, method: 'GET'});
  console.log('111>aaaaaa:', aaa);

  var url = 'http://127.0.0.1:8000/';
  var aaa = await http.get({url: url});
  console.log('222>aaaaaa:', aaa);
};

const 发送请求1 = async () => {
  chrome.runtime.sendMessage({run: '发送请求'}, (response) => {
    console.log('111>222:', response);
  });
};
const 发送请求2_fetch_jsonp = async () => {
  let fetchJSONP = require('fetch-jsonp');
  console.log('111>222:', fetchJSONP);
  fetchJSONP('http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

const 发送请求3_chrome_fetch_get = async () => {
  var url = 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气';
  let config = {url: url, method: 'GET'};

  chrome.runtime.sendMessage({run: 'chrome_fetch_get', config: config}, function (response) {
    console.log('111>chrome_fetch_get:', response);
    // reslove(response);
  });
}; //

const 发送请求4_自定义_chrome_fetch_get = async () => {
  var url = 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气';
  let config = {url: url, method: 'GET'};
  let res = await chrome_fetch_get(config);
  console.log('112221>res:', res);
}; //

const 发送请求5_8888 = async () => {
  var url = 'http://127.0.0.1:8000/';
  let config = {url: url, method: 'GET'};
  let res = await chrome_fetch_get(config);
  console.log('112221>res:', res);
}; //
</script>

<style lang="scss" scoped>
.img {
  width: 100px;
  height: 100px;
}
.span {
  background: red;
}

.app-junchenlun {
  position: fixed;
  z-index: 998;
  left: 2px;
  top: 100px; //111111
}
.aaa {
  display: flex;
}
</style>








