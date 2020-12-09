---
sidebarDepth: 0
---


## 环境配置

**方法一：**
使用vite脚手架轻松启动项目：

- `npm init vite-app demo-vue3`
- `cd demo-vue3`
- `npm install`
- `npm run dev`

:::tip
安装node版本为12.xx，否则低版本node 会导致 build 报错
:::

### 使用 JSRUN 在线编辑代码示例，占位：

<common-code-js-run slug="vkIKp"></common-code-js-run>

```vue
<template>
<div id="main">
<p @click="clickBtn">{{counter}}</p>
</div>
</template>
<script>
var demo = new Vue({
    el: '#main',
    data: {
        counter:10
    },
    methods:{
        clickBtn(){
            alert(this.counter);
        }
    }
});
</script>
```

## 在线编辑代码方式二：

<common-codepen-snippet title="Handling forms: select" slug="gOwMaPW" :preview="false" />

data+生命周期是函数，其他是对象