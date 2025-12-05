const process = require("child_process");
// 执行 npm run build 命令
;(function() {
  process.exec('ls', (error, stdout, stderr) => {
    if (!error) {
        console.log('1------Exit error:', error);
        console.log('2---------2Program output:\n', stdout);
        console.log('3---------3Program stderr:\n', stderr);
      // 成功
    } else {
      // 失败
      console.log('0------Exit error:', error);
    }
  });
})();