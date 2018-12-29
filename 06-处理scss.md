 ## 安装相应的loader

 ## `webpack.config.js` 中配置 
 
 > 注意：`use`表示使用哪些模块来处理`test`所匹配到的文件；`use`中相关loader模块的调用顺序是从后向前调用的；
 ```javascript
 module: {
    rules: [
      {
        test: /\.scss$/,
        // 注意 loader 顺序
        use: [
          {
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: "sass-loader" // 将 Sass 编译成 CSS
          }
        ]
      }
    ]
  }
```