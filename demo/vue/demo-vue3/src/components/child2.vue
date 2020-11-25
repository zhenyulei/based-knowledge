<template>
    <div>
        {{initname}}:{{myName}}--{{parentUser}}
    </div>
</template>
<script>
export default {
    inject:['user','myName','initname'],
    computed:{
        parentUser(){
            return this.user()
        }
    }
}
</script>
