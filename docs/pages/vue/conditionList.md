---
sidebarDepth: 2
---

## 条件渲染

使用template可以切换多个元素 `v-if/v-else-if/else`

```vue
<template>
  <div>
   <template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
  <div v-else>我是内容</div>
  <button @click="switchStatus">切换状态</button>
  </div>
</template>
<script>
export default {
  data(){
    return {
      ok:false
    }
  },
  methods:{
    switchStatus(){
      this.ok = !this.ok;
    }
  }
}
</script>
```
:::tip  v-if和v-show的区别
v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
:::

:::warning 注意
2.x 版本中在一个元素上同时使用 v-if 和 v-for 时，v-for 会优先作用。
3.x 版本中 v-if 总是优先于 v-for 生效。
由于语法上存在歧义，建议避免在同一元素上同时使用两者。
:::

先判断 v-if 导致 找不到 item，如果改成 list.length > 1 即可显示出来。

```vue
<template>
    <div class="wraper">
      <div v-for="(item,index) in list" v-if="item>1" :key="index">
          <div>{{item}}<div>
      </div>
    </div>
</template>
<script>
import {ref} from 'vue'
export default {
  data(){
    return{
      list:ref([1,2,3,4,5])
    }
  }
}
</script>
```

## 列表渲染

`v-for`既可以用来渲染数组，也可以用来渲染对象。注意for循环对象时：value 在前，key值在后，index在最后。

>注意写上key值

```vue
<template>
    <div class="wraper">
      <ul id="v-for-object" class="demo">
        <li v-for="(value,key,index) in myObject" :key="key">
          {{index}}:{{key}}--{{ value }}
        </li>
      </ul>
    </div>
</template>
<script>
import {ref} from 'vue'
export default {
  data(){
    return{
     myObject: {
        title: 'How to do lists in Vue',
        author: '小王',
        time: '2020-11-11'
      }
    }
  }
}
</script>
```

### 数组变化检测

Vue3 中可以检测数组和对象的变化

```js
//vue2的响应式原理
Object.defineProperty(data,'count',{
    get(){},
    sert(){}
})
//vue3的响应式原理
new Proxy(data,{
    get(key){},
    set(key,value){}
})
```

:::tip 注意
vue2中必须传入对应的key值，才能进行拦截数据，但是数组对象动态变化，则无法监听；
vue3中传入data即可监听里面数据的变化，所以可以监听数组对象的动态变化
:::

```vue
<template>
  <div>
      <ul>
        <li v-for="(item,index) in desc" :key="index">{{item.name}}--{{item.age}}</li>
      </ul>
      <p>{{obj.name}}--{{obj.age}}</p>
      <button @click="clickme">点击me</button>
  </div>
</template>
<script>
import {ref} from 'vue' 
export default {
  setup(){
    const desc = ref([
      {
      name:'xiaohua',
      age:12
      },
      {
      name:'xiaowang',
      age:22
      }
    ]);
    const obj = ref({
      name:"lili"
    });
    function clickme (){
      desc.value[2] = {
        name:"小王",
        age:33
      }
      obj.value.age = 24
    }
    return {
      obj,
      desc,
      clickme
    }
  }
}
</script>
```
## 事件处理

我们可以使用 v-on 指令 (通常缩写为 @ 符号) 来监听 DOM 事件，并在触发事件时执行一些简单的 JS。
注意 alert/console 等方法不能在template中执行，请放在`<script>`标签内执行。
此外当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。

- 1、直接绑定到一个方法：`<button @click="say">Say hi</button>`
- 2、内联 JavaScript 语句中调用方法：`<button @click="say('hi')">Say hi</button>`
- 3、使用特殊变量 $event 传入方法：`<button @click="say($event)">Say hi</button>`
- 4、多事件处理器：`<button @click="one($event), two($event)">`

### 事件修饰符

```html
<!-- 阻止单击事件继续传播 -->
<a @click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a @click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form @submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div @click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div @click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a @click.once="doThis"></a>

<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input @keyup.enter="submit" />
```
其他按键修饰符，此处不再赘述，详情见[官方文档](https://v3.cn.vuejs.org/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)

Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。这个 .passive 修饰符尤其能够提升移动端的性能。

`<div @scroll.passive="onScroll">...</div>`

详细讲解请见：[addEventListener 中的 passive 用法](http://maying.ink/2018/12/21/passive/)

