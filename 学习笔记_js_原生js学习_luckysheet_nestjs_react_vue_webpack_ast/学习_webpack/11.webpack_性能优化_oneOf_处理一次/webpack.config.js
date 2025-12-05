const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'production';// 定义nodejs环境变量：决定使用browserslist的哪个环境
// 复用css
const commonCssLoader = [
  MiniCssExtractPlugin.loader,//MiniCssExtractPlugin 提取css_成为单独文件
  'css-loader',
  { loader: 'postcss-loader', options: { ident: 'postcss', plugins: () => [require('postcss-preset-env')()] } }//postcss css兼容
];

module.exports = {
  entry: ['./src/js.js', './src/index.html'],
  output: {
    filename: 'js.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [

      //^^oneOf
      {
        oneOf: [
          // ^^css
          { test: /\.css$/, use: [...commonCssLoader] },
          { test: /\.less$/, use: [...commonCssLoader, 'less-loader'] },
          { test: /\.scss$/, use: [...commonCssLoader, 'sass-loader'] },


          //  ^^兼容js          // 预设：指示babel做怎么样的兼容性处理
          {
            test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage', // 按需加载
                    corejs: { version: 3 }, // 指定core-js版本
                    targets: { chrome: '60', firefox: '60', ie: '9', safari: '10', edge: '17' },              // 指定兼容性做到哪个版本浏览器
                  }
                ]
              ]
            }
          },
          // ^^img        // 处理html文件的img图片路径问题（负责引入img，从而能被url-loader进行处理） // 当图片大小小于8kb，就会被base64处理// 优点: 减少请求数量（减轻服务器压力） // 缺点：图片体积会更大（文件请求速度更慢
          { test: /\.(jpg|png|gif)$/, loader: 'url-loader', options: { outputPath: './public222/', limit: 8 * 1024, esModule: false, name: '[name].[ext]', } },
          { test: /\.html$/, loader: 'html-loader' },
          //^^ 其他
          { exclude: /\.(js|css|less|scss|html|jpg|png|gif)/, loader: 'file-loader', options: { outputPath: 'other', name: '[name].[ext]', } },

        ]
      },

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
        // removeEmptyElements: true, //清楚掉空标签
      }
    }),
    new MiniCssExtractPlugin({ filename: 'css.css', }),
    new CleanWebpackPlugin(),//删除
    new OptimizeCssAssetsWebpackPlugin(),    // 压缩css
  ],
  //^^ 5模式        development  production  
  mode: 'development', // 开发模式
  mode: 'production', //生成模式 会自动压缩代码
  //^^ devServer 开发服务器-----------------------------------------------------------------
  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 安装  npm i webpack-dev-server@3.10.3 -d
  // 启动  devServer指令为：         npx webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, 'build'),   // 运行  项目构建后路径  
    compress: true,   // 启动  gzip压缩  体积更小
    port: 3000,  // 端口号
    open: true,  // 自动打开浏览器
    hot: true,   //hmr功能 hot_module_replacement_模块热替换
  },

  devtool: 'inline-source-map',
  // [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
  /*
  inline-source-map       内联
  hidden-source-map       外部
  eval-source-map         內部
  nosources-source-map    外部
  cheap-source-map        外部
  module-source-map       外部
  */


};
/*

webpack4相关依赖版本
https://blog.csdn.net/ThisEqualThis/article/details/124090739
https://blog.csdn.net/qq_42647547/article/details/125106307


开发环境性能优化
优化打包构建速度   HMR
优化代码调试       source-map


生产环境性能优化
优化打包构建速度        oneOf  babel缓存   多进程打包  externals  * * dll
优化代码运行的性能      缓存(hash-chunkhash-contenthash)      tree shaking  code split       懒加载/预加载   pwa


*/
