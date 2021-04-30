import React, { useState, useEffect } from "react";
const MyDemo4 = () => {
  const [counter, setCounter] = useState(0);
  function asyncData() {
    console.log("异步请求数据：" + counter); //这里会使用num做一些处理，比如请求数据
  }
  function changeCounter() {
    setCounter(10);
    console.log("counter", counter); //num为0
  }
  function pureChangeCounter() {
    setCounter(20);
  }
  useEffect(() => {
    asyncData(), [counter];
  });
  return (
    <>
      <button
        onClick={() => {
          changeCounter();
        }}
      >
        点击我执行异步函数
      </button>
      <div>{counter}</div>
      <button
        onClick={() => {
          pureChangeCounter();
        }}
      >
        点击我只是单纯改变data
      </button>
    </>
  );
};
export default MyDemo4;
