
## 提取CSS
### extract-text-webpack-plugin
>需要注意，在安装插件的时候，应该安装针对v4版本的extract-text-webpack-plugin。npm 运行如下命令：npm install --save-dev extract-text-webpack-plugin@next

#### 提取CSS
```javascript
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        loader: "sass-loader"
     }
    ]
})
------------------------------
plugins: [
    new ExtractTextPlugin({
      filename: "[name].min.css", //提取出来的CSS
       // 只包括初始化css, 不包括异步加载的CSS,将初始加载和异步加载的CSS区分开
      allChunks: false
  ]
```
>**注意 1**：`allChunks`项需要设置为false，否则会包括异步加载的 CSS ！
配置后，CSS就被单独提取出来，CSS不会自动加载到HTML中，需要手动加载

![](https://upload-images.jianshu.io/upload_images/9249356-d08658cc22a5953f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>**注意2** : SCSS引用和懒加载 
在webpack v4 中
在项目入口文件app.js中，针对使用`extract-text-webpack-plugin` 提取 scss 懒加载，需要引入以下配置代码：
```javascript
import "style-loader/lib/addStyles";
import "css-loader/lib/css-base";
```
### mini-css-extract-plugin
#### [webpack4 mini-css-extract-plugin](https://www.cnblogs.com/ysk123/p/9990082.html)

将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap

只能用在webpack4中，对比另一个插件 extract-text-webpack-plugin有点:

- 异步加载
- 不重复编译，性能更好
- 更容易使用
- 只针对CSS
- 目前缺失功能，HMR。

>这个插件应该只用在 `production` 配置中，并且在loaders链中**不使用**`style-loader`, 特别是在开发中使用HMR，因为这个插件暂时不支持HMR
```javascript
plugins: [
    /* new ExtractTextPlugin({
      filename: "[name].min.css", //提取出来的CSS
      // 只包括初始化css, 不包括异步加载的CSS,将初始加载和异步加载的CSS区分开
      allChunks: false
    }) */

    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: '[name].min.css',
      chunkFilename: 'nice.css',
    }),
  ]

  ---------------------------------------------
  use: [
          // {
          //   loader: "style-loader",
          //   options: {
          //     singleton: true,
          //   }
          // },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              minimize: true
            }
          },
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
              ]
            }
          },
          {
            loader: "sass-loader"
          }
        ]
```
#### production 阶段进行压缩
webpack5可能会内置CSS 压缩器，webpack4需要自己使用压缩器，可以使用 `optimize-css-assets-webpack-plugin` 插件。 设置 `optimization.minimizer` 覆盖webpack默认提供的
![](https://upload-images.jianshu.io/upload_images/9249356-3f50328236210418.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```javascript
 optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  }
```
使用后:
![](https://upload-images.jianshu.io/upload_images/9249356-834f5d662bd70ae6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## PostCSS 

![](https://upload-images.jianshu.io/upload_images/9249356-7d2fac0128c4a5c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>安装 
postcss
postcss-loader
Autoprefixer
postcss-cssnext  
cssnano

```
{
  "devDependencies": {
    "autoprefixer": "^9.4.3",
    "css-loader": "^1.0.0",
    "cssnano": "^4.1.8",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "node-sass": "^4.9.2",
    "postcss": "^7.0.7",
    "postcss-cssnext": "^3.1.0",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^7.0.3",
    "style-loader": "^0.21.0",
    "webpack": "^4.16.0"
  }
}

```
![](https://upload-images.jianshu.io/upload_images/9249356-4676822e1f5d434f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>引入postcss

```javascript
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
```
![](https://upload-images.jianshu.io/upload_images/9249356-c2fbd40c6fdd1ee5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
>postcss-loader 需要放在 css-loader 和 一些CSS预处理语言loader 如 sass-loader 之间