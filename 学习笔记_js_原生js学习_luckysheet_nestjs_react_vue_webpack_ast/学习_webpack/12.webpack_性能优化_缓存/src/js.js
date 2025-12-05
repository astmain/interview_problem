// import '@babel/polyfill';

const add = (x, y) => {
  return x + y;
};
console.log("add:", add(2, 5));

const sub = (x, y) => {
  return x + y;
};
console.log("sub:", sub(2, 5));

// const promise = new Promise(resolve => {
//   setTimeout(() => {
//     console.log('定时器执行完了~');
//     resolve();
//   }, 1000);
// });

// console.log(promise);

const json = require("./json.json");
const css = require("./css.css");
const less = require("./less.less");
const scss = require("./scss.scss");
const img = require("./img.css");
const ts = require("./ts.ts");

// import print from "./print.js"
// console.log('111>print_import方式:', print)
// print();

const print = require("./print.js");
console.log('111>print_require方式:', print)
print();

console.log("00>2js:", "js.js文件被加载完成");


// 自更新一个改变的模块--------------------------------------
if (module.hot) {
  // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
  module.hot.accept('./print.js', function() {
    // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
    // 会执行后面的回调函数
    print();
  });
}

