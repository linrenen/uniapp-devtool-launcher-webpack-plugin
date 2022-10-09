# 一、插件介绍
用于uniapp项目自动打开第三方开发者工具的插件

# 二、插件使用
## 1. 安装
```shell
npm install uniapp-devtool-launcher-webpack-plugin --save-dev
```

## 2. 插件引用
```js
// vue.config.js
const UniappDevtoolLauncherWebpackPlugin = require("uniapp-devtool-launcher-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new UniappDevtoolLauncherWebpackPlugin()
    ]
  }
}
```

## 3. 设置环境变量
设置 **UNI_WEIXIN_DEV_TOOL_PATH** 为微信开发者工具路径。 例：**UNI_WEIXIN_DEV_TOOL_PATH=D:\Program Files (x86)\Tencent\微信web开发者工具**
设置 **UNI_APLIPAY_DEVTOOL_PATH** 为支付宝小程序开发者工具路径。

