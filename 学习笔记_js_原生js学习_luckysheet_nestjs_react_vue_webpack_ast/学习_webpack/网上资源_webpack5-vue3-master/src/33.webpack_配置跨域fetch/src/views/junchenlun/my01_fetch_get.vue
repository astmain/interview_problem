<template>
  <div ref="ref1">ref1</div>
  <div ref="ref2">ref2</div>
  <el-button @click="我的按钮()">我的按钮</el-button>
</template>

<script setup>
const ref1 = ref('ref1');
const ref2 = ref('ref2');
const 我的按钮 = () => {
  console.log('111>ref1:', ref1);
  console.log('111>ref1:', ref1.value);

  console.log('222>ref2:', ref2);
  console.log('222>ref2:', ref2.value);
};

// defineExpose({
//     我的按钮
// })
</script>

<style lang="scss" scoped>
</style>








