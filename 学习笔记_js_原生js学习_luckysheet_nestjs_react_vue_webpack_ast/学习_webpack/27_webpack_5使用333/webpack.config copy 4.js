const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
module.exports = {
  mode: 'development',
  // devtool: 'cheap-source-map',
  // mode: 'production'
  //^^ 入口-------------------------------------------------------------
  entry: {
    popup: './src/popup/index.js',
    // content: './src/content.js'
  },
  //^^ 出口-------------------------------------------------------------
  output: {
    filename: './[name].js',
    path: path.resolve(__dirname, 'dis_君臣论浏览器插件'),
  },
  //^^ 规则-------------------------------------------------------------
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/i,
            loader: 'babel-loader',
            exclude: /node_modules/,  ////打包时间神奇的少了2秒
            options: {
              // presenrts: []
              // 开启babel缓存,第二次构建时,只构建改动的文件,其余直接读取缓存
              cacheDirectory: true
            }
          },
          {
            test: /\.css$/i,
            // use: ["style-loader", stylesHandler,'css-loader'],  //实现样式代码整合在单独一个文件里, 可以取代style-loader
            use: ["style-loader", 'css-loader'],  //实现样式代码整合在单独一个文件里
          },
          {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", 'css-loader', 'sass-loader'],  //实现样式代码整合在单独一个文件里  //添加sassloader
          },
          {
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,   //实现其他文件类型整合在js里而不是带hash输出独立文件
            type: 'asset',
          },

        ]
      },
      {
        test: /.vue$/,
        use: 'vue-loader'
      },
      // 解决引入element-plus打包报错问题
      {
        test: /\.(t|j|mj)s$/,
        include: path.resolve(
          __dirname,
          '../node_modules/element-plus'
        ),
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },


  // pages: {
  //   // background: { entry: 'background/content.js', template: 'background/index.html', filename: 'background.html' },
  //   popup: { entry: './src/popup.js', template: 'bg_popup/index.html', filename: 'bg_popup.html' }
  // },

  //^^ 插件-------------------------------------------------------------
  plugins: [
    //复制  静态文件
    new CopyWebpackPlugin({ patterns: [{ from: './public', to: './public' }] }),
    new CopyWebpackPlugin({ patterns: [{ from: './manifest.json', to: './public' }] }),
    // 删除 自动清除打包文件
    new CleanWebpackPlugin(),


    new VueLoaderPlugin(),   // 引入vue解析插件
  ]


};
