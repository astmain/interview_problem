//通过node获取到当前文件的位置
const path = require('path')
const webpack = require('webpack')
//在vue-loader中拿到VueLoaderPlugin函数
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',    //inline-source-map        cheap-source-map
  //设置当前入口文件
  entry: {
    background: './src/background/background.js',
    content: './src/content.js',
    inject: './src/inject.js'
  },
  //出口配置
  output: {
    filename: './[name].js',
    path: path.resolve(__dirname, 'dist_君臣论浏览器插件'),
    // template: './[name].html', 
  },
  //webpack插件配置
  plugins: [

    new CopyWebpackPlugin({ patterns: [{ from: './public', to: './' }] }),
    new CopyWebpackPlugin({ patterns: [{ from: './manifest.json', to: './' }] }),
    new CleanWebpackPlugin(),//删除打包文件夹
    new MiniCssExtractPlugin(),  // css文件打包
    //实现elementplus自动按需加载-----以及任何其他自定义引入的自动按需引入-------
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/,], // .ts, .tsx, .js, .jsx          // .vue         // /\.md$/, // .md
      imports: ['vue',],   // presets
      resolvers: [ElementPlusResolver()],
    }),
    // elementplus自动按需加载
    Components({
      dirs: ['src'],
      directoryAsNamespace: true,
      // globalNamespaces: [],
      resolvers: [ElementPlusResolver()],
      exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
    }),

    new webpack.ProvidePlugin({  // 在全局环境中注入jquery
      $: 'jquery',
      jq: 'jquery',
      'window.jq': 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      'aaa.$': 'jquery'
    }),
    ////可以定义全局上下文的变量  此处解决vue未定义extension大量报错问题
    new webpack.DefinePlugin({

      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),

    new HtmlWebpackPlugin({ template: './src/popup/popup.html', filename: './popup.html', chunks: ['content'], inject: 'body', }),
    new VueLoaderPlugin(),
  ],

  module: {
    rules: [
      {
        oneOf: [
          {  //将库(函数)挂载暴露到外部window-----------
            test: require.resolve("jquery"),
            loader: "expose-loader",
            options: {
              exposes: ["$", "jQuery"],
            },
          },
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
            use: [MiniCssExtractPlugin.loader, 'css-loader'],  //实现样式代码整合在单独一个文件里, 可以取代style-loader
            // use: ["style-loader", 'css-loader'],  
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
          './node_modules/element-plus'
        ),
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },

  //^^dev_serve------------------------------
  devServer: {
    // contentBase: path.join(__dirname, 'xzz2022'),   // 告诉服务器从哪里提供内容(默认当前工作目录)
    // static: {
    //     directory: path.join(__dirname, 'xzz2022'), 
    //   },  // 告诉服务器从哪里提供内容(默认当前工作目录)
    host: 'localhost', // 默认localhost,想外部可访问用'0.0.0.0'
    port: 8888, // 默认8080
    // inline: true, // 可以监控js变化
    hot: false, // 热启动,,对注入的content无任何作用,所以关闭
    open: true, // 启动时自动打开浏览器（指定打开chrome，open: 'Google Chrome'）
    // open: {
    //   // app: {
    //   //   name: 'chrome',//启动后打开指定的宿主机应用,,,,---指定软件,浏览器
    //   // },
    //   // target: ['index.html', 'https://tmall.com'],//启动后打开指定页面
    // },
    compress: true, // 一切服务都启用gzip 压缩
    // allowedHosts: ["localhost.com"], //必须加上此行,不然webpack安全策略在非监听页面会一直报错
    allowedHosts: 'auto', //必须加上此行,不然webpack安全策略在非监听页面会一直报错-----------auto会自动引入所监听的url
    client: {
      reconnect: false,   //不会尝试重新连接///不然非监听页会一直报错
    },
    devMiddleware: {
      writeToDisk: true,
    },
    //  clientLogLevel: 'none',  // 不显示启动服务日志信息
    //  quite: true,   //控制台只显示基本信息
    //  before(app,server,compiler) {reloadServer(app,compiler)} //监听文件改动
    // stats: { // 设置控制台的提示信息
    //   chunks: false,
    //   children: false,
    //   modules: false,
    //   entrypoints: false, // 是否输出入口信息
    //   warnings: false,
    //   performance: false, // 是否输出webpack建议（如文件体积大小）
    // },
    // 侦听端口链接 执行自定义函数
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      console.log('--------侦听端口链接 执行自定义函数-----')
      // sendSSE()
      // const port = devServer.server.address().port;
      // console.log('Listening on port:', port);
    },
    // proxy: { // 本地地址和上线地址api不一致,则可以设置重写,接口代理（这段配置更推荐：写到package.json，再引入到这里）
    //   "/api-dev": {
    //     "target": "http://api.test.xxx.com",
    //     "secure": false,
    //     "changeOrigin": true,
    //     "pathRewrite": { // 将url上的某段重写（例如此处是将 api-dev 替换成了空）
    //       "^/api-dev": ""
    //     }
    //   }
    // }
  }
}


console.log('1111111111>222:', path.resolve(__dirname, './node_modules/element-plus'))