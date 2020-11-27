---
sidebarDepth: 2
---

以 JSX 的方式来编写 Vue 代码，什么意思？
也就是你可以用类似于react的形式来开发vue了！！！

[先附上对应链接:点我](https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md)

对应的app组件

```vue
<template>
  <div>
    <Child3 myplace="默认值">
      <h1 title="标题1">标题1</h1>
      <h1 title="标题2">标题2</h1>
      <h1 title="标题3">标题3</h1>
    </Child3>
  </div>
</template>

<script>
import Child3 from "./components/child3.jsx"
export default {
  components:{
    Child3
  },
 data() {
   return {
     modalOpen: false
  }
},
};
</script>
```
对应的 Child3 组件使用了 jsx 方式开发的。
```js
import { withModifiers, defineComponent ,ref, onMounted} from 'vue';
const App = defineComponent({
    props:{
        myplace:String
    },
    setup(props,{slots}) {
        const count = ref(0);
        const content = ref('hello');
        const inc = () => {
            count.value++;
        };
        const changeInput = (e) => {
            content.value = e.target.value;
        }
        onMounted(()=>{
            slots.default().map((item,index)=>{
                console.log(item.props.title);
            })
        });
        return () => (
            <div onClick={inc}>
                <div>{content.value}</div>
                <input type="text" onInput={(e)=>changeInput(e)} />
                <div>{slots}</div>
                <span>{props.myplace}：</span>{count.value}
            </div>
        );
    }
});
export default App;
```