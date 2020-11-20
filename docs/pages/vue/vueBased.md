---
sidebarDepth: 2
---

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

## data属性&methods

**组件的 data 选项是一个函数**，这样避免了不同