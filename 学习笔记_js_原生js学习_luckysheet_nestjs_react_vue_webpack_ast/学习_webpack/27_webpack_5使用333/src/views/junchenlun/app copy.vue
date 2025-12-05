<template>
  <!-- <div class="app_junchenlun" style="position: fixed; z-index: 1000; left: 50px; top: 50px"> -->
  <div class="app_junchenlun" >
    <div>app_vue</div>
    <el-button type="primary" size="small" @click="我的按钮()">我的按钮333</el-button>
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
};
</script>

<style lang="scss" scoped>
// .app_junchenlun {
//   position: fixed;
//   z-index: 1000;
//   left: 50px;
//   top: 50px;
// }
</style>
