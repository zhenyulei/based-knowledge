<template>
    <div class="question" v-if="questions">
          <p>【{{questions.chType}}】{{questions.ask}}</p>
          <ul v-if="questions.answers.length>0">
              <li v-for="(item,index) in questions.answers" :key="questionKey(index)">
                  <input :type="questions.type" :id="questionKey(index)" :value="questionKey(index)"  @change="changeInput($event,index)"/>
                  <label :for="questionKey(index)">{{item.options}}</label>
              </li>
          </ul>
        <div class="btns">
          <button @click="submit" class="submit">提交</button>
          <b class="tips-word" :class="tipsClass" v-show="tipsWord">{{tipsWord}}</b>
        </div>
    </div>
</template>

<script>
import question from './question.json'
export default {
  props: {
    questionId: {
      type: String,
      default: '',
    }
  },
  data(){
    return {
      tipsWord:'',
      tipsClass:'',
      currRights:0
    }
  },
  computed:{
    questions(){
      return question[this.questionId]
    },
    rightsNum(){
      const filterArr = this.questions.answers.filter((item)=>{
        return item.flag;
      })
      return filterArr.length
    }
  },
  methods:{
    questionKey(index){
      return this.questionId+index
    },
    currStatus(equal){
      if(equal){
        this.tipsClass = 'right-tips';
        this.tipsWord = '恭喜回答正确！';
      }else{
        this.tipsClass = 'error-tips'
        this.tipsWord = '很遗憾回答错误！';
      } 
    },
    submit(){
      this.currStatus(this.currRights === this.rightsNum);
    },
    changeInput(event,index){      
      if(this.questions.answers[index].flag == event.target.checked){
        this.currRights++;
      }else{
        this.currRights--;
      }
    }
  }
}
</script>

<style lang="scss">
.question {
  padding:15px;
  // border:1px solid green;
  background: #eeeeee80;
  border-radius:10px;
  margin-top:20px;
    ul li{
      list-style:none;
    }
    .right-tips{
      color:green;
    }
    .error-tips{
      color:red;
    }
    .btns{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .submit{
        width:80px;
        height:30px;
        border:1px solid #eee;
        border-radius:6px;
        background:#41b983;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color:#fff;
        cursor:pointer;
        outline:none;
        &:hover{
          background:#1ee089;
          font-weight: bold;
        }
    }
}
</style>