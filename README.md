# urlScreenShot

基于nodejs将url访问页面内容截图生成PDF文件保存本地

背景：因做性能测试，需要对grafana链路多个服务进行观察并截图保存作为测试日志，经常需要手动截图再保存到wiki。我需要对监控数据进行分析的时间会被截图保存操作占用，特别是在多个任务并行下，手动截图让我变得烦躁，这个工具可以快速帮我按照时间维度进行保存我想要的url页面数据。

# 开发环境

nodejs v12.18.3

# 使用

## 设置淘宝镜像地址
```shell
npm config set registry https://registry.npm.taobao.org
```

```shell
export CHROMEDRIVER_CDNURL=http://npm.taobao.org/mirrors/chromedriver
```

## 安装依赖
```shell
npm install
```

Downloading Chromium 需要等待一会儿

[img](./FAQ/安装依赖.png)

## 填写数据

[img](./excel.jpeg)

## 运行脚本

* nodejs
```shell
npm run start
```

* mocha

```shell
npm run test
```

## 脚本录制工具

chrome安装headless record

[img](./FAQ/headlessRecorder.jpg)

./脚本录制工具/Headless Recorder_0_8_0_0.crx

通过这个chrome插件，快速录制操作生成代码！

# FAQ

1.结果保存文件夹路径需已存在，即urlScreenData.xlsx中savePath列

./Screen/PIC/

以/结尾

2.需要进行登录的url，只要填写登录一次，后续复用登录状态，需要放最前一行。

 [img](./FAQ/同一个url账号密码只要写一次.jpg)
 
3.账号密码输入框、登录按钮CssSelector获取方式。

 [img](./FAQ/selector获取方式.jpg)

4.chrome插件安装

>https://blog.csdn.net/u013302168/article/details/117928018