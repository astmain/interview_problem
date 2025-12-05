let fs = require("fs")
var Iconv = require('iconv').Iconv;



var 系统日志文本= fs.readFileSync("C:/Windows/PFRO.log").toString('utf16le')
var exp = /Users\\([^\\]*)/ig
var 系统日志文本=exp.test(系统日志文本.toString('utf16le'))
console.log('111>系统日志文本:', 系统日志文本)
console.log('222>系统日志文本:', RegExp.$1)


// 微信账户1  先找到微信账号
// D:\ruanjian111\wechat_file\WeChat Files\wxid_igoohnfdz8f321\config


// 微信账户2文本  为什么 node 无法转 ISO-8859-1  而python可以
var 微信账号2 = fs.readFileSync("D:/ruanjian111/wechat_file/WeChat Files/wxid_igoohnfdz8f321/config/AccInfo.dat")
var iconv = new Iconv('ISO-8859-1', 'UTF-8');
var 微信账号2 = iconv.convert(微信账号2).toString("utf8");
console.log('333>label:', 微信账号2)


// 视频 https://www.bilibili.com/video/BV1eZ4y1C7Jc/?p=4
// 文章 https://www.bilibili.com/read/cv16944860








