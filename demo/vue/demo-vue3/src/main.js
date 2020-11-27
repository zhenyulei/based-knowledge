import { createApp } from 'vue'
import Root from './App.vue'
import transPlugin from './transPlugin.js'//引入插件
const app = createApp(Root)
const globalStrings = {
  hello: 'Bon.jour!'
}
app.use(transPlugin,globalStrings)//使用插件，globalStrings为入参
app.mount('#app')