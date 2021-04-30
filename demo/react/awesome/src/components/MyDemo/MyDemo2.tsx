import React, { useState, useEffect } from "react";
const MyDemo2 = () => {
  const [counter, setCounter] = useState({ a: 1, b: 2 });
  const [number, setNumber] = useState([1, 2, 3]);
  useEffect(() => {
    console.log("监听到变化");
  }, [counter, number]);
  const changeCounter = () => {
    setCounter({ ...counter, b: 40 });
  };
  const changeNumber = () => {
    const newNumber = [...number];
    newNumber[2] = 20;
    newNumber.push(4);
    setNumber(newNumber);
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
export default MyDemo2;
