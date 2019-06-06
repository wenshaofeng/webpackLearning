## 什么是webpack?
webpack 是前端的一个项目构建工具，它是基于 Node.js 开发出来的一个前端工具；

1. 使用Gulp， 是基于 task 任务的,适合构建小型项目
2. 使用Webpack， 是基于整个项目进行构建的；
    + 借助于webpack这个前端自动化构建工具，可以完美实现资源的合并、打包、压缩、混淆等诸多功能。
    + 根据官网的图片介绍webpack打包的过程
    + [webpack官网](http://webpack.github.io/)

## webpack安装的两种方式
1. 运行`npm i webpack -g`全局安装webpack，这样就能在全局使用webpack的命令
2. 在项目根目录中运行`npm i webpack --save-dev`安装到项目依赖中（webpack最新版为4，教程为3）（--save-dev参数缩写为 -D）`npm i webpack -D`【推荐】
3. ##### [webpack-安装踩坑](https://segmentfault.com/a/1190000014159004)

## webpack的核心概念
![](https://upload-images.jianshu.io/upload_images/9249356-b2f1247e8715eea6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- Entry
  - 代码的入口
  - 打包的入口 
  - 单个或多个

- Output
   - 打包成的文件（bundle）
   - 一个或多个
   - 自定义规则
   - 配合CDN
- Loaders
   - 处理文件
   - 转化为模块
- Plugins
  - 参与打包整个过程
  - 打包优化和压缩
  - 配置编译时的变量
  - 极其灵活
- Resolving 
  - 对项目进行模块解析
  - 将项目跟webpack绑定(因此在 Node 环境下通常要设置环境变量 NODE_ENV)

### Entry
![](https://upload-images.jianshu.io/upload_images/9249356-787b7b9583184038.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Output
![](https://upload-images.jianshu.io/upload_images/9249356-404a380a6f3dc078.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### Loaders
![](https://upload-images.jianshu.io/upload_images/9249356-c70b35c518a1a6d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Plugins
![](https://upload-images.jianshu.io/upload_images/9249356-7c3f200bfa79a813.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Resolving

![](https://upload-images.jianshu.io/upload_images/9249356-b261069c1b0fd1f4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## webpack的基本使用
**打包文件**
1. 建立了目录结构后，使用npm安装jQuery：` npm init -y` 然后`npm i jquery -S`
2. .写main.js后， 输入命令编译js，`webpack .\src\main.js -o .\dist\bundle.js`
![](https://upload-images.jianshu.io/upload_images/9249356-184525a9dc0ab122.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>一些bug
##### [解决：Error: Cannot find module 'webpack'](https://blog.csdn.net/lwpoor123/article/details/81186929)
##### [运行webpack报错：Cannot read property 'presetToOptions' of undefined](https://segmentfault.com/q/1010000015550485)
##### [Webpack 3.X - 4.X 升级记录](https://blog.csdn.net/qq_16559905/article/details/79404173)
##### [webpack打包错误 ERROR in multi ./src/main.js ./dist/bundle.js](https://www.jianshu.com/p/a55fb5bf75e1)

## webpack基本配置
- ##### webpack.config.js
![](https://upload-images.jianshu.io/upload_images/9249356-f65c28cced16d77d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- ##### webpack-dev-server
为了实现自动打包，监听代码变化
![](https://upload-images.jianshu.io/upload_images/9249356-47ae6c989f22df45.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可能遇到的问题
![](https://upload-images.jianshu.io/upload_images/9249356-ad2b7d0f70492e2b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**解决方案**

![](https://upload-images.jianshu.io/upload_images/9249356-6c28e94f538ba0db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### webpack-dev-server配置命令的方式

![](https://upload-images.jianshu.io/upload_images/9249356-f3f6bca03e7dcb43.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- `--open` 自动打开浏览器
- `--port 8000` 指定端口
- `--contentBase src` 内容的根路径
- `--hot` 热重载热更新（不重新生成bundle.js，只生成补丁代码），实现浏览器不刷新重载（否则会页面整体刷新）



## html-webpack-plugin插件
在内存中生成html页面的插件
### 安装

1.`npm i html-webpack-plugin -D`       2.在webpack.config.js导入插件
3.配置
![](https://upload-images.jianshu.io/upload_images/9249356-c7607318c6c6f0df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 优点

- 指定生成页面的名称，重名即可，会自动访问同名的内存的页面。
- 当使用 html-webpack-plugin之后，不再需要手动处理bundle.js的引用路径， 因为插件自动创建了一个合适的 script, 并引用了正确的路径
