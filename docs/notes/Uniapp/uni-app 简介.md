# uniapp

## uni-app 开发框架  

**uni-app 是基于 Vue.js 的跨平台开发框架**，通过一套代码实现多端适配，覆盖 iOS、Android、H5、小程序（微信/支付宝/百度等）、快应用等平台。其核心优势在于：  

- **一次开发，多端部署**：无需为不同平台单独编写代码，大幅降低开发成本，[uni-app API 文档](https://uniapp.dcloud.net.cn/api/README)。  
- **原生性能体验**：通过编译技术将 Vue 代码转换为各平台原生语法，保证性能接近原生应用。  
- **统一的开发生态**：基于 Vue.js 语法，兼容小程序 API，学习成本低，前端开发者可快速上手。  

## 核心特性与优势  

### 跨平台能力 

| 支持平台       | 适配方式                          | 典型应用场景               |  
|----------------|-----------------------------------|---------------------------|  
| 移动端（App）  | 编译为原生 iOS/Android 应用       | 独立 App 开发             |  
| 小程序         | 转换为各平台小程序语法            | 微信/支付宝等小程序开发   |  
| H5             | 编译为标准 HTML/CSS/JS            | 移动端 Web 页面           |  
| 快应用         | 适配国产手机系统的轻量化应用标准  | 华为/小米等手机原生应用   |  

### 开发效率优化

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

### 性能与体验优化

- **原生渲染引擎**：App 端采用 WebView 与原生组件混合渲染，复杂交互场景（如列表滚动）性能接近原生应用。  
- **预编译与缓存机制**：H5 端支持路由预加载、资源缓存，提升页面打开速度。   

### 样式条件编译

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

### JS 逻辑条件编译

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

### 代码组织规范

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

### HBuilderX 工具

HBuilderX 是一款由 DCloud 开发的，基于 Electron 框架的跨平台集成开发环境（IDE），专为前端开发者设计，尤其适用于 uni - app 项目开发。

- 优势：模板丰富、智能提示完善、一键多端运行。  
- 下载步骤：  
  1. 访问官网 [https://www.dcloud.io/hbuilderx.html](https://www.dcloud.io/hbuilderx.html)  
  2. 点击 `DOWNLOAD` 下载正式版/alpha 版的 `App 开发版`  
  3. 解压 zip 包至**纯英文目录**（不含特殊字符）  
  4. 双击 `HBuilderX.exe` 启动 
- 安装文档：[https://hx.dcloud.net.cn/Tutorial/install/windows](https://hx.dcloud.net.cn/Tutorial/install/windows)  

### 项目创建步骤 

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

### 项目运行方式  

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

## 基础内置组件 

uni-app 包含大量内置基础组件，无需手动导入或注册，可直接使用，其设计接近小程序规范，同时兼容 Vue 语法。  

### 组件分类与功能 

- 视图容器
  - view 视图容器，类似于html中的div
  - scroll-view 可滚动视图容器
  - swiper 滑块视图容器，比如用于轮播banner
- 基础内容
  - icon 图标 uni-icons
  - text 文字
  - rich-text 文字
  - progress 进度条
- 表单组件（Form）
  - button 按钮
  - checkbox 多项选择器
  - editor 富文本输入框
  - form 表单
  - input 输入框
  - label 标签
  - picker 弹出式聊表选择器
  - picker-view 窗体内嵌入式聊表选择器
  - radio 单项选择器
  - slider 滑动选择器
  - switch 开关选择器
  - textarea 多行文本输入框
- 路由与页面跳转（Navigation）
  - navigator 页面链接，类似于html中的a标签
- 媒体组件
  - audio 音频
  - camera 相机
  - image 图片
  - video 视频

### 组件公共属性  

所有基础组件均支持以下公共属性（以 `<view>` 为例）：  
- **通用属性**：`id`, `class`, `style`, `hidden`（控制显示/隐藏）  
- **事件属性**：`@click`, `@touchstart` 等触摸/点击事件  
- **条件与循环**：`v-if`, `v-else`, `v-for`（需配合 key 使用）  
- **双向绑定**：表单组件支持 `v-model`（如 `<input v-model="textValue">`）  

> 示例：公共属性在 `<button>` 中的应用  
> ```html
> <button 
>           id="submit-btn" 
>           class="btn-primary" 
>           :style="{ backgroundColor: isActive ? 'red' : 'blue' }"
>           @click="handleSubmit"
>           :hidden="isLoading"
>         >
>     提交按钮
> </button>
> ```

### uni-icons 图标库  

- 在 `main.js` 中全局引入，页面中使用
- 访问 [uni-icons 文档](https://ext.dcloud.net.cn/plugin?id=8) 查看全部图标类型

```js
import uniIcons from '@dcloudio/uni-icons'
Vue.component('uni-icons', uniIcons)
```

```vue
<uni-icons type="home" size="24rpx" color="#333"></uni-icons>
```

### 第三方扩展组件  

- **来源**：通过 [DCloud 插件市场](https://ext.dcloud.net.cn/) 下载安装，如：  
  - **uView UI**：一套完整的 uni-app 组件库，含电商、社交类组件。  
  - **ColorUI**：轻量级高颜值组件库，适合移动端界面开发。  
- **安装步骤**：  
  1. 在 HBuilderX 中打开项目，点击 `工具 -> 插件安装`  
  2. 搜索插件名称，选择对应组件库安装  
  3. 按文档要求在项目中引入并注册组件  

## 自定义组件开发  

### 组件创建与目录结构

1. 在项目根目录下创建 `components` 文件夹（若不存在）  
2. 在 `components` 下创建组件文件夹（如 `my-button`），包含：  
   ```
   my-button/
   ├── my-button.vue     # 组件文件
   └── index.js          # 组件注册文件（可选）
   ```
3. `my-button.vue` 示例：  
   
   ```html
   <template>
     <button 
             class="custom-btn" 
             :class="{ 'active': isActive }"
             @click="$emit('click')"
             >
       {{ buttonText }}
     </button>
   </template>
   
   <script>
     export default {
       name: 'MyButton',
       props: {
         buttonText: {
           type: String,
           default: '自定义按钮'
         },
         isActive: {
           type: Boolean,
           default: false
         }
       }
     }
   </script>
   
   <style scoped>
     .custom-btn {
       background-color: #409EFF;
       color: white;
       border-radius: 8rpx;
     }
     .custom-btn.active {
       background-color: #69b1ff;
     }
   </style>
   ```

### 组件引用方式  

- 局部引用（在页面中单独引用）  
  ```html
  <template>
    <view>
      <my-button @click="handleClick" buttonText="点击我"></my-button>
    </view>
  </template>
  
  <script>
    import MyButton from '@/components/my-button/my-button.vue'
  
    export default {
      components: {
        MyButton
      },
      methods: {
        handleClick() {
          uni.showToast({ title: '按钮被点击' })
        }
      }
    }
  </script>
  ```
- 全局引用（在 `main.js` 中注册）
  ```js
  import MyButton from '@/components/my-button/my-button.vue'
  Vue.component('MyButton', MyButton)
  ```

### 组件通信机制  

- **父子组件传值**：  
  - 父传子：通过 `props`（如上述 `buttonText` 属性）  
  - 子传父：通过 `$emit` 触发自定义事件（如 `@click`）  
- **跨组件通信**：  
  - 事件总线：在 `main.js` 中定义 `Vue.prototype.$bus = new Vue()`，通过 `$bus.emit` 和 `$bus.on` 通信  
  - Vuex：复杂状态管理场景可集成 Vuex 插件  

### 组件多端适配

- 使用条件编译区分平台样式：  
  ```css
  /* 仅在 App 端显示红色按钮 */
  #ifdef APP-PLUS
  .custom-btn {
    background-color: red;
  }
  #endif
  ```

### 组件性能优化  

- 列表组件使用 `key` 提升重渲染效率  
- 复杂组件采用 `lazy` 懒加载：  
  ```vue
  <component :is="currentComponent" lazy></component>
  ```

## 网络请求（一般情况）

`uni.request` 发起 HTTP/HTTPS 网络请求，支持 Promise 风格调用   

```js
uni.request({
  url: 'https://study.duyiedu.com/api/herolist',
  method: 'GET',
  success: (res) => {
    console.log('请求成功:', res.data)
  },
  fail: (err) => {
    console.error('请求失败:', err)
  }
})
```

## 网络请求（小程序）

### 安装第三方库

- uniapp 如果使用 fetch，会导致小程序不支持，需要使用 ` [@escook/request-miniprogram - npm](https://www.npmjs.com/package/@escook/request-miniprogram)  插件处理请求拦截与错误处理  
- 在项目根目录下执行 npm 安装命令 `npm install @escook/request-miniprogram` 

### 全局配置

`main.js` 中引入并配置

```js
import { createSSRApp } from 'vue'
import request from '@escook/request-miniprogram'

// 配置请求基础路径
request.baseUrl = 'https://study.duyiedu.com/api'

// 请求拦截器：添加公共请求头
request.beforeRequest = (options) => {
  const token = uni.getStorageSync('token')
  if (token) {
    options.header = {
      ...options.header,
      'Authorization': token
    }
  }
  uni.showLoading({ title: '请求中...' })
}

// 响应拦截器：统一处理错误
request.afterRequest = (result) => {
  uni.hideLoading()
  
  // 处理401未授权错误（如token过期）
  if (result.statusCode === 401) {
    uni.showToast({
      title: '登录状态已过期，请重新登录',
      icon: 'none'
    })
    setTimeout(() => {
      uni.reLaunch({ url: '/pages/login/login' })
    }, 1500)
    return Promise.reject(result)
  }
  
  // 处理其他错误
  if (result.data.code !== 0) {
    uni.showToast({
      title: result.data.message || '请求失败',
      icon: 'none'
    })
    return Promise.reject(result)
  }
  
  return result.data
}

// 将请求对象挂载到Vue原型上
export function createApp() {
  const app = createSSRApp({})
  app.config.globalProperties.$request = request
  return {
    app
  }
}
```

### 页面使用    

```vue
<template>
  <view class="container">
    <button @click="fetchHeroList">获取英雄列表</button>
    <view v-if="heroList.length > 0">
      <view v-for="item in heroList" :key="item.id" class="hero-item">
        {{ item.name }} - {{ item.title }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      heroList: []
    }
  },
  methods: {
    async fetchHeroList() {
      try {
        // 调用全局挂载的$request
        const res = await this.$request({
          url: '/herolist',
          method: 'GET'
        })
        this.heroList = res.data.list
        uni.showToast({ title: '请求成功', icon: 'success' })
      } catch (err) {
        console.error('请求错误:', err)
      }
    }
  }
}
</script>
```

```js
async function submitForm() {
  try {
    const formData = {
      username: 'user123',
      password: '123456'
    }
    const res = await this.$request({
      url: '/user/login',
      method: 'POST',
      data: formData
    })
    // 存储token
    uni.setStorageSync('token', res.token)
    uni.showToast({ title: '登录成功', icon: 'success' })
    uni.navigateTo({ url: '/pages/index/index' })
  } catch (err) {
    console.error('登录失败:', err)
  }
}
```

### 封装请求函数  

在 `utils/request.js` 中封装请求工具：  
```js
import request from '@escook/request-miniprogram'

// 配置基础路径
request.baseUrl = 'https://study.duyiedu.com/api'

// 请求拦截器
request.beforeRequest = (options) => {
  uni.showLoading({ title: '加载中...' })
}

// 响应拦截器
request.afterRequest = (result) => {
  uni.hideLoading()
  
  if (result.data.code !== 0) {
    uni.showToast({
      title: result.data.message || '操作失败',
      icon: 'none'
    })
    return Promise.reject(result)
  }
  return result.data
}

// 封装GET请求
export function get(url, params = {}) {
  return request({ url, method: 'GET', data: params })
}

// 封装POST请求
export function post(url, data = {}) {
  return request({ url, method: 'POST', data })
}

export default request
```

在页面中引入封装的工具函数：  
```js
import { get, post } from '@/utils/request.js'

// 使用封装的get请求
async function getProducts() {
  const res = await get('/products', { categoryId: 1 })
  return res
}
```

### 取消请求（处理重复请求）  

```js
let abortController = null

async function fetchData() {
  // 取消之前的请求
  if (abortController) {
    abortController.abort()
  }
  
  // 创建新的AbortController
  abortController = new AbortController()
  const signal = abortController.signal
  
  try {
    const res = await this.$request({
      url: '/data',
      signal
    })
    return res
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('请求已取消')
    } else {
      console.error('请求失败:', err)
    }
  }
}
```

### 多请求并发处理  

```js
async function batchFetch() {
  try {
    const [userRes, orderRes] = await Promise.all([
      this.$request({ url: '/user/info' }),
      this.$request({ url: '/order/list' })
    ])
    
    return {
      userInfo: userRes,
      orderList: orderRes.data.list
    }
  } catch (err) {
    console.error('批量请求失败:', err)
  }
}
```

## 文件上传 

`uni.uploadFile` 将本地文件上传至服务器，返回服务器响应结果 

### 基础用法示例  

```js
// 选择图片并上传
function uploadImage() {
  // 选择图片的 api
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePaths = res.tempFilePaths[0];
      
      uni.uploadFile({
        url: 'https://example.com/upload', // 上传接口地址
        filePath: tempFilePaths,
        name: 'file', // 服务器接收文件的字段名
        header: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer token' // 可选：携带认证信息
        },
        formData: {
          'userId': '123', // 可选：额外表单数据
          'type': 'image'
        },
        success: (uploadRes) => {
          const data = JSON.parse(uploadRes.data);
          if (data.code === 0) {
            uni.showToast({ title: '上传成功' });
            console.log('上传成功:', data.url);
          } else {
            uni.showToast({ title: data.message || '上传失败', icon: 'none' });
          }
        },
        fail: (err) => {
          console.error('上传失败:', err);
          uni.showToast({ title: '网络错误，请重试', icon: 'none' });
        }
      });
    }
  });
}
```

### 多文件上传（循环处理）  

```js
function uploadMultipleFiles() {
  uni.chooseImage({
    count: 3, // 最多选择3张图片
    success: (res) => {
      const filePaths = res.tempFilePaths;
      let successCount = 0;
      
      // 逐个上传文件
      filePaths.forEach((filePath) => {
        uni.uploadFile({
          url: 'https://example.com/upload',
          filePath: filePath,
          name: 'file',
          success: (uploadRes) => {
            successCount++;
            console.log(`第${successCount}个文件上传成功`);
            
            // 所有文件上传完成
            if (successCount === filePaths.length) {
              uni.showToast({ title: '全部上传成功' });
            }
          },
          fail: (err) => {
            console.error('上传失败:', err);
          }
        });
      });
    }
  });
}
```

### 上传进度监听  

```js
function uploadWithProgress() {
  uni.chooseImage({
    success: (res) => {
      const uploadTask = uni.uploadFile({
        url: 'https://example.com/upload',
        filePath: res.tempFilePaths[0],
        name: 'file',
        success: () => {
          uni.showToast({ title: '上传完成' });
        }
      });
      
      // 监听上传进度
      uploadTask.onProgressUpdate((res) => {
        console.log('上传进度:', res.progress);
        console.log('已经上传的数据长度:', res.totalBytesSent);
        console.log('预期需要上传的数据总长度:', res.totalBytesExpectedToSend);
        
        // 更新进度条UI
        this.uploadProgress = res.progress;
      });
    }
  });
}
```

### Promise 封装

```js
// 封装上传函数
function uploadFile(url, filePath, name, formData = {}) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url,
      filePath,
      name,
      formData,
      success: (res) => {
        resolve(JSON.parse(res.data));
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

// 使用示例
async function uploadAvatar() {
  try {
    const result = await uploadFile(
      'https://example.com/upload',
      this.tempFilePath,
      'avatar',
      { userId: this.userId }
    );
    console.log('上传成功:', result);
  } catch (err) {
    console.error('上传失败:', err);
  }
}
```

### 并发控制

多文件上传时，建议使用并发控制避免阻塞

```js
// 限制并发数为2
async function uploadFilesWithLimit(filePaths) {
  const concurrency = 2;
  let index = 0;
  
  async function worker() {
    while (index < filePaths.length) {
      const filePath = filePaths[index++];
      await uploadFile('https://example.com/upload', filePath, 'file');
    }
  }
  
  // 创建并发任务
  const workers = Array(concurrency).fill().map(worker);
  await Promise.all(workers);
}
```

## 文件下载

`uni.downloadFile` 从服务器下载文件到本地，支持断点续传。

`uni.downloadFile` 自动支持断点续传，无需额外配置。若网络中断，再次调用相同URL的下载请求时，会从上次中断处继续下载。  

### 基础用法示例  

```js
function downloadFile() {
  uni.downloadFile({
    url: 'https://example.com/file.pdf', // 下载文件URL
    success: (res) => {
      if (res.statusCode === 200) {
        // 保存文件到本地
        uni.saveFile({
          tempFilePath: res.tempFilePath,
          success: (saveRes) => {
            const savedFilePath = saveRes.savedFilePath;
            console.log('文件已保存:', savedFilePath);
            
            // 打开文件（如PDF、图片等）
            uni.openDocument({
              filePath: savedFilePath,
              success: () => {
                console.log('文件打开成功');
              },
              fail: (err) => {
                console.error('文件打开失败:', err);
                uni.showToast({ title: '无法打开文件', icon: 'none' });
              }
            });
          },
          fail: (err) => {
            console.error('保存文件失败:', err);
            uni.showToast({ title: '保存失败', icon: 'none' });
          }
        });
      } else {
        uni.showToast({ title: '下载失败', icon: 'none' });
      }
    },
    fail: (err) => {
      console.error('下载错误:', err);
      uni.showToast({ title: '网络错误，请重试', icon: 'none' });
    }
  });
}
```

### 下载进度监听  

```js
function downloadWithProgress() {
  const downloadTask = uni.downloadFile({
    url: 'https://example.com/large-file.zip',
    success: (res) => {
      if (res.statusCode === 200) {
        uni.showToast({ title: '下载完成' });
      }
    }
  });
  
  // 监听下载进度
  downloadTask.onProgressUpdate((res) => {
    console.log('下载进度:', res.progress);
    console.log('已经下载的数据长度:', res.totalBytesWritten);
    console.log('预期需要下载的数据总长度:', res.totalBytesExpectedToWrite);
    
    // 更新UI
    this.downloadProgress = res.progress;
  });
}
```

### 兼容性处理

```js
// 区分平台处理文件路径
function getFilePath() {
  #ifdef H5
  return '/static/files/example.pdf'; // H5 直接使用相对路径
  #endif
  
  #ifdef APP-PLUS
  return '_downloads/example.pdf'; // App 端使用特定路径
  #endif
}  
```

## 图片处理

### 选择图片

`uni.chooseImage` 从本地相册选择图片或调用相机拍照，返回图片临时路径。   

```js
// 选择单张图片
function selectSingleImage() {
  uni.chooseImage({
    count: 1, // 最多选择1张图片
    sizeType: ['original', 'compressed'], // 原图或压缩图
    sourceType: ['album', 'camera'], // 来源：相册或相机
    success: (res) => {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      this.imageList = res.tempFilePaths;
      console.log('选择的图片:', res.tempFilePaths);
    },
    fail: (err) => {
      console.error('选择图片失败:', err);
    }
  });
}
```

```js
// 选择多张图片并压缩
function selectMultipleImages() {
  uni.chooseImage({
    count: 9, // 最多选择9张
    sizeType: ['compressed'], // 只返回压缩图
    sourceType: ['album'], // 只允许从相册选择
    success: (res) => {
      this.imageList = res.tempFilePaths;
      
      // 上传多张图片
      this.uploadImages(res.tempFilePaths);
    }
  });
}
```

### 预览图片

`uni.previewImage` 预览单张或多张图片，支持缩放、滑动切换等操作。    

```js
// 预览当前选中的图片
function previewCurrentImage(index) {
  uni.previewImage({
    current: this.imageList[index], // 当前显示图片的URL
    urls: this.imageList, // 需要预览的图片URL列表
    success: () => {
      console.log('预览成功');
    },
    fail: (err) => {
      console.error('预览失败:', err);
    }
  });
}
```

```vue
<template>
  <view class="image-grid">
    <image 
      v-for="(item, index) in imageList" 
      :key="index" 
      :src="item" 
      mode="aspectFill"
      @click="previewImage(index)"
    ></image>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageList: []
    }
  },
  methods: {
    //  从组件事件触发预览
    previewImage(index) {
      uni.previewImage({
        current: this.imageList[index],
        urls: this.imageList
      });
    }
  }
}
</script>
```

### 获取图片信息

`uni.getImageInfo` 获取图片的尺寸、方向、路径等信息。  

```js
function getImageDetails() {
  uni.getImageInfo({
    src: this.imagePath, // 图片的本地路径或网络URL
    success: (res) => {
      console.log('图片宽度:', res.width);
      console.log('图片高度:', res.height);
      console.log('图片方向:', res.orientation); // 如：up, down, left等
      console.log('图片格式:', res.type); // 如：jpg, png等
      
      // 根据图片尺寸调整显示
      this.imageWidth = res.width > 300 ? 300 : res.width;
    },
    fail: (err) => {
      console.error('获取图片信息失败:', err);
    }
  });
}
```

```js
// 处理网络图片（需先下载）
async function getRemoteImageInfo(url) {
  try {
    // 先下载网络图片到本地临时路径
    const downloadRes = await uni.downloadFile({
      url: url
    });
    
    if (downloadRes.statusCode === 200) {
      // 获取本地临时图片信息
      const imageInfo = await uni.getImageInfo({
        src: downloadRes.tempFilePath
      });
      
      return imageInfo;
    } else {
      throw new Error('下载图片失败');
    }
  } catch (err) {
    console.error('获取网络图片信息失败:', err);
    return null;
  }
}
```

## 异步缓存

基于Promise风格，不阻塞主线程，适合耗时操作。  

### 获取本地缓存（uni.getStorage）  

```js
// 异步获取缓存数据
async function getCacheData(key) {
  try {
    const res = await uni.getStorage({ key });
    return res.data;
  } catch (err) {
    console.error(`获取缓存 ${key} 失败`, err);
    return null;
  }
}

// 使用示例
async function loadUserInfo() {
  const userInfo = await getCacheData('userInfo');
  if (userInfo) {
    this.userInfo = userInfo;
  } else {
    // 缓存不存在，请求服务器
    this.userInfo = await this.fetchUserInfoFromServer();
  }
}
```

### 存储数据到缓存（uni.setStorage）  

```js
// 异步存储缓存数据
function setCacheData(key, data) {
  return new Promise((resolve, reject) => {
    uni.setStorage({
      key,
      data,
      success: () => {
        resolve(true);
        console.log(`存储缓存 ${key} 成功`);
      },
      fail: (err) => {
        reject(err);
        console.error(`存储缓存 ${key} 失败`, err);
      }
    });
  });
}

// 使用示例
async function saveUserSettings(settings) {
  try {
    await setCacheData('userSettings', settings);
    uni.showToast({ title: '设置已保存' });
  } catch (err) {
    uni.showToast({ title: '保存失败', icon: 'none' });
  }
}
```

### 删除缓存数据（uni.removeStorage）  

```js
// 异步删除缓存数据
function removeCacheData(key) {
  return new Promise((resolve, reject) => {
    uni.removeStorage({
      key,
      success: () => {
        resolve(true);
        console.log(`删除缓存 ${key} 成功`);
      },
      fail: (err) => {
        reject(err);
        console.error(`删除缓存 ${key} 失败`, err);
      }
    });
  });
}

// 使用示例
async function logout() {
  try {
    // 清除用户登录状态
    await removeCacheData('token');
    await removeCacheData('userInfo');
    uni.reLaunch({ url: '/pages/login/login' });
  } catch (err) {
    console.error('登出失败', err);
  }
}
```

## 同步缓存

直接返回结果，会阻塞主线程，适合少量数据操作。  

### 同步获取缓存（uni.getStorageSync）  

```js
// 同步获取缓存（适用于启动时快速读取）
function getCacheDataSync(key) {
  try {
    return uni.getStorageSync(key);
  } catch (err) {
    console.error(`同步获取缓存 ${key} 失败`, err);
    return null;
  }
}

// 在App.vue中使用
export default {
  onLaunch() {
    // 启动时获取主题设置
    const theme = getCacheDataSync('appTheme') || 'light';
    this.globalData.appTheme = theme;
  }
}
```

### 同步存储缓存（uni.setStorageSync）  

```js
// 同步存储缓存（适用于即时生效的小数据）
function setCacheDataSync(key, data) {
  try {
    uni.setStorageSync(key, data);
    return true;
  } catch (err) {
    console.error(`同步存储缓存 ${key} 失败`, err);
    return false;
  }
}

// 使用示例
function toggleTheme(theme) {
  setCacheDataSync('appTheme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}
```

### 同步删除缓存（uni.removeStorageSync）  

```js
// 同步删除缓存（适用于需要立即生效的场景）
function removeCacheDataSync(key) {
  try {
    uni.removeStorageSync(key);
    return true;
  } catch (err) {
    console.error(`同步删除缓存 ${key} 失败`, err);
    return false;
  }
}

// 使用示例
function clearTempData() {
  removeCacheDataSync('tempFiles');
  removeCacheDataSync('recentSearches');
}
```

## 封装缓存方法  

### 统一缓存函数

```js
// utils/storage.js
export default {
  // 异步获取
  async get(key) {
    try {
      const res = await uni.getStorage({ key });
      return res.data;
    } catch (err) {
      console.error(`Storage get error: ${key}`, err);
      return null;
    }
  },
  
  // 异步设置
  async set(key, data) {
    try {
      await uni.setStorage({ key, data });
      return true;
    } catch (err) {
      console.error(`Storage set error: ${key}`, err);
      return false;
    }
  },
  
  // 异步删除
  async remove(key) {
    try {
      await uni.removeStorage({ key });
      return true;
    } catch (err) {
      console.error(`Storage remove error: ${key}`, err);
      return false;
    }
  },
  
  // 同步获取
  getSync(key) {
    try {
      return uni.getStorageSync(key);
    } catch (err) {
      console.error(`Storage getSync error: ${key}`, err);
      return null;
    }
  },
  
  // 同步设置
  setSync(key, data) {
    try {
      uni.setStorageSync(key, data);
      return true;
    } catch (err) {
      console.error(`Storage setSync error: ${key}`, err);
      return false;
    }
  },
  
  // 同步删除
  removeSync(key) {
    try {
      uni.removeStorageSync(key);
      return true;
    } catch (err) {
      console.error(`Storage removeSync error: ${key}`, err);
      return false;
    }
  },
  
  // 清空所有缓存
  async clearAll() {
    try {
      const keys = await uni.getStorageInfo().then(res => res.keys);
      const tasks = keys.map(key => this.remove(key));
      await Promise.all(tasks);
      return true;
    } catch (err) {
      console.error('Storage clearAll error', err);
      return false;
    }
  }
};
```

### 使用封装函数

```js
import storage from '@/utils/storage.js';

// 存储用户信息
async function saveUserProfile(profile) {
  await storage.set('userProfile', profile);
}

// 获取用户信息
async function getUserProfile() {
  return await storage.get('userProfile');
}

// 清除所有用户数据
async function clearUserData() {
  await storage.remove('token');
  await storage.remove('userProfile');
  await storage.remove('userSettings');
}  
```

### 缓存优化方案  

- **设置过期时间**：  
  
  ```js
  async function setCacheWithExpire(key, data, expireTime) {
    const cacheData = {
      data,
      expireTime: Date.now() + expireTime // 过期时间戳
    };
    await storage.set(key, cacheData);
  }
  
  async function getCacheWithExpire(key) {
    const cacheData = await storage.get(key);
    if (!cacheData) return null;
    
    // 检查是否过期（10分钟过期示例）
    if (Date.now() > cacheData.expireTime) {
      await storage.remove(key);
      return null;
    }
    
    return cacheData.data;
  }
  ```
- **限制缓存大小**：  
  ```js
  async function checkAndClearCache() {
    try {
      const info = await uni.getStorageInfo();
      if (info.currentSize > 5 * 1024 * 1024) { // 超过5MB时清理
        const keys = info.keys.filter(key => key.startsWith('temp_'));
        const tasks = keys.map(key => storage.remove(key));
        await Promise.all(tasks);
        console.log('清理临时缓存成功');
      }
    } catch (err) {
      console.error('缓存清理失败', err);
    }
  }  
  ```

## 交互反馈  

### 提示框

`Toast & Loading` 轻量级提示，显示简短消息或加载状态。  

```js
// 显示成功提示（默认1.5秒后自动消失）
uni.showToast({
  title: '操作成功',
  icon: 'success', // 可选：success, loading, none
  duration: 2000,  // 提示持续时间（毫秒）
  mask: true       // 是否显示透明蒙层，防止触摸穿透
});

// 显示加载提示（需手动隐藏）
uni.showLoading({
  title: '加载中...',
  mask: true
});

// 2秒后隐藏加载提示
setTimeout(() => {
  uni.hideLoading();
}, 2000);
```

```js
// 显示自定义图标提示（需准备本地图片）
uni.showToast({
  title: '上传完成',
  image: '/static/icons/check.png', // 自定义图标路径（优先级高于icon）
  duration: 2500
});

// 显示纯文本提示
uni.showToast({
  title: '暂无数据',
  icon: 'none',
  duration: 3000
});
```

```javascript
// 带加载状态的网络请求
async function fetchData() {
  // 显示加载提示
  uni.showLoading({
    title: '获取数据中...',
    mask: true
  });
  
  try {
    const res = await uni.request({
      url: 'https://api.example.com/data',
      method: 'GET'
    });
    
    if (res.statusCode === 200) {
      this.dataList = res.data;
      uni.showToast({
        title: '数据加载成功',
        icon: 'success'
      });
    } else {
      throw new Error('请求失败');
    }
  } catch (err) {
    uni.showToast({
      title: '网络错误，请重试',
      icon: 'none'
    });
  } finally {
    // 无论请求成功或失败，都隐藏加载提示
    uni.hideLoading();
  }
}
```

### 模态框

`Modal` 显示确认/取消对话框，阻止用户操作其他内容。  

```js
// 显示确认对话框
uni.showModal({
  title: '提示',
  content: '确定要删除这条记录吗？',
  confirmText: '确认删除',  // 自定义确认按钮文字
  confirmColor: '#FF4500',  // 自定义确认按钮颜色
  cancelText: '取消',
  success: (res) => {
    if (res.confirm) {
      console.log('用户点击确认');
      // 执行删除操作
    } else if (res.cancel) {
      console.log('用户点击取消');
    }
  }
});
```

```js
// 显示带输入框的对话框（仅微信小程序、App支持）
uni.showModal({
  title: '登录',
  content: '请输入用户名',
  editable: true,  // 显示输入框
  placeholderText: '请输入用户名',
  success: (res) => {
    if (res.confirm) {
      console.log('用户输入内容:', res.content);
      // 处理输入内容
    }
  }
});
```

```javascript
// 确认操作需要阻塞线程时
async function deleteItem(id) {
  // 显示确认对话框
  const res = await uni.showModal({
    title: '确认删除',
    content: '此操作将永久删除该项目，是否继续？',
    confirmText: '确认删除',
    confirmColor: '#FF4500'
  });
  
  if (res.confirm) {
    // 显示加载提示
    uni.showLoading({
      title: '删除中...',
      mask: true
    });
    
    try {
      // 执行删除操作
      await this.$request({
        url: `/api/items/${id}`,
        method: 'DELETE'
      });
      
      uni.showToast({
        title: '删除成功',
        icon: 'success'
      });
      
      // 刷新数据列表
      this.loadData();
    } catch (err) {
      uni.showToast({
        title: '删除失败',
        icon: 'none'
      });
    } finally {
      uni.hideLoading();
    }
  }
}
```

### 底部菜单

`ActionSheet` 从底部弹出的菜单列表，提供多个选项。  

```js
// 显示底部菜单
uni.showActionSheet({
  itemList: ['拍照', '从相册选择', '取消'],  // 菜单选项列表
  itemColor: '#000000',  // 选项文字颜色
  success: (res) => {
    if (res.tapIndex === 0) {
      console.log('用户选择拍照');
      // 调用相机
    } else if (res.tapIndex === 1) {
      console.log('用户选择从相册选择');
      // 打开相册
    }
  },
  fail: (err) => {
    console.error('显示菜单失败:', err);
  }
});
```

## 路由跳转  

### 保留当前页面

`uni.navigateTo(OBJECT)` 跳转后当前页面会保留在页面栈中，用户可通过返回按钮回到原页面。  

- 适用场景：从列表页跳转到详情页，例如商品列表→商品详情。    

  ```js
  uni.navigateTo({ url: '/pages/detail?id=123' })
  ```

### 关闭当前页面

`uni.redirectTo(OBJECT)` 跳转后会关闭当前页面，页面栈中替换为新页面，无法返回原页面。  

- 适用场景：表单提交成功后跳转到结果页，避免用户返回后重复提交。  

  ```js
  uni.redirectTo({ url: '/pages/success' })
  ```

### 关闭所有页面

`uni.reLaunch(OBJECT)` 清空所有页面栈，直接打开目标页面，类似应用重启。  

- 适用场景：退出登录后跳转到登录页，确保用户无法返回原页面。  

  ```js
  uni.reLaunch({ url: '/pages/login' })
  ```

### 跳转 Tab 页

`uni.switchTab(OBJECT)` 只能跳转到在 `pages.json` 中配置为 TabBar 的页面，跳转后会重置页面状态。  

- 适用场景：底部导航栏切换，例如从“首页”切换到“我的”页面。  

  ```js
  uni.switchTab({ url: '/pages/my' })
  ```

### 路由传参

两种方式：

1. url 拼接
2. 全局状态或缓存：通过 Vuex、全局变量或本地缓存传递数据

```js
uni.navigateTo({ url: '/pages/detail?id=123&name=商品' })

// 在目标页面的 `onLoad` 生命周期中通过 `options` 获取 URL 参数
export default {
  onLoad(options) {
    console.log('接收的ID:', options.id) // 输出：123
    console.log('接收的名称:', options.name) // 输出：商品
  }
}
```

```js
// 在 App.vue 中定义全局数据
globalData: {
  tempData: null
}

// 传递数据
this.$app.globalData.tempData = { id: 123, info: '测试数据' }
uni.navigateTo({ url: '/pages/detail' })

// 接收数据
const tempData = this.$app.globalData.tempData
```

### 跳转返回

使用 `uni.navigateBack()` 方法，可指定返回的页面层数

```js
// 返回上一页（默认 delta=1）
uni.navigateBack()

// 返回上2页（若存在）
uni.navigateBack({ delta: 2 })
```

返回时传递数据给上一页，通过获取上一页实例并修改其数据  

```js
function goBackWithData() {
  const pages = getCurrentPages()
  const prevPage = pages[pages.length - 2] // 获取上一个页面
  if (prevPage) {
    prevPage.setData({ needRefresh: true }) // 通知上一页刷新数据
  }
  uni.navigateBack()
}
```

### 路由拦截

在 `App.vue` 中通过拦截器实现登录校验：  
```js
export default {
  onShow() {
    // 拦截 navigateTo 跳转
    uni.addInterceptor('navigateTo', {
      invoke(options) {
        // 判断目标页面是否需要登录
        const needLoginPages = ['/pages/my', '/pages/order']
        if (needLoginPages.includes(options.url) && !uni.getStorageSync('token')) {
          uni.showModal({
            title: '提示',
            content: '请先登录',
            success: (res) => {
              if (res.confirm) {
                uni.navigateTo({ url: '/pages/login' })
              }
            }
          })
          return false // 阻止本次跳转
        }
        return options
      }
    })
  }
}  
```

## 页面布局与样式  

### 根容器样式  

`page` 是uni-app页面的根容器，需显式设置 `height: 100%` 才能撑满屏幕  

```css
/* page 选择器 */
page {
  height: 100%; /* 页面高度必设 */
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}
```

### 尺寸单位  

#### 像素单位：px（Pixel）  

**定义**：像素是屏幕上的最小显示单元，1px 对应屏幕上一个物理像素点。  
**特点**：  

- **绝对单位**：在固定设备上尺寸固定，例如 iPhone 12 的屏幕宽度为 390px。  
- **兼容性**：所有平台都支持，但在不同设备（尤其是高清屏）上显示效果可能不一致。  
- **适用场景**：图标尺寸、边框宽度等需要固定尺寸的场景。  

#### 响应式单位：rpx（Responsive Pixel）  

**定义**：微信小程序专用的响应式单位，基于屏幕宽度自动适配。  
**特点**：  

- **原理**：1rpx = 屏幕宽度 / 750，例如 375px 宽的屏幕上，1rpx = 0.5px。  
- **适配性**：自动根据屏幕宽度缩放，适配不同尺寸的手机（如 iPhone 和安卓机型）。  
- **应用场景**：小程序页面布局、文字大小、间距等需要自适应的场景。  
- **示例**：在 750px 设计稿中，100px 宽的元素可转换为 100rpx。  

#### upx（Uni-app 扩展单位）  

**定义**：uni-app 框架中兼容小程序的响应式单位，与 rpx 本质相同。  
**特点**：  

- **跨平台适配**：在小程序端等同于 rpx，在 App 和 H5 端可通过配置转换为其他单位（如 rem）。  
- **使用方式**：与 rpx 完全一致，例如 width: 200upx;。  

#### 根字体单位：rem（Root Em）  

**定义**：相对于根元素（HTML）的字体大小的单位。  
**特点**：  

- **动态计算**：1rem = HTML 元素的 font-size 值，例如 HTML 设置 font-size: 16px，则 1rem = 16px。  
- **适配方案**：配合 JavaScript 动态设置 HTML 的 font-size（如根据屏幕宽度设置），实现响应式布局。  
- **应用场景**：H5 页面、App 端的弹性布局，例如：  
  ```css
  html { font-size: 16px; } /* 基准值 */
  .box { width: 10rem; } /* 10 × 16px = 160px */
  ```

#### 视口单位：vh、vw（Viewport Height/Width）  

**定义**：基于浏览器视口尺寸的单位。  
**特点**：  

- **视口比例**：  
  - 1vh = 视口高度的 1%（例如视口高 1000px，则 1vh = 10px）。  
  - 1vw = 视口宽度的 1%（例如视口宽 500px，则 1vw = 5px）。  
- **适配性**：无需 JavaScript 即可实现全屏或比例布局，例如：  
  ```css
  .full-screen { height: 100vh; width: 100vw; } /* 占满整个视口 */
  .half-width { width: 50vw; } /* 宽度为视口的一半 */
  ```
- **注意事项**：在小程序中部分组件可能不支持，H5 端兼容性较好。  

#### uni-app 中单位使用建议  

1. **小程序端**：优先使用 rpx/upx，适配不同屏幕宽度。  
2. **H5 端**：  
   
   - 简单布局用 vh/vw（如全屏容器）；  
   - 复杂响应式布局用 rem（配合动态根字体设置）。  
3. **App 端**：  
   - 推荐使用 rem 或 upx（可通过 `uni.scss` 配置转换规则），例如：  
     ```css
     /* 在 uni.scss 中定义根字体 */
     $vw-base: 375; /* 设计稿宽度 */
     html { font-size: 100 * 100vw / $vw-base; } /* 1rem = 100px（在 375px 设计稿中） */
     ```
4. **绝对尺寸**：图标、边框等用 px，避免缩放变形。  

### 外部样式引入  

- 在 `App.vue` 或页面中引入：  
  ```css
  /* 全局样式 */
  @import '@/styles/global.css';
  
  /* 局部样式 */
  <style lang="scss">
    @import '@/components/button/style.scss';
  </style>
  ```

### 应用生命周期

监听整个应用的启动、前后台切换状态，全局仅触发一次，应用生命周期（在 `App.vue` 中监听）  

- `onLaunch`：应用初始化时触发（仅一次），全局数据初始化、登录状态校验、插件初始化
- `onShow`：应用从后台切到前台时触发（如点击桌面图标恢复应用，刷新页面数据、恢复应用状态）  
- `onHide`：应用从前台切到后台时触发  

#### onLaunch()

- **触发时机**：应用初始化完成时触发（启动或重启应用）。  
- **应用场景**：全局数据初始化、登录状态校验、插件初始化。  

```js
onLaunch() {
  console.log('应用启动');
  // 检查登录状态
  const token = uni.getStorageSync('token');
  if (token) {
    this.checkUserStatus();
  }
}
```

#### onShow()

- **触发时机**：应用从后台切到前台时触发（如点击桌面图标恢复应用）。  
- **应用场景**：刷新页面数据、恢复应用状态。  

```js
onShow() {
  console.log('应用显示');
  // 刷新消息未读计数
  this.getUnreadCount();
}
```

#### onHide()

- **触发时机**：应用从前台切到后台时触发（如按Home键或锁屏）。  
- **应用场景**：保存临时数据、暂停动画或定时器。  

```js
onHide() {
  console.log('应用隐藏');
  // 保存未提交的表单数据
  uni.setStorageSync('tempForm', this.formData);
}
```

### 页面生命周期  

页面生命周期，监听单个页面的加载、显示、卸载等状态，每个页面独立触发。  

- `onLoad(option)`：页面加载时触发（获取路由参数）  
- `onShow`：页面显示时触发（每次切回页面都会触发）  
- `onReady`：页面初次渲染完成时触发  
- `onHide`：页面隐藏时触发（跳转到其他页面）  
- `onUnload`：页面卸载时触发（被关闭或重定向）  
- `onReachBottom`：页面滚动到底部时触发  

**场景**：从A页面跳转到B页面，再返回A页面  

1. **A页面**：`onLoad` → `onShow` → `onReady`  
2. **B页面**：`onLoad` → `onShow` → `onReady`  
3. **返回A页面**：`A.onShow`（B页面触发`onHide`）  

#### onLoad(options)

- **触发时机**：页面加载时触发（首次进入或携带参数跳转）。  
- **参数**：`options` 包含路由传递的参数（如 `id=123`）。  
- **应用场景**：获取页面数据、解析路由参数。  

```js
onLoad(options) {
  console.log('页面加载，参数：', options);
  // 获取商品ID并请求详情
  if (options.id) {
    this.getGoodsDetail(options.id);
  }
}
```

#### onShow()

- **触发时机**：页面显示时触发（每次切回页面都会触发）。  
- **应用场景**：刷新列表数据、重置页面状态。  

```js
onShow() {
  console.log('页面显示');
  // 刷新列表数据（如从详情页返回列表页）
  this.loadListData();
}
```

#### onReady()

- **触发时机**：页面初次渲染完成时触发（仅一次）。  
- **应用场景**：操作DOM元素、初始化插件（如地图组件）。  

```js
onReady() {
  console.log('页面渲染完成');
  // 获取Canvas上下文
  this.ctx = uni.createCanvasContext('myCanvas');
}
```

#### onHide()

- **触发时机**：页面隐藏时触发（跳转到其他页面或切入后台）。  
- **应用场景**：暂停动画、保存页面状态。  

```js
onHide() {
  console.log('页面隐藏');
  // 清除定时器
  clearInterval(this.timer);
}
```

#### onUnload()

- **触发时机**：页面卸载时触发（被关闭或重定向）。  
- **应用场景**：释放资源、取消网络请求。  

```js
onUnload() {
  console.log('页面卸载');
  // 取消未完成的请求
  if (this.requestTask) {
    this.requestTask.abort();
  }
}
```

#### onReachBottom()

- **触发时机**：页面滚动到底部时触发（可配置距离底部阈值）。  
- **应用场景**：加载更多数据、触底提示。  

```js
onReachBottom() {
  console.log('页面滚动到底部');
  // 加载下一页数据
  if (!this.isLoading) {
    this.loadMoreData();
  }
}
```

### 组件生命周期  

与 Vue 组件生命周期完全一致，用于组件内部的状态管理和资源控制

```js 
export default {
  beforeCreate() {
    console.log('组件实例创建前');
    // 此时无法访问this.data
  },
  created() {
    console.log('组件实例创建后');
    // 初始化数据、事件监听
    this.initData();
  },
  beforeMount() {
    console.log('组件挂载前');
    // DOM尚未渲染，可修改组件配置
  },
  mounted() {
    console.log('组件挂载后');
    // 访问DOM元素、初始化第三方库
    this.initPlugin();
  },
  beforeDestroy() {
    console.log('组件销毁前');
    // 移除事件监听、清理定时器
    this.removeEventListeners();
  },
  destroyed() {
    console.log('组件销毁后');
    // 释放资源，如WebWorker
  }
}
```


### 条件编译机制  

条件编译是通过特殊注释标记，在代码编译阶段根据平台标识筛选出对应平台的代码，实现“一套代码，多端适配”的开发模式。其本质是预处理器根据规则过滤代码，最终生成各平台专属的运行代码。  

### 语法格式 

#### JS 条件编译

```javascript
// 仅在 App 平台获取设备信息
#ifdef APP-PLUS
uni.getSystemInfo({
  success: (res) => {
    console.log('App 设备信息:', res.model);
  }
});
#endif

// 在 H5 和小程序平台使用不同的分享逻辑
#ifdef H5
window.shareToSocialMedia();
#elif MP-WEIXIN
uni.share({
  provider: 'weixin',
  type: 1,
  // 微信分享配置...
});
#endif
```

#### CSS 条件编译  

```css
/* 仅在微信小程序中使用红色背景 */
/* #ifdef MP-WEIXIN */
.page-container {
  background-color: #ff4d4f;
}
/* #endif */

/* 在 App 平台使用原生阴影效果 */
/* #ifdef APP-PLUS */
.native-shadow {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
/* #endif */
```

#### Vue 模板条件编译  

```vue
<template>
  <view>
    <!-- 仅在 H5 平台显示顶部广告 -->
    <!-- #ifdef H5 -->
    <ad-banner class="h5-ad" @click="goToAdPage"></ad-banner>
    <!-- #endif -->
    
    <!-- 仅在小程序平台显示授权按钮 -->
    <!-- #ifdef MP-WEIXIN -->
    <button @click="authorize">微信授权登录</button>
    <!-- #endif -->
  </view>
</template>
```

#### 配置文件条件编译  

```json
{
  "pages": [
    // 仅在 App 平台显示的页面
    #ifdef APP-PLUS
    {
      "path": "pages/app-only-page/app-only-page"
    },
    #endif
    
    // 所有平台通用页面
    {
      "path": "pages/index/index"
    }
  ]
}
```

#### 平台标识

| 标识           | 对应平台                 | 应用场景示例                     |
|----------------|--------------------------|----------------------------------|
| `APP-PLUS`     | iOS/Android 原生 App     | 调用设备摄像头、传感器等原生功能 |
| `H5`           | 浏览器 Web 页面          | 使用 localStorage 存储数据       |
| `MP-WEIXIN`    | 微信小程序               | 调用微信登录、支付接口           |
| `MP-ALIPAY`    | 支付宝小程序             | 支付宝支付功能适配               |
| `MP-BAIDU`     | 百度小程序               | 百度地图接口集成                 |
| `MP-TOUTIAO`   | 字节跳动小程序（抖音/头条）| 抖音分享功能开发                 |
| `QUICKAPP`     | 快应用（华为/小米等）    | 系统级功能快速集成               |  

# next unicload 章节开始...











