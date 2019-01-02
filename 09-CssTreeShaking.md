## CSS Tree Shaking
随着 webpack 的兴起，css 也可以进行 Tree Shaking： 以去除项目代码中用不到的 CSS 样式，仅保留被使用的样式代码。

### 为 CSS Tree Shaking 功能创造环境

1. src/css/base.css 中 ,编写3个样式类，但只在实际代码中使用.box和.box--big这两个类
2. 为了贴合实际，其中一个类是DOM操作添加的DOM元素的类，一个是初次渲染就有的类
3. 观察CSS Tree Shaking后情况是否符合我们的预期
src/css/base.css
```css
html {
  background: red;
}

.box {
  height: 200px;
  width: 200px;
  border-radius: 3px;
  background: green;
}

.box--big {
  height: 300px;
  width: 300px;
  border-radius: 5px;
  background: red;
}

.box-small {
  height: 100px;
  width: 100px;
  border-radius: 2px;
  background: yellow;
}

```
/src/app.js
```javascript

import base from "./css/base.css";

var loaded = false;
window.addEventListener("click", function () {
    if (!loaded) {
        var app = document.getElementById("app");
        var div = document.createElement("div");
        div.className = "box";
        app.appendChild(div);
        console.log('添加元素');

        loaded = !loaded;
    }
})

```

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="./dist/app.min.css">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <div class="box-big"></div>
  </div>
  <script src="./dist/app.bundle.js"></script>
</body>
</html>
```

### CSS Tree Shaking 的工具

- PurifyCSS →进行CSS Tree Shaking的操作
- glob-all →帮助PurifyCSS进行路径处理，定位要做Tree Shaking的路径文件

#### 来看看`webpack.config.js`配置文件
>加入的配置
```javascript
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");

let purifyCSS = new PurifyCSS({
  paths: glob.sync([
    // 要做CSS Tree Shaking的路径文件
    path.resolve(__dirname, "./*.html"),
    path.resolve(__dirname, "./src/*.js")
  ])
});
```
>完整配置
```javascript
const path = require("path");
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let purifyCSS = new PurifyCSS({
  paths: glob.sync([
    // 要做CSS Tree Shaking的路径文件
    path.resolve(__dirname, "./*.html"),
    path.resolve(__dirname, "./src/*.js")
  ])
})

let miniCssExtractPlugin = new MiniCssExtractPlugin({
  // 类似 webpackOptions.output里面的配置 可以忽略
  filename: '[name].min.css',
  chunkFilename: 'nice.css',
})

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
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              minimize: true
            }
          },
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  plugins: [miniCssExtractPlugin, purifyCSS]
};

```


打包过后，可以看到打包后的css文件中去掉了没有用到的样式类
![](https://upload-images.jianshu.io/upload_images/9249356-564600035367c015.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
