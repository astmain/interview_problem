//axios跨域 https://www.kancloud.cn/xiaomingjun/vue_js/879215


//博客文章  https://blog.csdn.net/xy1580/article/details/125259817?
module.exports = {
  printWidth: 21000,  //vue 的标签 过长时 会自动换行问题      
  disableLanguages: ["vue"], // 不格式化vue文件，vue文件的格式化单独设置

  trailingComma: "es5", //默认“es5”
  tabWidth: 2, //间距
//   semi: true, //分号
  singleQuote: true,  //英文单引号

  htmlWhitespaceSensitivity: "ignore",   //  html 代码  可以  多空行
  bracketSpacing: false, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"    默认true

  eslintIntegration: false, //不让prettier使用eslint的代码格式进行校验

  arrowParens: "always", //     "always"- 始终包括括号。例子：(x) => x        always   avoid 尽可能省略括号。例子：x => x
  // bracketSameLine: true, // 默认 false   true   再 vue文件没感觉
  /*
   1.true- 例子：
   <button
       onClick={this.handleClick}>
   </button>
   2.false-例子
       <button
           id="prettier-id"
           onClick={this.handleClick}
           >

       </button>
 
   
 */


  // vueIndentScriptAndStyle: true, // 默认false    true
  /*
          首次在 v1.19.0 中可用
          是否缩进 Vue 文件中的代码<script>和<style>标签。有些人（比如Vue 的创建者）不会缩进来保存缩进级别，但这可能会破坏编辑器中的代码折叠。
          false- 不要在 Vue 文件中缩进脚本和样式标签。
          true- 在 Vue 文件中缩进脚本和样式标签。
 */

  // endOfLine: "auto", // 结尾是 \n \r \n\r auto
  // sortAttributes: true,
  // wrapAttributes: true,

  wrap_line_length:false,

  // disableLanguages: ["vue"],   // 不格式化vue文件，vue文件的格式化单独设置

};



/*
DIV   限制 一个   不设置 
div    小子元素    把div 撑开    设置样式   优先  用 margin   padding fontzie   次级 width  height         

box 配置  包含   pdding border  margin

100px    50 50 



flex 


  
*/