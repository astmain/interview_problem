const path = require('path')
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// ^^饿了么
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


//^^websocket
global.服务 = false
global.链接 = null



let handler = async (percentage, message, ...args) => {
  if (percentage == 1) {
    console.log('---------------------------------')
    console.log('打包>进度percentage:', percentage)


    if (global.服务) {
      console.log('重启>global.服务:', "------------------------------")

      global.服务.close()


    }
    setTimeout(() => {
      let ws = require("nodejs-websocket")
      global.服务 = ws.createServer((conn) => {
        conn.on("text", function (str) {
          // console.log('text>链接:', str)
          if (str == "我刚开始") {
            conn.sendText("刷新");
          }

        });


        conn.on('connect', (code) => {
          console.log('刷新刷新刷新刷新刷新>刷新:', 333)
          setTimeout(() => {
            conn.sendText("刷新");
          }, 2000)

        })




        conn.on("close", function (code, reason) {
          console.log('关闭>链接:', "code:", code, "reason", reason)
        });

        conn.on("error", function (err) {
          console.log('异常>链接:', err)
        })




      }).listen(9999);
      console.log("websocket server listening on port " + "9999");
      console.log('111>222:', global.服务.connections)


      setTimeout(() => {
        global.服务.connections.forEach(function (conn) {
          conn.sendText("刷新")
          console.log('111>我发送了刷新:', 333)
        })
      }, 5000)



    }, 1000)














  }//


}


module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',    //inline-source-map        cheap-source-map          cheap-module-source-map
  entry: {
    content: './src/content.js',
    background: './src/background/background.js',
  },
  output: {
    filename: './[name].js',
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/i, loader: 'babel-loader', exclude: /node_modules/, options: { cacheDirectory: true, } },
      { test: /\.css$/i, use: ["style-loader", 'css-loader'], },
      // { test: /\.s[ac]ss$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], },
      { test: /\.s[ac]ss$/i, use: ["style-loader", 'css-loader', 'sass-loader'], },
      { test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i, type: 'asset', },
      { test: /.vue$/, use: 'vue-loader' },
      { test: /\.(t|j|mj)s$/, include: path.resolve(__dirname, '../node_modules/element-plus'), resolve: { fullySpecified: false, }, },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    // new MiniCssExtractPlugin(),
    // new HelloWorldPlugin({ options: true }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: './public', to: './' }] }),
    new CopyWebpackPlugin({ patterns: [{ from: './manifest.json', to: './' }] }),
    new CopyWebpackPlugin({ patterns: [{ from: './manifest.json', to: './' }] }),
    new VueLoaderPlugin(),
    // ^^饿了么
    AutoImport({ resolvers: [ElementPlusResolver()], imports: ['vue',], include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/,], }),
    Components({ resolvers: [ElementPlusResolver()], }),

    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      handler,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    })
  ],
  // watchOptions: {
  //   poll: 1000,//监测修改的时间(ms)
  //   aggregeateTimeout: 500, //防止重复按键，500毫米内算按键一次
  //   ignored: /node_modules/,//不监测
  // }


}