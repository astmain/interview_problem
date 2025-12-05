let fs = require("fs")


// console.log('111>222:', fs)

fs.readFile('C:/Windows/PFRO.log', async (err, data) => {
    // console.log('111>222:', data.toString("utf16le"))


    // ^^正则
    const exp = /Users\\([^\\]*)/ig
    exp.test(data.toString('utf16le'))
    console.log('111>用户名:', RegExp.$1)
    // const wxId = await getWxId(userName)

    // console.log('111>微信:',await getWxId(userName) )
    // const info = await getData(userName, wxId)
    // console.log(info);



    const getWxId = (path) => {
        const data = fs.readFileSync(`C:/Users/${path}/Documents/WeChat Files/All Users/config/config.data`).toString('utf8')
        const reg = /Documents\\WeChat Files\\([^\\]*)/ig
        reg.test(data)
        return RegExp.$1
    }
// D:\ruanjian111\wechat_file\WeChat Files\All Users


function 微信(params) {

    // let path="D:/ruanjian111/wechat_file/WeChat Files/All Users"
    let path="D:/ruanjian111/wechat_file/WeChat Files/All Users/config/config.data"
    const data = fs.readFileSync(path).toString('utf8')
    console.log('111>222:', data)
    
}
微信()

})