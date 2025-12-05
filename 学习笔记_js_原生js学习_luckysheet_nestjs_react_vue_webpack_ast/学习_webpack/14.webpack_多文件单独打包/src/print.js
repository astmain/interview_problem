console.log("print>11:", "print.js被加载了");
function print() {
  const content = "hello print-222";
  debugger
  // console.log("print>222:", content)();
}

// export default print;
module.exports = print;
