# Create-KDesign-App

## 安装命令行

开始开发之前，请您先确保已经在本地安装好了 `node`，然后运行以下命令安装命令行工具：

```shell
$ npm i -g @kdcloudjs/create-kdesign-app
```

## 初始化脚手架

我们使用刚才安装的 create-kdesign-app 来快速初始化脚手架，并提供3种模板
- umi3：使用umi3为基础框架，兼容ie11
- umi4：使用umi4为基础框架，不兼容ie11
- simple：使用umi4为基础框架，并简化典型页面及功能
- plugin-vscode：vscode 插件模板
- plugin-cui：自定义控件结合cui模板案例

```shell
$ create-kdesign-app                     
$ #? Please input the project name： my-app   # 输入项目名称
$ #? What template do you need? umi3...       # 选择模板
$ Initializing the KDesign App                # 开始初始化项目
$ Receiving objects stage 100% complete       # 等待接收完成

$ Initializing Done                           # 完成
```

安装依赖：

```shell
# 注：umi3默认使用npm, umi4默认使用pnpm, 可在config/config.ts中修改
$ cd my-app && npm install
```

## 开发

安装好脚手架后就可以开始开发

```shell
$ npm run start
```

## 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## License
Create-KDesign-App 使用了 Apache License, Version 2.0. 详细license 请查看 [LICENSE](./LICENSE)
