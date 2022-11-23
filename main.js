const {BrowserWindow, app, Menu, Tray, ipcMain} = require('electron')
const { startBot, stopBot } = require('./service/index')
const path  = require('path')
const fs      = require('fs')
const util    = require('util')

const logPath = 'upgrade.log'
const logFile = fs.createWriteStream(logPath, { flags: 'a' })

console.log = function() {
    logFile.write(util.format.apply(null, arguments) + '\n')
    process.stdout.write(util.format.apply(null, arguments) + '\n')
}

console.error = function() {
    logFile.write(util.format.apply(null, arguments) + '\n')
    process.stderr.write(util.format.apply(null, arguments) + '\n')
}
let mainWindow = null
let appTray = null

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule:true,
            nodeIntegration : true,  // 为了解决require 识别问题
            contextIsolation : false, //允许渲染进程使用Nodejs
            preload: path.join(__dirname, 'preload.js')
        }
    })
    ipcMain.handle('ping', () => 'pong')
    mainWindow.loadFile('index.html')
    // 打开开发工具
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    // 监听前端页面调用的方法
    ipcMain.on('startBot', handleStartBot)
    ipcMain.on('stopBot', handleStopBot)
})


// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function handleStartBot (event, key, secret ) {
    startBot(key, secret)
}
function handleStopBot() {
    stopBot()
}
