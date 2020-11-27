---
sidebarDepth: 2
---

## 强制更新

使组件实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。比如不会影响子组件Child的更新

```vue
<template>
  <Child myProps="hello"></Child>
  <button @click="forceUpdate">点击我</button>
</template>
<script>
import Child from './components/child.vue'
export default {
  components: {
    Child
  },
  updated(){
    console.log('update');
  },
  methods:{
    forceUpdate(){
      this.$forceUpdate()
    }
  }
}
</script>
```

## 混入 (mixin)

一个混入对象可以包含任意组件选项，可以“混合”进入组件。
当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
同名钩子函数将合并为一个数组，混入对象的钩子将在组件自身钩子之前调用。
值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

```vue
<template>
  <span>父组件</span>
</template>
<script>
import myMixin from "./components/mymix.js"
export default {
  mixins: [myMixin],
  data(){
    return {
      parent:true
    }
  }
}
</script>
```

对应mixin

```js
const myMixin = {
    data(){
        return {
            childData:'123'
        }
    },
    created() {
        this.hello()
    },
    methods: {
        hello() {
            console.log(this.parent,this.childData)
        }
    }
}
export default myMixin;
```

**全局混入**

入口js文件

```js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import myMixin from "./components/mymix.js"
app.mixin(myMixin).mount('#app')
```

## vue3中Hooks VS mixin

在 Vue 2 中，mixin 是将部分组件逻辑抽象成可重用块的主要工具。但是，他们有几个问题：

- 1、mixin 很容易发生冲突：因为每个特性的属性都被合并到同一个组件中，所以为了避免 property 名冲突和调试，你仍然需要了解其他每个特性。

- 2、可重用性是有限的：我们不能向 mixin 传递任何参数来改变它的逻辑，这降低了它们在抽象逻辑方面的灵活性。

所以推荐使用组合式API，比如开发hooks：

组件中调用方式：

```js
// 使用 urlLoader 展示狗狗图片
const { result, loading, loaded } = useURLLoader('https://dog.ceo/api/breeds/image/random')
```
```html
<h1 v-if="loading">Loading!...</h1>
<img v-if="loaded" :src="result.message" >
```
对应的hooks：useURLLoader，以use开头命名

```js
import { ref } from 'vue'
import axios from 'axios'
// 添加一个参数作为要使用的 地址
const useURLLoader = (url: string) => {
// 声明几个ref，代表不同的状态和结果
  const result = ref(null)
  const loading = ref(true)
  const loaded = ref(false)
  const error = ref(null)

// 发送异步请求，获得data
// 由于 axios 都有定义，所以rawData 可以轻松知道其类型
  axios.get(url).then((rawData) => {
    loading.value = false
    loaded.value = true
    result.value = rawData.data
  }).catch((e) => {
    error.value = e
  })
  // 将这些ref 一一返回
  return {
    result,
    loading,
    error,
    loaded
  }
}
export default useURLLoader
```

vue3 这种实现方式的优点

:::tip
- 第一：它可以清楚的知道 result, loading, loaded  这些值的来源，这些参数是干什么的，他们来自 useURLLoader 的返回，那么它们就是用来加载元素的。
- 第二：我们可以给返回值设置任何别名，这样就避免了命名冲突的风险。
- 第三：这段逻辑可以脱离组件存在，因为它本来就和组件的实现没有任何关系，我们不需要添加任何组件实现相应的功能。只有逻辑代码在里面，不需要模版。
:::

## 自定义指令

**全局指令**

入口文件

```js
import { createApp } from 'vue'
import App from './App.vue'
import myDirective from './myDirective.js' //自定义的全局指令
const app = createApp(App)
app.directive('highlight', myDirective); //定义全局指令
app.mount('#app')
```
对应全局指令的 myDirective 文件：

>指令的生命周期和组件的生命周期函数一样

```js
const bgColor =  {
    //当指令第一次绑定到元素并且在挂载父组件之前调用。在这里你可以做一次性的初始化设置。
    beforeMount(el, binding, vnode) {
        el.style.background = binding.value
    },
    //在挂载绑定元素的父组件时调用。
    mounted(el) {
        el.focus()
    },
    beforeUpdate(){},//在更新包含组件的 VNode 之前调用。
    updated(){},//在包含组件的 VNode 及其子组件的 VNode 更新后调用。
    beforeUnmount(){}//在卸载绑定元素的父组件之前调用
    unmounted(){}//当指令与元素解除绑定且父组件已卸载时，只调用一次。
}
export default bgColor;
```

组件中使用：`<input  v-highlight="'yellow'" />`

组件中局部指令不再赘述：

```js
directives: {
  focus: {
    // 指令的定义
    mounted(el) {
      el.focus()
    }
  }
}
```
### 指令参数
- el：指令绑定到的元素。这可用于直接操作 DOM。
- binding：包含以下 property 的对象。
    - instance：使用指令的组件实例。
    - value：传递给指令的值。例如，在 `v-my-directive="1 + 1"` 中，该值为 2。
    - oldValue：先前的值，仅在 beforeUpdate 和 updated 中可用。值是否已更改都可用。
    - arg：参数传递给指令 (如果有)。例如在 `v-my-directive:foo` 中，arg 为 "foo"。
    - modifiers：包含修饰符对象。例如在 `v-my-directive.foo.bar` 中，修饰符对象为 `{foo: true，bar: true}`。
    - dir：一个对象，在注册指令时作为参数传递。
- vnode：上面作为 el 参数收到的真实 DOM 元素的蓝图。


### 动态指令

指令的参数可以是动态的。例如，在 `v-mydirective:[argument]="value"` 中，argument 参数可以根据组件实例数据进行更新！

组件调用方式：
> 该示例功能：指令是根据参数 direction ，来确定该元素定位在那个位置。
```vue
<template>
  <p v-position:[direction]="200">我是可以变化的内容.</p>
  <button @click="changeStatus">改变状态</button>
</template>
<script>
export default {
  data(){
    return {
      direction:'left'
    }
  },
  methods:{
    changeStatus(){
      this.direction = "top" //动态改变指令position的参数
    }
  }
}
</script>
```

指令定义：

```js
const position =  {
    mounted(el,binding){
        initDirect(el,binding)
    },
    updated(el, binding) {
        initDirect(el,binding)
    }  
}
function initDirect(el,binding){
    el.style.position = 'fixed'
    const s = binding.arg
    el.style[s] = binding.value + 'px'
}  
export default position;
```

引入全局指令：

```js
import { createApp } from 'vue'
import App from './App.vue'
import myDirective from './myDirective.js' //引入自定义指令
const app = createApp(App)
app.directive('position', myDirective) //定义全局指令
app.mount('#app')
```

在很多时候，你可能想在 mounted 和 updated 时触发相同行为，而不关心其它的钩子，可改为:
```js
const bgColor =  (el,binding)=>{
    el.style.position = 'fixed'
    const s = binding.arg
    el.style[s] = binding.value + 'px'
}
export default bgColor;
```
### 对象字面量

如果指令需要多个值，可以传入一个 JS 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。

`<div v-demo="{ color: 'white', text: 'hello!' }"></div>`

对应的指令：

```js
const bgColor =  (el,binding)=>{
    console.log(binding.value.color);
    console.log(binding.value.text);
}
export default bgColor;
```

## Teleport

Teleport 是一种能够将我们的模板移动到 DOM 中 Vue app 之外的其他位置的技术，就有点像哆啦A梦的“任意门”

场景：像 modals、toast 等这样的元素，很多情况下，我们将它完全的和我们的 Vue 应用的 DOM 完全剥离，管理起来反而会方便容易很多，原因在于如果我们嵌套在 Vue 的某个组件内部，那么处理嵌套组件的定位、z-index 和样式就会变得很困难。

另外，像 modals、toast 等这样的元素需要使用到 Vue 组件的状态（data 或者 props）的值 这就是 Teleport 派上用场的地方。我们可以在组件的逻辑位置写模板代码，这意味着我们可以使用组件的 data 或 props。然后在 Vue 应用的范围之外渲染它。

```vue
<template>
  <div>
    <button @click="modalOpen = true">
    弹出一个全屏模态窗口
  </button>
  <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        这是一个模态窗口!
        我的父元素是"body"！
        <button @click="modalOpen = false">Close</button>
      </div>
    </div>
  </teleport>
  </div>
</template>

<script>
export default {
 data() {
   return {
     modalOpen: false
  }
},
};
</script>

<style scoped>
.modal {
 position: absolute;
 top: 0; right: 0; bottom: 0; left: 0;
 background-color: rgba(0,0,0,.5);
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
}

.modal div {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 background-color: white;
 width: 300px;
 height: 300px;
 padding: 5px;
}
</style>
```

## 插件开发

插件是自包含的代码，通常向 Vue 添加全局级功能。插件中包含了多种方法，举例如下：

插件 transPlugin.js
```js
export default {
    install: (app, options) => {
      app.config.globalProperties.$translate = handleObj(options);//把处理后的数据赋值给全局变量赋值，
      app.provide('transData', options);//注入变量
      app.directive('mylight', { //定义指令
        mounted (el, binding, vnode, oldVnode) {
          el.style.backgroundColor=binding.value;
        }
      })
      app.mixin({
        data(){
            return {
                myname:"xiaohua"
            }
        }
      })
    },
    
}
function handleObj(options){
    return Object.keys(options).map((key)=>{
        return options[key]+'英文名字'
    })
}
```

对应的入口 main.js 中引入并安装插件

```js
import { createApp } from 'vue'
import Root from './App.vue'
import transPlugin from './transPlugin.js'//引入插件
const app = createApp(Root)
const globalStrings = {
  hello: 'Bon.jour!'
}
app.use(transPlugin,globalStrings)//使用插件，globalStrings为入参
app.mount('#app')
```
对应组件中使用方式：

```vue
<template>
  <div>
      <h1 title="标题1">{{showMessage[0]}}</h1>
      <div v-mylight="'yellow'">{{transData}}</div>
  </div>
</template>
<script>
import {getCurrentInstance} from 'vue'
export default {
  inject:['transData'],//插件中定义的provide
  setup() {
    const { ctx } = getCurrentInstance();//vue3中调用全局变量
    const showMessage = ctx.$translate;//在插件中定义的全局变量$translate
    return {
      showMessage
    };
  },
  mounted(){
    console.log(this.myname);
  }
};
</script>
```