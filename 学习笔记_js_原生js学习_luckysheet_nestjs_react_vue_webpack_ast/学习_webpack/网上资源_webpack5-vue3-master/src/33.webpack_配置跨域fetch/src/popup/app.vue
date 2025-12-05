<template>
  <div style="width: 500px; height: 500px">
    <div id="test">app_vue</div>
    <el-button type="primary" size="small" @click="我的按钮()">我的按钮</el-button>
  </div>
</template>

<script setup>
const 我的按钮 = async () => {
  var config = {method: 'get', url: 'http://120.25.224.61:9001/word_02_info?user_id=1111&title=aaa%E8%B7%91%E6%AD%A5%E9%9E%8B%20%E8%B7%91%E6%AD%A5%E9%9E%8B%20%E8%BF%90%E5%8A%A8%E9%9E%8B%20%E8%BF%90%E5%8A%A8%E9%9E%8B%20%E7%94%B7%E7%BD%91%E9%9D%A2%E9%80%8F%E6%B0%94'};
  let res = await axios(config);
  console.log('111>res:', res);
};

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   new Promise(async (resolve, reject) => {})
//     .then((response) => {
//       console.log('111>222:', response);

//       sendResponse('111');
//     })
//     .catch((e) => {
//       console.log('222>222:', e);
//       sendResponse('222');
//     });
//   return true;
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.run == '发送请求') {
    sendResponse('popup2222');
  }
}); ////
</script>

<style scoped>
</style>