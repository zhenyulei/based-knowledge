import React, { useState } from "react";

function MyDemo7() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }
  function handleClickFn() {
    setCount((prevCount) => {
      return prevCount + 1;
    });
    setCount((prevCount) => {
      return prevCount + 1;
    });
    setCount((prevCount) => {
      return prevCount + 1;
    });
  }
  return (
    <>
      Count: {count}
      <br />
      <button onClick={handleClick}>点击常规改变count</button>
      <br />
      <button onClick={handleClickFn}>点击函数式改变count</button>
    </>
  );
}
export default MyDemo7;
