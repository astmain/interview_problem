console.log('1111111111111111111111111>222:',  path.resolve(__dirname, 'dist'))

module.exports = {  
    // 入口文件
    entry:"./src/main.js",
    output: { 
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    console.log('1111111111111111111111111>222:',  path.resolve(__dirname, 'dist'))
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
    }
          {
            test: /\.css$/,
            use: ['style-loader','css-loader']
          },
          {
          	// ## 主要是这一段
              test: /\.(jpg|png|svg|ttf)$/,
              use: 'url-loader'
          }
        ]
      }
}
