import React, { useState, useRef } from "react";
const MyDemo5 = () => {
  const [counter, setCounter] = useState(0);
  const cunterRef = useRef(0);
  function asyncData() {
    console.log("异步请求数据：" + cunterRef.current); //这里会使用 num 做一些处理，比如请求数据
  }
  function changeCounter() {
    setCounter(10);
    cunterRef.current = 10;
    asyncData();
  }
  function pureChangeCounter() {
    cunterRef.current = 20;
    setCounter(20);
  }
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
        点击我只是单纯改变 data
      </button>
    </>
  );
};

export default MyDemo5;
