const express = require('express')  //  npm i express
const bodyParser = require('body-parser')  // npm i body-parser
const cors = require('cors');   // npm i cors
const os = require('os')  //  npm i express
const app = express()
const port = 9003

// app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'mytoken');
    next();
});

let 请求次数 = 0
app.get('/test_upstream/index', (req, res, next) => {
    console.log("my_express_9003", 请求次数 += 1);
    res.json({ aaa: 1, list_os_cpus: os.cpus(), list_os_cpus_lenth: os.cpus().length })

})
app.get('/test_upstream/api/no1', (req, res, next) => {
    console.log(222);
    res.json({ aaa: 1, list_os_cpus: os.cpus(), list_os_cpus_lenth: os.cpus().length })

})



app.listen(port, () => {
    console.log("==============================")
    console.log(`localhost:${port}/index`)
    console.log(`182.61.37.168:${port}/index`)
    console.log(`8.134.38.36:${port}/index`)
    // http://182.61.37.168:8765/index   百度云 安全组有问题 建议使用  宝塔配置安全组1

})