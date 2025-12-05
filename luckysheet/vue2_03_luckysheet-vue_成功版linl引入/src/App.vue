<template>
<DIV id="app">
  <DIV class="hello">
    <!-- <div ref="reportDes" style="margin-top:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;" /> -->
    <button @click="按钮1()">按钮1</button>
    <button @click="按钮2()">按钮2</button>
    <div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:90%;left: 0px;top: 100px;"></div>

  </DIV>
</div>
</template>

<script>
// import "../luckysheet/plugin"
// import "../luckysheet/luckysheet.umd"
// import "../luckysheet/luckysheet.css"
// import "../luckysheet/plugins.css"
// import "../luckysheet/pluginsCss.css"

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
      console.log('111>222:', luckysheet)
      window.luckysheet.create({
        container: "luckysheet",
      })
    }, ////
        async 按钮2() {
      console.log('111>222:', jq)
      luckysheet.create({
        container: "luckysheet",
      })
    }, ////

  }

}
</script>

<style>

</style>
