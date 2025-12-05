let fs = require("fs")
var Iconv = require('iconv').Iconv;

// console.log('111>222:', fs)

fs.readFile('C:/Windows/PFRO.log', async (err, data) => {
    // console.log('111>222:', data.toString("utf16le"))


    // ^^正则
    const exp = /Users\\([^\\]*)/ig
    exp.test(data.toString('utf16le'))
    console.log('111>用户名:', RegExp.$1)






    function 微信(params) {

        // npm i iconv

        // const data4 = fs.readFileSync("D:/ruanjian111/wechat_file/WeChat Files/wxid_igoohnfdz8f321/config/AccInfo.dat","utf8")
        const data4 = fs.readFileSync("D:/ruanjian111/wechat_file/WeChat Files/wxid_igoohnfdz8f321/config/AccInfo.dat", "utf8")
        console.log('444>222:', data4)
        // console.log('444>222:', data4.toString("ISO-8859-1"))
        // console.log('444>222:', data4.toString("ISO-8859-1"))

    }
    微信()


    function readFileSync_encoding(filename, encoding) {

        var iconv = new Iconv('UTF-8','ISO-8859-1'); 
        var label = iconv.convert("bébé").toString();

        console.log('999>222:', label)
    }
    


    console.log('111>222:',readFileSync_encoding("D:/ruanjian111/wechat_file/WeChat Files/wxid_igoohnfdz8f321/config/AccInfo.dat") )



})