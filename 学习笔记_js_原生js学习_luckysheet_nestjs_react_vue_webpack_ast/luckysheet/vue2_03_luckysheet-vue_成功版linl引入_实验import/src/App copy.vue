<template>
<DIV id="app">
  <DIV class="hello">
    <!-- <div ref="reportDes" style="margin-top:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;" /> -->
    <button @click="按钮1()">按钮1</button>
    <div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:90%;left: 0px;top: 100px;"></div>

  </DIV>
</div>
</template>

<script>
import '../sheet/plugin.js';
import '../sheet/luckysheet_umd.js';

// import '../sheet/luckysheet.css';
// import '../sheet/plugins.css';
// import '../sheet/pluginsCss.css';

// console.log('111>LuckyExcel:', LuckyExcel)
// console.log('222>exportExcel:', exportExcel)

///  npm install --save moment moment-timezone

let aaa1 = require('../sheet/plugin.js')
let aaa2 = require('../sheet/luckysheet.umd.js')

console.log('111>222:', aaa1)
console.log('222>222:', aaa2)

console.log('333>222:', Object.keys(aaa1))
console.log('444>222:', Object.keys(aaa2))

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
      // console.error('666>222:', aaa1)
      // console.error('666>222:', aaa2)
      // console.error('666>222:', aaa1.luckysheet)
      // console.error('777>222:', aaa2.luckysheet)
      // console.log('111>$:', $)

      console.log('111>222:', window.luckysheet)
      window.luckysheet.create({
        container: "luckysheet",
      })
      // luckysheet.create({
      //     container: "luckysheet",
      //   });

      // $(function () {
      //   luckysheet.create({
      //     container: "luckysheet",
      //   });
      // });

    }, ////

  }

}
</script>

<style>

</style>
