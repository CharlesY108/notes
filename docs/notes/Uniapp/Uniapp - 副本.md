# uni-app 简介

**uni-app 是基于 Vue.js 的跨平台开发框架**，通过一套代码实现多端适配，覆盖 iOS、Android、H5、小程序（微信/支付宝/百度等）、快应用等平台。  

## 相关文档

- [uni-app API 文档](https://uniapp.dcloud.net.cn/api/README)  

##  跨平台能力 

一次开发、多端部署，无需为不同平台单独编写代码

| 支持平台       | 适配方式                          | 典型应用场景               |  
|----------------|-----------------------------------|---------------------------|  
| 移动端（App）  | 编译为原生 iOS/Android 应用       | 独立 App 开发             |  
| 小程序         | 转换为各平台小程序语法            | 微信/支付宝等小程序开发   |  
| H5             | 编译为标准 HTML/CSS/JS            | 移动端 Web 页面           |  
| 快应用         | 适配国产手机系统的轻量化应用标准  | 华为/小米等手机原生应用   |  

##  开发效率优化

- **组件与 API 标准化**：提供统一的组件库（如 `<view>`, `<button>`）和 API（如 `uni.request`），适配各平台差异。  
- **条件编译**：通过 `#ifdef` 等预处理指令，针对特定平台编写定制化代码，例如：  
  ```js
  // 仅在 App 平台执行的代码
  #ifdef APP-PLUS
  uni.getSystemInfo({
    success: (res) => {
      console.log('App 平台系统信息：', res)
    }
  })
  #endif
  ```
- **原生插件扩展**：支持集成各平台原生 SDK（如地图、支付），通过 [DCloud 插件市场](https://ext.dcloud.net.cn/) 快速获取插件。  

##  性能与体验优化

- **原生渲染引擎**：App 端采用 WebView 与原生组件混合渲染，复杂交互场景（如列表滚动）性能接近原生应用。  
- **预编译与缓存机制**：H5 端支持路由预加载、资源缓存，提升页面打开速度。   

##  样式条件编译

通过 `lang="scss"` 结合 CSS 变量实现平台差异化样式：  
```css
/* 仅在微信小程序中生效的样式 */
/* 微信小程序 */
page {
  background-color: #f5f5f5;
}
/* 其他平台 */
#app {
  background-color: #f5f5f5;
}
```

##  JS 逻辑条件编译

```js
// 不同平台获取导航栏高度
let navHeight = 0;
// 微信小程序
#ifdef MP-WEIXIN
const systemInfo = uni.getSystemInfoSync();
navHeight = systemInfo.statusBarHeight + 44; // 微信小程序导航栏高度固定值
// App 平台
#elif APP-PLUS
navHeight = plus.navigator.getStatusBarHeight() + 50; // App 自定义导航栏
// H5 平台
#elif H5
navHeight = 44; // H5 简化处理
#endif  
```

##  代码组织规范

- **页面文件规范**：遵循 Vue 单文件组件（SFC）格式，包含 `<template>`、`<script>`、`<style>` 三部分
- **组件标签规范**：接近小程序规范，使用 `<view>`、`<text>`、`<button>` 等组件，参考 [uniapp 组件文档](https://uniapp.dcloud.io/component/README)  
- **接口能力规范**： JS API 接近微信小程序，使用 `uni.xxx` 格式调用，[API 概述 | uni-app官网](https://uniapp.dcloud.net.cn/api/) 
- **数据绑定与事件处理**：同 Vue.js 规范，使用 `v-bind`、`v-on` 等指令
- **布局规范**：采用 flex 布局实现多端兼容，避免使用传统定位方式 

```vue
<template>
  <view>
    页面内容
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 数据定义
    }
  },
  methods: {
    // 方法定义
  }
}
</script>

<style>
/* 样式定义 */
</style>
```

```js
uni.getStorageInfoSync() // 同步获取本地存储信息
```

```vue
<template>
  <view @click="handleClick">点击触发事件</view>
</template>

<script>
export default {
  methods: {
    handleClick() {
      console.log('事件已触发')
    }
  }
}
</script>
```

##  HBuilderX 工具

HBuilderX 是一款由 DCloud 开发的，基于 Electron 框架的跨平台集成开发环境（IDE），专为前端开发者设计，尤其适用于 uni - app 项目开发。

- 优势：模板丰富、智能提示完善、一键多端运行。  
- 下载步骤：  
  1. 访问官网 [https://www.dcloud.io/hbuilderx.html](https://www.dcloud.io/hbuilderx.html)  
  2. 点击 `DOWNLOAD` 下载正式版/alpha 版的 `App 开发版`  
  3. 解压 zip 包至**纯英文目录**（不含特殊字符）  
  4. 双击 `HBuilderX.exe` 启动 
- 安装文档：[https://hx.dcloud.net.cn/Tutorial/install/windows](https://hx.dcloud.net.cn/Tutorial/install/windows)  

##  项目创建步骤 

- 创建新项目
  1. 打开 HBuilderX，点击 `文件 -> 新建 -> 项目`  
  1. 填写项目名称、选择模板（如 `空项目` 或 `Hello uni-app`）  
  1. 点击 `创建` 完成项目初始化。  

- 项目基本目录结构

```
项目名称/
├── pages/          # 页面文件（.vue）
├── static/         # 静态资源（图片、字体等）
├── unpackage/      # 打包输出目录
├── app.vue         # 应用全局配置（样式、生命周期）
├── main.js         # Vue 初始化入口
├── manifest.json   # 应用配置（名称、appid、版本等）
├── pages.json      # 页面路由、导航栏配置
└── uni.scss        # 全局样式变量定义
```

##  项目运行方式  

1. **浏览器运行**  
   - 点击 HBuilderX 工具栏中的 `运行 -> 运行到浏览器 -> 选择浏览器`，快速预览页面效果。  

2. **微信小程序运行**  
   - 配置步骤：  
     1. 获取微信小程序 AppID：登录 [微信公众平台](https://mp.weixin.qq.com) 查看。  
     2. 在 HBuilderX 中，进入 ` manifest.json -> 小程序设置`，填写 AppID。  
     3. 配置微信开发者工具路径：`工具 -> 外部工具设置 -> 微信开发者工具路径`。  
     4. 开启微信开发者工具服务端口：微信开发者工具 -> 设置 -> 安全设置 -> 开启“服务端口”。  
     5. 运行项目：`运行 -> 运行到小程序模拟器 -> 微信开发者工具`。  

3. **App 真机运行**  
   - 条件：手机与电脑在同一局域网，开启开发者模式。  
   - 步骤：  
     1. 手机通过 USB 连接电脑或连接同一 WiFi  
     2. HBuilderX 中点击 `运行 -> 运行到手机或模拟器 -> 选择设备`  
     3. 等待基座安装完成后，手机自动运行项目。  

4. **iOS 模拟器运行**  
   - 需安装 Xcode（Mac 系统），在 HBuilderX 中选择 iOS 模拟器版本后运行。  











