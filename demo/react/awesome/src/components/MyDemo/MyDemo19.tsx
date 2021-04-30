import React, { useState, useEffect, useRef } from "react";

//获取上一时刻的props
const usePreProps = (props) => {
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = props;
  });
  return prevCountRef.current;
};

//获取上一时刻的state
const usePreData = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const ChildCom = (props) => {
  const [num, setNum] = useState(0);
  const mycounter = usePreProps(props.counter);
  console.log("上一时刻的props", mycounter);
  const preData = usePreData(num);
  console.log("上一时刻的data", preData);
  const changeNum = () => {
    setNum(num + 1);
  };
  return (
    <>
      <div>子组件props:{props.counter}</div>
      <div>子组件data:{num}</div>
      <button onClick={changeNum}>点击改变state</button>
    </>
  );
};
const MyDemo19 = () => {
  const [counter, SetCounter] = useState(0);
  const changeCounter = () => {
    SetCounter((preState) => {
      return preState + 1;
    });
  };
  return (
    <>
      <ChildCom counter={counter} />
      <button onClick={changeCounter}>点击改变子组件props</button>
    </>
  );
};
export default MyDemo19;
