<template>
  <!-- <div class="app_junchenlun" style="position: fixed; z-index: 1000; left: 50px; top: 50px"> -->
  <div class="app_junchenlun">
    <div>app_vue</div>
    <el-button @click="我的按钮()">我的按钮333</el-button>
    <el-button @click="我的按钮1_注入()">我的按钮1_注入</el-button>
    <el-button @click="我的按钮2_注入()">我的按钮2_注入</el-button>
  
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
console.log('111>我的按钮2_注入:', 333)
<\/script>`);
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








