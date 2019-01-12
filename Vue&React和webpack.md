## Vue 和 webpack

### vue-cli 

#### 2.0+
build: 打包相关的文件夹
config：生产环境、开发环境、测试环境 相关的配置
test： 关于测试的文件夹，e2e是端到端、unit是单元测试

### vue-loader中的热重载

#### 状态保留规则：
- 当编辑一个组件的 `<template>` 时，这个组件实例将就地重新渲染，并保留当前所有的私有状态。能够做到这一点是因为模板被编译成了新的无副作用的渲染函数。

- 当编辑一个组件的 `<script>` 时，这个组件实例将就地销毁并重新创建。(应用中其它组件的状态将会被保留) 是因为 `<script>` 可能包含带有副作用的生命周期钩子，所以将重新渲染替换为重新加载是必须的，这样做可以确保组件行为的一致性。这也意味着，如果你的组件带有全局副作用，则整个页面将会被重新加载。

- `<style>` 会通过 `vue-style-loader` 自行热重载，所以它不会影响应用的状态。

#### 关闭热重载

热重载默认是开启的，除非遇到以下情况：

- webpack 的 `target` 的值是 `node` (服务端渲染)
- webpack 会压缩代码
- `process.env.NODE_ENV === 'production'`
你可以设置 `hotReload: false` 选项来显式地关闭热重载：

```javascript
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        hotReload: false // 关闭热重载
      }
    }
  ]
}
```