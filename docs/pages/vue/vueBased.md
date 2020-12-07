---
sidebarDepth: 2
---

### 问题自检

<common-code-question questionId="createApp"></common-code-question>

<common-code-question questionId="htmlTemplate"></common-code-question>

<common-code-question questionId="functionTypes"></common-code-question>


## 创建vue实例

传递给 createApp 的选项用于配置根组件。当我们挂载应用时，该组件被用作渲染的起点。

```js
import { createApp } from 'vue'
//省略引入的组件路径
createApp(App) //APP是入口组件，所有的组件在该组件中设置
    .component('SearchInput', SearchInputComponent) //全局组件
    .directive('focus', FocusDirective) //全局指令
    .use(router) //使用路由插件
    .mount('#app')
```

## 模版语法

用法速览：
```vue
<template>
    <!--文本插值,支持js单个表达式-->
    <span>Message: {{ message.split('').reverse().join('')}}</span>
    <span v-once>这个将不会改变: {{ msg }}</span><!--一次性地插值,后续不会更新-->
    <span :html="rawHtml"></span><!--将rawHtml变量渲染为HTML-->
    <div :id="dynamicId"></div><!--将dynamicId变量渲染为元素属性-->
    <a @click="doSomething"> ... </a><!--监听事件-->
    <!--动态参数:用方括号括起来,如attributeName可以为 blur||focus-->
    <a v-on:[attributeName]="doSomething"> ... </a>
    <!--修饰符:是以半角句号.指明的特殊后缀，用于指出一个指令应该以特殊方式绑定-->
    <form v-on:submit.prevent="onSubmit">...</form>
</template>
```

## data属性

**组件的 data 选项是一个函数**，这样每一个实例的data属性都是独立的，不会相互影响。

然后data对象，以 $data 的形式存储在组件实例中，为方便起见，该对象的任何顶级 property 也直接通过组件实例暴露出来：

入口js，可以调用组件的data数据
```js
import { createApp } from 'vue'
import App from './App.vue'
const vm =createApp(App).mount('#app')
console.log(vm.$data.count); //获取顶级组件App中的data，无法获取App中再包裹的子组件的data
vm.count = 15;//改变组件中的data值
```
app.vue 入口组件中返回函数形式定义data数据：
```vue
<template>
  <div>{{count}}</div>
</template>
<script>
export default {
  name: 'App',
  data(){
    return {
      count:4
    }
  }
}
</script>
```

::: warning 注意
vue3兼容了vue2的写法，vue3对响应式的数据如：ref、reactive等方式是放在了setup函数中，而setup相当于生命周期中最早执行的部分。上面例子就是兼容了vue2的写法。vue3中新增的setup方法会在后面介绍。
:::

## 完整示例

<common-code-js-run slug="fYIKp"></common-code-js-run>

:::details
```vue
<template>
    <!--文本插值,支持js单个表达式-->
    <span>Message: {{ message.split('').reverse().join('')}}</span>
    <span v-once>这个将不会改变: {{ message }}</span><!--一次性地插值,后续不会更新-->
    <button @click="changeMsg">点击改变message</button><!--监听事件-->
    <span :html="rawHtml"></span><!--将rawHtml变量渲染为HTML-->
    <div :id="dynamicId"></div><!--将dynamicId变量渲染为元素属性-->
    <!--动态参数:用方括号括起来,如attributeName可以为 blur||focus-->
    <input v-on:[attributeName]="changeInput" v-model="inputData"/>
    <button @click="changeAttribute">点击改变input的绑定事件</button><!--监听事件-->
    <!--修饰符:是以半角句号.指明的特殊后缀，用于指出一个指令应该以特殊方式绑定-->
    <form v-on:submit.prevent="onSubmit">...</form>
</template>
<script>
export default {
  name: 'App',
  data(){
    return {
      message:'hello world',
      rawHtml:'<p class="color:red">标签内容</p>',
      dynamicId:'myid',
      inputData:''
    }
  },
  methods:{
    changeMsg(){
      this.message = 'change msg'
    },
    changeInput(){
      console.log(this.inputData)
    },
    changeAttribute(){
      this.attributeName == this.attributeName === 'blur'?'focus':'blur'
    }
  }
}
</script>
```
:::