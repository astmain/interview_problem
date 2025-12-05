<template>
  <!-- <div class="app_junchenlun" style="position: fixed; z-index: 1000; left: 50px; top: 50px"> -->
  <div class="app_junchenlun">
    <div>app_vue</div>
    <el-button @click="我的按钮()">我的按钮333</el-button>
    <el-button @click="我的按钮1_注入()">我的按钮1_注入</el-button>
    <el-button @click="我的按钮2_注入()">我的按钮2_注入</el-button>
    <el-button @click="周召fetch()">周召fetch111111</el-button>

    <span class="span">span</span>
  </div>
</template>

<script setup>
// import {ref, reactive, onMounted} from 'vue';
console.log('111>ref:', ref);
console.log('111>reactive:', reactive);
console.log('111>onMounted:', onMounted);
const 我的按钮 = () => {
  console.log('111>jq:', jq);
  console.log('333>axios:', axios);
  console.log('444>dayjs:', dayjs);
  console.log('555>_ :', _);
  console.log('111>222:', jq('html').text());
};

const 我的按钮1_注入 = () => {
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

const 我的按钮2_注入 = () => {
  jq('html').append(`<script>
console.log('111>我的按钮2_注入11:11', 333311122233)
<\/script>`);
};

const 周召fetch = () => {
  function packMsgReq(type, data) {
    return {
      uuid: (function () {
        return 'generate-uuid-4you-seem-professional'.replace(/[genratuidyosmpfl]/g, function (c) {
          const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      })(),
      type: type,
      data: data,
      timestamp: Date.now(),
    };
  }

  const http = {
    request: function (options) {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(packMsgReq('FetchRequest', options), (response) => {
          if (response.state) {
            resolve(response.data);
          } else {
            reject(response.data);
          }
        });
      });
    },
    get: function (options) {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(packMsgReq('FetchGet', options), (response) => {
          if (response.state) {
            resolve(response.data);
          } else {
            reject(response.data);
          }
        });
      });
    },
    post: function (options) {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(packMsgReq('FetchPost', options), (response) => {
          if (response.state) {
            resolve(response.data);
          } else {
            reject(response.data);
          }
        });
      });
    },
  };

  // 发送get请求
  let url = 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa跑步鞋 跑步鞋 运动鞋 运动鞋 男网面透气';

  let aaa = http.get({url: url});
  console.log('111>aaaaaa:');

  // 发送Delete请求
  http.request({
    method: 'GET',
    url: 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa%20%E8%B7%91%E6%AD%A5%E9%9E%8B%20%E8%B7%91%E6%AD%A5%E9%9E%8B%20%E8%BF%90%E5%8A%A8%E9%9E%8B%20%E8%BF%90%E5%8A%A8%E9%9E%8B%20%E7%94%B7%E7%BD%91%E9%9D%A2%E9%80%8F%E6%B0%94',
    headers: {
      cookie: 'test=true;',
    },
  });
};
</script>

<style lang="scss" scoped>
.img {
  width: 100px;
  height: 100px;
}
.span {
  background: red;
}
</style>








