

const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// ^^饿了么
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


console.log('111>222:', __dirname)
console.log('222>222:', path.resolve(__dirname, 'dist_君臣论浏览器插件1222'))

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',    //inline-source-map        cheap-source-map          cheap-module-source-map
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: './[name].js',
    path: __dirname + "/dist_君臣论浏览器插件222",


  },
  module: {
    rules: [
      {
        oneOf: [
          { test: /\.(js|jsx)$/i, loader: 'babel-loader', exclude: /node_modules/, options: { cacheDirectory: true, } },
          { test: /\.css$/i, use: ["style-loader", 'css-loader'], },
          { test: /\.s[ac]ss$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], },
          { test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i, type: 'asset', },
        ]
      },
      { test: /.vue$/, use: 'vue-loader' },
      { test: /\.(t|j|mj)s$/, include: path.resolve(__dirname, '../node_modules/element-plus'), resolve: { fullySpecified: false, }, },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),//删除打包文件夹
    new CopyWebpackPlugin({ patterns: [{ from: './public', to: './public' }] }),
    new VueLoaderPlugin(),
    // ^^饿了么
    AutoImport({ resolvers: [ElementPlusResolver()], }),
    Components({ resolvers: [ElementPlusResolver()], }),
  ]


}