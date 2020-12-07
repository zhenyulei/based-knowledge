<template>
 <a :href="currLink" class="online" target="_bank">在线调试代码</a>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      default: null,
      required: true,
    }
  },
  computed:{
      currLink(){
        return 'http://jsrun.net/'+this.slug+'/edit'
      }
  }
}
</script>

<style lang="scss">
.online {
  width:100px;
  height:40px;
  border:1px solid #eee;
  border-radius:6px;
  background:#41b983;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color:#fff;
  &:hover{
    background:#1ee089;
    font-weight: bold;
  }
}
</style>