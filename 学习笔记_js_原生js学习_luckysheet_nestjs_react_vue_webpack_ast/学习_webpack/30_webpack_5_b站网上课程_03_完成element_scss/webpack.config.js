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

class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('Hello World Plugin', (
      stats /* 在 hook 被触及时，会将 stats 作为参数传入。*/
    ) => {
      console.log('----------------------------------------------------------------------------------');
      // console.log('111>222:', stats)

    });
  }
}
console.log('111>222:', global)
global.状态 = false
function handler(percentage, message, ...args) {
  console.log('进度>percentage:', percentage)
  if (percentage == 1) {
    console.log('---------------------------------')
    console.log('111>222:', "打包完成了")

    if (!global.状态) {
      var ws = require("nodejs-websocket")
      //createServer
      var server = ws.createServer(function (conn) {
        conn.on("text", function (str) {
          console.log("received " + str);
          //send msg
          conn.sendText(str);
        });

        conn.on("close", function (code, reason) {
          console.log("Connection closed")
        });

        conn.on("error", function (err) {
          console.log("handdle error");
          console.log(err);
        })
      }).listen(9999);
      console.log("websocket server listening on port " + "9999");
      global.状态 = true
    }

  }


}


module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',    //inline-source-map        cheap-source-map          cheap-module-source-map
  entry: {
    main: './src/main.js'
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
    new CopyWebpackPlugin({ patterns: [{ from: './public', to: './public' }] }),
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