/**
 * 1. url-loader: 处理图片, Base64编码
 * 2. img-loader: 压缩图片. 不同类型的图片配合不同的插件, 例如: png配合imagemin-pngquant
 * 3. postcss-loader 与 postcss-sprites: 合成雪碧图, 减小HTTP请求. 注意合成后的图片文件大小.
 */
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let extractTextPlugin = new ExtractTextPlugin({
  filename: "[name].min.css",
  allChunks: false
});

// let spritesConfig = {
//   spritePath: "./dist/static"
// };

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
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: "[name]-[hash:5].min.[ext]",
              publicPath: "dist/",
              outputPath: "dist/",
              limit: 15360  // <15kb 的图片会被转换为 base64 编码格式
            }
          }
          // {
          //   loader: "url-loader",
          //   options: {
          //     name: "[name]-[hash:5].min.[ext]",
          //     limit: 10000, // size <= 20KB
          //     publicPath: "static/",
          //     outputPath: "static/"
          //   }
          // },
          // {
          //   loader: "img-loader",
          //   options: {
          //     plugins: [
          //       require("imagemin-pngquant")({
          //         quality: "80"
          //       })
          //     ]
          //   }
          // }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: "style-loader"
          },
          use: [
            {
              loader: "css-loader"
            },
            // 雪碧图
            // {
            //   loader: "postcss-loader",
            //   // options: {
            //   //   ident: "postcss",
            //   //   plugins: [require('autoprefixer')(),]
            //   //   // plugins: [require("postcss-sprites")(spritesConfig)]
            //   // }
            // }
          ]
        })
      }
    ]
  },
  plugins: [extractTextPlugin]
};
