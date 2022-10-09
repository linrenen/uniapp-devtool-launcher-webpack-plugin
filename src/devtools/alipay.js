const fs = require("fs")
const os = require('os')
const child_process = require("child_process")

function isRunning(win, mac, linux) {
  return new Promise(function (resolve, reject) {
    const plat = process.platform
    const cmd = plat === 'win32' ? 'tasklist' : (plat === 'darwin' ? 'ps -ax | grep ' + mac : (plat === 'linux' ? 'ps -A' : ''))
    const proc = plat === 'win32' ? win : (plat === 'darwin' ? mac : (plat === 'linux' ? linux : ''))
    if (cmd === '' || proc === '') {
      resolve(false)
    }
    if (plat === 'win32')
      child_process.execSync('chcp 65001')
    child_process.exec(cmd, function (err, stdout, stderr) {
      resolve(stdout.toLowerCase().indexOf(proc.toLowerCase()) > -1)
    })
  })
}

class Alipay {
  async launch() {
    let os_type = os.type()
    let isWin = os_type === 'Windows_NT'
    if (os_type !== 'Windows_NT' && os_type !== 'Darwin') return

    let isRuning = await isRunning('小程序开发者工具.exe', '小程序开发者工具', '小程序开发者工具')
    if (isRuning) return

    let weixinDevToolPath = process.env.UNI_APLIPAY_DEVTOOL_PATH;

    if (weixinDevToolPath) {
      if (isWin) weixinDevToolPath += "/小程序开发者工具.exe"
      else weixinDevToolPath += "/Contents/MacOS/小程序开发者工具"
    }

    if (!fs.existsSync(weixinDevToolPath)) {
      if (os_type === 'Windows_NT') weixinDevToolPath = "C:/Program Files/小程序开发者工具/小程序开发者工具.exe"
      else if (os_type === 'Darwin') weixinDevToolPath = "/Applications/小程序开发者工具.app/Contents/MacOS/小程序开发者工具"
    }

    if (!fs.existsSync(weixinDevToolPath)) return

    let cmd = ''
    if (isWin) {
      child_process.execSync('chcp 65001')
      cmd = `"${weixinDevToolPath}"`
    } else {
      cmd = weixinDevToolPath
    }

    child_process.exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error('启动小程序开发者工具失败', error)
        return
      }
      console.log('正在启动小程序开发者工具')
    })
  }
}

module.exports = Alipay