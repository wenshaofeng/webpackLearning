## Tree Shaking
![](https://upload-images.jianshu.io/upload_images/9249356-0f42fb56bda8718c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### JS 的 Tree Shaking
>JS 的 `Tree Shaking` 依赖的是 ES2015 的模块系统（比如：`import`和 `export`）

#### 不再需要`UglifyjsWebpackPlugin`
在`webpack v4` 中，不再需要配置`UglifyjsWebpackPlugin`,
只需要配置`mode`为"production"，即可显式激活 `UglifyjsWebpackPlugin` 插件。

**注意**：根据版本不同，更新的`webpack v4.x`**不配置`mode`也会自动激活插件**

>production 模式下，由于提供了splitChunks和minimize，所以基本零配置，代码就会自动分割、压缩、优化，同时 webpack 也会自动帮你 Scope hoisting 和 Tree-shaking。

#### Tree Shaking第三方库


>例子 lodash 库
```javascript
import { chunk } from "lodash";
console.log(chunk([1, 2, 3], 2));

```
![](https://upload-images.jianshu.io/upload_images/9249356-85deef58400e3d52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```javascript
import { chunk } from "lodash-es";
console.log(chunk([1, 2, 3], 2));

```
![](https://upload-images.jianshu.io/upload_images/9249356-2264153cc456b560.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

js tree shaking 利用的是 es 的模块系统。而 lodash.js 没有使用 CommonJS 或者 ES6 的写法。所以第一种打包并没有tree shaking成功，需安装库对应的模块系统lodash-es 
——`npm install lodash-es --save`。

>注意

第三方库注意其是不是有es或者common规范对应的版本: lodash和lodash-es