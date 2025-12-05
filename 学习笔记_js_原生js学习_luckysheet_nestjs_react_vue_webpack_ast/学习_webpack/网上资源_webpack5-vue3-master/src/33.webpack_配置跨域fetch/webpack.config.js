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

// ^^美化webpack输出样式  npm i --dev friendly-errors-webpack-plugin

const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

//^^http --------------------------------------------------------------------

// ^^webpack_配置智能提示----
const { Configuration } = require('webpack')
/**
 * @type {Configuration} //配置智能提示
 */




global.是否刷新 = false
const http = require("http")
const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })
  if (是否刷新) {
    res.write("刷新")
    global.是否刷新 = false
  } else {
    res.write("不刷新")
  }
  res.end()
})
app.listen(8000)


//进度完成函数
function handler(percentage, message, ...args) {
  if (percentage == 1) {
    console.log('打包完成>进度percentage:---------------------------',)
    global.是否刷新 = true
  }
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
    new webpack.DefinePlugin({ __VUE_OPTIONS_API__: true, __VUE_PROD_DEVTOOLS__: false, }),// 此处解决vue未定义extension大量报错问题
    new FriendlyErrorsWebpackPlugin({ compilationSuccessInfo: { messages: ['我正在运行哈哈哈You application is running here 我正在运行哈哈哈'] } }),

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
    }),

  ],
  stats:"errors-only", //取消_控制台的代码_提示_只提示错误
  // watchOptions: {
  //   poll: 1000,//监测修改的时间(ms)
  //   aggregeateTimeout: 500, //防止重复按键，500毫米内算按键一次
  //   ignored: /node_modules/,//不监测
  // }


}