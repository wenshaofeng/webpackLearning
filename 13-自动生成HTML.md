# HTML in Webpack

## 为什么要自动生成HTML
通常我们通过 webpack 打包生成的文件名，如果我们没有设置，它通常是不固定的带有hash值的，我们每次都要手动地去插入CSS和JS文件

### 生成 HTML (HtmlWebpackPlugin)
![](https://upload-images.jianshu.io/upload_images/9249356-85bd629d851571b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

主要options 
- template (模板文件,指定模板文件的时候要记得加上相关loader 如本demo中的html-loader)
- filename 文件名
- minify 是否压缩生成的html
- chunks 指定需要打包的文件( 不指定的话，默认会把`entry`中所有的入口文件载入html )
- inject 是否让 HtmlWebpackPlugin 帮助 我们把CSS和JS插入页面

```javascript
 plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",  // 模板文件,指定模板文件的时候要记得加上相关loader 如本demo中的html-loader
      chunks: ["app"], // entry中的app入口才会被打包
      minify: {
        // 压缩选项
        collapseWhitespace: true
      }
    })
  ]

```

![](https://upload-images.jianshu.io/upload_images/9249356-b0983e1b95dc1a87.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- html-webpack-plugin 会自动插入css和js标签，所以不需要我们在模板中手动载入
    1. 修改模板
    2. 在html-webpack-plugin 中加入 `inject:false` 选项

### html-loader

因为我们在`index.html`中引用了`src/assets/imgs/`目录下的静态文件（图片类型）。需要用`url-loader`处理图片，然后再用`html-loader`声明。注意两者的处理顺序，`url-loader`先处理，然后才是`html-loader`处理

```javascript

module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src"]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 10000, // size <= 20KB
              publicPath: "static/",
              outputPath: "static/"
            }
          }
        ]
      }
    ]
},

```

### 其他
[html-loader文档](https://www.webpackjs.com/loaders/html-loader/)
[html-webpack-plugin文档](https://www.webpackjs.com/plugins/html-webpack-plugin/)