import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)


app.component('button-counter', {
    data() {
      return {
        count: 0
      }
    },
    template: `
      <button v-on:click="count++">
        You clicked me {{ count }} times.
      </button>`
  })

  
app.mount('#app')