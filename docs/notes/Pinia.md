#  Pinia

## Pinia 是什么

- 兼容组合式 API 的 Vue 状态管理库 

- [简介 | Pinia](https://pinia.vuejs.org/zh/introduction.html) 

## Store 是什么

- [Store](https://pinia.vuejs.org/zh/getting-started.html#what-is-a-store)（如 Pinia）是一个保存状态和业务逻辑的实体，它并不与你的组件树绑定。换句话说，**它承载着全局状态**。它有点像一个永远存在的组件，每个组件都可以读取和写入它。

- 它有**三个概念**，[state](https://pinia.vuejs.org/zh/core-concepts/state.html)、[getter](https://pinia.vuejs.org/zh/core-concepts/getters.html) 和 [action](https://pinia.vuejs.org/zh/core-concepts/actions.html)，我们可以假设这些概念相当于组件中的 `data`、 `computed` 和 `methods`。

## 安装&挂载

```js
npm install pinia
```

```js
/* main.ts 文件 */

import { createPinia } from "pinia";


const pinia = createPinia(); // 创建 pinia 实例

createApp(App)
  .use(pinia) // 挂载实例
  .mount("#app");
```

## Store

### 定义 Store

- 定义方法：`defineStore(参数1, 参数2)` 
- 参数1：唯一值，会作为 Store 的唯一 ID，pinia 会用这它来连接 store 和 devtools
- 参数2：接受两类值：setup 函数和 option 对象
- 创建的时候支持两种风格，option API 以及 setup 函数

```javascript
import { defineStore } from "pinia"

// defineStore() 的返回值的命名是自由的
// 但最好含有 store 的名字，且以 `use` 开头，以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID
export const useMessageStore = defineStore("message", {
  // 其它配置
})

export const useMessage2Store = defineStore("message2", ()=>{
  // setup 函数的写法
})
```

### option API 

- 与 Vue 的选项式 API 类似，可以认为：
  - state 是 store 的数据 (data)
  - getters 是 store 的计算属性 (computed)
  - actions 则是方法 (methods)
- 该风格基本上和 Vuex 非常相似，只是没有 mutation，无论是同步的方法还是异步的方法，都写在 actions 里面

```js
import { defineStore } from "pinia";

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
    incrementDelay() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.count += 2
        }, 500)
      })
    }
  },
})
```

```javascript
export const useCounterStore = defineStore({
  // option store 风格可以将 id 写到选项里面
  id: 'counter', 
  // ...
})
```

### setup API

- 与 Vue 组合式 API 的 [setup 函数](https://cn.vuejs.org/api/composition-api-setup.html) 相似，可以传入一个函数，该函数定义了一些响应式属性和方法，并且返回一个带有我们想暴露出去的属性和方法的对象
- 在 Setup Store 中：
  - `ref()` 就是 `state` 属性
  - `computed()` 就是 `getters` 
  - `function()` 就是 `actions` 
- Setup store 也可以依赖于全局提供的属性，比如路由和 provide，就像在组件中一样

```javascript
import { inject } from "vue"
import { useRoute}  from "vue-router"
import { defineStore } from "pinia"

export const useCounterStore = defineStore('counter', () => {
  // state
  const count = ref(0)
  const name = ref('Eduardo')
  
  // getters
  const doubleCount = computed(() => count.value * 2)
  
  // actions
  function increment() {
    count.value++
  }
  
  // 导入全局提供的属性，但不要返回像 route 或 parentMsg 之类的值，
  // 因为它们不属于 store，
  // 而且你可以在组件中直接用 useRoute() 和 inject('parentMsg') 访问
  const route = useRoute();
  const parentMsg = inject("parentMsg")
  console.log(parentMsg)

  // 需要响应式的都必须要暴露出去
  return { count, name, doubleCount, increment }
})
```

### 使用 Store

在定义 Store 的时候尽管使用了 createStore 方法，但此时 Store 并没有创建，需要在组件中使用，才会创建 Store 实例。

- composition api 中使用

```html
<script setup>
  import { useCounterStore } from '@/stores/counter'
  // 在组件内部的任何地方均可以访问变量 `store` ✨
  const store = useCounterStore()
</script>
```

- option api 中使用

```html
<script>
  import { useCounterStore } from '@/stores/counter'
  export default {
    setup(){
      const store = useCounterStore();
      return {
        store
      }
    }
  }
</script>
```

### 解构 Store

- `store` 是一个用 `reactive` 包装的对象，这意味着不需要在 getters 后面写 `.value` 
- 如果是要获取数据的同时保持数据的响应式，应该使用 storeToRefs 方法
- 但如果是获取方法，直接从 store 里面解构出来即可

```js
import { storeToRefs } from "pinia";
// 接下来我们可以从仓库中解构数据出来
const { num, doubleCount } = storeToRefs(store);
```

```js
// 从仓库将方法解构出来
const { increment, asyncIncrement, asyncDecrement } = store;
```

## State

### setup API

```javascript
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', ()=>{
  const state = ()=>{
    return {
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  }
  return {
    state
  }
})
```

### option API

```javascript
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
```

### 访问 state

`store.属性`

```javascript
const store = useStore()
store.count++

/*
注意，新的属性如果没有在 state() 中被定义，则不能被添加。它必须包含初始状态。例如：如果 secondCount 没有在 state() 中定义，我们无法执行 store.secondCount = 2。
 */
```

### 重置 state

`store.$reset()` 

- 默认情况，将 state 的属性全部重置为初始化时的值
- 在 compostion api 中可以自定义 `$reset` 方法

```javascript
const store = useStore()
store.$reset() // 重置
```

```javascript
// store 文件
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounter4Store = defineStore("counter4", () => {
  const counter = ref(10)
  
  // 自定义 $reset 方法，类似于定义一个 action 方法，相当于是重写了方法
  const $reset = () => {
    counter.value = 100
  }
  return {
    counter,
    $reset
  }
})

// 组件文件
import { useCounter4Store } from "./stores/counter4";

const counter4Store = useCounter4Store();
const resetHandle = () => {
  counter4Store.$reset() // 类似于调用 action 的方法
};
```

### 变更 state

除了用 `store.count++` 直接改变 store，还可以调用 `$patch` 方法，它允许你用一个 `state` 的补丁对象在同一时间更改多个属性。

```javascript
// 对象形式
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```

```javascript
// 函数形式，一般用于 state 中包含有集合的情况
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

### 订阅 state

- 类似于 Vuex 的 subscribe 方法，你可以通过 store 的 `$subscribe()` 方法侦听 state 及其变化

- 比起普通的 watch()，使用 `$subscribe()` 的好处是 subscriptions 在 patch 后只触发一次

- 订阅函数 `$subscribe` 的第一个参数是一个回调，会接收两个参数：

  1. mutation 对象包含以下属性：
     - type: 突变类型，有三种可能值：
        - `'direct'`: 直接修改 state（例如 `store.count++`）
        - `'patch object'`: 使用对象补丁修改 state（例如 `store.$patch({ count: 10 })`）
        - `'patch function'`: 使用函数补丁修改 state（例如 `store.$patch(state => { state.count++ })`）
     - `storeId`: 当前 store 的 ID
     - `payload`: 仅在 `type` 为 `'patch object'` 时存在，包含传递给 `$patch` 的对象
  
  2. **`state`** 对象是当前 store 的最新状态
  
- 默认情况下，state subscription 会被绑定到添加它们的组件上 (如果 store 在组件的 `setup()` 里面)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 `{ detached: true }` 作为第二个参数，以将 *state subscription* 从当前组件中分离出来。

```javascript
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // 和 cartStore.$id 一样
  mutation.storeId // 'cart'
  // 只有 mutation.type === 'patch object'的情况下才可用
  mutation.payload // 传递给 cartStore.$patch() 的补丁对象。

  // 每当状态发生变化时，将整个 state 持久化到本地存储。
  localStorage.setItem('cart', JSON.stringify(state))
})
```

```javascript
// 购物车示例
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0,
    discount: 0
  }),

  getters: {
    itemCount: (state) => state.items.length
  },

  actions: {
    addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ ...product, quantity });
      }
      this.updateTotal();
    },

    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      this.updateTotal();
    },

    updateTotal() {
      this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
  }
});

// 创建 store 实例
export const setupCartStore = (app) => {
  const store = useCartStore();

  // 从本地存储恢复状态
  const savedState = localStorage.getItem('cart');
  if (savedState) {
    store.$patch(JSON.parse(savedState));
  }

  // 监听状态变化并持久化到本地存储
  store.$subscribe((mutation, state) => {
    console.log("更改方式", mutation.type);
    console.log("更改库id", mutation.storeId);
    console.log("patch 对象时的数据", mutation.payload);
    console.log("最新状态仓库数据", state);

    localStorage.setItem('cart', JSON.stringify(state));
  });

  return store;
};
```

```html
<script setup>
  const someStore = useSomeStore()
  // 此订阅器即便在组件卸载之后仍会被保留
  someStore.$subscribe(callback, { detached: true })
</script>
```

### mapState 辅助函数

在组件的 option api 中可以直接通过 mapState 辅助函数一次性获取多个值

- 第一个参数：store 实例
- 第二个参数：
  - 数组形式
  - 对象形式

```html
<template>
  <div>{{ counter }}</div>
  <div>{{ message }}</div>
</template>

<script>
import { mapState } from "pinia";
import { useCounter4Store } from "../stores/counter4";
export default {
  computed: {
    // 数组形式
    ...mapState(useCounter4Store, ["counter", "message"]),
  },
};
</script>
```

```html
<template>
  <div>{{ counter }}</div>
  <div>{{ messageExpand }}</div>
</template>

<script>
import { mapState } from "pinia";
import { useCounter4Store } from "../stores/counter4";
export default {
  computed: {
    // 对象形式，可以执行额外的操作
    ...mapState(useCounter4Store, {
      counter: "counter",
      messageExpand(store) {
        return store.message + "（额外处理）";
      },
    }),
  },
};
</script>
```

### mapWritableState 辅助函数

- 映射 State：对象形式不能使用函数做额外的副操作
-  映射 Getter：只能修改是引用对象的 getter

```html
<template>
  <div>
    <!-- 直接修改 count，如果 mapState 则不能实现 -->
    <button @click="count++">Count: {{ count }}</button>

    <!-- 直接修改 userAge（getter 返回对象属性） -->
    <button @click="userAge++">Age: {{ userAge }}</button>
  </div>
</template>

<script>
  import { mapWritableState } from 'pinia';
  import { useCounterStore } from '../store/counter';

  export default {
    computed: {
      // 映射 state 和可写的 getter
      ...mapWritableState(useCounterStore, ['count', 'userAge'])
    }
  };
</script>
```

```html
<script>
  export default {
    computed: {
      // 使用别名映射，需要使用对象语法
      ...mapWritableState(useCounterStore, {
        myCount: 'count',        // 将 state.count 映射为 myCount
        myUserAge: 'userAge'     // 将 getter userAge 映射为 myUserAge
      })
    }
  };
</script>
```

```javascript
// store/counter.js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    user: { name: 'John', age: 30 }
  }),
  getters: {
    // ✅ 返回对象引用（可修改）
    userRef: (state) => state.user,

    // ❌ 返回基本类型（不可修改）
    userName: (state) => state.user.name
  }
});
```

```html
<template>
  <div>
    <!-- ✅ 可修改 userRef 的内部属性 -->
    <button @click="userRef.name = 'Alice'">Change Name</button>

    <!-- ❌ 无法修改 userName（基本类型） -->
    <button @click="userName = 'Bob'">尝试修改（无效）</button>
  </div>
</template>

<script>
  export default {
    computed: {
      ...mapWritableState(useCounterStore, ['userRef', 'userName'])
    }
  };
</script>
```

## Getter

- Getter 完全等同于 store 的 state 的[计算值](https://cn.vuejs.org/guide/essentials/computed.html)。可以通过 `defineStore()` 中的 `getters` 属性来定义它们。
- **推荐**使用箭头函数，并且它将接收 `state` 作为第一个参数。

### setup API 

```javascript
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounter4Store = defineStore("counter4", () => {
  const counter = ref(100);
  const getCounter = computed(() => counter.value)
  return {
    counter,
    getCounter
  }
})
```

### option API 

```javascript
import { defineStore } from "pinia";

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```

### 访问 getter

```javascript
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      // 仅依赖于 state，通过第一个参数 state 访问
      return state.count * 2
    },
    doublePlusOne() {
      // 依赖于上面的 getter 属性 doubleCount，通过 this 访问
      return this.doubleCount + 1
    }
  }
})
```

```html
<script setup>
  import { useCounterStore } from './counterStore'
  const store = useCounterStore()
</script>

<template>
  <!-- 直接访问 store 实例上的 getter -->
  <p>{{ store.doubleCount }}</p>
</template>
```

### 向 getter 传递参数

- getter 只是幕后的计算属性，所以不可以向它们传递任何参数。不过，你可以从 *getter* 返回一个函数，该函数可以接受任意参数。

```javascript
export const useUserListStore = defineStore('userList', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

```html
<script setup>
  import { useUserListStore } from './store'
  const userList = useUserListStore()
  const { getUserById } = storeToRefs(userList)
  // 请注意，你需要使用 `getUserById.value` 来访问
  // <script setup> 中的函数
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

- 请注意，当你这样做时，**getter 将不再被缓存**。它们只是一个被你调用的函数。不过，你可以在 getter 本身中缓存一些结果，虽然这种做法并不常见，但有证明表明它的性能会更好。

```javascript
export const useUserListStore = defineStore('userList', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```

## Action

Action 相当于组件中的 [method](https://cn.vuejs.org/api/options-state.html#methods)。它们可以通过 `defineStore()` 中的 `actions` 属性来定义，**并且它们也是定义业务逻辑的完美选择。** 

### setup API

```javascript


```

### option API 

```javascript
export const useCounterStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```

### 订阅 action

通过 `store.$onAction()` 来监听 action 和它们的结果。

```javascript
const unsubscribe = someStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    // 为这个特定的 action 调用提供一个共享变量
    const startTime = Date.now()
    // 这将在执行 "store "的 action 之前触发。
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) => {
      console.log(
        `Finished "${name}" after ${
        Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// 手动删除监听器
unsubscribe()
```

```javascript
// 演示如何在 store 中使用 $onAction 注入时间戳
import { defineStore } from 'pinia';

const useDataStore = defineStore('data', {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser(id) {
      const response = await fetch(`/api/users/${id}`);
      return response.json();
    },
    getSettings() {
      return { theme: 'dark', notifications: true };
    },
  },
});

// 创建 store 实例
const store = useDataStore();

// 递归全局注入时间戳
store.$onAction(({ after }) => {
  after((result) => {
    function injectTimestamp(obj) {
      if (typeof obj === 'object' && obj !== null) {
        obj._timestamp = Date.now();
        // 递归处理嵌套对象
        Object.values(obj).forEach((value) => injectTimestamp(value));
      }
      return obj;
    }
    return injectTimestamp(result);
  });
});

// 使用示例
store.fetchUser(1).then((user) => {
  console.log(user._timestamp); // 包含时间戳
});

store.getSettings().then((settings) => {
  console.log(settings._timestamp); // 包含时间戳
});
```

### mapActions 辅助函数

- 数组形式

```html
<script>
  import { mapActions } from 'pinia';
  import { useCounterStore } from '../store/counter';

  export default {
    methods: {
      // 映射 actions 到组件方法
      ...mapActions(useCounterStore, ['increment', 'incrementBy', 'reset'])
    }
  };
</script>
```

- 对象形式

```html
<script>
  export default {
    methods: {
      ...mapActions(useCounterStore, {
        add: 'increment',         // 将 increment 映射为 add
        addBy: 'incrementBy',     // 将 incrementBy 映射为 addBy
        clear: 'reset'            // 将 reset 映射为 clear
      })
    }
  };
</script>
```

## 插件

- Pinia 插件是一个函数，可以选择性地返回要添加到 store 的属性，它接收一个可选参数，即 *context*，通过 context 对象可以拿到诸如 store、app 等上下文信息。

```javascript
// 定义插件

export function myPiniaPlugin1() {
  // 给所有的仓库添加了一条全局属性
  return {
    secret: "the cake is a lie",
  };
}

export function myPiniaPlugin2(context) {
  //   console.log(context);
  const { store } = context;
  store.test = "this is a test";
}

/**
 * 针对某一特定的仓库来扩展内容
 * @param {*} param0
 */
export function myPiniaPlugin3({ store }) {
  if (store.$id === "counter") {
    // 为当前 id 为 counter 的仓库来扩展属性
    return {
      name: "my name is pinia",
    };
  }
}

/**
 * 重置仓库状态
 */
export function myPiniaPlugin4({ store }) {
  // 我们首先可以将初始状态深拷贝一份
  const state = deepClone(store.$state);
  store.reset = () => {
    store.$patch(deepClone(state));
  };
}
```

```javascript
// 引入自定义插件
import {
  myPiniaPlugin1,
  myPiniaPlugin2,
  myPiniaPlugin3,
  myPiniaPlugin4,
} from "./plugins";

// 注册插件
pinia.use(myPiniaPlugin1);
pinia.use(myPiniaPlugin2);
pinia.use(myPiniaPlugin3);
pinia.use(myPiniaPlugin4);
```







