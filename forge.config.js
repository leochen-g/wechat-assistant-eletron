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
        "name": "智能微秘书客户端",
        "appCopyright": "Leo_chen",
        "icon": "./assets/img/appIcon/favicon",
        "win32metadata": {
            "ProductName": "智能微秘书 Windows",
            "CompanyName": "aibotk.com",
            "FileDescription": "智能微秘书客户端"
        }
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {},
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],
};
