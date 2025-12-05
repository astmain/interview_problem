<template>
<div id="app">
  <DIV class="hello">

    <button @click="按钮1()">按钮1</button>
    <div style="width:1500px;height:600px;border:1px solid #ddd;position:relative;">
      <p>在线表格练习</p>
      <!-- luckysheet容器 -->
      <div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 20px;"></div>
    </div>

    <div style="   width: 1500px;  height: 600px;  border: 1px solid #ddd; position: relative;">
      <div style="display: flex">
        <p>在线表格练习</p>
        <!-- <input id="uploadBtn" type="file" @change="loadExcel" /> -->
        <!-- <el-button type="primary" @click="downloadExcel">下载</el-button> -->
      </div>
      <!-- luckysheet容器 -->
      <div id="luckysheet" style="  margin: 0px; padding: 0px;  position: absolute;width: 100%; height: 100%;  left: 0px;top: 50px; "></div>
    </div>

  </DIV>
</div>
</template>

<script>
import LuckyExcel from 'luckyexcel';
import { exportExcel } from './excel_down';

console.log('111>LuckyExcel:', LuckyExcel)
console.log('222>exportExcel:', exportExcel)

export default {
  name: 'App',
  data() {
    return {
      options: {
        container: 'container', //容器id名
        title: '测试Excel', // 表 头名
        lang: 'zh', // 中文
        showtoolbar: true, // 是否显示工具栏
        showinfobar: false, // 是否显示顶部信息栏
        showsheetbar: true // 是否显示底部sheet按钮
      },
    }
  },
  methods: {

    async 按钮1() {
      console.log(`111>222:`, 333)

      console.log('1111111', this.data_table)

      // window.luckysheet.destroy()
      window.luckysheet.create(this.options)

    }, ////

  }

}
</script>

<style>

</style>
