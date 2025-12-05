

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
          {
            test: /\.(js|jsx)$/i,
            loader: 'babel-loader', //调用babelcore把源代码转换成抽象语法树,解析遍历生成,
            exclude: /node_modules/,  ////打包时间神奇的少了2秒
            options: {
              //低版本IE无法读取新的API方法对象,如new Promise--------需要适配则需要使用polyfill------可以直接<script>调用官方自动化包------https://polyfill.io/v3/polyfill.min.js----
              // presenrts: ['@babel/preset-env'],//@babel/preset-env----指示把ES6转换成ES5语法--------
              // 开启babel缓存,第二次构建时,只构建改动的文件,其余直接读取缓存
              cacheDirectory: true,
              //此处自定义按需treeShaking引入----体积减少300k--UI组件和相应css---有问题---------需优化
              // plugins: [["import", {
              //     "libraryName": "vxe-table",
              //     "style": true,   // or 'css'
              //   }]]
            }
          },
          {// **目前是style标签分别注入,且未压缩,需优化压缩整合到同一标签下,若整体css大于150K需再调整成link方式按需引入
            test: /\.css$/i,
            // use: [MiniCssExtractPlugin.loader, 'css-loader'],  //实现样式代码整合在单独一个文件里, 可以取代style-loader
            use: ["style-loader", 'css-loader'],  
          },
          //此处可以引入移动端自适应px2rem-loader
          {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],  //实现样式代码整合在单独一个文件里, 可以取代style-loader
            // use: ["style-loader", 'css-loader','sass-loader'], 
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
  plugins: [
    // new MiniCssExtractPlugin({ filename: '[name].css' }),
    // new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),//删除打包文件夹
    new CopyWebpackPlugin({ patterns: [{ from: './public', to: './public' }] }),
    new VueLoaderPlugin(),
    // ^^饿了么
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        // /\.md$/, // .md
      ],
      imports: [
        // presets
        'vue',

      ],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dirs: ['src'],
      directoryAsNamespace: true,
      // globalNamespaces: [],
      resolvers: [ElementPlusResolver()],
      exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
    }),
  ]


}