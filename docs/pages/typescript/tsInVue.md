---
sidebarDepth: 0
---

## TypeScript 支持

### 配置 vue3 开发环境

Vue cli

// 安装或者升级
`npm install -g @vue/cli`
OR
`yarn global add @vue/cli`

// 保证 vue cli 版本在 4.5.0 以上
`vue --version`
// 创建项目
`vue create my-project`
然后的步骤

- Please pick a preset - 选择 Manually select features
- Check the features needed for your project - 多选择上 TypeScript，特别注意点空格是选择，点回车是下一步
- Choose a version of Vue.js that you want to start the project with - 选择 3.x (Preview)
- Use class-style component syntax - 输入 n，回车
- Use Babel alongside TypeScript - 输入 n，回车
- Pick a linter / formatter config - 直接回车
- Pick additional lint features - 直接回车
- Where do you prefer placing config for Babel, ESLint, etc.? - 直接回车
- Save this as a preset for future projects? - 输入 n，回车

====

示例：

- 1、注意`lang="ts"`和`defineComponent`的使用方式：
- 2、通过泛型 PropType 定义 props 类型

```vue
<template>
  <div class="home">
    <div>{{ count }}</div>
  </div>
</template>
<script lang="ts">
//确保组件的 script 部分已将语言设置为 TypeScript
import { defineComponent } from "vue";
interface componetntMeassage {
  title: string;
  okMessage: string;
}
//要让 TS 正确推断 Vue 组件选项中的类型，需要使用 defineComponent 全局方法定义组件
export default defineComponent({
  props: {
    name: String,
    message: {
      type: String,
      default: "",
    },
    callback: {
      type: Function as PropType<() => void>,
    },
    info: {
      type: Object as PropType<componetntMeassage>,
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  mounted() {
    //Property 'split' does not exist on type 'number'.
    const result = this.count.split("");
  },
});
</script>
```

### 与组合式 API 一起使用

- 1、在 setup() 函数中，不需要将类型传递给 props 参数，因为它将从 props 组件选项推断类型。
- 2、Refs 根据初始值推断类型
- 3、通过调用 ref 重写默认推理时传递一个泛型参数，指定 ref 的复杂类型。

```vue
<template>
  <div class="home">
    <div>{{ count }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const year = ref<string | number>("2020"); // 3、通过调用 ref 重写默认推理时传递一个泛型参数，指定ref的复杂类型
    year.value = 333; // ok!
    const homeData = ref(0); //2、Refs 根据初始值推断类型
    let add = homeData.value.split(""); //将引发错误: Property 'split' does not exist on type 'number'.
    const result = props.message.split(""); // 正确, 'message' 被声明为字符串
    const filtered = props.message.filter((p) => p.value); //1、在 setup() 函数中，不需要将类型传递给 props 参数，因为它将从 props 组件选项推断类型。
  },
});
</script>
```

### 类型声明 reactive

当声明类型 reactive 一般定义对象，我们可以使用接口：

```vue
<template>
  <div class="home">
    <div>{{ book1.title }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

interface Book {
  title: string;
  year?: number;
}
export default defineComponent({
  name: "HelloWorld",
  setup() {
    const book1 = reactive<Book>({ title: "Vue 3 Guide" });
    // or
    const book2: Book = reactive({ title: "Vue 3 Guide" });
    // or
    const book3 = reactive({ title: "Vue 3 Guide" }) as Book;
    return {
      book1,
    };
  },
});
</script>
```

### 类型声明 computed

计算值将根据返回值自动推断类型

```vue
<template>
  <div class="home">
    <div>{{ book1.title }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "CounterButton",
  setup() {
    let count = ref(0);

    // 只读
    const doubleCount = computed(() => count.value * 2);

    const result = doubleCount.value.split(""); // => Property 'split' does not exist on type 'number'
  },
});
</script>
```
