import React, { useState } from "react";
const MyDemo3 = () => {
  const [counter, setCounter] = useState(0);
  function asyncData() {
    console.log("异步请求数据：", counter); //这里会使用num做一些处理，比如num作为参数请求数据
  }
  function changeCounter() {
    setCounter(10); //改变data后执行 asyncData 函数
    console.log("counter", counter); //num为0
    asyncData();
  }
  return (
    <>
      <div>{counter}</div>
      <button onClick={changeCounter}>改变num</button>
    </>
  );
};
export default MyDemo3;
