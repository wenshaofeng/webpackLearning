
module.exports = {
  entry: {
    app: './app.js'
  },
  output: {
    filename: "[name][hash:5].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: {
          loader: "babel-loader" // 转化需要的loader
          // options选项配置在: .babelrc
          // options: {
          //   ...
          // }
        }
      }
    ]
  }

}