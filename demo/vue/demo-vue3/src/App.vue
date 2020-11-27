<template>
  <div>
      <h1 title="标题1">{{showMessage[0]}}</h1>
      <div v-mylight="'yellow'">{{transData}}</div>
  </div>
</template>

<script>
import Child3 from "./components/child3.jsx"
import {getCurrentInstance, onMounted} from 'vue'
export default {
  inject:['transData'],//插件中定义的provide
  setup() {
    const { ctx } = getCurrentInstance();//vue3中调用全局变量
    const showMessage = ctx.$translate;//在插件中定义的全局变量$translate
    // onMounted(()=>{
    //   console.log(pluginData);
    // })
    return {
      showMessage
    };
  }
};
</script>