---
sidebarDepth: 2
---

## Class 与 Style 绑定

:::warning 注意
对象语法中，{key:value}中key，可以带引号，也可以不带引号，都会渲染成 class 类名，
比如:class="{textColor: isActive }" 在 isActive = true时，渲染成 class="textColor",
不同于在数组中 :class="[activeClass, basedClass]"，activeClass会被渲染成对应的data值。
:::

### 对象语法

```vue
<template>
  <div>
      <!--对象语法-->
      <div :class="{ 'textColor': isActive }">对象语法</div>
      <!--对象中传入多个字段来动态切换多个class-->
      <div
        class="based"
        :class="{ textColor: isActive, 'bg-color': hasBgColor }"
      >对象中传入多个字段来动态切换多个class</div>
      <!--绑定的数据对象放在data中-->
      <div :class="classObject">绑定的数据对象放在js中</div>
      <!--绑定的数据对象放在计算属性中-->
      <div :class="classComputed">绑定的数据对象放在计算属性中</div>
      <!--点击按钮改变变量-->
      <button @click="ClickName">点击改变fullName的值</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isActive:false,
      hasBgColor:false,
      classObject:{
        'textColor': true,
      }
    }
  },
  computed:{
    classComputed(){
      return {
        'textColor': true,
      }
    }
  },
  methods: {
    ClickName () {
      this.isActive = true;
      this.hasBgColor = true;
    }
  }
}
</script>
<style>
.textColor{
  color:red;
}
.based{
  font-size: 20px;
}
.bg-color{
  background: yellow;
}
</style>
```

### 数组语法

```vue
<template>
  <div>
      <!--数组语法-->
      <div :class="[activeClass, basedClass]">数组语法</div>
      <!--三元表达式切换class-->
      <div :class="[isActive ? activeClass : '', basedClass]">三元表达式</div>
      <!--数组语法中也可以使用对象语法-->
      <div :class="[{ activeClass: isActive }, basedClass]">数组语法中也可以使用对象语法</div>
      <button @click="ClickName">点击改变fullName的值</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeClass:'textColor',
      basedClass:'based',
      isActive:false,
    }
  },
  methods: {
    ClickName () {
      this.isActive=true;
    }
  }
}
</script>
<style>
.textColor{
  color:red;
}
.based{
  font-size: 20px;
}
.bg-color{
  background: yellow;
}
</style>
```

### 组件上使用

父组件上使用class，会默认挂载到子组件的根元素上！如果想指定到某个元素上，使用以下方式：

父组件上定义class
```vue
<template>
  <MyComponent class="foo"></MyComponent>
</template>
<script>
import MyComponent from './components/MyComponent.vue'
export default {
  components:{
    MyComponent
  }
}
</script>
```
子组件使用$attrs指定继承位置，并且使用 `inheritAttrs: false` 消除默认继承位置。

```vue
<template>
  <div>
      <p :class="$attrs.class">我是子组件内容</p>
  </div>
</template>
<script>
export default {
  name: 'MyComponent',
  inheritAttrs: false, //这里
}
</script>
```

## 内联样式
分为对象语法和数组语法，渲染style
```vue
<template>
  <div>
    <!--对象语法-->
    <div :style="{ color: activeColor, fontSize: currFontSize + 'px' }">对象语法1</div>
    <div :style="styleObject">对象语法2</div>
    <!--数组语法-->
    <div :style="[styleObject, activeObject]">数组语法</div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      activeColor:'red',
      currFontSize:22,
      styleObject:{
        color:'yellow'
      },
      activeObject:{
        background:'green'
      }
    }
  }
}
</script>
```