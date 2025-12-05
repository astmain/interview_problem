const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: './src/js.js',
  output: {
    filename: 'js.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // ^^css
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'postcss-loader', options: { ident: 'postcss', plugins: () => [require('postcss-preset-env')()] } },] },//MiniCssExtractPlugin 提取css_成为单独文件
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
      // ^^img
      // 处理html文件的img图片路径问题（负责引入img，从而能被url-loader进行处理）
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.(jpg|png|gif)$/, loader: 'url-loader', options: {
          limit: 8 * 1024,   // 当图片大小小于8kb，就会被base64处理// 优点: 减少请求数量（减轻服务器压力） // 缺点：图片体积会更大（文件请求速度更慢
          esModule: false,
          // name: '[hash:4].[ext]',
          name: '[name].[ext]',
          outputPath: './public222/'
        }
      },




      //  ^^兼容js
      /*
        js兼容性处理：babel-loader @babel/core 
          1. 基本js兼容性处理 --> @babel/preset-env
            问题：只能转换基本语法，如promise高级语法不能转换
          2. 全部js兼容性处理 --> @babel/polyfill  
            问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
          3. 需要做兼容性处理的就做：按需加载  --> core-js
      */

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',    //指定入口模板的位置
      filename: "index.html",   //打包生成的文件名
      hash: true,  //是否把打包好的资源插入到页面中，是否设置hash值
      minify: {
        collapseWhitespace: true, // 移除空格
        removeComments: true,  // 移除注释
        removeEmptyElements: true, //清楚掉空标签
      }
    }),
    new MiniCssExtractPlugin({ filename: 'css.css', }),
    new CleanWebpackPlugin()
  ],
  //^^ 5模式        development  production  
  mode: 'development', // 开发模式
  mode: 'production', //生成模式 会自动压缩代码
  //^^ devServer 开发服务器-----------------------------------------------------------------
  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 安装  npm i webpack-dev-server@3.10.3 -d
  // 启动  devServer指令为：npx webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, 'build'),   // 运行  项目构建后路径  
    compress: true,   // 启动  gzip压缩  体积更小
    port: 3000,  // 端口号
    open: true, // 自动打开浏览器
    // hot: true,
  }


};
/*

webpack4相关依赖版本
https://blog.csdn.net/ThisEqualThis/article/details/124090739
https://blog.csdn.net/qq_42647547/article/details/125106307
*/
