const myMixin = {
    data(){
        return {
            childData:'123'
        }
    },
    created() {
        this.hello()
    },
    methods: {
        hello() {
            console.log(this.parent,this.childData)
        }
    }
}
export default myMixin;