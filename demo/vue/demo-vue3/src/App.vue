<template>
    <div class="wraper">
      <button @click="changeBtn()">点击me</button>
    </div>
</template>
<script>
import {ref} from 'vue'
export default {
  data(){
    return{
     counter:0,
    }
  },
  methods:{
    changeBtn(){
      alert(222);
    }
  }
}
</script>