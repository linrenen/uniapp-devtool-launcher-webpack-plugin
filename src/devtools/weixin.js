const fs = require("fs")
const os = require('os')
const child_process = require("child_process")

class Weixin {
  launch() {
    let os_type = os.type()
    let isWin = os_type === 'Windows_NT'
    if (os_type !== 'Windows_NT' && os_type !== 'Darwin') return

    let weixinDevToolPath = process.env.UNI_WEIXIN_DEVTOOL_PATH;

    if (weixinDevToolPath) {
      if (isWin) weixinDevToolPath += "/cli.bat"
      else weixinDevToolPath += "/Contents/MacOS/cli"
    }

    if (!fs.existsSync(weixinDevToolPath)) {
      if (os_type === 'Windows_NT') weixinDevToolPath = "C:/Program Files (x86)/Tencent/微信web开发者工具/cli.bat"
      else if (os_type === 'Darwin') weixinDevToolPath = "/Applications/wechatwebdevtools.app/Contents/MacOS/cli"
    }

    if (!fs.existsSync(weixinDevToolPath)) return

    let cmd = ''
    if (isWin) {
      child_process.execSync('chcp 65001')
      cmd = `"${weixinDevToolPath}" open  --project "${process.env.UNI_OUTPUT_DIR}"`
    } else {
      cmd = `${weixinDevToolPath} open  --project "${process.env.UNI_OUTPUT_DIR}"`
    }

    child_process.exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error('启动微信开发者工具失败', error)
        return
      }
      console.log('正在启动微信开发者工具')
    })
  }
}


module.exports = Weixin