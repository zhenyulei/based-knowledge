<template>
    <div>{{name}}</div>
    <div>
       222
    </div>
</template>
<script>
export default {
    data(){
        return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    return resolve({
                        name:'小孩'
                    });
                },3000)
            })
        
    },
//   mounted(){
//     this.handleName()
//   },
//   methods:{
//         async handleName(){
//            this.name = await this.getName();
//         },
//         getName(){
//             return new Promise((resolve,reject)=>{
//                 setTimeout(()=>{
//                     resolve('小孩');
//                 },3000)
//             })
//         }
//   }
}
</script>
