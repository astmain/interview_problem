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
    const data1 = fs.readFileSync(path).toString()
    console.log('111>222:', typeof(data1) )
    const data2 = fs.readFileSync(path)
    console.log('222>222:', typeof(data2)  )


    const data3 = fs.readFileSync(path,"utf8")
    console.log('333>222:', typeof(data3)  )
    console.log('333>222:',data3  )


    // D:\ruanjian111\wechat_file\WeChat Files\wxid_igoohnfdz8f321\config

    const data4 = fs.readFileSync("D:/ruanjian111/wechat_file/WeChat Files/wxid_igoohnfdz8f321/config","utf8")
    console.log('444>222:', typeof(data4)  )
    console.log('444>222:',data4  )

}
微信()

})