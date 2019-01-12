## webpack-dev-server
功能：
- live reloading (项目里文件更改了，它会自动刷新浏览器===>实时重新加载)
- 打包文件？ No (整体打包的文件实际上运行在内存中，在本地的dist目录中是找不到的)
- 路径重定向
- 搭建本地的服务器，从而做到本地调试、开发
- 支持 https
- 浏览器中显示编译错误
- 接口代理
- 模块热更新(Hot Module Replacement ===> HMR) (HMR 不适用于生产环境，这意味着它应当只在开发环境使用。)

### 使用webpack-dev-server
方式一：`node_modules/.bin/webpack-dev-server --open`

方式二：在package.json中配置 npm script 
```json
"scripts": {
    "dev": "webpack-dev-server --open"
  }

```

### 为什么需要开发模式？

之前如果我们都没有指定参数`mode`。那么执行`webpack`进行打包的时候，`mode`会自动设置为`production`(生产模式)，但是控制台会爆出`warning`的提示。而开发模式就是指定`mode`为`development`。

在开发模式下，我们需要对代码进行调试。对应的配置就是：`devtool`设置为`source-map`。在非开发模式下，需要关闭此选项，以减小打包体积。

在开发模式下，还需要热重载、路由重定向、挂代理等功能，`webpack4`已经提供了`devServer`选项，启动一个本地服务器，让开发者使用这些功能。

### devServer
![](https://upload-images.jianshu.io/upload_images/9249356-63e36f9982c09be9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- inline  模式 
- contentBase 提供内容的路径
- port 监听的本地服务器的端口
- historyApiFallback 
- https  
- proxy 远程接口代理 (实际上它集成了第三方包 `http-proxy-middleware`)
- hot   指定模块热更新 如：vue-loader 和 react相关的loader 就支持模块热更新
- openpage 最先打开的页面
- lazy  在多页面中很有用
- overlay   遮罩：webpack-dev-server 提供的错误提示,会在浏览器的遮罩上直接显示出编译的错误



### 模块热更新(HMR)
>简介：模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：
- 保留在完全重新加载页面时丢失的应用程序状态。
- 只更新变更内容，以节省宝贵的开发时间。
- 调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。
- 实际上在做项目的时候，module.hot 的实现大多数情况下都是相关的loader帮助我们实现的，所以我们得以专注于我们的业务代码
**热重载是在文件内容被修改时，在不刷新页面的情况下替换**

#### 其他代码和框架 
社区还有许多其他 loader 和示例，可以使 HMR 与各种框架和库(library)平滑地进行交互……

- React Hot Loader：实时调整 react 组件。
- Vue Loader：此 loader 支持用于 vue 组件的 HMR，提供开箱即用体验。
- Elm Hot Loader：支持用于 Elm 程序语言的 HMR。
- Redux HMR：无需 loader 或插件！只需对 main store 文件进行简单的修改。
- Angular HMR：No loader necessary! A simple change to your main NgModule file is all that's required to have full control over the HMR APIs.没有必要使用 loader！只需对主要的 NgModule 文件进行简单的修改，由 HMR API 完全控制。

#### api
- module.hot
- module.hot.accept
- module.hot.decline

### 开发环境-开启调试Source Map

#### 为什么要使用Source Map ？

当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。这并通常没有太多帮助，因为你可能需要准确地知道错误来自于哪个源文件。

为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你。也就是说在浏览器进行调试的时候，它可以告诉开发者原来哪个js文件出错了

**注意**：在使用Source Map 的时候，在相关的loader中也需要进行相关的配置
如：
![CSS Source Map](https://upload-images.jianshu.io/upload_images/9249356-207e72db64b2e1b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### Devtool
![](https://upload-images.jianshu.io/upload_images/9249356-f89f3d13a9c918ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- Development (开发环境)
    1. eval
    2. eval-source-map
    3. cheap-eval-source-map
    4. cheap-module-eval-source-map
- Production (生产环境)
    1. source-map
    2. hidden-source-map
    3. nosource-source-map

![速度表](https://upload-images.jianshu.io/upload_images/9249356-97963e3e5a089eb6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### EsLint 检查代码格式

安装：
eslint 
eslint-loader
eslint-plugin-html (在html的标签里使用JS)
eslint-friendly-formatter (错误输出时的格式化)

配置ESlint

方式一：
webpack config 
.eslintrc.*

方式二：
webpack config 
package.json 中的 eslintConfig

定义规则：
![](https://upload-images.jianshu.io/upload_images/9249356-92ce389e6e5671ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
