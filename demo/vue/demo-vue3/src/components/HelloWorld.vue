<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <button v-bind:disabled="isButtonDisabled">按钮</button>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0,
      isButtonDisabled:true
    }
  }
}
</script>
