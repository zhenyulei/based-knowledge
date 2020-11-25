<template>
  <Child></Child>
  <button @click="changeData">改变data</button>
</template>
<script>
import Child from './components/child.vue'
export default {
  components: {
    Child
  },
  data(){
    return {
      name:'初始值'
    }
  },
  provide(){
    return {
      initname:"静态文本",//静态文本不可改变
      myName:this.name,//取值变量，无响应式
      user:()=>this.name//有响应式
    }
  },
  methods:{
    changeData(e){
      this.name = '改变后的data'
    }
  }
}
</script>