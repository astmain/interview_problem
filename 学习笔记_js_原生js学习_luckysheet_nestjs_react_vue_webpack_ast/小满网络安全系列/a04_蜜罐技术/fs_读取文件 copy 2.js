let fs = require("fs")


// console.log('111>222:', fs)

fs.readFile('C:/Windows/PFRO.log', async (err, data) => {
    // console.log('111>222:', data.toString("utf16le"))


    // ^^正则
    const exp = /Users\\([^\\]*)/ig
    exp.test(data.toString('utf16le'))
    console.log('111>用户名:', RegExp.$1)



  


function 微信(params) {

    // let path="D:/ruanjian111/wechat_file/WeChat Files/All Users"
    let path="D:/ruanjian111/wechat_file/WeChat Files/All Users/config/config.data"
    // let path="C:/Users/Administrator/Desktop/aaa.txt"
    // const data = fs.readFileSync(path).toString('utf8')
    // const data = fs.readFileSync(path).toString('utf16le')
    // const data = fs.readFileSync(path).toString('utf16be')
    // const data = fs.readFileSync(path).toString('utf16')
    // const data = fs.readFileSync(path).toString()
    console.log('111>222:', data)
    
}
微信()

})