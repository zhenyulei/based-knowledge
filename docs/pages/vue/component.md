---
sidebarDepth: 2
---

:::details  问题自检
- 1、组件名和props用驼峰法还是中划线命名，js和html是如何对应的？
- 2、全局注册组件和局部注册组件方式？
- 3、props是单向数据流，如果子组件用data和计算属性处理后，props变化子组件还渲染吗？
- 4、动态组件如何设置的？
:::


在典型的 Vue 应用程序中，我们常使用单个文件组件而不是字符串模板。因此本节主要按照单文件形式讲解。

## 组件名规范

- 1、全部小写
- 2、中划线连字符

template中和js中统一用中划线方法：

```vue
<template>
  <my-component-name></my-component-name>
</template>
<script>
import MyComponentName from './components/MyComponentName.vue'
export default {
  components: {
    'my-component-name':MyComponentName
  }
}
</script>
```

- 3、使用驼峰法

template中可以用驼峰法或者中华线方法：

```vue
<template>
  <MyComponentName></MyComponentName>
  <my-component-name></my-component-name>
</template>
<script>
import MyComponentName from './components/MyComponentName.vue'
export default {
  components: {
    MyComponentName
  }
}
</script>
```

综上所述，**为了兼容html写法，建议统一使用中华线的方法**

:::danger 注意⚠️
**对比组件名 、prop名、事件名：**
不同于组件和 prop可以在js中写驼峰法，在html中写中划线形式，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。
:::

## 注册组件
为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。这里有两种组件的注册类型：全局注册和局部注册。
### 全局注册组件

:::tip
在入口文件中引入全局组件，在其他文件夹中开发全局组件的方式：
:::

```js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import DemoBlock from './components/demo-block';//在其他地方用单个文件组件方式定义组件

createApp(App)
  .component('demo-block', DemoBlock)
  .use(router)
  .mount('#doc');
```
  
### 局部注册组件

也就是常规的子组件形式，只能在引入组件的地方使用；

```vue
<template>
  <Child myProps="hello"></Child>
</template>
<script>
import Child from './components/child.vue'
export default {
  components: {
    Child
  }
}
</script>
```
## 组件传入props

- 1、字符串形式： `<blog-post title="My journey with Vue"></blog-post>`
- 2、变量形式：`<blog-post :title="data.title"></blog-post>`
- 3、默认boolean为true：`<blog-post is-checked></blog-post>`
- 4、传入一个对象,相当于把对象所有的属性传入 `<Child v-bind="post"></Child>`

对应数据
`post: {
    id: 1,
    title: 'My Journey with Vue'
}
`

相当于 `<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>`

### 单向数据流

每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。**不能在一个子组件内部改变 prop**

**1、如果prop 用来传递一个初始值**，则定义一个 data 属性并将这个 prop 作为其初始值。

**2、以一种原始的值传入且需要进行转换**，用这个 prop 的值来定义一个计算属性。

方式一会导致，props发生变化时，子组件不会渲染。

父组件：
```vue
<template>
  <Child v-bind="post"></Child>
  <button @click="changeData">改变props数据</button>
</template>
<script>
import Child from './components/child.vue'
export default {
  components: {
    Child
  },
  data(){
    return {
      post: {
        id: 1,
        title: 'parent title'
      }
    }
  },
  methods:{
    changeData(){
      this.post = {
        id:2,
        title:'change world'
      }
    }
  }
}
</script>
```

对应子组件：

```vue
<template>
  <div>
    <div>用props处理后的data初始化：{{childId}}</div><!--不会变化-->
    <div>计算属性处理过的props：{{computedChildId}}</div><!--发生变化-->
    <div>计算属性处理过的props：{{computedChildTitle}}</div><!--发生变化-->
  </div>
</template>
<script>
export default {
  props:{
    id:Number,
    title:String
  },
  data(){
    return{
      childId:this.id
    }
  },
  computed:{
    computedChildId:function(){
      return this.id;
    },
    computedChildTitle:function(){
      return this.title+'  传入的父组件的title'
    }
  }
}
</script>
```

### props 默认类型

:::tip
注意那些 props 会在一个组件实例创建之前进行验证，所以实例的属性 (如 data、computed 等) 不能使用在props的 default 或 validator 函数中。
:::

```js
app.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
    // 具有默认值的函数
    propG: {
      type: Function,
      // 与对象或数组默认值不同，这不是一个工厂函数 —— 这是一个用作默认值的函数
      default: function() {
        return 'Default function'
      }
    }
  }
})
```

###  类型检查

String、Number、Boolean、Array、Object、Date、Function、Symbol

:::tip
HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，驼峰命名法的 prop 名需要使用其等价的 短横线分隔命名命名
:::

**综合组件命名方法，建议统一按照中华线方法命名：组件和props**

### 监听子组件事件

:::danger 注意⚠️
**对比组件名 、prop名、事件名：**
不同于组件和 prop可以在js中写驼峰法，在html中写中划线形式，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。
:::

注意向父组件传递事件名称和父组件监听名称的不同

```vue
<template>
  <Child @child-data="changeData"></Child>
</template>
<script>
import Child from './components/child.vue'
export default {
  components: {
    Child
  },
  methods:{
    changeData(e){
      console.log(e);
    }
  }
}
</script>
```
对应子组件:**建议定义所有发出的事件，以便更好地记录组件应该如何工作。**

```vue
<template>
  <button @click="$emit('child-data',$event)">改变props数据</button>
</template>
<script>
export default {
  emits: ['child-data']
}
</script>
```

## 非props的属性

:::tip
一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 props 或 emits 定义的 attribute。常见的示例包括 class、style 和 id 属性。
:::

当组件返回单个根节点时，非 prop attribute 将自动添加到根节点的 attribute 中，同样的规则适用于事件监听器。

禁用 attribute 继承的常见情况是需要将 attribute 应用于根节点之外的其他元素。

通过将 inheritAttrs 选项设置为 false，你可以访问组件的 $attrs property，该 property 包括组件 props 和 emits property 中未包含的所有属性 (例如，class、style、v-on 监听器等)。

相关示例可以参考:[基础知识-clas与style绑定-组件上使用](http://localhost:8080/pages/vue/vueBased.html#%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8)

## 动态组件

```vue
<template>
  <component :is="currentTabComponent"></component>
  <button @click="changeCom">点击切换组件</button>
</template>
<script>
import Child from './components/child.vue'
import Child2 from './components/child2.vue'
export default {
  components: {
    Child,
    Child2
  },
  data(){
    return {
      currentTabComponent:"Child"
    }
  },
  methods:{
    changeCom(){
      this.currentTabComponent = "Child2"
    }
  }
}
</script>
```

## 提供/注入

类似于react的context，父组件提供数据，子孙组件可以直接获取数据。

父组件
```vue
<template>
  <Child></Child>
  <button @click="changeData">改变data</button>
</template>
<script>
import Child from './components/child.vue'
export default {
  components: {
    Child
  },
  data(){
    return {
      name:'初始值'
    }
  },
  provide(){
    return {
      initname:"静态文本",//静态文本不可改变
      myName:this.name,//取值变量，无响应式
      user:()=>this.name//有响应式
    }
  },
  methods:{
    changeData(e){
      this.name = '改变后的data'
    }
  }
}
</script>
```
孙子组件：

```vue
<template>
    <div>{{initname}}:{{myName}}--{{parentUser}}</div>
</template>
<script>
export default {
    inject:['user','myName','initname'],
    computed:{
        parentUser(){
          return this.user()
        }
    }
}
</script>
```