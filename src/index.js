const Weixin = require("./devtools/weixin");
const Alipay = require("./devtools/alipay");

const devtools = {
  'mp-weixin': new Weixin(),
  'mp-alipay': new Alipay(),
}


class UniappDevtoolLauncherWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('UniappDevtoolLauncherWebpackPlugin',
      (stats) => {
        if (process.env.NODE_ENV !== "development") return

        let devtool = devtools[process.env.UNI_PLATFORM]
        if (!devtool) return
        devtool.launch()
      }
    )
  }
}

module.exports = UniappDevtoolLauncherWebpackPlugin