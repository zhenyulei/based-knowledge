<template>
  <div id="app">
    <input type="text" v-model="name" placeholder="输入姓名" />
    <label for="gender1">
      <input
        type="radio"
        name="gender"
        id="gender1"
        value="0"
        v-model="gender"
      />
      男
    </label>
    <label for="gender2">
      <input
        type="radio"
        name="gender"
        id="gender2"
        value="1"
        v-model="gender"
      />
      女
    </label>
    <input type="text" v-model="email" placeholder="请输入邮箱" />
    <button @click="submit">提交按钮</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      name: "",
      gender: 0,
      email: "",
    };
  },
  methods: {
    submit() {
      axios
        .get("http://localhost:3000", {
          params: {
            name: this.name,
            gender: this.gender,
            email: this.email,
          },
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
