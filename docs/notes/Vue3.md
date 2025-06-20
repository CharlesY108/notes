# Vue3

## 脚手架创建

|                | Vue 2                     | Vue 3                             |
| -------------- | ------------------------- | --------------------------------- |
| **官方脚手架** | `vue-cli`（基于 Webpack） | `vite` 或 `vue-cli`（兼容 Vue 3） |
| **推荐工具**   | 通常使用 `vue-cli`        | 推荐使用 `vite`（更快更轻量）     |

```bash
# Vue 2 项目创建

# 全局安装 vue-cli（旧版）
npm install -g vue-cli

# 初始化项目（基于 Webpack）
vue init webpack my-project
```
```bash
# Vue 3 项目创建

#方式 1：使用 Vite（推荐），Vite 默认使用 Vue 3，启动速度极快（基于原生 ES Modules）
npm create vite@latest my-vue-app --template vue
yarn create vite my-vue-app --template vue

# 方式 2：使用 Vue CLI（兼容 Vue 3）
npm install -g @vue/cli
vue create my-project
```
## 应用及组件实例

- **隔离应用**：在创建一个 Vue 应用时，Vue 2 是通过 new 一个构造函数的方式创建，这种方式本身没有问题，但 Vue 构造函数的静态方法(如 use、mixin、component 等)，在创建了多个 Vue 应用的项目中，就会导致所有 Vue 应用被迫添加了这些代码中；而 Vue 3 取消了这个构造函数，转而使用 createApp 方法来创建应用，从而使得 Vue 只能通过 createApp 创建的应用来调用 use、mixin、component 等方法，这样就保证了不会存在构造函数调用静态方法导致全局污染的问题。
- **TreeShaking**：vue2 的构造函数集成了太多功能，不利于 tree shaking，vue3 把这些功能使用普通函数导出，能够充分利用 tree shaking 优化打包体积。
- **区分应用和实例**：Vue 2 应用通过构造函数创建，同时这个创建的应用对象也是一个组件，因此实例应用和组件的方法基本完全混在一起，Vue 3 通过 createApp 创建的对象，是一个 vue 应用，它内部提供的方法是针对整个应用的，而不再是一个特殊的组件，因此在属性和方法上区分更清晰。

|                            Vue 3                             |                            Vue 2                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![vue3 应用实例 api](./Vue3.assets/vue3应用实例api.png)<br />![image-20250429203516010](./Vue3.assets/image-20250429203516010.png) | ![vue2 全局 api 组件和应用都具有](./Vue3.assets/vue2全局api组件和应用都具有.png)<br />![vue2 实例 api 组件和应用都具有](./Vue3.assets/vue2实例api组件和应用都具有.png) |



```html
<!-- vue2 -->
<div id="app1"></div>
<div id="app2"></div>
<script>
    Vue.use(/*...*/);              // 此代码会影响所有的vue应用
    Vue.mixin(/*...*/);           // 此代码会影响所有的vue应用
    Vue.component(/*...*/);  // 此代码会影响所有的vue应用

    // 第一个应用
    new Vue({
        // 配置
    }).$mount("#app1")

    // 第二个应用
    new Vue({
        // 配置
    }).$mount("#app2")
</script>
```

```html
<!-- vue3 -->
<div id="app1"></div>
<div id="app2"></div>
<script>  
    // 第一个应用
    createApp(根组件).use(...).mixin(...).component(...).mount("#app1")
    createApp(根组件).mount("#app2")
</script>
```



## 入口文件

- Vue 2 通过构造函数 Vue 创建对象，内置方法通常包含一个 `$` 符号
- Vue 3 不存在构造函数，而是通过具名导入工厂函数 createApp 创建（避免全局配置污染），内置方法 mount 不存在 `$` 符号

```javascript
// Vue 2（main.js）

import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: h => h(App),
}).$mount('#app');
```

```javascript
// Vue 3（main.js）

import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```
## 组件 Api

| 特性                | Options API (Vue 2)                                | Composition API (Vue 3)                      |
| ------------------- | -------------------------------------------------- | -------------------------------------------- |
| **代码组织**        | 按选项（`data`, `methods`, `computed` 等）分类     | 按逻辑功能组织，可自由组合代码块             |
| **逻辑复用**        | 通过 mixins 或 scoped slots（易命名冲突）          | 通过自定义 Hook（如 `useFetch`）实现高复用性 |
| **响应式系统**      | 基于 `Object.defineProperty`（不支持动态新增属性） | 基于 `Proxy`（完全响应式，支持动态属性）     |
| **TypeScript 支持** | 较弱（需额外适配）                                 | 原生支持更好（类型推断更友好）               |
| **生命周期钩子**    | 选项形式（如 `mounted`）                           | 需导入函数（如 `onMounted`）                 |
| **`this` 的使用**   | 依赖 `this` 访问数据/方法                          | 无 `this`，通过 `ref`/`reactive` 直接引用    |
| **代码可读性**      | 简单组件更直观，复杂组件逻辑分散                   | 复杂组件逻辑更集中，但需要良好的拆分习惯     |

![vue3 的组件实例代理](./Vue3.assets/vue3的组件实例代理.jpg)

![vue3 对 ref 的特殊处理](./Vue3.assets/vue3对ref的特殊处理.jpg)

![composition api](./Vue3.assets/composition api.jpg)

![option api](./Vue3.assets/option api.jpeg)

## Composition 和 Reactive Api

Composition API（组合式 API） 是 Vue 3 引入的一种新的代码组织方式，用于替代 Options API（`data`、`methods`、`computed` 等），可以认为 **Composition API** 是一个综合概念，而 **Reactive API** 可以认为是 Composition API 的一部分，但有一些特征差别。
| API                                             | 说明                       |
| ----------------------------------------------- | -------------------------- |
| `setup()`                                       | Composition API 的入口函数 |
| `onMounted()` / `onUpdated()` / `onUnmounted()` | 生命周期钩子               |
| `provide()` / `inject()`                        | 依赖注入                   |

Reactive API（响应式 API） 是 Composition API 的一个子集，专门用于处理**响应式数据**，与 Composition Api 不同的是，Composition Api 大多数函数与组件深度绑定，不能像 reactive 那样脱离组件而存在。
| API                        | 说明                                  |
| -------------------------- | ------------------------------------- |
| `reactive()`               | 创建深层响应式对象（基于 `Proxy`）    |
| `ref()`                    | 创建可变的响应式引用（`.value` 访问） |
| `readonly()`               | 创建只读的响应式对象                  |
| `shallowReactive()`        | 创建浅层响应式对象（仅顶层属性响应）  |
| `shallowRef()`             | 创建浅层 `ref`（不递归转换 `.value`） |
| `toRef()` / `toRefs()`     | 将 `reactive` 对象的属性转为 `ref`    |
| `isReactive()` / `isRef()` | 检查是否是响应式对象或 `ref`          |

```vue
<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

const count = ref(0); // ref 属于 Reactive API
const state = reactive({ name: 'Vue' }); // reactive 属于 Reactive API

const doubleCount = computed(() => count.value * 2); // computed 属于 Composition API

onMounted(() => { // 生命周期钩子属于 Composition API
  console.log('Mounted!');
});
</script>
```

```js
import { reactive, ref, toRefs } from 'vue';

const obj = reactive({ a: 1 }); // reactive
const num = ref(0); // ref
const { a } = toRefs(obj); // toRefs
```

## setup

### this

由于在所有钩子函数之前调用，因此在 setup 函数内 this 是 undefined

### return

setup 通过 return 一个对象，将需要附着在组件实例上的变量、对象、方法等，放在 return 的对象中，如果需要让这个附着的变量变成响应式，则需要使用 ref 或 reactive 包裹，使其变成响应式的数据

### Vue 实例

在 template 中访问响应式数据，是通过响应式数据的实例间接访问的，例如 `const num = ref(0)`，在 template 模板中访问这个 num 变量，则是先去访问 Vue 实例，再通过 Vue 实例去访问代理对象的 value，因此模板上获取到的直接就是代理对象代理的值，而在 **setup** 中由于不存在 Vue 实例对象，因此，直接访问 num 变量得到的就是一个 proxy 代理，需要再访问 value 才能得到实际的值。

### setup() 函数和 script setup

#### setup() 函数

```javascript
export default {
    setup(props, ctx){
        // props 响应式代理对象，包含所有在本组件中定义的 props
        // ctx 响应式代理对象，包含 attrs slots emit expose 四个属性
    }
}
```

| 成员   | 类型 | 说明                                                         |
| ------ | ---- | ------------------------------------------------------------ |
| attrs  | 对象 | 同`vue2`的`this.$attrs`， 包含所有父组件传入的，但未在本组件的 props 或 emits 中定义的属性和时间，在模板中可使用 `$attrs` 实现相同效果 |
| slots  | 对象 | 同`vue2`的`this.$slots`，在模板中可使用 `$slots` 实现相同效果 |
| emit   | 方法 | 同`vue2`的`this.$emit`，在模板中可使用 `$emit` 实现相同效果  |
| expose | 方法 | 选择性暴露（不使用 expose 则默认全部暴露）                   |

```javascript
export default {
    props: ["name"],
    emits: ["toPage"],
    setup(props, ctx) {
        console.log("props", props); // Proxy(Object) {name: undefined}
        console.log("ctx", ctx);
        ctx.emit("toPage"); // 输出父组件的 @toPage 所绑定的方法
    },
};
```

#### 语法糖 script setup

script setup 是 setup()  函数的语法糖，在基本功能上一致，但在属性暴露和选项定义方式上存在关键差异：

1. setup() 函数的返回值会自动附着在组件实例上，因此，能够通过组件的 ref 属性获取并修改 setup() 函数返回的属性，而script setup 不会暴露任何属性给其他组件，这种方式也可通过 setup() 函数的 expose 实现
2. 使用 setup() 函数的写法时，还存在其它选项，例如 props、emits 选项，这些选项在 script setup 中不存在，并且不存在 setup() 函数的 expose 参数方法，因此需要使用 defineProps()、defineEmits() 、defineExpose() 这些函数来实现对应的功能

```html
<template>
  <button @click="$emit('addNum')">{{ num }}</button>
  <button @click="emitSubstractNum">substract</button>
</template>

<script>
  import { readonly, ref } from "vue";

  export default {
    props: {
      num: Number,
    },
    emits: ["addNum", "substractNum"],
    setup(props, { emit, expose }) {
      const tag = readonly(ref("不要动！"));
      const emitSubstractNum = () => {
        emit("substractNum");
      };

      // 选择性暴露（不使用 expose 则默认全部暴露）
      // 这里设置为：外部组件可通过 ref 访问 tag
      expose({
        tag,
      });

      return {
        emitSubstractNum,
      };
    },
  };
</script>
```

```html
<template>
  <button @click="$emit('addNum')">{{ num }}</button>
  <button @click="emitSubstractNum">substract</button>
</template>

<script setup>
import { readonly, ref, defineExpose } from "vue";

const tag = readonly(ref("外部组件不要动！"));
// 选择性暴露（不使用 expose 则默认都不暴露）
// 这里设置为：外部组件可通过 ref 访问 tag
defineExpose({ tag });

/**
 * defineProps 函数的内容跟 props 选项内的写法完全一样
 * defineProps 函数可以返回一个对象，例如 props，然后通过 props 调用属性
 * props: {
 *   num: Number,
 * }
 */
defineProps({
  num: Number,
});

// 用法同 defineProps
const emit = defineEmits(["addNum", "substractNum"]);
const emitSubstractNum = () => {
  emit("substractNum"); // 这里的 emit 是 defineEmits 的返回函数，不是 setup 的参数
};
</script>
```

### 生命周期

setup 在组件初始化时，组件属性被赋值之后立即调用，因此是在所有钩子函数之前调用

| vue2 option api | vue3 option api       | vue 3 composition api           |
| --------------- | --------------------- | ------------------------------- |
| beforeCreate    | beforeCreate          | 不再需要，代码可直接置于setup中 |
| created         | created               | 不再需要，代码可直接置于setup中 |
| beforeMount     | beforeMount           | onBeforeMount                   |
| mounted         | mounted               | onMounted                       |
| beforeUpdate    | beforeUpdate          | onBeforeUpdate                  |
| updated         | updated               | onUpdated                       |
| beforeDestroy   | ==改== beforeUnmount  | onBeforeUnmount                 |
| destroyed       | ==改==unmounted       | onUnmounted                     |
| errorCaptured   | errorCaptured         | onErrorCaptured                 |
| -               | ==新==renderTracked   | onRenderTracked                 |
| -               | ==新==renderTriggered | onRenderTriggered               |

#### 取消 beforeCreate 和 created

不再需要 beforeCreate 和 created api 的原因，这两个 api 都是用于数据注入设置响应式的，在 Vue3 中把响应式 Api 独立出来，通过 ref 或 reactive 等方式实现响应式，因此，只需要将代码置于 setup 中，不需要再使用 beforeCreate 和 create 了。

#### 依赖收集

依赖收集是 Vue 自动追踪数据变化的过程，这个追踪的基础是数据的响应式，例如，存在一个 state.count 的响应式数据，当组件渲染时，会读取这个数据，触发 getter，在触发这个 getter 的时候，getter 会将这个数据记录为组件渲染的依赖，也就建立起了依赖关系，也即响应式连接，然后将依赖关系的记录保存在该数据的响应式对象的依赖管理器中，如果要修改这个数据，则会触发 setter，由 setter 触发依赖管理器进行遍历更新，最后重新渲染组件。

注意，在 Vue 的响应式系统中，依赖收集发生在组件渲染期间，而非每次 getter 调用。

具体来说，依赖收集的触发条件有两个：

- **首次渲染**：组件第一次渲染时，执行渲染函数（如 `setup()` 或 `render()`），此时读取响应式数据会触发 getter，收集依赖。
- **依赖更新后重新渲染**：当依赖的数据变化时，组件会重新渲染，再次触发 getter，重新收集依赖。

```javascript
const state = reactive({ count: 0 });

// 组件渲染时读取state.count → 触发getter → 收集依赖
// 依赖关系：组件A → state.count

state.count++; // 修改数据 → 触发setter → 通知组件A更新
```

#### renderTracked 和 renderTriggered

组件渲染时-**renderTracked**：在初始化或依赖更新后，会执行一次 render 函数的渲染，此时 Vue 会收集组件依赖（即建立响应式连接），该函数就是在依赖收集（组件渲染）的时候触发。

```javascript
renderTracked(e) {
  console.log('追踪依赖:', e.target, e.key);
  // 例如：e.target = state, e.key = 'count'
}
```

数据更新时-**renderTriggered**：当一个响应式依赖被**触发更新**时触发，即响应式数据如果发生变化时，就会触发该生命周期钩子。

```javascript
renderTriggered(e) {
  console.log('触发更新:', e.target, e.key, e.type);
  // 例如：e.type = 'set', e.oldValue = 0, e.newValue = 1
}
```

1. **仅在开发环境生效**：这两个钩子仅用于调试，生产环境会被移除，不影响性能。
2. **执行顺序**：修改数据 → 触发 `renderTriggered` → 组件重新渲染 → 触发 `renderTracked`。
3. 如果组件不重新渲染，`renderTracked` 不会触发，`renderTriggered` 在响应式数据被修改（触发 setter）时触发，无论组件最终是否实际重新渲染。
4. **参数**：target: 跟踪或触发渲染的对象；key: 跟踪或触发渲染的属性；type: 跟踪或触发渲染的方式，例如 get 就是当模板读取响应式数据时，触发的渲染

### composition VS option api 优势

#### 更好的逻辑复用与代码组织

- Options API 中，复用逻辑依赖 mixins，易引发命名冲突和隐式依赖。

- 组合函数（Composable Functions）将相关逻辑封装为独立函数，按需引入，避免了代码碎片化。    

  ```javascript
  // 示例：封装表单验证逻辑    
  function useFormValidation(initialValue) {      
      const value = ref(initialValue);
      const error = ref(''); 
      const validate = () => {  
          error.value = value.value ? '' : '此字段为必填项';   
      };
      return { value, error, validate }; 
  }    
  ```

#### 更友好的类型推导（TypeScript 支持）

  - Options API 的类型定义繁琐，依赖额外的接口声明，无法自动推导组件选项间的类型关系。 -

  -  Composition API 通过按需引入逻辑（如 `ref`、`computed`）减少组件实例的内存占用，Tree-shaking 更友好。

  - Composition API 基于 ES6 函数和模块系统，TypeScript 可自动推导类型。    

    ```javascript
    import { ref } from 'vue';
    
    const count = ref(0); // 自动推导为 Ref<number>
    count.value = 'hello'; // TypeScript 错误提示
    ```

### 选项式Api写法

```html
<!-- Vue 2 或 Vue 3 Options Api -->
<template>
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {
                count: 0
            }
        }
    }
</script>
```

### 组合式Api写法

```html
<!-- Vue 3 Composition Api -->
<template>
    <h1>{{ msg }}</h1>
    <span> count is: {{ count }} </span>
    <button @click="addCount">增加</button>
    <button @click="minusCount">减少</button>
</template>
<script>
    import { ref } from "vue";
    export default {
        setup() {
            const msg = ref("更改数据");
            const count = ref(0);
            const addCount = () => {
                count.value++;
            };
            const minusCount = () => {
                count.value--;
            };
            return {
                count,
                addCount,
                minusCount,
            };
        },
    };
</script>
```

### 混入useHook模式

```html
<template>
    <h1>count:{{ countRef }}</h1>
    <p>
        <button @click="decrease">decrease</button>
        <button @click="increase">increase</button>
    </p>
</template>

<script>
    import { ref } from "vue";

    // 这里的代码可以抽离为单独文件，作为 useHook 方式导入使用
    function useCount() {
        let countRef = ref(0);
        // 增加
        const increase = () => {
            countRef.value++;
        };
        // 减少
        const decrease = () => {
            countRef.value--;
        };
        return {
            countRef,
            increase,
            decrease,
        };
    }

    export default {
        setup() {
            // console.log("所有生命周期钩子函数之前调用");
            // console.log(this); // this -> undefined
            // setup中，count是一个对象
            // 实例代理中，count是一个count.value
            // 通常可以将公共方法抽离出来，类似混入，方法通常使用 use功能()
            return {
                ...useCount(),
            };
        },
    };
</script>

```

## 渲染效率

Vue 3 官方编译器，vite 脚手架自带：`@vue/compiler-sfc` 

### 静态提升

- 静态节点：元素节点、静态属性、没有绑定动态内容的节点
- 提升原理：Vue 3 的编译器会先对静态内容创建一个虚拟节点，然后再在 render 函数中直接使用创建的该静态虚拟节点，因为静态节点已经被提升到了 render 函数之外，因此当响应式的动态内容更新的时候，就可以直接重复使用提升的静态节点变量，而不用每次 render 渲染的时候再创建一遍，而 Vue 2 则不区分静态节点和动态变量，全部都放在 render 函数中重新进行编译，这就导致一些不必要的编译消耗

```javascript
// vue2 的静态节点
render(){
  createVNode("h1", null, "Hello World")
  // ...
}

// vue3 的静态节点
const hoisted = createVNode("h1", null, "Hello World")
function render(){
  // 直接使用 hoisted 即可
}
```

```javascript
/*
    <div class="user">
      {{user.name}}
    </div>
 */

// vue3 的静态属性
const hoisted = { class: "user" }

function render(){
  createVNode("div", hoisted, user.name)
  // ...
}
```

### 预字符串化

对于源代码中存在的大量连续（至少连续 **20 个节点** 左右）的静态节点，Vue 2 会逐个将其编译为虚拟节点，形成一个虚拟节点树，后续更新会通过 diff 算法对比节点的更新，而 Vue 3 会将其编译为一个普通的字符串虚拟节点，然后作为一个静态节点插入到 render 中

```html
<template>
    <div class="menu-bar-container">
        
        
        <!-- 大量连续的静态节点 -->
        <div class="logo">
            <h1>logo</h1>
        </div>
        <ul class="nav">
            <li><a href="">menu</a></li>
            <li><a href="">menu</a></li>
            <li><a href="">menu</a></li>
            <li><a href="">menu</a></li>
            <li><a href="">menu</a></li>
        </ul>
        <!-- 大量连续的静态节点 -->
        
        
        <div class="user" :class="user.name">
            <span :class="user.name">{{ user.name }}</span>
        </div>
    </div>
</template>

<script>
    import HelloWorld from "./components/HelloWorld.vue";

    export default {
        name: "App",
        components: {
            HelloWorld,
        },
        data() {
            return {
                user: {
                    name: "monica",
                },
            };
        },
    };
</script>
```

```javascript
// 连续的静态节点“预字符串化”的结果
 _createStaticVNode("<div class=\"logo\"><h1>logo</h1></div><ul class=\"nav\"><li><a href=\"\">menu</a></li><li><a href=\"\">menu</a></li><li><a href=\"\">menu</a></li><li><a href=\"\">menu</a></li><li><a href=\"\">menu</a></li></ul>"
                    
                    
// 上述组件编译后的结果
import {createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createStaticVNode as _createStaticVNode, openBlock as _openBlock, createElementBlock as _createElementBlock} from "/@modules/vue.js"

const _hoisted_1 = {
    class: "menu-bar-container"
}

export function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (_openBlock(),
    _createElementBlock("div", _hoisted_1, [_cache[0] || (_cache[0] = _createStaticVNode("<div class=\"logo\"><h1>logo</h1></div><ul class=\"nav\"><li><a href=\"\">menu</a></li><li><a href=\"\">menu</a></li><li><a href=\"\">menu</a></li><li><a href=\"\">menu</a></li><li><a href=\"\">menu</a></li></ul>", 2)), _createElementVNode("div", {
        class: _normalizeClass(["user", $data.user.name])
    }, [_createElementVNode("span", {
        class: _normalizeClass($data.user.name)
    }, _toDisplayString($data.user.name), 3 /* TEXT, CLASS */
    )], 2 /* CLASS */
    )]))
}
```

|                        vue2 虚拟节点树                        |                   vue3 虚拟节点树                    |
| :----------------------------------------------------------: | :-------------------------------------------------: |
| ![vue2 虚拟节点树](./Vue3.assets/image-20250428222245822.png) | ![vue3 虚拟节点树](./Vue3.assets/vue3虚拟节点树.png) |

### 缓存事件处理函数

事件处理函数在 Vue 2 中是直接在每次创建虚拟节点的时候，同时创建一个处理函数，而一般情况下处理的逻辑都是相同的，因此，Vue 3 借助了惰性函数的模式，让事件处理函数只渲染一次并缓存，后续直接获取缓存的处理函数即可。

```javascript
/*
    <button @click="count++">plus</button>
 */

// vue2
render(ctx){
  return createVNode("button", {
    onClick: function($event){
      ctx.count++;
    }
  })
}

// vue3
render(ctx, _cache){
  return createVNode("button", {
    onClick: cache[0] || (cache[0] = ($event) => (ctx.count++))
  })
}
```

### BlockTree

当界面出现了节点更新的时候，Vue 2 会通过 diff 算法对比节点的更新，但由于 Vue 2 没有对这些节点进行标记，使其无从得知哪些节点发生了变化，因此只能逐层逐个地进行遍历对比，当遍历到发生了变化的节点，则使用 patch 算法更新节点，以此类推到遍历全部节点树，而 Vue 3 则对界面的每个节点进行标记，如果标记的节点是动态节点，则会以数组形式批量记录在根节点 Block（这个 Block 是一个稳定的节点数，如果存在树不稳定时，则会划分多个子 Block，然后以此类推，再进行 Block 树的动态节点收集），然后在进行对比时，直接从 Block 根节点遍历存储了动态节点对象的数组，将其元素拿出来循环对比，最终便省略了大量的静态节点的对比过程。

|                    vue2diff 对比 patch 更新                     |                    vue3diff 对比 patch 更新                     |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![vue2diff 对比 patch 更新](./Vue3.assets/vue2diff对比patch更新.png) | ![vue3diff 对比 patch 更新](./Vue3.assets/vue3diff对比patch更新.png) |

### PatchFlag

当经过了 diff 算法的对比之后，这时便需要通过 patch 更新节点，由于此时已经找打了变化的节点，那么 Vue 2 和 Vue 3 的对比更新应该就相同了吧，但 Vue 2 并不知道这个节点哪些相关信息会发生变化，所以还会对找到的该节点，再此递归遍历子节点，即从元素的类型、属性、内容等注意对比，直到找到不同的地方，再执行更新，而 Vue 3 则是通过 BlockTree 阶段就做好的标记，省略递归遍历过程，直接找到需要更新的子节点。

![vue2 和 vue3 的 PatchFlag](./Vue3.assets/vue2和vue3的PatchFlag.png)

![vue3 对动态内容做的标记](./Vue3.assets/vue3对动态内容做的标记.png)

## 数据响应式

- Vue 2 和 Vue 3 完成数据响应式都是在 **beforeCreate 之后，created 之前**，这期间执行了数据注入(injections)和数据响应(reactivity)
- Vue 2 的响应式系统是对 data 中的数据进行递归遍历，并对遍历的每一个属性通过 defineProperty 设置为响应式，因此如果 data 数据量太大或属性层次过深，就会导致运行速度减慢，并且这种遍历操作只在初始化执行一次，后续就算有新的 data 数据，也不会对其进行遍历，因此 Vue 2 的 data 必须要在一开始就设定好，如果对象有新增属性，Vue 2 提供了 $set 方法，但这个方法在 Vue 3 去除了
- Vue 3 是对 data、组件对象、实例对象等使用 proxy 实例化，创建一个代理对象，在代理对象可以通过 get 和 set 方法动态地按需读取和设置数据，因此即使没有遍历每一个属性，但也能通过代理对象直接操作数据，这个创建代理对象的过程非常迅速，即使达到上亿级别数据，也能瞬间完成，并且 proxy 底层的代码效率本就比 defineProperty 更高，从而提高了数据响应式的性能，除此之外，proxy 能够监听到成员的任何新增和删除，即使是添加不存在的属性，也能监听到，通过这种动态的监听作用就能在 Vue 3 中不通过 $set 也能完成 Vue 2 新增数据响应的功能

```javascript
const p = new Proxy(data,{
    get(){/*...*/},
    set(){/*...*/}
})
p.name; 			 // 读取时，执行 get 方法
p.name = "James";	// 设置时，执行 set 方法
```

![vue2 和 vue3 的数据响应式](./Vue3.assets/vue2和vue3的数据响应式.png)

### reative

深度代理对象中的所有成员，但无法代理基本数据类型

- 修饰：`plain-object`
- 返回：proxy 代理

### readonly

深度代理对象中的所有成员，不可修改

- 修饰：`plain-object` 或 `proxy`
- 返回：proxy 代理

### ref

由于只有对象才有可能设置为响应式，因此 ref 会首先生成一个 proxy 对象，将要设置为响应式的数据赋值给这个对象的 value 属性中，然后再通过对 value 设置 set 和 get 访问器实现响应式，因此 ref 代理的情况就有三种：

1. 如果是基本数据类型，则会将数据直接赋值给 value 属性
2. 如果是普通对象，直接复制给 value，就会导致访问 value 获取对象的时候，会得到一个普通对象，失去响应式，因此在赋值给 value 前会调用 reactive 进行处理，这样即使通过 value 访问对象，获取的也是 reactive 的代理对象，仍然具有响应式
3. 如果是 ref 或 reactive 响应式数据，则直接使用，不做任何处理

- 修饰：`any`
- 返回：ref object

### computed

computed 方法会根据情况决定是否运行函数：

1. 初始化时不会直接执行
2. 当第一次访问 computed 返回的 value 时，会执行一次，后续都是从缓存读取
3. 当 computed 中的响应式数据发生变化，并且再次读取 value 时候，才会重新执行一次，后续又再次从缓存中读取

Vue 2 中，computed 计算属性会收集依赖，然后通过 computed 的 getter 来返回最终的计算结果，返回的结果是一个 ref object，如果要对这个计算结果进行修改，可以通过修改这个计算属性，即通过 setter 来更改计算属性的原状态，然后再通过 getter 返回新的计算结果

Vue 3 的官方文档对这一种直接通过 setter 修改，影响 computed 计算结果的行为，提出了否定意见，文档明确提出一个最佳实践，认为 computed 应该被视为一种数据快照，作为一种只读属性进行访问，而不是通过 setter 直接影响计算结果，如果要修改就算结果，则应该通过一个独立方法，修改原状态，让 computed 自动得出新的计算结果。

但 Vue 3 的 setter api 依然可用，并且没有提出 depreciated 警告，因此如果实践中依然使用 setter，还是能在事实上实现与 Vue 2 一样的效果。

1. **Getter 方法**：
   - 当访问计算属性时自动调用
   - 应返回计算后的值
   - 具有缓存特性，只有依赖的响应式数据变化时才会重新计算
2. **Setter 方法**：
   - 当尝试设置计算属性时调用
   - 接收要设置的新值作为参数
   - 通常用于分解新值并更新依赖的数据

```javascript
export default {
    computed: {
        fullName: {
            // getter 方法
            get() {
                return this.firstName + ' ' + this.lastName;
            },
            // setter 方法
            set(newValue) {
                const names = newValue.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            }
        }
    }
}
```

```javascript
import { ref, computed } from 'vue'

const firstName = ref('张')
const lastName = ref('三')

// 只读计算属性
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

// 可写计算属性
const reversedName = computed({
    get() {
        return fullName.value.split('').reverse().join('')
    },
    set(newValue) {
        const normalName = newValue.split('').reverse().join('')
        const [first, last] = normalName.split(' ')
        firstName.value = first
        lastName.value = last
    }
})
```

`computed` 属性的依赖是通过其回调函数内的响应式数据访问来自动追踪的。不过，这种依赖追踪属于浅追踪，若要对嵌套对象或数组的深层变化进行响应，就得明确地在计算属性的回调函数里访问这些深层属性。

```javascript
export default {
    data() {
        return {
            user: {
                name: '张三',
                address: {
                    city: '北京',
                    street: '朝阳大街'
                }
            }
        }
    },
    computed: {
        // 错误示例：不会响应 address.city 的变化
        fullAddress1() {
            return this.user.address; // 只追踪了 address 对象的引用
        },

        // 正确示例：明确访问深层属性，会响应 address.city 的变化
        fullAddress2() {
            return `${this.user.address.city}市${this.user.address.street}`;
        }
    }
}
```



### 练习题

- 响应式返回两种对象格式，`ref object` 和 `proxy` 
- 如果想要让一个对象变为响应式数据，可以使用`reactive`或`ref`
- 如果想要让一个对象的所有属性只读，使用`readonly`
- 如果想要让一个非对象数据变为响应式数据，使用`ref`
- 如果想要根据已知的响应式数据得到一个新的响应式数据，使用`computed`

```javascript
import { reactive, readonly, ref, computed } from "vue";

const state = reactive({
  firstName: "Y",
  lastName: "Charles",
});
const fullName = computed(() => {
  console.log("changed");
  return `${state.lastName}, ${state.firstName}`;
});
console.log("state ready");
console.log("fullname is", fullName.value);
console.log("fullname is", fullName.value);
const imState = readonly(state);
console.log(imState === state);

const stateRef = ref(state);
console.log(stateRef.value === state);

state.firstName = "xiao";
state.lastName = "yu";

console.log(imState.firstName, imState.lastName);
console.log("fullname is", fullName.value);
console.log("fullname is", fullName.value);

const imState2 = readonly(stateRef);
console.log(imState2.value === stateRef.value);

const imState3 = reactive(stateRef);
console.log(imState3.value === stateRef.value);

/*
state ready
changed
fullname is Charles, Y
fullname is Charles, Y
false
true
xiao yu
changed
fullname is yu, xiao
fullname is yu, xiao
false
true
 */
```

```javascript
function useUser(){
    // 在这里补全函数
    return {
        user, // 这是一个只读的用户对象，响应式数据，默认为一个空对象
        setUserName, // 这是一个函数，传入用户姓名，用于修改用户的名称
        setUserAge, // 这是一个函数，传入用户年龄，用户修改用户的年龄
    }
}

// --------------------
function useUser() {
    // 在这里补全函数
    const _user = reactive({
        name: "",
        age: "",
    });
    const user = readonly(_user);
    const setUserName = (name) => {
        _user.name = name;
    };
    const setUserAge = (age) => {
        _user.age = age;
    };
    return {
        user, // 这是一个只读的用户对象，响应式数据，默认为一个空对象
        setUserName, // 这是一个函数，传入用户姓名，用于修改用户的名称
        setUserAge, // 这是一个函数，传入用户年龄，用户修改用户的年龄
    };
}
```

```javascript
function useDebounce(obj, duration){
    // 在这里补全函数
    return {
        value, // 这里是一个只读对象，响应式数据，默认值为参数值
        setValue // 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，混合操作需要在 duration 的时间中防抖
    }
}

// --------------------
function useDebounce(obj, duration) {
    // 在这里补全函数
    let _value = reactive(obj);
    const value = readonly(_value);
    let timer = null;

    const setValue = (newObj) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            console.log("changed");
            _value = Object.assign(_value, newObj);
        }, duration);
    };

    return {
        value, // 这里是一个只读对象，响应式数据，默认值为参数值
        setValue, // 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，混合操作需要在duration的时间中防抖
    };
}

//-----
const ob = {
  a: 1,
  b: 2,
};
const valueDe = useDebounce(ob, 1000);
valueDe.value.a = 10;
console.log(valueDe.value, valueDe.value.a);
valueDe.setValue({ a: 10 });
// valueDe.value = 10
console.log(valueDe.value, valueDe.value.a);
setTimeout(() => {
  console.log(valueDe.value, valueDe.value.a);
}, 2000);
/*
[Vue warn] Set operation on key "a" failed: target is readonly. Proxy(Object) {a: 1, b: 2}
Proxy(Object) {a: 1, b: 2} 1
Proxy(Object) {a: 1, b: 2} 1
changed
Proxy(Object) {a: 10, b: 2} 10
 */
```

### 判断是否响应式

| API          | 含义                                                         |
| ------------ | ------------------------------------------------------------ |
| `isProxy`    | 判断某个数据是否是由 `reactive` 或 `readonly`                |
| `isReactive` | 判断某个数据是否是通过 `reactive` 创建的<br />详细:https://v3.vuejs.org/api/basic-reactivity.html#isreactive |
| `isReadonly` | 判断某个数据是否是通过 `readonly` 创建的                     |
| `isRef`      | 判断某个数据是否是一个 `ref` 对象                            |

### 转化为响应式

#### unref

等同于：`isRef(val) ? val.value : val`

```javascript
import { unref, ref } from "vue";
const dataRef = ref(10);
const number = 10
console.log(unref(dataRef) === number); // true
```

#### toRef

得到一个响应式对象某个属性的 ref 格式

```javascript
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo'); // fooRef: {value: ...}

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```

```javascript
import { reactive, toRef } from "vue";

const dataObj = reactive({ a: 10 });
console.log(dataObj.a); // 10
const dataObjA = toRef(dataObj, "a");
console.log(dataObjA.value); // 10
```

#### toRefs

把一个响应式对象的所有属性转换为 ref 格式，然后包装到一个 `plain-object` 中返回

```javascript
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs: not a proxy
{
  foo: { value: ... },
  bar: { value: ... }
}
*/
```

应用：在使用展开运算符或者解构的时候，里面的属性会变成普通对象的属性 a:1, b:2，从而导致失去响应式，因此需要使用 toRefs 方法将里面的所有属性转换为 ref 格式，这样一来就算使用展开运算符或解构，也不会失去响应式

```javascript
setup(){
  const state1 = reactive({a:1, b:2});
  const state2 = reactive({c:3, d:4});
  return {
    ...state1, // lost reactivity reactive 
    ...state2 // lost reactivity
  }
}

setup(){
  const state1 = reactive({a:1, b:2});
  const state2 = reactive({c:3, d:4});
  return {
    ...toRefs(state1), // reactivity
    ...toRefs(state2) // reactivity
  }
}
// composition function
function usePos(){
  const pos = reactive({x:0, y:0});
  return pos;
}

setup(){
  const {x, y} = usePos(); // lost reactivity
  const {x, y} = toRefs(usePos()); // reactivity
}
```

建议：所有的 `composition function` 均以 `ref` 的结果返回，以保证 `setup` 函数的返回结果中不包含 `reactive` 或 `readonly` 直接产生的数据

```javascript
function usePos(){
  const pos = reactive({ x:0, y:0 });
  return toRefs(pos); //  {x: refObj, y: refObj}
}
function useBooks(){
  const books = ref([]);
  return {
    books // books is refObj
  }
}
function useLoginUser(){
  const user = readonly({
    isLogin: false,
    loginId: null
  });
  return toRefs(user); // { isLogin: refObj, loginId: refObj }  all ref is readonly
}

setup(){
  // 在 setup 函数中，尽量保证解构、展开出来的所有响应式数据均是 ref
  return {
    ...usePos(),
    ...useBooks(),
    ...useLoginUser()
  }
}
```

## v-model

- Vue 2 中 v-model 和 sync 修饰符都用于双向绑定，但场景不同：`v-model` 用于 value 和 input/change 事件，`sync` 用于跨组件的属性和 update 事件的语法糖；

- Vue 3 将 sync 修饰符舍弃，将其特性合并于 v-model 指令，为了让 `v-model` 更好的针对多个属性进行双向绑定，`vue3` 作出了以下修改

  - 当对自定义组件使用 `v-model` 指令时，绑定的属性名由原来的 `value` 变为 `modelValue`，事件名由原来的 `input` 变为 `update:modelValue` 

    ```html
    <!-- vue2 -->
    <ChildComponent :value="pageTitle" @input="pageTitle = $event" />
    <!-- 简写为 -->
    <ChildComponent v-model="pageTitle" />
    
    <!-- vue3 -->
    <ChildComponent
                    :modelValue="pageTitle"
                    @update:modelValue="pageTitle = $event"
                    />
    <!-- 简写为 -->
    <ChildComponent v-model="pageTitle" />
    ```

  - 去掉了 `.sync` 修饰符，它原本的功能由 `v-model` 的参数替代

    ```html
    <!-- vue2 -->
    <ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
    <!-- 简写为 -->
    <ChildComponent :title.sync="pageTitle" />
    
    <!-- vue3 -->
    <ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
    <!-- 简写为 -->
    <ChildComponent v-model:title="pageTitle" />
    ```

### 绑定默认的 modelValue

```html
<!-- 父组件 使用 modelValue 和 update:modelValue-->
<template>
    <Count :modelValue="msg" @update:modelValue="changeMsg" />
</template>
<script setup lang="ts">
    import Count from "./components/Count.vue";
    import { ref } from "vue";
    // 父组件的数据
    const msg = ref(50);
    // 父组件更改数据的方法 - 接受子组件将数据传递过来的数据
    // 要是需要简写为 v-model 就只能是单纯的赋值
    const changeMsg = (val) => {
        msg.value = val;
    };
</script>
```

```html
<!-- 父组件 使用 v-model -->
<template>
    <Count v-model="msg" />
</template>
<script setup lang="ts">
    import Count from "./components/Count.vue";
    import { ref } from "vue";
    // 父组件的数据
    const msg = ref(50);
    // 父组件更改数据的方法 - 接受子组件将数据传递过来的数据
    // 要是需要简写为 v-model 就只能是单纯的赋值
    // const changeMsg = (val) => {
    //     msg.value = val;
    // };
</script>
```

```html
<!-- 子组件 Count  -->
<template>
    <h1>{{ modelValue }}</h1>
    <input type="number" v-model="count" />
    <button @click="add">+</button>
</template>
<script setup lang="ts">
    import { ref } from "vue";
    const count = ref(0);
    // 声明 prop 接受绑定的值
    const props = defineProps({
        modelValue: {
            type: Number,
            default: 0,
        },
    });
    // 声明 emit 的 update:modelValue 用于传递数据给父组件
    const emits = defineEmits(["update:modelValue"]);
    const add = () => {
        emits("update:modelValue", props.modelValue + count.value);
    };
</script>
```

### 绑定指定的值

Vue 2 中需要额外使用 model 来指定绑定的其他值

Vue 3 只需直接使用 `v-model:绑定值`，因此 model 配置被移除了

```html
<!-- 父组件 使用 v-model:message 将 message 配置为双向绑定 -->
<template>
    <Count v-model:message="msg" />
</template>

<script setup lang="ts">
    import Count from "./components/Count.vue";
    import { ref } from "vue";

    // 父组件的数据
    const msg = ref(50);
</script>
```

```html
<!-- 子组件 Count  -->
<template>
    <h1>{{ message }}</h1>
    <!-- 其它代码同上 -->
</template>

<script setup lang="ts">
    /*   其它代码同上   */

    // 声明 prop 接受绑定的值
    const props = defineProps({
        message: {
            type: Number,
            default: 0,
        },
    });

    // 声明 emit 的 update:message 用于传递数据给父组件
    // 这里相当于是把 update:modelValue 换成了 update:message
    // 就是说 v-model 把默认绑定的 modelValue 换成了 message
    const emits = defineEmits(["update:message"]);
    const add = () => {
        emits("update:message", props.message + count.value);
    };
</script>
```

### 绑定多个双向绑定值

Vue 2 中只能一次绑定一个值

```html
<!-- 父组件 -->
<template>
  <Count v-model:message="msg" v-model:result="result" />
</template>

<script setup lang="ts">
import Count from "./components/Count.vue";
import { ref } from "vue";

// 父组件的数据
const msg = ref(50);
const result = ref("不合格");
</script>
```

```html
<template>
  <h1>{{ message }}</h1>
  <h1>{{ result }}</h1>
  <input type="number" v-model="count" />
  <button @click="add">+</button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);

// 声明 prop 接受 result
const props = defineProps({
  message: {
    type: Number,
    default: 0,
  },
  result: {
    type: String,
    default: "",
  },
});

// 声明 emit 的 update:message 用于传递数据给父组件
const emits = defineEmits(["update:message", "update:result"]);
const add = () => {
  emits("update:message", props.message + count.value);
  emits("update:result", props.message + count.value > 60 ? "合格" : "不合格");
};
</script>

```

### 自定义修饰符

v-model 支持修饰符，只在 Vue 3 中生效，在 Vue 2 中不具备自定义功能

```html
<!-- 父组件 -->
<template>
    <Count
           v-model.decoration="mVal"
           v-model:message.lock="msg"
           v-model:result.check.color="result"
           />
</template>

<script setup lang="ts">
    import Count from "./components/Count.vue";
    import { ref } from "vue";

    // 父组件的数据
    const mVal = ref("初始化");
    const msg = ref(50);
    const result = ref("不合格");
</script>
```

```html
<template>
    <h1>
        {{ modelModifiers.decoration ? "--" + modelValue + "--" : modelValue }}
    </h1>
    <h1>{{ messageModifiers.lock ? "锁分60" : message }}</h1>
    <h1
        :style="{
                color: `${resultModifiers.color ? 'red' : ''}`,
                }"
        >
        {{ resultModifiers.check ? result : "不检查" }}
    </h1>
    <input type="number" v-model="count" />
    <button @click="add">+</button>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    const count = ref(0);

    // 声明 prop 接受 result
    const props = defineProps({
        modelValue: {},
        modelModifiers: {},
        message: {
            type: Number,
            default: 0,
        },
        messageModifiers: {},
        result: {
            type: String,
            default: "",
        },
        resultModifiers: {},
    });

    const emits = defineEmits(["update:message", "update:result"]);
    const add = () => {
        emits("update:message", props.message + count.value);
        emits("update:result", props.message + count.value > 60 ? "合格" : "不合格");
    };
</script>
```

![v-model 自定义修饰符演示](./Vue3.assets/v-model自定义修饰符演示.png)

![v-model 自定义修饰符图解](./Vue3.assets/v-model自定义修饰符图解.png)

## key 值的变化

- **template 上的变化**：如果使用了 template 进行 v-for 循环，Vue 3 需要将 key 加在 template 上，Vue 2 则是加在内部的实际标签上

- **if 分支上的变化**：Vue 3 会在 if 分支上自动加上 key，因此不需要手动加 key，但 Vue 2 需要手动添加，否则会因为缺少 key 值导致组件元素沿用旧有节点的问题

## 异步组件

- Vue 2 中异步组件的一般实现方式：
  - 直接通过工厂函数返回对象
  - promise 方式：`()=>import (组件路径)` 

- Vue 3 专门提供了一个 defineAsyncComponent 方法来定义异步函数，该方法传入一个返回 promise 的函数，因此一般来说可以传入一个 `()=> import(组件路径)`

### 局部异步 - 传入函数

```html
<template>
    <div class="container">
        <contentComp></contentComp>
    </div>
</template>

<script setup lang="ts">
    import { defineAsyncComponent } from "vue";
    // 异步组件
    // contentComp 组件要等到 defineAsyncComponent 加载完成之后才显示
    const contentComp = defineAsyncComponent(
        () => import("./components/Content.vue")
    );
</script>
```

```javascript
import { defineAsyncComponent } from "vue";

const delay = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, 5000);
    });
};

const contentComp = defineAsyncComponent(async () => {
    // 手动延时
    await delay();
    // 异步组件
    return import("./components/Content.vue");
});
```

### 局部异步 - 传入对象

```html
<!-- Error.vue -->
<template>
    <div>
        <slot></slot>
        {{ error }}
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    const error = ref("出错了");
</script>
```

```html
<!-- Loading.vue -->
<template>
  <div>{{ load }}</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const load = ref("loading...");
</script>
```

```javascript
import Loading from "./components/Loading.vue";
import ErrorVue from "./components/Error.vue";

const delay = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, 200);
    });
};

const contentComp = defineAsyncComponent({
    // loader 组件成功加载的部分，如果 defineAsyncComponent 传入的是函数，则就是这个 loader
    loader: async () => {
        await delay();
        if (Math.random() > 0.5) {
            throw new Error();
        }
        return import("./components/Content.vue");
    },
    // loadingComponent 当 Promise 还在 pending 的时候，显示该组件
    loadingComponent: Loading,
    // errorComponent 当 Promise 还在 reject 的时候（例如在异步加载的时候报错），显示该组件
    errorComponent: {
        render() {
            return h(ErrorVue, "加载");
        },
    },
});
```



### 页面异步

```javascript
import { createRouter, createWebHashHistory } from "vue-router";
import { defineAsyncComponent, h } from "vue";
import LoadingVue from "../components/Loading.vue";
import ErrorVue from "../components/Error.vue";

const delay = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(null)
        }, 2000);
    })
}
const routes = [
    {
        path: "/",
        // Vue2 和 Vue3 都适用的异步
        component: () => import("../views/home.vue")
    },
    {
        path: "/about",
        // Vue3 适用的异步页面，用法与局部异步相同
        component: defineAsyncComponent({
            loader: async () => {
                await delay()
                if (Math.random() > 0.5) {
                    throw new Error()
                }
                return import("../views/about.vue")
            },
            loadingComponent: LoadingVue,
            errorComponent: {
                render() {
                    return h(ErrorVue, "about页面加载")
                }
            }
        })
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
```

## Teleport

工作原理

1. 虚拟 DOM 层面

   - Teleport 在虚拟 DOM 中创建了一个特殊的节点

   - 在 patch 过程中，Vue 会将这个节点的子节点渲染到目标位置

   - 但仍然保持组件上下文关系（父子关系、provide/inject 等）
2. DOM 操作层面

   - 实际 DOM 元素会被移动到目标位置

   - 当组件销毁时，Teleport 内容也会被正确清理
3. 性能考虑

   - DOM 操作：Teleport 会触发实际的 DOM 移动，频繁切换可能导致重排
4. 源码简析，Teleport 是一个内置组件（类似 KeepAlive）主要逻辑在：
   - 编译阶段：处理 to 和 disabled 属性
   - 运行时：创建特殊的虚拟节点类型（TeleportImpl）
   - Patch 过程：根据目标位置处理实际的 DOM 操作

```html
<teleport to="css选择器">
    <!-- 要传送的内容 -->
</teleport>
```

```html
<!-- 禁用 Teleport -->
<teleport to="#target" :disabled="isDisabled">
    <div>可禁用内容</div>
</teleport>
```

```html
<!-- 全屏加载 -->
<teleport to="body">
    <div v-if="isLoading" class="fullscreen-loading">
        <Spinner />
    </div>
</teleport>
```

```html
<!-- 局部通知 -->
<teleport to="#notification-area">
    <ToastNotification v-for="msg in messages" :key="msg.id" :message="msg" />
</teleport>
```

## 监听数据变化

### watchEffect

watchEffect 的回调函数只要用到了**响应式数据**，那么这个回调函数就会自动依赖这个响应式数据，例如：

```javascript
const name = ref("")
watchEffect(()=>{
    console.log(name)
})

/*
首先，name 是响应式数据；
其次，watchEffect 的回调用到了 name；
因此，watchEffect 的回调则会依赖 name，在初始化的时候就会马上同步执行一次，如果所依赖变量发生变化，那么对应依赖的函数都会重新执行一次，因此只要 name 发生了变化，watchEffect 的回调由于依赖于 name，因此这个回调也会跟着发生变化
 */
```

```javascript
const name = ref(0)
watchEffect(()=>{
    console.log(name)
})

name.value++;
name.value++;
name.value++;
/*
如果 watchEffect 连续更改多次数据，回调只会执行一次，因为是放到了微队列中
 */
```

```javascript
const name = ref(0)
const stopWatchName = watchEffect(()=>{
    // 该函数会立即执行，然后追中函数中用到的响应式数据，响应式数据变化后会再次执行
})

stopWatchName(); // 调用返回函数，停止监听
```

### watch

```javascript
// 监听单个数据的变化
const num = ref(0);
watch(
    num,
    (newValue,oldValue)=>{
        console.log('新值', newValue, '旧值', oldValue);
    },
    {
        immediate: true,
        deep: true
    }
);
```

```javascript
// 监听多个数据的变化
import { reactive, ref, watch } from "vue";
const w1Ref = ref(0);
const w1Reactive = reactive({ a: 1 });
const w2Ref = ref({ b: 1 });
const w2Reactive = reactive({ c: 1 });

// watch 只能监控响应式的值，如果想要监控一个非响应式的值，需要使用回调函数
watch(
  [
    w1Ref, // 监控 ref 响应式
    w1Reactive, // 监控 reactive 响应式
    () => w2Ref.value.b, // 这里取到的最终结果是一个字面量，不是响应式，所以需要使用回调
    () => w2Reactive.c, // 监控 reactive 的属性，因为属性不是响应式，这里需要使用回调
  ],
  (
    [w1RefNewVal, w1ReactiveNewVal, w2RefNewVal, w2ReactiveNewVal],
    [w1RefOldVal, w1ReactiveOldVal, w2RefOldVal, w2ReactiveOldVal]
  ) => {
    console.log(w1Ref.value);
    console.log(w1Reactive);
    console.log(w2Ref.value);
    console.log(w2Reactive);
    console.log(news, olds);
  }
);
```

**注意：无论是 `watchEffect` 还是 `watch`，当依赖项变化时，回调函数的运行都是异步的（微队列）**

应用：除非遇到下面的场景，否则均建议选择 `watchEffect`

- 不希望回调函数一开始就执行
- 数据改变时，需要参考旧值
- 需要监控一些回调函数中不会用到的数据

### 练习题

```javascript
import { reactive, watchEffect, watch } from "vue";
const state = reactive({
  count: 0,
});
watchEffect(() => {
  console.log("watchEffect", state.count);
});
watch(
  () => state.count,
  (count, oldCount) => {
    console.log("watch", count, oldCount);
  }
);
console.log("start");
setTimeout(() => {
  console.log("time out");
  state.count++;
  state.count++;
});
state.count++;
state.count++;

console.log("end");

/*
watchEffect 0
start 
end
watchEffect 2
wwatch 2 0
time out
watchEffect 4 
watch 4 2
 */
```

## 全局数据

### vuex 方案

安装 `npm install vuex@4` 

两个重要变动：

- 去掉了构造函数`Vuex`，而使用`createStore`创建仓库
- 为了配合`composition api`，新增`useStore`函数获得仓库对象

```javascript
// src/store/index.js
import { createLogger, createStore } from "vuex";

const store = createStore({
  // vuex 会在控制台输出store变更的日志
  plugins: [createLogger()],
  state() {
    return {
      num: 0
    }
  },
  mutations: {
    increaseNumber(state) {
      state.num++
    }
  }
})

export default store 
```

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')
```

```html
<template>
  <div>{{ store.state.num }}</div>
  <button @click="addNumber">add</button>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const useChangeArr = () => {
      arr[0] = 11;
    };
    const addNumber = () => {
      store.commit("increaseNumber");
    };
    return {
      store,
      addNumber,
    };
  },
};
</script>
```

### 全局响应式数据

由于 Vue3 的 ref、reactive、readonly 等响应式 Api 是脱离于组件存在的，因此可以通过自定义 Hook 方式，将需要进行共享的数据，设置在一个全局共有的文件中，保障响应式的源头只有一个，从而实现一份数据多处共享的单例对象，并且由于 import 模块导入有缓存，所以响应式 Api 如果没有更新就只会执行一次，后续直接从缓存获取。

```javascript
// src/store/useGlobalState.js
import { ref, reactive, computed, readonly } from 'vue'

// 定义全局状态（单例）
const count = ref(0)
const user = reactive({ name: 'Guest', age: 0 })
const doubleCount = computed(() => count.value * 2)
// 使用 readonly 防止数据在外部被篡改
// 也可以进一步使用toRefs进行封装，从而避免解构或展开后响应式丢失
const state = readonly({ count, user, doubleCount })

// 定义修改状态的方法
const increment = () => {
  count.value++
}

const setUser = (newUser) => {
  Object.assign(user, newUser)
}

// 导出组合式函数（Hook）
export const useGlobalState = () => {
  return {
    state,
    increment,
    setUser
  }
}
```

```html
<!-- 在组建中使用 -->
<template>
  <button @click="addNumber">add</button>
  <div>{{ globalState.state.doubleCount }}</div>
</template>

<script>
  import { useGlobalState } from "../store/useGlobalState";

  export default {
    setup() {
      const globalState = useGlobalState();
      const addNumber = () => {
        globalState.increment(); // 调用方法修改
        globalState.state.doubleCount = 100; // 修改无效，因为设置了 readonly
      };
      return {
        globalState,
      };
    },
  };
</script>
```

### provide & inject

在 Vue2 的选项式 Api 中，可以通过高层组件的 provide 和 inject 配置注入数据，然后再后代组件中使用；在 Vue3 中，组合式 Api 提供了 provide 和 inject 方法，可以通过 Vue3 的 createApp 创建的实例，调用 provide 方法注入，然后在子组件中调用 inject 使用注入的数据。

#### Vue2 provide 

在组建树中注入和使用数据

```javascript
// 父组件
export default {
  provide: {
    message: 'Hello from parent'
  }
}

// 后代组件
export default {
  inject: ['message'],
  created() {
    console.log(this.message); // "Hello from parent"
  }
}
```

#### Vue3 provide()

`provide` 和 `inject` 是函数，需要在 `setup()` 中使用，且支持响应式。

```javascript
// 父组件
import { provide, ref } from 'vue';

export default {
  setup() {
    const message = ref('Hello from parent');
    provide('message', message); // 提供响应式数据
  }
}

// 后代组件
import { inject } from 'vue';

export default {
  setup() {
    const message = inject('message');
    return { message }; // 响应式引用，可直接在模板中使用
  }
}
```

```javascript
// main.js 根文件 provide
import { createApp, ref } from 'vue'
import App from './App.vue'
const num = ref(100);
createApp(App).provide("number", num).mount('#app')

// 组件inject
import { inject } from "vue";
export default {
  setup() {
    const number = inject("number");
    return {
      number,      
    };
  },
};
```

#### Vue3 使用示例

```javascript
// store/useLoginUser 提供当前登录用户的共享数据
// 以下代码仅供参考
import { readonly, reactive, inject } from "vue";
const key = Symbol(); // Provide的key

// 在传入的vue应用实例中提供数据
export function provideStore(app) {
  // 创建默认的响应式数据
  const state = reactive({ user: null, loading: false });
  // 登录
  async function login(loginId, loginPwd) {  /*...*/  }
  // 退出
  async function loginOut() {  /*...*/  }
  // 恢复登录状态
  async function whoAmI() {  /*...*/  }
  // 提供全局数据
  app.provide(key, {
    state: readonly(state), // 对外只读
    login,
    loginOut,
    whoAmI,
  });
}

// main.js
import { createApp } from "vue";
import provideStore from "./store";
const app = createApp(App);
provideStore(app);
app.mount("#app");
```







----

