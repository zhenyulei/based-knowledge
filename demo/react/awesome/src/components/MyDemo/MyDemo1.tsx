import React, { useEffect, useState } from "react";
const MyDemo1 = () => {
  const [counter, setCounter] = useState({ a: 1, b: 2 });
  const [number, setNumber] = useState([1, 2, 3]);
  useEffect(() => {
    console.log("监听到变化");
  }, [counter, number]);
  const changeCounter = () => {
    counter.b = 40; //直接改变对象的值
    setCounter(counter);
  };
  const changeNumber = () => {
    number[2] = 10; //直接改变数组的值
    number.push(4);
    setNumber(number);
  };
  return (
    <>
      <div>{"counter:" + counter.a + "---" + counter.b}</div>
      <button onClick={changeCounter}>change counter</button>
      <div>num:</div>
      {number.map((item, index) => {
        return <p key={index}>{item}</p>;
      })}
      <button onClick={changeNumber}>change number</button>
    </>
  );
};
export default MyDemo1;
