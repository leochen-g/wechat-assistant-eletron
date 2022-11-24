const path = require('path');
const iconDir = path.resolve(__dirname, 'assets', 'icons');

const commonLinuxConfig = {
    icon: {
        scalable: path.resolve(iconDir, 'fiddle.svg'),
    },
    mimeType: ['x-scheme-handler/electron-fiddle'],
};
module.exports = {
    publishers: [
        {
            "name": "@electron-forge/publisher-github",
            "config": {
                "repository": {
                    "owner": "leochen-g",
                    "name": "wechat-assistant-eletron"
                },
                "prerelease": false,
                "draft": true
            }
        }
    ],
    packagerConfig: {
        "appVersion": "0.0.1",
        asar: true,
        "name": "wechat-assistant",
        "appCopyright": "Leo_chen",
        "icon": path.resolve(__dirname, 'assets', 'icons', 'favicon'),
        appBundleId: 'com.electron.aibotk',
        "win32metadata": {
            "ProductName": "wechat-assistant",
            "CompanyName": "aibotk.com",
            "FileDescription": "wechat-assistant"
        }
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            platforms: ['win32'],
            config: (arch) => ({
                name: 'wechat-assistant',
                authors: 'Leo_chen',
                exe: 'wechat-assistant.exe',
                iconUrl:
                    'https://raw.githubusercontent.com/electron/fiddle/0119f0ce697f5ff7dec4fe51f17620c78cfd488b/assets/icons/fiddle.ico',
                loadingGif: './assets/loading.gif',
                noMsi: true,
                setupExe: `wechat-assistant-win32-setup.exe`,
                setupIcon: path.resolve(iconDir, 'favicon.ico'),
            }),
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            platforms: ['linux'],
            config: commonLinuxConfig,
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],
};
