import { withModifiers, defineComponent ,ref, onMounted} from 'vue';

const App = defineComponent({
    props:{
        myplace:String
    },
    setup(props,{slots}) {
        const count = ref(0);
        const content = ref('hello');
        const inc = () => {
            count.value++;
        };
        const changeInput = (e) => {
            content.value = e.target.value;
        }
        onMounted(()=>{
            slots.default().map((item,index)=>{
                console.log(item.props.title);
            })
        });
        return () => (
            <div onClick={inc}>
                <div>{content.value}</div>
                <input type="text" onInput={(e)=>changeInput(e)} />
                <div>{slots}</div>
                <span>{props.myplace}：</span>{count.value}
            </div>
        );
    }
});
export default App;