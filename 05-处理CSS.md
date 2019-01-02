## 准备工作
CSS 在 HTML 中的常用引入方法有`<link>`标签和`<style>`标签两种，所以这次就是结合 webpack 特点实现以下功能：

- 将 css 通过 link 标签引入
- 将 css 放在 style 标签里
- 动态卸载和加载 css
- 页面加载 css 前的transform

## 处理CSS
- 引入
- CSS modules
- 配置 less/sass
- 提取CSS代码

### 引入CSS
`style-loader`和 `css-loader`
#### `style-loader`
>   1 style-loader  
    2 style-loader/url
    3 style-loader/useable

##### 1.通过`<link>`标签引入 CSS
>link 标签通过引用 css 文件，所以需要借助file-loader来将 css 处理为文件。 
```javascript
module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,     
        // css处理为link标签
        use: [
          {
            loader: "style-loader/url"
          },
          {
            loader: "file-loader"
          }
        ] 
      }
    ]
  }
};
```
>打包出来有CSS文件 ,通过link引入样式 
 缺点：css文件多了，会有多个link，http请求变多
![](https://upload-images.jianshu.io/upload_images/9249356-ddd654c916a70282.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/9249356-f3f2d245d488d481.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##### 2. 通过`<style>` 标签引入
```javascript
module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 1 CSS-loader
        use: [
          {
            loader : "style-loader"
          },
          {
            loader : "css-loader"
          }
        ]
      }
    ]
  }  
}
```
![](https://upload-images.jianshu.io/upload_images/9249356-f58f77f9be165361.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 优点 ： 可以减少网络请求次数，加快响应时间 ，但注意在老式浏览器中，对`style`标签的数量是有要求的。

##### 3.动态卸载和加载CSS 
```javascript
//webpack.config.js
use: [
      {
        loader : "style-loader/useable"
      },
      {
        loader : "css-loader"
      }
    ]

// app.js
import base from "./css/base.css"; // import cssObj from '...'
var flag = false;
setInterval(function() {
  // unuse和use 是 cssObj上的方法
  if (flag) {
    base.unuse();
  } else {
    base.use();
  }
  flag = !flag;
}, 500);
```
>style - loader / useable：
 可以直接使用use()或者unuse()方法来加载 / 卸载CSS样式

##### 其他配置项
{
  loader: "style-loader",
  options: {
    singleton: true, // 处理为单个style标签
    transform:"./css.transform.js"
  }
},

>`transform` 是一个函数，可以在通过 style-loader 加载到**页面之前**修改 css(不是在打包的时候执行)。 该函数将在即将加载的 css 上调用，函数的返回值将被加载到页面，而不是原始的 css 中。 如果 transform 函数的返回值是 falsy 值，那么 css 根本就不会加载到页面中。
```javascript
//css.transform.js
module.exports = function(css) {
  console.log(css);
  return window.innerWidth < 1000 ? css.replace("red", "green") : css;
};

```


#### `css-loader`

![](https://upload-images.jianshu.io/upload_images/9249356-ff51cc74ce2368ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```

{
  loader: "css-loader",
  options: {
    minimize: true // css代码压缩

  }
}
```

##### 补充：minimize已经失效，改用 mini-css-extract-plugin
```javascript
{
loader: “css-loader”,
options: {
minimize: true // css代码压缩
}
}
minimize已经失效，改用 mini-css-extract-plugin
```