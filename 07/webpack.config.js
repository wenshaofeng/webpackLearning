/**
 * 1. webpack4下安装extract-text-webpack-plugin: npm install --save-dev extract-text-webpack-plugin@next
 * 2. webpack4下的scss懒加载: 详情见 './src/app.js'
 */
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          // 对于不提取为单独文件的css样式的loader
          fallback: {
            loader: "style-loader",
            options: {
              singleton: true,
            }
          },
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss', //表明插件是给postcss用的
                plugins: [
                  require('autoprefixer')(),
                  require('postcss-cssnext')()
                ]
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].min.css", //提取出来的CSS
      // 只包括初始化css, 不包括异步加载的CSS,将初始加载和异步加载的CSS区分开
      allChunks: false
    })
  ]
};
