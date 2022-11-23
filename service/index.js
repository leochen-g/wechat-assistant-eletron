const {WechatyBuilder} = require('wechaty')
const {WechatyWebPanelPlugin} = require('wechaty-web-panel')
const name = 'wechat-assistant-pro';
let bot = '';


function startBot(apiKey, apiSecret) {
    // 1、如果没有token请使用以下代码
    bot = WechatyBuilder.build({
        name, // generate xxxx.memory-card.json and save login data for the next login
        puppet: 'wechaty-puppet-wechat4u',
    });

    bot
        .use(
            WechatyWebPanelPlugin({
                apiKey: apiKey,
                apiSecret: apiSecret,
                ignoreMessages: [
                    {type: 'include', word: '{robotname}'},
                    {type: 'include', word: '迷失'},
                    {type: 'start', word: '.'},
                    {type: 'start', word: '。'},
                    {type: 'start', word: 'f'},
                    {type: 'equal', word: '0'},
                    {type: 'equal', word: '1'},
                    {type: 'equal', word: '2'},
                    {type: 'equal', word: '3'},
                    {type: 'equal', word: '卡通'}]
            })
        )
    bot.start()
        .catch((e) => console.error(e));
}

function stopBot() {
    bot.stop()
}

module.exports = {
    startBot,
    stopBot
}
