/**
 * 暴漏内部方法给前端页面
 */
const { ipcRenderer, shell } = require('electron')
const fs = require("fs");

async function startBot(key, secret) {
    return await ipcRenderer.invoke('startBot', key, secret)
}
function stopBot() {
    ipcRenderer.send('stopBot')
}
const links = document.querySelectorAll('a[href]')
links.forEach(link => {
    link.addEventListener('click', e => {
        const url = link.getAttribute('href');
        e.preventDefault();
        shell.openExternal(url);
    });
});
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
    startButton.addEventListener('click', async () => {
        const key = apikeyInput.value
        const secret = apisecretInput.value
        if (key && secret) {
            localStorage.setItem('key', key)
            localStorage.setItem('secret', secret)
        }
        const logPath = await startBot(key, secret)
        if (!interval) {
            interval = setInterval(() => {
                fs.access(logPath, (err) => {
                    if (!err) {
                        fs.readFile(logPath, (err, data) => {
                            if (err) {
                                return;
                            }
                            logDom.innerHTML = data;
                        })
                    }
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
        logDom.innerHTML = ''
    })

}
