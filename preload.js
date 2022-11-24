/**
 * 暴漏内部方法给前端页面
 */
const { ipcRenderer } = require('electron')
const fs = require("fs");
const os  = require('os')
const path = require("path");

const baseDir = path.join(
    os.homedir(),
    path.sep,
    ".wechaty",
    "wechat-assistant-cache",
    path.sep,
    "electron",
    path.sep,
);

const logPath = baseDir + 'upgrade.log'

function startBot(key, secret) {
    ipcRenderer.send('startBot', key, secret)
}
function stopBot() {
    ipcRenderer.send('stopBot')
}

window.onload = () => {
    const startButton = document.getElementById('start')
    const stopButton = document.getElementById('stop')
    const apikeyInput = document.getElementById('apikey')
    const apisecretInput = document.getElementById('apisecret')
    const logDom = document.getElementById('log-wrap')
    let interval = null
    if(localStorage.getItem('key')) {
        apikeyInput.value = localStorage.getItem('key')
    }
    if(localStorage.getItem('secret')) {
        apisecretInput.value = localStorage.getItem('secret')
    }
    startButton.addEventListener('click', () => {
        const key = apikeyInput.value
        const secret = apisecretInput.value
        if (key && secret) {
            localStorage.setItem('key', key)
            localStorage.setItem('secret', secret)
        }
        startBot(key, secret)
        if (!interval) {
            interval = setInterval(() => {
                fs.readFile(logPath, (err, data) => {
                    if (err) {
                        return;
                    }
                    logDom.innerHTML = data;
                })
            }, 2000)
        }
    });

    stopButton.addEventListener('click', () => {
        stopBot()
        if (interval) {
            clearInterval(interval)
            interval = null
        }
    })

}
