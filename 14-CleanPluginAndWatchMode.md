## 搭建开发环境

![](https://upload-images.jianshu.io/upload_images/9249356-e6165d4c343e5316.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

搭建开发环境的目的：在本地开启一个服务器启动项目，模拟线上运行环境

## 什么是`Clean Plugin`和 `Watch Mode`？
在实际开发中，由于需求变化，会经常改动代码，然后用 `webpack` 进行打包发布。由于改动过多，我们`/dist/`目录中会有很多版本的代码堆积在一起，乱七八糟。`webpack` 会生成文件，然后将这些文件放置在 `/dist` 文件夹中，但是 `webpack` 无法追踪到哪些文件是实际在项目中用到的。

为了让打包目录更简洁，这时候需要`Clean Plugin`，在每次打包前，自动清理`/dist/`目录下的文件,这样只会生成用到的文件。

除此之外，借助 `webpack` 命令本身的命令参数，可以开启`Watch Mode`：监察你的所有文件,任一文件有所变动,它就会立刻重新自动打包。

```javascript
plugins: [
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./index.html",
        chunks: ["app"]
    }),
    new CleanWebpackPlugin(["dist"]) //每次打包前清除指定文件夹下的文件
]
```
>`CleanWebpackPlugin`参数传入数组，其中每个元素是每次需要清空的文件目录。
CMD 运行 `webpack -w --progress --display-reasons --color`: 开启watch模式, 并且可以清晰地看到打包过程

>**注意**：应该把`CleanWebpackPlugin`放在`plugin`配置项的**最后一个**，因为 webpack 配置是**倒序**的（最后配置的最先执行）。以保证每次正式打包前，先清空原来遗留的打包文件。

![](https://upload-images.jianshu.io/upload_images/9249356-1cc83c98f4755590.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

执行`webpack`打包，在控制台会首先输出一段关于相关文件夹已经清空的的提示，

`watch Mode` 下 , 虽然可以监听文件的变更重新打包，但是`CleanWebpackPlugin` 只会在最开始打包的那一次清除`/dist/`目录下上一次打包的文件，后续变更时,`/dist/`还是会产生多余的文件

![](https://upload-images.jianshu.io/upload_images/9249356-2263cf6aee6ffdd3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 附
如果配置文件在 `build` 目录内，那么 `new CleanWebpackPlugin(['../dist'])` ，会提示 dist is outside of the project root，因为 `CleanWebpackPlugin` 插件会认为 `webpack.config.js` 所在的目录为项目的根目录。这时需要为 `CleanWebpackPlugin`传第二个参数：

```javascript
new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
    root: path.resolve(__dirname, '../'),    // 设置root
    verbose: true
})

```