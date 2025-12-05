

function add(x, y) {
    return x + y
}
console.log(add(1, 2));
console.log('000>add:', 333)


var json = { aaa: 111 }
console.log(json);
console.log('111>json:', json)


var json = require("./json.json")
console.log('222>json:', json)

let less = require("./less.less")
console.log('333>less:', less)
/*

// chunck   代码块

// bundle   n. 束，捆，包；非常；一套，一系列；大量；婴儿；一大笔钱；软件包


// npm i webpack@4.41.6 -g
// npm i webpack-cli@3.3.11  -g

// npm i webpack@4.41.6 -d
// npm i webpack-cli@3.3.11  -d


1. 运行指令：
开发环境：
  webpack ./src/index.js -o ./build/built.js --mode=development
  webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
  整体打包环境，是开发环境


生产环境：
  webpack ./src/index.js -o ./build/built.js --mode=production
  webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
  整体打包环境，是生产环境

2. 结论：
1. webpack能处理js/json资源，
2  不能处理  css/img   等其他资源
2. 生产环境 和  开发环境将ES6模块化编译成浏览器能识别的模块化~
3. 生产环境 比   开发环境多一个压缩js代码。

*/
