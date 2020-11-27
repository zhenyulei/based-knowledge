export default {
    install: (app, options) => {
      app.config.globalProperties.$translate = handleObj(options);//把处理后的数据赋值给全局变量赋值，
      app.provide('transData', options);//注入变量
      app.directive('mylight', { //定义指令
        mounted (el, binding, vnode, oldVnode) {
          el.style.backgroundColor=binding.value;
        }
      })
      app.mixin({
        data(){
            return {
                myname:"xiaohua"
            }
        }
      })
    },
    
}
function handleObj(options){
    return Object.keys(options).map((key)=>{
        return options[key]+'英文名字'
    })
}