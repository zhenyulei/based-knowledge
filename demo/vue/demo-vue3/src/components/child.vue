<template>
    <input type="text" name="myinput" />
    <button @click="forceUpdate" v-bind="$attrs">点击我</button>
</template>

<script>
export default {
  data(){
    return {
      childData:123
    }
  },
  mounted(){console.log('child1')},
  updated(){console.log('update2')},
  methods: {
    focusInput() {
      console.log(11);
    }
  },
}
</script>