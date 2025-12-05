

const path = require('path')


console.log('111>222:', __dirname)
console.log('222>222:',  path.resolve(__dirname, 'dist_君臣论浏览器插件'))

module.exports = {
    entry: {
      main: './src/main.js'
      },
      output: {
        filename: './[name].js',
        path: __dirname +"/dist_君臣论浏览器插件",

       
      },


}