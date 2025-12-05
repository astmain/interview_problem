//通过node获取到当前文件的位置
const path = require('path')

//在vue-loader中拿到VueLoaderPlugin函数
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  //设置当前入口文件
  entry: {
    popup: './src/popup/index.js',
    background: './src/background/index.js'
  },
  //出口配置
  output: {
    filename: './[name].js',
    path: path.resolve(__dirname, 'dis_君臣论浏览器插件'),
    // template: './[name].html', 
  },
  module: {
    rules: [
      {
        //转换文件格式
        test: /\.vue$/,
        //文件打包方式
        use: ["vue-loader"]
      },
      {
        //转换文件格式
        test: /\.css$/,
        //文件打包方式
        use: ["style-loader", "css-loader"]
      },
      {
        //转换文件格式
        test: /\.js$/,
        //文件打包方式
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        //转换文件格式
        test: /\.(png|jpg|svg|gif)$/,
        //文件打包方式
        type: "asset",
        generator: {
          filename: `./assets/[contenthash][ext]`
        }
      }
    ]
  },
  //webpack插件配置
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: './public', to: './' }] }),
    new CopyWebpackPlugin({ patterns: [{ from: './manifest.json', to: './' }] }),
    new CleanWebpackPlugin(),
  ],
}
