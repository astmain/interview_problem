<template>
  <!-- <div class="app_junchenlun" style="position: fixed; z-index: 1000; left: 50px; top: 50px"> -->
  <div class="app_junchenlun">
    <div>app_vue</div>
    <el-button type="primary" size="small" @click="我的按钮()">我的按钮333</el-button>
    <el-button type="primary" size="small" @click="我的按钮1_注入()">我的按钮1_注入</el-button>
    <el-button type="primary" size="small" @click="我的按钮2_注入()">我的按钮2_注入</el-button>
  </div>
</template>

<script setup>
// import {ref, reactive, onMounted  } from 'vue'
console.log('111>ref:', ref);
console.log('111>reactive:', reactive);
console.log('111>onMounted:', onMounted);
const 我的按钮 = () => {
  console.log('111>我的按钮:', 333);
  console.log('111>我的按钮:', 333);
  // alert(222)
  // alert(222)
  console.log('111>jq:', jq);
  console.log('222>window.jq:', window.jq);
  console.log('333>window.axios:', axios);
  console.log('444>window.dayjs:', dayjs);
  console.log('555>window._ :', _);
  console.log('666>jq222._ :', jq222);

  console.log('111>222:', jq('html').text());
};

const 我的按钮1_注入 = () => {
  // windjs文件注入('js/inject.js');
  // import './inject.js';
  // function windjs文件注入(scriptFile) {
  //   var script = document.createElement('script');
  //   script.setAttribute('type', 'application/javascript');
  //   script.setAttribute('src', chrome.extension.getURL(scriptFile));
  //   document.documentElement.appendChild(script); // run the script
  // }

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

  //5
  //5
  //5
  //5
  //5
  // fun(11,222  )
  jq('html').append(`<script>
console.log('111>我的按钮2_注入:', 333)

<\/script>`);
};
</script>

<style  scoped>
</style>
