---
sidebarDepth: 2
---
:::details  问题自检
- 1、具名slot的如何定义？
- 2、父组件中的slot如何获取子组件中的data值？
- 3、如何动态改变插槽名字？
:::

以下例子介绍了：
- 1、默认slot的用法
- 2、具名slot的用法
- 3、父组件中slot使用子组件中的插槽 prop
- 4、动态指令参数也可以用在 v-slot 上，来定义动态的插槽名
```vue
<template>
  <Child id="childId">
    <!--2、具名slot的用法--><!--3、父组件中slot使用子组件中的插槽 prop-->
    <template #header="slotProps">我们希望把页头放这里<b>{{slotProps.childItem}}</b></template>
    <div><p>我是父组件中默认的slot</p></div><!--1、默认slot的用法-->
    <!--4、动态指令参数也可以用在 v-slot 上，来定义动态的插槽名-->
    <template v-slot:[dynamicSlotName]><p>我是父组件中动态的slot</p></template>
    <button @click="changeSlotName">改变slot位置</button>
  </Child>
</template>
<script>
import Child from './components/child.vue'
export default {
  components: {
    Child
  },
  data(){
    return {
      dynamicSlotName:"footer"
    }
  },
  methods:{
    changeSlotName(){
      this.dynamicSlotName = "main"
    }
  }
}
</script>
```
对应子组件

```vue
<template>
  <div class="wrapper">
    <slot name="header" :childItem="item"><p>子组件header内容</p></slot>
    <slot name="main"><p>子组件main内容</p></slot>
    <slot :childItem="item"><p>我是子组件默认slot插槽内容，父组件默认slot中没有内容时，我会显示</p></slot>
    <slot name="footer"><p>子组件footer内容</p></slot>
  </div>
</template>
<script>
export default {
  data(){
    return {
      item:'子组件的data'
    }
  }
}
</script>
```
- 5、当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。
- 6、若该插槽提供了多个 prop ,可解构来传入具体的插槽 prop。

```vue
<template>
  <!--5、只有默认插槽时，组件的标签才可以被当作插槽的模板-->
  <Child v-slot="{childId}"><!--6、解构来传入具体的插槽-->
    <div>我是父组件中默认的slot:{{childId}}</div>
  </Child>
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
对应的子组件

```vue
<template>
  <div class="wrapper">
    <slot :childItem="item" :childId="12">我是子组件默认slot插槽内容，父组件默认slot中没有内容时，我会显示</slot>
  </div>
</template>
<script>
export default {
  data(){
    return {
      item:'子组件的data'
    }
  }
}
</script>
```