let fs = require("fs")
var Iconv = require('iconv').Iconv;

fs.readFile('C:/Windows/PFRO.log',  (err, data) => {

    
})
    // console.log('111>222:', data.toString("utf16le"))


    // ^^正则
    const exp = /Users\\([^\\]*)/ig
    exp.test(data.toString('utf16le'))
    console.log('111>用户名:', RegExp.$1)
    // const wxId = await getWxId(userName)




// C:/Windows/PFRO.log    系统日志>找到当前用户名 
fs.readFile('C:/Windows/PFRO.log', async (err, data) => {
    // console.log('111>222:', data.toString("utf16le"))
    function readFileSync_encoding(filename, encoding) {
        var content = fs.readFileSync(filenam);
        var iconv = new Iconv(encoding, 'UTF-8');
        var buffer = iconv.convert(content);
        return buffer.toString('utf8');
    }


    // console.log('111>222:', readFileSync_encoding("D:/ruanjian111/wechat_file/WeChat Files/wxid_igoohnfdz8f321/config/AccInfo.dat","ISO-8859-1"))



    function name() {

        let data4 = fs.readFileSync("D:/ruanjian111/wechat_file/WeChat Files/wxid_igoohnfdz8f321/config/AccInfo.dat")
        console.log('111>data4:', data4)
        // var Iconv  = require('iconv').Iconv; 
        // var iconv = new Iconv('UTF-8', 'ISO-8859-1');
        var iconv = new Iconv('ISO-8859-1', 'UTF-8');
        var label = iconv.convert(data4).toString("utf8");
        console.log('222>label:', label)
    }
    name()



})