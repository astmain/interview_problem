const shell = require('shelljs');
function my_shell_exec(str_code) {
    return new Promise((resolve, reject) => {
        shell.exec(str_code, function (code, stdout, stderr) {
            // console.log('成功')
            // console.log('1------Exit code:', code);
            // console.log('2---------2Program output:\n', stdout);
            // console.log('3---------3Program stderr:\n', stderr);
            resolve(stdout)
        });
    })
}
(async () => {
    let res1 = await my_shell_exec("cd ../ && ls")
    var res2 = await my_shell_exec("pm2  stop all")



    var res2 = await my_shell_exec("pm2 start /z03_linux_express/my_express_9001.js   --watch ")
    var res2 = await my_shell_exec("pm2 start /z03_linux_express/my_express_9002.js   --watch ")
    var res2 = await my_shell_exec("pm2 start /z03_linux_express/my_express_9003.js   --watch ")
    // var res2 = await my_shell_exec("    pm2 log   ")



})()


// (async () => {
//     let res1 = await my_shell_exec("pm2  stop all")

// })()