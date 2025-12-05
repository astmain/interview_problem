

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //合并 js中的css 生成单独css文件
process.env.NODE_ENV = 'development';
console.log('111>222:', new MiniCssExtractPlugin())

// webpack配置
module.exports = {
  //^^  1入口起点          入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图  
  entry: './src/index.js',


  //^^  2 输出             输出(Output)指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径  __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build')
  },


  //^^  3 loader的配置     让 webpack 能 够 去 处 理 那 些 非 JavaScript 文 件 (webpack 自 身 只 理 解 JavaScript) 
  // 详细不同 loader  配置不     同文件必须配置不同loader处理
  // 匹配哪些文件
  // use 数组中loader执行顺序：从右到左，从下到上 依次执行
  // npm i style-loader -d  1.1.3  创建style标签，将js中的样式资源插入进行，添加到head中生效
  // npm i css-loader -d    3.4.2   将css文件变成commonjs模块加载js中，里面内容是样式字符串
  // npm i less-loader@5.0.0 -d  
  // npm i less@3.11.1 -d     
  // npm i sass-loader@3.11.1 -d    
  // npm i url-loader@1.1.2 -d    
  // npm i file-loader@3.0.1 -d 
  // npm i mini-css-extract-plugin@0.9.0 -d        MiniCssExtractPlug              #抽取js 中的 css 形成一个单独文件    
  // postcss css兼容性处理：postcss --> postcss-loader postcss-preset-env     生产环境：默认是看生产环境
  // 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式  

  // name: '[hash:4].[ext]',
  module: {
    rules: [
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },//style-loader  会创建<style>便签  css-loader把css文件整合到js文件中
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'postcss-loader', options: { ident: 'postcss', plugins: () => [require('postcss-preset-env')()] } },] },//MiniCssExtractPlugin 提取css_成为单独文件
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
      {
        test: /\.(jpg|png|gif)$/, loader: 'url-loader', options: {
          limit: 8 * 1024,   // 当图片大小小于8kb，就会被base64处理// 优点: 减少请求数量（减轻服务器压力） // 缺点：图片体积会更大（文件请求速度更慢
          esModule: false,
          // name: '[hash:4].[ext]',
          name: '[name].[ext]',
          outputPath: './public444/'
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader'
      },
      // {
      //   // 排除css/js/html资源
      //   exclude: /\.(css|js|html|less|scss|sass)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[hash:10].[ext]'
      //   }
      // }



    ]
  },


  //^^  4 plugins的配置    html vue       插件(Plugins)可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩， 一直到重新定义环境中的变量等
  // npm i html-webpack-plugin@3.2.0 -d
  // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
  //loader 做事比较少(处理兼容问题)    插件做事比较多(压缩整理)
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    //合并 js中的css 生成单独css文件
    new MiniCssExtractPlugin({
      // filename: '我的css.css',
      filename: '我的css.css',

    })
  ],



  //^^ 5模式         模式(Mode)指示 webpack 使用相应模式的配置   development  production  
  mode: 'development', // 开发模式
  // mode: 'production'


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
  }

}






/*
  webpack.config.js  webpack的配置文件
    作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）

    所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs。




// npm i webpack@4.41.6 -g
// npm i webpack-cli@3.3.11  -g

// npm i webpack@4.41.6 -d
// npm i webpack-cli@3.3.11  -d


webpack4相关依赖版本
https://blog.csdn.net/ThisEqualThis/article/details/124090739
https://blog.csdn.net/qq_42647547/article/details/125106307






    
 




*/