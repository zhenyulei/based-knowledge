---
sidebarDepth: 1
---

## config 对象

应用实例会暴露一个 .config 对象允许我们配置一些应用级的选项，例如定义一个应用级的错误处理器，它将捕获所有由子组件上抛而未被处理的错误：

```js
const app = createApp(App);
app.config.errorHandler = (err) => {
  /* 处理错误 */
  console.log(`处理错误,${err}`);
};
app.mount("#app");
```

注册全局组件

```js
app.component("TodoDeleteButton", TodoDeleteButton);
```

## 动态绑定多个值

如果你有像这样的一个包含多个 attribute 的 JavaScript 对象：

```js
const objectOfAttrs = {
  id: "container",
  class: "wrapper",
};
```

通过不带参数的 v-bind，你可以将它们绑定到单个元素上：

```vue
<div v-bind="objectOfAttrs"></div>
```

## 用 JavaScript 表达式 用的字符串的\$符号

每个绑定仅支持单一表达式，也就是一段能够被求值的 JavaScript 代码，一个简单的判断方法是是否可以合法地写在 return 后面。

```vue
<div :id="`list-${id}`"></div>
```

## 受限的全局访问

没有显式包含在列表中的全局对象将不能在模板内表达式中访问，例如用户附加在 window 上的属性。然而，你也可以自行在 app.config.globalProperties 上显式地添加它们，供所有的 Vue 表达式使用。

```js
app.config.globalProperties = {
  MYNAME: "ceshi",
};
```

在 vue 中使用

```vue
<h1>{{ this.MYNAME }}</h1>
```

## 指令

如果你的组件实例有一个数据属性 attributeName，其值为 "href"，那么这个绑定就等价于 v-bind:href。

```vue
<a :[attributeName]="url"> ... </a>
```

当 eventName 的值是 "focus" 时，v-on:[eventName] 就等价于 v-on:focus。

```vue
<a @[eventName]="doSomething" />
```

## DOM 更新时机

当你更改响应式状态后，DOM 会自动更新。然而，你得注意 DOM 的更新并不是同步的。相反，Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次状态更改，每个组件都只更新一次。

若要等待一个状态改变后的 DOM 更新完成，你可以使用 nextTick() 这个全局 API：

```vue
<template>
  <div>
    <div class="count-dom">{{ state.count }}</div>
  </div>
  <button @click="changeCount">点击</button>
</template>
<script setup>
import { reactive, nextTick } from "vue";
const state = reactive({
  count: 1,
});
const changeCount = () => {
  state.count++;
  nextTick(() => {
    const dataHtml = document.querySelector(".count-dom").innerHTML;
    console.log("next", dataHtml); //后执行
  });
  const dataHtml = document.querySelector(".count-dom").innerHTML;
  console.log("curr", dataHtml); //先执行
};
</script>
```

点击后结果是

```js
curr 1
next 2
```

## 响应式代理 vs. 原始对象

值得注意的是，reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的：

```js
const raw = {};
const proxy = reactive(raw);

// 代理对象和原始对象不是全等的
console.log(proxy === raw); // false

// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy); // true
// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy); // true
```

响应式对象内的嵌套对象依然是代理：

```js
const proxy = reactive({}); //因为proxy是代理对象

const raw = {};
proxy.nested = raw; //则proxy.nested也是代理对象
console.log(proxy.nested === raw); // false
```

## reactive() 的局限性

- 1、仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 原始类型 无效。

- 2、因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的相同引用。这意味着我们不可以随意地“替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失：

```js
let state = reactive({ count: 0 });
// 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
state = reactive({ count: 1 });
```

同时这也意味着当我们将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，我们会失去响应性：

```js
const state = reactive({ count: 0 });

// n 是一个局部变量，同 state.count
// 失去响应性连接
let n = state.count;
// 不影响原始的 state
n++;

// count 也和 state.count 失去了响应性连接
let { count } = state;
// 不会影响原始的 state
count++;

// 该函数接收一个普通数字，并且
// 将无法跟踪 state.count 的变化
callSomeFunction(state.count);
```

![相关链接](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)

## reactive 和 ref 的使用

reactive 在 js 中用 state.count 获取数据；ref 在 js 中使用.value 获取数据；在 template 中 reactive 使用 state.count 获取数据，ref 直接使用 title 获取数据。

```vue
<template>
  <div>
    <div>{{ title }}</div>
    <div class="count-dom">{{ state.count }}</div>
    <button @click="changeData">点击</button>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
const state = reactive({
  count: 1,
});
const title = ref("ceshi");
const changeData = () => {
  state.count++;
  title.value = title.value === "ceshi" ? "测试" : "ceshi";
};
</script>
```

## 计算属性

可以通过 `计算属性.value` 访问计算结果。计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 .value。

## 计算属性缓存 vs 方法

计算属性值会基于其"响应式依赖"被缓存。注意是依赖响应式依赖的更新而变化；

这也解释了为什么下面的计算属性永远不会更新，因为 Date.now() 并不是一个响应式依赖：

```js
const now = computed(() => Date.now());
```

相比之下，方法调用总是会在重渲染发生时再次执行函数。

## v-for

注意 v-for 可以使用解构赋值，注意格式 如果写成 `v-for="({ message }, index)in items"` 也就是 in 前缺少空格，就会报错。
可以循环对象和数组。

```vue
<template>
  <div>
    <div v-for="({ message }, index) of items" :key="index">
      <div>{{ message }}</div>
    </div>
    <div v-for="(value, key) in objNew" :key="value">
      <p>{{ key }}:{{ value }}</p>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
const items = ref([
  { message: "Foo", name: "123" },
  { message: "Bar", name: "456" },
]);
const objNew = {
  title: "How to do lists in Vue",
  author: "Jane Doe",
  publishedAt: "2016-04-10",
};
</script>
```

## .lazy 修饰符 在 input 失去焦点的时候才去触发事件

```vue
<template>
  <div>
    <div>Picked: {{ pick }}</div>
    <input id="one" v-model.lazy="pick" />
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
const pick = ref("");
</script>
```

## watch 回调的触发时机

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。

默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

如果想在侦听器回调中能访问被 Vue 更新之后的 DOM，你需要指明 flush: 'post' 选项：

```js
watch(source, callback, {
  flush: "post",
});

watchEffect(callback, {
  flush: "post",
});
```

```js
import { watchPostEffect } from "vue";
watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
});
```

## 组件标签关闭标签

如果是驼峰法写的标签，可以直接在当前标签上关闭`<MyComponent />`，但是如果使用的中划线，需要显式关闭标签
`<my-component></my-component>`

## 传递 props

### defineProps、defineEmits

父子组件之间传递 props 和 emits

```vue
<template>
  <HelloWorld :initData="initData" @enlarge-text="enlargeText" />
</template>

<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { ref, watch } from "vue";
const initData = ref({
  name: "小花",
  age: 12,
  address: "bj",
});
const enlargeText = () => {
  initData.value.age++;
};
</script>
```

子组件

```vue
<template>
  <div>
    <div>
      <div v-for="(value, key) in initData" :key="key">
        {{ key }}:{{ value }}
      </div>
    </div>
    <button @click="$emit('enlarge-text')">点击按钮</button>
  </div>
</template>

<script setup>
defineProps(["initData"]);
defineEmits(["enlarge-text"]);
</script>
```

## Prop 名字格式

如果一个 prop 的名字很长，应使用 camelCase 形式，因为它们是合法的 JavaScript 标识符，可以直接在模板的表达式中使用，也可以避免在作为属性 key 名时必须加上引号。

```js
defineProps({
  greetingMessage: String,
});
```

```vue
<span>{{ greetingMessage }}</span>
```

虽然理论上你也可以在向子组件传递 props 时使用 camelCase 形式 (使用 DOM 模板时例外)，但实际上为了和 HTML attribute 对齐，我们通常会将其写为 kebab-case 形式：

```vue
<MyComponent greeting-message="hello" />
```

## 使用一个对象绑定多个 prop

如果你想要将一个对象的所有属性都当作 props 传入，你可以使用没有参数的 v-bind，即只使用 v-bind 而非 `:prop-name`。例如，这里有一个 post 对象：

```js
const post = {
  id: 1,
  title: "My Journey with Vue",
};
```

以及下面的模板：`<BlogPost v-bind="post" />`
而这实际上等价于：`<BlogPost :id="post.id" :title="post.title" />`

## props 在子组件中进行转化

导致你想要更改一个 prop 的需求通常来源于以下两种场景：

prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。在这种情况下，最好是新定义一个局部数据属性，从 props 上获取初始值即可：

```js
const props = defineProps(["initialCounter"]);

// 计数器只是将 props.initialCounter 作为初始值
// 像下面这样做就使 prop 和后续更新无关了
const counter = ref(props.initialCounter);
```

需要对传入的 prop 值做进一步的转换。在这种情况中，最好是基于该 prop 值定义一个计算属性：

```js
const props = defineProps(["size"]);

// 该 prop 变更时计算属性也会自动更新
const normalizedSize = computed(() => props.size.trim().toLowerCase());
```

https://cn.vuejs.org/guide/components/props.html#one-way-data-flow
